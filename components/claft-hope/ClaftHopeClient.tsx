'use client';

import { useEffect, useRef, useState } from 'react';
import { Shippori_Mincho } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { FAQ } from '@/components/FAQ';
import { CtaPair } from '@/components/CtaPair';
import { SectionTitle } from '@/components/craft/SectionTitle';
import { Underline, ArrowDownDoodle, SparkleDoodle, CrossDoodle } from '@/components/craft/HandDrawn';
import { DoodleIcon, type DoodleIconName } from '@/components/craft/DoodleIcon';
import { studentsData } from '@/lib/studentData';

// 哲学キャプション用（既存の採用フォント）
const shipporiMincho = Shippori_Mincho({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const doodle = (style: Record<string, string | number>) => style as CSSProperties;

// =========================================
// カウントアップアニメーション Hook
// =========================================
function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          let startTime: number;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasStarted]);

  return { count, ref };
}

// =========================================
// メインコンポーネント
// 「保護者を口説く物語」構成：
// 共感（チェックリスト→3つの足りない）→ データ → CLAFTの答え →
// 子どもの変化（AFT）→ つくった人 → CTA
// =========================================
export function ClaftHopeClient() {
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <HeroSection />
      <ChecklistSection />
      <EmpathySection />
      <DataSection />
      <SolutionSection />
      <ChangeSection />
      <FounderSection />
      <CTASection />
      <FAQ />
    </div>
  );
}

// =========================================
// 1. ヒーローセクション
// =========================================
function HeroSection() {
  return (
    <section className="cd-hero" style={{ padding: '72px 20px 56px' }}>
      {/* 漂う手描きの道具 */}
      <div aria-hidden="true">
        <SparkleDoodle
          className="craft-doodle craft-float"
          style={doodle({ top: '8%', left: '6%', color: 'var(--cream)', opacity: 0.9, '--rot': '-10deg' })}
          width={30}
        />
        <CrossDoodle
          className="craft-doodle craft-float craft-float--slow"
          style={doodle({ top: '14%', right: '8%', color: 'var(--pink)', opacity: 0.5, '--rot': '14deg' })}
          width={20}
        />
        <SparkleDoodle
          className="craft-doodle craft-float"
          style={doodle({ bottom: '20%', right: '5%', color: 'var(--brand)', opacity: 0.55, '--rot': '8deg', animationDelay: '1.2s' })}
          width={24}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* メインコピー */}
        <h1 className="cd-hero-title craft-misprint" style={{ marginBottom: '26px' }}>
          正解のない社会を、
          <br />
          <span className="craft-highlight--brand craft-highlight" style={{ color: 'var(--brand-deep)' }}>
            希望
          </span>
          を抱き歩むために。
        </h1>

        {/* サブコピー */}
        <p className="cd-hero-lead" style={{ marginBottom: '36px' }}>
          偏差値を上げることの前に、
          <br />
          将来なにがしたいか？どうありたいか？
          <br />
          自分のキャリアを考える時間が必要です。
        </p>

        {/* メインビジュアル（テープ留めの紙） */}
        <div className="craft-photo craft-tilt reveal" style={{ '--rot': '-1deg', marginBottom: '36px' } as CSSProperties}>
          <span className="craft-tape" aria-hidden="true" />
          <span className="craft-tape craft-tape--tr craft-tape--cream" aria-hidden="true" />
          <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '2px', overflow: 'hidden' }}>
            <Image
              src="/assets/images/courses/about/hero.jpg"
              alt="CLAFTという希望"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>

        {/* ブランドメッセージ */}
        <p className="cd-hero-lead" style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-600)' }}>
          CLAFTは、<strong className="emphasis">"学校と社会"</strong>をつなぎ、
          <br />
          自分の手で自分のキャリアを創るスクールです。
        </p>

        {/* 保護者向けの一文 */}
        <p className="cd-hero-lead" style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-500)', marginTop: '14px' }}>
          これは、学校に少し違和感を持つお子さまと保護者の方に向けたページです。
        </p>

        {/* スクロール誘導 */}
        <div className="hp-hero-scroll" aria-hidden="true">
          <ArrowDownDoodle className="craft-draw craft-draw--auto" width={26} />
          <span>scroll</span>
        </div>
      </div>
    </section>
  );
}

// =========================================
// 2. チェックリストセクション（共感の入口）
// =========================================
function ChecklistSection() {
  const items = [
    '宿題は嫌がるのに、好きなことには何時間でも集中する',
    '「なんで学校に行くの？」と聞かれて、言葉に詰まったことがある',
    'テストの点数だけで子どもを測りたくない',
    '得意なことを伸ばせる場所が近くにない',
  ];

  return (
    <section className="hp-section">
      <div className="container">
        <div className="hp-section-head" style={{ marginBottom: '30px' }}>
          <SectionTitle variant={1} lineColor="var(--pink)">
            こんな様子は
            <br />
            ありませんか？
          </SectionTitle>
        </div>

        <div
          className="craft-paper craft-paper--ruled craft-tilt reveal"
          style={{ '--rot': '-0.3deg', padding: '32px 26px' } as CSSProperties}
        >
          <span className="craft-tape craft-tape--cream" aria-hidden="true" />
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {items.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--brand)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ flexShrink: 0, marginTop: '2px' }}
                >
                  <path d="M4 12.5 L9.5 18 L20 5" />
                </svg>
                <span style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-800)' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <p
            style={{
              margin: '26px 0 0',
              paddingTop: '20px',
              borderTop: '2px dashed rgba(92, 77, 42, 0.2)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--ink-900)',
              textAlign: 'center',
            }}
          >
            ひとつでも当てはまったら、このページはきっとお役に立てます。
          </p>
        </div>
      </div>
    </section>
  );
}

