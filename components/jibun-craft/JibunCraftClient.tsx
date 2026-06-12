import { MobileContainer, Section } from '@/components/MobileContainer';
import type { CSSProperties, ReactNode } from 'react';
import { FlowApply } from '@/components/FlowApply';
import { FAQ } from '@/components/FAQ';
import { Students } from '@/components/Students';
import { SectionTitle } from '@/components/craft/SectionTitle';
import { Underline, ArrowRightDoodle } from '@/components/craft/HandDrawn';
import { DoodleIcon, type DoodleIconName } from '@/components/craft/DoodleIcon';

const doodle = (style: Record<string, string | number>) => style as CSSProperties;

// AiGrow のブランドブルー（外部ツールの色なのでトークン外で許容）
const AIGROW_RGB = '59 130 246';

// 4つの学びチップ
const learningChips: { title: string; icon: DoodleIconName; accentRgb: string }[] = [
  { title: 'クエスト', icon: 'book', accentRgb: 'var(--green-rgb)' },
  { title: 'PBL', icon: 'search', accentRgb: 'var(--brand-rgb)' },
  { title: 'Yononaka', icon: 'talk', accentRgb: 'var(--pink-rgb)' },
  { title: 'ミライクラフト', icon: 'bolt', accentRgb: '224 158 22' }
];

// キャリア面談の3ステップ
const careerSteps: {
  step: string;
  icon: DoodleIconName;
  title: string;
  body: string;
  accentRgb: string;
  tapeClass: string;
}[] = [
  {
    step: 'Step 1',
    icon: 'flag',
    title: 'AiGrowの結果を共有し、自己理解を深める',
    body: '計測結果をみて思ったことや気づきを言葉にする。',
    accentRgb: 'var(--green-rgb)',
    tapeClass: 'craft-tape--green'
  },
  {
    step: 'Step 2',
    icon: 'compass',
    title: '将来の姿をイメージして言葉にする',
    body: '「なにがしたいか」「どうありたいか」というキャリアの方向性を確認する。',
    accentRgb: 'var(--brand-rgb)',
    tapeClass: ''
  },
  {
    step: 'Step 3',
    icon: 'rocket',
    title: '目標設定とアクション',
    body: 'ゴールから逆算し、そのために必要な目標と、今後の行動を決める。',
    accentRgb: 'var(--pink-rgb)',
    tapeClass: 'craft-tape--pink'
  }
];

// 5つのチカラ
const strengths: {
  icon: DoodleIconName;
  title: string;
  description: ReactNode;
  accentRgb: string;
  tapeClass: string;
  rotate: string;
}[] = [
  {
    icon: 'family',
    title: 'つなぐ',
    description: (
      <>
        他者とコミュニケーションをとって、
        <br />
        1人ではできないことにチャレンジするチカラ
      </>
    ),
    accentRgb: 'var(--brand-rgb)',
    tapeClass: '',
    rotate: '-1.4deg'
  },
  {
    icon: 'sparkle',
    title: 'ひらく',
    description: (
      <>
        常識や前例に疑問を持ち、
        <br />
        新しい考え方やアイデアを自ら生み出すチカラ
      </>
    ),
    accentRgb: '224 158 22',
    tapeClass: 'craft-tape--cream',
    rotate: '1.1deg'
  },
  {
    icon: 'pencil',
    title: 'えがく',
    description: (
      <>
        頭の中でシミュレーションし、
        <br />
        未来の出来事を予測して動き出すチカラ
      </>
    ),
    accentRgb: 'var(--green-rgb)',
    tapeClass: 'craft-tape--green',
    rotate: '-0.9deg'
  },
  {
    icon: 'heart',
    title: 'なりきる',
    description: (
      <>
        他者の立場に立って考えて、
        <br />
        他者の視点・考え・行動をわかろうとするチカラ
      </>
    ),
    accentRgb: 'var(--pink-rgb)',
    tapeClass: 'craft-tape--pink',
    rotate: '1.3deg'
  },
  {
    icon: 'rocket',
    title: 'まきこむ',
    description: (
      <>
        自分の言葉で想いを表現し、
        <br />
        相手の気持ちを震わせ、動かすチカラ
      </>
    ),
    accentRgb: 'var(--brand-rgb)',
    tapeClass: '',
    rotate: '-1.1deg'
  }
];

