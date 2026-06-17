'use server';

import { randomBytes } from 'node:crypto';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getAdminClient, getAdminUser } from '@/lib/exhibition/adminAuth';
import type { ExhibitionStatus } from '@/lib/exhibition/types';

/**
 * 運営用サーバーアクション。
 * すべて「ログイン済みユーザーのセッション付きクライアント」で実行するため、
 * 仮にチェックを抜けても RLS（service role 以外は anon 同等＝書き込み不可）が最後の砦になる。
 *
 * 注意: 正本スキーマには「作品個別の公開フラグ」がない。作品の公開可否は
 * 展示会の status（draft/open/closed）で一括制御する設計。
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
    .update({ status: 'approved', reviewed_at: new Date().toISOString() })
    .eq('id', commentId);
  revalidatePath('/admin');
}

export async function rejectComment(commentId: string) {
  await requireAdmin();
  const supabase = getAdminClient();
  await supabase
    .from('comments')
    .update({ status: 'rejected', reviewed_at: new Date().toISOString() })
    .eq('id', commentId);
  revalidatePath('/admin');
}

// ---------------------------------------------------------------------------
// 展示会
// ---------------------------------------------------------------------------
export async function createExhibition(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get('slug') ?? '').trim();
  const title = String(formData.get('title') ?? '').trim();
  const theme = String(formData.get('theme') ?? '').trim() || null;
  if (!slug || !title) return;
  const supabase = getAdminClient();
  await supabase.from('exhibitions').insert({ slug, title, theme });
  revalidatePath('/admin/exhibitions');
}

export async function setExhibitionStatus(exhibitionId: string, status: ExhibitionStatus) {
  await requireAdmin();
  const supabase = getAdminClient();
  await supabase.from('exhibitions').update({ status }).eq('id', exhibitionId);
  revalidatePath('/admin/exhibitions');
}

// ---------------------------------------------------------------------------
// 作品（作成時に限定URLトークンを発行）
// ---------------------------------------------------------------------------
export async function createWork(exhibitionId: string, formData: FormData) {
  await requireAdmin();
  const title = String(formData.get('title') ?? '').trim();
  const authorNickname = String(formData.get('author_nickname') ?? '').trim();
  if (!title || !authorNickname) return;

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
      author_nickname: authorNickname,
      genre: String(formData.get('genre') ?? '').trim() || null,
      thumbnail_url: String(formData.get('thumbnail_url') ?? '').trim() || null,
      youtube_url: String(formData.get('youtube_url') ?? '').trim() || null,
      author_intro: String(formData.get('author_intro') ?? '').trim() || null,
      story_made: String(formData.get('story_made') ?? '').trim() || null,
      story_devised: String(formData.get('story_devised') ?? '').trim() || null,
      story_struggled: String(formData.get('story_struggled') ?? '').trim() || null,
      story_learned: String(formData.get('story_learned') ?? '').trim() || null,
    })
    .select('id')
    .single();
  if (error || !work) return;

  // 写真を work_images に展開
  if (photos.length > 0) {
    await supabase
      .from('work_images')
      .insert(photos.map((url, i) => ({ work_id: work.id, url, sort_order: i })));
  }

  // 限定URLトークンを発行（token は正本スキーマに既定値がないためサーバーで生成）
  const token = randomBytes(24).toString('hex');
  await supabase.from('work_access_tokens').insert({ work_id: work.id, token });
  revalidatePath(`/admin/exhibitions/${exhibitionId}`);
}

export async function deleteWork(workId: string, exhibitionId: string) {
  await requireAdmin();
  const supabase = getAdminClient();
  await supabase.from('works').delete().eq('id', workId);
  revalidatePath(`/admin/exhibitions/${exhibitionId}`);
}

// ---------------------------------------------------------------------------
// リアクション種類（展示会ごと）
// ---------------------------------------------------------------------------
export async function createReactionType(exhibitionId: string, formData: FormData) {
  await requireAdmin();
  const emoji = String(formData.get('emoji') ?? '').trim();
  const label = String(formData.get('label') ?? '').trim() || null;
  if (!emoji) return;
  const supabase = getAdminClient();
  await supabase.from('reaction_types').insert({
    exhibition_id: exhibitionId,
    emoji,
    label,
    sort_order: Number(formData.get('sort_order') ?? 0) || 0,
  });
  revalidatePath('/admin/reactions');
}

export async function deleteReactionType(reactionTypeId: string) {
  await requireAdmin();
  const supabase = getAdminClient();
  await supabase.from('reaction_types').delete().eq('id', reactionTypeId);
  revalidatePath('/admin/reactions');
}
