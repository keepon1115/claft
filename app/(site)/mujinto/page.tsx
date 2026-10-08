import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { SectionTitle } from '@/components/craft/SectionTitle';
import { ArrowDownDoodle } from '@/components/craft/HandDrawn';
import { MjFigure } from '@/components/mujinto/MjFigure';
import { MjNoteWall } from '@/components/mujinto/MjNoteWall';
import { DAYS, ISLAND_RULES, SURVEY_ANSWERS, NOTE_LABELS, NOTES_DAY2_ORDERED } from '@/lib/mujintoData';

const TITLE = '無人島サバイバル｜1日目・2日目の記録';
const DESCRIPTION =
  'アーテック × キープオンの工作ワークショップ「無人島サバイバル」全5回。1日目・2日目に子どもたちがつくったものと、ふりかえりに書いた言葉をそのまま記録しています。小学3年生以上・参加費無料・単発参加OK。';
const FORM_URL = 'https://forms.gle/bVBadEuGBwAebmCE6'; // 3日目の申込フォーム（1〜2日目は sXew1Xg2n4NANUgb9）

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/mujinto' },
  openGraph: {
    title: TITLE,
    description: 'アーテック × キープオンの工作ワークショップ「無人島サバイバル」全5回。1日目・2日目の記録をそのまま掲載しています。',
    type: 'article',
    images: [{ url: '/assets/mujinto/ogp.jpg', width: 1200, height: 630, alt: '紙管で寝床を組む子どもたち' }],
  },
};

// public/assets/mujinto/ 配下の実ファイルに合わせたパス（値は保存されたファイル名と1文字ずつ一致させること。
// Vercelは大文字小文字を区別するため、拡張子・大文字小文字を含めて実ファイル名どおりに書く）。
// 値が undefined のキーは未入稿。MjFigure が【要画像】プレースホルダーを表示する。
const IMG: Record<string, string | undefined> = {
  hero: '/assets/mujinto/hero.jpg', // A ヒーロー背景
  makeSlide: '/assets/mujinto/make-slide.jpg', // D-2 スライド
  campfireSlide: '/assets/mujinto/campfire-slide.jpg', // D-4 スライド
  driftOverview: '/assets/mujinto/driftOverview.jpg', // D-4 当日写真
  driftPicking: '/assets/mujinto/driftPicking.jpeg', // D-4 当日写真
  shelterTrySlide1: '/assets/mujinto/shelterTrySlide1.jpeg', // D-5 STEP1
  shelterTrySlide2: '/assets/mujinto/shelterTrySlide2.jpeg', // D-5 STEP1
  strengthHintSlide: '/assets/mujinto/strengthHintSlide.jpg', // D-5 STEP1
  ropeworkSlide1: '/assets/mujinto/ropeworkSlide.jpg', // D-5 STEP2
  ropeworkSlide2: '/assets/mujinto/ropeworkSlide2.jpeg', // D-5 STEP2
  ropeworkSlide3: '/assets/mujinto/ropeworkSlide3.jpeg', // D-5 STEP2
  shelterTeam1: '/assets/mujinto/shelterTeam1.jpeg', // D-5 当日写真
  shelterTeam2: '/assets/mujinto/shelterTeam2.jpg', // D-5 当日写真
  filterSlide: '/assets/mujinto/filterSlide.jpeg', // D-6 スライド
  waterQuizSlide: '/assets/mujinto/water-quiz-slide1.jpg', // F 飲み水
  shikanPhoto: '/assets/mujinto/shikan.jpg', // F 家（1枚目）
  woodFrameSlide: '/assets/mujinto/woodFrameSlide.jpg', // F 家
  woodFramePhoto: '/assets/mujinto/woodFramePhoto.jpg', // F 家
  // ---- 2日目 ----
  d2PocketSlide: '/assets/mujinto/d2-pocket-slide.jpg', // D2-02 スライド p28
  d2BatteryMaterialsSlide: '/assets/mujinto/d2-battery-materials-slide.jpg', // D2-02 スライド p30
  d2BatteryConnectSlide: '/assets/mujinto/d2-battery-connect-slide.jpg', // D2-02 スライド p38
  d2BatteryHands: '/assets/mujinto/d2-battery-hands.jpeg', // D2-02 当日写真（みんなで作業）
  d2LedLit: '/assets/mujinto/d2-led-lit.jpg', // D2-02 当日写真
  d2BatteryHowSlide: '/assets/mujinto/d2-battery-how-slide.jpg', // D2-02 スライド p45
  d2BatterySummarySlide: '/assets/mujinto/d2-battery-summary-slide.jpg', // D2-02 スライド p46
  d2WisdomSlide: '/assets/mujinto/d2-wisdom-slide.jpg', // D2-03 スライド p50
  d2FallenTreeSlide: '/assets/mujinto/d2-fallen-tree-slide.jpg', // D2-03 スライド p49
  d2Mission1Slide: '/assets/mujinto/d2-mission1-slide.jpg', // D2-03 スライド p51
  d2Mission1: '/assets/mujinto/d2-mission1.jpeg', // D2-03 当日写真
  d2Mission2Slide: '/assets/mujinto/d2-mission2-slide.jpg', // D2-03 スライド p55
  d2Mission2: '/assets/mujinto/d2-mission2.jpg', // D2-03 当日写真
  d2Furikaeri: '/assets/mujinto/furikaeri.jpg', // E2 当日写真
  d2LeverSlide: '/assets/mujinto/d2-lever-slide.jpg', // F2 スライド p59
  d2PulleySlide: '/assets/mujinto/d2-pulley-slide.jpg', // F2 スライド p60
  d2NextSlide: '/assets/mujinto/d2-next-slide.jpg', // G スライド p63
};

