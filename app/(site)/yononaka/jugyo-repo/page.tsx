'use client';

import { useEffect } from 'react';

export default function JugyoRepoPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.ynrep .reveal').forEach((el) => observer.observe(el));

    const yearEl = document.getElementById('year-counter');
    let yearObserver: IntersectionObserver | null = null;
    if (yearEl) {
      yearObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              let current = 1900;
              const target = 1958;
              const step = () => {
                if (current < target) {
                  current += 2;
                  if (current > target) current = target;
                  (yearEl as HTMLElement).textContent = String(current);
                  requestAnimationFrame(step);
                }
              };
              step();
              yearObserver!.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      yearObserver.observe(yearEl);
    }

    return () => {
      observer.disconnect();
      yearObserver?.disconnect();
    };
  }, []);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700;800&family=Yusei+Magic&family=Noto+Sans+JP:wght@400;500;700&display=swap"
      />

      <style jsx global>{`
        .ynrep {
          --cream: #FFFBF2;
          --cream-deep: #FFF5E0;
          --ink: #2B2A28;
          --ink-soft: #6B6862;
          --ink-faint: #A8A49C;
          --teal: #2DD4BF;
          --teal-deep: #0F9E8A;
          --coral: #FB7185;
          --coral-deep: #E11D48;
          --amber: #FBBF24;
          --amber-deep: #D97706;
          --purple: #A78BFA;
          --purple-deep: #7C3AED;
          --blue: #60A5FA;
          --blue-deep: #2563EB;
          --green: #6EE7B7;
          --green-deep: #059669;
          --pink: #FBCFE8;
          --shadow-soft: 0 4px 16px rgba(43, 42, 40, 0.06);
          --shadow-pop: 0 6px 0 rgba(43, 42, 40, 0.08);
          font-family: 'Noto Sans JP', sans-serif;
          background: var(--cream);
          color: var(--ink);
          line-height: 1.85;
          font-size: 16px;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        .ynrep * { box-sizing: border-box; }

        .ynrep .wrap {
          max-width: 480px;
          margin: 0 auto;
          background: var(--cream);
          position: relative;
          padding-bottom: 80px;
        }

        .ynrep h1, .ynrep h2, .ynrep h3 {
          font-family: 'M PLUS Rounded 1c', sans-serif;
          line-height: 1.4;
          letter-spacing: 0.02em;
        }

        .ynrep .handwrite { font-family: 'Yusei Magic', sans-serif; }

        .ynrep .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ynrep .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── HERO ── */
        .ynrep .hero {
          padding: 32px 24px 24px;
          position: relative;
          overflow: hidden;
        }
        .ynrep .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--teal);
          color: white;
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 700;
          font-size: 12px;
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: 20px;
        }
        .ynrep .hero-tag .dot {
          width: 6px; height: 6px;
          background: white;
          border-radius: 50%;
          animation: ynrep-pulse 1.6s ease-in-out infinite;
        }
        @keyframes ynrep-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        .ynrep .hero h1 {
          font-size: 34px;
          font-weight: 800;
          line-height: 1.3;
          letter-spacing: 0;
          margin-bottom: 16px;
          position: relative;
        }
        .ynrep .hero h1 .accent-y {
          background: linear-gradient(transparent 60%, var(--amber) 60%);
          padding: 0 4px;
        }
        .ynrep .hero h1 .accent-c { color: var(--coral); }
        .ynrep .hero h1 .small {
          display: block;
          font-size: 18px;
          color: var(--ink-soft);
          margin-bottom: 8px;
          font-weight: 500;
        }

        .ynrep .hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .ynrep .hero-meta span {
          font-size: 12px;
          color: var(--ink-soft);
          background: white;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid #EFEAE0;
        }

        .ynrep .hero-deco {
          position: absolute;
          pointer-events: none;
        }
        .ynrep .hero-deco.s1 { top: 16px; right: 18px; font-size: 28px; animation: ynrep-float 4s ease-in-out infinite; }
        .ynrep .hero-deco.s2 { top: 60px; right: 60px; font-size: 18px; animation: ynrep-float 5s ease-in-out infinite 0.5s; }
        .ynrep .hero-deco.s3 { bottom: 24px; right: 24px; font-size: 22px; animation: ynrep-float 4.5s ease-in-out infinite 1s; }

        @keyframes ynrep-float {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }

        .ynrep .hero-lead {
          font-size: 15px;
          color: var(--ink-soft);
          line-height: 1.9;
        }
        .ynrep .hero-lead strong {
          background: linear-gradient(transparent 65%, var(--teal) 65%, var(--teal) 90%, transparent 90%);
          color: var(--ink);
          font-weight: 700;
          padding: 0 2px;
        }

        /* ── PHOTO PLACEHOLDERS ── */
        .ynrep .photo {
          margin: 28px 24px;
          aspect-ratio: 4/3;
          border: 2.5px dashed var(--teal);
          border-radius: 20px;
          background: #F4FBFA;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--teal-deep);
          position: relative;
          transition: transform 0.3s ease;
        }
        .ynrep .photo::before {
          content: "";
          width: 44px;
          height: 44px;
          background-color: var(--teal-deep);
          -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='currentColor' d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/></svg>") center/contain no-repeat;
          mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='currentColor' d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/></svg>") center/contain no-repeat;
          margin-bottom: 8px;
          opacity: 0.5;
        }
        .ynrep .photo .label {
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 4px;
        }
        .ynrep .photo .hint {
          font-size: 11px;
          color: var(--ink-faint);
          text-align: center;
          padding: 0 16px;
        }
        .ynrep .photo.coral { border-color: var(--coral); background: #FFF1F4; color: var(--coral-deep); }
        .ynrep .photo.coral::before { background-color: var(--coral-deep); }
        .ynrep .photo.amber { border-color: var(--amber-deep); background: #FFF7E5; color: var(--amber-deep); }
        .ynrep .photo.amber::before { background-color: var(--amber-deep); }
        .ynrep .photo.purple { border-color: var(--purple-deep); background: #F3EFFF; color: var(--purple-deep); }
        .ynrep .photo.purple::before { background-color: var(--purple-deep); }

        /* ── SECTIONS ── */
        .ynrep .section { padding: 24px 24px 12px; position: relative; }
        .ynrep .section-num {
          display: inline-block;
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 800;
          font-size: 13px;
          color: white;
          background: var(--ink);
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 12px;
          letter-spacing: 0.05em;
        }
        .ynrep .section h2 { font-size: 24px; font-weight: 800; margin-bottom: 14px; line-height: 1.4; }
        .ynrep .section h2 .pop {
          background: var(--amber);
          padding: 0 6px;
          border-radius: 4px;
          display: inline-block;
          transform: rotate(-1.5deg);
        }
        .ynrep .section p { font-size: 15px; color: var(--ink); margin-bottom: 14px; line-height: 1.95; }
        .ynrep .section p.muted { color: var(--ink-soft); font-size: 14px; }

        /* ── TAGS ── */
        .ynrep .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 20px 24px;
          padding: 24px 18px;
          background: white;
          border-radius: 24px;
          box-shadow: var(--shadow-soft);
          position: relative;
        }
        .ynrep .tags::before {
          content: "せーのっ！";
          position: absolute;
          top: -14px;
          left: 20px;
          background: var(--coral);
          color: white;
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 700;
          font-size: 13px;
          padding: 4px 12px;
          border-radius: 999px;
          transform: rotate(-3deg);
        }
        .ynrep .tag {
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 700;
          font-size: 14px;
          padding: 8px 14px;
          border-radius: 999px;
          color: white;
          animation: ynrep-tag-bounce 2s ease-in-out infinite;
        }
        .ynrep .tag:nth-child(1) { background: var(--teal); animation-delay: 0s; }
        .ynrep .tag:nth-child(2) { background: var(--coral); animation-delay: 0.2s; }
        .ynrep .tag:nth-child(3) { background: var(--amber); animation-delay: 0.4s; }
        .ynrep .tag:nth-child(4) { background: var(--purple); animation-delay: 0.6s; }
        .ynrep .tag:nth-child(5) { background: var(--blue); animation-delay: 0.8s; }
        .ynrep .tag:nth-child(6) { background: var(--green-deep); animation-delay: 1.0s; }
        .ynrep .tag:nth-child(7) { background: var(--coral); animation-delay: 1.2s; }
        @keyframes ynrep-tag-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        /* ── EXPLAINER ── */
        .ynrep .explainer {
          margin: 32px 24px;
          padding: 24px 22px 22px;
          background: white;
          border-radius: 24px;
          border: 2px dashed #E8DFC8;
          position: relative;
        }
        .ynrep .explainer-icon {
          position: absolute;
          top: -18px;
          left: 20px;
          width: 44px;
          height: 44px;
          background: var(--purple);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          box-shadow: 0 4px 0 rgba(124, 58, 237, 0.25);
        }
        .ynrep .explainer h3 {
          font-size: 17px;
          font-weight: 800;
          margin-top: 18px;
          margin-bottom: 12px;
          color: var(--purple-deep);
        }
        .ynrep .explainer p { font-size: 14px; line-height: 1.85; color: var(--ink); margin-bottom: 0; }
        .ynrep .explainer .rule {
          background: var(--cream-deep);
          padding: 10px 14px;
          border-radius: 12px;
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: var(--ink);
          margin: 12px 0;
          border-left: 4px solid var(--amber);
        }

        /* ── ODAI ── */
        .ynrep .odai {
          margin: 32px 24px 20px;
          padding: 22px 20px 18px;
          background: linear-gradient(180deg, var(--cream-deep) 0%, white 100%);
          border-radius: 24px;
          position: relative;
          border: 1px solid #F0E6CD;
        }
        .ynrep .odai-ribbon {
          display: inline-block;
          background: var(--ink);
          color: var(--amber);
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 800;
          font-size: 12px;
          padding: 5px 14px;
          border-radius: 999px;
          margin-bottom: 12px;
          letter-spacing: 0.08em;
        }
        .ynrep .odai h3 { font-size: 22px; font-weight: 800; line-height: 1.45; margin-bottom: 10px; }
        .ynrep .odai h3 .underline {
          background: linear-gradient(transparent 70%, var(--coral) 70%, var(--coral) 95%, transparent 95%);
          padding: 0 2px;
        }
        .ynrep .odai p { font-size: 14px; color: var(--ink-soft); line-height: 1.9; }

        /* ── TRIVIA ── */
        .ynrep .trivia {
          margin: 36px 24px 20px;
          padding: 28px 22px 22px;
          background: var(--ink);
          color: white;
          border-radius: 24px;
          position: relative;
          overflow: hidden;
        }
        .ynrep .trivia::before {
          content: "💡";
          position: absolute;
          top: -10px;
          right: -10px;
          font-size: 80px;
          opacity: 0.15;
          transform: rotate(15deg);
        }
        .ynrep .trivia .label {
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 700;
          font-size: 12px;
          color: var(--amber);
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }
        .ynrep .trivia h3 { font-size: 19px; font-weight: 800; margin-bottom: 16px; line-height: 1.5; }
        .ynrep .trivia .year {
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 800;
          font-size: 56px;
          color: var(--amber);
          line-height: 1;
          letter-spacing: -0.02em;
          display: block;
          margin: 8px 0 4px;
        }
        .ynrep .trivia .year-label { font-size: 13px; color: rgba(255,255,255,0.7); margin-bottom: 16px; }
        .ynrep .trivia p { font-size: 14px; line-height: 1.85; color: rgba(255,255,255,0.85); margin-bottom: 16px; }
        .ynrep .trivia .yt-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--coral);
          color: white;
          text-decoration: none;
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 700;
          font-size: 14px;
          padding: 12px 18px;
          border-radius: 999px;
          transition: transform 0.2s ease;
        }
        .ynrep .yt-link:hover { transform: scale(1.04); }
        .ynrep .yt-link::before { content: "▶"; font-size: 11px; }

        /* ── TIMELINE ── */
        .ynrep .timeline {
          margin: 28px 24px;
          padding: 22px 20px;
          background: white;
          border-radius: 20px;
          box-shadow: var(--shadow-soft);
        }
        .ynrep .timeline-title {
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 800;
          font-size: 14px;
          color: var(--ink-soft);
          margin-bottom: 16px;
        }
        .ynrep .timeline-list { list-style: none; padding: 0; margin: 0; }
        .ynrep .timeline-list li {
          position: relative;
          padding: 8px 0 8px 26px;
          font-size: 13px;
          line-height: 1.5;
        }
        .ynrep .timeline-list li::before {
          content: "";
          position: absolute;
          left: 6px;
          top: 14px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--teal);
        }
        .ynrep .timeline-list li:nth-child(2)::before { background: var(--amber); }
        .ynrep .timeline-list li:nth-child(3)::before { background: var(--coral); }
        .ynrep .timeline-list li:nth-child(4)::before { background: var(--purple); }
        .ynrep .timeline-list li:nth-child(5)::before { background: var(--blue); }
        .ynrep .timeline-list li::after {
          content: "";
          position: absolute;
          left: 9.5px;
          top: 22px;
          bottom: -2px;
          width: 1px;
          background: #E8E0CD;
        }
        .ynrep .timeline-list li:last-child::after { display: none; }
        .ynrep .timeline-list .era {
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: var(--ink);
        }
        .ynrep .timeline-list .desc { font-size: 12px; color: var(--ink-soft); }

        /* ── QUESTION ── */
        .ynrep .question { margin: 40px 24px; text-align: center; position: relative; }
        .ynrep .question .qmark {
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 800;
          font-size: 100px;
          color: var(--amber);
          line-height: 1;
          margin-bottom: -20px;
          opacity: 0.85;
        }
        .ynrep .question .lead {
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 800;
          font-size: 22px;
          line-height: 1.5;
          margin-bottom: 18px;
        }
        .ynrep .question .lead .hl {
          background: linear-gradient(transparent 60%, var(--coral) 60%, var(--coral) 90%, transparent 90%);
          padding: 0 4px;
        }
        .ynrep .question .subq { font-family: 'Yusei Magic', sans-serif; font-size: 16px; color: var(--ink-soft); margin: 8px 0; }

        /* ── IDEAS / BUBBLES ── */
        .ynrep .ideas { margin: 24px 24px; display: flex; flex-direction: column; gap: 14px; }
        .ynrep .bubble {
          padding: 14px 18px;
          border-radius: 18px;
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 700;
          font-size: 15px;
          line-height: 1.5;
          max-width: 80%;
          position: relative;
          align-self: flex-start;
        }
        .ynrep .bubble.r { align-self: flex-end; }
        .ynrep .bubble.b1 { background: var(--teal); color: white; }
        .ynrep .bubble.b2 { background: var(--coral); color: white; }
        .ynrep .bubble.b3 { background: var(--amber); color: var(--ink); }
        .ynrep .bubble.b4 { background: var(--purple); color: white; }
        .ynrep .bubble.b5 { background: white; color: var(--ink); border: 2px solid #E8E0CD; }
        .ynrep .bubble small {
          display: block;
          font-family: 'Noto Sans JP', sans-serif;
          font-weight: 400;
          font-size: 12px;
          opacity: 0.85;
          margin-top: 4px;
        }

        /* ── CLOSING ── */
        .ynrep .closing {
          margin: 40px 24px 0;
          padding: 28px 22px;
          background: white;
          border-radius: 24px;
          text-align: center;
          border: 2px solid var(--teal);
          position: relative;
        }
        .ynrep .closing::before {
          content: "📝";
          position: absolute;
          top: -22px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 4px 12px;
          font-size: 24px;
        }
        .ynrep .closing .label {
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 700;
          font-size: 12px;
          color: var(--teal-deep);
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }
        .ynrep .closing h3 { font-size: 20px; font-weight: 800; line-height: 1.5; margin-bottom: 12px; }
        .ynrep .closing p { font-size: 14px; color: var(--ink-soft); line-height: 1.9; }

        /* ── CTA SECTION ── */
        .ynrep .cta-section {
          margin: 48px 16px 0;
          padding: 28px 24px 32px;
          background: linear-gradient(180deg, #FFF7E5 0%, #FFF1F4 100%);
          border-radius: 28px;
          position: relative;
          overflow: hidden;
        }
        .ynrep .cta-section::before {
          content: "";
          position: absolute;
          top: -40px;
          right: -40px;
          width: 140px;
          height: 140px;
          background: var(--amber);
          border-radius: 50%;
          opacity: 0.25;
        }
        .ynrep .cta-section::after {
          content: "";
          position: absolute;
          bottom: -30px;
          left: -30px;
          width: 100px;
          height: 100px;
          background: var(--coral);
          border-radius: 50%;
          opacity: 0.2;
        }
        .ynrep .cta-label {
          position: relative;
          display: inline-block;
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 800;
          font-size: 13px;
          color: white;
          background: var(--coral);
          padding: 6px 16px;
          border-radius: 999px;
          margin-bottom: 14px;
          transform: rotate(-2deg);
        }
        .ynrep .cta-section h2 {
          position: relative;
          font-size: 26px;
          font-weight: 800;
          line-height: 1.4;
          margin-bottom: 18px;
        }
        .ynrep .cta-section h2 .em {
          background: var(--ink);
          color: var(--amber);
          padding: 2px 10px;
          border-radius: 8px;
          display: inline-block;
          margin: 4px 0;
        }
        .ynrep .cta-section .body {
          position: relative;
          font-size: 14.5px;
          color: var(--ink);
          line-height: 1.95;
          margin-bottom: 22px;
        }
        .ynrep .cta-section .body em {
          font-style: normal;
          font-weight: 700;
          background: linear-gradient(transparent 65%, var(--amber) 65%);
          padding: 0 2px;
        }
        .ynrep .cta-info {
          position: relative;
          background: white;
          border-radius: 18px;
          padding: 18px 20px;
          margin-bottom: 22px;
          box-shadow: var(--shadow-soft);
        }
        .ynrep .cta-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
          border-bottom: 1px dashed #EFE6CF;
          font-size: 14px;
        }
        .ynrep .cta-info-row:last-child { border-bottom: none; }
        .ynrep .cta-info-row .ic {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .ynrep .cta-info-row .ic.t { background: var(--teal); color: white; }
        .ynrep .cta-info-row .ic.p { background: var(--coral); color: white; }
        .ynrep .cta-info-row .ic.f { background: var(--amber); color: var(--ink); }
        .ynrep .cta-info-row .v { font-family: 'M PLUS Rounded 1c', sans-serif; font-weight: 700; font-size: 14px; }
        .ynrep .cta-info-row .k { font-size: 11px; color: var(--ink-soft); margin-bottom: 2px; }
        .ynrep .cta-button {
          position: relative;
          display: block;
          width: 100%;
          background: var(--ink);
          color: white;
          text-decoration: none;
          text-align: center;
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 800;
          font-size: 18px;
          padding: 20px;
          border-radius: 18px;
          box-shadow: 0 6px 0 rgba(43, 42, 40, 0.25);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          letter-spacing: 0.04em;
        }
        .ynrep .cta-button:active {
          transform: translateY(3px);
          box-shadow: 0 3px 0 rgba(43, 42, 40, 0.25);
        }
        .ynrep .cta-button .arrow { display: inline-block; margin-left: 6px; transition: transform 0.3s ease; }
        .ynrep .cta-button:hover .arrow { transform: translateX(4px); }
        .ynrep .cta-note { position: relative; font-size: 11.5px; color: var(--ink-soft); text-align: center; margin-top: 10px; }

        /* ── FOOTER ── */
        .ynrep .footer { margin: 48px 24px 0; padding-top: 28px; border-top: 1px solid #E8E0CD; text-align: center; }
        .ynrep .footer .logo {
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 800;
          font-size: 22px;
          margin-bottom: 4px;
          letter-spacing: 0.05em;
        }
        .ynrep .footer .logo .c1 { color: #E94B4B; }
        .ynrep .footer .logo .c2 { color: #F5C543; }
        .ynrep .footer .logo .c3 { color: #3C9DDA; }
        .ynrep .footer .logo .c4 { color: #7CC242; }
        .ynrep .footer .logo .c5 { color: #E94B4B; }
        .ynrep .footer .tagline { font-size: 12px; color: var(--ink-soft); margin-bottom: 18px; }
        .ynrep .footer .back {
          display: inline-block;
          font-size: 13px;
          color: var(--teal-deep);
          text-decoration: none;
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: 700;
          padding: 10px 20px;
          border: 1.5px solid var(--teal);
          border-radius: 999px;
        }

        .ynrep .divider { text-align: center; margin: 28px 0 12px; font-size: 18px; letter-spacing: 8px; color: var(--ink-faint); }

        @media (min-width: 481px) {
          .ynrep { padding: 24px 0; }
          .ynrep .wrap {
            box-shadow: 0 8px 40px rgba(43, 42, 40, 0.08);
            border-radius: 24px;
            overflow: hidden;
          }
        }
      `}</style>

      <div className="ynrep">
        <div className="wrap">

          {/* ── HERO ── */}
          <section className="hero">
            <span className="hero-deco s1">🎮</span>
            <span className="hero-deco s2">✨</span>
            <span className="hero-deco s3">💭</span>

            <span className="hero-tag"><span className="dot"></span>Yononaka レポート</span>

            <h1>
              <span className="small">ねぇ、考えてみたことある？</span>
              ゲームって、<br />
              なんで <span className="accent-y">おもしろい</span><span className="accent-c">？</span>
            </h1>

            <div className="hero-meta">
              <span>📅 4月開催</span>
              <span>🏠 キープオンラボ</span>
              <span>👥 小学生〜大人</span>
            </div>

            <p className="hero-lead">
              「正解、ぜったい言わなきゃ」が <strong>ない</strong> 場所で、<br />
              バラバラの "好き" を持ち寄って、<br />
              みんなで "夢中の正体" を考えた90分。
            </p>
          </section>

          {/* ── 01 OPENING ── */}
          <section className="section reveal">
            <span className="section-num">01｜OPENING</span>
            <h2>まずはみんなで <span className="pop">スマートボール</span></h2>
            <p>
              新しくなったキープオンラボ。<br />
              その日のはじまりは、いきなり対話じゃなくて、ゲーム。
            </p>
            <p className="muted">
              笑い声で教室がいっぱいになって、空気がほぐれていく。<br />
              ここからが、その日のスタートライン。
            </p>
          </section>

          <div className="photo reveal">
            <span className="label">写真 ①</span>
            <span className="hint">スマートボールで遊んでいる様子<br />笑い声があふれた瞬間</span>
          </div>

          {/* ── 02 ICE BREAK ── */}
          <section className="section reveal">
            <span className="section-num">02｜ICE BREAK</span>
            <h2>「好きなゲームは？」<br />みんなで一斉に、声出し。</h2>
            <p>
              Yononakaワークの最初は、いつもこのスタイル。<br />
              ひとりずつじゃなくて、せーので一斉に。<br />
              <span className="handwrite" style={{ color: 'var(--coral-deep)' }}>恥ずかしさが、ふっと、消える瞬間。</span>
            </p>
          </section>

          <div className="tags reveal">
            <span className="tag">ロブロックス</span>
            <span className="tag">スマブラ</span>
            <span className="tag">マリオカート</span>
            <span className="tag">フォートナイト</span>
            <span className="tag">マイクラ</span>
            <span className="tag">ポケモン</span>
            <span className="tag">スプラ</span>
          </div>

          <div className="photo coral reveal">
            <span className="label">写真 ②</span>
            <span className="hint">「好きなゲームは？」の声出しシーン<br />みんなの笑顔</span>
          </div>

          {/* ── YONONAKA 説明 ── */}
          <div className="explainer reveal">
            <div className="explainer-icon">💬</div>
            <h3>そもそも、Yononakaって？</h3>
            <div className="rule">
              ルールは、ひとつだけ。<br />
              "人を傷つけないことなら、何を言ってもOK"
            </div>
            <p>
              答えがひとつじゃない問いを、みんなでぐるぐる話す場所。<br />
              だから「わからない」も「なんとなく、こう思う」も、ぜんぶアリ。<br />
              初めての人にも、その日いちばん最初に、これを伝える。
            </p>
          </div>

          <div className="photo purple reveal">
            <span className="label">写真 ③</span>
            <span className="hint">Yononakaのルール説明シーン<br />初参加メンバーへの導入</span>
          </div>

          {/* ── お題 ① ── */}
          <div className="odai reveal">
            <span className="odai-ribbon">お 題 ①</span>
            <h3>
              みんなに知られてない、<br />
              <span className="underline">実はおもしろいゲーム。</span>
            </h3>
            <p>
              "ゲーム" って聞くと、つい画面のなかを思い浮かべる。<br />
              でも——カードゲーム、ボードゲーム、放課後の遊びだって、ゲームじゃない？<br />
              範囲をぐっと広げて、自分のとっておきを共有しあう。
            </p>
          </div>

          <div className="photo amber reveal">
            <span className="label">写真 ④</span>
            <span className="hint">「みんなが知らないけど面白いゲーム」<br />共有の様子</span>
          </div>

          {/* ── 03 TRIVIA ── */}
          <section className="section reveal">
            <span className="section-num">03｜TRIVIA</span>
            <h2>ところでさ、<br />世界で <span className="pop">最初の</span> コンピューターゲームって？</h2>
          </section>

          <div className="trivia reveal">
            <div className="label">— THE FIRST VIDEO GAME —</div>
            <h3>&quot;Tennis for Two&quot;</h3>
            <span className="year" id="year-counter">1958</span>
            <span className="year-label">年に、生まれました。</span>
            <p>
              作ったのは、大学とかの研究機関。<br />
              &quot;コンピューターって、人を楽しませることもできるんじゃない？&quot;{' '}
              そんな実験から、ぜんぶは始まった。
            </p>
            <a href="https://www.youtube.com/watch?v=6PG2mdU_i8k" target="_blank" rel="noopener noreferrer" className="yt-link">
              動画で見てみる
            </a>
          </div>

          <div className="timeline reveal">
            <div className="timeline-title">そこから、ゲームの "遊び方" は変わり続けてる</div>
            <ul className="timeline-list">
              <li>
                <div className="era">研究機関のなかで</div>
                <div className="desc">&quot;楽しませる&quot; が実験だった頃</div>
              </li>
              <li>
                <div className="era">ゲームセンター → 家庭用ゲーム機</div>
                <div className="desc">街と、お家が、遊び場に</div>
              </li>
              <li>
                <div className="era">インターネット接続</div>
                <div className="desc">遠くの誰かと、いっしょに遊べる</div>
              </li>
              <li>
                <div className="era">小型化・スマホ</div>
                <div className="desc">ポケットの中に、ゲーム機がある</div>
              </li>
              <li>
                <div className="era">AR / VR</div>
                <div className="desc">現実と、ゲームの境目がとけていく</div>
              </li>
            </ul>
          </div>

          <div className="photo reveal">
            <span className="label">写真 ⑤</span>
            <span className="hint">ゲームの歴史・進化の話をしている場面</span>
          </div>

          {/* ── 核心の問い ── */}
          <div className="question reveal">
            <div className="qmark">?</div>
            <p className="lead">
              でも、変わらないのは、ひとつ。<br />
              <span className="hl">ゲームは、人を夢中にさせる。</span>
            </p>
            <p className="subq">じゃあ、なんで？</p>
            <p className="subq">&quot;もっとやりたい！&quot; って、どんな時？</p>
            <p className="subq">夢中にさせる &quot;仕掛け&quot; って、何？</p>
          </div>

          {/* ── お題 ② ── */}
          <div className="odai reveal">
            <span className="odai-ribbon">お 題 ②</span>
            <h3>
              ゲームの仕掛けを使って、<br />
              <span className="underline">身近なモノを楽しくしよう。</span>
            </h3>
            <p>
              &quot;夢中にさせる&quot; の正体がちょっと見えてきたら、<br />
              今度はそれを、自分の生活のほうに引きこんでみる。<br />
              頭を切り替えて、身のまわりをぐるっと見渡してみると——
            </p>
          </div>

          <div className="ideas reveal">
            <div className="bubble b1">宿題、レベル制にする！<small>クリアでスキルツリー解放</small></div>
            <div className="bubble b2 r">買い物をスタンプラリー化<small>制限時間つき</small></div>
            <div className="bubble b3">歯みがきにコンボ数<small>連続日数で称号ゲット</small></div>
            <div className="bubble b4 r">通学路でポイント集め<small>見つけたモノで点数</small></div>
            <div className="bubble b5">…etc.</div>
          </div>

          <div className="photo coral reveal">
            <span className="label">写真 ⑥</span>
            <span className="hint">お題②でアイデアが飛び交っている様子</span>
          </div>

          {/* ── まとめ ── */}
          <div className="closing reveal">
            <div className="label">— つまり、Yononaka って —</div>
            <h3>楽しく、話す。<br />そのうえで、見え方が <span style={{ background: 'var(--amber)', padding: '0 4px' }}>広がる。</span></h3>
            <p>
              ゲームの話なのに、<br />
              気づけば自分の生活の話になってる。<br />
              ひとりじゃ思いつかなかった視点に、出会える。<br />
              それが、Yononakaのワークです。
            </p>
          </div>

          <div className="photo purple reveal">
            <span className="label">写真 ⑦</span>
            <span className="hint">ワークの締めくくりや集合写真</span>
          </div>

          <div className="divider">・ ・ ・</div>

          {/* ── 次回CTA ── */}
          <div className="cta-section reveal">
            <span className="cta-label">次回のYononaka</span>
            <h2>
              <span className="em">おしごと発見</span><br />
              ワークショップ
            </h2>
            <p className="body">
              「将来の夢は？」って聞かれて、すぐ答えられる人、実はあんまりいない。<br />
              それって、<em>世の中にどんな仕事があるか、まだ知らないだけ</em> かも。<br />
              <br />
              好きなことや得意なことが、思いもよらない仕事につながってたりする。<br />
              キャリアコンサルタントといっしょに、&quot;しごと&quot; の世界をのぞきにいくワーク。
            </p>

            <div className="cta-info">
              <div className="cta-info-row">
                <div className="ic t">📅</div>
                <div>
                  <div className="k">日時</div>
                  <div className="v">5/31(日) 10:15 〜 11:30</div>
                </div>
              </div>
              <div className="cta-info-row">
                <div className="ic p">📍</div>
                <div>
                  <div className="k">場所</div>
                  <div className="v">キープオンラボ <span style={{ fontWeight: 400, fontSize: '12px', color: 'var(--ink-soft)' }}>(アリオから徒歩3分)</span></div>
                </div>
              </div>
              <div className="cta-info-row">
                <div className="ic f">💸</div>
                <div>
                  <div className="k">参加費</div>
                  <div className="v">無料</div>
                </div>
              </div>
            </div>

            <a href="https://forms.gle/XQnH1wQpzWt7u87D7" target="_blank" rel="noopener noreferrer" className="cta-button">
              参加してみる<span className="arrow">→</span>
            </a>
            <p className="cta-note">※ Googleフォームから1分で申し込めます</p>
          </div>

          {/* ── フッター ── */}
          <footer className="footer">
            <div className="logo">
              <span className="c1">C</span><span className="c2">L</span><span className="c3">A</span><span className="c4">F</span><span className="c5">T</span>
            </div>
            <p className="tagline">— 自分の手で創るキャリア —</p>
            <a href="https://claft-hp.vercel.app/" className="back">CLAFTトップへ戻る</a>
          </footer>

        </div>
      </div>
    </>
  );
}
