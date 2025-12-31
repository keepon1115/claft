'use client';

import { MobileContainer, Section } from '@/components/MobileContainer';
import { useState, useEffect, useRef } from 'react';

// コースカードコンポーネント
const CourseCard = ({
  title,
  description,
  features,
  target,
  price,
  color,
  icon,
  delay = 0,
  isVisible = false
}: {
  title: string;
  description: string;
  features: string[];
  target: string;
  price: string;
  color: string;
  icon: string;
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
      {/* カテゴリバッジ */}
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
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        <span>{icon}</span>
        <span>人気コース</span>
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
      <p className="body-base" style={{ marginBottom: '20px', lineHeight: '1.7' }}>
        {description}
      </p>

      {/* 特徴リスト */}
      <div style={{ marginBottom: '24px' }}>
        <h4
          className="heading-sm"
          style={{ fontSize: 'clamp(14px, 3vw, 16px)', marginBottom: '12px' }}
        >
          身につく力
        </h4>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {features.map((feature, i) => (
            <li
              key={i}
              className="body-sm"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: color,
                  flexShrink: 0
                }}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

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
      <button
        className="btn btn-primary"
        style={{
          width: '100%',
          justifyContent: 'center',
          background: color,
          fontSize: 'clamp(14px, 3vw, 16px)',
          padding: 'clamp(12px, 3vw, 16px)'
        }}
      >
        詳しく見る →
      </button>
    </div>
  </div>
);

// 比較表コンポーネント
const ComparisonTable = ({ isVisible = false }: { isVisible?: boolean }) => {
  const rows = [
    {
      label: '授業時間',
      minecraft: '週1回 60分',
      robot: '週1回 90分'
    },
    {
      label: '使用ツール',
      minecraft: 'Minecraft Education Edition',
      robot: 'アーテックロボット + Scratch'
    },
    {
      label: '身につくスキル',
      minecraft: '探究力・創造力・発信力',
      robot: '論理的思考・問題解決力'
    },
    {
      label: '月額料金',
      minecraft: '¥12,000〜',
      robot: '¥15,000〜'
    }
  ];

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 200ms',
        overflowX: 'auto'
      }}
    >
      <div
        style={{
          background: 'var(--card)',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(20px, 4vw, 28px)',
          boxShadow: 'var(--shadow)',
          minWidth: '280px'
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '0 12px'
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: 'left',
                  padding: '12px',
                  fontSize: 'clamp(13px, 2.8vw, 15px)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--ink-600)'
                }}
              >
                項目
              </th>
              <th
                style={{
                  textAlign: 'center',
                  padding: '12px',
                  fontSize: 'clamp(13px, 2.8vw, 15px)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--green)',
                  background: 'rgba(88, 195, 162, 0.08)',
                  borderRadius: '8px 8px 0 0'
                }}
              >
                マイクラ
              </th>
              <th
                style={{
                  textAlign: 'center',
                  padding: '12px',
                  fontSize: 'clamp(13px, 2.8vw, 15px)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--pink)',
                  background: 'rgba(240, 106, 106, 0.08)',
                  borderRadius: '8px 8px 0 0'
                }}
              >
                ロボット
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td
                  className="body-sm emphasis"
                  style={{
                    padding: '16px 12px',
                    borderBottom: i === rows.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.06)',
                    fontSize: 'clamp(12px, 2.5vw, 14px)'
                  }}
                >
                  {row.label}
                </td>
                <td
                  className="body-sm"
                  style={{
                    padding: '16px 12px',
                    textAlign: 'center',
                    borderBottom: i === rows.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.06)',
                    fontSize: 'clamp(12px, 2.5vw, 14px)',
                    color: 'var(--ink-700)'
                  }}
                >
                  {row.minecraft}
                </td>
                <td
                  className="body-sm"
                  style={{
                    padding: '16px 12px',
                    textAlign: 'center',
                    borderBottom: i === rows.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.06)',
                    fontSize: 'clamp(12px, 2.5vw, 14px)',
                    color: 'var(--ink-700)'
                  }}
                >
                  {row.robot}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// FAQアイテムコンポーネント
const FAQItem = ({
  question,
  answer,
  delay = 0
}: {
  question: string;
  answer: string;
  delay?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="reveal"
      style={{
        background: 'var(--card)',
        borderRadius: '16px',
        padding: 'clamp(16px, 3vw, 20px)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        marginBottom: '12px',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(0,0,0,0.04)'
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          gap: '12px'
        }}
      >
        <h4 className="heading-sm" style={{ fontSize: 'clamp(14px, 3vw, 16px)', margin: 0 }}>
          {question}
        </h4>
        <span
          style={{
            fontSize: '20px',
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            flexShrink: 0
          }}
        >
          ▼
        </span>
      </div>
      {isOpen && (
        <p
          className="body-base"
          style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            lineHeight: '1.7',
            color: 'var(--ink-700)'
          }}
        >
          {answer}
        </p>
      )}
    </div>
  );
};

