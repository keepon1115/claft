// ============================================================
// キープオンラボ — コンテンツデータ（段階1：ダミー直書き）
//
// 将来 CLAFT HP の記事データ / Google カレンダーに差し替えるため、
// 取得は getLabContent() の1関数に集約する（仕様の指示）。
// ============================================================

/** ストーリーリングの配色バリエーション */
export type RingVariant = 'default' | 'alt' | 'navy';

/** 全画面ビューアの1枚（最後のカードに「詳細ページを見る →」が付く） */
export type StoryCard = {
  id: string;
  title: string;
  text: string;
  emoji: string;
  theme: 'navy' | 'orange' | 'green';
};

export type StoryCategory = {
  slug: string;
  /** ストーリーズの円下に出す短いラベル（改行は \n） */
  label: string;
  emoji: string;
  ring: RingVariant;
  /** 最後のカード「詳細ページを見る →」の遷移先（CLAFT HP） */
  hpUrl: string;
  cards: StoryCard[];
};

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
  /** くわしく見る → の遷移先（CLAFT HP 等） */
  href: string;
};

export type LabContent = {
  stories: StoryCategory[];
  posts: FeedPost[];
};

/** 外部リンク（仕様で確定済み） */
export const EXTERNAL_LINKS = {
  /** 受講予約（select-type・別タブ） */
  reserveLesson: 'https://select-type.com/rsv/?id=3spOTwJvnpQ&c_id=429087',
  /** イベント予約（CLAFT HP /news） */
  reserveEvent: 'https://claft-hp.vercel.app/news',
} as const;

const stories: StoryCategory[] = [
  {
    slug: 'event',
    label: '募集\nイベント',
    emoji: '📣',
    ring: 'default',
    hpUrl: 'https://claft-hp.vercel.app/news',
    cards: [
      { id: 'event-1', emoji: '🎪', theme: 'orange', title: '7月「なんでも発表会」', text: 'つくったもの・調べたこと、なんでもOK。参加者募集がスタートしました！' },
      { id: 'event-2', emoji: '🧭', theme: 'navy', title: '夏の自由研究ラボ', text: '夏休みの自由研究を、ラボのみんなと一気に進める2日間。詳細は近日公開。' },
      { id: 'event-3', emoji: '🗓️', theme: 'green', title: '今月の予定はこちら', text: '募集中のイベント一覧とカレンダーは、HPのお知らせページからどうぞ。' },
    ],
  },
  {
    slug: 'happyokai',
    label: '発表会',
    emoji: '🎤',
    ring: 'alt',
    hpUrl: 'https://claft-hp.vercel.app/news',
    cards: [
      { id: 'happyokai-1', emoji: '🎤', theme: 'navy', title: '前回の「なんでも発表会」より', text: '小3のマイクラ建築解説から中2の小説朗読まで。全12組が発表しました。' },
      { id: 'happyokai-2', emoji: '🌟', theme: 'orange', title: '発表のコツ、配布中', text: '「声の大きさより、好きの大きさ」。発表が初めてでも大丈夫な資料があります。' },
    ],
  },
  {
    slug: 'career',
    label: 'キャリア\nインタ',
    emoji: '💼',
    ring: 'navy',
    hpUrl: 'https://claft-hp.vercel.app/student-story',
    cards: [
      { id: 'career-1', emoji: '🍰', theme: 'orange', title: 'vol.12 パティシエという仕事', text: '「好き」を仕事にした先輩に、しんどさも楽しさも聞きました。' },
      { id: 'career-2', emoji: '🎮', theme: 'navy', title: 'vol.11 ゲームプランナー', text: '遊ぶ側からつくる側へ。企画書づくりの裏側をのぞかせてもらいました。' },
      { id: 'career-3', emoji: '🔭', theme: 'green', title: '次回はだれに聞く？', text: '「この仕事の人に聞いてみたい！」をアイデア箱で募集しています。' },
    ],
  },
  {
    slug: 'students',
    label: 'スクール\n生紹介',
    emoji: '🌱',
    ring: 'alt',
    hpUrl: 'https://claft-hp.vercel.app/student-story',
    cards: [
      { id: 'students-1', emoji: '🛠️', theme: 'green', title: 'ゲームをつくる小5', text: '「失敗してもデバッグすればいい」。彼の口ぐせに、学びの本質がありました。' },
      { id: 'students-2', emoji: '📚', theme: 'navy', title: '歴史マニアの中1', text: '戦国武将の家紋を全部描けるようになった彼女の、次の野望とは。' },
    ],
  },
  {
    slug: 'yononaka',
    label: 'Yononaka',
    emoji: '🗣️',
    ring: 'navy',
    hpUrl: 'https://claft-hp.vercel.app/yononaka',
    cards: [
      { id: 'yononaka-1', emoji: '💭', theme: 'navy', title: '「はたらくって何だろう？」', text: '6月のYononakaは、答えがひとつじゃない問いにみんなで向き合いました。' },
      { id: 'yononaka-2', emoji: '🙋', theme: 'orange', title: '次回テーマ募集中', text: '次に話したいテーマはある？　アイデア箱で待っています。' },
    ],
  },
  {
    slug: 'photo',
    label: '今週の\nフォト',
    emoji: '📸',
    ring: 'default',
    hpUrl: 'https://claft-hp.vercel.app/keepon-lab',
    cards: [
      { id: 'photo-1', emoji: '⛏️', theme: 'green', title: 'マイクラSDGsチーム', text: '白熱の作戦会議。お子さんの「夢中」が見える1コマです。' },
      { id: 'photo-2', emoji: '✂️', theme: 'orange', title: '工作テーブルのいま', text: 'ダンボール都市、ついに高架鉄道が開通しました。' },
      { id: 'photo-3', emoji: '🌤️', theme: 'navy', title: '帰りぎわの一枚', text: '「またね！」の瞬間がいちばんいい顔だったりします。' },
    ],
  },
];

