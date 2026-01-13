'use client';

import { useEffect, useRef, useState } from 'react';
import { Zen_Maru_Gothic, Shippori_Mincho } from 'next/font/google';
import Link from 'next/link';
import { FlowApply } from '@/components/FlowApply';
import { FAQ } from '@/components/FAQ';
import { Students } from '@/components/Students';

const zenMaru = Zen_Maru_Gothic({
  weight: ['500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

const shipporiMincho = Shippori_Mincho({
  weight: ['400', '500', '600', '700'],
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
      <FlowApply />
      <FAQ />
      <Students />
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
              正解のない社会を、
              <br />
              <span style={{ color: '#34c6be', position: 'relative' }}>
                希望
              </span>
              を抱き歩むために。
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
            偏差値を上げることの前に、
            <br />
            将来なにがしたいか？どうありたいか？
            <br />
            自分のキャリアを考える時間が必要です。
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
            CLAFTは、<strong style={{ color: 'var(--ink-900)' }}>"学校と社会"</strong>をつなぎ、
            <br />
            自分の手で自分のキャリアを創るスクールです。
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
  // 各カードの開閉状態を管理
  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({
    tankyu: false,
    jissen: false,
    taiwa: false,
  });

  // 開閉トグル関数
  const toggleOpen = (id: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const concerns = [
    {
      id: 'tankyu',
      label: '探究',
      labelBg: 'rgba(240, 106, 106, 0.14)',
      accentColor: '#f06a6a',
      icon: (
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
          <circle cx="22" cy="22" r="14" stroke="#f06a6a" strokeWidth="3" fill="none" />
          <path d="M32 32 L42 42" stroke="#f06a6a" strokeWidth="3" strokeLinecap="round" />
          <circle cx="22" cy="22" r="6" fill="rgba(240, 106, 106, 0.2)" />
        </svg>
      ),
      keyword: '思考体力',
      labelText: '探究する場所',
      title: '自分のキャリアをじっくり考えられる場所が少ない！',
      description: (
        <>
          キャリア＝人生を「どう生きるか」に、本来正解はありません。
          <br />
          <br />
          テストで高い点数を取ることや、大企業に入ることは"正解"ではなく、あくまで数ある選択肢のひとつです。
          <br />
          受験に関しても、テスト（一般入試）はひとつの手段にすぎず、今では全体の50%を下回っています。
          <br />
          <br />
          そういったキャリアの選択をしていくためには、<strong>自己理解（自分を知ること）</strong>と<strong>社会理解（社会を知ること）</strong>が欠かせません。
          社会に出る前の<strong>モラトリアム期（※1）</strong>――まだ社会的な責任を負わずに、自分の生き方を自由に考えられる時期に、
          <br />
          自分のキャリアについてじっくり考える時間や、その場所が必要であると考えます。
          <br />
          <br />
          <span style={{ fontSize: '0.85em', color: 'var(--ink-600)' }}>
            ※1：モラトリアム期とは、心理学者エリク・エリクソンが提唱した言葉で、社会に出る前の"自分探しの猶予期間"を指します。高校・大学など、進路や将来を考える時期にあたります。
          </span>
        </>
      ),
    },
    {
      id: 'jissen',
      label: '実践',
      labelBg: 'rgba(255, 214, 107, 0.22)',
      accentColor: '#f0a629',
      icon: (
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
          <path d="M24 8 L24 24 L36 36" stroke="#f0a629" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="24" r="18" stroke="#f0a629" strokeWidth="3" fill="none" strokeDasharray="6 4" />
          <circle cx="24" cy="24" r="4" fill="#ffd66b" />
        </svg>
      ),
      keyword: '好奇心',
      labelText: '実践する場所',
      title: '自分の好き・得意を試し続けられる場所が少ない！',
      description: (
        <>
          人はそれぞれ、興味・能力・価値観が異なります。
          <br />
          住んでいる場所や家庭環境、出会う人々など、置かれている環境も一人ひとり違います。
          <br />
          <br />
          それにもかかわらず、今の学校教育では、共通の教科書のもとで一斉に学び、「正解をいかに早く覚えるか」に力を注ぐのが一般的です。
          <br />
          <br />
          社会に出ると状況は一変し、<strong>正解がない状況で自分の得意をどう活かして他者や社会に貢献できるか？</strong>が問われます。
          <br />
          そのためには、自分の「好き」や「得意」をとことん試し、失敗も含めて経験することが大切だと考えます。
          <br />
          <br />
          そうした経験を通して、自分の<strong>アイデンティティ（※2）</strong>を確立し、自分らしく生きていくことができます。
          <br />
          <br />
          <span style={{ fontSize: '0.85em', color: 'var(--ink-600)' }}>
            ※2：アイデンティティとは、「自分は何者で、どんな価値を大切にして生きていくのか」という自己の確立のこと。
          </span>
        </>
      ),
    },
    {
      id: 'taiwa',
      label: '対話',
      labelBg: 'rgba(52, 198, 190, 0.14)',
      accentColor: '#34c6be',
      icon: (
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
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
      labelText: '対話する場所',
      title: '自分の考えや感じたことを自由に話せる場所が少ない！',
      description: (
        <>
          「正解」を意識しすぎると、自分の考えや感じたことを、自由に言葉にできなくなってしまいます。
          <br />
          数値や結果ばかりを重視していると、周囲からの評価を気にしてしまい、<strong>心理的安全性（※3）</strong>が失われていきます。
          <br />
          <br />
          スマホを開けば誰かの人生が目に入り、つい自分と比べてしまう。
          <br />
          そんな世の中だからこそ、他者との競争ではなく、共に創る<strong>「共創」</strong>の意識が大切です。
          <br />
          <br />
          互いの違いを持ち寄り、補い合いながら新しい価値をつくる力。それこそが、今後の社会を動かすエネルギーになります。
          <br />
          そのためには、互いの違いを認め合い、誰もが安心して意見を出し合える場が必要であると考えます。
          <br />
          <br />
          <span style={{ fontSize: '0.85em', color: 'var(--ink-600)' }}>
            ※3：心理的安全性とは、ハーバード大学のエイミー・エドモンドソンが提唱した概念で、「自分の考えを言っても否定されない」「失敗しても責められない」と感じられる安心感のこと。
          </span>
        </>
      ),
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
            変化が激しい社会に、
            <br />
            <span style={{ color: '#f06a6a' }}>公教育</span>は対応できているのか？
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
              lineHeight: 1.8,
              color: 'var(--ink-700)',
              fontWeight: 500,
            }}
          >
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
            日本の若者が置かれている環境において
            <br />
            <strong style={{ color: 'var(--ink-900)' }}>「3つの場所」</strong>が不足していると考えます。
          </p>
        </div>

        {/* 3つのカード */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {concerns.map((item, index) => {
            const isOpen = openStates[item.id];
            
            return (
              <article
                key={item.id}
                className="reveal"
                style={{
                  background: '#fff',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow)',
                  border: '1px solid rgba(0, 0, 0, 0.04)',
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* 上部：課題の提示エリア */}
                <div
                  style={{
                    padding: 'clamp(28px, 6vw, 36px)',
                    paddingBottom: isOpen ? 'clamp(24px, 5vw, 32px)' : 'clamp(20px, 4.5vw, 28px)',
                    transition: 'padding 0.3s ease',
                  }}
                >
                  {/* アイコンと見出しと開閉ボタン */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      marginBottom: isOpen ? '20px' : '0',
                      transition: 'margin 0.3s ease',
                    }}
                  >
                    <div style={{ flexShrink: 0, marginTop: '4px' }}>
                      {item.icon}
                    </div>
                    <h3
                      style={{
                        flex: 1,
                        fontSize: 'clamp(1.15rem, 3.2vw, 1.3rem)',
                        fontWeight: 900,
                        color: 'var(--ink-900)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {item.title}
                    </h3>
                    {/* 開閉ボタン */}
                    <button
                      onClick={() => toggleOpen(item.id)}
                      aria-label={isOpen ? '詳細を閉じる' : '詳細を開く'}
                      aria-expanded={isOpen}
                      style={{
                        flexShrink: 0,
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: item.labelBg,
                        border: `2px solid ${item.accentColor}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: isOpen ? `0 4px 12px ${item.accentColor}30` : '0 2px 6px rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        <path
                          d="M6 9 L12 15 L18 9"
                          stroke={item.accentColor}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* 説明文（アコーディオン） */}
                  <div
                    style={{
                      maxHeight: isOpen ? '2000px' : '0',
                      opacity: isOpen ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.5s ease, opacity 0.3s ease',
                      paddingLeft: 'clamp(54px, 12vw, 54px)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 'clamp(0.9rem, 2.2vw, 0.95rem)',
                        lineHeight: 1.9,
                        color: 'var(--ink-700)',
                        paddingTop: '16px',
                      }}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>

                {/* 下部：結論エリア */}
                <div
                  style={{
                    background: 'rgba(248, 250, 252, 0.8)',
                    borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                    padding: 'clamp(20px, 5vw, 28px) clamp(28px, 6vw, 36px)',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      fontSize: 'clamp(0.85rem, 2.2vw, 0.95rem)',
                      fontWeight: 600,
                      color: 'var(--ink-800)',
                      margin: 0,
                      lineHeight: 1.7,
                    }}
                  >
                    必要なのは{' '}
                    <strong
                      style={{
                        fontWeight: 900,
                        color: item.accentColor,
                        textShadow: `0 0 15px ${item.accentColor}20`,
                      }}
                    >
                      {item.labelText}
                    </strong>
                    {' '}で{' '}
                    <br />
                    <strong
                      style={{
                        fontWeight: 900,
                        color: item.accentColor,
                        fontSize: '1.1em',
                        textShadow: `0 0 20px ${item.accentColor}30`,
                      }}
                    >
                      {item.keyword}
                    </strong>
                    {' '}を育むこと！
                  </p>
                </div>
              </article>
            );
          })}
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
      title: '新入社員が感じる「スキル不足」',
      description: '自分の能力不足がストレス源。社会の厳しさを痛感する若者は6割越え。',
      source: '出典：産業能率大「2024年度 新入社員会社生活調査」',
    },
    {
      value: stat2.count,
      decimal: '.9',
      unit: '%',
      ref: stat2.ref,
      color: '#34c6be',
      title: '3年以内の離職率',
      description: '大卒の約5人に1人が早期離職、高卒ではさらに深刻。',
      source: '出典：産業能率大「2024年度 新入社員会社生活調査」',
    },
    {
      value: stat3.count,
      decimal: '.0',
      unit: '%',
      ref: stat3.ref,
      color: '#f0a629',
      title: '日本の教育を「良い」と評価',
      description: '国際比較で低位。生徒も先生も保護者も「何か違う」と感じている。',
      source: '出典：イプソス「教育モニター2024」調査レポート',
    },
  ];

  return (
    <section
      style={{
        width: '100%',
        padding: 'clamp(80px, 12vw, 120px) 20px',
        background: `
          linear-gradient(180deg, #fbfefe 0%, rgba(31, 41, 55, 0.08) 50%, rgba(31, 41, 55, 0.06) 100%)
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
          background: 'radial-gradient(circle, rgba(240, 106, 106, 0.06), transparent 70%)',
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
            まじめに勉強してきた人ほど
            <br />
            <span style={{ color: '#f06a6a' }}>社会で戸惑っている現代</span>
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
            <strong style={{ color: 'var(--ink-900)' }}>
            「自分が本当にやりたいことって、なんだろう…？」
            </strong>
            <br />
            そんな声が、今の日本社会にはあふれています。
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
                textAlign: 'left',
                transitionDelay: `${index * 100}ms`,
                border: `2px solid ${stat.color}20`,
              }}
            >
              {/* 数字 */}
              <div
                style={{
                  fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
                  fontWeight: 900,
                  color: stat.color,
                  lineHeight: 1,
                  marginBottom: '8px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {stat.value}
                <span style={{ fontSize: '0.5em' }}>{stat.decimal}</span>
                <span style={{ fontSize: '0.6em', marginLeft: '4px' }}>{stat.unit}</span>
                <span 
                  style={{ 
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)', 
                    fontWeight: 700,
                    color: 'var(--ink-800)',
                    marginLeft: '12px',
                    verticalAlign: 'middle',
                  }}
                >
                  ｜{stat.title}
                </span>
              </div>
              
              {/* 説明文 */}
              <p
                style={{
                  fontSize: 'clamp(0.85rem, 2.2vw, 0.95rem)',
                  fontWeight: 500,
                  color: 'var(--ink-700)',
                  margin: '12px 0',
                  lineHeight: 1.7,
                }}
              >
                {stat.description}
              </p>
              
              {/* 出典 */}
              <p
                style={{
                  fontSize: 'clamp(0.7rem, 1.8vw, 0.75rem)',
                  color: 'var(--ink-500)',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                <small>{stat.source}</small>
              </p>
            </div>
          ))}
        </div>

        {/* エディトリアル・フォーカス：結論テキスト */}
        <div
          className="reveal container"
          style={{
            padding: 'clamp(40px, 8vw, 60px) 0',
          }}
        >
          <div
            style={{
              position: 'relative',
              paddingLeft: 'clamp(32px, 7vw, 40px)',
            }}
          >
            {/* アクセントライン（左側の垂直線） */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '6px',
                background: 'var(--brand)',
                borderRadius: '3px',
              }}
            />

            {/* リード文（冒頭） */}
            <p className="body-lg" style={{ marginBottom: '32px' }}>
              原因は、決して本人の努力不足ではありません。むしろ、まじめに勉強してきた人ほど戸惑ってしまうのです。
            </p>

            {/* 中核フレーズ（マーカー強調） */}
            <div style={{ marginBottom: '32px' }}>
              <p
                style={{
                  fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                  lineHeight: 1.8,
                  color: 'var(--ink-700)',
                  marginBottom: '16px',
                }}
              >
                その理由は、とてもシンプル。
              </p>
              <h3
                className="heading-md"
                style={{
                  background: 'var(--cream)',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  display: 'inline-block',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                「社会の変化に、学びが追いついていない」
              </h3>
            </div>

            {/* 説明段落 */}
            <p
              className="body-base"
              style={{
                marginBottom: '28px',
              }}
            >
              技術の進歩、価値観の多様化に伴い社会課題が顕在化している時代。「正解を早く答える」勉強だけでは、生き抜く力にはなりません。特にAIの進化は著しく、記憶や計算といった認知能力はすでにコンピュータの方が得意な領域になっています。
            </p>

            {/* カード風の補足（最後の段落） */}
            <div
              style={{
                background: 'var(--bg)',
                padding: 'clamp(24px, 5vw, 32px)',
                borderRadius: 'var(--radius)',
                border: '1px solid rgba(0, 0, 0, 0.04)',
              }}
            >
              <p
                className="body-base"
                style={{
                  margin: 0,
                }}
              >
                それにもかかわらず、日本の教育は依然として「教科書に書かれた知識を覚え、テストで正しく答える力」を重視しています。先生が知識を教え、生徒がそれを記憶し、偏差値で進路が決まる──この構造のままでは、教育と社会との間に大きなギャップが生じ、多くの若者がつまずいてしまいます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =========================================
// 4. 解決策セクション（CLAFTの3つのアプローチ）
// =========================================
function SolutionSection() {
  const solutions = [
    {
      id: 1,
      title: '自ら考え、判断し、表現する体験を。',
      description:
        'PBL（課題解決型学習）や、正解のない問いに向き合う「クエスト」を通じ、スマホやPCを駆使して自らの答えを形にします。',
      philosophy: '学びの本質は知覚。知覚は経験から生まれる。',
      color: 'var(--brand)',
      bgColor: 'rgba(52, 198, 190, 0.08)',
      borderColor: 'rgba(52, 198, 190, 0.3)',
      links: [
        { text: 'PBL（課題解決型学習）', href: '/pbl' },
      ],
    },
    {
      id: 2,
      title: '学びの熱量を維持する、独自の評価システム。',
      description:
        '「ジブンクラフト」では、日々の気づきを「5つのチカラ」に変換し可視化。自分らしさを育てながら、挑戦への確信を築きます。',
      philosophy: '没頭することが、最も高い満足感と動機づけにつながる。',
      color: 'var(--cream)',
      bgColor: 'rgba(255, 214, 107, 0.12)',
      borderColor: 'rgba(255, 214, 107, 0.4)',
      links: [
        { text: 'ジブンクラフト', href: '/jibun-craft' },
      ],
    },
    {
      id: 3,
      title: '仲間や大人、異年齢と混じり合う。',
      description:
        '月1回の対話「Yononaka」や、3ヶ月ごとの発表会「ミライクラフト」。地域や大人と共創し、多様な生き方に触れます。',
      philosophy: '「ムズムズ」を共有できる仲間がいれば、挑戦はもっと強くなる。',
      color: 'var(--green)',
      bgColor: 'rgba(88, 195, 162, 0.08)',
      borderColor: 'rgba(88, 195, 162, 0.3)',
      links: [
        { text: 'Yononaka', href: '/yononaka' },
        { text: 'ミライクラフト', href: '/futurecraft' },
      ],
    },
  ];

  return (
    <section
      style={{
        width: '100%',
        padding: 'clamp(80px, 12vw, 120px) 20px',
        background: `
          radial-gradient(ellipse 900px 600px at 50% 30%, rgba(52, 198, 190, 0.12), transparent 60%),
          radial-gradient(ellipse 700px 500px at 20% 80%, rgba(255, 214, 107, 0.1), transparent 50%),
          radial-gradient(ellipse 600px 400px at 80% 70%, rgba(88, 195, 162, 0.08), transparent 50%),
          linear-gradient(180deg, var(--bg) 0%, #fff 50%, #FFF6E9 100%)
        `,
        position: 'relative',
      }}
    >
      {/* 波型の境界線（上部） */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          style={{
            width: '100%',
            height: '100%',
            transform: 'rotate(180deg)',
          }}
        >
          <path
            d="M0,40 Q300,0 600,40 T1200,40 L1200,80 L0,80 Z"
            fill="rgba(31, 41, 55, 0.06)"
          />
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* セクションヘッダー */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2
            className="heading-lg"
            style={{
              marginBottom: '24px',
              color: 'var(--ink-900)',
            }}
          >
            CLAFT：「探究・対話・実践」の学びが
            <br />
            <span style={{ color: 'var(--brand)' }}>学校と社会の分断</span>をつなぐ！
          </h2>
          <p
            className="body-base"
            style={{
              maxWidth: '420px',
              margin: '0 auto',
            }}
          >
            CLAFTでは、入試のための勉強から
            <strong className="emphasis">「社会を知り未来を予測するための学び」</strong>
            へと変えていく必要があると考えています。
          </p>
        </div>

        {/* 3つの解決策カード */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(28px, 6vw, 36px)',
          }}
        >
          {solutions.map((solution, index) => (
            <article
              key={solution.id}
              className="reveal"
              style={{
                background: '#fff',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(28px, 6vw, 36px)',
                boxShadow: 'var(--shadow)',
                border: `2px solid ${solution.borderColor}`,
                position: 'relative',
                overflow: 'hidden',
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* カード上部のアクセント */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '6px',
                  background: `linear-gradient(90deg, ${solution.color}, ${solution.bgColor})`,
                }}
              />

              {/* カード番号バッジ */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: solution.bgColor,
                  border: `2px solid ${solution.borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  color: solution.color === 'var(--cream)' ? '#f0a629' : solution.color,
                }}
              >
                {solution.id}
              </div>

              {/* タイトル */}
              <h3
                className="heading-sm"
                style={{
                  marginBottom: '16px',
                  paddingRight: '50px',
                }}
              >
                {solution.title}
              </h3>

              {/* 説明文 */}
              <p
                className="body-base"
                style={{
                  marginBottom: '20px',
                }}
              >
                {(() => {
                  let text = solution.description;
                  const parts: React.ReactNode[] = [];
                  let lastIndex = 0;

                  solution.links.forEach((link, linkIdx) => {
                    const index = text.indexOf(link.text, lastIndex);
                    if (index !== -1) {
                      // リンク前のテキスト
                      if (index > lastIndex) {
                        parts.push(text.substring(lastIndex, index));
                      }
                      // リンク
                      parts.push(
                        <Link
                          key={`link-${linkIdx}`}
                          href={link.href}
                          style={{
                            color: solution.color === 'var(--cream)' ? '#f0a629' : solution.color,
                            fontWeight: 700,
                            textDecoration: 'underline',
                            textDecorationColor: solution.borderColor,
                            textUnderlineOffset: '3px',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {link.text}
                        </Link>
                      );
                      lastIndex = index + link.text.length;
                    }
                  });

                  // 残りのテキスト
                  if (lastIndex < text.length) {
                    parts.push(text.substring(lastIndex));
                  }

                  return parts;
                })()}
              </p>

              {/* 哲学的キャプション */}
              <div
                style={{
                  marginTop: '24px',
                  paddingTop: '20px',
                  borderTop: `1px solid ${solution.borderColor}`,
                }}
              >
                <p
                  className={`body-sm ${shipporiMincho.className}`}
                  style={{
                    fontStyle: 'italic',
                    color: 'var(--ink-600)',
                    textAlign: 'center',
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  {solution.philosophy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================
// 5. インタラクティブセクション（CLAFT詳細 + AFT成果）
// =========================================
function PhilosophySection() {
  // CLAFTタブの状態管理
  const [activeTab, setActiveTab] = useState<'C' | 'L' | 'A' | 'F' | 'T'>('C');
  
  // アコーディオンの開閉状態管理
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  // CLAFTタブの定義
  const claftTabs = [
    { letter: 'C', color: '#34c6be', bgColor: 'rgba(52, 198, 190, 0.15)' },
    { letter: 'L', color: '#58c3a2', bgColor: 'rgba(88, 195, 162, 0.15)' },
    { letter: 'A', color: '#ffd66b', bgColor: 'rgba(255, 214, 107, 0.2)' },
    { letter: 'F', color: '#f06a6a', bgColor: 'rgba(240, 106, 106, 0.15)' },
    { letter: 'T', color: '#34c6be', bgColor: 'rgba(52, 198, 190, 0.15)' },
  ];

  // AFTアコーディオンの定義
  const aftItems = [
    {
      id: 'active',
      letter: 'A',
      title: '主体的な行動力の向上',
      color: '#ffd66b',
      bgColor: 'rgba(255, 214, 107, 0.12)',
      borderColor: 'rgba(255, 214, 107, 0.4)',
      description:
        '「指示待ち」ではなく、自分で問いを立てて動く力が育ちます。アクションを起こすことで得られる学びのサイクルが、自分への確信（自己効力感）を支えます。',
      icon: (
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
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
      id: 'flexible',
      letter: 'F',
      title: '柔軟な適応力の向上',
      color: '#f06a6a',
      bgColor: 'rgba(240, 106, 106, 0.12)',
      borderColor: 'rgba(240, 106, 106, 0.4)',
      description:
        '異なる価値観を持つ仲間との対話を通じ、変化をチャンスとして捉えるしなやかさを養います。これは現代社会で不可欠な「情報編集力（＝自分らしく情報を組み立て、伝える力）」の土台となります。',
      icon: (
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
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
      id: 'trial',
      letter: 'T',
      title: '何度も試し続ける精神',
      color: '#34c6be',
      bgColor: 'rgba(52, 198, 190, 0.12)',
      borderColor: 'rgba(52, 198, 190, 0.4)',
      description:
        '「学ばなきゃ」という義務感から解放され、「やってみたい」という好奇心で挑み続ける。たとえ道が変わっても、その周辺にある多様な可能性に気づける強さが身につきます。',
      icon: (
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
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
      <div className="container">
        {/* ========== Part 1: CLAFTアルファベット・タブ ========== */}
        <div className="reveal" style={{ marginBottom: '64px' }}>
          <h2
            className="heading-lg"
            style={{
              textAlign: 'center',
              marginBottom: '32px',
              color: 'var(--ink-900)',
            }}
          >
            CLAFTとは？
            <br />
            <span style={{ color: 'var(--brand)' }}>創って伝えて</span>学ぶ場所
          </h2>

          {/* タブナビゲーション */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '32px',
              flexWrap: 'wrap',
            }}
          >
            {claftTabs.map((tab) => (
              <button
                key={tab.letter}
                onClick={() => setActiveTab(tab.letter as 'C' | 'L' | 'A' | 'F' | 'T')}
                style={{
                  width: 'clamp(56px, 13vw, 68px)',
                  height: 'clamp(56px, 13vw, 68px)',
                  borderRadius: 'var(--radius)',
                  background: activeTab === tab.letter ? tab.bgColor : '#fff',
                  border: `2px solid ${activeTab === tab.letter ? tab.color : 'rgba(0, 0, 0, 0.08)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                  fontWeight: 900,
                  color: activeTab === tab.letter ? tab.color : 'var(--ink-400)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.letter ? 'var(--shadow)' : 'none',
                }}
              >
                {tab.letter}
              </button>
            ))}
          </div>

          {/* タブコンテンツ */}
          <div
            style={{
              background: '#fff',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(28px, 7vw, 40px)',
              boxShadow: 'var(--shadow)',
              minHeight: '300px',
            }}
          >
            {/* C: Creative & Communication */}
            {activeTab === 'C' && (
              <div
                style={{
                  animation: 'fadeIn 0.4s ease',
                }}
              >
                <h3 className="heading-md" style={{ marginBottom: '24px', textAlign: 'center' }}>
                  【CL】好奇心の循環をつくる
                </h3>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '24px',
                  }}
                >
                  <svg width="240" height="180" viewBox="0 0 240 180">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#34c6be" />
                      </marker>
                    </defs>
                    <path
                      d="M60,90 Q60,40 120,40 Q180,40 180,90"
                      stroke="#34c6be"
                      strokeWidth="3"
                      fill="none"
                      markerEnd="url(#arrowhead)"
                      strokeDasharray="8 4"
                    />
                    <path
                      d="M180,90 Q180,140 120,140 Q60,140 60,90"
                      stroke="#58c3a2"
                      strokeWidth="3"
                      fill="none"
                      markerEnd="url(#arrowhead)"
                      strokeDasharray="8 4"
                    />
                    <circle cx="120" cy="90" r="35" fill="rgba(255, 214, 107, 0.3)" stroke="#ffd66b" strokeWidth="2" />
                    <text x="120" y="85" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink-800)">
                      好奇心
                    </text>
                    <text x="120" y="100" textAnchor="middle" fontSize="9" fill="var(--ink-600)">
                      Curiosity
                    </text>
                    <text x="30" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#34c6be">
                      Creative
                    </text>
                    <text x="30" y="102" textAnchor="middle" fontSize="8" fill="var(--ink-500)">
                      創造
                    </text>
                    <text x="210" y="90" textAnchor="middle" fontSize="9" fontWeight="700" fill="#58c3a2">
                      Communication
                    </text>
                    <text x="210" y="102" textAnchor="middle" fontSize="8" fill="var(--ink-500)">
                      対話
                    </text>
                  </svg>
                </div>
                <p className="body-base" style={{ textAlign: 'center' }}>
                  自分の興味を形にする（<strong style={{ color: '#34c6be' }}>Creative</strong>）なかで、
                  それを人に発表し共有する（<strong style={{ color: '#58c3a2' }}>Communication</strong>）。
                  <br />
                  そこで得た反応が新たな気づきとなり、また次の探究へと繋がっていく。
                </p>
              </div>
            )}

            {/* L: Learning */}
            {activeTab === 'L' && (
              <div style={{ animation: 'fadeIn 0.4s ease' }}>
                <h3 className="heading-md" style={{ marginBottom: '24px', textAlign: 'center' }}>
                  【L】後悔（Regret）を学び（Learning）へ
                </h3>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    marginBottom: '24px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                      }}
                    >
                      R
                    </div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--ink-400)', marginTop: '6px' }}>Regret</p>
                  </div>
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
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                      }}
                    >
                      L
                    </div>
                    <p style={{ fontSize: '0.7rem', color: '#34c6be', marginTop: '6px', fontWeight: 700 }}>Learning</p>
                  </div>
                </div>
                <p className="body-base" style={{ textAlign: 'center' }}>
                  人生100年時代、学びと仕事は往復し続けるものです。
                  <br />
                  失敗を
                  <strong style={{ color: 'var(--ink-500)', textDecoration: 'line-through' }}>Regret（後悔）</strong>
                  して立ち止まるのではなく、すべてを
                  <strong style={{ color: '#58c3a2' }}>Learning（学び）</strong>として捉える。
                </p>
              </div>
            )}

            {/* A: Active */}
            {activeTab === 'A' && (
              <div style={{ animation: 'fadeIn 0.4s ease' }}>
                <h3 className="heading-md" style={{ marginBottom: '16px', color: '#f0a629' }}>
                  Active：自ら問いを立て、動き出す主体性
                </h3>
                <p className="body-base">
                  正解のない問いに向き合い、自分で考え判断する力。
                  <br />
                  PBLや探究学習を通じて、主体的に動く力が育ちます。
                </p>
              </div>
            )}

            {/* F: Flexible */}
            {activeTab === 'F' && (
              <div style={{ animation: 'fadeIn 0.4s ease' }}>
                <h3 className="heading-md" style={{ marginBottom: '16px', color: '#f06a6a' }}>
                  Flexible：変化をチャンスとして楽しむ柔軟性
                </h3>
                <p className="body-base">
                  多様な価値観に触れ、固定観念にとらわれない思考力。
                  <br />
                  変化を恐れず、むしろ楽しめる柔軟性が身につきます。
                </p>
              </div>
            )}

            {/* T: Trial */}
            {activeTab === 'T' && (
              <div style={{ animation: 'fadeIn 0.4s ease' }}>
                <h3 className="heading-md" style={{ marginBottom: '16px', color: '#34c6be' }}>
                  Trial：失敗を恐れず、何度でも試す精神
                </h3>
                <p className="body-base">
                  失敗は成功への道標。トライ＆エラーを繰り返すことで、
                  <br />
                  本当に大切なことを見つけられる強さが育ちます。
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ========== Part 2: AFTアコーディオン ========== */}
        <div className="reveal">
          <h2
            className="heading-lg"
            style={{
              textAlign: 'center',
              marginBottom: '24px',
              color: 'var(--ink-900)',
            }}
          >
            CLAFTによって、
            <br />
            どう<span style={{ color: 'var(--brand)' }}>変わる</span>か（AFT）
          </h2>
          <p
            className="body-base"
            style={{
              textAlign: 'center',
              marginBottom: '40px',
            }}
          >
            主体的な行動力と、しなやかな適応力。
            <br />
            それが<strong className="emphasis">「希望」</strong>の正体です。
          </p>

          {/* アコーディオン */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {aftItems.map((item, index) => (
              <article
                key={item.id}
                style={{
                  background: '#fff',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow)',
                  border: `2px solid ${item.borderColor}`,
                  overflow: 'hidden',
                }}
              >
                {/* ヘッダー（常に表示） */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  style={{
                    width: '100%',
                    padding: 'clamp(20px, 5vw, 28px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    background: openAccordion === item.id ? item.bgColor : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease',
                  }}
                >
                  {/* アイコン */}
                  <div
                    style={{
                      minWidth: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: item.bgColor,
                      border: `2px solid ${item.borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* タイトル */}
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          background: item.color,
                          fontSize: '0.9rem',
                          fontWeight: 900,
                          color: '#fff',
                        }}
                      >
                        {item.letter}
                      </span>
                    </div>
                    <h3 className="heading-sm" style={{ margin: 0 }}>
                      {item.title}
                    </h3>
                  </div>

                  {/* 開閉アイコン */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{
                      transform: openAccordion === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0,
                    }}
                  >
                    <path
                      d="M6 9 L12 15 L18 9"
                      stroke={item.color}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* コンテンツ（展開時のみ表示） */}
                <div
                  style={{
                    maxHeight: openAccordion === item.id ? '500px' : '0',
                    opacity: openAccordion === item.id ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, opacity 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      padding: '0 clamp(20px, 5vw, 28px) clamp(24px, 6vw, 32px)',
                      paddingLeft: 'clamp(84px, 18vw, 92px)',
                    }}
                  >
                    <p className="body-base" style={{ margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
              今後のキャリアを支える一番の根っこになります。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClaftHopeClient;

