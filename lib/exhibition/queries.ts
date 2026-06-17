import { getAnonClient } from './supabaseServer';
import type {
  Comment,
  Exhibition,
  ReactionCountRow,
  ReactionTally,
  ReactionType,
  Work,
} from './types';

const VISIBLE = ['open', 'closed'];

export async function fetchExhibitionBySlug(slug: string): Promise<Exhibition | null> {
  const supabase = getAnonClient();
  const { data, error } = await supabase
    .from('exhibitions')
    .select('*')
    .eq('slug', slug)
    .in('status', VISIBLE)
    .maybeSingle();
  if (error) throw error;
  return data as Exhibition | null;
}

/** 一覧用。サムネ表示のため work_images も軽く同梱 */
export async function fetchWorks(exhibitionId: string): Promise<Work[]> {
  const supabase = getAnonClient();
  const { data, error } = await supabase
    .from('works')
    .select('*, work_images(id, work_id, url, sort_order)')
    .eq('exhibition_id', exhibitionId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as Work[];
}

export async function fetchWork(workId: string): Promise<Work | null> {
  const supabase = getAnonClient();
  const { data, error } = await supabase
    .from('works')
    .select('*, work_images(id, work_id, url, sort_order)')
    .eq('id', workId)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const work = data as unknown as Work;
  work.work_images = (work.work_images ?? []).sort((a, b) => a.sort_order - b.sort_order);
  return work;
}

/** 公開コメント（RLS でも approved に絞られるが、明示的にも絞る）。作者返信は approved のみ */
export async function fetchApprovedComments(workId: string): Promise<Comment[]> {
  const supabase = getAnonClient();
  const { data, error } = await supabase
    .from('comments')
    .select(
      'id, work_id, comment_type, body, viewer_nickname, status, created_at, reviewed_at, author_replies(id, comment_id, body, status, created_at)',
    )
    .eq('work_id', workId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false });
  if (error) throw error;
  const rows = (data ?? []) as unknown as Comment[];
  // 表示は approved 返信のみ
  for (const c of rows) {
    c.author_replies = (c.author_replies ?? []).filter((r) => r.status === 'approved');
  }
  return rows;
}

export async function fetchReactionTypes(exhibitionId: string): Promise<ReactionType[]> {
  const supabase = getAnonClient();
  const { data, error } = await supabase
    .from('reaction_types')
    .select('*')
    .eq('exhibition_id', exhibitionId)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []) as ReactionType[];
}

/** RPC 集計（reaction_type_id, cnt）と reaction_types をマージして画面表示用に整形 */
export async function fetchReactionTally(
  workId: string,
  reactionTypes: ReactionType[],
): Promise<ReactionTally[]> {
  const supabase = getAnonClient();
  const { data, error } = await supabase.rpc('reaction_counts', { p_work_id: workId });
  if (error) throw error;
  const counts = new Map<string, number>();
  for (const row of (data ?? []) as ReactionCountRow[]) {
    counts.set(row.reaction_type_id, Number(row.cnt));
  }
  return reactionTypes.map((rt) => ({
    reaction_type_id: rt.id,
    emoji: rt.emoji,
    label: rt.label,
    count: counts.get(rt.id) ?? 0,
  }));
}
