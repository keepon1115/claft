import type { Metadata } from 'next';
import { CoursesClient } from '@/components/courses/CoursesClient';
import { coursesJsonLd } from '@/lib/courses';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'コース・料金',
  description:
    'CLAFTのコースと料金。マイクラSDGs・ロボットプログラミング・キャリア・英会話×STEAMなど、小学3年生〜中高生向けの講座を、八尾の対面教室と全国どこからでも学べるオンラインで提供します。',
  alternates: { canonical: '/courses' },
};

export default function CoursesPage() {
  return (
    <>
      <JsonLd data={coursesJsonLd} />
      <CoursesClient />
    </>
  );
}

