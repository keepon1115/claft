import { PlayClaftClient } from '@/components/play-claft/PlayClaftClient';

export const metadata = { 
  title: 'PLAY CLAFT（スクールフェスタ計画） | CLAFT',
  description: 'ミライクラフトのスクールフェスタ計画。遊ぶ人から遊びをつくる人へ。STEP1/STEP2/STEP3の流れとスケジュールを確認できます。'
};

export default function PlayClaftPage(){
  return <PlayClaftClient />;
}
