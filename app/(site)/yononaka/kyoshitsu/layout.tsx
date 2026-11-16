import type { Metadata } from 'next';
import { defaultOpenGraph } from '@/lib/seo';

// kyoshitsu/page.tsx は 'use client' のため metadata を持てない。ここ（server layout）で付与する。
const TITLE = 'Yononakaを教室・コミュニティに導入する（運営者の方へ）';
const DESCRIPTION =
  '年齢や立場に関係なく、一人ひとりが自分の意見を言い合えるオンラインの対話ワーク「Yononaka」。習い事教室・地域の集まり・オンラインコミュニティなど、団体で導入したい運営者の方に向けて、進め方・テーマ・料金をご案内します。';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { ...defaultOpenGraph, title: TITLE, description: DESCRIPTION },
};

export default function KyoshitsuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
