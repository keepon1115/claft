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
    updatedAt: '2026-07-08',
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
    updatedAt: '2026-07-29',
    hpUrl: 'https://claft-hp.vercel.app/news',
    ctaLabel: 'イベント一覧を見る →',
    cards: [
      { id: 'event-1', emoji: '🧭', theme: 'navy', title:'', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/0d7230dc70554c0fafe41477a9971f2f/event-8%E6%9C%88%E7%99%BA%E8%A1%A8%E4%BC%9A.png' },
      { id: 'event-2', emoji: '🎪', theme: 'orange', title: '', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/8b557ed224604d8691f8b809eff2926d/event-8%E6%9C%88.png' },
      { id: 'event-3', emoji: '🗓️', theme: 'green', title: '', text: '募集中のイベント一覧とカレンダーは、HPのお知らせページからどうぞ。' },
    ],
  },
  {
    slug: 'photo',
    label: '今週の\nフォト',
    emoji: '📸',
    ring: 'default',
    updatedAt: '2026-07-29',
    hpUrl: 'https://select-type.com/rsv/?id=3spOTwJvnpQ&c_id=429087',
    ctaLabel: '受講予約はこちら →',
    cards: [
      { id: 'photo-1', emoji: '🎋', theme: 'green', title: '', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/4a88c4cfefa6422fbd65e50fef482980/photo-0801.png' },
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
      { id: 'happyokai-1', emoji: '🎤', theme: 'navy', title: '', text: '普段のスクールでの活動や、今トコトン没頭していること、大好きなこと、ユニークなアイデアなど──。ジャンルに縛られず、自分の「好き」をなんでも自由に表現しあう場です！「上手くできるかな…」なんて気にしなくて大丈夫。大切なのは、みんなの「これが好き！」「これを作った！」という熱い想いです。', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/d67c8564800b4d899774e62ce745b60d/%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC.png'  },
      { id: 'happyokai-2', emoji: '🌟', theme: 'orange', title: '', text: '大盛り上がりで過去イチの発表会になりました！アーカイブでご覧ください！' },
    ],
  },
  {
    slug: 'yononaka',
    label: 'Yononaka',
    emoji: '🗣️',
    ring: 'navy',
    updatedAt: '2026-07-29',
    hpUrl: 'https://forms.gle/F8yybf7eV7AKytcw5',
    ctaLabel: 'Yononakaに参加してみる →',
    cards: [
      { id: 'yononaka-1', emoji: '💭', theme: 'navy', title: '', text: '「AIロボット社会、僕たちはどう生きるか」シリーズ。小学生でも参加可能です！', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/65c849b58f5146589863c9924b6c475e/yononaka-0729.png'   },
    ],
  },
  {
    slug: 'career',
    label: 'インタ\nビュー',
    emoji: '💼',
    ring: 'navy',
    updatedAt: '2026-07-16',
    hpUrl: 'https://note.com/yononaka_career/n/n15fceefc4948?magazine_key=m7efb45600c66',
    ctaLabel: 'お仕事インタビューを読む →',
    cards: [
      { id: 'career-1', emoji: '🍰', theme: 'orange', title: '', text: '今回は「食」に関するお仕事。「農家さんと売り場をつなぐ」会社で働いているHさんにお話を伺いました。', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/1d411a9f2ba24fd1bd5d723e3e809d2f/career-0701.png'  },
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
