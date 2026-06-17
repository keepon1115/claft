import type { Metadata } from 'next';
import { LabPageHeader } from '@/components/lab/LabPageHeader';
import { RoadmapWalk } from './RoadmapWalk';

export const metadata: Metadata = {
  title: 'ラボの歩き方 | キープオンラボ',
  description:
    'キープオンラボでの学びが、好きなことから発表、イベント、社会課題、キャリアへ広がっていく流れを紹介します。',
};

export default function RoadmapPage() {
  return (
    <>
      <LabPageHeader title="ラボの歩き方" />
      <RoadmapWalk />
    </>
  );
}
