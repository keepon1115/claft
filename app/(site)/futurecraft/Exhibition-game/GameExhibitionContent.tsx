'use client'

import { useEffect } from 'react'

/* ============================================================
   インラインSVGアイコン（FontAwesomeの代替）
   ============================================================ */
const Icon = {
  Gamepad: ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.58 16.09l-1.09-7.66C20.21 6.46 18.52 5 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75 1.56 0 2.75-1.37 2.53-2.91zM11 11H9v2H7v-2H5V9h2V7h2v2h2v2zm4-1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
  ),
  Star: ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ),
  Heart: ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  Ghost: ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a8 8 0 0 0-8 8v12l3-2 2 2 2-2 2 2 2-2 2 2 3-2V10a8 8 0 0 0-8-8zm-2 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
    </svg>
  ),
  Coins: ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C8.13 2 5 4.13 5 7v3c-1.66 0-3 1.34-3 3v4c0 1.66 1.34 3 3 3v1c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1c1.66 0 3-1.34 3-3v-4c0-1.66-1.34-3-3-3V7c0-2.87-3.13-5-7-5zm0 2c2.76 0 5 1.79 5 4v3H7V8c0-2.21 2.24-4 5-4z" />
    </svg>
  ),
  Rocket: ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5c-2 0-3.5 1.5-3.5 3.5 0 .5.1 1 .3 1.5L4 12.3v3.2l3 .8 1.5 1.5L9.3 21h3.2l4.8-4.8c.5.2 1 .3 1.5.3 2 0 3.5-1.5 3.5-3.5 0-3.5-2.5-7-9.3-10.5zm3.5 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  ),
  CirclePlay: ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
    </svg>
  ),
  CommentDots: ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1zm-9-1.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
    </svg>
  ),
  ArrowUpRightDots: ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 5h-7l3 3-7 7-3-3-3 3 6 6 10-10 3 3V5h-2zm-9 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-4-4a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm10-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
    </svg>
  ),
  ArrowsRotate: ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" />
    </svg>
  ),
  Lightbulb: ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
    </svg>
  ),
  Bolt: ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 2v11h3v9l7-12h-4l4-8z" />
    </svg>
  ),
}

