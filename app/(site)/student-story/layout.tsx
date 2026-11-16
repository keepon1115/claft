import type { Metadata } from 'next';
import { defaultOpenGraph } from '@/lib/seo';

// student-story/page.tsx は 'use client' のため metadata を持てない。ここ（server layout）で付与する。
// 配下の [slug]（各メンバーのページ）は自分の title / description で上書きする。
const TITLE = 'メンバーのストーリー';
const DESCRIPTION =
  'CLAFTで学ぶスクール生が、どのように成長しているのかをご紹介します。ゲーム・ものづくり・ロボット・スポーツ・音楽など、一人ひとりの「好き」から始まる探究のストーリーです。';

export const metadata: Metadata = {
  // 文字列で書くと配下ページでルートの template（| CLAFT）が切れるため、template を引き継ぐ形にする。
  title: { default: TITLE, template: '%s | CLAFT' },
  description: DESCRIPTION,
  openGraph: { ...defaultOpenGraph, title: TITLE, description: DESCRIPTION },
};

export default function StudentStoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
