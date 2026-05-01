'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ReportContent() {
  useEffect(() => {
    const root = document.querySelector('.yononaka-game-report')
    if (!root) return
    root.classList.add('js-loaded')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    root.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    const yearEl = document.getElementById('year-counter')
    let yearObserver: IntersectionObserver | null = null
    if (yearEl) {
      yearObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              let current = 1900
              const target = 1958
              const step = () => {
                if (current < target) {
                  current += 2
                  if (current > target) current = target
                  yearEl.textContent = String(current)
                  requestAnimationFrame(step)
                }
              }
              step()
              yearObserver?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.5 }
      )
      yearObserver.observe(yearEl)
    }

    return () => {
      observer.disconnect()
      yearObserver?.disconnect()
    }
  }, [])

  return (
    <div className="yononaka-game-report">
      <div className="wrap">
        {/* ============== HERO ============== */}
        <section className="hero">
          <span className="hero-deco s1">🎮</span>
          <span className="hero-deco s2">✨</span>
          <span className="hero-deco s3">💭</span>

          <span className="hero-tag">
            <span className="dot" />
            Yononaka レポート
          </span>

          <h1>
            ゲームって、
            <br />
            なんで <span className="accent-y">おもしろい</span>
            <span className="accent-c">？</span>
          </h1>

          <div className="hero-meta">
            <span>📅 4/26(日)開催</span>
            <span>🏠 キープオンラボ</span>
            <span>👥 小学生〜大人</span>
          </div>

          <p className="hero-lead">
            正解が <strong>ない</strong> 場所で、
            <br />
            自分が思ったこと・感じたことを、
            <br />
            互いに話し、気づきや発見を得た90分。
          </p>
        </section>

        {/* ============== SECTION 1 ============== */}
        <section className="section reveal">
          <span className="section-num">01｜OPENING</span>
          <h2>
            まずはみんなで <span className="pop">スマートボール</span>
          </h2>
          <p>
            新しくなったキープオンラボ。
            <br />
            その日のはじまりは、いきなり対話じゃなくて、ゲーム。
          </p>
          <p className="muted">
            笑い声で教室がいっぱいになって、空気がほぐれたところからスタートしました。
          </p>
        </section>

        {/* 写真① */}
        <div className="photo reveal">
          <Image
            src="/assets/images/courses/yononaka/jugyo-repo/photo-01.jpg"
            alt="スマートボールで遊んでいる様子"
            width={480}
            height={360}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* ============== SECTION 2 ============== */}
        <section className="section reveal">
          <span className="section-num">02｜ICE BREAK</span>
          <h2>
            「好きなゲームは？」
            <br />
            みんなで一斉に、声出し。
          </h2>
          <p>
            Yononakaワークの最初は、いつもこのスタイル。
            <br />
            ひとりずつじゃなくて、せーので一斉に。
            <br />
          </p>
        </section>

        <div className="tags reveal">
          <span className="tag">ロブロックス</span>
          <span className="tag">スマブラ</span>
          <span className="tag">マリオカート</span>
          <span className="tag">フォートナイト</span>
          <span className="tag">マイクラ</span>
          <span className="tag">ポケモン</span>
          <span className="tag">スプラ</span>
        </div>

        {/* ============== Yononakaって？ ============== */}
        <div className="explainer reveal">
          <div className="explainer-icon">💬</div>
          <h3>そもそも、Yononakaって？</h3>
          <div className="rule">
            ルールは、ひとつだけ。
            <br />
            &quot;人を傷つけないことなら、何を言ってもOK&quot;
          </div>
          <p>
            正解がひとつでないお題に対して、自分が思ったことを話す場所。
            <br />
            「ちょっと違うかも・・」も「なんとなく、こう思う」も、大歓迎。
          </p>
        </div>

        {/* 写真③ */}
        <div className="photo reveal">
          <Image
            src="/assets/images/courses/yononaka/jugyo-repo/photo-03.jpg"
            alt="Yononakaのルール説明シーン"
            width={480}
            height={360}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* ============== お題① ============== */}
        <div className="odai reveal">
          <span className="odai-ribbon">お 題 ①</span>
          <h3>
            みんなに知られてない、
            <br />
            <span className="underline">実はおもしろいゲーム。</span>
          </h3>
          <p>
            &quot;ゲーム&quot; って聞くと、つい画面のなかを思い浮かべる。
            <br />
            でも——カードゲーム、ボードゲーム、放課後の遊びだって、ゲームといえますよね。
            <br />
            範囲をぐっと広げて、自分のとっておきを共有しあいました。
          </p>
        </div>

        {/* 写真④ */}
        <div className="photo reveal">
          <Image
            src="/assets/images/courses/yononaka/jugyo-repo/photo-04.jpg"
            alt="みんなが知らないけど面白いゲームの共有の様子"
            width={480}
            height={360}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* ============== トリビア ============== */}
        <section className="section reveal">
          <span className="section-num">03｜TRIVIA</span>
          <h2>
            ところで、
            <br />
            世界で <span className="pop">最初の</span> コンピューターゲームって？
          </h2>
        </section>

        <div className="trivia reveal">
          <div className="trivia-bg">💡</div>
          <div className="trivia-label">— THE FIRST VIDEO GAME —</div>
          <h3>&quot;Tennis for Two&quot;</h3>
          <span className="year" id="year-counter">
            1958
          </span>
          <span className="year-label">年に、生まれました。</span>
          <p>
            作ったのは、大学とかの研究機関。
            <br />
            &quot;コンピューターって、人を楽しませることもできるんじゃない？&quot;
            そんな実験から、ぜんぶは始まった。
          </p>
          <a
            href="https://www.youtube.com/watch?v=6PG2mdU_i8k"
            target="_blank"
            rel="noopener noreferrer"
            className="yt-link"
          >
            動画で見てみる
          </a>
        </div>

        {/* タイムライン */}
        <div className="timeline reveal">
          <div className="timeline-title">
            そこから、ゲームの &quot;遊び方&quot; は変わり続けてる
          </div>
          <ul className="timeline-list">
            <li>
              <div className="era">研究機関のなかで</div>
              <div className="desc">&quot;楽しませる&quot; が実験だった頃</div>
            </li>
            <li>
              <div className="era">ゲームセンター → 家庭用ゲーム機</div>
              <div className="desc">街と、お家が、遊び場に</div>
            </li>
            <li>
              <div className="era">インターネット接続</div>
              <div className="desc">遠くの誰かと、いっしょに遊べる</div>
            </li>
            <li>
              <div className="era">小型化・スマホ</div>
              <div className="desc">ポケットの中に、ゲーム機がある</div>
            </li>
            <li>
              <div className="era">AR / VR</div>
              <div className="desc">現実と、ゲームの境目がとけていく</div>
            </li>
          </ul>
        </div>

        {/* 写真⑤ */}
        <div className="photo reveal">
          <Image
            src="/assets/images/courses/yononaka/jugyo-repo/photo-05.jpg"
            alt="ゲームの歴史・進化の話をしている場面"
            width={480}
            height={360}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* ============== 核心の問い ============== */}
        <div className="question reveal">
          <div className="qmark">?</div>
          <p className="lead">
            でも、変わらないのは、ひとつ。
            <br />
            <span className="hl">ゲームは、人を夢中にさせる。</span>
          </p>
          <p className="subq">じゃあ、なんで夢中になるの？</p>
          <p className="subq">
            &quot;もっとやりたい！&quot; って、どんな時？
          </p>
          <p className="subq">夢中にさせる &quot;仕掛け&quot; って、何？</p>
        </div>

        {/* ============== お題② ============== */}
        <div className="odai reveal">
          <span className="odai-ribbon">お 題 ②</span>
          <h3>
            ゲームの仕掛けを使って、
            <br />
            <span className="underline">身近なモノを楽しくしよう。</span>
          </h3>
          <p>
            &quot;夢中にさせる&quot; の正体がちょっと見えてきたら、
            <br />
            今度はそれを、自分の生活のほうに引きこんでみる。
            <br />
            頭を切り替えて、身のまわりをぐるっと見渡してみると——
          </p>
        </div>

        <div className="ideas reveal">
          <div className="bubble b1">
            ゴミ拾いしたらポイントゲット
          </div>
          <div className="bubble b2 r">
            算数を宝探しゲームにする
          </div>
          <div className="bubble b3">
            怒られているとき、つまんなくなったら負け
          </div>
          <div className="bubble b4 r">
            先生を怒らせて言い訳で逃れるゲーム
          </div>
          <div className="bubble b5">…etc.</div>
        </div>

        {/* 写真⑥ */}
        <div className="photo reveal">
          <Image
            src="/assets/images/courses/yononaka/jugyo-repo/photo-06.jpg"
            alt="お題②でアイデアが飛び交っている様子"
            width={480}
            height={360}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* ============== まとめ ============== */}
        <div className="closing reveal">
          <div className="closing-mark">📝</div>
          <div className="closing-label">— こんな感じで、 —</div>
          <h3>
            Yononakaは自由に話す時間
            <br />
            そのうえで、見え方が <span className="pop-amber">広がる。</span>
          </h3>
          <p>
            正解がないからこそ、思い思いの意見を話せる。
            <br />
            ひとりじゃ思いつかなかった視点に、出会える。
            <br />
            あとから気づいたこと、発見したこと、それは学び。
            <br />
            それってゲームにもいえることかも？
            <br />
            大切なのは「言葉にすること」だと思っています。
          </p>
        </div>

        {/* 写真⑦ */}
        <div className="photo reveal">
          <Image
            src="/assets/images/courses/yononaka/jugyo-repo/photo-07.jpg"
            alt="ワークの締めくくりや集合写真"
            width={480}
            height={360}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div className="divider">・ ・ ・</div>

        {/* ============== 次回CTA① ============== */}
        <div className="cta-section reveal">
          <span className="cta-label">次回のYononaka</span>
          <h2>
            <span className="em">「なんかいい」</span>
            <br />
            ってなに？
          </h2>
          <div className="photo-cta reveal">
            <Image
              src="/assets/images/courses/yononaka/jugyo-repo/photo-08.jpg"
              alt="次回のYononaka「なんかいい」ってなに？"
              width={480}
              height={360}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <p className="body">
            "なんか安心できる"人、"なんか居心地がいい"場所、"なんか気分が上がる"アイテム——。
            <br />
            日常のなかにある「なんかいい」って、いったい何なのでしょう？
            <br />
            <br />
            みんなに共通するものがあるのか、それともひとりひとり全然違うのか。
            <br />
            言葉にしようとすることで、自分でも気づいていなかった「自分の感じ方」が見えてくるかもしれません。
          </p>

          <div className="cta-info">
            <div className="cta-info-row">
              <div className="ic t">📅</div>
              <div>
                <div className="k">日時</div>
                <div className="v">5/14(木) 20:00 〜 21:15</div>
              </div>
            </div>
            <div className="cta-info-row">
              <div className="ic p">📍</div>
              <div>
                <div className="k">場所</div>
                <div className="v">オンライン</div>
              </div>
            </div>
            <div className="cta-info-row">
              <div className="ic f">💸</div>
              <div>
                <div className="k">参加費</div>
                <div className="v">無料</div>
              </div>
            </div>
          </div>

          <a
            href="https://forms.gle/XQnH1wQpzWt7u87D7"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            参加してみる<span className="arrow">→</span>
          </a>
        </div>

        <div className="divider">・ ・ ・</div>

        {/* ============== 次回CTA② ============== */}
        <div className="cta-section reveal">
          <span className="cta-label">次回のリアルYononaka</span>
          <h2>
            <span className="em">おしごと発見</span>
            <br />
            ワークショップ
          </h2>
          <div className="photo-cta reveal">
            <Image
              src="/assets/images/courses/yononaka/jugyo-repo/photo-09.jpg"
              alt="おしごと発見ワークショップ"
              width={480}
              height={360}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <p className="body">
            「将来の夢は？」って聞かれて、すぐ答えられる人、実はあんまりいない。
            <br />
            それって、
            <em>世の中にどんな仕事があるか、まだ知らないだけ</em> かも。
            <br />
            <br />
            好きなことや得意なことが、思いもよらない仕事につながってたりする。
            <br />
            キャリアコンサルタントといっしょに、&quot;しごと&quot;
            の世界をのぞきにいくワークです。
          </p>

          <div className="cta-info">
            <div className="cta-info-row">
              <div className="ic t">📅</div>
              <div>
                <div className="k">日時</div>
                <div className="v">5/31(日) 10:15 〜 11:30</div>
              </div>
            </div>
            <div className="cta-info-row">
              <div className="ic p">📍</div>
              <div>
                <div className="k">場所</div>
                <div className="v">
                  キープオンラボ{' '}
                  <span className="addr">(アリオから徒歩3分)</span>
                </div>
              </div>
            </div>
            <div className="cta-info-row">
              <div className="ic f">💸</div>
              <div>
                <div className="k">参加費</div>
                <div className="v">無料</div>
              </div>
            </div>
          </div>

          <a
            href="https://forms.gle/XQnH1wQpzWt7u87D7"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            参加してみる<span className="arrow">→</span>
          </a>
        </div>

        <footer className="report-footer">
          <Link href="/yononaka" className="back">
            ← Yononakaのページに戻る
          </Link>
        </footer>
      </div>

      <style jsx>{`
        .yononaka-game-report {
          --cream: #fffbf2;
          --cream-deep: #fff5e0;
          --ink: #2b2a28;
          --ink-soft: #6b6862;
          --ink-faint: #a8a49c;
          --teal: #34c6be;
          --teal-deep: #0f9e8a;
          --coral: #fb7185;
          --coral-deep: #e11d48;
          --amber: #fbbf24;
          --amber-deep: #d97706;
          --purple: #a78bfa;
          --purple-deep: #7c3aed;
          --blue: #60a5fa;
          --green-deep: #059669;
          --shadow-soft: 0 4px 16px rgba(43, 42, 40, 0.06);

          background: var(--cream);
          color: var(--ink);
          font-family: 'Noto Sans JP', sans-serif;
          line-height: 1.85;
          font-size: 16px;
          -webkit-font-smoothing: antialiased;
          padding: 24px 0;
        }

        .yononaka-game-report :global(*) {
          box-sizing: border-box;
        }

        .wrap {
          max-width: 480px;
          margin: 0 auto;
          background: var(--cream);
          position: relative;
          padding-bottom: 80px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(43, 42, 40, 0.08);
        }
        @media (max-width: 480px) {
          .yononaka-game-report {
            padding: 0;
          }
          .wrap {
            border-radius: 0;
            box-shadow: none;
          }
        }

        /* タイポ */
        .yononaka-game-report h1,
        .yononaka-game-report h2,
        .yononaka-game-report h3 {
          font-family: 'Zen Maru Gothic', 'M PLUS Rounded 1c', sans-serif;
          line-height: 1.4;
          letter-spacing: 0.02em;
          margin: 0;
        }
        .yononaka-game-report p {
          margin: 0;
        }

        .accent-handwrite {
          color: var(--coral-deep);
          font-weight: 500;
          font-style: italic;
        }

        /* reveal: JSロード前は表示、ロード後にアニメーション */
        .reveal {
          opacity: 1;
          transform: none;
        }
        :global(.yononaka-game-report.js-loaded) .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        :global(.yononaka-game-report.js-loaded) .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* HERO */
        .hero {
          padding: 32px 24px 24px;
          position: relative;
          overflow: hidden;
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--teal);
          color: white;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 700;
          font-size: 12px;
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: 20px;
        }
        .hero-tag .dot {
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
          animation: yono-pulse 1.6s ease-in-out infinite;
        }
        @keyframes yono-pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
        .hero h1 {
          font-size: 34px;
          font-weight: 800;
          line-height: 1.3;
          margin-bottom: 16px;
          position: relative;
        }
        .hero h1 .accent-y {
          background: linear-gradient(transparent 60%, var(--amber) 60%);
          padding: 0 4px;
        }
        .hero h1 .accent-c {
          color: var(--coral);
        }
        .hero h1 .small {
          display: block;
          font-size: 18px;
          color: var(--ink-soft);
          margin-bottom: 8px;
          font-weight: 500;
        }
        .hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .hero-meta span {
          font-size: 12px;
          color: var(--ink-soft);
          background: white;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid #efeae0;
        }
        .hero-deco {
          position: absolute;
          pointer-events: none;
        }
        .hero-deco.s1 {
          top: 16px;
          right: 18px;
          font-size: 28px;
          animation: yono-float 4s ease-in-out infinite;
        }
        .hero-deco.s2 {
          top: 60px;
          right: 60px;
          font-size: 18px;
          animation: yono-float 5s ease-in-out infinite 0.5s;
        }
        .hero-deco.s3 {
          bottom: 24px;
          right: 24px;
          font-size: 22px;
          animation: yono-float 4.5s ease-in-out infinite 1s;
        }
        @keyframes yono-float {
          0%,
          100% {
            transform: translateY(0) rotate(-3deg);
          }
          50% {
            transform: translateY(-10px) rotate(3deg);
          }
        }
        .hero-lead {
          font-size: 15px;
          color: var(--ink-soft);
          line-height: 1.9;
        }
        .hero-lead strong {
          background: linear-gradient(
            transparent 65%,
            var(--teal) 65%,
            var(--teal) 90%,
            transparent 90%
          );
          color: var(--ink);
          font-weight: 700;
          padding: 0 2px;
        }

        /* 写真 */
        .photo {
          margin: 28px 24px;
          border-radius: 20px;
          overflow: hidden;
        }
        .photo-cta {
          margin: 16px -24px 24px;
          overflow: hidden;
        }

        /* セクション */
        .section {
          padding: 24px 24px 12px;
          position: relative;
        }
        .section-num {
          display: inline-block;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 800;
          font-size: 13px;
          color: white;
          background: var(--ink);
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 12px;
          letter-spacing: 0.05em;
        }
        .section h2 {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 14px;
        }
        .section h2 .pop {
          background: var(--amber);
          padding: 0 6px;
          border-radius: 4px;
          display: inline-block;
          transform: rotate(-1.5deg);
        }
        .section p {
          font-size: 15px;
          color: var(--ink);
          margin-bottom: 14px;
          line-height: 1.95;
        }
        .section p.muted {
          color: var(--ink-soft);
          font-size: 14px;
        }

        /* タグ群 */
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 20px 24px;
          padding: 24px 18px;
          background: white;
          border-radius: 24px;
          box-shadow: var(--shadow-soft);
          position: relative;
        }
        .tags::before {
          content: 'せーのっ！';
          position: absolute;
          top: -14px;
          left: 20px;
          background: var(--coral);
          color: white;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 700;
          font-size: 13px;
          padding: 4px 12px;
          border-radius: 999px;
          transform: rotate(-3deg);
        }
        .tag {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 700;
          font-size: 14px;
          padding: 8px 14px;
          border-radius: 999px;
          color: white;
          animation: yono-tag-bounce 2s ease-in-out infinite;
        }
        .tag:nth-child(1) {
          background: var(--teal);
          animation-delay: 0s;
        }
        .tag:nth-child(2) {
          background: var(--coral);
          animation-delay: 0.2s;
        }
        .tag:nth-child(3) {
          background: var(--amber);
          animation-delay: 0.4s;
        }
        .tag:nth-child(4) {
          background: var(--purple);
          animation-delay: 0.6s;
        }
        .tag:nth-child(5) {
          background: var(--blue);
          animation-delay: 0.8s;
        }
        .tag:nth-child(6) {
          background: var(--green-deep);
          animation-delay: 1s;
        }
        .tag:nth-child(7) {
          background: var(--coral);
          animation-delay: 1.2s;
        }
        @keyframes yono-tag-bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        /* Yononaka説明 */
        .explainer {
          margin: 32px 24px;
          padding: 24px 22px 22px;
          background: white;
          border-radius: 24px;
          border: 2px dashed #e8dfc8;
          position: relative;
        }
        .explainer-icon {
          position: absolute;
          top: -18px;
          left: 20px;
          width: 44px;
          height: 44px;
          background: var(--purple);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          box-shadow: 0 4px 0 rgba(124, 58, 237, 0.25);
        }
        .explainer h3 {
          font-size: 17px;
          font-weight: 800;
          margin-top: 18px;
          margin-bottom: 12px;
          color: var(--purple-deep);
        }
        .explainer p {
          font-size: 14px;
          line-height: 1.85;
          color: var(--ink);
        }
        .explainer .rule {
          background: var(--cream-deep);
          padding: 10px 14px;
          border-radius: 12px;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: var(--ink);
          margin: 12px 0;
          border-left: 4px solid var(--amber);
        }

        /* お題 */
        .odai {
          margin: 32px 24px 20px;
          padding: 22px 20px 18px;
          background: linear-gradient(180deg, var(--cream-deep) 0%, white 100%);
          border-radius: 24px;
          position: relative;
          border: 1px solid #f0e6cd;
        }
        .odai-ribbon {
          display: inline-block;
          background: var(--ink);
          color: var(--amber);
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 800;
          font-size: 12px;
          padding: 5px 14px;
          border-radius: 999px;
          margin-bottom: 12px;
          letter-spacing: 0.08em;
        }
        .odai h3 {
          font-size: 22px;
          font-weight: 800;
          line-height: 1.45;
          margin-bottom: 10px;
        }
        .odai h3 .underline {
          background: linear-gradient(
            transparent 70%,
            var(--coral) 70%,
            var(--coral) 95%,
            transparent 95%
          );
          padding: 0 2px;
        }
        .odai p {
          font-size: 14px;
          color: var(--ink-soft);
          line-height: 1.9;
        }

        /* トリビア */
        .trivia {
          margin: 36px 24px 20px;
          padding: 28px 22px 22px;
          background: var(--ink);
          color: white;
          border-radius: 24px;
          position: relative;
          overflow: hidden;
        }
        .trivia .trivia-bg {
          position: absolute;
          top: -10px;
          right: -10px;
          font-size: 80px;
          opacity: 0.15;
          transform: rotate(15deg);
        }
        .trivia .trivia-label {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 700;
          font-size: 12px;
          color: var(--amber);
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }
        .trivia h3 {
          font-size: 19px;
          font-weight: 800;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .trivia .year {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 800;
          font-size: 56px;
          color: var(--amber);
          line-height: 1;
          letter-spacing: -0.02em;
          display: block;
          margin: 8px 0 4px;
        }
        .trivia .year-label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 16px;
          display: block;
        }
        .trivia p {
          font-size: 14px;
          line-height: 1.85;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 16px;
        }
        .yt-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--coral);
          color: white;
          text-decoration: none;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 700;
          font-size: 14px;
          padding: 12px 18px;
          border-radius: 999px;
          transition: transform 0.2s ease;
        }
        .yt-link:hover {
          transform: scale(1.04);
        }
        .yt-link::before {
          content: '▶';
          font-size: 11px;
        }

        /* タイムライン */
        .timeline {
          margin: 28px 24px;
          padding: 22px 20px;
          background: white;
          border-radius: 20px;
          box-shadow: var(--shadow-soft);
        }
        .timeline-title {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 800;
          font-size: 14px;
          color: var(--ink-soft);
          margin-bottom: 16px;
        }
        .timeline-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .timeline-list li {
          position: relative;
          padding: 8px 0 8px 26px;
          font-size: 13px;
          line-height: 1.5;
        }
        .timeline-list li::before {
          content: '';
          position: absolute;
          left: 6px;
          top: 14px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--teal);
        }
        .timeline-list li:nth-child(2)::before {
          background: var(--amber);
        }
        .timeline-list li:nth-child(3)::before {
          background: var(--coral);
        }
        .timeline-list li:nth-child(4)::before {
          background: var(--purple);
        }
        .timeline-list li:nth-child(5)::before {
          background: var(--blue);
        }
        .timeline-list li::after {
          content: '';
          position: absolute;
          left: 9.5px;
          top: 22px;
          bottom: -2px;
          width: 1px;
          background: #e8e0cd;
        }
        .timeline-list li:last-child::after {
          display: none;
        }
        .timeline-list .era {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: var(--ink);
        }
        .timeline-list .desc {
          font-size: 12px;
          color: var(--ink-soft);
        }

        /* 大きな問い */
        .question {
          margin: 40px 24px;
          text-align: center;
          position: relative;
        }
        .question .qmark {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 800;
          font-size: 100px;
          color: var(--amber);
          line-height: 1;
          margin-bottom: -20px;
          opacity: 0.85;
        }
        .question .lead {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 800;
          font-size: 22px;
          line-height: 1.5;
          margin-bottom: 18px;
        }
        .question .lead .hl {
          background: linear-gradient(
            transparent 60%,
            var(--coral) 60%,
            var(--coral) 90%,
            transparent 90%
          );
          padding: 0 4px;
        }
        .question .subq {
          font-size: 16px;
          color: var(--ink-soft);
          margin: 8px 0;
          font-style: italic;
        }

        /* アイデア吹き出し */
        .ideas {
          margin: 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .bubble {
          padding: 14px 18px;
          border-radius: 18px;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 700;
          font-size: 15px;
          line-height: 1.5;
          max-width: 80%;
          position: relative;
          align-self: flex-start;
        }
        .bubble.r {
          align-self: flex-end;
        }
        .bubble.b1 {
          background: var(--teal);
          color: white;
        }
        .bubble.b2 {
          background: var(--coral);
          color: white;
        }
        .bubble.b3 {
          background: var(--amber);
          color: var(--ink);
        }
        .bubble.b4 {
          background: var(--purple);
          color: white;
        }
        .bubble.b5 {
          background: white;
          color: var(--ink);
          border: 2px solid #e8e0cd;
        }
        .bubble small {
          display: block;
          font-family: 'Noto Sans JP', sans-serif;
          font-weight: 400;
          font-size: 12px;
          opacity: 0.85;
          margin-top: 4px;
        }

        /* まとめ */
        .closing {
          margin: 40px 24px 0;
          padding: 28px 22px;
          background: white;
          border-radius: 24px;
          text-align: center;
          border: 2px solid var(--teal);
          position: relative;
        }
        .closing-mark {
          position: absolute;
          top: -22px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 4px 12px;
          font-size: 24px;
        }
        .closing-label {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 700;
          font-size: 12px;
          color: var(--teal-deep);
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }
        .closing h3 {
          font-size: 20px;
          font-weight: 800;
          line-height: 1.5;
          margin-bottom: 12px;
        }
        .closing h3 .pop-amber {
          background: var(--amber);
          padding: 0 4px;
        }
        .closing p {
          font-size: 14px;
          color: var(--ink-soft);
          line-height: 1.9;
        }

        /* CTA */
        .cta-section {
          margin: 48px 16px 0;
          padding: 28px 24px 32px;
          background: linear-gradient(180deg, #fff7e5 0%, #fff1f4 100%);
          border-radius: 28px;
          position: relative;
          overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute;
          top: -40px;
          right: -40px;
          width: 140px;
          height: 140px;
          background: var(--amber);
          border-radius: 50%;
          opacity: 0.25;
        }
        .cta-section::after {
          content: '';
          position: absolute;
          bottom: -30px;
          left: -30px;
          width: 100px;
          height: 100px;
          background: var(--coral);
          border-radius: 50%;
          opacity: 0.2;
        }
        .cta-label {
          position: relative;
          display: inline-block;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 800;
          font-size: 13px;
          color: white;
          background: var(--coral);
          padding: 6px 16px;
          border-radius: 999px;
          margin-bottom: 14px;
          transform: rotate(-2deg);
        }
        .cta-section h2 {
          position: relative;
          font-size: 26px;
          font-weight: 800;
          line-height: 1.4;
          margin-bottom: 18px;
        }
        .cta-section h2 .em {
          background: var(--ink);
          color: var(--amber);
          padding: 2px 10px;
          border-radius: 8px;
          display: inline-block;
          margin: 4px 0;
        }
        .cta-section .body {
          position: relative;
          font-size: 14.5px;
          color: var(--ink);
          line-height: 1.95;
          margin-bottom: 22px;
        }
        .cta-section .body em {
          font-style: normal;
          font-weight: 700;
          background: linear-gradient(transparent 65%, var(--amber) 65%);
          padding: 0 2px;
        }
        .cta-info {
          position: relative;
          background: white;
          border-radius: 18px;
          padding: 18px 20px;
          margin-bottom: 22px;
          box-shadow: var(--shadow-soft);
        }
        .cta-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
          border-bottom: 1px dashed #efe6cf;
          font-size: 14px;
        }
        .cta-info-row:last-child {
          border-bottom: none;
        }
        .cta-info-row .ic {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .cta-info-row .ic.t {
          background: var(--teal);
          color: white;
        }
        .cta-info-row .ic.p {
          background: var(--coral);
          color: white;
        }
        .cta-info-row .ic.f {
          background: var(--amber);
          color: var(--ink);
        }
        .cta-info-row .v {
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 700;
          font-size: 14px;
        }
        .cta-info-row .v .addr {
          font-weight: 400;
          font-size: 12px;
          color: var(--ink-soft);
        }
        .cta-info-row .k {
          font-size: 11px;
          color: var(--ink-soft);
          margin-bottom: 2px;
        }
        .cta-button {
          position: relative;
          display: block;
          width: 100%;
          background: var(--ink);
          color: white;
          text-decoration: none;
          text-align: center;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 800;
          font-size: 18px;
          padding: 20px;
          border-radius: 18px;
          box-shadow: 0 6px 0 rgba(43, 42, 40, 0.25);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          letter-spacing: 0.04em;
        }
        .cta-button:active {
          transform: translateY(3px);
          box-shadow: 0 3px 0 rgba(43, 42, 40, 0.25);
        }
        .cta-button .arrow {
          display: inline-block;
          margin-left: 6px;
          transition: transform 0.3s ease;
        }
        .cta-button:hover .arrow {
          transform: translateX(4px);
        }
        .cta-note {
          position: relative;
          font-size: 11.5px;
          color: var(--ink-soft);
          text-align: center;
          margin-top: 10px;
        }

        /* フッター */
        .report-footer {
          margin: 48px 24px 0;
          padding-top: 28px;
          border-top: 1px solid #e8e0cd;
          text-align: center;
        }
        .report-footer :global(.back) {
          display: inline-block;
          font-size: 13px;
          color: var(--teal-deep);
          text-decoration: none;
          font-family: 'Zen Maru Gothic', sans-serif;
          font-weight: 700;
          padding: 10px 20px;
          border: 1.5px solid var(--teal);
          border-radius: 999px;
        }

        /* 区切り */
        .divider {
          text-align: center;
          margin: 28px 0 12px;
          font-size: 18px;
          letter-spacing: 8px;
          color: var(--ink-faint);
        }
      `}</style>
    </div>
  )
}
