import { LabHeader } from '@/components/lab/LabHeader';
import { StoryRail } from '@/components/lab/StoryRail';
import { FeedCard } from '@/components/lab/FeedCard';
import { LabTabBar } from '@/components/lab/LabTabBar';
import { LabTutorial } from '@/components/lab/LabTutorial';
import { getLabContent } from '@/lib/lab/content';

// トップ：ヘッダー / ストーリーズ / フィード / 下段固定バー の4ブロック構成。
export default async function LabTopPage() {
  const { stories, posts } = await getLabContent();

  return (
    <>
      <LabHeader />
      <StoryRail stories={stories} />
      <main className="lab-feed">
        <h2 className="lab-feed-h" data-tour="feed">お知らせ・活動報告</h2>
        {posts.map((post) => (
          <FeedCard key={post.id} post={post} />
        ))}
      </main>
      <LabTabBar />
      <LabTutorial />
    </>
  );
}
