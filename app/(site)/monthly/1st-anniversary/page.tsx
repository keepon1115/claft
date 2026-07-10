import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { MobileContainer, Section } from '@/components/MobileContainer';
import ImagePlaceholder from '@/components/monthly/ImagePlaceholder';
import ScrollAnimInit from '@/components/monthly/ScrollAnimInit';

export const metadata: Metadata = {
  title: 'CLAFT 1周年特別号「CLAFT、1歳になりました。」 | KEEPON JOURNAL',
  description:
    'CLAFTコース開始から1年。代表・将一郎が40分語った振り返りを、まるごと1本の読み物にした特別号。探究PBL・対話Yononaka・実践ミライクラフト・ジブンクラフトの1年を4色でめぐります。',
};

const C = {
  teal: '#34c6be',
  tealInk: '#2a9d96',
  inquiry: '#4fbfd6',
  amber: '#e09e16',
  dialogue: '#f5a623',
  practice: '#9b87f5',
  self: '#58c3a2',
} as const;

interface Chapter {
  id: string;
  num: number;
  tag: string;
  title: string;
  color: string;
}

const CHAPTERS: Chapter[] = [
  { id: 'ch1', num: 1, tag: '1周年', title: 'CLAFT、1歳になりました', color: C.teal },
  { id: 'ch2', num: 2, tag: '地図', title: 'キープオンの学びの地図', color: C.teal },
  { id: 'ch3', num: 3, tag: '探究', title: '探究「PBL」— 好きと疑問から始まる学び', color: C.inquiry },
  { id: 'ch4', num: 4, tag: '時代背景', title: 'なんで今、この学びなん？ — AIと、変わる入試の話', color: C.amber },
  { id: 'ch5', num: 5, tag: '対話', title: '対話「Yononaka」— 正解のない問いを楽しむ', color: C.dialogue },
  { id: 'ch6', num: 6, tag: '実践', title: '実践「ミライクラフト」— 遊ぶ人から、遊びを作る人へ', color: C.practice },
  { id: 'ch7', num: 7, tag: '自己理解', title: '「ジブンクラフト」— 自分を知り、将来を言葉にする', color: C.self },
  { id: 'ch8', num: 8, tag: 'おわりに', title: 'おわりに — 終わりのない、循環する学び', color: C.teal },
];

interface Slide {
  n: number;
  color: string;
  caption: string;
  src: string;
}

const SLIDES: Slide[] = [
  { n: 1, color: C.teal, caption: '3つの学び（探究・対話・実践）の全体図', src: '/assets/images/journal/1st-anniversary/slide-01.jpg' },
  { n: 2, color: C.teal, caption: 'コースの流れ図（自考力キッズ→エジソンアカデミー→エキスパート→CLAFT）', src: '/assets/images/journal/1st-anniversary/slide-02.jpg' },
  { n: 3, color: C.inquiry, caption: '「今取り組んでいるPBL」一覧のスライド', src: '/assets/images/journal/1st-anniversary/slide-03.jpg' },
  { n: 4, color: C.inquiry, caption: 'PBLの進め方（問いを立てる→調べる→作る→発表→振り返り）', src: '/assets/images/journal/1st-anniversary/slide-04.jpg' },
  { n: 5, color: C.amber, caption: '一般的な学びとPBLの比較スライド', src: '/assets/images/journal/1st-anniversary/slide-05.jpg' },
  { n: 6, color: C.amber, caption: '入試の変化（一般選抜と総合型選抜の割合）のスライド', src: '/assets/images/journal/1st-anniversary/slide-06.jpg' },
  { n: 7, color: C.dialogue, caption: 'Yononakaの実際の回答例スライド（「働くことでお金以外に得られるもの」）', src: '/assets/images/journal/1st-anniversary/slide-07.jpg' },
  { n: 8, color: C.dialogue, caption: 'この1年のYononakaテーマ一覧', src: '/assets/images/journal/1st-anniversary/slide-08.jpg' },
  { n: 9, color: C.self, caption: '非認知能力の計測とキャリア面談のスライド', src: '/assets/images/journal/1st-anniversary/slide-09.jpg' },
  { n: 10, color: C.teal, caption: '4つのカリキュラムの循環図', src: '/assets/images/journal/1st-anniversary/slide-10.jpg' },
];

const VIDEO_ID = 'SFguIhDWyeA';

function ChapterHead({ ch }: { ch: Chapter }) {
  return (
    <div id={ch.id} style={{ marginBottom: '18px', scrollMarginTop: '24px' }}>
      <div
        aria-hidden="true"
        style={{
          display: 'inline-block',
          padding: '3px 16px 3px 12px',
          background: `${ch.color}28`,
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--ink-700)',
          borderRadius: '2px',
          transform: 'rotate(-1deg)',
          letterSpacing: '0.05em',
          marginBottom: '10px',
        }}
      >
        第{ch.num}章　{ch.tag}
      </div>
      <h2
        style={{
          margin: 0,
          fontFamily: 'var(--font-zen), sans-serif',
          fontSize: '22px',
          fontWeight: 900,
          color: 'var(--ink-900)',
          lineHeight: 1.4,
          position: 'relative',
          display: 'inline-block',
        }}
      >
        {ch.title}
        <svg
          style={{ position: 'absolute', bottom: '-6px', left: '-2px', width: 'calc(100% + 6px)', height: '10px' }}
          viewBox="0 0 200 10"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M3,7 Q50,5 100,6 T197,7" stroke={ch.color} strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.55" />
        </svg>
      </h2>
    </div>
  );
}

