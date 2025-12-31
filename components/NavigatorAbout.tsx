'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export function NavigatorAbout() {
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

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'clamp(60px, 10vw, 100px) 0',
        background: '#fbfefe',
        position: 'relative'
      }}
    >
      <div style={{ width: 'min(800px, 92%)', marginInline: 'auto' }}>
        {/* タイトル */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 60px)' }}>
          <h2 className="heading-lg"
            style={{
              marginBottom: '16px'
            }}
          >
            ナビゲーター
          </h2>
          <p className="lead">
            あなたの冒険を、一緒に歩む仲間
          </p>
        </div>

        {/* メインコンテンツ */}
        <div
          className="reveal"
          style={{
            background: '#fff',
            borderRadius: '28px',
            padding: 'clamp(32px, 6vw, 60px)',
            boxShadow: `
              0 8px 16px rgba(0, 0, 0, 0.06),
              0 20px 40px rgba(0, 0, 0, 0.04),
              inset 0 0 0 1px rgba(0, 0, 0, 0.03)
            `,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* 手書きメモの背景テクスチャ */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '300px',
              height: '300px',
              opacity: 0.04,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='30' font-family='cursive' font-size='14' fill='%23000' opacity='0.3'%3E未完成を、%3C/text%3E%3Ctext x='10' y='60' font-family='cursive' font-size='14' fill='%23000' opacity='0.3'%3E手づくりする%3C/text%3E%3Cpath d='M20,80 Q60,75 100,80' stroke='%23000' fill='none' opacity='0.2'/%3E%3Ccircle cx='150' cy='40' r='30' fill='none' stroke='%23000' opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              pointerEvents: 'none'
            }}
          />

          {/* コンテンツグリッド */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 'clamp(30px, 5vw, 40px)',
              position: 'relative',
              zIndex: 1
            }}
          >
            {/* 写真エリア（プレースホルダー） */}
            <div
              style={{
                aspectRatio: '16/9',
                borderRadius: '20px',
                background: `
                  linear-gradient(135deg, rgba(255, 214, 107, 0.15), rgba(52, 198, 190, 0.12)),
                  linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0),
                  linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0)
                `,
                backgroundSize: 'cover, 8px 8px, 8px 8px',
                backgroundPosition: 'center, 0 0, 4px 4px',
                boxShadow: 'inset 0 0 0 2px rgba(0, 0, 0, 0.06)',
                display: 'grid',
                placeItems: 'center',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* 物語性を感じさせるオーバーレイテキスト */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  border: '2px dashed rgba(0, 0, 0, 0.1)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                }}
              >
                <p className="body-sm"
                  style={{
                    margin: 0,
                    fontWeight: 'var(--font-semibold)'
                  }}
                >
                  📸 ナビゲーターの写真
                </p>
              </div>

              {/* 手書き風マインドマップのあしらい */}
              <svg
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  opacity: 0.15
                }}
                width="120"
                height="80"
                viewBox="0 0 120 80"
              >
                <circle cx="60" cy="40" r="8" fill="var(--brand)" />
                <line x1="60" y1="40" x2="30" y2="20" stroke="var(--brand)" strokeWidth="2" />
                <line x1="60" y1="40" x2="90" y2="20" stroke="var(--brand)" strokeWidth="2" />
                <line x1="60" y1="40" x2="30" y2="60" stroke="var(--brand)" strokeWidth="2" />
                <line x1="60" y1="40" x2="90" y2="60" stroke="var(--brand)" strokeWidth="2" />
                <circle cx="30" cy="20" r="5" fill="var(--green)" />
                <circle cx="90" cy="20" r="5" fill="var(--pink)" />
                <circle cx="30" cy="60" r="5" fill="var(--cream)" />
                <circle cx="90" cy="60" r="5" fill="var(--green)" />
              </svg>
            </div>

            {/* テキストエリア */}
            <div>
              <h3 className="heading-sm"
                style={{
                  marginBottom: '20px'
                }}
              >
                一緒に、未完成を楽しもう
              </h3>

              <div className="body-base"
                style={{
                  marginBottom: '24px'
                }}
              >
                <p style={{ marginBottom: '16px' }}>
                  CLAFTは、完璧を目指す場所ではありません。
                </p>
                <p style={{ marginBottom: '16px' }}>
                  試行錯誤しながら、自分だけの道を見つけていく——
                  <br />
                  そんな「未完成の美しさ」を大切にしています。
                </p>
                <p style={{ marginBottom: '16px' }}>
                  ナビゲーターは、答えを教える先生ではなく、
                  <br />
                  あなたの冒険に寄り添う<strong className="emphasis">仲間</strong>です。
                </p>
              </div>

              {/* 手書き風の囲みメッセージ */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(52, 198, 190, 0.08), rgba(255, 214, 107, 0.08))',
                  border: '2px solid rgba(52, 198, 190, 0.3)',
                  borderRadius: '16px',
                  padding: 'clamp(20px, 4vw, 28px)',
                  marginBottom: '28px',
                  position: 'relative'
                }}
              >
                {/* 手書き風のクリップ表現 */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '20px',
                    width: '40px',
                    height: '40px',
                    background: 'var(--cream)',
                    borderRadius: '50%',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '20px'
                  }}
                >
                  📌
                </div>

                <p className="body-lg"
                  style={{
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--brand)',
                    margin: 0
                  }}
                >
                  「正解がない」からこそ、<br />
                  あなただけの答えを見つけられる。
                </p>
              </div>

              {/* CTAボタン */}
              <Link
                href="/about"
                className="body-base"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 32px',
                  background: 'var(--brand)',
                  color: '#fff',
                  borderRadius: '999px',
                  fontWeight: 'var(--font-bold)',
                  textDecoration: 'none',
                  boxShadow: '0 8px 20px rgba(52, 198, 190, 0.3)',
                  transition: 'all 0.3s ease',
                  border: '3px solid rgba(255, 255, 255, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(52, 198, 190, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(52, 198, 190, 0.3)';
                }}
              >
                <span>もっと知る</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

