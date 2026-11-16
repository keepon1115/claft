import type { CSSProperties } from "react";
import Link from "next/link";
import { SectionTitle } from "@/components/craft/SectionTitle";
import { ArrowRightDoodle } from "@/components/craft/HandDrawn";
import { FESTA_HERO_IMG } from "../FestaContent";

/* ============================================================
   スクールフェスタ 2026秋（11/29）詳細ページ
   - /festa（常設）の「詳細はこちら」の行き先。会場パネルのQRもここ
   - 構成：概要 → 3つのイベント → なんでも展示会 → パネル展示 → 申し込み
   - 文言の元：参加申込フォームと「企画のくわしい内容」PDF（2026/11/16時点）
   - PC の中央480pxカラムでもスマホと同じ見た目になるよう、ビューポート分岐（sm:/lg:）は使わない
============================================================ */

const APPLY_URL = "https://forms.gle/6oY7gJT1XhenFQEz7";
const EXHIBITION_HREF = "/futurecraft/Exhibition";
const STORY_HREF = "/student-story";

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

/* パネル展示：スクール配信（2026年11月）で使った4枚 */
const slides: { src: string; alt: string }[] = [
  { src: "/assets/festa/2611/sonosaki-1.webp", alt: "好きなことを探究する、その先に… ゲーム・プログラミング・絵・野球の扉の前に立つ子ども" },
  { src: "/assets/festa/2611/sonosaki-2.webp", alt: "ゲームが好きな子は心理学とものづくりへ、野球のピッチングが好きな子は体の仕組みへ。好きなことは学びの入口" },
  { src: "/assets/festa/2611/sonosaki-3.webp", alt: "好きは入口のひとつ。そこから先は、出会いや経験で広がっていく" },
  { src: "/assets/festa/2611/sonosaki-4.webp", alt: "スクール生8人が、いま取り組んでいること" },
];

/* パネル展示：めくり扉（会場では段ボールの扉。Webでは開閉式） */
const doors: { q: string; a: string; body: string[]; more?: { label: string; href: string } }[] = [
  {
    q: "好きなことばかりで、大丈夫？",
    a: "好きは、学びの入口。",
    body: [
      "ゲームが好きな子は、「なんでこんなにやめられへんのやろ？」と調べるうちに、人がやる気になる仕組みに出会います。野球が好きな子は、速く見える球のひみつを追いかけて、体のつくりにたどり着きます。",
      "本人は好きなことの話をしているつもり。でも、そこからちゃんと学びが広がっています。",
    ],
    more: { label: "関連記事を読む", href: "/blog/suki-wa-manabi-no-iriguchi" },
  },
  {
    q: "AIの時代に、何を身につけたらいい？",
    a: "「なんか面白そう」で、動き出す力。",
    body: [
      "対話の授業Yononakaで、中高生に聞いてみました。「どこまでAIに任せたい？」。計算はAIにおまかせ。でも「面白そうと思って始めること」と「本当にそう？と考えること」は、自分でやりたいという声が集まりました。",
      "AIは、頼まれたことを上手にこなします。「やってみたい」と言い出すのは、人のほうです。夢中になっている時間に、その力は育っています。",
    ],
    more: { label: "関連記事を読む", href: "/blog/ai-jidai-kodomo-chikara-yononaka" },
  },
  {
    q: "すぐ飽きて、続かないんです",
    a: "好きは、変わっていい。",
    body: [
      "ロボットに夢中だった子が、ゲームづくりを始める。電車が好きな子が、マイクラで線路を敷きはじめる。飽きたように見えて、前の「好き」はちゃんと次に持ちこされています。",
      "ひとつ終わって、次が始まるまでには、何もしていないように見える時間もあります。それは、次の入口を探している途中かもしれません。",
    ],
    more: { label: "関連記事を読む", href: "/blog/career-theory-bridges" },
  },
  {
    q: "それ、将来なんの役に立つの？",
    a: "意味は、やり続けた後からついてくる。",
    body: [
      "今は、わからなくて大丈夫です。キャリアの研究では、仕事や生き方の転機の多くは、計画になかった偶然から生まれると言われています。",
      "その偶然をつかむのは、気になったら近づいてみる、うまくいかなくてももう少し続けてみる、という、夢中な子がいつもやっていることです。好きを追いかけた点は、いつか線になります。",
    ],
    more: { label: "関連記事を読む", href: "/blog/career-theory-krumboltz" },
  },
];

