import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { SectionTitle } from "@/components/craft/SectionTitle";

/* ============================================================
   パネル展示「好きなことを探究する、その先に…」の Web 版
   - 会場では A4横 12枚（4つの問い × 「表紙・中身A・中身B」）。ここでは文字で読めるように組み直している
   - 画像：public/assets/festa/2611/panels/
       p01-cover.webp / p01-a.webp / p01-b.webp … パネル1枚まるごと（「パネルを画像で見る」用）
       p01-a-strip.webp など名前の後ろに語が付くもの … パネルから絵だけを切り出したもの
   - ★Web版だけ、パネルと文言を変えているところ（2026/11/27 決定）
       02-B：左右の順（根拠を確かめる → サービスをつくる）と、「AIと学ぶときに大切なこと」の文
             （パネルは「OECDと欧州委員会」だが、QRの行き先は文科省のガイドラインなので、そちらに合わせた）
       03-A：話し手（子ども／おうちの人）を書き添えた
       03-B：本文を、ほかのパネルの問いかける調子にそろえた
       04-B：ジョブズさんの絵にも「イラストは場面をイメージしたもの」を足した
============================================================ */

const P = "/assets/festa/2611/panels";

type More = { label: string; title: string; href: string };

const themes: { no: string; question: string }[] = [
  { no: "01", question: "好きなことばかりやってて、大丈夫？" },
  { no: "02", question: "AIが進化する時代に、何を身につけたらいい？" },
  { no: "03", question: "すぐ飽きて、続かないんです" },
  { no: "04", question: "それ、将来なんの役に立つの？" },
];

/* ---------- 小さな部品 ---------- */

