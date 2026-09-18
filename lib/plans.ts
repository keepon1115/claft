// 通学／オンラインの2プランの単一ソース。
// 含まれる「4つの学び」は lib/programs.ts の id を参照し、追加できるオプションコースは
// lib/courses.ts / lib/programs.ts を参照する。料金・文言をここ以外に持たせない。

import { programs, type ProgramId } from './programs';
import { courses } from './courses';

export type PlanId = 'onsite' | 'online';

export type PlanOption = {
  id: string;
  label: string;
  price: string;
  href: string;
  external?: boolean;
};

export type Plan = {
  id: PlanId;
  tabLabel: string;
  label: string;
  note: string;
  price: string;
  priceUnit: string;
  /** lib/programs.ts の id。ぜんぶ込みで受けられる「4つの学び」 */
  includes: ProgramId[];
  /** 基本コースに追加できるオプション */
  options: PlanOption[];
};

// lib/courses.ts のコース（英会話・マイクラ・ロボット）をオプションとして引く
function courseOption(id: string): PlanOption {
  const course = courses.find((c) => c.id === id);
  if (!course) throw new Error(`plans.ts: unknown course id "${id}"`);
  return { id: course.id, label: course.title, price: course.price, href: course.link, external: course.external };
}

// オンラインプランのみで単体受講できる「4つの学び」（ジブンクラフト・PBL）をオプションとして引く
function programOption(id: ProgramId, label: string, price: string): PlanOption {
  const program = programs.find((p) => p.id === id);
  if (!program) throw new Error(`plans.ts: unknown program id "${id}"`);
  return { id: program.id, label, price, href: program.link };
}

export const plans: Plan[] = [
  {
    id: 'onsite',
    tabLabel: '通学',
    label: 'ぜんぶ、通う。',
    note: '八尾教室',
    price: '¥7,700',
    priceUnit: '/ 月',
    includes: ['yononaka', 'futurecraft', 'pbl', 'jibun-craft'],
    options: [courseOption('english-steam'), courseOption('minecraft'), courseOption('robot')],
  },
  {
    id: 'online',
    tabLabel: 'オンライン',
    label: 'ぜんぶ、オンライン。',
    note: '全国どこからでも',
    price: '¥2,200',
    priceUnit: '/ 月',
    includes: ['yononaka', 'futurecraft'],
    options: [
      programOption('jibun-craft', 'ジブンクラフト', '¥1,100/月'),
      programOption('pbl', 'PBL', '¥4,400/月'),
      courseOption('english-steam'),
      courseOption('minecraft'),
    ],
  },
];
