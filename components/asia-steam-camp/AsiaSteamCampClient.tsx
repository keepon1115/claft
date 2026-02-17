'use client';

import { MobileContainer, Section } from '@/components/MobileContainer';
import { useEffect, useRef, useState } from 'react';

// 浮遊する国旗・アイコンコンポーネント
const FloatingElement = ({ 
  children, 
  delay = 0, 
  left = '10%', 
  top = '20%',
  duration = 3
}: { 
  children: React.ReactNode, 
  delay?: number, 
  left?: string, 
  top?: string,
  duration?: number 
}) => (
  <div style={{
    position: 'absolute',
    left,
    top,
    animation: `floatGently ${duration}s ease-in-out ${delay}s infinite`,
    fontSize: 'clamp(24px, 5vw, 40px)',
    zIndex: 0,
    pointerEvents: 'none'
  }}>
    {children}
  </div>
);

// パスポートスタンプコンポーネント
const PhaseStamp = ({
  phase,
  title,
  description,
  color,
  icon,
  rotate = 0,
  delay = 0,
  isVisible = false
}: {
  phase: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  rotate?: number;
  delay?: number;
  isVisible?: boolean;
}) => (
  <div 
    style={{
      background: 'var(--rail-cream)',
      border: `3px solid ${color}`,
      borderRadius: '16px',
      padding: 'clamp(20px, 4vw, 28px)',
      position: 'relative',
      transform: `rotate(${rotate}deg) scale(${isVisible ? 1 : 0.8})`,
      opacity: isVisible ? 1 : 0,
      transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}
  >
    {/* スタンプの縁取り（二重線） */}
    <div style={{
      position: 'absolute',
      inset: '4px',
      border: `2px dashed ${color}`,
      borderRadius: '12px',
      opacity: 0.4,
      pointerEvents: 'none'
    }} />
    
    {/* フェーズ番号バッジ */}
    <div style={{
      position: 'absolute',
      top: '-12px',
      left: '20px',
      background: color,
      color: 'white',
      padding: '4px 16px',
      borderRadius: '20px',
      fontSize: 'clamp(12px, 2.5vw, 14px)',
      fontWeight: 'var(--font-bold)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
    }}>
      Phase {phase}
    </div>
    
    <div style={{ 
      fontSize: 'clamp(36px, 8vw, 48px)', 
      marginBottom: '12px',
      marginTop: '8px'
    }}>
      {icon}
    </div>
    
    <h3 className="heading-sm" style={{ marginBottom: '8px', color: 'var(--ink-900)' }}>
      {title}
    </h3>
    
    <p className="body-base" style={{ color: 'var(--ink-700)', margin: 0 }}>
      {description}
    </p>
  </div>
);

// タイムラインアイテムコンポーネント
const TimelineItem = ({
  date,
  title,
  description,
  links,
  color,
  isLast = false,
  index = 0
}: {
  date: string;
  title: string;
  description?: string;
  links?: { label: string; url: string }[];
  color: string;
  isLast?: boolean;
  index?: number;
}) => (
  <div style={{
    display: 'flex',
    gap: 'clamp(16px, 4vw, 24px)',
    position: 'relative'
  }}>
    {/* タイムラインの線と点 */}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '24px',
      flexShrink: 0
    }}>
      {/* 点（切手風） */}
      <div style={{
        width: '24px',
        height: '24px',
        background: color,
        borderRadius: '4px',
        border: '2px solid white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: 1
      }}>
        ✈
      </div>
      {/* 線（飛行機ルート風点線） */}
      {!isLast && (
        <div style={{
          width: '2px',
          flex: 1,
          minHeight: '40px',
          background: `repeating-linear-gradient(to bottom, ${color} 0px, ${color} 4px, transparent 4px, transparent 8px)`
        }} />
      )}
    </div>
    
    {/* コンテンツ（切手風カード） */}
    <div style={{
      flex: 1,
      background: 'var(--rail-cream)',
      borderRadius: '12px',
      padding: 'clamp(16px, 3vw, 20px)',
      marginBottom: isLast ? 0 : '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      border: '1px solid rgba(0,0,0,0.06)',
      position: 'relative',
      transform: `translateX(${index % 2 === 0 ? '4px' : '-4px'}) rotate(${index % 2 === 0 ? '0.5deg' : '-0.5deg'})`
    }}>
      {/* 切手の穴（装飾） */}
      <div style={{
        position: 'absolute',
        top: '-4px',
        left: '20px',
        right: '20px',
        height: '8px',
        background: `repeating-linear-gradient(to right, transparent 0px, transparent 6px, var(--bg) 6px, var(--bg) 10px, transparent 10px, transparent 16px)`,
        pointerEvents: 'none'
      }} />
      
      <div style={{
        display: 'inline-block',
        background: color,
        color: 'white',
        padding: '2px 10px',
        borderRadius: '4px',
        fontSize: 'clamp(11px, 2.2vw, 13px)',
        fontWeight: 'var(--font-bold)',
        marginBottom: '8px'
      }}>
        {date}
      </div>
      
      <h4 className="heading-sm" style={{ 
        fontSize: 'clamp(14px, 3vw, 16px)',
        marginBottom: description || links ? '8px' : 0,
        lineHeight: '1.4'
      }}>
        {title}
      </h4>
      
      {description && (
        <p className="body-sm" style={{ 
          color: 'var(--ink-600)', 
          margin: 0,
          marginBottom: links ? '12px' : 0,
          lineHeight: '1.6'
        }}>
          {description}
        </p>
      )}
      
      {links && links.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {links.map((link, i) => (
            <a 
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--brand)',
                fontWeight: 'var(--font-bold)',
                fontSize: 'clamp(12px, 2.5vw, 14px)',
                textDecoration: 'none'
              }}
            >
              ▶ {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  </div>
);

export function AsiaSteamCampClient() {
  const [scrollY, setScrollY] = useState(0);
  const [visiblePhases, setVisiblePhases] = useState<boolean[]>([false, false, false, false]);
  const phasesRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // フェーズスタンプのアニメーション
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 順番にスタンプを表示
            setVisiblePhases([true, false, false, false]);
            setTimeout(() => setVisiblePhases([true, true, false, false]), 200);
            setTimeout(() => setVisiblePhases([true, true, true, false]), 400);
            setTimeout(() => setVisiblePhases([true, true, true, true]), 600);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (phasesRef.current) {
      observer.observe(phasesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // カードのスクロールアニメーション
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // フェーズの色定義
  const phaseColors = {
    phase1: '#10B981', // エメラルドグリーン
    phase2: '#F59E0B', // アンバー
    phase3: '#3B82F6',  // スカイブルー
    phase4: '#8B5CF6'  // パープル
  };

  return (
    <MobileContainer>
      <style jsx>{`
        @keyframes floatGently {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes planefly {
          0% { transform: translateX(-100px) translateY(20px) rotate(-5deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(calc(100% + 100px)) translateY(-20px) rotate(-5deg); opacity: 0; }
        }
        @keyframes stamp {
          0% { transform: scale(1.5) rotate(var(--rotate)); opacity: 0; }
          50% { transform: scale(0.95) rotate(var(--rotate)); }
          100% { transform: scale(1) rotate(var(--rotate)); opacity: 1; }
        }
        @keyframes bounce-char {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(2deg); }
        }
        .bounce-char {
          display: inline-block;
          animation: bounce-char 2s ease-in-out infinite;
        }
        .reveal-card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .reveal-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        @keyframes pulseArrow {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(5px); }
        }
        .pulse-arrow {
          display: inline-block;
          animation: pulseArrow 1.2s ease-in-out infinite;
        }
        .boarding-pass-link {
          display: block;
          text-decoration: none;
          color: inherit;
          transform: rotate(-1deg);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .boarding-pass-link:hover,
        .boarding-pass-link:active {
          transform: rotate(0deg) translateY(-3px) scale(1.02);
        }
        .boarding-pass-link:hover .bp-card,
        .boarding-pass-link:active .bp-card {
          box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);
        }
      `}</style>

      {/* ========================================
          ヒーローセクション：冒険の始まり
          ======================================== */}
      <Section>
        <div style={{ position: 'relative', overflow: 'hidden', paddingBottom: '40px' }}>
          {/* 方眼紙パターンの背景 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            opacity: 0.6,
            zIndex: -3,
            pointerEvents: 'none'
          }} />

          {/* 世界地図風のちぎり紙背景 */}
          <div style={{
            position: 'absolute',
            top: '-40px',
            left: '-5%',
            width: '110%',
            height: '300px',
            zIndex: -2,
            opacity: 0.15,
            pointerEvents: 'none'
          }}>
            <svg width="100%" height="100%" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none">
              <path 
                d="M0 25L40 20L80 30L120 18L160 28L200 22L240 32L280 20L320 26L360 18L400 30L440 22L480 28L520 20L560 32L600 24L640 30L680 20L720 28L760 22L800 30L840 18L880 26L920 22L960 32L1000 20L1040 28L1080 24L1120 30L1160 18L1200 26L1240 22L1280 30L1320 20L1360 28L1400 24L1440 30V100H0V25Z" 
                fill="#10B981" 
              />
            </svg>
          </div>
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '-5%',
            width: '95%',
            height: '250px',
            zIndex: -1,
            opacity: 0.12,
            pointerEvents: 'none'
          }}>
            <svg width="100%" height="100%" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none">
              <path 
                d="M0 35L50 28L100 38L150 25L200 35L250 30L300 40L350 28L400 35L450 25L500 38L550 30L600 35L650 25L700 40L750 28L800 35L850 30L900 38L950 25L1000 35L1050 28L1100 40L1150 30L1200 35L1250 25L1300 38L1350 28L1400 35L1440 30V100H0V35Z" 
                fill="#3B82F6" 
              />
            </svg>
          </div>

          {/* パララックス：飛行機 */}
          <div style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            width: '100%',
            height: '60px',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0
          }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              fontSize: '28px',
              animation: 'planefly 12s linear infinite',
              transform: `translateX(${scrollY * 0.3}px)`
            }}>
              ✈️
            </div>
          </div>

          {/* 浮遊する国旗 */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ transform: `translateY(${scrollY * 0.08}px)` }}>
              <FloatingElement delay={0} left="8%" top="5%" duration={4}>🇯🇵</FloatingElement>
              <FloatingElement delay={0.3} left="5%" top="65%" duration={3.8}>🌏</FloatingElement>
              <FloatingElement delay={1} left="90%" top="75%" duration={3}>🤖</FloatingElement>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 items-center" style={{ position: 'relative', zIndex: 1 }}>
            {/* タイトルラベル（スタンプ風） */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 28px)',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                border: '3px solid rgba(0,0,0,0.15)',
                fontWeight: 'var(--font-bold)',
                fontSize: 'clamp(16px, 4vw, 22px)',
                color: 'white',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                transform: 'rotate(-3deg)',
                boxShadow: '0 3px 8px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                letterSpacing: '0.03em'
              }} className="slide-in-left">
                🌏 STEAMキャンプ
              </div>
              
              <h1 style={{ 
                marginTop: '16px', 
                marginBottom: '8px',
                fontSize: 'clamp(16px, 4vw, 22px)',
                fontWeight: 'var(--font-bold)'
              }}>
                {['S', 'D', 'G', 's', '×', 'ロ', 'ボ', 'ッ', 'ト', 'プ', 'ロ', 'グ', 'ラ', 'ミ', 'ン', 'グ', 'で', '国', '際', '交', '流'].map((char, i) => (
                  <span key={i} className="bounce-char" style={{ animationDelay: `${i * 0.05}s` }}>
                    {char}
                  </span>
                ))}
              </h1>
              
              <p className="body-lg" style={{ 
                color: 'var(--ink-700)',
                lineHeight: '1.7',
                marginTop: '4px'
              }}>
                日本・バングラデシュ・マレーシアの3カ国の小中学生がオンラインで交流し、SDGs(持続可能な開発目標)という地球規模の課題に対して、ロボットとプログラミングで解決案を発表するプロジェクト。
              </p>
            </div>

            {/* ヒーロー画像（ポラロイド風） */}
            <div style={{
              transform: 'rotate(2deg)',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(2deg) scale(1)'}
            >
              <div style={{
                background: 'var(--rail-cream)',
                padding: '12px',
                paddingBottom: '40px',
                borderRadius: 'var(--radius)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                {/* マスキングテープ */}
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '25px',
                  width: '90px',
                  height: '35px',
                  background: '#10B981',
                  opacity: 0.75,
                  mixBlendMode: 'multiply',
                  transform: 'rotate(-8deg)',
                  clipPath: 'polygon(2% 0%, 5% 5%, 8% 2%, 12% 8%, 15% 3%, 18% 7%, 22% 4%, 25% 9%, 28% 5%, 32% 10%, 35% 6%, 38% 11%, 42% 7%, 45% 12%, 48% 8%, 52% 13%, 55% 9%, 58% 14%, 62% 10%, 65% 15%, 68% 11%, 72% 16%, 75% 12%, 78% 17%, 82% 13%, 85% 18%, 88% 14%, 92% 19%, 95% 15%, 98% 20%, 100% 25%, 98% 80%, 95% 85%, 92% 81%, 88% 86%, 85% 82%, 82% 87%, 78% 83%, 75% 88%, 72% 84%, 68% 89%, 65% 85%, 62% 90%, 58% 86%, 55% 91%, 52% 87%, 48% 92%, 45% 88%, 42% 93%, 38% 89%, 35% 94%, 32% 90%, 28% 95%, 25% 91%, 22% 96%, 18% 92%, 15% 97%, 12% 93%, 8% 98%, 5% 94%, 2% 100%, 0% 75%)',
                  pointerEvents: 'none'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '20px',
                  width: '70px',
                  height: '28px',
                  background: '#F59E0B',
                  opacity: 0.7,
                  mixBlendMode: 'multiply',
                  transform: 'rotate(5deg)',
                  clipPath: 'polygon(3% 5%, 6% 2%, 9% 6%, 13% 3%, 16% 7%, 19% 4%, 23% 8%, 26% 5%, 29% 9%, 33% 6%, 36% 10%, 39% 7%, 43% 11%, 46% 8%, 49% 12%, 53% 9%, 56% 13%, 59% 10%, 63% 14%, 66% 11%, 69% 15%, 73% 12%, 76% 16%, 79% 13%, 83% 17%, 86% 14%, 89% 18%, 93% 15%, 96% 19%, 100% 25%, 97% 75%, 94% 95%, 91% 92%, 87% 96%, 84% 93%, 81% 97%, 77% 94%, 74% 98%, 71% 95%, 67% 99%, 64% 96%, 61% 100%, 57% 97%, 54% 96%, 51% 92%, 47% 95%, 44% 91%, 41% 94%, 37% 90%, 34% 93%, 31% 89%, 27% 92%, 24% 88%, 21% 91%, 17% 87%, 14% 90%, 11% 86%, 7% 89%, 4% 85%, 0% 80%)',
                  pointerEvents: 'none'
                }} />
                
                {/* ヒーロー画像 */}
                <img
                  src="/assets/asia-steam-camp/hero.png"
                  alt="Asia STEAM Camp"
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '16/9',
                    borderRadius: '4px',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================
          ライブレポートバナー：搭乗券（ボーディングパス）風
          ======================================== */}
      <Section>
        <a
          href="https://note.com/yononaka_career/m/m3684b8fac7b5"
          target="_blank"
          rel="noopener noreferrer"
          className="boarding-pass-link"
        >
          <div className="bp-card" style={{
            background: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 50%, #FFEDD5 100%)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 3px 12px rgba(245, 158, 11, 0.2)',
            border: '2px solid rgba(245, 158, 11, 0.4)',
            display: 'flex',
            position: 'relative'
          }}>
            {/* マスキングテープ装飾 */}
            <div style={{
              position: 'absolute',
              top: '-8px',
              left: '15px',
              width: '70px',
              height: '26px',
              background: '#EF4444',
              opacity: 0.7,
              mixBlendMode: 'multiply',
              transform: 'rotate(-5deg)',
              clipPath: 'polygon(2% 0%, 5% 5%, 8% 2%, 12% 8%, 15% 3%, 18% 7%, 22% 4%, 25% 9%, 28% 5%, 32% 10%, 35% 6%, 38% 11%, 42% 7%, 45% 12%, 48% 8%, 52% 13%, 55% 9%, 58% 14%, 62% 10%, 65% 15%, 68% 11%, 72% 16%, 75% 12%, 78% 17%, 82% 13%, 85% 18%, 88% 14%, 92% 19%, 95% 15%, 98% 20%, 100% 25%, 98% 80%, 95% 85%, 92% 81%, 88% 86%, 85% 82%, 82% 87%, 78% 83%, 75% 88%, 72% 84%, 68% 89%, 65% 85%, 62% 90%, 58% 86%, 55% 91%, 52% 87%, 48% 92%, 45% 88%, 42% 93%, 38% 89%, 35% 94%, 32% 90%, 28% 95%, 25% 91%, 22% 96%, 18% 92%, 15% 97%, 12% 93%, 8% 98%, 5% 94%, 2% 100%, 0% 75%)',
              pointerEvents: 'none',
              zIndex: 2
            }} />

            {/* ミシン目（上） */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'repeating-linear-gradient(to right, transparent 0px, transparent 4px, rgba(245,158,11,0.4) 4px, rgba(245,158,11,0.4) 8px)',
              pointerEvents: 'none'
            }} />
            {/* ミシン目（下） */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'repeating-linear-gradient(to right, transparent 0px, transparent 4px, rgba(245,158,11,0.4) 4px, rgba(245,158,11,0.4) 8px)',
              pointerEvents: 'none'
            }} />

            {/* 左メインエリア */}
            <div style={{
              flex: 1,
              padding: 'clamp(18px, 4vw, 24px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              {/* BOARDING PASS ラベル */}
              <div style={{
                fontSize: 'clamp(9px, 2vw, 11px)',
                fontWeight: 'var(--font-bold)',
                color: '#D97706',
                letterSpacing: '0.15em'
              }}>
                ✈ BOARDING PASS
              </div>

              {/* メインテキスト */}
              <div style={{
                fontSize: 'clamp(16px, 4vw, 20px)',
                fontWeight: 'var(--font-bold)',
                color: '#92400E',
                lineHeight: '1.4'
              }}>
                📝 ライブレポートはこちら
              </div>

              {/* ルート表示 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: 'clamp(10px, 2.2vw, 12px)',
                color: '#B45309',
                marginTop: '2px'
              }}>
                <span style={{ fontWeight: 'var(--font-bold)', whiteSpace: 'nowrap' }}>CLAFT</span>
                <span style={{
                  flex: 1,
                  maxWidth: '60px',
                  height: '1px',
                  background: 'repeating-linear-gradient(to right, #D97706 0px, #D97706 3px, transparent 3px, transparent 6px)'
                }} />
                <span style={{ fontSize: '14px' }}>✈️</span>
                <span style={{
                  flex: 1,
                  maxWidth: '60px',
                  height: '1px',
                  background: 'repeating-linear-gradient(to right, #D97706 0px, #D97706 3px, transparent 3px, transparent 6px)'
                }} />
                <span style={{ fontWeight: 'var(--font-bold)', whiteSpace: 'nowrap' }}>note</span>
              </div>
            </div>

            {/* ミシン目（縦の区切り） */}
            <div style={{
              width: '2px',
              background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 4px, rgba(245,158,11,0.4) 4px, rgba(245,158,11,0.4) 8px)',
              margin: '8px 0'
            }} />

            {/* 右半券：矢印 */}
            <div style={{
              width: 'clamp(56px, 14vw, 76px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              color: 'white',
              fontSize: 'clamp(22px, 5vw, 30px)',
              borderRadius: '0 10px 10px 0'
            }}>
              <span className="pulse-arrow">→</span>
            </div>
          </div>
        </a>
      </Section>

      {/* ========================================
          イベント概要：エアメール風吹き出し
          ======================================== */}
      <Section>
        <div style={{ position: 'relative' }}>
          {/* 浮遊アイコン */}
          <div style={{ position: 'absolute', left: '-25px', top: '15%', fontSize: '28px', opacity: 0.6, pointerEvents: 'none' }}>
            <div style={{ animation: 'floatGently 2.5s ease-in-out infinite' }}>📨</div>
          </div>
          <div style={{ position: 'absolute', right: '-20px', top: '40%', fontSize: '24px', opacity: 0.6, pointerEvents: 'none' }}>
            <div style={{ animation: 'floatGently 3s ease-in-out 0.5s infinite' }}>🤖</div>
          </div>
          <div style={{ position: 'absolute', left: '-15px', bottom: '10%', fontSize: '26px', opacity: 0.6, pointerEvents: 'none' }}>
            <div style={{ animation: 'floatGently 2.8s ease-in-out 1s infinite' }}>💡</div>
          </div>

          {/* エアメール風の吹き出し */}
          <div style={{
            background: 'var(--rail-cream)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(24px, 5vw, 32px)',
            position: 'relative',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '4px solid transparent',
            backgroundImage: `
              linear-gradient(var(--rail-cream), var(--rail-cream)),
              repeating-linear-gradient(
                45deg,
                #3B82F6 0px,
                #3B82F6 10px,
                #EF4444 10px,
                #EF4444 20px,
                white 20px,
                white 30px
              )
            `,
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box'
          }}>
            {/* エアメールラベル */}
            <div style={{
              position: 'absolute',
              top: '-14px',
              right: '20px',
              background: '#EF4444',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: 'clamp(10px, 2vw, 12px)',
              fontWeight: 'var(--font-bold)',
              letterSpacing: '0.1em',
              transform: 'rotate(3deg)'
            }}>
              ✈ AIR MAIL
            </div>

            <div className="body-base" style={{ color: 'var(--ink-700)', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ color: 'var(--ink-900)' }}>株式会社アーテック</strong>主催、大好評の国際交流プログラム「<strong style={{ color: '#10B981' }}>STEAM</strong>」を再びオンラインで開催！
              </p>
              <p style={{ marginBottom: '0' }}>
                世界中で教材として採用されている「
                <a
                href="https://www.artec-kk.co.jp/blocks/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--ink-900)',
                  fontWeight: 700,
                  textDecoration: 'underline',
                  textUnderlineOffset: '2px',
                }}
                >
                  アーテックブロック
                  </a>
                  」と「
                  <a
                  href="https://www.keeponlearning.fun/edison-academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--ink-900)',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    textUnderlineOffset: '2px',
                  }}
                  >
                    ロボットプログラミング
                  </a>
                   」を活用し、海外の仲間たちと互いにSDGsの課題（お題）を出し合い、解決に向けた作品づくりに取り組む実践的なイベントです。
              </p>              
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================
          イベントの流れ：3つのフェーズ（パスポートスタンプ風）
          ======================================== */}
      <Section
        style={{
          position: 'relative',
          padding: 'clamp(40px, 8vw, 60px) 0',
          overflow: 'hidden'
        }}
      >
        {/* 方眼紙パターン */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: 0.5,
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="heading-lg" style={{
            textAlign: 'center',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            position: 'relative',
            display: 'inline-block',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            イベントの流れ
            <svg
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '0',
                width: '100%',
                height: '15px',
                zIndex: -1
              }}
              viewBox="0 0 200 15"
              preserveAspectRatio="none"
            >
              <path
                d="M5,10 Q50,6 100,10 T195,10"
                stroke="#10B981"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </h2>

          {/* 飛行機ルートの線（SVG） */}
          <div style={{
            position: 'absolute',
            top: '120px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '100%',
            pointerEvents: 'none',
            opacity: 0.15,
            zIndex: 0
          }}>
            <svg width="100%" height="400" style={{ position: 'absolute', top: 0 }}>
              <path 
                d="M 30,30 Q 80,100 50,180 T 80,300" 
                stroke="#10B981" 
                strokeWidth="3" 
                strokeDasharray="8,8" 
                fill="none"
              />
            </svg>
          </div>

          <div 
            ref={phasesRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(24px, 5vw, 36px)'
            }}
          >
            <PhaseStamp
              phase={1}
              title="自分の国の課題を調べて発表"
              description="日本が抱えるSDGsの課題を調査し、他国の参加者に「お題」として提示します。"
              color={phaseColors.phase1}
              icon="🔍"
              rotate={-2}
              delay={0}
              isVisible={visiblePhases[0]}
            />
            
            <PhaseStamp
              phase={2}
              title="他の国の課題を解決するロボットを考える"
              description="バングラデシュやマレーシアからのお題を受け取り、解決策をロボット＆プログラミングで形にします。"
              color={phaseColors.phase2}
              icon="🤖"
              rotate={1.5}
              delay={200}
              isVisible={visiblePhases[1]}
            />
            
            <PhaseStamp
              phase={3}
              title="発表動画を撮影し提出"
              description="各国の先生が審査と評価を行います。"
              color={phaseColors.phase3}
              icon="📹"
              rotate={-1}
              delay={400}
              isVisible={visiblePhases[2]}
            />
            
            <PhaseStamp
              phase={4}
              title="オンライン結果発表&交流会"
              description="3カ国をオンラインでつなぎ、制作したロボット作品の結果発表後、コミュニケーションを取り合います。"
              color={phaseColors.phase4}
              icon="🎤"
              rotate={1.5}
              delay={600}
              isVisible={visiblePhases[3]}
            />
          </div>
        </div>
      </Section>

      {/* ========================================
          イベントのポイント：ポラロイド3枚並び
          ======================================== */}
      <Section
        style={{
          position: 'relative',
          padding: 'clamp(40px, 8vw, 60px) 0',
          background: 'radial-gradient(1200px 600px at 50% -10%, rgba(16,185,129,.08), transparent 60%)',
          overflow: 'hidden'
        }}
      >
        <h2 className="heading-lg" style={{
          textAlign: 'center',
          marginBottom: 'clamp(32px, 6vw, 48px)',
          position: 'relative',
          display: 'inline-block',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          イベントのポイント
          <svg
            style={{
              position: 'absolute',
              bottom: '-8px',
              left: '0',
              width: '100%',
              height: '15px',
              zIndex: -1
            }}
            viewBox="0 0 200 15"
            preserveAspectRatio="none"
          >
            <path
              d="M5,10 Q50,6 100,10 T195,10"
              stroke="#F59E0B"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>
        </h2>

        {/* ポラロイド風画像表示 */}
        <div style={{
          transform: 'rotate(2deg)',
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(2deg) scale(1)'}
        >
          <div style={{
            background: 'var(--rail-cream)',
            padding: '12px',
            paddingBottom: '40px',
            borderRadius: 'var(--radius)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            position: 'relative'
          }}>
            {/* マスキングテープ */}
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '25px',
              width: '90px',
              height: '35px',
              background: '#10B981',
              opacity: 0.75,
              mixBlendMode: 'multiply',
              transform: 'rotate(-8deg)',
              clipPath: 'polygon(2% 0%, 5% 5%, 8% 2%, 12% 8%, 15% 3%, 18% 7%, 22% 4%, 25% 9%, 28% 5%, 32% 10%, 35% 6%, 38% 11%, 42% 7%, 45% 12%, 48% 8%, 52% 13%, 55% 9%, 58% 14%, 62% 10%, 65% 15%, 68% 11%, 72% 16%, 75% 12%, 78% 17%, 82% 13%, 85% 18%, 88% 14%, 92% 19%, 95% 15%, 98% 20%, 100% 25%, 98% 80%, 95% 85%, 92% 81%, 88% 86%, 85% 82%, 82% 87%, 78% 83%, 75% 88%, 72% 84%, 68% 89%, 65% 85%, 62% 90%, 58% 86%, 55% 91%, 52% 87%, 48% 92%, 45% 88%, 42% 93%, 38% 89%, 35% 94%, 32% 90%, 28% 95%, 25% 91%, 22% 96%, 18% 92%, 15% 97%, 12% 93%, 8% 98%, 5% 94%, 2% 100%, 0% 75%)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '8px',
              right: '20px',
              width: '70px',
              height: '28px',
              background: '#F59E0B',
              opacity: 0.7,
              mixBlendMode: 'multiply',
              transform: 'rotate(5deg)',
              clipPath: 'polygon(3% 5%, 6% 2%, 9% 6%, 13% 3%, 16% 7%, 19% 4%, 23% 8%, 26% 5%, 29% 9%, 33% 6%, 36% 10%, 39% 7%, 43% 11%, 46% 8%, 49% 12%, 53% 9%, 56% 13%, 59% 10%, 63% 14%, 66% 11%, 69% 15%, 73% 12%, 76% 16%, 79% 13%, 83% 17%, 86% 14%, 89% 18%, 93% 15%, 96% 19%, 100% 25%, 97% 75%, 94% 95%, 91% 92%, 87% 96%, 84% 93%, 81% 97%, 77% 94%, 74% 98%, 71% 95%, 67% 99%, 64% 96%, 61% 100%, 57% 97%, 54% 96%, 51% 92%, 47% 95%, 44% 91%, 41% 94%, 37% 90%, 34% 93%, 31% 89%, 27% 92%, 24% 88%, 21% 91%, 17% 87%, 14% 90%, 11% 86%, 7% 89%, 4% 85%, 0% 80%)',
              pointerEvents: 'none'
            }} />
            
            {/* ポイント画像 */}
            <img
              src="/assets/asia-steam-camp/point.png"
              alt="イベントのポイント"
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '16/9',
                borderRadius: '4px',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>
      </Section>

      {/* ========================================
          具体的なスケジュール：タイムラインカレンダー
          ======================================== */}
      <Section
        style={{
          position: 'relative',
          padding: 'clamp(40px, 8vw, 60px) 0',
          overflow: 'hidden'
        }}
      >
        {/* 方眼紙パターン */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: 0.5,
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="heading-lg" style={{
            textAlign: 'center',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            position: 'relative',
            display: 'inline-block',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            具体的なスケジュール
            <svg
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '0',
                width: '100%',
                height: '15px',
                zIndex: -1
              }}
              viewBox="0 0 200 15"
              preserveAspectRatio="none"
            >
              <path
                d="M5,10 Q50,6 100,10 T195,10"
                stroke="#3B82F6"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </h2>

          {/* Phase 1 */}
          <div style={{ marginBottom: 'clamp(32px, 6vw, 48px)' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '20px',
              background: phaseColors.phase1,
              color: 'white',
              fontWeight: 'var(--font-bold)',
              fontSize: 'clamp(14px, 3vw, 16px)',
              marginBottom: '20px'
            }}>
              🔍 Phase 1：課題発見
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TimelineItem
                date="12/22(月)20:00~21:00"
                title="オンラインワークを行い、「SDGsとは何か？」や「各国の現状」について理解を深めました。"
                links={[
                  { label: 'アーカイブはこちら', url: 'https://youtu.be/AAd-4wT_ss4' },
                  { label: '振り返りはこちら', url: 'https://www.youtube.com/watch?v=4T8RVQF1_YY' }
                ]}
                color={phaseColors.phase1}
                index={0}
              />
              <TimelineItem
                date="1/10(土)15:30~16:30"
                title="教室に集まり、SDGsに関わる日本の課題について、チームで話し合いました。"
                links={[
                  { label: '事前準備のフォーム', url: 'https://forms.gle/6Kni6P1W3VnZSaA46' },
                  { label: 'ライブレポート①', url: 'https://note.com/yononaka_career/n/n2c11fae40377' }
                ]}
                color={phaseColors.phase1}
                index={1}
              />
              <TimelineItem
                date="1/17(土)10:00~16:30"
                title="教室に集まり、他国の参加者に「お題」として提示するためのプレゼン動画の作成を進めました。"
                links={[
                  { label: 'ライブレポート②', url: 'https://note.com/yononaka_career/n/n0a302bcdf0f8?magazine_key=m3684b8fac7b5' }
                ]}
                color={phaseColors.phase1}
                index={2}
              />
              <TimelineItem
                date="1/21"
                title="「お題」のプレゼン動画完成。"
                links={[
                  { label: '各チームのプレゼン動画はこちら', url: 'https://www.youtube.com/playlist?list=PLg8PlJHz4ogtFzD8Sj-SuvYoL3dmZDR7Q'},
                  { label: 'ダイジェスト動画はこちら', url: 'https://youtu.be/34lVwyA5JbA' }
              ]}
                color={phaseColors.phase1}
                index={2}
              />
            </div>
          </div>

          {/* Phase 2 */}
          <div style={{ marginBottom: 'clamp(32px, 6vw, 48px)' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '20px',
              background: phaseColors.phase2,
              color: 'white',
              fontWeight: 'var(--font-bold)',
              fontSize: 'clamp(14px, 3vw, 16px)',
              marginBottom: '20px'
            }}>
              🤖 Phase 2：制作
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TimelineItem
                date="1/22〜2/20"
                title="バングラデシュ・マレーシアからのお題が到着。お題に対する解決策を考え、ロボットを制作開始。"
                links={[
                  { label: 'ライブレポート③', url: 'https://note.com/yononaka_career/n/n87edae993206?magazine_key=m3684b8fac7b5' },
                  { label: 'ライブレポート④', url: 'https://note.com/yononaka_career/n/n26ec4941929b?magazine_key=m3684b8fac7b5' }
                ]}
                color={phaseColors.phase2}
                isLast
                index={0}
              />
            </div>
          </div>

          {/* Phase 3 */}
          <div style={{ marginBottom: 'clamp(32px, 6vw, 48px)' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '20px',
              background: phaseColors.phase3,
              color: 'white',
              fontWeight: 'var(--font-bold)',
              fontSize: 'clamp(14px, 3vw, 16px)',
              marginBottom: '20px'
            }}>
              📹 Phase 3：発表
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TimelineItem
                date="2/21(土)"
                title="発表動画を撮影し提出"
                description="各国の先生が審査と評価を行います。"
                color={phaseColors.phase3}
                isLast
                index={0}
              />
            </div>
          </div>

          {/* Phase 4 */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '20px',
              background: phaseColors.phase4,
              color: 'white',
              fontWeight: 'var(--font-bold)',
              fontSize: 'clamp(14px, 3vw, 16px)',
              marginBottom: '20px'
            }}>
              🎤 Phase 4：交流
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TimelineItem
                date="3/7(土)13:30〜"
                title="オンライン結果発表&交流会"
                description="3カ国をオンラインでつなぎ、制作したロボット作品の共有と、結果発表を行います。その後コミュニケーションを取り合う交流の時間も予定しています。（場所：アーテック5階フリースペース）"
                color={phaseColors.phase4}
                isLast
                index={0}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================
          画像ギャラリー：思い出アルバム（拡張用）
          ======================================== */}
      <Section
        style={{
          position: 'relative',
          padding: 'clamp(40px, 8vw, 60px) 0',
          background: 'radial-gradient(1200px 600px at 50% 50%, rgba(59,130,246,.06), transparent 60%)',
          overflow: 'hidden'
        }}
      >
        <h2 className="heading-lg" style={{
          textAlign: 'center',
          marginBottom: 'clamp(32px, 6vw, 48px)',
          position: 'relative',
          display: 'inline-block',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          活動の様子
          <svg
            style={{
              position: 'absolute',
              bottom: '-8px',
              left: '0',
              width: '100%',
              height: '15px',
              zIndex: -1
            }}
            viewBox="0 0 200 15"
            preserveAspectRatio="none"
          >
            <path
              d="M5,10 Q50,6 100,10 T195,10"
              stroke="var(--brand)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>
        </h2>

        {/* 画像プレースホルダー（後から追加用） */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(12px, 3vw, 20px)'
        }}>
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              style={{
                background: 'var(--rail-cream)',
                padding: '8px',
                paddingBottom: '24px',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (1 + i * 0.5)}deg)`
              }}
            >
              <div style={{
                aspectRatio: '4/3',
                background: 'linear-gradient(135deg, rgba(52,198,190,0.1) 0%, rgba(59,130,246,0.1) 100%)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed rgba(0,0,0,0.08)'
              }}>
                <div style={{ textAlign: 'center', color: 'var(--ink-500)' }}>
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>📷</div>
                  <p style={{ fontSize: '11px', margin: 0 }}>Coming Soon...</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="body-sm" style={{ 
          textAlign: 'center', 
          color: 'var(--ink-500)', 
          marginTop: '20px',
          fontStyle: 'italic'
        }}>
          ※ イベントの様子は随時更新していきます
        </p>
      </Section>
    </MobileContainer>
  );
}