function SubHead({ children, color }: { children: ReactNode; color: string }) {
  return (
    <h3
      style={{
        margin: '22px 0 12px',
        paddingLeft: '10px',
        borderLeft: `3px solid ${color}`,
        fontFamily: 'var(--font-zen), sans-serif',
        fontSize: '16px',
        fontWeight: 800,
        color: 'var(--ink-900)',
      }}
    >
      {children}
    </h3>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p style={{ fontSize: '15px', lineHeight: 2, color: 'var(--ink-800)', margin: '0 0 16px' }}>{children}</p>;
}

function Mark({ color, children }: { color: string; children: ReactNode }) {
  return (
    <strong style={{ background: `linear-gradient(transparent 62%, ${color}4d 62%)`, fontWeight: 700, color: 'var(--ink-900)' }}>
      {children}
    </strong>
  );
}

function PullQuote({ color, children }: { color: string; children: ReactNode }) {
  return (
    <blockquote
      className="scroll-animate"
      style={{
        margin: '24px 0',
        padding: '4px 0 4px 18px',
        borderLeft: `4px solid ${color}`,
        fontFamily: 'var(--font-zen), sans-serif',
        fontSize: '19px',
        fontWeight: 800,
        lineHeight: 1.6,
        color: 'var(--ink-900)',
      }}
    >
      <span aria-hidden="true" style={{ color, fontSize: '28px', fontWeight: 900, marginRight: '2px' }}>
        &ldquo;
      </span>
      {children}
    </blockquote>
  );
}

function CaseCard({ color, tag, children }: { color: string; tag: string; children: ReactNode }) {
  return (
    <div style={{ background: '#fff', border: `1.5px solid ${color}40`, borderRadius: '14px', padding: '16px 18px', margin: '0 0 14px' }}>
      <span
        style={{
          display: 'inline-block',
          marginBottom: '8px',
          padding: '2px 10px',
          background: color,
          color: '#fff',
          borderRadius: '50px',
          fontSize: '11px',
          fontWeight: 700,
        }}
      >
        {tag}
      </span>
      <div style={{ fontSize: '14px', lineHeight: 1.9, color: 'var(--ink-800)' }}>{children}</div>
    </div>
  );
}

function SlideFigure({ slide, index }: { slide: Slide; index: number }) {
  const rotate = index % 2 === 0 ? -1.5 : 1.5;
  return (
    <div
      className="scroll-animate"
      style={{
        margin: '20px 0',
        background: '#fff',
        padding: '10px 10px 14px',
        borderRadius: '4px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
        transform: `rotate(${rotate}deg)`,
        position: 'relative',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%) rotate(-2deg)',
          width: '80px',
          height: '20px',
          background: `${slide.color}59`,
          borderRadius: '2px',
        }}
      />
      <ImagePlaceholder width={1600} height={900} src={slide.src} alt={slide.caption} caption={slide.caption} />
    </div>
  );
}

