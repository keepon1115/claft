import type { CSSProperties, ReactNode } from "react";
import { SectionTitle } from "@/components/craft/SectionTitle";
import LiteYouTube from "@/components/exhibition/LiteYouTube";

/* ============================================================
   PR動画「やりたいことを、やり続ける。」と、動画の横に置いた展示シート（A4横・表裏）の Web 版
   - シートの元データ：C:\dev\claft-voice\flyer\flyer.html（文言はここと同じにそろえる）
   - 表＝朝（いってらっしゃい）→ craft-paper、裏＝夕方（おかえり）→ craft-paper--warm
   - 4つの場の色は「色の家族」（PBL水色・Yononaka橙・試す場紫・キャリア面談緑）。このセクションの中だけで使う
   - 画像：public/assets/festa/2611/sheet/
============================================================ */

const VIDEO_URL = "https://youtu.be/U1qhMrdQzaM";
const S = "/assets/festa/2611/sheet";

/* ---------- 比重の帯（学年ごとの「やりたいこと」の比重。一般論のイメージ） ---------- */
const BAND_W = 360;
const BAND_TOP = 24;
const BAND_H = 56;
// シートと同じ点（横 0〜273、高さ 0〜19 の座標）を、この図の大きさに引き伸ばして使う
const SRC_W = 273;
const SRC_H = 19;
const WANT_POINTS: [number, number][] = [
  [0, 15.6], [30, 15.6], [54, 14.6], [78, 10.2], [141, 4.4], [207, 11.8], [262, 9.2], [273, 9.2],
];
// 学年の位置（帯の左端0〜右端1）
const GRADES: { label: string; x: number }[] = [
  { label: "小学生", x: 0.105 },
  { label: "中学生", x: 0.285 },
  { label: "高校生", x: 0.516 },
  { label: "大学生", x: 0.757 },
  { label: "その先", x: 0.961 },
];
const CLAFT_X = 0.198; // 「CLAFTに来る子が多いのは、このころ」（小学校高学年あたり）

function wantPath(): string {
  const pts = WANT_POINTS.map(([x, y]) => [(x / SRC_W) * BAND_W, BAND_TOP + BAND_H - (y / SRC_H) * BAND_H]);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];
    const t = 0.5 / 3;
    const c1 = [p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t];
    const c2 = [p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return `${d} L ${BAND_W} ${BAND_TOP + BAND_H} L 0 ${BAND_TOP + BAND_H} Z`;
}

function WantBand() {
  const cx = CLAFT_X * BAND_W;
  return (
    <svg
      className="fs-sh-band"
      viewBox={`0 0 ${BAND_W} 108`}
      role="img"
      aria-label="学年ごとの「やりたいこと」の比重のイメージ。小学生で高く、中学生から下がり、高校生でいちばん低くなるが、ゼロにはならない。大学生でまた上がる。CLAFTに来る子が多いのは、小学校の高学年あたり。"
    >
      <defs>
        <clipPath id="fs-band-clip">
          <rect x="0" y={BAND_TOP} width={BAND_W} height={BAND_H} rx="10" />
        </clipPath>
      </defs>
      <text className="fs-sh-band-claft" x={cx - 9} y="12">
        CLAFTに来る子が多いのは、このころ
      </text>
      <path className="fs-sh-band-claft-mark" d={`M ${cx - 4.5} 15.5 L ${cx + 4.5} 15.5 L ${cx} 21.5 Z`} />
      <g clipPath="url(#fs-band-clip)">
        <rect className="fs-sh-band-should" x="0" y={BAND_TOP} width={BAND_W} height={BAND_H} />
        <path className="fs-sh-band-want" d={wantPath()} />
        {GRADES.map((g) => (
          <line
            key={g.label}
            x1={g.x * BAND_W}
            y1={BAND_TOP}
            x2={g.x * BAND_W}
            y2={BAND_TOP + BAND_H}
            stroke="#fff"
            strokeWidth="0.8"
            strokeDasharray="2 2.4"
            opacity="0.9"
          />
        ))}
      </g>
      {GRADES.map((g) => (
        <text key={g.label} className="fs-sh-band-grade" x={Math.min(g.x * BAND_W, BAND_W - 19)} y="100" textAnchor="middle">
          {g.label}
        </text>
      ))}
    </svg>
  );
}

