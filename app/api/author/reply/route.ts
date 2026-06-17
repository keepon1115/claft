import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/exhibition/supabaseServer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * 作者の返信。限定URLトークンの解決はこのサーバー内でのみ行う。
 * - work_access_tokens から token → work_id を service role で解決
 * - 返信先コメントがその作品の approved コメントであることを確認してから INSERT
 */
export async function POST(req: NextRequest) {
  let payload: { token?: string; commentId?: string; body?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const token = typeof payload.token === 'string' ? payload.token : '';
  const commentId = typeof payload.commentId === 'string' ? payload.commentId : '';
  const body = typeof payload.body === 'string' ? payload.body.trim() : '';
  if (!token || !commentId || !body || body.length > 1000) {
    return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 });
  }

  const service = getServiceClient();

  const { data: tokenRow } = await service
    .from('work_access_tokens')
    .select('work_id')
    .eq('token', token)
    .maybeSingle();
  if (!tokenRow) {
    return NextResponse.json({ ok: false, error: 'invalid_token' }, { status: 404 });
  }

  const { data: comment } = await service
    .from('comments')
    .select('id')
    .eq('id', commentId)
    .eq('work_id', tokenRow.work_id)
    .eq('status', 'approved')
    .maybeSingle();
  if (!comment) {
    return NextResponse.json({ ok: false, error: 'comment_not_found' }, { status: 404 });
  }

  // 作者返信は status='approved' 既定で投稿（正本スキーマの既定値どおり）
  const { error } = await service
    .from('author_replies')
    .insert({ comment_id: commentId, body });
  if (error) {
    return NextResponse.json({ ok: false, error: 'insert_failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
