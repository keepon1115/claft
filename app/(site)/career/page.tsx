import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { SectionTitle } from '@/components/craft/SectionTitle';
import { Underline, ArrowRightDoodle } from '@/components/craft/HandDrawn';
import { DoodleIcon, type DoodleIconName } from '@/components/craft/DoodleIcon';
import { CtaPair } from '@/components/CtaPair';
import { FlowApply } from '@/components/FlowApply';
import { programs } from '@/lib/programs';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'キャリアコース | CLAFT',
  description:
    'PBL(課題解決型学習)・Yononaka(対話ワーク)・ミライクラフト・ジブンクラフトがぜんぶ入り。探究×対話×実践×自己理解で、自分のキャリアを自分でクラフトする中高生向けコース。',
  alternates: { canonical: '/career' },
};

// 入会までの学びの流れ（実データ：旧クエストPBLコースページより移行）
const learningSteps: {
  num: string;
  title: string;
  description: string;
  accentRgb: string;
  icon: DoodleIconName;
}[] = [
  {
    num: '1',
    title: '相談',
    description: 'お気軽にLINEでご連絡ください。',
    accentRgb: '224 158 22',
    icon: 'talk',
  },
  {
    num: '2',
    title: '体験',
    description: '1ヶ月無料体験。Zoomで個別説明もいたします。',
    accentRgb: 'var(--brand-rgb)',
    icon: 'flag',
  },
  {
    num: '3',
    title: '入会',
    description: 'LINEから決済手続きなどご案内いたします。',
    accentRgb: 'var(--pink-rgb)',
    icon: 'sparkle',
  },
  {
    num: '4',
    title: '学び',
    description:
      'クエスト動画月9本更新。3〜4ヶ月を目安に、自分の「好き」や「気になる」から自分で課題を設定し、解決策をまとめて発表します。',
    accentRgb: 'var(--violet-rgb)',
    icon: 'search',
  },
  {
    num: '5',
    title: '振り返り',
    description:
      '3〜4ヶ月に1回の発表会に参加。非認知能力計測＆面談で目標設定を行い、次回の学習準備をします。',
    accentRgb: 'var(--brand-rgb)',
    icon: 'compass',
  },
];

// 作品ギャラリー（実データ：旧クエストPBLコースページより移行）
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
    icon: 'search',
  },
  {
    id: 2,
    title: '障害とはどのようなものか',
    description: '吃音から障害について調べ、資料をまとめて発表。',
    url: 'https://youtu.be/qoANUgtTAZo',
    accentRgb: 'var(--brand-rgb)',
    tapeClass: '',
    icon: 'heart',
  },
  {
    id: 3,
    title: '振動発電をマイクラで表現してみた',
    description: 'マイクラで発電アイデアを再現。',
    url: 'https://youtu.be/QKfGtt1QT1M',
    accentRgb: '224 158 22',
    tapeClass: 'craft-tape--cream',
    icon: 'bolt',
  },
];

const doodle = (style: Record<string, string | number>) => style as CSSProperties;