/* ---------- 4つの場 ---------- */
function Prog({
  color,
  tag,
  tagSub,
  name,
  sub,
  children,
}: {
  color: string;
  tag: string;
  tagSub?: string;
  name: string;
  sub: string;
  children: ReactNode;
}) {
  return (
    <article className="fs-sh-prog" style={{ "--c": color } as CSSProperties}>
      <p className="fs-sh-prog-tag">
        <i aria-hidden="true" />
        {tag}
        {tagSub && <small>＝ {tagSub}</small>}
      </p>
      <h4 className="fs-sh-prog-name">{name}</h4>
      <p className="fs-sh-prog-sub">{sub}</p>
      {children}
    </article>
  );
}

export default function SheetSection() {
  return (
    <section className="nd-section nd-course-anchor fs-sheet" id="movie">
      <div className="container">
        <div className="nd-section-head">
          <SectionTitle eyebrow="MOVIE ・ PR動画" variant={1} lineColor="var(--brand)">
            <span className="fs-sh-brand">やりたいこと</span>を、
            <br />
            やり続ける。
          </SectionTitle>
          <p className="nd-section-lead reveal">
            やるべきことも、やりたいことも、どちらも大事。
            <br />
            それでもCLAFTがいちばん大切にしているのは、
            <br />
            <strong>「やりたいこと」を、いつも心に持っていること。</strong>
          </p>
        </div>

        <div className="fs-sh-video reveal">
          <LiteYouTube url={VIDEO_URL} title="CLAFT PR動画「やりたいことを、やり続ける。」" />
          <p className="nd-note">会場のモニターで流していた動画です（約3分）。</p>
        </div>

        <p className="nd-note reveal" style={{ marginTop: 40 }}>
          動画のとなりに置いていたシートの内容です ↓
        </p>

        {/* ===== 表（朝） ===== */}
        <div className="fs-sh-am craft-paper reveal">
          <p className="fs-sh-sky">
            ふり返ったときの<span className="fs-sh-brand">足あと</span>が、
            <br />
            キャリアになる。
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="fs-sh-pano"
            src={`${S}/panorama.webp`}
            alt="ランタンを持った子どもが、小学生から大人へと成長しながら、足あとの道を歩いていく風景"
            width={1456}
            height={819}
            loading="lazy"
          />

          <div className="fs-sh-am-body">
            <h3 className="fs-sh-band-title">
              やるべきことが増えても、
              <br />
              <span className="fs-sh-brand">やりたいこと</span>は、<span className="fs-sh-mark">ゼロにしない。</span>
            </h3>
            <p className="fs-sh-legend">
              <span>
                <i className="is-want" aria-hidden="true" />
                やりたいこと
              </span>
              <span>
                <i className="is-should" aria-hidden="true" />
                やるべきこと
              </span>
            </p>
            <WantBand />
            <p className="fs-sh-band-note">学年ごとの比重のイメージです。</p>

            <div className="fs-sh-why">
              <p className="fs-sh-why-h">なぜ？</p>
              <ol>
                <li>続けた先で、あとから意味になることがある。</li>
                <li>AIが手伝ってくれる時代だからこそ、やりたいことを素直に言葉にできることが、これからもっと大切になる。</li>
              </ol>
            </div>
          </div>
        </div>

        {/* ===== 裏（夕方） ===== */}
        <div className="fs-sh-pm craft-paper craft-paper--warm reveal">
          <h3 className="fs-sh-pm-title">
            いつ休んでもいい。
            <br />
            いつ帰ってきてもいい。
          </h3>
          <div className="fs-sh-house">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${S}/house.webp`}
              alt="夕方、灯りのともる家に、リュックを背負った子どもが帰っていく"
              width={720}
              height={720}
              loading="lazy"
            />
          </div>
          <p className="fs-sh-always">
            <span className="fs-sh-brand">CLAFT</span>は、
            <br />
            ずっとここにあります。
          </p>

          <h3 className="fs-sh-seeds">
            やりたいことの<span className="fs-sh-brand">種</span>は、ふたつ。
          </h3>

          <Prog color="var(--fam-pbl)" tag="ワクワク" tagSub="好き" name="PBL" sub="好きを入り口に、学びを広げる・深める。">
            <div className="fs-sh-prog-body">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${S}/robot.webp`} alt="ロボットを組み立てる子ども" width={720} height={720} loading="lazy" />
              <ol className="fs-sh-cycle">
                <li>好きを、とことん</li>
                <li>作品を発表する</li>
                <li>「次は、ここをこうしてみよう」</li>
                <li>また次のPBLへ</li>
              </ol>
            </div>
          </Prog>

          <Prog color="var(--fam-yononaka)" tag="モヤモヤ" tagSub="ぎもん" name="Yononaka" sub="正解ではなく、思ったこと・感じたことを素直に。">
            <div className="fs-sh-prog-body">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${S}/seikai.webp`}
                alt="丘の上から、夕方の町を見わたす子ども"
                width={720}
                height={960}
                loading="lazy"
                style={{ objectPosition: "0% 100%" }}
              />
              <div className="fs-sh-prog-text">
                <p>
                  <strong>「それって、なんでだろう？」</strong>
                  <br />
                  身近なテーマで、正解が一つではない問いを話す。
                </p>
                <p className="fs-sh-chips">
                  <span>お金</span>
                  <span>時間</span>
                  <span>生き物</span>
                  <span>自然</span>
                </p>
                <p>
                  <strong>「そんな見方もあるんだ」</strong>に出会う。
                </p>
              </div>
            </div>
          </Prog>

          <p className="fs-sh-bridge">
            <span className="fs-sh-dots" aria-hidden="true">
              <i style={{ background: "var(--fam-pbl)" }} />
              <i style={{ background: "var(--fam-yononaka)" }} />
            </span>
            ワクワクとモヤモヤから、
            <br />
            深めたり、広げたり。そして
            <span className="fs-sh-dots" aria-hidden="true">
              <i style={{ background: "var(--fam-try)" }} />
              <i style={{ background: "var(--fam-career)" }} />
            </span>
          </p>

          <Prog color="var(--fam-try)" tag="ためす" name="試す場" sub="やりたいことは、試すことで、もっと育つ。">
            <div className="fs-sh-two">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${S}/event.webp`} alt="イベントの企画を話し合う子どもたち" width={720} height={480} loading="lazy" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${S}/kaigai.webp`} alt="オンラインで海外の子どもたちと話す子ども" width={720} height={480} loading="lazy" />
            </div>
            <ul className="fs-sh-tries">
              <li>
                <b>イベント企画</b>スクールフェスタを、自分たちで
              </li>
              <li>
                <b>海外交流</b>海外の子どもたちと、オンラインで
              </li>
              <li>
                <b>地域の課題</b>八尾の商店街で、困りごとを聞く
              </li>
            </ul>
          </Prog>

          <Prog color="var(--fam-career)" tag="えがく" name="キャリア面談" sub="国家資格キャリアコンサルタントと、定期的に。">
            <div className="fs-sh-prog-body">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${S}/mendan.webp`} alt="テーブルをはさんで、大人と子どもが話している" width={720} height={720} loading="lazy" />
              <div className="fs-sh-prog-text">
                <p className="fs-sh-asks">
                  <span>「将来、何をしていきたい？」</span>
                  <span>「どんな人でありたい？」</span>
                </p>
                <p className="fs-sh-em">
                  やりたいことは、
                  <br />
                  変わってもいい。
                </p>
                <p>やるべきこととのバランスも、一緒に。</p>
              </div>
            </div>
          </Prog>
        </div>

        <div className="fs-sh-dl reveal">
          <p className="fs-theme-foot-h">このシートをダウンロード</p>
          <ul>
            <li>
              <a href={`${S}/claft-sheet.pdf`} download="CLAFT_展示シート.pdf">
                PDF（A4横・表裏2ページ）
              </a>
            </li>
            <li>
              <a href={`${S}/claft-sheet-front.jpg`} download="CLAFT_展示シート_表.jpg">
                表の画像
              </a>
            </li>
            <li>
              <a href={`${S}/claft-sheet-back.jpg`} download="CLAFT_展示シート_裏.jpg">
                裏の画像
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
