// Yononakaページ（/lab/yononaka）のデータ。
// 毎週の更新は CHOKOTTO_TOPICS の「先頭」に1行足すだけ（先頭＝最新お題として大きく表示）。

export type ChokottoTopic = {
  no: string;
  title: string;
  formUrl: string;
};

export const CHOKOTTO_TOPICS: ChokottoTopic[] = [
  { no: 'Yo130', title: 'ある日、外国から転校生が来ることになりました！', formUrl: 'https://forms.gle/k14WN63dLqHV1AQv7' },
  { no: 'Yo129', title: 'こんな授業おもろかった！', formUrl: 'https://forms.gle/HR18GFkBqcdHh14Z6' },
  { no: 'Yo128', title: '今の気分を教えて！', formUrl: 'https://forms.gle/ViGdxLJeSYzfa7dc6' },
];

export const YONONAKA_LINKS = {
  /** Yononaka紹介動画 */
  introVideo: 'https://youtu.be/-YyaE1WQ87Y',
  introVideoId: '-YyaE1WQ87Y',
  /** 藤原和博さんの授業動画（370万回再生） */
  fujiwaraVideo: 'https://youtu.be/9VSx2PkoiEw',
  fujiwaraVideoId: '9VSx2PkoiEw',
  /** よのなか科 公式 */
  yononakaNet: 'https://www.yononaka.net/',
  /** 本編申込＝ストーリーズのYononakaの「2枚目」（?card=2）。2枚目の中身が変わっても常にここへ着地する */
  entry: '/lab/story/yononaka?card=2',
} as const;
