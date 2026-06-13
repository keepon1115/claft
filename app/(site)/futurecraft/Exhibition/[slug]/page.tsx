import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Sparkles, ArrowLeft } from 'lucide-react';
import ExhibitionShell from '@/components/exhibition/ExhibitionShell';
import { fetchExhibitionBySlug, fetchWorks } from '@/lib/exhibition/queries';
import { youTubeThumbnail } from '@/lib/exhibition/youtube';
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
      exhibition?.description ??
      'なんでも展示会のオンラインギャラリー。作品を見て、顔文字で反応して、コメントで応援しよう。',
  };
}

function coverImage(work: Work): string | null {
  if (work.photos[0]) return work.photos[0];
  if (work.video_url) return youTubeThumbnail(work.video_url);
  return null;
}

const ROTATIONS = ['-1.5deg', '1.2deg', '-0.8deg', '1.8deg', '-1.3deg', '0.9deg'];
const TAPE_COLORS = ['#F2B544', '#E89BB0', '#2E7D7D', '#E04E2C'];

export default async function WorksListPage({ params }: { params: { slug: string } }) {
  const exhibition = await fetchExhibitionBySlug(params.slug).catch(() => null);
  if (!exhibition) notFound();
  const works = await fetchWorks(exhibition.id);

  return (
    <ExhibitionShell>
      {/* リボン */}
      <div className="flex justify-center pt-6 pb-2">
        <div className="ribbon font-display text-[10px] sm:text-xs tracking-[0.4em] text-[#FFF8EC] bg-[#E04E2C] px-6 py-1.5 shadow-md uppercase">
          ✦ Online Gallery ✦
        </div>
      </div>

      <section className="px-5 sm:px-10 pt-10 pb-24 max-w-6xl mx-auto">
        <Link
          href="/futurecraft/Exhibition"
          className="font-handwritten inline-flex items-center gap-2 text-sm text-[#1F1810]/60 hover:text-[#E04E2C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          なんでも展示会について
        </Link>

        <div className="text-center mt-8 mb-16">
          <p className="font-handwritten text-[#2E7D7D] text-base sm:text-lg mb-3 reveal">
            ようこそ、オンラインギャラリーへ
          </p>
          <h1 className="font-display text-4xl sm:text-6xl leading-tight reveal">
            {exhibition.title}
            <Sparkles className="inline-block ml-3 -mt-2 w-7 h-7 text-[#F2B544] sparkle-anim" />
          </h1>
          {exhibition.description && (
            <p className="font-body text-sm sm:text-base text-[#1F1810]/70 leading-loose max-w-xl mx-auto mt-6 reveal">
              {exhibition.description}
            </p>
          )}
          <p className="font-handwritten text-sm text-[#1F1810]/50 mt-6 reveal">
            気になる作品をタップ → 顔文字とコメントで、作者に「見たよ！」を届けよう
          </p>
        </div>

        {works.length === 0 ? (
          <p className="font-body rounded-2xl border-2 border-dashed border-[#1F1810]/20 p-10 text-center text-[#1F1810]/50">
            作品はこれから並びます。おたのしみに！
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {works.map((work, i) => {
              const cover = coverImage(work);
              return (
                <Link
                  key={work.id}
                  href={`/futurecraft/Exhibition/${exhibition.slug}/works/${work.id}`}
                  className="reveal hover-tilt relative block bg-white p-3 pb-6 shadow-[0_15px_35px_-20px_rgba(31,24,16,0.4)]"
                  style={{
                    transitionDelay: `${(i % 6) * 0.08}s`,
                    transform: `rotate(${ROTATIONS[i % ROTATIONS.length]})`,
                  }}
                >
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 rotate-[-3deg] rounded-[2px] shadow-sm"
                    style={{ backgroundColor: `${TAPE_COLORS[i % TAPE_COLORS.length]}B3` }}
                  />
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cover}
                      alt={work.title}
                      className="w-full h-48 sm:h-52 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-48 sm:h-52 bg-[#2E7D7D]/15 flex items-center justify-center">
                      <span className="font-handwritten text-[#2E7D7D]">作品</span>
                    </div>
                  )}
                  <div className="pt-3 px-1">
                    <p className="font-display text-base sm:text-lg text-[#1F1810] leading-snug">
                      {work.title}
                    </p>
                    <p className="font-handwritten text-xs sm:text-sm text-[#1F1810]/60 mt-1">
                      by {work.author_name}
                      {work.author_note ? `（${work.author_note}）` : ''}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </ExhibitionShell>
  );
}
