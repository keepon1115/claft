import { NextRequest, NextResponse } from 'next/server';
import { getAnonClient, getServiceClient } from '@/lib/exhibition/supabaseServer';
import {
  getOrCreateVisitorId,
  hashVisitorId,
  setVisitorCookie,
  VISITOR_COOKIE,
} from '@/lib/exhibition/visitor';
import type { ReactionCountRow, ReactionTally, ReactionType } from '@/lib/exhibition/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** work_id → その展示会の reaction_types と RPC 集計をマージして ReactionTally を返す */
async function getTally(workId: string): Promise<ReactionTally[]> {
  const anon = getAnonClient();
  const { data: work } = await anon
    .from('works')
    .select('exhibition_id')
    .eq('id', workId)
    .maybeSingle();
  if (!work) return [];

  const [{ data: types }, { data: counts }] = await Promise.all([
    anon
      .from('reaction_types')
      .select('*')
      .eq('exhibition_id', work.exhibition_id)
      .order('sort_order', { ascending: true }),
    anon.rpc('reaction_counts', { p_work_id: workId }),
  ]);

  const countMap = new Map<string, number>();
  for (const row of (counts ?? []) as ReactionCountRow[]) {
    countMap.set(row.reaction_type_id, Number(row.cnt));
  }
  return ((types ?? []) as ReactionType[]).map((rt) => ({
    reaction_type_id: rt.id,
    emoji: rt.emoji,
    label: rt.label,
    count: countMap.get(rt.id) ?? 0,
  }));
}

/** 自分が押した reaction_type_id の配列（reactions は anon 不可なので service で引く） */
async function getMine(workId: string, fingerprint: string): Promise<string[]> {
  const service = getServiceClient();
  const { data } = await service
    .from('reactions')
    .select('reaction_type_id')
    .eq('work_id', workId)
    .eq('viewer_fingerprint', fingerprint);
  return (data ?? []).map((r) => r.reaction_type_id as string);
}

/** GET ?workId= … 集計と「自分が押したか」を返す */
export async function GET(req: NextRequest) {
  const workId = req.nextUrl.searchParams.get('workId');
  if (!workId) {
    return NextResponse.json({ ok: false, error: 'missing_work_id' }, { status: 400 });
  }
  try {
    const counts = await getTally(workId);
    const existing = req.cookies.get(VISITOR_COOKIE)?.value;
    const mine = existing ? await getMine(workId, hashVisitorId(existing)) : [];
    return NextResponse.json({ ok: true, counts, mine });
  } catch {
    return NextResponse.json({ ok: false, error: 'fetch_failed' }, { status: 500 });
  }
}

/** POST {workId, reactionTypeId} … トグル（同じ顔文字は1人1回。もう一度押すと取り消し） */
export async function POST(req: NextRequest) {
  let payload: { workId?: string; reactionTypeId?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }
  const { workId, reactionTypeId } = payload;
  if (!workId || !reactionTypeId) {
    return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 });
  }

  // 公開中の作品・その展示会の有効なリアクション種別のみ（anon = RLS適用で確認）
  const anon = getAnonClient();
  const [{ data: work }, { data: rtype }] = await Promise.all([
    anon.from('works').select('id').eq('id', workId).maybeSingle(),
    anon.from('reaction_types').select('id').eq('id', reactionTypeId).maybeSingle(),
  ]);
  if (!work || !rtype) {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
  }

  const { id: visitorId, isNew } = getOrCreateVisitorId(req);
  const fingerprint = hashVisitorId(visitorId);
  const service = getServiceClient();

  // トグル: 既に押していれば削除、なければ追加（unique制約で連打も1回に収束）
  const { error: insertError } = await service
    .from('reactions')
    .insert({ work_id: workId, reaction_type_id: reactionTypeId, viewer_fingerprint: fingerprint });
  if (insertError) {
    if (insertError.code === '23505') {
      await service
        .from('reactions')
        .delete()
        .eq('work_id', workId)
        .eq('reaction_type_id', reactionTypeId)
        .eq('viewer_fingerprint', fingerprint);
    } else {
      return NextResponse.json({ ok: false, error: 'write_failed' }, { status: 500 });
    }
  }

  try {
    const counts = await getTally(workId);
    const mine = await getMine(workId, fingerprint);
    const res = NextResponse.json({ ok: true, counts, mine });
    if (isNew) setVisitorCookie(res, visitorId);
    return res;
  } catch {
    return NextResponse.json({ ok: false, error: 'fetch_failed' }, { status: 500 });
  }
}
