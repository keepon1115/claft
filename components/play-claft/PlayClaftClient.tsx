import type { CSSProperties } from 'react';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { SectionTitle } from '@/components/craft/SectionTitle';
import { Underline, ArrowRightDoodle, SparkleDoodle } from '@/components/craft/HandDrawn';
import { DoodleIcon } from '@/components/craft/DoodleIcon';

const doodle = (style: Record<string, string | number>) => style as CSSProperties;

type StepCard = {
  title: string;
  img?: string;
  desc: string[];
  url?: string | null;
  pdf?: string | null;
  buttons?: { label: string; url: string }[] | null;
  accentRgb: string;
  tapeClass: string;
  rot: string;
};

// tapeColor(hex/token) → クラフトテープのクラス＋アクセント
const TAPE = {
  pink: { tapeClass: 'craft-tape--pink', accentRgb: 'var(--pink-rgb)' },
  cream: { tapeClass: 'craft-tape--cream', accentRgb: '224 158 22' },
  brand: { tapeClass: '', accentRgb: 'var(--brand-rgb)' }
} as const;

const step1Cards: StepCard[] = [
  {
    title: '6/29：人々のワクワクを創ってみよう！（Yononaka）',
    img: 'step1-0629.jpg',
    desc: [
      '「どんな企画ならみんなが喜ぶかな？」「どう伝えれば面白さが伝わるかな？」',
      'など、相手の気持ちを想像して、伝え方を考えるためのワーク。',
      '「ワクワク」が生まれるきっかけは一つではないからこそ、相手がどんなことに興味があるのかを考えながら、いろいろな角度からアプローチすることが大切。',
      '相手の気持ちを想像し、ワクワクさせる仕掛けを考える経験は、自分自身のレベルアップにつながるだけでなく、世の中にあふれる「面白いこと」の仕組みを知るきっかけにもなります。'
    ],
    url: 'https://youtu.be/RCUJtQDj-Wg',
    ...TAPE.pink,
    rot: '-1.6deg'
  },
  {
    title: '7/27：アイデアづくり（なんでも発表会）',
    img: 'step1-0727.jpg',
    desc: [
      '『ぷよぷよ』や『はぁって言うゲーム』などを生み出したゲーム作家・米光一成さんの発想法にならい、「くだらないアイデア」を大量に出し合って、その場で組み合わせてイベント案を作成。くだらないアイデアは「意味がない」のではなく、まだ「誰も知らない」未来への種です。',
      '失敗を恐れずに、くだらない種を形にしていくプロセスこそが、豊かな創造力を育みます。'
    ],
    url: 'https://youtu.be/DQc8Pqz6-O0',
    ...TAPE.cream,
    rot: '1.2deg'
  },
  {
    title: '7/28〜8/11：アンケートで"種"再募集',
    img: 'step1-0728-0811.jpg',
    desc: ['当日参加できなかった人、その場で思いつかなかった人のアイデア募集をしました。'],
    url: null,
    ...TAPE.brand,
    rot: '-0.9deg'
  }
];

const step2Cards: StepCard[] = [
  {
    title: '8/12～8/31：イベント企画の投票と希望',
    img: 'step2-0812-0831.jpg',
    desc: [
      '授業前のちょこっとYononakaにて、スクール生全員がイベント企画の投票を行いました。その中で「自分も関わりたい」と思うイベントの希望を出しました。',
      '※投票結果により「カードゲーム」「紙ひこうき大会」「ロボットイベント」の3つに決まりました！'
    ],
    ...TAPE.cream,
    rot: '1.4deg'
  },
  {
    title: '9/1～9/14：アイデア出し（個人）',
    img: 'step2-0901-0914.jpg',
    desc: [
      '決まった企画に関して、「こんなことしたらいいんちゃう？」というアイデアと「自分はこういうことができそう！」という意見を集めました。初回MTG日程の希望も集めました。'
    ],
    ...TAPE.pink,
    rot: '-1.2deg'
  },
  {
    title: '9/15～10/18：アイデア出し（グループ）',
    img: 'step2-0915-1018.jpg?v=20251006',
    desc: [
      'MTG日程の希望がバラバラだったため、まずは現地で同じ時間帯に学んでいるスクール生同士で集まり意見を出し合いました。上画像の大まかな流れをみなで共有し、アイデアを広げたり、深めたりしていきました。'
    ],
    ...TAPE.brand,
    rot: '0.8deg'
  }
];

