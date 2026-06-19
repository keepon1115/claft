import type { CSSProperties } from "react";
import { SectionTitle } from "@/components/craft/SectionTitle";
import {
  Underline,
  ArrowDownDoodle,
  ArrowRightDoodle,
  SparkleDoodle,
} from "@/components/craft/HandDrawn";
import { DoodleIcon, type DoodleIconName } from "@/components/craft/DoodleIcon";

/* ============================================================
   なんでも発表会 ランディングページ（保護者向け）
   - クラフトデザインシステム準拠（craft-* 部品＋ nd-* レイヤー）
   - 2026.7.26(日) 単独開催 @ アーテック5F フリースペース
============================================================ */

const FORM_URL = "https://forms.gle/x1rpfm8RBBWCZvSq5";
const IMG = "/assets/images/journal/2026-06";

// 浮遊フキダシ → 紙片チップ
const bubbles: { text: string; accentRgb: string; rot: string }[] = [
  { text: "ゲームのこと", accentRgb: "var(--pink-rgb)", rot: "-2deg" },
  { text: "おもちゃ自慢", accentRgb: "var(--brand-rgb)", rot: "1.4deg" },
  { text: "自作の作品", accentRgb: "var(--green-rgb)", rot: "-1deg" },
  { text: "マニアな趣味", accentRgb: "var(--violet-rgb)", rot: "2deg" },
];

// なぜ発表が苦手なのか
const reasons: { no: string; title: string; desc: string; accentRgb: string; rot: string }[] = [
  {
    no: "01",
    title: "テーマが決められている",
    desc: "学校の発表は先生が決めたテーマばかり。「自分から話したい！」と思える機会は意外と少ないものです。",
    accentRgb: "var(--pink-rgb)",
    rot: "-0.6deg",
  },
  {
    no: "02",
    title: "失敗するのが怖い",
    desc: "間違えたら恥ずかしい。クラスでいじられるかも…。その不安が、一歩を踏み出せない理由になっています。",
    accentRgb: "var(--violet-rgb)",
    rot: "0.5deg",
  },
  {
    no: "03",
    title: "伝え方がわからない",
    desc: "話したいことはあるのに、どう構成すればいいのかわからない。これは大人になっても続く悩みです。",
    accentRgb: "var(--brand-rgb)",
    rot: "-0.4deg",
  },
];

// こんなテーマで発表できる
const themes: { icon: DoodleIconName; title: string; desc: string; accentRgb: string; rot: string }[] = [
  {
    icon: "gamepad",
    title: "ハマってるゲーム",
    desc: "今夢中になっているゲームの魅力を、思う存分プレゼン。",
    accentRgb: "var(--violet-rgb)",
    rot: "-0.7deg",
  },
  {
    icon: "wrench",
    title: "自作のゲーム・作品",
    desc: "自分で作ったものを紹介して、みんなに遊んでもらおう。",
    accentRgb: "var(--green-rgb)",
    rot: "0.6deg",
  },
  {
    icon: "heart",
    title: "推しのおもちゃ",
    desc: "コレクションへの愛を熱く語る時間。共感者がきっといる。",
    accentRgb: "var(--pink-rgb)",
    rot: "-0.5deg",
  },
  {
    icon: "book",
    title: "歴史上の人物",
    desc: "ある先輩は「福沢諭吉」をテーマに大盛り上がり。",
    accentRgb: "224 158 22",
    rot: "0.7deg",
  },
  {
    icon: "leaf",
    title: "有機野菜のはなし",
    desc: "保護者の方が畑で育てた野菜を持ち込んで発表＆販売も。",
    accentRgb: "var(--green-rgb)",
    rot: "-0.6deg",
  },
  {
    icon: "bulb",
    title: "なんでもアリ！",
    desc: "あなたの“好き”は、それだけで立派なテーマになる。",
    accentRgb: "var(--brand-rgb)",
    rot: "0.5deg",
  },
];

