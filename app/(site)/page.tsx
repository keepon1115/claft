import { Hero } from '@/components/Hero';
import { ProgramsScrapbook } from '@/components/ProgramsScrapbook';
import { EntranceDoors } from '@/components/EntranceDoors';
import { Philosophy } from '@/components/Philosophy';
import { FlowApply } from '@/components/FlowApply';
import { FAQ } from '@/components/FAQ';
import { Students } from '@/components/Students';

// 作成したアニメーションコンポーネントをインポート
import { OpeningAnimation } from '@/components/OpeningAnimation';

export default function SiteHome(){
  return (
    <>
      {/* オープニングアニメーションを一番上に配置 
        (処理が終わると自動的に消えます)
      */}
      <OpeningAnimation />

      <Hero />
      <ProgramsScrapbook />
      <Philosophy />
      <EntranceDoors />
      <FlowApply />
      <FAQ />
      <Students />
    </>
  );
}