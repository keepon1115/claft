'use client';

import { MobileContainer, Section } from '@/components/MobileContainer';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FlowApply } from '@/components/FlowApply';
import { FAQ } from '@/components/FAQ';
import { Students } from '@/components/Students';

// コースカードコンポーネント
const CourseCard = ({
  title,
  description,
  target,
  price,
  color,
  icon,
  link,
  ageGroup,
  delay = 0,
  isVisible = false
}: {
  title: string;
  description: string;
  target: string;
  price: string;
  color: string;
  icon: string;
  link: string;
  ageGroup: string;
  delay?: number;
  isVisible?: boolean;
}) => (
  <div
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`
    }}
  >
    <div
      style={{
        background: 'var(--card)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(24px, 5vw, 32px)',
        boxShadow: 'var(--shadow)',
        border: `3px solid ${color}`,
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = `0 20px 40px rgba(31, 41, 55, 0.12)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow)';
      }}
    >
      {/* 対象年齢層バッジ */}
      <div
        style={{
          position: 'absolute',
          top: '-12px',
          left: '20px',
          background: color,
          color: 'white',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: 'clamp(12px, 2.5vw, 14px)',
          fontWeight: 'var(--font-bold)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}
      >
        {ageGroup}
      </div>

      {/* アイコン */}
      <div
        style={{
          fontSize: 'clamp(48px, 10vw, 64px)',
          marginTop: '20px',
          marginBottom: '16px'
        }}
      >
        {icon}
      </div>

      {/* タイトル */}
      <h3 className="heading-md" style={{ marginBottom: '12px', color: color }}>
        {title}
      </h3>

      {/* 説明 */}
      <p className="body-base" style={{ marginBottom: '24px', lineHeight: '1.7' }}>
        {description}
      </p>

      {/* 対象・料金 */}
      <div
        style={{
          background: 'var(--bg)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px'
        }}
      >
        <div style={{ marginBottom: '12px' }}>
          <span className="body-sm" style={{ color: 'var(--ink-600)' }}>
            対象
          </span>
          <p className="body-base emphasis" style={{ marginTop: '4px' }}>
            {target}
          </p>
        </div>
        <div>
          <span className="body-sm" style={{ color: 'var(--ink-600)' }}>
            月額料金
          </span>
          <p
            className="heading-md"
            style={{ marginTop: '4px', color: color, fontSize: 'clamp(20px, 4vw, 24px)' }}
          >
            {price}
          </p>
        </div>
      </div>

      {/* CTAボタン */}
      <Link
        href={link}
        className="btn btn-primary"
        style={{
          width: '100%',
          justifyContent: 'center',
          background: color,
          fontSize: 'clamp(14px, 3vw, 16px)',
          padding: 'clamp(12px, 3vw, 16px)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        詳しく見る →
      </Link>
    </div>
  </div>
);

export function CoursesClient() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);
  const cardsRef = useRef<HTMLDivElement>(null);

  // カードのアニメーション
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards([true, false, false]);
            setTimeout(() => setVisibleCards([true, true, false]), 200);
            setTimeout(() => setVisibleCards([true, true, true]), 400);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <MobileContainer>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }
        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* ========================================
          Hero Section
          ======================================== */}
      <Section>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            paddingTop: '40px',
            paddingBottom: '40px'
          }}
        >
          {/* 背景グラデーション */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(ellipse at 30% 20%, rgba(88, 195, 162, 0.12) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 80%, rgba(240, 106, 106, 0.12) 0%, transparent 50%)
              `,
              zIndex: -1
            }}
          />

          {/* 浮遊アイコン */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
            <div
              style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                fontSize: '32px',
                animation: 'float 3s ease-in-out infinite',
                opacity: 0.3
              }}
            >
              🎮
            </div>
            <div
              style={{
                position: 'absolute',
                top: '15%',
                right: '8%',
                fontSize: '28px',
                animation: 'float 3.5s ease-in-out 0.5s infinite',
                opacity: 0.3
              }}
            >
              🤖
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '20%',
                left: '10%',
                fontSize: '24px',
                animation: 'float 4s ease-in-out 1s infinite',
                opacity: 0.3
              }}
            >
              💡
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            {/* キャッチコピー */}
            <div
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, var(--brand) 0%, var(--green) 100%)',
                padding: '8px 20px',
                borderRadius: '20px',
                marginBottom: '20px',
                boxShadow: '0 4px 12px rgba(52, 198, 190, 0.25)'
              }}
            >
              <p
                className="body-lg emphasis"
                style={{ color: 'white', margin: 0, letterSpacing: '0.05em' }}
              >
                コース・料金
              </p>
            </div>

            <h1 className="heading-xl" style={{ marginBottom: '16px', animation: 'fadeInUp 0.8s ease-out' }}>
              未来を創る力を、
              <br />
              遊びから。
            </h1>

            <p
              className="body-lg"
              style={{
                color: 'var(--ink-700)',
                lineHeight: '1.7',
                maxWidth: '400px',
                margin: '0 auto',
                animation: 'fadeInUp 0.8s ease-out 0.2s',
                opacity: 0,
                animationFillMode: 'forwards'
              }}
            >
              興味に合わせて選べるコース
            </p>
          </div>
        </div>
      </Section>

      {/* ========================================
          Course Cards
          ======================================== */}
      <Section>
        <div ref={cardsRef} style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {/* カードA：マイクラSDGsコース */}
          <CourseCard
            title="マイクラSDGsコース"
            description="マイクラ×SDGs×プログラミングで、楽しみながら新たな価値を生み出そう！SDGsの目標を深く理解し、身近な問題として捉え、創造的な解決策を考え、実行する力を育みます。"
            target="小学3年生〜"
            price="¥7,700〜"
            color="var(--green)"
            icon="🎮"
            link="/minecraft"
            ageGroup="小学生・中学生向け"
            delay={0}
            isVisible={visibleCards[0]}
          />

          {/* カードB：ロボットプログラミングコース */}
          <CourseCard
            title="ロボットプログラミングコース"
            description="世界で採用されている、アーテックロボットを使った本格的なプログラミング学習。ブロックで遊びながらかたちを組み立て、プログラミングをして思い通りの動きを表現します。"
            target="小学3年生〜"
            price="¥7,700〜"
            color="var(--pink)"
            icon="🤖"
            link="https://www.keeponlearning.fun/online"
            ageGroup="小学生・中学生向け"
            delay={200}
            isVisible={visibleCards[1]}
          />

          {/* カードC：キャリアコース */}
          <CourseCard
            title="キャリアコース"
            description="クエスト・PBL・ジブンクラフトが含まれます。"
            target="中学生〜"
            price="¥7,700〜"
            color="var(--cream)"
            icon="✏️"
            link="/jibun-craft"
            ageGroup="中学生・高校生向け"
            delay={400}
            isVisible={visibleCards[2]}
          />
        </div>
      </Section>

      {/* トップページの入会までの流れ以降のセクション */}
      <FlowApply />
      <FAQ />
      <Students />
    </MobileContainer>
  );
}

