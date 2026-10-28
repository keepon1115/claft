import { PrintSheet, printCss } from '@/components/student-story/PrintSheet';
import { memberStories } from '@/lib/studentData';

export const metadata = { title: 'ストーリー印刷用（全員） | CLAFT', robots: { index: false, follow: false } };

export default function PrintAllPage() {
  return (
    <div className="pr-root">
      <style>{printCss}</style>
      {memberStories.map((s) => (
        <PrintSheet key={s.slug} student={s} />
      ))}
    </div>
  );
}
