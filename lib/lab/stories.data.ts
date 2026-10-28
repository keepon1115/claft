// ============================================================
// キープオンラボ — ストーリーデータ（単一の真実のソース）
//
// 週次更新は Googleスプレッドシート → AI反映（手順は docs/LAB_STORIES_SHEET_RULES.md）。直接編集してもよいが、その場合はシートも合わせる。
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
  /** 全画面の背景動画（5秒程度推奨・mp4）。指定時はimageUrlより優先して再生される。
   * 置き場所は public/videos/lab-stories/ 配下。パスは /videos/lab-stories/ファイル名.mp4 */
  videoUrl?: string;
  /** このカード専用のCTAボタン遷移先。指定時はカテゴリ共通のhpUrlより優先してこのカードに表示 */
  linkUrl?: string;
  /** このカード専用のCTAボタン文言。linkUrl指定時のみ有効（省略時は「詳細を見る →」） */
  linkLabel?: string;
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

// 表示順は配列のとおり：① 募集イベント → ② 今週のフォト → ③ 発表会 → ④ Yononaka → ⑤ インタビュー → ⑥ スクール生紹介。
// カテゴリに visibleUntil を設定すると、その日付（JST）を過ぎた時点で getStories() のフィルタで自動的に消える（lib/lab/content.ts 参照）。
export const stories: StoryCategory[] = [
  {
    slug: 'event',
    label: '募集\nイベント',
    emoji: '📣',
    ring: 'default',
    updatedAt: '2026-10-28',
    hpUrl: 'https://claft-hp.vercel.app/news',
    ctaLabel: 'イベント一覧を見る →',
    cards: [
      { id: 'event-1', emoji: '🎪', theme: 'orange', title: '', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/7c1a71be96be4116848b0d4b0222c770/Event-1028.png' },
      { id: 'event-2', emoji: '🎪', theme: 'navy', title: '', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/a537b3744b274f7eac89dc15963dfcb7/Event-1028%20(2).png' },
      { id: 'event-3', emoji: '🎪', theme: 'green', title: '', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/53214cf314cb484b8faff9b32c7061c9/Event-1014.png' },
      { id: 'event-4', emoji: '🎪', theme: 'navy', title: '', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/44c8e4ca340d4914881e243ead0ac9a5/Event-1007.png' },
      { id: 'event-5', emoji: '🗓️', theme: 'orange', title: '', text: '募集中のイベント一覧とカレンダーは、HPのお知らせページからどうぞ。' },
    ],
  },
  {
    slug: 'photo',
    label: '今週の\nフォト',
    emoji: '📸',
    ring: 'default',
    updatedAt: '2026-10-28',
    hpUrl: 'https://select-type.com/rsv/?id=3spOTwJvnpQ&c_id=429087',
    ctaLabel: '受講予約はこちら →',
    cards: [
      { id: 'photo-1028', emoji: '🎥', theme: 'orange', title: '', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/98d0f91459564f60854caf81985f6408/photo-1028.png' },
      { id: 'photo-1021', emoji: '🎥', theme: 'navy', title: '', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/512f539ee92e410aa2632979cce630e8/photo-1021.png' },
      { id: 'photo-1014', emoji: '🎥', theme: 'orange', title: '', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/5cc875c48e8449328623353c1099bc87/photo-1014.png' },
      { id: 'photo-1', emoji: '🎋', theme: 'navy', title: '', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/198a96d615684994a6b2e88833b63178/photo-0916%20(2).png' },
    ],
  },
  {
    slug: 'happyokai',
    label: '発表会',
    emoji: '🎤',
    ring: 'alt',
    updatedAt: '2026-10-14',
    hpUrl: 'https://forms.gle/PdD8t3Zyj2bAH9UbA',
    ctaLabel: '作品申し込みはこちら →',
    cards: [
      { id: 'happyokai-1', emoji: '🎤', theme: 'navy', title: '', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/8ce4933e0854400694f7f361e6446218/happyo-1014.png'  },
    ],
  },
  {
    slug: 'yononaka',
    label: 'Yononaka',
    emoji: '🗣️',
    ring: 'navy',
    updatedAt: '2026-10-28',
    hpUrl: 'https://forms.gle/xUYBvkh51LKBeeC2A',
    ctaLabel: 'Yononakaに参加してみる →',
    cards: [
      { id: 'yononaka-1', emoji: '💭', theme: 'navy', title: '', text: 'Yononakaとは、世の中の身近なことをテーマに、正解がひとつでないお題へ 「自分はこう思う！」を参加者同士で共有しながら、理解を深めるアクティブラーニングです。', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/e0897f069da446f98c469838a9150248/yononaka-0902.png', linkUrl: 'https://claft.keeponlearning.fun/lab/yononaka', linkLabel: '今週のお題はこちら →'   },
      { id: 'yononaka-2', emoji: '💭', theme: 'green', title: '', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/8b5b0d7330134f30bda35040862783f1/yono-1028.png', linkUrl: 'https://forms.gle/xUYBvkh51LKBeeC2A', linkLabel: '申込はこちら →'   },
    ],
  },
  {
    slug: 'career',
    label: 'インタ\nビュー',
    emoji: '💼',
    ring: 'navy',
    updatedAt: '2026-10-21',
    hpUrl: 'https://note.com/yononaka_career/n/n6869188d24c3',
    ctaLabel: 'お仕事インタビューを読む →',
    cards: [
      { id: 'career-1', emoji: '🍰', theme: 'orange', title: '', text: '世の中にあるたくさんの仕事について、ちょっと深堀るこの企画。あなたのキャリアや自分らしい生き方を見つめ直すきっかけになれば幸いです。', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/71e79b30435c4725b82898ebe35b2758/career-1021.png'  },
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
