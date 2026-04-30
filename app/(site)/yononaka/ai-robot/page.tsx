import type { Metadata } from 'next'
import AiRobotContent from './AiRobotContent'

export const metadata: Metadata = {
  title: 'AIロボット社会、僕たちはどう生きるか | Yononaka 新シリーズ | CLAFT',
  description:
    'AIが急速に進化する時代に、人間の「存在」「役割」「リテラシー」を考える対話型ワーク。月1回×6ヶ月、オンラインで行う全6回のYononaka新シリーズ。',
}

export default function AiRobotPage() {
  return <AiRobotContent />
}