function ApplyButton() {
  return (
    <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="craft-sticker">
      参加を申し込む
      <ArrowRightDoodle width={24} />
    </a>
  );
}

export default function Festa2611Content() {
  return (
    <main className="nd-page nd-page--autumn">
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
            作品の展示コーナーもあります。
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

          <div className="nd-cta reveal">
            <ApplyButton />
          </div>
          <p className="nd-note reveal">
            イベントは事前申込・先着順です。
            <br />
            定員を超えた場合は、キャンセル待ちになります。
          </p>
        </div>
      </section>

      {/* ========== 3つのイベント ========== */}
      <section className="nd-section">
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
          <div className="nd-cta reveal">
            <ApplyButton />
          </div>
        </div>
      </section>

      {/* ========== なんでも展示会 ========== */}
      <section className="nd-section">
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
            <p className="nd-what-body">
              作品のとなりには、つくったメンバーの歩みを紹介する「メンバーストーリー」も置いています。
            </p>
          </div>

          <div className="nd-cta reveal" style={{ marginTop: 22 }}>
            <Link href={EXHIBITION_HREF} className="craft-sticker">
              なんでも展示会のWeb開催ページはこちら
              <ArrowRightDoodle width={24} />
            </Link>
            <Link href={STORY_HREF} className="craft-sticker craft-sticker--ghost">
              メンバーストーリーを読む
              <ArrowRightDoodle width={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== パネル展示 ========== */}
      <section className="nd-section" id="sonosaki">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="PANEL ・ パネル展示" variant={3} lineColor="var(--pink)">
              好きなことを探究する、
              <br />
              その先に…
            </SectionTitle>
            <p className="nd-section-lead reveal">
              「好きなことばかりで大丈夫？」
              <br />
              そう感じたことのある方へ。
              <br />
              会場のパネル展示を、ここでも読めます。
            </p>
          </div>

          <div className="fs-slides">
            {slides.map((s, i) => (
              <figure
                key={s.src}
                className="fs-slide craft-photo craft-tilt reveal"
                style={{ "--rot": i % 2 === 0 ? "-0.6deg" : "0.6deg" } as CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.alt} width={1280} height={720} loading="lazy" />
              </figure>
            ))}
          </div>

          <p className="nd-note reveal" style={{ marginTop: 40 }}>
            気になる扉を、ひらいてみてください ↓
          </p>
          <div className="fs-doors">
            {doors.map((d) => (
              <details key={d.q} className="fs-door craft-paper reveal">
                <summary className="fs-door-q">
                  <span>{d.q}</span>
                  <span className="fs-door-hint" aria-hidden="true">ひらく</span>
                </summary>
                <div className="fs-door-inner">
                  <p className="fs-door-a">{d.a}</p>
                  {d.body.map((p) => (
                    <p key={p} className="fs-door-body">{p}</p>
                  ))}
                  {d.more && (
                    <Link href={d.more.href} className="fs-door-more">
                      {d.more.label} →
                    </Link>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Final CTA ========== */}
      <section className="nd-section nd-section--last">
        <div className="container">
          <div
            className="nd-final craft-paper craft-paper--warm craft-tilt reveal"
            style={{ "--rot": "-0.6deg" } as CSSProperties}
          >
            <span className="craft-tape craft-tape--cream" aria-hidden="true" />
            <h2 className="nd-final-title craft-misprint">11月29日、会場で待っています。</h2>
            <p className="nd-final-body">
              イベントへの参加は先着順です。
              <br />
              ご家族やお友達と、気軽に来てください。
            </p>
            <div className="nd-cta">
              <ApplyButton />
              <Link href="/festa" className="craft-sticker craft-sticker--ghost">
                スクールフェスタとは
                <ArrowRightDoodle width={24} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
