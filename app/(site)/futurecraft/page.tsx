'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { MobileContainer, Section } from '@/components/MobileContainer';

// なんでも発表会・展示会データ
const showcaseEvents = [
  {
    id: 1,
    date: '2025/11',
    title: 'なんでも発表会・展示会',
    description: '自分の好きなことを自由に発表できる場。スクールフェスタ内で継続して行っており、子どもたちだけでなく保護者やスタッフも参加して発表。',
    image: '/assets/futurecraft/present_02.jpg', // 後で画像挿入
    link: 'https://keepon.my.canva.site/tenzikai2025',
    color: '#ffd66b',
    emoji: '🎨'
  },
  {
    id: 2,
    date: '2025/7',
    title: 'なんでも発表会',
    description: '自分の好きなことを自由に発表できる場。スクールフェスタ内で継続して行っており、子どもたちだけでなく保護者やスタッフも参加して発表。',
    image: '/assets/futurecraft/present_02.jpg', // 後で画像挿入
    link: 'https://www.keeponlearning.fun/nandemo2025summer',
    color: '#34c6be',
    emoji: '✨'
  }
];

// その他発表会やイベントデータ
const otherEvents = [
  {
    id: 1,
    date: '2025/3',
    title: 'テーマ発表会',
    description: '未来予測を参考に何年か後の学校(学べる場所)を考え、マイクラ、ロボット、スライド、イラストなどを使って動画で自由に発表。',
    image: '/assets/futurecraft/present_01.jpg',
    link: 'https://www.keeponlearning.fun/1-theme',
    color: '#f06a6a',
    emoji: '🎯'
  },
  {
    id: 2,
    date: '2024/11',
    title: 'マイクラコンテスト',
    description: '大人気ゲーム「マインクラフト」をつかった発表会！テーマについて自分なりの解決方法を、マイクラのワールドで表現。',
    image: '/assets/futurecraft/present_03.jpg',
    link: 'https://www.keeponlearning.fun/education-minecraft3',
    color: '#9b87f5',
    emoji: '⚡'
  }
];

// イベント企画データ
const eventProjects = [
  {
    id: 1,
    label: 'NEW！現在活動中',
    title: 'STEAMキャンプ',
    description: '海外の子どもたちとオンラインで交流し、STEAM教育を通じて国際的な視野を育むプログラム。言語や文化の壁を超えた協働体験。',
    image: '/assets/futurecraft/asia-steam-camp.png',
    link: '/asia-steam-camp',
    color: '#34c6be',
    isExternal: false
  },
  {
    id: 2,
    label: 'NEW！現在活動中',
    title: 'PLAY CLAFT',
    description: '「遊ぶ人」から「遊びをつくる人」へ。お店や会社のように「提供する側」の視点を体験できる、特別な学びの場です。',
    image: '/assets/futurecraft/event_01.jpg',
    link: '/play-claft',
    color: '#ffd66b',
    isExternal: false
  },
  {
    id: 3,
    label: '2025/3',
    title: 'スクールフェスタ',
    description: '3月・7月・11月に行われるスクールのお祭り。スタッフだけでなく、スクール生が企画したイベントも行います。',
    image: '/assets/futurecraft/event_02.jpg',
    link: 'https://www.keeponlearning.fun/schoolfesta-spring25',
    color: '#f06a6a',
    isExternal: true
  },
  {
    id: 4,
    label: '2024/5~11',
    title: '自分カイシャづくり体験',
    description: '会社を経営するとはどういうことなのか、を本格的に経験できる小学校6年生以上を対象としたキャリア教育です。',
    image: '/assets/futurecraft/event_03.jpg',
    link: 'https://www.keeponlearning.fun/company',
    color: '#9b87f5',
    isExternal: true
  }
];

