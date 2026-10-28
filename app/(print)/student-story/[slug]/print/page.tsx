import { notFound } from 'next/navigation';
import { PrintSheet, printCss } from '@/components/student-story/PrintSheet';
import { memberStories } from '@/lib/studentData';

export const dynamicParams = false;

type PageProps = { params: Promise<{ slug: string }> };

export const metadata = { title: 'ストーリー印刷用 | CLAFT', robots: { index: false, follow: false } };

export async function generateStaticParams() {
  return memberStories.map((s) => ({ slug: s.slug }));
}

export default async function PrintPage({ params }: PageProps) {
  const { slug } = await params;
  const student = memberStories.find((s) => s.slug === slug);
  if (!student) notFound();
  return (
    <div className="pr-root">
      <style>{printCss}</style>
      <PrintSheet student={student} />
    </div>
  );
}
