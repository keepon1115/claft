import type { Metadata } from 'next'
import ReportContent from './ReportContent'
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'ゲームってなんでおもしろいの？ | Yononaka レポート',
  description:
    '正解がひとつじゃない問いを、みんなで話す。Yononakaの授業レポート。小学生〜大人がまざって、ゲームの"夢中"の仕掛けを考えた90分。',
}

export default function ReportPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[['Yononaka', '/yononaka'], ['授業レポート：ゲームってなんでおもしろいの？', '/yononaka/jugyo-repo']]} />
      <ReportContent />
    </>
  );
}
