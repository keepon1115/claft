import type { Metadata } from 'next';
import { MobileContainer } from '@/components/MobileContainer';
import { getUpcomingEvents } from '@/lib/googleCalendar';
import NewsClient from '@/components/news/NewsClient';

// 1時間ごとに ISR 再検証（APIコール削減。カレンダーの変更は最大1時間後に反映）
export const revalidate = 3600;

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
