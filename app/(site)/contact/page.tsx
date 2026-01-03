"use client";

import { MobileContainer, Section } from '@/components/MobileContainer';
import { useEffect, useState } from 'react';
import { Zen_Maru_Gothic } from 'next/font/google';
import { FlowApply } from '@/components/FlowApply';
import { FAQ } from '@/components/FAQ';
import { Students } from '@/components/Students';

const zenMaru = Zen_Maru_Gothic({
  weight: ['500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export default function ContactPage(){
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(true);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section - グラデーション背景 */}
      <section
        style={{
          width: '100%',
          padding: '80px 20px 60px',
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(52, 198, 190, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(255, 214, 107, 0.12) 0%, transparent 50%),
            #fbfefe
          `,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* 背景テクスチャ */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.02,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0zm2 2h1v1H2V2z' fill='%23000' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            pointerEvents: 'none'
          }}
        />

        <div className="max-w-[480px] mx-auto text-center relative z-10">
          <div className={`transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 
              className="heading-xl mb-4"
              style={{
                fontFamily: zenMaru.style.fontFamily,
                background: 'linear-gradient(135deg, #34C6BE 0%, #2da89e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              無料体験 / 問合せ
            </h1>
            <p className="body-lg text-ink-700 mb-8">
              まずはお気軽にご連絡ください！
            </p>
          </div>
        </div>
      </section>

      {/* お問い合わせ方法の選択 */}
      <MobileContainer className="px-4">
        <Section className="py-6">
          <h2 className="heading-lg mb-6 text-center">お問い合わせ方法を選択</h2>
          
          <div className="grid grid-cols-1 gap-4 mb-8">
            {/* LINE問い合わせカード */}
            <div 
              className={`bg-gradient-to-br from-[#06c755] to-[#05b04a] rounded-2xl p-6 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: zenMaru.style.fontFamily }}>
                    LINE（おすすめ）
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    すぐにご返信いたします。<br />
                    お気軽にメッセージをお送りください。
                  </p>
                  <a 
                    className="inline-flex items-center gap-2 py-3 px-6 rounded-full font-bold bg-white text-[#06c755] no-underline hover:bg-opacity-90 transition-all shadow-md"
                    href="https://lin.ee/wcsFK9A" 
                    target="_blank" 
                    rel="noopener"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                    </svg>
                    LINEで相談する
                  </a>
                </div>
              </div>
            </div>

            {/* フォーム問い合わせカード */}
            <div 
              className={`bg-white border border-black/[0.06] rounded-2xl p-6 shadow-lg transition-all duration-500 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-brand to-[#2da89e] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-ink-900 font-bold text-xl mb-2" style={{ fontFamily: zenMaru.style.fontFamily }}>
                    フォーム
                  </h3>
                  <p className="text-ink-700 text-sm mb-4">
                    無料体験ご希望の方はこちらから。
                  </p>
                  <button 
                    className="inline-flex items-center gap-2 py-2 px-5 rounded-full font-bold bg-brand text-white no-underline hover:opacity-90 transition-all shadow-md"
                    onClick={() => {
                      const form = document.getElementById('contact-form');
                      if (form) {
                        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    フォームへ移動
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 体験申込フォーム */}
        <Section id="contact-form" className="py-8">
          <div className="bg-white border border-black/[0.06] rounded-2xl p-8 shadow-[var(--shadow)]">
            <div className="text-center mb-8">
              <h2 className="heading-lg mb-3" style={{ fontFamily: zenMaru.style.fontFamily }}>体験申込フォーム</h2>
              <p className="body-base text-ink-600">
                以下の情報を入力して送信してください。<br />
                原則24時間以内にご連絡いたします。
              </p>
            </div>

            {/* FormSubmit */}
            <form action="https://formsubmit.co/s.kawahara@keeponlearning.fun" method="POST" className="grid gap-6">
              {/* FormSubmit settings */}
              <input type="hidden" name="_subject" value="CLAFT 体験申込フォームより新規送信" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://keepon1115.github.io/claft/contact.html#thanks" />
              <input type="hidden" name="_captcha" value="false" />

              {/* 保護者・お子さま */}
              <div className="form-section">
                <h3 className="text-ink-900 font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  お名前
                </h3>
                <div className="grid grid-cols-1 gap-4 form-grid-2">
                  <div>
                    <label htmlFor="parent_name" className="block mb-2 font-semibold text-ink-800 text-sm">
                      保護者さまのお名前 <span className="text-pink text-xs">*必須</span>
                    </label>
                    <input 
                      id="parent_name" 
                      name="保護者氏名" 
                      type="text" 
                      placeholder="例）山田 花子" 
                      required 
                      className="w-full box-border border-2 border-black/[0.08] rounded-xl p-4 font-[inherit] text-ink-900 bg-white text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="student_name" className="block mb-2 font-semibold text-ink-800 text-sm">
                      お子さまのお名前 <span className="text-pink text-xs">*必須</span>
                    </label>
                    <input 
                      id="student_name" 
                      name="お子さま氏名" 
                      type="text" 
                      placeholder="例）山田 太郎" 
                      required 
                      className="w-full box-border border-2 border-black/[0.08] rounded-xl p-4 font-[inherit] text-ink-900 bg-white text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* メール・電話 */}
              <div className="form-section">
                <h3 className="text-ink-900 font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  ご連絡先
                </h3>
                <div className="grid grid-cols-1 gap-4 form-grid-2">
                  <div>
                    <label htmlFor="email" className="block mb-2 font-semibold text-ink-800 text-sm">
                      メールアドレス <span className="text-pink text-xs">*必須</span>
                    </label>
                    <input 
                      id="email" 
                      name="メール" 
                      type="email" 
                      placeholder="例）example@example.com" 
                      required 
                      className="w-full box-border border-2 border-black/[0.08] rounded-xl p-4 font-[inherit] text-ink-900 bg-white text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="tel" className="block mb-2 font-semibold text-ink-800 text-sm">
                      お電話番号 <span className="text-ink-500 text-xs">任意</span>
                    </label>
                    <input 
                      id="tel" 
                      name="電話" 
                      type="tel" 
                      placeholder="例）090-1234-5678" 
                      className="w-full box-border border-2 border-black/[0.08] rounded-xl p-4 font-[inherit] text-ink-900 bg-white text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 学年・希望コース */}
              <div className="form-section">
                <h3 className="text-ink-900 font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  学年とコース
                </h3>
                <div className="grid grid-cols-1 gap-4 form-grid-2">
                  <div>
                    <label htmlFor="grade" className="block mb-2 font-semibold text-ink-800 text-sm">
                      学年 <span className="text-pink text-xs">*必須</span>
                    </label>
                    <select 
                      id="grade" 
                      name="学年" 
                      required 
                      className="w-full box-border border-2 border-black/[0.08] rounded-xl p-4 font-[inherit] text-ink-900 bg-white text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%234b5563' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        paddingRight: '3rem'
                      }}
                    >
                      <option value="" disabled>選択してください</option>
                      <option>小1</option>
                      <option>小2</option>
                      <option>小3</option>
                      <option>小4</option>
                      <option>小5</option>
                      <option>小6</option>
                      <option>中1</option>
                      <option>中2</option>
                      <option>中3</option>
                      <option>高1</option>
                      <option>高2</option>
                      <option>高3</option>
                      <option>その他</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="course" className="block mb-2 font-semibold text-ink-800 text-sm">
                      希望コース <span className="text-pink text-xs">*必須</span>
                    </label>
                    <select 
                      id="course" 
                      name="希望コース" 
                      required 
                      className="w-full box-border border-2 border-black/[0.08] rounded-xl p-4 font-[inherit] text-ink-900 bg-white text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%234b5563' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        paddingRight: '3rem'
                      }}
                    >
                      <option value="" disabled>選択してください</option>
                      <option>キャリアコース（クエスト・PBL・ジブンクラフト）</option>
                      <option>マイクラSDGsコース</option>
                      <option>ロボットプログラミングコース</option>
                      <option>未定（相談したい）</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 希望日時 */}
              <div className="form-section">
                <h3 className="text-ink-900 font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  体験希望日時
                </h3>
                <div className="grid grid-cols-1 gap-4 form-grid-2">
                  <div>
                    <label htmlFor="date_pref" className="block mb-2 font-semibold text-ink-800 text-sm">
                      第1希望 <span className="text-ink-500 text-xs">任意</span>
                    </label>
                    <input 
                      id="date_pref" 
                      name="第1希望" 
                      type="text" 
                      placeholder="例）9/10（火）19:00" 
                      className="w-full box-border border-2 border-black/[0.08] rounded-xl p-4 font-[inherit] text-ink-900 bg-white text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="date_pref2" className="block mb-2 font-semibold text-ink-800 text-sm">
                      第2希望 <span className="text-ink-500 text-xs">任意</span>
                    </label>
                    <input 
                      id="date_pref2" 
                      name="第2希望" 
                      type="text" 
                      placeholder="例）9/11（水）19:00" 
                      className="w-full box-border border-2 border-black/[0.08] rounded-xl p-4 font-[inherit] text-ink-900 bg-white text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* メッセージ */}
              <div className="form-section">
                <h3 className="text-ink-900 font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  ご相談内容・お子さまのご様子
                </h3>
                <div>
                  <label htmlFor="note" className="block mb-2 font-semibold text-ink-800 text-sm">
                    メッセージ <span className="text-ink-500 text-xs">任意</span>
                  </label>
                  <textarea 
                    id="note" 
                    name="メッセージ" 
                    rows={5}
                    placeholder="例）興味がありそうな分野／進路の悩み／PC環境 など、お気軽にご記入ください。" 
                    className="w-full box-border border-2 border-black/[0.08] rounded-xl p-4 font-[inherit] text-ink-900 bg-white text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button 
                  className="w-full md:w-auto inline-flex items-center justify-center gap-3 py-4 px-8 rounded-full font-bold border-0 shadow-lg bg-gradient-to-r from-brand to-[#2da89e] text-white cursor-pointer text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  type="submit"
                  style={{ fontFamily: zenMaru.style.fontFamily }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  送信する
                </button>
                <p className="text-ink-500 text-sm mt-4 flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  送信後、受付確認メールが自動返信されます。
                </p>
              </div>
            </form>
          </div>
        </Section>
      </MobileContainer>

      {/* トップページの入会までの流れ以降のセクション */}
      <FlowApply />
      <FAQ />
      <Students />

    </div>
  );
}
