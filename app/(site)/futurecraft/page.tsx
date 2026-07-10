import Link from 'next/link';
import type { CSSProperties } from 'react';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { SectionTitle } from '@/components/craft/SectionTitle';
import { Underline, ArrowRightDoodle } from '@/components/craft/HandDrawn';
import { DoodleIcon, type DoodleIconName } from '@/components/craft/DoodleIcon';

export const metadata = {
  title: 'ミライクラフト（実践） | CLAFT',
  description:
    '作品発表会、イベント企画、商品制作などに挑戦。自分の好きや得意を活かしながら、仲間と試行錯誤し、「仕事」を実感する学びです。'
};

const doodle = (style: Record<string, string | number>) => style as CSSProperties;

type EventItem = {
  id: number;
  date?: string;
  label?: string;
  title: string;
  description: string;
  image: string;
  link: string;
  accentRgb: string;
  tapeClass: string;
  icon?: DoodleIconName;
  isExternal?: boolean;
};

// なんでも発表会・展示会データ
const showcaseEvents: EventItem[] = [
  {
    id: 1,
    date: '2025/11',
    title: 'なんでも発表会・展示会',
    description:
      '自分の好きなことを自由に発表できる場。スクールフェスタ内で継続して行っており、子どもたちだけでなく保護者やスタッフも参加して発表。',
    image: '/assets/futurecraft/present_02.jpg',
    link: 'https://keepon.my.canva.site/tenzikai2025',
    accentRgb: '224 158 22',
    tapeClass: 'craft-tape--cream',
    icon: 'pencil'
  },
  {
    id: 2,
    date: '2025/7',
    title: 'なんでも発表会',
    description:
      '自分の好きなことを自由に発表できる場。スクールフェスタ内で継続して行っており、子どもたちだけでなく保護者やスタッフも参加して発表。',
    image: '/assets/futurecraft/present_02.jpg',
    link: 'https://www.keeponlearning.fun/nandemo2025summer',
    accentRgb: 'var(--brand-rgb)',
    tapeClass: '',
    icon: 'sparkle'
  }
];

// その他発表会やイベントデータ
const otherEvents: EventItem[] = [
  {
    id: 1,
    date: '2025/3',
    title: 'テーマ発表会',
    description:
      '未来予測を参考に何年か後の学校(学べる場所)を考え、マイクラ、ロボット、スライド、イラストなどを使って動画で自由に発表。',
    image: '/assets/futurecraft/present_01.jpg',
    link: 'https://www.keeponlearning.fun/1-theme',
    accentRgb: 'var(--pink-rgb)',
    tapeClass: 'craft-tape--pink',
    icon: 'flag'
  },
  {
    id: 2,
    date: '2024/11',
    title: 'マイクラコンテスト',
    description:
      '大人気ゲーム「マインクラフト」をつかった発表会！テーマについて自分なりの解決方法を、マイクラのワールドで表現。',
    image: '/assets/futurecraft/present_03.jpg',
    link: 'https://www.keeponlearning.fun/education-minecraft3',
    accentRgb: 'var(--violet-rgb)',
    tapeClass: 'craft-tape--violet',
    icon: 'bolt'
  }
];

// イベント企画データ
const eventProjects: EventItem[] = [
  {
    id: 1,
    label: 'NEW！現在活動中',
    title: 'STEAMキャンプ',
    description:
      '海外の子どもたちとオンラインで交流し、STEAM教育を通じて国際的な視野を育むプログラム。言語や文化の壁を超えた協働体験。',
    image: '/assets/futurecraft/asia-steam-camp.png',
    link: '/asia-steam-camp',
    accentRgb: 'var(--brand-rgb)',
    tapeClass: '',
    isExternal: false
  },
  {
    id: 2,
    label: 'NEW！現在活動中',
    title: 'PLAY CLAFT',
    description:
      '「遊ぶ人」から「遊びをつくる人」へ。お店や会社のように「提供する側」の視点を体験できる、特別な学びの場です。',
    image: '/assets/futurecraft/event_01.jpg',
    link: '/play-claft',
    accentRgb: '224 158 22',
    tapeClass: 'craft-tape--cream',
    isExternal: false
  },
  {
    id: 3,
    label: '2025/3',
    title: 'スクールフェスタ',
    description:
      '3月・7月・11月に行われるスクールのお祭り。スタッフだけでなく、スクール生が企画したイベントも行います。',
    image: '/assets/futurecraft/event_02.jpg',
    link: 'https://www.keeponlearning.fun/schoolfesta-spring25',
    accentRgb: 'var(--pink-rgb)',
    tapeClass: 'craft-tape--pink',
    isExternal: true
  },
  {
    id: 4,
    label: '2024/5~11',
    title: '自分カイシャづくり体験',
    description:
      '会社を経営するとはどういうことなのか、を本格的に経験できる小学校6年生以上を対象としたキャリア教育です。',
    image: '/assets/futurecraft/event_03.jpg',
    link: 'https://www.keeponlearning.fun/company',
    accentRgb: 'var(--violet-rgb)',
    tapeClass: 'craft-tape--violet',
    isExternal: true
  }
];