const posts: FeedPost[] = [
  {
    id: 'post-001',
    categorySlug: 'event',
    categoryLabel: '募集イベント',
    title: '7月「なんでも発表会」参加者募集スタート',
    excerpt: 'つくったもの・調べたこと、なんでもOK。発表のコツも事前に配ります。',
    date: '2026.06.10',
    emoji: '🎪',
    thumbTheme: 'orange',
    href: 'https://claft-hp.vercel.app/news',
  },
  {
    id: 'post-002',
    categorySlug: 'photo',
    categoryLabel: '今週のスクールフォト',
    title: '今週のラボの様子をお届け',
    excerpt: 'マイクラSDGsチームの白熱した1コマ。お子さんの「夢中」が見えます。',
    date: '2026.06.09',
    emoji: '📸',
    thumbTheme: 'green',
    href: 'https://claft-hp.vercel.app/keepon-lab',
  },
  {
    id: 'post-003',
    categorySlug: 'career',
    categoryLabel: 'キャリアインタビュー',
    title: 'vol.12 「パティシエという仕事」公開',
    excerpt: '好きを仕事にした先輩の話。斜めの大人に出会える連載です。',
    date: '2026.06.06',
    emoji: '💼',
    thumbTheme: 'navy',
    href: 'https://claft-hp.vercel.app/student-story',
  },
  {
    id: 'post-004',
    categorySlug: 'yononaka',
    categoryLabel: 'Yononaka',
    title: '6月のYononaka「はたらくって何だろう？」開催レポ',
    excerpt: '答えがひとつじゃない問いに、みんなで向き合った90分の記録。',
    date: '2026.06.03',
    emoji: '🗣️',
    thumbTheme: 'navy',
    href: 'https://claft-hp.vercel.app/yononaka',
  },
  {
    id: 'post-005',
    categorySlug: 'students',
    categoryLabel: 'スクール生紹介',
    title: 'スクール生インタビュー：ゲームをつくる小5のひみつ基地',
    excerpt: '「失敗してもデバッグすればいい」。彼の口ぐせに学びの本質がありました。',
    date: '2026.05.30',
    emoji: '🌱',
    thumbTheme: 'green',
    href: 'https://claft-hp.vercel.app/student-story',
  },
];

/**
 * ラボの全コンテンツを返す。
 * 段階2（HP記事・Googleカレンダー連携）ではこの関数の中身だけを
 * fetch 実装に差し替える。呼び出し側は変更しないこと。
 */
export function getLabContent(): LabContent {
  return { stories, posts };
}
