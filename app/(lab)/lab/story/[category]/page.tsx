import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StoryViewer } from '@/components/lab/StoryViewer';
import { getStories } from '@/lib/lab/content';

// ② ストーリー閲覧：全画面スワイプビューア。
// 最後のカードに「詳細ページを見る →」→ CLAFT HP の該当ページへ。

// visibleUntil で自動失効するカテゴリがあるため、ラボトップ（10分）と同じ間隔で再検証する。
export const revalidate = 600;

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((s) => ({ category: s.slug }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const stories = await getStories();
  const story = stories.find((s) => s.slug === params.category);
  const label = story ? story.label.replace('\n', '') : 'ストーリー';
  return { title: `${label} | キープオンラボ` };
}

export default async function StoryPage({ params }: { params: { category: string } }) {
  const stories = await getStories();
  const idx = stories.findIndex((s) => s.slug === params.category);
  if (idx === -1) notFound();

  // 最後のカードを送ったら次カテゴリへ。最終カテゴリならトップへ戻る。
  const nextSlug = idx < stories.length - 1 ? stories[idx + 1].slug : null;

  return <StoryViewer category={stories[idx]} nextSlug={nextSlug} />;
}
