import type { CSSProperties } from "react";
import Link from "next/link";
import { SectionTitle } from "@/components/craft/SectionTitle";
import { ArrowRightDoodle } from "@/components/craft/HandDrawn";
import { DoodleIcon, type DoodleIconName } from "@/components/craft/DoodleIcon";

/* ============================================================
   ロボット発表会 ランディングページ（在校生・保護者向け）
   - クラフトデザインシステム準拠（craft-* 部品＋ なんでも発表会と同じ nd-* レイヤー）
   - 年3回開催（4月・8月・12月）／2026年8月のテーマ「未来のお仕事ロボット」
============================================================ */

// メインビジュアルは public/assets/futurecraft/robot-presentation-hero.jpg に配置してください（1600×900 / 16:9 推奨）
const HERO_IMG = "/assets/futurecraft/robot-presentation-hero.png";

// はじめかたのヒント（8月のテーマ本文から抽出）
const starters: { icon: DoodleIconName; title: string; desc: string; accentRgb: string; rot: string }[] = [
  {
    icon: "wrench",
    title: "いまのロボットを改造する",
    desc: "授業で作っているロボットをベースにすれば、改造しやすいかも？",
    accentRgb: "var(--green-rgb)",
    rot: "-0.6deg",
  },
  {
    icon: "bulb",
    title: "ゼロからオリジナルをつくる",
    desc: "もちろん、ゼロから自分のアイデアでオリジナルロボットを作るのも大歓迎です！",
    accentRgb: "224 158 22",
    rot: "0.5deg",
  },
  {
    icon: "compass",
    title: "いまの仕事から考える",
    desc: "「この仕事って将来、どうなってるんかな？」「これ不便やけど、ロボット使ったらもっとラクにできるんちゃうかな？」——そんな疑問から。",
    accentRgb: "var(--pink-rgb)",
    rot: "-0.4deg",
  },
];

// この発表会で育つもの
const growths: { no: string; title: string; desc: string; accentRgb: string; rot: string }[] = [
  {
    no: "01",
    title: "完成させる力",
    desc: "今まで学んだ知識や技術を活かして完成を目指します。完成までのプロセスを通して、最後までやりきる大変さと達成感を経験します。",
    accentRgb: "var(--brand-rgb)",
    rot: "-0.6deg",
  },
  {
    no: "02",
    title: "アイデアと工夫から学ぶ",
    desc: "発表作品を見ることで、参加者のアイデアや工夫から学ぶ機会にしています。",
    accentRgb: "var(--green-rgb)",
    rot: "0.5deg",
  },
  {
    no: "03",
    title: "思いを伝える力",
    desc: "コメントを書くことで、作品を作った人に思いを伝える機会にしています。",
    accentRgb: "var(--pink-rgb)",
    rot: "-0.4deg",
  },
];

function WorksButton() {
  return (
    <Link href="/futurecraft/RobotPresentation2608" className="craft-sticker">
      8月の作品一覧を見る
      <ArrowRightDoodle width={24} />
    </Link>
  );
}

function PastButton() {
  return (
    <a
      href="https://www.keeponlearning.fun/robot"
      target="_blank"
      rel="noopener noreferrer"
      className="craft-sticker craft-sticker--ghost"
    >
      過去の発表会を見る
      <ArrowRightDoodle width={24} />
    </a>
  );
}

