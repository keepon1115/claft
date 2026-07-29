/**
 * ロボット発表会：コメント書き出しスクリプト（参加賞状の差し込み印刷用）
 *
 * 使い方:
 *   npm run export:robot-comments -- robot-2026-08
 *   npm run export:robot-comments -- robot-2026-08 ./out.csv   ← 出力先を指定（省略時は自動で名前を付ける）
 *
 * 出力列: コース, 作品名, ニックネーム, ステータス, コメント本文, 投稿者名, 投稿日時
 *   - ステータスは pending(承認待ち) / approved(承認済み) / rejected(却下) をそのまま出す。
 *     賞状に載せてよいか判断する材料として残している（フィルタしたい場合はExcel側で絞り込み可）。
 *   - Excelでそのまま開けるよう UTF-8 BOM 付きで出力する。
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'node:fs';

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

const slug = process.argv[2] || 'robot-2026-08';
const outPath = process.argv[3] || `./robot-comments-${slug}-${new Date().toISOString().slice(0, 10)}.csv`;

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

const { data: exhibition, error: exError } = await supabase
  .from('exhibitions')
  .select('id, title')
  .eq('slug', slug)
  .maybeSingle();
if (exError || !exhibition) {
  console.error(`NG: 展示会 slug="${slug}" が見つかりません`, exError?.message ?? '');
  process.exit(1);
}

const { data: works, error: worksError } = await supabase
  .from('works')
  .select('id, course, title, author_nickname')
  .eq('exhibition_id', exhibition.id)
  .order('created_at', { ascending: true });
if (worksError) {
  console.error('NG: 作品の取得に失敗', worksError.message);
  process.exit(1);
}

const workMap = new Map((works ?? []).map((w) => [w.id, w]));
const workIds = (works ?? []).map((w) => w.id);

let comments = [];
if (workIds.length > 0) {
  const { data, error } = await supabase
    .from('comments')
    .select('work_id, status, body, viewer_nickname, created_at')
    .in('work_id', workIds)
    .order('work_id', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) {
    console.error('NG: コメントの取得に失敗', error.message);
    process.exit(1);
  }
  comments = data ?? [];
}

function csvField(value) {
  const s = String(value ?? '');
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

const header = ['コース', '作品名', 'ニックネーム', 'ステータス', 'コメント本文', '投稿者名', '投稿日時'];
const lines = [header.map(csvField).join(',')];

for (const c of comments) {
  const work = workMap.get(c.work_id);
  lines.push(
    [
      work?.course ?? '',
      work?.title ?? '',
      work?.author_nickname ?? '',
      c.status,
      c.body,
      c.viewer_nickname ?? '（なまえなし）',
      new Date(c.created_at).toLocaleString('ja-JP'),
    ]
      .map(csvField)
      .join(','),
  );
}

const bom = Buffer.from([0xef, 0xbb, 0xbf]);
writeFileSync(outPath, Buffer.concat([bom, Buffer.from(lines.join('\n'), 'utf8')]));

console.log(`書き出し完了: ${outPath}`);
console.log(`展示会: ${exhibition.title} / 作品数: ${works?.length ?? 0} / コメント数: ${comments.length}`);
