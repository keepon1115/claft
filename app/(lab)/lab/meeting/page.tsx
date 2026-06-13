import type { Metadata } from 'next';
import { LabPageHeader } from '@/components/lab/LabPageHeader';
import { MeetingForm } from '@/components/lab/MeetingForm';

export const metadata: Metadata = { title: '面談申込 | キープオンラボ' };

// ④ 面談申込：個別面談のフォーム（送信先はTODO・オーナー確認待ち）
export default function MeetingPage() {
  return (
    <>
      <LabPageHeader title="面談申込" />
      <main className="lab-page-body">
        <p className="lab-lead">
          お子さまの様子や進路のことなど、個別面談で気軽にご相談ください。
          ご希望の日時をもとに、ラボから折り返しご連絡します。
        </p>
        <MeetingForm />
      </main>
    </>
  );
}
