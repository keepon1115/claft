import type { Metadata } from 'next';
import Link from 'next/link';
import { canEditLabStories, readStoryPublication } from '@/lib/lab/story-publication';
import { StoryEditor } from './story-editor';

export const metadata: Metadata = { title: 'ラボストーリーズ管理' };

export default async function LabStoriesAdminPage() {
  let editor: React.ReactNode;
  try {
    if (!await canEditLabStories()) {
      editor = <p role="status">このアカウントにはストーリーズの編集権限がありません。</p>;
    } else {
      const publication = await readStoryPublication();
      editor = <StoryEditor {...publication} />;
    }
  } catch (error) {
    console.error('[lab stories] 管理画面の読み込みに失敗しました', error);
    editor = <p role="alert">ストーリーズを読み込めませんでした。時間をおいて再読み込みしてください。</p>;
  }

  return (
    <section aria-labelledby="lab-stories-heading" className="text-[#1F1810]">
      <header className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[var(--brand)] pb-4">
        <h1 id="lab-stories-heading" className="text-2xl font-bold sm:text-3xl">ラボストーリーズ</h1>
        <Link href="/lab" target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-full border border-black/20 bg-white px-4 text-sm font-bold underline-offset-4 hover:underline">ラボで確認</Link>
      </header>
      {editor}
    </section>
  );
}
