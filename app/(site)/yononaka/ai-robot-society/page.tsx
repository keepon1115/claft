'use client';

import { useState, useRef, useEffect } from 'react';

// 身につく3つのチカラ データ
const powers = [
  {
    id: 1,
    num: '01',
    name: 'メタ認知',
    sub: '― 自分と時代を知る力 ―',
    desc: '変化が激しくて正解がない時代。まず「自分自身を知ること」が出発点。自己理解、仕事理解、時代の理解。この3つを俯瞰して、自分の立ち位置をつかむ力。',
    color: 'var(--air-teal)',
    cls: 'p1',
  },
  {
    id: 2,
    num: '02',
    name: '意見力',
    sub: '― 自分の軸で語る力 ―',
    desc: '正解がひとつではない問題に対して、自分なりの考えを持ち、それを言葉にして伝えていく力。「自分はこう思う」という判断軸を持つということ。',
    color: 'var(--air-orange)',
    cls: 'p2',
  },
  {
    id: 3,
    num: '03',
    name: '情報編集力',
    sub: '― 正解のない問いに挑む力 ―',
    desc: '情報があふれる時代に、必要な情報を自分ごととして取り入れ、知識・経験・技術を組み合わせて自分なりの表現にする。人生を切り拓いていく力。',
    color: 'var(--air-purple)',
    cls: 'p3',
  },
];

// アコーディオンアイテム（身につく3つのチカラ）
function PowerAccordion({
  power,
  isOpen,
  onToggle,
}: {
  power: (typeof powers)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) setHeight(bodyRef.current.scrollHeight);
  }, []);

  return (
    <div className={`power-card ${power.cls}`}>
      <div className="power-num">{power.num}</div>
      <button className="power-header" onClick={onToggle} aria-expanded={isOpen}>
        <div>
          <div className="power-name">{power.name}</div>
          <div className="power-sub">{power.sub}</div>
        </div>
        <span
          className="power-toggle"
          style={{
            background: isOpen ? power.color : 'rgba(0,0,0,0.06)',
            color: isOpen ? '#fff' : 'var(--air-text-light)',
          }}
        >
          {isOpen ? '閉じる' : '詳細'}
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
          >
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </span>
      </button>
      <div
        className="power-body"
        style={{ height: isOpen ? height : 0, overflow: 'hidden', transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)' }}
      >
        <div ref={bodyRef} className="power-desc">{power.desc}</div>
      </div>
    </div>
  );
}

