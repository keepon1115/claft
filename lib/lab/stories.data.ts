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
  cards: StoryCard[];
};

// 表示順は配列のとおり：① 募集イベント → ② 今週のフォト → ③ 発表会 → ④ Yononaka → ⑤ インタビュー → ⑥ スクール生紹介。
export const stories: StoryCategory[] = [
  {
    slug: 'event',
    label: '募集\nイベント',
    emoji: '📣',
    ring: 'default',
    hpUrl: 'https://claft-hp.vercel.app/news',
    ctaLabel: 'イベント一覧を見る →',
    cards: [
      { id: 'event-1', emoji: '🎪', theme: 'orange', title: '', text: '', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/93f30e89a0f4429e81a0a9e052eb662f/event-0619-1.png' },
      { id: 'event-2', emoji: '🧭', theme: 'navy', title: '', text: ' 英語で遊ぼう！ゲームイベント', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/d06219ce5bf049ea90cdf2aa47382db7/event-0619-2.png' },
      { id: 'event-3', emoji: '🗓️', theme: 'green', title: '', text: '募集中のイベント一覧とカレンダーは、HPのお知らせページからどうぞ。' },
    ],
  },
  {
    slug: 'photo',
    label: '今週の\nフォト',
    emoji: '📸',
    ring: 'default',
    hpUrl: 'https://select-type.com/rsv/?id=3spOTwJvnpQ&c_id=429087',
    ctaLabel: '受講予約はこちら →',
    cards: [
      { id: 'photo-1', emoji: '🎋', theme: 'green', title: '', text: 'スクールの入り口に笹おいてます☺\n「1年後の自分へ」願い事を書いてみましょう！', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/4969bd94156a4348b4459c3021dc7565/photo-0619-1.png' },
      { id: 'photo-2', emoji: '📸', theme: 'navy', title: '', text: 'スクールの入り口に笹おいてます☺\n「1年後の自分へ」願い事を書いてみましょう！', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/49e5427177134d4d9a49b09e73ac890e/photo-0619-2.png' },
    ],
  },
  {
    slug: 'happyokai',
    label: '発表会',
    emoji: '🎤',
    ring: 'alt',
    hpUrl: 'https://x.gd/JfGSk',
    ctaLabel: 'これまでの発表会の様子はこちら →',
    cards: [
      { id: 'happyokai-1', emoji: '🎤', theme: 'navy', title: '', text: '普段のスクールでの活動や、今トコトン没頭していること、大好きなこと、ユニークなアイデアなど──。ジャンルに縛られず、自分の「好き」をなんでも自由に表現しあう場です！「上手くできるかな…」なんて気にしなくて大丈夫。大切なのは、みんなの「これが好き！」「これを作った！」という熱い想いです。', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/eb2a420c610a4d7fb7a6f530cf3368d2/happyoukai-0619-2.png'  },
      { id: 'happyokai-2', emoji: '🌟', theme: 'orange', title: '', text: '3年連続の開催で、今回で4回目になります。' },
    ],
  },
  {
    slug: 'yononaka',
    label: 'Yononaka',
    emoji: '🗣️',
    ring: 'navy',
    hpUrl: 'https://forms.gle/u9DcP6dW5mvXHTKj7',
    ctaLabel: 'Yononakaに参加してみる →',
    cards: [
      { id: 'yononaka-1', emoji: '💭', theme: 'navy', title: 'はたらきがいってなんなん？ ', text: '大人になる前から「はたらく」について学ぶことは、きっと新しくておもしろい発見があるはずです。URCに参加する人もしない人も、当日は楽しくいっぱい話し合いましょう！', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/80e659f5fed64f17b5e4cd1d610ddda7/yononaka-0619.png'   },
    ],
  },
  {
    slug: 'career',
    label: 'インタ\nビュー',
    emoji: '💼',
    ring: 'navy',
    hpUrl: 'https://note.com/yononaka_career/n/n45913c777105',
    ctaLabel: 'お仕事インタビューを読む →',
    cards: [
      { id: 'career-1', emoji: '🍰', theme: 'orange', title: '', text: '今回は、大阪府八尾市で喫茶店「KISSAキッサ ZEROICHIゼロイチ」を営まれている武内さんにご協力いただきました。', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/496f6616f0ea47c2aa45400a635fb9bd/career-0619.png'  },
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
