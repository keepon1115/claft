'use client';

import { useEffect, useState } from 'react';
import { Zen_Maru_Gothic } from 'next/font/google';

const zenMaru = Zen_Maru_Gothic({
  weight: ['500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export function Download(){
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section container py-10" id="download">
      <h2 className="heading-lg mb-8 text-center" style={{ fontFamily: zenMaru.style.fontFamily }}>
        資料ダウンロード
      </h2>
      
      <div 
        className={`bg-gradient-to-br from-cream/20 to-cream/10 border border-cream/30 rounded-2xl p-8 shadow-lg transition-all duration-700 ${revealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-cream to-[#ffc557] rounded-full flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-3 text-ink-900" style={{ fontFamily: zenMaru.style.fontFamily }}>
              カリキュラムの詳細をご確認ください
            </h3>
            <p className="body-base text-ink-700 leading-relaxed mb-6">
              PDF資料でカリキュラムの詳細・料金をご確認いただけます。<br />
              ご不明な点やご質問はLINEからお問合せくださいませ。30分程度の個別面談も可能です。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full font-bold bg-white border-2 border-cream text-ink-900 hover:bg-cream/10 transition-all shadow-md"
                href="/assets/siryo.pdf" 
                target="_blank" 
                rel="noopener"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                PDFダウンロード
              </a>
              <a 
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full font-bold bg-[#06c755] text-white hover:opacity-90 transition-all shadow-md"
                href="https://lin.ee/wcsFK9A" 
                target="_blank" 
                rel="noopener"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                LINEで相談
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
