import type { Metadata } from 'next'
import { defaultOpenGraph } from '@/lib/seo'
import AiRobotContent from './AiRobotContent'
import { BreadcrumbJsonLd } from '@/components/JsonLd';

const TITLE = 'AIロボット社会、僕たちはどう生きるか｜Yononaka 全6回の対話ワーク'
const DESCRIPTION =
  'AIとロボットが急速に進化する時代に、人間の「存在」「役割」「リテラシー」を考えるYononakaの新シリーズ。正解のない問いにみんなで意見を出し合う、オンラインの対話型ワーク（月1回・全6回・1回75分）です。'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { ...defaultOpenGraph, title: TITLE, description: DESCRIPTION },
}

export default function AiRobotPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[['Yononaka', '/yononaka'], ['AIロボット社会、僕たちはどう生きるか', '/yononaka/ai-robot']]} />
      <AiRobotContent />
    </>
  );
}
