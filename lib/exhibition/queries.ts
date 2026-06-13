import { getAnonClient } from './supabaseServer';
import type { Comment, Exhibition, ReactionCount, Work } from './types';

/** jsonb の photos を string[] に正規化 */
function normalizeWork(row: Record<string, unknown>): Work {
  const photos = Array.isArray(row.photos)
    ? (row.photos as unknown[]).filter((p): p is string => typeof p === 'string')
    : [];
  return { ...(row as unknown as Work), photos };
}

export async function fetchExhibitionBySlug(slug: string): Promise<Exhibition | null> {
  const supabase = getAnonClient();
  const { data, error } = await supabase
    .from('exhibitions')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();
  if (error) throw error;
  return data as Exhibition | null;
}

export async function fetchWorks(exhibitionId: string): Promise<Work[]> {
  const supabase = getAnonClient();
  const { data, error } = await supabase
    .from('works')
    .select('*')
    .eq('exhibition_id', exhibitionId)
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []).map(normalizeWork);
}

export async function fetchWork(workId: string): Promise<Work | null> {
  const supabase = getAnonClient();
  const { data, error } = await supabase
    .from('works')
    .select('*')
    .eq('id', workId)
    .eq('is_published', true)
    .maybeSingle();
  if (error) throw error;
  return data ? normalizeWork(data) : null;
}

/** 公開コメント（RLS でも approved に絞られるが、明示的にも絞る） */
export async function fetchApprovedComments(workId: string): Promise<Comment[]> {
  const supabase = getAnonClient();
  const { data, error } = await supabase
    .from('comments')
    .select('id, work_id, comment_type, body, display_name, status, created_at, approved_at, author_replies(id, comment_id, body, created_at)')
    .eq('work_id', workId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as Comment[];
}

export async function fetchReactionCounts(workId: string): Promise<ReactionCount[]> {
  const supabase = getAnonClient();
  const { data, error } = await supabase.rpc('reaction_counts', { p_work_id: workId });
  if (error) throw error;
  return (data ?? []).map((r: { kind_id: string; emoji: string; label: string; count: number | string }) => ({
    ...r,
    count: Number(r.count),
  }));
}