// JSON-LD（Article + BreadcrumbList）は見送り：(site)グループの本文に置いた <script> は
// クライアントコンポーネント SiteGrid を経由するため RSC へ退避され、ビルド後の静的HTMLに
// <script type="application/ld+json"> として残らないことを実ビルドで確認した（app/layout.tsx
// 42-46行のコメント・本設計書§3-6の既知の落とし穴のとおり）。root layoutへ移すとサイト全体に
// 効いてしまうため、無理に移設せず諦める。

export default function MujintoPage() {
  return (
    <main className="mj-page" style={{ ['--accent-rgb' as string]: '88 195 162' } as CSSProperties}>
      {/* ========== A｜ヒーロー ========== */}
      <section className="mj-section mj-hero">
        <div className="mj-hero-media">
          {IMG.hero ? (
            <Image
              src={IMG.hero}
              alt="紙管で寝床を組み立てる子どもたち"
              fill
              style={{ objectFit: 'cover' }}
              sizes="480px"
              priority
            />
          ) : (
            <div className="mj-hero-media-ph">
              <span>【要画像】ヒーロー背景：子どもたちが紙管で寝床を組んでいる引きの写真</span>
            </div>
          )}
          <div className="mj-hero-scrim" aria-hidden="true" />
        </div>

        <div className="container mj-hero-body">
          <span className="craft-label mj-hero-label">アーテック × キープオン ／ 工作ワークショップ</span>
          <h1 className="mj-hero-title craft-misprint">無人島サバイバル</h1>
          <p className="mj-hero-sub">つくって考える、工作 × 科学 × DIY</p>

          <div className="mj-tally">
            <svg className="mj-tally-ticks" width="90" height="30" viewBox="0 0 90 30" aria-hidden="true" fill="none">
              <line x1="6" y1="4" x2="6" y2="26" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
              <line x1="26" y1="4" x2="26" y2="26" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
              <line x1="46" y1="6" x2="46" y2="26" stroke="rgba(255,255,255,0.45)" strokeWidth="3" strokeLinecap="round" />
              <line x1="66" y1="6" x2="66" y2="26" stroke="rgba(255,255,255,0.45)" strokeWidth="3" strokeLinecap="round" />
              <line x1="86" y1="6" x2="86" y2="26" stroke="rgba(255,255,255,0.45)" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="mj-tally-text">2日目、終了。残り3日。</span>
          </div>

          <p className="mj-hero-note">これは、1日目・2日目に島で起きたことの記録です。</p>
        </div>
      </section>

      {/* ========== B｜これは何か ========== */}
      <section className="mj-section mj-what">
        <div className="container">
          <h2 className="mj-what-title craft-misprint">もしも、無人島に流れ着いたら・・？</h2>
          <div className="mj-what-body">
            <p>
            ある日、きみは無人島に流れ着きました。あたりを見回すと、波によって運ばれてきたモノがいくつか。──何があれば、何をすれば、この島で生きていけるだろう？
            </p>
            <p>
            自分の手で「つくって」「考えて」「試す」サバイバルワークです！
            </p>
          </div>
          <div className="mj-fact-chips">
            <span className="craft-label mj-fact-chip">参加費 無料</span>
            <span className="craft-label mj-fact-chip">小3〜(小2以下は保護者同伴)</span>
            <span className="craft-label mj-fact-chip">1回だけの参加OK</span>
          </div>
          <div className="mj-what-video">
            <iframe
              src="https://www.youtube.com/embed/31Zlqt3XBOg?autoplay=1&mute=1&rel=0&playsinline=1"
              title="無人島サバイバル 紹介動画"
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ========== C｜5日間の地図 ========== */}
      <section className="mj-section mj-map">
        <div className="container">
          <div className="mj-section-head">
            <SectionTitle variant={1} lineColor="rgb(var(--accent-rgb))">つくる理由が、5日間で変わっていく</SectionTitle>
          </div>
          <p className="mj-map-lead">
            1日目はまず、"初日どう生きるか？"を考え、つくりました。2日目は、あかりをつくり、道をふさぐ木をどかしました。日が進むごとに、つくる理由が変わっていく予定です。(3日目以降は未定です)
          </p>

          <div className="mj-map-steps">
            {DAYS.map((d, i) => (
              <div key={d.day} className="mj-step reveal" style={{ '--i': i + 1 } as CSSProperties}>
                {d.done ? (
                  <div className="mj-step-inner craft-paper">
                    <span className="craft-tape" aria-hidden="true" />
                    <p className="mj-step-day">{d.day}日目</p>
                    <p className="mj-step-title">{d.title}</p>
                    <p className="mj-step-detail">つくったもの：{d.makes}</p>
                    <p className="mj-step-detail">{d.question}</p>
                    <a href={`#day${d.day}`} className="mj-step-cta">記録を見る ↓</a>
                  </div>
                ) : (
                  <div className="mj-step-inner mj-step-inner--future craft-paper craft-paper--warm">
                    <p className="mj-step-day">{d.day}日目</p>
                    <p className="mj-step-title">{d.title}</p>
                    <span className="mj-badge-plan">予定</span>
                    {d.day === 3 && (
                      <div className="mj-step-apply-btn">
                        <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="craft-sticker">
                          3日目に申し込む
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== D｜1日目に、こんなことが起きた ========== */}
      <section className="mj-section mj-day1" id="day1">
        <div className="container">
          <div className="mj-section-head">
            <SectionTitle variant={2} lineColor="rgb(var(--accent-rgb))">1日目に、こんなことが起きた</SectionTitle>
          </div>

          {/* D-1 */}
          <div className="mj-log">
            <span className="mj-log-num" aria-hidden="true">01</span>
            <div className="mj-log-block reveal">
              <h3 className="mj-log-title">"何があれば"無人島で、5日間生きていけそう？</h3>
              <p>
                申込のとき、ひとつだけ質問をしました。1日目参加者の答えが、こちらでした。
              </p>
              <ul className="mj-tag-list">
                {SURVEY_ANSWERS.map((answer, i) => (
                  <li key={answer} className="mj-tag" style={{ '--rot': i % 2 === 0 ? '-1deg' : '1deg' } as CSSProperties}>
                    {answer}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* D-2 */}
          <div className="mj-log">
            <span className="mj-log-num" aria-hidden="true">02</span>
            <div className="mj-log-block reveal">
              <h3 className="mj-log-title">"何をつくれば"無人島で、5日間生きていけそう？</h3>
              <p>
                当日、冒頭で「何があれば？」の回答を紹介し、「"何をつくれば"、無人島で5日間生きていけそう？」という問いかけをしました。
              </p>
              <MjFigure
                src={IMG.makeSlide}
                need='当日スライド「考えてみよう "何をつくれば"無人島で5日間生きていけそう？」'
                alt="問いが「何をつくれば」に変わったスライド"
                width={960}
                height={540}
              />
            </div>
          </div>

          {/* D-3 */}
          <div className="mj-log">
            <span className="mj-log-num" aria-hidden="true">03</span>
            <div className="mj-log-block reveal">
              <h3 className="mj-log-title">つくったもの① — たき火と工作台</h3>
              <p>
                島には、流れ着いたものが集まる場所がありました。
              </p>
              <p>
                その漂流物を集めて、たき火と工作台をつくるミッション。チームでレシピを見て、必要なものを集めて、組み合わせる。完成すると、そうしてたき火と工作台を手に入れました。
              </p>
              <MjFigure
                src={IMG.campfireSlide}
                need="当日スライド「たき火・工作台をつくろう！」手順①〜④のいずれか1枚"
                alt="たき火と工作台をつくる手順のスライド"
                width={960}
                height={540}
              />
              <MjFigure
                src={IMG.driftOverview}
                need="当日写真：漂流物ゾーンの俯瞰"
                alt="漂流物が並べられたゾーンを上から見たところ"
                width={960}
                height={640}
              />
              <MjFigure
                src={IMG.driftPicking}
                need="当日写真：子どもが素材を選んでいる場面"
                alt="漂流物から材料を選ぶ子ども"
                width={960}
                height={640}
              />
            </div>
          </div>

          {/* D-4 */}
          <div className="mj-log">
            <span className="mj-log-num" aria-hidden="true">04</span>
            <div className="mj-log-block reveal">
              <h3 className="mj-log-title">つくったもの② — 寝床</h3>
              <p>
              ポツポツポツと、雨が降ってきた。すると、雨に濡れない場所が必要になる。
              </p>
              <p>
              そこで「家を作ろう」という流れになり、本当に人が入れるサイズの家を作ってみるワークを行いました。
              </p>
              <p>
              その際、いきなり本番に取りかかるのではなく、まずはミニチュアで試作するところから始めました。
              </p>

              <div className="mj-step-phase">
                <p className="mj-step-phase-label">STEP1｜わりばしで試す</p>
                <div className="mj-material-chips">
                  <span className="craft-label mj-material-chip">わりばし10本</span>
                  <span className="craft-label mj-material-chip">輪ゴム</span>
                  <span className="craft-label mj-material-chip">ホワイトボード</span>
                </div>
                <MjFigure
                  src={IMG.shelterTrySlide1}
                  need="スライド「わりばしで家を試作してみよう」(1)"
                  alt="わりばしで家の模型をつくる説明のスライド"
                  width={960}
                  height={540}
                />
                <MjFigure
                  src={IMG.shelterTrySlide2}
                  need="スライド「わりばしで家を試作してみよう」(2)"
                  alt="わりばしで家の模型をつくる説明のスライド（つづき）"
                  width={960}
                  height={540}
                />
                <MjFigure
                  src={IMG.strengthHintSlide}
                  need="スライド「強さのヒント」(三角形と四角形の比較)"
                  alt="三角形と四角形の強さを比べたスライド"
                  width={960}
                  height={540}
                />
              </div>

              <div className="mj-step-phase">
                <p className="mj-step-phase-label">STEP2｜紙管で建てる</p>
                <div className="mj-material-chips">
                  <span className="craft-label mj-material-chip">紙管10本</span>
                  <span className="craft-label mj-material-chip">梱包用ロープ</span>
                  <span className="craft-label mj-material-chip">のこぎり</span>
                </div>
                <div className="mj-material-chips">
                  <span className="craft-label mj-material-chip">巻き結び</span>
                  <span className="craft-label mj-material-chip">はさみ縛り</span>
                  <span className="craft-label mj-material-chip">角縛り</span>
                </div>
                <MjFigure
                  src={IMG.ropeworkSlide1}
                  need="スライド：ロープワーク解説(巻き結び／はさみ縛り／角縛り) (1)"
                  alt="3種類のロープワークの解説スライド"
                  width={960}
                  height={540}
                />
                <MjFigure
                  src={IMG.ropeworkSlide2}
                  need="スライド：ロープワーク解説(巻き結び／はさみ縛り／角縛り) (2)"
                  alt="3種類のロープワークの解説スライド（つづき）"
                  width={960}
                  height={540}
                />
                <MjFigure
                  src={IMG.ropeworkSlide3}
                  need="スライド：ロープワーク解説(巻き結び／はさみ縛り／角縛り) (3)"
                  alt="3種類のロープワークの解説スライド（つづき）"
                  width={960}
                  height={540}
                />
              </div>

              <div className="mj-shelters-block">
                <p className="mj-shelters-label">2チームの寝床</p>
                <MjFigure
                  src={IMG.shelterTeam1}
                  need="2チームの寝床（チーム1）"
                  alt="チーム1の寝床"
                  caption="チーム1"
                  width={960}
                  height={640}
                />
                <MjFigure
                  src={IMG.shelterTeam2}
                  need="2チームの寝床（チーム2）"
                  alt="チーム2の寝床"
                  caption="チーム2"
                  width={960}
                  height={640}
                />
              </div>
            </div>
          </div>

          {/* D-6 */}
          <div className="mj-log">
            <span className="mj-log-num" aria-hidden="true">06</span>
            <div className="mj-log-block reveal">
              <h3 className="mj-log-title">つくったもの③ — 飲み水</h3>
              <p>
                1時間半動いて家をつくり終えたら「のどがかわいた…」。
              </p>
              <p>
                土・砂・綿・炭を集め、ろ過器をつくるワーク。層を重ねる順番は、自分たちで考えながら決めました。
              </p>
              <div className="mj-material-chips">
                <span className="craft-label mj-material-chip">土</span>
                <span className="craft-label mj-material-chip">砂</span>
                <span className="craft-label mj-material-chip">綿</span>
                <span className="craft-label mj-material-chip">炭</span>
                <span className="craft-label mj-material-chip">試験管</span>
                <span className="craft-label mj-material-chip">キリ</span>
              </div>

              <div className="mj-vessel">
                <svg className="mj-vessel-diagram" viewBox="0 0 100 180" aria-hidden="true" fill="none">
                  <path
                    d="M30 6 H70 V130 C70 155, 30 155, 30 130 Z"
                    stroke="var(--ink-500)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <line x1="30" y1="42" x2="70" y2="42" stroke="var(--ink-500)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="30" y1="76" x2="70" y2="76" stroke="var(--ink-500)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="30" y1="110" x2="70" y2="110" stroke="var(--ink-500)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="50" y="28" textAnchor="middle" fontSize="14" fill="var(--ink-500)">?</text>
                  <text x="50" y="62" textAnchor="middle" fontSize="14" fill="var(--ink-500)">?</text>
                  <text x="50" y="96" textAnchor="middle" fontSize="14" fill="var(--ink-500)">?</text>
                  <text x="50" y="122" textAnchor="middle" fontSize="14" fill="var(--ink-500)">?</text>
                </svg>
                <p className="mj-vessel-note">順番は、チームごとにちがいました</p>
              </div>

              <table className="mj-filter-table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">入れたもの</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1回目</th>
                    <td>オレンジジュース</td>
                  </tr>
                  <tr>
                    <th scope="row">2回目</th>
                    <td>泥水</td>
                  </tr>
                </tbody>
              </table>

              <MjFigure
                src={IMG.filterSlide}
                need="当日スライド「②ろ過器をつくろう！(土・砂・綿・炭を好きな順番で)」"
                alt="ろ過器をつくる手順のスライド"
                width={960}
                height={540}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== E｜子どもたちのことば ========== */}
      <section className="mj-section mj-notes">
        <div className="container">
          <div className="mj-section-head">
            <SectionTitle variant={3} lineColor="rgb(var(--accent-rgb))">日が暮れてきたのでふりかえり</SectionTitle>
          </div>
          <p className="mj-notes-lead">最後に、3色の付箋に1日目のことを振り返りました。</p>

          <ul className="mj-notes-legend">
            <li><span className="mj-legend-dot mj-legend-dot--y" aria-hidden="true" />黄＝{NOTE_LABELS.yellow}</li>
            <li><span className="mj-legend-dot mj-legend-dot--g" aria-hidden="true" />緑＝{NOTE_LABELS.green}</li>
            <li><span className="mj-legend-dot mj-legend-dot--o" aria-hidden="true" />オレンジ＝{NOTE_LABELS.orange}</li>
          </ul>

          <MjNoteWall />
        </div>
      </section>

      {/* ========== F｜島でやったことは、まちのどこにある？ ========== */}
      <section className="mj-section mj-city">
        <div className="container">
          <div className="mj-section-head">
            <SectionTitle variant={1} lineColor="rgb(var(--accent-rgb))">島でやったことは、まちのどこにある？</SectionTitle>
          </div>
          <p className="mj-city-lead">最後に、島の外の話を少しだけしました。つくったものと同じしくみが、まちの中にもあります。</p>

          <div className="mj-city-card craft-paper craft-paper--white reveal">
            <h3>飲み水</h3>
            <p>
              ろ過器で使った層と同じ考え方で、水道の浄水場でも水をきれいにしています。そこでは「凝集剤」を使って、小さな汚れを固めて沈めます。
            </p>
            <MjFigure
              src={IMG.waterQuizSlide}
              need="スライド「クイズ 水道水をそのまま飲める国はいくつ？」"
              alt="水道水をそのまま飲める国の数を問うクイズのスライド"
              width={960}
              height={540}
            />
            <details className="mj-quiz">
              <summary>
                <span>水道水をそのまま飲める国は、世界にいくつ？</span>
                <span className="mj-quiz-pill" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                    <polyline points="6,9 12,15 18,9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <div className="mj-quiz-body">
                <p>9〜12か国(およそ6%)</p>
              </div>
            </details>
          </div>

          <div className="mj-city-card craft-paper craft-paper--white reveal">
            <h3>家</h3>
            <p>
              紙管で組んだ寝床と同じように、木造の家も柱・梁・筋交いで組まれています(木造軸組工法)。日本は地震が多いため、つなぎ目を金具で補強して耐震性を高めています。
            </p>
            <div className="mj-city-terms">
              <span className="craft-label">柱</span>
              <span className="craft-label">梁</span>
              <span className="craft-label">筋交い</span>
            </div>
            <MjFigure
              src={IMG.shikanPhoto}
              need="紙管の説明と、紙管を使った建築物の写真"
              alt="紙管（しかん）の説明と、紙管を使った建築物の写真"
              width={960}
              height={640}
            />
            <MjFigure
              src={IMG.woodFrameSlide}
              need="スライド「木造軸組工法(柱・梁・筋交い)」"
              alt="木造軸組工法の柱・梁・筋交いを示したスライド"
              width={960}
              height={540}
            />
            <MjFigure
              src={IMG.woodFramePhoto}
              need="木造の家の写真（柱・梁・筋交いが分かるもの）"
              alt="柱・梁・筋交いで組まれた木造の家"
              width={960}
              height={640}
            />
          </div>
        </div>
      </section>

      {/* ========== D2｜2日目に、こんなことが起きた ========== */}
      <section className="mj-section mj-day2" id="day2">
        <div className="container">
          <div className="mj-section-head">
            <SectionTitle variant={2} lineColor="rgb(var(--accent-rgb))">2日目に、こんなことが起きた</SectionTitle>
          </div>

          {/* D2-01 */}
          <div className="mj-log">
            <span className="mj-log-num" aria-hidden="true">01</span>
            <div className="mj-log-block reveal">
              <h3 className="mj-log-title">新しい漂着者と、1日目のおさらい</h3>
              <p>
                2日目の島には9人(2チーム)。そのうち2人(Sくん・Rくん)は、この日に新しく流れ着いた"漂着者"です。自己紹介では「無人島にいって、暇になったら何して遊ぶ？(電気は使えません)」を聞きました。
              </p>
              <p>
                つぎに、1日目のおさらい。たき火・工作台 → 家づくり(わりばしで試作 → 実物) → 飲み水づくりをふりかえり、1日目の結び方をもう一度やってみたり、アーテックさん制作のろ過の解説動画を見たりしました。
              </p>
            </div>
          </div>

          {/* D2-02 */}
          <div className="mj-log">
            <span className="mj-log-num" aria-hidden="true">02</span>
            <div className="mj-log-block reveal">
              <h3 className="mj-log-title">つくったもの① — あかり</h3>
              <p>
                つくった家で過ごせたけど、おなかが痛くなってきた…。トイレにいきたいけど、真っ暗だ。明かりが欲しい！
              </p>
              <MjFigure
                src={IMG.d2PocketSlide}
                need="当日スライド「ポケットにあるものは・・」(1円玉と10円玉)"
                alt="「ポケットにあるものは・・」と書かれ、1円玉と10円玉が並んだスライド"
                width={1280}
                height={720}
              />
              <p>
                ポケットの中にあったのは、1円玉と10円玉。これを使って、あかりをつくるワークです。
              </p>
              <div className="mj-material-chips">
                <span className="craft-label mj-material-chip">1円玉</span>
                <span className="craft-label mj-material-chip">10円玉</span>
                <span className="craft-label mj-material-chip">キッチンペーパー</span>
                <span className="craft-label mj-material-chip">塩</span>
                <span className="craft-label mj-material-chip">水</span>
                <span className="craft-label mj-material-chip">LED</span>
              </div>

              <div className="mj-step-phase">
                <p className="mj-step-phase-label">STEP1｜1セットでためす</p>
                <MjFigure
                  src={IMG.d2BatteryMaterialsSlide}
                  need="スライド「用意するもの」(1円玉・10円玉・キッチンペーパー・塩・水)"
                  alt="1円玉・10円玉・キッチンペーパー・塩・水を並べた「用意するもの」のスライド"
                  width={1280}
                  height={720}
                />
                <p>
                  塩水にひたしたキッチンペーパーを、1円玉と10円玉ではさみます。LEDの赤い線を10円玉に、黒い線を1円玉につないで…光らない。1セットだけでは、電気が足りませんでした。
                </p>
              </div>

              <div className="mj-step-phase">
                <p className="mj-step-phase-label">STEP2｜何セットもつなげる</p>
                <p>
                  何セットも重ねて、1人で足りなければとなりの子ともつなげてみます。6セットで光らせたコンビが多いなか、3セットで光らせた子も。くふうを聞くと「キッチンペーパーにしっかり塩水をつけて、強く押しつける」とのことでした。
                </p>
                <MjFigure
                  src={IMG.d2BatteryConnectSlide}
                  need="スライド「1人じゃ難しいかも…？横の子と一緒につなげてみよう！」"
                  alt="何セットも重ねた硬貨の電池をLEDにつなぐ図のスライド"
                  width={1280}
                  height={720}
                />
                <MjFigure
                  src={IMG.d2BatteryHands}
                  need="当日写真：テーブルで電池をつくっている様子"
                  alt="紙皿の上で硬貨とキッチンペーパーを重ねて電池をつくる子どもたち"
                  width={4032}
                  height={3024}
                />
                <MjFigure
                  src={IMG.d2LedLit}
                  need="当日写真：LEDが光った瞬間"
                  alt="重ねた硬貨の電池につないだLEDが赤く光っている手元"
                  width={1216}
                  height={892}
                />
              </div>

              <div className="mj-step-phase">
                <p className="mj-step-phase-label">しくみ｜どうしてLEDがひかるの？</p>
                <p>
                  最初に電池をつくったのは、アレッサンドロ・ボルタ。今回の電池も、ボルタ電池と同じしくみです。1円玉(アルミ)が塩水にとけるときに出た電気が、LEDに流れます。
                </p>
                <MjFigure
                  src={IMG.d2BatteryHowSlide}
                  need="スライド「今回の電池」(10円玉・1円玉・塩水のしくみ図)"
                  alt="10円玉(銅)と1円玉(アルミ)と塩水で電気が流れるしくみの図"
                  width={1280}
                  height={720}
                />
                <MjFigure
                  src={IMG.d2BatterySummarySlide}
                  need="スライド「まとめ」(おかねで電池ができる／たくさんつなぐとひかる／アルミがとけて電気が流れる)"
                  alt="「身近なものでも、あかりはつくれる！」と3つのまとめが書かれたスライド"
                  width={1280}
                  height={720}
                />
              </div>

              <p>
                明かりを灯してトイレに行くことができて、スッキリした。
              </p>
            </div>
          </div>

          {/* D2-03 */}
          <div className="mj-log">
            <span className="mj-log-num" aria-hidden="true">03</span>
            <div className="mj-log-block reveal">
              <h3 className="mj-log-title">つくったもの② — 道</h3>
              <p>
                そうだ！今日は冒険にでかけよう！ ところが、たおれた木が道をふさいでいる。下でつっかえている木と、上に乗っかっている木。どうやってどかす？
              </p>
              <MjFigure
                src={IMG.d2FallenTreeSlide}
                need="当日スライド「たおれた き が みちを ふさいでいる！」"
                alt="たおれた木が道をふさいでいるドット絵のスライド"
                width={1280}
                height={720}
              />
              <p>
                島のおじいさんいわく「力ではなく『頭』で勝負してみるんじゃ」。使っていいのは、ロープと木の枝だけです。
              </p>
              <MjFigure
                src={IMG.d2WisdomSlide}
                need="当日スライド「力ではなく『頭』で勝負してみるんじゃ。」"
                alt="島のおじいさんが「力ではなく『頭』で勝負してみるんじゃ。」と話すドット絵のスライド"
                width={1280}
                height={720}
              />
              <div className="mj-material-chips">
                <span className="craft-label mj-material-chip">ロープ</span>
                <span className="craft-label mj-material-chip">木の枝(紙管のバトン)</span>
              </div>

              <div className="mj-step-phase">
                <p className="mj-step-phase-label">ミッション①｜ラクに動かす(倒木の役＝机)</p>
                <MjFigure
                  src={IMG.d2Mission1Slide}
                  need="スライド「考え試してみよう① そのままひっぱると重い、、ラクに動かす方法を考えよう！」"
                  alt="「そのままひっぱると重い、ラクに動かす方法を考えよう！」のスライド"
                  width={1280}
                  height={720}
                />
                <MjFigure
                  src={IMG.d2Mission1}
                  need="当日写真：ミッション①でロープを引いている様子"
                  alt="紙管のバトンにロープを結んで引っぱる方法を試す子どもたち"
                  width={4032}
                  height={3024}
                />
              </div>

              <div className="mj-step-phase">
                <p className="mj-step-phase-label">ミッション②｜ラクに持ち上げる(倒木の役＝2リットルの水)</p>
                <MjFigure
                  src={IMG.d2Mission2Slide}
                  need="スライド「考え試してみよう② そのまま持ち上げると重い、、ラクにできる方法を考えよう！」"
                  alt="「そのまま持ち上げると重い、ラクにできる方法を考えよう！」のスライド"
                  width={1280}
                  height={720}
                />
                <MjFigure
                  src={IMG.d2Mission2}
                  need="当日写真：ミッション②で持ち上げている様子"
                  alt="2本の紙管にロープをかけて、水の入った袋を持ち上げようとする子どもたち"
                  width={4032}
                  height={2268}
                />
              </div>

              <p>
                どちらも、グループで試したことを最後に発表しました。木の枝2本を滑車のように使って持ち上げようとしたり、ロープを何重にも巻いたり、チームごとにちがうくふうが見られました。
              </p>
              <p>
                最後の解説で紹介したのは、木の枝2本でつくる「手動ウインチ」。そこにたどり着いたチームはいませんでしたが、説明を聞くと「うわあ、その方法があったか！」と、みんなすごく納得していました。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== E2｜2日目のふりかえり ========== */}
      <section className="mj-section mj-notes">
        <div className="container">
          <div className="mj-section-head">
            <SectionTitle variant={3} lineColor="rgb(var(--accent-rgb))">道がひらけたので、ふりかえり</SectionTitle>
          </div>
          <p className="mj-notes-lead">2日目も最後に、3色の付箋にふりかえりを書きました。</p>

          <div className="mj-notes-photo">
            <MjFigure
              src={IMG.d2Furikaeri}
              need="当日写真：付箋にふりかえりを書いている様子"
              alt="2つのテーブルで、付箋にふりかえりを書く子どもたち"
              width={1920}
              height={1080}
            />
          </div>

          <ul className="mj-notes-legend">
            <li><span className="mj-legend-dot mj-legend-dot--y" aria-hidden="true" />黄＝{NOTE_LABELS.yellow}</li>
            <li><span className="mj-legend-dot mj-legend-dot--g" aria-hidden="true" />緑＝{NOTE_LABELS.green}</li>
            <li><span className="mj-legend-dot mj-legend-dot--o" aria-hidden="true" />オレンジ＝{NOTE_LABELS.orange}</li>
          </ul>

          <MjNoteWall notes={NOTES_DAY2_ORDERED} />
        </div>
      </section>

      {/* ========== F2｜2日目：島でやったことは、まちのどこにある？ ========== */}
      <section className="mj-section mj-city">
        <div className="container">
          <div className="mj-section-head">
            <SectionTitle variant={1} lineColor="rgb(var(--accent-rgb))">島でやったことは、まちのどこにある？</SectionTitle>
          </div>
          <p className="mj-city-lead">2日目の最後も、島の外の話をしました。木をどかしたしくみは、まちの道具や乗り物にも使われています。</p>

          <div className="mj-city-card craft-paper craft-paper--white reveal">
            <h3>てこ</h3>
            <p>
              力をかける「力点」、支える「支点」、力が伝わる「作用点」。くぎぬき・せんぬき・はさみ・トングも、てこのしくみで小さな力を大きな力に変えています。
            </p>
            <div className="mj-city-terms">
              <span className="craft-label">力点</span>
              <span className="craft-label">支点</span>
              <span className="craft-label">作用点</span>
            </div>
            <MjFigure
              src={IMG.d2LeverSlide}
              need="スライド「力点・支点・作用点」(くぎぬき・せんぬき・はさみ等)"
              alt="くぎぬき・せんぬき・はさみなど、身近な道具の力点・支点・作用点を示したスライド"
              width={1280}
              height={720}
            />
          </div>

          <div className="mj-city-card craft-paper craft-paper--white reveal">
            <h3>かっしゃ(滑車)</h3>
            <p>
              ロープとプーリー(滑車)を組み合わせると、重さを何本ものロープで分けて支えられます。ロープ6本で支えれば、重さの1/6の力で持ち上げられる。クレーン車やエレベーターも、このしくみです。
            </p>
            <MjFigure
              src={IMG.d2PulleySlide}
              need="スライド「ロープとプーリーで重たい物を持ち上げるしくみ」(クレーン車・エレベーター)"
              alt="ロープとプーリーで重い物を持ち上げるしくみと、クレーン車・エレベーターでの使われ方を示したスライド"
              width={1280}
              height={720}
            />
          </div>
        </div>
      </section>

      {/* ========== G｜3日目へ ========== */}
      <section className="mj-section mj-next">
        <div className="container">
          <div className="mj-next-media">
            <MjFigure
              src={IMG.d2NextSlide}
              need="当日スライド「道は開かれた！次は何が起きるだろう・・」"
              alt="トンネルの出口に向かって歩く人と「道は開かれた！次は何が起きるだろう・・」の文字"
              width={1280}
              height={720}
            />
          </div>
          <h2 className="mj-next-title craft-misprint">3日目は、11月某日の予定です！</h2>
          <div className="mj-next-card craft-paper craft-paper--warm reveal">
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="craft-sticker">
              3日目に申し込む
            </a>
          </div>
        </div>
      </section>

      {/* ========== H｜参加申込 ========== */}
      <section className="mj-section mj-cta">
        <div className="container">
          <div className="mj-section-head">
            <SectionTitle variant={2} lineColor="rgb(var(--accent-rgb))">参加してみたい方へ</SectionTitle>
          </div>

          <div className="mj-first">
            <p className="mj-first-main">はじめての方も参加できます。</p>
            <p className="mj-first-sub">1回だけの参加もできます。</p>
          </div>

          <dl className="mj-cta-list">
            <div className="mj-cta-row">
              <dt>対象</dt>
              <dd>小学3年生以上(小学2年生までは保護者同伴でOK)</dd>
            </div>
            <div className="mj-cta-row">
              <dt>参加費</dt>
              <dd>無料</dd>
            </div>
            <div className="mj-cta-row">
              <dt>会場</dt>
              <dd>アーテック5F</dd>
            </div>
            <div className="mj-cta-row">
              <dt>定員</dt>
              <dd>10〜15名</dd>
            </div>
            <div className="mj-cta-row">
              <dt>形式</dt>
              <dd>全5回シリーズ／単発参加OK</dd>
            </div>
          </dl>

          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="craft-sticker mj-cta-btn">
            参加を申し込む(Googleフォーム)
          </a>
        </div>
      </section>
    </main>
  );
}
