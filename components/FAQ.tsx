import { SectionTitle } from './craft/SectionTitle';

const faqs: { q: string; a: string }[] = [
  {
    q: '対象年齢は何歳からですか？',
    a: '推奨は小学5年生からですが、興味や意欲があれば学年に関わらず参加できます。'
  },
  {
    q: '体験に費用はかかりますか？',
    a: 'いいえ。1ヶ月間の無料体験が可能です。'
  },
  {
    q: '体験後に入会を断っても大丈夫ですか？',
    a: 'もちろん大丈夫です。強引な勧誘は一切ありません。'
  },
  {
    q: 'カリキュラムの内容はどのようなものですか？',
    a: '学校では学ぶ機会が少ない「お金」「IT」「発表」などを動画で学びます。ただ視聴するだけでなく「自分で意見を持ち、それを共有する」ことで、より自分事として学びを理解する形式です。詳しくはPDF資料をご覧ください。'
  },
  {
    q: 'オンラインと対面、どちらですか？',
    a: '基本はオンラインで学びを進めていきますが、発表会やイベントは対面で行うこともあります。'
  },
  {
    q: '入会後にやめたいときはどうなりますか？',
    a: '月単位での解約が可能です。'
  }
];

export function FAQ() {
  return (
    <section className="hp-section" id="faq">
      <div className="container">
        <div className="hp-section-head">
          <SectionTitle variant={1} lineColor="var(--pink)">
            よくある質問
          </SectionTitle>
        </div>

        <div className="hp-faq-list">
          {faqs.map((faq, i) => (
            <details key={i} className="hp-faq-item craft-paper craft-tilt reveal">
              <summary>
                <span>{faq.q}</span>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="hp-faq-a">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
