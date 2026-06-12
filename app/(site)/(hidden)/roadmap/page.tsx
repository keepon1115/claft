import { Metadata } from 'next';
import { RoadmapClient } from '@/components/roadmap/RoadmapClient';

export const metadata: Metadata = {
  title: 'ロードマップ | CLAFT',
  description:
    '「創るのが好き」という力が、どう未来のキャリアへとつながるのか。CLAFTが描く、子供から大人へのロードマップ。',
  openGraph: {
    title: 'ロードマップ | CLAFT',
    description:
      '「創るのが好き」という力が、どう未来のキャリアへとつながるのか。CLAFTが描く、子供から大人へのロードマップ。',
    type: 'website',
  },
};

export default function RoadmapPage() {
  return <RoadmapClient />;
}