// 発表で得られるもの
const benefits: { no: string; title: string; desc: string; accentRgb: string; rot: string }[] = [
  {
    no: "01",
    title: "“好き”が深まる",
    desc: "誰かに伝えるために準備するうちに、自分の好きなことや得意なことを、もっと深く知れる。",
    accentRgb: "224 158 22",
    rot: "-0.6deg",
  },
  {
    no: "02",
    title: "“伝える力”が育つ",
    desc: "「どういう順番で話そうか」と考えるうちに、構成力・表現力が自然と身についていく。",
    accentRgb: "var(--green-rgb)",
    rot: "0.5deg",
  },
  {
    no: "03",
    title: "“仲間”が見つかる",
    desc: "「俺もそれ好き！」と身を乗り出してくれる仲間との出会い。新しい発見が、毎回ある。",
    accentRgb: "var(--pink-rgb)",
    rot: "-0.4deg",
  },
];

// おうちでの後押し
const tips: { icon: DoodleIconName; title: string; desc: string; accentRgb: string; rot: string }[] = [
  {
    icon: "talk",
    title: "「何が好き？」を聞いてみる",
    desc: "答えを引き出そうとしなくて大丈夫。ただ興味を向けてあげるだけで、子どもの“語りたい”スイッチが入ります。",
    accentRgb: "var(--pink-rgb)",
    rot: "-0.5deg",
  },
  {
    icon: "clock",
    title: "完成を“急かさない”",
    desc: "作り切る前に、手や口を出しすぎないこと。「発表する日がある」という締め切りが、自然と背中を押してくれます。",
    accentRgb: "224 158 22",
    rot: "0.5deg",
  },
  {
    icon: "sparkle",
    title: "当日は、大きな拍手で",
    desc: "いちばんの栄養は、身近な人の「おもしろい！」。結果よりも、語りきったこと自体を一緒に喜んであげてください。",
    accentRgb: "var(--green-rgb)",
    rot: "-0.4deg",
  },
];

// 声
const voices: { tag: string; text: string; accentRgb: string; rot: string }[] = [
  {
    tag: "スクール生",
    text: "はじめは緊張したけど、好きなゲームのことだから話せた。次はもっと面白く伝えたい！",
    accentRgb: "var(--pink-rgb)",
    rot: "-0.5deg",
  },
  {
    tag: "保護者",
    text: "畑の有機野菜について発表させてもらいました。子どもたちの真剣な眼差しに、こちらが学ばされる時間でした。",
    accentRgb: "var(--green-rgb)",
    rot: "0.5deg",
  },
  {
    tag: "スタッフ",
    text: "去年は『福沢諭吉』をテーマに発表。最後はみんなで「諭吉、諭吉」と盛り上がる、忘れられない時間に。",
    accentRgb: "224 158 22",
    rot: "-0.4deg",
  },
];

// 当日のスケジュール
const schedule: { time: string; label: string; tag: "staff" | "main" | "break" | "other" }[] = [
  { time: "10:00 – 10:30", label: "つきのイベント（つきのさんのなんでも発表会）", tag: "staff" },
  { time: "10:30 – 12:00", label: "なんでも発表会（10分 × 9人）", tag: "main" },
  { time: "12:00 – 13:00", label: "昼休み", tag: "break" },
  { time: "13:00 – 15:30", label: "なんでも発表会（10分 × 9人）", tag: "main" },
  { time: "15:30 – 16:00", label: "PLAY CLAFT 意見交換会", tag: "other" },
  { time: "16:00 – 16:30", label: "あおいイベント（あおいさんのなんでも発表会）", tag: "staff" },
];

// 過去の発表会
const pastEvents: { date: string; label: string; url: string }[] = [
  { date: "2025.07", label: "2025年 夏", url: "https://www.keeponlearning.fun/nandemo2025summer" },
  { date: "2025.03", label: "2025年 春", url: "https://www.keeponlearning.fun/nandemo2025" },
  { date: "2024.07", label: "2024年 夏　※録画あり", url: "https://www.keeponlearning.fun/nandemo2024" },
];

