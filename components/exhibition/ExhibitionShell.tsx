'use client';

import { useEffect, useRef } from 'react';

/**
 * なんでも展示会プラットフォーム共通シェル。
 * 既存LP（NandemoTenjikaiContent.tsx）の書き味を踏襲した
 * 背景（クリーム＋紙グレイン）・フォント・.reveal フェードイン・紙ものモチーフの
 * styled-jsx をここに切り出し、一覧/詳細/作者ページで使い回す。
 */
export default function ExhibitionShell({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const targets = rootRef.current.querySelectorAll<HTMLElement>('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <main ref={rootRef} className="relative bg-[#FFF8EC] text-[#1F1810] overflow-hidden min-h-screen">
      <div className="paper-grain pointer-events-none absolute inset-0 z-0" aria-hidden />
      <div className="relative z-10">{children}</div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@500;700&family=Yusei+Magic&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap');

        .font-display {
          font-family: 'Kaisei Decol', serif;
          font-weight: 700;
        }
        .font-body {
          font-family: 'Zen Kaku Gothic New', sans-serif;
          font-weight: 400;
        }
        .font-handwritten {
          font-family: 'Yusei Magic', sans-serif;
        }

        /* 紙のグレイン */
        .paper-grain {
          background-image:
            radial-gradient(circle at 20% 30%, rgba(224, 78, 44, 0.04) 0, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(46, 125, 125, 0.04) 0, transparent 40%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
          opacity: 0.35;
          mix-blend-mode: multiply;
        }

        /* フェードイン */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* キラキラ */
        .sparkle-anim {
          animation: sparkle 2.4s ease-in-out infinite;
        }
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.25) rotate(15deg); opacity: 0.7; }
        }

        /* ホバーで傾く（ポラロイド用） */
        .hover-tilt {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .hover-tilt:hover {
          transform: rotate(0deg) translateY(-6px) scale(1.02) !important;
          box-shadow: 0 25px 45px -20px rgba(31, 24, 16, 0.5);
          z-index: 5;
        }

        /* 付箋 */
        .sticky-note {
          border-radius: 4px 4px 14px 4px;
          background: linear-gradient(180deg, #fffbe8 0%, #fff5d4 100%);
        }
        .sticky-note::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 32px;
          height: 8px;
          background: rgba(31, 24, 16, 0.15);
          border-radius: 0 0 4px 4px;
        }

        /* リボン */
        .ribbon {
          clip-path: polygon(8px 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0 50%);
        }

        /* 縮小モーション尊重 */
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; transition: none; }
          .sparkle-anim { animation: none; }
          .hover-tilt, .hover-tilt:hover { transition: none; }
        }
      `}</style>
    </main>
  );
}
