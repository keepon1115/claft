'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

const programs = [
  {
    id: 1,
    title: 'PBL(課題解決型学習)',
    label: '探究',
    description: '自分の好きや疑問を起点にテーマを決め、新たなモノを創ったり、解決策を考え、最後は動画やスライドで発表をする学びです。',
    icon: '🔍',
    color: '#f06a6a',
    link: '/pbl',
    rotate: '-2deg',
    delay: 0
  },
  {
    id: 2,
    title: 'Yononaka(対話ワーク)',
    label: '対話',
    description: 'お金や時間など、身近なテーマを入り口に、正解がひとつではない問いをみんなで話し合う学びです。考えを言葉にしてみる。ちがう意見を聞いてみる。その往復の中で、世界の見え方が少しずつ広がっていきます。',
    icon: '💬',
    color: '#34c6be',
    link: '/yononaka',
    rotate: '2deg',
    delay: 100
  },
  {
    id: 3,
    title: 'ミライクラフト',
    label: '実践',
    description: '作品発表会、イベント企画、商品制作などに挑戦。自分の好きや得意を活かしながら、仲間と試行錯誤し、「仕事」を実感する学びです。',
    icon: '⚡',
    color: '#ffd66b',
    link: '/futurecraft',
    rotate: '-1deg',
    delay: 200
  },
  {
    id: 4,
    title: 'ジブンクラフト',
    label: '自己理解',
    description: '探究・対話・実践を通して見えてきた「自分の強み(非認知能力)」を可視化します。キャリア面談を通して「自分は何をしたいか？どうありたいか？」を深堀りし、目標を定めて、ひとつひとつキャリアを自分の手でクラフト(創造)していきます。',
    icon: '✨',
    color: '#9b87f5',
    link: '/jibun-craft',
    rotate: '1deg',
    delay: 300
  }
];

export function ProgramsScrapbook() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.program-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'clamp(60px, 10vw, 100px) 0',
        background: `
          radial-gradient(circle at 10% 20%, rgba(255, 214, 107, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 90% 80%, rgba(52, 198, 190, 0.08) 0%, transparent 50%),
          #fbfefe
        `,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 紙のテクスチャ風背景 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0zm2 2h1v1H2V2z' fill='%23000' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          pointerEvents: 'none'
        }}
      />

      <div style={{ width: 'min(900px, 92%)', marginInline: 'auto', position: 'relative', zIndex: 1 }}>
        {/* 手書き風タイトル */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 80px)' }}>
          <h2 className="heading-xl"
            style={{
              marginBottom: '16px',
              position: 'relative',
              display: 'inline-block'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>CLAFTの学び</span>
            {/* 手書き風アンダーライン */}
            <svg
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '-10px',
                width: 'calc(100% + 20px)',
                height: '20px',
                zIndex: 0
              }}
              viewBox="0 0 300 20"
              preserveAspectRatio="none"
            >
              <path
                d="M5,15 Q80,12 150,13 T295,15"
                stroke="#ffd66b"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                style={{ opacity: 0.6 }}
              />
            </svg>
          </h2>
          <p className="lead"
            style={{
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            勉強ではなく、新たなモノをつくる「冒険」
          </p>
        </div>

        {/* スクラップブック風カード配置 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(30px, 5vw, 50px)',
            padding: '20px 0'
          }}
        >
          {programs.map((program) => (
            <Link
              key={program.id}
              href={program.link}
              className="program-card reveal"
              style={{
                display: 'block',
                textDecoration: 'none',
                transform: `rotate(${program.rotate})`,
                transitionDelay: `${program.delay}ms`,
                animationDelay: `${program.delay}ms`
              }}
            >
              <div
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: 'clamp(24px, 5vw, 36px)',
                  boxShadow: `
                    0 4px 6px rgba(0, 0, 0, 0.07),
                    0 10px 20px rgba(0, 0, 0, 0.05),
                    inset 0 0 0 1px rgba(0, 0, 0, 0.04)
                  `,
                  border: '2px dashed rgba(0, 0, 0, 0.08)',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `
                    0 12px 24px rgba(0, 0, 0, 0.12),
                    0 20px 40px rgba(0, 0, 0, 0.08),
                    inset 0 0 0 1px rgba(0, 0, 0, 0.04)
                  `;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = `
                    0 4px 6px rgba(0, 0, 0, 0.07),
                    0 10px 20px rgba(0, 0, 0, 0.05),
                    inset 0 0 0 1px rgba(0, 0, 0, 0.04)
                  `;
                }}
              >
                {/* 右上のラベル */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: program.color,
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: 'clamp(12px, 2.5vw, 14px)',
                    fontWeight: 'var(--font-bold)',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    zIndex: 2
                  }}
                >
                  {program.label}
                </div>

                {/* アイコン */}
                <div
                  style={{
                    fontSize: 'clamp(40px, 8vw, 56px)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  <span>{program.icon}</span>
                </div>

                {/* タイトル */}
                <h3 className="heading-md"
                  style={{
                    marginBottom: '12px',
                    position: 'relative',
                    zIndex: 1,
                    lineHeight: 'var(--leading-snug)'
                  }}
                >
                  {program.title}
                </h3>

                {/* 説明文 */}
                <p className="body-base"
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    lineHeight: 'var(--leading-relaxed)'
                  }}
                >
                  {program.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* メンバーのストーリーボタン */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(40px, 8vw, 60px)' }}>
          <Link 
            href="/student-story"
            className="btn btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 32px',
              fontSize: 'clamp(16px, 3vw, 18px)',
              fontWeight: 'var(--font-bold)',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #34c6be 0%, #2ba89e 100%)',
              color: '#fff',
              borderRadius: '50px',
              boxShadow: '0 4px 12px rgba(52, 198, 190, 0.3)',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(52, 198, 190, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(52, 198, 190, 0.3)';
            }}
          >
            メンバーのストーリー
            <span style={{ fontSize: '20px' }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

