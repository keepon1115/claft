import type { Metadata } from 'next';
import { MobileContainer } from '@/components/MobileContainer';
import { getUpcomingEvents } from '@/lib/googleCalendar';
import NewsClient from '@/components/news/NewsClient';

// 10分ごとに ISR 再検証（カレンダーの変更は最大10分後に反映）
export const revalidate = 600;

export const metadata: Metadata = {
  title: 'お知らせ・活動報告 | CLAFT',
  description:
    'CLAFTのイベント予定・申し込みと、KEEPON JOURNALおよびWeekly KEEPONの過去配信アーカイブ。申し込み忘れを防ぐためにぜひご活用ください。',
};

export default async function NewsPage() {
  const { events, error } = await getUpcomingEvents();

  return (
    <MobileContainer>
      <NewsClient events={events} fetchError={error} />
    </MobileContainer>
  );
}
