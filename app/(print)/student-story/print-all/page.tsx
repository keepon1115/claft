import { PrintSheet, printCss } from '@/components/student-story/PrintSheet';
import { printStories } from '@/lib/studentPrintData';

export const metadata = { title: 'ストーリー印刷用（全員）', robots: { index: false, follow: false } };

export default function PrintAllPage() {
  return (
    <div className="pr-root">
      <style dangerouslySetInnerHTML={{ __html: printCss }} />
      {printStories.map((s) => (
        <PrintSheet key={s.slug} student={s} />
      ))}
    </div>
  );
}
