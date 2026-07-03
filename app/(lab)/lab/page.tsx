import { LabHeader } from '@/components/lab/LabHeader';
import { StoryRail } from '@/components/lab/StoryRail';
import { LabNewsCard } from '@/components/lab/LabNewsCard';
import { LabBlogBanner } from '@/components/lab/LabBlogBanner';
import { LabTabBar } from '@/components/lab/LabTabBar';
import { LabTutorial } from '@/components/lab/LabTutorial';
import { getStories } from '@/lib/lab/content';
import { getUpcomingEvents } from '@/lib/googleCalendar';

// カレンダーの変更は最大10分後に反映（googleCalendar 側 ISR と揃える）
export const revalidate = 600;

// トップ：ヘッダー / ストーリーズ / お知らせ（キープオンカレンダー） / 下段固定バー の4ブロック構成。
export default async function LabTopPage() {
  const [stories, { events, error }] = await Promise.all([
    getStories(),
    getUpcomingEvents(),
  ]);

  // 「キープオン」のタグ＝キープオンカレンダーの予定（source: 'keepon'）だけ表示する。
  const keeponEvents = events.filter((e) => e.source === 'keepon');

  return (
    <>
      <LabHeader />
      <StoryRail stories={stories} />
      <main className="lab-feed">
        <h2 className="lab-feed-h" data-tour="feed">お知らせ・活動報告</h2>
        <LabBlogBanner />
        {keeponEvents.length > 0 ? (
          keeponEvents.map((event, i) => <LabNewsCard key={event.id} event={event} index={i} />)
        ) : (
          <p className="lab-feed-empty">
            {error
              ? 'お知らせの読み込みに失敗しました。少し時間をおいてお試しください。'
              : 'いまは予定されているお知らせはありません。新しい予定が入るとここに表示されます。'}
          </p>
        )}
      </main>
      <LabTabBar />
      <LabTutorial />
    </>
  );
}
