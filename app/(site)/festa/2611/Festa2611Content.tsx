import type { CSSProperties } from "react";
import Link from "next/link";
import { SectionTitle } from "@/components/craft/SectionTitle";
import { ArrowRightDoodle } from "@/components/craft/HandDrawn";
import { FESTA_HERO_IMG } from "../FestaContent";
import PanelSection from "./PanelSection";
import SheetSection from "./SheetSection";

/* ============================================================
   スクールフェスタ 2026秋（11/29）詳細ページ
   - /festa（常設）の「詳細はこちら」の行き先。会場パネルのQRもここ（当日、来場者に共有する）
   - 構成：概要 → 当日のようす（Coming Soon） → 3つのイベント → なんでも展示会
           → パネル展示（PanelSection） → PR動画と展示シート（SheetSection） → 締め（あなたの「やりたいこと」は？）
   - 前半（概要〜展示会）はフェスタの秋カラー（.nd-page--autumn）、
     後半（パネル・PR動画・締め）は会場の印刷物と同じ CLAFT の色。--brand は上書きせずそのまま使う
   - ★フェスタ後（12月上旬）の更新でやること：
       1) 「当日のようす」を写真とレポートに差し替える（エンディングムービーは曲の都合でネットに載せない）
       2) ヒーローの申し込みリンクを消す
   - 文言の元：参加申込フォームと「企画のくわしい内容」PDF（2026/11/16時点）、パネル12枚、展示シート
   - PC の中央480pxカラムでもスマホと同じ見た目になるよう、ビューポート分岐（sm:/lg:）は使わない
============================================================ */

const APPLY_URL = "https://forms.gle/6oY7gJT1XhenFQEz7";
const EXHIBITION_2611_HREF = "/futurecraft/Exhibition2611";
// 締めの「ひとこと」フォーム（回答の一部を12月上旬のレポートで紹介する）
const WANT_FORM_URL = "https://forms.gle/JFTRjxSceBZGFfsx9";
const DOC_URL = "https://canva.link/rql9j4bxr943nia";
const LINE_URL = "https://lin.ee/tQYk8yo";

const toc: { href: string; label: string }[] = [
  { href: "#report", label: "当日のようす" },
  { href: "#events", label: "3つのイベント" },
  { href: "#exhibition", label: "なんでも展示会" },
  { href: "#panels", label: "パネル展示" },
  { href: "#movie", label: "PR動画" },
];

type EventInfo = {
  id: string;
  tagline: string;
  name: string;
  lead: string;
  stepsTitle: string;
  steps: { title: string; desc: string }[];
  point: string;
  facts: { label: string; value: string[] }[];
  accentRgb: string;
  rot: string;
};

