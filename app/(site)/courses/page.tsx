import type { Metadata } from 'next';
import { CoursesClient } from '@/components/courses/CoursesClient';
import { coursesJsonLd } from '@/lib/courses';
import { JsonLd } from '@/components/JsonLd';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'コース・料金',
  description:
    'CLAFTのコースと料金。CLAFT通学（月7,700円）・CLAFTオンライン（月4,400円）・Yononakaコース（月2,200円）に、英会話・マイクラ・ロボットのオプションを自由に組み合わせられます。小学3年生〜中高生向け、八尾の対面教室と全国どこからでも学べるオンラインで提供します。',
  alternates: { canonical: '/courses' },
};

export default function CoursesPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[['コース・料金', '/courses']]} />
    <>
      <JsonLd data={coursesJsonLd} />
      <CoursesClient />
    </>
    </>
  );
}

