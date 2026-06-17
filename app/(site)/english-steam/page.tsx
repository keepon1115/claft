import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { SectionTitle } from '@/components/craft/SectionTitle';
import { Underline, ArrowDownDoodle, ArrowRightDoodle, CrossDoodle } from '@/components/craft/HandDrawn';
import { DoodleIcon, type DoodleIconName } from '@/components/craft/DoodleIcon';

export const metadata: Metadata = {
  title: '英会話×STEAMコース | CLAFT',
  description:
    '英語×STEAMの1on1個別カリキュラム。「作る→英語で深める→発表する」を1ヶ月1サイクルで回し、世界中で自分の意見を伝えられる人を目指します。',
};

const IMG = '/assets/images/english-steam';

// 「気づく学び」の3ステップ
const steps: { icon: DoodleIconName; title: string; body: string; accentRgb: string; rot: string }[] = [
  {
    icon: 'bulb',
    title: '考える',
    body: 'ただ聞く・見るではなく、頭をひねって考え、アイデアを発想すれば、自然と集中状態へ',
    accentRgb: 'var(--brand-rgb)',
    rot: '-1.2deg',
  },
  {
    icon: 'wrench',
    title: 'つくる',
    body: 'アイデアを形にする過程で、トライアンドエラーを繰り返しながら自分の納得解をつくる',
    accentRgb: 'var(--green-rgb)',
    rot: '0.8deg',
  },
  {
    icon: 'talk',
    title: 'つたえる',
    body: '他者への発表を通して自分の学びを言語化すれば自己理解にもつながる',
    accentRgb: 'var(--pink-rgb)',
    rot: '-0.6deg',
  },
];

// アウトプットの機会
const outputs: { no: string; title: string; body: string; accentRgb: string }[] = [
  {
    no: '01',
    title: 'キープオンのロボット発表会',
    body: '月4回テーマに沿ってオリジナルロボットを制作して発表。慣れた環境で経験を積み、フィードバックをもとに改善を繰り返します。',
    accentRgb: '224 158 22',
  },
  {
    no: '02',
    title: '国際ロボット競技会URCへの参加',
    body: 'アジア中心に、アーテックロボで学ぶ世界中の子どもたちが、オリジナルロボットとプログラミング技術を競い合う国際大会です。',
    accentRgb: 'var(--green-rgb)',
  },
  {
    no: '03',
    title: 'URC過去動画の視聴と分析',
    body: '近年は海外勢が強く、キープオンの世界大会出場は2019年が最後。他国の同年代のプレゼン動画を視聴・分析し、大会にチャレンジできます。',
    accentRgb: 'var(--brand-rgb)',
  },
  {
    no: '04',
    title: 'その他（STEAMキャンプなど）',
    body: '2026年2月にオンラインでSTEAMキャンプを実施。5月には、交流したマレーシア・バングラデシュの子どもたちへ、キープオンのロボット発表会の動画を送り、交流を深めていきます。',
    accentRgb: 'var(--violet-rgb)',
  },
];

