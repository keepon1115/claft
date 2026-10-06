import type { Metadata } from 'next';
import { LabPageHeader } from '@/components/lab/LabPageHeader';
import { YononakaContent } from './YononakaContent';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Yononaka | キープオンラボ',
  description:
    '正解がひとつじゃない問いに「自分はこう思う！」を持ち寄る時間。毎週更新の「ちょこっとYononaka」に、ひとこと答えてみませんか。',
};

export default function YononakaPage() {
  return (
    <>
      <LabPageHeader title="Yononaka" />
      <YononakaContent />
    </>
  );
}
