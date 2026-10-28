/**
 * なんでも展示会：作品CSV一括取り込みスクリプト
 *
 * 使い方:
 *   npm run import:nandemo-works -- ./works.csv --dry-run     ← DBは書き換えず、差分一覧だけ表示
 *   npm run import:nandemo-works -- ./works.csv               ← 実際に反映
 *   npm run import:nandemo-works -- ./works.csv nandemo-2027-03 --dry-run   ← 展示会slugを指定（省略時 nandemo-2026-11）
 *
 * CSVの列見出し（1行目・日本語のまま）:
 *   作品名, 名前, 動画URL, 作品リンク, 説明文, ボタン文言, 削除
 *   （見出しの順番は自由。余分な列があっても無視される。「ニックネーム」も「名前」として読む）
 *   - 名前はページに表示しない（同じ作品かの判定用。DBでは works.author_nickname）
 *   - 動画URL・作品リンクはどちらか一方でOK（両方空はエラー）
 *   - 説明文（任意）は works.author_intro、ボタン文言（任意・空なら「作品はこちら」）は works.story_devised に保存する。
 *   - 作品リンクは works.story_made に保存する（この展示会では未使用の列を流用。
 *     ページ側 ExhibitionWorks2611Content.tsx が「作品はこちら」ボタンとして読む）
 *   - 削除列に「削除」と書いた行は、その作品をDBから消す（コメント・リアクションも一緒に消える）
 *
 * 動作:
 *   - 文字コードは UTF-8 / Shift_JIS を自動判定
 *   - 同じ展示会内で (作品名, 名前) が一致する行は「更新（変化なしならスキップ）」、一致しなければ「新規追加」
 *   - CSVに無い作品には触らない
 *   - 入力チェックでNGが1つでもあれば、何も書き込まずに終了する
 *   - 一覧ページ上は提出順（登録順）に並ぶ
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';

// .env.local を読む（dotenv 非依存。import-robot-works.mjs と同じ方式）
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

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const positional = args.filter((a) => !a.startsWith('--'));
const csvPath = positional[0];
const slug = positional[1] || 'nandemo-2026-11';
if (!csvPath) {
  console.error('使い方: npm run import:nandemo-works -- ./works.csv [展示会slug] [--dry-run]');
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

// CSV見出し（日本語） → 内部キー
const HEADER_MAP = {
  '作品名': 'title',
  '名前': 'author_nickname',
  'ニックネーム': 'author_nickname',
  '動画URL': 'youtube_url',
  '作品リンク': 'work_link',
  '説明文': 'description',
  'ボタン文言': 'button_label',
  '削除': 'remove',
};
const REQUIRED = ['title', 'author_nickname'];

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
  console.error('NG: 見出し行に「作品名」「名前」が見つかりません。シートの見出しと一致しているか確認してください。');
  console.error('  読み取った見出し:', headerRow.join(' / '));
  process.exit(1);
}

// ---- 1. 入力チェック（NGがあれば何も書き込まず終了） ----
const entries = [];
const errors = [];
const seen = new Map();
for (let r = 1; r < rawRows.length; r++) {
  const rec = {};
  fieldKeys.forEach((key, i) => {
    if (key) rec[key] = (rawRows[r][i] ?? '').trim();
  });
  const line = `${r + 1}行目`;
  const label = rec.title ? `「${rec.title}」` : '';

  const missing = REQUIRED.filter((k) => !rec[k]);
  if (missing.length > 0) {
    errors.push(`${line}: 必須項目が空です（${missing.map((k) => (k === 'title' ? '作品名' : '名前')).join('・')}）`);
    continue;
  }

  const dupKey = `${rec.title}\u0000${rec.author_nickname}`;
  if (seen.has(dupKey)) {
    errors.push(`${line}: ${label}は ${seen.get(dupKey)} と作品名・名前が同じです（重複）`);
    continue;
  }
  seen.set(dupKey, line);

  const remove = rec.remove === '削除';
  if (rec.remove && !remove) {
    errors.push(`${line}: ${label}削除列は「削除」か空欄にしてください（入力値: ${rec.remove}）`);
    continue;
  }

  if (!remove) {
    if (!rec.youtube_url && !rec.work_link) {
      errors.push(`${line}: ${label}動画URLも作品リンクも空です（どちらか1つは必要）`);
      continue;
    }
    if (rec.youtube_url && !extractYouTubeId(rec.youtube_url)) {
      errors.push(`${line}: ${label}動画URLを認識できません（${rec.youtube_url}）`);
      continue;
    }
    if (rec.work_link && !/^https:\/\/\S+$/.test(rec.work_link)) {
      errors.push(`${line}: ${label}作品リンクは https:// で始まるURLにしてください（${rec.work_link}）`);
      continue;
    }
  }

  entries.push({
    line,
    remove,
    title: rec.title,
    author_nickname: rec.author_nickname,
    youtube_url: rec.youtube_url || null,
    story_made: rec.work_link || null,
    author_intro: rec.description || null,
    story_devised: rec.button_label || null,
  });
}

if (errors.length > 0) {
  console.error('NG: 入力チェックで問題が見つかりました。何も書き込んでいません。');
  errors.forEach((e) => console.error('  ' + e));
  process.exit(1);
}

// ---- 2. 展示会を取得 ----
const { data: exhibition, error: exError } = await supabase
  .from('exhibitions')
  .select('id, title')
  .eq('slug', slug)
  .maybeSingle();
if (exError || !exhibition) {
  console.error(`NG: 展示会 slug="${slug}" が見つかりません（先に /admin/exhibitions で作成してください）`, exError?.message ?? '');
  process.exit(1);
}
console.log(`展示会: ${exhibition.title} (${slug})${dryRun ? '  ※お試し実行（DBは変更しません）' : ''}`);

// ---- 3. 差分を判定して反映 ----
const added = [];
const updated = [];
const unchanged = [];
const removed = [];
const notFound = [];
const failed = [];
const warnings = [];

const show = (v) => (v ? v : '（なし）');

for (const e of entries) {
  const { data: existing, error: selError } = await supabase
    .from('works')
    .select('id, youtube_url, story_made, author_intro, story_devised')
    .eq('exhibition_id', exhibition.id)
    .eq('title', e.title)
    .eq('author_nickname', e.author_nickname)
    .maybeSingle();
  if (selError) {
    failed.push(`${e.line}: 「${e.title}」の検索に失敗しました（${selError.message}）`);
    continue;
  }

  if (e.remove) {
    if (!existing) {
      notFound.push(`${e.line}: 「${e.title}」（${e.author_nickname}）は削除指定ですが、DBにありません`);
      continue;
    }
    const { count } = await supabase
      .from('comments')
      .select('id', { count: 'exact', head: true })
      .eq('work_id', existing.id);
    if (!dryRun) {
      const { error } = await supabase.from('works').delete().eq('id', existing.id);
      if (error) {
        failed.push(`${e.line}: 「${e.title}」の削除に失敗しました（${error.message}）`);
        continue;
      }
    }
    removed.push(`「${e.title}」（${e.author_nickname}）／コメント${count ?? 0}件も一緒に消えます`);
    continue;
  }

  const fields = {
    youtube_url: e.youtube_url,
    story_made: e.story_made,
    author_intro: e.author_intro,
    story_devised: e.story_devised,
  };

  if (existing) {
    const changes = [];
    if ((existing.youtube_url ?? null) !== fields.youtube_url) {
      changes.push(`動画: ${show(existing.youtube_url)} → ${show(fields.youtube_url)}`);
    }
    if ((existing.author_intro ?? null) !== fields.author_intro) {
      changes.push(`説明文: ${show(existing.author_intro)} → ${show(fields.author_intro)}`);
    }
    if ((existing.story_devised ?? null) !== fields.story_devised) {
      changes.push(`ボタン文言: ${show(existing.story_devised)} → ${show(fields.story_devised)}`);
    }
    if ((existing.story_made ?? null) !== fields.story_made) {
      changes.push(`作品リンク: ${show(existing.story_made)} → ${show(fields.story_made)}`);
    }
    if (changes.length === 0) {
      unchanged.push(`「${e.title}」（${e.author_nickname}）`);
      continue;
    }
    if (!dryRun) {
      const { error } = await supabase.from('works').update(fields).eq('id', existing.id);
      if (error) {
        failed.push(`${e.line}: 「${e.title}」の更新に失敗しました（${error.message}）`);
        continue;
      }
    }
    updated.push(`「${e.title}」（${e.author_nickname}）\n      ${changes.join('\n      ')}`);
  } else {
    // 同じ作品名が別の名前表記で既にDBにある場合、二重登録の可能性が高い（表記ゆれ）
    const { data: sameTitle } = await supabase
      .from('works')
      .select('author_nickname')
      .eq('exhibition_id', exhibition.id)
      .eq('title', e.title);
    if (sameTitle && sameTitle.length > 0) {
      warnings.push(
        `${e.line}: 「${e.title}」は既にDBにありますが、名前の表記が違うため別作品として追加${dryRun ? 'します' : 'しました'}（DB内: 「${sameTitle.map((s) => s.author_nickname).join('」「')}」／今回: 「${e.author_nickname}」）。表記ゆれなら、どちらかを削除してください。`,
      );
    }
    if (!dryRun) {
      const { error } = await supabase.from('works').insert({
        exhibition_id: exhibition.id,
        title: e.title,
        author_nickname: e.author_nickname,
        ...fields,
      });
      if (error) {
        failed.push(`${e.line}: 「${e.title}」の追加に失敗しました（${error.message}）`);
        continue;
      }
    }
    added.push(`「${e.title}」（${e.author_nickname}）  動画: ${show(fields.youtube_url)} ／ 作品リンク: ${show(fields.story_made)} ／ 説明文: ${show(fields.author_intro)} ／ ボタン文言: ${show(fields.story_devised)}`);
  }
}

// ---- 4. 結果表示 ----
const verb = dryRun ? '予定' : '完了';
console.log('');
console.log(`追加${added.length}件 / 更新${updated.length}件 / 削除${removed.length}件 / 変化なし${unchanged.length}件（${verb}）`);
const section = (title, list) => {
  if (list.length === 0) return;
  console.log('');
  console.log(`--- ${title} ---`);
  list.forEach((l) => console.log('  ・' + l));
};
section('追加', added);
section('更新', updated);
section('削除', removed);
section('変化なし', unchanged);
section('削除指定だがDBに無い', notFound);
section('警告', warnings);
section('失敗', failed);
if (dryRun) {
  console.log('');
  console.log('※お試し実行です。反映するには --dry-run を外して再実行してください。');
}
if (failed.length > 0) process.exit(1);
