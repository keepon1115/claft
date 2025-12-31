'use client';

import { Zen_Maru_Gothic } from 'next/font/google';

const zenMaru = Zen_Maru_Gothic({
  weight: ['500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export function FAQ(){
  return (
    <section className="section container py-10" id="faq">
      <h2 className="heading-lg mb-8 text-center" style={{ fontFamily: zenMaru.style.fontFamily }}>
        よくある質問
      </h2>
      
      <div className="space-y-3">
        <details className="bg-white rounded-xl shadow-lg p-5 open:pb-6 transition-all hover:shadow-xl group">
          <summary className="font-bold cursor-pointer list-none text-ink-900 flex items-center justify-between text-base">
            <span>対象年齢は何歳からですか？</span>
            <svg className="w-5 h-5 text-brand transition-transform group-open:rotate-180 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <p className="body-base text-ink-700 mt-4 pl-1 leading-relaxed">
            推奨は小学5年生からですが、興味や意欲があれば学年に関わらず参加できます。
          </p>
        </details>

        <details className="bg-white rounded-xl shadow-lg p-5 open:pb-6 transition-all hover:shadow-xl group">
          <summary className="font-bold cursor-pointer list-none text-ink-900 flex items-center justify-between text-base">
            <span>体験に費用はかかりますか？</span>
            <svg className="w-5 h-5 text-brand transition-transform group-open:rotate-180 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <p className="body-base text-ink-700 mt-4 pl-1 leading-relaxed">
            いいえ。1ヶ月間の無料体験が可能です。
          </p>
        </details>

        <details className="bg-white rounded-xl shadow-lg p-5 open:pb-6 transition-all hover:shadow-xl group">
          <summary className="font-bold cursor-pointer list-none text-ink-900 flex items-center justify-between text-base">
            <span>体験後に入会を断っても大丈夫ですか？</span>
            <svg className="w-5 h-5 text-brand transition-transform group-open:rotate-180 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <p className="body-base text-ink-700 mt-4 pl-1 leading-relaxed">
            もちろん大丈夫です。強引な勧誘は一切ありません。
          </p>
        </details>

        <details className="bg-white rounded-xl shadow-lg p-5 open:pb-6 transition-all hover:shadow-xl group">
          <summary className="font-bold cursor-pointer list-none text-ink-900 flex items-center justify-between text-base">
            <span>カリキュラムの内容はどのようなものですか？</span>
            <svg className="w-5 h-5 text-brand transition-transform group-open:rotate-180 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <p className="body-base text-ink-700 mt-4 pl-1 leading-relaxed">
            学校では学ぶ機会が少ない「お金」「IT」「発表」などを動画で学びます。ただ視聴するだけでなく「自分で意見を持ち、それを共有する」ことで、より自分事として学びを理解する形式です。詳しくはPDF資料をご覧ください。
          </p>
        </details>

        <details className="bg-white rounded-xl shadow-lg p-5 open:pb-6 transition-all hover:shadow-xl group">
          <summary className="font-bold cursor-pointer list-none text-ink-900 flex items-center justify-between text-base">
            <span>オンラインと対面、どちらですか？</span>
            <svg className="w-5 h-5 text-brand transition-transform group-open:rotate-180 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <p className="body-base text-ink-700 mt-4 pl-1 leading-relaxed">
            基本はオンラインで学びを進めていきますが、発表会やイベントは対面で行うこともあります。
          </p>
        </details>

        <details className="bg-white rounded-xl shadow-lg p-5 open:pb-6 transition-all hover:shadow-xl group">
          <summary className="font-bold cursor-pointer list-none text-ink-900 flex items-center justify-between text-base">
            <span>入会後にやめたいときはどうなりますか？</span>
            <svg className="w-5 h-5 text-brand transition-transform group-open:rotate-180 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <p className="body-base text-ink-700 mt-4 pl-1 leading-relaxed">
            月単位での解約が可能です。
          </p>
        </details>
      </div>
    </section>
  );
}
