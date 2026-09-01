/**
 * ロボット発表会：作品CSV一括取り込みスクリプト
 *
 * 使い方:
 *   npm run import:robot-works -- ./works.csv
 *   npm run import:robot-works -- ./works.csv robot-2026-08   ← 展示会slugを明示指定（省略時 robot-2026-08）
 *
 * CSVの列見出し（1行目・日本語のまま）:
 *   コース, 作品名, ニックネーム, 動画URL,
 *   なんでこのロボット(テーマ)を選びましたか？, 作るときに工夫したところ,
 *   こだわりポイント, 感想など
 *   （見出しの順番は自由。余分な列があっても無視される）
 *
 * 動作:
 *   - 文字コードは UTF-8 / Shift_JIS（Excelの「CSV UTF-8」「CSV(コンマ区切り)」どちらの保存でもOK）を自動判定
 *   - 同じ展示会内で (作品名, ニックネーム) が一致する行は「更新」、一致しなければ「新規追加」
 *     → 作品を消して作り直さないので、コメントや作者専用URLが失われない
 *   - コースが「キッズ／エジソン／エキスパート」以外の値でも取り込みは行う（ページ上は「その他」に表示）
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';

// .env.local を読む（dotenv 非依存。verify-phase1.mjs と同じ方式）
try {
  const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
} catch {
  /* .env.local が無ければ環境変数をそのまま使う */
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error('NG: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY が未設定です（.env.local を確認）');
  process.exit(1);
}

const csvPath = process.argv[2];
const slug = process.argv[3] || 'robot-2026-08';
if (!csvPath) {
  console.error('使い方: npm run import:robot-works -- ./works.csv [展示会slug]');
  process.exit(1);
}

// ---- 文字コード自動判定して読み込み ----
function readCsvText(path) {
  const buf = readFileSync(path);
  // UTF-8 BOM
  if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
    return buf.subarray(3).toString('utf8');
  }
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(buf);
  } catch {
    // 不正なUTF-8バイト列 → Shift_JIS（ExcelのWindows既定保存）とみなす
    return new TextDecoder('shift_jis').decode(buf);
  }
}

// ---- 簡易CSVパーサ（RFC4180: ダブルクォート囲み・""エスケープ・引用内改行に対応） ----
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  const src = text.replace(/\r\n/g, '\n');
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += ch;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ''));
}

// CSV見出し（日本語） → DBカラム名
const HEADER_MAP = {
  'コース': 'course',
  '作品名': 'title',
  'ニックネーム': 'author_nickname',
  '動画URL': 'youtube_url',
  'なんでこのロボット(テーマ)を選びましたか？': 'author_intro',
  '作るときに工夫したところ': 'story_devised',
  'こだわりポイント': 'story_struggled',
  '感想など': 'story_learned',
};
const REQUIRED = ['course', 'title', 'author_nickname'];
const KNOWN_COURSES = new Set(['キッズ', 'エジソン', 'エキスパート']);
// テンプレートの表記ゆれ → ページ側（RobotWorks2608Content.tsx の COURSES）が想定する3値に正規化
const COURSE_ALIASES = {
  '自考力キッズ': 'キッズ',
  'エジソンクラス': 'エジソン',
  'エキスパート＆スタッフ': 'エキスパート',
};

// YouTube URLからIDを取り出す（lib/exhibition/youtube.ts と同等。スクリプト単体実行のためここに複製）
function extractYouTubeId(u) {
  try {
    const parsed = new URL(u);
    if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1).split('/')[0] || null;
    if (parsed.hostname.endsWith('youtube.com') || parsed.hostname.endsWith('youtube-nocookie.com')) {
      if (parsed.pathname === '/watch') return parsed.searchParams.get('v');
      const m = parsed.pathname.match(/^\/(embed|shorts|live)\/([\w-]{6,})/);
      if (m) return m[2];
    }
    return null;
  } catch {
    return null;
  }
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

const rawRows = parseCsv(readCsvText(csvPath));
if (rawRows.length < 2) {
  console.error('NG: CSVにデータ行がありません');
  process.exit(1);
}

const headerRow = rawRows[0].map((h) => h.trim());
const fieldKeys = headerRow.map((h) => HEADER_MAP[h] ?? null);
if (!fieldKeys.includes('title') || !fieldKeys.includes('author_nickname')) {
  console.error('NG: 見出し行に「作品名」「ニックネーム」が見つかりません。テンプレートの見出しと一致しているか確認してください。');
  console.error('  読み取った見出し:', headerRow.join(' / '));
  process.exit(1);
}

const { data: exhibition, error: exError } = await supabase
  .from('exhibitions')
  .select('id, title')
  .eq('slug', slug)
  .maybeSingle();
if (exError || !exhibition) {
  console.error(`NG: 展示会 slug="${slug}" が見つかりません`, exError?.message ?? '');
  process.exit(1);
}
console.log(`展示会: ${exhibition.title} (${slug})`);

let inserted = 0;
let updated = 0;
let skipped = 0;
const warnings = [];

for (let r = 1; r < rawRows.length; r++) {
  const cells = rawRows[r];
  const rec = {};
  fieldKeys.forEach((key, i) => {
    if (key) rec[key] = (cells[i] ?? '').trim();
  });

  const missing = REQUIRED.filter((k) => !rec[k]);
  if (missing.length > 0) {
    skipped++;
    warnings.push(`${r + 1}行目: 必須項目が空のためスキップ（${missing.join('・')}）`);
    continue;
  }

  if (rec.course && COURSE_ALIASES[rec.course]) {
    rec.course = COURSE_ALIASES[rec.course];
  }

  if (!KNOWN_COURSES.has(rec.course)) {
    warnings.push(`${r + 1}行目: コース「${rec.course}」は想定外の値です（キッズ／エジソン／エキスパート以外→ページでは「その他」に表示）`);
  }

  let youtubeUrl = null;
  if (rec.youtube_url) {
    if (extractYouTubeId(rec.youtube_url)) {
      youtubeUrl = rec.youtube_url;
    } else {
      warnings.push(`${r + 1}行目: 動画URLを認識できません（${rec.youtube_url}）→ 動画なしで取り込みます`);
    }
  }

  const payload = {
    exhibition_id: exhibition.id,
    course: rec.course,
    title: rec.title,
    author_nickname: rec.author_nickname,
    youtube_url: youtubeUrl,
    author_intro: rec.author_intro || null,
    story_devised: rec.story_devised || null,
    story_struggled: rec.story_struggled || null,
    story_learned: rec.story_learned || null,
  };

  // 既存判定: 同展示会内で (作品名, ニックネーム) が一致する行があれば更新
  const { data: existing } = await supabase
    .from('works')
    .select('id')
    .eq('exhibition_id', exhibition.id)
    .eq('title', rec.title)
    .eq('author_nickname', rec.author_nickname)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase.from('works').update(payload).eq('id', existing.id);
    if (error) {
      skipped++;
      warnings.push(`${r + 1}行目: 更新に失敗しました（${error.message}）`);
      continue;
    }
    updated++;
  } else {
    const { error } = await supabase.from('works').insert(payload);
    if (error) {
      skipped++;
      warnings.push(`${r + 1}行目: 追加に失敗しました（${error.message}）`);
      continue;
    }
    inserted++;
  }
}

console.log('');
console.log(`新規追加: ${inserted}件 / 更新: ${updated}件 / スキップ: ${skipped}件`);
if (warnings.length > 0) {
  console.log('');
  console.log('--- 警告 ---');
  warnings.forEach((w) => console.log('  ' + w));
}
