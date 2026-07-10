// コースの単一ソース。表示（components/courses/CoursesClient.tsx）と
// Course 構造化データ（検索/AIが「オンラインで受けられる講座」を理解する根拠）が
// ここを参照する。表示専用のプロップ（accentRgb/icon 等）も含めてここで一元管理する。

import { SITE_NAME, SITE_URL, absoluteUrl } from './seo';

// schema.org Course の courseMode に対応（online=完全オンライン / blended=対面+オンライン）。
export type CourseMode = 'online' | 'blended' | 'onsite';

export type Course = {
  id: string;
  title: string;
  description: string;
  /** 対象（表示用テキスト） */
  target: string;
  /** 料金（表示用テキスト） */
  price: string;
  /** 構造化データ用の最低料金（数値・JPY）。料金が「〜」や複合の場合の起点額 */
  priceFrom?: number;
  priceLabel?: string;
  priceNote?: string;
  /** 受講形態 */
  mode: CourseMode;
  link: string;
  external?: boolean;
  // --- 以下は表示専用プロップ ---
  ageGroup: string;
  accentRgb: string;
  icon: string;
  tapeClass?: string;
  rotate: string;
  delay: number;
};

export const courses: Course[] = [
  {
    id: 'minecraft-sdgs',
    title: 'マイクラSDGsコース',
    description:
      'マイクラ×SDGs×プログラミングで、楽しみながら新たな価値を生み出そう！SDGsの目標を深く理解し、身近な問題として捉え、創造的な解決策を考え、実行する力を育みます。',
    target: '小学3年生〜',
    price: '¥7,700〜',
    priceFrom: 7700,
    mode: 'blended',
    link: '/minecraft',
    ageGroup: '小学生・中学生向け',
    accentRgb: 'var(--green-rgb)',
    icon: 'gamepad',
    rotate: '-1.2deg',
    delay: 0,
  },
  {
    id: 'career',
    title: 'キャリアコース',
    description: 'PBL(課題解決型学習)・Yononaka(対話ワーク)・ミライクラフト・ジブンクラフトが含まれます。',
    target: '中学生〜',
    price: '¥7,700〜',
    priceFrom: 7700,
    mode: 'online',
    link: '/career',
    ageGroup: '中学生・高校生向け',
    accentRgb: '224 158 22',
    icon: 'compass',
    tapeClass: 'craft-tape--cream',
    rotate: '-0.8deg',
    delay: 180,
  },
  {
    id: 'english-steam',
    title: '英会話×STEAMコース',
    description:
      '「作る → 英語で深める → 発表する」を1ヶ月で1サイクル。ロボットプログラミング×1on1英会話で、英語で自分の意見を語れる力を育てる個別カリキュラムです。内容はお子さまの興味に合わせてカスタマイズできます。',
    target: '小学3年生〜',
    price: '¥11,000 + ¥2,750/回',
    priceFrom: 11000,
    priceNote: 'ロボット月2回 + 英会話チケット制（推奨 月2回）／教材費 ¥13,000（別途）',
    mode: 'online',
    link: '/english-steam',
    ageGroup: '小学生・中学生向け',
    accentRgb: 'var(--brand-rgb)',
    icon: 'mic',
    tapeClass: 'craft-tape--tl',
    rotate: '0.9deg',
    delay: 270,
  },
  {
    id: 'hello-kiwi',
    title: '英会話（Hello Kiwi英会話）',
    description:
      'ニュージーランド育ちの日本人講師と学ぶ英会話。一人ひとりの目標やレベルに合わせてレッスンをカスタマイズ。通学またはオンラインで受講できます。',
    target: '小学生〜大人',
    price: '¥2,750/回',
    priceFrom: 2750,
    priceLabel: '料金',
    priceNote: '50分・チケット制',
    mode: 'blended',
    link: 'https://www.hellokiwieikaiwa.com/',
    external: true,
    ageGroup: '小学生〜大人向け',
    accentRgb: 'var(--green-rgb)',
    icon: 'talk',
    tapeClass: 'craft-tape--green',
    rotate: '-1deg',
    delay: 360,
  },
];

const SCHEMA_COURSE_MODE: Record<CourseMode, string> = {
  online: 'online',
  blended: 'blended',
  onsite: 'onsite',
};

// 各コースを schema.org/Course に変換し、ItemList としてまとめる。
export const coursesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: courses.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Course',
      name: c.title,
      description: c.description,
      url: c.external ? c.link : absoluteUrl(c.link),
      provider: {
        '@type': 'EducationalOrganization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      ...(c.priceFrom
        ? {
            offers: {
              '@type': 'Offer',
              category: c.priceLabel ?? '月額料金',
              price: c.priceFrom,
              priceCurrency: 'JPY',
              availability: 'https://schema.org/InStock',
            },
          }
        : {}),
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: SCHEMA_COURSE_MODE[c.mode],
        ...(c.mode !== 'onsite'
          ? { location: { '@type': 'VirtualLocation', url: SITE_URL } }
          : {}),
      },
    },
  })),
};
