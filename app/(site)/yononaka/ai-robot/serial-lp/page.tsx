import type { Metadata } from 'next'
import SerialLpContent from './SerialLpContent'

export const metadata: Metadata = {
  title: 'AIロボット社会、僕たちはどう生きるか ― 第1回の実況と、第2回参加募集 | CLAFT',
  description:
    '中高生が正解のない問いに向き合う1時間を、実況中継する。Yononaka「AIロボット社会、僕たちはどう生きるか」第1回のハイライトと、2026年7月24日開催・第2回（テーマ：心のかたち）の参加者募集ページ。',
  alternates: { canonical: '/yononaka/ai-robot/serial-lp' },
}

export default function SerialLpPage() {
  return <SerialLpContent />
}
