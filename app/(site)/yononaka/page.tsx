import Link from 'next/link';
import { MobileContainer, Section } from '@/components/MobileContainer';
import type { CSSProperties } from 'react';
import { SectionTitle } from '@/components/craft/SectionTitle';
import { Underline, ArrowRightDoodle } from '@/components/craft/HandDrawn';
import { DoodleIcon, type DoodleIconName } from '@/components/craft/DoodleIcon';

export const metadata = {
  title: 'Yononaka（対話ワーク） | CLAFT',
  description:
    'お金や時間など、身近なテーマを入り口に、正解がひとつではない問いをみんなで話し合う学びです。'
};

// 過去のワークデータ
const pastWorks: {
  id: number;
  title: string;
  description: string;
  accentRgb: string;
  tapeClass: string;
  icon: DoodleIconName;
}[] = [
  {
    id: 1,
    title: 'おかねって何だろう？',
    description: 'お金の価値、使い方、もらい方について考えました。',
    accentRgb: '224 158 22',
    tapeClass: 'craft-tape--cream',
    icon: 'coin'
  },
  {
    id: 2,
    title: '自分のまちについて話そう',
    description: '住んでいる街の魅力や課題を発見しました。',
    accentRgb: 'var(--brand-rgb)',
    tapeClass: '',
    icon: 'home'
  },
  {
    id: 3,
    title: 'こころとからだの関係',
    description: '心と体のつながりについて探究しました。',
    accentRgb: 'var(--pink-rgb)',
    tapeClass: 'craft-tape--pink',
    icon: 'heart'
  }
];

// ワークの流れデータ
const workflowSteps: {
  num: string;
  title: string;
  description: string;
  examples: string;
  accentRgb: string;
  icon: DoodleIconName;
}[] = [
  {
    num: '1',
    title: '身近なテーマ',
    description: 'よのなかにある身近なモノ・コトを扱います。',
    examples: '「おかねって何だろう」「自分のまちについて話そう」「こころとからだの関係を考えよう」',
    accentRgb: '224 158 22',
    icon: 'flag'
  },
  {
    num: '2',
    title: '正解がひとつでないお題',
    description: 'テーマごとに3〜4つのお題があります。まずは一人で考える時間をとります。',
    examples: '「お金持ちってどんなイメージ？」「つい行ってしまう場所はどこ？」「緊張を和らげるには？」',
    accentRgb: 'var(--brand-rgb)',
    icon: 'bulb'
  },
  {
    num: '3',
    title: '意見共有（少人数グループ）',
    description:
      '少人数のグループで順番に話します。各回約20名参加しますが、少数のグループで1人1人順番に発言できるので安心です。',
    examples: '',
    accentRgb: 'var(--violet-rgb)',
    icon: 'talk'
  }
];

// 育つことデータ
const growthItems: {
  id: number;
  title: string;
  content: string;
  icon: DoodleIconName;
  accentRgb: string;
}[] = [
  {
    id: 1,
    title: '何事においても立ち止まって考える習慣が身につく！',
    content:
      '正解が一つではない問いに向き合い、自分なりの答えを導き出す経験を通じて、「考える力」を養います。また、他者の意見に触れることで「自分ならどう考えるか」を繰り返し、時には「本当にそうなのか？」と問い直すことで、当たり前や常識に立ち止まって、多様な視点から深く考える力が身につきます。',
    icon: 'bulb',
    accentRgb: '224 158 22'
  },
  {
    id: 2,
    title: 'コミュニケーションへの不安や恐怖がなくなる！',
    content:
      '「人を傷つけないことであれば何を言ってもOK」というルールで、心理的安全性を重視しています。「わからないこと」や「失敗すること」を恐れずに意見を交わせる体験を通じて、話すことへの自信が身につきます。そのうえで、わかりやすく話す力、表現する力、他者の考えを聴く力などが養われるのだと思います。',
    icon: 'bolt',
    accentRgb: 'var(--brand-rgb)'
  },
  {
    id: 3,
    title: '自己理解が深まり、やりたいことが湧いてくる！',
    content:
      '会話をしながら自分の意見を見直すことで、自分自身の価値観や考え方の癖に気づくことができます。さまざまなテーマについて話し合う中で、自分の興味や得意なことに気づいたり、また、これから挑戦したいことや探究したいことが心の底から自然と湧いてきます。',
    icon: 'sparkle',
    accentRgb: 'var(--violet-rgb)'
  }
];

