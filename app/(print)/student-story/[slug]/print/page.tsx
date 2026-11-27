import { notFound } from 'next/navigation';
import { PrintSheet, printCss } from '@/components/student-story/PrintSheet';
import { printStories } from '@/lib/studentPrintData';

export const dynamicParams = false;

type PageProps = { params: Promise<{ slug: string }> };

export const metadata = { title: 'ストーリー印刷用', robots: { index: false, follow: false } };

export async function generateStaticParams() {
  return printStories.map((s) => ({ slug: s.slug }));
}

export default async function PrintPage({ params }: PageProps) {
  const { slug } = await params;
  const student = printStories.find((s) => s.slug === slug);
  if (!student) notFound();
  return (
    <div className="pr-root">
      <style dangerouslySetInnerHTML={{ __html: printCss }} />
      <PrintSheet student={student} />
    </div>
  );
}