const step3Cards: StepCard[] = [
  {
    title: '10/19：オンラインMTG開始（メンバー全員）',
    img: 'step3-1019.jpg',
    desc: [
      '参加メンバー全員が集まる初回ミーティングで、集まったアイデアを形にしていきます。',
      'それまでの状況をまとめたPDFを送り、赤字の部分を参考に事前にアイデアを考えてから、各々ミーティングに参加します。',
      '3つの企画のアイデアをまとめ、具体的な内容を決めます。'
    ],
    pdf: '/assets/play-claft/1019mtg-play-claft.pdf',
    ...TAPE.pink,
    rot: '-1.2deg'
  },
  {
    title: '10/21～10/30：グループLINE開始（メンバー全員）',
    img: 'step3-1020-1031.jpg',
    desc: [
      'ミーティングで企画の大まかな内容が決定しました。',
      'まだ決まっていない部分のアイデアをLINEのノート機能を使って募集。ここからは、スタッフもどんどんアイデア出し、全員で形にしていきます。',
      'チーム分けも行い、カードゲーム・紙ひこうき・ロボットイベント・告知チームにわかれました。'
    ],
    ...TAPE.cream,
    rot: '1.4deg'
  },
  {
    title: '11/1～11/14：チーム活動開始',
    img: 'step3-1101-1114.jpg',
    desc: [
      'メンバーが教室に来る日はバラバラなので、集まった人同士でアイデアを出し合います。',
      'その時間に思うことやアイデアを話して、次の人へつないでいく。11/7からは参加者の募集をはじまりました！'
    ],
    ...TAPE.brand,
    rot: '-0.8deg'
  },
  {
    title: '11/15～11/21：会場・アイテムの準備',
    img: 'step3-1115-1121.jpg',
    desc: [
      'カードゲームは、カードをデザインして制作し、大阪府の領地ごとの特徴と効果を決めました。',
      'ロボットタウンは、展示するロボットとクイズ内容を制作し、体験ゲームの内容を考えました。',
      '紙ひこうき大会は、20種類以上の紙ひこうきを制作し、得点エリアとルールを決めました。'
    ],
    ...TAPE.pink,
    rot: '1.2deg'
  },
  {
    title: '11/22：スクールフェスタ リハーサル',
    img: 'step3-1122.jpg',
    desc: [
      'スクール生が主体となって、リハーサルと会場設営を行いました。',
      'ミニゲームの難易度や紙ひこうきの得点設計など、「当日来てくれた誰もが笑顔になれること」を目指して、ひとつずつ丁寧に確認。',
      '準備の段階から真剣に取り組む子どもたちの姿そのものが、きっとこの先にも活きてくる大切な経験になると思います。'
    ],
    ...TAPE.cream,
    rot: '-1.5deg'
  },
  {
    title: '11/29：スクールフェスタ 本番',
    img: 'step3-1129.jpg',
    desc: [
      'テーマは──『心に残る一瞬』― 子どもたちの "いま" が光るフェスタ ―',
      'ロボットが動き、紙飛行機が舞い、カードゲームで湧きあがる・・・そんな一日になる！？',
      '今回のイベントは、ふとしたひらめき、「やってみたい！」から芽生えたもの。',
      'それがまた、だれかの "ひらめき" へとつながっていく。そんな一日になりました！'
    ],
    buttons: [
      { label: 'スクールフェスタのページ', url: 'https://autumn-schoolfesta2025.figma.site/' },
      { label: '当日のレポート', url: 'https://note.com/yononaka_career/n/nf2d4216c4131' }
    ],
    ...TAPE.brand,
    rot: '0.9deg'
  },
  {
    title: '12/14：メンバーの振り返り',
    img: 'step3-1214.jpg',
    desc: [
      'メンバー1人1人が自分の思ったことや改善点などを共有しました。',
      '紙ひこうきは特に親子で楽しめた、カードゲームは戦略ゲームとしての手応えがあった。',
      'ただ、15分の制限時間は短かったかも？ゲームの難易度調整やプログラム開発時間の効率化も次回に向けて必要やね。',
      '次回は「リアル脱出ゲーム」をやってみたい！など、いろんな意見が出ました。'
    ],
    ...TAPE.pink,
    rot: '-1.3deg'
  }
];

