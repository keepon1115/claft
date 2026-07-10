// 「4つの学び」の単一ソース。TOP（ProgramsScrapbook）・/career・各学びページの
// 所属バッジが、すべてここを参照する。
// PBL・ジブンクラフトはキャリアコース限定。Yononaka・ミライクラフトはどのコースの
// 生徒でも参加できる（openToAll）。

import type { DoodleIconName } from '@/components/craft/DoodleIcon';

export type ProgramId = 'pbl' | 'yononaka' | 'futurecraft' | 'jibun-craft';

export type Program = {
  id: ProgramId;
  title: string;
  label: string;
  description: string;
  icon: DoodleIconName;
  accentRgb: string;
  link: string;
  rotate: string;
  underline: 1 | 2 | 3;
  /** どのコースの生徒でも参加できるか（false＝キャリアコース限定） */
  openToAll: boolean;
};

export const programs: Program[] = [
  {
    id: 'pbl',
    title: 'PBL(課題解決型学習)',
    label: '探究',
    description:
      '自分の好きや疑問を起点にテーマを決め、新たなモノを創ったり、解決策を考え、最後は動画やスライドで発表をする学びです。',
    icon: 'search',
    accentRgb: 'var(--pink-rgb)',
    link: '/pbl',
    rotate: '-1.8deg',
    underline: 1,
    openToAll: false,
  },
  {
    id: 'yononaka',
    title: 'Yononaka(対話ワーク)',
    label: '対話',
    description:
      'お金や時間など、身近なテーマを入り口に、正解がひとつではない問いをみんなで話し合う学びです。考えを言葉にしてみる。ちがう意見を聞いてみる。その往復の中で、世界の見え方が少しずつ広がっていきます。',
    icon: 'talk',
    accentRgb: 'var(--brand-rgb)',
    link: '/yononaka',
    rotate: '1.4deg',
    underline: 2,
    openToAll: true,
  },
  {
    id: 'futurecraft',
    title: 'ミライクラフト',
    label: '実践',
    description:
      '作品発表会、イベント企画、商品制作などに挑戦。自分の好きや得意を活かしながら、仲間と試行錯誤し、「仕事」を実感する学びです。',
    icon: 'bolt',
    // クリームは白文字が沈むため、ラベル/アイコンには深めのアンバーを使う
    accentRgb: '224 158 22',
    link: '/futurecraft',
    rotate: '-1.1deg',
    underline: 3,
    openToAll: true,
  },
  {
    id: 'jibun-craft',
    title: 'ジブンクラフト',
    label: '自己理解',
    description:
      '探究・対話・実践を通して見えてきた「自分の強み(非認知能力)」を可視化します。キャリア面談を通して「自分は何をしたいか？どうありたいか？」を深堀りし、目標を定めて、ひとつひとつキャリアを自分の手でクラフト(創造)していきます。',
    icon: 'sparkle',
    accentRgb: 'var(--violet-rgb)',
    link: '/jibun-craft',
    rotate: '0.9deg',
    underline: 1,
    openToAll: false,
  },
];
