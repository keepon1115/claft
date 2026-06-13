import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StoryViewer } from '@/components/lab/StoryViewer';
import { getLabContent } from '@/lib/lab/content';

// ② ストーリー閲覧：全画面スワイプビューア。
// 最後のカードに「詳細ページを見る →」→ CLAFT HP の該当ページへ。

export function generateStaticParams() {
  return getLabContent().stories.map((s) => ({ category: s.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const story = getLabContent().stories.find((s) => s.slug === params.category);
  const label = story ? story.label.replace('\n', '') : 'ストーリー';
  return { title: `${label} | キープオンラボ` };
}

export default function StoryPage({ params }: { params: { category: string } }) {
  const { stories } = getLabContent();
  const idx = stories.findIndex((s) => s.slug === params.category);
  if (idx === -1) notFound();

  // 最後のカードを送ったら次カテゴリへ。最終カテゴリならトップへ戻る。
  const nextSlug = idx < stories.length - 1 ? stories[idx + 1].slug : null;

  return <StoryViewer category={stories[idx]} nextSlug={nextSlug} />;
}
