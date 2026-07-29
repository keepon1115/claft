export type CommentType = 'cheer' | 'review' | 'question';
export type ContentStatus = 'pending' | 'approved' | 'rejected';
export type ExhibitionStatus = 'draft' | 'open' | 'closed';

export interface Exhibition {
  id: string;
  title: string;
  slug: string;
  theme: string | null;
  status: ExhibitionStatus;
  opens_at: string | null;
  closes_at: string | null;
  created_at: string;
}

export interface WorkImage {
  id: string;
  work_id: string;
  url: string;
  sort_order: number;
}

export interface Work {
  id: string;
  exhibition_id: string;
  title: string;
  author_nickname: string;
  genre: string | null;
  /** コース分けが必要な展示会（ロボット発表会など）でのみ使用。他は null */
  course: string | null;
  thumbnail_url: string | null;
  youtube_url: string | null;
  author_intro: string | null;
  story_made: string | null;
  story_devised: string | null;
  story_struggled: string | null;
  story_learned: string | null;
  created_at: string;
  /** join で同梱される作品写真（sort_order 昇順） */
  work_images?: WorkImage[];
}

export interface ReactionType {
  id: string;
  exhibition_id: string;
  emoji: string;
  label: string | null;
  sort_order: number;
}

export interface AuthorReply {
  id: string;
  comment_id: string;
  body: string;
  status: ContentStatus;
  created_at: string;
}

export interface Comment {
  id: string;
  work_id: string;
  comment_type: CommentType;
  body: string;
  viewer_nickname: string | null;
  status: ContentStatus;
  created_at: string;
  reviewed_at: string | null;
  author_replies?: AuthorReply[];
}

/** RPC reaction_counts の生の返り値 */
export interface ReactionCountRow {
  reaction_type_id: string;
  cnt: number;
}

/** 画面表示用に reaction_types と集計をマージしたもの */
export interface ReactionTally {
  reaction_type_id: string;
  emoji: string;
  label: string | null;
  count: number;
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

/** 制作ストーリーの表示メタ（カラム名 → 見出し） */
export const STORY_FIELDS: { key: keyof Work; label: string }[] = [
  { key: 'story_made', label: 'どうやって作った？' },
  { key: 'story_devised', label: 'くふうしたところ' },
  { key: 'story_struggled', label: 'たいへんだったところ' },
  { key: 'story_learned', label: '学んだこと・気づき' },
];