export default function FuturecraftPage() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // スクロールアニメーション
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
      {/* カスタムスタイル */}
      <style jsx global>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .horizontal-scroll {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: 10px 0 20px 0;
          margin: 0 -20px;
          padding-left: 20px;
          padding-right: 20px;
        }
        .horizontal-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .horizontal-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .horizontal-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 214, 107, 0.4);
          border-radius: 10px;
        }
        .horizontal-scroll > * {
          flex-shrink: 0;
          scroll-snap-align: start;
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 214, 107, 0.2); }
          50% { box-shadow: 0 0 40px rgba(255, 214, 107, 0.4); }
        }
      `}</style>

      {/* ===== ヒーローセクション ===== */}
      <Section className="relative overflow-hidden scroll-animate">
        {/* 背景グラデーション */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 20% 30%, rgba(255, 214, 107, 0.1) 0%, transparent 50%),
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
              ミライクラフト<span style={{ fontSize: '0.7em', marginLeft: '8px' }}>(実践)</span>
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
                stroke="#ffd66b"
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
            margin: '0 auto 32px',
            lineHeight: 'var(--leading-loose)'
          }}
        >
          作品発表会、イベント企画、商品制作などに挑戦。自分の好きや得意を活かしながら、仲間と試行錯誤し、「仕事」を実感する学びです。
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
          <span className="float-animation" style={{ animationDelay: '0s' }}>⚡</span>
          <span className="float-animation" style={{ animationDelay: '0.3s' }}>💡</span>
          <span className="float-animation" style={{ animationDelay: '0.6s' }}>🎨</span>
        </div>
      </Section>

      {/* ===== なんでも発表会・展示会 ===== */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 
            className="heading-lg"
            style={{
              position: 'relative',
              display: 'inline-block'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>なんでも発表会・展示会</span>
            <svg
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '-8px',
                width: 'calc(100% + 16px)',
                height: '16px',
                zIndex: 0
              }}
              viewBox="0 0 200 16"
              preserveAspectRatio="none"
            >
              <path
                d="M3,12 Q50,10 100,11 T197,12"
                stroke="#ffd66b"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{ opacity: 0.6 }}
              />
            </svg>
          </h2>
        </div>

        <p 
          className="body-base"
          style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 32px',
            color: 'var(--ink-600)',
            lineHeight: 'var(--leading-relaxed)'
          }}
        >
          自分の好きなことを自由に発表できる場。スクールフェスタ内で継続して行っており、子どもたちだけでなく保護者やスタッフも参加して発表。
        </p>

        <div className="horizontal-scroll">
          {showcaseEvents.map((event, i) => (
            <div
              key={event.id}
              style={{
                width: '320px',
                background: '#fff',
                borderRadius: '24px',
                padding: '28px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                border: '2px dashed rgba(0, 0, 0, 0.08)',
                position: 'relative',
                overflow: 'hidden',
                transform: `rotate(${i % 2 === 0 ? '-1' : '1'}deg)`,
                transition: 'transform 0.3s ease'
              }}
            >
              {/* 角のカラーアクセント */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '80px',
                  height: '80px',
                  background: `linear-gradient(135deg, ${event.color}40, transparent)`,
                  borderRadius: '0 24px 0 100%'
                }}
              />

              {/* 日付ラベル */}
              <div
                style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  background: event.color,
                  color: '#fff',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'var(--font-bold)',
                  marginBottom: '16px',
                  boxShadow: `0 2px 8px ${event.color}40`
                }}
              >
                {event.date}
              </div>

              {/* 画像プレースホルダー */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  background: `linear-gradient(135deg, ${event.color}20, ${event.color}10)`
                }}
              >
                <img 
                  src={event.image}
                  alt={event.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* アイコン */}
              <div
                style={{
                  fontSize: '40px',
                  textAlign: 'center',
                  marginBottom: '12px'
                }}
              >
                {event.emoji}
              </div>

              {/* タイトル */}
              <h3 
                className="heading-sm"
                style={{
                  marginBottom: '12px',
                  textAlign: 'center',
                  lineHeight: 'var(--leading-snug)'
                }}
              >
                {event.title}
              </h3>

              {/* 説明 */}
              <p 
                className="body-sm"
                style={{
                  marginBottom: '20px',
                  color: 'var(--ink-600)',
                  textAlign: 'center',
                  lineHeight: 'var(--leading-relaxed)'
                }}
              >
                {event.description}
              </p>

              {/* ボタン */}
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '12px 24px',
                  background: `linear-gradient(135deg, ${event.color}, ${event.color}dd)`,
                  color: '#fff',
                  borderRadius: '50px',
                  fontWeight: 'var(--font-bold)',
                  textDecoration: 'none',
                  boxShadow: `0 4px 12px ${event.color}40`,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 6px 16px ${event.color}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${event.color}40`;
                }}
              >
                詳しく見る →
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== イベント企画 ===== */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 
            className="heading-lg"
            style={{
              position: 'relative',
              display: 'inline-block'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>イベント企画</span>
            <svg
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '-8px',
                width: 'calc(100% + 16px)',
                height: '16px',
                zIndex: 0
              }}
              viewBox="0 0 200 16"
              preserveAspectRatio="none"
            >
              <path
                d="M3,12 Q50,10 100,11 T197,12"
                stroke="#34c6be"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{ opacity: 0.6 }}
              />
            </svg>
          </h2>
        </div>

        <p 
          className="body-base"
          style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 32px',
            color: 'var(--ink-600)',
            lineHeight: 'var(--leading-relaxed)'
          }}
        >
          「どんなワクワクを届ける？」から考え、チームで商品サービスを制作します。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {eventProjects.map((project) => (
            <article
              key={project.id}
              style={{
                background: '#fff',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                border: '2px dashed rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              {/* 画像 */}
              <figure style={{ margin: 0, position: 'relative' }}>
                <img 
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    objectFit: 'cover'
                  }}
                />
                {/* ラベルオーバーレイ */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    padding: '8px 16px',
                    background: project.color,
                    color: '#fff',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'var(--font-bold)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {project.label}
                </div>
              </figure>

              {/* コンテンツ */}
              <div style={{ padding: '24px' }}>
                <h3 className="heading-sm" style={{ marginBottom: '12px', lineHeight: 'var(--leading-snug)' }}>
                  {project.title}
                </h3>

                <p 
                  className="body-base"
                  style={{
                    marginBottom: '20px',
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'var(--ink-700)'
                  }}
                >
                  {project.description}
                </p>

                {project.isExternal ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 28px',
                      background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)`,
                      color: '#fff',
                      borderRadius: '50px',
                      fontWeight: 'var(--font-bold)',
                      textDecoration: 'none',
                      boxShadow: `0 4px 12px ${project.color}40`,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = `0 6px 16px ${project.color}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = `0 4px 12px ${project.color}40`;
                    }}
                  >
                    詳しく見る
                    <span>→</span>
                  </a>
                ) : (
                  <Link
                    href={project.link}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 28px',
                      background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)`,
                      color: '#fff',
                      borderRadius: '50px',
                      fontWeight: 'var(--font-bold)',
                      textDecoration: 'none',
                      boxShadow: `0 4px 12px ${project.color}40`,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = `0 6px 16px ${project.color}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = `0 4px 12px ${project.color}40`;
                    }}
                  >
                    詳しく見る
                    <span>→</span>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ===== 地域課題解決 ===== */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 
            className="heading-lg"
            style={{
              position: 'relative',
              display: 'inline-block'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>地域課題解決</span>
            <svg
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '-8px',
                width: 'calc(100% + 16px)',
                height: '16px',
                zIndex: 0
              }}
              viewBox="0 0 200 16"
              preserveAspectRatio="none"
            >
              <path
                d="M3,12 Q50,10 100,11 T197,12"
                stroke="#9b87f5"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{ opacity: 0.6 }}
              />
            </svg>
          </h2>
        </div>

        <p 
          className="body-base"
          style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 32px',
            color: 'var(--ink-600)',
            lineHeight: 'var(--leading-relaxed)'
          }}
        >
          「今の社会の課題は？」から"自分にできること"へ。地域と連携した実践プロジェクト。
        </p>

        <article
          style={{
            background: '#fff',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            border: '2px dashed rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* 画像 */}
          <figure style={{ margin: 0, position: 'relative' }}>
            <img 
              src="/assets/futurecraft/social_01.jpg"
              alt="地域課題解決の取り組み"
              style={{
                width: '100%',
                aspectRatio: '16/9',
                objectFit: 'cover'
              }}
            />
            {/* ラベルオーバーレイ */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                padding: '8px 16px',
                background: 'rgba(155, 135, 245, 0.9)',
                color: '#fff',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'var(--font-bold)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
            >
              今後実施予定
            </div>
          </figure>

          {/* コンテンツ */}
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '32px' }}>🌱</span>
              <h3 className="heading-sm" style={{ flex: 1, lineHeight: 'var(--leading-snug)' }}>
                地域と連携した実践
              </h3>
            </div>

            <p 
              className="body-base"
              style={{
                marginBottom: '16px',
                lineHeight: 'var(--leading-relaxed)',
                color: 'var(--ink-700)'
              }}
            >
              自治体・企業・団体と協働し、実社会で試すプロジェクト。地域が抱える実際の課題に向き合い、自分たちのアイデアで解決に挑戦します。
            </p>

            <div
              style={{
                padding: '16px',
                background: 'rgba(155, 135, 245, 0.1)',
                borderRadius: '12px',
                borderLeft: '3px solid #9b87f5'
              }}
            >
              <p 
                className="body-sm"
                style={{
                  color: 'var(--ink-700)',
                  lineHeight: 'var(--leading-relaxed)',
                  margin: 0
                }}
              >
                <span style={{ fontWeight: 'var(--font-bold)' }}>💡 Coming Soon:</span> 地域の企業や団体と連携した、実践的なプロジェクトを準備中です。詳細が決まり次第お知らせします。
              </p>
            </div>
          </div>
        </article>
      </Section>

      {/* ===== その他発表会やイベント ===== */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 
            className="heading-lg"
            style={{
              position: 'relative',
              display: 'inline-block'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>その他発表会やイベント</span>
            <svg
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '-8px',
                width: 'calc(100% + 16px)',
                height: '16px',
                zIndex: 0
              }}
              viewBox="0 0 200 16"
              preserveAspectRatio="none"
            >
              <path
                d="M3,12 Q50,10 100,11 T197,12"
                stroke="#f06a6a"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{ opacity: 0.6 }}
              />
            </svg>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {otherEvents.map((event) => (
            <article
              key={event.id}
              style={{
                background: '#fff',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                border: '2px dashed rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              {/* 画像 */}
              <figure style={{ margin: 0, position: 'relative' }}>
                <img 
                  src={event.image}
                  alt={event.title}
                  style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    objectFit: 'cover'
                  }}
                />
                {/* 日付オーバーレイ */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    padding: '8px 16px',
                    background: event.color,
                    color: '#fff',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'var(--font-bold)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {event.date}
                </div>
              </figure>

              {/* コンテンツ */}
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '32px' }}>{event.emoji}</span>
                  <h3 className="heading-sm" style={{ flex: 1, lineHeight: 'var(--leading-snug)' }}>
                    {event.title}
                  </h3>
                </div>

                <p 
                  className="body-base"
                  style={{
                    marginBottom: '20px',
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'var(--ink-700)'
                  }}
                >
                  {event.description}
                </p>

                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 28px',
                    background: `linear-gradient(135deg, ${event.color}, ${event.color}dd)`,
                    color: '#fff',
                    borderRadius: '50px',
                    fontWeight: 'var(--font-bold)',
                    textDecoration: 'none',
                    boxShadow: `0 4px 12px ${event.color}40`,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 6px 16px ${event.color}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 12px ${event.color}40`;
                  }}
                >
                  詳しく見る
                  <span>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ===== 失敗は本当に悪いこと？ ===== */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 
            className="heading-lg"
            style={{
              position: 'relative',
              display: 'inline-block'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>失敗は本当に悪いこと？</span>
            <svg
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '-8px',
                width: 'calc(100% + 16px)',
                height: '16px',
                zIndex: 0
              }}
              viewBox="0 0 200 16"
              preserveAspectRatio="none"
            >
              <path
                d="M3,12 Q50,10 100,11 T197,12"
                stroke="#ffd66b"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{ opacity: 0.6 }}
              />
            </svg>
          </h2>
        </div>

        {/* メインコンテンツ */}
        <div
          style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '32px 28px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            border: '2px dashed rgba(0, 0, 0, 0.08)',
            marginBottom: '24px'
          }}
        >
          <p 
            className="body-base"
            style={{
              marginBottom: '20px',
              lineHeight: 'var(--leading-loose)',
              color: 'var(--ink-700)'
            }}
          >
            「失敗したらどう思われるだろう？」「一度失敗したら次はないかもしれない」「立ち直れる自信がない・・・」そういった「失敗＝悪」という考えを、私たちは払拭したいと考えております。
          </p>

          <div
            style={{
              padding: '20px',
              background: 'linear-gradient(135deg, rgba(255, 214, 107, 0.1), rgba(255, 214, 107, 0.05))',
              borderRadius: '16px',
              border: '2px solid rgba(255, 214, 107, 0.3)',
              marginBottom: '20px'
            }}
          >
            <p 
              className="body-base"
              style={{
                margin: 0,
                lineHeight: 'var(--leading-loose)',
                color: 'var(--ink-800)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              💭 「失敗はつらい。でもやらない後悔はもっとつらい。」<br />
              心の底では誰もがそう感じているのではないでしょうか。
            </p>
          </div>

          <p 
            className="body-base"
            style={{
              marginBottom: 0,
              lineHeight: 'var(--leading-loose)',
              color: 'var(--ink-700)'
            }}
          >
            実際、コーネル大学の心理学者トーマス・ギロヴィッチの研究で、「行動による後悔」よりも「行動しなかったことによる後悔」の方が大きいと示されています。これは「感情の持続性」が関係しているとされています。行動による後悔は、時間とともに薄れていく傾向がある一方で、行動しなかったことによる後悔は心に長く残りやすい。「もしあの時やっていたら…」という思いが、いつまでも残りやすいからです。
          </p>
        </div>

        {/* サブセクション1 */}
        <div
          style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            border: '2px dashed rgba(0, 0, 0, 0.08)',
            marginBottom: '24px'
          }}
        >
          <h3 
            className="heading-md"
            style={{
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>🤔</span>
            それでも「やめといた方がいいよ」とつい言ってしまう
          </h3>

          <p 
            className="body-base"
            style={{
              marginBottom: '16px',
              lineHeight: 'var(--leading-loose)',
              color: 'var(--ink-700)'
            }}
          >
            自分の失敗経験や一般的なケースにあてはめて、良かれと思ってアドバイスをしてしまうことがありますよね。「子どもには同じ経験をさせたくない」「できるだけ失敗は避けてほしい」・・これは思いやりでありつつ、お節介なのかもしれません。
          </p>

          <p 
            className="body-base"
            style={{
              marginBottom: 0,
              lineHeight: 'var(--leading-loose)',
              color: 'var(--ink-700)'
            }}
          >
            子どもにとっては、多くのことが新たなチャレンジであり、挑戦そのものが大きな学びになるでしょう。時代が変われば、昔の経験が通用しないことも多々あります。「それは危ないよ」「失敗したらどうするの？」という声が、チャレンジの機会を奪い、成長を阻んでいるかもしれません。
          </p>
        </div>

        {/* サブセクション2 */}
        <div
          style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            border: '2px dashed rgba(0, 0, 0, 0.08)',
            marginBottom: '24px'
          }}
        >
          <h3 
            className="heading-md"
            style={{
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>🚴</span>
            挑戦と失敗がつくる「学習経験」
          </h3>

          <p 
            className="body-base"
            style={{
              marginBottom: '16px',
              lineHeight: 'var(--leading-loose)',
              color: 'var(--ink-700)'
            }}
          >
            「学習経験」という言葉があります。自分がやってみて得られた経験のことです。勉強や読書のインプットだけでなく、実際に体験しながら学び、時には失敗し、そこから得た気づきや学びが深く記憶に残るという意味です。
          </p>

          <p 
            className="body-base"
            style={{
              marginBottom: '16px',
              lineHeight: 'var(--leading-loose)',
              color: 'var(--ink-700)'
            }}
          >
            たとえば、初めて自転車に乗れたときを思い出してください。最初はうまくバランスをとれず、失敗して転んでしまったと思います。「こうやってハンドルを持って、ペダルをこぐんだよ」と教えられても、実際に自転車に乗ると思うようにいかない。でも、その「転んだ経験」から、次はどうやったらバランスが取れるか体で覚え、少しずつ乗れるようになっていきます。
          </p>

          <p 
            className="body-base"
            style={{
              marginBottom: 0,
              lineHeight: 'var(--leading-loose)',
              color: 'var(--ink-700)'
            }}
          >
            このように、たとえ失敗しても、それを繰り返しながら少しずつ自信をつけ、最終的には自分の力でできるようになるプロセスこそが「学習経験」です。失敗も含めた学習経験は、感情とともに自分自身を成長させる大きな学びの機会です。一方で、失敗を恐れ挑戦しないでいると、どうしても安全な体験しか得られなくなります。そうなると、困難な問題に自分の力で立ち向かい、解決できたという経験が少なくなってしまいます。
          </p>
        </div>

        {/* サブセクション3 */}
        <div
          style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            border: '2px dashed rgba(0, 0, 0, 0.08)',
            marginBottom: '24px'
          }}
        >
          <h3 
            className="heading-md"
            style={{
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>📊</span>
            自己肯定感・自己有用感が低い国、ニッポン
          </h3>

          <p 
            className="body-base"
            style={{
              marginBottom: '16px',
              lineHeight: 'var(--leading-loose)',
              color: 'var(--ink-700)'
            }}
          >
            自分の力で何かを解決した経験が乏しい。また、自分の可能性を信じることができない。こうした背景が、日本の若者の自己肯定感や自己有用感の低さにつながっているのかもしれません。
          </p>

          <div
            style={{
              padding: '20px',
              background: 'linear-gradient(135deg, rgba(240, 106, 106, 0.1), rgba(240, 106, 106, 0.05))',
              borderRadius: '16px',
              border: '2px solid rgba(240, 106, 106, 0.3)',
              marginBottom: '16px'
            }}
          >
            <p 
              className="body-sm"
              style={{
                marginBottom: '8px',
                color: 'var(--ink-600)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              内閣府「我が国と諸外国のこどもと若者の意識に関する調査（2023年度）」13～29歳の日本の若者の回答：
            </p>
            <p 
              className="body-base"
              style={{
                margin: 0,
                lineHeight: 'var(--leading-loose)',
                color: 'var(--ink-800)'
              }}
            >
              📌 私は、自分自身に満足している <strong>57.4%</strong><br />
              📌 自分には長所があると感じている <strong>65.6%</strong><br />
              📌 今の自分が好きだ <strong>53.4%</strong><br />
              <span style={{ fontSize: '14px', color: 'var(--ink-600)' }}>※調査対象国の中で最下位</span>
            </p>
          </div>

          <p 
            className="body-base"
            style={{
              marginBottom: '16px',
              lineHeight: 'var(--leading-loose)',
              color: 'var(--ink-700)'
            }}
          >
            私たちは、この原因のひとつに「正解主義の教育」があると考えています。現在は情報があふれ、何が正解かわからない時代です。それでも学校教育においては「正解を暗記し、偏差値の高さで競う」のがまだまだ主流。このスタイルが、子どもたちの自己肯定感や自己有用感を損なうだけでなく、不登校の増加にも影響を与えているのではないでしょうか。
          </p>

          <p 
            className="body-base"
            style={{
              marginBottom: 0,
              lineHeight: 'var(--leading-loose)',
              color: 'var(--ink-700)'
            }}
          >
            2022年度の不登校の児童生徒数は299,048人にのぼります。この数は年々増加し、過去10年で2倍にまでなっています。（参考：文部科学省 児童生徒の問題行動・不登校等生徒指導上の諸課題に関する調査）<br /><br />
            このような場面で必要とされるのが、「失敗を含めた学習経験」です。挑戦を恐れ、他の人と同じような経験ばかりを積んでしまうと、「自分とは何か」という問いに答えることが難しくなってしまいます。自ら経験し、失敗も乗り越えることで、自分らしさが見つかるのだと思います。
          </p>
        </div>

        {/* サブセクション4 */}
        <div
          style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            border: '2px dashed rgba(0, 0, 0, 0.08)'
          }}
        >
          <h3 
            className="heading-md"
            style={{
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>🌟</span>
            失敗OK！自分が学んだことを試し、自分ならではの経験をつくるコミュニティ
          </h3>

          <p 
            className="body-base"
            style={{
              marginBottom: '16px',
              lineHeight: 'var(--leading-loose)',
              color: 'var(--ink-700)'
            }}
          >
            学校には、教育や社会性、子どもの発達をサポートする場としての機能があります。しかし、学んだことを実際に試し、経験を積む「実践の場」としての機能は少ないと思っています。
          </p>

          <p 
            className="body-base"
            style={{
              marginBottom: '16px',
              lineHeight: 'var(--leading-loose)',
              color: 'var(--ink-700)'
            }}
          >
            現在は情報があふれ、変化が激しい社会です。かつての正解らしきものも問い直され、見直されている世の中において、学んだことをすぐに試し、失敗しても改善策を見つけて動き続けることが大切だと私たちは考えています。
          </p>

          <div
            style={{
              padding: '20px',
              background: 'linear-gradient(135deg, rgba(52, 198, 190, 0.1), rgba(52, 198, 190, 0.05))',
              borderRadius: '16px',
              border: '2px solid rgba(52, 198, 190, 0.3)',
              marginBottom: '16px'
            }}
          >
            <p 
              className="body-base"
              style={{
                margin: 0,
                lineHeight: 'var(--leading-loose)',
                color: 'var(--ink-800)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              💡 CLAFTは、子どもたちが自ら課題を設定し、その解決策を個人やチームで考え、すぐに試せる場を提供していきます。自らアイデアを持ち寄って、それを形にしていく過程で、自分にしかない経験を積み重ね、自信を育むことができると考えています。
            </p>
          </div>

          <p 
            className="body-base"
            style={{
              marginBottom: '16px',
              lineHeight: 'var(--leading-loose)',
              color: 'var(--ink-700)'
            }}
          >
            また、CLAFTは同じ志を持った仲間が集まるコミュニティでもあります。今の子どもたちの活動範囲は、主に家庭と学校が中心です。それでは社会を知るきっかけが不足しているように思います。評価の基準も限られていて、多様な個性や才能が十分に活かされにくいのが現状です。だからこそ、私たちは「ナナメの関係」が大切だと考えます。
          </p>

          <p 
            className="body-base"
            style={{
              marginBottom: 0,
              lineHeight: 'var(--leading-loose)',
              color: 'var(--ink-700)'
            }}
          >
            企業や団体、地域住民、習い事や教室など、いわゆる「弱いつながり」を持つことです。親や先生とのタテ関係、兄妹や友達とのヨコ関係にはないコミュニケーションや関わり合いが生まれることで、子どもたちが世の中を知る貴重な機会になると思っています。<br /><br />
            あなたもぜひ、私たちと一緒に「ナナメの関係」を築きながら、子どもたちの活動をサポートしていきませんか？
          </p>
        </div>
      </Section>

      {/* JSON-LD 構造化データ */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "ミライクラフト（実践）",
            "description": "作品発表会、イベント企画、商品制作などに挑戦。自分の好きや得意を活かしながら、仲間と試行錯誤し、「仕事」を実感する学びです。",
            "provider": { "@type": "Organization", "name": "CLAFT" }
          })
        }}
      />
    </MobileContainer>
  );
}
