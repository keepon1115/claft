// ============================================================
// キープオンラボ — ストーリーデータ（単一の真実のソース）
//
// 週次更新はこのファイルの stories 配列を編集するだけ。
// 形式は固定：ラベル / 絵文字 / リング色 / CTAリンク+文言 / カード（画像・タイトル・本文）。
// 画像は HP・外部アセットの URL を参照する（リポジトリに画像は置かない）。
// ============================================================

/** ストーリーリングの配色バリエーション */
export type RingVariant = 'default' | 'alt' | 'navy';

/** 全画面ビューアの1枚 */
export type StoryCard = {
  id: string;
  title: string;
  text: string;
  emoji: string;
  theme: 'navy' | 'orange' | 'green';
  /** 全画面の背景写真。あれば絵文字の代わりに敷く */
  imageUrl?: string;
};

export type StoryCategory = {
  slug: string;
  /** ストーリーズの円下に出す短いラベル（改行は \n） */
  label: string;
  emoji: string;
  ring: RingVariant;
  /** 円の中のサムネ写真。あれば絵文字の代わりに表示 */
  ringImageUrl?: string;
  /** 最後のカードのCTAボタン遷移先 */
  hpUrl: string;
  /** 最後のカードのCTAボタン文言。省略時は「詳細ページを見る →」 */
  ctaLabel?: string;
  /** この日付（JST・YYYY-MM-DD）まで表示。過ぎたらレール・ビューアから自動で消える */
  visibleUntil?: string;
  /** カードを更新した日（JST・YYYY-MM-DD）。7日以内は円に「New」バッジを自動表示（lib/lab/content.ts参照）。
   * 週次更新でカードの内容を変えたら、この日付も今日の日付に書き換える。 */
  updatedAt?: string;
  cards: StoryCard[];
};

// 表示順は配列のとおり：① 夏休み特別 → ② 募集イベント → ③ 今週のフォト → ④ 発表会 → ⑤ Yononaka → ⑥ インタビュー → ⑦ スクール生紹介。
// 「夏休み特別」は visibleUntil を過ぎると getStories() のフィルタで自動的に消える（lib/lab/content.ts 参照）。
export const stories: StoryCategory[] = [
  {
    slug: 'summer',
    label: '夏休み\n特別',
    emoji: '🌻',
    ring: 'alt',
    visibleUntil: '2026-08-31',
    updatedAt: '2026-08-19',
    hpUrl: '/lab/summer-lab',
    ctaLabel: '夏休み特別ページを見る →',
    cards: [
      {
        id: 'summer-1',
        emoji: '🌻',
        theme: 'orange',
        title: '夏休みだけ！サマプロ・ラボ',
        text: '',
        imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/e3c27814199e4b5588c911121e68e1d7/special.png',
      },
    ],
  },
  {
    slug: 'event',
    label: '募集\nイベント',
    emoji: '📣',
    ring: 'default',
    updatedAt: '2026-08-19',
    hpUrl: 'https://claft-hp.vercel.app/news',
    ctaLabel: 'イベント一覧を見る →',
    cards: [
      { id: 'event-1', emoji: '🧭', theme: 'navy', title:'', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/d02ed777a1b2472c89488ca5357c3076/event-8%E6%9C%8820%E6%97%A5.png' },
      { id: 'event-2', emoji: '🎪', theme: 'orange', title: '', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/28db5447dca0445fba7f1005bd16d818/%E3%83%A9%E3%83%9C%20%E3%82%A2%E3%83%97%E3%83%AA%20%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AA%E3%83%BC%E3%82%BA.png' },
      { id: 'event-3', emoji: '🗓️', theme: 'green', title: '', text: '募集中のイベント一覧とカレンダーは、HPのお知らせページからどうぞ。' },
    ],
  },
  {
    slug: 'photo',
    label: '今週の\nフォト',
    emoji: '📸',
    ring: 'default',
    updatedAt: '2026-08-19',
    hpUrl: 'https://select-type.com/rsv/?id=3spOTwJvnpQ&c_id=429087',
    ctaLabel: '受講予約はこちら →',
    cards: [
      { id: 'photo-1', emoji: '🎋', theme: 'green', title: '', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/fc11a0dc6d8e4db1b3789d8f1bcf4ca3/photo-0801%20(1).png' },
      { id: 'photo-2', emoji: '🎋', theme: 'orange', title: '', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/caf9db60e5d94a5ea1222f401d5b7f16/Original%20robot.png' },
    ],
  },
  {
    slug: 'happyokai',
    label: '発表会',
    emoji: '🎤',
    ring: 'alt',
    updatedAt: '2026-07-29',
    hpUrl: 'https://x.gd/JfGSk',
    ctaLabel: 'これまでの発表会の様子はこちら →',
    cards: [
      { id: 'happyokai-1', emoji: '🎤', theme: 'navy', title: '', text: '普段のスクールでの活動や、今トコトン没頭していること、大好きなこと、ユニークなアイデアなど──。ジャンルに縛られず、自分の「好き」をなんでも自由に表現しあう場です！「上手くできるかな…」なんて気にしなくて大丈夫。大切なのは、みんなの「これが好き！」「これを作った！」という熱い想いです。', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/eb2a420c610a4d7fb7a6f530cf3368d2/happyoukai-0619-2.png'  },
      { id: 'happyokai-2', emoji: '🌟', theme: 'orange', title: '', text: '大盛り上がりで過去イチの発表会になりました！アーカイブでご覧ください！' },
    ],
  },
  {
    slug: 'yononaka',
    label: 'Yononaka',
    emoji: '🗣️',
    ring: 'navy',
    updatedAt: '2026-08-19',
    hpUrl: 'https://forms.gle/caGq2a3Y3PjeiL227',
    ctaLabel: 'Yononakaに参加してみる →',
    cards: [
      { id: 'yononaka-1', emoji: '💭', theme: 'navy', title: '', text: '「うちのまち、なんもないなぁ」と思っているその場所が、誰かにとっては憧れの場所かもしれない —— そんな問いを、コミュニケーションを通して一緒に探っていきます。', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/97ee03f274b547aa9c597818b877635d/yononaka-0819.png'   },
    ],
  },
  {
    slug: 'career',
    label: 'インタ\nビュー',
    emoji: '💼',
    ring: 'navy',
    updatedAt: '2026-08-19',
    hpUrl: 'https://note.com/yononaka_career/n/n436c7431ddd0',
    ctaLabel: 'お仕事インタビューを読む →',
    cards: [
      { id: 'career-1', emoji: '🍰', theme: 'orange', title: '', text: '世の中には私たちの知らない仕事や深い世界がたくさんあります。一人の大人の生き方に迫ったこの記事が、キャリアや自分らしい生き方を見つめ直すきっかけになれば幸いです。', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/78a89155d36241e5b48d5a7a593bea5c/career-0819.png'  },
    ],
  },
  {
    slug: 'students',
    label: 'スクール\n生紹介',
    emoji: '🌱',
    ring: 'alt',
    hpUrl: 'https://claft-hp.vercel.app/student-story',
    ctaLabel: 'CLAFT生のストーリーはこちら →',
    cards: [
      { id: 'students-1', emoji: '🌱', theme: 'green', title: 'CLAFT生の学びの様子', text: '自分だけの学びを深めているスクール生のストーリー。これからどんどん更新していくのでお楽しみに！' },
    ],
  },
];
