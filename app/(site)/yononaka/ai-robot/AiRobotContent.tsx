'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const PHOTO_BASE = '/assets/images/courses/yononaka/airobot'


export default function AiRobotContent() {
  // アコーディオン: 各カード独立して開閉
  const [openPowers, setOpenPowers] = useState<boolean[]>([false, false, false])

  const togglePower = (idx: number) => {
    setOpenPowers((prev) => prev.map((v, i) => (i === idx ? !v : v)))
  }

  useEffect(() => {
    const root = document.querySelector('.ai-robot-lp')
    if (!root) return
    root.classList.add('js-loaded')

    // スクロール連動アニメーション
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    root
      .querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in')
      .forEach((el) => observer.observe(el))

    // ページ内アンカーのスムーススクロール
    const handleAnchorClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement
      const href = target.getAttribute('href')
      if (!href || !href.startsWith('#')) return
      const el = root.querySelector(href)
      if (!el) return
      e.preventDefault()
      const y =
        el.getBoundingClientRect().top + window.pageYOffset - 40
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    const anchors = root.querySelectorAll('a[href^="#"]')
    anchors.forEach((a) => a.addEventListener('click', handleAnchorClick))

    return () => {
      observer.disconnect()
      anchors.forEach((a) => a.removeEventListener('click', handleAnchorClick))
    }
  }, [])

  return (
    <div className="ai-robot-lp">
      {/* ============== HERO ============== */}
      <section className="hero">
        <div className="hero-particles">
          <span className="particle" />
          <span className="particle" />
          <span className="particle" />
          <span className="particle" />
          <span className="particle" />
          <span className="particle" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">🤖 Yononaka 新シリーズ</div>
          <h1>
            AIロボット社会、
            <br />
            <em>僕たちはどう生きるか</em>
          </h1>
          <p className="hero-sub">
            人間の「存在」「役割」「リテラシー」を考える
            <br />
            対話型ワーク ─ 全6回
          </p>
          <div className="hero-cta-group">
            <a href="#apply" className="btn-primary">
              申し込む →
            </a>
            <a href="#about" className="btn-secondary">
              詳しく見る ↓
            </a>
          </div>
          <div className="hero-image-area">
            <Image
              src={`${PHOTO_BASE}/hero.jpg`}
              alt="AIロボット社会ワーク"
              width={960}
              height={540}
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }}
              priority
            />
          </div>
        </div>
      </section>

      {/* ============== WHY NOW ============== */}
      <section className="section-why" id="about">
        <div className="container">
          <div className="section-label fade-up">WHY NOW</div>
          <h2 className="section-title fade-up delay-1">
            なぜ今、
            <br />
            このワークをやるのか
          </h2>
          <p className="section-subtitle fade-up delay-2">
            AIが急速に進化する時代。知った上で動くか、知らずに過ごすか。
            <br />
            その差はこれからどんどん大きくなる。
          </p>

          <div className="why-grid">
            {/* CHANGE: 写真1枚ずつ */}
            <div className="why-card fade-up delay-2">
              <div className="why-card-icon teal">🤖</div>
              <h3>AIとロボットが、ものすごいスピードで進化している</h3>
              <p>
                AIは世界的に急速に進化していて、日本は少子高齢化もあって、AIやロボットと一緒に働くのが
                <span className="highlight">「当たり前」の時代</span>
                がもう来ている。
                <br />
                <br />
                社会に出る前に、「AIに何ができて、人間は何をするのか」を自分の頭で考えておくことが大事になってくる。
              </p>
              <div className="why-photo">
                <Image
                  src={`${PHOTO_BASE}/why-1.jpg`}
                  alt="AIとロボットの進化"
                  width={800}
                  height={600}
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }}
                />
              </div>
            </div>

            <div className="why-card fade-up delay-3">
              <div className="why-card-icon pink">🎓</div>
              <h3>AIはすでに「テストの点数」では人間を超えている</h3>
              <p>
                2026年1月、ChatGPTが大学入学共通テストで
                <span className="highlight">9科目満点</span>
                を取った。2023年には「受験生の平均くらい」だったのが、たった3年で満点に。テストで測れる力では、もうAIが圧倒的に上。
                <br />
                <br />
                <strong className="why-strong">
                  この事実を「知った上で動く」のと「知らずに過ごす」のとでは、これからの選択に大きな差が出る。だから今、一緒に考えよう。
                </strong>
              </p>
              <div className="why-photo">
                <Image
                  src={`${PHOTO_BASE}/why-2.jpg`}
                  alt="AIとテストの点数"
                  width={800}
                  height={600}
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== OVERVIEW ============== */}
      <section className="section-overview" id="overview">
        <div className="container">
          <div className="section-label fade-up">WHAT WE DO</div>
          <h2 className="section-title fade-up delay-1">このワークでやること</h2>

          <div className="overview-highlight-box fade-up delay-2">
            <p>
              <strong>「正解のない問い」</strong>
              に対してみんなで意見を出し合い、視点を広げる対話型ワーク。
              <br />
              通常のYononakaのように、1人1人思ったこと、感じたことを話していきます。
              <br />
              全6回を通して、AIロボット社会に向けた
              <strong>「人間ならではの価値」</strong>を探究していきます。
            </p>
          </div>

          <div className="yononaka-link-row fade-up delay-2">
            <a href="/yononaka" className="yononaka-link-btn">
              Yononakaについてはこちら →
            </a>
          </div>

          <div className="overview-stats fade-up delay-2">
            <div className="stat-card scale-in delay-1">
              <div className="stat-label">期間</div>
              <div className="stat-value">
                月1
                <br />
                ×6回
              </div>
            </div>
            <div className="stat-card scale-in delay-2">
              <div className="stat-label">場所</div>
              <div className="stat-value">オンライン</div>
            </div>
            <div className="stat-card scale-in delay-3">
              <div className="stat-label">時間</div>
              <div className="stat-value">
                1回
                <br />
                75分
              </div>
            </div>
          </div>

          <h3 className="flow-title fade-up">毎回の流れ</h3>

          {/* CHANGE: 縦並び + ②③④だけが×3セット */}
          <div className="flow-vertical fade-up delay-1">
            {/* Step 1 */}
            <div className="flow-step-v">
              <div className="flow-step-num">1</div>
              <div className="flow-step-body">
                <div className="flow-step-title">導入</div>
                <div className="flow-step-desc">テーマを知る</div>
              </div>
            </div>

            <div className="flow-arrow-v">↓</div>

            {/* Loop: Step 2-4 */}
            <div className="flow-loop">
              <div className="flow-loop-label">
                <span className="loop-mark">⟳</span>
                これを ×3セット
              </div>

              <div className="flow-step-v inner">
                <div className="flow-step-num">2</div>
                <div className="flow-step-body">
                  <div className="flow-step-title">個人ワーク</div>
                  <div className="flow-step-desc">1分間考える</div>
                </div>
              </div>

              <div className="flow-arrow-v inner">↓</div>

              <div className="flow-step-v inner">
                <div className="flow-step-num">3</div>
                <div className="flow-step-body">
                  <div className="flow-step-title">グループ共有</div>
                  <div className="flow-step-desc">順番に共有</div>
                </div>
              </div>

              <div className="flow-arrow-v inner">↓</div>

              <div className="flow-step-v inner">
                <div className="flow-step-num">4</div>
                <div className="flow-step-body">
                  <div className="flow-step-title">全体共有</div>
                  <div className="flow-step-desc">視野を広げる</div>
                </div>
              </div>
            </div>

            <div className="flow-arrow-v">↓</div>

            {/* Step 5 */}
            <div className="flow-step-v">
              <div className="flow-step-num">5</div>
              <div className="flow-step-body">
                <div className="flow-step-title">振り返り</div>
                <div className="flow-step-desc">気づきを記録</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== THEMES ============== */}
      <section className="section-themes" id="themes">
        <div className="container">
          <div className="section-label fade-up">6 THEMES</div>
          <h2 className="section-title fade-up delay-1">全6回のテーマ</h2>
          <p className="section-subtitle fade-up delay-2">
            正解はない。大事なのは「自分の意見を持つこと」。
          </p>

          {/* CHANGE: Q → お題例 */}
          <div className="themes-grid">
            <ThemeCard
              num="1"
              numClass="t1"
              title="AIと人間 ― 境界線はどこにある？"
              question="AIロボットでどこまで置き換えられる？"
              delay={1}
            />
            <ThemeCard
              num="2"
              numClass="t2"
              title="心のかたちを探しにいく"
              question="最近あった良くなかった出来事を共有しよう"
              delay={2}
            />
            <ThemeCard
              num="3"
              numClass="t3"
              title="からだ・運動について"
              question="運動が得意な人ってどんな特徴がある？"
              delay={1}
            />
            <ThemeCard
              num="4"
              numClass="t4"
              title="自分ってほんとに1人？"
              question="自分を何かに例えると・・？"
              delay={2}
            />
            <ThemeCard
              num="5"
              numClass="t5"
              title="情報リテラシーについて"
              question="炎上や誹謗中傷が起きるのはどうしてだろう？"
              delay={1}
            />
            <ThemeCard
              num="6"
              numClass="t6"
              title="問いと編集 ― 僕たちはどう生きるか"
              question="AIロボット社会で、僕たちはどう生きる？"
              delay={2}
            />
          </div>
        </div>
      </section>

      {/* ============== FEATURES ============== */}
      <section className="section-features" id="features">
        <div className="container">
          <div className="section-label fade-up">FEATURES</div>
          <h2 className="section-title fade-up delay-1">このワークの特長</h2>

          <div className="feature-cards">
            <div className="feature-card fade-up delay-1">
              <div className="feature-card-icon">💬</div>
              <h3>参加者との対話で気づきや発見を得る学び</h3>
              <p>
                先生の話を聞くだけの授業とは違い、「自分の頭で考えて、意見をつくって、話し合う。」頭をフル回転させるので、集中できます。
                <br />
                <br />
                気づきや発見を得られるかは「その人がどんな意識でこの時間を過ごすか？」によるので、主体的に学ぶことができます。
              </p>
            </div>
            <div className="feature-card fade-up delay-2">
              <div className="feature-card-icon">🧠</div>
              <h3>AIとの比較で自分を知る</h3>
              <p>
                AIにできること、人間にしかできないこと。その違いを考えることで、「人間って何だろう？」が見えてくる。
                <br />
                <br />
                それは、人によって見方考え方が異なるので、ほかの参加者と意見を交わすことで「自分はこう考えるんだ」という自己理解にもつながる。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== 3 POWERS (Accordion) ============== */}
      <section className="section-powers" id="powers">
        <div className="container">
          <div className="section-label fade-up">3 POWERS</div>
          <h2 className="section-title fade-up delay-1">身につく3つのチカラ</h2>
          <p className="section-subtitle fade-up delay-2">
            AIが「正解の提示」や「情報処理」を担う時代に、
            <br />
            人間にしかできない思考と表現の力を育てます。
          </p>

          {/* CHANGE: アコーディオン化 */}
          <div className="powers-grid">
            {[
              {
                cls: 'p1',
                num: '01',
                name: 'メタ認知',
                sub: '― 自分と時代を知る力 ―',
                desc: '変化が激しくて正解がない時代。まず「自分自身を知ること」が出発点。自己理解、仕事理解、時代の理解。この3つを俯瞰して、自分の立ち位置をつかむ力。',
              },
              {
                cls: 'p2',
                num: '02',
                name: '意見力',
                sub: '― 自分の軸で語る力 ―',
                desc: '正解がひとつではない問題に対して、自分なりの考えを持ち、それを言葉にして伝えていく力。「自分はこう思う」という判断軸を持つということ。',
              },
              {
                cls: 'p3',
                num: '03',
                name: '情報編集力',
                sub: '― 正解のない問いに挑む力 ―',
                desc: '情報があふれる時代に、必要な情報を自分ごととして取り入れ、知識・経験・技術を組み合わせて自分なりの表現にする。人生を切り拓いていく力。',
              },
            ].map((p, i) => (
              <div
                key={p.cls}
                role="button"
                tabIndex={0}
                className={`power-card ${p.cls} fade-up delay-${i + 1}`}
                onClick={() => togglePower(i)}
                onKeyDown={(e) => e.key === 'Enter' && togglePower(i)}
                aria-expanded={openPowers[i]}
              >
                <div className="power-num">{p.num}</div>
                <div className="power-head">
                  <div className="power-head-text">
                    <div className="power-name">{p.name}</div>
                    <div className="power-sub">{p.sub}</div>
                  </div>
                  <div
                    className="power-toggle"
                    style={{
                      background: openPowers[i]
                        ? p.cls === 'p2' ? 'var(--orange)' : p.cls === 'p3' ? 'var(--purple)' : 'var(--teal)'
                        : 'var(--cream)',
                      color: openPowers[i] ? 'white' : 'var(--teal)',
                      transform: openPowers[i] ? 'rotate(180deg)' : 'none',
                    }}
                  >
                    {openPowers[i] ? '−' : '+'}
                  </div>
                </div>
                <div
                  className="power-body"
                  style={{
                    maxHeight: openPowers[i] ? '400px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease',
                  }}
                >
                  <div className="power-desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== PRICING ============== */}
      <section className="section-pricing" id="pricing">
        <div className="container">
          <div className="section-label fade-up">PRICING</div>
          <h2 className="section-title fade-up delay-1">料金プラン</h2>
          <p className="section-subtitle fade-up delay-2">
            まず無料で体験してから決めてOK。
          </p>

          <div className="pricing-grid">
            <div className="price-card free-trial fade-up delay-1">
              <div className="free-trial-badge">🎁 初回限定</div>
              <div className="price-plan">初回無料体験</div>
              <div className="price-amount">
                <span className="price-free">無料</span>
              </div>
              <div className="price-detail">はじめての方はまず体験してみよう</div>
              <ul className="price-features">
                <li>75分のワーク参加</li>
                <li>ワークシート付き</li>
                <li>雰囲気を気軽に確かめられる</li>
              </ul>
            </div>
            <div className="price-card fade-up delay-2">
              <div className="price-plan">1回参加</div>
              <div className="price-amount">
                ¥2,200(税込)<span>/回</span>
              </div>
              <div className="price-detail">スポットで参加したい方に</div>
              <ul className="price-features">
                <li>75分のワーク参加</li>
                <li>ワークシート付き</li>
                <li>振り返りフィードバック</li>
              </ul>
            </div>
            <div className="price-card recommended fade-up delay-3">
              <div className="price-plan">6回パック</div>
              <div className="price-amount">
                ¥11,000(税込)<span>/6回</span>
              </div>
              <div className="price-detail">全テーマをじっくり探究</div>
              <ul className="price-features">
                <li>全6回のワーク参加</li>
                <li>ワークシート付き</li>
                <li>振り返りフィードバック</li>
                <li>修了レポート</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============== CTA ============== */}
      <section className="section-cta" id="apply">
        <div className="container">
          <div className="cta-content fade-up">
            <div className="cta-emoji">⭐</div>
            <h2>
              AIにはできないことがある。
              <br />
              それは、「問いを立てること」。
            </h2>
            <p>
              「これってなんでだろう？」「自分はどう思う？」
              <br />
              そういう問いを持てるのは、人間だけ。
              <br />
              <br />
              このワークで、AI時代を自分の力で生き抜くための
              <br />
              「考え方の土台」を一緒につくっていこう。
            </p>
            <a
              href="https://forms.gle/xCm8pQrmqJGjtHKd9"
              className="cta-btn-big"
              target="_blank"
              rel="noopener noreferrer"
            >
              申し込む
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ===========================================
           SCOPED STYLES — すべて .ai-robot-lp 配下
           =========================================== */
        .ai-robot-lp {
          --teal: #00a896;
          --teal-dark: #028090;
          --teal-deeper: #026670;
          --teal-light: #e0f7f4;
          --teal-glow: #00bfa6;
          --cream: #fff8f0;
          --cream-dark: #f5ede3;
          --pink: #f4a5ae;
          --pink-light: #fff0f3;
          --pink-accent: #e8788a;
          --navy: #1a2332;
          --navy-light: #2d3e50;
          --text: #2d3748;
          --text-light: #718096;
          --orange: #f6ad55;
          --purple: #9f7aea;

          font-family: 'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif;
          color: var(--text);
          background: var(--cream);
          line-height: 1.8;
          overflow-x: hidden;
        }
        .ai-robot-lp :global(*) {
          box-sizing: border-box;
        }
        .ai-robot-lp :global(p),
        .ai-robot-lp :global(h1),
        .ai-robot-lp :global(h2),
        .ai-robot-lp :global(h3),
        .ai-robot-lp :global(ul) {
          margin: 0;
          padding: 0;
        }
        .ai-robot-lp :global(ul) {
          list-style: none;
        }

        /* ===== UTILITY ===== */
        .container {
          max-width: 100%;
          margin: 0 auto;
          padding: 0 20px;
        }

        :global(.ai-robot-lp .section-label) {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--teal);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        :global(.ai-robot-lp .section-label::before) {
          content: '';
          display: block;
          width: 24px;
          height: 2px;
          background: var(--teal);
        }
        :global(.ai-robot-lp .section-title) {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-size: clamp(1.4rem, 4vw, 1.9rem);
          font-weight: 900;
          line-height: 1.4;
          margin-bottom: 16px;
        }
        :global(.ai-robot-lp .section-subtitle) {
          font-size: 0.95rem;
          color: var(--text-light);
          line-height: 1.8;
          max-width: 600px;
        }

        /* ===== Animations ===== */
        :global(.ai-robot-lp .fade-up),
        :global(.ai-robot-lp .fade-left),
        :global(.ai-robot-lp .fade-right),
        :global(.ai-robot-lp .scale-in) {
          opacity: 1;
          transform: none;
        }
        :global(.ai-robot-lp.js-loaded .fade-up) {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        :global(.ai-robot-lp.js-loaded .fade-left) {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        :global(.ai-robot-lp.js-loaded .fade-right) {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        :global(.ai-robot-lp.js-loaded .scale-in) {
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        :global(.ai-robot-lp.js-loaded .fade-up.visible),
        :global(.ai-robot-lp.js-loaded .fade-left.visible),
        :global(.ai-robot-lp.js-loaded .fade-right.visible) {
          opacity: 1;
          transform: translate(0, 0);
        }
        :global(.ai-robot-lp.js-loaded .scale-in.visible) {
          opacity: 1;
          transform: scale(1);
        }
        :global(.ai-robot-lp .delay-1) {
          transition-delay: 0.1s;
        }
        :global(.ai-robot-lp .delay-2) {
          transition-delay: 0.2s;
        }
        :global(.ai-robot-lp .delay-3) {
          transition-delay: 0.3s;
        }
        :global(.ai-robot-lp .delay-4) {
          transition-delay: 0.4s;
        }
        :global(.ai-robot-lp .delay-5) {
          transition-delay: 0.5s;
        }

        /* ===== HERO ===== */
        .hero {
          position: relative;
          display: flex;
          align-items: center;
          background: linear-gradient(
            135deg,
            var(--navy) 0%,
            var(--navy-light) 50%,
            var(--teal-deeper) 100%
          );
          overflow: hidden;
          padding: 48px 0 36px;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -30%;
          width: 400px;
          height: 400px;
          background: radial-gradient(
            circle,
            rgba(0, 191, 166, 0.15) 0%,
            transparent 70%
          );
          border-radius: 50%;
          animation: arHeroPulse 8s ease-in-out infinite;
        }
        .hero::after {
          content: '';
          position: absolute;
          bottom: -20%;
          left: -20%;
          width: 300px;
          height: 300px;
          background: radial-gradient(
            circle,
            rgba(244, 165, 174, 0.08) 0%,
            transparent 70%
          );
          border-radius: 50%;
          animation: arHeroPulse 10s ease-in-out infinite reverse;
        }
        @keyframes arHeroPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }
        .hero-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--teal-glow);
          border-radius: 50%;
          opacity: 0;
          animation: arFloat 6s ease-in-out infinite;
        }
        .particle:nth-child(1) {
          left: 10%;
          top: 20%;
          animation-delay: 0s;
        }
        .particle:nth-child(2) {
          left: 30%;
          top: 60%;
          animation-delay: 1.5s;
        }
        .particle:nth-child(3) {
          left: 70%;
          top: 30%;
          animation-delay: 3s;
        }
        .particle:nth-child(4) {
          left: 85%;
          top: 70%;
          animation-delay: 0.8s;
        }
        .particle:nth-child(5) {
          left: 50%;
          top: 85%;
          animation-delay: 2.2s;
        }
        .particle:nth-child(6) {
          left: 20%;
          top: 75%;
          animation-delay: 4s;
        }
        @keyframes arFloat {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0);
          }
          20% {
            opacity: 0.8;
            transform: translateY(0) scale(1);
          }
          80% {
            opacity: 0.8;
            transform: translateY(-40px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(0);
          }
        }
        .hero-content {
          position: relative;
          z-index: 2;
          padding: 24px 20px;
          max-width: 100%;
          margin: 0 auto;
          width: 100%;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 191, 166, 0.15);
          border: 1px solid rgba(0, 191, 166, 0.3);
          border-radius: 50px;
          padding: 6px 16px;
          font-size: 0.8rem;
          color: var(--teal-glow);
          font-weight: 700;
          margin-bottom: 24px;
        }
        .hero-badge::before {
          content: '';
          width: 8px;
          height: 8px;
          background: var(--teal-glow);
          border-radius: 50%;
          animation: arBlink 2s infinite;
        }
        @keyframes arBlink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
        .hero h1 {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-size: clamp(1.6rem, 5.5vw, 2.2rem);
          font-weight: 900;
          color: white;
          line-height: 1.3;
          margin-bottom: 20px;
        }
        .hero h1 em {
          font-style: normal;
          background: linear-gradient(
            135deg,
            var(--teal-glow),
            var(--pink)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: clamp(0.9rem, 2.5vw, 1.1rem);
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 32px;
          max-width: 500px;
        }
        .hero-cta-group {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--teal);
          color: white;
          padding: 14px 32px;
          border-radius: 50px;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.3s;
        }
        .btn-primary:hover {
          background: var(--teal-dark);
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0, 168, 150, 0.4);
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: rgba(255, 255, 255, 0.8);
          padding: 14px 32px;
          border-radius: 50px;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s;
        }
        .btn-secondary:hover {
          border-color: var(--teal-glow);
          color: var(--teal-glow);
          transform: translateY(-2px);
        }
        .hero-image-area {
          margin-top: 40px;
          border-radius: 16px;
          overflow: hidden;
        }

        /* ===== WHY NOW ===== */
        .section-why {
          padding: 56px 0 48px;
          background: white;
          position: relative;
        }
        .section-why::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(
            90deg,
            var(--teal),
            var(--pink),
            var(--orange)
          );
        }
        .why-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          margin-top: 48px;
        }
        .why-card {
          background: var(--cream);
          border-radius: 20px;
          padding: 36px;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .why-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
        }
        .why-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: var(--teal);
          border-radius: 0 4px 4px 0;
        }
        .why-card-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 16px;
        }
        .why-card-icon.teal {
          background: var(--teal-light);
        }
        .why-card-icon.pink {
          background: var(--pink-light);
        }
        .why-card h3 {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-size: 1.25rem;
          font-weight: 900;
          margin-bottom: 12px;
          color: var(--navy);
        }
        .why-card p {
          font-size: 0.9rem;
          color: var(--text-light);
          line-height: 1.9;
        }
        .why-card .highlight {
          display: inline-block;
          background: linear-gradient(
            transparent 60%,
            rgba(0, 168, 150, 0.15) 60%
          );
          font-weight: 700;
          color: var(--teal-dark);
        }
        .why-strong {
          color: var(--teal-dark);
        }
        /* CHANGE: 写真1枚ずつ */
        .why-photo {
          margin-top: 20px;
        }

        /* ===== OVERVIEW ===== */
        .section-overview {
          padding: 48px 0;
          background: var(--cream);
        }
        .overview-highlight-box {
          background: linear-gradient(135deg, var(--teal-dark), var(--teal));
          border-radius: 20px;
          padding: 36px;
          color: white;
          margin-bottom: 48px;
          position: relative;
          overflow: hidden;
        }
        .overview-highlight-box::after {
          content: '';
          position: absolute;
          right: -30px;
          bottom: -30px;
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
        }
        .overview-highlight-box p {
          font-size: 1rem;
          line-height: 2;
          position: relative;
          z-index: 1;
        }
        .overview-highlight-box strong {
          color: var(--orange);
        }
        .yononaka-link-row {
          margin-bottom: 24px;
        }
        .yononaka-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: white;
          color: var(--teal-dark);
          border: 2px solid var(--teal);
          border-radius: 50px;
          padding: 10px 24px;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.3s;
        }
        .yononaka-link-btn:hover {
          background: var(--teal);
          color: white;
          transform: translateY(-2px);
        }

        .overview-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 48px;
        }
        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 24px 16px;
          text-align: center;
          border-top: 3px solid var(--teal);
          transition: transform 0.3s;
        }
        .stat-card:hover {
          transform: translateY(-4px);
        }
        .stat-label {
          font-size: 0.75rem;
          color: var(--text-light);
          margin-bottom: 8px;
        }
        .stat-value {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 900;
          font-size: clamp(1.3rem, 4vw, 1.8rem);
          color: var(--teal);
          line-height: 1.2;
        }

        /* ===== FLOW (CHANGED: 縦並び + ②③④ループ) ===== */
        .flow-title {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-size: 1.2rem;
          font-weight: 900;
          margin-bottom: 24px;
          color: var(--navy);
        }
        .flow-vertical {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          max-width: 500px;
          margin: 0 auto;
        }
        .flow-step-v {
          width: 100%;
          background: white;
          border-radius: 16px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: transform 0.3s;
        }
        .flow-step-v:hover {
          transform: translateX(4px);
        }
        .flow-step-v.inner {
          background: white;
          border: 1px solid rgba(0, 168, 150, 0.15);
        }
        .flow-step-num {
          flex: 0 0 auto;
          width: 36px;
          height: 36px;
          background: var(--teal);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 900;
          font-size: 1rem;
        }
        .flow-step-body {
          flex: 1;
          min-width: 0;
        }
        .flow-step-title {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--navy);
          margin-bottom: 2px;
        }
        .flow-step-desc {
          font-size: 0.8rem;
          color: var(--text-light);
        }
        .flow-arrow-v {
          color: var(--teal);
          font-size: 1.5rem;
          font-weight: 900;
          padding: 8px 0;
          line-height: 1;
        }
        .flow-arrow-v.inner {
          font-size: 1.2rem;
          color: var(--pink-accent);
        }
        .flow-loop {
          width: 100%;
          background: var(--pink-light);
          border: 2px dashed var(--pink-accent);
          border-radius: 20px;
          padding: 18px 16px 22px;
          position: relative;
          margin: 4px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .flow-loop-label {
          background: var(--pink-accent);
          color: white;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 900;
          font-size: 0.85rem;
          padding: 6px 16px;
          border-radius: 50px;
          margin-top: -32px;
          margin-bottom: 16px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 12px rgba(232, 120, 138, 0.25);
        }
        .loop-mark {
          font-size: 1rem;
          animation: arLoopSpin 4s linear infinite;
          display: inline-block;
        }
        @keyframes arLoopSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* ===== THEMES ===== */
        .section-themes {
          padding: 48px 0;
          background: white;
        }
        .themes-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-top: 40px;
        }

        /* ===== FEATURES ===== */
        .section-features {
          padding: 48px 0;
          background: linear-gradient(
            135deg,
            var(--navy) 0%,
            var(--teal-deeper) 100%
          );
          color: white;
          position: relative;
          overflow: hidden;
        }
        .section-features::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 400px;
          height: 400px;
          background: radial-gradient(
            circle,
            rgba(0, 191, 166, 0.1) 0%,
            transparent 70%
          );
          border-radius: 50%;
        }
        :global(.ai-robot-lp .section-features .section-label) {
          color: var(--teal-glow);
        }
        :global(.ai-robot-lp .section-features .section-label::before) {
          background: var(--teal-glow);
        }
        :global(.ai-robot-lp .section-features .section-title) {
          color: white;
        }
        :global(.ai-robot-lp .section-features .section-subtitle) {
          color: rgba(255, 255, 255, 0.6);
        }
        .feature-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-top: 48px;
        }
        .feature-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 36px;
          backdrop-filter: blur(10px);
          transition: all 0.3s;
        }
        .feature-card:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-4px);
          border-color: rgba(0, 191, 166, 0.3);
        }
        .feature-card-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: rgba(0, 191, 166, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 20px;
        }
        .feature-card h3 {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-size: 1.2rem;
          font-weight: 900;
          margin-bottom: 12px;
        }
        .feature-card p {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.9;
        }
        /* ===== 3 POWERS (CHANGED: アコーディオン) ===== */
        .section-powers {
          padding: 48px 0;
          background: var(--cream);
        }
        .powers-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-top: 32px;
        }
        .power-card {
          background: white;
          border: none;
          border-radius: 20px;
          padding: 0;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s;
          text-align: left;
          width: 100%;
          font: inherit;
          color: inherit;
          cursor: pointer;
        }
        .power-card:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
        }
        .power-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          z-index: 1;
        }
        .power-card.p1::before {
          background: var(--teal);
        }
        .power-card.p2::before {
          background: var(--orange);
        }
        .power-card.p3::before {
          background: var(--purple);
        }
        .power-num {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 900;
          font-size: 2.5rem;
          opacity: 0.1;
          position: absolute;
          top: 14px;
          right: 22px;
          line-height: 1;
        }
        .power-head {
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .power-head-text {
          flex: 1;
          min-width: 0;
        }
        .power-name {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-size: 1.3rem;
          font-weight: 900;
          color: var(--navy);
          margin-bottom: 4px;
        }
        .power-sub {
          font-size: 0.8rem;
          color: var(--text-light);
          font-style: italic;
        }
        .power-toggle {
          flex: 0 0 auto;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--cream);
          color: var(--teal);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 900;
          font-size: 1.3rem;
          line-height: 1;
          transition: background 0.2s, transform 0.3s;
        }
        .power-card.open .power-toggle {
          background: var(--teal);
          color: white;
          transform: rotate(180deg);
        }
        .power-card.p2.open .power-toggle {
          background: var(--orange);
        }
        .power-card.p3.open .power-toggle {
          background: var(--purple);
        }
        .power-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }
        .power-card.open .power-body {
          max-height: 400px;
        }
        .power-desc {
          padding: 0 28px 24px;
          font-size: 0.9rem;
          color: var(--text-light);
          line-height: 1.9;
          border-top: 1px dashed rgba(0, 0, 0, 0.06);
          padding-top: 18px;
          margin-top: 4px;
        }

        /* ===== PRICING ===== */
        .section-pricing {
          padding: 48px 0;
          background: white;
        }
        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-top: 32px;
        }
        .price-card {
          background: var(--cream);
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
          border: 2px solid transparent;
        }
        .price-card.free-trial {
          border-color: var(--orange);
          background: #fff8ee;
        }
        .free-trial-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: var(--orange);
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 50px;
          margin-bottom: 8px;
          font-family: 'Zen Maru Gothic', sans-serif;
        }
        .price-free {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 900;
          font-size: 2rem;
          color: var(--orange);
        }
        .price-cta.free {
          background: var(--orange);
          color: white;
        }
        .price-cta.free:hover {
          background: #e09440;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(246, 173, 85, 0.4);
        }
        .price-card:hover {
          transform: translateY(-4px);
        }
        .price-card.recommended {
          border-color: var(--teal);
          background: var(--teal-light);
        }
        .price-card.recommended::after {
          content: 'おすすめ';
          position: absolute;
          top: 16px;
          right: -28px;
          background: var(--teal);
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 4px 32px;
          transform: rotate(45deg);
        }
        .price-plan {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-size: 1rem;
          font-weight: 900;
          color: var(--navy);
          margin-bottom: 8px;
        }
        .price-amount {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 900;
          font-size: 2rem;
          color: var(--teal);
          margin-bottom: 4px;
        }
        .price-amount span {
          font-size: 0.9rem;
          color: var(--text-light);
          font-weight: 700;
        }
        .price-detail {
          font-size: 0.8rem;
          color: var(--text-light);
          margin-bottom: 20px;
          line-height: 1.6;
        }
        .price-features {
          text-align: left;
        }
        .price-features li {
          padding: 8px 0;
          font-size: 0.85rem;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        .price-features li::before {
          content: '✓';
          color: var(--teal);
          font-weight: 900;
          font-size: 0.8rem;
        }
        .price-cta {
          display: block;
          width: 100%;
          margin-top: 20px;
          padding: 12px;
          border-radius: 50px;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          text-align: center;
          text-decoration: none;
          transition: all 0.3s;
        }
        .price-cta.primary {
          background: var(--teal);
          color: white;
        }
        .price-cta.primary:hover {
          background: var(--teal-dark);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 168, 150, 0.3);
        }
        .price-cta.outline {
          background: transparent;
          color: var(--teal);
          border: 2px solid var(--teal);
        }
        .price-cta.outline:hover {
          background: var(--teal);
          color: white;
        }

        /* ===== CTA ===== */
        .section-cta {
          padding: 48px 0;
          background: linear-gradient(
            135deg,
            var(--teal-dark) 0%,
            var(--teal) 50%,
            var(--teal-deeper) 100%
          );
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }
        .cta-content {
          position: relative;
          z-index: 1;
        }
        .cta-emoji {
          font-size: 3rem;
          margin-bottom: 20px;
        }
        .section-cta h2 {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-size: clamp(1.5rem, 5vw, 2.2rem);
          font-weight: 900;
          margin-bottom: 16px;
          line-height: 1.4;
        }
        .section-cta p {
          font-size: 1rem;
          opacity: 0.85;
          max-width: 500px;
          margin: 0 auto 32px;
          line-height: 1.8;
        }
        .cta-btn-big {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: white;
          color: var(--teal-dark);
          padding: 18px 48px;
          border-radius: 60px;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 900;
          font-size: 1.1rem;
          text-decoration: none;
          transition: all 0.3s;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }
        .cta-btn-big:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}

