import Link from 'next/link';
import type { CSSProperties } from 'react';
import { SectionTitle } from './craft/SectionTitle';
import { Underline, ArrowRightDoodle } from './craft/HandDrawn';
import { DoodleIcon, type DoodleIconName } from './craft/DoodleIcon';

type Program = {
  id: number;
  title: string;
  label: string;
  description: string;
  icon: DoodleIconName;
  accentRgb: string;
  link: string;
  rotate: string;
  underline: 1 | 2 | 3;
};

const programs: Program[] = [
  {
    id: 1,
    title: 'PBL(課題解決型学習)',
    label: '探究',
    description:
      '自分の好きや疑問を起点にテーマを決め、新たなモノを創ったり、解決策を考え、最後は動画やスライドで発表をする学びです。',
    icon: 'search',
    accentRgb: 'var(--pink-rgb)',
    link: '/pbl',
    rotate: '-1.8deg',
    underline: 1
  },
  {
    id: 2,
    title: 'Yononaka(対話ワーク)',
    label: '対話',
    description:
      'お金や時間など、身近なテーマを入り口に、正解がひとつではない問いをみんなで話し合う学びです。考えを言葉にしてみる。ちがう意見を聞いてみる。その往復の中で、世界の見え方が少しずつ広がっていきます。',
    icon: 'talk',
    accentRgb: 'var(--brand-rgb)',
    link: '/yononaka',
    rotate: '1.4deg',
    underline: 2
  },
  {
    id: 3,
    title: 'ミライクラフト',
    label: '実践',
    description:
      '作品発表会、イベント企画、商品制作などに挑戦。自分の好きや得意を活かしながら、仲間と試行錯誤し、「仕事」を実感する学びです。',
    icon: 'bolt',
    // クリームは白文字が沈むため、ラベル/アイコンには深めのアンバーを使う
    accentRgb: '224 158 22',
    link: '/futurecraft',
    rotate: '-1.1deg',
    underline: 3
  },
  {
    id: 4,
    title: 'ジブンクラフト',
    label: '自己理解',
    description:
      '探究・対話・実践を通して見えてきた「自分の強み(非認知能力)」を可視化します。キャリア面談を通して「自分は何をしたいか？どうありたいか？」を深堀りし、目標を定めて、ひとつひとつキャリアを自分の手でクラフト(創造)していきます。',
    icon: 'sparkle',
    accentRgb: 'var(--violet-rgb)',
    link: '/jibun-craft',
    rotate: '0.9deg',
    underline: 1
  }
];

export function ProgramsScrapbook() {
  return (
    <section className="hp-section hp-programs">
      <div className="container">
        <div className="hp-section-head">
          <SectionTitle variant={1} lineColor="var(--cream)">
            CLAFTの学び
          </SectionTitle>
          <p className="lead hp-section-lead">勉強ではなく、新たなモノをつくる「冒険」</p>
        </div>

        {/* スクラップブックに貼られた4枚の紙片 */}
        <div className="hp-programs-grid">
          {programs.map((program, i) => (
            <Link
              key={program.id}
              href={program.link}
              className="hp-program-card craft-paper craft-tilt craft-lift reveal"
              style={
                {
                  '--rot': program.rotate,
                  '--accent-rgb': program.accentRgb,
                  '--tape-rgb': program.accentRgb,
                  transitionDelay: `${i * 90}ms`
                } as CSSProperties
              }
            >
              <span className="craft-tape" aria-hidden="true" />
              <span className="hp-program-label">{program.label}</span>

              <span className="hp-program-icon" aria-hidden="true">
                <DoodleIcon name={program.icon} size={36} />
              </span>

              <h3 className="hp-program-title">{program.title}</h3>
              <Underline
                variant={program.underline}
                className="hp-program-line craft-draw"
              />

              <p className="hp-program-desc">{program.description}</p>
            </Link>
          ))}
        </div>

        {/* メンバーのストーリーボタン */}
        <div className="hp-programs-cta reveal">
          <Link href="/student-story" className="craft-sticker">
            メンバーのストーリー
            <ArrowRightDoodle width={24} />
          </Link>
        </div>
      </div>
    </section>
  );
}
