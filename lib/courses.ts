// コースと料金の単一ソース。表示（lib/plans.ts → components/CoursePlans.tsx）と
// Course 構造化データ（検索/AIが「オンラインで受けられる講座」を理解する根拠）が
// ここを参照する。表示専用のプロップ（accentRgb/icon 等）も含めてここで一元管理する。

import { ORG_REF, SITE_URL, absoluteUrl } from './seo';

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
  /** 料金の数値（JPY・税込）。表示（lib/plans.ts）と構造化データの両方がこの値を使う */
  priceFrom: number;
  /** 料金の単位（月額＝'月' / チケット制＝'回'） */
  priceUnit: '月' | '回';
  priceLabel?: string;
  priceNote?: string;
  /** 含まれるもの（基本コースのみ。料金表と構造化データに出す） */
  features?: string[];
  /** 受講形態 */
  mode: CourseMode;
  link: string;
  external?: boolean;
  // --- 以下は表示専用プロップ ---
  ageGroup?: string;
  accentRgb?: string;
  icon?: string;
  tapeClass?: string;
  rotate?: string;
  delay?: number;
};

// 料金体系（2026年11月〜）
//   基本コース：CLAFT通学 ¥7,700／CLAFTオンライン ¥4,400／Yononakaコース ¥2,200（すべて月額・税込）
//   オプション：英会話 ¥2,750/回、マイクラ ¥4,400/月、ロボット ¥4,400/月
// ★料金や含まれるものを変えるときは、この配列だけを直す（表示も JSON-LD もここを参照）。
export const courses: Course[] = [
  {
    id: 'claft-onsite',
    title: 'CLAFT通学',
    description:
      '大阪府八尾市の教室に通うコース。教室（月2回）、Yononaka（月1回）、キャリア面談（年3回）、Ai GROW、発表の場が含まれます。月額7,700円（税込）。',
    target: '小学3年生〜',
    price: '¥7,700/月',
    priceFrom: 7700,
    priceUnit: '月',
    features: ['教室 月2回', 'Yononaka 月1回', 'キャリア面談 年3回', 'Ai GROW', '発表の場'],
    mode: 'blended',
    link: '/courses',
  },
  {
    id: 'claft-online',
    title: 'CLAFTオンライン',
    description:
      '全国どこからでも参加できるオンラインのコース。Yononaka、キャリア面談、Ai GROW、探究の伴走が含まれます。月額4,400円（税込）。',
    target: '小学3年生〜',
    price: '¥4,400/月',
    priceFrom: 4400,
    priceUnit: '月',
    features: ['Yononaka', 'キャリア面談', 'Ai GROW', '探究の伴走'],
    mode: 'online',
    link: '/courses',
  },
  {
    id: 'yononaka-course',
    title: 'Yononakaコース',
    description:
      '正解がひとつではない問いをみんなで話し合う、オンラインの対話ワーク。月1回の本編と、毎週のちょこっとYononakaに参加できます。月額2,200円（税込）。',
    target: '小学生〜',
    price: '¥2,200/月',
    priceFrom: 2200,
    priceUnit: '月',
    features: ['月1回の本編', '毎週のちょこっとYononaka'],
    mode: 'online',
    link: '/yononaka',
  },
  {
    id: 'english-steam',
    title: '英会話コース',
    description: '基本コースに追加できるオプション。ロボットプログラミング×1on1英会話で、英語で自分の意見を語れる力を育てるコースです。',
    target: '小学3年生〜',
    price: '¥2,750/回',
    priceFrom: 2750,
    priceUnit: '回',
    priceLabel: '料金',
    priceNote: 'チケット制（推奨 月2回）',
    mode: 'online',
    link: '/english-steam',
    ageGroup: '小学生・中学生向け',
    accentRgb: 'var(--brand-rgb)',
    icon: 'mic',
    tapeClass: 'craft-tape--tl',
    rotate: '0.9deg',
    delay: 90,
  },
  {
    id: 'minecraft',
    title: 'マイクラコース',
    description: '基本コースに追加できるオプション。マイクラ×SDGs×プログラミングで、楽しみながら新たな価値を生み出そう！',
    target: '小学3年生〜',
    price: '¥4,400/月',
    priceFrom: 4400,
    priceUnit: '月',
    priceLabel: '料金',
    mode: 'blended',
    link: '/minecraft',
    ageGroup: '小学生・中学生向け',
    accentRgb: 'var(--green-rgb)',
    icon: 'gamepad',
    rotate: '-1.2deg',
    delay: 180,
  },
  {
    id: 'robot',
    title: 'ロボットコース',
    description: '基本コースに追加できるオプション。ロボットプログラミングを通して、試行錯誤しながらつくる力を育みます。',
    target: '小学3年生〜',
    price: '¥4,400/月',
    priceFrom: 4400,
    priceUnit: '月',
    priceLabel: '料金',
    mode: 'blended',
    link: '/robot',
    ageGroup: '小学生・中学生向け',
    accentRgb: 'var(--violet-rgb)',
    icon: 'wrench',
    tapeClass: 'craft-tape--violet',
    rotate: '-1deg',
    delay: 270,
  },
];

const SCHEMA_COURSE_MODE: Record<CourseMode, string> = {
  online: 'online',
  blended: 'blended',
  onsite: 'onsite',
};

export const getCourse = (id: string): Course => {
  const course = courses.find((c) => c.id === id);
  if (!course) throw new Error(`courses.ts: unknown course id "${id}"`);
  return course;
};

/** 7700 → "¥7,700" */
export const formatYen = (n: number) => `¥${n.toLocaleString('en-US')}`;

// /courses ページ内での各コースの位置（components/CoursePlans.tsx が同じ id を付ける）。
// Google のコースリストは「全アイテムが同じページ内の固有URL」である必要があるため、
// 詳細ページではなくこのアンカーを Course の url にする。
export const courseAnchor = (id: string) => `/courses#course-${id}`;

// 1コースを schema.org/Course に変換する。
export function courseJsonLd(c: Course) {
  return {
    '@type': 'Course',
    name: c.title,
    description: c.description,
    url: absoluteUrl(courseAnchor(c.id)),
    inLanguage: 'ja',
    provider: ORG_REF,
    ...(c.features ? { teaches: c.features } : {}),
    offers: {
      '@type': 'Offer',
      // Google のコース情報が求める区分（月額＝Subscription／都度払い＝Paid）
      category: c.priceUnit === '月' ? 'Subscription' : 'Paid',
      price: c.priceFrom,
      priceCurrency: 'JPY',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: c.priceFrom,
        priceCurrency: 'JPY',
        unitText: c.priceUnit,
        valueAddedTaxIncluded: true,
      },
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: SCHEMA_COURSE_MODE[c.mode],
      ...(c.mode !== 'onsite'
        ? { location: { '@type': 'VirtualLocation', url: SITE_URL } }
        : {}),
    },
  };
}

// 全コースを ItemList としてまとめる（/courses で出力）。
export const coursesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'CLAFTのコースと料金',
  itemListElement: courses.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: courseJsonLd(c),
  })),
};
