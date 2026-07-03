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
    updatedAt: '2026-07-03',
    hpUrl: '/lab/summer-lab',
    ctaLabel: '夏休み特別ページを見る →',
    cards: [
      {
        id: 'summer-1',
        emoji: '🌻',
        theme: 'orange',
        title: '夏休みだけ！サマプロ・ラボ',
        text: '7・8月限定で「8回チケット」が登場！ロボットも、ゲームも、英会話も。好きなことを、好きなだけ楽しもう！\n\n同じ11,000円で、回数2倍。ふだんは4回チケットの11,000円（税込）が、この夏だけ8回に！1回あたり実質半額です。※8回セット購入時のみ\n\n有効期限は8月31日まで。はじめての人も大歓迎！くわしくは特設ページをチェック！',
      },
    ],
  },
  {
    slug: 'event',
    label: '募集\nイベント',
    emoji: '📣',
    ring: 'default',
    updatedAt: '2026-07-03',
    hpUrl: 'https://claft-hp.vercel.app/news',
    ctaLabel: 'イベント一覧を見る →',
    cards: [
      { id: 'event-1', emoji: '🧭', theme: 'navy', title:'秋のスクールフェスタのイベントを企画しよう！', text: '5月から募集していたアイデア、たくさん集まりました！それをみなさんからの投票で、決めていこうと思います！', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/3875755668404419bc2fa8eda354db12/event-0625.png' },
      { id: 'event-2', emoji: '🎪', theme: 'orange', title: 'URC(国際ロボット競技会)', text: 'アーテック主催の国際競技会、今年は10回大会です', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/d61b53eeba6b4fc19d5e6c2327c3553f/event-0704.jpg' },
      { id: 'event-3', emoji: '🗓️', theme: 'green', title: '', text: '募集中のイベント一覧とカレンダーは、HPのお知らせページからどうぞ。' },
    ],
  },
  {
    slug: 'photo',
    label: '今週の\nフォト',
    emoji: '📸',
    ring: 'default',
    updatedAt: '2026-07-03',
    hpUrl: 'https://select-type.com/rsv/?id=3spOTwJvnpQ&c_id=429087',
    ctaLabel: '受講予約はこちら →',
    cards: [
      { id: 'photo-1', emoji: '🎋', theme: 'green', title: 'ゲームまつり', text: 'ゲームを作って、遊んで、交流しました！', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/40b769c3802b474fb62915db4b73eb75/photo-0705-1.jpg' },
      { id: 'photo-2', emoji: '📸', theme: 'navy', title: 'ロボット作りの様子', text: '「ゲームをしたり」「紹介したり」「修正したり」', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/d71a62c0acdb4ff8badcafbcea5f8a68/photo-0705-1%20(2).jpg' },
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
    updatedAt: '2026-07-03',
    hpUrl: 'https://forms.gle/KaP1MpQCQ8VGG1Nt8',
    ctaLabel: 'Yononakaに参加してみる →',
    cards: [
      { id: 'yononaka-1', emoji: '💭', theme: 'navy', title: '中学生以上Yononaka ', text: '「AIロボット社会、僕たちはどう生きるか」シリーズ。小学生でも希望者受け付けます！', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/91cc038a5a9448a4ba2065179f8580f2/yononaka-0701.jpg'   },
    ],
  },
  {
    slug: 'career',
    label: 'インタ\nビュー',
    emoji: '💼',
    ring: 'navy',
    updatedAt: '2026-07-03',
    hpUrl: 'https://note.com/yononaka_career/n/n15fceefc4948?magazine_key=m7efb45600c66',
    ctaLabel: 'お仕事インタビューを読む →',
    cards: [
      { id: 'career-1', emoji: '🍰', theme: 'orange', title: '', text: '今回は「お金」に関するお仕事。島根県の銀行で働いているKさんにお話を伺いました。', imageUrl: 'https://images.microcms-assets.io/assets/92234aa873d84cb78f184180fd146a62/c334fdfd92c24017b1f5a9f089adcb83/career-0701.jpg'  },
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