// 横スクロールカード（発表会・展示会）
function ShowcaseCard({ event, index }: { event: EventItem; index: number }) {
  return (
    <div
      className="cd-scroll-card craft-paper craft-tilt"
      style={
        {
          '--accent-rgb': event.accentRgb,
          '--tape-rgb': event.accentRgb,
          '--rot': `${index % 2 === 0 ? -1 : 1}deg`,
          width: '300px'
        } as CSSProperties
      }
    >
      <span className={`craft-tape ${event.tapeClass}`} aria-hidden="true" />

      {/* 写真（ポラロイド＋日付バッジ） */}
      <div className="cd-photo craft-photo" style={{ transform: 'rotate(-0.6deg)' }}>
        <img src={event.image} alt={event.title} />
        {event.date && <span className="cd-photo-badge">{event.date}</span>}
      </div>

      {event.icon && (
        <span className="cd-card-icon" style={{ marginInline: 'auto', marginBottom: '8px' }} aria-hidden="true">
          <DoodleIcon name={event.icon} size={30} />
        </span>
      )}

      <h3 style={{ textAlign: 'center', color: 'rgb(var(--accent-rgb))' }}>{event.title}</h3>
      <p className="cd-scroll-desc" style={{ flex: 1, textAlign: 'center' }}>
        {event.description}
      </p>

      <a
        href={event.link}
        target="_blank"
        rel="noopener noreferrer"
        className="craft-sticker"
        style={{ background: 'rgb(var(--accent-rgb))', alignSelf: 'center', padding: '10px 22px', fontSize: 'var(--text-sm)' }}
      >
        詳しく見る
        <ArrowRightDoodle width={20} />
      </a>
    </div>
  );
}

