'use client';

import { useEffect, useRef, useState } from 'react';
import { Zen_Maru_Gothic } from 'next/font/google';
import Link from 'next/link';

const zenMaru = Zen_Maru_Gothic({
  weight: ['500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

// =========================================
// カウントアップアニメーション Hook
// =========================================
function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      // 即座にカウントアップ開始
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          let startTime: number;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasStarted, startOnView]);

  return { count, ref };
}

// =========================================
// メインコンポーネント
// =========================================
export function ClaftHopeClient() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
  // スクロールでrevealクラスをアクティブ化
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

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={zenMaru.className} style={{ width: '100%', overflow: 'hidden' }}>
      <HeroSection />
      <EmpathySection />
      <DataSection />
      <SolutionSection />
      <PhilosophySection />
      <CTASection />
    </div>
  );
}

// =========================================
// 1. ヒーローセクション
// =========================================
function HeroSection() {
  return (
    <section
      style={{
        width: '100%',
        minHeight: '100vh',
        padding: 'clamp(80px, 15vw, 120px) 20px clamp(60px, 10vw, 100px)',
        background: `
          radial-gradient(ellipse 800px 400px at 50% 0%, rgba(255, 246, 233, 0.9) 0%, transparent 70%),
          radial-gradient(ellipse 600px 400px at 20% 80%, rgba(52, 198, 190, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse 500px 300px at 80% 60%, rgba(240, 106, 106, 0.06) 0%, transparent 50%),
          linear-gradient(180deg, #FFF6E9 0%, #fbfefe 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 装飾用の浮遊オブジェクト */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle, rgba(255, 214, 107, 0.3), transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '8%',
          width: '60px',
          height: '60px',
          background: 'radial-gradient(circle, rgba(52, 198, 190, 0.25), transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40%',
          right: '15%',
          width: '40px',
          height: '40px',
          background: 'radial-gradient(circle, rgba(240, 106, 106, 0.2), transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <div
        style={{
          width: 'min(480px, 92%)',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* メインコピー */}
        <div
          style={{
            marginBottom: '28px',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 6vw, 2.4rem)',
              fontWeight: 900,
              color: 'var(--ink-900)',
              lineHeight: 1.4,
              marginBottom: '24px',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>
              正解のない時代を、
              <br />
              <span style={{ color: '#34c6be', position: 'relative' }}>
                希望
              </span>
              を持って歩んでいくために。
            </span>
          </h1>
        </div>

        {/* サブコピー */}
        <div
          style={{
            marginBottom: '40px',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
              lineHeight: 1.9,
              color: 'var(--ink-700)',
              fontWeight: 500,
            }}
          >
            テストの点数だけでは測れない、
            <br />
            お子さまの「好き」や「得意」が、
            <br />
            未来を切り拓く武器になる。
          </p>
        </div>

        {/* メインビジュアル（プレースホルダー） */}
        <div
          style={{
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '4/3',
              borderRadius: 'var(--radius-lg)',
              background: `
                linear-gradient(135deg, 
                  rgba(52, 198, 190, 0.15) 0%, 
                  rgba(255, 214, 107, 0.15) 50%,
                  rgba(240, 106, 106, 0.1) 100%
                )
              `,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              border: '3px solid rgba(255, 255, 255, 0.8)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* 装飾的な図形 */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
              <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34c6be" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#58c3a2" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="80" r="60" fill="url(#grad1)" />
                <circle cx="300" cy="200" r="80" fill="rgba(255, 214, 107, 0.2)" />
                <circle cx="200" cy="150" r="100" fill="rgba(240, 106, 106, 0.1)" />
                <path d="M50,250 Q200,200 350,220" stroke="#34c6be" strokeWidth="3" fill="none" opacity="0.4" />
              </svg>
            </div>
            <div
              style={{
                fontSize: 'clamp(3rem, 10vw, 5rem)',
                zIndex: 1,
              }}
            >
              🌱
            </div>
          </div>
        </div>

        {/* ブランドメッセージ */}
        <div>
          <p
            style={{
              fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
              lineHeight: 1.8,
              color: 'var(--ink-600)',
              fontWeight: 500,
              padding: '0 10px',
            }}
          >
            CLAFTは、学校と社会のあいだにある
            <br />
            <strong style={{ color: 'var(--ink-900)' }}>"分断"</strong>をつなぎ、
            <br />
            未来を自ら創り出す力を育む場所です。
          </p>
        </div>

        {/* スクロール誘導 */}
        <div
          style={{
            marginTop: '50px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 6 L16 26 M8 18 L16 26 L24 18"
                stroke="var(--ink-500)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--ink-500)',
                marginTop: '8px',
                letterSpacing: '0.1em',
              }}
            >
              scroll
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// =========================================
// 2. 共感セクション（3つの「足りない」）
// =========================================
function EmpathySection() {
  const concerns = [
    {
      id: 'tankyu',
      label: '探究',
      labelBg: 'rgba(240, 106, 106, 0.14)',
      accentColor: '#f06a6a',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="22" cy="22" r="14" stroke="#f06a6a" strokeWidth="3" fill="none" />
          <path d="M32 32 L42 42" stroke="#f06a6a" strokeWidth="3" strokeLinecap="round" />
          <circle cx="22" cy="22" r="6" fill="rgba(240, 106, 106, 0.2)" />
        </svg>
      ),
      keyword: '思考体力',
      title: 'キャリアをじっくり考える場所が少ない',
      description:
        '「どう生きるか」に正解はありません。受験は手段にすぎず、大切なのは「自分を知り、社会を知る」こと。社会に出る前の「自分探しの猶予期間（モラトリアム期）」に、納得いくまで自分の生き方を考える準備が必要です。',
    },
    {
      id: 'jissen',
      label: '実践',
      labelBg: 'rgba(255, 214, 107, 0.22)',
      accentColor: '#f0a629',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 8 L24 24 L36 36" stroke="#f0a629" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="24" r="18" stroke="#f0a629" strokeWidth="3" fill="none" strokeDasharray="6 4" />
          <circle cx="24" cy="24" r="4" fill="#ffd66b" />
        </svg>
      ),
      keyword: '好奇心',
      title: '「好き・得意」を試し続けられる場所が少ない',
      description:
        '一斉教育の中で「正解を早く答える」ことばかりが重視されています。しかし社会で問われるのは、「正解がない中で、自分の得意をどう活かすか」。失敗を恐れずに「好き」を試す経験こそが、自分らしさ（アイデンティティ）を確立させます。',
    },
    {
      id: 'taiwa',
      label: '対話',
      labelBg: 'rgba(52, 198, 190, 0.14)',
      accentColor: '#34c6be',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path
            d="M8 12 C8 10 10 8 12 8 L28 8 C30 8 32 10 32 12 L32 24 C32 26 30 28 28 28 L16 28 L10 34 L10 28 L12 28 C10 28 8 26 8 24 Z"
            stroke="#34c6be"
            strokeWidth="3"
            fill="rgba(52, 198, 190, 0.1)"
          />
          <path
            d="M36 16 L36 16 C38 16 40 18 40 20 L40 32 C40 34 38 36 36 36 L34 36 L34 42 L28 36 L20 36 C18 36 16 34 16 32 L16 30"
            stroke="#34c6be"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      ),
      keyword: '柔軟性',
      title: '自分の想いを自由に話せる場所が少ない',
      description:
        '「正解」や「評価」を気にしすぎると、心から安心して意見を言える「心理的安全性」が失われてしまいます。これからの時代に求められるのは競争ではなく、他者と補い合い、新しい価値を生む「共創」の力です。',
    },
  ];

  return (
    <section
      style={{
        width: '100%',
        padding: 'clamp(80px, 12vw, 120px) 20px',
        background: `
          linear-gradient(180deg, #fbfefe 0%, #fff 50%, #fbfefe 100%)
        `,
        position: 'relative',
      }}
    >
      <div style={{ width: 'min(480px, 92%)', margin: '0 auto' }}>
        {/* セクションタイトル */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              fontWeight: 900,
              color: 'var(--ink-900)',
              lineHeight: 1.4,
              marginBottom: '20px',
            }}
          >
            今の「当たり前」に、
            <br />
            <span style={{ color: '#f06a6a' }}>不安</span>を感じていませんか？
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
              lineHeight: 1.8,
              color: 'var(--ink-700)',
              fontWeight: 500,
            }}
          >
            <strong style={{ color: 'var(--ink-900)' }}>
              「一生懸命勉強して、いい学校に入れば安心」
            </strong>
            <br />
            ……そんな時代は、もう過去のものかもしれません。
          </p>
        </div>

        {/* 導入テキスト */}
        <div
          className="reveal"
          style={{
            marginBottom: '40px',
            padding: '24px',
            background: 'rgba(52, 198, 190, 0.06)',
            borderRadius: 'var(--radius)',
            borderLeft: '4px solid var(--brand)',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
              lineHeight: 1.8,
              color: 'var(--ink-700)',
              margin: 0,
            }}
          >
            今の日本で育つ若者たちは、自分らしく生きるために必要な
            <strong style={{ color: 'var(--ink-900)' }}>「3つの場所」</strong>
            が圧倒的に不足しています。
          </p>
        </div>

        {/* 3つのカード */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {concerns.map((item, index) => (
            <article
              key={item.id}
              className="reveal"
              style={{
                background: '#fff',
                borderRadius: 'var(--radius)',
                padding: 'clamp(28px, 6vw, 36px)',
                boxShadow: 'var(--shadow)',
                border: '1px solid rgba(0, 0, 0, 0.04)',
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* アイコンとラベル */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '20px',
                }}
              >
                {item.icon}
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '6px 14px',
                      background: item.labelBg,
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--ink-800)',
                      marginBottom: '6px',
                    }}
                  >
                    {item.label}
                  </span>
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: item.accentColor,
                      fontWeight: 700,
                      margin: 0,
                    }}
                  >
                    {item.keyword}
                  </p>
                </div>
              </div>

              {/* タイトル */}
              <h3
                style={{
                  fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
                  fontWeight: 700,
                  color: 'var(--ink-900)',
                  lineHeight: 1.5,
                  marginBottom: '16px',
                }}
              >
                {item.title}
              </h3>

              {/* 説明 */}
              <p
                style={{
                  fontSize: 'clamp(0.9rem, 2.2vw, 0.95rem)',
                  lineHeight: 1.85,
                  color: 'var(--ink-700)',
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================
// 3. データセクション（現状の可視化）
// =========================================
function DataSection() {
  const stat1 = useCountUp(67, 2000);
  const stat2 = useCountUp(34, 2000);
  const stat3 = useCountUp(19, 2000);

  const stats = [
    {
      value: stat1.count,
      decimal: '.3',
      unit: '%',
      ref: stat1.ref,
      color: '#f06a6a',
      label: '新入社員が感じる「スキル不足」の壁',
    },
    {
      value: stat2.count,
      decimal: '.9',
      unit: '%',
      ref: stat2.ref,
      color: '#34c6be',
      label: '大卒者の約3人に1人が3年以内に離職',
    },
    {
      value: stat3.count,
      decimal: '.0',
      unit: '%',
      ref: stat3.ref,
      color: '#f0a629',
      label: '日本の教育を「良い」と評価している人の割合',
    },
  ];

  return (
    <section
      style={{
        width: '100%',
        padding: 'clamp(80px, 12vw, 120px) 20px',
        background: `
          linear-gradient(180deg, #fbfefe 0%, rgba(31, 41, 55, 0.03) 50%, #fbfefe 100%)
        `,
        position: 'relative',
      }}
    >
      {/* 背景装飾 */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(240, 106, 106, 0.04), transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div style={{ width: 'min(480px, 92%)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* セクションタイトル */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              fontWeight: 900,
              color: 'var(--ink-900)',
              lineHeight: 1.4,
              marginBottom: '24px',
            }}
          >
            なぜ、まじめに勉強してきた子ほど
            <br />
            <span style={{ color: '#f06a6a' }}>戸惑う</span>のか。
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
              lineHeight: 1.8,
              color: 'var(--ink-700)',
              fontWeight: 500,
            }}
          >
            <strong style={{ color: 'var(--ink-900)' }}>
              「一生懸命勉強したのに、社会に出たら全然違った」
            </strong>
            <br />
            そんな声が溢れる原因は、本人の努力不足ではありません。
            <br />
            社会の変化に、学びの形が追いついていないのです。
          </p>
        </div>

        {/* 統計カード */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '40px' }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={stat.ref}
              className="reveal"
              style={{
                background: '#fff',
                borderRadius: 'var(--radius)',
                padding: 'clamp(28px, 6vw, 36px)',
                boxShadow: 'var(--shadow)',
                textAlign: 'center',
                transitionDelay: `${index * 100}ms`,
                border: `2px solid ${stat.color}20`,
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(3rem, 12vw, 4.5rem)',
                  fontWeight: 900,
                  color: stat.color,
                  lineHeight: 1,
                  marginBottom: '12px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {stat.value}
                <span style={{ fontSize: '0.5em' }}>{stat.decimal}</span>
                <span style={{ fontSize: '0.6em', marginLeft: '4px' }}>{stat.unit}</span>
              </div>
              <p
                style={{
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
                  fontWeight: 700,
                  color: 'var(--ink-800)',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* 出典 */}
        <p
          className="reveal"
          style={{
            fontSize: '0.75rem',
            color: 'var(--ink-500)',
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          （出典：産業能率大 2024年度調査 / イプソス 教育モニター2024）
        </p>

        {/* 結論テキスト */}
        <div
          className="reveal"
          style={{
            padding: '28px',
            background: 'linear-gradient(135deg, rgba(52, 198, 190, 0.08), rgba(88, 195, 162, 0.06))',
            borderRadius: 'var(--radius)',
            borderLeft: '4px solid var(--brand)',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
              lineHeight: 1.9,
              color: 'var(--ink-700)',
              margin: 0,
            }}
          >
            AIの進化により、記憶や計算といった「認知能力」はコンピュータが得意な領域になりました。
            だからこそ今、私たちは学びを
            <strong style={{ color: 'var(--ink-900)' }}>
              「入試のための勉強」から「社会を知り未来を予測するための学び」
            </strong>
            へとアップデートしなければなりません。
          </p>
        </div>
      </div>
    </section>
  );
}

// =========================================
// 4. 解決策セクション（CLAFTの定義）
// =========================================
function SolutionSection() {
  const claftLetters = [
    {
      letter: 'C',
      color: '#34c6be',
      bgColor: 'rgba(52, 198, 190, 0.15)',
      words: ['Creative（創造）', 'Communication（対話）'],
    },
    {
      letter: 'L',
      color: '#58c3a2',
      bgColor: 'rgba(88, 195, 162, 0.15)',
      words: ['Learning（すべての経験を「学び」に変える）'],
    },
    {
      letter: 'A',
      color: '#ffd66b',
      bgColor: 'rgba(255, 214, 107, 0.2)',
      words: ['Active（自ら問いを立て、動き出す主体性）'],
    },
    {
      letter: 'F',
      color: '#f06a6a',
      bgColor: 'rgba(240, 106, 106, 0.15)',
      words: ['Flexible（変化をチャンスとして楽しむ柔軟性）'],
    },
    {
      letter: 'T',
      color: '#34c6be',
      bgColor: 'rgba(52, 198, 190, 0.15)',
      words: ['Trial（失敗を恐れず、何度でも試す精神）'],
    },
  ];

  return (
    <section
      style={{
        width: '100%',
        padding: 'clamp(80px, 12vw, 120px) 20px',
        background: `
          radial-gradient(ellipse 800px 600px at 30% 20%, rgba(52, 198, 190, 0.08), transparent 60%),
          radial-gradient(ellipse 600px 400px at 70% 80%, rgba(255, 214, 107, 0.08), transparent 50%),
          linear-gradient(180deg, #fbfefe 0%, #fff 50%, #FFF6E9 100%)
        `,
        position: 'relative',
      }}
    >
      <div style={{ width: 'min(480px, 92%)', margin: '0 auto' }}>
        {/* セクションタイトル */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 5vw, 1.9rem)',
              fontWeight: 900,
              color: 'var(--ink-900)',
              lineHeight: 1.4,
              marginBottom: '20px',
            }}
          >
            CLAFTとは？
            <br />
            <span style={{ color: '#34c6be' }}>創って伝えて</span>学ぶ場所
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
              lineHeight: 1.8,
              color: 'var(--ink-700)',
            }}
          >
            CLAFTという名前には、学校と社会の分断をつなぎ、
            <br />
            子どもたちが自分で自分のキャリアを創っていくための
            <br />
            <strong style={{ color: 'var(--ink-900)' }}>6つの指針</strong>を込めています。
          </p>
        </div>

        {/* CLAFT 文字バッジ */}
        <div
          className="reveal"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '48px',
            flexWrap: 'wrap',
          }}
        >
          {claftLetters.map((item, index) => (
            <div
              key={item.letter}
              style={{
                width: 'clamp(50px, 12vw, 64px)',
                height: 'clamp(50px, 12vw, 64px)',
                borderRadius: '16px',
                background: item.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                fontWeight: 900,
                color: item.color,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                border: `2px solid ${item.color}40`,
              }}
            >
              {item.letter}
            </div>
          ))}
        </div>

        {/* 各文字の説明 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
          {claftLetters.map((item, index) => (
            <div
              key={item.letter}
              className="reveal"
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                padding: '20px',
                background: '#fff',
                borderRadius: 'var(--radius)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                borderLeft: `4px solid ${item.color}`,
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <div
                style={{
                  minWidth: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: item.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  color: item.color,
                }}
              >
                {item.letter}
              </div>
              <div style={{ flex: 1 }}>
                {item.words.map((word, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: 'clamp(0.9rem, 2.3vw, 1rem)',
                      fontWeight: 700,
                      color: 'var(--ink-800)',
                      margin: i > 0 ? '4px 0 0' : 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {word}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CL 循環図解 */}
        <div
          className="reveal"
          style={{
            background: '#fff',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(32px, 8vw, 48px)',
            boxShadow: 'var(--shadow)',
            marginBottom: '32px',
          }}
        >
          <h3
            style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
              fontWeight: 900,
              color: 'var(--ink-900)',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            【CL】好奇心の循環をつくる
          </h3>

          {/* 循環図 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '28px',
            }}
          >
            <svg width="240" height="180" viewBox="0 0 240 180">
              {/* 円形の矢印 */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#34c6be" />
                </marker>
              </defs>

              {/* 上の矢印（Creative → Communication） */}
              <path
                d="M60,90 Q60,40 120,40 Q180,40 180,90"
                stroke="#34c6be"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrowhead)"
                strokeDasharray="8 4"
              />

              {/* 下の矢印（Communication → Creative） */}
              <path
                d="M180,90 Q180,140 120,140 Q60,140 60,90"
                stroke="#58c3a2"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrowhead)"
                strokeDasharray="8 4"
              />

              {/* 中央の円 */}
              <circle cx="120" cy="90" r="35" fill="rgba(255, 214, 107, 0.3)" stroke="#ffd66b" strokeWidth="2" />
              <text x="120" y="85" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink-800)">
                好奇心
              </text>
              <text x="120" y="100" textAnchor="middle" fontSize="9" fill="var(--ink-600)">
                Curiosity
              </text>

              {/* 左のラベル */}
              <text x="30" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#34c6be">
                Creative
              </text>
              <text x="30" y="102" textAnchor="middle" fontSize="8" fill="var(--ink-500)">
                創造
              </text>

              {/* 右のラベル */}
              <text x="210" y="90" textAnchor="middle" fontSize="9" fontWeight="700" fill="#58c3a2">
                Communication
              </text>
              <text x="210" y="102" textAnchor="middle" fontSize="8" fill="var(--ink-500)">
                対話
              </text>
            </svg>
          </div>

          <p
            style={{
              fontSize: 'clamp(0.9rem, 2.2vw, 0.95rem)',
              lineHeight: 1.9,
              color: 'var(--ink-700)',
              textAlign: 'center',
            }}
          >
            自分の興味を形にする（<strong style={{ color: '#34c6be' }}>Creative</strong>）なかで、
            それを人に発表し共有する（<strong style={{ color: '#58c3a2' }}>Communication</strong>）。
            <br />
            そこで得た反応が新たな気づきとなり、また次の探究へと繋がっていく。
            <br />
            このサイクルを回すことで、義務感ではない
            <strong style={{ color: 'var(--ink-900)' }}>「学びたい！働きたい！」</strong>
            という自然な意欲が芽生えます。
          </p>
        </div>

        {/* L の説明 */}
        <div
          className="reveal"
          style={{
            background: 'linear-gradient(135deg, rgba(88, 195, 162, 0.1), rgba(52, 198, 190, 0.08))',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(28px, 7vw, 40px)',
            border: '2px solid rgba(88, 195, 162, 0.2)',
          }}
        >
          <h3
            style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
              fontWeight: 900,
              color: 'var(--ink-900)',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            【L】後悔（Regret）を学び（Learning）へ
          </h3>

          {/* R vs L ビジュアル */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '24px',
            }}
          >
            {/* R - グレーアウト */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '14px',
                  background: 'rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: 'var(--ink-400)',
                  textDecoration: 'line-through',
                  textDecorationColor: 'var(--ink-400)',
                  position: 'relative',
                }}
              >
                R
              </div>
              <p
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--ink-400)',
                  marginTop: '6px',
                  fontWeight: 500,
                }}
              >
                Regret
              </p>
            </div>

            {/* 矢印 */}
            <svg width="36" height="20" viewBox="0 0 36 20">
              <path
                d="M4 10 L28 10 M22 5 L28 10 L22 15"
                stroke="var(--brand)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* L - 輝く */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(88, 195, 162, 0.25), rgba(52, 198, 190, 0.35))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: '#34c6be',
                  boxShadow: '0 6px 16px rgba(52, 198, 190, 0.3)',
                  border: '2px solid rgba(52, 198, 190, 0.4)',
                }}
              >
                L
              </div>
              <p
                style={{
                  fontSize: '0.7rem',
                  color: '#34c6be',
                  marginTop: '6px',
                  fontWeight: 700,
                }}
              >
                Learning
              </p>
            </div>
          </div>

          <p
            style={{
              fontSize: 'clamp(0.9rem, 2.2vw, 0.95rem)',
              lineHeight: 1.9,
              color: 'var(--ink-700)',
              textAlign: 'center',
            }}
          >
            人生100年時代、学びと仕事は往復し続けるものです。
            <br />
            失敗を<strong style={{ color: 'var(--ink-500)', textDecoration: 'line-through' }}>Regret（後悔）</strong>
            して立ち止まるのではなく、すべてを
            <strong style={{ color: '#58c3a2' }}>Learning（学び）</strong>として捉える。
            <br />
            このマインドセットがあれば、どんな変化も恐れることはありません。
          </p>
        </div>
      </div>
    </section>
  );
}

// =========================================
// 5. 哲学セクション（AFTの成果）
// =========================================
function PhilosophySection() {
  const outcomes = [
    {
      letter: 'A',
      title: 'Active：主体的な行動力の向上',
      color: '#ffd66b',
      description:
        '「指示待ち」ではなく、自分で問いを立てて動く力が育ちます。アクションを起こすことで得られる学びのサイクルが、自分への確信（自己効力感）を支えます。',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path
            d="M24 6 L28 14 L36 16 L30 24 L32 32 L24 28 L16 32 L18 24 L12 16 L20 14 Z"
            fill="rgba(255, 214, 107, 0.25)"
            stroke="#ffd66b"
            strokeWidth="2"
          />
          <path d="M24 6 L24 28 M24 28 L18 32 M24 28 L30 32" stroke="#f0a629" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      letter: 'F',
      title: 'Flexible：柔軟な適応力の向上',
      color: '#f06a6a',
      description:
        '異なる価値観を持つ仲間との対話を通じ、変化をチャンスとして捉えるしなやかさを養います。これは現代社会で不可欠な「情報編集力（＝自分らしく情報を組み立て、伝える力）」の土台となります。',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path
            d="M8 18 Q12 10, 20 12 Q28 14, 24 22 Q20 30, 28 32 Q36 34, 40 26"
            stroke="#f06a6a"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="8" cy="18" r="3" fill="#f06a6a" />
          <circle cx="40" cy="26" r="3" fill="#f06a6a" />
        </svg>
      ),
    },
    {
      letter: 'T',
      title: 'Trial：何度も試し続ける精神',
      color: '#34c6be',
      description:
        '「学ばなきゃ」という義務感から解放され、「やってみたい」という好奇心で挑み続ける。たとえ道が変わっても、その周辺にある多様な可能性に気づける強さが身につきます。',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="16" stroke="#34c6be" strokeWidth="3" fill="none" />
          <path d="M24 8 L24 24 L36 24" stroke="#34c6be" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M36 12 L40 16 L36 20"
            stroke="#58c3a2"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      style={{
        width: '100%',
        padding: 'clamp(80px, 12vw, 120px) 20px',
        background: `
          radial-gradient(ellipse 900px 500px at 50% 30%, rgba(52, 198, 190, 0.06), transparent 60%),
          radial-gradient(ellipse 600px 400px at 20% 70%, rgba(255, 214, 107, 0.06), transparent 50%),
          linear-gradient(180deg, #FFF6E9 0%, #fbfefe 50%, #fff 100%)
        `,
        position: 'relative',
      }}
    >
      <div style={{ width: 'min(480px, 92%)', margin: '0 auto' }}>
        {/* セクションタイトル */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 5vw, 1.9rem)',
              fontWeight: 900,
              color: 'var(--ink-900)',
              lineHeight: 1.4,
              marginBottom: '16px',
            }}
          >
            CLAFTによって、
            <br />
            お子さまはどう<span style={{ color: '#34c6be' }}>変わる</span>か（AFT）
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
              lineHeight: 1.8,
              color: 'var(--ink-700)',
            }}
          >
            主体的な行動力と、しなやかな適応力。
            <br />
            それが<strong style={{ color: '#34c6be' }}>「希望」</strong>の正体です。
          </p>
        </div>

        {/* AFT 成果カード */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {outcomes.map((item, index) => (
            <article
              key={item.letter}
              className="reveal"
              style={{
                background: '#fff',
                borderRadius: 'var(--radius)',
                padding: 'clamp(28px, 7vw, 40px)',
                boxShadow: 'var(--shadow)',
                transitionDelay: `${index * 100}ms`,
                border: '1px solid rgba(0, 0, 0, 0.04)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                {/* アイコン */}
                <div style={{ minWidth: '48px' }}>{item.icon}</div>

                <div style={{ flex: 1 }}>
                  {/* タイトル */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: `${item.color}30`,
                        fontSize: '1rem',
                        fontWeight: 900,
                        color: item.color,
                      }}
                    >
                      {item.letter}
                    </span>
                    <h3
                      style={{
                        fontSize: 'clamp(15px, 3.2vw, 18px)',
                        fontWeight: 700,
                        color: 'var(--ink-900)',
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.title.split('：')[1]}
                    </h3>
                  </div>

                  {/* 説明 */}
                  <p
                    style={{
                      fontSize: 'clamp(0.9rem, 2.2vw, 0.95rem)',
                      lineHeight: 1.85,
                      color: 'var(--ink-700)',
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================
// 6. CTAセクション
// =========================================
function CTASection() {
  return (
    <section
      style={{
        width: '100%',
        padding: 'clamp(80px, 12vw, 120px) 20px clamp(100px, 15vw, 140px)',
        background: `
          radial-gradient(ellipse 1000px 600px at 50% 80%, rgba(52, 198, 190, 0.1), transparent 60%),
          radial-gradient(ellipse 600px 400px at 20% 20%, rgba(255, 214, 107, 0.1), transparent 50%),
          linear-gradient(180deg, #fff 0%, #FFF6E9 50%, rgba(52, 198, 190, 0.05) 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 装飾 */}
      <div
        style={{
          position: 'absolute',
          bottom: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(52, 198, 190, 0.08), transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div style={{ width: 'min(480px, 92%)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* メインメッセージ */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              fontWeight: 900,
              color: 'var(--ink-900)',
              lineHeight: 1.4,
              marginBottom: '28px',
            }}
          >
            予測不可能な未来を、
            <br />
            <span style={{ color: '#34c6be' }}>自分の手</span>で創っていく
          </h2>

          <div
            style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
              lineHeight: 2,
              color: 'var(--ink-700)',
            }}
          >
            <p style={{ marginBottom: '16px' }}>
              「未来がどうなるか分からない」ことは、
              <br />
              不安なことではありません。
            </p>
            <p style={{ marginBottom: '16px' }}>
              自分で考え、仲間と対話し、何度もカタチにしてみる。
              <br />
              その過程で得られる手応えこそが、
              <br />
              お子さまの人生を支える一番の根っこになります。
            </p>
          </div>
        </div>

        {/* 感情的なメッセージ */}
        <div
          className="reveal"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 214, 107, 0.2), rgba(255, 246, 233, 0.8))',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(32px, 7vw, 48px)',
            textAlign: 'center',
            marginBottom: '40px',
            border: '2px dashed rgba(255, 214, 107, 0.5)',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(16px, 3.5vw, 20px)',
              fontWeight: 700,
              color: 'var(--ink-900)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            お子さまが
            <br />
            <span
              style={{
                color: '#34c6be',
                fontSize: '1.15em',
              }}
            >
              「未来が楽しみだ」
            </span>
            <br />
            と笑顔で言える毎日を、
            <br />
            一緒に始めませんか？
          </p>
        </div>

        {/* CTAボタン */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* メインCTA */}
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: 'clamp(16px, 4vw, 20px) clamp(24px, 5vw, 32px)',
              background: 'linear-gradient(135deg, #34c6be, #58c3a2)',
              color: '#fff',
              borderRadius: 'var(--radius)',
              fontSize: 'clamp(15px, 3.2vw, 18px)',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(52, 198, 190, 0.35)',
              transition: 'all 0.3s ease',
              gap: '12px',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            無料体験・オンライン説明会に申し込む
          </Link>

          {/* LINE CTA */}
          <a
            href="https://line.me/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: 'clamp(14px, 3.5vw, 18px) clamp(24px, 5vw, 32px)',
              background: '#06c755',
              color: '#fff',
              borderRadius: 'var(--radius)',
              fontSize: 'clamp(14px, 3vw, 16px)',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 6px 16px rgba(6, 199, 85, 0.3)',
              transition: 'all 0.3s ease',
              gap: '10px',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            LINEで気軽に質問する
          </a>
        </div>

        {/* 追加のメッセージ */}
        <p
          className="reveal"
          style={{
            fontSize: '0.75rem',
            color: 'var(--ink-500)',
            textAlign: 'center',
            marginTop: '28px',
            lineHeight: 1.7,
          }}
        >
          ご不明点がございましたら、お気軽にお問い合わせください。
          <br />
          専任スタッフがお答えいたします。
        </p>
      </div>
    </section>
  );
}

export default ClaftHopeClient;

