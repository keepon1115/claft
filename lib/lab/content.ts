// ============================================================
// キープオンラボ — コンテンツ取得API
//
// ストーリーは stories.data.ts を単一の真実のソースとして返す。
// （microCMS 連携は廃止。週次更新は stories.data.ts を直接編集する）
// ============================================================

import { stories, type StoryCategory } from './stories.data';

// ストーリー系の型は stories.data.ts に集約。利用側の import 互換のため再エクスポートする。
export type { RingVariant, StoryCard, StoryCategory } from './stories.data';

/** フィード投稿（FeedCard 用の型）。 */
export type FeedPost = {
  id: string;
  categorySlug: string;
  categoryLabel: string;
  title: string;
  excerpt: string;
  /** YYYY.MM.DD */
  date: string;
  emoji: string;
  thumbTheme: 'navy' | 'orange' | 'green';
  /** 実写真サムネ。あれば絵文字+グラデの代わりに表示 */
  thumbnailUrl?: string;
  /** くわしく見る → の遷移先（CLAFT HP 等） */
  href: string;
};

/** 外部リンク（仕様で確定済み） */
export const EXTERNAL_LINKS = {
  /** 受講予約（select-type・別タブ） */
  reserveLesson: 'https://select-type.com/rsv/?id=3spOTwJvnpQ&c_id=429087',
  /** イベント予約（CLAFT HP /news） */
  reserveEvent: 'https://claft-hp.vercel.app/news',
  /** 教育・キャリアブログ（CLAFT HP・別タブ） */
  blog: 'https://claft.keeponlearning.fun/blog',
} as const;

/** ストーリーの円に「New」バッジを出す期間（日数）。StoryRail 側で updatedAt と比較する。 */
export const STORY_NEW_BADGE_DAYS = 7;

/** ストーリー一覧を返す（単一の真実のソース＝stories.data.ts）。
 * visibleUntil（JST）を過ぎたカテゴリは自動的に除外する。 */
export async function getStories(): Promise<StoryCategory[]> {
  const todayJst = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
  return stories.filter((s) => !s.visibleUntil || s.visibleUntil >= todayJst);
}
