export type CommentType = 'cheer' | 'review' | 'question';
export type ContentStatus = 'pending' | 'approved' | 'rejected';

export interface Exhibition {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  is_published: boolean;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
}

export interface Work {
  id: string;
  exhibition_id: string;
  title: string;
  author_name: string;
  author_note: string | null;
  video_url: string | null;
  photos: string[];
  story_process: string | null;
  story_idea: string | null;
  story_struggle: string | null;
  story_learned: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export interface AuthorReply {
  id: string;
  comment_id: string;
  body: string;
  created_at: string;
}

export interface Comment {
  id: string;
  work_id: string;
  comment_type: CommentType;
  body: string;
  display_name: string | null;
  status: ContentStatus;
  created_at: string;
  approved_at: string | null;
  author_replies?: AuthorReply[];
}

export interface ReactionCount {
  kind_id: string;
  emoji: string;
  label: string;
  count: number;
}

export interface ReactionKind {
  id: string;
  emoji: string;
  label: string;
  is_active: boolean;
  sort_order: number;
}

/** コメント種別ごとの表示情報（「問い」は Phase 1 では固定文） */
export const COMMENT_TYPE_META: Record<
  CommentType,
  { label: string; prompt: string }
> = {
  cheer: { label: 'おうえん', prompt: 'いちばん「すごい！」と思ったところは？' },
  review: { label: 'かんそう', prompt: '見て、どんな気持ちになった？' },
  question: { label: 'しつもん', prompt: '作者に聞いてみたいことは？' },
};

export const COMMENT_TYPES: CommentType[] = ['cheer', 'review', 'question'];
