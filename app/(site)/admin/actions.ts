'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getAdminClient, getAdminUser } from '@/lib/exhibition/adminAuth';

/**
 * 運営用サーバーアクション。
 * すべて「ログイン済みユーザーのセッション付きクライアント」で実行するため、
 * 仮にチェックを抜けても RLS（authenticated のみ書き込み可）が最後の砦になる。
 */

async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) redirect('/admin/login');
}

// ---------------------------------------------------------------------------
// 認証
// ---------------------------------------------------------------------------
export async function signIn(formData: FormData) {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  const supabase = getAdminClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect('/admin/login?error=1');
  redirect('/admin');
}

export async function signOut() {
  const supabase = getAdminClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

// ---------------------------------------------------------------------------
// コメントモデレーション
// ---------------------------------------------------------------------------
export async function approveComment(commentId: string) {
  await requireAdmin();
  const supabase = getAdminClient();
  await supabase
    .from('comments')
    .update({ status: 'approved', approved_at: new Date().toISOString() })
    .eq('id', commentId);
  revalidatePath('/admin');
}

export async function rejectComment(commentId: string) {
  await requireAdmin();
  const supabase = getAdminClient();
  await supabase.from('comments').update({ status: 'rejected' }).eq('id', commentId);
  revalidatePath('/admin');
}

// ---------------------------------------------------------------------------
// 展示会
// ---------------------------------------------------------------------------
export async function createExhibition(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get('slug') ?? '').trim();
  const title = String(formData.get('title') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim() || null;
  if (!slug || !title) return;
  const supabase = getAdminClient();
  await supabase.from('exhibitions').insert({ slug, title, description });
  revalidatePath('/admin/exhibitions');
}

export async function setExhibitionPublished(exhibitionId: string, publish: boolean) {
  await requireAdmin();
  const supabase = getAdminClient();
  await supabase.from('exhibitions').update({ is_published: publish }).eq('id', exhibitionId);
  revalidatePath('/admin/exhibitions');
}

// ---------------------------------------------------------------------------
// 作品（作成時に限定URLトークンを発行）
// ---------------------------------------------------------------------------
export async function createWork(exhibitionId: string, formData: FormData) {
  await requireAdmin();
  const title = String(formData.get('title') ?? '').trim();
  const authorName = String(formData.get('author_name') ?? '').trim();
  if (!title || !authorName) return;

  const photos = String(formData.get('photos') ?? '')
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => /^https?:\/\//.test(s));

  const supabase = getAdminClient();
  const { data: work, error } = await supabase
    .from('works')
    .insert({
      exhibition_id: exhibitionId,
      title,
      author_name: authorName,
      author_note: String(formData.get('author_note') ?? '').trim() || null,
      video_url: String(formData.get('video_url') ?? '').trim() || null,
      photos,
      story_process: String(formData.get('story_process') ?? '').trim() || null,
      story_idea: String(formData.get('story_idea') ?? '').trim() || null,
      story_struggle: String(formData.get('story_struggle') ?? '').trim() || null,
      story_learned: String(formData.get('story_learned') ?? '').trim() || null,
      sort_order: Number(formData.get('sort_order') ?? 0) || 0,
    })
    .select('id')
    .single();
  if (error || !work) return;

  // 限定URLトークンを発行（tokenはDB既定値で自動生成）
  await supabase.from('author_tokens').insert({ work_id: work.id });
  revalidatePath(`/admin/exhibitions/${exhibitionId}`);
}

export async function setWorkPublished(workId: string, exhibitionId: string, publish: boolean) {
  await requireAdmin();
  const supabase = getAdminClient();
  await supabase.from('works').update({ is_published: publish }).eq('id', workId);
  revalidatePath(`/admin/exhibitions/${exhibitionId}`);
}

// ---------------------------------------------------------------------------
// リアクション種類
// ---------------------------------------------------------------------------
export async function createReactionKind(formData: FormData) {
  await requireAdmin();
  const emoji = String(formData.get('emoji') ?? '').trim();
  const label = String(formData.get('label') ?? '').trim();
  if (!emoji || !label) return;
  const supabase = getAdminClient();
  await supabase.from('reaction_kinds').insert({
    emoji,
    label,
    sort_order: Number(formData.get('sort_order') ?? 0) || 0,
  });
  revalidatePath('/admin/reactions');
}

export async function setReactionKindActive(kindId: string, active: boolean) {
  await requireAdmin();
  const supabase = getAdminClient();
  await supabase.from('reaction_kinds').update({ is_active: active }).eq('id', kindId);
  revalidatePath('/admin/reactions');
}
