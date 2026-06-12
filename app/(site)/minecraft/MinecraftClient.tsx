import Link from 'next/link';
import type { CSSProperties } from 'react';
import { SectionTitle } from '@/components/craft/SectionTitle';
import { Underline, ArrowRightDoodle } from '@/components/craft/HandDrawn';
import { DoodleIcon, type DoodleIconName } from '@/components/craft/DoodleIcon';

const doodle = (style: Record<string, string | number>) => style as CSSProperties;

export function MinecraftClient() {
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <HeroSection />
      <QuickInfoSection />
      <OutcomesSection />
      <FlowSection />
      <PricingSection />
      <RelatedCoursesSection />
    </div>
  );
}

// =========================================
// 1. ヒーローセクション
// =========================================
function HeroSection() {
  return (
    <section className="cd-hero" style={{ padding: '64px 20px 56px' }}>
      {/* 漂う手描きアイコン */}
      <div aria-hidden="true">
        <span
          className="craft-doodle craft-float"
          style={doodle({ top: '8%', left: '5%', color: 'var(--green)', opacity: 0.45, '--rot': '-10deg' })}
        >
          <DoodleIcon name="gamepad" size={40} />
        </span>
        <span
          className="craft-doodle craft-float craft-float--slow"
          style={doodle({ top: '13%', right: '7%', color: 'var(--brand)', opacity: 0.45, '--rot': '12deg' })}
        >
          <DoodleIcon name="globe" size={34} />
        </span>
        <span
          className="craft-doodle craft-float"
          style={doodle({ bottom: '16%', left: '9%', color: 'var(--cream)', opacity: 0.85, '--rot': '-6deg', animationDelay: '1s' })}
        >
          <DoodleIcon name="bulb" size={28} />
        </span>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* バッジ（荷札タグ） */}
        <p className="cd-hero-label craft-label" style={{ color: 'var(--green)' }}>
          マイクラSDGsコース
        </p>

        {/* メインコピー */}
        <h1 className="cd-hero-title craft-misprint" style={{ marginBottom: '26px' }}>
          AI時代を生き抜く
          <br />
          <span style={{ color: 'var(--green)', position: 'relative', display: 'inline-block' }}>
            「未来を創る力」
            <Underline
              variant={1}
              className="craft-draw craft-draw--auto"
              style={{ display: 'block', width: 'calc(100% + 16px)', margin: '0 0 0 -8px', height: 'auto', color: 'var(--cream)' }}
            />
          </span>
          を育む。
        </h1>

        {/* サブコピー */}
        <p className="cd-hero-lead" style={{ marginBottom: '36px' }}>
          マイクラ×SDGs×プログラミングで、楽しみながら新たな価値を生み出そう！SDGsの目標を深く理解し、身近な問題として捉え、創造的な解決策を考え、実行する力を育む。
        </p>

        {/* メインビジュアル（テープ留めポラロイド） */}
        <div className="cd-photo craft-photo reveal">
          <span className="craft-tape craft-tape--green" aria-hidden="true" />
          <span className="craft-tape craft-tape--tr craft-tape--cream" aria-hidden="true" />
          <img src="/assets/minecraft/hero.jpeg" alt="制作やプログラミングの様子" />
        </div>
      </div>
    </section>
  );
}