export default function GameExhibitionContent() {
  useEffect(() => {
    const root = document.querySelector('.game-exhibition-page')
    if (!root) return
    root.classList.add('js-loaded')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    root.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="game-exhibition-page arcade-grid scanlines">

      {/* ===== TICKER ===== */}
      <div className="bg-neon-pink-bg text-arcade-bg-fg py-2 overflow-hidden border-y-4 border-white relative z-30">
        <div className="marquee flex whitespace-nowrap font-pixel text-xs sm:text-sm">
          <span className="px-6">★ INSERT COIN ★</span>
          <span className="px-6">6月開催 GAME EXHIBITION</span>
          <span className="px-6">★ READY PLAYER ONE ★</span>
          <span className="px-6">PRESS START TO JOIN</span>
          <span className="px-6">★ オリジナルゲーム集合 ★</span>
          <span className="px-6">LEVEL UP YOUR SCHOOL</span>
          <span className="px-6">★ INSERT COIN ★</span>
          <span className="px-6">6月開催 GAME EXHIBITION</span>
          <span className="px-6">★ READY PLAYER ONE ★</span>
          <span className="px-6">PRESS START TO JOIN</span>
          <span className="px-6">★ オリジナルゲーム集合 ★</span>
          <span className="px-6">LEVEL UP YOUR SCHOOL</span>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center px-5 py-20 sm:py-32 overflow-hidden">

        <div className="absolute top-20 left-6 text-neon-cyan-fg float-slow opacity-80 hidden sm:block">
          <Icon.Gamepad className="w-12 h-12" />
        </div>
        <div className="absolute top-32 right-8 text-neon-yellow-fg float-fast opacity-80">
          <Icon.Star className="w-10 h-10" />
        </div>
        <div className="absolute bottom-32 left-10 text-neon-lime-fg float-fast opacity-70">
          <Icon.Heart className="w-8 h-8" />
        </div>
        <div className="absolute bottom-24 right-12 text-neon-purple-fg float-slow opacity-80 hidden sm:block">
          <Icon.Ghost className="w-12 h-12" />
        </div>
        <div className="absolute top-1/2 left-4 text-neon-pink-fg opacity-60 spin-slow hidden md:block">
          <Icon.Coins className="w-8 h-8" />
        </div>
        <div className="absolute top-40 right-1/4 text-neon-cyan-fg float-slow opacity-50 hidden md:block">
          <Icon.Rocket className="w-8 h-8" />
        </div>

        <div className="relative z-10 max-w-5xl text-center">

          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-arcade-deep-bg border-2 border-neon-cyan-fg fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="w-2 h-2 bg-neon-pink-bg rounded-full blink"></span>
            <span className="font-pixel text-[0.65rem] sm:text-xs text-neon-cyan-fg tracking-widest">NEW EVENT // 2026.06</span>
          </div>

          <p className="font-pixel text-xs sm:text-sm text-neon-yellow-fg mb-6 fade-up" style={{ animationDelay: '0.2s' }}>
            &gt; キープオン PRESENTS
          </p>

          <h1 className="hero-title font-bungee gradient-title mb-4 fade-up" style={{ animationDelay: '0.3s' }}>
            GAME<br />EXHIBITION
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-jp font-black mb-10 text-white fade-up" style={{ animationDelay: '0.5s' }}>
            『ゲーム展示会』<span className="text-neon-pink-fg">のお知らせ</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white-soft leading-relaxed max-w-2xl mx-auto mb-12 fade-up font-jp" style={{ animationDelay: '0.7s' }}>
            スクールのクリエイターたちが作った<br className="sm:hidden" />オリジナルゲーム。<br />
            せっかくなら、<span className="neon-text-cyan font-bold">あそびつくそう。</span>
          </p>

          <div className="flex flex-col items-center gap-6 fade-up" style={{ animationDelay: '0.9s' }}>
            <a href="#apply" className="arcade-btn pulse-glow shake-on-hover">
              <Icon.CirclePlay className="w-4 h-4" />
              PRESS START
            </a>
            <p className="font-pixel text-[0.65rem] text-white-faint blink">
              ▼ SCROLL DOWN ▼
            </p>
          </div>

        </div>
      </section>

      {/* ===== STATUS BAR ===== */}
      <section className="bg-arcade-deep-bg border-y-4 border-neon-purple-fg py-8 px-5 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="font-pixel text-[0.6rem] text-white-faint mb-2">PERIOD</div>
            <div className="font-bungee text-2xl sm:text-3xl neon-text-pink">JUNE</div>
            <div className="font-jp text-xs text-white-soft mt-1">1ヶ月間</div>
          </div>
          <div className="fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="font-pixel text-[0.6rem] text-white-faint mb-2">DEVICES</div>
            <div className="font-bungee text-2xl sm:text-3xl neon-text-cyan">×2</div>
            <div className="font-jp text-xs text-white-soft mt-1">プレイ用PC</div>
          </div>
          <div className="fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="font-pixel text-[0.6rem] text-white-faint mb-2">PLAYERS</div>
            <div className="font-bungee text-2xl sm:text-3xl neon-text-lime">∞</div>
            <div className="font-jp text-xs text-white-soft mt-1">スクール生みんな</div>
          </div>
          <div className="fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="font-pixel text-[0.6rem] text-white-faint mb-2">FEE</div>
            <div className="font-bungee text-2xl sm:text-3xl text-neon-yellow-fg">FREE</div>
            <div className="font-jp text-xs text-white-soft mt-1">レッツプレイ</div>
          </div>
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section className="py-24 sm:py-32 px-5 relative">
        <div className="max-w-3xl mx-auto">

          <div className="mb-16 text-center">
            <p className="font-pixel text-xs text-neon-cyan-fg mb-4">{'// CHAPTER 01'}</p>
            <h2 className="section-title font-jp font-black text-white">
              眠ってる<span className="neon-text-pink">名作たち</span>を、<br />
              起こしにいく。
            </h2>
            <p className="font-jp text-base sm:text-lg text-neon-yellow-fg mt-5">
              「せっかく作ったのにもったいない…！」を解決するイベント
            </p>
          </div>

          <div className="space-y-10 text-base sm:text-lg leading-loose font-jp text-white-soft">

            <div className="fade-up">
              <p>
                スクールには、<span className="neon-text-cyan font-bold">Scratch</span>などでオリジナルゲームを作っているクリエイターがたくさんいる。
              </p>
              <p className="mt-4">
                みんなが作ったゲームは、スクールフェスタなどのイベントで遊べるようにしていたけれど・・・
              </p>
            </div>

            <div className="fade-up">
              <p>
                <span className="text-neon-yellow-fg font-bold">「パソコンの台数が少ない！」</span>、他の企画に参加していて<span className="text-neon-yellow-fg font-bold">プレイできない</span>という課題が・・・。
              </p>
            </div>

            <div className="text-center py-8">
              <p className="font-bungee text-2xl sm:text-4xl gradient-title leading-tight">
              　こんな課題を解決するため、<br />6月に『ゲーム展示会』を開催します！
              </p>
              <p className="mt-6 font-pixel text-xs text-white-faint">パチパチパチ</p>
            </div>

          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 sm:py-32 px-5 relative chapter-bg-purple">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <p className="font-pixel text-xs text-neon-pink-fg mb-4">{'// CHAPTER 02'}</p>
            <h2 className="section-title font-jp font-black text-white">
              <span className="neon-text-cyan">6月</span>、教室がアーケードになる。
            </h2>
            <p className="font-jp text-white-soft mt-6 max-w-xl mx-auto">
              一ヶ月、教室にゲームプレイ用のパソコンを2台ほど置いて、<br className="hidden sm:block" />
              いつでも遊べるようにしておきます。
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">

            <div className="level-card p-7 rounded-sm fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="font-pixel text-[0.65rem] text-neon-cyan-fg">STEP 01</span>
              </div>
              {/* あそぶ イラスト */}
              <div className="mb-5 h-24 flex items-center justify-center">
                <svg viewBox="0 0 120 90" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="12" y="22" width="96" height="52" rx="26" fill="rgba(0,240,255,0.15)" stroke="#00f0ff" strokeWidth="3"/>
                  <rect x="30" y="43" width="7" height="22" rx="2" fill="#00f0ff"/>
                  <rect x="22" y="51" width="23" height="7" rx="2" fill="#00f0ff"/>
                  <circle cx="78" cy="40" r="5" fill="#ff2d95"/>
                  <circle cx="91" cy="50" r="5" fill="#c5ff00"/>
                  <circle cx="78" cy="60" r="5" fill="#ffe600"/>
                  <circle cx="65" cy="50" r="5" fill="#a855f7"/>
                  <ellipse cx="30" cy="70" rx="17" ry="10" fill="rgba(0,240,255,0.12)" stroke="#00f0ff" strokeWidth="2"/>
                  <ellipse cx="90" cy="70" rx="17" ry="10" fill="rgba(0,240,255,0.12)" stroke="#00f0ff" strokeWidth="2"/>
                  <rect x="51" y="49" width="7" height="4" rx="2" fill="rgba(255,255,255,0.4)"/>
                  <rect x="62" y="49" width="7" height="4" rx="2" fill="rgba(255,255,255,0.4)"/>
                </svg>
              </div>
              <h3 className="font-jp font-black text-xl sm:text-2xl mb-3 text-white">あそぶ</h3>
              <p className="font-jp text-sm leading-relaxed text-white-soft">
                ちょっと休憩したいとき、授業の前や後に。<br />
                (※もちろん授業優先！)
              </p>
            </div>

            <div className="level-card p-7 rounded-sm fade-up" style={{ animationDelay: '0.25s' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="font-pixel text-[0.65rem] text-neon-pink-fg">STEP 02</span>
              </div>
              {/* かんそう イラスト */}
              <div className="mb-5 h-24 flex items-center justify-center">
                <svg viewBox="0 0 120 90" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="8" width="82" height="54" rx="12" fill="rgba(255,45,149,0.15)" stroke="#ff2d95" strokeWidth="3"/>
                  <polygon points="30,62 18,80 52,62" fill="rgba(255,45,149,0.15)" stroke="#ff2d95" strokeWidth="2" strokeLinejoin="round"/>
                  <text x="20" y="42" fontSize="18" fill="#ffe600">★</text>
                  <text x="42" y="42" fontSize="18" fill="#ffe600">★</text>
                  <text x="64" y="42" fontSize="18" fill="#ffe600">★</text>
                  <rect x="20" y="50" width="52" height="4" rx="2" fill="rgba(255,255,255,0.25)"/>
                  <circle cx="100" cy="18" r="14" fill="rgba(0,240,255,0.15)" stroke="#00f0ff" strokeWidth="2"/>
                  <text x="94" y="24" fontSize="16" fill="#00f0ff" fontWeight="bold">!</text>
                </svg>
              </div>
              <h3 className="font-jp font-black text-xl sm:text-2xl mb-3 text-white">かんそう</h3>
              <p className="font-jp text-sm leading-relaxed text-white-soft">
                遊んだ人はゲームの感想を、書いたり伝えたりしてみよう。
              </p>
            </div>

            <div className="level-card p-7 rounded-sm fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="font-pixel text-[0.65rem] text-neon-lime-fg">STEP 03</span>
              </div>
              {/* レベルアップ イラスト */}
              <div className="mb-5 h-24 flex items-center justify-center">
                <svg viewBox="0 0 120 90" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="18" y="58" width="16" height="26" rx="3" fill="rgba(197,255,0,0.3)" stroke="#c5ff00" strokeWidth="2"/>
                  <rect x="42" y="40" width="16" height="44" rx="3" fill="rgba(197,255,0,0.5)" stroke="#c5ff00" strokeWidth="2"/>
                  <rect x="66" y="18" width="16" height="66" rx="3" fill="rgba(197,255,0,0.85)" stroke="#c5ff00" strokeWidth="2"/>
                  <path d="M 18 52 Q 50 28 74 14" stroke="#c5ff00" strokeWidth="2.5" strokeDasharray="5,3"/>
                  <polygon points="82,8 88,22 74,18" fill="#c5ff00"/>
                  <text x="86" y="14" fontSize="13" fill="#ffe600">★</text>
                  <text x="96" y="28" fontSize="9" fill="#ff2d95">✦</text>
                  <text x="8" y="22" fontSize="9" fill="#ffe600">✦</text>
                </svg>
              </div>
              <h3 className="font-jp font-black text-xl sm:text-2xl mb-3 text-white">レベルアップ</h3>
              <p className="font-jp text-sm leading-relaxed text-white-soft">
                クリエイターはその感想を見て聞いて、次のゲーム製作に活かす！
              </p>
            </div>

          </div>

          {/* INFINITE LOOP サイクル図 */}
          <div className="mt-14 max-w-sm mx-auto">
            <div className="text-center mb-4">
              <span className="font-pixel text-[0.65rem] sm:text-xs text-neon-yellow-fg tracking-widest">INFINITE LOOP // 創作の好循環</span>
            </div>
            <svg viewBox="0 0 280 220" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 円形ガイド（薄い破線） */}
              <circle cx="140" cy="110" r="75" stroke="rgba(255,230,0,0.2)" strokeWidth="1.5" strokeDasharray="6,4"/>
              {/* STEP1 → STEP2 曲線矢印 */}
              <path d="M 185 58 A 75 75 0 0 1 215 148" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round"/>
              <polygon points="215,148 204,136 220,131" fill="#00f0ff"/>
              {/* STEP2 → STEP3 曲線矢印 */}
              <path d="M 175 175 A 75 75 0 0 1 95 172" stroke="#ff2d95" strokeWidth="2.5" strokeLinecap="round"/>
              <polygon points="95,172 104,161 99,176" fill="#ff2d95"/>
              {/* STEP3 → STEP1 曲線矢印 */}
              <path d="M 68 143 A 75 75 0 0 1 100 55" stroke="#c5ff00" strokeWidth="2.5" strokeLinecap="round"/>
              <polygon points="100,55 98,70 112,62" fill="#c5ff00"/>
              {/* STEP1 ノード */}
              <circle cx="140" cy="38" r="30" fill="rgba(0,240,255,0.15)" stroke="#00f0ff" strokeWidth="2.5"/>
              <text x="140" y="32" textAnchor="middle" fontSize="8" fill="#00f0ff" fontFamily="monospace">STEP</text>
              <text x="140" y="44" textAnchor="middle" fontSize="14" fill="#00f0ff" fontWeight="bold" fontFamily="monospace">01</text>
              <text x="140" y="56" textAnchor="middle" fontSize="9" fill="rgba(245,245,255,0.8)" fontFamily="sans-serif">あそぶ</text>
              {/* STEP2 ノード */}
              <circle cx="218" cy="162" r="30" fill="rgba(255,45,149,0.15)" stroke="#ff2d95" strokeWidth="2.5"/>
              <text x="218" y="156" textAnchor="middle" fontSize="8" fill="#ff2d95" fontFamily="monospace">STEP</text>
              <text x="218" y="168" textAnchor="middle" fontSize="14" fill="#ff2d95" fontWeight="bold" fontFamily="monospace">02</text>
              <text x="218" y="180" textAnchor="middle" fontSize="9" fill="rgba(245,245,255,0.8)" fontFamily="sans-serif">かんそう</text>
              {/* STEP3 ノード */}
              <circle cx="62" cy="162" r="30" fill="rgba(197,255,0,0.12)" stroke="#c5ff00" strokeWidth="2.5"/>
              <text x="62" y="156" textAnchor="middle" fontSize="8" fill="#c5ff00" fontFamily="monospace">STEP</text>
              <text x="62" y="168" textAnchor="middle" fontSize="14" fill="#c5ff00" fontWeight="bold" fontFamily="monospace">03</text>
              <text x="62" y="180" textAnchor="middle" fontSize="7.5" fill="rgba(245,245,255,0.8)" fontFamily="sans-serif">レベルアップ</text>
            </svg>
          </div>

        </div>
      </section>

      {/* ===== PHILOSOPHY ===== */}
      <section className="py-24 sm:py-32 px-5 relative">
        <div className="max-w-4xl mx-auto">

          <div className="mb-16 text-center">
            <p className="font-pixel text-xs text-neon-lime-fg mb-4">{'// CHAPTER 03'}</p>
            <h2 className="section-title font-jp font-black text-white">
              ゲーム＝<span className="line-through decoration-neon-pink decoration-4 text-white-faint">悪いもの</span><br />
              ゲーム＝<span className="neon-text-lime">無限に学べるもの</span>
            </h2>
            <p className="font-jp text-base sm:text-lg text-neon-lime-fg mt-5">
              ゲームを無限の学びに変えていく
            </p>
          </div>

          {/* TODO: 後で /assets/futurecraft/game-image.jpg などに差し替え */}
          <div className="mb-12 relative pixel-border overflow-hidden aspect-[16/9] sm:aspect-[21/9]">
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80"
              alt="ゲームをするイメージ"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-arcade-deep-fg via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 font-pixel text-[0.6rem] text-neon-cyan-fg">{'// IMG_001.png'}</div>
          </div>

          <div className="space-y-8 text-base sm:text-lg leading-loose font-jp text-white-soft">

            <p>
              単に「ゲームをする」と聞くと「<span className="text-white-faint">遊んでるだけやん</span>」と思われがちな世の中。
            </p>
            <p>
              でも、<span className="neon-text-cyan font-bold">ゲームを作ること</span>、遊ぶことでしか得られない
              <span className="neon-text-pink font-bold">学びや感動</span>もきっとある。
            </p>

            <div className="level-card p-6 sm:p-8 rounded-sm note-card">
              <div className="flex items-start gap-4">
                <span className="text-neon-yellow-fg shrink-0 mt-1"><Icon.Lightbulb className="w-6 h-6" /></span>
                <p className="font-jp text-white-soft">
                ゲームが悪いイメージを持たれるのは「やらなきゃいけないことをやらない」ほどやりすぎるからかも？
                </p>
              </div>
            </div>

            <p>
              スクールでは「ゲーム＝悪いもの」じゃなく、
              「<span className="neon-text-lime font-bold">ゲーム＝使い方によって無限に学べるもの</span>」
              というポジティブなものにしていきたい。
            </p>
            <p>
            　ゲームを作るのも遊ぶのも、
              <span className="neon-text-pink font-bold">自分らしさを表現できる一つの場やきっかけ</span>
              になるはず。
            </p>

          </div>

        </div>
      </section>

      {/* ===== CALL OUT ===== */}
      <section className="py-20 sm:py-28 px-5 relative chapter-bg-pink">
        <div className="max-w-3xl mx-auto text-center">

          <div className="flex justify-center gap-3 mb-8">
            <span className="text-neon-yellow-fg float-fast"><Icon.Star className="w-6 h-6" /></span>
            <span className="text-neon-pink-fg float-slow"><Icon.Heart className="w-6 h-6" /></span>
            <span className="text-neon-cyan-fg float-fast"><Icon.Bolt className="w-6 h-6" /></span>
          </div>

          <p className="font-jp text-lg sm:text-xl leading-relaxed text-white mb-6">
            せっかく作ったオリジナルゲームを<br />
            そのまま<span className="text-white font-bold">眠らせておくのはもったいない！</span>
          </p>

          <p className="font-jp text-base sm:text-lg leading-relaxed text-white-soft mb-6">
            「もっとこうしたら<span className="neon-text-lime font-bold">おもろいかも</span>」というアイデアも、<br />
            だれかに遊んでもらって初めて見つかるもの。
          </p>

          <p className="font-jp text-base sm:text-lg leading-relaxed text-white-soft mb-12">
            みんなの意見が<br />
            <span className="neon-text-pink font-bold">大作を生み出すヒント</span>になるかもしれません。
          </p>

          <div className="font-bungee text-2xl sm:text-3xl md:text-4xl gradient-title leading-tight">
            みんなが大好きなゲームで、<br />
            スクールをもっと<br />
            ワクワクする場所に。
          </div>

        </div>
      </section>

      {/* ===== APPLY / CTA ===== */}
      <section id="apply" className="py-24 sm:py-32 px-5 relative">
        <div className="max-w-3xl mx-auto">

          <div className="pixel-border bg-arcade-deep-bg p-8 sm:p-14 text-center relative overflow-hidden">

            <div className="absolute top-4 left-4 text-neon-pink-fg opacity-50">
              <div className="pixel-deco"></div>
            </div>
            <div className="absolute bottom-4 right-4 text-neon-cyan-fg opacity-50">
              <div className="pixel-deco"></div>
            </div>

            <p className="font-pixel text-xs text-neon-cyan-fg mb-6 blink">
              ▶ FINAL STAGE ◀
            </p>

            <h2 className="section-title font-jp font-black mb-4 text-white">
              参加申し込みは<br className="sm:hidden" />こちら
            </h2>

            <p className="font-jp text-white-soft mb-10">
              クリエイターの申し込み、お待ちしてます！
            </p>

            <a href="#" className="arcade-btn pulse-glow">
              <Icon.CirclePlay className="w-4 h-4" />
              APPLY NOW
            </a>

            <p className="mt-8 font-pixel text-[0.6rem] text-white-faint">
              {'// CONTINUE? > YES'}
            </p>

          </div>

        </div>
      </section>

      <style jsx>{`
        /* ===========================================
           SCOPED STYLES — すべて .game-exhibition-page 配下
           =========================================== */
        .game-exhibition-page {
          --neon-pink: #ff2d95;
          --neon-cyan: #00f0ff;
          --neon-purple: #a855f7;
          --neon-lime: #c5ff00;
          --neon-yellow: #ffe600;
          --arcade-bg: #0a0420;
          --arcade-deep: #070118;
          --white-soft: rgba(245, 245, 255, 0.85);
          --white-faint: rgba(245, 245, 255, 0.5);

          font-family: var(--font-zen-kaku-gothic), 'Zen Kaku Gothic New',
            sans-serif;
          background-color: var(--arcade-deep);
          color: #f5f5ff;
          overflow-x: hidden;
          /* カスタムカーソル: ページ内のみ */
          cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><rect x='4' y='4' width='4' height='4' fill='%23ff2d95'/><rect x='8' y='8' width='4' height='4' fill='%2300f0ff'/><rect x='12' y='12' width='4' height='4' fill='%23c5ff00'/></svg>"),
            auto;
        }
        .game-exhibition-page :global(*) {
          box-sizing: border-box;
        }

        /* ===== セクションアクセント背景 ===== */
        :global(.game-exhibition-page .chapter-bg-purple) {
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(76, 29, 149, 0.3),
            transparent
          );
        }
        :global(.game-exhibition-page .chapter-bg-pink) {
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(131, 24, 67, 0.4),
            transparent
          );
        }

        /* ===== Tailwind補助：本ページ専用カラークラス ===== */
        :global(.game-exhibition-page .text-white) { color: #ffffff; }
        :global(.game-exhibition-page .text-white-soft) { color: var(--white-soft); }
        :global(.game-exhibition-page .text-white-faint) { color: var(--white-faint); }
        :global(.game-exhibition-page .text-neon-pink-fg) { color: var(--neon-pink); }
        :global(.game-exhibition-page .text-neon-cyan-fg) { color: var(--neon-cyan); }
        :global(.game-exhibition-page .text-neon-purple-fg) { color: var(--neon-purple); }
        :global(.game-exhibition-page .text-neon-lime-fg) { color: var(--neon-lime); }
        :global(.game-exhibition-page .text-neon-yellow-fg) { color: var(--neon-yellow); }
        :global(.game-exhibition-page .text-arcade-bg-fg) { color: var(--arcade-bg); }
        :global(.game-exhibition-page .text-arcade-deep-fg) { color: var(--arcade-deep); }
        :global(.game-exhibition-page .bg-neon-pink-bg) { background-color: var(--neon-pink); }
        :global(.game-exhibition-page .bg-arcade-deep-bg) { background-color: var(--arcade-deep); }
        :global(.game-exhibition-page .border-neon-pink-fg) { border-color: var(--neon-pink); }
        :global(.game-exhibition-page .border-neon-cyan-fg) { border-color: var(--neon-cyan); }
        :global(.game-exhibition-page .border-neon-purple-fg) { border-color: var(--neon-purple); }
        :global(.game-exhibition-page .border-neon-yellow-fg) { border-color: var(--neon-yellow); }
        :global(.game-exhibition-page .decoration-neon-pink) { text-decoration-color: var(--neon-pink); }

        /* ===== カスタムフォント ===== */
        :global(.game-exhibition-page .font-pixel) {
          font-family: var(--font-press-start), 'Press Start 2P', cursive;
        }
        :global(.game-exhibition-page .font-dot) {
          font-family: var(--font-dot-gothic), 'DotGothic16', monospace;
        }
        :global(.game-exhibition-page .font-jp) {
          font-family: var(--font-zen-kaku-gothic), 'Zen Kaku Gothic New', sans-serif;
        }
        :global(.game-exhibition-page .font-bungee) {
          font-family: var(--font-bungee), 'Bungee', cursive;
        }

        /* ===== Grid background ===== */
        :global(.game-exhibition-page.arcade-grid) {
          background-color: var(--arcade-deep);
          background-image:
            linear-gradient(rgba(168, 85, 247, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.08) 1px, transparent 1px),
            radial-gradient(ellipse at top, rgba(255, 45, 149, 0.15), transparent 60%),
            radial-gradient(ellipse at bottom, rgba(0, 240, 255, 0.12), transparent 60%);
          background-size: 50px 50px, 50px 50px, 100% 100%, 100% 100%;
        }

        /* ===== CRT scanlines (page-scoped overlay) ===== */
        :global(.game-exhibition-page.scanlines) {
          position: relative;
        }
        :global(.game-exhibition-page.scanlines::before) {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.18) 0px,
            rgba(0, 0, 0, 0.18) 1px,
            transparent 1px,
            transparent 3px
          );
          pointer-events: none;
          z-index: 100;
          mix-blend-mode: multiply;
          opacity: 0.5;
        }

        /* ===== Selection (page-scoped) ===== */
        :global(.game-exhibition-page ::selection) {
          background: var(--neon-pink);
          color: var(--arcade-bg);
        }

        /* ===== Typography effects ===== */
        :global(.game-exhibition-page .pixel-shadow) {
          text-shadow: 3px 3px 0 var(--neon-pink), 6px 6px 0 var(--neon-cyan),
            9px 9px 30px rgba(168, 85, 247, 0.6);
        }
        :global(.game-exhibition-page .neon-text-pink) {
          color: var(--neon-pink);
          text-shadow: 0 0 8px rgba(255, 45, 149, 0.9),
            0 0 20px rgba(255, 45, 149, 0.6),
            0 0 40px rgba(255, 45, 149, 0.4);
        }
        :global(.game-exhibition-page .neon-text-cyan) {
          color: var(--neon-cyan);
          text-shadow: 0 0 8px rgba(0, 240, 255, 0.9),
            0 0 20px rgba(0, 240, 255, 0.6),
            0 0 40px rgba(0, 240, 255, 0.4);
        }
        :global(.game-exhibition-page .neon-text-lime) {
          color: var(--neon-lime);
          text-shadow: 0 0 8px rgba(197, 255, 0, 0.9),
            0 0 20px rgba(197, 255, 0, 0.6);
        }

        /* ===== Gradient title ===== */
        :global(.game-exhibition-page .gradient-title) {
          background: linear-gradient(
            90deg,
            var(--neon-pink),
            var(--neon-yellow),
            var(--neon-cyan),
            var(--neon-purple),
            var(--neon-pink)
          );
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gameExhibitGradientShift 6s linear infinite;
        }
        @keyframes gameExhibitGradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        /* ===== Animations ===== */
        @keyframes gameExhibitBlink {
          50% { opacity: 0; }
        }
        :global(.game-exhibition-page .blink) {
          animation: gameExhibitBlink 1s steps(2, start) infinite;
        }

        @keyframes gameExhibitFloatSlow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(8deg); }
        }
        @keyframes gameExhibitFloatFast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-12deg); }
        }
        :global(.game-exhibition-page .float-slow) {
          animation: gameExhibitFloatSlow 6s ease-in-out infinite;
        }
        :global(.game-exhibition-page .float-fast) {
          animation: gameExhibitFloatFast 4s ease-in-out infinite;
        }

        @keyframes gameExhibitPulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 45, 149, 0.6),
              0 0 40px rgba(255, 45, 149, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 45, 149, 1),
              0 0 60px rgba(255, 45, 149, 0.6);
          }
        }
        :global(.game-exhibition-page .pulse-glow) {
          animation: gameExhibitPulseGlow 2s ease-in-out infinite;
        }

        @keyframes gameExhibitShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        :global(.game-exhibition-page .shake-on-hover:hover) {
          animation: gameExhibitShake 0.3s linear infinite;
        }

        @keyframes gameExhibitMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        :global(.game-exhibition-page .marquee) {
          animation: gameExhibitMarquee 30s linear infinite;
        }

        @keyframes gameExhibitFadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        :global(.game-exhibition-page .fade-up) {
          opacity: 1;
          transform: none;
        }
        :global(.game-exhibition-page.js-loaded .fade-up) {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        :global(.game-exhibition-page.js-loaded .fade-up.in) {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes gameExhibitSpinSlow {
          to { transform: rotate(360deg); }
        }
        :global(.game-exhibition-page .spin-slow) {
          animation: gameExhibitSpinSlow 20s linear infinite;
          display: inline-block;
        }

        /* ===== Pixel border / Cards ===== */
        :global(.game-exhibition-page .pixel-border) {
          position: relative;
          border: 3px solid var(--neon-cyan);
          box-shadow:
            0 0 0 3px var(--arcade-deep),
            0 0 0 6px var(--neon-pink),
            0 0 30px rgba(0, 240, 255, 0.4);
          image-rendering: pixelated;
        }

        :global(.game-exhibition-page .level-card) {
          background: linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.15),
            rgba(0, 240, 255, 0.05)
          );
          border: 2px solid rgba(0, 240, 255, 0.4);
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        :global(.game-exhibition-page .level-card::before) {
          content: '';
          position: absolute;
          top: -2px;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--neon-cyan),
            transparent
          );
          transition: left 0.6s ease;
        }
        :global(.game-exhibition-page .level-card:hover) {
          transform: translateY(-6px) rotate(-0.5deg);
          border-color: var(--neon-pink);
          box-shadow: 0 20px 40px rgba(255, 45, 149, 0.3);
        }
        :global(.game-exhibition-page .level-card:hover::before) {
          left: 100%;
        }
        :global(.game-exhibition-page .level-card.note-card) {
          border-color: rgba(255, 230, 0, 0.4);
        }

        /* ===== Arcade button ===== */
        :global(.game-exhibition-page .arcade-btn) {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem 2.5rem;
          background: linear-gradient(180deg, var(--neon-pink), #c0186e);
          color: white;
          font-family: var(--font-press-start), 'Press Start 2P', cursive;
          font-size: 0.9rem;
          text-decoration: none;
          border: 4px solid #fff;
          box-shadow: 0 6px 0 #6b0840, 0 6px 30px rgba(255, 45, 149, 0.6);
          transition: all 0.1s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        :global(.game-exhibition-page .arcade-btn:hover) {
          transform: translateY(2px);
          box-shadow: 0 4px 0 #6b0840, 0 4px 30px rgba(255, 45, 149, 0.9);
        }
        :global(.game-exhibition-page .arcade-btn:active) {
          transform: translateY(6px);
          box-shadow: 0 0 0 #6b0840, 0 0 40px rgba(255, 45, 149, 1);
        }

        /* ===== Pixel decoration ===== */
        :global(.game-exhibition-page .pixel-deco) {
          width: 12px;
          height: 12px;
          background: currentColor;
          box-shadow:
            16px 0 0 currentColor,
            32px 0 0 currentColor,
            0 16px 0 currentColor,
            32px 16px 0 currentColor,
            0 32px 0 currentColor,
            16px 32px 0 currentColor,
            32px 32px 0 currentColor;
        }

        /* ===== Heading sizes ===== */
        :global(.game-exhibition-page .hero-title) {
          font-size: clamp(2.2rem, 9vw, 6rem);
          line-height: 1.05;
        }
        :global(.game-exhibition-page .section-title) {
          font-size: clamp(1.5rem, 5vw, 2.8rem);
        }
      `}</style>
    </div>
  )
}
