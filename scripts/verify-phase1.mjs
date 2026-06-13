/**
 * Phase 1 セキュリティ/RLS 検証スクリプト
 *
 * 使い方:
 *   1. Supabase プロジェクトに supabase/schema_phase1.sql → seed_phase1.sql を適用
 *   2. .env.local に NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
 *      （あれば SUPABASE_SERVICE_ROLE_KEY も）を設定
 *   3. node scripts/verify-phase1.mjs
 *
 * 検証内容（守る原則の実証）:
 *   A. anon からは approved コメントしか見えない（pending が漏れない）
 *   B. anon から author_tokens（限定URLトークン）が一切読めない
 *   C. anon から reactions の生データ（visitor_hash）が読めない
 *   D. anon でもリアクション集計 RPC は使える（個人情報なし）
 *   E. anon はコメントを直接 INSERT/UPDATE できない
 *   F. service role で status='approved' を指定して INSERT しても
 *      トリガーで pending に強制される
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';

// .env.local を読む（dotenv 非依存）
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
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !anonKey) {
  console.error('NG: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY が未設定です');
  process.exit(1);
}

const anon = createClient(url, anonKey, { auth: { persistSession: false } });
let failures = 0;

function report(name, ok, detail = '') {
  console.log(`${ok ? 'OK ' : 'NG '} ${name}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures += 1;
}

// A. pending コメントが anon から見えないこと
{
  const { data, error } = await anon.from('comments').select('id, status');
  const rows = data ?? [];
  const pendingVisible = rows.some((r) => r.status !== 'approved');
  report(
    'A: anon には approved コメントだけが見える',
    !error && !pendingVisible,
    `取得 ${rows.length} 件 (approved 以外: ${rows.filter((r) => r.status !== 'approved').length})`,
  );
  const { data: byId } = await anon
    .from('comments')
    .select('id')
    .eq('id', 'd1000000-0000-4000-8000-000000000002'); // シードの pending コメント
  report('A2: シードの pending コメントは ID 直撃でも見えない', (byId ?? []).length === 0);
}

// B. author_tokens が anon から読めないこと
{
  const { data } = await anon.from('author_tokens').select('token');
  report('B: anon から author_tokens は読めない', (data ?? []).length === 0);
}

// C. reactions の生データが anon から読めないこと
{
  const { data } = await anon.from('reactions').select('visitor_hash');
  report('C: anon から reactions の生データは読めない', (data ?? []).length === 0);
}

// D. RPC reaction_counts は anon で使える
{
  const { data, error } = await anon.rpc('reaction_counts', {
    p_work_id: 'c1000000-0000-4000-8000-000000000001',
  });
  const cols = data?.[0] ? Object.keys(data[0]).sort().join(',') : '';
  report(
    'D: anon で reaction_counts RPC が使える（kind_id/emoji/label/count のみ）',
    !error && Array.isArray(data) && (!data[0] || cols === 'count,emoji,kind_id,label'),
    error ? error.message : `${data?.length ?? 0} 種`,
  );
}

// E. anon はコメントを直接書き込めない
{
  const { error: insErr } = await anon.from('comments').insert({
    work_id: 'c1000000-0000-4000-8000-000000000001',
    comment_type: 'cheer',
    body: 'RLSテスト: これは入ってはいけない',
  });
  report('E1: anon はコメントを直接 INSERT できない', !!insErr, insErr?.message ?? '');

  const { data: updData } = await anon
    .from('comments')
    .update({ status: 'approved' })
    .eq('id', 'd1000000-0000-4000-8000-000000000002')
    .select();
  report('E2: anon は pending コメントを承認に書き換えられない', (updData ?? []).length === 0);
}

// F. service role でも INSERT 時は pending に強制される（トリガー検証）
if (serviceKey) {
  const service = createClient(url, serviceKey, { auth: { persistSession: false } });
  const { data, error } = await service
    .from('comments')
    .insert({
      work_id: 'c1000000-0000-4000-8000-000000000001',
      comment_type: 'cheer',
      body: 'トリガーテスト: approved 指定で INSERT',
      status: 'approved',
    })
    .select('id, status')
    .single();
  report(
    'F: approved 指定の INSERT もトリガーで pending になる',
    !error && data?.status === 'pending',
    error ? error.message : `status=${data?.status}`,
  );
  if (data?.id) await service.from('comments').delete().eq('id', data.id); // 後始末
} else {
  console.log('SKIP F: SUPABASE_SERVICE_ROLE_KEY 未設定のためトリガー検証をスキップ');
}

console.log('');
if (failures === 0) {
  console.log('すべての検証に合格しました ✔');
} else {
  console.error(`${failures} 件の検証に失敗しました`);
  process.exit(1);
}
