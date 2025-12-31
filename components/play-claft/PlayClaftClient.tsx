'use client';

import { MobileContainer, Section } from '@/components/MobileContainer';
import { useEffect, useRef, useState } from 'react';

// 浮遊アイコンのSVGコンポーネント
const FloatingIcon = ({ children, delay = 0, left = '10%', top = '20%' }: { children: React.ReactNode, delay?: number, left?: string, top?: string }) => (
  <div style={{
    position: 'absolute',
    left,
    top,
    animation: `float 3s ease-in-out ${delay}s infinite`,
    opacity: 0.7,
    fontSize: 'clamp(24px, 5vw, 40px)',
    zIndex: 0,
    pointerEvents: 'none'
  }}>
    {children}
  </div>
);

export function PlayClaftClient(){
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  // 【修正箇所】型を HTMLElement に広げることで、article要素などの代入エラーを防ぎます
  const cardsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <MobileContainer>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
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
          transform: translateY(30px) rotate(0deg);
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
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        /* 方眼紙パターン */
        .graph-paper {
          background-image: 
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.5;
        }
      `}</style>

      {/* Hero - 冒険の入り口 */}
      <Section>
        <div ref={heroRef} style={{ position: 'relative', overflow: 'hidden', paddingBottom: '40px' }}>
          {/* 方眼紙パターンの背景 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            opacity: 0.4,
            zIndex: -3,
            pointerEvents: 'none'
          }} />

          {/* ちぎり紙風の有機的な背景 */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '-5%',
            width: '110%',
            height: '280px',
            zIndex: -2,
            opacity: 0.25,
            pointerEvents: 'none'
          }}>
            <svg width="100%" height="100%" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none">
              <path 
                d="M0 20L50 25L100 15L150 30L200 10L250 22L300 18L350 35L400 12L450 28L500 20L550 32L600 15L650 25L700 10L750 30L800 18L850 22L900 12L950 35L1000 20L1050 28L1100 15L1150 32L1200 10L1250 25L1300 18L1350 30L1400 12L1440 22V100H0V20Z" 
                fill="var(--brand)" 
              />
            </svg>
          </div>
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '-5%',
            width: '90%',
            height: '220px',
            zIndex: -1,
            opacity: 0.18,
            pointerEvents: 'none'
          }}>
            <svg width="100%" height="100%" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none">
              <path 
                d="M0 30L60 22L120 35L180 18L240 28L300 20L360 32L420 15L480 25L540 10L600 30L660 18L720 22L780 12L840 35L900 20L960 28L1020 15L1080 32L1140 10L1200 25L1260 18L1320 30L1380 12L1440 25V100H0V30Z" 
                fill="var(--cream)" 
              />
            </svg>
          </div>

          {/* パララックス装飾 */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
              <FloatingIcon delay={0} left="5%" top="10%">⭐</FloatingIcon>
              <FloatingIcon delay={0.5} left="85%" top="15%">✨</FloatingIcon>
              <FloatingIcon delay={1} left="10%" top="60%">🎨</FloatingIcon>
              <FloatingIcon delay={1.5} left="80%" top="70%">🚀</FloatingIcon>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 items-center" style={{gridTemplateAreas: '"title" "media" "text"', position: 'relative', zIndex: 1}}>
            <div style={{ gridArea: 'title' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: 'clamp(10px, 2.5vw, 14px) clamp(16px, 4vw, 24px)',
                borderRadius: '999px',
                background: '#EAB308',
                border: '2px solid rgba(0,0,0,0.1)',
                fontWeight: 'var(--font-bold)',
                fontSize: 'clamp(18px, 4vw, 26px)',
                color: 'white',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                transform: 'rotate(-3deg)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
                letterSpacing: '0.02em'
              }} className="slide-in-left">
                PLAY CLAFT
              </div>
              <h1 className="heading-xl my-2" style={{ position: 'relative' }}>
                {['「', '遊', 'ぶ', '人', '」', 'か', 'ら', '「', '遊', 'び', 'を', 'つ', 'く', 'る', '人', '」', 'へ', '。'].map((char, i) => (
                  <span key={i} className="bounce-char" style={{ animationDelay: `${i * 0.1}s` }}>
                    {char}
                  </span>
                ))}
              </h1>
            </div>

            {/* ポラロイド風の写真フレーム */}
            <div style={{
              gridArea: 'media',
              transform: 'rotate(-2deg)',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-2deg) scale(1)'}
            >
              <div style={{
                background: 'var(--rail-cream)',
                padding: '12px',
                paddingBottom: '40px',
                borderRadius: 'var(--radius)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                position: 'relative'
              }}>
                {/* マスキングテープ（境界線をまたぐ、ギザギザ、透過） */}
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  width: '90px',
                  height: '35px',
                  background: 'var(--pink)',
                  opacity: 0.8,
                  mixBlendMode: 'multiply',
                  transform: 'rotate(5deg)',
                  clipPath: 'polygon(2% 0%, 5% 5%, 8% 2%, 12% 8%, 15% 3%, 18% 7%, 22% 4%, 25% 9%, 28% 5%, 32% 10%, 35% 6%, 38% 11%, 42% 7%, 45% 12%, 48% 8%, 52% 13%, 55% 9%, 58% 14%, 62% 10%, 65% 15%, 68% 11%, 72% 16%, 75% 12%, 78% 17%, 82% 13%, 85% 18%, 88% 14%, 92% 19%, 95% 15%, 98% 20%, 100% 25%, 98% 80%, 95% 85%, 92% 81%, 88% 86%, 85% 82%, 82% 87%, 78% 83%, 75% 88%, 72% 84%, 68% 89%, 65% 85%, 62% 90%, 58% 86%, 55% 91%, 52% 87%, 48% 92%, 45% 88%, 42% 93%, 38% 89%, 35% 94%, 32% 90%, 28% 95%, 25% 91%, 22% 96%, 18% 92%, 15% 97%, 12% 93%, 8% 98%, 5% 94%, 2% 100%, 0% 75%)',
                  pointerEvents: 'none'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '5px',
                  left: '20px',
                  width: '70px',
                  height: '28px',
                  background: 'var(--cream)',
                  opacity: 0.8,
                  mixBlendMode: 'multiply',
                  transform: 'rotate(-3deg)',
                  clipPath: 'polygon(3% 5%, 6% 2%, 9% 6%, 13% 3%, 16% 7%, 19% 4%, 23% 8%, 26% 5%, 29% 9%, 33% 6%, 36% 10%, 39% 7%, 43% 11%, 46% 8%, 49% 12%, 53% 9%, 56% 13%, 59% 10%, 63% 14%, 66% 11%, 69% 15%, 73% 12%, 76% 16%, 79% 13%, 83% 17%, 86% 14%, 89% 18%, 93% 15%, 96% 19%, 100% 25%, 97% 75%, 94% 95%, 91% 92%, 87% 96%, 84% 93%, 81% 97%, 77% 94%, 74% 98%, 71% 95%, 67% 99%, 64% 96%, 61% 100%, 57% 97%, 54% 96%, 51% 92%, 47% 95%, 44% 91%, 41% 94%, 37% 90%, 34% 93%, 31% 89%, 27% 92%, 24% 88%, 21% 91%, 17% 87%, 14% 90%, 11% 86%, 7% 89%, 4% 85%, 0% 80%)',
                  pointerEvents: 'none'
                }} />
                
                <div className="aspect-video rounded-sm bg-gradient-to-br from-[rgba(52,198,190,0.15)] to-[rgba(240,106,106,0.12)] overflow-hidden">
                  <img 
                    src="/assets/play-claft/hero.jpg" 
                    alt="「遊ぶ人」から「遊びをつくる人」へ。"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 吹き出し風のコンセプトセクション */}
            <div style={{ gridArea: 'text', position: 'relative' }}>
              {/* 周りの装飾アイコン */}
              <div style={{ position: 'absolute', left: '-30px', top: '10%', fontSize: '32px', opacity: 0.6, pointerEvents: 'none' }}>
                <div style={{ animation: 'float 2s ease-in-out infinite' }}>💡</div>
              </div>
              <div style={{ position: 'absolute', right: '-25px', top: '30%', fontSize: '28px', opacity: 0.6, pointerEvents: 'none' }}>
                <div style={{ animation: 'float 2.5s ease-in-out 0.5s infinite' }}>✏️</div>
              </div>
              <div style={{ position: 'absolute', left: '-20px', bottom: '15%', fontSize: '30px', opacity: 0.6, pointerEvents: 'none' }}>
                <div style={{ animation: 'float 3s ease-in-out 1s infinite' }}>💭</div>
              </div>

              {/* 吹き出し本体 */}
              <div style={{
                background: 'var(--rail-cream)',
                border: '3px solid var(--brand)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(20px, 5vw, 28px)',
                position: 'relative',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
              }}>
                {/* 吹き出しの尻尾 */}
                <div style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '30px',
                  width: '0',
                  height: '0',
                  borderLeft: '20px solid transparent',
                  borderRight: '20px solid transparent',
                  borderTop: '20px solid var(--brand)',
                  pointerEvents: 'none'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '-14px',
                  left: '33px',
                  width: '0',
                  height: '0',
                  borderLeft: '17px solid transparent',
                  borderRight: '17px solid transparent',
                  borderTop: '17px solid white',
                  pointerEvents: 'none'
                }} />

                <div className="body-base text-ink-700 space-y-4">
                  <p className="mb-4">私たちは普段、誰かが作ったゲームやサービスを「楽しむ側」でいることが多いですよね。<br/>でも今回は、「ルールを創る側」＝つくる人になってみるチャレンジです。</p>
                  <p className="mb-4">「どうすればもっと面白くなるだろう？」<br/>「遊ぶ人はどんな気持ちになるかな？」</p>
                  <p className="mb-4">そんな問いを考える経験は、学校の勉強だけでは学べない大切な力。<br/>お店や会社のように、商品やサービスを「提供する側」の体験ができ、社会に出る前に仕事のイメージを持つことができます。</p>
                  <p className="mb-4">この経験によって、</p>
                  <p className="mb-4"><strong className="emphasis">他者の立場に立って考える力</strong></p>
                  <p className="mb-4"><strong className="emphasis">仲間とのコミュニケーション力</strong></p>
                  <p className="mb-4"><strong className="emphasis">新たなモノを生み出す創造力</strong></p>
                  <p className="mb-4">を獲得することができます！！</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* STEP 1 - スクラップブック風 */}
      <Section 
        id="step1"
        style={{
          position: 'relative',
          padding: 'clamp(60px, 10vw, 80px) 0',
          background: 'radial-gradient(1200px 600px at 50% -10%, rgba(52,198,190,.12), transparent 60%)',
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

        {/* 足跡の装飾 */}
        <div style={{
          position: 'absolute',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.1,
          zIndex: 0
        }}>
          <svg width="100%" height="600" style={{ position: 'absolute', top: 0 }}>
            <path 
              d="M 50,50 Q 100,150 150,250 T 250,450" 
              stroke="var(--brand)" 
              strokeWidth="3" 
              strokeDasharray="10,10" 
              fill="none"
            />
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="heading-lg mb-6" style={{
            textAlign: 'center',
            position: 'relative',
            display: 'inline-block',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            【STEP1】アイデアづくり（6/29〜8/11）
            {/* 手書き風アンダーライン */}
            <svg
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '0',
                width: '100%',
                height: '15px',
                zIndex: -1
              }}
              viewBox="0 0 300 15"
              preserveAspectRatio="none"
            >
              <path
                d="M5,10 Q80,8 150,10 T295,10"
                stroke="var(--brand)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </h2>

          <div className="grid grid-cols-1 gap-8 mt-12">
            {[
              { title: '6/29：人々のワクワクを創ってみよう！（Yononaka）', img: 'step1-0629.jpg', desc: ['「どんな企画ならみんなが喜ぶかな？」「どう伝えれば面白さが伝わるかな？」', 'など、相手の気持ちを想像して、伝え方を考えるためのワーク。', '「ワクワク」が生まれるきっかけは一つではないからこそ、相手がどんなことに興味があるのかを考えながら、いろいろな角度からアプローチすることが大切。', '相手の気持ちを想像し、ワクワクさせる仕掛けを考える経験は、自分自身のレベルアップにつながるだけでなく、世の中にあふれる「面白いこと」の仕組みを知るきっかけにもなります。'], url: 'https://youtu.be/RCUJtQDj-Wg', rotate: '-2deg', tapeColor: 'var(--pink)', tapeRotate: '8deg', offsetX: '8px' },
              { title: '7/27：アイデアづくり（なんでも発表会）', img: 'step1-0727.jpg', desc: ['『ぷよぷよ』や『はぁって言うゲーム』などを生み出したゲーム作家・米光一成さんの発想法にならい、「くだらないアイデア」を大量に出し合って、その場で組み合わせてイベント案を作成。くだらないアイデアは「意味がない」のではなく、まだ「誰も知らない」未来への種です。', '失敗を恐れずに、くだらない種を形にしていくプロセスこそが、豊かな創造力を育みます。'], url: 'https://youtu.be/DQc8Pqz6-O0', rotate: '1.5deg', tapeColor: 'var(--cream)', tapeRotate: '-6deg', offsetX: '-10px' },
              { title: '7/28〜8/11：アンケートで"種"再募集', img: 'step1-0728-0811.jpg', desc: ['当日参加できなかった人、その場で思いつかなかった人のアイデア募集をしました。'], url: null, rotate: '-1deg', tapeColor: 'var(--brand)', tapeRotate: '5deg', offsetX: '5px' }
            ].map((item, i) => (
              <article 
                key={i} 
                ref={(el) => { if (el) cardsRef.current[i] = el; }}
                className="reveal-card"
                style={{
                  transform: `translateX(${item.offsetX}) rotate(${item.rotate})`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = `translateX(${item.offsetX}) rotate(0deg) translateY(-8px) scale(1.02)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `translateX(${item.offsetX}) rotate(${item.rotate}) translateY(0) scale(1)`;
                }}
              >
                {/* ポラロイド風フォトフレーム */}
                <div style={{
                  background: 'var(--rail-cream)',
                  padding: '16px',
                  paddingBottom: '24px',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  position: 'relative'
                }}>
                  {/* マスキングテープ（ギザギザ、境界線をまたぐ） */}
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '30px',
                    width: '100px',
                    height: '35px',
                    background: item.tapeColor,
                    opacity: 0.8,
                    mixBlendMode: 'multiply',
                    transform: `rotate(${item.tapeRotate})`,
                    clipPath: 'polygon(2% 0%, 5% 5%, 8% 2%, 12% 8%, 15% 3%, 18% 7%, 22% 4%, 25% 9%, 28% 5%, 32% 10%, 35% 6%, 38% 11%, 42% 7%, 45% 12%, 48% 8%, 52% 13%, 55% 9%, 58% 14%, 62% 10%, 65% 15%, 68% 11%, 72% 16%, 75% 12%, 78% 17%, 82% 13%, 85% 18%, 88% 14%, 92% 19%, 95% 15%, 98% 20%, 100% 25%, 98% 80%, 95% 85%, 92% 81%, 88% 86%, 85% 82%, 82% 87%, 78% 83%, 75% 88%, 72% 84%, 68% 89%, 65% 85%, 62% 90%, 58% 86%, 55% 91%, 52% 87%, 48% 92%, 45% 88%, 42% 93%, 38% 89%, 35% 94%, 32% 90%, 28% 95%, 25% 91%, 22% 96%, 18% 92%, 15% 97%, 12% 93%, 8% 98%, 5% 94%, 2% 100%, 0% 75%)',
                    pointerEvents: 'none'
                  }} />

                  <h3 className="heading-sm mb-3 break-words" style={{ lineHeight: '1.4' }}>
                    {item.title}
                  </h3>
                  
                  <div style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                    borderRadius: '4px',
                    marginBottom: '16px',
                    border: '1px solid rgba(0,0,0,0.06)'
                  }}>
                    <img 
                      src={`/assets/play-claft/${item.img}`}
                      alt={`${item.title}のサムネイル`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        background: '#eef2f7'
                      }}
                    />
                  </div>

                  <div style={{ padding: '0 4px' }}>
                    <div className="space-y-3">
                      {item.desc.map((text, j) => (
                        <p key={j} className="body-base text-ink-700 mb-3 whitespace-pre-line">{text}</p>
                      ))}
                      {item.url && (
                        <p className="body-base text-ink-700 mb-3">
                          <a href={item.url} target="_blank" rel="noopener" className="text-brand no-underline hover:underline font-bold">
                            ▶ 詳しく見る
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* STEP 2 - スクラップブック風 */}
      <Section 
        id="step2"
        style={{
          position: 'relative',
          padding: 'clamp(60px, 10vw, 80px) 0',
          background: 'radial-gradient(1200px 600px at 50% -10%, rgba(255,214,107,.25), transparent 60%)',
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

        {/* 足跡の装飾 */}
        <div style={{
          position: 'absolute',
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.12,
          zIndex: 0
        }}>
          <svg width="100%" height="500" style={{ position: 'absolute', top: 0 }}>
            <path 
              d="M 100,50 Q 150,120 200,200 T 300,380" 
              stroke="var(--cream)" 
              strokeWidth="4" 
              strokeDasharray="8,12" 
              fill="none"
            />
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="heading-lg mb-6" style={{
            textAlign: 'center',
            position: 'relative',
            display: 'inline-block',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            【STEP2】イベントづくり（8/12〜10/12）
            <svg
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '0',
                width: '100%',
                height: '15px',
                zIndex: -1
              }}
              viewBox="0 0 300 15"
              preserveAspectRatio="none"
            >
              <path
                d="M5,10 Q80,8 150,10 T295,10"
                stroke="var(--cream)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
          </h2>

          <div className="grid grid-cols-1 gap-8 mt-12">
            {[
              { title: '8/12～8/31：イベント企画の投票と希望', img: 'step2-0812-0831.jpg', desc: ['授業前のちょこっとYononakaにて、スクール生全員がイベント企画の投票を行いました。その中で「自分も関わりたい」と思うイベントの希望を出しました。', '※投票結果により「カードゲーム」「紙ひこうき大会」「ロボットイベント」の3つに決まりました！'], rotate: '2deg', tapeColor: 'var(--cream)', tapeRotate: '-7deg', offsetX: '-7px' },
              { title: '9/1～9/14：アイデア出し（個人）', img: 'step2-0901-0914.jpg', desc: ['決まった企画に関して、「こんなことしたらいいんちゃう？」というアイデアと「自分はこういうことができそう！」という意見を集めました。初回MTG日程の希望も集めました。'], rotate: '-1.5deg', tapeColor: 'var(--pink)', tapeRotate: '6deg', offsetX: '9px' },
              { title: '9/15～10/18：アイデア出し（グループ）', img: 'step2-0915-1018.jpg?v=20251006', desc: ['MTG日程の希望がバラバラだったため、まずは現地で同じ時間帯に学んでいるスクール生同士で集まり意見を出し合いました。上画像の大まかな流れをみなで共有し、アイデアを広げたり、深めたりしていきました。'], rotate: '1deg', tapeColor: 'var(--brand)', tapeRotate: '-5deg', offsetX: '-5px' }
            ].map((item, i) => (
              <article 
                key={i} 
                ref={(el) => { if (el) cardsRef.current[i + 3] = el; }}
                className="reveal-card"
                style={{
                  transform: `translateX(${item.offsetX}) rotate(${item.rotate})`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = `translateX(${item.offsetX}) rotate(0deg) translateY(-8px) scale(1.02)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `translateX(${item.offsetX}) rotate(${item.rotate}) translateY(0) scale(1)`;
                }}
              >
                <div style={{
                  background: 'var(--rail-cream)',
                  padding: '16px',
                  paddingBottom: '24px',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '30px',
                    width: '100px',
                    height: '35px',
                    background: item.tapeColor,
                    opacity: 0.8,
                    mixBlendMode: 'multiply',
                    transform: `rotate(${item.tapeRotate})`,
                    clipPath: 'polygon(2% 0%, 5% 5%, 8% 2%, 12% 8%, 15% 3%, 18% 7%, 22% 4%, 25% 9%, 28% 5%, 32% 10%, 35% 6%, 38% 11%, 42% 7%, 45% 12%, 48% 8%, 52% 13%, 55% 9%, 58% 14%, 62% 10%, 65% 15%, 68% 11%, 72% 16%, 75% 12%, 78% 17%, 82% 13%, 85% 18%, 88% 14%, 92% 19%, 95% 15%, 98% 20%, 100% 25%, 98% 80%, 95% 85%, 92% 81%, 88% 86%, 85% 82%, 82% 87%, 78% 83%, 75% 88%, 72% 84%, 68% 89%, 65% 85%, 62% 90%, 58% 86%, 55% 91%, 52% 87%, 48% 92%, 45% 88%, 42% 93%, 38% 89%, 35% 94%, 32% 90%, 28% 95%, 25% 91%, 22% 96%, 18% 92%, 15% 97%, 12% 93%, 8% 98%, 5% 94%, 2% 100%, 0% 75%)'
                  }} />

                  <h3 className="heading-sm mb-3 break-words" style={{ lineHeight: '1.4' }}>
                    {item.title}
                  </h3>
                  
                  <div style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                    borderRadius: '4px',
                    marginBottom: '16px',
                    border: '1px solid rgba(0,0,0,0.06)'
                  }}>
                    <img 
                      src={`/assets/play-claft/${item.img}`}
                      alt={`${item.title}のサムネイル`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        background: '#eef2f7'
                      }}
                    />
                  </div>

                  <div style={{ padding: '0 4px' }}>
                    <div className="space-y-3">
                      {item.desc.map((text, j) => (
                        <p key={j} className="body-base text-ink-700 mb-3 whitespace-pre-line">{text}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* STEP 3 - スクラップブック風 */}
      <Section 
        id="step3"
        style={{
          position: 'relative',
          padding: 'clamp(60px, 10vw, 80px) 0',
          background: 'radial-gradient(1200px 600px at 50% -10%, rgba(240,106,106,.18), transparent 60%)',
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

        {/* 足跡の装飾 */}
        <div style={{
          position: 'absolute',
          top: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.1,
          zIndex: 0
        }}>
          <svg width="100%" height="800" style={{ position: 'absolute', top: 0 }}>
            <path 
              d="M 80,50 Q 130,150 180,250 T 280,550" 
              stroke="var(--pink)" 
              strokeWidth="3" 
              strokeDasharray="12,8" 
              fill="none"
            />
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="heading-lg mb-6" style={{
            textAlign: 'center',
            position: 'relative',
            display: 'inline-block',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            【STEP3】ワクワクづくり（10/19〜11/29）
            <svg
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '0',
                width: '100%',
                height: '15px',
                zIndex: -1
              }}
              viewBox="0 0 300 15"
              preserveAspectRatio="none"
            >
              <path
                d="M5,10 Q80,8 150,10 T295,10"
                stroke="var(--pink)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </h2>

          <div className="grid grid-cols-1 gap-8 mt-12">
            {[
              { title: '10/19：オンラインMTG開始（メンバー全員）', img: 'step3-1019.jpg', desc: ['参加メンバー全員が集まる初回ミーティングで、集まったアイデアを形にしていきます。', 'それまでの状況をまとめたPDFを送り、赤字の部分を参考に事前にアイデアを考えてから、各々ミーティングに参加します。', '3つの企画のアイデアをまとめ、具体的な内容を決めます。'], pdf: '/assets/play-claft/1019mtg-play-claft.pdf', rotate: '-1.5deg', tapeColor: 'var(--pink)', tapeRotate: '7deg', offsetX: '6px' },
              { title: '10/21～10/30：グループLINE開始（メンバー全員）', img: 'step3-1020-1031.jpg', desc: ['ミーティングで企画の大まかな内容が決定しました。', 'まだ決まっていない部分のアイデアをLINEのノート機能を使って募集。ここからは、スタッフもどんどんアイデア出し、全員で形にしていきます。', 'チーム分けも行い、カードゲーム・紙ひこうき・ロボットイベント・告知チームにわかれました。'], pdf: null, rotate: '2deg', tapeColor: 'var(--cream)', tapeRotate: '-6deg', offsetX: '-8px' },
              { title: '11/1～11/14：チーム活動開始', img: 'step3-1101-1114.jpg', desc: ['メンバーが教室に来る日はバラバラなので、集まった人同士でアイデアを出し合います。', 'その時間に思うことやアイデアを話して、次の人へつないでいく。11/7からは参加者の募集をはじまりました！'], pdf: null, rotate: '-1deg', tapeColor: 'var(--brand)', tapeRotate: '5deg', offsetX: '7px' },
              { title: '11/15～11/21：会場・アイテムの準備', img: 'step3-1115-1121.jpg', desc: ['カードゲームは、カードをデザインして制作し、大阪府の領地ごとの特徴と効果を決めました。', 'ロボットタウンは、展示するロボットとクイズ内容を制作し、体験ゲームの内容を考えました。', '紙ひこうき大会は、20種類以上の紙ひこうきを制作し、得点エリアとルールを決めました。'], pdf: null, rotate: '1.5deg', tapeColor: 'var(--pink)', tapeRotate: '-7deg', offsetX: '-9px' },
              { title: '11/22：スクールフェスタ リハーサル', img: 'step3-1122.jpg', desc: ['スクール生が主体となって、リハーサルと会場設営を行いました。', 'ミニゲームの難易度や紙ひこうきの得点設計など、「当日来てくれた誰もが笑顔になれること」を目指して、ひとつずつ丁寧に確認。', '準備の段階から真剣に取り組む子どもたちの姿そのものが、きっとこの先にも活きてくる大切な経験になると思います。'], pdf: null, buttons: null, rotate: '-2deg', tapeColor: 'var(--cream)', tapeRotate: '6deg', offsetX: '5px' },
              { title: '11/29：スクールフェスタ 本番', img: 'step3-1129.jpg', desc: ['テーマは──『心に残る一瞬』― 子どもたちの "いま" が光るフェスタ ―', 'ロボットが動き、紙飛行機が舞い、カードゲームで湧きあがる・・・そんな一日になる！？', '今回のイベントは、ふとしたひらめき、「やってみたい！」から芽生えたもの。', 'それがまた、だれかの "ひらめき" へとつながっていく。そんな一日になりました！'], pdf: null, buttons: [{ label: 'スクールフェスタのページ', url: 'https://autumn-schoolfesta2025.figma.site/' }, { label: '当日のレポート', url: 'https://note.com/yononaka_career/n/nf2d4216c4131' }], rotate: '1deg', tapeColor: 'var(--brand)', tapeRotate: '-5deg', offsetX: '-6px' },
              { title: '12/14：メンバーの振り返り', img: 'step3-1214.jpg', desc: ['メンバー1人1人が自分の思ったことや改善点などを共有しました。', '紙ひこうきは特に親子で楽しめた、カードゲームは戦略ゲームとしての手応えがあった。', 'ただ、15分の制限時間は短かったかも？ゲームの難易度調整やプログラム開発時間の効率化も次回に向けて必要やね。', '次回は「リアル脱出ゲーム」をやってみたい！など、いろんな意見が出ました。'], pdf: null, buttons: null, rotate: '-1.5deg', tapeColor: 'var(--pink)', tapeRotate: '7deg', offsetX: '8px' }
            ].map((item, i) => (
              <article 
                key={i} 
                ref={(el) => { if (el) cardsRef.current[i + 6] = el; }}
                className="reveal-card"
                style={{
                  transform: `translateX(${item.offsetX}) rotate(${item.rotate})`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = `translateX(${item.offsetX}) rotate(0deg) translateY(-8px) scale(1.02)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `translateX(${item.offsetX}) rotate(${item.rotate}) translateY(0) scale(1)`;
                }}
              >
                <div style={{
                  background: 'var(--rail-cream)',
                  padding: '16px',
                  paddingBottom: item.img ? '24px' : '20px',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  position: 'relative',
                  minHeight: item.img ? 'auto' : '100px'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '30px',
                    width: '100px',
                    height: '35px',
                    background: item.tapeColor,
                    opacity: 0.8,
                    mixBlendMode: 'multiply',
                    transform: `rotate(${item.tapeRotate})`,
                    clipPath: 'polygon(2% 0%, 5% 5%, 8% 2%, 12% 8%, 15% 3%, 18% 7%, 22% 4%, 25% 9%, 28% 5%, 32% 10%, 35% 6%, 38% 11%, 42% 7%, 45% 12%, 48% 8%, 52% 13%, 55% 9%, 58% 14%, 62% 10%, 65% 15%, 68% 11%, 72% 16%, 75% 12%, 78% 17%, 82% 13%, 85% 18%, 88% 14%, 92% 19%, 95% 15%, 98% 20%, 100% 25%, 98% 80%, 95% 85%, 92% 81%, 88% 86%, 85% 82%, 82% 87%, 78% 83%, 75% 88%, 72% 84%, 68% 89%, 65% 85%, 62% 90%, 58% 86%, 55% 91%, 52% 87%, 48% 92%, 45% 88%, 42% 93%, 38% 89%, 35% 94%, 32% 90%, 28% 95%, 25% 91%, 22% 96%, 18% 92%, 15% 97%, 12% 93%, 8% 98%, 5% 94%, 2% 100%, 0% 75%)'
                  }} />

                  <h3 className="heading-sm mb-3 break-words" style={{ lineHeight: '1.4' }}>
                    {item.title}
                  </h3>
                  
                  {item.img && (
                    <div style={{
                      width: '100%',
                      aspectRatio: '16/9',
                      overflow: 'hidden',
                      borderRadius: '4px',
                      marginBottom: '16px',
                      border: '1px solid rgba(0,0,0,0.06)'
                    }}>
                      <img 
                        src={`/assets/play-claft/${item.img}`}
                        alt={`${item.title}のサムネイル`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          background: '#eef2f7'
                        }}
                      />
                    </div>
                  )}

                  {item.desc.length > 0 && (
                    <div style={{ padding: '0 4px' }}>
                      <div className="space-y-3">
                        {item.desc.map((text, j) => (
                          <p key={j} className="body-base text-ink-700 mb-3 whitespace-pre-line">{text}</p>
                        ))}
                        {item.pdf && (
                          <p className="body-base text-ink-700 mb-3">
                            <a href={item.pdf} target="_blank" rel="noopener" className="text-brand no-underline hover:underline font-bold">
                              📄 PDFはこちら
                            </a>
                          </p>
                        )}
                        {item.buttons && item.buttons.length > 0 && (
                          <div className="flex flex-col gap-3 mt-4">
                            {item.buttons.map((button: { label: string, url: string }, k: number) => (
                              <a 
                                key={k}
                                href={button.url} 
                                target="_blank" 
                                rel="noopener"
                                style={{
                                  display: 'inline-block',
                                  padding: '12px 24px',
                                  background: 'var(--brand)',
                                  color: 'white',
                                  borderRadius: 'var(--radius)',
                                  textAlign: 'center',
                                  fontWeight: 'var(--font-bold)',
                                  textDecoration: 'none',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                  transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'translateY(-2px)';
                                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'translateY(0)';
                                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                }}
                              >
                                {button.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </MobileContainer>
  );
}