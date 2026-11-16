import type { Metadata } from 'next';
import { defaultOpenGraph } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { StudentStoryIndex } from './StudentStoryIndex';

const TITLE = 'メンバーのストーリー';
const DESCRIPTION =
  'CLAFTで学ぶスクール生が、どのように成長しているのかをご紹介します。ゲーム・ものづくり・ロボット・スポーツ・音楽など、一人ひとりの「好き」から始まる探究のストーリーです。';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { ...defaultOpenGraph, title: TITLE, description: DESCRIPTION },
};

export default function StudentStoryIndexPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[['メンバーのストーリー', '/student-story']]} />
      <StudentStoryIndex />
    </>
  );
}
