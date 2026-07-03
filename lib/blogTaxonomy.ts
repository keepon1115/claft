// ブログのカテゴリ体系（単一ソース）。Notion の Category 選択肢とここを必ず一致させる。
// クライアントコンポーネントからも import するため、サーバー専用の依存を置かないこと。

export type BlogCategory = {
  /** Notion の Category select と完全一致させる表示名 */
  name: string;
  /** URL 用 slug（/blog/category/[slug]） */
  slug: string;
  /** カテゴリページの meta description 兼リード文 */
  description: string;
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    name: '子育て',
    slug: 'kosodate',
    description:
      '「やりたいことがない」「自信が持てない」「朝起きられない」——子どもの悩みへの向き合い方や、不登校を含む家庭でのかかわり方を、探究スクールCLAFTの視点で考えます。',
  },
  {
    name: 'AI・ロボット時代の学び',
    slug: 'ai-robot',
    description:
      'AIやロボットと共に生きるこれからの子どもたちに、どんな力が必要か。生成AIの活用法から「AIに代われない力」の育て方まで、現場の実践とともに解説します。',
  },
  {
    name: '探究・対話の実践',
    slug: 'tankyu-taiwa',
    description:
      'Yononaka（対話ワーク）やPBL（課題解決型学習）の現場から。子どもたちの実際の対話・作品・変化を通じて、探究の学びをレポートします。',
  },
  {
    name: '教育を考える',
    slug: 'kyoiku',
    description:
      '正解主義はいつ始まったのか。学びの本質とは何か。日本の教育を歴史や仕組みから捉え直し、これからの学びを考えます。',
  },
  {
    name: '習い事・スクール選び',
    slug: 'naraigoto',
    description:
      '塾以外の選択肢、オンラインスクールの選び方、探究型の習い事の見極め方。小5〜中3の保護者向けに、子どもの「考える力」が伸びる環境の選び方を解説します。',
  },
];

export const getCategoryBySlug = (slug: string) =>
  BLOG_CATEGORIES.find((c) => c.slug === slug);

export const getCategoryByName = (name: string | null) =>
  name ? BLOG_CATEGORIES.find((c) => c.name === name) : undefined;

// '2026-07-03' → '2026-07'
export const monthOf = (iso: string | null) => (iso ? iso.slice(0, 7) : '');

// '2026-07' → '2026年7月'
export const monthLabel = (month: string) => {
  const [y, m] = month.split('-');
  return `${y}年${Number(m)}月`;
};
