import Link from 'next/link';
import { MobileContainer, Section } from '@/components/MobileContainer';
import type { CSSProperties } from 'react';
import { SectionTitle } from '@/components/craft/SectionTitle';
import { Underline, ArrowRightDoodle } from '@/components/craft/HandDrawn';
import { DoodleIcon, type DoodleIconName } from '@/components/craft/DoodleIcon';

export const metadata = {
  title: 'PBL(課題解決型学習) | CLAFT',
  description:
    '自分の好きや疑問を起点にテーマを決め、新たなモノを創ったり、解決策を考え、最後は動画やスライドで発表をする学びです。'
};

// 学びの流れデータ
const learningSteps: {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  tool: string;
  accentRgb: string;
  icon: DoodleIconName;
}[] = [
  {
    num: '1',
    title: '問いを立てる',
    subtitle: '探究のはじまり',
    description:
      '「おもしろそう！」「やってみようかな？」という気持ちを起点に、探究のテーマと大まかな計画を立てます。興味や疑問は探究するための動力源。好奇心から生じる問いが、自然と行動へと導きます。',
    tool: 'Googleフォームを使って、テーマと計画を書き込むことからスタートします。',
    accentRgb: '224 158 22',
    icon: 'flag'
  },
  {
    num: '2',
    title: '調べる・つくる',
    subtitle: '',
    description:
      '問いと計画を立てたら、自分で学びを進めていきます。PBLは「自分だけの学び」です。他者とは異なるプロセスを歩むからこそ、日々の気づきを言葉にする力が必要になります。',
    tool: 'Googleフォームを使って、1日の学びを振り返ります。',
    accentRgb: 'var(--brand-rgb)',
    icon: 'search'
  },
  {
    num: '3',
    title: '発表・動画配信',
    subtitle: '',
    description:
      '完成した作品とともに、これまでの探究のプロセスを発表します。他者からのフィードバックを得ることで、学びを客観的に捉える機会となります。',
    tool: '1年に3回、3月・7月・11月に開催します。',
    accentRgb: 'var(--pink-rgb)',
    icon: 'mic'
  },
  {
    num: '4',
    title: '振り返り',
    subtitle: '探究のあしあと',
    description:
      '制作の過程で「うまくいかなかったこと」は、次へのヒントが詰まった一番の学びです。なぜ思い通りにいかなかったか、次はどうするかを整理します。',
    tool: 'Googleフォーム を使って、PBL全体の振り返りをします。',
    accentRgb: 'var(--violet-rgb)',
    icon: 'pencil'
  },
  {
    num: '5',
    title: 'キャリア面談',
    subtitle: '非認知能力計測',
    description:
      '非認知能力を計測し、自身の強みや成長を数値で可視化。計測結果をもとにキャリアコンサルタントと面談を行い、次回の目標設定と学習準備を整えます。',
    tool: 'Ai Growという非認知能力計測ツールを使います。',
    accentRgb: 'var(--brand-rgb)',
    icon: 'talk'
  }
];

// PBLで育つことデータ
const growthItems: {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  icon: DoodleIconName;
  accentRgb: string;
}[] = [
  {
    id: 1,
    title: '創造力',
    subtitle: '溢れるアイデアを信じ、失敗を恐れず形にする力',
    content:
      '子どもたちは本来、自由で豊かなアイデアに溢れています。人生経験がまだ少ないからこそ持てる「自分ならできそう！」という真っ直ぐな自信は、創造性を育む最大の原動力です。 変化の激しい現代では、かつて不可能とされたことが次々と実現可能なアイデアとして形になっています。発明王エジソンが数多の失敗を重ねて成功を掴んだように、発明には運やタイミングも欠かせません。だからこそ、失敗を恐れずにとことんアイデアを出し続ける練習を積み重ね、未来を切り拓く力を養います。',
    icon: 'sparkle',
    accentRgb: 'var(--pink-rgb)'
  },
  {
    id: 2,
    title: '学習力',
    subtitle: '自分なりの「学び方」を確立し、未知の課題に対応する力',
    content:
      'PBLは、「何を学ぶか」という知識の習得以上に、「どのように学ぶか」というプロセスを重視する学びです。 自分自身の「学び方の型」を認識し、確立することができれば、将来どのような【テーマ】や【表現方法】に出会っても、自力で道筋を立てて対応できるようになります。「どのように学ぶか」という点に重点を置いて試行錯誤を繰り返すことで、あらゆる未知の課題に対しても、自ら解決策を見出す汎用的な能力が備わります。',
    icon: 'bulb',
    accentRgb: 'var(--brand-rgb)'
  },
  {
    id: 3,
    title: '言語化力',
    subtitle: '考えを言葉にし、他者と社会に働きかける力',
    content:
      '自分がどのように学びを進めてきたかを言葉にして振り返ることは、自分の考え方や行動パターンを客観的に捉える「メタ認知」へとつながります。 日々の気づきやプロセスを記録し続けることで、自分を深く理解する力が養われ、「次はこうしてみよう」「ここをもっと深掘りしてみたい」といった前向きな意欲が自然と湧き上がってきます。言語化を通じて得られた深い内省は、一つのプロジェクトを完結させるだけでなく、また新しい「問いの種」を見つける力になります。',
    icon: 'pencil',
    accentRgb: 'var(--violet-rgb)'
  }
];

