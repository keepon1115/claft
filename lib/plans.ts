// 料金表（通学／オンライン／Yononaka の3プラン）の表示用データ。
// 料金・名称・含まれるものは lib/courses.ts が単一ソース。ここでは金額を書かない。
// 関連する「4つの学び」のカードは lib/programs.ts の id を参照する。

import { type ProgramId } from './programs';
import { getCourse, formatYen } from './courses';

export type PlanId = 'onsite' | 'online' | 'yononaka';

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
  /** コース名（例：CLAFT通学） */
  name: string;
  /** 通学先／受講エリアの表示（例：大阪府八尾市／全国どこからでも） */
  label: string;
  price: string;
  priceUnit: string;
  /** このプランに含まれるもの */
  features: string[];
  /** くわしく読める「学び」のページ（lib/programs.ts の id） */
  includes: ProgramId[];
  /** 基本コースに追加できるオプション */
  options: PlanOption[];
};

// lib/courses.ts のコース（英会話・マイクラ・ロボット）をオプションとして引く
function courseOption(id: string): PlanOption {
  const course = getCourse(id);
  return { id: course.id, label: course.title, price: course.price, href: course.link, external: course.external };
}

function plan(
  id: PlanId,
  courseId: string,
  rest: Pick<Plan, 'tabLabel' | 'label' | 'includes' | 'options'>
): Plan {
  const course = getCourse(courseId);
  return {
    id,
    name: course.title,
    price: formatYen(course.priceFrom),
    priceUnit: `/ ${course.priceUnit}`,
    features: course.features ?? [],
    ...rest,
  };
}

export const plans: Plan[] = [
  plan('onsite', 'claft-onsite', {
    tabLabel: '通学',
    label: '大阪府八尾市',
    includes: ['yononaka', 'futurecraft', 'pbl', 'jibun-craft'],
    options: [courseOption('english-steam'), courseOption('minecraft'), courseOption('robot')],
  }),
  plan('online', 'claft-online', {
    tabLabel: 'オンライン',
    label: '全国どこからでも',
    includes: ['yononaka', 'pbl', 'jibun-craft'],
    options: [courseOption('english-steam'), courseOption('minecraft')],
  }),
  plan('yononaka', 'yononaka-course', {
    tabLabel: 'Yononaka',
    label: 'オンライン',
    includes: ['yononaka'],
    options: [],
  }),
];
