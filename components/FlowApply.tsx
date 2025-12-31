'use client';

import { useEffect, useState } from 'react';
import { Zen_Maru_Gothic } from 'next/font/google';
import Link from 'next/link';

const zenMaru = Zen_Maru_Gothic({
  weight: ['500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export function FlowApply(){
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // 少し遅延させてアニメーション効果を出す
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section container py-10" id="apply">
      <h2 className="heading-lg mb-8 text-center" style={{ fontFamily: zenMaru.style.fontFamily }}>
        入会までの流れ
      </h2>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        {/* STEP 1 */}
        <div 
          className={`bg-white rounded-2xl p-6 border-l-4 border-brand shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '100ms' }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-brand text-white rounded-full flex items-center justify-center font-bold text-lg">
              1
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-2 text-ink-900" style={{ fontFamily: zenMaru.style.fontFamily }}>
                お気軽にご相談ください！
              </h3>
              <p className="text-ink-700 text-base leading-relaxed">
                PDF資料でカリキュラムの詳細・料金をご確認ください。<br />
                ご不明な点やご質問はLINEからお問合せくださいませ。30分程度の個別面談も可能です。
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 ml-16">
            <a 
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full font-bold bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white transition-all shadow-md text-center"
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
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full font-bold bg-[#06c755] text-white hover:opacity-90 transition-all shadow-md text-center"
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

        {/* STEP 2 */}
        <div 
          className={`bg-white rounded-2xl p-6 border-l-4 border-green shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green text-white rounded-full flex items-center justify-center font-bold text-lg">
              2
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-2 text-ink-900" style={{ fontFamily: zenMaru.style.fontFamily }}>
                まずは1ヶ月無料体験
              </h3>
              <p className="text-ink-700 text-base leading-relaxed">
                学習アプリを使いながら、1ヶ月間無料で体験できます。<br />
                ご希望の方は、以下のボタンからお申込みくださいませ。
              </p>
            </div>
          </div>
          <div className="ml-16">
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full font-bold bg-brand text-white hover:opacity-90 transition-all shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              体験を申し込む
            </Link>
          </div>
        </div>

        {/* STEP 3 */}
        <div 
          className={`bg-white rounded-2xl p-6 border-l-4 border-cream shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-cream text-white rounded-full flex items-center justify-center font-bold text-lg">
              3
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-2 text-ink-900" style={{ fontFamily: zenMaru.style.fontFamily }}>
                入会のお申し込み
              </h3>
              <p className="text-ink-700 text-base leading-relaxed">
                体験終了後に入会するかどうかのご連絡をいたします。<br />
                入会後は、翌月から費用が発生いたします。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