// 縦並びの画像カード（イベント企画 / その他イベント）
function EventCard({ event, index }: { event: EventItem; index: number }) {
  const button = (
    <span className="craft-sticker" style={{ background: 'rgb(var(--accent-rgb))', padding: '11px 24px', fontSize: 'var(--text-sm)' }}>
      詳しく見る
      <ArrowRightDoodle width={20} />
    </span>
  );

  return (
    <article
      className="craft-paper craft-tilt craft-lift reveal"
      style={
        {
          '--accent-rgb': event.accentRgb,
          '--tape-rgb': event.accentRgb,
          '--rot': `${index % 2 === 0 ? -0.6 : 0.6}deg`,
          transitionDelay: `${index * 80}ms`
        } as CSSProperties
      }
    >
      <span className={`craft-tape ${event.tapeClass}`} aria-hidden="true" />

      {/* 写真（ラベルバッジ付き） */}
      <div className="cd-photo craft-photo" style={{ margin: '0 0 4px', transform: 'none' }}>
        <img src={event.image} alt={event.title} />
        {(event.label || event.date) && <span className="cd-photo-badge">{event.label ?? event.date}</span>}
      </div>

      <div style={{ padding: '20px 24px 24px' }}>
        <h3 className="cd-card-title" style={{ marginBottom: '12px' }}>
          {event.title}
        </h3>
        <p style={{ margin: '0 0 20px', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-700)' }}>
          {event.description}
        </p>

        {event.isExternal ? (
          <a href={event.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            {button}
          </a>
        ) : (
          <Link href={event.link} style={{ textDecoration: 'none' }}>
            {button}
          </Link>
        )}
      </div>
    </article>
  );
}

export default function FuturecraftPage() {
  return (
    <MobileContainer>
      {/* ===== ヒーローセクション ===== */}
      <Section className="cd-hero">
        <h1 className="cd-hero-title craft-misprint">
          ミライクラフト<span className="cd-hero-small">(実践)</span>
        </h1>
        <Underline variant={1} className="cd-hero-line craft-draw craft-draw--auto" style={{ color: 'var(--cream)' }} />

        <p className="cd-hero-lead">
          作品発表会、イベント企画、商品制作などに挑戦。自分の好きや得意を活かしながら、仲間と試行錯誤し、「仕事」を実感する学びです。
        </p>

        <p className="cd-hero-badges">
          <Link href="/career" className="craft-label">キャリアコースの学び</Link>
          <span className="craft-label">どのコースの方も参加できます</span>
        </p>

        {/* 漂う手描きアイコン */}
        <div className="cd-float-row" aria-hidden="true">
          <span className="craft-float" style={doodle({ color: 'var(--cream)', '--rot': '-6deg' })}>
            <DoodleIcon name="bolt" size={38} />
          </span>
          <span className="craft-float" style={doodle({ color: 'var(--brand)', '--rot': '4deg', animationDelay: '0.5s' })}>
            <DoodleIcon name="bulb" size={38} />
          </span>
          <span className="craft-float" style={doodle({ color: 'var(--pink)', '--rot': '-4deg', animationDelay: '1s' })}>
            <DoodleIcon name="pencil" size={38} />
          </span>
        </div>
      </Section>

      {/* ===== なんでも発表会・展示会 ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '18px' }}>
          <SectionTitle variant={1} lineColor="var(--cream)">
            なんでも発表会・展示会
          </SectionTitle>
        </div>

        <p className="cd-hero-lead" style={{ marginBottom: '8px', color: 'var(--ink-600)' }}>
          自分の好きなことを自由に発表できる場。スクールフェスタ内で継続して行っており、子どもたちだけでなく保護者やスタッフも参加して発表。
        </p>

        <div className="cd-hscroll" style={{ ['--accent-rgb' as string]: 'var(--cream-rgb)' } as CSSProperties}>
          {showcaseEvents.map((event, i) => (
            <ShowcaseCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </Section>

      {/* ===== イベント企画 ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '18px' }}>
          <SectionTitle variant={2} lineColor="var(--brand)">
            イベント企画
          </SectionTitle>
        </div>

        <p className="cd-hero-lead" style={{ marginBottom: '32px', color: 'var(--ink-600)' }}>
          「どんなワクワクを届ける？」から考え、チームで商品サービスを制作します。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
          {eventProjects.map((project, i) => (
            <EventCard key={project.id} event={project} index={i} />
          ))}
        </div>
      </Section>

      {/* ===== 地域課題解決 ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '18px' }}>
          <SectionTitle variant={3} lineColor="var(--violet)">
            地域課題解決
          </SectionTitle>
        </div>

        <p className="cd-hero-lead" style={{ marginBottom: '32px', color: 'var(--ink-600)' }}>
          「今の社会の課題は？」から"自分にできること"へ。地域と連携した実践プロジェクト。
        </p>

        <article
          className="craft-paper craft-tilt craft-lift reveal"
          style={{ '--accent-rgb': 'var(--violet-rgb)', '--tape-rgb': 'var(--violet-rgb)', '--rot': '-0.5deg' } as CSSProperties}
        >
          <span className="craft-tape craft-tape--violet" aria-hidden="true" />

          <div className="cd-photo craft-photo" style={{ margin: '0 0 4px', transform: 'none' }}>
            <img src="/assets/futurecraft/social_01.jpg" alt="地域課題解決の取り組み" />
            <span className="cd-photo-badge">今後実施予定</span>
          </div>

          <div style={{ padding: '20px 24px 24px' }}>
            <h3 className="cd-card-title" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ color: 'rgb(var(--accent-rgb))' }} aria-hidden="true">
                <DoodleIcon name="leaf" size={28} />
              </span>
              地域と連携した実践
            </h3>

            <p style={{ margin: '0 0 16px', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-700)' }}>
              自治体・企業・団体と協働し、実社会で試すプロジェクト。地域が抱える実際の課題に向き合い、自分たちのアイデアで解決に挑戦します。
            </p>

            <p className="cd-tip">
              <strong>Coming Soon:</strong> 地域の企業や団体と連携した、実践的なプロジェクトを準備中です。詳細が決まり次第お知らせします。
            </p>
          </div>
        </article>
      </Section>

      {/* ===== その他発表会やイベント ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '18px' }}>
          <SectionTitle variant={1} lineColor="var(--pink)">
            その他発表会やイベント
          </SectionTitle>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
          {otherEvents.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </Section>

      {/* ===== 失敗は本当に悪いこと？ ===== */}
      <Section>
        <div className="hp-section-head" style={{ marginBottom: '28px' }}>
          <SectionTitle variant={2} lineColor="var(--cream)">
            失敗は本当に悪いこと？
          </SectionTitle>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 導入 */}
          <div className="cd-card craft-paper craft-paper--ruled craft-tilt reveal" style={{ '--rot': '-0.4deg' } as CSSProperties}>
            <span className="craft-tape craft-tape--cream" aria-hidden="true" />
            <p>
              「失敗したらどう思われるだろう？」「一度失敗したら次はないかもしれない」「立ち直れる自信がない・・・」そういった「失敗＝悪」という考えを、私たちは払拭したいと考えております。
            </p>

            <p className="cd-tip" style={{ '--accent-rgb': '224 158 22', margin: '20px 0' } as CSSProperties}>
              「失敗はつらい。でもやらない後悔はもっとつらい。」<br />
              心の底では誰もがそう感じているのではないでしょうか。
            </p>

            <p style={{ margin: 0 }}>
              実際、コーネル大学の心理学者トーマス・ギロヴィッチの研究で、「行動による後悔」よりも「行動しなかったことによる後悔」の方が大きいと示されています。これは「感情の持続性」が関係しているとされています。行動による後悔は、時間とともに薄れていく傾向がある一方で、行動しなかったことによる後悔は心に長く残りやすい。「もしあの時やっていたら…」という思いが、いつまでも残りやすいからです。
            </p>
          </div>

          {/* サブ1 */}
          <div className="cd-card craft-paper craft-paper--ruled craft-tilt reveal" style={{ '--accent-rgb': 'var(--brand-rgb)', '--rot': '0.4deg' } as CSSProperties}>
            <span className="craft-tape" aria-hidden="true" />
            <h3 className="cd-card-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'rgb(var(--accent-rgb))' }} aria-hidden="true">
                <DoodleIcon name="bulb" size={26} />
              </span>
              それでも「やめといた方がいいよ」とつい言ってしまう
            </h3>
            <p>
              自分の失敗経験や一般的なケースにあてはめて、良かれと思ってアドバイスをしてしまうことがありますよね。「子どもには同じ経験をさせたくない」「できるだけ失敗は避けてほしい」・・これは思いやりでありつつ、お節介なのかもしれません。
            </p>
            <p style={{ margin: 0 }}>
              子どもにとっては、多くのことが新たなチャレンジであり、挑戦そのものが大きな学びになるでしょう。時代が変われば、昔の経験が通用しないことも多々あります。「それは危ないよ」「失敗したらどうするの？」という声が、チャレンジの機会を奪い、成長を阻んでいるかもしれません。
            </p>
          </div>

          {/* サブ2 */}
          <div className="cd-card craft-paper craft-paper--ruled craft-tilt reveal" style={{ '--accent-rgb': 'var(--green-rgb)', '--rot': '-0.3deg' } as CSSProperties}>
            <span className="craft-tape craft-tape--green" aria-hidden="true" />
            <h3 className="cd-card-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'rgb(var(--accent-rgb))' }} aria-hidden="true">
                <DoodleIcon name="rocket" size={26} />
              </span>
              挑戦と失敗がつくる「学習経験」
            </h3>
            <p>
              「学習経験」という言葉があります。自分がやってみて得られた経験のことです。勉強や読書のインプットだけでなく、実際に体験しながら学び、時には失敗し、そこから得た気づきや学びが深く記憶に残るという意味です。
            </p>
            <p>
              たとえば、初めて自転車に乗れたときを思い出してください。最初はうまくバランスをとれず、失敗して転んでしまったと思います。「こうやってハンドルを持って、ペダルをこぐんだよ」と教えられても、実際に自転車に乗ると思うようにいかない。でも、その「転んだ経験」から、次はどうやったらバランスが取れるか体で覚え、少しずつ乗れるようになっていきます。
            </p>
            <p style={{ margin: 0 }}>
              このように、たとえ失敗しても、それを繰り返しながら少しずつ自信をつけ、最終的には自分の力でできるようになるプロセスこそが「学習経験」です。失敗も含めた学習経験は、感情とともに自分自身を成長させる大きな学びの機会です。一方で、失敗を恐れ挑戦しないでいると、どうしても安全な体験しか得られなくなります。そうなると、困難な問題に自分の力で立ち向かい、解決できたという経験が少なくなってしまいます。
            </p>
          </div>

          {/* サブ3 */}
          <div className="cd-card craft-paper craft-paper--ruled craft-tilt reveal" style={{ '--accent-rgb': 'var(--pink-rgb)', '--rot': '0.3deg' } as CSSProperties}>
            <span className="craft-tape craft-tape--pink" aria-hidden="true" />
            <h3 className="cd-card-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'rgb(var(--accent-rgb))' }} aria-hidden="true">
                <DoodleIcon name="search" size={26} />
              </span>
              自己肯定感・自己有用感が低い国、ニッポン
            </h3>
            <p>
              自分の力で何かを解決した経験が乏しい。また、自分の可能性を信じることができない。こうした背景が、日本の若者の自己肯定感や自己有用感の低さにつながっているのかもしれません。
            </p>

            <div className="cd-tip" style={{ '--accent-rgb': 'var(--pink-rgb)', margin: '4px 0 16px' } as CSSProperties}>
              <span style={{ display: 'block', marginBottom: '8px', color: 'var(--ink-600)', fontWeight: 500, fontSize: 'var(--text-sm)' }}>
                内閣府「我が国と諸外国のこどもと若者の意識に関する調査（2023年度）」13～29歳の日本の若者の回答：
              </span>
              <span style={{ display: 'block', lineHeight: 1.9, color: 'var(--ink-800)' }}>
                私は、自分自身に満足している <strong>57.4%</strong><br />
                自分には長所があると感じている <strong>65.6%</strong><br />
                今の自分が好きだ <strong>53.4%</strong><br />
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-600)' }}>※調査対象国の中で最下位</span>
              </span>
            </div>

            <p>
              私たちは、この原因のひとつに「正解主義の教育」があると考えています。現在は情報があふれ、何が正解かわからない時代です。それでも学校教育においては「正解を暗記し、偏差値の高さで競う」のがまだまだ主流。このスタイルが、子どもたちの自己肯定感や自己有用感を損なうだけでなく、不登校の増加にも影響を与えているのではないでしょうか。
            </p>
            <p style={{ margin: 0 }}>
              2022年度の不登校の児童生徒数は299,048人にのぼります。この数は年々増加し、過去10年で2倍にまでなっています。（参考：文部科学省 児童生徒の問題行動・不登校等生徒指導上の諸課題に関する調査）<br /><br />
              このような場面で必要とされるのが、「失敗を含めた学習経験」です。挑戦を恐れ、他の人と同じような経験ばかりを積んでしまうと、「自分とは何か」という問いに答えることが難しくなってしまいます。自ら経験し、失敗も乗り越えることで、自分らしさが見つかるのだと思います。
            </p>
          </div>

          {/* サブ4 */}
          <div className="cd-card craft-paper craft-paper--ruled craft-tilt reveal" style={{ '--accent-rgb': 'var(--brand-rgb)', '--rot': '-0.3deg' } as CSSProperties}>
            <span className="craft-tape" aria-hidden="true" />
            <h3 className="cd-card-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'rgb(var(--accent-rgb))' }} aria-hidden="true">
                <DoodleIcon name="sparkle" size={26} />
              </span>
              失敗OK！自分が学んだことを試し、自分ならではの経験をつくるコミュニティ
            </h3>
            <p>
              学校には、教育や社会性、子どもの発達をサポートする場としての機能があります。しかし、学んだことを実際に試し、経験を積む「実践の場」としての機能は少ないと思っています。
            </p>
            <p>
              現在は情報があふれ、変化が激しい社会です。かつての正解らしきものも問い直され、見直されている世の中において、学んだことをすぐに試し、失敗しても改善策を見つけて動き続けることが大切だと私たちは考えています。
            </p>

            <p className="cd-tip" style={{ '--accent-rgb': 'var(--brand-rgb)', margin: '4px 0 16px' } as CSSProperties}>
              CLAFTは、子どもたちが自ら課題を設定し、その解決策を個人やチームで考え、すぐに試せる場を提供していきます。自らアイデアを持ち寄って、それを形にしていく過程で、自分にしかない経験を積み重ね、自信を育むことができると考えています。
            </p>

            <p>
              また、CLAFTは同じ志を持った仲間が集まるコミュニティでもあります。今の子どもたちの活動範囲は、主に家庭と学校が中心です。それでは社会を知るきっかけが不足しているように思います。評価の基準も限られていて、多様な個性や才能が十分に活かされにくいのが現状です。だからこそ、私たちは「ナナメの関係」が大切だと考えます。
            </p>
            <p style={{ margin: 0 }}>
              企業や団体、地域住民、習い事や教室など、いわゆる「弱いつながり」を持つことです。親や先生とのタテ関係、兄妹や友達とのヨコ関係にはないコミュニケーションや関わり合いが生まれることで、子どもたちが世の中を知る貴重な機会になると思っています。<br /><br />
              あなたもぜひ、私たちと一緒に「ナナメの関係」を築きながら、子どもたちの活動をサポートしていきませんか？
            </p>
          </div>
        </div>
      </Section>

      {/* JSON-LD 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "ミライクラフト（実践）",
            "description": "作品発表会、イベント企画、商品制作などに挑戦。自分の好きや得意を活かしながら、仲間と試行錯誤し、「仕事」を実感する学びです。",
            "provider": { "@type": "Organization", "name": "CLAFT" }
          })
        }}
      />
    </MobileContainer>
  );
}
