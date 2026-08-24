// 無人島サバイバル 記録LP（/mujinto）の掲載データ。
// 付箋・アンケート回答は原文ママ。誤字・ひらがな・表記ゆれ・全角半角を修正しないこと。
// 分類（黄/緑/オレンジ）も書かれたとおりに置く。内容が分類と合わなくても動かさない。
// 詳細は docs/MUJINTO_LP_SPEC.md §3-2・§4-D1・§4-E を参照。

export type NoteColor = 'yellow' | 'green' | 'orange';

export const NOTE_LABELS: Record<NoteColor, string> = {
  yellow: 'きづいたこと',
  green: 'ぎもんにおもったこと',
  orange: 'くふうしたこと',
};

/** 申込時アンケート「何があれば、無人島で5日間生きていけそう？」回答一覧（原文ママ・26件） */
export const SURVEY_ANSWERS: string[] = [
  'サバイバルナイフ',
  'トラロープ',
  '釣りバリ',
  'ポリ袋',
  '鉄のタコかぎ',
  '釣竿',
  '包丁',
  'まな板',
  '水',
  'お鍋',
  'ライター',
  '服',
  '食べ物',
  '天然水２ℓ3本',
  'コンビニのチョコパン15こ',
  'テント',
  'のこぎり',
  'ナイフ',
  'ハンマー',
  '２ℓの水3本',
  'パン',
  '米',
  'ねぶくろ',
  'Food Drink Axe Sack',
  '食料',
  'たき火',
];

/** ふりかえり付箋（原文ママ・全25件＝黄8／緑8／オレンジ9） */
export const NOTES: { color: NoteColor; text: string }[] = [
  // 黄：きづいたこと（8件）
  { color: 'yellow', text: '少しの材料でも住める家が作れると気づいた' },
  { color: 'yellow', text: '縮尺がちがうとすべてがかわること' },
  { color: 'yellow', text: 'むじんとうは、水をつくるのが、ひつようなのがめんどくさいです' },
  { color: 'yellow', text: 'たおれそうでこわかった' },
  {
    color: 'yellow',
    text: '自分は無人島では生きていけないな…と思いました。あと、皆きょうりょくしてしきってくれる人までいてすごいなあと思いました',
  },
  { color: 'yellow', text: 'すな→じゃり→つち→わた→のじゅんでしたら、ろかそうちになることがわかった。' },
  { color: 'yellow', text: 'ろかが砂とかできんのがすごいと思った。' },
  {
    color: 'yellow',
    text: '家を組み立てる時はそうぞういじょうにむずかしかった。そして水をろかする時のじゅんばんは、わた→炭→砂→土だとわかった',
  },
  // 緑：ぎもんにおもったこと（8件）
  { color: 'green', text: '家のむすび方で、なんでこんなにじょうぶになるの？と思いました。' },
  { color: 'green', text: '強い構造は昔からあるが、誰が思いついたのか…？' },
  { color: 'green', text: 'なぜごみとかがおちるのか' },
  { color: 'green', text: '楽しかった　また　やりたい' },
  { color: 'green', text: '二つ丸太をまくのがわからなかった。もっとおしえてほしい' },
  { color: 'green', text: '水をろかするじゅんばんは、なぜ、わた→炭→砂→土がなのか、ぎもんに思いました。' },
  { color: 'green', text: 'ほんとうの無人島ではなにをつかえるかなーと、思いました。' },
  { color: 'green', text: 'たもつ先生の、のこぎりできるスピードがすごくて、ぎもんにおもった。' },
  // オレンジ：くふうしたこと（9件）
  { color: 'orange', text: 'かべはぼくと友だちで作ったんですが、ぜんたいてきに作るのをくふうしました。' },
  { color: 'orange', text: '柱同士のつなぎ方を工夫しました　つかれた〜' },
  { color: 'orange', text: '家を作るのにくふうした。' },
  { color: 'orange', text: '家を2階立てにして車も作ってみたいです。いすをいたくないようにも作りたい。' },
  { color: 'orange', text: 'わゴムをたてるのは3回まくこと。' },
  { color: 'orange', text: 'どうむすべば強度が出るかな…ってところをかんがえて、くふうしました。' },
  { color: 'orange', text: '家をがんじょうにすることをくふうしました。' },
  { color: 'orange', text: '上にひもを1本ぐるぐるまきにしてがんばった' },
  { color: 'orange', text: '家をつくることがすきだから、がんじょうにしました。' },
];

export const ISLAND_RULES = [
  'この島に正解はありません',
  '見本はあるが手本ではありません',
  'わからんかったらカンニングOK',
] as const;

/** 2〜5日目は makes / question を型に載せない＝誤表示を構造で防ぐ */
export type Day =
  | { day: 1; title: string; done: true; makes: string; question: string }
  | { day: 2 | 3 | 4 | 5; title: string; done: false };

export const DAYS: Day[] = [
  { day: 1, title: 'いきのびる', done: true, makes: '寝床／火／飲み水', question: '何があれば、この島で生きていける？' },
  { day: 2, title: '？？', done: false },
  { day: 3, title: '？？', done: false },
  { day: 4, title: '？？', done: false },
  { day: 5, title: 'かえる', done: false },
];

/**
 * 付箋を3色のラウンドロビン（黄→緑→オレンジ→黄…）で並べ替える。
 * 色ごとに固めると3つの塊に見えて密度が落ちるため、また Math.random() は
 * SSR/CSRで結果がずれてhydration mismatchになるため、決定的な並びにする。
 */
function interleaveByColor(notes: { color: NoteColor; text: string }[]) {
  const order: NoteColor[] = ['yellow', 'green', 'orange'];
  const buckets = order.map((c) => notes.filter((n) => n.color === c));
  const result: typeof notes = [];
  let i = 0;
  while (result.length < notes.length) {
    const bucket = buckets[i % order.length];
    const item = bucket.shift();
    if (item) result.push(item);
    i++;
  }
  return result;
}

export const NOTES_ORDERED = interleaveByColor(NOTES);
