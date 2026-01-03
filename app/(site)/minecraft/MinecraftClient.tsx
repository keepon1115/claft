'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export function MinecraftClient() {
  const [visibleSections, setVisibleSections] = useState<boolean[]>([]);
  
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
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <style jsx>{`
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
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      
      <HeroSection />
      <QuickInfoSection />
      <OutcomesSection />
      <FlowSection />
      <PricingSection />
      <RelatedCoursesSection />
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
        padding: 'clamp(80px, 12vw, 120px) 20px clamp(60px, 10vw, 100px)',
        background: `
          radial-gradient(ellipse at 30% 20%, rgba(88, 195, 162, 0.12) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 80%, rgba(255, 214, 107, 0.12) 0%, transparent 50%),
          linear-gradient(180deg, #FFF6E9 0%, #fbfefe 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 浮遊アイコン */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            fontSize: 'clamp(40px, 8vw, 64px)',
            animation: 'float 3s ease-in-out infinite',
            opacity: 0.25,
          }}
        >
          🎮
        </div>
        <div
          style={{
            position: 'absolute',
            top: '15%',
            right: '8%',
            fontSize: 'clamp(32px, 6vw, 48px)',
            animation: 'float 3.5s ease-in-out 0.5s infinite',
            opacity: 0.25,
          }}
        >
          🌍
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            fontSize: 'clamp(28px, 5vw, 40px)',
            animation: 'float 4s ease-in-out 1s infinite',
            opacity: 0.25,
          }}
        >
          💡
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* バッジ */}
        <div
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, var(--green) 0%, var(--brand) 100%)',
            padding: '8px 20px',
            borderRadius: '20px',
            marginBottom: '24px',
            boxShadow: '0 4px 12px rgba(88, 195, 162, 0.25)',
            animation: 'scaleIn 0.6s ease-out',
          }}
        >
          <p
            className="body-base emphasis"
            style={{
              color: 'white',
              margin: 0,
              letterSpacing: '0.05em',
              fontSize: 'clamp(13px, 2.8vw, 15px)',
            }}
          >
            マイクラSDGsコース
          </p>
        </div>

        {/* メインコピー */}
        <div style={{ animation: 'fadeInUp 0.8s ease-out 0.2s forwards', opacity: 0, marginBottom: '28px' }}>
          <h1 className="heading-xl" style={{ marginBottom: '24px' }}>
            AI時代を生き抜く
            <br />
            <span style={{ color: 'var(--green)', position: 'relative', display: 'inline-block' }}>
              「未来を創る力」
              <svg
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: '-5%',
                  width: '110%',
                  height: '12px',
                  zIndex: -1,
                }}
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M3,8 Q50,5 100,7 T197,6"
                  stroke="var(--cream)"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </svg>
            </span>
            を育む。
          </h1>
        </div>

        {/* サブコピー */}
        <div
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.4s forwards',
            opacity: 0,
            marginBottom: '40px',
          }}
        >
          <p className="body-lg" style={{ lineHeight: 1.9 }}>
            マイクラ×SDGs×プログラミングで、楽しみながら新たな価値を生み出そう！SDGsの目標を深く理解し、身近な問題として捉え、創造的な解決策を考え、実行する力を育む。
          </p>
        </div>

        {/* メインビジュアル */}
        <div style={{ animation: 'scaleIn 0.8s ease-out 0.6s forwards', opacity: 0 }}>
          <img
            className="w-full border border-black/[0.08] object-cover aspect-video rounded-[28px] shadow-md"
            src="/assets/minecraft/hero.jpeg"
            alt="制作やプログラミングの様子"
            style={{
              boxShadow: 'var(--shadow)',
              border: '3px solid var(--green)',
            }}
          />
        </div>
      </div>
    </section>
  );
}