// 参加者の声データ
const voices = [
  {
    grade: '小学6年生',
    title: '「遠慮せず話せる場所」',
    text: '誰もが、自分の思う意見を思う存分話せる場所、間違えてても、遠慮はしない。なぜかというと、人それぞれが意見を持っているから。そして、その人が持っている意見を理解し合える場所じゃないかなと自分は思ってます。'
  },
  {
    grade: '大学3年生',
    title: '「世代を越えて探究できる」',
    text: '幅広い世代の人と話せる環境。先生や教授のようにとっても詳しい人でもいいが、ある程度知っている人と一緒に探求できるような環境。身近な存在から楽しんで学べるところがいいなと思います。'
  },
  {
    grade: '高校1年生',
    title: '「言葉にする課題も見える」',
    text: '論理的なことを言われたら勉強になるし、自分がどう思うのかも理解できる場所。考えを見つけ出すのはできるようになった気がして、それを図化できるのに、言葉にはできず、語彙力が足りないことを実感しています。'
  }
];

// 関連コンテンツデータ
const relatedContents: {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  accentRgb: string;
  tapeClass: string;
  enabled: boolean;
}[] = [
  {
    id: 1,
    title: 'Yononaka Story（インタビュー企画）',
    description:
      'ゲストのこれまでのキャリアストーリーや、現在の活動、その始まりのきっかけ、そしてこれからのビジョンについて深く伺っていくインタビュー。一人ひとり異なるキャリアの軌跡を知ることで、キャリアを見つめ直すヒントや新しい視点を得られるきっかけになれば幸いです。',
    image: '/assets/yononaka/story.jpg',
    buttonText: 'YouTubeで見る',
    buttonLink: 'https://www.youtube.com/playlist?list=PLg8PlJHz4ogs0wfyxguL7TCkwg_3GGeEz',
    accentRgb: 'var(--pink-rgb)',
    tapeClass: 'craft-tape--pink',
    enabled: true
  },
  {
    id: 2,
    title: 'Yononaka レディオ（ポッドキャスト）',
    description:
      '何かのために話すというより、ただおしゃべりを楽しむ先にぽろりと生まれるものを大切にしたい──そんなゆるい番組です。カチッと言えば「創造的対話」。会話の波に乗ったり降りたりしながら、これまでの経験をもとに意見を共有したり、価値観をそっと手放したりしつつ、新しい見方・考え方を試しています。ここで芽生えたアイデアから、いつかモノやサービスが生まれたらいいなぁ──そんな願いも込めた"実験室"です。よろしければ、本編をのぞいてみてください。',
    image: '/assets/yononaka/radio.jpg',
    buttonText: 'Podcastで聴く',
    buttonLink: 'https://podcasts.apple.com/jp/podcast/yononaka-radio/id1766887467',
    accentRgb: 'var(--brand-rgb)',
    tapeClass: '',
    enabled: true
  },
  {
    id: 3,
    title: '創造的対話カードゲーム（Coming Soon）',
    description: '※準備中です',
    image: '/assets/yononaka/cardgame.jpg',
    buttonText: 'Coming Soon',
    buttonLink: '',
    accentRgb: 'var(--violet-rgb)',
    tapeClass: 'craft-tape--violet',
    enabled: false
  }
];

// 3つのルール
const rules = [
  { num: '①', text: '静かにしない', accentRgb: 'var(--pink-rgb)', desc: '思ったことはつぶやいてOK' },
  { num: '②', text: 'すべて信じない', accentRgb: 'var(--brand-rgb)', desc: 'ワークの内容にも疑問を持ってOK' },
  { num: '③', text: '正解がないから減点はない', accentRgb: '224 158 22', desc: 'どんな意見でも大歓迎！' }
];