export default function RobotPresentationContent() {
  return (
    <main className="nd-page">
      {/* ========== Hero ========== */}
      <section className="nd-hero">
        <div className="container">
          <p className="nd-hero-eyebrow reveal">
            <span className="craft-label">スクール内イベント ・ 年3回開催</span>
          </p>

          <h1 className="nd-hero-title craft-misprint reveal">ロボット発表会</h1>

          <div
            className="nd-hero-photo craft-photo craft-tilt reveal"
            style={{ "--rot": "-1.2deg" } as CSSProperties}
          >
            <span className="craft-tape craft-tape--cream" aria-hidden="true" />
            <img
              src={HERO_IMG}
              alt="ロボット発表会のメインビジュアル"
              width={640}
              height={360}
            />
          </div>

          <p className="nd-hero-copy reveal">
            スクール内で年3回開催しており、<br />その都度変わるテーマに沿った<br />
            <strong>オリジナルロボット</strong>を作ります。
          </p>

          <div
            className="nd-hero-info craft-paper craft-tilt reveal"
            style={{ "--rot": "0.6deg" } as CSSProperties}
          >
            <div className="nd-info-row">
              <span className="nd-info-label">THEME</span>
              <p className="nd-info-value">未来のお仕事ロボット（2026年8月）</p>
            </div>
            <div className="nd-info-row">
              <span className="nd-info-label">締切</span>
              <p className="nd-info-value">2026.8.31（月）</p>
            </div>
            <div className="nd-info-row">
              <span className="nd-info-label">CYCLE</span>
              <p className="nd-info-value">年3回開催（4月・8月・12月）</p>
            </div>
          </div>

          <div className="nd-cta reveal">
            <WorksButton />
            <PastButton />
          </div>
        </div>
      </section>

      {/* ========== ロボット発表会とは ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="ABOUT ・ ロボット発表会とは" variant={1} lineColor="var(--brand)">
              オリジナルをつくって、
              <br />
              自分の言葉でつたえる。
            </SectionTitle>
          </div>

          <div
            className="nd-what craft-paper craft-paper--warm craft-tilt reveal"
            style={{ "--rot": "0.5deg" } as CSSProperties}
          >
            <span className="craft-tape craft-tape--cream" aria-hidden="true" />
            <p className="nd-what-tag">
              <DoodleIcon name="wrench" size={22} />
              ROBOT HAPPYOUKAI
            </p>
            <p className="nd-what-body">
              ロボット発表会は、スクール内で年3回開催しており、その都度変わるテーマに沿ったオリジナルロボットを作ります。<br />
              今まで学んだ知識や技術を活かして完成を目指します。<br />完成までのプロセスを通して、最後までやりきる大変さと達成感を経験します。
            </p>
            <p className="nd-what-body">
              また、発表作品を見ることで、参加者のアイデアや工夫から学んだり、コメントを書くことで思いを伝える機会にしています。
            </p>
          </div>
        </div>
      </section>

      {/* ========== この発表会で育つもの ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="GROWTH ・ 育まれるもの" variant={2} lineColor="var(--green)">
              作って、見せて、
              <br />
              受け取って、また作る。
            </SectionTitle>
          </div>

          <div className="nd-num-list">
            {growths.map((g, i) => (
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
                <span className="nd-num-no" aria-hidden="true">
                  {g.no}
                </span>
                <div>
                  <h3 className="nd-num-title">{g.title}</h3>
                  <p className="nd-num-body">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 8月のテーマ ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="AUGUST THEME ・ 8月のテーマ" variant={3} lineColor="var(--pink)">
              『未来のお仕事ロボット』
            </SectionTitle>
          </div>

          <div
            className="nd-what craft-paper craft-tilt reveal"
            style={{ "--rot": "-0.5deg" } as CSSProperties}
          >
            <p className="nd-what-body">
              8月のロボット発表会、テーマは『未来のお仕事ロボット』です。<br />普段テキストで作っているロボットは、困っている人を助けるためのものだったり、工場で実際に使われているものがモデルになっていたりします。なので、授業で作っているロボットをベースにすれば改造しやすいかも？もちろん、ゼロから自分のアイデアでオリジナルロボットを作るのも大歓迎です！
            </p>
            <p className="nd-what-body">
              「未来のお仕事」というテーマですが、いまの仕事をイメージしても大丈夫。<br />「この仕事って将来、どうなってるんかな？」「これ不便やけど、ロボット使ったらもっとラクにできるんちゃうかな？」といった疑問から、新しいお仕事ロボットを作ってください。<br />世の中にはたくさんの仕事があるので、興味のある仕事を調べてみてもおもしろいと思います。
            </p>
          </div>

          <div className="nd-themes">
            {starters.map((s, i) => (
              <div
                key={s.title}
                className="nd-theme craft-paper craft-tilt craft-lift reveal"
                style={
                  {
                    "--rot": s.rot,
                    "--accent-rgb": s.accentRgb,
                    transitionDelay: `${i * 70}ms`,
                  } as CSSProperties
                }
              >
                <span className="nd-theme-icon" aria-hidden="true">
                  <DoodleIcon name={s.icon} size={32} />
                </span>
                <div>
                  <h3 className="nd-theme-title">{s.title}</h3>
                  <p className="nd-theme-body">{s.desc}</p>
                </div>
              </div>
            ))}
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
            <h2 className="nd-final-title craft-misprint">自分だけのお仕事ロボットを、作ってみよう！</h2>
            <p className="nd-final-body">
              発表の締切は8/31（月）です。<br />参加者には、みんなからのコメントの入った参加賞状が贈られます。<br />
              これまで授業で学んだことを使って、自分だけのお仕事ロボットを作ってみましょう！
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