export function JibunCraftClient() {
  return (
    <MobileContainer>
      {/* ========================================
          ① ヒーローセクション：導入
          ======================================== */}
      <Section className="cd-hero">
        <h1 className="cd-hero-title craft-misprint">ジブンクラフト</h1>
        <Underline variant={2} className="cd-hero-line craft-draw craft-draw--auto" style={{ color: 'var(--violet)' }} />

        <p className="cd-hero-lead">
          探究・対話・実践を通して育まれた「非認知能力」を可視化。
          <br />
          その結果をふまえてキャリアコンサルタントと面談を行います。
          <br />
          「何をしたいか？どうありたいか？」という将来の姿を描き、
          <br />
          それに向けた目標を設定し、PBLを進めていきます。
        </p>

        {/* 漂う手描きアイコン */}
        <div className="cd-float-row" aria-hidden="true">
          <span className="craft-float" style={doodle({ color: 'var(--violet)', '--rot': '-6deg' })}>
            <DoodleIcon name="sparkle" size={38} />
          </span>
          <span className="craft-float" style={doodle({ color: 'var(--pink)', '--rot': '4deg', animationDelay: '0.5s' })}>
            <DoodleIcon name="flag" size={38} />
          </span>
          <span className="craft-float" style={doodle({ color: 'var(--brand)', '--rot': '-4deg', animationDelay: '1s' })}>
            <DoodleIcon name="compass" size={38} />
          </span>
        </div>
      </Section>

      {/* ========================================
          ② ジブンクラフトの仕組み：4つの学びの統合
          ======================================== */}
      <Section className="hp-programs">
        <div className="hp-section-head" style={{ marginBottom: '20px' }}>
          <SectionTitle variant={1} lineColor="var(--brand)">
            4つの学びで非認知能力を育む。
          </SectionTitle>
        </div>

        <p className="cd-hero-lead reveal" style={{ marginBottom: '34px' }}>
          知識を詰め込むのではなく、経験を通して育つ<br />
          <strong className="emphasis">「非認知能力」</strong>が社会で必要なチカラです。
        </p>

        {/* 4つの学びチップ（紙の見本帳） */}
        <div className="cd-chip-grid">
          {learningChips.map((chip, i) => (
            <div
              key={chip.title}
              className="cd-chip craft-paper craft-tilt craft-lift reveal"
              style={
                {
                  '--accent-rgb': chip.accentRgb,
                  '--rot': `${i % 2 === 0 ? -1 : 1}deg`,
                  transitionDelay: `${i * 90}ms`
                } as CSSProperties
              }
            >
              <span className="cd-chip-icon" aria-hidden="true">
                <DoodleIcon name={chip.icon} size={26} />
              </span>
              <h3>{chip.title}</h3>
            </div>
          ))}
        </div>

        {/* 非認知能力って何？カード */}
        <div
          className="craft-paper craft-paper--warm craft-tilt reveal"
          style={{ '--rot': '0.4deg', padding: '20px 18px', marginTop: '26px' } as CSSProperties}
        >
          <span className="craft-tape craft-tape--cream" aria-hidden="true" />
          <div style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-700)' }}>
            <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-base)', color: 'var(--ink-900)' }}>
              <span style={{ color: 'rgb(224 158 22)' }} aria-hidden="true">
                <DoodleIcon name="bulb" size={20} />
              </span>
              非認知能力って何？
            </strong>
            <br />
            テストで計測できる「認知能力」ではないチカラのこと。協調性、実行力、コミュニケーション能力など、社会に出て仕事するとき、あるいは生活をするときに必要なチカラです。
          </div>
        </div>
      </Section>

      {/* ========================================
          ③ 非認知能力の可視化：AiGrow
          ======================================== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '26px' }}>
          <SectionTitle variant={3} lineColor="rgb(59 130 246)">
            「感覚」を「確信」に変える
          </SectionTitle>
        </div>

        {/* AiGrowの説明（罫線ノートの1ページ） */}
        <div
          className="craft-paper craft-paper--ruled craft-tilt reveal"
          style={{ '--rot': '-0.4deg', padding: '28px 24px', marginBottom: '30px' } as CSSProperties}
        >
          <span className="craft-tape" aria-hidden="true" style={doodle({ '--tape-rgb': AIGROW_RGB })} />

          <div
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              marginBottom: '18px',
              background: `rgb(${AIGROW_RGB})`,
              color: '#fff',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              border: '2px solid #fff',
              borderRadius: '999px',
              boxShadow: '0 2px 6px rgba(92, 77, 42, 0.22)',
              transform: 'rotate(-1.5deg)'
            }}
          >
            非認知能力計測ツール：AiGrow
          </div>

          <p style={{ margin: '0 0 16px', fontSize: 'var(--text-base)', color: 'var(--ink-700)' }}>
            自分の評価だけでなく、他者からの客観的な評価もあわせてAIで分析。自分でも気づかなかった<strong className="emphasis">「リーダーシップ」や「課題設定能力」</strong>など、<strong style={{ color: `rgb(${AIGROW_RGB})` }}>の非認知能力</strong>を数値化します。
          </p>

          <p style={{ margin: 0, fontSize: 'var(--text-base)', color: 'var(--ink-700)' }}>
            これにより、CLAFTでの成長を主観だけでなく、<strong className="emphasis">データに基づいた「強み」</strong>として捉え直すことができます。
          </p>
        </div>

        {/* CTAボタン */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="https://share.google/DYhUEMOhyWihERMFF"
            target="_blank"
            rel="noopener noreferrer"
            className="craft-sticker"
            style={{ background: `rgb(${AIGROW_RGB})` }}
          >
            「AiGrow」について詳しく見る
            <ArrowRightDoodle width={22} />
          </a>
        </div>
      </Section>

      {/* ========================================
          ④ キャリア面談：人生の地図を描く
          ======================================== */}
      <Section className="hp-programs">
        <div className="hp-section-head" style={{ marginBottom: '20px' }}>
          <SectionTitle variant={2} lineColor="var(--green)">
            キャリアの地図を描く
          </SectionTitle>
        </div>

        <p className="cd-hero-lead reveal" style={{ marginBottom: '34px' }}>
          キャリアコンサルタントとの面談で、<br />
          自分の「過去・現在・未来」をつなげます。
        </p>

        {/* 面談の3ステップ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {careerSteps.map((step, i) => (
            <div
              key={step.step}
              className="cd-card craft-paper craft-tilt craft-lift reveal"
              style={
                {
                  '--accent-rgb': step.accentRgb,
                  '--tape-rgb': step.accentRgb,
                  '--rot': `${i % 2 === 0 ? -0.6 : 0.6}deg`,
                  transitionDelay: `${i * 90}ms`,
                  paddingTop: '34px'
                } as CSSProperties
              }
            >
              <span className={`craft-tape ${step.tapeClass}`} aria-hidden="true" />

              {/* Stepバッジ（ステッカー） */}
              <span
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '18px',
                  padding: '4px 15px',
                  background: 'rgb(var(--accent-rgb))',
                  color: '#fff',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-bold)',
                  letterSpacing: '0.06em',
                  border: '2px solid #fff',
                  borderRadius: '999px',
                  boxShadow: '0 2px 6px rgba(92, 77, 42, 0.22)',
                  transform: 'rotate(-2deg)',
                  zIndex: 3
                }}
              >
                {step.step}
              </span>

              <span className="cd-card-icon" aria-hidden="true">
                <DoodleIcon name={step.icon} size={30} />
              </span>

              <h3 className="cd-card-title" style={{ marginBottom: '8px' }}>
                {step.title}
              </h3>
              <p style={{ margin: 0 }}>{step.body}</p>
            </div>
          ))}
        </div>

        {/* 定期更新メッセージ */}
        <div
          className="cd-banner craft-paper craft-paper--warm craft-tilt reveal"
          style={{ '--rot': '0.4deg', marginTop: '40px' } as CSSProperties}
        >
          <span className="craft-tape craft-tape--cream" aria-hidden="true" />
          <span className="cd-card-icon" style={{ marginInline: 'auto', ['--accent-rgb' as string]: 'var(--brand-rgb)' } as CSSProperties} aria-hidden="true">
            <DoodleIcon name="clock" size={28} />
          </span>
          <p style={{ margin: 0, fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-700)' }}>
            <strong style={{ color: 'var(--brand-deep)' }}>4ヶ月に1回</strong>の作品発表会の後に面談します。<br />
            定期的に自分の現在地と進むべき方向性を確認できます。
          </p>
        </div>
      </Section>

      {/* ========================================
          ⑤ 5つのチカラ：目指す姿
          ======================================== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '20px' }}>
          <SectionTitle variant={1} lineColor="var(--cream)">
            これから必要なのは情報編集力
          </SectionTitle>
        </div>

        <p className="cd-hero-lead reveal" style={{ marginBottom: '28px' }}>
          「ふつう」を疑い、新しい発想で仲間と未来を切り拓く。<br />
          その経験が自分のキャリアをクラフトしていく。
        </p>

        {/* 情報編集力について詳しく見るボタン */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '44px' }}>
          <a
            href="https://note.com/keepon_/n/naa62a18017a1"
            target="_blank"
            rel="noopener noreferrer"
            className="craft-sticker craft-sticker--cream"
          >
            <DoodleIcon name="book" size={20} />
            「情報編集力」について詳しく見る
          </a>
        </div>

        {/* 5つのチカラ（貼り込んだ紙片） */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '34px' }}>
          {strengths.map((item, i) => (
            <div
              key={item.title}
              className="cd-card craft-paper craft-paper--warm craft-tilt craft-lift reveal"
              style={
                {
                  '--accent-rgb': item.accentRgb,
                  '--tape-rgb': item.accentRgb,
                  '--rot': item.rotate,
                  textAlign: 'center',
                  transitionDelay: `${i * 70}ms`
                } as CSSProperties
              }
            >
              <span className={`craft-tape ${item.tapeClass}`} aria-hidden="true" />

              <span className="cd-card-icon" style={{ marginInline: 'auto' }} aria-hidden="true">
                <DoodleIcon name={item.icon} size={32} />
              </span>

              <h3 className="cd-card-title" style={{ textAlign: 'center', marginBottom: '8px' }}>
                {item.title}
              </h3>

              <p style={{ margin: 0, textAlign: 'center' }}>{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* トップページの入会までの流れ以降のセクション */}
      <FlowApply />
      <FAQ />
      <Students />
    </MobileContainer>
  );
}
