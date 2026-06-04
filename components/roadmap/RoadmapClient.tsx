'use client';

import { useEffect } from 'react';
import { Zen_Maru_Gothic } from 'next/font/google';
import Link from 'next/link';
import { studentsData } from '@/lib/studentData';

const zenMaru = Zen_Maru_Gothic({
  weight: ['500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

/* ─────────────────────────────────────────────────
   メインコンポーネント
───────────────────────────────────────────────── */
export function RoadmapClient() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('rm-in');
        }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.rm-reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={zenMaru.className} style={{ width: '100%', overflow: 'hidden' }}>
      {/* ── グローバルスタイル ── */}
      <style jsx global>{`
        .rm-reveal {
          opacity: 0;
          transform: translateY(30px) rotate(-0.3deg);
          transition: opacity 0.75s ease, transform 0.75s cubic-bezier(0.34, 1.45, 0.64, 1);
        }
        .rm-reveal.rm-in {
          opacity: 1;
          transform: translateY(0) rotate(0deg);
        }
        .rm-reveal.rm-d1 { transition-delay: 0.1s; }
        .rm-reveal.rm-d2 { transition-delay: 0.2s; }
        .rm-reveal.rm-d3 { transition-delay: 0.3s; }

        /* スクラップブック紙カード */
        .rm-card {
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 3px 5px 18px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05);
          position: relative;
          overflow: visible;
        }

        /* 罫線背景 */
        .rm-ruled {
          background-image: repeating-linear-gradient(
            transparent, transparent 29px,
            rgba(180,165,140,0.16) 30px
          );
        }

        /* 方眼背景（薄） */
        .rm-grid {
          background-image:
            repeating-linear-gradient(90deg, rgba(170,158,138,0.10) 0px, transparent 1px, transparent 36px),
            repeating-linear-gradient(rgba(170,158,138,0.10) 0px, transparent 1px, transparent 36px);
        }

        /* 方眼背景（ダーク） */
        .rm-grid-dark {
          background-image:
            repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, transparent 1px, transparent 40px),
            repeating-linear-gradient(rgba(255,255,255,0.04) 0px, transparent 1px, transparent 40px);
        }

        /* 浮遊アニメーション */
        .rm-float {
          animation: rmFloat 3.8s ease-in-out infinite;
        }
        @keyframes rmFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-11px) rotate(2deg); }
        }

        /* バウンスアニメーション */
        .rm-bounce {
          animation: rmBounce 1.7s ease-in-out infinite;
        }
        @keyframes rmBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(9px); }
        }

        /* ロードマップ接続線 */
        .rm-road-track {
          width: 10px;
          flex: 1;
          min-height: 28px;
          margin: 0 auto;
          background: linear-gradient(to bottom, #e0cca8, #cebf94);
          border-radius: 5px;
          position: relative;
        }
        .rm-road-track::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 4px;
          bottom: 4px;
          width: 2px;
          transform: translateX(-50%);
          background: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,0.75) 0px,
            rgba(255,255,255,0.75) 5px,
            transparent 5px,
            transparent 11px
          );
        }
      `}</style>

      <HeroSection />
      <ThreePowersSection />
      <StudentsSection />
      <AiEraSection />
      <TwoPlacesSection />
      <StartingPowerSection />
      <ClaftNameSection />
      <CareerSection />
      <CtaSection />
    </div>
  );
}

/* ─────────────────────────────────────────────────
   小道具コンポーネント
───────────────────────────────────────────────── */

/** マスキングテープ */
function Tape({
  color,
  rotateDeg = -2,
  leftPct = 50,
  widthPx = 72,
}: {
  color: string;
  rotateDeg?: number;
  leftPct?: number;
  widthPx?: number;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: -12,
        left: `${leftPct}%`,
        transform: `translateX(-50%) rotate(${rotateDeg}deg)`,
        width: widthPx,
        height: 22,
        background: color,
        opacity: 0.7,
        borderRadius: 3,
        boxShadow: '0 1px 5px rgba(0,0,0,0.12)',
        zIndex: 20,
      }}
    />
  );
}

/** 付箋 */
function StickyNote({
  children,
  rotateDeg = 4,
  top = -14,
  right = -8,
}: {
  children: React.ReactNode;
  rotateDeg?: number;
  top?: number;
  right?: number;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        right,
        background: '#FFF4B8',
        padding: '5px 9px',
        borderRadius: 2,
        fontSize: 11,
        fontWeight: 800,
        transform: `rotate(${rotateDeg}deg)`,
        boxShadow: '2px 3px 8px rgba(0,0,0,0.13)',
        zIndex: 15,
        color: '#555',
        lineHeight: 1.35,
        maxWidth: 90,
        textAlign: 'center',
        whiteSpace: 'pre-line',
      }}
    >
      {children}
    </div>
  );
}

/** 手書き風の矢印（下向き） */
function HandArrow({ color = '#34c6be' }: { color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
      <svg width="30" height="34" viewBox="0 0 30 34" fill="none">
        <path
          d="M15 4 Q13 14 15 25"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.65"
        />
        <path
          d="M9 21 L15 29 L21 21"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.65"
        />
      </svg>
    </div>
  );
}