/** お題例カード — Q を「お題例」に置き換え */
function ThemeCard({
  num,
  numClass,
  title,
  question,
  delay,
}: {
  num: string
  numClass: string
  title: string
  question: string
  delay: number
}) {
  return (
    <div className={`theme-card fade-up delay-${delay}`}>
      <div className={`theme-num ${numClass}`}>{num}</div>
      <div className="theme-content">
        <div className="theme-title">{title}</div>
        <div className="theme-question">
          <span className="theme-q-badge">お題例</span>
          <span className="theme-q-text">{question}</span>
        </div>
      </div>
      <style jsx>{`
        .theme-card {
          background: var(--cream);
          border-radius: 20px;
          padding: 28px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .theme-card:hover {
          transform: translateX(8px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
        }
        .theme-num {
          flex: 0 0 auto;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 900;
          font-size: 1.2rem;
          color: white;
        }
        .theme-num.t1,
        .theme-num.t6 {
          background: var(--teal);
        }
        .theme-num.t2 {
          background: var(--pink-accent);
        }
        .theme-num.t3 {
          background: var(--orange);
        }
        .theme-num.t4 {
          background: var(--purple);
        }
        .theme-num.t5 {
          background: var(--navy);
        }
        .theme-content {
          flex: 1;
          min-width: 0;
        }
        .theme-title {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-size: 1.05rem;
          font-weight: 900;
          color: var(--navy);
          margin-bottom: 10px;
          line-height: 1.5;
        }
        /* CHANGE: Q バッジ → 「お題例」 */
        .theme-question {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: rgba(0, 168, 150, 0.08);
          border-radius: 12px;
          padding: 10px 12px;
          font-size: 0.85rem;
          color: var(--teal-dark);
          font-weight: 500;
          line-height: 1.6;
        }
        .theme-q-badge {
          flex: 0 0 auto;
          background: var(--teal);
          color: white;
          border-radius: 8px;
          padding: 3px 8px;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.05em;
          line-height: 1.4;
          white-space: nowrap;
        }
        .theme-q-text {
          flex: 1;
          padding-top: 1px;
        }
      `}</style>
    </div>
  )
}
