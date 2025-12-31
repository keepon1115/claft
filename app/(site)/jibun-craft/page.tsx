import { JibunCraftClient } from '@/components/jibun-craft/JibunCraftClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ジブンクラフト | クラフト',
  description: '体験を、自信へ。自分だけの「未来の地図」をクラフトする。クエスト、PBL、Yononaka、ミライクラフト。これまで積み重ねてきたたくさんの「問い」と「実践」が、ここですべてつながり、お子さま独自の強みとして形になります。',
};

export default function JibunCraftPage() {
  return <JibunCraftClient />;
}

