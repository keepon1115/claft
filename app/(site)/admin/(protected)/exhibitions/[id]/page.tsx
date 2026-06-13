import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAdminClient } from '@/lib/exhibition/adminAuth';
import type { Exhibition, Work } from '@/lib/exhibition/types';
import { createWork, setWorkPublished } from '../../../actions';

export const dynamic = 'force-dynamic';

interface WorkWithToken extends Work {
  author_tokens: { token: string }[] | null;
}

export default async function AdminWorksPage({ params }: { params: { id: string } }) {
  const supabase = getAdminClient();
  const { data: exhibitionRow } = await supabase
    .from('exhibitions')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();
  if (!exhibitionRow) notFound();
  const exhibition = exhibitionRow as Exhibition;

  const { data: workRows } = await supabase
    .from('works')
    .select('*, author_tokens(token)')
    .eq('exhibition_id', exhibition.id)
    .order('sort_order', { ascending: true });
  const works = (workRows ?? []) as unknown as WorkWithToken[];

  const createWorkForExhibition = createWork.bind(null, exhibition.id);

  return (
    <div className="space-y-10">
      <div>
        <Link href="/admin/exhibitions" className="text-xs text-[#1F1810]/50 underline">
          ← 展示会一覧へ
        </Link>
        <h1 className="mt-2 text-lg font-bold text-[#1F1810]">
          {exhibition.title} の作品（{works.length}件）
        </h1>
        <p className="text-xs text-[#1F1810]/50">
          公開URL: /futurecraft/Exhibition/{exhibition.slug}
        </p>
      </div>

      <section className="space-y-3">
        {works.map((w) => {
          const token = w.author_tokens?.[0]?.token;
          return (
            <div key={w.id} className="rounded-xl border border-[#1F1810]/15 bg-white p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[#1F1810]">
                    {w.title}
                    <span className="ml-2 text-xs font-normal text-[#1F1810]/50">
                      by {w.author_name} {w.is_published ? '' : '（非公開）'}
                    </span>
                  </p>
                </div>
                <Link
                  href={`/futurecraft/Exhibition/${exhibition.slug}/works/${w.id}`}
                  className="text-xs text-[#2E7D7D] underline"
                >
                  公開ページ
                </Link>
                <form action={setWorkPublished.bind(null, w.id, exhibition.id, !w.is_published)}>
                  <button
                    type="submit"
                    className="rounded-full border border-[#1F1810]/30 px-3 py-1 text-xs text-[#1F1810]/60 hover:bg-[#1F1810]/10"
                  >
                    {w.is_published ? '非公開にする' : '公開する'}
                  </button>
                </form>
              </div>
              <p className="mt-2 break-all rounded bg-[#FFF8EC] px-3 py-2 text-xs text-[#1F1810]/70">
                作者ページ限定URL:{' '}
                {token ? (
                  <code className="text-[#E04E2C]">/author/{token}</code>
                ) : (
                  'トークン未発行'
                )}
                <span className="ml-2 text-[#1F1810]/40">
                  ※ このURLを作者（保護者）にだけ伝えてください
                </span>
              </p>
            </div>
          );
        })}
      </section>

      <section className="rounded-xl border border-[#1F1810]/15 bg-white p-5">
        <h2 className="mb-4 text-sm font-bold text-[#1F1810]">
          作品を追加（作成すると作者ページの限定URLが発行されます）
        </h2>
        <form action={createWorkForExhibition} className="grid gap-3 sm:grid-cols-2">
          <label className="block text-xs text-[#1F1810]/70">
            作品タイトル *
            <input name="title" required className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            作者ニックネーム *（本名は入れない）
            <input name="author_name" required className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            補足（例: 小3）
            <input name="author_note" className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            動画URL（YouTube）
            <input name="video_url" type="url" className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70 sm:col-span-2">
            写真URL（1行に1つ）
            <textarea name="photos" rows={3} className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            どうやって作った？
            <textarea name="story_process" rows={2} className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            くふうしたところ
            <textarea name="story_idea" rows={2} className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            たいへんだったところ
            <textarea name="story_struggle" rows={2} className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            学んだこと・気づき
            <textarea name="story_learned" rows={2} className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            表示順（数字が小さいほど前）
            <input name="sort_order" type="number" defaultValue={0} className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className="rounded-full bg-[#1F1810] px-6 py-2 text-sm font-bold text-[#FFF8EC] hover:bg-[#E04E2C] transition-colors">
              作品を追加する
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
