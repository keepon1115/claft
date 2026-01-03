'use client';

import { MobileContainer, Section } from '@/components/MobileContainer';
import { useEffect, useRef, useState } from 'react';
import { FlowApply } from '@/components/FlowApply';
import { FAQ } from '@/components/FAQ';
import { Students } from '@/components/Students';

// 学びのカードコンポーネント
const LearningCard = ({
  title,
  icon,
  color,
  delay = 0,
  isVisible = false
}: {
  title: string;
  icon: string;
  color: string;
  delay?: number;
  isVisible?: boolean;
}) => (
  <div 
    style={{
      background: 'var(--rail-cream)',
      border: `3px solid ${color}`,
      borderRadius: '16px',
      padding: 'clamp(16px, 4vw, 20px)',
      position: 'relative',
      transform: `scale(${isVisible ? 1 : 0.8})`,
      opacity: isVisible ? 1 : 0,
      transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      flex: '1',
      minWidth: '0'
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
      fontSize: 'clamp(28px, 6vw, 40px)', 
      marginBottom: '8px',
      textAlign: 'center'
    }}>
      {icon}
    </div>
    
    <h3 className="heading-sm" style={{ 
      margin: 0, 
      color: 'var(--ink-900)',
      textAlign: 'center',
      fontSize: 'clamp(13px, 3vw, 16px)'
    }}>
      {title}
    </h3>
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
  description: React.ReactNode;
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
          探究・対話・実践を通して育まれた「非認知能力」を可視化。
          <br/>
          その結果をふまえてキャリアコンサルタントと面談を行います。
          <br/>
          「何をしたいか？どうありたいか？」という将来の姿を描き、
          <br/>
          それに向けた目標を設定し、PBLを進めていきます。
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
            4つの学びで非認知能力を育む。
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
            知識を詰め込むのではなく、経験を通して育つ<br />
            <strong style={{ color: 'var(--ink-900)' }}>「非認知能力」</strong>が社会で必要なチカラです。
          </p>

          {/* 4つの学びカード - 横並び */}
          <div 
            ref={cardsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 100px), 1fr))',
              gap: 'clamp(12px, 3vw, 16px)',
              marginBottom: 'clamp(24px, 5vw, 32px)'
            }}
          >
            <LearningCard
              title="クエスト"
              icon="🗺️"
              color="var(--green)"
              delay={0}
              isVisible={visibleCards[0]}
            />
            
            <LearningCard
              title="PBL"
              icon="🤝"
              color="var(--brand)"
              delay={150}
              isVisible={visibleCards[1]}
            />
            
            <LearningCard
              title="Yononaka"
              icon="🌍"
              color="var(--pink)"
              delay={300}
              isVisible={visibleCards[2]}
            />
            
            <LearningCard
              title="ミライクラフト"
              icon="✨"
              color="var(--cream)"
              delay={450}
              isVisible={visibleCards[3]}
            />
          </div>

          {/* 非認知能力って何？カード */}
          <div style={{
            background: '#FFF9E6',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(16px, 4vw, 20px)',
            marginTop: 'clamp(16px, 4vw, 24px)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-30px',
              width: '120px',
              height: '120px',
              background: '#FFE066',
              borderRadius: '50%',
              opacity: 0.15,
              mixBlendMode: 'multiply',
              clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)'
            }} />
            
            <div className="body-sm" style={{ 
              color: '#333',
              lineHeight: '1.7'
            }}>
              <strong style={{ fontSize: 'clamp(14px, 3vw, 16px)' }}>💡 非認知能力って何？</strong>
              <br />
              テストで計測できる「認知能力」ではないチカラのこと。協調性、実行力、コミュニケーション能力など、社会に出て仕事するとき、あるいは生活をするときに必要なチカラです。
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
              非認知能力計測ツール：AiGrow
            </div>

            <p className="body-base" style={{ 
              color: 'var(--ink-700)', 
              lineHeight: '1.8',
              marginBottom: '16px'
            }}>
              自分の評価だけでなく、他者からの客観的な評価もあわせてAIで分析。自分でも気づかなかった<strong style={{ color: 'var(--ink-900)' }}>「リーダーシップ」や「課題設定能力」</strong>など、<strong style={{ color: '#3B82F6' }}>の非認知能力</strong>を数値化します。
            </p>

            <p className="body-base" style={{ 
              color: 'var(--ink-700)', 
              lineHeight: '1.8'
            }}>
              これにより、CLAFTでの成長を主観だけでなく、<strong style={{ color: 'var(--ink-900)' }}>データに基づいた「強み」</strong>として捉え直すことができます。
            </p>
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
            「AiGrow」について詳しく見る
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
            キャリアの地図を描く
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
            自分の「過去・現在・未来」をつなげます。
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
                AiGrowの結果を共有し、自己理解を深める
              </h3>

              <p className="body-base" style={{ 
                color: 'var(--ink-700)', 
                margin: 0,
                lineHeight: '1.7'
              }}>
                計測結果をみて思ったことや気づきを言葉にする。
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
                将来の姿をイメージして言葉にする
              </h3>

              <p className="body-base" style={{ 
                color: 'var(--ink-700)', 
                margin: 0,
                lineHeight: '1.7'
              }}>
                「なにがしたいか」「どうありたいか」というキャリアの方向性を確認する。
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
                ゴールから逆算し、そのために必要な目標と、今後の行動を決める。
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
              <strong style={{ color: 'var(--brand)' }}>4ヶ月に1回</strong>の作品発表会の後に面談します。<br />
              定期的に自分の現在地と進むべき方向性を確認できます。
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
          これから必要なのは情報編集力
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
          marginBottom: 'clamp(24px, 5vw, 32px)',
          lineHeight: '1.8'
        }}>
          「ふつう」を疑い、新しい発想で仲間と未来を切り拓く。<br />
          その経験が自分のキャリアをクラフトしていく。
        </p>

        {/* 情報編集力について詳しく見るボタン */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 6vw, 48px)' }}>
          <a 
            href="https://note.com/keepon_/n/naa62a18017a1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              fontSize: 'clamp(14px, 3vw, 16px)',
              display: 'inline-flex',
              transition: 'all 0.2s ease',
              background: 'var(--cream)',
              gap: '8px'
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
            <span>📖</span>
            「情報編集力」について詳しく見る
          </a>
        </div>

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
              description={<>他者とコミュニケーションをとって、<br />1人ではできないことにチャレンジするチカラ</>}
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
              description={<>常識や前例に疑問を持ち、<br />新しい考え方やアイデアを自ら生み出すチカラ</>}
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
              description={<>頭の中でシミュレーションし、<br />未来の出来事を予測して動き出すチカラ</>}
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
              description={<>他者の立場に立って考えて、<br />他者の視点・考え・行動をわかろうとするチカラ</>}
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
              description={<>自分の言葉で想いを表現し、<br />相手の気持ちを震わせ、動かすチカラ</>}
              color="var(--brand)"
              rotate="-1.5deg"
            />
          </div>
        </div>
      </Section>

      {/* トップページの入会までの流れ以降のセクション */}
      <FlowApply />
      <FAQ />
      <Students />
    </MobileContainer>
  );
}

