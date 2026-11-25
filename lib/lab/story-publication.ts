import { unstable_cache } from 'next/cache';
import { getAdminClient } from '@/lib/exhibition/adminAuth';
import { getAnonClient } from '@/lib/exhibition/supabaseServer';
import { stories, type StoryCategory } from './stories.data';

export const STORY_PUBLICATION_TAG = 'lab-story-publication';

export async function readStoryPublication() {
  const { data, error } = await getAnonClient()
    .from('lab_story_publication')
    .select('revision, categories')
    .eq('id', 1)
    .single();

  if (error) throw error;
  return {
    revision: data.revision as number,
    categories: (data.categories ?? stories) as StoryCategory[],
  };
}

const readCachedStoryPublication = unstable_cache(
  readStoryPublication,
  [STORY_PUBLICATION_TAG],
  { revalidate: 600, tags: [STORY_PUBLICATION_TAG] },
);

/** カードがあるカテゴリを、公開期限内に限って表示する。 */
export async function getStories(): Promise<StoryCategory[]> {
  const todayJst = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
  let categories = stories;
  try {
    ({ categories } = await readCachedStoryPublication());
  } catch (error) {
    console.error('[lab stories] 公開データの読み込みに失敗しました', error);
    // テーブル作成前は従来のデータを表示する。障害時に削除済みのカードを再掲載しない。
    if (process.env.NEXT_PUBLIC_SUPABASE_URL &&
        (!error || typeof error !== 'object' || !('code' in error) || error.code !== 'PGRST205')) {
      categories = [];
    }
  }
  return categories.filter((category) => category.cards.length > 0 && (!category.visibleUntil || category.visibleUntil >= todayJst));
}

export async function canEditLabStories() {
  const client = await getAdminClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user) return false;

  const { data, error } = await client.from('lab_story_editors')
    .select('user_id').eq('user_id', user.id).maybeSingle();
  if (error) throw error;
  return Boolean(data);
}
