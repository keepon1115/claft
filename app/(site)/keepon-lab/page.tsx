import { Metadata } from 'next';
import { KeepOnLabClient } from '@/components/keepon-lab/KeepOnLabClient';

export const metadata: Metadata = {
  title: 'キープオンラボ | フリースクール',
  description:
    'キミの「好き」を、実験しよう。ここは、正解のない制作所。完成ではなく「修正」を繰り返す。得意を伸ばすためのオンライン・ラボ。大阪府八尾市のフリースクール。',
  openGraph: {
    title: 'キープオンラボ | フリースクール',
    description:
      'キミの「好き」を、実験しよう。ここは、正解のない制作所。得意を伸ばすためのオンライン・ラボ。',
    type: 'website',
  },
};

export default function KeepOnLabPage() {
  return <KeepOnLabClient />;
}

