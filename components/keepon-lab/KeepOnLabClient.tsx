'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FlowApply } from '@/components/FlowApply';
import { FAQ } from '@/components/FAQ';

// JetBrains Mono フォントをGoogle Fontsから追加
const jetbrainsMonoUrl = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap';

// ===== データ定義 =====

// メニュー項目
const menuItems = [
  { id: 'hero', label: 'TOP', icon: '🔬' },
  { id: 'programs', label: 'つくりたいもの', icon: '🎮' },
  { id: 'features', label: '特長', icon: '✨' },
  { id: 'access', label: 'アクセス', icon: '📍' },
  { id: 'apply', label: '入会の流れ', icon: '📝' },
  { id: 'faq', label: 'よくある質問', icon: '❓' },
];

// プログラムカード
const programs = [
  {
    id: 'minecraft',
    title: 'マイクラSDGs',
    description: 'マインクラフトで持続可能な世界を創造。ゲームを通じて社会課題を考える。',
    icon: '🎮',
    color: '#00e676',
    version: 'v2.1',
  },
  {
    id: 'robot',
    title: 'ロボットプログラミング',
    description: '自分だけのロボットを組み立て、プログラムで動かす。試行錯誤の連続！',
    icon: '🤖',
    color: '#ff9100',
    version: 'v1.5',
  },
  {
    id: 'digisoro',
    title: 'デジそろ',
    description: 'デジタルとそろばんの融合。計算力と集中力を同時に鍛える新しい学び。',
    icon: '🧮',
    color: '#00bcd4',
    version: 'v3.0',
  },
  {
    id: 'puzzle',
    title: '工作パズル',
    description: '手を動かして考える。立体パズルで空間認識力と創造力を育む。',
    icon: '🧩',
    color: '#e91e63',
    version: 'v1.2',
  },
];

// 特長
const features = [
  {
    id: 'pbl',
    num: '01',
    title: '「苦手克服」ではなく「得意を伸ばす」PBL',
    subtitle: '課題解決型学習',
    description:
      '自分の好きなことを見つけ、失敗を恐れずにチャレンジできる環境を提供する「自律」を重視しています。自分の好きや疑問を起点にテーマを決め、新たなモノを創ったり、解決策を考え、最後は動画やスライドで発表をする学びです。',
    color: '#00e676',
    icon: '🎯',
    link: '/pbl',
    linkText: 'PBLの詳細をみる',
  },
  {
    id: 'online',
    num: '02',
    title: 'オンライン学習教材を導入',
    subtitle: 'デジタルドリル',
    description:
      '小中学校の教科書内容を学べるデジタル教材で、個々のペースで基礎学力を固めます。動画を見るだけでなく、その場ですぐに問題演習が可能。解いた瞬間に正誤がわかり、解説が表示されます。主要科目（算数・数学、国語、理科、社会、英語）をカバーし、「さかのぼり学習」にも対応。出席扱い制度への活用実績も。',
    color: '#ff9100',
    icon: '💻',
    link: null,
    linkText: null,
    badges: ['即時フィードバック', 'さかのぼり学習', '出席扱い対応'],
  },
  {
    id: 'revision',
    num: '03',
    title: '「完成」ではなく「修正主義」',
    subtitle: '実験の繰り返し',
    description:
      '「大人も子供も、好奇心のままに」発表会の機会を豊富に準備。作品発表会、イベント企画、商品制作などに挑戦。自分の好きや得意を活かしながら、仲間と試行錯誤し、「仕事」を実感する学びです。',
    color: '#00bcd4',
    icon: '🔄',
    link: '/futurecraft',
    linkText: 'ミライクラフトの詳細をみる',
  },
  {
    id: 'environment',
    num: '04',
    title: '安心して自分の思うことを自由に話せる環境',
    subtitle: 'ファシリテーターがサポート',
    description:
      '先生ではなく、共に問いを立てる伴走者（ファシリテーター）がサポート。ステップアップ方式のカリキュラムをベースに、スクール生が自分のペースで学ぶことができる環境づくりに努めています。やりたいこと、できることは、1人1人違います。まずは子どもたちのやりたい気持ち、「好奇心」をつぶさないよう、見守り・サポートしています。',
    color: '#9b87f5',
    icon: '🤝',
    link: null,
    linkText: null,
    subSection: {
      title: 'オンラインで話せる場「Yononaka」',
      description:
        'お金や時間など、身近なテーマを入り口に、正解がひとつではない問いをみんなで話し合う学びです。考えを言葉にしてみる。ちがう意見を聞いてみる。その往復の中で、世界の見え方が少しずつ広がっていきます。',
      link: '/yononaka',
      linkText: 'Yononakaの詳細をみる',
    },
  },
];