function Pic({ src, alt, w, h }: { src: string; alt: string; w: number; h: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="fs-pn-img" src={src} alt={alt} width={w} height={h} loading="lazy" />;
}

function Panel({ children }: { children: ReactNode }) {
  return <section className="fs-pn craft-paper reveal">{children}</section>;
}

/** 番号つきの場面（絵の下に、場面ごとのせりふ） */
function Scenes({ items }: { items: { label: string; lines: { who?: string; text: string }[] }[] }) {
  return (
    <ol className="fs-pn-scenes">
      {items.map((s, i) => (
        <li key={s.label}>
          <span className="fs-pn-scene-no" aria-hidden="true">
            {i + 1}
          </span>
          <div>
            <p className="fs-pn-scene-label">{s.label}</p>
            {s.lines.map((l) => (
              <p key={l.text} className="fs-pn-scene-line">
                {l.who && <span className="fs-pn-who">{l.who}</span>}
                {l.text}
              </p>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** 自分とAIのやりとり */
function Dialog({ lines }: { lines: { who: "自分" | "AI"; text: string }[] }) {
  return (
    <dl className="fs-pn-dialog">
      {lines.map((l) => (
        <div key={l.text} className={l.who === "AI" ? "is-ai" : "is-me"}>
          <dt>{l.who}</dt>
          <dd>{l.text}</dd>
        </div>
      ))}
    </dl>
  );
}

function Theme({
  no,
  question,
  cover,
  more,
  children,
}: {
  no: string;
  question: string;
  cover: { src: string; alt: string; w: number; h: number };
  more: More[];
  children: ReactNode;
}) {
  return (
    <article id={`q${no}`} className="fs-theme nd-course-anchor">
      <header className="fs-theme-cover reveal">
        <p className="fs-theme-no">{no}</p>
        <h3 className="fs-theme-q">
          <span className="craft-highlight">{question}</span>
        </h3>
      </header>
      <figure
        className="fs-theme-cover-img craft-photo craft-tilt reveal"
        style={{ "--rot": Number(no) % 2 === 0 ? "0.8deg" : "-0.8deg" } as CSSProperties}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover.src} alt={cover.alt} width={cover.w} height={cover.h} loading="lazy" />
      </figure>

      {children}

      <div className="fs-theme-foot reveal">
        <p className="fs-theme-foot-h">出典・もっと読む</p>
        <ul className="fs-more">
          {more.map((m) => {
            const body = (
              <>
                <span className="fs-more-label">{m.label}</span>
                <span className="fs-more-title">{m.title}</span>
              </>
            );
            return (
              <li key={m.href}>
                {m.href.startsWith("/") ? (
                  <Link href={m.href}>{body}</Link>
                ) : (
                  <a href={m.href} target="_blank" rel="noopener noreferrer">
                    {body}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <p className="fs-theme-foot-h">パネルを画像で見る</p>
        <div className="fs-thumbs">
          {(["cover", "a", "b"] as const).map((r, i) => (
            <a key={r} href={`${P}/p${no}-${r}.webp`} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${P}/p${no}-${r}.webp`}
                alt={`パネル ${no}（${i + 1}枚目）`}
                width={1600}
                height={1131}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ---------- セクション本体 ---------- */

export default function PanelSection() {
  return (
    <section className="nd-section nd-course-anchor" id="panels">
      <div className="container">
        <div className="nd-section-head">
          <SectionTitle eyebrow="PANEL ・ パネル展示" variant={3} lineColor="var(--brand)">
            好きなことを探究する、
            <br />
            その先に…
          </SectionTitle>
          <p className="nd-section-lead reveal">
            保護者の方からよく聞く4つの問いに、
            <br />
            絵と言葉でこたえたパネルです。
            <br />
            会場の展示を、ここでも読めます。
          </p>
        </div>

        <ol className="fs-qindex craft-paper reveal">
          {themes.map((t) => (
            <li key={t.no}>
              <a href={`#q${t.no}`}>
                <span className="fs-qindex-no">{t.no}</span>
                <span className="fs-qindex-q">{t.question}</span>
                <span aria-hidden="true">↓</span>
              </a>
            </li>
          ))}
        </ol>

        {/* ===== 01 ===== */}
        <Theme
          no="01"
          question={themes[0].question}
          cover={{ src: `${P}/p01-cover-cover.webp`, alt: "ゲームづくりのノートパソコン、鳥の絵を描いたタブレット、野球のボールとグローブ", w: 1200, h: 334 }}
          more={[
            { label: "理論を読む", title: "東京財団「学び続ける力と自己決定理論」", href: "https://www.tkfd.or.jp/research/detail.php?id=4729" },
            { label: "ブログを読む", title: "「好きなことばかりで大丈夫？」──好きは学びの入口で、目的地じゃない", href: "/blog/suki-wa-manabi-no-iriguchi" },
          ]}
        >
          <Panel>
            <h4 className="fs-pn-title">好きは、学びの入口。</h4>
            <Pic src={`${P}/p01-a-strip.webp`} alt="学校の帰り道にレースゲームのことを考え、家でゲームをつくり、自分で遊んでみる女の子" w={1200} h={399} />
            <Scenes
              items={[
                { label: "学校の帰り道", lines: [{ text: "「あのレース、前の記録まであと何秒だったんだろ？」" }] },
                { label: "家に着いて", lines: [{ text: "「ゴールしたら、前のタイムも出してみよ」" }] },
                { label: "自分で遊んでみたら", lines: [{ text: "「あ、あと1秒だった！ これ、ゴールしたときに教えてほしいな」" }] },
              ]}
            />
            <p className="fs-pn-bottom">
              好きなことは、<span className="craft-highlight">つい考えてしまう、やってしまう。</span>
            </p>
          </Panel>

          <Panel>
            <h4 className="fs-pn-title">「好き」は、どう学びにつながる？</h4>
            <p className="fs-pn-kicker">自己決定理論</p>
            <p className="fs-pn-text">次の三つが満たされることが、自分から取り組む意欲を支えると考えます。</p>
            <ul className="fs-pn-needs">
              <li>
                <p className="fs-pn-need-h">
                  自分で選べる<small>自律性</small>
                </p>
                <p className="fs-pn-need-q">「自分がつくりたいのは、レースゲーム」</p>
              </li>
              <li>
                <p className="fs-pn-need-h">
                  できる実感<small>有能感</small>
                </p>
                <p className="fs-pn-need-q">「できた！ 前のタイムが画面に出た」</p>
              </li>
              <li>
                <p className="fs-pn-need-h">
                  つながる安心<small>関係性</small>
                </p>
                <p className="fs-pn-need-q">「途中だけど、ちょっと遊んでみてくれる？」</p>
              </li>
            </ul>

            <p className="fs-pn-sub">自分でつくったレースゲームを、友だちが遊んでみたら……</p>
            <figure className="fs-pn-fig">
              <p className="fs-pn-fig-tag">あと1秒で新記録！</p>
              <Pic src={`${P}/p01-b-kids.webp`} alt="自分でつくったレースゲームを、友だちと遊ぶ二人" w={393} h={262} />
              <figcaption>「くやしい、もう一回！」</figcaption>
            </figure>
            <div className="fs-pn-paths">
              <div>
                <p className="fs-pn-path-h">心理学へ</p>
                <p className="fs-pn-path-q">「なんで今、もう一回やりたくなったん？」</p>
                <p className="fs-pn-text">
                  「あと1秒」って出たのが気になった？ それとも、前の自分に負けたのがくやしかった？友だちに聞いてみると、人が「やってみたい」と思う理由が気になってくる。
                </p>
              </div>
              <div className="is-make">
                <p className="fs-pn-path-h">ものづくりへ</p>
                <p className="fs-pn-path-q">「その『惜しい！』が伝わる画面、どうつくろう？」</p>
                <p className="fs-pn-text">
                  前のタイムと今回のタイムを、紙に並べて描いてみる。どの数字を大きくしたら、ひと目で分かるかな？画面をつくって友だちに試してもらい、見づらかったところを直す。
                </p>
              </div>
            </div>

            <p className="fs-pn-sub">CLAFTなら、こんなことができます！</p>
            <blockquote className="fs-pn-quote">
              つい考えてしまうほど好きなことに、とことん向き合う。夢中になるうちに、自分のアイデアが少しずつ形になっていく。その「好き」が入り口になって、学びの扉をひらいていく。
            </blockquote>
          </Panel>
        </Theme>

        {/* ===== 02 ===== */}
        <Theme
          no="02"
          question={themes[1].question}
          cover={{ src: `${P}/p02-cover-cover.webp`, alt: "文化祭の入口に立ち、パンフレットを手にどこへ行くか考える中学生", w: 1200, h: 400 }}
          more={[
            {
              label: "出典を読む",
              title: "文部科学省「初等中等教育段階における生成AIの利活用に関するガイドライン（Ver.2.0）」（PDF）",
              href: "https://www.mext.go.jp/content/20241226-mxt_shuukyo02-000030823_001.pdf",
            },
            { label: "ブログを読む", title: "AI時代に子どもが身につけるべき力とは？ 中高生7人が対話で出した“自分の答え”", href: "/blog/ai-jidai-kodomo-chikara-yononaka" },
          ]}
        >
          <Panel>
            <h4 className="fs-pn-title">「なんで？」と問う力</h4>
            <Pic src={`${P}/p02-a-left.webp`} alt="レストランの入口で順番待ちの表示「3」を見ながら、スマホのAIに質問する姉と妹" w={948} h={631} />
            <p className="fs-pn-sub">「あと3組」って、あと何分？</p>
            <Dialog
              lines={[
                { who: "自分", text: "なんで、あと何組かはわかるのに、何分待つかはわからないの？" },
                { who: "AI", text: "どの席がいつ空くかで変わるよ。" },
                { who: "自分", text: "そっか。同じ3組でも違うんや。じゃあ、だいたい何分くらい？" },
              ]}
            />
            <Pic src={`${P}/p02-a-right.webp`} alt="店内を見わたしながら、AIの答えに首をかしげる姉" w={947} h={631} />
            <p className="fs-pn-sub">その「15分」、ほんまかな？</p>
            <Dialog
              lines={[
                { who: "AI", text: "もし5分ごとに1組ずつ案内するなら、3組進むのに約15分だよ。" },
                { who: "自分", text: "あれ？ このお店で「1組5分」って、誰が決めたん？" },
                { who: "AI", text: "5分は計算のための仮の数字だよ。このお店の待ち時間は、まだわからない。" },
              ]}
            />
          </Panel>

          <Panel>
            <p className="fs-pn-kicker">答えの根拠を確かめる</p>
            <h4 className="fs-pn-title">その数字、何をもとに出したん？</h4>
            <div className="fs-pn-facts">
              <div>
                <p className="fs-pn-fact-label">店の表示</p>
                <p className="fs-pn-fact-value">あと3組</p>
                <p className="fs-pn-fact-note">自分の前に何組いるか。受付の画面で確かめられる。</p>
              </div>
              <div className="is-ai">
                <p className="fs-pn-fact-label">AIが計算した例</p>
                <p className="fs-pn-fact-value">約15分</p>
                <p className="fs-pn-fact-note">「5分ごとに1組進む」と仮定した数字。実際にそのペースか、お店の人に聞いてみよう。</p>
              </div>
            </div>
            <p className="fs-pn-strong">「わかっていることはどこまで？」と問い直すのが、批判的に考える第一歩。</p>

            <hr className="fs-pn-split" />

            <p className="fs-pn-kicker">AIと一緒に、サービスをつくる</p>
            <h4 className="fs-pn-title">「もうすぐだよ」って知らせてほしい。</h4>
            <p className="fs-pn-text">
              <span className="fs-pn-who">妹</span>「トイレに行きたいけど、その間に呼ばれたらどうしよう」
            </p>
            <Pic src={`${P}/p02-b-app.webp`} alt="ノートパソコンでAIと一緒に、順番が近づいたら知らせる画面をつくる姉妹" w={886} h={356} />
            <blockquote className="fs-pn-quote">「あと2組になったら知らせる仕組み、AIと一緒につくってみよう」</blockquote>
            <p className="fs-pn-text">
              AIに案を出してもらい、お客さんのスマホには「もうすぐです」の通知、店員さんには「次の組を呼ぶ」ボタンを置いた。二つの画面を試作して、妹とお店屋さんごっこで試してみる。
            </p>

            <div className="fs-pn-note">
              <p className="fs-pn-note-h">AIと学ぶときに大切なこと</p>
              <p>文部科学省のガイドラインでも、AIを学びに使うときは、その答えが本当か・適切かを判断できることが前提とされています。</p>
            </div>

            <p className="fs-pn-bottom">
              「なんで？」とAIに聞く。返ってきた答えにも、もう一度「なんで？」。
              <br />
              <span className="craft-highlight">そこから、誰かの困りごとを変えるアイデアが生まれる。</span>
            </p>
          </Panel>
        </Theme>

        {/* ===== 03 ===== */}
        <Theme
          no="03"
          question={themes[2].question}
          cover={{ src: `${P}/p03-cover-cover.webp`, alt: "つくりかけのロボットとプログラミングのタブレット、描きかけの青い魚のスケッチ", w: 1200, h: 400 }}
          more={[
            { label: "出典を読む", title: "文部科学省『教育振興基本計画』（2023年）（PDF）", href: "https://www.mext.go.jp/content/20230615-mxt_soseisk02-100000597_01.pdf" },
            { label: "ブログを読む", title: "好きなことが変わっても大丈夫。ブリッジズのトランジション理論をキャリコンがわかりやすく解説", href: "/blog/career-theory-bridges" },
          ]}
        >
          <Panel>
            <h4 className="fs-pn-title">途中でセーブしていい。</h4>
            <Pic src={`${P}/p03-a-strip.webp`} alt="ロボットづくりの途中でおうちの人と話し、続きのメモを貼ってしまい、青い魚の絵を描きはじめる男の子" w={1200} h={400} />
            <Scenes
              items={[
                {
                  label: "「もう飽きた」と言われたら",
                  lines: [{ who: "おうちの人", text: "「そっか。どのへんでそう思った？」" }],
                },
                {
                  label: "ロボットプログラミングはひと休み",
                  lines: [{ who: "子ども", text: "「車輪をつけるところ。『次は左の車輪』って書いとこ」" }],
                },
                {
                  label: "今日やりたいこと",
                  lines: [{ who: "子ども", text: "「水族館で見た、あの青い魚。あの色、描いてみたい！」" }],
                },
              ]}
            />
            <p className="fs-pn-bottom">
              <span className="craft-highlight">今日は、こっちをやりたい。</span>
            </p>
          </Panel>

          <Panel>
            <h4 className="fs-pn-title">続ける力も、学びを選び直す力も。</h4>
            <p className="fs-pn-text">
              「やり始めたこと、中途半端になってるんちゃう？」そう感じることもあるかもしれません。いまは、世界中のつくり方や考え方に触れられる時代。試したいことは、どんどん見つかります。
            </p>
            <p className="fs-pn-text">
              気になったら、素直に試してみていい。ただ、放り出すのではなく「いったんここでセーブ」と言葉にしておく。そうすれば、またいつでも続きに戻ってこられます。
            </p>
            <Pic src={`${P}/p03-b-desk.webp`} alt="机の上に、つくりかけのロボットと「次は左の車輪」のメモ、魚のスケッチ、プログラミングの画面" w={1200} h={295} />
            <p className="fs-pn-kicker">人生の中で、学び方は変わっていく</p>
            <p className="fs-pn-text">
              人生100年時代には、一人ひとりの学ぶ時期や進路が多様になっていくと見込まれています。文部科学省の計画では、学校での学びの多様化や、大人になってからの学び直しを挙げています。
            </p>
            <p className="fs-pn-cite">文部科学省『教育振興基本計画』（2023年）</p>
            <blockquote className="fs-pn-quote">「今は何をやってみたい？ 続きができるように、どこまでやったかメモしとこか。」</blockquote>
          </Panel>
        </Theme>

        {/* ===== 04 ===== */}
        <Theme
          no="04"
          question={themes[3].question}
          cover={{ src: `${P}/p04-cover-cover.webp`, alt: "犬のリードと、画面の中で子犬が寝そべる携帯ゲーム機", w: 1200, h: 400 }}
          more={[
            { label: "出典を読む", title: "任天堂「社長が訊く『ニンテンドー3DSガイド ルーヴル美術館』」", href: "https://www.nintendo.co.jp/3ds/interview/al8j/vol1/index.html" },
            { label: "理論を読む", title: "計画的偶発性理論（プランド・ハップンスタンス）の解説", href: "https://www.shogak.ac.jp/highschool/principal_report/77139/" },
            { label: "ブログを読む", title: "「迷い」は、悪いことじゃない。クランボルツの計画的偶発性理論をキャリコンがわかりやすく解説", href: "/blog/career-theory-krumboltz" },
          ]}
        >
          <Panel>
            <h4 className="fs-pn-title">あとで、思わぬところで生きる。</h4>
            <Pic src={`${P}/p04-a-left.webp`} alt="玄関で子犬にリードをつける男性（イメージ）" w={925} h={618} />
            <p className="fs-pn-sub">家で犬を飼い始めた。</p>
            <p className="fs-pn-text">任天堂の宮本茂さんが、家で犬を飼い始めました。</p>
            <Pic src={`${P}/p04-a-right.webp`} alt="携帯ゲーム機の画面の中で、子犬とふれあう（イメージ）" w={923} h={618} />
            <p className="fs-pn-sub">ゲームの中でも、子犬と触れ合える。</p>
            <p className="fs-pn-text">犬と暮らし始めたことが、子犬と触れ合うゲーム『nintendogs』をつくるきっかけになりました。</p>
            <p className="fs-pn-bottom">
              <span className="craft-highlight">ゲームのヒントは、家の中にあった。</span>
            </p>
            <p className="fs-pn-cite">
              出典：任天堂「社長が訊く『ニンテンドー3DSガイド ルーヴル美術館』」
              <br />
              イラストは場面をイメージしたものです。
            </p>
          </Panel>

          <Panel>
            <p className="fs-pn-kicker">スティーブ・ジョブズさんの経験</p>
            <h4 className="fs-pn-title">
              手書きの文字が、
              <br />
              約10年後、Macの画面に。
            </h4>
            <div className="fs-pn-media">
              <Pic src={`${P}/p04-b-calli.webp`} alt="大学で、ペンで美しい文字を書く若い男性（イメージ）" w={456} h={320} />
              <p className="fs-pn-text">
                大学で目にした、手書きの美しい文字。自分でも書きたくなって、文字の形や、文字と文字の間のあけ方を学びました。
              </p>
            </div>
            <p className="fs-pn-sub">それから、約10年。</p>
            <div className="fs-pn-media">
              <Pic src={`${P}/p04-b-mac.webp`} alt="初期のパソコンの画面に並ぶ書体を見つめる男性（イメージ）" w={456} h={320} />
              <p className="fs-pn-text">
                初代Macをつくるとき、あの授業を思い出しました。書体を選べることも、文字ごとに間隔を整えることも、Macの設計に生きたのです。
              </p>
            </div>
            <p className="fs-pn-cite">
              出典：スタンフォード大学での本人の講演（2005年）
              <br />
              イラストは場面をイメージしたものです。
            </p>

            <hr className="fs-pn-split" />

            <p className="fs-pn-kicker">経験とキャリアをつなぐ考え方</p>
            <h4 className="fs-pn-title">気になって、やってみた。その先で、使い道に出会う。</h4>
            <p className="fs-pn-sub">
              計画的偶発性理論<small>プランド・ハップンスタンス</small>
            </p>
            <p className="fs-pn-text">クランボルツらは、将来の仕事や進路には、予想していなかった出会いや出来事も関わると考えました。</p>
            <p className="fs-pn-text">
              気になることを試してみる。新しい場面に出会ったら、考え方ややり方を変えてみる。そうした行動が、思いがけない機会につながることがあります。
            </p>
            <p className="fs-pn-cite">Mitchell・Levin・Krumboltz（1999）Planned Happenstance</p>

            <p className="fs-pn-bottom">
              「将来、何に使うん？」の答えは、あとで見つかることもある。
              <br />
              <span className="craft-highlight">今日は、「それのどこが好き？」って聞いてみては？</span>
            </p>
          </Panel>
        </Theme>
      </div>
    </section>
  );
}