/** 手書き風アンダーライン */
function Underline({ color = '#34c6be' }: { color?: string }) {
  return (
    <svg
      style={{ display: 'block', width: '100%', height: 12, marginTop: -4 }}
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
    >
      <path
        d="M4,9 Q50,7 100,8 T196,9"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

/** 写真プレースホルダー（ポラロイド風） */
function PhotoPlaceholder({
  emoji,
  alt,
  bg,
  rotate = 0,
  tapeColor = 'rgba(52,198,190,0.65)',
  width = '100%',
  height = 160,
}: {
  emoji: string;
  alt: string;
  bg: string;
  rotate?: number;
  tapeColor?: string;
  width?: string | number;
  height?: number;
}) {
  return (
    <div
      style={{
        position: 'relative',
        width,
        transform: `rotate(${rotate}deg)`,
        display: 'inline-block',
      }}
    >
      <Tape color={tapeColor} rotateDeg={rotate > 0 ? 2 : -2} leftPct={50} widthPx={58} />
      <div
        style={{
          width: '100%',
          height,
          background: bg,
          borderRadius: 10,
          border: '3px solid #fff',
          boxShadow: '4px 6px 16px rgba(0,0,0,0.13)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span style={{ fontSize: 40 }}>{emoji}</span>
        {/* 実際の画像はここに配置: alt="{alt}" */}
        <span
          style={{
            position: 'absolute',
            bottom: 6,
            right: 8,
            fontSize: 9,
            color: 'rgba(0,0,0,0.3)',
            background: 'rgba(255,255,255,0.6)',
            borderRadius: 3,
            padding: '1px 5px',
          }}
        >
          📷 {alt}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   SEC 1: Hero
───────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      className="rm-grid"
      style={{
        width: '100%',
        minHeight: '100vh',
        padding: 'clamp(80px,15vw,120px) 24px clamp(60px,10vw,100px)',
        background: 'linear-gradient(175deg, #FBF8F3 0%, #F0E8D8 55%, #FBF8F3 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* コンパスローズ背景装飾 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(400px, 88vw)',
          height: 'min(400px, 88vw)',
          opacity: 0.055,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
          <circle cx="100" cy="100" r="90" stroke="#34c6be" strokeWidth="1" fill="none" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="60" stroke="#34c6be" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="28" stroke="#34c6be" strokeWidth="1" fill="none" />
          <line x1="100" y1="8" x2="100" y2="192" stroke="#34c6be" strokeWidth="0.8" />
          <line x1="8" y1="100" x2="192" y2="100" stroke="#34c6be" strokeWidth="0.8" />
          <line x1="28" y1="28" x2="172" y2="172" stroke="#34c6be" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="172" y1="28" x2="28" y2="172" stroke="#34c6be" strokeWidth="0.5" strokeDasharray="3 3" />
          <polygon points="100,6 96,22 100,18 104,22" fill="#34c6be" />
          <polygon points="100,194 96,178 100,182 104,178" fill="#34c6be" opacity="0.5" />
        </svg>
      </div>

      {/* 浮遊する落書き装飾 */}
      {[
        { emoji: '🧩', top: '10%', left: '6%', delay: '0s', size: 30 },
        { emoji: '✏️', top: '20%', right: '5%', delay: '1s', size: 24 },
        { emoji: '✈️', bottom: '22%', left: '4%', delay: '0.5s', size: 24 },
        { emoji: '🧱', bottom: '30%', right: '7%', delay: '1.5s', size: 22 },
        { emoji: '🎨', top: '55%', left: '3%', delay: '2s', size: 20 },
        { emoji: '🗺️', top: '14%', right: '10%', delay: '0.8s', size: 20 },
      ].map((d, i) => (
        <div
          key={i}
          className="rm-float"
          style={{
            position: 'absolute',
            top: d.top,
            left: d.left,
            right: (d as { right?: string }).right,
            bottom: (d as { bottom?: string }).bottom,
            fontSize: d.size,
            opacity: 0.38,
            animationDelay: d.delay,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          {d.emoji}
        </div>
      ))}

      <div
        style={{
          width: 'min(480px, 92%)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        {/* 上の小ラベル */}
        <p
          className="rm-reveal"
          style={{
            fontSize: 12,
            color: '#999',
            letterSpacing: '0.15em',
            marginBottom: 24,
            fontWeight: 600,
          }}
        >
          ── ちょっと、聞いてください ──
        </p>

        {/* 手書き風枠の見出し */}
        <div
          className="rm-reveal rm-d1"
          style={{
            position: 'relative',
            margin: '0 auto 28px',
            display: 'inline-block',
            padding: '20px 22px',
          }}
        >
          {/* 手書き風破線ボーダー */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              overflow: 'visible',
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <rect
              x="2"
              y="2"
              width="96"
              height="96"
              rx="10"
              ry="10"
              fill="none"
              stroke="#34c6be"
              strokeWidth="2.5"
              opacity="0.38"
              strokeDasharray="9 5 3 5"
            />
          </svg>
          <h1
            style={{
              fontSize: 'clamp(1.55rem,5vw,2.1rem)',
              fontWeight: 900,
              color: 'var(--ink-900)',
              lineHeight: 1.5,
              position: 'relative',
              zIndex: 1,
            }}
          >
            「創るのが好き」って、
            <br />
            <span style={{ color: '#34c6be' }}>発明家</span>・
            <span style={{ color: '#F5A65B' }}>クリエイター</span>に
            <br />
            なるためだけの学びじゃない。
          </h1>
        </div>

        {/* SVG 手書き矢印 */}
        <div className="rm-reveal rm-d1" style={{ margin: '-8px auto 12px' }}>
          <svg width="52" height="28" viewBox="0 0 52 28" fill="none">
            <path
              d="M26 4 Q22 12 18 16 M26 4 Q30 12 34 16 M18 16 Q22 14 26 16 Q30 14 34 16"
              stroke="#34c6be"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* サブテキスト */}
        <div
          className="rm-reveal rm-d2"
          style={{
            background: 'rgba(255,255,255,0.78)',
            borderRadius: 16,
            padding: '18px 22px',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 2px 14px rgba(0,0,0,0.07)',
            border: '1px solid rgba(255,255,255,0.9)',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(0.9rem,2.5vw,1rem)',
              lineHeight: 2.0,
              color: 'var(--ink-700)',
              margin: 0,
            }}
          >
            パズル、ブロック、お絵かき、積み木。
            <br />
            その「好き」のなかに、
            <br />
            未来を生きる<strong style={{ color: '#34c6be' }}>"力"</strong>が眠っています。
          </p>
        </div>

        {/* ルートプレビュー */}
        <div
          className="rm-reveal rm-d2"
          style={{
            background: 'rgba(52,198,190,0.06)',
            borderRadius: 14,
            padding: '14px 18px',
            border: '1.5px dashed rgba(52,198,190,0.28)',
            textAlign: 'left',
            marginTop: 20,
            marginBottom: 8,
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: '#34c6be',
              fontWeight: 800,
              marginBottom: 10,
              letterSpacing: '0.1em',
            }}
          >
            🗺️ このページのルート
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              '「創る」の中にある3つの力',
              'AI時代との接続',
              'CLAFTの2つの場',
              'キャリアへのロードマップ',
            ].map((label, i, arr) => (
              <div key={i} style={{ display: 'flex', alignItems: 'stretch', gap: 10 }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                    width: 22,
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: i === arr.length - 1 ? '#F5A65B' : '#34c6be',
                      color: '#fff',
                      fontSize: 10,
                      fontWeight: 900,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < arr.length - 1 && (
                    <div
                      style={{
                        width: 2,
                        flex: 1,
                        minHeight: 8,
                        background: 'rgba(52,198,190,0.2)',
                        margin: '2px 0',
                      }}
                    />
                  )}
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: 'var(--ink-700)',
                    fontWeight: 600,
                    margin: '2px 0',
                    paddingBottom: i < arr.length - 1 ? 8 : 0,
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* スクロール誘導 */}
        <div className="rm-bounce" style={{ marginTop: 32, textAlign: 'center' }}>
          <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
            <path
              d="M14 4 L14 24 M6 18 L14 26 L22 18"
              stroke="#34c6be"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.55"
            />
          </svg>
          <p style={{ fontSize: 10, color: '#bbb', letterSpacing: '0.12em', marginTop: 4 }}>
            scroll
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   SEC 2: 「創る」の中にある3つの力
───────────────────────────────────────────────── */
const THREE_POWERS = [
  {
    title: 'ばらして考える力',
    subtitle: '─ 仕組みを見抜く ─',
    desc: 'パズルみたいに、バラバラなピースがどう組み合わさってるか見抜く力。',
    sticky: '問いを立てる\n課題発見',
    emoji: '🧩',
    bg: 'linear-gradient(135deg, #a8edea, #55c8a0)',
    tape: 'rgba(52,198,190,0.72)',
    marginRight: 14,
    marginLeft: 0,
    stickyRotate: 5,
  },
  {
    title: 'ためし続ける力',
    subtitle: '─ 諦めない心 ─',
    desc: '何度も崩れても積み直す。失敗から次の工夫を見つけ出す力。',
    sticky: '試行錯誤\nレジリエンス',
    emoji: '🧱',
    bg: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)',
    tape: 'rgba(245,166,91,0.72)',
    marginRight: 0,
    marginLeft: 14,
    stickyRotate: -4,
  },
  {
    title: '伝わるように話す力',
    subtitle: '─ 心を動かす言葉 ─',
    desc: '描いたものを、自分の言葉で伝える。人に届けることで学びが深まる。',
    sticky: 'プレゼン\nコミュニケーション',
    emoji: '🎨',
    bg: 'linear-gradient(135deg, #fd79a8, #e84393)',
    tape: 'rgba(253,121,168,0.72)',
    marginRight: 14,
    marginLeft: 0,
    stickyRotate: 4,
  },
];

function ThreePowersSection() {
  return (
    <section
      className="rm-ruled"
      style={{
        width: '100%',
        padding: 'clamp(80px,12vw,120px) 24px',
        background: '#FBF8F3',
      }}
    >
      <div style={{ width: 'min(480px,92%)', margin: '0 auto' }}>
        {/* 見出し */}
        <div className="rm-reveal" style={{ textAlign: 'center', marginBottom: 16 }}>
          <p style={{ fontSize: 12, color: '#bbb', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600 }}>
            子どもたちが夢中になっている「創る」遊び
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.4rem,5vw,1.85rem)',
              fontWeight: 900,
              color: 'var(--ink-900)',
              lineHeight: 1.45,
              marginBottom: 6,
              display: 'inline-block',
            }}
          >
            「創る」の中にある
            <br />
            <span style={{ color: '#34c6be', position: 'relative' }}>
              3つの力
              <Underline color="#34c6be" />
            </span>
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.88rem,2.3vw,0.96rem)',
              lineHeight: 1.9,
              color: 'var(--ink-700)',
              marginTop: 14,
            }}
          >
            その中には、こんな力の&quot;種&quot;が眠っています。
            <br />
            それをスクールで学ぶなかで育んでいきます。
          </p>
        </div>

        {/* 3枚スクラップブック風カード */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 44, marginTop: 40 }}>
          {THREE_POWERS.map((p, i) => (
            <div
              key={p.title}
              className={`rm-reveal rm-card rm-d${i}`}
              style={{
                overflow: 'hidden',
                marginRight: p.marginRight,
                marginLeft: p.marginLeft,
              }}
            >
              <Tape color={p.tape} rotateDeg={i % 2 === 0 ? -2 : 2} leftPct={i === 1 ? 35 : 52} widthPx={84} />
              <StickyNote rotateDeg={p.stickyRotate}>{p.sticky}</StickyNote>

              {/* 画像エリア */}
              <div
                style={{
                  width: '100%',
                  height: 168,
                  background: p.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 60,
                  position: 'relative',
                  borderBottom: '1px solid rgba(0,0,0,0.05)',
                }}
              >
                {p.emoji}
                {/* ここに実際の写真を配置してください */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 7,
                    right: 10,
                    fontSize: 9,
                    color: 'rgba(255,255,255,0.6)',
                    background: 'rgba(0,0,0,0.12)',
                    borderRadius: 3,
                    padding: '1px 5px',
                  }}
                >
                  📷 {p.title}の写真
                </span>
              </div>

              {/* テキストエリア（罫線入りノート風） */}
              <div className="rm-ruled" style={{ padding: '22px 22px 26px', background: '#fff' }}>
                <h3
                  style={{
                    fontSize: 'clamp(1.05rem,3.5vw,1.2rem)',
                    fontWeight: 900,
                    color: 'var(--ink-900)',
                    marginBottom: 4,
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: 11, color: '#aaa', fontWeight: 600, marginBottom: 10 }}>
                  {p.subtitle}
                </p>
                <p
                  style={{
                    fontSize: 'clamp(0.88rem,2.3vw,0.95rem)',
                    lineHeight: 1.85,
                    color: 'var(--ink-700)',
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   SEC 3: ひとりひとり、好きな「創る」が違う
───────────────────────────────────────────────── */
function StudentsSection() {
  const featured = studentsData.filter((s) =>
    ['haruto', 'hikaru', 'kenshiro'].includes(s.slug)
  );

  return (
    <section
      style={{
        width: '100%',
        padding: 'clamp(80px,12vw,120px) 24px',
        background: '#FBF8F3',
        position: 'relative',
      }}
    >
      {/* 背景ドット装飾 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(52,198,190,0.07) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div style={{ width: 'min(480px,92%)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* 吹き出し見出し */}
        <div className="rm-reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
          <div
            style={{
              display: 'inline-block',
              background: '#fff',
              border: '2.5px solid rgba(52,198,190,0.35)',
              borderRadius: '20px 20px 20px 5px',
              padding: '14px 20px',
              marginBottom: 18,
              boxShadow: '0 4px 16px rgba(52,198,190,0.1)',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(0.88rem,2.5vw,0.96rem)',
                lineHeight: 1.8,
                color: 'var(--ink-700)',
                margin: 0,
                fontWeight: 600,
              }}
            >
              ものづくりで、一番没頭する場面を、
              <br />
              子供たちに聞いてみました。
            </p>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.2rem,4.2vw,1.5rem)',
              fontWeight: 900,
              color: 'var(--ink-900)',
              lineHeight: 1.45,
            }}
          >
            🎤 スクール生に、聞いてみました。
          </h2>
        </div>

        {/* スクール生カード */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {featured.map((s, i) => (
            <div
              key={s.slug}
              className={`rm-reveal rm-card rm-d${i}`}
              style={{
                padding: 22,
                borderLeft: '4px solid #34c6be',
                transform: `rotate(${i % 2 === 0 ? '0.5deg' : '-0.5deg'})`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #34c6be, #58c3a2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 26,
                    flexShrink: 0,
                    boxShadow: '0 3px 10px rgba(52,198,190,0.28)',
                  }}
                >
                  {s.avatarEmoji}
                </div>
                <div>
                  <p
                    style={{
                      fontWeight: 900,
                      fontSize: 17,
                      color: 'var(--ink-900)',
                      margin: 0,
                    }}
                  >
                    {s.name}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--ink-500)', margin: 0 }}>
                    {s.grade}
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: 'clamp(0.88rem,2.3vw,0.94rem)',
                  lineHeight: 1.85,
                  color: 'var(--ink-700)',
                  margin: '0 0 14px',
                }}
              >
                {s.shortIntro}
              </p>
              <Link
                href={`/student-story/${s.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#34c6be',
                  textDecoration: 'none',
                  background: 'rgba(52,198,190,0.1)',
                  borderRadius: 20,
                  padding: '5px 14px',
                  transition: 'all 0.2s',
                }}
              >
                ストーリーを読む →
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rm-reveal" style={{ textAlign: 'center', marginTop: 36 }}>
          <Link
            href="/student-story"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '13px 30px',
              borderRadius: 40,
              border: '2.5px solid #34c6be',
              color: '#34c6be',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: 'clamp(0.9rem,2.5vw,1rem)',
              background: '#fff',
              boxShadow: '0 4px 16px rgba(52,198,190,0.1)',
              transition: 'all 0.2s',
            }}
          >
            みんなのストーリーを見る →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   SEC 4: AI時代に、その力はこう効く
───────────────────────────────────────────────── */
const SKILL_MAP = [
  { child: 'ばらして考える力', adult: '問いを立てる・課題発見', emoji: '🔍' },
  { child: 'ためし続ける力', adult: '試行錯誤・レジリエンス', emoji: '💪' },
  { child: '伝わるように話す力', adult: 'プレゼン・コミュニケーション', emoji: '🗣️' },
];

function AiEraSection() {
  return (
    <section
      className="rm-grid-dark"
      style={{
        width: '100%',
        padding: 'clamp(80px,12vw,120px) 24px',
        background: '#2C3E50',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 光のアクセント */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          right: '-40px',
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(52,198,190,0.14), transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '-30px',
          width: 160,
          height: 160,
          background: 'radial-gradient(circle, rgba(245,166,91,0.1), transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: 'min(480px,92%)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ナレーション */}
        <div className="rm-reveal" style={{ marginBottom: 36, textAlign: 'center' }}>
          <p
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.2em',
              marginBottom: 22,
            }}
          >
            ──── ところで ────
          </p>
          <p
            style={{
              fontSize: 'clamp(0.9rem,2.5vw,1.02rem)',
              lineHeight: 2.05,
              color: 'rgba(255,255,255,0.72)',
              marginBottom: 14,
            }}
          >
            いま、AIやロボットなどのテクノロジーが毎日進化しています。
            <br />
            AIがもっと仕事を変えたら？
            <br />
            100歳まで生きるのが当たり前になったら？
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.3rem,4.5vw,1.65rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.5,
            }}
          >
            10年後の社会を、
            <br />
            <span style={{ color: '#34c6be' }}>子供のときの力</span>が支える。
          </h2>
        </div>

        {/* スキルマッピングカード */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {SKILL_MAP.map((m, i) => (
            <div
              key={m.child}
              className={`rm-reveal rm-d${i}`}
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(6px)',
                borderRadius: 18,
                padding: '20px 20px',
                border: '1px solid rgba(255,255,255,0.09)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
              }}
            >
              <span style={{ fontSize: 30, flexShrink: 0, marginTop: 2 }}>{m.emoji}</span>
              <div style={{ flex: 1 }}>
                {/* 子供のとき */}
                <p
                  style={{
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.4)',
                    margin: '0 0 3px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                  }}
                >
                  子供のとき
                </p>
                <p
                  style={{
                    fontSize: 'clamp(0.9rem,2.6vw,0.98rem)',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.72)',
                    margin: '0 0 8px',
                  }}
                >
                  {m.child}
                </p>

                {/* 矢印 */}
                <svg width="24" height="14" viewBox="0 0 24 14" fill="none" style={{ display: 'block', marginBottom: 6 }}>
                  <path
                    d="M2 7 L20 7 M14 3 L20 7 L14 11"
                    stroke="#34c6be"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* 社会では */}
                <p
                  style={{
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.38)',
                    margin: '0 0 3px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                  }}
                >
                  社会では
                </p>
                <p
                  style={{
                    fontSize: 'clamp(0.95rem,2.8vw,1.05rem)',
                    fontWeight: 900,
                    color: '#34c6be',
                    margin: 0,
                  }}
                >
                  {m.adult}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   SEC 5: 2つの場
───────────────────────────────────────────────── */
function TwoPlacesSection() {
  return (
    <section
      className="rm-ruled"
      style={{
        width: '100%',
        padding: 'clamp(80px,12vw,120px) 24px',
        background: '#F0E8D8',
        position: 'relative',
      }}
    >
      <div style={{ width: 'min(480px,92%)', margin: '0 auto' }}>
        <div className="rm-reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <p style={{ fontSize: 12, color: '#aaa', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600 }}>
            だから、CLAFTでは
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.3rem,4.5vw,1.65rem)',
              fontWeight: 900,
              color: 'var(--ink-900)',
              lineHeight: 1.45,
            }}
          >
            <span style={{ color: '#34c6be' }}>2つの場</span>をつくっています
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
          {/* カードA: PBL */}
          <div
            className="rm-reveal rm-card"
            style={{ overflow: 'hidden', marginRight: 12 }}
          >
            <Tape color="rgba(245,166,91,0.72)" rotateDeg={-2} leftPct={38} widthPx={88} />

            <div
              style={{
                height: 172,
                background: 'linear-gradient(135deg, rgba(245,166,91,0.22), rgba(240,106,106,0.12))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 58,
                position: 'relative',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
              }}
            >
              🔍
              {/* ここにPBL探究活動の様子の写真を配置 */}
              <span
                style={{
                  position: 'absolute',
                  bottom: 7,
                  right: 10,
                  fontSize: 9,
                  color: 'rgba(100,70,30,0.45)',
                  background: 'rgba(255,255,255,0.65)',
                  borderRadius: 3,
                  padding: '1px 5px',
                }}
              >
                📷 PBL探究活動の様子
              </span>
            </div>

            <div className="rm-ruled" style={{ padding: '22px 22px 26px', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span
                  style={{
                    background: '#F5A65B',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 900,
                    padding: '3px 12px',
                    borderRadius: 20,
                  }}
                >
                  PBL
                </span>
                <h3
                  style={{
                    fontSize: 'clamp(1rem,3.2vw,1.15rem)',
                    fontWeight: 900,
                    color: 'var(--ink-900)',
                    margin: 0,
                  }}
                >
                  好き・疑問から、深く掘る
                </h3>
              </div>
              <p
                style={{
                  fontSize: 'clamp(0.88rem,2.3vw,0.95rem)',
                  lineHeight: 1.85,
                  color: 'var(--ink-700)',
                  margin: '0 0 16px',
                }}
              >
                自分の「なんで？」を出発点に、
                <br />
                自分で調べて、つくって、伝える。
              </p>
              <Link
                href="/pbl"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#F5A65B',
                  textDecoration: 'none',
                  background: 'rgba(245,166,91,0.1)',
                  borderRadius: 20,
                  padding: '5px 14px',
                }}
              >
                PBL生のストーリーを見る →
              </Link>
            </div>
          </div>

          {/* カードB: Yononaka */}
          <div
            className="rm-reveal rm-card"
            style={{ overflow: 'hidden', marginLeft: 12 }}
          >
            <Tape color="rgba(52,198,190,0.72)" rotateDeg={2} leftPct={58} widthPx={88} />

            <div
              style={{
                height: 172,
                background: 'linear-gradient(135deg, rgba(52,198,190,0.2), rgba(88,195,162,0.13))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 58,
                position: 'relative',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
              }}
            >
              💬
              {/* ここにYononaka対話セッションの様子の写真を配置 */}
              <span
                style={{
                  position: 'absolute',
                  bottom: 7,
                  right: 10,
                  fontSize: 9,
                  color: 'rgba(40,80,60,0.45)',
                  background: 'rgba(255,255,255,0.65)',
                  borderRadius: 3,
                  padding: '1px 5px',
                }}
              >
                📷 Yononaka対話の様子
              </span>
            </div>

            <div className="rm-ruled" style={{ padding: '22px 22px 26px', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span
                  style={{
                    background: '#34c6be',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 900,
                    padding: '3px 12px',
                    borderRadius: 20,
                  }}
                >
                  Yononaka
                </span>
                <h3
                  style={{
                    fontSize: 'clamp(1rem,3.2vw,1.15rem)',
                    fontWeight: 900,
                    color: 'var(--ink-900)',
                    margin: 0,
                  }}
                >
                  正解のない問いに、向き合う
                </h3>
              </div>
              <p
                style={{
                  fontSize: 'clamp(0.88rem,2.3vw,0.95rem)',
                  lineHeight: 1.85,
                  color: 'var(--ink-700)',
                  margin: '0 0 16px',
                }}
              >
                異年齢の仲間と、
                <br />
                答えのない問いをじっくり語り合う。
              </p>
              <Link
                href="/yononaka"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#34c6be',
                  textDecoration: 'none',
                  background: 'rgba(52,198,190,0.1)',
                  borderRadius: 20,
                  padding: '5px 14px',
                }}
              >
                Yononaka生のストーリーを見る →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   SEC 6: はじめる力
───────────────────────────────────────────────── */
const START_POWERS = [
  {
    icon: '🪞',
    title: '自己理解',
    sub: '自分のことが分かるから、選べる',
    color: '#34c6be',
  },
  {
    icon: '🌱',
    title: '主体性',
    sub: '社会のことを、ジブン事にできる',
    color: '#58c3a2',
  },
  {
    icon: '🌊',
    title: '柔軟性',
    sub: '壁にぶつかっても、方向を変えられる',
    color: '#F5A65B',
  },
];

function StartingPowerSection() {
  return (
    <section
      style={{
        width: '100%',
        padding: 'clamp(80px,12vw,120px) 24px',
        background: '#FBF8F3',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 背景の薄い光 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 600px 500px at 50% 55%, rgba(52,198,190,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          width: 'min(480px,92%)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* 見出し */}
        <div className="rm-reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <p
            style={{
              fontSize: 'clamp(1.2rem,4.2vw,1.5rem)',
              fontWeight: 900,
              color: 'var(--ink-700)',
              lineHeight: 1.5,
              marginBottom: 16,
            }}
          >
            そこから育つのは
          </p>
          {/* 中央の大きな「はじめる力」 */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '14px 36px',
                background: 'linear-gradient(135deg, #34c6be, #58c3a2)',
                color: '#fff',
                borderRadius: 100,
                fontSize: 'clamp(1.5rem,5.5vw,1.9rem)',
                fontWeight: 900,
                boxShadow: '0 10px 28px rgba(52,198,190,0.28)',
              }}
            >
              はじめる力
            </div>
            {/* 手書き星デコ */}
            <svg
              style={{ position: 'absolute', top: -18, right: -16, width: 32, height: 32 }}
              viewBox="0 0 32 32"
            >
              <path
                d="M16 4 L18 12 L26 12 L20 17 L22 25 L16 21 L10 25 L12 17 L6 12 L14 12 Z"
                fill="none"
                stroke="#FFF4B8"
                strokeWidth="2"
                opacity="0.75"
              />
            </svg>
            <svg
              style={{ position: 'absolute', bottom: -14, left: -14, width: 24, height: 24 }}
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="3" fill="#F5A65B" opacity="0.5" />
              <circle cx="4" cy="4" r="2" fill="#F5A65B" opacity="0.35" />
              <circle cx="20" cy="20" r="2" fill="#34c6be" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* 3要素 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {START_POWERS.map((p, i) => (
            <div key={p.title}>
              {i > 0 && <HandArrow color={START_POWERS[i - 1].color} />}
              <div
                className={`rm-reveal rm-card rm-d${i}`}
                style={{
                  padding: '20px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  borderLeft: `4px solid ${p.color}`,
                }}
              >
                <span style={{ fontSize: 34, flexShrink: 0 }}>{p.icon}</span>
                <div>
                  <p
                    style={{
                      fontWeight: 900,
                      fontSize: 'clamp(1rem,3.2vw,1.12rem)',
                      color: p.color,
                      margin: '0 0 4px',
                    }}
                  >
                    {p.title}
                  </p>
                  <p
                    style={{
                      fontSize: 'clamp(0.85rem,2.3vw,0.92rem)',
                      color: 'var(--ink-600)',
                      margin: 0,
                      lineHeight: 1.65,
                    }}
                  >
                    {p.sub}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 解説テキスト */}
        <div
          className="rm-reveal"
          style={{
            marginTop: 36,
            padding: '20px 22px',
            background: 'rgba(52,198,190,0.06)',
            borderRadius: 18,
            borderLeft: '4px solid rgba(52,198,190,0.38)',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(0.88rem,2.3vw,0.95rem)',
              lineHeight: 2.0,
              color: 'var(--ink-700)',
              margin: 0,
            }}
          >
            自分で選択して、判断できる人。
            <br />
            仕組みがわかって、試行錯誤して、言葉にできる。
            <br />
            その実感の積み重ねが、
            <strong style={{ color: '#34c6be' }}>「はじめる力」</strong>になります。
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   SEC 7: CLAFTという仕組み
───────────────────────────────────────────────── */
const CLAFT_LETTERS = [
  {
    letters: 'C・L',
    words: 'Creative × Communication\n& Learning',
    color: '#34c6be',
    meaning: '創ることと対話すること、学び続ける力',
  },
  {
    letters: 'A',
    words: 'Active',
    color: '#F5A65B',
    meaning: '主体的に踏み出す力',
  },
  {
    letters: 'F',
    words: 'Flexible',
    color: '#f06a6a',
    meaning: 'しなやかに変わる力',
  },
  {
    letters: 'T',
    words: 'Trial',
    color: '#58c3a2',
    meaning: '何度でも試し続ける心',
  },
];

function ClaftNameSection() {
  return (
    <section
      className="rm-grid"
      style={{
        width: '100%',
        padding: 'clamp(80px,12vw,120px) 24px',
        background: '#F0E8D8',
        position: 'relative',
      }}
    >
      <div style={{ width: 'min(480px,92%)', margin: '0 auto' }}>
        {/* 見出し */}
        <div className="rm-reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
          <p
            style={{
              fontSize: 14,
              letterSpacing: '0.3em',
              color: '#34c6be',
              marginBottom: 10,
              fontWeight: 700,
            }}
          >
            ✦ CLAFT ✦
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.3rem,4.5vw,1.65rem)',
              fontWeight: 900,
              color: 'var(--ink-900)',
              lineHeight: 1.45,
              marginBottom: 0,
            }}
          >
            CLAFTという仕組み
          </h2>
        </div>

        {/* CLAFT文字カード */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {CLAFT_LETTERS.map((item, i) => (
            <div
              key={item.letters}
              className={`rm-reveal rm-card rm-d${i}`}
              style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 18,
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  flexShrink: 0,
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${item.color}28, ${item.color}10)`,
                  border: `2px solid ${item.color}45`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  fontWeight: 900,
                  color: item.color,
                  letterSpacing: item.letters.length > 2 ? '-0.05em' : '0',
                }}
              >
                {item.letters}
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 800,
                    fontSize: 'clamp(0.9rem,2.8vw,1rem)',
                    color: 'var(--ink-900)',
                    margin: '0 0 3px',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {item.words}
                </p>
                <p style={{ fontSize: 12, color: 'var(--ink-600)', margin: 0 }}>
                  {item.meaning}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 締めテキスト */}
        <div className="rm-reveal" style={{ textAlign: 'center', marginTop: 36 }}>
          <p
            style={{
              fontSize: 'clamp(0.9rem,2.5vw,1rem)',
              lineHeight: 2.1,
              color: 'var(--ink-700)',
              marginBottom: 28,
            }}
          >
            創ることと、対話すること。
            <br />
            学び、踏み出し、しなやかに、試す。
            <br />
            その全部を、CLAFTという名前にこめました。
          </p>
          <Link
            href="/claft-hope"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 30px',
              borderRadius: 40,
              background: 'linear-gradient(135deg, #34c6be, #58c3a2)',
              color: '#fff',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: 'clamp(0.9rem,2.5vw,1rem)',
              boxShadow: '0 6px 22px rgba(52,198,190,0.28)',
            }}
          >
            CLAFTについて詳しく →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   SEC 8: そのさきに、自分のキャリアを「創る」
───────────────────────────────────────────────── */
const CAREER_STEPS = [
  {
    step: 'STEP 1',
    icon: '🧭',
    title: 'まずは、自分で選択・判断できる人へ',
    sub: '小さな選択の積み重ねが、自分らしい人生の土台になる。',
    color: '#34c6be',
  },
  {
    step: 'STEP 2',
    icon: '🪞',
    title: '自己理解 × 社会理解 × 時代理解',
    sub: '自分を知り、社会を知り、時代の流れを読む。3つが揃うと、進む方向が見えてくる。',
    color: '#58c3a2',
  },
  {
    step: 'STEP 3',
    icon: '✨',
    title: '自分で、自分のキャリアを創っていく',
    sub: '誰かに決めてもらうのではなく、自分の手でキャリアをデザインする力がつく。',
    color: '#F5A65B',
  },
];

function CareerSection() {
  return (
    <section
      style={{
        width: '100%',
        padding: 'clamp(80px,12vw,120px) 24px clamp(100px,15vw,140px)',
        background: 'linear-gradient(180deg, #F0E8D8 0%, #fef5e7 38%, #e8f4f8 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 装飾グロー */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          right: '-30px',
          width: 160,
          height: 160,
          background: 'radial-gradient(circle, rgba(245,166,91,0.14), transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: '-20px',
          width: 130,
          height: 130,
          background: 'radial-gradient(circle, rgba(52,198,190,0.12), transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: 'min(480px,92%)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ブロック1：問いかけ */}
        <div className="rm-reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <p
            style={{
              fontSize: 'clamp(1.2rem,4.2vw,1.5rem)',
              fontWeight: 900,
              color: 'var(--ink-800)',
              lineHeight: 1.75,
              marginBottom: 28,
            }}
          >
            AIロボットが、
            <br />
            正解や常識を
            <br />
            <span style={{ color: '#F5A65B' }}>書き換え続けても</span>──
          </p>

          {/* 画像プレースホルダー：地平線・旅立つ姿 */}
          <div
            style={{
              width: '100%',
              height: 185,
              background: 'linear-gradient(135deg, #a8d8ea 0%, #b8e4c9 50%, #ffeaa7 100%)',
              borderRadius: 18,
              border: '3px solid #fff',
              boxShadow: '0 10px 28px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <span style={{ fontSize: 56 }}>🌅</span>
            {/* ここに地平線・旅立つ後ろ姿の写真を配置 */}
            <span
              style={{
                position: 'absolute',
                bottom: 8,
                right: 10,
                fontSize: 9,
                color: 'rgba(0,0,0,0.3)',
                background: 'rgba(255,255,255,0.7)',
                borderRadius: 3,
                padding: '1px 5px',
              }}
            >
              📷 地平線・旅立つ後ろ姿の写真
            </span>
          </div>
        </div>

        {/* ブロック2：宣言 */}
        <div
          className="rm-reveal rm-card"
          style={{
            padding: '30px 26px',
            marginBottom: 40,
            background: 'linear-gradient(135deg, #fff, #fffdf0)',
            borderTop: '4px solid #34c6be',
            textAlign: 'center',
          }}
        >
          <Tape color="rgba(52,198,190,0.65)" rotateDeg={-2} leftPct={28} widthPx={90} />
          {/* 手書き星 */}
          <div
            style={{
              position: 'absolute',
              top: 14,
              right: 18,
              fontSize: 18,
              opacity: 0.45,
            }}
          >
            ⭐
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 14,
              left: 18,
              fontSize: 13,
              opacity: 0.35,
            }}
          >
            ✦
          </div>

          <p
            style={{
              fontSize: 'clamp(1.3rem,4.5vw,1.65rem)',
              fontWeight: 900,
              lineHeight: 1.75,
              color: 'var(--ink-900)',
              marginBottom: 16,
            }}
          >
            それを、<span style={{ color: '#34c6be' }}>おもしろがれる</span>
            <br />
            自信を。
          </p>
          <p
            style={{
              fontSize: 'clamp(1.1rem,3.8vw,1.4rem)',
              fontWeight: 700,
              lineHeight: 1.85,
              color: 'var(--ink-800)',
              margin: 0,
            }}
          >
            100年の人生を、
            <br />
            <span style={{ color: '#F5A65B' }}>学び続けられる</span>
            <br />
            好奇心を。
          </p>
        </div>

        {/* ブロック3：ロードマップビジュアル */}
        <div className="rm-reveal" style={{ marginBottom: 40 }}>
          <h3
            style={{
              fontSize: 'clamp(1.1rem,3.5vw,1.25rem)',
              fontWeight: 900,
              color: 'var(--ink-900)',
              textAlign: 'center',
              marginBottom: 26,
            }}
          >
            CLAFTで育む、
            <span style={{ color: '#34c6be' }}>3つのステップ</span>
          </h3>

          {/* ロードマップ本体 */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {CAREER_STEPS.map((step, i) => (
              <div key={step.step} style={{ display: 'flex', gap: 14, alignItems: 'stretch' }}>
                {/* 左列：マイルストーンノード＋道 */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 44,
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${step.color}, ${step.color}bb)`,
                      border: '3px solid #fff',
                      boxShadow: `0 0 0 3px ${step.color}30, 0 5px 16px rgba(0,0,0,0.18)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      flexShrink: 0,
                      zIndex: 1,
                    }}
                  >
                    {step.icon}
                  </div>
                  {i < CAREER_STEPS.length - 1 && (
                    <div className="rm-road-track" />
                  )}
                </div>

                {/* 右列：カード */}
                <div
                  style={{
                    flex: 1,
                    paddingBottom: i < CAREER_STEPS.length - 1 ? 20 : 0,
                    paddingTop: 3,
                  }}
                >
                  <div
                    className={`rm-reveal rm-card rm-d${i}`}
                    style={{
                      padding: '16px 20px',
                      borderLeft: `4px solid ${step.color}`,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: step.color,
                        margin: '0 0 4px',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {step.step}
                    </p>
                    <p
                      style={{
                        fontSize: 'clamp(0.9rem,2.8vw,1rem)',
                        fontWeight: 900,
                        color: 'var(--ink-900)',
                        margin: '0 0 5px',
                      }}
                    >
                      {step.title}
                    </p>
                    <p
                      style={{
                        fontSize: 'clamp(0.82rem,2.2vw,0.88rem)',
                        color: 'var(--ink-600)',
                        margin: 0,
                        lineHeight: 1.72,
                      }}
                    >
                      {step.sub}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* ゴールノード */}
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 4 }}>
              <div
                style={{
                  width: 44,
                  flexShrink: 0,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #F5A65B, #e17055)',
                    border: '3px solid #fff',
                    boxShadow: '0 0 0 4px rgba(245,166,91,0.22), 0 6px 20px rgba(0,0,0,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}
                >
                  🏁
                </div>
              </div>
              <p
                style={{
                  fontSize: 'clamp(0.9rem,2.5vw,1rem)',
                  fontWeight: 900,
                  color: '#F5A65B',
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                自分だけのキャリアへ
              </p>
            </div>
          </div>
        </div>

        {/* ブロック4：キャリアコンサルタントの伴走 */}
        <div className="rm-reveal rm-card" style={{ overflow: 'hidden' }}>
          <Tape color="rgba(245,166,91,0.7)" rotateDeg={2} leftPct={62} widthPx={82} />

          <div
            style={{
              height: 165,
              background: 'linear-gradient(135deg, rgba(52,198,190,0.16), rgba(88,195,162,0.1))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 54,
              position: 'relative',
              borderBottom: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            🤝
            {/* ここにキャリアコンサルティングの場面の写真を配置 */}
            <span
              style={{
                position: 'absolute',
                bottom: 7,
                right: 10,
                fontSize: 9,
                color: 'rgba(40,80,60,0.4)',
                background: 'rgba(255,255,255,0.7)',
                borderRadius: 3,
                padding: '1px 5px',
              }}
            >
              📷 キャリアコンサルティングの場面
            </span>
          </div>

          <div className="rm-ruled" style={{ padding: '24px 24px 28px', background: '#fff', textAlign: 'center' }}>
            <p
              style={{
                fontSize: 'clamp(1rem,3.2vw,1.15rem)',
                fontWeight: 900,
                color: 'var(--ink-900)',
                lineHeight: 1.75,
                marginBottom: 14,
              }}
            >
              ひとりひとりの
              <br />
              キャリアストーリーに、
              <br />
              <span style={{ color: '#34c6be' }}>キャリアコンサルタント</span>が
              <br />
              伴走します。
            </p>
            <p
              style={{
                fontSize: 'clamp(0.82rem,2.2vw,0.9rem)',
                color: 'var(--ink-600)',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              子供時代から、大人になっても。
              <br />
              CLAFTは、ずっと隣にいます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   SEC 9: CTA
───────────────────────────────────────────────── */
function CtaSection() {
  return (
    <section
      style={{
        width: '100%',
        padding: 'clamp(80px,12vw,120px) 24px clamp(100px,15vw,140px)',
        background: '#FBF8F3',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* クラフト紙の縁飾り（上） */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 18,
          background:
            'repeating-linear-gradient(-45deg, #F0E8D8 0px, #F0E8D8 9px, transparent 9px, transparent 18px)',
          opacity: 0.55,
        }}
      />

      <div
        style={{
          width: 'min(480px,92%)',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="rm-reveal" style={{ marginBottom: 40 }}>
          <p
            style={{
              fontSize: 13,
              color: '#bbb',
              letterSpacing: '0.14em',
              marginBottom: 18,
              fontWeight: 600,
            }}
          >
            ── まずは、ふらっと ──
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.5rem,5vw,2rem)',
              fontWeight: 900,
              color: 'var(--ink-900)',
              lineHeight: 1.4,
              marginBottom: 10,
            }}
          >
            体験してみませんか？
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.88rem,2.4vw,0.96rem)',
              color: 'var(--ink-600)',
              lineHeight: 1.75,
            }}
          >
            「うちの子に合うかな？」も、お気軽に。
          </p>
        </div>

        <div
          className="rm-reveal rm-d1"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 320,
            margin: '0 auto',
          }}
        >
          {/* プライマリCTA */}
          <Link
            href="/contact"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '18px 28px',
              background: 'linear-gradient(135deg, #34c6be, #58c3a2)',
              color: '#fff',
              borderRadius: 50,
              fontWeight: 900,
              textDecoration: 'none',
              fontSize: 'clamp(0.96rem,3vw,1.06rem)',
              boxShadow: '0 8px 28px rgba(52,198,190,0.32)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            🎒 スクール体験を申し込む
            <span
              style={{
                position: 'absolute',
                top: 7,
                right: 14,
                fontSize: 13,
                opacity: 0.55,
              }}
            >
              ✦
            </span>
          </Link>

          {/* LINE CTA */}
          <a
            href="https://lin.ee/wcsFK9A"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '16px 28px',
              background: '#fff',
              color: '#34c6be',
              border: '2.5px solid #34c6be',
              borderRadius: 50,
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: 'clamp(0.9rem,2.8vw,1rem)',
              boxShadow: '0 4px 16px rgba(52,198,190,0.1)',
            }}
          >
            💬 LINEで気軽に質問する
          </a>
        </div>
      </div>
    </section>
  );
}

export default RoadmapClient;
