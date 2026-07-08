import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Sparkles, ArrowLeft, Calendar } from 'lucide-react';
import ExhibitionShell from '@/components/exhibition/ExhibitionShell';
import LiteYouTube from '@/components/exhibition/LiteYouTube';
import ReactionBar from '@/components/exhibition/ReactionBar';
import CommentSection from '@/components/exhibition/CommentSection';
import {
  fetchExhibitionBySlug,
  fetchReactionTally,
  fetchReactionTypes,
  fetchWorks,
} from '@/lib/exhibition/queries';
import { formatWorkDate } from '@/lib/exhibition/date';
import { buildAuthorComment } from '@/lib/exhibition/authorComment';
import type { Work } from '@/lib/exhibition/types';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const exhibition = await fetchExhibitionBySlug(params.slug).catch(() => null);
  return {
    title: exhibition ? `${exhibition.title} 作品一覧 | CLAFT` : '展示会 | CLAFT',
    description:
      exhibition?.theme ??
      'なんでも展示会のオンラインギャラリー。作品を見て、顔文字で反応して、ひとことを届けよう。',
  };
}

function coverImage(work: Work): string | null {
  if (work.thumbnail_url) return work.thumbnail_url;
  if (work.work_images && work.work_images[0]) return work.work_images[0].url;
  return null;
}

export default async function WorksListPage({ params }: { params: { slug: string } }) {
  const exhibition = await fetchExhibitionBySlug(params.slug).catch(() => null);
  if (!exhibition) notFound();
  const works = await fetchWorks(exhibition.id);
  const reactionTypes = await fetchReactionTypes(exhibition.id);
  const tallies = await Promise.all(
    works.map((w) => fetchReactionTally(w.id, reactionTypes)),
  );

  return (
    <ExhibitionShell>
      {/* リボン */}
      <div className="flex justify-center pt-6 pb-2">
        <div className="ribbon font-display text-[10px] sm:text-xs tracking-[0.4em] text-[#FFF8EC] bg-[#E04E2C] px-6 py-1.5 shadow-md uppercase">
          ✦ Online Gallery ✦
        </div>
      </div>

      <section className="px-5 sm:px-10 pt-10 pb-24 max-w-3xl mx-auto">
        <Link
          href="/futurecraft/Exhibition"
          className="font-handwritten inline-flex items-center gap-2 text-sm text-[#1F1810]/60 hover:text-[#E04E2C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          なんでも展示会について
        </Link>

        <div className="text-center mt-8 mb-10">
          <p className="font-handwritten text-[#2E7D7D] text-base sm:text-lg mb-3 reveal">
            ようこそ、オンラインギャラリーへ
          </p>
          <h1 className="font-display text-4xl sm:text-5xl leading-tight reveal">
            {exhibition.title}
            <Sparkles className="inline-block ml-3 -mt-2 w-7 h-7 text-[#F2B544] sparkle-anim" />
          </h1>
          {exhibition.theme && (
            <p className="font-body text-sm sm:text-base text-[#1F1810]/70 leading-loose max-w-xl mx-auto mt-6 reveal">
              {exhibition.theme}
            </p>
          )}
          {exhibition.status === 'closed' && (
            <p className="font-handwritten text-sm text-[#E04E2C] mt-4 reveal">
              ※ この展示会は終了しました（作品は引き続き見られます）
            </p>
          )}
        </div>

        {works.length === 0 ? (
          <p className="font-body rounded-2xl border-2 border-dashed border-[#1F1810]/20 p-10 text-center text-[#1F1810]/60">
            作品はこれから並びます。おたのしみに！
          </p>
        ) : (
          <>
            {/* ----------------- 目次 ----------------- */}
            <nav className="reveal mb-16 rounded-[24px] border-2 border-dashed border-[#1F1810]/25 bg-white/60 p-5 sm:p-7">
              <p className="font-handwritten text-sm text-[#1F1810]/60 mb-3">出展作品（タップでジャンプ）</p>
              <ol className="space-y-1.5">
                {works.map((work, i) => (
                  <li key={work.id}>
                    <a
                      href={`#work-${work.id}`}
                      className="font-body flex items-baseline gap-2 text-sm sm:text-base text-[#1F1810]/80 hover:text-[#E04E2C] transition-colors"
                    >
                      <span className="font-display text-xs text-[#1F1810]/35 w-5 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="truncate">{work.title}</span>
                      <span className="font-handwritten text-xs text-[#1F1810]/60 shrink-0">
                        by {work.author_nickname}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* ----------------- 作品セクション ----------------- */}
            <div className="space-y-20">
              {works.map((work, i) => {
                const cover = coverImage(work);
                const authorComment = buildAuthorComment(work);
                return (
                  <article
                    key={work.id}
                    id={`work-${work.id}`}
                    className="reveal scroll-mt-10 border-t border-[#1F1810]/10 pt-14 first:border-t-0 first:pt-0"
                  >
                    <header className="mb-5">
                      <h2 className="font-display text-2xl sm:text-3xl leading-tight">{work.title}</h2>
                      <p className="font-handwritten text-sm text-[#2E7D7D] mt-2">
                        つくった人: {work.author_nickname}
                        {work.genre ? ` ・ ${work.genre}` : ''}
                      </p>
                      <p className="font-handwritten text-xs text-[#1F1810]/60 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatWorkDate(work.created_at)}
                      </p>
                    </header>

                    {/* メディア */}
                    {work.youtube_url ? (
                      <div className="mb-6">
                        <LiteYouTube url={work.youtube_url} title={work.title} />
                      </div>
                    ) : cover ? (
                      <div className="mb-6 relative bg-white p-2.5 pb-6 shadow-[0_15px_35px_-20px_rgba(31,24,16,0.4)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cover}
                          alt={work.title}
                          className="w-full max-h-[360px] object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : null}

                    {/* 発表者のコメント */}
                    {authorComment && (
                      <div className="mb-6 relative bg-white rounded-[20px] p-5 sm:p-6 shadow-[0_12px_30px_-18px_rgba(31,24,16,0.4)]">
                        <p className="font-handwritten text-xs text-[#2E7D7D] mb-2">
                          {work.author_nickname} さんより
                        </p>
                        <p className="font-body whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-[#1F1810]/85">
                          {authorComment}
                        </p>
                      </div>
                    )}

                    {/* リアクション */}
                    {tallies[i].length > 0 && (
                      <div className="mb-4">
                        <ReactionBar workId={work.id} initialCounts={tallies[i]} />
                      </div>
                    )}

                    {/* コメント送信 */}
                    <CommentSection workId={work.id} />
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>
    </ExhibitionShell>
  );
}