function LoopDiagram() {
  const items = [
    { label: '探究', color: C.inquiry },
    { label: '対話', color: C.dialogue },
    { label: '実践', color: C.practice },
    { label: '自己理解', color: C.self },
  ];
  return (
    <div style={{ margin: '8px 0 24px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
        {items.map((it, i) => (
          <div key={it.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ padding: '5px 14px', borderRadius: '50px', background: it.color, color: '#fff', fontSize: '13px', fontWeight: 700 }}>
              {it.label}
            </span>
            {i < items.length - 1 && (
              <span aria-hidden="true" style={{ color: 'var(--ink-500)', fontSize: '14px' }}>
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <svg
        width="100%"
        height="28"
        viewBox="0 0 300 28"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ display: 'block', margin: '6px 0 0' }}
      >
        <path d="M280,4 Q150,28 20,4" stroke={C.teal} strokeWidth="2" fill="none" strokeDasharray="4 5" strokeLinecap="round" opacity="0.55" />
      </svg>
      <p style={{ margin: '4px 0 0', textAlign: 'center', fontSize: '12px', color: 'var(--ink-500)' }}>ぐるぐる循環して、また次の探究へ</p>
    </div>
  );
}

export default function AnniversaryIssuePage() {
  return (
    <MobileContainer>
      <ScrollAnimInit />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scroll-animate {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .scroll-animate.animate-in {
          opacity: 1;
          transform: none;
        }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          .scroll-animate { opacity: 1 !important; transform: none !important; transition: none !important; }
          html { scroll-behavior: auto; }
        }
      `,
        }}
      />

      {/* ===== 表紙 ===== */}
      <Section className="scroll-animate" style={{ paddingBottom: '4px' }}>
        <header
          style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #e0f4f3 0%, #fff 60%)',
            border: '2px solid #e0f4f3',
            padding: '32px 24px 28px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            marginBottom: '8px',
          }}
        >
          {/* 4色テープ帯（装飾） */}
          <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', height: '8px' }}>
            <span style={{ flex: 1, background: `${C.inquiry}80` }} />
            <span style={{ flex: 1, background: `${C.dialogue}80` }} />
            <span style={{ flex: 1, background: `${C.practice}80` }} />
            <span style={{ flex: 1, background: `${C.self}80` }} />
          </div>

          {/* テープラベル */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '14px',
              left: '-6px',
              padding: '3px 18px 3px 14px',
              background: `${C.teal}28`,
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--ink-700)',
              borderRadius: '2px',
              transform: 'rotate(-1deg)',
              letterSpacing: '0.05em',
            }}
          >
            KEEPON JOURNAL 特別号
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginTop: '26px' }}>
            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--font-zen), sans-serif',
                fontSize: '26px',
                fontWeight: 900,
                color: 'var(--ink-900)',
                letterSpacing: '0.02em',
                lineHeight: 1.35,
                position: 'relative',
                display: 'inline-block',
              }}
            >
              CLAFT、1歳になりました。
              <svg
                style={{ position: 'absolute', bottom: '-6px', left: '-4px', width: 'calc(100% + 8px)', height: '12px' }}
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M3,9 Q50,7 100,8 T197,9" stroke={C.teal} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.55" />
              </svg>
            </h1>

            {/* 記念スタンプ */}
            <div
              aria-hidden="true"
              style={{
                flexShrink: 0,
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                border: `2px dashed ${C.teal}`,
                padding: '3px',
                transform: 'rotate(-8deg)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: `1.5px dashed ${C.teal}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.7)',
                }}
              >
                <span style={{ fontSize: '9px', fontWeight: 800, color: C.tealInk, textAlign: 'center', lineHeight: 1.3 }}>
                  1st
                  <br />
                  ANNIVERSARY
                </span>
                <span style={{ fontSize: '8px', fontWeight: 700, color: C.tealInk, marginTop: '2px' }}>2025.6→2026.7</span>
              </div>
            </div>
          </div>

          <p style={{ margin: '18px 0 0', fontSize: '13px', lineHeight: 1.8, color: 'var(--ink-700)' }}>
            2025年6月に始まったキャリアスクール「CLAFT」が、この夏で1周年を迎えました。代表の将一郎が40分間ノンストップで語った振り返り動画を、ぎゅっと1本の読み物にしてお届けします。CLAFTって結局なにをやってるの？という方も、この1本でぜんぶわかります。
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '18px' }}>
            <span
              style={{
                padding: '4px 12px',
                background: '#fff',
                color: 'var(--ink-600)',
                borderRadius: '50px',
                fontSize: '12px',
                fontWeight: 700,
                border: `1px solid ${C.teal}40`,
              }}
            >
              読了 約10分
            </span>
            <a
              href="#video"
              style={{
                padding: '4px 12px',
                background: `${C.teal}18`,
                color: C.tealInk,
                borderRadius: '50px',
                fontSize: '12px',
                fontWeight: 700,
                textDecoration: 'none',
                border: `1px solid ${C.teal}40`,
              }}
            >
              🎬 動画は記事の最後に
            </a>
          </div>
        </header>
      </Section>

      {/* ===== 目次 ===== */}
      <Section className="scroll-animate" style={{ paddingTop: '4px', paddingBottom: '4px' }}>
        <nav aria-label="目次" style={{ margin: '0 0 8px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '18px 20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1.5px dashed rgba(0,0,0,0.08)' }}>
            <p style={{ margin: '0 0 14px', fontSize: '12px', fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              CONTENTS
            </p>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {CHAPTERS.map((ch) => (
                <li key={ch.id}>
                  <a
                    href={`#${ch.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: `${ch.color}10`,
                      border: `1.5px solid ${ch.color}30`,
                      textDecoration: 'none',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: ch.color,
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {ch.num}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink-800)' }}>{ch.tag}</span>
                    <span style={{ marginLeft: 'auto', fontSize: '11px', color: ch.color, fontWeight: 700 }} aria-hidden="true">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      </Section>

      {/* ===== 区切り ===== */}
      <div
        style={{ textAlign: 'center', margin: '4px 0 8px', color: 'var(--ink-400)', fontSize: '14px', letterSpacing: '0.3em' }}
        aria-hidden="true"
      >
        ✦ ✦ ✦
      </div>

      {/* ===== 第1章 ===== */}
      <Section className="scroll-animate" style={{ paddingTop: '4px', paddingBottom: '4px' }}>
        <ChapterHead ch={CHAPTERS[0]} />
        <P>
          皆さん、こんにちは。スタッフの将一郎です。CLAFTコースが始まってから1年経ちましたので、1年間の振り返りと、あわせて「そもそもCLAFTって何をやってるのか」というところも、改めてお話ししていこうと思います。
        </P>
        <P>CLAFTは「自分のキャリアは自分でつくろう」というキャッチコピーのもと、キャリアスクールとして活動しています。柱は3つです。</P>
        <ul style={{ margin: '0 0 16px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--ink-800)', paddingLeft: '20px', position: 'relative' }}>
            <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: '2px', color: C.teal, fontWeight: 900 }}>
              ―
            </span>
            <Mark color={C.teal}>探究</Mark> — 自分の好きなこと・疑問に思うことから学びを深める
          </li>
          <li style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--ink-800)', paddingLeft: '20px', position: 'relative' }}>
            <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: '2px', color: C.teal, fontWeight: 900 }}>
              ―
            </span>
            <Mark color={C.teal}>対話</Mark> — オンライン上で、自分の思ったこと・感じたことを参加者同士で共有する
          </li>
          <li style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--ink-800)', paddingLeft: '20px', position: 'relative' }}>
            <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: '2px', color: C.teal, fontWeight: 900 }}>
              ―
            </span>
            <Mark color={C.teal}>実践</Mark> — メンバー同士が集まって、自分の得意なことで協力し合い、新しいものを作る
          </li>
        </ul>

        <SlideFigure slide={SLIDES[0]} index={0} />

        <P>
          この3つの学びを重ねて、将来どんな状況でも生き抜く自信をつけて、自分のキャリアを自分で切り拓いていく。そんな人材になることを目指す、キャリアを意識したスクールです。
        </P>
        <P>
          2025年6月に始まって、それまでもPBLはコースとしてあったんですけど、そこに対話と実践を組み合わせて「CLAFT」という形にして、1年が経ちました。今、メンバーは全員で15人。内訳は小学5年生から高校3年生までいる、というような形です。
        </P>
      </Section>

      {/* ===== 第2章 ===== */}
      <Section className="scroll-animate" style={{ paddingTop: '4px', paddingBottom: '4px' }}>
        <ChapterHead ch={CHAPTERS[1]} />
        <P>CLAFTの話に入る前に、キープオンのスクール全体の流れを紹介させてください。</P>

        <SlideFigure slide={SLIDES[1]} index={1} />

        <P>
          低学年向けには<Mark color={C.teal}>自考力キッズ</Mark>（その前のFirst STEAMや、デジそろもあります）。パズル・ブロック・プログラミングで、論理的思考力や表現力を鍛えていきます。高学年になったら
          <Mark color={C.teal}>エジソンアカデミー</Mark>で、ロボットプログラミングを中心にやっていく。
        </P>
        <P>
          エジソンアカデミーでも、ただカリキュラム通りに作るだけじゃないんです。知識を身につけた後に「オリジナルのアイデアをひとつ加えて、オリジナル作品を作ってみようか」だったり、「世の中にこういう課題があるから、それを解決するロボットを作って大会にチャレンジしてみよう」というのが国際ロボット競技会のURC。そうやって
          <Mark color={C.teal}>探究すること</Mark>と、作ったロボットを授業後にいつも発表する<Mark color={C.teal}>発表</Mark>。この2つをセットでやっていくのが、キープオンのスクールの魅力です。
        </P>
        <P>
          エジソンアカデミーの2年のカリキュラムが終わったら<Mark color={C.teal}>エキスパート</Mark>に進みます。その先で、ロボットをもっと極めたいのか。それとも、ロボットプログラミングで積んできた「探究して発表する」学びを、自分の興味あることや、そのとき感じた疑問から始めてみるのか——後者が
          <Mark color={C.teal}>PBL</Mark>であり、CLAFTです。
        </P>
        <P>
          この「何かしら」は、まさに1人1人違うもの。毎回変わっていってもいい。テーマ設定は完全に自由に、自分で考えます。他者から与えられた課題を解くのではなくて、「これが今の自分の課題だ」「これをもう少し極めたい、調べたい」と、まず
          <Mark color={C.teal}>問いを立てる・課題を設定する</Mark>。この部分こそ、今後の社会において大切だと思うので、あえてそこからやってもらっています。
        </P>
      </Section>

      {/* ===== 第3章 ===== */}
      <Section className="scroll-animate" style={{ paddingTop: '4px', paddingBottom: '4px' }}>
        <ChapterHead ch={CHAPTERS[2]} />
        <P>
          PBLは<Mark color={C.inquiry}>課題解決型学習</Mark>のことで、プロジェクト・ベースド・ラーニング（Project Based
          Learning）の略です。CLAFTだけの呼び方じゃなくて、世界共通の呼び方ですね。自分の好きなことや疑問に思うことから課題を設定して、自分で学びを進めて、課題に解決策を出して、それを他者に発表する学びです。
        </P>

        <SubHead color={C.inquiry}>この1年の、リアルな探究たち</SubHead>

        <CaseCard color={C.inquiry} tag="事例01">
          <Mark color={C.inquiry}>吃音をテーマにした小説を読んで気になった</Mark>
          というスクール生がいました。「障害にはどんなものがあるんだろう？」という疑問を持って、本やネットで調べて整理して、Canva（スライド作成ツール）でまとめてプレゼン発表して、オブザーバーから来た質問にもその場で答える。これ、もう大学のゼミでやるようなことなんですよ。当時中学生の子が、それをやっていました。
        </CaseCard>

        <CaseCard color={C.inquiry} tag="事例02">
          <Mark color={C.inquiry}>小さな頃からソニー製品が大好き</Mark>
          という子も。「製品って、なんでこんなに心を奪われるんだろうか。その魅力とは何だろうか」を考えて、調べて、他のソニー好きの人の意見も集めて。自分が魅力だと思っていること以外の意見に触れて「あ、そういう魅力もあるのか」と気づく。これは非常に大きな学びになったんじゃないでしょうか。最終的にスライドにまとめて、動画編集して発信までしていました。
        </CaseCard>

        <CaseCard color={C.inquiry} tag="事例03">
          <Mark color={C.inquiry}>卓球部の高校2年生</Mark>は、「足の構造を理解したい」。どこの筋肉を鍛えたらプレーに生きてくるか、という問いから、卓球の技術を高めるために足の構造を学んでいこうと。それをただ調べるだけじゃなくて、
          <Mark color={C.inquiry}>ブロックで膝の関節を再現して</Mark>
          、作ることで理解していく。「足の構造を表現するってどういうことなんやろう」って、作っているプロセスを見ると自分も学びになりますね。このやり方、非常に考えられてるなと思います。
        </CaseCard>

        <SlideFigure slide={SLIDES[2]} index={2} />

        <CaseCard color={C.inquiry} tag="事例04">
          それから、<Mark color={C.inquiry}>4人で一緒にマインクラフトの「ベッドウォーズ」というゲームを作っている</Mark>
          メンバーたちもいます。ゲームの環境や設計を、楽しみながらやっている。PBLの段階で、自然発生的に「一緒に何か作ろうよ」となっているんですね。これは本当に素晴らしい取り組みだなと思っています。
        </CaseCard>

        <SubHead color={C.inquiry}>学びの流れと、CLAFTミーティング</SubHead>

        <SlideFigure slide={SLIDES[3]} index={3} />

        <P>
          進め方としては、まず問いを立てて、ネットや動画で調べて、何かを作る。パソコンでスライドを作る子も、ロボットとして作る子も、イラストを描く子もいます。それをその場で発表したり、動画を編集して発信する子もいる。終わった後に他の人からのフィードバックを得て、自分で学びを振り返る。そこで、キャリアコンサルタントである私との
          <Mark color={C.inquiry}>キャリア面談</Mark>をやって、1タームが終わる。これがPBLの学習です。
        </P>
        <P>
          実は、毎回「今日は何を学んだか」をGoogleフォームに書いていこうね、としていたんですけど——正直言って、そこはなかなかメンバーに浸透しなかった（笑）。しっかり探究してその時間を過ごせば過ごすほど、終わった後に振り返りを書くのは難しい、という状況だったんです。
        </P>
        <P>
          そこで今は、<Mark color={C.inquiry}>CLAFTミーティング</Mark>を毎月1回やっています。オンラインで、だいたい日曜の夜8時に集まって、各々のPBLについて「こういうことやってるよ」と共有し合う。みんな、書くよりも
          <Mark color={C.inquiry}>話す方が思っていることを言葉にしやすい</Mark>んですよね。だったら毎月のミーティングで聞いていこう、ということで、振り返りは今のところうまく回っています。
        </P>

        <PullQuote color={C.inquiry}>みんな、書くよりも話す方が思っていることを言葉にしやすいんですよね。</PullQuote>

        <SubHead color={C.inquiry}>7月26日は「なんでも発表会」</SubHead>
        <P>
          そして7月26日、
          <Mark color={C.inquiry}>
            <Link href="/futurecraft/Presentation" style={{ color: 'inherit', textDecoration: 'underline' }}>
              なんでも発表会
            </Link>
          </Mark>
          という発表の場があります。普段のPBLの学びに一段落つけて、発表してもらう予定です。
        </P>
        <P>
          ここはCLAFTコース以外の子どもたちも、自分の好きなこと・はまっていること・他の習い事のことでもなんでもOK。楽器を演奏したいという子もいましたね。
          <Mark color={C.inquiry}>自分らしさを堂々と表現する場</Mark>
          が、なんでも発表会です。発表することで自分に自信がつくし、自分の好きなことに共感してくれる、まだ友達じゃない誰かとの出会いの場になるかもしれない。CLAFTメンバーはいま、この日に向けてPBLの学びを深めている段階です。
        </P>
      </Section>

      {/* ===== 第4章（コラム紙） ===== */}
      <Section className="scroll-animate" style={{ paddingTop: '4px', paddingBottom: '4px' }}>
        <div style={{ background: '#fdf6e7', borderRadius: '16px', padding: '20px 18px 8px' }}>
          <div
            aria-hidden="true"
            style={{
              display: 'inline-block',
              marginBottom: '10px',
              padding: '3px 16px 3px 12px',
              background: `${C.amber}33`,
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--ink-700)',
              borderRadius: '2px',
              transform: 'rotate(-1deg)',
            }}
          >
            コラム
          </div>
          <ChapterHead ch={CHAPTERS[3]} />

          <SubHead color={C.amber}>「何を学んだか」より「学んだことで何ができるか」</SubHead>
          <P>
            PBLはアメリカで始まった言葉で、今は学校現場でも取り入れられています。なぜかというと、やっぱり<Mark color={C.amber}>AI</Mark>
            なんですね。
          </P>

          <SlideFigure slide={SLIDES[4]} index={4} />

          <P>
            一般的な学びは知識の習得が目的で、単一の正解がある。教科書の中に方程式や理論、先人の知恵があって、それをインプットする。それが今までの学びでした。でもPBLは、
            <Mark color={C.amber}>課題解決と、新しい価値を創造すること</Mark>
            が目的です。正解のない問いに自分で課題を設定して、自分の納得する答えを出して、発表する。そのとき教員は「教える人」ではなく、学ぶ子どもたちをサポートする
            <Mark color={C.amber}>ファシリテーター</Mark>になります。
          </P>
          <P>
            AIはネット上の知識をすべて持っていて、問いかけ次第でうまく引き出せる状況です。生成AIを使われた方はイメージできると思いますが、
            <Mark color={C.amber}>どう問いを立てるかで、引き出せる知識が変わる</Mark>
            。だったら、知識を覚えることよりも、問いの立て方・引き出し方を身につけておいた方がいいよね、と。「何を学んだか」よりも「学んだことで何ができるか」「学んだ上でどういう問いを立てられるか」に、時代がシフトしているんです。
          </P>

          <PullQuote color={C.amber}>「何を学んだか」よりも「学んだことで何ができるか」</PullQuote>

          <SubHead color={C.amber}>大学入試も変わってきている</SubHead>
          <P>
            AIの能力は、大学入学共通テストでいうと9科目で満点を取るレベルになっています。それも前回の1月の話なので、半年経った今、OpenAIもGoogleもAnthropicも最新モデルをどんどん出していますから、もうほとんど100点かもしれないですね。
          </P>

          <SlideFigure slide={SLIDES[5]} index={5} />

          <P>
            そういう時代を控えて、大学入試もだんだん変わってきています。テスト勉強で点数を取る<Mark color={C.amber}>一般選抜</Mark>
            は、もう2人に1人以下の割合。その分増えているのが学校推薦や<Mark color={C.amber}>総合型選抜</Mark>
            で、総合型選抜は20%以上になっています。小論文と面接、そして志望理由書。つまり「自分はどういうことをしたいのか」という自分の意見を作る力と、それをしっかり言葉で伝える力——
            <strong style={{ fontWeight: 700, color: 'var(--ink-900)' }}>コミュニケーション能力</strong>
            が試されているということですね。
          </P>
          <P>
            企業が新入社員に求める力の調査でも、コミュニケーション能力はもう10年ぐらいずっと1位なんですよ。AIロボットが出てきても、人がコミュニケーションを取っていて「心地いいな」と思う相手は、やっぱり人だと思うので。もちろん、AIロボットに伝えるためのコミュニケーションも必要になってくると思います。
          </P>

          <SubHead color={C.amber}>非認知能力という言葉</SubHead>
          <P>
            コミュニケーション能力、主体性、協働性、柔軟性。まさにPBLやミライクラフトで磨かれるこれらの力を、<Mark color={C.amber}>非認知能力</Mark>
            と言います。「非」がついている通り、認知能力の逆。認知能力は従来のペーパーテストで測定可能な力——読解力、計算力、記憶力。これは
            <Mark color={C.amber}>AIが代替しやすい領域</Mark>と言われています。だから、非認知能力をもっと育んでいこう、という流れになっているんです。
          </P>
          <P>
            キープオンのスクールでは、それを見据えて、用意された課題を解くというより、
            <Mark color={C.amber}>自分で考えて、作って、ブラッシュアップして、自分のアイデアを形にして、発表の場で伝える</Mark>
            。伝えるということは、自分の学びを言語化する必要がある。そうしていくうちに「あ、自分ってこういうことを考えてたのか」という自己理解にもつながってくる。それを狙った学びをしています。
          </P>
        </div>
      </Section>

      {/* ===== 第5章 ===== */}
      <Section className="scroll-animate" style={{ paddingTop: '4px', paddingBottom: '4px' }}>
        <ChapterHead ch={CHAPTERS[4]} />

        <SubHead color={C.dialogue}>違いが「間違い」にならない場所</SubHead>
        <P>
          次は対話ワーク<Mark color={C.dialogue}>Yononaka</Mark>
          の話です。これは、正解のない問いに対して意見を出し合い、視点を広げる対話型ワーク。お金、時間、働く——そういうテーマで、「働くって何のためにするんだろう」「お金を払うときの基準を共有しよう」みたいな、決まりきった正解がない問いを立てます。
        </P>

        <SlideFigure slide={SLIDES[6]} index={6} />

        <P>
          だから、1人1人意見が違う。「働くことでお金以外に得られるものって何だろう？」と聞くと、地位、人との関わりや人脈、「宿題をしなくて嬉しい・気持ちいい」とかね（笑）。くすっと笑えるもの、なるほどなと唸るもの、「これってこの人らしいよな」という意見が出てくる。同じ「信頼」でも、「信頼度アップ」「信用と信頼」「信頼と経験と生きていくためのスキル」——表現の仕方が違うと、細かいところを見ていくと面白いんですよね。正解が1つでないと設定しているからこそ生まれるものです。
        </P>
        <P>
          この1年、月1回以上やってきたので12回以上。「自分ってなんやねん」とか「虹の色っていくつある？」とか。メンバーが希望したテーマでやることもあるし、私がやりたいテーマでやることもあります。
        </P>

        <SlideFigure slide={SLIDES[7]} index={7} />

        <P>
          Yononakaでは、違いが間違いや場違いにならない。<Mark color={C.dialogue}>違いを楽しむ空気感</Mark>
          になっていきます。「いつも思ってるけど言えないんだ」ということを話してくれる参加者もいます。正解から解き放たれることで、オープンに自分の考えや気持ちを言葉にできる時間になっていると思います。山や木をテーマにしたことも、町をテーマにしたこともありました。事前知識なしで気軽に参加できて、聞かれたことに1分ぐらい考えて、思っていることをポンと言う。それだけで多様な意見が生まれて、毎回すごく面白いものになっています。
        </P>

        <PullQuote color={C.dialogue}>違いが、間違いや場違いにならない。</PullQuote>

        <SubHead color={C.dialogue}>今年は6回シリーズ「AIロボット社会、僕たちはどう生きるか」</SubHead>
        <P>
          今年の6月からは、半年間のシリーズを組んでやっています。共通テーマは
          <Mark color={C.dialogue}>
            <Link href="/yononaka/ai-robot" style={{ color: 'inherit', textDecoration: 'underline' }}>
              「AIロボット社会、僕たちはどう生きるか」
            </Link>
          </Mark>
          。前回は大人の方も参加いただきました。保護者の方もぜひ。子どもたちの意見に驚かされると同時に、自分の思っていることを共有して、他の人のリアクションから学ぶこともあると思います。まだ参加されてない方は、ぜひ一度参加してみてください。
        </P>

        <SubHead color={C.dialogue}>じつは、教育をガラッと変える話でもある</SubHead>
        <P>これは「面白い話し合いの場」というだけじゃなくて、日本の教育をガラッと変えるような意味合いを持っています。</P>
        <P>
          従来の教育は、先人が積み上げた「今までの正解」をインプットする形式で、先生は教科書を使って生徒に届ける役割でした。でも世の中には、正解ではない見方・考え方が無数に存在するし、テクノロジーの進歩でこれからは予測不可能な社会、
          <Mark color={C.dialogue}>VUCA（ブーカ）の時代</Mark>
          と言われています。昨日まで正解だったことが、今日には正解じゃなくなる。昨日できなかったことが、AIにはもうできちゃう。じゃあ人間はこれからどう生きていけばいいんだろう——ということが、どんどん起きていく。
        </P>
        <P>
          そうなったとき、先生の役割は「意見を共有する場を作って、いろんな人から多様な見方・考え方を集めること」じゃないかなと思っています。それがまさにファシリテーターで、それを今、私がやっているということですね。「まだない〇〇って何だろう？」みたいな、正解が1つでない問いかけをして、いろんな意見を集める。集まった場で「こういう見方もあったよね」「じゃあそういう見方で社会を過ごしていこうね」となれば、もっと多様な生き方・活動の仕方が見えてくると思うんです。
        </P>

        <SubHead color={C.dialogue}>「よのなか科」へのリスペクト</SubHead>
        <P>
          Yononakaはゼロから始めたというより、<Mark color={C.dialogue}>「よのなか科」</Mark>
          という取り組みの改良版なんです。「よのなか科」を作ったのは<Mark color={C.dialogue}>藤原和博さん</Mark>
          という、教育界では有名な方。元リクルートのトップ営業マンとして活躍された後、東京の公立中学校では初となる民間人校長に着任された方です。今も講演やYouTube、NewsPicksなどで教育関連の発信をされていて、キャリアについてもすごく勉強になる。私も学んでいて、影響を受けている方です。
        </P>
        <P>
          その藤原さんが20年以上教育現場で実践してきたのが「よのなか科」。主に中学生向けで、学校現場だけでなくJリーグでも導入実績があるくらいで、社会問題や経済の仕組みを「世の中で起きている事象」を教材として学ぶものです。それを、小学生からでも参加できるように、そして経済という枠を超えて「働くって何だろう」「お金って何だろう」という、ちょっと哲学的な&quot;そもそも&quot;を問うテーマにしているのが、私たちのYononakaです。
        </P>
      </Section>

      {/* ===== 第6章 ===== */}
      <Section className="scroll-animate" style={{ paddingTop: '4px', paddingBottom: '4px' }}>
        <ChapterHead ch={CHAPTERS[5]} />
        <P>
          PBLやYononakaで身につけてきた力を試して、他の人と協働して新しいものを作っていくのが<Mark color={C.practice}>ミライクラフト</Mark>
          です。去年は主に<Mark color={C.practice}>プレイクラフト</Mark>と
          <strong style={{ fontWeight: 700, color: 'var(--ink-900)' }}>STEAMキャンプ</strong>をやりました。
        </P>

        <SubHead color={C.practice}>プレイクラフト — イベントを「作る側」になる</SubHead>
        <P>毎年11月にやっている秋のスクールフェスタで、スクール生自身がイベントを企画して運営する。その一連の流れがプレイクラフトです。</P>
        <P>
          今まさに2026年版が動いていて、毎月のCLAFTミーティングで意見共有しています。「今年の11月、どんな遊び・どんなイベントをやりたいか」のアイデアを、CLAFTメンバーだけじゃなくキープオンのスクール全体——キープオンラボも含めて募集して、集まったアイデアを今3つに絞った段階。ここからどう内容を深めて実際に形にするかを、主にCLAFTメンバーでアイデア交換しながら進めています。
        </P>
        <P>
          キャッチコピーは<Mark color={C.practice}>「遊ぶ人から、遊びを作る人になろう」</Mark>
          。普段、誰かが作ったゲームやサービスを楽しむ側にいる子どもたち（われわれ大人もそうですけど）が、ルールを作る側・サービスを提供する側になってみる。この経験を社会に出る前にするのとしないのとでは、全然違うと思うんですね。だから子どもたちにその機会を提供したい。
        </P>

        <PullQuote color={C.practice}>遊ぶ人から、遊びを作る人になろう</PullQuote>

        <P>
          ただ自分の好きなものを作るだけじゃなくて、実際に遊んでくれる人の立場に立ったときに、「どうしたらもっと面白いって言ってもらえるだろう」「どんな気持ちになるんだろうか」をイメージしてイベントを作っていく。これは勉強だけでは学べない経験ができるんじゃないかなと思っています。
        </P>
        <P>
          イベントを作って、当日の運営までやりきったら、ものの見方がずいぶん変わってくるんじゃないかな。レストランで食事をするとき、服屋で接客を受けるとき、店員さんの言葉や姿勢を見て「この人はこういう思いで仕事してるんだな」「この接客、こういうアイデアでやってんのかな」と、働く人の気持ちをイメージできるようになる。そうしたら、社会に出たときもスムーズだと思うし、その前に「自分はこういう仕事に向いてるんじゃないか」「こういう仕事なら能力を発揮できるんじゃないか」というイメージも、具体的になっていくでしょうし。
        </P>

        <SubHead color={C.practice}>STEAMキャンプ — バングラデシュ・マレーシアとつながる</SubHead>
        <P>
          STEAMキャンプは、今回はバングラデシュ、マレーシアとの3カ国交流。アーテックのロボットプログラミングをやっている国同士でオンラインでつながって、共通のテーマを設定して、ロボット作品を作って共有し合うプロジェクトです。今年は12月から3月までやっていました。
        </P>

        <SubHead color={C.practice}>「ナナメの関係」の話</SubHead>
        <P>
          PBLは基本1人で学びを深める場。Yononakaはオンラインで集まるけれど、1〜2時間の限られた時間。ミライクラフトは、この中で
          <Mark color={C.practice}>最も「自分以外の他者」を意識するプロジェクト</Mark>だと思っています。
        </P>
        <P>
          AIロボットで1人でいろんなことができるようになるからこそ、他の人とのつながりはより一層大事になる。ここで<Mark color={C.practice}>「ナナメの関係」</Mark>
          という言葉があります。縦でも横でもない、ナナメ。縦は親子や先生と生徒、横は友達同士や同級生。そのどちらでもない——よく顔を見る近所の人、お店の店員さん、習い事の先生。そういう
          <Mark color={C.practice}>近くの大人との交流</Mark>が、これからの社会で求められていると思うんです。
        </P>
        <P>
        ナナメの関係があると、普段の活動をちょっと俯瞰的な立場から眺めることができる。夢中でやっている中では見つけられなかったアイデアや見方・考え方が、ナナメの関係との会話の中で生まれたりする。そういう意味でも、ミライクラフトは子どもたちだけじゃなく、スタッフも保護者もごちゃ混ぜでその場で何かを作るのが、より理想的な形じゃないかなと思っています。
        </P>
      </Section>

      {/* ===== 第7章 ===== */}
      <Section className="scroll-animate" style={{ paddingTop: '4px', paddingBottom: '4px' }}>
        <ChapterHead ch={CHAPTERS[6]} />
        <P>
          最後は<Mark color={C.self}>ジブンクラフト</Mark>。自分を知り、将来の姿をイメージして言葉にしていくパートで、主に
          <Mark color={C.self}>非認知能力の計測</Mark>と<strong style={{ fontWeight: 700, color: 'var(--ink-900)' }}>キャリア面談</strong>
          をやっていきます。
        </P>

        <SubHead color={C.self}>数値化できない力を、それでも測ってみる</SubHead>

        <SlideFigure slide={SLIDES[8]} index={8} />

        <P>
          非認知能力は、主体性・協働性・コミュニケーション能力のような、テストの点数では測れない力。それをできるだけ計測しようというのが、
          <Mark color={C.self}>Ai GROW（アイグロー）</Mark>というツールです。
        </P>
        <P>
          気質診断というのもやっていて、性格の基礎となるものを「気質」と言うんですけど、外向性・内向性——人と関わる方がエネルギーを発揮できるか、1人の方が発揮できるか——を、いくつかの質問に「自分はこっち派だな」と答えていくことで計測できる。結果は「課題設定能力が高いあなたは、現代の平賀源内」みたいに、歴史の偉人にたとえて分かりやすく自分を理解できるようになっています。
        </P>
        <P>
          ただ、それを「はい終わりました」と渡すだけじゃなくて、そこに<Mark color={C.self}>キャリアコンサルタントの私の面談</Mark>
          をプラスするのがミソです。自分のキャリアを自分で築いていく意識が、これで高まるんじゃないかなと思っています。
        </P>

        <SubHead color={C.self}>進路相談ではなく、キャリア面談</SubHead>
        <P>
          これは「その先の進路を考える進路相談」ではなくて、キャリア面談なんですね。面談でまず必ず言っているのは、
          <Mark color={C.self}>「みんなが社会に出るのは10年後、20年後。そのときの社会をまずイメージしてみよう」</Mark>ということ。
        </P>
        <P>
          AIがもっと進歩するかもしれない。ロボットが生活にもっと身近になる。少子高齢化で外国人がもっと日本に来る。100歳まで生きるのが当たり前になるかもしれない。じゃあどんな社会になるだろう？——イメージするのは難しくても、
          <Mark color={C.self}>イメージする時間を持つ</Mark>
          。そこから「必要とされる仕事って何だろう」と考えると、「自分はこういう能力があるから、こういうことをやれるんじゃないか」「まだやったことないけど興味があるから、これを突き詰めたい」という話が、自然と子どもたちから出てくるんです。
        </P>
        <P>
          今5〜6人やりましたけど、毎回スクール生がめちゃめちゃ話してくれて。20〜30分で枠を取ってるんですけど、基本1時間になって、長いときはほんまに1時間半とか喋っちゃうぐらい（笑）。私もすごく面白いんですね、これ。
        </P>
        <P>
          ゴールを描くだけでは行動まで降りてこないので、山登りでたとえると、登りたい山をイメージしたら、どういうルートで登るのか。
          <Mark color={C.self}>そのルートの作成が、目標を立てること</Mark>
          。「じゃあ次のPBLでこういうことやっていこうね」というところまで話すのがキャリア面談です。これを4ヶ月に1回、PBLの発表と振り返りを踏まえてやっています。キャリア面談を重ねることで、将来どんなことをやりたいのか、どういう人でありたいのかが、だんだん明確になってくると思います。
        </P>

        <PullQuote color={C.self}>登りたい山をイメージしたら、どういうルートで登るのか。</PullQuote>
      </Section>

      {/* ===== 第8章 ===== */}
      <Section className="scroll-animate" style={{ paddingTop: '4px', paddingBottom: '4px' }}>
        <ChapterHead ch={CHAPTERS[7]} />

        <LoopDiagram />
        <SlideFigure slide={SLIDES[9]} index={9} />

        <P>
          というのが、CLAFTの4つのカリキュラムです。全体を通して、
          <Mark color={C.teal}>将来自分が何をしたいか・どうありたいかを発見するための学び</Mark>としてやっています。
        </P>
        <P>
          PBL→Yononaka→ミライクラフト→ジブンクラフト、の順で話しましたけど、ジブンクラフトで自己理解が深まったら「じゃあ次のPBLどうしよう」と、またPBLに戻ってくる。
          <Mark color={C.teal}>循環しているカリキュラム</Mark>なんですね。だから、言ってしまえば終わりがない。
        </P>
        <P>
          ひとつ終わりがあるとするならば——「自分はこういう道筋なんだ、これに全力を尽くしたいんだ」という思いが芽生えたとき。そうなったらもう、そこに時間を使ってもらえればなと思います。そして、いま私が周りの大人にさせてもらっている
          <Mark color={C.teal}>お仕事インタビュー</Mark>
          を、いずれ社会に出て活躍するCLAFTメンバーに、私がインタビューさせてもらって。その話を次世代のCLAFTメンバーに伝えていってもらって。今のメンバーがもしかしたら私のような立場でスタッフになるかもしれない。いろんな循環をさせながら、変化しながら、このCLAFTという活動をこれからもずっと続けていきたいなと思っています。
        </P>

        <SubHead color={C.teal}>最後に、思いをひとつだけ</SubHead>
        <P>
          CLAFTは、スタッフ・スクール生・保護者という肩書を消して、<Mark color={C.teal}>関わるみんなで新しい何かを作っていく場</Mark>
          にしたいんです。
        </P>
        <P>
          将来どうなるか分からない時代です。明るい兆しもあれば、ちょっと暗いニュースもある。でも、そういう予測不可能な時代の中で、
          <Mark color={C.teal}>どんな状況でも面白がれるのが人間</Mark>だと僕は思うんですね。
        </P>

        <PullQuote color={C.teal}>どんな状況でも面白がれるのが人間だと僕は思うんですね。</PullQuote>

        <P>
          逆境に立たされたとき、ネガティブな気持ちを抱いたとき。その瞬間は難しくても、後から振り返ったときに「あの時間も自分のキャリアになってるな」「それも面白がって生きてきたから今があるよな」——そう思えたら、いい人生だったんじゃないかなと考えています。
        </P>
        <P>
          これからも子どもたちの探究する姿をサポートしていきますので、ぜひ皆さんも、サポートやフィードバックという形で関わっていただければと思います。「これはちょっと違うんじゃない？」でも大丈夫です。「こういう活動をしてるなら、この人に話を聞いてみたら？」でも。
          <Mark color={C.teal}>お仕事インタビューを受けてくださる方も、めちゃめちゃ募集しています。</Mark>
        </P>

        <div style={{ textAlign: 'center', margin: '4px 0 20px' }}>
          <a
            href="https://forms.gle/aF81u6Mn6b2367wMA"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: C.teal,
              color: '#fff',
              borderRadius: '50px',
              fontWeight: 700,
              fontSize: '14px',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(52,198,190,0.35)',
            }}
          >
            💌 感想・意見を送る
          </a>
        </div>

        <P>CLAFT 1年振り返り、ということでお話しさせていただきました。また引き続き、スクールの方でよろしくお願いいたします。ありがとうございました！</P>
      </Section>

      {/* ===== 動画 ===== */}
      <Section id="video" className="scroll-animate">
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '20px',
            border: `1.5px solid ${C.teal}30`,
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          }}
        >
          <h2
            style={{
              margin: '0 0 10px',
              fontFamily: 'var(--font-zen), sans-serif',
              fontSize: '18px',
              fontWeight: 900,
              color: 'var(--ink-900)',
            }}
          >
            🎬 40分ぜんぶ聞きたい方はこちら
          </h2>
          <p style={{ margin: '0 0 14px', fontSize: '13px', lineHeight: 1.8, color: 'var(--ink-700)' }}>
            この記事は、将一郎の振り返り動画（約40分）を再構成したものです。動画版はこちらから。
          </p>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}`}
              title="CLAFT 1周年振り返り動画"
              style={{ width: '100%', height: '100%', border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </Section>

      {/* ===== バックナンバーへ ===== */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/monthly"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 24px',
              background: `${C.teal}1a`,
              color: C.tealInk,
              borderRadius: '50px',
              fontWeight: 700,
              fontSize: '14px',
              textDecoration: 'none',
              border: `1.5px solid ${C.teal}4d`,
            }}
          >
            ← バックナンバー一覧
          </Link>
        </div>
      </Section>
    </MobileContainer>
  );
}
