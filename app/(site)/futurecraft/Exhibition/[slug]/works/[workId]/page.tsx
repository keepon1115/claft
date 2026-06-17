import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Hammer, Lightbulb, Mountain, Sprout } from 'lucide-react';
import ExhibitionShell from '@/components/exhibition/ExhibitionShell';
import LiteYouTube from '@/components/exhibition/LiteYouTube';
import ReactionBar from '@/components/exhibition/ReactionBar';
import CommentSection from '@/components/exhibition/CommentSection';
import {
  fetchApprovedComments,
  fetchExhibitionBySlug,
  fetchReactionTally,
  fetchReactionTypes,
  fetchWork,
} from '@/lib/exhibition/queries';
import type { Work } from '@/lib/exhibition/types';

export const dynamic = 'force-dynamic';

interface Params {
  params: { slug: string; workId: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const work = await fetchWork(params.workId).catch(() => null);
  return {
    title: work ? `${work.title} | なんでも展示会 | CLAFT` : '作品 | CLAFT',
    description: work
      ? `${work.author_nickname}さんの作品「${work.title}」。見て、顔文字で反応して、コメントで応援しよう。`
      : undefined,
  };
}

const STORY_ITEMS = [
  { key: 'story_made', label: 'どうやって作った？', icon: Hammer, color: '#E04E2C' },
  { key: 'story_devised', label: 'くふうしたところ', icon: Lightbulb, color: '#F2B544' },
  { key: 'story_struggled', label: 'たいへんだったところ', icon: Mountain, color: '#2E7D7D' },
  { key: 'story_learned', label: '学んだこと・気づき', icon: Sprout, color: '#E89BB0' },
] as const;

export default async function WorkDetailPage({ params }: Params) {
  const [exhibition, work] = await Promise.all([
    fetchExhibitionBySlug(params.slug).catch(() => null),
    fetchWork(params.workId).catch(() => null),
  ]);
  if (!exhibition || !work || work.exhibition_id !== exhibition.id) notFound();

  const reactionTypes = await fetchReactionTypes(exhibition.id);
  const [comments, tally] = await Promise.all([
    fetchApprovedComments(work.id),
    fetchReactionTally(work.id, reactionTypes),
  ]);

  const photos = (work.work_images ?? []).map((img) => img.url);
  const stories = STORY_ITEMS.map((item) => ({
    ...item,
    text: work[item.key as keyof Work] as string | null,
  })).filter((s): s is (typeof STORY_ITEMS)[number] & { text: string } => !!s.text);

  return (
    <ExhibitionShell>
      <article className="px-5 sm:px-10 pt-10 pb-24 max-w-4xl mx-auto">
        <Link
          href={`/futurecraft/Exhibition/${exhibition.slug}`}
          className="font-handwritten inline-flex items-center gap-2 text-sm text-[#1F1810]/60 hover:text-[#E04E2C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {exhibition.title} の作品一覧へ
        </Link>

        {/* ----------------- ヘッダー ----------------- */}
        <header className="mt-10 mb-12 text-center">
          <h1 className="font-display text-3xl sm:text-5xl leading-tight reveal">{work.title}</h1>
          <p className="font-handwritten text-base sm:text-lg text-[#2E7D7D] mt-4 reveal">
            つくった人: {work.author_nickname}
            {work.genre ? ` ・ ${work.genre}` : ''}
          </p>
          {work.author_intro && (
            <p className="font-body text-sm text-[#1F1810]/70 max-w-xl mx-auto mt-4 leading-relaxed reveal">
              {work.author_intro}
            </p>
          )}
        </header>

        {/* ----------------- 動画（クリックで読み込み） ----------------- */}
        {work.youtube_url && (
          <div className="mb-12 reveal">
            <LiteYouTube url={work.youtube_url} title={work.title} />
          </div>
        )}

        {/* ----------------- 写真（遅延読み込み） ----------------- */}
        {photos.length > 0 && (
          <div className="mb-14 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {photos.map((src, i) => (
              <figure
                key={`${src}-${i}`}
                className="reveal relative bg-white p-3 pb-8 shadow-[0_18px_40px_-20px_rgba(31,24,16,0.45)]"
                style={{ transform: `rotate(${i % 2 === 0 ? '-1.2deg' : '1.4deg'})` }}
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#F2B544]/80 rotate-[-2deg] shadow-sm rounded-[2px]" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${work.title} の写真 ${i + 1}`}
                  className="w-full max-h-[420px] object-cover"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        )}

        {/* ----------------- 制作ストーリー ----------------- */}
        {stories.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-2xl sm:text-3xl mb-8 reveal">
              <span className="relative inline-block">
                制作ストーリー
                <span className="absolute left-0 right-0 -bottom-1 h-3 bg-[#F2B544]/60 -z-10 -rotate-1" />
              </span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {stories.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.key}
                    className="reveal sticky-note relative px-6 py-7 shadow-md"
                    style={{
                      transitionDelay: `${i * 0.08}s`,
                      transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 1.2}deg)`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-5 h-5" style={{ color: s.color }} strokeWidth={1.8} />
                      <h3 className="font-handwritten text-base" style={{ color: s.color }}>
                        {s.label}
                      </h3>
                    </div>
                    <p className="font-body text-sm sm:text-base leading-relaxed text-[#1F1810]/85 whitespace-pre-wrap">
                      {s.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ----------------- リアクション ----------------- */}
        {tally.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-2xl sm:text-3xl mb-3 reveal">
              顔文字で「見たよ！」を伝える
            </h2>
            <p className="font-handwritten text-sm text-[#1F1810]/60 mb-6 reveal">
              タップするだけでOK。同じ顔文字は1人1回まで。
            </p>
            <ReactionBar workId={work.id} initialCounts={tally} />
          </section>
        )}

        {/* ----------------- コメント ----------------- */}
        <section>
          <CommentSection workId={work.id} initialComments={comments} />
        </section>
      </article>
    </ExhibitionShell>
  );
}