// 修正主義チップ
const revisionChips = [
  '失敗は、データだ。',
  '完成より、改善。',
  '正解は、つくるもの。',
  'v0.1 から始めよう',
  'バグは学びの種',
  '今日のβ版が、明日のベストに。',
];

// ===== コンポーネント =====

export function KeepOnLabClient() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // JetBrains Mono フォントを読み込み
  useEffect(() => {
    const link = document.createElement('link');
    link.href = jetbrainsMonoUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // スクロール位置の検知
  useEffect(() => {
    const handleScroll = () => {
      // プログレスバー用
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // アクティブセクション検知
      const scrollPosition = window.scrollY + 200;

      for (const item of menuItems) {
        const element = sectionRefs.current[item.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // スムーススクロール
  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="keepon-lab">
      {/* カスタムスタイル */}
      <style jsx global>{`
        /* ===== SiteGridを上書き（キープオンラボ専用） ===== */
        .site-grid {
          display: block !important;
          width: 100% !important;
          max-width: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        .site-left,
        .site-right,
        .c-header,
        .c-footer,
        .fab {
          display: none !important;
        }
        .site-main {
          width: 100% !important;
          max-width: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        /* ===== キープオンラボ専用スタイル ===== */
        .keepon-lab {
          --lab-navy: #1a1f36;
          --lab-green: #00e676;
          --lab-orange: #ff9100;
          --lab-cyan: #00bcd4;
          --lab-purple: #9b87f5;
          --lab-pink: #e91e63;
          --lab-bg: #f8f9fa;
          --lab-grid: rgba(0, 230, 118, 0.08);
          --font-mono: 'JetBrains Mono', monospace;
          font-family: 'Noto Sans JP', sans-serif;
          min-height: 100vh;
          background: var(--lab-bg);
        }

        /* グリッド背景 */
        .lab-grid-bg {
          background-image:
            linear-gradient(var(--lab-grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--lab-grid) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center center;
        }

        /* トリムマーク（コーナーマーク）*/
        .trim-mark {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid var(--lab-green);
          opacity: 0.4;
        }
        .trim-mark.tl { top: 0; left: 0; border-right: none; border-bottom: none; }
        .trim-mark.tr { top: 0; right: 0; border-left: none; border-bottom: none; }
        .trim-mark.bl { bottom: 0; left: 0; border-right: none; border-top: none; }
        .trim-mark.br { bottom: 0; right: 0; border-left: none; border-top: none; }

        /* セクションラベル */
        .section-label {
          font-family: var(--font-mono), 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--lab-green);
          opacity: 0.6;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* グロー効果 */
        .glow-green {
          box-shadow: 0 0 20px rgba(0, 230, 118, 0.3);
        }

        /* パルスアニメーション */
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 230, 118, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 230, 118, 0.5); }
        }

        .pulse-cta {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        /* フロートアニメーション */
        @keyframes lab-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .lab-float {
          animation: lab-float 3s ease-in-out infinite;
        }

        /* スクロールインディケーター */
        @keyframes bounce-down {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        .bounce-down {
          animation: bounce-down 1.5s ease-in-out infinite;
        }

        /* ストローク描画アニメーション */
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }

        .draw-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw-line 2s ease forwards;
        }

        /* カードホバー */
        .lab-card {
          transition: all 0.3s ease;
        }
        .lab-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        /* 修正主義チップ */
        .revision-chip {
          display: inline-block;
          padding: 6px 14px;
          background: rgba(0, 230, 118, 0.1);
          border: 1px dashed var(--lab-green);
          border-radius: 20px;
          font-size: 13px;
          font-family: var(--font-mono), monospace;
          color: var(--lab-navy);
          transform: rotate(-2deg);
        }

        /* プログレスバー */
        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--lab-green), var(--lab-cyan));
          z-index: 1000;
          transition: width 0.1s ease;
        }

        /* サイドメニュー（PC） */
        .lab-sidebar {
          position: fixed;
          left: 0;
          top: 0;
          width: 240px;
          height: 100vh;
          background: #fff;
          border-right: 1px solid rgba(0, 0, 0, 0.06);
          padding: 24px 16px;
          z-index: 100;
          display: none;
        }

        @media (min-width: 1024px) {
          .lab-sidebar {
            display: flex;
            flex-direction: column;
          }
          .lab-main {
            margin-left: 240px;
          }
        }

        /* モバイルメニュー */
        .mobile-menu-btn {
          position: fixed;
          top: 16px;
          right: 16px;
          width: 48px;
          height: 48px;
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        @media (min-width: 1024px) {
          .mobile-menu-btn {
            display: none;
          }
        }

        .mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          width: 280px;
          height: 100vh;
          background: #fff;
          z-index: 300;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          padding: 24px 16px;
          box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
        }

        .mobile-drawer.open {
          transform: translateX(0);
        }

        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 250;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile-overlay.open {
          opacity: 1;
          visibility: visible;
        }

        /* セクションアニメーション */
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* 破線デコレーション */
        .dashed-line {
          border: none;
          height: 2px;
          background: repeating-linear-gradient(
            90deg,
            var(--lab-green) 0,
            var(--lab-green) 8px,
            transparent 8px,
            transparent 16px
          );
          opacity: 0.4;
        }
      `}</style>

      {/* プログレスバー */}
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* ===== サイドメニュー（PC）===== */}
      <aside className="lab-sidebar lab-grid-bg">
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '12px',
              color: 'var(--lab-green)',
              marginBottom: '4px',
            }}
          >
            KEEP_ON_LAB
          </div>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--lab-navy)',
              margin: 0,
            }}
          >
            キープオンラボ
          </h1>
          <p
            style={{
              fontSize: '12px',
              color: '#666',
              margin: '4px 0 0',
            }}
          >
            フリースクール
          </p>
        </div>

        {/* メニュー */}
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {menuItems.map((item) => (
              <li key={item.id} style={{ marginBottom: '4px' }}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    background: activeSection === item.id ? 'rgba(0, 230, 118, 0.1)' : 'transparent',
                    border: activeSection === item.id ? '1px solid rgba(0, 230, 118, 0.3)' : '1px solid transparent',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: activeSection === item.id ? 700 : 500,
                      color: activeSection === item.id ? 'var(--lab-navy)' : '#666',
                    }}
                  >
                    {item.label}
                  </span>
                  {activeSection === item.id && (
                    <span
                      style={{
                        marginLeft: 'auto',
                        width: '8px',
                        height: '8px',
                        background: 'var(--lab-green)',
                        borderRadius: '50%',
                      }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ロゴ */}
        <div
          style={{
            padding: '16px',
            background: 'rgba(0, 0, 0, 0.02)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <img
            src="/assets/images/common/logo.png"
            alt="CLAFT"
            style={{ height: '28px', opacity: 0.6 }}
          />
        </div>
      </aside>

      {/* ===== モバイルメニュー ===== */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="メニュー"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {isMenuOpen ? (
            <path d="M6 6l12 12M6 18L18 6" />
          ) : (
            <>
              <path d="M4 6h16M4 12h16M4 18h16" />
            </>
          )}
        </svg>
      </button>

      <div className={`mobile-overlay ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(false)} />
      <div className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`}>
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '12px',
              color: 'var(--lab-green)',
              marginBottom: '4px',
            }}
          >
            KEEP_ON_LAB
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--lab-navy)', margin: 0 }}>
            キープオンラボ
          </h1>
        </div>

        <nav>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {menuItems.map((item) => (
              <li key={item.id} style={{ marginBottom: '4px' }}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px',
                    background: activeSection === item.id ? 'rgba(0, 230, 118, 0.1)' : 'transparent',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: activeSection === item.id ? 700 : 500,
                      color: activeSection === item.id ? 'var(--lab-navy)' : '#666',
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ===== メインコンテンツ ===== */}
      <main className="lab-main">
        {/* ===== Hero Section ===== */}
        <section
          id="hero"
          ref={(el) => { sectionRefs.current['hero'] = el; }}
          className="lab-grid-bg"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            padding: '80px 24px',
            overflow: 'hidden',
          }}
        >
          {/* トリムマーク */}
          <div className="trim-mark tl" style={{ top: '40px', left: '40px' }} />
          <div className="trim-mark tr" style={{ top: '40px', right: '40px' }} />
          <div className="trim-mark bl" style={{ bottom: '40px', left: '40px' }} />
          <div className="trim-mark br" style={{ bottom: '40px', right: '40px' }} />

          {/* セクションラベル */}
          <div className="section-label" style={{ marginBottom: '24px' }}>
            SECTION_00 // HERO
          </div>

          {/* フローティング装飾 */}
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              fontSize: '48px',
              opacity: 0.6,
            }}
            className="lab-float"
          >
            🔬
          </div>
          <div
            style={{
              position: 'absolute',
              top: '30%',
              right: '15%',
              fontSize: '40px',
              opacity: 0.5,
            }}
            className="lab-float"
          >
            ⚗️
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '25%',
              left: '15%',
              fontSize: '36px',
              opacity: 0.4,
            }}
            className="lab-float"
          >
            💡
          </div>

          {/* メインコピー */}
          <div style={{ textAlign: 'center', maxWidth: '800px', position: 'relative', zIndex: 1 }}>
            {/* 修正チップ */}
            <div className="revision-chip" style={{ marginBottom: '24px' }}>
              β版の自分をアップデートしよう
            </div>

            <h1
              style={{
                fontSize: 'clamp(28px, 6vw, 48px)',
                fontWeight: 900,
                lineHeight: 1.3,
                color: 'var(--lab-navy)',
                marginBottom: '16px',
              }}
            >
              キミの『好き』を、<br />
              <span style={{ color: 'var(--lab-green)' }}>実験</span>しよう。
            </h1>

            <p
              style={{
                fontSize: 'clamp(18px, 3vw, 24px)',
                fontWeight: 500,
                color: '#666',
                marginBottom: '24px',
              }}
            >
              ここは、正解のない制作所。
            </p>

            <p
              style={{
                fontSize: 'clamp(14px, 2vw, 18px)',
                color: '#888',
                lineHeight: 1.8,
                marginBottom: '48px',
              }}
            >
              完成ではなく「修正」を繰り返す。<br />
              得意を伸ばすためのオンライン・ラボ。
            </p>

            {/* CTA ボタン */}
            <a
              href="https://lin.ee/wcsFK9A"
              target="_blank"
              rel="noopener noreferrer"
              className="pulse-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 36px',
                background: 'linear-gradient(135deg, var(--lab-green), #00c853)',
                color: '#fff',
                fontSize: '18px',
                fontWeight: 700,
                borderRadius: '50px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              🧪 ラボを覗いてみる
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* スクロールインジケーター */}
          <div
            className="bounce-down"
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '12px', color: '#999', fontFamily: 'var(--font-mono)' }}>
              ↓ Scroll to explore
            </span>
          </div>
        </section>

        {/* 破線セパレーター */}
        <hr className="dashed-line" style={{ margin: 0 }} />

        {/* ===== Programs Section ===== */}
        <section
          id="programs"
          ref={(el) => { sectionRefs.current['programs'] = el; }}
          style={{
            padding: '80px 24px',
            background: '#fff',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* セクションラベル */}
            <div className="section-label" style={{ marginBottom: '16px', textAlign: 'center' }}>
              SECTION_01 // PROGRAMS
            </div>

            <h2
              style={{
                fontSize: 'clamp(24px, 5vw, 36px)',
                fontWeight: 700,
                textAlign: 'center',
                color: 'var(--lab-navy)',
                marginBottom: '16px',
              }}
            >
              キミのつくりたいものがここにある！
            </h2>

            <p
              style={{
                textAlign: 'center',
                color: '#666',
                marginBottom: '48px',
                fontSize: '16px',
              }}
            >
              興味のあるプログラムを選んで、実験を始めよう
            </p>

            {/* カードグリッド */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {programs.map((program, index) => (
                <div
                  key={program.id}
                  className="lab-card"
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '28px',
                    border: '2px solid rgba(0, 0, 0, 0.06)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* バージョンラベル */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      padding: '4px 10px',
                      background: `${program.color}20`,
                      borderRadius: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: program.color,
                      fontWeight: 600,
                    }}
                  >
                    {program.version}
                  </div>

                  {/* 実験番号 */}
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: '#999',
                      marginBottom: '12px',
                    }}
                  >
                    EXP_{String(index + 1).padStart(2, '0')}
                  </div>

                  {/* アイコン */}
                  <div
                    style={{
                      fontSize: '48px',
                      marginBottom: '16px',
                    }}
                  >
                    {program.icon}
                  </div>

                  {/* タイトル */}
                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: 'var(--lab-navy)',
                      marginBottom: '12px',
                    }}
                  >
                    {program.title}
                  </h3>

                  {/* 説明 */}
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: 1.7,
                      marginBottom: '20px',
                    }}
                  >
                    {program.description}
                  </p>

                  {/* ホバーバー */}
                  <div
                    style={{
                      height: '4px',
                      background: `linear-gradient(90deg, ${program.color}, transparent)`,
                      borderRadius: '2px',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* 修正チップ散布 */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '12px',
                marginTop: '48px',
              }}
            >
              {revisionChips.slice(0, 3).map((chip, i) => (
                <span
                  key={i}
                  className="revision-chip"
                  style={{ transform: `rotate(${(i - 1) * 2}deg)` }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>

        <hr className="dashed-line" style={{ margin: 0 }} />

        {/* ===== Features Section ===== */}
        <section
          id="features"
          ref={(el) => { sectionRefs.current['features'] = el; }}
          className="lab-grid-bg"
          style={{
            padding: '80px 24px',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* セクションラベル */}
            <div className="section-label" style={{ marginBottom: '16px', textAlign: 'center' }}>
              SECTION_02 // FEATURES
            </div>

            <h2
              style={{
                fontSize: 'clamp(24px, 5vw, 36px)',
                fontWeight: 700,
                textAlign: 'center',
                color: 'var(--lab-navy)',
                marginBottom: '48px',
              }}
            >
              キープオンラボの特長
            </h2>

            {/* 特長カード */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {features.map((feature) => (
                <article
                  key={feature.id}
                  style={{
                    background: '#fff',
                    borderRadius: '24px',
                    padding: '32px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                    border: '2px solid rgba(0, 0, 0, 0.04)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* 番号装飾 */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-20px',
                      right: '20px',
                      fontSize: '100px',
                      fontWeight: 900,
                      fontFamily: 'var(--font-mono)',
                      color: `${feature.color}15`,
                      lineHeight: 1,
                    }}
                  >
                    {feature.num}
                  </div>

                  {/* ヘッダー */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                    <span
                      style={{
                        fontSize: '40px',
                        flexShrink: 0,
                      }}
                    >
                      {feature.icon}
                    </span>
                    <div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: feature.color,
                          fontWeight: 600,
                          marginBottom: '4px',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        FEATURE_{feature.num}
                      </div>
                      <h3
                        style={{
                          fontSize: 'clamp(18px, 4vw, 22px)',
                          fontWeight: 700,
                          color: 'var(--lab-navy)',
                          lineHeight: 1.4,
                          marginBottom: '4px',
                        }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '14px',
                          color: '#999',
                          fontWeight: 500,
                        }}
                      >
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* 説明 */}
                  <p
                    style={{
                      fontSize: '15px',
                      color: '#555',
                      lineHeight: 1.8,
                      marginBottom: feature.link || feature.badges || feature.subSection ? '20px' : 0,
                    }}
                  >
                    {feature.description}
                  </p>

                  {/* バッジ */}
                  {feature.badges && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                      {feature.badges.map((badge, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '6px 12px',
                            background: `${feature.color}15`,
                            borderRadius: '20px',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: feature.color,
                          }}
                        >
                          ✓ {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* サブセクション（Yononaka） */}
                  {feature.subSection && (
                    <div
                      style={{
                        padding: '20px',
                        background: `${feature.color}08`,
                        borderRadius: '16px',
                        borderLeft: `4px solid ${feature.color}`,
                        marginBottom: '20px',
                      }}
                    >
                      <h4
                        style={{
                          fontSize: '16px',
                          fontWeight: 700,
                          color: 'var(--lab-navy)',
                          marginBottom: '8px',
                        }}
                      >
                        💬 {feature.subSection.title}
                      </h4>
                      <p
                        style={{
                          fontSize: '14px',
                          color: '#666',
                          lineHeight: 1.7,
                          marginBottom: '16px',
                        }}
                      >
                        {feature.subSection.description}
                      </p>
                      <Link
                        href={feature.subSection.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '10px 20px',
                          background: feature.color,
                          color: '#fff',
                          borderRadius: '25px',
                          fontSize: '14px',
                          fontWeight: 600,
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {feature.subSection.linkText}
                        <span>→</span>
                      </Link>
                    </div>
                  )}

                  {/* リンクボタン */}
                  {feature.link && (
                    <Link
                      href={feature.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 24px',
                        background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                        color: '#fff',
                        borderRadius: '50px',
                        fontSize: '15px',
                        fontWeight: 600,
                        textDecoration: 'none',
                        boxShadow: `0 4px 12px ${feature.color}40`,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {feature.linkText}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </Link>
                  )}

                  {/* 底辺カラーバー */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${feature.color}, transparent)`,
                    }}
                  />
                </article>
              ))}
            </div>

            {/* 修正チップ */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '12px',
                marginTop: '48px',
              }}
            >
              {revisionChips.slice(3).map((chip, i) => (
                <span
                  key={i}
                  className="revision-chip"
                  style={{ transform: `rotate(${(i - 1) * 2}deg)` }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>

        <hr className="dashed-line" style={{ margin: 0 }} />

        {/* ===== Access Section ===== */}
        <section
          id="access"
          ref={(el) => { sectionRefs.current['access'] = el; }}
          style={{
            padding: '80px 24px',
            background: '#fff',
          }}
        >
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="section-label" style={{ marginBottom: '16px', textAlign: 'center' }}>
              SECTION_03 // ACCESS
            </div>

            <h2
              style={{
                fontSize: 'clamp(24px, 5vw, 36px)',
                fontWeight: 700,
                textAlign: 'center',
                color: 'var(--lab-navy)',
                marginBottom: '32px',
              }}
            >
              アクセス
            </h2>

            <div
              style={{
                background: '#f8f9fa',
                borderRadius: '24px',
                padding: '32px',
                textAlign: 'center',
                border: '2px dashed rgba(0, 230, 118, 0.3)',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📍</div>
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: 'var(--lab-navy)',
                  marginBottom: '16px',
                }}
              >
                キープオンラボ
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: 1.8,
                }}
              >
                〒581-0803<br />
                大阪府八尾市光町1-2<br />
                マイシン光町ビル4階
              </p>

              <a
                href="https://maps.google.com/?q=大阪府八尾市光町1-2"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '24px',
                  padding: '12px 24px',
                  background: '#fff',
                  border: '2px solid var(--lab-green)',
                  borderRadius: '50px',
                  color: 'var(--lab-green)',
                  fontSize: '15px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                Google Mapで見る
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <hr className="dashed-line" style={{ margin: 0 }} />

        {/* ===== 入会までの流れ Section ===== */}
        <div
          id="apply"
          ref={(el) => { sectionRefs.current['apply'] = el; }}
          style={{
            background: '#fff',
            padding: '40px 0',
          }}
        >
          <FlowApply />
        </div>

        <hr className="dashed-line" style={{ margin: 0 }} />

        {/* ===== よくある質問 Section ===== */}
        <div
          id="faq"
          ref={(el) => { sectionRefs.current['faq'] = el; }}
          style={{
            background: 'var(--lab-bg)',
            padding: '40px 0',
          }}
        >
          <FAQ />
        </div>

        {/* ===== Footer ===== */}
        <footer
          style={{
            padding: '40px 24px',
            background: 'var(--lab-navy)',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: 'var(--lab-green)',
                marginBottom: '8px',
              }}
            >
              KEEP_ON_LAB
            </div>
            <p style={{ fontSize: '16px', marginBottom: '24px', opacity: 0.8 }}>
              キープオンラボ — フリースクール
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '24px',
                marginBottom: '24px',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/"
                style={{
                  color: '#fff',
                  opacity: 0.7,
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                CLAFTトップへ
              </Link>
              <a
                href="https://lin.ee/wcsFK9A"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#fff',
                  opacity: 0.7,
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                お問い合わせ
              </a>
            </div>

            <p style={{ fontSize: '12px', opacity: 0.5 }}>
              © 2025 CLAFT / Keep On Lab. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

