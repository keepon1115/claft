// ============================================================
// キープオンラボ — コンテンツ取得API
//
// 公開ページとクライアントで共通の定数・型。
// ============================================================

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
  reserveEvent: 'https://claft.keeponlearning.fun/news',
  /** 教育・キャリアブログ（CLAFT HP・別タブ） */
  blog: 'https://claft.keeponlearning.fun/blog',
  /** 秋のスクールフェスタ参加申し込み（Googleフォーム・別タブ） */
  schoolFesta: 'https://forms.gle/6oY7gJT1XhenFQEz7',
  /** Google口コミ投稿画面（別タブ） */
  googleReview: 'https://g.page/r/Ce6ZwKqE6aIVEAE/review',
  /** アプリ改善・ご意見フォーム（Googleフォーム・別タブ） */
  appFeedback: 'https://forms.gle/QpHxbHuvRPrHEJh58',
} as const;

/** ストーリーの円に「New」バッジを出す期間（日数）。StoryRail 側で updatedAt と比較する。 */
export const STORY_NEW_BADGE_DAYS = 7;
