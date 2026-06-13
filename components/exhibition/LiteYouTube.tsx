'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { extractYouTubeId } from '@/lib/exhibition/youtube';

/**
 * 軽量YouTube埋め込み。
 * 初期表示はサムネイル画像だけを読み込み、クリックされて初めて iframe を生成する。
 */
export default function LiteYouTube({ url, title }: { url: string; title: string }) {
  const [activated, setActivated] = useState(false);
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-[#1F1810] shadow-[0_18px_40px_-20px_rgba(31,24,16,0.45)]">
      {activated ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActivated(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`動画を再生: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            loading="lazy"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E04E2C] shadow-lg transition-transform group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 text-[#FFF8EC]" fill="currentColor" />
            </span>
          </span>
          <span className="font-handwritten absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#1F1810]/70 px-4 py-1 text-xs text-[#FFF8EC]">
            タップして再生（クリックするまで読み込みません）
          </span>
        </button>
      )}
    </div>
  );
}
