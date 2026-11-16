import type { Metadata } from 'next';
import NandemoTenjikaiContent from './NandemoTenjikaiContent';
import { defaultOpenGraph } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'なんでも展示会',
  description:
    '自分の好きなモノ、得意なこと、自由研究、おもしろい遊び、旅行の思い出 ── なんでも自由に伝えられる展示会。年2回（3月・11月）開催。発表が苦手でも、つくったものを送るだけで参加OK。',
  openGraph: {
    ...defaultOpenGraph,
    title: 'なんでも展示会 | CLAFT',
    description:
      'あなたの「好き」を、世界にひらこう。動画でも、紙でも、工作でも ── 持ち寄ったものすべてが主役になる展示会です。',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd trail={[['ミライクラフト', '/futurecraft'], ['なんでも展示会', '/futurecraft/Exhibition']]} />
      <NandemoTenjikaiContent />
    </>
  );
}