export function CoursesClient() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false]);
  const [visibleTable, setVisibleTable] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // カードのアニメーション
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards([true, false]);
            setTimeout(() => setVisibleCards([true, true]), 200);
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

  // 比較表のアニメーション
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleTable(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (tableRef.current) {
      observer.observe(tableRef.current);
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
              お子様の興味に合わせて選べる
              <br />
              2つの専門コース。
            </p>
          </div>
        </div>
      </Section>

      {/* ========================================
          Course Selector (Tab) - 将来の拡張用
          ======================================== */}
      <Section>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            padding: '8px',
            background: 'var(--bg)',
            borderRadius: '16px',
            marginBottom: '32px'
          }}
        >
          <button
            className="btn"
            style={{
              flex: 1,
              justifyContent: 'center',
              background: 'var(--brand)',
              color: 'white',
              border: 'none',
              fontSize: 'clamp(14px, 3vw, 16px)',
              pointerEvents: 'none'
            }}
          >
            小学生・中高生向け
          </button>
        </div>
      </Section>

      {/* ========================================
          Course Cards
          ======================================== */}
      <Section>
        <h2
          className="heading-lg"
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(32px, 6vw, 40px)',
            position: 'relative'
          }}
        >
          選べる2つのコース
          <svg
            style={{
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '12px'
            }}
            viewBox="0 0 120 12"
            preserveAspectRatio="none"
          >
            <path
              d="M5,8 Q30,4 60,8 T115,8"
              stroke="var(--brand)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.3"
            />
          </svg>
        </h2>

        <div ref={cardsRef} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* カードA：マイクラSDGsコース */}
          <CourseCard
            title="マイクラSDGsコース"
            description="世界的に人気のMinecraftを使って、SDGsをテーマに探究・創造・発信する力を育みます。"
            features={['探究力', '創造力', '発信力', 'ICTリテラシー']}
            target="小学3年生〜中学3年生"
            price="¥12,000〜"
            color="var(--green)"
            icon="🎮"
            delay={0}
            isVisible={visibleCards[0]}
          />

          {/* カードB：ロボットプログラミングコース */}
          <CourseCard
            title="ロボットプログラミングコース"
            description="アーテックロボットを使った本格的なプログラミング学習。論理的思考と問題解決力を養います。"
            features={['論理的思考', '試行錯誤の価値', '問題解決力', '創造力']}
            target="小学3年生〜中学3年生"
            price="¥15,000〜"
            color="var(--pink)"
            icon="🤖"
            delay={200}
            isVisible={visibleCards[1]}
          />
        </div>
      </Section>

      {/* ========================================
          Comparison Table
          ======================================== */}
      <Section>
        <h2
          className="heading-lg"
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(32px, 6vw, 40px)',
            position: 'relative'
          }}
        >
          コース比較
          <svg
            style={{
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '12px'
            }}
            viewBox="0 0 100 12"
            preserveAspectRatio="none"
          >
            <path
              d="M5,8 Q25,4 50,8 T95,8"
              stroke="var(--cream)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        </h2>

        <div ref={tableRef}>
          <ComparisonTable isVisible={visibleTable} />
        </div>

        <p
          className="body-sm"
          style={{
            textAlign: 'center',
            color: 'var(--ink-500)',
            marginTop: '20px',
            fontStyle: 'italic'
          }}
        >
          ※ 料金は税込表示です
        </p>
      </Section>

      {/* ========================================
          Common FAQ
          ======================================== */}
      <Section>
        <h2
          className="heading-lg"
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(32px, 6vw, 40px)',
            position: 'relative'
          }}
        >
          よくある質問
          <svg
            style={{
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '12px'
            }}
            viewBox="0 0 120 12"
            preserveAspectRatio="none"
          >
            <path
              d="M5,8 Q30,4 60,8 T115,8"
              stroke="var(--pink)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.3"
            />
          </svg>
        </h2>

        <div>
          <FAQItem
            question="入会金はかかりますか？"
            answer="はい、入会金として11,000円（税込）をいただいております。ただし、キャンペーン期間中は入会金無料となる場合がございますので、お気軽にお問い合わせください。"
            delay={0}
          />
          <FAQItem
            question="授業を休んだ場合、振替はできますか？"
            answer="はい、可能です。前日までにご連絡いただければ、別の日時に振替授業を受けることができます。お子様の体調不良や学校行事などにも柔軟に対応しております。"
            delay={100}
          />
          <FAQItem
            question="パソコンやタブレットは必要ですか？"
            answer="はい、授業にはパソコンまたはタブレットが必要です。教室でも貸し出しを行っておりますので、ご自宅に機材がない場合でもご安心ください。詳しくはお問い合わせください。"
            delay={200}
          />
          <FAQItem
            question="プログラミング未経験でも大丈夫ですか？"
            answer="もちろん大丈夫です！初めてのお子様でも楽しく学べるよう、基礎から丁寧に指導いたします。むしろ、初めての方が多数派ですのでご安心ください。"
            delay={300}
          />
          <FAQItem
            question="月の途中から入会できますか？"
            answer="はい、いつでも入会可能です。月の途中からご入会の場合は、残りの授業回数に応じて日割り計算させていただきます。"
            delay={400}
          />
        </div>
      </Section>

      {/* ========================================
          CTA Section
          ======================================== */}
      <Section>
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(52, 198, 190, 0.08) 0%, rgba(88, 195, 162, 0.08) 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(32px, 6vw, 40px)',
            textAlign: 'center',
            border: '2px solid rgba(52, 198, 190, 0.2)'
          }}
        >
          <h3 className="heading-md" style={{ marginBottom: '16px' }}>
            まずは無料体験から！
          </h3>
          <p className="body-base" style={{ marginBottom: '24px', color: 'var(--ink-700)' }}>
            どのコースが合うか迷っている方も、
            <br />
            まずはお気軽に体験してみてください。
          </p>
          <button
            className="btn btn-primary"
            style={{
              fontSize: 'clamp(15px, 3.2vw, 18px)',
              padding: 'clamp(14px, 3vw, 18px) clamp(32px, 6vw, 40px)',
              boxShadow: '0 6px 16px rgba(52, 198, 190, 0.3)'
            }}
            onClick={() => {
              window.location.href = '/contact';
            }}
          >
            無料体験を申し込む →
          </button>
        </div>
      </Section>
    </MobileContainer>
  );
}

