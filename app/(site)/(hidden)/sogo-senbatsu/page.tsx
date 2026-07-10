import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { SectionTitle } from '@/components/craft/SectionTitle';
import { SogoCtaDoors } from '@/components/sogo-senbatsu/SogoCtaDoors';

export const metadata: Metadata = {
  title: '総合型選抜コース',
  description:
    '総合型選抜は、自分でルートを作れる入試。CLAFT総合型選抜コースは、その準備を「対話と遊び」から始める全8回のプログラムです。八尾・オンライン対応。',
  alternates: { canonical: '/sogo-senbatsu' },
  robots: { index: false, follow: false }, // 仮コースのため非公開。公開時に削除
};

const journeySteps: { no: string; title: string; desc: string }[] = [
  {
    no: '01',
    title: '引っかかりの考古学',
    desc: '「なんか気になる」を発掘する回。好きなもの、違和感、引っかかり——机に全部並べて、きみだけの地層を掘ってみる。',
  },
  {
    no: '02',
    title: '手で作る自分',
    desc: '言葉にする前に、手を動かす。工作やコラージュで「いまの自分」をかたちにしてみると、話せることが増えている。',
  },
  {
    no: '03',
    title: '強みの棚卸し',
    desc: 'できないことではなく、できてしまうことを数える回。自分では当たり前すぎて見えない強みを、対話の中で見つける。',
  },
  {
    no: '04',
    title: '4つの問い',
    desc: '「何をしてきた？」「何が好き？」「何を学びたい？」「その先で何をしたい？」——きみの物語の骨になる4つの問いと、はじめて向き合う。',
  },
  {
    no: '05',
    title: 'Talk Tacticsで遊ぶ',
    desc: 'カードゲームで「話す・聞く」を遊ぶ回。うまく話すためじゃなく、話すことが少し楽しくなるために。',
  },
  {
    no: '06',
    title: '対話を小論文に',
    desc: 'しゃべった言葉の中に、もう文章の種はある。話したことを書き言葉に置き換えて、自分の考えを紙の上に立たせる。',
  },
  {
    no: '07',
    title: 'Yes, and 面接ラボ',
    desc: '面接は試験じゃなく、対話。相手の言葉に「はい、そして」で乗っかる即興の練習場。',
  },
  {
    no: '08',
    title: '二重円と旅の地図',
    desc: '「自分がやりたいこと」と「世界が求めていること」の重なりを探して、ここから先のルートを自分の手で描く。',
  },
];

const worldCards: { tag: string; body: string }[] = [
  {
    tag: 'イギリス',
    body: 'イギリスでは「話すこと（オーラシー）」が、読み書きと同じように学ぶべきスキルとして扱われています。',
  },
  {
    tag: 'フィンランド',
    body: 'フィンランドの教室では、弱みの矯正ではなく「その子の強み」に注目して記録する実践が広がっています。',
  },
  {
    tag: '国際バカロレア（IB）',
    body: '世界共通の大学入学資格IBでは、「それはどうやって知ったの？」と知識そのものを問う科目（TOK）が必修になっています。',
  },
  {
    tag: 'アメリカ',
    body: 'アメリカの大学入試では、テストの点数だけでなく、エッセイ＝「自分の物語」が合否を左右します。',
  },
];

const faqItems: { q: string; a: string }[] = [
  {
    q: '内申点や出席日数が心配です。',
    a: 'A. 評定や出欠を出願要件にしない大学は多数あります。まず面談で、お子さんに開かれているルートを一緒に確認しましょう。',
  },
  {
    q: '人と話すのが苦手なのですが。',
    a: 'A. このコースは「話さない権利」の保障から始まります（このページの3つのルールをご覧ください）。手で作ることから言葉が生まれる回もあります。',
  },
  {
    q: '通信制高校でも大丈夫ですか？',
    a: 'A. はい。むしろ時間の自由度が、探究活動の強みになります。',
  },
];