const events: EventInfo[] = [
  {
    id: "superball",
    tagline: "日本中が舞台！",
    name: "スーパーボールパーティー",
    lead: "日本地図がそのまま、すごろくの盤に。北海道から沖縄まで旅をしながらスーパーボールを集めて、その土地ならではの「おたから」をねらうチーム対戦ゲームです。",
    stepsTitle: "あそびかた",
    steps: [
      { title: "おたからマスを目指して進もう", desc: "サイコロをふって、日本地図のマスを進みます。止まったマスによって、スーパーボールが増えたり、減ったり。" },
      { title: "おたからマスで、ミニゲーム！", desc: "集めたスーパーボールを使ってミニゲームに挑戦。ロボットやブロックを使ったミニゲームが4種類ほど待っています。" },
      { title: "クリアしたら、おたからGET！", desc: "クリアすると、その都道府県の特産品が「おたから」として手に入ります（ゲームの中のおたからです）。" },
    ],
    point: "はねる？ ころがる？ どこに止まる？ 最後まで何が起きるかわからないドキドキが見どころ。遊びながら、日本中の特産品にもくわしくなれます。",
    facts: [
      { label: "時間", value: ["① 10:15〜11:10", "② 11:15〜12:10", "③ 13:20〜14:15", "（1回 約55分）"] },
      { label: "対象", value: ["全年齢（小さな子から大人まで）"] },
      { label: "定員", value: ["1回 4チームまで（1チーム6人まで）"] },
    ],
    accentRgb: "var(--pink-rgb)",
    rot: "-0.5deg",
  },
  {
    id: "mission",
    tagline: "〜日本のなぞをときあかせ〜",
    name: "ミッション〇〇",
    lead: "きみたちは、たんていチーム。ぬすまれた先生の工作品を取り返すため、5つのチームで力を合わせて、日本にかくされたナゾと暗号にいどみます。",
    stepsTitle: "ゲームの流れ",
    steps: [
      { title: "大事件！ 先生の工作品がぬすまれた", desc: "現場には、工作品を取り返すための暗号がのこされていました。でも、このままでは読めません。" },
      { title: "チームでナゾをとき、キーワードを集めよう", desc: "チームごとに、日本についてのナゾが出されます。工作をしながらナゾをすべてとくと、キーワードがもらえます。" },
      { title: "5つのキーワードで、さいごの暗号をとけ！", desc: "5チームのキーワードを持ちよって、さいごの暗号にチャレンジ。工作品を取り返せるかな？" },
    ],
    point: "スクイーズやテープ風船など、チームで5つの作品をつくりながら、クイズやなぞときにもチャレンジ。つくった作品は持って帰れます。ナゾのテーマは、当日までひみつ！",
    facts: [
      { label: "時間", value: ["14:30〜15:45（約75分）"] },
      { label: "対象", value: ["どなたでも（目安：小学1年生から）"] },
      { label: "定員", value: ["5チーム（1チーム5人まで）"] },
    ],
    accentRgb: "var(--brand-rgb)",
    rot: "0.5deg",
  },
  {
    id: "minigame",
    tagline: "2チームに分かれて、3つのゲームで勝負！",
    name: "グループ対抗ミニゲーム",
    lead: "入口で2チームに分かれて、3つの対決ゲームでポイントをかせぎます。合計ポイントが多いチームの勝ち。勝ったチームには景品もあります。",
    stepsTitle: "3つのゲーム",
    steps: [
      { title: "大量ババ抜き", desc: "ババがたくさん入った、特別なトランプでババ抜き。ルールはいつもと同じでも、いつもと違う作戦が生まれるかも？" },
      { title: "紐引きUNO", desc: "いつものUNOに、オリジナルの効果カードを追加。ドローで引かされても、「紐付きカード」で一発逆転があるかも？" },
      { title: "関西弁禁止ゲーム", desc: "相手のNGワード（「なんでやねん」「知らんがな」など）を、先に言わせたら勝ち。トークテーマは給食や席替えなど学校のことなので、初対面でも安心です。" },
    ],
    point: "カードゲームもおしゃべりも、チームのポイントになります。小さな子から大人まで、いっしょに楽しめます。",
    facts: [
      { label: "時間", value: ["10:15〜14:20", "（12:15〜13:30はランチタイム）"] },
      { label: "対象", value: ["全年齢（小さな子から大人まで）"] },
    ],
    accentRgb: "var(--green-rgb)",
    rot: "-0.4deg",
  },
];


