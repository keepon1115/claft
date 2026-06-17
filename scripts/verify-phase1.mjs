/**
 * Phase 1 セキュリティ/RLS 検証スクリプト（正本スキーマ準拠）
 *
 * 使い方:
 *   1. 正本 schema_phase1.sql（app/(site)/futurecraft/Exhibition/schema_phase1.sql）と
 *      シードを適用済みのSupabaseプロジェクトを用意
 *   2. .env.local に NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
 *      （あれば SUPABASE_SERVICE_ROLE_KEY も）を設定
 *   3. npm run verify:phase1
 *
 * 検証内容（守る原則の実証）:
 *   A. anon からは approved コメントしか見えない（pending が漏れない）
 *   B. anon から work_access_tokens（限定URLトークン）が一切読めない
 *   C. anon から reactions の生データ（viewer_fingerprint）が読めない
 *   D. anon でもリアクション集計 RPC は使える（個人情報を含まない reaction_type_id/cnt のみ）
 *   E. 正本は anon の「pending での投稿」を許す設計。だが
 *        E1: approved 指定の INSERT は RLS で拒否される
 *        E2: anon が投稿したコメントは pending で、anon からは見えない
 *        E3: anon は既存コメントを approved に書き換えられない
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

const WORK_ID = 'c1000000-0000-4000-8000-000000000001';
const PENDING_COMMENT_ID = 'd1000000-0000-4000-8000-000000000002';

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
  const { data: byId } = await anon.from('comments').select('id').eq('id', PENDING_COMMENT_ID);
  report('A2: シードの pending コメントは ID 直撃でも見えない', (byId ?? []).length === 0);
}

// B. work_access_tokens が anon から読めないこと
{
  const { data } = await anon.from('work_access_tokens').select('token');
  report('B: anon から work_access_tokens は読めない', (data ?? []).length === 0);
}

// C. reactions の生データが anon から読めないこと
{
  const { data } = await anon.from('reactions').select('viewer_fingerprint');
  report('C: anon から reactions の生データは読めない', (data ?? []).length === 0);
}

// D. RPC reaction_counts は anon で使え、個人情報を含まない
{
  const { data, error } = await anon.rpc('reaction_counts', { p_work_id: WORK_ID });
  const cols = data?.[0] ? Object.keys(data[0]).sort().join(',') : 'cnt,reaction_type_id';
  report(
    'D: anon で reaction_counts RPC が使える（reaction_type_id/cnt のみ）',
    !error && Array.isArray(data) && cols === 'cnt,reaction_type_id',
    error ? error.message : `${data?.length ?? 0} 行`,
  );
}

// E. anon の投稿境界
//   正本スキーマは anon の「pending での投稿」を許す設計（BEFORE トリガーが status を
//   pending に矯正 → その後 RLS WITH CHECK(status='pending') が通る）。
//   したがって検証すべき本質は「anon がどう投稿しても、公開コメント(approved)は増えず、
//   pending は anon から一切見えない」こと。投稿が成功するか否かは安全性に無関係。
{
  const beforeApproved =
    ((await anon.from('comments').select('id').eq('work_id', WORK_ID)).data ?? []).length;

  // E1: status='approved' を指定して割り込みを試みる
  const { error: e1 } = await anon.from('comments').insert({
    work_id: WORK_ID,
    comment_type: 'cheer',
    body: 'VERIFY-DELETE-ME approvedで割り込みを試みる',
    status: 'approved',
  });
  // E2: 通常の（pending）投稿
  const { error: e2 } = await anon.from('comments').insert({
    work_id: WORK_ID,
    comment_type: 'cheer',
    body: 'VERIFY-DELETE-ME pendingで投稿',
  });

  const afterRows =
    (await anon.from('comments').select('id, status').eq('work_id', WORK_ID)).data ?? [];
  const anyNonApprovedVisible = afterRows.some((r) => r.status !== 'approved');

  report(
    'E1: anon が status=approved を指定しても公開コメントは増えない（pendingに矯正）',
    afterRows.length === beforeApproved,
    `approved可視数 before=${beforeApproved} after=${afterRows.length}` +
      (e1 ? ` / insert拒否: ${e1.message}` : ' / insertはpendingとして受理'),
  );
  report(
    'E2: anon が投稿したコメントは（成否によらず）anon からは一切見えない',
    !anyNonApprovedVisible,
    e2 ? `insert拒否: ${e2.message}` : 'insert受理だが非可視',
  );

  // E3: anon は既存の pending コメントを approved に書き換えられない
  const { data: updData } = await anon
    .from('comments')
    .update({ status: 'approved' })
    .eq('id', PENDING_COMMENT_ID)
    .select();
  report('E3: anon は pending コメントを承認に書き換えられない', (updData ?? []).length === 0);
}

// F. service role でも INSERT 時は pending に強制される（トリガー検証）
if (serviceKey) {
  const service = createClient(url, serviceKey, { auth: { persistSession: false } });
  const { data, error } = await service
    .from('comments')
    .insert({
      work_id: WORK_ID,
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
