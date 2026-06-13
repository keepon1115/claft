import type { Metadata } from 'next';
import { LabPageHeader } from '@/components/lab/LabPageHeader';
import { IdeaForm } from '@/components/lab/IdeaForm';

export const metadata: Metadata = { title: 'アイデア箱 | キープオンラボ' };

// ⑤ アイデア箱：右上の手紙アイコンから。0→1コミュニティの双方向の入口。
export default function IdeaPage() {
  return (
    <>
      <LabPageHeader title="💡 アイデア箱" />
      <main className="lab-page-body">
        <p className="lab-lead">
          「こんなのあったらいいな」「これやってみたい！」を、手紙のようにラボへ送れる場所です。
          スクール生も保護者の方も、どなたでもどうぞ。
        </p>
        <IdeaForm />
      </main>
    </>
  );
}
