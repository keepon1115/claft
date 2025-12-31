'use client';

import { MobileContainer, Section } from '@/components/MobileContainer';
import { useEffect, useRef, useState } from 'react';

// 学びのカードコンポーネント
const LearningCard = ({
  title,
  icon,
  color,
  description,
  delay = 0,
  isVisible = false
}: {
  title: string;
  icon: string;
  color: string;
  description: string;
  delay?: number;
  isVisible?: boolean;
}) => (
  <div 
    style={{
      background: 'var(--rail-cream)',
      border: `3px solid ${color}`,
      borderRadius: '16px',
      padding: 'clamp(16px, 4vw, 24px)',
      position: 'relative',
      transform: `scale(${isVisible ? 1 : 0.8})`,
      opacity: isVisible ? 1 : 0,
      transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}
  >
    {/* 二重線の縁取り */}
    <div style={{
      position: 'absolute',
      inset: '4px',
      border: `2px dashed ${color}`,
      borderRadius: '12px',
      opacity: 0.4,
      pointerEvents: 'none'
    }} />
    
    <div style={{ 
      fontSize: 'clamp(36px, 8vw, 48px)', 
      marginBottom: '12px',
      textAlign: 'center'
    }}>
      {icon}
    </div>
    
    <h3 className="heading-sm" style={{ 
      marginBottom: '8px', 
      color: 'var(--ink-900)',
      textAlign: 'center' 
    }}>
      {title}
    </h3>
    
    <p className="body-sm" style={{ 
      color: 'var(--ink-700)', 
      margin: 0,
      textAlign: 'center',
      lineHeight: '1.6'
    }}>
      {description}
    </p>
  </div>
);

// 強みのカードコンポーネント
const StrengthCard = ({
  icon,
  title,
  description,
  color,
  rotate = '0deg'
}: {
  icon: string;
  title: string;
  description: string;
  color: string;
  rotate?: string;
}) => (
  <div style={{
    transform: `rotate(${rotate})`,
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = `rotate(0deg) translateY(-8px) scale(1.02)`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = `rotate(${rotate}) translateY(0) scale(1)`;
  }}
  >
    <div style={{
      background: 'var(--rail-cream)',
      padding: '20px',
      paddingBottom: '24px',
      borderRadius: 'var(--radius)',
      boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      {/* マスキングテープ */}
      <div style={{
        position: 'absolute',
        top: '-12px',
        right: '25px',
        width: '100px',
        height: '32px',
        background: color,
        opacity: 0.7,
        mixBlendMode: 'multiply',
        transform: 'rotate(6deg)',
        clipPath: 'polygon(2% 0%, 5% 5%, 8% 2%, 12% 8%, 15% 3%, 18% 7%, 22% 4%, 25% 9%, 28% 5%, 32% 10%, 35% 6%, 38% 11%, 42% 7%, 45% 12%, 48% 8%, 52% 13%, 55% 9%, 58% 14%, 62% 10%, 65% 15%, 68% 11%, 72% 16%, 75% 12%, 78% 17%, 82% 13%, 85% 18%, 88% 14%, 92% 19%, 95% 15%, 98% 20%, 100% 25%, 98% 80%, 95% 85%, 92% 81%, 88% 86%, 85% 82%, 82% 87%, 78% 83%, 75% 88%, 72% 84%, 68% 89%, 65% 85%, 62% 90%, 58% 86%, 55% 91%, 52% 87%, 48% 92%, 45% 88%, 42% 93%, 38% 89%, 35% 94%, 32% 90%, 28% 95%, 25% 91%, 22% 96%, 18% 92%, 15% 97%, 12% 93%, 8% 98%, 5% 94%, 2% 100%, 0% 75%)',
        pointerEvents: 'none'
      }} />

      <div style={{ 
        fontSize: 'clamp(36px, 8vw, 48px)', 
        marginBottom: '12px',
        marginTop: '8px',
        textAlign: 'center'
      }}>
        {icon}
      </div>

      <h3 className="heading-sm" style={{ 
        marginBottom: '8px', 
        color: 'var(--ink-900)',
        textAlign: 'center'
      }}>
        {title}
      </h3>

      <p className="body-base" style={{ 
        color: 'var(--ink-700)', 
        margin: 0, 
        lineHeight: '1.7',
        textAlign: 'center'
      }}>
        {description}
      </p>
    </div>
  </div>
);

export function JibunCraftClient() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false]);
  const cardsRef = useRef<HTMLDivElement>(null);
  const strengthsRef = useRef<HTMLDivElement[]>([]);

  // 4つの学びカードのアニメーション
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 順番にカードを表示
            setVisibleCards([true, false, false, false]);
            setTimeout(() => setVisibleCards([true, true, false, false]), 150);
            setTimeout(() => setVisibleCards([true, true, true, false]), 300);
            setTimeout(() => setVisibleCards([true, true, true, true]), 450);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 強みカードのスクロールアニメーション
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

    strengthsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // スクロールアニメーション（全セクション）
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <MobileContainer>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
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
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
      `}</style>

      {/* ========================================
          ① ヒーローセクション：導入
          ======================================== */}
      <Section className="relative overflow-hidden scroll-animate">
        {/* 背景グラデーション */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 20% 30%, rgba(155, 135, 245, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(52, 198, 190, 0.1) 0%, transparent 50%)
            `,
            zIndex: -1
          }}
          aria-hidden="true"
        />

        {/* メインタイトル */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 
            className="heading-xl"
            style={{
              marginBottom: '16px',
              position: 'relative',
              display: 'inline-block'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>
              ジブンクラフト
            </span>
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
                stroke="#9b87f5"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                style={{ opacity: 0.6 }}
              />
            </svg>
          </h1>
        </div>

        {/* 説明文 */}
        <p 
          className="body-base"
          style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 'var(--leading-loose)'
          }}
        >
          探究・対話・実践を通して見えてきた「自分の強み(非認知能力)」を可視化します。キャリア面談を通して「自分は何をしたいか？どうありたいか？」を深堀りし、目標を定めて、ひとつひとつキャリアを自分の手でクラフト(創造)していきます。
        </p>

        {/* 装飾的な浮遊アイコン */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginTop: '32px',
            fontSize: '40px'
          }}
          aria-hidden="true"
        >
          <span className="float-animation" style={{ animationDelay: '0s' }}>✨</span>
          <span className="float-animation" style={{ animationDelay: '0.3s' }}>🎯</span>
          <span className="float-animation" style={{ animationDelay: '0.6s' }}>🧭</span>
        </div>
      </Section>

      {/* ========================================
          ② ジブンクラフトの仕組み：4つの学びの統合
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
            marginBottom: 'clamp(16px, 3vw, 20px)',
            position: 'relative',
            display: 'inline-block',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            4つの学びが、ひとつに。
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

          <p className="body-base" style={{
            textAlign: 'center',
            color: 'var(--ink-700)',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            lineHeight: '1.8'
          }}>
            知識を詰め込むのではなく、経験を通して育った<br />
            <strong style={{ color: 'var(--ink-900)' }}>「目に見えない力（非認知能力）」</strong>を、<br />
            一生モノの武器に変えていくプロセスです。
          </p>

          {/* 4つの学びカード */}
          <div 
            ref={cardsRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(16px, 4vw, 24px)'
            }}
          >
            <LearningCard
              title="クエスト"
              icon="🗺️"
              color="var(--green)"
              description="問いから始まる探究学習"
              delay={0}
              isVisible={visibleCards[0]}
            />
            
            <LearningCard
              title="PBL"
              icon="🤝"
              color="var(--brand)"
              description="プロジェクト型学習"
              delay={150}
              isVisible={visibleCards[1]}
            />
            
            <LearningCard
              title="Yononaka"
              icon="🌍"
              color="var(--pink)"
              description="世の中とつながる体験"
              delay={300}
              isVisible={visibleCards[2]}
            />
            
            <LearningCard
              title="ミライクラフト"
              icon="✨"
              color="var(--cream)"
              description="未来を描くキャリア教育"
              delay={450}
              isVisible={visibleCards[3]}
            />
          </div>

          {/* 中央のメッセージ */}
          <div style={{
            marginTop: 'clamp(32px, 6vw, 48px)',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 24px',
              background: 'var(--rail-cream)',
              borderRadius: '16px',
              border: '3px solid var(--brand)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <span style={{ fontSize: '32px' }}>⬇️</span>
              <div style={{ textAlign: 'left' }}>
                <div className="heading-sm" style={{ marginBottom: '4px' }}>
                  すべてが統合される場所
                </div>
                <div className="body-sm" style={{ color: 'var(--ink-700)' }}>
                  ジブンクラフト
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================
          ③ 非認知能力の可視化：AiGrow
          ======================================== */}
      <Section
        style={{
          position: 'relative',
          padding: 'clamp(40px, 8vw, 60px) 0',
          background: 'radial-gradient(1200px 600px at 50% -10%, rgba(59,130,246,.08), transparent 60%)',
          overflow: 'hidden'
        }}
      >
        <h2 className="heading-lg" style={{
          textAlign: 'center',
          marginBottom: 'clamp(24px, 5vw, 32px)',
          position: 'relative',
          display: 'inline-block',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          「感覚」を「確信」に変える
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

        {/* AiGrowの説明カード */}
        <div style={{
          background: 'var(--card)',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(24px, 5vw, 32px)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          marginBottom: 'clamp(24px, 5vw, 32px)',
          position: 'relative'
        }}>
          {/* ノートの穴（装飾） */}
          <div style={{
            position: 'absolute',
            left: '16px',
            top: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.1)'
              }} />
            ))}
          </div>

          <div style={{ paddingLeft: '24px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#3B82F6',
              color: 'white',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: 'clamp(13px, 2.8vw, 15px)',
              fontWeight: 'var(--font-bold)',
              marginBottom: '16px'
            }}>
              🤖 AI評価システム：AiGrow
            </div>

            <p className="body-base" style={{ 
              color: 'var(--ink-700)', 
              lineHeight: '1.8',
              marginBottom: '16px'
            }}>
              自分の評価だけでなく、仲間からの客観的な評価をAIが分析。自分でも気づかなかった<strong style={{ color: 'var(--ink-900)' }}>「つなぐ力」や「まきこむ力」</strong>など、<strong style={{ color: '#3B82F6' }}>25種類の能力</strong>を公正に数値化します。
            </p>

            <p className="body-base" style={{ 
              color: 'var(--ink-700)', 
              lineHeight: '1.8'
            }}>
              これにより、お子さまの成長を主観だけでなく、<strong style={{ color: 'var(--ink-900)' }}>データに基づいた「強み」</strong>として捉え直すことができます。
            </p>
          </div>
        </div>

        {/* 付箋コラム */}
        <div style={{
          background: '#FFF9C4',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '4px',
          padding: 'clamp(16px, 4vw, 20px)',
          marginBottom: 'clamp(24px, 5vw, 32px)',
          transform: 'rotate(-1deg)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40px',
            height: '16px',
            background: '#F59E0B',
            opacity: 0.6,
            mixBlendMode: 'multiply',
            clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)'
          }} />
          
          <div className="body-sm" style={{ 
            color: '#333',
            lineHeight: '1.7'
          }}>
            <strong style={{ fontSize: 'clamp(14px, 3vw, 16px)' }}>💡 非認知能力って何？</strong>
            <br />
            テストで測れない「生きる力」のこと。協調性、創造性、粘り強さ、課題発見力など、これからの時代に本当に必要な力です。
          </div>
        </div>

        {/* CTAボタン */}
        <div style={{ textAlign: 'center' }}>
          <a 
            href="https://share.google/DYhUEMOhyWihERMFF"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              fontSize: 'clamp(14px, 3vw, 16px)',
              display: 'inline-flex',
              transition: 'all 0.2s ease'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(2px)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>📊</span>
            科学的な計測ツール「AiGrow」について詳しく見る
          </a>
        </div>
      </Section>

      {/* ========================================
          ④ キャリア面談：人生の地図を描く
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
            marginBottom: 'clamp(16px, 3vw, 20px)',
            position: 'relative',
            display: 'inline-block',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            人生の地図を描く
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
                stroke="var(--green)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </h2>

          <p className="body-base" style={{
            textAlign: 'center',
            color: 'var(--ink-700)',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            lineHeight: '1.8'
          }}>
            キャリアコンサルタントとの面談で、<br />
            自分の「今」と「未来」をつなげます。
          </p>

          {/* 面談の3ステップ */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(20px, 4vw, 28px)'
          }}>
            {/* ステップ1 */}
            <div style={{
              background: 'var(--rail-cream)',
              borderRadius: '16px',
              padding: 'clamp(20px, 4vw, 28px)',
              border: '2px solid var(--green)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '20px',
                background: 'var(--green)',
                color: 'white',
                padding: '4px 16px',
                borderRadius: '20px',
                fontSize: 'clamp(12px, 2.5vw, 14px)',
                fontWeight: 'var(--font-bold)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
              }}>
                Step 1
              </div>

              <div style={{ 
                fontSize: 'clamp(32px, 7vw, 40px)', 
                marginBottom: '12px',
                marginTop: '8px'
              }}>
                🎯
              </div>

              <h3 className="heading-sm" style={{ marginBottom: '8px' }}>
                強みの言語化
              </h3>

              <p className="body-base" style={{ 
                color: 'var(--ink-700)', 
                margin: 0,
                lineHeight: '1.7'
              }}>
                「自分は何が得意か？」を言葉にする。
              </p>
            </div>

            {/* ステップ2 */}
            <div style={{
              background: 'var(--rail-cream)',
              borderRadius: '16px',
              padding: 'clamp(20px, 4vw, 28px)',
              border: '2px solid var(--brand)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '20px',
                background: 'var(--brand)',
                color: 'white',
                padding: '4px 16px',
                borderRadius: '20px',
                fontSize: 'clamp(12px, 2.5vw, 14px)',
                fontWeight: 'var(--font-bold)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
              }}>
                Step 2
              </div>

              <div style={{ 
                fontSize: 'clamp(32px, 7vw, 40px)', 
                marginBottom: '12px',
                marginTop: '8px'
              }}>
                🧭
              </div>

              <h3 className="heading-sm" style={{ marginBottom: '8px' }}>
                ありたい姿の探索
              </h3>

              <p className="body-base" style={{ 
                color: 'var(--ink-700)', 
                margin: 0,
                lineHeight: '1.7'
              }}>
                「どうありたいか？」という人生の軸を見つける。
              </p>
            </div>

            {/* ステップ3 */}
            <div style={{
              background: 'var(--rail-cream)',
              borderRadius: '16px',
              padding: 'clamp(20px, 4vw, 28px)',
              border: '2px solid var(--pink)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '20px',
                background: 'var(--pink)',
                color: 'white',
                padding: '4px 16px',
                borderRadius: '20px',
                fontSize: 'clamp(12px, 2.5vw, 14px)',
                fontWeight: 'var(--font-bold)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
              }}>
                Step 3
              </div>

              <div style={{ 
                fontSize: 'clamp(32px, 7vw, 40px)', 
                marginBottom: '12px',
                marginTop: '8px'
              }}>
                🚀
              </div>

              <h3 className="heading-sm" style={{ marginBottom: '8px' }}>
                目標設定とアクション
              </h3>

              <p className="body-base" style={{ 
                color: 'var(--ink-700)', 
                margin: 0,
                lineHeight: '1.7'
              }}>
                地図を描き、明日から何をするかを明確にする。
              </p>
            </div>
          </div>

          {/* 定期更新メッセージ */}
          <div style={{
            marginTop: 'clamp(32px, 6vw, 48px)',
            background: 'white',
            borderRadius: '12px',
            padding: 'clamp(20px, 4vw, 24px)',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📅</div>
            <p className="body-base" style={{ 
              color: 'var(--ink-700)',
              margin: 0,
              lineHeight: '1.7'
            }}>
              <strong style={{ color: 'var(--brand)' }}>3～4ヶ月に1回</strong>の定期的なアップデートで、<br />
              常に「今、自分がどこにいるか」を確認できます。
            </p>
          </div>
        </div>
      </Section>

      {/* ========================================
          ⑤ 5つのチカラ：目指す姿
          ======================================== */}
      <Section
        style={{
          position: 'relative',
          padding: 'clamp(40px, 8vw, 60px) 0',
          background: 'radial-gradient(1200px 600px at 50% 50%, rgba(52,198,190,.06), transparent 60%)',
          overflow: 'hidden'
        }}
      >
        <h2 className="heading-lg" style={{
          textAlign: 'center',
          marginBottom: 'clamp(16px, 3vw, 20px)',
          position: 'relative',
          display: 'inline-block',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          育てる、5つのチカラ
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
              stroke="var(--cream)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>
        </h2>

        <p className="body-base" style={{
          textAlign: 'center',
          color: 'var(--ink-700)',
          marginBottom: 'clamp(32px, 6vw, 48px)',
          lineHeight: '1.8'
        }}>
          「ふつう」を疑い、新しい発想で仲間と未来を切り拓く。<br />
          自分で自分を育てる、自律的な学びのゴールです。
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(24px, 5vw, 36px)'
        }}>
          <div
            ref={(el) => { if (el) strengthsRef.current[0] = el; }}
            className="reveal-card"
          >
            <StrengthCard
              icon="🤝"
              title="つなぐ"
              description="人と人、アイデアとアイデアをつなぐ力"
              color="var(--brand)"
              rotate="-2deg"
            />
          </div>

          <div
            ref={(el) => { if (el) strengthsRef.current[1] = el; }}
            className="reveal-card"
          >
            <StrengthCard
              icon="🌟"
              title="ひらく"
              description="新しい視点で可能性をひらく力"
              color="var(--cream)"
              rotate="1.5deg"
            />
          </div>

          <div
            ref={(el) => { if (el) strengthsRef.current[2] = el; }}
            className="reveal-card"
          >
            <StrengthCard
              icon="✏️"
              title="えがく"
              description="未来のビジョンをえがく力"
              color="var(--green)"
              rotate="-1deg"
            />
          </div>

          <div
            ref={(el) => { if (el) strengthsRef.current[3] = el; }}
            className="reveal-card"
          >
            <StrengthCard
              icon="🎭"
              title="なりきる"
              description="他者の視点になりきる共感力"
              color="var(--pink)"
              rotate="2deg"
            />
          </div>

          <div
            ref={(el) => { if (el) strengthsRef.current[4] = el; }}
            className="reveal-card"
          >
            <StrengthCard
              icon="🚀"
              title="まきこむ"
              description="周りを巻き込み行動する推進力"
              color="var(--brand)"
              rotate="-1.5deg"
            />
          </div>
        </div>

        {/* 最終メッセージ */}
        <div style={{
          marginTop: 'clamp(48px, 8vw, 64px)',
          textAlign: 'center',
          padding: 'clamp(24px, 5vw, 32px)',
          background: 'white',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✨</div>
          <h3 className="heading-md" style={{ marginBottom: '12px' }}>
            体験が、自信になる。
          </h3>
          <p className="body-base" style={{ 
            color: 'var(--ink-700)',
            lineHeight: '1.8',
            margin: 0
          }}>
            ジブンクラフトで、お子さまの「見えない成長」を<br />
            確かな「強み」として、一緒に育てていきましょう。
          </p>
        </div>
      </Section>
    </MobileContainer>
  );
}