export default function Festa2611Content() {
  return (
    <main className="nd-page">
      <div className="nd-page--autumn">
        {/* ========== Hero ========== */}
        <section className="nd-hero">
          <div className="container">
            <p className="nd-hero-eyebrow reveal">
              <span className="craft-label">26秋 ・ スクールフェスタ</span>
            </p>

            <h1 className="nd-hero-title craft-misprint reveal">スクールフェスタ</h1>

            <div
              className="nd-hero-photo craft-photo craft-tilt reveal"
              style={{ "--rot": "-1.2deg" } as CSSProperties}
            >
              <span className="craft-tape craft-tape--cream" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={FESTA_HERO_IMG} alt="秋のスクールフェスタ 2026年11月29日（日）" width={640} height={360} />
            </div>

            <p className="nd-hero-copy reveal">
              スクール生が企画した<strong>3つのイベント</strong>で、
              <br />
              1日わいわい遊ぼう。
              <br />
              作品やパネルの展示も、このページで見られます。
            </p>

            <div
              className="nd-hero-info craft-paper craft-tilt reveal"
              style={{ "--rot": "0.6deg" } as CSSProperties}
            >
              <div className="nd-info-row">
                <span className="nd-info-label">開催</span>
                <p className="nd-info-value">2026.11.29（日）</p>
              </div>
              <div className="nd-info-row">
                <span className="nd-info-label">会場</span>
                <p className="nd-info-value">
                  エジソンアカデミー本校
                  <br />
                  <small>アーテック5階</small>
                </p>
              </div>
              <div className="nd-info-row">
                <span className="nd-info-label">対象</span>
                <p className="nd-info-value">
                  スクール生・ご家族・お友達
                  <br />
                  <small>※未就学のお子さまは保護者同伴で</small>
                </p>
              </div>
              <div className="nd-info-row">
                <span className="nd-info-label">参加費</span>
                <p className="nd-info-value">無料</p>
              </div>
            </div>

            {/* ★フェスタ後の更新で消す */}
            <p className="nd-note reveal">
              イベントは事前申込・先着順です。
              <br />
              <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="fs-textlink">
                参加の申し込みはこちら
              </a>
            </p>

            <nav className="fs-toc reveal" aria-label="このページの目次">
              {toc.map((t) => (
                <a key={t.href} href={t.href} className="nd-chip">
                  {t.label}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* ========== 当日のようす（Coming Soon） ========== */}
        {/* ★12月上旬に、当日の写真とレポートに差し替える */}
        <section className="nd-section nd-course-anchor" id="report">
          <div className="container">
            <div
              className="nd-what fs-soon craft-paper craft-tilt reveal"
              style={{ "--rot": "-0.5deg" } as CSSProperties}
            >
              <span className="craft-tape craft-tape--cream" aria-hidden="true" />
              <p className="nd-what-tag">COMING SOON</p>
              <h2 className="nd-what-title">当日のようすは、あとで。</h2>
              <p className="nd-what-body">
                当日の写真とレポートを、12月上旬にこのページに載せます。少し時間をおいて、また見に来てください。
              </p>
            </div>
          </div>
        </section>

        {/* ========== 3つのイベント ========== */}
        <section className="nd-section nd-course-anchor" id="events">
          <div className="container">
            <div className="nd-section-head">
              <SectionTitle eyebrow="EVENTS ・ 3つのイベント" variant={1} lineColor="var(--brand)">
                スクール生がつくった、
                <br />
                3つのイベント。
              </SectionTitle>
              <p className="nd-section-lead reveal">ぜんぶ参加することもできます。</p>
            </div>

            <div className="fs-events">
              {events.map((ev) => (
                <article
                  key={ev.id}
                  id={ev.id}
                  className="fs-event craft-paper craft-tilt reveal"
                  style={{ "--rot": ev.rot, "--accent-rgb": ev.accentRgb } as CSSProperties}
                >
                  <span className="craft-tape craft-tape--cream" aria-hidden="true" />
                  <p className="fs-event-tagline">{ev.tagline}</p>
                  <h3 className="fs-event-name">{ev.name}</h3>
                  <p className="fs-event-lead">{ev.lead}</p>

                  <p className="fs-event-sub">{ev.stepsTitle}</p>
                  <ol className="fs-steps">
                    {ev.steps.map((s, i) => (
                      <li key={s.title} className="fs-step">
                        <span className="fs-step-no" aria-hidden="true">{i + 1}</span>
                        <div>
                          <p className="fs-step-title">{s.title}</p>
                          <p className="fs-step-desc">{s.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <p className="fs-event-sub">ここがおもしろい！</p>
                  <p className="fs-event-point">{ev.point}</p>

                  <dl className="fs-facts">
                    {ev.facts.map((f) => (
                      <div key={f.label} className="fs-fact">
                        <dt>{f.label}</dt>
                        <dd>
                          {f.value.map((v) => (
                            <span key={v}>{v}</span>
                          ))}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>

            <p className="nd-note reveal" style={{ marginTop: 26 }}>
              どのイベントも、参加無料・もちものなしです。
            </p>
          </div>
        </section>

        {/* ========== なんでも展示会 ========== */}
        <section className="nd-section nd-course-anchor" id="exhibition">
          <div className="container">
            <div className="nd-section-head">
              <SectionTitle eyebrow="EXHIBITION ・ なんでも展示会" variant={2} lineColor="var(--green)">
                スクール生の「好き」が、
                <br />
                ずらりと並びます。
              </SectionTitle>
            </div>

            <div
              className="nd-what craft-paper craft-paper--warm craft-tilt reveal"
              style={{ "--rot": "0.5deg" } as CSSProperties}
            >
              <span className="craft-tape craft-tape--cream" aria-hidden="true" />
              <p className="nd-what-body">
                会場には、スクール生がいま、それぞれに取り組んでいる作品の展示コーナーがあります。イベントの合間に、ぜひのぞいてみてください。
              </p>
            </div>

            <div className="nd-cta reveal" style={{ marginTop: 22 }}>
              <Link href={EXHIBITION_2611_HREF} className="craft-sticker">
                11月の作品一覧を見る
                <ArrowRightDoodle width={24} />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ========== パネル展示 ========== */}
      <PanelSection />

      {/* ========== PR動画と展示シート ========== */}
      <SheetSection />

      {/* ========== 締め：あなたの「やりたいこと」は？ ========== */}
      <section className="nd-section nd-section--last nd-course-anchor" id="want">
        <div className="container">
          <div
            className="nd-final fs-final craft-paper craft-paper--warm craft-tilt reveal"
            style={{ "--rot": "-0.6deg" } as CSSProperties}
          >
            <span className="craft-tape craft-tape--cream" aria-hidden="true" />
            <h2 className="nd-final-title craft-misprint">
              あなたの
              <br />
              「<span className="fs-sh-brand">やりたいこと</span>」は、
              <br />
              なんですか？
            </h2>
            <p className="nd-final-body">
              展示を見て、思いうかんだことがあれば、ひとことで聞かせてください。お子さんでも、大人の方でも。
            </p>
            <div className="nd-cta">
              <a href={WANT_FORM_URL} target="_blank" rel="noopener noreferrer" className="craft-sticker">
                ひとこと書いてみる
                <ArrowRightDoodle width={24} />
              </a>
              <p className="nd-cta-note">
                いただいた声の一部は、12月上旬のレポートで紹介します。
                <br />
                お名前は出しません。
              </p>
            </div>

            <hr className="fs-final-split" />

            <p className="fs-final-more">CLAFTのこと、もっと知りたい方へ</p>
            <div className="nd-cta" style={{ marginTop: 14 }}>
              <Link href="/" className="craft-sticker craft-sticker--ghost">
                ホームページ
                <ArrowRightDoodle width={24} />
              </Link>
              <a href={DOC_URL} target="_blank" rel="noopener noreferrer" className="craft-sticker craft-sticker--ghost">
                くわしい資料
                <ArrowRightDoodle width={24} />
              </a>
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="craft-sticker craft-sticker--line">
                LINEで問い合わせ
                <ArrowRightDoodle width={24} />
              </a>
            </div>
          </div>

          <p className="nd-note reveal" style={{ marginTop: 28 }}>
            <Link href="/festa" className="fs-textlink">
              スクールフェスタとは
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