function ApplyButton() {
  return (
    <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="craft-sticker">
      発表を申し込む
      <ArrowRightDoodle width={24} />
    </a>
  );
}

export default function NandemoClient() {
  return (
    <main className="nd-page">
      {/* ========== Hero ========== */}
      <section className="nd-hero">
        <div className="container">
          <p className="nd-hero-eyebrow reveal">
            <span className="craft-label">恒例イベント</span>
          </p>

          <h1 className="nd-hero-title craft-misprint reveal">
            好きなことを、
            <br />
            <span className="nd-hero-title-line">
              好きなだけ。
              <Underline variant={1} className="nd-hero-underline craft-draw" />
            </span>
          </h1>

          <div
            className="nd-hero-photo craft-photo craft-tilt reveal"
            style={{ "--rot": "-1.2deg" } as CSSProperties}
          >
            <span className="craft-tape craft-tape--cream" aria-hidden="true" />
            <img
              src={`${IMG}/info-nandemo.jpg`}
              alt="なんでも発表会のメインビジュアル（ステージに立つ子どものイラスト）"
              width={640}
              height={360}
            />
          </div>

          <div className="nd-bubbles reveal">
            {bubbles.map((b) => (
              <span
                key={b.text}
                className="nd-bubble"
                style={{ "--accent-rgb": b.accentRgb, "--rot": b.rot } as CSSProperties}
              >
                {b.text}
              </span>
            ))}
          </div>

          <p className="nd-hero-copy reveal">
            ゲームも、おもちゃも、自作の作品も。
            <br />
            自分の<strong>“好き”</strong>を堂々と語れる、
            <br />
            年齢も内容も自由なステージへようこそ。
          </p>

          <div
            className="nd-hero-info craft-paper craft-tilt reveal"
            style={{ "--rot": "0.6deg" } as CSSProperties}
          >
            <div className="nd-info-row">
              <span className="nd-info-label">DATE</span>
              <p className="nd-info-value">2026.7.26（日）</p>
            </div>
            <div className="nd-info-row">
              <span className="nd-info-label">TIME</span>
              <p className="nd-info-value">10:00 – 16:30</p>
            </div>
            <div className="nd-info-row">
              <span className="nd-info-label">PLACE</span>
              <p className="nd-info-value">アーテック5F フリースペース</p>
            </div>
          </div>

          <div className="nd-cta reveal">
            <ApplyButton />
            <p className="nd-cta-note">観覧は申込不要・出入り自由。当日ぜひ会場へ。</p>
          </div>

          <div className="nd-scroll" aria-hidden="true">
            <ArrowDownDoodle width={30} className="craft-draw craft-draw--auto" />
          </div>
        </div>
      </section>

      {/* ========== なぜ発表が苦手なのか ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="ISSUE ・ 課題" variant={1} lineColor="var(--cream)">
              “人前で話すこと”、
              <br />
              なぜ苦手なんだろう？
            </SectionTitle>
            <p className="lead nd-section-lead">
              小中学生だけでなく、大人になっても「発表が苦手」という人はとても多い。
              その理由は、緊張感だけじゃありません。
            </p>
          </div>

          <div className="nd-num-list">
            {reasons.map((r, i) => (
              <div
                key={r.no}
                className="nd-num-item craft-paper craft-tilt reveal"
                style={
                  {
                    "--rot": r.rot,
                    "--accent-rgb": r.accentRgb,
                    transitionDelay: `${i * 80}ms`,
                  } as CSSProperties
                }
              >
                <span className="nd-num-no" aria-hidden="true">
                  {r.no}
                </span>
                <div>
                  <h3 className="nd-num-title">{r.title}</h3>
                  <p className="nd-num-body">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== なんでも発表会とは ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="SOLUTION ・ 解決" variant={2} lineColor="var(--brand)">
              それなら、
              <br />
              こんな発表会はどう？
            </SectionTitle>
          </div>

          <div
            className="nd-what craft-paper craft-paper--warm craft-tilt reveal"
            style={{ "--rot": "0.7deg" } as CSSProperties}
          >
            <span className="craft-tape craft-tape--cream" aria-hidden="true" />
            <p className="nd-what-tag">
              <DoodleIcon name="mic" size={22} />
              NANDEMO HAPPYOUKAI
            </p>
            <h3 className="nd-what-title craft-misprint--cream">なんでも発表会</h3>
            <p className="nd-what-body">
              その名のとおり、<strong>自分の好きなことを“何でも”発表していい</strong>会。
              <br />
              ジャンルに縛られず、なんでも自由に表現しあう、キープオン恒例の催しです。
            </p>

            <div className="nd-chips">
              <span className="nd-chip" style={{ "--accent-rgb": "var(--pink-rgb)" } as CSSProperties}>
                <DoodleIcon name="heart" size={18} />
                自由なテーマ
              </span>
              <span className="nd-chip" style={{ "--accent-rgb": "var(--green-rgb)" } as CSSProperties}>
                <DoodleIcon name="family" size={18} />
                年齢ミックス
              </span>
              <span className="nd-chip" style={{ "--accent-rgb": "224 158 22" } as CSSProperties}>
                <DoodleIcon name="sparkle" size={18} />
                失敗を笑わない
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== こんなテーマで発表できる ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="THEMES ・ 発表テーマ" variant={3} lineColor="var(--pink)">
              たとえば、こんなこと。
            </SectionTitle>
            <p className="lead nd-section-lead">
              “話したいこと”があれば、それでOK。
              <br />
              実際にこれまで発表されてきた、ほんの一例です。
            </p>
          </div>

          <div className="nd-themes">
            {themes.map((t, i) => (
              <div
                key={t.title}
                className="nd-theme craft-paper craft-tilt craft-lift reveal"
                style={
                  {
                    "--rot": t.rot,
                    "--accent-rgb": t.accentRgb,
                    transitionDelay: `${i * 70}ms`,
                  } as CSSProperties
                }
              >
                <span className="nd-theme-icon" aria-hidden="true">
                  <DoodleIcon name={t.icon} size={32} />
                </span>
                <div>
                  <h3 className="nd-theme-title">{t.title}</h3>
                  <p className="nd-theme-body">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 創って伝える学びのサイクル ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="CYCLE ・ 学びのサイクル" variant={1} lineColor="var(--green)">
              「創って伝える」で、
              <br />
              学びはぐるぐる回り出す。
            </SectionTitle>
            <p className="lead nd-section-lead">
              キープオンのスクールでは、ロボットをはじめ「創って伝える」ことで学びを回しています。
              それは、シンプルな<strong>3つのビート</strong>でできています。
            </p>
          </div>

          <div className="nd-cycle reveal" role="img" aria-label="つくる、発表する、反応をもらうのサイクル">
            <span className="nd-cycle-chip" style={{ "--rot": "-1deg" } as CSSProperties}>
              <span className="nd-cycle-label">つくる</span>
              <span className="nd-cycle-sub">没頭する・作り切る</span>
            </span>
            <ArrowRightDoodle width={26} className="nd-cycle-arrow craft-draw" />
            <span
              className="nd-cycle-chip nd-cycle-chip--hl"
              style={{ "--rot": "0.8deg", "--accent-rgb": "224 158 22" } as CSSProperties}
            >
              <span className="nd-cycle-label">発表する</span>
              <span className="nd-cycle-sub">外にひらく</span>
            </span>
            <ArrowRightDoodle width={26} className="nd-cycle-arrow craft-draw" />
            <span className="nd-cycle-chip" style={{ "--rot": "-0.7deg" } as CSSProperties}>
              <span className="nd-cycle-label">反応をもらう</span>
              <span className="nd-cycle-sub">共感・驚き・助言</span>
            </span>
          </div>
          <p className="nd-cycle-again reveal">↺ そして、また「つくる」へ</p>

          <div className="nd-cycle-body reveal">
            <p>
              ポイントは、真ん中の<strong className="nd-accent">「発表する」</strong>です。
            </p>
            <p>
              没頭してつくるのが大好きな子は、たくさんいます。でも、発表という場がないと、つくることが延々と続いて、なかなか「作り切る・完成させる」ところまで行き着きません。
              <strong>
                「最後までやり切ろう」と気持ちで励ますのではなく、“誰かに見せる日がある”という構造そのものが、作り切る力を引き出してくれる。
              </strong>
              私たちはここを大事にしています。
            </p>
            <p>
              そして発表には、もうひとつの役割があります。自分の作ったものを外にひらくと、共感・驚き・アドバイスといった反応が返ってくる。それが次の「やってみたい」を生み、また「つくる」へ戻っていく。──
              つまり発表は、サイクルが一周閉じる場所であり、次の一周を強く回し始める場所でもあるのです。
            </p>
          </div>

          <div
            className="nd-spiral craft-paper craft-paper--warm craft-tilt reveal"
            style={{ "--rot": "-0.5deg" } as CSSProperties}
          >
            <span className="craft-tape craft-tape--green craft-tape--tl" aria-hidden="true" />
            <h3 className="nd-spiral-title">このサイクルを回すと、どこへ行くのか</h3>
            <p className="nd-spiral-body">
              ループを回すうちに、「ただ好きで没頭していたこと」が「人より少し得意なこと」になる。
              その得意が、やがて誰かの困りごとを解決したり、誰かを喜ばせたりして、いつしか「仕事になる」。
              発表は、その一段ずつを上げていく転換点です。
            </p>

            <div className="nd-steps">
              <span className="nd-step-chip">好き</span>
              <ArrowRightDoodle width={22} className="nd-cycle-arrow" />
              <span className="nd-step-chip">得意</span>
              <span className="nd-step-x">×（困ったを解決・喜ばせる）</span>
              <ArrowRightDoodle width={22} className="nd-cycle-arrow" />
              <span className="nd-step-chip nd-step-chip--em">仕事になる</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 発表で得られるもの ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="BENEFITS ・ 育まれるもの" variant={2} lineColor="var(--violet)">
              発表は、
              <br />
              自分を見つめ直す時間。
            </SectionTitle>
          </div>

          <div className="nd-num-list">
            {benefits.map((b, i) => (
              <div
                key={b.no}
                className="nd-num-item craft-paper craft-tilt reveal"
                style={
                  {
                    "--rot": b.rot,
                    "--accent-rgb": b.accentRgb,
                    transitionDelay: `${i * 80}ms`,
                  } as CSSProperties
                }
              >
                <span className="nd-num-no" aria-hidden="true">
                  {b.no}
                </span>
                <div>
                  <h3 className="nd-num-title">{b.title}</h3>
                  <p className="nd-num-body">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== サポート体制 ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="SUPPORT ・ 安心サポート" variant={3} lineColor="var(--cream)">
              「準備、どうしよう…」
              <br />
              そこは、頼ってください。
            </SectionTitle>
            <p className="lead nd-section-lead">
              「資料の作り方がわからない」「どう話せば伝わるか不安」——
              そんな声にしっかり応えられるよう、キープオンのスタッフがサポートします。
            </p>
          </div>

          <div className="nd-themes">
            <div
              className="nd-theme craft-paper craft-tilt reveal"
              style={{ "--rot": "-0.5deg", "--accent-rgb": "224 158 22" } as CSSProperties}
            >
              <span className="nd-theme-icon" aria-hidden="true">
                <DoodleIcon name="mic" size={32} />
              </span>
              <div>
                <h3 className="nd-theme-title">プレゼン全国大会の経験者がサポート</h3>
                <p className="nd-theme-body">
                  プレゼン全国大会・関西大会への出場経験を持つスタッフが、基本から丁寧にお伝えします。
                </p>
              </div>
            </div>
            <div
              className="nd-theme craft-paper craft-tilt reveal"
              style={{ "--rot": "0.5deg", "--accent-rgb": "var(--pink-rgb)", transitionDelay: "80ms" } as CSSProperties}
            >
              <span className="nd-theme-icon" aria-hidden="true">
                <DoodleIcon name="family" size={32} />
              </span>
              <div>
                <h3 className="nd-theme-title">失敗を笑わない安全な空間</h3>
                <p className="nd-theme-body">
                  発表の“第一歩”を、失敗を恐れずに踏み出せる場所。聞き手もあたたかく受け止めます。
                </p>
              </div>
            </div>
          </div>

          <p className="nd-note reveal">※ ここで身につけた力は、学校での発表にもきっと活かせます。</p>
        </div>
      </section>

      {/* ========== おうちでの後押し（保護者向け） ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="FOR PARENTS ・ おうちでの後押し" variant={1} lineColor="var(--pink)">
              おうちでできる、
              <br />
              3つの後押し。
            </SectionTitle>
            <p className="lead nd-section-lead">
              特別な準備はいりません。ほんの少しの関わり方で、子どもの“好き”は驚くほど伸びていきます。
            </p>
          </div>

          <div className="nd-themes">
            {tips.map((t, i) => (
              <div
                key={t.title}
                className="nd-theme craft-paper craft-tilt reveal"
                style={
                  {
                    "--rot": t.rot,
                    "--accent-rgb": t.accentRgb,
                    transitionDelay: `${i * 80}ms`,
                  } as CSSProperties
                }
              >
                <span className="nd-theme-icon" aria-hidden="true">
                  <DoodleIcon name={t.icon} size={32} />
                </span>
                <div>
                  <h3 className="nd-theme-title">{t.title}</h3>
                  <p className="nd-theme-body">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="nd-cheer reveal">
            <span className="nd-cheer-chip">
              <DoodleIcon name="heart" size={20} />
              いちばんの応援団は、おうちの人。
            </span>
          </div>
        </div>
      </section>

      {/* ========== 声 / これまでの発表 ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="VOICES ・ これまでの発表" variant={2} lineColor="var(--brand)">
              子どもも、大人も。
              <br />
              みんなのステージ。
            </SectionTitle>
            <p className="lead nd-section-lead">
              スクール生だけでなく、保護者の方やスタッフも発表者に。
              <br />
              幅広い年齢の人が「好きなこと」を持ち寄る場所です。
            </p>
          </div>

          <div
            className="nd-voices-photo craft-photo craft-tilt reveal"
            style={{ "--rot": "1deg" } as CSSProperties}
          >
            <span className="craft-tape craft-tape--pink" aria-hidden="true" />
            <img
              src="/assets/futurecraft/present_02.jpg"
              alt="いろんな“好き”を持ち寄って発表する子どもたちのイラスト"
              width={1920}
              height={1080}
            />
          </div>

          <div className="nd-voices">
            {voices.map((v, i) => (
              <div
                key={v.tag}
                className="nd-voice craft-paper craft-paper--ruled craft-tilt reveal"
                style={
                  {
                    "--rot": v.rot,
                    "--accent-rgb": v.accentRgb,
                    transitionDelay: `${i * 80}ms`,
                  } as CSSProperties
                }
              >
                <span className="nd-voice-tag">{v.tag}</span>
                <p className="nd-voice-text">“ {v.text} ”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 開催概要 ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="INFORMATION ・ 開催概要" variant={3} lineColor="var(--cream)">
              当日のスケジュール。
            </SectionTitle>
          </div>

          <div className="nd-facts">
            <div
              className="nd-fact craft-paper craft-tilt reveal"
              style={{ "--rot": "-0.5deg", "--accent-rgb": "224 158 22" } as CSSProperties}
            >
              <span className="craft-tape craft-tape--cream craft-tape--tl" aria-hidden="true" />
              <span className="nd-fact-label">DATE</span>
              <p className="nd-fact-main">2026年7月26日（日）</p>
              <p className="nd-fact-sub">10:00 – 16:30</p>
            </div>
            <div
              className="nd-fact craft-paper craft-tilt reveal"
              style={{ "--rot": "0.5deg", "--accent-rgb": "var(--brand-rgb)", transitionDelay: "80ms" } as CSSProperties}
            >
              <span className="craft-tape craft-tape--tr" aria-hidden="true" />
              <span className="nd-fact-label">PLACE</span>
              <p className="nd-fact-main">アーテック5F フリースペース</p>
              <p className="nd-fact-sub">いつものスクールの場所です</p>
            </div>
          </div>

          <div
            className="nd-timetable craft-paper reveal"
            style={{ "--rot": "0deg" } as CSSProperties}
          >
            {schedule.map((s) => (
              <div key={`${s.time}-${s.label}`} className={`nd-tt-row${s.tag === "break" ? " nd-tt-row--break" : ""}`}>
                <span className="nd-tt-time">{s.time}</span>
                <span className="nd-tt-label">
                  {s.label}
                  {s.tag === "other" && (
                    <span className="nd-tag" style={{ "--accent-rgb": "var(--brand-rgb)" } as CSSProperties}>
                      その他イベント
                    </span>
                  )}
                  {s.tag === "staff" && (
                    <span className="nd-tag" style={{ "--accent-rgb": "var(--violet-rgb)" } as CSSProperties}>
                      スタッフのイベント
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
          <p className="nd-tt-note reveal">※ 時間配分は仮です。人数・内容により前後する場合があります。</p>

          <div className="nd-sides">
            <div
              className="nd-side craft-paper craft-tilt reveal"
              style={{ "--rot": "-0.5deg" } as CSSProperties}
            >
              <span className="nd-tag" style={{ "--accent-rgb": "var(--brand-rgb)" } as CSSProperties}>
                その他イベント
              </span>
              <h3 className="nd-side-title">PLAY CLAFT 意見交換会</h3>
              <p className="nd-side-body">
                秋のスクールフェスタで行うイベントを、みんなで企画・相談する時間です。アイデアを持ち寄って一緒に深めます。
              </p>
            </div>
            <div
              className="nd-side craft-paper craft-tilt reveal"
              style={{ "--rot": "0.5deg", transitionDelay: "80ms" } as CSSProperties}
            >
              <span className="nd-tag" style={{ "--accent-rgb": "var(--violet-rgb)" } as CSSProperties}>
                スタッフのイベント
              </span>
              <h3 className="nd-side-title">つきの・あおいさんのイベント</h3>
              <p className="nd-side-body">
                スタッフによる“なんでも発表会”。子どもたちと一緒に、大人も自分の「好き」を発表します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 過去の発表会 ========== */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <SectionTitle eyebrow="ARCHIVE ・ 過去の発表会" variant={1} lineColor="var(--violet)">
              これまでの発表会はこちら。
            </SectionTitle>
            <p className="lead nd-section-lead">当日の雰囲気は、過去の様子からどうぞ。</p>
          </div>

          <div className="nd-past">
            {pastEvents.map((e, i) => (
              <a
                key={e.date}
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="nd-past-link craft-paper craft-tilt craft-lift reveal"
                style={
                  {
                    "--rot": i % 2 === 0 ? "-0.5deg" : "0.5deg",
                    transitionDelay: `${i * 70}ms`,
                  } as CSSProperties
                }
              >
                <div>
                  <p className="nd-past-date">{e.date}</p>
                  <p className="nd-past-label">{e.label}</p>
                </div>
                <ArrowRightDoodle width={24} className="nd-past-arrow" />
              </a>
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
            <div className="nd-final-spark" aria-hidden="true">
              <SparkleDoodle width={30} className="craft-draw" />
            </div>
            <h2 className="nd-final-title craft-misprint">
              あなたの“好き”を、
              <br />
              <span className="nd-hero-title-line">
                ステージにのせよう。
                <Underline variant={3} className="nd-hero-underline craft-draw" />
              </span>
            </h2>
            <p className="nd-final-body">
              2026年7月26日（日）、アーテック5F フリースペースで開催します。
              <br />
              発表も、観覧も大歓迎。一緒に盛り上がりましょう！
            </p>
            <div className="nd-cta">
              <ApplyButton />
              <p className="nd-cta-note">観覧は申込不要・出入り自由。お気軽にお越しください。</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