export default function SogoSenbatsuPage() {
  return (
    <main className="sg-page" style={{ ['--accent-rgb' as string]: '224 158 22' } as CSSProperties}>
      {/* ========== S1｜ファーストビュー ========== */}
      <section className="sg-section sg-hero">
        <div className="container">
          <span className="sg-hero-lamp" aria-hidden="true" />
          <h1 className="sg-hero-title craft-misprint reveal">
            学校の成績で、きみの価値は測れない。
            <br />
            ——じゃあ、<span className="sg-highlight">何で測る？</span>
          </h1>
          <p className="sg-hero-lead reveal">
            総合型選抜は、自分でルートを作れる入試。
            <br />
            CLAFT総合型選抜コースは、その準備を「対話と遊び」から始める場所です。
          </p>
          <SogoCtaDoors location="sogo-senbatsu-hero" />
        </div>
      </section>

      {/* ========== S2｜この場所の3つのルール ========== */}
      <section className="sg-section sg-rules">
        <div className="container">
          <p className="sg-rules-eyebrow craft-label">はじめに、この場所のルール</p>
          <div className="sg-rules-paper craft-paper craft-paper--white reveal">
            <ol className="sg-rule-list">
              <li className="sg-rule-item">
                <span className="sg-rule-num" aria-hidden="true">
                  1
                </span>
                話したくないときは、パスしていい。
              </li>
              <li className="sg-rule-item">
                <span className="sg-rule-num" aria-hidden="true">
                  2
                </span>
                カメラはオフでもいい。
              </li>
              <li className="sg-rule-item">
                <span className="sg-rule-num" aria-hidden="true">
                  3
                </span>
                失敗は、次のアイデアへのギフト。
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ========== S3｜8回の旅の地図 ========== */}
      <section className="sg-section sg-journey">
        <div className="container">
          <div className="sg-section-head">
            <SectionTitle eyebrow="8 WEEKS" variant={1} lineColor="rgb(var(--accent-rgb))">
              8回の旅の地図
            </SectionTitle>
          </div>

          <ol className="sg-journey-list">
            {journeySteps.map((step, i) => (
              <li className="sg-journey-item reveal" key={step.no} style={{ transitionDelay: `${i * 50}ms` }}>
                <span className="sg-journey-marker" aria-hidden="true">
                  {step.no}
                </span>
                <details className="sg-acc">
                  <summary>
                    <span className="sg-acc-title">{step.title}</span>
                    <span className="sg-acc-pill" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                        <polyline points="6,9 12,15 18,9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </summary>
                  <div className="sg-acc-body">
                    <p>{step.desc}</p>
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ========== S4｜世界の教室から ========== */}
      <section className="sg-section sg-world">
        <div className="container">
          <div className="sg-section-head">
            <SectionTitle eyebrow="GLOBAL" variant={2} lineColor="rgb(var(--accent-rgb))">
              世界の教室から
            </SectionTitle>
          </div>

          <div className="sg-world-list">
            {worldCards.map((card, i) => (
              <div
                className="sg-world-card craft-paper craft-paper--warm craft-tilt reveal"
                key={card.tag}
                style={{ '--rot': i % 2 === 0 ? '-0.6deg' : '0.6deg', transitionDelay: `${i * 60}ms` } as CSSProperties}
              >
                <span className="craft-label sg-world-tag">{card.tag}</span>
                <p>{card.body}</p>
              </div>
            ))}
          </div>

          <p className="sg-world-close reveal">
            怪しい独自メソッドではありません。世界の教室で当たり前に行われていることを、日本の入試のかたちに合わせて束ねたコースです。
          </p>
        </div>
      </section>

      {/* ========== ここから保護者ゾーン（S5〜S8） ========== */}
      <div className="sg-parents">
        {/* ========== S5｜総合型選抜とは ========== */}
        <section className="sg-section sg-parents-intro">
          <div className="container">
            <p className="sg-parents-divider reveal">
              <span>—— ここから、保護者の方へ ——</span>
            </p>

            <div className="sg-section-head">
              <SectionTitle eyebrow="ABOUT" variant={3} lineColor="rgb(var(--accent-rgb))">
                総合型選抜とは
              </SectionTitle>
            </div>

            <div className="sg-elements reveal">
              <ol className="sg-elements-list">
                <li>知識・技能</li>
                <li>思考力・判断力・表現力</li>
                <li>主体性を持って多様な人々と協働して学ぶ態度</li>
              </ol>
              <p>総合型選抜は、この②③を書類と対話で見る入試です。</p>
            </div>

            <div className="sg-questions reveal">
              <p className="sg-questions-lead">志望理由書の4つの問い</p>
              <ul className="sg-questions-list">
                <li className="craft-label">きっかけ</li>
                <li className="craft-label">いま学んでいること</li>
                <li className="craft-label">大学で学びたいこと</li>
                <li className="craft-label">その先で何をしたいか</li>
              </ul>
              <p>S3の8回は、この4つに自分の言葉で答えられるようになるための旅です。</p>
            </div>

            <div className="sg-note craft-paper craft-paper--ruled reveal">
              <p>
                評定平均を出願要件にしている大学もありますが、それは多くの場合「足切り」の基準にすぎません。合否を分けるのは、志望理由の物語に説得力があるかどうか。だからこのコースは、点数ではなく物語を育てます。
              </p>
            </div>
          </div>
        </section>

        {/* ========== S6｜FAQ ========== */}
        <section className="sg-section sg-faq">
          <div className="container">
            <div className="sg-section-head">
              <SectionTitle eyebrow="FAQ" variant={1} lineColor="rgb(var(--accent-rgb))">
                よくある質問
              </SectionTitle>
            </div>

            <div className="sg-faq-list">
              {faqItems.map((item, i) => (
                <details className="sg-acc reveal" key={item.q} style={{ transitionDelay: `${i * 60}ms` }}>
                  <summary>
                    <span className="sg-faq-q" aria-hidden="true">
                      Q
                    </span>
                    <span className="sg-acc-title">{item.q}</span>
                    <span className="sg-acc-pill" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                        <polyline points="6,9 12,15 18,9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </summary>
                  <div className="sg-acc-body">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ========== S7｜伴走者 ========== */}
        <section className="sg-section sg-guide">
          <div className="container">
            <div className="sg-section-head">
              <SectionTitle eyebrow="GUIDE" variant={2} lineColor="rgb(var(--accent-rgb))">
                伴走者
              </SectionTitle>
            </div>

            <div className="sg-guide-body reveal">
              <div className="sg-photo-ph" aria-hidden="true">
                <span>写真準備中</span>
              </div>
              <div>
                <p>
                  <strong>伴走するのは、キャリアコンサルタント（国家資格）です。</strong>
                </p>
                <p>
                  ものづくり教育【要確認：実年数】年。CLAFTの教室で、手を動かすことから言葉が生まれる瞬間を見続けてきました。
                </p>
                <p>
                  大手予備校ではありません。一人ひとりの顔が見える人数しか、お預かりしません。だから、きみの「引っかかり」を覚えていられます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== S8｜料金・形態・CTA ========== */}
        <section className="sg-section sg-close">
          <div className="container">
            <div className="sg-section-head">
              <SectionTitle eyebrow="PRICE" variant={3} lineColor="rgb(var(--accent-rgb))">
                料金・形態
              </SectionTitle>
            </div>

            <div className="sg-price craft-paper reveal">
              <ul className="sg-price-list">
                <li>連続8回コース（対面@八尾 ／ オンライン）</li>
                <li>修了後は、出願まで個別伴走（詳細は面談で）</li>
              </ul>
              <p className="sg-price-note">料金は現在準備中です。面談時にご説明します。</p>
            </div>

            <p className="sg-close-question reveal">
              きみの価値を測るものさしを、誰かに渡したままにしますか？ それとも、自分で作りますか？
            </p>

            <SogoCtaDoors location="sogo-senbatsu-footer" />

            <p className="sg-anchor reveal">
              <span aria-hidden="true">●</span> CLAFT ／ キープオン株式会社
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
