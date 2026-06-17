import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAdminClient } from '@/lib/exhibition/adminAuth';
import type { Exhibition, Work } from '@/lib/exhibition/types';
import { createWork, deleteWork } from '../../../actions';

export const dynamic = 'force-dynamic';

type WorkWithToken = Work & {
  work_access_tokens: { token: string }[] | null;
};

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
    .select('*, work_access_tokens(token), work_images(id)')
    .eq('exhibition_id', exhibition.id)
    .order('created_at', { ascending: true });
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
          const token = w.work_access_tokens?.[0]?.token;
          const photoCount = w.work_images?.length ?? 0;
          return (
            <div key={w.id} className="rounded-xl border border-[#1F1810]/15 bg-white p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[#1F1810]">
                    {w.title}
                    <span className="ml-2 text-xs font-normal text-[#1F1810]/50">
                      by {w.author_nickname}
                      {w.genre ? ` ・ ${w.genre}` : ''} ・ 写真{photoCount}枚
                    </span>
                  </p>
                </div>
                <Link
                  href={`/futurecraft/Exhibition/${exhibition.slug}/works/${w.id}`}
                  className="text-xs text-[#2E7D7D] underline"
                >
                  公開ページ
                </Link>
                <form action={deleteWork.bind(null, w.id, exhibition.id)}>
                  <button
                    type="submit"
                    className="rounded-full border border-[#E04E2C]/50 px-3 py-1 text-xs text-[#E04E2C] hover:bg-[#E04E2C] hover:text-white"
                  >
                    削除
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
            <input name="author_nickname" required className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            ジャンル（例: 生きもの／音楽）
            <input name="genre" className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            動画URL（YouTube）
            <input name="youtube_url" type="url" className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            サムネイルURL（一覧の表紙。未指定なら写真や動画から自動）
            <input name="thumbnail_url" type="url" className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            作者しょうかい（任意）
            <input name="author_intro" className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70 sm:col-span-2">
            写真URL（1行に1つ）
            <textarea name="photos" rows={3} className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            どうやって作った？
            <textarea name="story_made" rows={2} className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            くふうしたところ
            <textarea name="story_devised" rows={2} className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            たいへんだったところ
            <textarea name="story_struggled" rows={2} className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
          </label>
          <label className="block text-xs text-[#1F1810]/70">
            学んだこと・気づき
            <textarea name="story_learned" rows={2} className="mt-1 w-full rounded-lg border border-[#1F1810]/20 px-3 py-2 text-sm focus:border-[#2E7D7D] focus:outline-none" />
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
