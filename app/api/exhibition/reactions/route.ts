import { NextRequest, NextResponse } from 'next/server';
import { getAnonClient, getServiceClient } from '@/lib/exhibition/supabaseServer';
import {
  getOrCreateVisitorId,
  hashVisitorId,
  setVisitorCookie,
} from '@/lib/exhibition/visitor';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function getCounts(workId: string) {
  const anon = getAnonClient();
  const { data, error } = await anon.rpc('reaction_counts', { p_work_id: workId });
  if (error) throw error;
  return (data ?? []).map((r: { kind_id: string; emoji: string; label: string; count: number | string }) => ({
    ...r,
    count: Number(r.count),
  }));
}

/** 自分が押した顔文字（kind_id の配列）。集計はRPC経由、個別行は返さない */
async function getMine(workId: string, visitorHash: string): Promise<string[]> {
  const service = getServiceClient();
  const { data } = await service
    .from('reactions')
    .select('kind_id')
    .eq('work_id', workId)
    .eq('visitor_hash', visitorHash);
  return (data ?? []).map((r) => r.kind_id as string);
}

/** GET ?workId= … 集計と「自分が押したか」を返す */
export async function GET(req: NextRequest) {
  const workId = req.nextUrl.searchParams.get('workId');
  if (!workId) {
    return NextResponse.json({ ok: false, error: 'missing_work_id' }, { status: 400 });
  }
  try {
    const counts = await getCounts(workId);
    const existing = req.cookies.get('ndj_vid')?.value;
    const mine = existing ? await getMine(workId, hashVisitorId(existing)) : [];
    return NextResponse.json({ ok: true, counts, mine });
  } catch {
    return NextResponse.json({ ok: false, error: 'fetch_failed' }, { status: 500 });
  }
}

/** POST {workId, kindId} … トグル（同じ顔文字は1人1回。もう一度押すと取り消し） */
export async function POST(req: NextRequest) {
  let payload: { workId?: string; kindId?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }
  const { workId, kindId } = payload;
  if (!workId || !kindId) {
    return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 });
  }

  // 公開中の作品・有効なリアクション種別のみ（anon = RLS適用で確認）
  const anon = getAnonClient();
  const [{ data: work }, { data: kind }] = await Promise.all([
    anon.from('works').select('id').eq('id', workId).maybeSingle(),
    anon.from('reaction_kinds').select('id').eq('id', kindId).maybeSingle(),
  ]);
  if (!work || !kind) {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
  }

  const { id: visitorId, isNew } = getOrCreateVisitorId(req);
  const visitorHash = hashVisitorId(visitorId);
  const service = getServiceClient();

  // トグル: 既に押していれば削除、なければ追加（unique制約で連打も1回に収束）
  const { error: insertError } = await service
    .from('reactions')
    .insert({ work_id: workId, kind_id: kindId, visitor_hash: visitorHash });
  if (insertError) {
    if (insertError.code === '23505') {
      await service
        .from('reactions')
        .delete()
        .eq('work_id', workId)
        .eq('kind_id', kindId)
        .eq('visitor_hash', visitorHash);
    } else {
      return NextResponse.json({ ok: false, error: 'write_failed' }, { status: 500 });
    }
  }

  try {
    const counts = await getCounts(workId);
    const mine = await getMine(workId, visitorHash);
    const res = NextResponse.json({ ok: true, counts, mine });
    if (isNew) setVisitorCookie(res, visitorId);
    return res;
  } catch {
    return NextResponse.json({ ok: false, error: 'fetch_failed' }, { status: 500 });
  }
}
