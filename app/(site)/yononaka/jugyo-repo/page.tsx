import type { Metadata } from 'next'
import ReportContent from './ReportContent'

export const metadata: Metadata = {
  title: 'ゲームってなんでおもしろいの？ | Yononaka レポート | CLAFT',
  description:
    '正解がひとつじゃない問いを、みんなで話す。Yononakaの授業レポート。小学生〜大人がまざって、ゲームの"夢中"の仕掛けを考えた90分。',
}

export default function ReportPage() {
  return <ReportContent />
}
