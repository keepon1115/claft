'use client'

import { useEffect } from 'react'

const MOODS: Record<string, string> = {
  '#3aa0d6': '#0c1430',
  '#c0398b': '#1a0c1c',
  '#d98324': '#1c1308',
  '#7a4fb5': '#140c20',
  '#2e8b6e': '#08160f',
  '#c8932b': '#1a1306',
}

export default function SerialLpContent() {
  useEffect(() => {
    const root = document.querySelector('.sl-page')
    if (!root) return

    // mood switching by section in view
    // rootMargin バンド方式：ビューポート中央を通過した瞬間に発火するので、
    // 1画面より背の高いセクション（#highlight 等）でも確実に切り替わる。
    const secs = [...root.querySelectorAll<HTMLElement>('section[data-mood]')]
    const moodObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const m = (entry.target as HTMLElement).dataset.mood
            if (!m) return
            const el = root as HTMLElement
            el.style.setProperty('--mood', m)
            el.style.setProperty('--mood-deep', MOODS[m] || '#0c1430')
            el.style.setProperty('--bg', MOODS[m] || '#070912')
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    secs.forEach((s) => moodObs.observe(s))

    // reveal
    const revObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            revObs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.25 }
    )
    root.querySelectorAll('.reveal').forEach((r) => revObs.observe(r))

    // growing map: light nodes/edges as session sections enter
    const litNodes = new Set<number>()
    function lightUpTo(n: number) {
      for (let i = 1; i <= n; i++) {
        root!.querySelectorAll(`.node[data-n="${i}"]`).forEach((el) => el.classList.add('lit'))
        root!.querySelectorAll(`.edge[data-e="${i}"]`).forEach((el) => el.classList.add('lit'))
      }
      if (n >= 6) {
        root!.querySelector('.node[data-n="6b"]')?.classList.add('lit')
        root!.querySelector('.node[data-n="6"]')?.classList.add('lit') // core curiosity
      }
    }
    // 第1回は済 → ノード01は最初から灯す
    litNodes.add(1)
    root.querySelector('.node[data-n="1"]')?.classList.add('lit')
    const nodeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const n = parseInt((entry.target as HTMLElement).dataset.node || '0', 10)
            if (!litNodes.has(n)) litNodes.add(n)
            lightUpTo(n)
          }
        })
      },
      { threshold: 0.4 }
    )
    root.querySelectorAll('.sess-sec[data-node]').forEach((s) => nodeObs.observe(s))

    // 地図が主役になるのは「6回の旅」ブロックの中だけ。
    // それ以外を読んでいる間は地図の存在感を落とし、本文の視認性を優先する。
    const journeyEl = root.querySelector('.sl-journey')
    const bgwrapEl = root.querySelector('.sl-bgwrap')
    const focusObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          bgwrapEl?.classList.toggle('focus', entry.isIntersecting)
        })
      },
      { threshold: 0 }
    )
    if (journeyEl) focusObs.observe(journeyEl)

    // hide scroll hint after first scroll
    const hint = root.querySelector<HTMLElement>('.scrollhint')
    const onScroll = () => {
      if (hint && window.scrollY > 120) hint.style.opacity = '0'
    }
    addEventListener('scroll', onScroll, { passive: true })

    return () => {
      moodObs.disconnect()
      revObs.disconnect()
      nodeObs.disconnect()
      focusObs.disconnect()
      removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="sl-page">
      <div className="sl-stage">
        {/* ===== 常駐背景: 宇宙グリッド + 育っていく地図 ===== */}
        <div className="sl-bgwrap" aria-hidden="true">
          <div className="grid" />
          <div className="glow" />
          <svg className="mapsvg" viewBox="0 0 400 360" fill="none">
            <line className="edge" data-e="1" x1="200" y1="300" x2="90" y2="210" />
            <line className="edge" data-e="2" x1="90" y1="210" x2="150" y2="110" />
            <line className="edge" data-e="3" x1="150" y1="110" x2="200" y2="60" />
            <line className="edge" data-e="4" x1="200" y1="60" x2="300" y2="120" />
            <line className="edge" data-e="5" x1="300" y1="120" x2="320" y2="225" />
            <line className="edge" data-e="6" x1="320" y1="225" x2="200" y2="300" />
            <line className="edge" data-e="6" x1="200" y1="300" x2="200" y2="180" />
            <line className="edge" data-e="6" x1="90" y1="210" x2="200" y2="180" />
            <line className="edge" data-e="6" x1="300" y1="120" x2="200" y2="180" />
            {/* core node (curiosity) revealed last */}
            <g className="node" data-n="6" transform="translate(200,180)">
              <circle className="pulse" r="6" /><circle r="9" /><text x="14" y="4">0</text>
            </g>
            <g className="node" data-n="1" transform="translate(200,300)"><circle className="pulse" r="6" /><circle r="8" /><text x="12" y="4">01</text></g>
            <g className="node" data-n="2" transform="translate(90,210)"><circle className="pulse" r="6" /><circle r="8" /><text x="-26" y="4">02</text></g>
            <g className="node" data-n="3" transform="translate(150,110)"><circle className="pulse" r="6" /><circle r="8" /><text x="-26" y="4">03</text></g>
            <g className="node" data-n="4" transform="translate(200,60)"><circle className="pulse" r="6" /><circle r="8" /><text x="12" y="4">04</text></g>
            <g className="node" data-n="5" transform="translate(300,120)"><circle className="pulse" r="6" /><circle r="8" /><text x="12" y="4">05</text></g>
            <g className="node" data-n="6b" transform="translate(320,225)"><circle className="pulse" r="6" /><circle r="8" /><text x="12" y="4">06</text></g>
          </svg>
        </div>

        <div className="content">

          {/* 1. HERO */}
          <section id="hero" data-mood="#3aa0d6">
            <span className="eyebrow mono reveal">YONONAKA ／ 全6回の対話ワークショップ</span>
            <h1 className="mincho reveal d1">AIロボット社会、<br />僕たちは<span className="q">どう生きるか</span>。</h1>
            <p className="sub mono reveal d2">中高生が正解のない問いに向き合う1時間を、実況中継する。<br />正解は、誰も持っていない。― 僕も、学びに来ています。</p>
            <div className="scrollhint mono">
              <span className="hint-touch">SWIPE UP</span>
              <span className="hint-mouse">SCROLL</span>
              <span className="arr" />
            </div>
          </section>

          {/* 2. 前提 */}
          <section data-mood="#3aa0d6">
            <span className="eyebrow mono reveal">前提</span>
            <p className="big mincho reveal d1">10年後の世界が<br />どうなるか、<span className="mood-word">誰も知らない。</span></p>
            <p className="muted reveal d2">AIとロボットは日進月歩で進んでいる。だから僕がやるのは、最新の現実と、考えるきっかけを渡すこと。そこから何を思い、どう動き、どんなキャリアを描くか――決めるのは、教室の中高生と、画面の外で読んでいるあなたです。</p>
            <p className="muted reveal d3" style={{ marginTop: '1.6rem' }}>AIロボット社会を<span className="mood-word">怖がる</span>んやなくて、<span className="mood-word">面白がっていく</span>。それだけ。</p>
          </section>

          {/* 3. これは、なに？ */}
          <section data-mood="#3aa0d6">
            <span className="eyebrow mono reveal">これは、なに？</span>
            <p className="lead reveal d1">月に一度ひらく、答えのない問いをめぐる中高生の対話の場「Yononaka」。その<strong>1時間を、実況中継します。</strong></p>
            <p className="muted reveal d2"><strong style={{ color: 'var(--ink)' }}>第1回は、もう終わった。</strong>以下は、そこで何が起きたかの記録です。誰が何を言って、場が一瞬止まったか。生の声を、登場人物の台詞のように書きます。そして――<strong style={{ color: 'var(--ink)' }}>あなたの声も、この物語の一部になる。</strong></p>
          </section>

          {/* 4. 第1回ハイライト（LPの心臓部） */}
          <section id="highlight" data-mood="#3aa0d6">
            <span className="eyebrow mono reveal">第1回ハイライト ／ 2026.06</span>
            <p className="hl-head mincho reveal d1">教室で、<br /><span className="mood-word">何が起きたか。</span></p>

            {/* 4-1 */}
            <div className="hl-block">
              <p className="piece mono reveal">SESSION 01 ／ 境界線</p>
              <h3 className="reveal d1">AIって、どんなもの？</h3>
              <p className="story reveal d2">最初の問いはシンプルだった。<span className="q">「AIってどんなもの？」</span>返ってきた言葉は、一人ひとりぜんぜん違う。</p>
              <div className="voices reveal d2">
                <span className="voice">ほとんど全ての問題を解ける機械</span>
                <span className="voice">企画崩壊の原因</span>
                <span className="voice">人を媒介せず要件をサポートしてくれる玉</span>
                <span className="voice">ほぼ何でもできる</span>
              </div>
              <p className="story reveal d2"><span className="em">&quot;企画崩壊の原因&quot;</span>と答えた中学生は、学校の授業でAIを使っていいと言われた結果、新聞づくりの企画が&quot;終わった&quot;経験を語った。「便利すぎるから、使えるところは注意しないといけない」。</p>
              <p className="story reveal d2">大人の参加者からは「AIを使わないと仕事が遅れる」という声。でも同時に「実際に使うようになったから、AIだけじゃ絶対に人間に置き換わられへんなっていう弱点が見えた」。</p>
              <p className="kicker reveal d3">怖がるでも持ち上げるでもない。使ってるからこそ見える景色が、部屋の中で混ざり合っていた。</p>
              <figure className="shot reveal d1" data-shot="menti-q1">
                <span className="ico mono" aria-hidden="true">▦</span>
                <figcaption>
                  <span className="lbl mono">MENTI ／ お題① ワードクラウド</span>
                  <span className="hint mono">画像を差し替え：&lt;img src=&quot;…&quot;&gt; をここに</span>
                </figcaption>
                {/* 差し替え例: <img loading="lazy" src="./images/menti-q1.png" alt="お題① AIってどんなもの？のワードクラウド"> */}
              </figure>
            </div>

            {/* 4-2 */}
            <div className="hl-block">
              <p className="piece mono reveal">SESSION 01 ／ 線引き</p>
              <h3 className="reveal d1">どこまで、任せていい？</h3>
              <p className="story reveal d2">8つの「人間の思考・行動」を並べて、「どこまでAIに任せていいか」を1〜5で答えてもらった。意外だったのは、ほとんどの参加者が<span className="em">「自分でやる」寄り</span>だったこと。</p>
              <div className="voices reveal d2">
                <span className="voice">黒板をノートに書くのは自分でやる。書かないと覚えられない</span>
                <span className="voice">服は自分で選ばなかったら、もはや自分じゃない</span>
              </div>
              <p className="story reveal d2">でも種明かしをすると、1〜5番はもう技術的にはAIにできる。驚きと、「でも自分はやりたい」が同時に走る。</p>
              <p className="kicker reveal d3"><span className="q">&quot;できるかどうか&quot;</span>じゃない。<span className="q">&quot;任せたいかどうか&quot;</span>。自分の線を引いた瞬間、それが「自分が人間でおきたい場所」になっていた。</p>
              <figure className="shot reveal d1" data-shot="menti-scales">
                <span className="ico mono" aria-hidden="true">▥</span>
                <figcaption>
                  <span className="lbl mono">MENTI ／ お題② Scales（割れたグラフ）</span>
                  <span className="hint mono">画像を差し替え：&lt;img src=&quot;…&quot;&gt; をここに</span>
                </figcaption>
                {/* 差し替え例: <img loading="lazy" src="./images/menti-scales.png" alt="お題② どこまで任せていいかのScalesグラフ"> */}
              </figure>
            </div>

            {/* 4-3 */}
            <div className="hl-block">
              <p className="piece mono reveal">SESSION 01 ／ BMI</p>
              <h3 className="reveal d1">脳にチップ。あなたは、入れる？</h3>
              <p className="story reveal d2">全身麻痺のアーティストが、考えるだけでカーソルを動かし、20年ぶりに自分の名前を書いた動画を観た。<span className="em">部屋が静かになった。</span></p>
              <div className="voices reveal d2">
                <span className="voice">障害者にとっては革命的な発明。でも体が健康なうちは入れたくない</span>
                <span className="voice">1回導入しちゃったら、体を動かすのがめんどくさいなってなる可能性がある</span>
                <span className="voice">思ってることが全部文字に出たら、あちこちで喧嘩が起きそう</span>
              </div>
              <p className="story reveal d2">技術への驚きと、自分の体への感覚が同時にぶつかる。</p>
              <p className="kicker reveal d3">答えは出ない。出なくていい。でも、問いは残った。</p>
            </div>

            {/* 4-4 アーカイブ */}
            <div className="archive reveal">
              <p className="lbl mono">第1回の全記録</p>
              <div className="ctas">
                <a className="btn" href="#" data-cta="youtube">アーカイブを観る ↗</a>
                <a className="btn ghost" href="#" data-cta="canva">スライドを見る ↗</a>
              </div>
              <p className="note">ここに書いたのはハイライトだけ。全体の空気は、アーカイブで確かめてほしい。</p>
            </div>
          </section>

          {/* 5. 未回収の謎 */}
          <section id="mystery" data-mood="#c0398b">
            <span className="eyebrow mono reveal">第1回で、見つかった謎</span>
            <div className="frame reveal d1">
              <p className="tag mono">UNRESOLVED ／ 未回収</p>
              <p className="big mincho">「好奇心」と「メタ認知」だけは、<br />今のところ、<span className="mood-word">機械から出てこない。</span></p>
              <p className="muted" style={{ marginTop: '1.2rem' }}>人間の思考や行動は、もうほとんどAIに置き換わりはじめている。でも「なんか面白そう」と自分から動き出すことと、「本当にそう？」と自分を疑うことだけは、まだ残っているらしい。――けれど、それは<strong style={{ color: 'var(--ink)' }}>本当に、最後まで人間のものなんやろうか？</strong></p>
            </div>
            <p className="muted reveal d2" style={{ marginTop: '1.4rem' }}>ある参加者はこう言った――<span className="mood-word">「AIに心をつけちゃったら、もう終わりですよ」</span>。果たして、そうなのか。次回、<strong style={{ color: 'var(--ink)' }}>心のかたちを探しに行く。</strong></p>
          </section>

          {/* 6. 6回の旅マップ */}
          <div className="sl-journey">
            <section data-mood="#c0398b">
              <span className="eyebrow mono reveal">6回の旅</span>
              <p className="lead reveal d1">毎回、ピースが1つずつ表に出る。<br />追いかけるほど、<span className="mood-word">1枚の地図が組み上がっていく。</span></p>
              <p className="jlabel mono reveal d2" style={{ marginTop: '.8rem' }}>↓ スクロールで、地図に灯がともる</p>
            </section>

            <section className="sess-sec" data-mood="#3aa0d6" data-node="1">
              <div className="sess reveal">
                <div className="no mincho">01</div>
                <div className="body"><h3>境界線 <span className="flag done mono">DONE</span></h3>
                  <p className="piece mono">PIECE ─ 知能の地図と、置き換えの線引き</p>
                  <p>「どこまでAIに任せていい？」自分の手で線を引く。気づけば、もうほとんど置き換わっていた。残ったのは、たった2つ。</p>
                </div>
              </div>
            </section>

            <section className="sess-sec" data-mood="#c0398b" data-node="2">
              <div className="sess reveal">
                <div className="no mincho">02</div>
                <div className="body"><h3>心 <span className="flag mono">7/24（金）</span></h3>
                  <p className="piece mono">PIECE ─ 感情に名前をつける＝解像度を上げる</p>
                  <p>「&quot;なんかいや&quot;を、どこまで言葉にできる？」AIは感情を分類できる。でも、内側から感じてはいるんやろうか。</p>
                </div>
              </div>
            </section>

            <section className="sess-sec is-soon" data-mood="#d98324" data-node="3">
              <div className="sess reveal">
                <div className="no mincho">03</div>
                <div className="body"><h3>からだ <span className="flag mono">COMING SOON</span></h3>
                  <p className="piece mono">PIECE ─ 言葉にできない&quot;コツ&quot;＝渡しにくい知</p>
                  <p>「自転車の乗り方を、言葉だけで教えられる？」体が覚えていることは、データに渡せるのか。教室で、体を動かす異色回。</p>
                </div>
              </div>
            </section>

            <section className="sess-sec is-soon" data-mood="#7a4fb5" data-node="4">
              <div className="sess reveal">
                <div className="no mincho">04</div>
                <div className="body"><h3>自分 <span className="flag mono">COMING SOON</span></h3>
                  <p className="piece mono">PIECE ─ 視点は選べる／変えたくない核＝舵</p>
                  <p>「学校の自分と、家の自分。どっちが本物？」AIもキャラを演じ分ける。分人とAIのペルソナは、何が違うんやろう。</p>
                </div>
              </div>
            </section>

            <section className="sess-sec is-soon" data-mood="#2e8b6e" data-node="5">
              <div className="sess reveal">
                <div className="no mincho">05</div>
                <div className="body"><h3>情報 <span className="flag mono">COMING SOON</span></h3>
                  <p className="piece mono">PIECE ─ 同じ事実も、伝え方で像が変わる</p>
                  <p>同じニュース、2つの見出し。「どっちを信じる？」AIは&quot;それっぽい&quot;を量産できる。正しさの番人は、誰なんやろう。</p>
                </div>
              </div>
            </section>

            <section className="sess-sec is-soon" data-mood="#c8932b" data-node="6">
              <div className="sess reveal">
                <div className="no mincho">06</div>
                <div className="body"><h3>編集 ― そして、地図が完成する <span className="flag mono">COMING SOON</span></h3>
                  <p className="piece mono">PIECE ─ 全部を貫いていた動力＝好奇心の正体</p>
                  <p>5回分の&quot;自分の言葉&quot;を素材に、「どう生きるか」を一人ひとり編む。最後に、あの謎の答えが明かされる。</p>
                </div>
              </div>
            </section>
          </div>

          {/* 7. 読者への問い */}
          <section id="reader" data-mood="#c8932b">
            <span className="eyebrow mono reveal">あなたも、登場人物。</span>
            <p className="big mincho reveal d1" style={{ fontSize: 'clamp(1.5rem,5cqi,2.4rem)' }}>第1回の声を聞いて、<br /><span className="mood-word">あなたはどう思った？</span></p>
            <div className="card reveal d2" style={{ marginTop: '1.8rem' }}>
              <p className="muted" style={{ marginTop: 0 }}>参加者たちは、AIを「企画崩壊の原因」と呼び、「ほぼ何でもできる」と言い、「便利すぎるから注意がいる」と語った。</p>
              <p className="lead" style={{ marginTop: '1.2rem' }}>あなたにとって、AIやロボットは<span className="mood-word">どんな存在</span>ですか？</p>
              <p className="muted" style={{ marginTop: '.7rem' }}>ひとことだけ、教えてください。あなたの声は、<strong style={{ color: 'var(--ink)' }}>次の教室に届けます。</strong>記名は不要、一問だけ。</p>
              <div className="ctas">
                <a className="btn" href="#" data-cta="form-reader">答える ↗</a>
              </div>
            </div>
          </section>

          {/* 8. 参加申し込みCTA */}
          <section id="apply" data-mood="#c0398b">
            <span className="eyebrow mono reveal">第2回参加者募集</span>
            <p className="big mincho reveal d1" style={{ fontSize: 'clamp(1.7rem,5.6cqi,2.8rem)' }}>次回、<span className="mood-word">心のかたち</span>を<br />探しに行く。</p>
            <div className="apply-card reveal d2" style={{ marginTop: '1.8rem' }}>
              <ul className="specs">
                <li><span className="k">日程</span><span className="v">2026年7月24日（金）</span></li>
                <li><span className="k">形式</span><span className="v">Zoom</span></li>
                <li><span className="k">対象</span><span className="v">中高生<small>スクール生は受講料込み・実質無料</small></span></li>
                <li><span className="k">テーマ</span><span className="v">心のかたちを探しにいく<small>感情って「良い・悪い」で割れるもの？ AIは感情を分類できる。でも&quot;感じて&quot;はいるのか。</small></span></li>
              </ul>
              <div className="ctas">
                <a className="btn" href="#" data-cta="form-apply">第2回に申し込む ↗</a>
              </div>
              <p className="muted" style={{ fontSize: '.86rem' }}>第1回に参加していなくても大丈夫です。各回それぞれで完結する問いを扱います。</p>
            </div>
          </section>

          {/* 9. フィナーレ */}
          <section className="finale" data-mood="#c8932b">
            <span className="eyebrow mono reveal">6週間後</span>
            <h2 className="mincho reveal d1">1枚の地図が、<br /><span className="mood-word">完成する。</span></h2>
            <p className="muted reveal d2">その地図に、あなたの線も引かれている。</p>
            <div className="ctas reveal d3" style={{ marginTop: '1.8rem' }}>
              <a className="btn" href="#" data-cta="form-apply">第2回に申し込む ↗</a>
              <a className="btn ghost" href="#" data-cta="form-reader">読者の問いに答える</a>
            </div>
          </section>

        </div>
      </div>

      <div className="sl-epilogue">
        <p className="nm">Yononaka ／ CLAFT ・ KEEP ON</p>
        <p style={{ marginTop: '.6rem' }}>AIロボット社会、僕たちはどう生きるか ― 中高生との対話、実況中継</p>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;600;700;800&family=Zen+Kaku+Gothic+New:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap');

        html { scroll-behavior: smooth; }

        .sl-page {
          --mood: #3aa0d6;
          --mood-deep: #0c1430;
          --mood-text: color-mix(in srgb, var(--mood) 62%, white 38%);
          --ink: #f4f3f7;
          --dim: #9aa0b8;
          --bg: #070912;
          --trans: 1.1s cubic-bezier(.4,0,.2,1);

          position: relative;
          background: var(--bg);
          color: var(--ink);
          font-family: "Zen Kaku Gothic New", sans-serif;
          font-weight: 400;
          line-height: 1.85;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          transition: background var(--trans);
        }
        .sl-page * { box-sizing: border-box; }
        .sl-page .mincho { font-family: "Shippori Mincho", serif; }
        .sl-page .mono { font-family: "Space Mono", monospace; letter-spacing: .08em; }

        /* ===== 背景ステージ: sticky で「固定背景」を再現 =====
           このページは .site-main（container-type:inline-size の 480px 固定カラム）の
           内側に描画されるため、position:fixed は画面ではなくその箱に閉じ込められる。
           position:sticky + 負のマージンで、同じ「スクロールしても背景が残る」効果を
           コンテナの内側で正しく再現する。 */
        .sl-page .sl-stage { position: relative; }
        .sl-page .sl-bgwrap {
          position: sticky;
          top: 0;
          height: 100vh;
          margin-bottom: -100vh;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          transition: background var(--trans);
          background: radial-gradient(120% 90% at 50% 8%, color-mix(in srgb, var(--mood) 22%, transparent) 0%, transparent 55%), var(--bg);
        }
        .sl-page .grid {
          position: absolute; inset: 0; opacity: .16;
          background-image:
            linear-gradient(color-mix(in srgb, var(--mood) 16%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--mood) 16%, transparent) 1px, transparent 1px);
          background-size: 54px 54px;
          transition: background-image var(--trans), opacity var(--trans);
          -webkit-mask-image: radial-gradient(65% 55% at 50% 42%, transparent 0%, transparent 38%, #000 72%);
                  mask-image: radial-gradient(65% 55% at 50% 42%, transparent 0%, transparent 38%, #000 72%);
        }
        .sl-page .glow {
          position: absolute; left: 50%; top: 32%; width: 75vmin; height: 75vmin; transform: translate(-50%,-50%);
          border-radius: 50%; filter: blur(60px); opacity: .28;
          background: radial-gradient(circle, color-mix(in srgb, var(--mood) 55%, transparent), transparent 65%);
          transition: background var(--trans), opacity var(--trans);
        }
        .sl-page .sl-bgwrap.focus .grid { opacity: .34; }
        .sl-page .sl-bgwrap.focus .glow { opacity: .5; }
        .sl-page .sl-bgwrap.focus .mapsvg { opacity: .95; }

        .sl-page .mapsvg {
          position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);
          width: min(86cqi, 420px); height: auto; opacity: .55;
          transition: opacity var(--trans);
        }
        .sl-page .edge { stroke: color-mix(in srgb, var(--mood) 70%, #fff 0%); stroke-width: 1.2; opacity: 0;
          transition: opacity .9s ease, stroke var(--trans); }
        .sl-page .edge.lit { opacity: .55; }
        .sl-page .node circle { fill: var(--bg); stroke: #3a4060; stroke-width: 1.4; transition: stroke var(--trans), fill var(--trans); }
        .sl-page .node .pulse { fill: none; opacity: 0; }
        .sl-page .node text { fill: #5b6188; font-family: "Space Mono", monospace; font-size: 10px; transition: fill var(--trans); }
        .sl-page .node.lit circle { stroke: var(--mood); fill: color-mix(in srgb, var(--mood) 28%, var(--bg));
          filter: drop-shadow(0 0 8px color-mix(in srgb, var(--mood) 80%, transparent)); }
        .sl-page .node.lit text { fill: var(--ink); }
        @keyframes slPing { 0% { opacity: .6; r: 6; } 100% { opacity: 0; r: 26; } }
        .sl-page .node.lit .pulse { stroke: var(--mood); stroke-width: 1.5; animation: slPing 1.6s ease-out 1; }

        /* ===== content ===== */
        .sl-page .content { position: relative; z-index: 2; }
        .sl-page section {
          position: relative;
          min-height: 100vh; display: flex; flex-direction: column; justify-content: center;
          padding: 14vh 7cqi; max-width: 860px; margin: 0 auto;
        }
        /* 本文の裏だけ暗く沈めて、背景の格子や地図と競合しないようにする控えめなスクリム */
        .sl-page section::before {
          content: '';
          position: absolute;
          inset: -4vh -4cqi;
          z-index: -1;
          background: radial-gradient(65% 62% at 50% 50%, color-mix(in srgb, var(--bg) 60%, transparent) 0%, transparent 78%);
          pointer-events: none;
          transition: background var(--trans);
        }
        .sl-page .eyebrow { font-size: .72rem; color: var(--mood-text); text-transform: uppercase; margin-bottom: 1.4rem;
          transition: color var(--trans); display: inline-flex; align-items: center; gap: .6rem; }
        .sl-page .eyebrow::before { content: ''; width: 26px; height: 1px; background: var(--mood); transition: background var(--trans); }

        .sl-page .reveal { opacity: 0; transform: translateY(34px); transition: opacity 1s ease, transform 1s cubic-bezier(.2,.7,.2,1); }
        .sl-page .reveal.in { opacity: 1; transform: none; }
        .sl-page .reveal.d1 { transition-delay: .12s } .sl-page .reveal.d2 { transition-delay: .24s }
        .sl-page .reveal.d3 { transition-delay: .36s } .sl-page .reveal.d4 { transition-delay: .48s }

        /* hero */
        .sl-page #hero { position: relative; min-height: 100vh; justify-content: flex-end; padding-bottom: 16vh; }
        .sl-page #hero h1 { font-size: clamp(2.2rem,7cqi,4.6rem); font-weight: 800; line-height: 1.28; letter-spacing: .01em;
          text-wrap: balance; }
        .sl-page #hero h1 .q { color: var(--mood-text); transition: color var(--trans); }
        .sl-page #hero .sub { margin-top: 1.6rem; color: var(--dim); font-size: clamp(.85rem,2.4cqi,1rem); }
        .sl-page .scrollhint { position: absolute; bottom: 5vh; left: 50%; transform: translateX(-50%);
          color: var(--dim); font-size: .72rem; text-align: center; transition: opacity .4s ease; }
        .sl-page .scrollhint .hint-mouse { display: none; }
        @media (hover: hover) and (pointer: fine) {
          .sl-page .scrollhint .hint-touch { display: none; }
          .sl-page .scrollhint .hint-mouse { display: inline; }
        }
        .sl-page .scrollhint .arr { display: block; margin: .5rem auto 0; width: 1px; height: 42px;
          background: linear-gradient(to top, var(--mood), transparent); position: relative; overflow: hidden; }
        .sl-page .scrollhint .arr::after { content: ''; position: absolute; left: -2px; top: 0; width: 5px; height: 5px; border-radius: 50%;
          background: var(--mood); animation: slUp 2s ease-in-out infinite; }
        @keyframes slUp { 0% { top: 100%; opacity: 0 } 30% { opacity: 1 } 100% { top: -6px; opacity: 0 } }

        .sl-page .big { font-size: clamp(1.7rem,5.2cqi,3rem); font-weight: 700; line-height: 1.5; text-wrap: balance; }
        .sl-page .lead { font-size: clamp(1.05rem,3cqi,1.3rem); color: var(--ink); font-weight: 500; }
        .sl-page .muted { color: var(--dim); font-size: clamp(.92rem,2.6cqi,1.05rem); margin-top: 1.1rem; }
        .sl-page .mood-word { color: var(--mood-text); transition: color var(--trans); font-weight: 700; }

        /* mystery */
        .sl-page #mystery .frame { border: 1px solid color-mix(in srgb, var(--mood) 45%, transparent);
          border-radius: 18px; padding: clamp(1.6rem,5cqi,2.8rem); background: color-mix(in srgb, var(--mood) 7%, transparent);
          transition: border var(--trans), background var(--trans); backdrop-filter: blur(3px); }
        .sl-page #mystery .tag { font-size: .72rem; color: var(--mood-text); margin-bottom: 1rem; transition: color var(--trans); }

        /* ===== 第1回ハイライト ===== */
        .sl-page #highlight { max-width: 880px; }
        .sl-page .hl-head { font-size: clamp(1.9rem,6cqi,3rem); font-weight: 800; line-height: 1.3; text-wrap: balance; }
        .sl-page .hl-block { margin-top: clamp(3.4rem,10cqi,5.4rem); }
        .sl-page .hl-block .piece { color: var(--mood-text); font-size: .8rem; letter-spacing: .06em; margin-bottom: .7rem; transition: color var(--trans); }
        .sl-page .hl-block h3 { font-size: clamp(1.5rem,5cqi,2.4rem); font-weight: 700; line-height: 1.4; margin-bottom: 1.3rem; text-wrap: balance; }
        .sl-page .story { color: var(--dim); font-size: clamp(.94rem,2.7cqi,1.06rem); margin-top: 1.15rem; }
        .sl-page .story .em { color: var(--ink); font-weight: 500; }
        .sl-page .story .q { color: var(--mood-text); font-style: normal; transition: color var(--trans); }
        .sl-page .kicker { color: var(--ink); font-weight: 500; font-size: clamp(1.02rem,3cqi,1.18rem); margin-top: 1.4rem; line-height: 1.7; }

        /* participant voices */
        .sl-page .voices { display: flex; flex-wrap: wrap; gap: .7rem; margin: 1.5rem 0 .4rem; }
        .sl-page .voice { border: 1px solid color-mix(in srgb, var(--mood) 40%, transparent);
          border-radius: 100px; padding: .5rem 1.15rem; font-size: clamp(.85rem,2.4cqi,.98rem);
          color: var(--ink); background: color-mix(in srgb, var(--mood) 9%, transparent);
          transition: border var(--trans), background var(--trans); }

        /* menti screenshot placeholder */
        .sl-page .shot { margin-top: 1.8rem; border: 1px dashed color-mix(in srgb, var(--mood) 50%, transparent);
          border-radius: 16px; aspect-ratio: 16/9; width: 100%; overflow: hidden;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: .55rem; text-align: center;
          background: color-mix(in srgb, var(--mood) 5%, transparent); color: var(--dim);
          transition: border var(--trans), background var(--trans); }
        .sl-page .shot:has(img) { border-style: solid; }
        .sl-page .shot figcaption { display: flex; flex-direction: column; align-items: center; gap: .3rem; }
        .sl-page .shot .ico { font-size: 1.6rem; opacity: .55; letter-spacing: 0; }
        .sl-page .shot .lbl { font-size: .72rem; letter-spacing: .12em; }
        .sl-page .shot .hint { font-size: .72rem; letter-spacing: .06em; opacity: .55; }
        .sl-page .shot img { width: 100%; height: 100%; object-fit: cover; }

        /* archive links */
        .sl-page .archive { margin-top: clamp(3rem,8cqi,4.4rem); border-top: 1px solid color-mix(in srgb, var(--mood) 28%, transparent);
          padding-top: 2.2rem; transition: border var(--trans); }
        .sl-page .archive .lbl { font-size: .72rem; color: var(--mood-text); letter-spacing: .08em; margin-bottom: 1.2rem; transition: color var(--trans); }
        .sl-page .archive .note { color: var(--dim); font-size: .8rem; margin-top: 1.2rem; }

        /* journey cards */
        .sl-page .sess { display: flex; gap: clamp(1rem,4cqi,2rem); align-items: flex-start; transition: transform .3s ease; }
        .sl-page .sess:hover { transform: translateX(4px); }
        .sl-page .sess .no { font-size: clamp(2.4rem,9cqi,4.4rem); font-weight: 700; line-height: 1; color: var(--mood-text);
          transition: color var(--trans); flex-shrink: 0; opacity: .85; }
        .sl-page .sess .body h3 { font-size: clamp(1.3rem,4.4cqi,2rem); font-weight: 700; margin-bottom: .5rem;
          display: flex; align-items: center; flex-wrap: wrap; gap: .7rem; }
        .sl-page .sess .body .piece { color: var(--mood-text); font-size: .82rem; margin-bottom: .8rem; transition: color var(--trans); }
        .sl-page .sess .body p { color: var(--dim); font-size: clamp(.9rem,2.6cqi,1rem); }
        .sl-page .jlabel { font-size: .72rem; color: var(--dim); }
        .sl-page .flag { font-family: "Space Mono", monospace; font-size: .72rem; letter-spacing: .1em; padding: .26rem .75rem;
          border-radius: 100px; border: 1px solid var(--mood); color: var(--mood-text); transition: color var(--trans), border var(--trans);
          white-space: nowrap; align-self: center; }
        .sl-page .flag.done { background: var(--mood); color: var(--bg); }
        .sl-page .sess-sec.is-soon { opacity: .62; }
        @keyframes slDoneGlow {
          0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--mood) 55%, transparent); }
          70% { box-shadow: 0 0 0 12px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
        .sl-page .reveal.in .flag.done { animation: slDoneGlow 1.3s ease-out .3s 1; }

        /* reader / cta cards */
        .sl-page .card { border: 1px solid #23283f; border-radius: 18px; padding: clamp(1.4rem,4cqi,2.2rem);
          background: rgba(255,255,255,.02); }
        .sl-page .btn { display: inline-flex; align-items: center; gap: .6rem; margin-top: 1.4rem; padding: .95rem 1.7rem;
          border-radius: 100px; font-weight: 700; font-size: .95rem; text-decoration: none; border: 1px solid var(--mood);
          color: var(--bg); background: var(--mood); transition: transform .25s ease, background var(--trans), box-shadow .25s, color var(--trans); }
        .sl-page .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px color-mix(in srgb, var(--mood) 40%, transparent); }
        .sl-page .btn.ghost { background: transparent; color: var(--mood-text); }
        .sl-page .btn.ghost:hover { background: color-mix(in srgb, var(--mood) 12%, transparent); }
        .sl-page .ctas { display: flex; flex-wrap: wrap; gap: .9rem; }

        /* apply CTA */
        .sl-page .apply-card { border: 1px solid color-mix(in srgb, var(--mood) 48%, transparent);
          border-radius: 20px; padding: clamp(1.7rem,5cqi,2.8rem);
          background: color-mix(in srgb, var(--mood) 9%, transparent); backdrop-filter: blur(3px);
          transition: border var(--trans), background var(--trans); }
        .sl-page .specs { list-style: none; margin: 1.8rem 0 .4rem; display: grid; gap: .85rem; }
        .sl-page .specs li { display: flex; gap: 1.1rem; align-items: baseline; color: var(--ink); font-size: clamp(.92rem,2.6cqi,1.04rem); }
        .sl-page .specs .k { color: var(--mood-text); min-width: 4.6rem; font-size: .72rem; letter-spacing: .08em;
          font-family: "Space Mono", monospace; flex-shrink: 0; transition: color var(--trans); padding-top: .15rem; }
        .sl-page .specs .v small { display: block; color: var(--dim); font-size: .86rem; font-weight: 400; margin-top: .2rem; line-height: 1.7; }

        .sl-page .finale h2 { font-size: clamp(1.9rem,6.4cqi,3.4rem); font-weight: 800; line-height: 1.35; text-wrap: balance; }
        .sl-page .sl-epilogue { position: relative; z-index: 2; text-align: center; padding: 6vh 7cqi 9vh; color: var(--dim); font-size: .75rem; border-top: 1px solid #181c2e; }
        .sl-page .sl-epilogue .nm { color: var(--ink); font-weight: 700; letter-spacing: .04em; }

        @media (prefers-reduced-motion: reduce) {
          .sl-page .reveal { opacity: 1 !important; transform: none !important; transition: none }
          .sl-page .scrollhint .arr::after { animation: none }
          .sl-page .node.lit .pulse { animation: none }
          .sl-page .reveal.in .flag.done { animation: none }
        }
      `}</style>
    </div>
  )
}