export default function CareerPage() {
  return (
    <MobileContainer>
      {/* ===== 冒頭（ヒーロー）===== */}
      <Section className="cd-hero">
        <p className="cd-hero-label craft-label" style={{ color: 'var(--brand-deep)' }}>
          中学生・高校生の方へ
        </p>

        <h1 className="cd-hero-title craft-misprint">キャリアコース</h1>
        <Underline variant={1} className="cd-hero-line craft-draw craft-draw--auto" style={{ color: '#e09e16' }} />

        <p className="cd-hero-lead">
          PBL・Yononaka・ミライクラフト・ジブンクラフト。
          <br />
          4つの学びがぜんぶ入り。
          <br />
          正解がひとつでない問いに、自分の意見を持ち、仲間と共有しながら、
          <br />
          自分でキャリアをクラフトしていくコースです。
        </p>

        <div className="hp-hero-chips" aria-label="キャリアコースの特徴" style={{ marginTop: '22px' }}>
          <span className="craft-paper hp-hero-chip">中学生〜</span>
          <span className="craft-paper hp-hero-chip">月額¥7,700〜</span>
          <span className="craft-paper hp-hero-chip">オンライン</span>
        </div>

        {/* 漂う手描きアイコン */}
        <div className="cd-float-row" aria-hidden="true">
          <span className="craft-float" style={doodle({ color: 'var(--pink)', '--rot': '-6deg' })}>
            <DoodleIcon name="search" size={38} />
          </span>
          <span className="craft-float" style={doodle({ color: 'var(--brand)', '--rot': '4deg', animationDelay: '0.5s' })}>
            <DoodleIcon name="talk" size={38} />
          </span>
          <span className="craft-float" style={doodle({ color: 'var(--violet)', '--rot': '-4deg', animationDelay: '1s' })}>
            <DoodleIcon name="sparkle" size={38} />
          </span>
        </div>
      </Section>

      {/* ===== 4つの学びの循環 ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '20px' }}>
          <SectionTitle variant={2} lineColor="var(--brand)">
            4つの学びが、ぐるぐる回る
          </SectionTitle>
          <p className="lead hp-section-lead">
            探究して、対話して、実践して、自分を知る。またその先に、新しい探究がはじまります。
          </p>
        </div>

        <div className="hp-programs-grid">
          {programs.map((program, i) => (
            <Link
              key={program.id}
              href={program.link}
              className="hp-program-card craft-paper craft-tilt craft-lift reveal"
              style={
                {
                  '--rot': program.rotate,
                  '--accent-rgb': program.accentRgb,
                  '--tape-rgb': program.accentRgb,
                  transitionDelay: `${i * 90}ms`,
                } as CSSProperties
              }
            >
              <span className="craft-tape" aria-hidden="true" />
              <span className="hp-program-label">{program.label}</span>

              <span className="hp-program-icon" aria-hidden="true">
                <DoodleIcon name={program.icon} size={36} />
              </span>

              <h3 className="hp-program-title">{program.title}</h3>
              <Underline variant={program.underline} className="hp-program-line craft-draw" />

              <p className="hp-program-desc">{program.description}</p>

              {program.openToAll && <span className="craft-label cd-hero-badge-inline">全コース参加OK</span>}
            </Link>
          ))}
        </div>
      </Section>

      {/* ===== 入会までの学びの流れ ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '20px' }}>
          <SectionTitle variant={1} lineColor="var(--pink)">
            入会までの流れ
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
                  '--rot': `${i % 2 === 0 ? -0.8 : 0.8}deg`,
                } as CSSProperties
              }
            >
              <span className="craft-tape" aria-hidden="true" />
              <div className="cd-scroll-card-head">
                <span className="cd-num">{step.num}</span>
                <span style={{ color: `rgb(${step.accentRgb})` }} aria-hidden="true">
                  <DoodleIcon name={step.icon} size={30} />
                </span>
              </div>
              <h3>{step.title}</h3>
              <p className="cd-scroll-desc" style={{ flex: 1 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== 作品ギャラリー ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '20px' }}>
          <SectionTitle variant={2} lineColor="var(--cream)">
            作品ギャラリー
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
                  textAlign: 'center',
                } as CSSProperties
              }
            >
              <span className={`craft-tape ${work.tapeClass}`} aria-hidden="true" />
              <span className="cd-card-icon" style={{ marginInline: 'auto', marginBottom: '10px' }} aria-hidden="true">
                <DoodleIcon name={work.icon} size={30} />
              </span>
              <h3 style={{ color: `rgb(${work.accentRgb})` }}>{work.title}</h3>
              <p className="cd-scroll-desc" style={{ flex: 1 }}>
                {work.description}
              </p>
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="craft-sticker"
                style={{ background: `rgb(${work.accentRgb})`, alignSelf: 'center', padding: '10px 22px', fontSize: 'var(--text-sm)' }}
              >
                詳しく見る
                <ArrowRightDoodle width={20} />
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== 料金 ===== */}
      <Section>
        <div className="craft-paper craft-tilt reveal" style={{ '--rot': '0.3deg' } as CSSProperties}>
          <span className="craft-tape" aria-hidden="true" />
          <h2 className="cd-card-title" style={{ marginBottom: '12px' }}>
            料金
          </h2>
          <p className="body-base text-ink-700 mb-4">
            <span
              className="inline-block font-bold py-1 px-2 rounded-full mr-2"
              style={{ background: 'rgb(var(--brand-rgb) / 0.14)', color: 'var(--brand-deep)' }}
            >
              初月無料
            </span>
            <strong>月額7,700円（税込）</strong>
          </p>
          <p className="body-base text-ink-500 mb-0">※ 決済手続きはLINEからご案内いたします。</p>
        </div>
      </Section>

      <FlowApply />

      <Section>
        <div className="hp-hero-cta">
          <CtaPair location="career" />
        </div>
      </Section>

      {/* JSON-LD 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOccupationalProgram',
            name: 'キャリアコース',
            description:
              'PBL(課題解決型学習)・Yononaka(対話ワーク)・ミライクラフト・ジブンクラフトがぜんぶ入り。正解がひとつでない問題に対して、自分の意見を持ち、共有する学び。オンライン実施。',
            url: absoluteUrl('/career'),
            provider: { '@type': 'Organization', name: 'CLAFT' },
            offers: { '@type': 'Offer', price: '7700', priceCurrency: 'JPY' },
          }),
        }}
      />
    </MobileContainer>
  );
}
