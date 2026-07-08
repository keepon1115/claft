import { Hero } from '@/components/Hero';
import { QuickDiagnosis } from '@/components/QuickDiagnosis';
import { ParentVoices } from '@/components/ParentVoices';
import { ProgramsScrapbook } from '@/components/ProgramsScrapbook';
import { Philosophy } from '@/components/Philosophy';
import { CoursePriceGlance } from '@/components/CoursePriceGlance';
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
      <QuickDiagnosis />
      <ParentVoices />
      <ProgramsScrapbook />
      <Philosophy />
      <CoursePriceGlance />
      <FlowApply />
      {/* FAQPage 構造化データはトップでのみ出力（複数ページ重複を回避） */}
      <FAQ jsonLd />
      <Students />
    </>
  );
}