// =========================================
// 3. 共感セクション（3つの「足りない」）
// =========================================
function EmpathySection() {
  const concerns: {
    id: string;
    accentRgb: string;
    tapeClass: string;
    icon: DoodleIconName;
    keyword: string;
    labelText: string;
    title: string;
    description: ReactNode;
  }[] = [
    {
      id: 'tankyu',
      accentRgb: 'var(--pink-rgb)',
      tapeClass: 'craft-tape--pink',
      icon: 'search',
      keyword: '思考体力',
      labelText: '探究する場所',
      title: '自分のキャリアをじっくり考えられる場所が少ない！',
      description: (
        <>
          キャリア＝人生を「どう生きるか」に、本来正解はありません。
          <br />
          <br />
          テストで高い点数を取ることや、大企業に入ることは"正解"ではなく、あくまで数ある選択肢のひとつです。
          <br />
          受験に関しても、テスト（一般入試）はひとつの手段にすぎず、今では全体の50%を下回っています。
          <br />
          <br />
          そういったキャリアの選択をしていくためには、<strong>自己理解（自分を知ること）</strong>と<strong>社会理解（社会を知ること）</strong>が欠かせません。
          社会に出る前の<strong>モラトリアム期（※1）</strong>――まだ社会的な責任を負わずに、自分の生き方を自由に考えられる時期に、
          <br />
          自分のキャリアについてじっくり考える時間や、その場所が必要であると考えます。
          <br />
          <br />
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-500)' }}>
            ※1：モラトリアム期とは、心理学者エリク・エリクソンが提唱した言葉で、社会に出る前の"自分探しの猶予期間"を指します。高校・大学など、進路や将来を考える時期にあたります。
          </span>
        </>
      ),
    },
    {
      id: 'jissen',
      accentRgb: '224 158 22',
      tapeClass: 'craft-tape--cream',
      icon: 'bolt',
      keyword: '好奇心',
      labelText: '実践する場所',
      title: '自分の好き・得意を試し続けられる場所が少ない！',
      description: (
        <>
          人はそれぞれ、興味・能力・価値観が異なります。
          <br />
          住んでいる場所や家庭環境、出会う人々など、置かれている環境も一人ひとり違います。
          <br />
          <br />
          それにもかかわらず、今の学校教育では、共通の教科書のもとで一斉に学び、「正解をいかに早く覚えるか」に力を注ぐのが一般的です。
          <br />
          <br />
          社会に出ると状況は一変し、<strong>正解がない状況で自分の得意をどう活かして他者や社会に貢献できるか？</strong>が問われます。
          <br />
          そのためには、自分の「好き」や「得意」をとことん試し、失敗も含めて経験することが大切だと考えます。
          <br />
          <br />
          そうした経験を通して、自分の<strong>アイデンティティ（※2）</strong>を確立し、自分らしく生きていくことができます。
          <br />
          <br />
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-500)' }}>
            ※2：アイデンティティとは、「自分は何者で、どんな価値を大切にして生きていくのか」という自己の確立のこと。
          </span>
        </>
      ),
    },
    {
      id: 'taiwa',
      accentRgb: 'var(--brand-rgb)',
      tapeClass: '',
      icon: 'talk',
      keyword: '柔軟性',
      labelText: '対話する場所',
      title: '自分の考えや感じたことを自由に話せる場所が少ない！',
      description: (
        <>
          「正解」を意識しすぎると、自分の考えや感じたことを、自由に言葉にできなくなってしまいます。
          <br />
          数値や結果ばかりを重視していると、周囲からの評価を気にしてしまい、<strong>心理的安全性（※3）</strong>が失われていきます。
          <br />
          <br />
          スマホを開けば誰かの人生が目に入り、つい自分と比べてしまう。
          <br />
          そんな世の中だからこそ、他者との競争ではなく、共に創る<strong>「共創」</strong>の意識が大切です。
          <br />
          <br />
          互いの違いを持ち寄り、補い合いながら新しい価値をつくる力。それこそが、今後の社会を動かすエネルギーになります。
          <br />
          そのためには、互いの違いを認め合い、誰もが安心して意見を出し合える場が必要であると考えます。
          <br />
          <br />
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-500)' }}>
            ※3：心理的安全性とは、ハーバード大学のエイミー・エドモンドソンが提唱した概念で、「自分の考えを言っても否定されない」「失敗しても責められない」と感じられる安心感のこと。
          </span>
        </>
      ),
    },
  ];

  return (
    <section className="hp-section">
      <div className="container">
        {/* セクションタイトル */}
        <div className="hp-section-head" style={{ marginBottom: '30px' }}>
          <SectionTitle variant={1} lineColor="var(--pink)">
            変化が激しい社会に、
            <br />
            <span style={{ color: 'var(--pink)' }}>公教育</span>は対応できているのか？
          </SectionTitle>
        </div>

        {/* 導入テキスト（付箋） */}
        <p
          className="cd-tip reveal"
          style={{ marginBottom: '38px', padding: '20px 22px', fontSize: 'var(--text-base)' } as CSSProperties}
        >
          日本の若者が置かれている環境において
          <br />
          <strong className="emphasis">「3つの場所」</strong>が不足していると考えます。
        </p>

        {/* 3つのカード */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {concerns.map((item, index) => (
            <article
              key={item.id}
              className="craft-paper craft-tilt reveal"
              style={
                {
                  '--accent-rgb': item.accentRgb,
                  '--tape-rgb': item.accentRgb,
                  '--rot': `${index % 2 === 0 ? -0.5 : 0.5}deg`,
                  overflow: 'visible',
                  transitionDelay: `${index * 100}ms`,
                } as CSSProperties
              }
            >
              <span className={`craft-tape ${item.tapeClass}`} aria-hidden="true" />

              {/* 課題の提示（開閉） */}
              <details className="cd-acc" style={{ background: 'none', border: 'none', boxShadow: 'none' }}>
                <summary>
                  <span className="cd-acc-icon" aria-hidden="true">
                    <DoodleIcon name={item.icon} size={28} />
                  </span>
                  <span className="cd-acc-title">
                    <strong>{item.title}</strong>
                  </span>
                  <span className="cd-acc-pill">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                      <polyline points="6,9 12,15 18,9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </summary>
                <div className="cd-acc-body">{item.description}</div>
              </details>

              {/* 結論帯（常に表示） */}
              <p className="ho-conclusion">
                必要なのは{' '}
                <strong style={{ fontWeight: 900, color: 'rgb(var(--accent-rgb))' }}>{item.labelText}</strong>
                {' '}で{' '}
                <br />
                <strong style={{ fontWeight: 900, color: 'rgb(var(--accent-rgb))', fontSize: '1.1em' }}>
                  {item.keyword}
                </strong>
                {' '}を育むこと！
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================
// 4. データセクション（現状の可視化・圧縮版）
// =========================================
function DataSection() {
  const stat1 = useCountUp(67, 2000);
  const stat2 = useCountUp(34, 2000);
  const stat3 = useCountUp(19, 2000);

  const stats = [
    {
      value: stat1.count,
      decimal: '.3',
      unit: '%',
      ref: stat1.ref,
      accentRgb: 'var(--pink-rgb)',
      title: '新入社員が感じる「スキル不足」',
      description: '自分の能力不足がストレス源。社会の厳しさを痛感する若者は6割越え。',
      source: '出典：産業能率大「2024年度 新入社員会社生活調査」',
    },
    {
      value: stat2.count,
      decimal: '.9',
      unit: '%',
      ref: stat2.ref,
      accentRgb: 'var(--brand-rgb)',
      title: '3年以内の離職率',
      description: '大卒の約5人に1人が早期離職、高卒ではさらに深刻。',
      source: '出典：産業能率大「2024年度 新入社員会社生活調査」',
    },
    {
      value: stat3.count,
      decimal: '.0',
      unit: '%',
      ref: stat3.ref,
      accentRgb: '224 158 22',
      title: '日本の教育を「良い」と評価',
      description: '国際比較で低位。生徒も先生も保護者も「何か違う」と感じている。',
      source: '出典：イプソス「教育モニター2024」調査レポート',
    },
  ];

  const uniqueSources = Array.from(new Set(stats.map((s) => s.source)));

  return (
    <section className="hp-section hp-programs">
      <div className="container">
        {/* セクションタイトル */}
        <div className="hp-section-head" style={{ marginBottom: '24px' }}>
          <SectionTitle variant={2} lineColor="var(--pink)">
            まじめに勉強してきた人ほど
            <br />
            <span style={{ color: 'var(--pink)' }}>社会で戸惑っている現代</span>
          </SectionTitle>
        </div>

        <p className="cd-hero-lead reveal" style={{ marginBottom: '38px' }}>
          <strong className="emphasis">「一生懸命勉強したのに、社会に出たら全然違った」</strong>
          <br />
          <strong className="emphasis">「自分が本当にやりたいことって、なんだろう…？」</strong>
          <br />
          そんな声が、今の日本社会にはあふれています。
        </p>

        {/* 統計：1枚の紙に3列でまとめる */}
        <div
          className="craft-paper craft-tilt reveal"
          style={{ '--rot': '0.4deg', padding: '30px 22px 26px', marginBottom: '44px' } as CSSProperties}
        >
          <span className="craft-tape" aria-hidden="true" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '14px',
              marginBottom: '22px',
              textAlign: 'center',
            }}
          >
            {stats.map((stat, index) => (
              <div key={index} ref={stat.ref} style={{ '--accent-rgb': stat.accentRgb } as CSSProperties}>
                <div className="ho-stat-num" style={{ marginBottom: '4px' }}>
                  {stat.value}
                  <span style={{ fontSize: '0.5em' }}>{stat.decimal}</span>
                  <span style={{ fontSize: '0.6em' }}>{stat.unit}</span>
                </div>
                <p style={{ margin: 0, fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: 'var(--ink-700)' }}>
                  {stat.title}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              margin: '0 0 12px',
              paddingTop: '18px',
              borderTop: '2px dashed rgba(92, 77, 42, 0.2)',
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--ink-700)',
            }}
          >
            {stats.map((s) => s.description).join('　')}
          </p>

          <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--ink-500)' }}>
            <small>{uniqueSources.join('　')}</small>
          </p>
        </div>

        {/* 結論テキスト（罫線ノートの1ページ）：このページの核なので現状維持 */}
        <div
          className="craft-paper craft-paper--ruled craft-tilt reveal"
          style={{ '--rot': '0.4deg', padding: '34px 26px' } as CSSProperties}
        >
          <span className="craft-tape" aria-hidden="true" />

          <p style={{ fontSize: 'var(--text-base)', color: 'var(--ink-700)', marginBottom: '24px' }}>
            原因は、決して本人の努力不足ではありません。むしろ、まじめに勉強してきた人ほど戸惑ってしまうのです。
          </p>

          <p style={{ fontSize: 'var(--text-base)', color: 'var(--ink-700)', marginBottom: '16px' }}>
            その理由は、とてもシンプル。
          </p>

          {/* 中核フレーズ（マーカー強調） */}
          <h3
            style={{
              margin: '0 0 26px',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-black)',
              lineHeight: 1.7,
              color: 'var(--ink-900)',
            }}
          >
            <span className="craft-highlight">「社会の変化に、学びが追いついていない」</span>
          </h3>

          <p style={{ fontSize: 'var(--text-base)', color: 'var(--ink-700)', marginBottom: '24px' }}>
            技術の進歩、価値観の多様化に伴い社会課題が顕在化している時代。「正解を早く答える」勉強だけでは、生き抜く力にはなりません。特にAIの進化は著しく、記憶や計算といった認知能力はすでにコンピュータの方が得意な領域になっています。
          </p>

          <p className="cd-tip" style={{ padding: '18px 20px', fontSize: 'var(--text-base)' }}>
            それにもかかわらず、日本の教育は依然として「教科書に書かれた知識を覚え、テストで正しく答える力」を重視しています。先生が知識を教え、生徒がそれを記憶し、偏差値で進路が決まる──この構造のままでは、教育と社会との間に大きなギャップが生じ、多くの若者がつまずいてしまいます。
          </p>
        </div>
      </div>
    </section>
  );
}

// =========================================
// 5. 解決策セクション（CLAFTの3つのアプローチ）
// =========================================
function SolutionSection() {
  const solutions = [
    {
      id: 1,
      title: '自ら考え、判断し、表現する体験を。',
      description:
        'PBL（課題解決型学習）や、正解のない問いに向き合う「クエスト」を通じ、スマホやPCを駆使して自らの答えを形にします。',
      philosophy: '学びの本質は知覚。知覚は経験から生まれる。',
      accentRgb: 'var(--brand-rgb)',
      tapeClass: '',
      links: [{ text: 'PBL（課題解決型学習）', href: '/pbl' }],
    },
    {
      id: 2,
      title: '学びの熱量を維持する、独自の評価システム。',
      description:
        '「ジブンクラフト」では、日々の気づきを「5つのチカラ」に変換し可視化。自分らしさを育てながら、挑戦への確信を築きます。',
      philosophy: '没頭することが、最も高い満足感と動機づけにつながる。',
      accentRgb: '224 158 22',
      tapeClass: 'craft-tape--cream',
      links: [{ text: 'ジブンクラフト', href: '/jibun-craft' }],
    },
    {
      id: 3,
      title: '仲間や大人、異年齢と混じり合う。',
      description:
        '月1回の対話「Yononaka」や、3ヶ月ごとの発表会「ミライクラフト」。地域や大人と共創し、多様な生き方に触れます。',
      philosophy: '「ムズムズ」を共有できる仲間がいれば、挑戦はもっと強くなる。',
      accentRgb: 'var(--green-rgb)',
      tapeClass: 'craft-tape--green',
      links: [
        { text: 'Yononaka', href: '/yononaka' },
        { text: 'ミライクラフト', href: '/futurecraft' },
      ],
    },
  ];

  // 説明文中のコース名をリンク化する（文言は変えない）
  const renderDescription = (description: string, links: { text: string; href: string }[]) => {
    const parts: ReactNode[] = [];
    let lastIndex = 0;

    links.forEach((link, linkIdx) => {
      const index = description.indexOf(link.text, lastIndex);
      if (index !== -1) {
        if (index > lastIndex) {
          parts.push(description.substring(lastIndex, index));
        }
        parts.push(
          <Link
            key={`link-${linkIdx}`}
            href={link.href}
            style={{
              color: 'rgb(var(--accent-rgb))',
              fontWeight: 700,
              textDecoration: 'underline',
              textDecorationColor: 'rgb(var(--accent-rgb) / 0.45)',
              textUnderlineOffset: '3px',
            }}
          >
            {link.text}
          </Link>
        );
        lastIndex = index + link.text.length;
      }
    });

    if (lastIndex < description.length) {
      parts.push(description.substring(lastIndex));
    }

    return parts;
  };

  const timeline = [
    { title: '体験1ヶ月', desc: 'アプリでいつでも視聴' },
    { title: 'クエスト動画', desc: '視聴して意見を共有' },
    { title: '月1 Yononaka', desc: '正解のない対話ワーク' },
    { title: 'ミライクラフト', desc: '3ヶ月ごとの発表会' },
    { title: 'ジブンクラフト', desc: '振り返り面談で言語化' },
  ];

  return (
    <section className="hp-section">
      <div className="container">
        {/* セクションヘッダー */}
        <div className="hp-section-head" style={{ marginBottom: '24px' }}>
          <SectionTitle variant={3} lineColor="var(--brand)">
            CLAFT：「探究・対話・実践」の学びが
            <br />
            <span style={{ color: 'var(--brand-deep)' }}>学校と社会の分断</span>をつなぐ！
          </SectionTitle>
        </div>

        <p className="cd-hero-lead reveal" style={{ maxWidth: '420px', marginBottom: '40px' }}>
          CLAFTでは、入試のための勉強から
          <strong className="emphasis">「社会を知り未来を予測するための学び」</strong>
          へと変えていく必要があると考えています。
        </p>

        {/* 3つの解決策カード */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '34px', marginBottom: '48px' }}>
          {solutions.map((solution, index) => (
            <article
              key={solution.id}
              className="cd-card craft-paper craft-tilt craft-lift reveal"
              style={
                {
                  '--accent-rgb': solution.accentRgb,
                  '--tape-rgb': solution.accentRgb,
                  '--rot': `${index % 2 === 0 ? -0.6 : 0.6}deg`,
                  paddingTop: '34px',
                  transitionDelay: `${index * 100}ms`,
                } as CSSProperties
              }
            >
              <span className={`craft-tape ${solution.tapeClass}`} aria-hidden="true" />

              {/* 番号スタンプ */}
              <span className="cd-num" style={{ position: 'absolute', top: '18px', right: '18px' }}>
                {solution.id}
              </span>

              {/* タイトル */}
              <h3 className="cd-card-title" style={{ paddingRight: '56px' }}>
                {solution.title}
              </h3>

              {/* 説明文 */}
              <p style={{ margin: '0 0 4px' }}>{renderDescription(solution.description, solution.links)}</p>

              {/* 哲学的キャプション */}
              <p className={`ho-quote ${shipporiMincho.className}`}>{solution.philosophy}</p>
            </article>
          ))}
        </div>

        {/* 入会するとこう進む：日常の運用イメージ */}
        <div className="reveal">
          <p style={{ margin: '0 0 14px', fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: 'var(--ink-900)', textAlign: 'center' }}>
            入会するとこう進みます
          </p>
          <div className="cd-hscroll">
            {timeline.map((step, i) => (
              <div key={i} className="cd-scroll-card craft-paper craft-tilt" style={{ '--rot': `${i % 2 === 0 ? -0.5 : 0.5}deg` } as CSSProperties}>
                <div className="cd-scroll-card-head">
                  <span className="cd-num">{i + 1}</span>
                  <h3>{step.title}</h3>
                </div>
                <p className="cd-scroll-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =========================================
// 6. 子どもがどう変わるか（AFT主役）＋ CLAFTという名前の由来（折りたたみ）
// =========================================
function ChangeSection() {
  const [activeTab, setActiveTab] = useState<'C' | 'L' | 'A' | 'F' | 'T'>('C');

  const claftTabs: { letter: 'C' | 'L' | 'A' | 'F' | 'T'; accentRgb: string }[] = [
    { letter: 'C', accentRgb: 'var(--brand-rgb)' },
    { letter: 'L', accentRgb: 'var(--green-rgb)' },
    { letter: 'A', accentRgb: '224 158 22' },
    { letter: 'F', accentRgb: 'var(--pink-rgb)' },
    { letter: 'T', accentRgb: 'var(--brand-rgb)' },
  ];

  // 実在するメンバーのストーリーから、AFTそれぞれの実例を1行だけ引用する（捏造しない）
  const harutoStory = studentsData.find((s) => s.slug === 'haruto');
  const kenshiroStory = studentsData.find((s) => s.slug === 'kenshiro');
  const hikaruStory = studentsData.find((s) => s.slug === 'hikaru');

  const aftItems: {
    id: string;
    letter: string;
    title: string;
    accentRgb: string;
    tapeClass: string;
    icon: DoodleIconName;
    description: string;
    episodeName?: string;
    episodeSlug?: string;
    episodeText?: string;
  }[] = [
    {
      id: 'active',
      letter: 'A',
      title: '主体的な行動力の向上',
      accentRgb: '224 158 22',
      tapeClass: 'craft-tape--cream',
      icon: 'rocket',
      description:
        '「指示待ち」ではなく、自分で問いを立てて動く力が育ちます。アクションを起こすことで得られる学びのサイクルが、自分への確信（自己効力感）を支えます。',
      episodeName: harutoStory?.name,
      episodeSlug: harutoStory?.slug,
      episodeText: harutoStory?.currentActions[0]?.description,
    },
    {
      id: 'flexible',
      letter: 'F',
      title: '柔軟な適応力の向上',
      accentRgb: 'var(--pink-rgb)',
      tapeClass: 'craft-tape--pink',
      icon: 'leaf',
      description:
        '異なる価値観を持つ仲間との対話を通じ、変化をチャンスとして捉えるしなやかさを養います。これは現代社会で不可欠な「情報編集力（＝自分らしく情報を組み立て、伝える力）」の土台となります。',
      episodeName: kenshiroStory?.name,
      episodeSlug: kenshiroStory?.slug,
      episodeText: kenshiroStory?.currentActions[0]?.description,
    },
    {
      id: 'trial',
      letter: 'T',
      title: '何度も試し続ける精神',
      accentRgb: 'var(--brand-rgb)',
      tapeClass: '',
      icon: 'clock',
      description:
        '「学ばなきゃ」という義務感から解放され、「やってみたい」という好奇心で挑み続ける。たとえ道が変わっても、その周辺にある多様な可能性に気づける強さが身につきます。',
      episodeName: hikaruStory?.name,
      episodeSlug: hikaruStory?.slug,
      episodeText: hikaruStory?.currentActions[0]?.description,
    },
  ];

  return (
    <section className="hp-section hp-programs">
      <div className="container">
        {/* AFT：子どもがどう変わるか（主役） */}
        <div className="reveal">
          <div className="hp-section-head" style={{ marginBottom: '22px' }}>
            <SectionTitle variant={2} lineColor="var(--brand)">
              CLAFTによって、
              <br />
              どう<span style={{ color: 'var(--brand-deep)' }}>変わる</span>か
            </SectionTitle>
          </div>

          <p className="cd-hero-lead" style={{ marginBottom: '36px' }}>
            主体的な行動力と、しなやかな適応力。
            <br />
            それが<strong className="emphasis">「希望」</strong>の正体です。
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {aftItems.map((item, i) => (
              <details
                key={item.id}
                className="cd-acc craft-paper craft-tilt"
                style={
                  {
                    '--accent-rgb': item.accentRgb,
                    '--rot': `${i % 2 === 0 ? -0.4 : 0.4}deg`,
                  } as CSSProperties
                }
              >
                <summary>
                  <span className="cd-acc-icon" aria-hidden="true">
                    <DoodleIcon name={item.icon} size={28} />
                  </span>
                  <span className="cd-acc-title">
                    <strong>
                      <span
                        style={{
                          display: 'inline-grid',
                          placeItems: 'center',
                          width: '26px',
                          height: '26px',
                          marginRight: '8px',
                          background: 'rgb(var(--accent-rgb))',
                          color: '#fff',
                          fontSize: '0.85rem',
                          fontWeight: 900,
                          border: '2px solid #fff',
                          borderRadius: '46% 54% 48% 52% / 52% 48% 54% 46%',
                          boxShadow: '0 1px 4px rgba(92, 77, 42, 0.25)',
                          transform: 'rotate(-4deg)',
                          verticalAlign: 'middle',
                        }}
                      >
                        {item.letter}
                      </span>
                      {item.title}
                    </strong>
                  </span>
                  <span className="cd-acc-pill">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                      <polyline points="6,9 12,15 18,9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </summary>
                <div className="cd-acc-body">
                  <p style={{ margin: 0 }}>{item.description}</p>
                  {item.episodeText && item.episodeSlug && (
                    <p className="ho-aft-episode">
                      <Link href={`/student-story/${item.episodeSlug}`}>{item.episodeName}さんの実例</Link>
                      ：「{item.episodeText}」
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* CLAFTという名前の由来：読みたい方向けに折りたたみ格納（中身は温存） */}
        <details
          className="cd-acc craft-paper craft-tilt reveal"
          style={{ '--rot': '-0.3deg', marginTop: '56px' } as CSSProperties}
        >
          <summary>
            <span className="cd-acc-icon" aria-hidden="true">
              <DoodleIcon name="sparkle" size={28} />
            </span>
            <span className="cd-acc-title">
              <strong>CLAFTという名前に込めた意味（読みたい方へ）</strong>
            </span>
            <span className="cd-acc-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <polyline points="6,9 12,15 18,9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </summary>
          <div className="cd-acc-body">
            {/* タブナビゲーション（紙の積み木） */}
            <div className="ho-tabs" role="tablist">
              {claftTabs.map((tab) => (
                <button
                  key={tab.letter}
                  role="tab"
                  aria-selected={activeTab === tab.letter}
                  onClick={() => setActiveTab(tab.letter)}
                  className={`ho-tab ${activeTab === tab.letter ? 'ho-tab--active' : ''}`}
                  style={{ '--accent-rgb': tab.accentRgb } as CSSProperties}
                >
                  {tab.letter}
                </button>
              ))}
            </div>

            {/* タブコンテンツ */}
            <div className="craft-paper" style={{ padding: '32px 26px', minHeight: '300px' }}>
              {/* C: Creative & Communication */}
              {activeTab === 'C' && (
                <div style={{ animation: 'fadeIn 0.4s ease' }}>
                  <h3 className="cd-card-title" style={{ textAlign: 'center', marginBottom: '24px' }}>
                    【CL】好奇心の循環をつくる
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <svg width="240" height="180" viewBox="0 0 240 180">
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#34c6be" />
                        </marker>
                      </defs>
                      <path
                        d="M60,90 Q60,40 120,40 Q180,40 180,90"
                        stroke="#34c6be"
                        strokeWidth="3"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                        strokeDasharray="8 4"
                      />
                      <path
                        d="M180,90 Q180,140 120,140 Q60,140 60,90"
                        stroke="#58c3a2"
                        strokeWidth="3"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                        strokeDasharray="8 4"
                      />
                      <circle cx="120" cy="90" r="35" fill="rgba(255, 214, 107, 0.3)" stroke="#ffd66b" strokeWidth="2" />
                      <text x="120" y="85" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink-800)">
                        好奇心
                      </text>
                      <text x="120" y="100" textAnchor="middle" fontSize="9" fill="var(--ink-600)">
                        Curiosity
                      </text>
                      <text x="30" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#34c6be">
                        Creative
                      </text>
                      <text x="30" y="102" textAnchor="middle" fontSize="8" fill="var(--ink-500)">
                        創造
                      </text>
                      <text x="210" y="90" textAnchor="middle" fontSize="9" fontWeight="700" fill="#58c3a2">
                        Communication
                      </text>
                      <text x="210" y="102" textAnchor="middle" fontSize="8" fill="var(--ink-500)">
                        対話
                      </text>
                    </svg>
                  </div>
                  <p style={{ margin: 0, textAlign: 'center', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-700)' }}>
                    自分の興味を形にする（<strong style={{ color: '#34c6be' }}>Creative</strong>）なかで、
                    それを人に発表し共有する（<strong style={{ color: '#58c3a2' }}>Communication</strong>）。
                    <br />
                    そこで得た反応が新たな気づきとなり、また次の探究へと繋がっていく。
                  </p>
                </div>
              )}

              {/* L: Learning */}
              {activeTab === 'L' && (
                <div style={{ animation: 'fadeIn 0.4s ease' }}>
                  <h3 className="cd-card-title" style={{ textAlign: 'center', marginBottom: '24px' }}>
                    【L】後悔（Regret）を学び（Learning）へ
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div
                        className="craft-paper"
                        style={{
                          width: '60px',
                          height: '60px',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '1.8rem',
                          fontWeight: 900,
                          color: 'var(--ink-500)',
                          textDecoration: 'line-through',
                          transform: 'rotate(-3deg)',
                        }}
                      >
                        R
                      </div>
                      <p style={{ fontSize: '0.7rem', color: 'var(--ink-500)', marginTop: '6px' }}>Regret</p>
                    </div>
                    <span style={{ color: 'var(--brand)' }} aria-hidden="true">
                      <svg width="36" height="20" viewBox="0 0 36 20">
                        <path
                          d="M4 10 C 12 9, 20 11, 28 10 M22 5 C 24.2 6.8, 26.2 8.5, 28 10 C 26 11.8, 24 13.5, 22 15"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div
                        className="craft-paper"
                        style={{
                          width: '60px',
                          height: '60px',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '1.8rem',
                          fontWeight: 900,
                          color: 'var(--brand-deep)',
                          backgroundColor: 'rgb(var(--brand-rgb) / 0.12)',
                          transform: 'rotate(2deg)',
                          boxShadow: 'var(--shadow-paper-lift)',
                        }}
                      >
                        L
                      </div>
                      <p style={{ fontSize: '0.7rem', color: 'var(--brand-deep)', marginTop: '6px', fontWeight: 700 }}>Learning</p>
                    </div>
                  </div>
                  <p style={{ margin: 0, textAlign: 'center', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-700)' }}>
                    人生100年時代、学びと仕事は往復し続けるものです。
                    <br />
                    失敗を
                    <strong style={{ color: 'var(--ink-500)', textDecoration: 'line-through' }}>Regret（後悔）</strong>
                    して立ち止まるのではなく、すべてを
                    <strong style={{ color: '#58c3a2' }}>Learning（学び）</strong>として捉える。
                  </p>
                </div>
              )}

              {/* A: Active */}
              {activeTab === 'A' && (
                <div style={{ animation: 'fadeIn 0.4s ease' }}>
                  <h3 className="cd-card-title" style={{ color: 'rgb(224 158 22)' }}>
                    Active：自ら問いを立て、動き出す主体性
                  </h3>
                  <p style={{ margin: 0, fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-700)' }}>
                    正解のない問いに向き合い、自分で考え判断する力。
                    <br />
                    PBLや探究学習を通じて、主体的に動く力が育ちます。
                  </p>
                </div>
              )}

              {/* F: Flexible */}
              {activeTab === 'F' && (
                <div style={{ animation: 'fadeIn 0.4s ease' }}>
                  <h3 className="cd-card-title" style={{ color: 'var(--pink)' }}>
                    Flexible：変化をチャンスとして楽しむ柔軟性
                  </h3>
                  <p style={{ margin: 0, fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-700)' }}>
                    多様な価値観に触れ、固定観念にとらわれない思考力。
                    <br />
                    変化を恐れず、むしろ楽しめる柔軟性が身につきます。
                  </p>
                </div>
              )}

              {/* T: Trial */}
              {activeTab === 'T' && (
                <div style={{ animation: 'fadeIn 0.4s ease' }}>
                  <h3 className="cd-card-title" style={{ color: 'var(--brand-deep)' }}>
                    Trial：失敗を恐れず、何度でも試す精神
                  </h3>
                  <p style={{ margin: 0, fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-700)' }}>
                    失敗は成功への道標。トライ＆エラーを繰り返すことで、
                    <br />
                    本当に大切なことを見つけられる強さが育ちます。
                  </p>
                </div>
              )}
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}

// =========================================
// 7. CLAFTをつくった人（代表の想い）
// 実在するメンバーページ（/student-story/shoichiro）のデータをそのまま使う。捏造しない。
// =========================================
function FounderSection() {
  const founder = studentsData.find((s) => s.slug === 'shoichiro');
  if (!founder) return null;

  return (
    <section className="hp-section">
      <div className="container">
        <div className="hp-section-head" style={{ marginBottom: '30px' }}>
          <SectionTitle variant={1} lineColor="var(--brand)">
            CLAFTをつくった人
          </SectionTitle>
        </div>

        <div
          className="craft-paper craft-tilt reveal"
          style={{ '--rot': '-0.5deg', padding: '30px 26px', textAlign: 'center' } as CSSProperties}
        >
          <span className="craft-tape" aria-hidden="true" />
          <span className="ss-avatar" style={{ margin: '0 auto 16px' }} aria-hidden="true">
            {founder.avatarEmoji}
          </span>
          <p style={{ margin: '0 0 4px', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-black)', color: 'var(--ink-900)' }}>
            {founder.name}（{founder.grade}）
          </p>
          <p style={{ margin: '0 0 20px', fontSize: 'var(--text-sm)', color: 'var(--ink-600)' }}>{founder.shortIntro}</p>
          <p
            className={shipporiMincho.className}
            style={{ margin: '0 0 22px', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-loose)', color: 'var(--ink-800)' }}
          >
            {founder.futureVision.text}
            {founder.futureVision.subText && (
              <>
                <br />
                {founder.futureVision.subText}
              </>
            )}
          </p>
          <Link href={`/student-story/${founder.slug}`} className="craft-sticker craft-sticker--ghost">
            くわしいストーリーを読む
          </Link>
        </div>
      </div>
    </section>
  );
}

// =========================================
// 8. CTAセクション
// =========================================
function CTASection() {
  return (
    <section className="hp-section" style={{ paddingBottom: '90px' }}>
      <div className="container">
        <div className="hp-section-head" style={{ marginBottom: '30px' }}>
          <SectionTitle variant={3} lineColor="var(--brand)">
            予測不可能な未来を、
            <br />
            <span style={{ color: 'var(--brand-deep)' }}>自分の手</span>で創っていく
          </SectionTitle>
        </div>

        <div className="reveal" style={{ textAlign: 'center', fontSize: 'var(--text-base)', lineHeight: 2, color: 'var(--ink-700)' }}>
          <p style={{ marginBottom: '16px' }}>
            「未来がどうなるか分からない」ことは、
            <br />
            不安なことではありません。
          </p>
          <p style={{ marginBottom: '16px' }}>
            自分で考え、仲間と対話し、何度もカタチにしてみる。
            <br />
            その過程で得られる手応えこそが、
            <br />
            今後のキャリアを支える一番の根っこになります。
          </p>
        </div>

        {/* 手描きの締め飾り */}
        <div className="reveal" style={{ textAlign: 'center', margin: '24px 0 40px' }}>
          <Underline variant={1} className="craft-draw" style={{ width: 'min(260px, 70%)', color: 'var(--cream)' }} />
        </div>

        {/* CTA：LINE｜体験 の並列2択（このページ最大の欠落だった導線） */}
        <div className="reveal">
          <CtaPair location="hope-cta" withLineNote />
        </div>
      </div>
    </section>
  );
}

export default ClaftHopeClient;
