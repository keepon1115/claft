import type { CSSProperties } from "react";
import Link from "next/link";
import { SectionTitle } from "@/components/craft/SectionTitle";
import { ArrowRightDoodle } from "@/components/craft/HandDrawn";
import { DoodleIcon, type DoodleIconName } from "@/components/craft/DoodleIcon";

/* ============================================================
   なんでも展示会 ランディングページ（在校生・保護者向け）
   - ロボット発表会（RobotPresentationContent）と同じ nd-* 構成
   - 年2回開催（3月・11月）／締切 2026.11.5（木）※過ぎても提出OK
   - PC の中央480pxカラムでもスマホと同じ見た目になるよう、ビューポート分岐（sm:/lg:）は使わない
============================================================ */

// メインビジュアルは public/assets/futurecraft/nandemo-exhibition-hero.png（16:9）。作品例の写真は仮素材（Unsplash）
const HERO_IMG = "/assets/futurecraft/nandemo-exhibition-hero.png";
const PAST_URL = "https://keepon.my.canva.site/tenzikai2026";
const WORKS_HREF = "/futurecraft/Exhibition2611";
const LINE_URL = "https://lin.ee/wcsFK9A";

// 作品例
const examples: { src: string; title: string; memo: string; rot: string }[] = [
  { src: "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=600&q=80", title: "ペットの紹介", memo: "名前・好きな食べもの・かわいいポイントを大公開！", rot: "-1.2deg" },
  { src: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=600&q=80", title: "マイクラの作品", memo: "建てた城、つくった街、こだわりの仕掛けを動画で。", rot: "1deg" },
  { src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80", title: "一人バンド演奏", memo: "ギターでもピアノでも、おうちで撮った演奏MVを。", rot: "-0.8deg" },
  { src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&q=80", title: "ミュージックビデオ", memo: "スマホで撮って編集！世界にひとつの作品に。", rot: "1.2deg" },
  { src: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&q=80", title: "旅行の思い出", memo: "行った場所、食べたもの、見つけたものを写真で。", rot: "-1deg" },
  { src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80", title: "工作・自由研究", memo: "紙や粘土でつくった力作を飾ろう。", rot: "0.8deg" },
];

// 参加のながれ（6ステップ）
const flow: { icon: DoodleIconName; title: string; desc: string; accentRgb: string; rot: string; line?: boolean }[] = [
  { icon: "pencil", title: "つくる・撮る", desc: "好きなものを動画にしたり、紙や工作にしたり。スマホで撮ったそのままでOKです。", accentRgb: "var(--brand-rgb)", rot: "-0.6deg" },
  { icon: "talk", title: "LINEで送る ／ スタッフに渡す", desc: "データはキープオンのLINEへ。紙や作品は教室でスタッフに渡してください。", accentRgb: "var(--green-rgb)", rot: "0.5deg", line: true },
  { icon: "heart", title: "作品一覧に載る ＆ コメントが届く", desc: "11月の作品一覧にあなたの作品が並び、見た人からの応援コメントが届きます。", accentRgb: "var(--pink-rgb)", rot: "-0.4deg" },
  { icon: "search", title: "他の作品に触れる", desc: "ほかの人の「好き」をのぞいてみよう。「こんな世界があったのか！」に出会えます。", accentRgb: "var(--brand-rgb)", rot: "0.6deg" },
  { icon: "bulb", title: "自分のアイデアが広がる・深まる", desc: "人の作品から刺激をもらって、自分の「好き」がもっと広がり、深まっていきます。", accentRgb: "var(--green-rgb)", rot: "-0.5deg" },
  { icon: "rocket", title: "また次の展示会へ", desc: "展示会は年2回（3月・11月）。次はどんな「好き」を持ってきますか？", accentRgb: "var(--pink-rgb)", rot: "0.4deg" },
];

// この展示会で育つもの
const goodPoints: { no: string; title: string; desc: string; accentRgb: string; rot: string }[] = [
  { no: "01", title: "発表が苦手でも、だいじょうぶ", desc: "人前で話すのがニガテでも安心。展示物を送るだけで、もう参加できています。", accentRgb: "var(--brand-rgb)", rot: "-0.6deg" },
  { no: "02", title: "誰かの「好き」が、自分の発見になる", desc: "いろんな人の展示を見ると、「こんな世界があったのか！」という出会いが生まれます。", accentRgb: "var(--green-rgb)", rot: "0.5deg" },
  { no: "03", title: "失敗を恐れない、はじめの一歩", desc: "上手いも下手もありません。出した、見せた、それだけで大きな前進です。", accentRgb: "var(--pink-rgb)", rot: "-0.4deg" },
  { no: "04", title: "準備が、自分を知る時間になる", desc: "どう伝えようか考えるうちに「自分はこれが好きだったんだ」と気づくはず。", accentRgb: "var(--brand-rgb)", rot: "0.5deg" },
];

// 迷ったときのお題
const ideas = ["今年から始めたこと", "がんばったこと", "食べられるようになったもの", "行ってみた場所", "見つけた「すごい！」", "なんでもOK"];
const okList = ["動画", "紙に書いたもの", "工作", "デジタル作品", "コレクション展示", "生野菜（OKです！）"];
const ngList = ["大きすぎて動かせないもの", "危険な武器", "生き物", "生肉", "生魚"];

function WorksButton() {
  return (
    <Link href={WORKS_HREF} className="craft-sticker">
      11月の作品一覧を見る
      <ArrowRightDoodle width={24} />
    </Link>
  );
}

function PastButton() {
  return (
    <a
      href={PAST_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="craft-sticker craft-sticker--ghost"
    >
      前回の展示を見る
      <ArrowRightDoodle width={24} />
    </a>
  );
}

export default function NandemoTenjikaiContent() {
  return (
    <main className="nd-page nd-page--autumn">
      {/* ========== Hero ========== */}
      <section className="nd-hero">
        <div className="container">
          <p className="nd-hero-eyebrow reveal">
            <span className="craft-label">スクール内イベント ・ 年2回開催</span>
          </p>

          <h1 className="nd-hero-title craft-misprint reveal">なんでも展示会</h1>

          <div
            className="nd-hero-photo craft-photo craft-tilt reveal"
            style={{ "--rot": "-1.2deg" } as CSSProperties}
          >
            <span className="craft-tape craft-tape--cream" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_IMG} alt="好きを語る力は、これからの力。なんでも展示会 作品募集中" width={640} height={360} />
          </div>

          <p className="nd-hero-copy reveal">
            あなたの<strong>「好き」</strong>を、世界にひらこう。<br />
            動画でも、紙でも、工作でも ── <br />ぜんぶ、主役になる場所です。
          </p>

          <div
            className="nd-hero-info craft-paper craft-tilt reveal"
            style={{ "--rot": "0.6deg" } as CSSProperties}
          >
            <div className="nd-info-row">
              <span className="nd-info-label">締切</span>
              <p className="nd-info-value">
                2026.11.5（木）
                <br />
                <small>※過ぎても提出OK</small>
              </p>
            </div>
            <div className="nd-info-row">
              <span className="nd-info-label">CYCLE</span>
              <p className="nd-info-value">年2回開催（3月・11月）</p>
            </div>
          </div>

          <div className="nd-cta reveal">
            <WorksButton />
            <PastButton />
          </div>
        </div>
      </section>

      {/* ========== なんでも展示会とは ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="ABOUT ・ なんでも展示会とは" variant={1} lineColor="var(--brand)">
              「なんでも」って、
              <br />
              ほんとに、なんでも。
            </SectionTitle>
          </div>

          <div
            className="nd-what craft-paper craft-paper--warm craft-tilt reveal"
            style={{ "--rot": "0.5deg" } as CSSProperties}
          >
            <span className="craft-tape craft-tape--cream" aria-hidden="true" />
            <p className="nd-what-tag">
              <DoodleIcon name="sparkle" size={22} />
              NANDEMO TENJIKAI
            </p>
            <p className="nd-what-body">
              自分の好きなモノ、得意なこと、自由研究、おもしろい遊び、旅行の思い出 ── なんでも自由に伝えられる展示会です。
            </p>
            <p className="nd-what-body">
              「うまく話せるかな」「上手につくれたかな」なんて気にしなくて大丈夫。あなたが「これ見てほしい！」と思ったものが、もう立派な展示物です。
            </p>
            <p className="nd-what-body">
              ペットのウサギ紹介、マイクラの作品、ミュージックビデオ、ひとりバンドの演奏 ── <strong>ぜんぶ「展示」になる。</strong>
            </p>
          </div>

          <div className="nd-cta reveal" style={{ marginTop: 22 }}>
            <Link href="/futurecraft/Presentation" className="craft-sticker craft-sticker--ghost">
              「なんでも発表会」もあるよ
              <ArrowRightDoodle width={24} />
            </Link>
          </div>
          <p className="nd-note reveal">↑ 展示会の発表バージョンはこちら</p>

          <p className="nd-note reveal" style={{ marginTop: 40 }}>たとえば、こんなのが展示されました ↓</p>
          <div className="ex-examples">
            {examples.map((ex, i) => (
              <figure
                key={ex.title}
                className="ex-example craft-photo craft-tilt reveal"
                style={{ "--rot": ex.rot, transitionDelay: `${i * 60}ms` } as CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ex.src} alt={ex.title} loading="lazy" />
                <figcaption>
                  <strong>{ex.title}</strong>
                  <span>{ex.memo}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 参加のながれ ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="HOW TO JOIN ・ 参加のながれ" variant={2} lineColor="var(--green)">
              つくって、送って、
              <br />
              また次へ。
            </SectionTitle>
          </div>

          <ol className="ex-flow">
            {flow.map((s, i) => (
              <li
                key={s.title}
                className="ex-flow-item craft-paper craft-tilt reveal"
                style={
                  {
                    "--rot": s.rot,
                    "--accent-rgb": s.accentRgb,
                    transitionDelay: `${i * 60}ms`,
                  } as CSSProperties
                }
              >
                <span className="ex-flow-no" aria-hidden="true">{i + 1}</span>
                <span className="nd-theme-icon" aria-hidden="true">
                  <DoodleIcon name={s.icon} size={32} />
                </span>
                <div>
                  <h3 className="nd-theme-title">{s.title}</h3>
                  <p className="nd-theme-body">{s.desc}</p>
                  {s.line && (
                    <a
                      href={LINE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="craft-sticker ex-flow-line"
                    >
                      キープオンのLINEで送る
                      <ArrowRightDoodle width={22} />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <p className="nd-cycle-again reveal" style={{ marginTop: 18 }}>↺ そして、また「つくる」へ</p>
        </div>
      </section>

      {/* ========== いいところ ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="WHY IT IS GOOD ・ いいところ" variant={3} lineColor="var(--pink)">
              見せること、準備すること、
              <br />
              それ自体が「学び」。
            </SectionTitle>
          </div>

          <div className="nd-num-list">
            {goodPoints.map((g, i) => (
              <div
                key={g.no}
                className="nd-num-item craft-paper craft-tilt reveal"
                style={
                  {
                    "--rot": g.rot,
                    "--accent-rgb": g.accentRgb,
                    transitionDelay: `${i * 80}ms`,
                  } as CSSProperties
                }
              >
                <span className="nd-num-no" aria-hidden="true">{g.no}</span>
                <div>
                  <h3 className="nd-num-title">{g.title}</h3>
                  <p className="nd-num-body">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="nd-note reveal" style={{ marginTop: 28 }}>
            「どういう順番で話そうか」と考えることで、
            <br />
            「自分はこれが好きだったんだ」と見つめ直す時間になる。
          </p>
        </div>
      </section>

      {/* ========== 迷ったら ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="STUCK? START HERE ・ 迷ったら" variant={1} lineColor="var(--cream)">
              何を展示するか
              <br />
              迷ったら…
            </SectionTitle>
            <p className="nd-section-lead reveal">
              今年（今学年）の<strong>一番の思い出</strong>や、<strong>振り返り</strong>を作ってみよう。
              毎日の中に、誰かに見せたい瞬間がきっとあるはず。
            </p>
          </div>

          <ul className="ex-ideas">
            {ideas.map((t, i) => (
              <li
                key={t}
                className="ex-idea craft-paper craft-tilt reveal"
                style={{ "--rot": `${i % 2 === 0 ? -1 : 1}deg`, transitionDelay: `${i * 50}ms` } as CSSProperties}
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========== RULES ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="RULES ・ 展示のルール" variant={2} lineColor="var(--brand)">
              展示できるもの／
              <br />
              できないもの
            </SectionTitle>
          </div>

          <div className="nd-themes">
            <div
              className="ex-rule craft-paper craft-tilt reveal"
              style={{ "--rot": "-0.5deg", "--accent-rgb": "var(--green-rgb)" } as CSSProperties}
            >
              <h3 className="ex-rule-title">
                <span className="ex-rule-stamp">OK</span>基本、なんでも！
              </h3>
              <ul className="ex-rule-list">
                {okList.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <div
              className="ex-rule craft-paper craft-tilt reveal"
              style={{ "--rot": "0.5deg", "--accent-rgb": "var(--pink-rgb)" } as CSSProperties}
            >
              <h3 className="ex-rule-title">
                <span className="ex-rule-stamp">NG</span>これは展示できません
              </h3>
              <ul className="ex-rule-list">
                {ngList.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="nd-note" style={{ margin: "14px 0 0", textAlign: "left" }}>※ 生野菜は OK です！</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="nd-section nd-section--last">
        <div className="container">
          <div
            className="nd-final craft-paper craft-paper--warm craft-tilt reveal"
            style={{ "--rot": "-0.6deg" } as CSSProperties}
          >
            <span className="craft-tape craft-tape--cream" aria-hidden="true" />
            <h2 className="nd-final-title craft-misprint">さあ、あなたの「好き」を、ひらこう。</h2>
            <p className="nd-final-body">
              提出の締切は11/5（木）です。<br />締切を過ぎても提出OKなので、できたらいつでも送ってください。<br />
              あなたの展示、楽しみに待っています。 — Keep On
            </p>
            <div className="nd-cta">
              <WorksButton />
              <PastButton />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