export default function EnglishSteamPage() {
  return (
    <main className="es-page">
      {/* ========== Hero ========== */}
      <section className="es-hero">
        <div className="container">
          <p className="es-hero-eyebrow reveal">
            <span className="craft-label">GLOBAL CITIZEN PROGRAM</span>
          </p>

          <h1 className="es-hero-title craft-misprint reveal">
            英語
            <span className="es-hero-x" aria-hidden="true">
              <CrossDoodle width={40} className="craft-draw" />
            </span>
            <span className="es-hero-x-sr">×</span>
            STEAM
            <span className="es-hero-title-sub">個別カリキュラム</span>
          </h1>

          <p className="es-hero-tagline reveal">
            〜 世界中で<span className="craft-highlight">自分の意見を伝えられる人</span>を目指して 〜
          </p>

          <div
            className="es-hero-photo craft-photo craft-tilt reveal"
            style={{ '--rot': '-1.1deg' } as CSSProperties}
          >
            <span className="craft-tape craft-tape--cream" aria-hidden="true" />
            <img
              src={`${IMG}/hero-illustration.png`}
              alt="英語でプレゼンする子どもたちのイラスト"
              width={1503}
              height={1010}
            />
          </div>

          <p className="es-hero-note reveal">
            内容は<strong>お子さまの興味に合わせてカスタマイズ可能</strong>な、
            <strong>1on1の個別カリキュラム</strong>です。
          </p>
        </div>
      </section>

      {/* ========== 「今」の強みを「未来」の武器へ ========== */}
      <section className="es-section">
        <div className="container">
          <div className="es-section-head">
            <SectionTitle eyebrow="STRENGTH" variant={1} lineColor="var(--cream)">
              「今」の強みを「未来」の武器へ
            </SectionTitle>
          </div>

          <div className="es-now-flow">
            <div
              className="es-card craft-paper craft-tilt reveal"
              style={{ '--rot': '-0.8deg', '--accent-rgb': 'var(--green-rgb)' } as CSSProperties}
            >
              <span className="craft-tape craft-tape--green" aria-hidden="true" />
              <h3 className="es-card-title">お子さまの現在</h3>
              <div className="es-now-photos" aria-hidden="true">
                <img src={`${IMG}/now-classroom.png`} alt="" width={460} height={442} style={{ '--rot': '-2deg' } as CSSProperties} />
                <img src={`${IMG}/now-laptop.png`} alt="" width={456} height={400} style={{ '--rot': '1.6deg' } as CSSProperties} />
              </div>
              <ul className="es-list">
                <li>既に英語が堪能であり、発音・文法・語彙といった「語学スキル」の基礎は完成している</li>
                <li>STEAM（ものづくり・科学・技術）への極めて強い知的好奇心がある</li>
              </ul>
            </div>

            <div className="es-flow-arrow reveal" aria-hidden="true">
              <ArrowDownDoodle width={36} className="craft-draw" />
            </div>

            <div
              className="es-card craft-paper craft-paper--warm craft-tilt reveal"
              style={{ '--rot': '0.7deg', '--accent-rgb': '224 158 22' } as CSSProperties}
            >
              <span className="craft-tape craft-tape--cream" aria-hidden="true" />
              <h3 className="es-card-title">これからの挑戦</h3>
              <ul className="es-list">
                <li>英語を使って、STEAMや社会のことを学ぶことで、英語を「学ぶ対象」から「学ぶ道具」へと昇華させる</li>
                <li>社会課題をテーマに、自分なりの解決策を考え、英語で堂々とプレゼンできるようになる</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== これからの時代、差がつくのは ========== */}
      <section className="es-section">
        <div className="container">
          <div className="es-section-head">
            <SectionTitle eyebrow="WHY" variant={2} lineColor="var(--brand)">
              これからの時代、差がつくのは ─
            </SectionTitle>
          </div>

          <div className="es-what reveal">
            <p className="es-what-word craft-misprint--cream" aria-hidden="true">
              What
            </p>
            <p className="es-what-caption">
              英語で<span className="craft-highlight">「何を」</span>語れるか
            </p>
          </div>

          <p className="es-body reveal">
            英語が話せる子は、これからますます増えていきます。
            <br />
            目指すのは、世界中の社会課題に対し、自分の意見を持ち、解決策を提案できる姿です。
          </p>

          <div
            className="es-camp craft-paper craft-paper--ruled craft-tilt reveal"
            style={{ '--rot': '0.6deg' } as CSSProperties}
          >
            <span className="craft-tape craft-tape--pink craft-tape--tl" aria-hidden="true" />
            <p className="es-camp-tag">STEAMキャンプでみたマレーシア、バングラデシュの子どもたち</p>
            <div className="es-camp-photo craft-photo craft-tilt" style={{ '--rot': '-1deg' } as CSSProperties}>
              <img
                src={`${IMG}/steam-camp.png`}
                alt="国際ロボット競技会で国旗を掲げるマレーシア・バングラデシュの子どもたち"
                width={1230}
                height={350}
              />
            </div>
            <p>
              社会課題をテーマに、自分なりの解決策を考え、英語で堂々とプレゼンする姿に圧倒されました。
              また、急な質問にも、自分たちで考え意見を共有する姿にも驚きました。
            </p>
          </div>

          <p className="es-what-close reveal">
            <strong>
              お子さまも、その姿を目指せる ── そう確信しています。
              <Underline variant={3} className="es-close-line craft-draw" />
            </strong>
          </p>
        </div>
      </section>

      {/* ========== 「英語ができる子」の、その先へ（月間サイクル） ========== */}
      <section className="es-section">
        <div className="container">
          <div className="es-section-head">
            <SectionTitle eyebrow="CURRICULUM" variant={3} lineColor="var(--pink)">
              「英語ができる子」の、その先へ
            </SectionTitle>
            <p className="lead es-section-lead">
              「作る → 英語で深める → 発表する」を、1ヶ月で1サイクル。
              <br />
              ロボット月2回 × 英会話月2回（推奨）。
            </p>
          </div>

          <div className="es-cycle reveal" role="img" aria-label="作る、英語で深める、発表するのサイクル">
            <span className="es-cycle-chip" style={{ '--accent-rgb': 'var(--pink-rgb)' } as CSSProperties}>
              作る
            </span>
            <ArrowRightDoodle width={26} className="es-cycle-arrow craft-draw" />
            <span className="es-cycle-chip" style={{ '--accent-rgb': 'var(--green-rgb)' } as CSSProperties}>
              英語で深める
            </span>
            <ArrowRightDoodle width={26} className="es-cycle-arrow craft-draw" />
            <span className="es-cycle-chip" style={{ '--accent-rgb': '224 158 22' } as CSSProperties}>
              発表する
            </span>
          </div>

          <div className="es-week-flow">
            <article
              className="es-week craft-paper craft-tilt reveal"
              style={{ '--rot': '-0.7deg', '--accent-rgb': 'var(--pink-rgb)' } as CSSProperties}
            >
              <span className="craft-tape craft-tape--pink" aria-hidden="true" />
              <header className="es-week-head">
                <span className="es-week-no">WEEK 1・3</span>
                <span className="es-week-staff">エジソンコース：日本人スタッフ</span>
              </header>
              <h3 className="es-week-title">ロボットプログラミング</h3>
              <p className="es-week-sub">仲間たちがいる場で、ロボットプログラミングを学ぶ。</p>
              <div className="es-week-body">
                <div className="es-week-photo craft-photo craft-tilt" style={{ '--rot': '-1.6deg' } as CSSProperties}>
                  <img src={`${IMG}/robot-kid.png`} alt="ロボットを組み立てる子ども" width={367} height={525} />
                </div>
                <ul className="es-list">
                  <li>日本人講師と一緒に、信号機を実際に作る。</li>
                  <li>カリキュラムに沿って、仕組み・回路・プログラムをしっかり理解する。</li>
                  <li>オリジナルロボット制作に挑戦し、英語でプレゼンする。</li>
                </ul>
              </div>
            </article>

            <div className="es-flow-arrow reveal" aria-hidden="true">
              <ArrowDownDoodle width={36} className="craft-draw" />
            </div>

            <article
              className="es-week craft-paper craft-tilt reveal"
              style={{ '--rot': '0.8deg', '--accent-rgb': 'var(--green-rgb)' } as CSSProperties}
            >
              <span className="craft-tape craft-tape--green" aria-hidden="true" />
              <header className="es-week-head">
                <span className="es-week-no">WEEK 2・4</span>
                <span className="es-week-staff">英会話：ニュージーランド育ちの日本人スタッフ</span>
              </header>
              <h3 className="es-week-title">英語で深める・意見を語る</h3>
              <p className="es-week-sub">1on1で、ロボットで学んだ仕組みを英語で深め、自分の意見を語る練習へ。</p>
              <div className="es-week-body">
                <div className="es-week-photo craft-photo craft-tilt" style={{ '--rot': '1.4deg' } as CSSProperties}>
                  <img src={`${IMG}/hellokiwi-logo.png`} alt="Hello Kiwi英会話のロゴ" width={600} height={482} />
                </div>
                <ul className="es-list">
                  <li>NZ育ち講師と、ロボットのテーマに沿った英会話。NZの信号事情との比較や、関連語彙（circuit, sensor等）を習得。</li>
                  <li>「交通事故を減らすには？」「高齢者が安全に渡るには？」など、社会課題について、英語で自分の意見を語る。</li>
                </ul>
              </div>
            </article>
          </div>

          <p className="es-note reveal">※ 英会話はチケット制のため、追加受講も可能です。</p>
        </div>
      </section>

      {/* ========== STEAMは「気づく学び」 ========== */}
      <section className="es-section">
        <div className="container">
          <div className="es-section-head">
            <SectionTitle eyebrow="STEAM" variant={1} lineColor="var(--green)">
              STEAMは、覚える学びではなく「気づく学び」
            </SectionTitle>
          </div>

          <div className="es-steps">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="es-step craft-paper craft-tilt craft-lift reveal"
                style={
                  {
                    '--rot': step.rot,
                    '--accent-rgb': step.accentRgb,
                    transitionDelay: `${i * 90}ms`,
                  } as CSSProperties
                }
              >
                <span className="es-step-icon" aria-hidden="true">
                  <DoodleIcon name={step.icon} size={34} />
                </span>
                <h3 className="es-step-title">{step.title}</h3>
                <p className="es-step-body">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="es-compare">
            <div className="es-compare-old craft-paper reveal" style={{ '--rot': '-0.4deg' } as CSSProperties}>
              <p className="es-compare-tag">従来型の教育</p>
              <h3 className="es-compare-title">バラバラに学ぶ</h3>
              <ul className="es-compare-list">
                <li>算数の時間 → 数を解く</li>
                <li>理科の時間 → 実験する</li>
                <li>図工の時間 → 作品を作る</li>
                <li>英語の時間 → 単語を覚える</li>
              </ul>
              <p className="es-compare-result">→ 現実とつながりにくい</p>
            </div>

            <div className="es-flow-arrow reveal" aria-hidden="true">
              <ArrowDownDoodle width={36} className="craft-draw" />
            </div>

            <div
              className="es-compare-new craft-paper craft-paper--warm craft-tilt reveal"
              style={{ '--rot': '0.6deg', '--accent-rgb': '224 158 22' } as CSSProperties}
            >
              <span className="craft-tape craft-tape--cream" aria-hidden="true" />
              <p className="es-compare-tag es-compare-tag--new">STEAM型の教育</p>
              <h3 className="es-compare-title">
                横断して学ぶ
                <span className="es-compare-copy">「現実世界に近い、生きた学び」</span>
              </h3>
              <p className="es-compare-theme">「信号機を作る」というたった1つのテーマに─</p>
              <ul className="es-check-list">
                <li>算数（タイミング・数値）</li>
                <li>理科（電気・回路）</li>
                <li>工学（設計・組立）</li>
                <li>図工・芸術（色・デザイン）</li>
                <li>英語（世界共通の語彙で発信）</li>
              </ul>
              <p className="es-steam-letters" aria-label="STEAMはScience、Technology、Engineering、Art、Mathematicsの頭文字">
                <span>Science</span>
                <span>Technology</span>
                <span>Engineering</span>
                <span>Art</span>
                <span>Mathematics</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 「発表する場」で定期的にアウトプット ========== */}
      <section className="es-section">
        <div className="container">
          <div className="es-section-head">
            <SectionTitle eyebrow="OUTPUT" variant={2} lineColor="var(--violet)">
              「発表する場」で定期的にアウトプット
            </SectionTitle>
            <p className="lead es-section-lead">
              プレゼン力は、聞く人がいてはじめて磨かれる。キープオンにはアウトプットの機会が豊富！
            </p>
          </div>

          <div className="es-output-grid">
            {outputs.map((item, i) => (
              <div
                key={item.no}
                className="es-output craft-paper craft-tilt reveal"
                style={
                  {
                    '--rot': i % 2 === 0 ? '-0.6deg' : '0.6deg',
                    '--accent-rgb': item.accentRgb,
                    transitionDelay: `${i * 80}ms`,
                  } as CSSProperties
                }
              >
                <span className="es-output-no" aria-hidden="true">
                  {item.no}
                </span>
                <div>
                  <h3 className="es-output-title">{item.title}</h3>
                  <p className="es-output-body">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 2年後の姿 ========== */}
      <section className="es-section">
        <div className="container">
          <div className="es-section-head">
            <SectionTitle eyebrow="2 YEARS LATER" variant={3} lineColor="var(--cream)">
              2年後の姿
            </SectionTitle>
          </div>

          <div className="es-future">
            <div className="es-future-before craft-paper reveal" style={{ '--rot': '-0.5deg' } as CSSProperties}>
              <h3 className="es-future-title">「英語ができる子」</h3>
              <ul className="es-dash-list">
                <li>発音・文法が正確</li>
                <li>日常会話ができる</li>
                <li>海外の友達と話せる</li>
                <li>学校英語で困らない</li>
              </ul>
            </div>

            <div className="es-flow-arrow reveal" aria-hidden="true">
              <ArrowDownDoodle width={36} className="craft-draw" />
            </div>

            <div
              className="es-future-after craft-paper craft-paper--warm craft-tilt reveal"
              style={{ '--rot': '0.8deg', '--accent-rgb': '224 158 22' } as CSSProperties}
            >
              <span className="craft-tape craft-tape--cream" aria-hidden="true" />
              <h3 className="es-future-title es-future-title--after">
                「英語で
                <br />
                世界を変えられる子」
              </h3>
              <div className="es-future-photo craft-photo craft-tilt" style={{ '--rot': '-1.4deg' } as CSSProperties}>
                <img
                  src={`${IMG}/future-kid.png`}
                  alt="自分の作品を前に世界の課題を考える子どものイラスト"
                  width={860}
                  height={910}
                />
              </div>
              <ul className="es-check-list">
                <li>自分が作ったものを英語で語れる</li>
                <li>社会課題に自分の意見を持てる</li>
                <li>課題解決案を提案できる</li>
                <li>国際大会で同世代と渡り合える</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 料金・CTA ========== */}
      <section className="es-section es-section--last">
        <div className="container">
          <div className="es-section-head">
            <SectionTitle eyebrow="PRICE" variant={1} lineColor="var(--brand)">
              料金
            </SectionTitle>
          </div>

          <div className="es-price-grid">
            <div
              className="es-price craft-paper reveal"
              style={{ '--rot': '-0.5deg', '--accent-rgb': '224 158 22' } as CSSProperties}
            >
              <span className="es-price-name">エジソンコース</span>
              <p className="es-price-amount">
                ¥11,000<small>（税込）</small>
              </p>
              <p className="es-price-unit">/ 月（月2回通学）</p>
              <dl className="es-price-meta">
                <dt>教材費</dt>
                <dd>¥13,000（別途）</dd>
              </dl>
            </div>

            <div
              className="es-price craft-paper reveal"
              style={{ '--rot': '0.5deg', '--accent-rgb': 'var(--green-rgb)', transitionDelay: '90ms' } as CSSProperties}
            >
              <span className="es-price-name">英会話</span>
              <p className="es-price-amount">
                ¥2,750<small>（税込）</small>
              </p>
              <p className="es-price-unit">/ 回（50分・チケット制）</p>
              <dl className="es-price-meta">
                <dt>受講形態</dt>
                <dd>通学 または オンライン</dd>
              </dl>
            </div>
          </div>

          <div className="es-cta reveal">
            <p className="es-cta-lead">
              まずは無料体験で、「英語×STEAM」の学びを体感してみませんか？
            </p>
            <Link href="/contact#contact-form" className="craft-sticker">
              無料体験を申し込む
              <ArrowRightDoodle width={24} />
            </Link>
            <a
              href="https://www.hellokiwieikaiwa.com/"
              target="_blank"
              rel="noopener"
              className="craft-sticker craft-sticker--ghost"
            >
              Hello Kiwi英会話 公式サイト
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
