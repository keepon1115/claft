'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export function EntranceDoors() {
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
        padding: 'clamp(60px, 10vw, 100px) 0 clamp(80px, 12vw, 120px)',
        background: `
          linear-gradient(180deg, #fbfefe 0%, rgba(52, 198, 190, 0.03) 100%)
        `,
        position: 'relative'
      }}
    >
      <div style={{ width: 'min(1000px, 92%)', marginInline: 'auto' }}>
        {/* 緑の矢印 */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 60px)' }}>
          <svg
            style={{
              margin: '0 auto',
              display: 'block',
              opacity: 0.6
            }}
            width="80"
            height="80"
            viewBox="0 0 80 80"
          >
            <path
              d="M40 10 Q38 30 40 50 T40 70 M25 50 Q32 58 40 70 Q48 58 55 50"
              stroke="var(--green)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 2つのドア */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(30px, 6vw, 60px)',
            maxWidth: '900px',
            margin: '0 auto'
          }}
        >
          {/* 左のドア：親子で参加 */}
          <Link
            href="/contact"
            className="reveal"
            style={{
              display: 'block',
              textDecoration: 'none',
              transitionDelay: '100ms'
            }}
          >
            <div
              style={{
                borderRadius: '24px',
                padding: 'clamp(36px, 6vw, 50px) clamp(28px, 5vw, 40px)',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: `
                  0 8px 16px rgba(0, 0, 0, 0.08),
                  0 20px 40px rgba(0, 0, 0, 0.06)
                `,
                border: '3px solid transparent',
                background: `
                  linear-gradient(#fff, #fff) padding-box,
                  linear-gradient(135deg, #ffd66b, #f06a6a) border-box
                `,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) rotate(-1deg)';
                e.currentTarget.style.boxShadow = `
                  0 16px 32px rgba(0, 0, 0, 0.12),
                  0 30px 60px rgba(255, 214, 107, 0.2)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
                e.currentTarget.style.boxShadow = `
                  0 8px 16px rgba(0, 0, 0, 0.08),
                  0 20px 40px rgba(0, 0, 0, 0.06)
                `;
              }}
            >
              {/* 背景装飾 */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '160px',
                  height: '160px',
                  background: 'radial-gradient(circle, rgba(255, 214, 107, 0.2), transparent 70%)',
                  borderRadius: '50%',
                  pointerEvents: 'none'
                }}
              />

              <div>
                {/* アイコン */}
                <div
                  style={{
                    fontSize: 'clamp(50px, 10vw, 70px)',
                    marginBottom: '24px',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  👨‍👩‍👧‍👦
                </div>

                {/* タイトル */}
                <h3 className="heading-md"
                  style={{
                    marginBottom: '16px',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  親子で参加
                </h3>

                <p className="subtitle"
                  style={{
                    marginBottom: '20px',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  Kids & Parents
                </p>

                {/* 説明文 */}
                <p className="body-base"
                  style={{
                    marginBottom: '28px',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  お子さまの可能性を広げたい保護者の方へ。
                  <br />
                  <strong className="emphasis">小学生・中学生・高校生</strong>が対象です。
                </p>
              </div>

              {/* 手書き風ボタン */}
              <div className="body-base"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '16px 28px',
                  background: 'linear-gradient(135deg, var(--cream), var(--pink))',
                  color: 'var(--ink-900)',
                  borderRadius: '16px',
                  fontWeight: 'var(--font-extrabold)',
                  alignSelf: 'flex-start',
                  boxShadow: '0 4px 12px rgba(255, 214, 107, 0.4)',
                  border: '2px dashed rgba(0, 0, 0, 0.15)',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <span>このドアを開く</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12 Q10 11 12 12 T19 12 M15 8 Q17 10 19 12 Q17 14 15 16"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* 右のドア：大人として参加 */}
          <Link
            href="/contact"
            className="reveal"
            style={{
              display: 'block',
              textDecoration: 'none',
              transitionDelay: '200ms'
            }}
          >
            <div
              style={{
                borderRadius: '24px',
                padding: 'clamp(36px, 6vw, 50px) clamp(28px, 5vw, 40px)',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: `
                  0 8px 16px rgba(0, 0, 0, 0.08),
                  0 20px 40px rgba(0, 0, 0, 0.06)
                `,
                border: '3px solid transparent',
                background: `
                  linear-gradient(#fff, #fff) padding-box,
                  linear-gradient(135deg, #34c6be, #58c3a2) border-box
                `,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) rotate(1deg)';
                e.currentTarget.style.boxShadow = `
                  0 16px 32px rgba(0, 0, 0, 0.12),
                  0 30px 60px rgba(52, 198, 190, 0.2)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
                e.currentTarget.style.boxShadow = `
                  0 8px 16px rgba(0, 0, 0, 0.08),
                  0 20px 40px rgba(0, 0, 0, 0.06)
                `;
              }}
            >
              {/* 背景装飾 */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  left: '-40px',
                  width: '160px',
                  height: '160px',
                  background: 'radial-gradient(circle, rgba(52, 198, 190, 0.2), transparent 70%)',
                  borderRadius: '50%',
                  pointerEvents: 'none'
                }}
              />

              <div>
                {/* アイコン */}
                <div
                  style={{
                    fontSize: 'clamp(50px, 10vw, 70px)',
                    marginBottom: '24px',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  🧭
                </div>

                {/* タイトル */}
                <h3 className="heading-md"
                  style={{
                    marginBottom: '16px',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  大人として参加
                </h3>

                <p className="subtitle"
                  style={{
                    marginBottom: '20px',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  Adults & Seekers
                </p>

                {/* 説明文 */}
                <p className="body-base"
                  style={{
                    marginBottom: '28px',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  自分のキャリアを自律的に築きたい方へ。
                  <br />
                  <strong className="emphasis">大学生・社会人</strong>が対象です。
                </p>
              </div>

              {/* 手書き風ボタン */}
              <div className="body-base"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '16px 28px',
                  background: 'linear-gradient(135deg, var(--brand), var(--green))',
                  color: '#fff',
                  borderRadius: '16px',
                  fontWeight: 'var(--font-extrabold)',
                  alignSelf: 'flex-start',
                  boxShadow: '0 4px 12px rgba(52, 198, 190, 0.4)',
                  border: '2px dashed rgba(255, 255, 255, 0.3)',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <span>このドアを開く</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12 Q10 11 12 12 T19 12 M15 8 Q17 10 19 12 Q17 14 15 16"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* 追加メッセージ */}
        <div
          className="reveal"
          style={{
            textAlign: 'center',
            marginTop: 'clamp(50px, 8vw, 70px)',
            transitionDelay: '300ms'
          }}
        >
          <p className="body-base"
            style={{
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            迷っている方も、お気軽にお問い合わせください。
            <br />
            一緒に、あなたに合った道を見つけましょう。
          </p>
        </div>
      </div>
    </section>
  );
}