// =========================================
// 2. クイック情報セクション
// =========================================
function QuickInfoSection() {
  const quickInfo = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      label: '対象',
      value: '小学3年生～中学生(例外あり)',
      color: 'var(--green)',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 1 0 1.4l-9 9L6 19l.7-2.7z" />
          <path d="M12 8l4 4" />
        </svg>
      ),
      label: '使用ツール',
      value: '教育版マインクラフト',
      color: 'var(--brand)',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
        </svg>
      ),
      label: '形式',
      value: 'オンライン。SDGsテーマに沿ったワーク、エージェントプログラミングのワーク、マインクラフトでの制作。',
      color: 'var(--cream)',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
      label: '学習の流れ（1ヶ月サイクル）',
      value: `★SDGsワーク
テーマ動画を見る⇒補助プリントを参考に自分の意見を提出する
★プログラミングワーク
テーマ動画を見る⇒補助プリントを参考にエージェントのプログラミングを提出する
★マイクラ制作
SDGsテーマの解決策をマインクラフトのワールドで建築して提出する
★1on1ミーティング
ワーク後に、月に一度オンライン面談で振り返りを行う`,
      color: 'var(--pink)',
    },
  ];

  return (
    <section
      style={{
        width: '100%',
        padding: 'clamp(60px, 10vw, 80px) 20px',
        background: '#fbfefe',
      }}
    >
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 3vw, 16px)' }}>
          {quickInfo.map((item, index) => (
            <div
              key={index}
              className="reveal"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                background: 'var(--card)',
                border: `2px solid ${item.color}40`,
                borderRadius: 'var(--radius)',
                padding: 'clamp(16px, 4vw, 20px)',
                boxShadow: 'var(--shadow)',
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div
                style={{
                  color: item.color,
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <strong className="emphasis" style={{ display: 'block', marginBottom: '4px' }}>
                  {item.label}
                </strong>
                <p className="body-base" style={{ margin: 0, whiteSpace: 'pre-line', lineHeight: 1.7 }}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================
// 3. 成果セクション（こんな力が育つ）
// =========================================
function OutcomesSection() {
  const outcomes = [
    {
      image: '/assets/minecraft/outcome_01.jpeg',
      title: '創造性が爆発！マインクラフトでアイデアをカタチに',
      points: [
        'ひらめきを具現化：「こんなものがあったらいいな」というアイデアを、ブロック一つ一つ積み上げて形に。',
        '試行錯誤のプロセス：理想の形にするために、何度も試しては修正。粘り強く問題に取り組む力が養われます。',
      ],
      icon: '🎨',
      color: 'var(--green)',
    },
    {
      image: '/assets/minecraft/outcome_02.jpeg',
      title: '世界の社会問題を"自分ごと"に。SDGsで考える力',
      points: [
        'リアルな課題に触れる：貧困、飢餓、環境問題など、現実世界の複雑な課題を分かりやすくインプット。',
        '「私ならどうする？」：自分ならどう解決するかを深く考え、マインクラフトの世界で具体的に表現。',
      ],
      icon: '🌍',
      color: 'var(--brand)',
    },
    {
      image: '/assets/minecraft/outcome_03.jpeg',
      title: '「論理的思考力」と「発信力」を育むプログラミング学習',
      points: [
        'ゲームで学ぶプログラミング：エージェントに命令を与え、自動で建物を建てたり、問題を解決する仕組みを作る。',
        'アイデアを「共有」する力：制作したワールドや解決策を動画にして発表。プレゼンテーション能力を養います。',
      ],
      icon: '💻',
      color: 'var(--cream)',
    },
  ];

  return (
    <section
      style={{
        width: '100%',
        padding: 'clamp(80px, 12vw, 120px) 20px',
        background: 'linear-gradient(180deg, #fbfefe 0%, #fff 50%, #fbfefe 100%)',
      }}
    >
      <div className="container">
        {/* セクションタイトル */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 className="heading-lg" style={{ marginBottom: '16px', position: 'relative' }}>
            楽しい！やってみたい！が
            <br />
            <span style={{ color: 'var(--green)' }}>「未来を創る力」</span>に変わる!?
            <svg
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '12px',
              }}
              viewBox="0 0 120 12"
              preserveAspectRatio="none"
            >
              <path
                d="M5,8 Q30,4 60,8 T115,8"
                stroke="var(--green)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.3"
              />
            </svg>
          </h2>
        </div>

        {/* 成果カード */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {outcomes.map((item, index) => (
            <article
              key={index}
              className="reveal"
              style={{
                background: 'var(--card)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(28px, 6vw, 36px)',
                boxShadow: 'var(--shadow)',
                border: `3px solid ${item.color}`,
                position: 'relative',
                overflow: 'hidden',
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* 背景装飾 */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '150px',
                  height: '150px',
                  background: `radial-gradient(circle, ${item.color}15, transparent 70%)`,
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />

              {/* アイコン */}
              <div
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 3rem)',
                  marginBottom: '20px',
                  position: 'relative',
                }}
              >
                {item.icon}
              </div>

              {/* 画像 */}
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  maxWidth: '240px',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius)',
                  margin: '0 auto 24px',
                  display: 'block',
                  border: '2px solid rgba(0, 0, 0, 0.06)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  position: 'relative',
                }}
              />

              {/* タイトル */}
              <h3 className="heading-md" style={{ marginBottom: '16px', position: 'relative' }}>
                {item.title}
              </h3>

              {/* ポイント */}
              <ul style={{ margin: 0, paddingLeft: 'clamp(20px, 4vw, 24px)', position: 'relative' }}>
                {item.points.map((point, i) => (
                  <li key={i} className="body-base" style={{ marginTop: i > 0 ? '12px' : 0, lineHeight: 1.8 }}>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================
// 4. 入会までの流れ
// =========================================
function FlowSection() {
  const steps = [
    { num: '1', title: '相談', desc: 'お気軽にLINEでご連絡ください。', icon: '💬' },
    { num: '2', title: '体験', desc: '1ヶ月無料体験。ZOOMで個別説明もいたします。', icon: '✨' },
    { num: '3', title: '入会', desc: 'LINEから決済手続きなどご案内いたします。', icon: '🎉' },
  ];

  return (
    <section
      style={{
        width: '100%',
        padding: 'clamp(80px, 12vw, 120px) 20px',
        background: '#fbfefe',
      }}
    >
      <div className="container">
        {/* セクションタイトル */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 className="heading-lg" style={{ position: 'relative' }}>
            入会までの流れ
            <svg
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '12px',
              }}
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
            >
              <path
                d="M5,8 Q25,4 50,8 T95,8"
                stroke="var(--brand)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.3"
              />
            </svg>
          </h2>
        </div>

        {/* ステップカード */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(18px, 4vw, 24px)' }}>
          {steps.map((step, index) => (
            <div
              key={index}
              className="reveal"
              style={{
                position: 'relative',
                background: 'var(--card)',
                border: '2px solid rgba(0, 0, 0, 0.06)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(24px, 5vw, 32px)',
                boxShadow: 'var(--shadow)',
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                {/* 番号バッジ */}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'var(--font-black)',
                    width: 'clamp(40px, 10vw, 48px)',
                    height: 'clamp(40px, 10vw, 48px)',
                    borderRadius: '50%',
                    background: 'var(--brand)',
                    color: 'white',
                    fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                    flexShrink: 0,
                  }}
                >
                  {step.num}
                </span>

                <div style={{ flex: 1 }}>
                  {/* アイコンとタイトル */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: 'clamp(1.5rem, 4vw, 1.8rem)' }}>{step.icon}</span>
                    <strong className="heading-sm" style={{ margin: 0 }}>
                      {step.title}
                    </strong>
                  </div>

                  {/* 説明 */}
                  <p className="body-base" style={{ margin: 0, lineHeight: 1.7 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================
// 5. 料金セクション
// =========================================
function PricingSection() {
  return (
    <section
      style={{
        width: '100%',
        padding: 'clamp(80px, 12vw, 120px) 20px',
        background: 'linear-gradient(180deg, #fbfefe 0%, #FFF6E9 100%)',
      }}
    >
      <div className="container">
        <div
          className="reveal"
          style={{
            background: 'var(--card)',
            border: '3px solid var(--green)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(32px, 7vw, 48px)',
            boxShadow: 'var(--shadow)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* 背景装飾 */}
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(88, 195, 162, 0.15), transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />

          <h2 className="heading-lg" style={{ marginTop: 0, marginBottom: '24px', position: 'relative' }}>
            料金
          </h2>

          <div style={{ position: 'relative' }}>
            <p style={{ marginBottom: '16px' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontWeight: 'var(--font-bold)',
                  background: '#fff3c4',
                  border: '2px solid #f6e08c',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  marginRight: '12px',
                  fontSize: 'clamp(14px, 3vw, 16px)',
                }}
              >
                初月無料
              </span>
              <strong className="heading-md" style={{ fontSize: 'clamp(20px, 4.5vw, 26px)' }}>
                月額7,700円（税込）
              </strong>
            </p>

            <p className="body-sm" style={{ color: 'var(--ink-500)', marginBottom: '8px' }}>
              教育版マインクラフトのライセンス料（5,500円/年）は別途発生します。
            </p>

            <p className="body-sm" style={{ color: 'var(--ink-500)', margin: 0 }}>
              ※ 決済手続きはLINEからご案内いたします。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// =========================================
// 6. 関連コースセクション
// =========================================
function RelatedCoursesSection() {
  const relatedCourses = [
    {
      image: '/assets/minecraft/yononaka.jpeg',
      title: 'Yononaka（対話型ワークショップ）',
      description:
        '仲間との交流の場。身近なことをテーマに、正解がひとつでない問いに対して意見を共有する時間です。',
      link: '/yononaka',
      color: 'var(--brand)',
    },
    {
      image: '/assets/minecraft/futurecraft.jpeg',
      title: 'ミライクラフト（実践プログラム）',
      description:
        '通常授業とは違う発表会やイベント、実際の課題解決ワークなどで仲間とともに試せる場もあります。',
      link: '/futurecraft',
      color: 'var(--green)',
    },
  ];

  return (
    <section
      style={{
        width: '100%',
        padding: 'clamp(80px, 12vw, 120px) 20px clamp(100px, 15vw, 140px)',
        background: '#fff',
      }}
    >
      <div className="container">
        {/* セクションタイトル */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 className="heading-lg" style={{ position: 'relative' }}>
            関連プログラム
            <svg
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '12px',
              }}
              viewBox="0 0 120 12"
              preserveAspectRatio="none"
            >
              <path
                d="M5,8 Q30,4 60,8 T115,8"
                stroke="var(--cream)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
          </h2>
        </div>

        {/* コースカード */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {relatedCourses.map((course, index) => (
            <article
              key={index}
              className="reveal"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(16px, 4vw, 20px)',
                background: 'var(--card)',
                border: `2px solid ${course.color}40`,
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(20px, 5vw, 28px)',
                boxShadow: 'var(--shadow)',
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <img
                src={course.image}
                alt={course.title}
                style={{
                  width: '100%',
                  maxWidth: '200px',
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius)',
                  border: '2px solid rgba(0, 0, 0, 0.06)',
                  margin: '0 auto',
                }}
              />

              <div>
                <h3 className="heading-sm" style={{ marginBottom: '12px' }}>
                  {course.title}
                </h3>
                <p className="body-base" style={{ marginBottom: '16px', lineHeight: 1.7 }}>
                  {course.description}
                </p>
                <Link
                  href={course.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: course.color,
                    fontWeight: 'var(--font-bold)',
                    textDecoration: 'none',
                    fontSize: 'clamp(14px, 3vw, 16px)',
                  }}
                >
                  詳しく見る →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

