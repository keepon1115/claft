import type { Metadata } from 'next';
import { LabPageHeader } from '@/components/lab/LabPageHeader';
import { SummerLabContent } from './SummerLabContent';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: '夏休み特別 | キープオンラボ',
  description:
    '7・8月限定。通常4回分の11,000円（税込）で8回通える夏休み特別チケット。ロボット・ゲームづくり・英会話まで、好きなことを好きなだけ。',
};

export default function SummerLabPage() {
  return (
    <>
      <LabPageHeader title="夏休み特別" />
      <SummerLabContent />
    </>
  );
}
