'use client';

import { useState } from 'react';
import { SectionTitle } from '@/components/craft/SectionTitle';
import { parseYouTube, youtubeEmbedUrl } from '@/lib/youtube';

export function ExhibitVideo({ url, name }: { url: string; name: string }) {
  const [playing, setPlaying] = useState(false);
  const yt = parseYouTube(url);
  if (!yt) return null;

  return (
    <section className="py-8 px-4 reveal">
      <div className="hp-section-head" style={{ marginBottom: '24px' }}>
        <SectionTitle variant={2} lineColor="var(--brand)">
          発表を見る
        </SectionTitle>
      </div>
      <div className="craft-paper p-3">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
          {playing ? (
            <iframe
              src={`${youtubeEmbedUrl(yt.id, yt.start)}${yt.start ? '&' : '?'}autoplay=1`}
              title={`${name}の発表動画`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer"
              aria-label={`${name}の発表動画を再生`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${yt.id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <span
                className="absolute inset-0 flex items-center justify-center text-white text-5xl"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,.5)' }}
                aria-hidden="true"
              >
                ▶
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