// メンバーの作品データ
const memberWorks: {
  id: number;
  title: string;
  description: string;
  url: string;
  accentRgb: string;
  tapeClass: string;
  icon: DoodleIconName;
}[] = [
  {
    id: 1,
    title: 'ソニーの魅力とは？',
    description: 'ソニー製品の魅力を探り、情報を集めて動画で発信。',
    url: 'https://youtu.be/zs1ZD0GZAm0',
    accentRgb: 'var(--pink-rgb)',
    tapeClass: 'craft-tape--pink',
    icon: 'search'
  },
  {
    id: 2,
    title: '障害とはどのようなものか',
    description: '吃音から障害について調べ、資料をまとめて発表。',
    url: 'https://youtu.be/qoANUgtTAZo',
    accentRgb: 'var(--brand-rgb)',
    tapeClass: '',
    icon: 'heart'
  },
  {
    id: 3,
    title: '振動発電をマイクラで表現してみた',
    description: 'マイクラで発電アイデアを再現。',
    url: 'https://youtu.be/QKfGtt1QT1M',
    accentRgb: '224 158 22',
    tapeClass: 'craft-tape--cream',
    icon: 'bolt'
  }
];

export default function PBLPage() {
  return (
    <MobileContainer>
      {/* ===== 冒頭（ヒーロー）===== */}
      <Section className="cd-hero">
        <h1 className="cd-hero-title craft-misprint">
          PBL<span className="cd-hero-small">(課題解決型学習)</span>
        </h1>
        <Underline
          variant={2}
          className="cd-hero-line craft-draw craft-draw--auto"
          style={{ color: 'var(--pink)' }}
        />

        <p className="cd-hero-lead">
          自分の好きや疑問を起点にテーマを決め、新たなモノを創ったり、解決策を考え、最後は動画やスライドで発表をする学びです。
        </p>

        <p className="cd-hero-badges">
          <Link href="/career" className="craft-label">キャリアコースの学び</Link>
        </p>

        {/* メンバーのストーリーリンク（貼り込んだ案内カード） */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <a
            href="https://claft-hp.vercel.app/student-story"
            className="craft-paper craft-tilt craft-lift"
            style={
              {
                '--rot': '-1deg',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 22px',
                maxWidth: '340px',
                width: '100%',
                textDecoration: 'none',
                textAlign: 'left'
              } as CSSProperties
            }
          >
            <span className="craft-tape craft-tape--pink" aria-hidden="true" />

            <span
              className="cd-card-icon"
              style={{ margin: 0, flexShrink: 0, ['--accent-rgb' as string]: 'var(--pink-rgb)' } as CSSProperties}
              aria-hidden="true"
            >
              <DoodleIcon name="book" size={30} />
            </span>

            <span style={{ flex: 1 }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--pink)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '3px'
                }}
              >
                Member Story
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: 'var(--text-base)',
                  fontWeight: 900,
                  color: 'var(--ink-900)',
                  lineHeight: 1.3,
                  marginBottom: '4px'
                }}
              >
                メンバーのストーリー
              </span>
              <span style={{ display: 'block', fontSize: '12px', color: 'var(--ink-500)', lineHeight: 1.5 }}>
                実際に学ぶ仲間の活動を見る
              </span>
            </span>

            <span style={{ flexShrink: 0, color: 'var(--pink)' }} aria-hidden="true">
              <ArrowRightDoodle width={26} />
            </span>
          </a>
        </div>
      </Section>

      {/* ===== 学びの流れ ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '20px' }}>
          <SectionTitle variant={1} lineColor="var(--pink)">
            学びの流れ
          </SectionTitle>
        </div>

        <div className="cd-hscroll" style={{ ['--accent-rgb' as string]: 'var(--pink-rgb)' } as CSSProperties}>
          {learningSteps.map((step, i) => (
            <div
              key={step.num}
              className="cd-scroll-card craft-paper craft-tilt"
              style={
                {
                  '--accent-rgb': step.accentRgb,
                  '--tape-rgb': step.accentRgb,
                  '--rot': `${i % 2 === 0 ? -0.8 : 0.8}deg`
                } as CSSProperties
              }
            >
              <span className="craft-tape" aria-hidden="true" />

              <div className="cd-scroll-card-head">
                <span className="cd-num">{step.num}</span>
                <span style={{ color: 'rgb(var(--accent-rgb))' }} aria-hidden="true">
                  <DoodleIcon name={step.icon} size={30} />
                </span>
              </div>

              <h3>{step.title}</h3>
              {step.subtitle && <p className="cd-scroll-sub">{step.subtitle}</p>}
              <p className="cd-scroll-desc" style={{ flex: 1 }}>
                {step.description}
              </p>

              <p className="cd-tip">
                <strong>ツール：</strong>
                {step.tool}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== PBLで育つこと ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '26px' }}>
          <SectionTitle variant={3} lineColor="var(--violet)">
            PBLで育つこと
          </SectionTitle>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {growthItems.map((item, i) => (
            <details
              key={item.id}
              className="cd-acc craft-paper craft-tilt reveal"
              style={
                {
                  '--accent-rgb': item.accentRgb,
                  '--rot': `${i % 2 === 0 ? -0.4 : 0.4}deg`
                } as CSSProperties
              }
            >
              <summary>
                <span className="cd-acc-icon" aria-hidden="true">
                  <DoodleIcon name={item.icon} size={28} />
                </span>
                <span className="cd-acc-title">
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </span>
                <span className="cd-acc-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <polyline points="6,9 12,15 18,9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <p className="cd-acc-body">{item.content}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* ===== メンバーの作品 ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '20px' }}>
          <SectionTitle variant={2} lineColor="var(--cream)">
            メンバーの作品
          </SectionTitle>
        </div>

        <div className="cd-hscroll" style={{ ['--accent-rgb' as string]: '224 158 22' } as CSSProperties}>
          {memberWorks.map((work, i) => (
            <div
              key={work.id}
              className="cd-scroll-card craft-paper craft-tilt"
              style={
                {
                  '--accent-rgb': work.accentRgb,
                  '--tape-rgb': work.accentRgb,
                  '--rot': `${i % 2 === 0 ? -1 : 1}deg`,
                  width: '280px',
                  textAlign: 'center'
                } as CSSProperties
              }
            >
              <span className={`craft-tape ${work.tapeClass}`} aria-hidden="true" />

              <span
                className="cd-card-icon"
                style={{ marginInline: 'auto', marginBottom: '10px' }}
                aria-hidden="true"
              >
                <DoodleIcon name={work.icon} size={30} />
              </span>

              <h3 style={{ color: 'rgb(var(--accent-rgb))' }}>{work.title}</h3>
              <p className="cd-scroll-desc" style={{ flex: 1 }}>
                {work.description}
              </p>

              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="craft-sticker"
                style={{ background: 'rgb(var(--accent-rgb))', alignSelf: 'center', padding: '10px 22px', fontSize: 'var(--text-sm)' }}
              >
                詳しく見る
                <ArrowRightDoodle width={20} />
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== 関連コラム ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '20px' }}>
          <SectionTitle variant={1} lineColor="var(--brand)">
            関連コラム
          </SectionTitle>
        </div>

        <div className="cd-banner craft-paper craft-tilt reveal" style={{ '--rot': '0.5deg' } as CSSProperties}>
          <span className="craft-tape" aria-hidden="true" />

          <span className="cd-card-icon" style={{ marginInline: 'auto' }} aria-hidden="true">
            <DoodleIcon name="pencil" size={30} />
          </span>

          <h3 className="cd-card-title" style={{ textAlign: 'center' }}>
            創造体験を通してものづくりの感動を！
          </h3>

          <a
            href="https://note.com/keepon_/n/n8a6daa44bea4"
            target="_blank"
            rel="noopener noreferrer"
            className="craft-sticker"
          >
            noteで読む
            <ArrowRightDoodle width={22} />
          </a>
        </div>
      </Section>

      {/* JSON-LD 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "PBL(課題解決型学習)",
            "description": "自分の好きや疑問を起点にテーマを決め、新たなモノを創ったり、解決策を考え、最後は動画やスライドで発表をする学びです。",
            "provider": { "@type": "Organization", "name": "CLAFT" }
          })
        }}
      />
    </MobileContainer>
  );
}
