'use server';

import { revalidatePath, updateTag } from 'next/cache';
import { z } from 'zod';
import { getServiceClient } from '@/lib/exhibition/supabaseServer';
import { canEditLabStories, readStoryPublication, STORY_PUBLICATION_TAG } from '@/lib/lab/story-publication';
import type { StoryCard } from '@/lib/lab/stories.data';

const httpsUrl = z.url({ protocol: /^https$/ }).max(2048);
const cardInput = z.object({
  id: z.string().max(100).optional(),
  date: z.iso.date().optional(),
  emoji: z.string().trim().min(1).max(24),
  theme: z.enum(['navy', 'orange', 'green']),
  title: z.string().trim().max(120),
  text: z.string().trim().max(1200),
  imageUrl: httpsUrl.optional(),
  videoUrl: z.union([httpsUrl, z.string().regex(/^\/videos\/lab-stories\/[a-zA-Z0-9._-]+\.mp4$/)]).optional(),
  linkUrl: httpsUrl.optional(),
  linkLabel: z.string().trim().min(1).max(60).optional(),
});

export async function publishLabStories(revision: number, slug: string, input: unknown) {
  try {
    if (!await canEditLabStories()) return { error: '公開には運営アカウントでのログインが必要です。' };

    const current = await readStoryPublication();
    if (revision !== current.revision) return { error: '別の更新が公開されました。編集内容を控え、ページを再読み込みしてください。' };
    const category = current.categories.find((item) => item.slug === slug);
    if (!category) return { error: 'カテゴリが見つかりません。' };

    const result = z.array(cardInput).max(60).safeParse(input);
    if (!result.success) {
      const index = result.error.issues[0].path[0];
      return { error: typeof index === 'number' ? `${index + 1}枚目の日付・文字数・URLを確認してください。` : '1カテゴリにつき60枚まで公開できます。' };
    }

    const existingIds = new Set(category.cards.map((card) => card.id));
    const usedIds = new Set(existingIds);
    const submittedIds = new Set<string>();
    const cards: StoryCard[] = [];
    for (const [index, card] of result.data.entries()) {
      if ((!card.id && !card.date) || (!card.imageUrl && !card.videoUrl && !card.title && !card.text)) {
        return { error: `${index + 1}枚目に日付と、画像・動画・文章のいずれかを入力してください。` };
      }
      if (card.linkLabel && !card.linkUrl) return { error: `${index + 1}枚目のボタンのリンクを入力してください。` };

      let id = card.id;
      if (id && (!existingIds.has(id) || submittedIds.has(id))) {
        return { error: '同じカードが含まれています。ページを再読み込みしてください。' };
      }
      if (!id) {
        const base = `${slug}-${card.date}`;
        id = base;
        for (let suffix = 2; usedIds.has(id); suffix++) id = `${base}-${suffix}`;
      }
      usedIds.add(id);
      submittedIds.add(id);
      cards.push({ ...card, id });
    }

    const updatedAt = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const categories = current.categories.map((item) => item.slug === slug ? { ...item, cards, updatedAt } : item);
    const { data, error } = await getServiceClient().from('lab_story_publication')
      .update({ categories, revision: revision + 1 }).eq('id', 1).eq('revision', revision)
      .select('revision').maybeSingle();
    if (error) throw error;
    if (!data) return { error: '別の更新が公開されました。編集内容を控え、ページを再読み込みしてください。' };

    updateTag(STORY_PUBLICATION_TAG);
    revalidatePath('/lab');
    revalidatePath('/lab/story/[category]', 'page');
    return { revision: data.revision as number, cards };
  } catch (error) {
    console.error('[lab stories] 保存処理に失敗しました', error);
    return { error: '公開結果を確認できませんでした。「ラボで確認」から掲載内容を確認してください。' };
  }
}
