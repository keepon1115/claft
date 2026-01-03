'use client';

import { useEffect, useState } from 'react';
import { Zen_Maru_Gothic } from 'next/font/google';

const zenMaru = Zen_Maru_Gothic({
  weight: ['500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export function Students(){
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section container py-10" id="students">
      <h2 className="heading-lg mb-8 text-center" style={{ fontFamily: zenMaru.style.fontFamily }}>
        スクール生用アプリ
      </h2>
      
      <div 
        className={`bg-gradient-to-br from-brand/10 to-green/10 border border-brand/20 rounded-2xl p-8 shadow-lg transition-all duration-700 ${revealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-brand to-[#2da89e] rounded-full flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-3 text-ink-900" style={{ fontFamily: zenMaru.style.fontFamily }}>
              在籍生向け学習環境
            </h3>
            <p className="body-base text-ink-700 leading-relaxed mb-6">
              CLAFTスクール生は、専用のアプリでクエスト動画の視聴＆意見共有、その他オンラインワークの参加などができます。
            </p>
            
            <a 
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full font-bold bg-gradient-to-r from-brand to-[#2da89e] text-white hover:shadow-xl hover:-translate-y-1 transition-all shadow-md"
              href="https://claft-next.vercel.app" 
              target="_blank" 
              rel="noopener"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              スクール生用アプリへ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