function PolaroidCard({ card, index }: { card: StepCard; index: number }) {
  return (
    <article
      className="craft-paper craft-tilt craft-lift reveal"
      style={
        {
          '--accent-rgb': card.accentRgb,
          '--tape-rgb': card.accentRgb,
          '--rot': card.rot,
          padding: '20px 22px 24px',
          transitionDelay: `${(index % 3) * 80}ms`
        } as CSSProperties
      }
    >
      <span className={`craft-tape ${card.tapeClass}`} aria-hidden="true" />

      <h3 className="cd-card-title" style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-snug)' }}>
        {card.title}
      </h3>

      {card.img && (
        <div className="cd-photo craft-photo" style={{ transform: 'none', margin: '0 0 16px' }}>
          <img src={`/assets/play-claft/${card.img}`} alt={`${card.title}のサムネイル`} />
        </div>
      )}

      {card.desc.map((text, j) => (
        <p key={j} style={{ margin: '0 0 12px', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-700)', whiteSpace: 'pre-line' }}>
          {text}
        </p>
      ))}

      {card.url && (
        <a href={card.url} target="_blank" rel="noopener" className="cd-textlink">
          詳しく見る
          <ArrowRightDoodle width={20} />
        </a>
      )}

      {card.pdf && (
        <a href={card.pdf} target="_blank" rel="noopener" className="cd-textlink">
          PDFはこちら
          <ArrowRightDoodle width={20} />
        </a>
      )}

      {card.buttons && card.buttons.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px' }}>
          {card.buttons.map((button, k) => (
            <a key={k} href={button.url} target="_blank" rel="noopener" className="craft-sticker" style={{ background: 'rgb(var(--accent-rgb))' }}>
              {button.label}
              <ArrowRightDoodle width={20} />
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

export function PlayClaftClient(){
  return (
    <MobileContainer>
      {/* ===== Hero ===== */}
      <Section className="cd-hero" style={{ paddingBottom: '8px' }}>
        {/* 漂う手描きの道具 */}
        <div aria-hidden="true">
          <SparkleDoodle className="craft-doodle craft-float" style={doodle({ top: '6%', left: '5%', color: 'var(--cream)', opacity: 0.9, '--rot': '-10deg' })} width={28} />
          <SparkleDoodle className="craft-doodle craft-float craft-float--slow" style={doodle({ top: '10%', right: '7%', color: 'var(--brand)', opacity: 0.5, '--rot': '12deg' })} width={22} />
          <span className="craft-doodle craft-float" style={doodle({ bottom: '24%', left: '6%', color: 'var(--pink)', opacity: 0.5, '--rot': '-8deg', animationDelay: '1s' })}>
            <DoodleIcon name="pencil" size={26} />
          </span>
          <span className="craft-doodle craft-float" style={doodle({ bottom: '30%', right: '6%', color: 'var(--green)', opacity: 0.55, '--rot': '10deg', animationDelay: '0.5s' })}>
            <DoodleIcon name="rocket" size={28} />
          </span>
        </div>

        <p className="cd-hero-label craft-label" style={{ color: 'rgb(224 158 22)' }}>PLAY CLAFT</p>

        <h1 className="cd-hero-title craft-misprint">「遊ぶ人」から「遊びをつくる人」へ。</h1>
        <Underline variant={1} className="cd-hero-line craft-draw craft-draw--auto" style={{ color: 'var(--cream)' }} />

        {/* メインビジュアル（テープ留めポラロイド） */}
        <div className="cd-photo craft-photo reveal" style={{ marginBottom: '32px' }}>
          <span className="craft-tape craft-tape--pink" aria-hidden="true" />
          <img src="/assets/play-claft/hero.jpg" alt="「遊ぶ人」から「遊びをつくる人」へ。" />
        </div>

        {/* コンセプト（吹き出し風の紙） */}
        <div className="cd-card craft-paper craft-tilt reveal" style={{ '--rot': '-0.4deg', textAlign: 'left' } as CSSProperties}>
          <span className="craft-tape" aria-hidden="true" />
          <div style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-700)' }}>
            <p style={{ margin: '0 0 14px' }}>私たちは普段、誰かが作ったゲームやサービスを「楽しむ側」でいることが多いですよね。<br />でも今回は、「ルールを創る側」＝つくる人になってみるチャレンジです。</p>
            <p style={{ margin: '0 0 14px' }}>「どうすればもっと面白くなるだろう？」<br />「遊ぶ人はどんな気持ちになるかな？」</p>
            <p style={{ margin: '0 0 14px' }}>そんな問いを考える経験は、学校の勉強だけでは学べない大切な力。<br />お店や会社のように、商品やサービスを「提供する側」の体験ができ、社会に出る前に仕事のイメージを持つことができます。</p>
            <p style={{ margin: '0 0 14px' }}>この経験によって、</p>
            <p style={{ margin: '0 0 8px' }}><strong className="emphasis">他者の立場に立って考える力</strong></p>
            <p style={{ margin: '0 0 8px' }}><strong className="emphasis">仲間とのコミュニケーション力</strong></p>
            <p style={{ margin: '0 0 14px' }}><strong className="emphasis">新たなモノを生み出す創造力</strong></p>
            <p style={{ margin: 0 }}>を獲得することができます！！</p>
          </div>
        </div>
      </Section>

      {/* ===== STEP 1 ===== */}
      <Section className="hp-programs" id="step1">
        <div className="hp-section-head" style={{ marginBottom: '32px' }}>
          <SectionTitle variant={1} lineColor="var(--brand)">
            【STEP1】アイデアづくり（6/29〜8/11）
          </SectionTitle>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {step1Cards.map((card, i) => (
            <PolaroidCard key={i} card={card} index={i} />
          ))}
        </div>
      </Section>

      {/* ===== STEP 2 ===== */}
      <Section className="hp-programs" id="step2">
        <div className="hp-section-head" style={{ marginBottom: '32px' }}>
          <SectionTitle variant={2} lineColor="var(--cream)">
            【STEP2】イベントづくり（8/12〜10/12）
          </SectionTitle>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {step2Cards.map((card, i) => (
            <PolaroidCard key={i} card={card} index={i} />
          ))}
        </div>
      </Section>

      {/* ===== STEP 3 ===== */}
      <Section className="hp-programs" id="step3">
        <div className="hp-section-head" style={{ marginBottom: '32px' }}>
          <SectionTitle variant={3} lineColor="var(--pink)">
            【STEP3】ワクワクづくり（10/19〜11/29）
          </SectionTitle>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {step3Cards.map((card, i) => (
            <PolaroidCard key={i} card={card} index={i} />
          ))}
        </div>
      </Section>
    </MobileContainer>
  );
}
