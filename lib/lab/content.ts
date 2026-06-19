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
} as const;

/** ストーリー一覧を返す（単一の真実のソース＝stories.data.ts）。 */
export async function getStories(): Promise<StoryCategory[]> {
  return stories;
}
