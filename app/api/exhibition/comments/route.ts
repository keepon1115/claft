import { NextRequest, NextResponse } from 'next/server';
import { getAnonClient, getServiceClient } from '@/lib/exhibition/supabaseServer';
import { moderateComment } from '@/lib/exhibition/moderation';
import type { CommentType } from '@/lib/exhibition/types';
import { COMMENT_TYPES } from '@/lib/exhibition/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * コメント投稿。
 * 1. anon クライアントで対象作品が公開中であることを確認
 * 2. service role で INSERT（トリガーが status=pending を強制）
 * 3. AIモデレーション: pass なら approved に更新、それ以外は pending のまま
 * レスポンスは常に同じ（投稿者には承認状態を見せない）。
 */
export async function POST(req: NextRequest) {
  let payload: { workId?: string; commentType?: string; body?: string; displayName?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const workId = typeof payload.workId === 'string' ? payload.workId : '';
  const commentType = payload.commentType as CommentType;
  const body = typeof payload.body === 'string' ? payload.body.trim() : '';
  const displayName =
    typeof payload.displayName === 'string' && payload.displayName.trim()
      ? payload.displayName.trim().slice(0, 30)
      : null;

  if (!workId || !COMMENT_TYPES.includes(commentType) || !body || body.length > 500) {
    return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 });
  }

  // 公開中の作品にしか投稿できない（anon = RLS適用で確認）
  const anon = getAnonClient();
  const { data: work } = await anon.from('works').select('id').eq('id', workId).maybeSingle();
  if (!work) {
    return NextResponse.json({ ok: false, error: 'work_not_found' }, { status: 404 });
  }

  const service = getServiceClient();
  const { data: inserted, error: insertError } = await service
    .from('comments')
    .insert({ work_id: workId, comment_type: commentType, body, display_name: displayName })
    .select('id, status')
    .single();
  if (insertError || !inserted) {
    return NextResponse.json({ ok: false, error: 'insert_failed' }, { status: 500 });
  }

  // AIモデレーション（失敗時は flag = pending のまま運営承認待ち）
  const result = await moderateComment({ commentType, body, displayName });
  if (result.decision === 'pass') {
    await service
      .from('comments')
      .update({ status: 'approved', approved_at: new Date().toISOString(), moderation: result })
      .eq('id', inserted.id);
  } else {
    await service.from('comments').update({ moderation: result }).eq('id', inserted.id);
  }

  return NextResponse.json({ ok: true });
}