export default function YononakaPage(){
  return (
    <MobileContainer>
      {/* ===== 冒頭（ヒーロー）===== */}
      <Section className="cd-hero">
        <p className="cd-hero-label craft-label" style={{ color: 'var(--brand-deep)' }}>
          小学生〜高校生・保護者の方へ
        </p>

        <h1 className="cd-hero-title craft-misprint">
          Yononaka<span className="cd-hero-small">(対話ワーク)</span>
        </h1>
        <Underline variant={2} className="cd-hero-line craft-draw craft-draw--auto" style={{ color: 'var(--brand)' }} />

        <p className="cd-hero-lead">
          年齢も立場も関係なく、お子さんが自分の意見を堂々と話せる、オンラインの対話の広場です。<br />
          お金や時間など身近なテーマを入り口に、正解がひとつではない問いをみんなで話し合います。<br />
          ちがう意見を聞く中で、世界の見え方が少しずつ広がっていきます。
        </p>

        <p className="cd-hero-badges">
          <Link href="/career" className="craft-label">キャリアコースの学び</Link>
          <span className="craft-label">どのコースの方も参加できます</span>
        </p>

        {/* 漂う手描きアイコン */}
        <div className="cd-float-row" aria-hidden="true">
          <span className="craft-float" style={doodle({ color: 'var(--brand)', '--rot': '-6deg' })}>
            <DoodleIcon name="talk" size={38} />
          </span>
          <span className="craft-float" style={doodle({ color: 'var(--green)', '--rot': '4deg', animationDelay: '0.5s' })}>
            <DoodleIcon name="globe" size={38} />
          </span>
          <span className="craft-float" style={doodle({ color: 'var(--cream)', '--rot': '-4deg', animationDelay: '1s' })}>
            <DoodleIcon name="bulb" size={38} />
          </span>
        </div>
      </Section>

      {/* ===== 安心して話せる環境 ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '26px' }}>
          <SectionTitle variant={1} lineColor="var(--cream)">
            安心して話せる環境
          </SectionTitle>
        </div>

        {/* 写真（テープ留めポラロイド） */}
        <div className="cd-photo craft-photo reveal" style={{ marginBottom: '32px' }}>
          <span className="craft-tape" aria-hidden="true" />
          <span className="craft-tape craft-tape--tr craft-tape--cream" aria-hidden="true" />
          <img src="/assets/yononaka/hero.jpg" alt="対話型ワークショップの様子" />
        </div>

        {/* 3つのルール */}
        <div className="cd-card craft-paper craft-tilt reveal" style={{ '--rot': '-0.4deg' } as CSSProperties}>
          <span className="craft-tape" aria-hidden="true" />

          <p style={{ margin: '0 0 20px', textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--ink-500)' }}>
            ワークの冒頭で、この3つの声掛けをします
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {rules.map((rule, i) => (
              <div
                key={i}
                className="cd-tip"
                style={
                  {
                    '--accent-rgb': rule.accentRgb,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 16px'
                  } as CSSProperties
                }
              >
                <span
                  style={{
                    fontSize: '22px',
                    fontWeight: 'var(--font-black)',
                    color: 'rgb(var(--accent-rgb))',
                    flexShrink: 0
                  }}
                >
                  {rule.num}
                </span>
                <span>
                  <strong style={{ display: 'block', color: 'var(--ink-900)', fontSize: 'var(--text-base)' }}>
                    {rule.text}
                  </strong>
                  <span style={{ display: 'block', marginTop: '2px', color: 'var(--ink-500)', fontSize: 'var(--text-sm)' }}>
                    {rule.desc}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <p
            style={{
              margin: '22px 0 0',
              padding: '16px',
              background: 'rgb(var(--brand-rgb) / 0.08)',
              borderRadius: '3px 8px 4px 9px / 8px 3px 9px 4px',
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--ink-700)'
            }}
          >
            事前知識なしでOK、親子参加大歓迎！<br />
            参加者それぞれがリビングでくつろぐような雰囲気で会話しています。
          </p>
        </div>
      </Section>

      {/* ===== 過去のワーク ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '20px' }}>
          <SectionTitle variant={2} lineColor="var(--brand)">
            過去のワーク
          </SectionTitle>
        </div>

        <div className="cd-hscroll">
          {pastWorks.map((work, i) => (
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

              <span className="cd-card-icon" style={{ marginInline: 'auto', marginBottom: '10px' }} aria-hidden="true">
                <DoodleIcon name={work.icon} size={30} />
              </span>

              <h3 style={{ color: 'rgb(var(--accent-rgb))' }}>{work.title}</h3>
              <p className="cd-scroll-desc" style={{ margin: 0 }}>
                {work.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== ワークの流れ ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '20px' }}>
          <SectionTitle variant={3} lineColor="var(--brand)">
            ワークの流れ
          </SectionTitle>
        </div>

        <div className="cd-hscroll">
          {workflowSteps.map((step, i) => (
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
              <p className="cd-scroll-desc" style={{ flex: 1 }}>
                {step.description}
              </p>

              {step.examples && (
                <p className="cd-tip">
                  <strong>例：</strong>
                  {step.examples}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ===== Yononakaで育つこと ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '26px' }}>
          <SectionTitle variant={1} lineColor="var(--violet)">
            Yononakaで育つこと
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

      {/* ===== 参加者の声 ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '26px' }}>
          <SectionTitle variant={2} lineColor="var(--pink)">
            参加者の声
          </SectionTitle>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {voices.map((voice, i) => (
            <article
              key={i}
              className="cd-voice craft-paper craft-tilt reveal"
              style={{ '--rot': `${i % 2 === 0 ? -0.5 : 0.5}deg`, transitionDelay: `${i * 80}ms` } as CSSProperties}
            >
              <div className="cd-voice-head">
                <span className="cd-voice-grade">{voice.grade}</span>
                <span className="cd-voice-title">{voice.title}</span>
              </div>
              <p>{voice.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* ===== 関連コンテンツ ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '26px' }}>
          <SectionTitle variant={3} lineColor="var(--pink)">
            関連コンテンツ
          </SectionTitle>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '34px' }}>
          {relatedContents.map((content, i) => (
            <article
              key={content.id}
              className="cd-card craft-paper craft-tilt craft-lift reveal"
              style={
                {
                  '--accent-rgb': content.accentRgb,
                  '--tape-rgb': content.accentRgb,
                  '--rot': `${i % 2 === 0 ? -0.6 : 0.6}deg`
                } as CSSProperties
              }
            >
              <span className={`craft-tape ${content.tapeClass}`} aria-hidden="true" />

              {/* 画像（ポラロイド） */}
              <div className="cd-photo craft-photo">
                <img src={content.image} alt={content.title} />
              </div>

              <h3 className="cd-card-title">{content.title}</h3>
              <p style={{ margin: '0 0 20px' }}>{content.description}</p>

              {content.enabled ? (
                <a
                  href={content.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="craft-sticker"
                  style={{ background: 'rgb(var(--accent-rgb))' }}
                >
                  {content.buttonText}
                  <ArrowRightDoodle width={22} />
                </a>
              ) : (
                <button
                  disabled
                  className="craft-sticker"
                  style={{ background: 'rgba(92, 77, 42, 0.25)', cursor: 'not-allowed' }}
                >
                  {content.buttonText}
                </button>
              )}
            </article>
          ))}
        </div>
      </Section>

      {/* ===== 法人・教室向けへの導線 ===== */}
      <Section>
        <div className="cd-banner craft-paper craft-paper--warm craft-tilt reveal" style={{ '--rot': '-0.4deg' } as CSSProperties}>
          <span className="craft-tape craft-tape--cream" aria-hidden="true" />
          <p style={{ margin: '0 0 12px', fontSize: 'var(--text-sm)', color: 'var(--ink-600)' }}>
            習い事教室・法人での導入をご検討の方へ
          </p>
          <a href="/yononaka/kyoshitsu" className="cd-textlink">
            法人向けページを見る
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
            "name": "Yononaka（対話ワーク）",
            "description": "お金や時間など、身近なテーマを入り口に、正解がひとつではない問いをみんなで話し合う学びです。",
            "provider": { "@type": "Organization", "name": "CLAFT" }
          })
        }}
      />
    </MobileContainer>
  );
}

const doodle = (style: Record<string, string | number>) => style as CSSProperties;