// =========================================
// 2. クイック情報セクション
// =========================================
function QuickInfoSection() {
  const quickInfo: { icon: DoodleIconName; label: string; value: string; accentRgb: string }[] = [
    {
      icon: 'family',
      label: '対象',
      value: '小学3年生～中学生(例外あり)',
      accentRgb: 'var(--green-rgb)'
    },
    {
      icon: 'gamepad',
      label: '使用ツール',
      value: '教育版マインクラフト',
      accentRgb: 'var(--brand-rgb)'
    },
    {
      icon: 'talk',
      label: '形式',
      value: 'オンライン。SDGsテーマに沿ったワーク、エージェントプログラミングのワーク、マインクラフトでの制作。',
      accentRgb: '224 158 22'
    },
    {
      icon: 'clock',
      label: '学習の流れ（1ヶ月サイクル）',
      value: `★SDGsワーク
テーマ動画を見る⇒補助プリントを参考に自分の意見を提出する
★プログラミングワーク
テーマ動画を見る⇒補助プリントを参考にエージェントのプログラミングを提出する
★マイクラ制作
SDGsテーマの解決策をマインクラフトのワールドで建築して提出する
★1on1ミーティング
ワーク後に、月に一度オンライン面談で振り返りを行う`,
      accentRgb: 'var(--pink-rgb)'
    }
  ];

  return (
    <section style={{ width: '100%', padding: '40px 20px' }}>
      <div className="container">
        <div className="cd-info-list">
          {quickInfo.map((item, index) => (
            <div
              key={index}
              className="cd-info-item craft-paper craft-tilt reveal"
              style={
                {
                  '--accent-rgb': item.accentRgb,
                  '--rot': `${index % 2 === 0 ? -0.4 : 0.4}deg`,
                  transitionDelay: `${index * 100}ms`
                } as CSSProperties
              }
            >
              <span className="cd-info-icon" aria-hidden="true">
                <DoodleIcon name={item.icon} size={28} />
              </span>
              <div style={{ flex: 1 }}>
                <strong className="cd-info-label">{item.label}</strong>
                <p className="cd-info-text">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================
// 3. 成果セクション（こんな力が育つ）
// =========================================
function OutcomesSection() {
  const outcomes: {
    image: string;
    title: string;
    points: string[];
    icon: DoodleIconName;
    accentRgb: string;
    tapeClass: string;
    rotate: string;
  }[] = [
    {
      image: '/assets/minecraft/outcome_01.jpeg',
      title: '創造性が爆発！マインクラフトでアイデアをカタチに',
      points: [
        'ひらめきを具現化：「こんなものがあったらいいな」というアイデアを、ブロック一つ一つ積み上げて形に。',
        '試行錯誤のプロセス：理想の形にするために、何度も試しては修正。粘り強く問題に取り組む力が養われます。'
      ],
      icon: 'pencil',
      accentRgb: 'var(--green-rgb)',
      tapeClass: 'craft-tape--green',
      rotate: '-0.8deg'
    },
    {
      image: '/assets/minecraft/outcome_02.jpeg',
      title: '世界の社会問題を"自分ごと"に。SDGsで考える力',
      points: [
        'リアルな課題に触れる：貧困、飢餓、環境問題など、現実世界の複雑な課題を分かりやすくインプット。',
        '「私ならどうする？」：自分ならどう解決するかを深く考え、マインクラフトの世界で具体的に表現。'
      ],
      icon: 'globe',
      accentRgb: 'var(--brand-rgb)',
      tapeClass: '',
      rotate: '0.7deg'
    },
    {
      image: '/assets/minecraft/outcome_03.jpeg',
      title: '「論理的思考力」と「発信力」を育むプログラミング学習',
      points: [
        'ゲームで学ぶプログラミング：エージェントに命令を与え、自動で建物を建てたり、問題を解決する仕組みを作る。',
        'アイデアを「共有」する力：制作したワールドや解決策を動画にして発表。プレゼンテーション能力を養います。'
      ],
      icon: 'wrench',
      accentRgb: '224 158 22',
      tapeClass: 'craft-tape--cream',
      rotate: '-0.6deg'
    }
  ];

  return (
    <section style={{ width: '100%', padding: '56px 20px' }}>
      <div className="container">
        <div className="hp-section-head">
          <SectionTitle variant={2} lineColor="var(--green)">
            楽しい！やってみたい！が
            <br />
            <span style={{ color: 'var(--green)' }}>「未来を創る力」</span>に変わる!?
          </SectionTitle>
        </div>

        {/* 成果カード（貼り込んだ紙片） */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {outcomes.map((item, index) => (
            <article
              key={index}
              className="cd-card craft-paper craft-tilt craft-lift reveal"
              style={
                {
                  '--accent-rgb': item.accentRgb,
                  '--tape-rgb': item.accentRgb,
                  '--rot': item.rotate,
                  transitionDelay: `${index * 100}ms`
                } as CSSProperties
              }
            >
              <span className={`craft-tape ${item.tapeClass}`} aria-hidden="true" />

              <span className="cd-card-icon" aria-hidden="true">
                <DoodleIcon name={item.icon} size={32} />
              </span>

              {/* 画像（ポラロイド） */}
              <div className="cd-photo cd-photo--square craft-photo">
                <img src={item.image} alt={item.title} />
              </div>

              <h3 className="cd-card-title">{item.title}</h3>

              <ul>
                {item.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================
// 4. 入会までの流れ
// =========================================
function FlowSection() {
  const steps: { num: string; title: string; desc: string; icon: DoodleIconName; accentRgb: string }[] = [
    { num: '1', title: '相談', desc: 'お気軽にLINEでご連絡ください。', icon: 'talk', accentRgb: 'var(--brand-rgb)' },
    { num: '2', title: '体験', desc: '1ヶ月無料体験。ZOOMで個別説明もいたします。', icon: 'sparkle', accentRgb: 'var(--green-rgb)' },
    { num: '3', title: '入会', desc: 'LINEから決済手続きなどご案内いたします。', icon: 'heart', accentRgb: 'var(--pink-rgb)' }
  ];

  return (
    <section style={{ width: '100%', padding: '56px 20px' }}>
      <div className="container">
        <div className="hp-section-head">
          <SectionTitle variant={3} lineColor="var(--brand)">
            入会までの流れ
          </SectionTitle>
        </div>

        {/* ステップカード */}
        <div className="hp-steps">
          {steps.map((step, index) => (
            <div
              key={index}
              className="hp-step craft-paper craft-tilt craft-lift reveal"
              style={
                {
                  '--accent-rgb': step.accentRgb,
                  '--rot': `${index % 2 === 0 ? -0.5 : 0.4}deg`,
                  transitionDelay: `${index * 100}ms`
                } as CSSProperties
              }
            >
              <div className="hp-step-head">
                <div className="hp-step-num">{step.num}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ color: 'rgb(var(--accent-rgb))' }} aria-hidden="true">
                      <DoodleIcon name={step.icon} size={26} />
                    </span>
                    <strong className="hp-step-title" style={{ margin: 0 }}>
                      {step.title}
                    </strong>
                  </div>
                  <p className="hp-step-body">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================
// 5. 料金セクション
// =========================================
function PricingSection() {
  return (
    <section style={{ width: '100%', padding: '56px 20px' }}>
      <div className="container">
        <div
          className="cd-price-card craft-paper craft-paper--warm craft-tilt reveal"
          style={{ '--rot': '-0.5deg' } as CSSProperties}
        >
          <span className="craft-tape craft-tape--green" aria-hidden="true" />

          <h2 className="cd-card-title" style={{ fontSize: 'var(--text-xl)' }}>
            料金
          </h2>

          <p style={{ margin: '0 0 16px' }}>
            <span className="cd-price-free">初月無料</span>
            <strong className="cd-price-value">月額7,700円（税込）</strong>
          </p>

          <p className="cd-price-note">
            教育版マインクラフトのライセンス料（5,500円/年）は別途発生します。
          </p>

          <p className="cd-price-note">※ 決済手続きはLINEからご案内いたします。</p>
        </div>
      </div>
    </section>
  );
}

// =========================================
// 6. 関連コースセクション
// =========================================
function RelatedCoursesSection() {
  const relatedCourses: { image: string; title: string; description: string; link: string; accentRgb: string; tapeClass: string }[] = [
    {
      image: '/assets/minecraft/yononaka.jpeg',
      title: 'Yononaka（対話型ワークショップ）',
      description:
        '仲間との交流の場。身近なことをテーマに、正解がひとつでない問いに対して意見を共有する時間です。',
      link: '/yononaka',
      accentRgb: 'var(--brand-rgb)',
      tapeClass: ''
    },
    {
      image: '/assets/minecraft/futurecraft.jpeg',
      title: 'ミライクラフト（実践プログラム）',
      description:
        '通常授業とは違う発表会やイベント、実際の課題解決ワークなどで仲間とともに試せる場もあります。',
      link: '/futurecraft',
      accentRgb: 'var(--green-rgb)',
      tapeClass: 'craft-tape--green'
    }
  ];

  return (
    <section style={{ width: '100%', padding: '56px 20px 90px' }}>
      <div className="container">
        <div className="hp-section-head">
          <SectionTitle variant={1} lineColor="var(--cream)">
            関連プログラム
          </SectionTitle>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {relatedCourses.map((course, index) => (
            <article
              key={index}
              className="cd-card craft-paper craft-tilt craft-lift reveal"
              style={
                {
                  '--accent-rgb': course.accentRgb,
                  '--tape-rgb': course.accentRgb,
                  '--rot': `${index % 2 === 0 ? -0.7 : 0.7}deg`,
                  transitionDelay: `${index * 100}ms`
                } as CSSProperties
              }
            >
              <span className={`craft-tape ${course.tapeClass}`} aria-hidden="true" />

              <div className="cd-photo craft-photo" style={{ maxWidth: '230px', marginInline: 'auto' }}>
                <img src={course.image} alt={course.title} />
              </div>

              <h3 className="cd-card-title">{course.title}</h3>
              <p style={{ margin: '0 0 16px' }}>{course.description}</p>

              <Link href={course.link} className="cd-textlink">
                詳しく見る
                <ArrowRightDoodle width={22} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