export default function AIRobotSocietyPage() {
  const [openPower, setOpenPower] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll(
      '.airbt .fade-up, .airbt .fade-left, .airbt .fade-right, .airbt .scale-in'
    ).forEach((el) => observer.observe(el));

    const handleAnchorClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    const anchors = document.querySelectorAll('.airbt a[href^="#"]');
    anchors.forEach((a) => a.addEventListener('click', handleAnchorClick));

    return () => {
      observer.disconnect();
      anchors.forEach((a) => a.removeEventListener('click', handleAnchorClick));
    };
  }, []);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap" />

      <style jsx global>{`
        .airbt {
          --air-teal: #00A896;
          --air-teal-dark: #028090;
          --air-teal-deeper: #026670;
          --air-teal-light: #E0F7F4;
          --air-teal-glow: #00BFA6;
          --air-cream: #FFF8F0;
          --air-pink: #F4A5AE;
          --air-pink-light: #FFF0F3;
          --air-pink-accent: #E8788A;
          --air-navy: #1A2332;
          --air-navy-light: #2D3E50;
          --air-text: #2D3748;
          --air-text-light: #718096;
          --air-orange: #F6AD55;
          --air-purple: #9F7AEA;
          background: var(--air-cream);
          line-height: 1.8;
          overflow-x: hidden;
        }

        .airbt .air-container { max-width: 100%; margin: 0 auto; padding: 0 20px; }

        .airbt .section-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.78rem; font-weight: 700; color: var(--air-teal);
          letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 12px;
        }
        .airbt .section-label::before {
          content: ''; display: block; width: 20px; height: 2px; background: var(--air-teal);
        }
        .airbt .section-title {
          font-size: clamp(1.4rem, 5vw, 2rem); font-weight: 900;
          line-height: 1.4; margin-bottom: 16px; color: var(--air-navy);
        }
        .airbt .section-subtitle { font-size: 0.9rem; color: var(--air-text-light); line-height: 1.8; }

        /* ANIMATIONS */
        .airbt .fade-up {
          opacity: 0; transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .airbt .fade-up.visible { opacity: 1; transform: translateY(0); }
        .airbt .scale-in {
          opacity: 0; transform: scale(0.9);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .airbt .scale-in.visible { opacity: 1; transform: scale(1); }
        .airbt .delay-1 { transition-delay: 0.1s; }
        .airbt .delay-2 { transition-delay: 0.2s; }
        .airbt .delay-3 { transition-delay: 0.3s; }
        .airbt .delay-4 { transition-delay: 0.4s; }

        /* ── HERO ── */
        .airbt .air-hero {
          position: relative;
          background: linear-gradient(135deg, var(--air-navy) 0%, var(--air-navy-light) 50%, var(--air-teal-deeper) 100%);
          overflow: hidden; padding: 64px 0 80px;
        }
        .airbt .air-hero::before {
          content: ''; position: absolute; top: -50%; right: -30%;
          width: 80vw; height: 80vw;
          background: radial-gradient(circle, rgba(0,191,166,0.15) 0%, transparent 70%);
          border-radius: 50%; animation: airPulse 8s ease-in-out infinite;
        }
        .airbt .air-hero::after {
          content: ''; position: absolute; bottom: -20%; left: -20%;
          width: 60vw; height: 60vw;
          background: radial-gradient(circle, rgba(244,165,174,0.08) 0%, transparent 70%);
          border-radius: 50%; animation: airPulse 10s ease-in-out infinite reverse;
        }
        @keyframes airPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .airbt .hero-particles { position: absolute; inset: 0; overflow: hidden; }
        .airbt .air-particle {
          position: absolute; width: 4px; height: 4px;
          background: var(--air-teal-glow); border-radius: 50%;
          opacity: 0; animation: airFloat 6s ease-in-out infinite;
        }
        .airbt .air-particle:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; }
        .airbt .air-particle:nth-child(2) { left: 30%; top: 60%; animation-delay: 1.5s; }
        .airbt .air-particle:nth-child(3) { left: 70%; top: 30%; animation-delay: 3s; }
        .airbt .air-particle:nth-child(4) { left: 85%; top: 70%; animation-delay: 0.8s; }
        .airbt .air-particle:nth-child(5) { left: 50%; top: 85%; animation-delay: 2.2s; }
        .airbt .air-particle:nth-child(6) { left: 20%; top: 75%; animation-delay: 4s; }
        @keyframes airFloat {
          0%   { opacity: 0; transform: translateY(20px) scale(0); }
          20%  { opacity: 0.8; transform: translateY(0) scale(1); }
          80%  { opacity: 0.8; transform: translateY(-40px) scale(1); }
          100% { opacity: 0; transform: translateY(-60px) scale(0); }
        }
        .airbt .hero-content { position: relative; z-index: 2; padding: 0 20px; width: 100%; }
        .airbt .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,191,166,0.15); border: 1px solid rgba(0,191,166,0.3);
          border-radius: 50px; padding: 6px 16px;
          font-size: 0.78rem; color: var(--air-teal-glow); font-weight: 700;
          margin-bottom: 24px; animation: airBadge 1s ease forwards; opacity: 0;
        }
        @keyframes airBadge {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .airbt .hero-badge::before {
          content: ''; width: 8px; height: 8px;
          background: var(--air-teal-glow); border-radius: 50%;
          animation: airBlink 2s infinite; flex-shrink: 0;
        }
        @keyframes airBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .airbt .hero-h1 {
          font-size: clamp(1.8rem, 7vw, 2.8rem); font-weight: 900;
          color: white; line-height: 1.3; margin-bottom: 20px;
          animation: airSlideUp 1s ease 0.3s forwards; opacity: 0;
        }
        .airbt .hero-h1 em {
          font-style: normal;
          background: linear-gradient(135deg, var(--air-teal-glow), var(--air-pink));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        @keyframes airSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .airbt .hero-sub {
          font-size: 0.95rem; color: rgba(255,255,255,0.7); margin-bottom: 32px;
          animation: airSlideUp 1s ease 0.5s forwards; opacity: 0;
        }
        .airbt .hero-cta-group {
          display: flex; gap: 12px; flex-wrap: wrap;
          animation: airSlideUp 1s ease 0.7s forwards; opacity: 0;
        }
        .airbt .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--air-teal); color: white;
          padding: 12px 28px; border-radius: 50px;
          font-weight: 700; font-size: 0.95rem;
          text-decoration: none; transition: all 0.3s; border: none; cursor: pointer;
        }
        .airbt .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0,168,150,0.4); background: var(--air-teal-dark);
        }
        .airbt .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: rgba(255,255,255,0.8);
          padding: 12px 28px; border-radius: 50px;
          font-weight: 700; font-size: 0.95rem;
          text-decoration: none; border: 1px solid rgba(255,255,255,0.3); transition: all 0.3s;
        }
        .airbt .btn-secondary:hover {
          border-color: var(--air-teal-glow); color: var(--air-teal-glow); transform: translateY(-2px);
        }
        .airbt .hero-image-area {
          margin-top: 40px; border-radius: 16px; overflow: hidden; aspect-ratio: 16/9;
          background: linear-gradient(135deg, rgba(0,191,166,0.1), rgba(244,165,174,0.1));
          border: 1px dashed rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          animation: airSlideUp 1s ease 0.9s forwards; opacity: 0;
        }
        .airbt .hero-image-area .placeholder-text {
          color: rgba(255,255,255,0.3); font-size: 0.85rem; text-align: center;
        }

        /* ── WHY NOW ── */
        .airbt .section-why { padding: 72px 0 56px; background: #fff; position: relative; }
        .airbt .section-why::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, var(--air-teal), var(--air-pink), var(--air-orange));
        }
        /* 常に縦1列 */
        .airbt .why-grid { display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 40px; }
        .airbt .why-card {
          background: var(--air-cream); border-radius: 20px; padding: 28px;
          position: relative; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s;
        }
        .airbt .why-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.06); }
        .airbt .why-card::before {
          content: ''; position: absolute; top: 0; left: 0;
          width: 4px; height: 100%; background: var(--air-teal); border-radius: 0 4px 4px 0;
        }
        .airbt .why-card-icon {
          width: 52px; height: 52px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem; margin-bottom: 16px;
        }
        .airbt .why-card-icon.teal { background: var(--air-teal-light); }
        .airbt .why-card-icon.pink { background: var(--air-pink-light); }
        .airbt .why-card h3 {
          font-size: 1.05rem; font-weight: 900; margin-bottom: 12px;
          color: var(--air-navy); line-height: 1.5;
        }
        .airbt .why-card p { font-size: 0.88rem; color: var(--air-text-light); line-height: 1.9; }
        .airbt .why-card .highlight {
          background: linear-gradient(transparent 60%, rgba(0,168,150,0.15) 60%);
          font-weight: 700; color: var(--air-teal-dark);
        }
        /* 写真1枚：フル幅 */
        .airbt .why-photo {
          margin-top: 20px; border-radius: 12px; overflow: hidden;
          aspect-ratio: 16/9; position: relative;
          background: var(--air-teal-light);
          border: 1px dashed rgba(0,168,150,0.3);
        }
        .airbt .why-photo img { width: 100%; height: 100%; object-fit: cover; }
        .airbt .why-img-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          color: var(--air-teal); font-size: 0.8rem;
        }

        /* ── OVERVIEW ── */
        .airbt .section-overview { padding: 56px 0; background: var(--air-cream); }
        .airbt .overview-highlight-box {
          background: linear-gradient(135deg, var(--air-teal-dark), var(--air-teal));
          border-radius: 20px; padding: 28px; color: white;
          margin-bottom: 32px; position: relative; overflow: hidden;
        }
        .airbt .overview-highlight-box::after {
          content: ''; position: absolute; right: -30px; bottom: -30px;
          width: 100px; height: 100px; background: rgba(255,255,255,0.05); border-radius: 50%;
        }
        .airbt .overview-highlight-box p { font-size: 0.9rem; line-height: 2; position: relative; z-index: 1; }
        .airbt .overview-highlight-box strong { color: var(--air-orange); }
        .airbt .overview-stats {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 32px;
        }
        .airbt .stat-card {
          background: #fff; border-radius: 16px; padding: 18px 10px;
          text-align: center; border-top: 3px solid var(--air-teal); transition: transform 0.3s;
        }
        .airbt .stat-card:hover { transform: translateY(-4px); }
        .airbt .stat-label { font-size: 0.72rem; color: var(--air-text-light); margin-bottom: 8px; }
        .airbt .stat-value {
          font-family: 'Dela Gothic One', var(--font-zen), sans-serif;
          font-size: clamp(1rem, 4vw, 1.4rem); color: var(--air-teal); line-height: 1.4;
        }
        .airbt .flow-title { font-size: 1.05rem; font-weight: 900; margin-bottom: 16px; color: var(--air-navy); }

        /* 毎回の流れ：縦並び */
        .airbt .flow-list { display: flex; flex-direction: column; gap: 0; margin-top: 4px; }
        .airbt .flow-item {
          display: flex; align-items: center; gap: 14px;
          background: #fff; border-radius: 14px; padding: 14px 18px;
          transition: transform 0.3s;
        }
        .airbt .flow-item:hover { transform: translateX(4px); }
        .airbt .flow-item-num {
          width: 32px; height: 32px; flex-shrink: 0;
          background: var(--air-teal); color: white; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-size: 0.85rem;
        }
        .airbt .flow-item-title { font-weight: 700; font-size: 0.88rem; color: var(--air-navy); }
        .airbt .flow-item-desc { font-size: 0.72rem; color: var(--air-text-light); margin-top: 2px; }
        .airbt .flow-down { text-align: center; color: var(--air-teal); font-size: 1.1rem; padding: 4px 0; line-height: 1; }
        /* ×3セットグループ：②③④を囲む */
        .airbt .flow-repeat-group {
          border: 2px dashed var(--air-teal); border-radius: 16px;
          padding: 16px; position: relative;
          background: rgba(0,168,150,0.03);
          display: flex; flex-direction: column; gap: 0;
        }
        .airbt .flow-repeat-badge {
          position: absolute; top: -13px; right: 14px;
          background: var(--air-pink-accent); color: white;
          font-size: 0.75rem; font-weight: 700;
          padding: 4px 12px; border-radius: 20px;
          white-space: nowrap;
        }
        .airbt .flow-repeat-group .flow-item { border-radius: 12px; }
        .airbt .flow-inner-down { text-align: center; color: var(--air-teal); font-size: 0.95rem; padding: 3px 0; line-height: 1; }

        /* ── THEMES ── */
        .airbt .section-themes { padding: 56px 0; background: #fff; }
        .airbt .themes-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 32px; }
        .airbt .theme-card {
          background: var(--air-cream); border-radius: 18px; padding: 20px;
          display: flex; gap: 16px; align-items: flex-start; transition: all 0.3s;
        }
        .airbt .theme-card:hover { transform: translateX(6px); box-shadow: 0 6px 24px rgba(0,0,0,0.05); }
        .airbt .theme-num {
          flex: 0 0 auto; width: 42px; height: 42px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Dela Gothic One', var(--font-zen), sans-serif;
          font-size: 0.95rem; color: white;
        }
        .airbt .theme-num.t1, .airbt .theme-num.t6 { background: var(--air-teal); }
        .airbt .theme-num.t2 { background: var(--air-pink-accent); }
        .airbt .theme-num.t3 { background: var(--air-orange); }
        .airbt .theme-num.t4 { background: var(--air-purple); }
        .airbt .theme-num.t5 { background: var(--air-navy); }
        .airbt .theme-content { flex: 1; }
        .airbt .theme-title {
          font-size: 0.92rem; font-weight: 900; color: var(--air-navy);
          margin-bottom: 8px; line-height: 1.5;
        }
        .airbt .theme-question {
          display: flex; flex-direction: column; gap: 4px;
          background: rgba(0,168,150,0.08); border-radius: 10px;
          padding: 8px 12px; font-size: 0.8rem;
          color: var(--air-teal-dark); font-weight: 500; line-height: 1.6;
        }
        .airbt .theme-q-label {
          display: inline-block; background: var(--air-teal); color: white;
          font-size: 0.58rem; font-weight: 900;
          padding: 2px 7px; border-radius: 4px;
          width: fit-content; letter-spacing: 0.05em;
        }

        /* ── FEATURES ── */
        .airbt .section-features {
          padding: 56px 0;
          background: linear-gradient(135deg, var(--air-navy) 0%, var(--air-teal-deeper) 100%);
          color: white; position: relative; overflow: hidden;
        }
        .airbt .section-features::before {
          content: ''; position: absolute; top: 0; right: 0; width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(0,191,166,0.1) 0%, transparent 70%);
          border-radius: 50%;
        }
        .airbt .section-features .section-label { color: var(--air-teal-glow); }
        .airbt .section-features .section-label::before { background: var(--air-teal-glow); }
        .airbt .section-features .section-title { color: white; }
        .airbt .section-features .section-subtitle { color: rgba(255,255,255,0.6); }
        /* 常に縦1列 */
        .airbt .feature-cards { display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 32px; }
        .airbt .feature-card {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px; padding: 28px;
          backdrop-filter: blur(10px); transition: all 0.3s;
        }
        .airbt .feature-card:hover {
          background: rgba(255,255,255,0.1); transform: translateY(-4px);
          border-color: rgba(0,191,166,0.3);
        }
        .airbt .feature-card-icon {
          width: 50px; height: 50px; border-radius: 14px;
          background: rgba(0,191,166,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem; margin-bottom: 16px;
        }
        .airbt .feature-card h3 { font-size: 1.05rem; font-weight: 900; margin-bottom: 12px; color: white; line-height: 1.5; }
        .airbt .feature-card p { font-size: 0.88rem; color: rgba(255,255,255,0.7); line-height: 1.9; }
        .airbt .feature-images { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 20px; }
        .airbt .feature-img-placeholder {
          aspect-ratio: 4/3; border-radius: 10px;
          background: rgba(255,255,255,0.05); border: 1px dashed rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.25); font-size: 0.7rem;
        }

        /* ── POWERS（アコーディオン）── */
        .airbt .section-powers { padding: 56px 0; background: var(--air-cream); }
        /* 常に縦1列 */
        .airbt .powers-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 32px; }
        .airbt .power-card {
          background: #fff; border-radius: 20px; padding: 24px 28px;
          position: relative; overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          transition: box-shadow 0.3s;
        }
        .airbt .power-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
        .airbt .power-card::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px;
        }
        .airbt .power-card.p1::before { background: var(--air-teal); }
        .airbt .power-card.p2::before { background: var(--air-orange); }
        .airbt .power-card.p3::before { background: var(--air-purple); }
        .airbt .power-num {
          font-family: 'Dela Gothic One', var(--font-zen), sans-serif;
          font-size: 2.5rem; opacity: 0.1; position: absolute; top: 12px; right: 18px;
          pointer-events: none;
        }
        .airbt .power-header {
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          background: none; border: none; width: 100%; text-align: left;
          cursor: pointer; padding: 0;
        }
        .airbt .power-name { font-size: 1.15rem; font-weight: 900; color: var(--air-navy); margin-bottom: 2px; }
        .airbt .power-sub { font-size: 0.75rem; color: var(--air-text-light); font-style: italic; }
        .airbt .power-toggle {
          display: flex; align-items: center; gap: 4px;
          padding: 6px 14px; border-radius: 20px;
          font-size: 0.78rem; font-weight: 700;
          transition: all 0.3s; flex-shrink: 0; white-space: nowrap;
        }
        .airbt .power-desc {
          font-size: 0.88rem; color: var(--air-text-light); line-height: 1.9;
          padding-top: 16px; border-top: 1px dashed rgba(0,0,0,0.08); margin-top: 16px;
        }

        /* ── PRICING ── */
        .airbt .section-pricing { padding: 56px 0; background: #fff; }
        .airbt .pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 32px; }
        .airbt .price-card {
          background: var(--air-cream); border-radius: 20px; padding: 22px 16px;
          text-align: center; position: relative; overflow: hidden;
          transition: all 0.3s; border: 2px solid transparent;
        }
        .airbt .price-card:hover { transform: translateY(-4px); }
        .airbt .price-card.recommended { border-color: var(--air-teal); background: var(--air-teal-light); }
        .airbt .price-card.recommended::after {
          content: 'おすすめ'; position: absolute; top: 16px; right: -28px;
          background: var(--air-teal); color: white;
          font-size: 0.62rem; font-weight: 700; padding: 4px 32px; transform: rotate(45deg);
        }
        .airbt .price-plan { font-size: 0.9rem; font-weight: 900; color: var(--air-navy); margin-bottom: 8px; }
        .airbt .price-amount {
          font-family: 'Dela Gothic One', var(--font-zen), sans-serif;
          font-size: 1.7rem; color: var(--air-teal); margin-bottom: 4px;
        }
        .airbt .price-amount span { font-size: 0.82rem; color: var(--air-text-light); font-family: inherit; }
        .airbt .price-detail { font-size: 0.75rem; color: var(--air-text-light); margin-bottom: 14px; line-height: 1.6; }
        .airbt .price-features { text-align: left; list-style: none; padding: 0; margin: 0; }
        .airbt .price-features li {
          padding: 6px 0; font-size: 0.78rem; color: var(--air-text);
          display: flex; align-items: center; gap: 8px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .airbt .price-features li::before { content: '✓'; color: var(--air-teal); font-weight: 900; font-size: 0.72rem; }
        .airbt .price-cta {
          display: block; width: 100%; margin-top: 16px; padding: 10px; border-radius: 50px;
          font-weight: 700; font-size: 0.85rem; text-align: center; text-decoration: none;
          transition: all 0.3s; cursor: pointer; border: none;
        }
        .airbt .price-cta.primary { background: var(--air-teal); color: white; }
        .airbt .price-cta.primary:hover {
          background: var(--air-teal-dark); transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,168,150,0.3);
        }
        .airbt .price-cta.outline { background: transparent; color: var(--air-teal); border: 2px solid var(--air-teal); }
        .airbt .price-cta.outline:hover { background: var(--air-teal); color: white; }

        /* ── CTA ── */
        .airbt .section-cta {
          padding: 64px 0;
          background: linear-gradient(135deg, var(--air-teal-dark) 0%, var(--air-teal) 50%, var(--air-teal-deeper) 100%);
          text-align: center; color: white; position: relative; overflow: hidden;
        }
        .airbt .cta-content { position: relative; z-index: 1; }
        .airbt .cta-emoji { font-size: 3rem; margin-bottom: 20px; }
        .airbt .section-cta h2 {
          font-size: clamp(1.3rem, 5vw, 1.9rem); font-weight: 900;
          margin-bottom: 16px; line-height: 1.4; color: white;
        }
        .airbt .section-cta p {
          font-size: 0.92rem; opacity: 0.85; margin: 0 auto 28px; line-height: 1.8; padding: 0 16px;
        }
        .airbt .cta-btn-big {
          display: inline-flex; align-items: center; gap: 10px;
          background: white; color: var(--air-teal-dark);
          padding: 14px 36px; border-radius: 60px;
          font-weight: 900; font-size: 1rem; text-decoration: none;
          transition: all 0.3s; border: none; cursor: pointer;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }
        .airbt .cta-btn-big:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 40px rgba(0,0,0,0.25);
        }
      `}</style>

      <div className="airbt">

        {/* ── HERO ── */}
        <section className="air-hero">
          <div className="hero-particles" aria-hidden="true">
            <div className="air-particle" /><div className="air-particle" /><div className="air-particle" />
            <div className="air-particle" /><div className="air-particle" /><div className="air-particle" />
          </div>
          <div className="hero-content">
            <div className="hero-badge">🤖 Yononaka 新シリーズ</div>
            <h1 className="hero-h1">
              AIロボット社会、<br /><em>僕たちはどう生きるか</em>
            </h1>
            <p className="hero-sub">
              人間の「存在」「役割」「リテラシー」を考える<br />対話型ワーク ─ 全6回
            </p>
            <div className="hero-cta-group">
              <a href="#apply" className="btn-primary">申し込む →</a>
              <a href="#about" className="btn-secondary">詳しく見る ↓</a>
            </div>
            <div className="hero-image-area">
              <span className="placeholder-text">📷 ヒーロー画像をここに挿入</span>
            </div>
          </div>
        </section>

        {/* ── WHY NOW ── */}
        <section className="section-why" id="about">
          <div className="air-container">
            <div className="section-label fade-up">WHY NOW</div>
            <h2 className="section-title fade-up delay-1">なぜ今、<br />このワークをやるのか</h2>
            <p className="section-subtitle fade-up delay-2">
              AIが急速に進化する時代。知った上で動くか、知らずに過ごすか。<br />
              その差はこれからどんどん大きくなる。
            </p>

            {/* 縦1列 */}
            <div className="why-grid">
              <div className="why-card fade-up delay-2">
                <div className="why-card-icon teal">🤖</div>
                <h3>AIとロボットが、ものすごいスピードで進化している</h3>
                <p>
                  AIは世界的に急速に進化していて、日本は少子高齢化もあって、AIやロボットと一緒に働くのが
                  <span className="highlight">「当たり前」の時代</span>がもう来ている。<br /><br />
                  社会に出る前に、「AIに何ができて、人間は何をするのか」を自分の頭で考えておくことが大事になってくる。
                </p>
                {/* 写真1枚 */}
                <div className="why-photo">
                  <div className="why-img-placeholder">📷 写真をここに挿入</div>
                </div>
              </div>

              <div className="why-card fade-up delay-3">
                <div className="why-card-icon pink">🎓</div>
                <h3>AIはすでに「テストの点数」では人間を超えている</h3>
                <p>
                  2026年1月、ChatGPTが大学入学共通テストで<span className="highlight">9科目満点</span>を取った。
                  2023年には「受験生の平均くらい」だったのが、たった3年で満点に。
                  テストで測れる力では、もうAIが圧倒的に上。<br /><br />
                  <strong style={{ color: 'var(--air-teal-dark)' }}>
                    この事実を「知った上で動く」のと「知らずに過ごす」のとでは、これからの選択に大きな差が出る。だから今、一緒に考えよう。
                  </strong>
                </p>
                {/* 写真1枚 */}
                <div className="why-photo">
                  <div className="why-img-placeholder">📷 写真をここに挿入</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OVERVIEW ── */}
        <section className="section-overview" id="overview">
          <div className="air-container">
            <div className="section-label fade-up">WHAT WE DO</div>
            <h2 className="section-title fade-up delay-1">このワークでやること</h2>

            <div className="overview-highlight-box fade-up delay-2">
              <p>
                <strong>「正解のない問い」</strong>に対してみんなで意見を出し合い、視点を広げる対話型ワーク。<br />
                通常のYononakaのように、1人1人思ったこと、感じたことを話していきます。<br />
                全6回を通して、AIロボット社会に向けた<strong>「人間ならではの価値」</strong>を探究していきます。
              </p>
            </div>

            <div className="overview-stats fade-up delay-2">
              <div className="stat-card scale-in delay-1">
                <div className="stat-label">期間</div>
                <div className="stat-value">月1回<br />×6ヶ月</div>
              </div>
              <div className="stat-card scale-in delay-2">
                <div className="stat-label">場所</div>
                <div className="stat-value">オンライン</div>
              </div>
              <div className="stat-card scale-in delay-3">
                <div className="stat-label">時間</div>
                <div className="stat-value">1回<br />75分</div>
              </div>
            </div>

            <h3 className="flow-title fade-up">毎回の流れ</h3>

            {/* 縦並び・②③④が×3セット */}
            <div className="flow-list fade-up delay-1">

              {/* ① 導入（1回） */}
              <div className="flow-item">
                <div className="flow-item-num">1</div>
                <div>
                  <div className="flow-item-title">導入</div>
                  <div className="flow-item-desc">テーマを知る</div>
                </div>
              </div>

              <div className="flow-down">↓</div>

              {/* ②③④ ×3セット */}
              <div className="flow-repeat-group">
                <div className="flow-repeat-badge">②③④ を ×3セット！</div>

                <div className="flow-item">
                  <div className="flow-item-num">2</div>
                  <div>
                    <div className="flow-item-title">個人ワーク</div>
                    <div className="flow-item-desc">1分間考える</div>
                  </div>
                </div>

                <div className="flow-inner-down">↓</div>

                <div className="flow-item">
                  <div className="flow-item-num">3</div>
                  <div>
                    <div className="flow-item-title">グループ共有</div>
                    <div className="flow-item-desc">順番に共有</div>
                  </div>
                </div>

                <div className="flow-inner-down">↓</div>

                <div className="flow-item">
                  <div className="flow-item-num">4</div>
                  <div>
                    <div className="flow-item-title">全体共有</div>
                    <div className="flow-item-desc">視野を広げる</div>
                  </div>
                </div>
              </div>

              <div className="flow-down">↓</div>

              {/* ⑤ 振り返り（1回） */}
              <div className="flow-item">
                <div className="flow-item-num">5</div>
                <div>
                  <div className="flow-item-title">振り返り</div>
                  <div className="flow-item-desc">気づきを記録</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 6 THEMES ── */}
        <section className="section-themes" id="themes">
          <div className="air-container">
            <div className="section-label fade-up">6 THEMES</div>
            <h2 className="section-title fade-up delay-1">全6回のテーマ</h2>
            <p className="section-subtitle fade-up delay-2">正解はない。大事なのは「自分の意見を持つこと」。</p>

            <div className="themes-grid">
              {[
                { cls: 't1', title: 'AIと人間 ― 境界線はどこにある？', q: 'AIロボットでどこまで置き換えられる？' },
                { cls: 't2', title: '心のかたちを探しにいく', q: '最近あった良くなかった出来事を共有しよう' },
                { cls: 't3', title: 'からだ・運動について', q: '運動が得意な人ってどんな特徴がある？' },
                { cls: 't4', title: '自分ってほんとに1人？', q: '自分を何かに例えると・・？' },
                { cls: 't5', title: '情報リテラシーについて', q: '炎上や誹謗中傷が起きるのはどうしてだろう？' },
                { cls: 't6', title: '問いと編集 ― 僕たちはどう生きるか', q: 'AIロボット社会で、僕たちはどう生きる？' },
              ].map((theme, i) => (
                <div key={i} className={`theme-card fade-up delay-${(i % 2) + 1}`}>
                  <div className={`theme-num ${theme.cls}`}>{i + 1}</div>
                  <div className="theme-content">
                    <div className="theme-title">{theme.title}</div>
                    <div className="theme-question">
                      <span className="theme-q-label">お題例</span>
                      {theme.q}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="section-features" id="features">
          <div className="air-container">
            <div className="section-label fade-up">FEATURES</div>
            <h2 className="section-title fade-up delay-1">このワークの特長</h2>

            {/* 常に縦1列 */}
            <div className="feature-cards">
              <div className="feature-card fade-up delay-1">
                <div className="feature-card-icon">💬</div>
                <h3>参加者との対話で気づきや発見を得る学び</h3>
                <p>
                  先生の話を聞くだけの授業とは違い、「自分の頭で考えて、意見をつくって、話し合う。」
                  頭をフル回転させるので、集中できます。<br /><br />
                  気づきや発見を得られるかは「その人がどんな意識でこの時間を過ごすか？」によるので、
                  主体的に学ぶことができます。
                </p>
                <div className="feature-images">
                  <div className="feature-img-placeholder">📷</div>
                  <div className="feature-img-placeholder">📷</div>
                  <div className="feature-img-placeholder">📷</div>
                </div>
              </div>
              <div className="feature-card fade-up delay-2">
                <div className="feature-card-icon">🧠</div>
                <h3>AIとの比較で自分を知る</h3>
                <p>
                  AIにできること、人間にしかできないこと。その違いを考えることで、
                  「人間って何だろう？」が見えてくる。<br /><br />
                  それは、人によって見方考え方が異なるので、ほかの参加者と意見を交わすことで
                  「自分はこう考えるんだ」という自己理解にもつながる。
                </p>
                <div className="feature-images">
                  <div className="feature-img-placeholder">📷</div>
                  <div className="feature-img-placeholder">📷</div>
                  <div className="feature-img-placeholder">📷</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3 POWERS（アコーディオン）── */}
        <section className="section-powers" id="powers">
          <div className="air-container">
            <div className="section-label fade-up">3 POWERS</div>
            <h2 className="section-title fade-up delay-1">身につく3つのチカラ</h2>
            <p className="section-subtitle fade-up delay-2">
              AIが「正解の提示」や「情報処理」を担う時代に、<br />
              人間にしかできない思考と表現の力を育てます。
            </p>

            <div className="powers-grid">
              {powers.map((power) => (
                <div key={power.id} className="fade-up delay-1">
                  <PowerAccordion
                    power={power}
                    isOpen={openPower === power.id}
                    onToggle={() => setOpenPower(openPower === power.id ? null : power.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section className="section-pricing" id="pricing">
          <div className="air-container">
            <div className="section-label fade-up">PRICING</div>
            <h2 className="section-title fade-up delay-1">料金プラン</h2>
            <p className="section-subtitle fade-up delay-2">まずは1回体験からでもOK。</p>

            <div className="pricing-grid">
              <div className="price-card fade-up delay-1">
                <div className="price-plan">1回参加</div>
                <div className="price-amount">¥3,000<span>/回</span></div>
                <div className="price-detail">まずは体験してみたい方に</div>
                <ul className="price-features">
                  <li>75分のワーク参加</li>
                  <li>ワークシート付き</li>
                  <li>振り返りフィードバック</li>
                </ul>
                <a href="#apply" className="price-cta outline">申し込む</a>
              </div>
              <div className="price-card recommended fade-up delay-2">
                <div className="price-plan">6回パック</div>
                <div className="price-amount">¥15,000<span>/6回</span></div>
                <div className="price-detail">全テーマをじっくり探究</div>
                <ul className="price-features">
                  <li>全6回のワーク参加</li>
                  <li>ワークシート付き</li>
                  <li>振り返りフィードバック</li>
                  <li>修了レポート</li>
                </ul>
                <a href="#apply" className="price-cta primary">申し込む</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-cta" id="apply">
          <div className="air-container">
            <div className="cta-content fade-up">
              <div className="cta-emoji">⭐</div>
              <h2>AIにはできないことがある。<br />それは、「問いを立てること」。</h2>
              <p>
                「これってなんでだろう？」「自分はどう思う？」<br />
                そういう問いを持てるのは、人間だけ。<br /><br />
                このワークで、AI時代を自分の力で生き抜くための<br />
                「考え方の土台」を一緒につくっていこう。
              </p>
              <a href="https://forms.gle/xxxxx" className="cta-btn-big" target="_blank" rel="noopener noreferrer">
                ✉️ 申し込む
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
