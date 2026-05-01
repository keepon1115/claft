'use client';

import { useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  MessageCircle,
  Mail,
  Heart,
  Lightbulb,
  Footprints,
  Search,
  ArrowRight,
  Star,
  Frame,
  Video,
  Palette,
  PartyPopper,
  Quote,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  小さな子コンポーネント                                                     */
/* -------------------------------------------------------------------------- */

function ExhibitTag({ no, label }: { no: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-3 reveal">
      <span className="font-display text-[11px] tracking-[0.35em] text-[#E04E2C] bg-[#E04E2C]/10 border border-[#E04E2C]/40 px-3 py-1 rounded-full uppercase">
        Exhibit&nbsp;No.{no}
      </span>
      <span className="font-handwritten text-[#1F1810]/60 text-sm">— {label}</span>
    </div>
  );
}

function PolaroidCard({
  src,
  caption,
  rotate,
  className = '',
}: {
  src: string;
  caption: string;
  rotate: string;
  className?: string;
}) {
  return (
    <figure
      className={`polaroid relative bg-white p-3 pb-10 shadow-[0_18px_40px_-20px_rgba(31,24,16,0.45)] ${className}`}
      style={{ transform: `rotate(${rotate})` }}
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#F2B544]/80 rotate-[-2deg] shadow-sm rounded-[2px]" />
      <img
        src={src}
        alt={caption}
        className="w-full h-44 sm:h-52 object-cover grayscale-[15%] contrast-[1.05]"
        loading="lazy"
      />
      <figcaption className="font-handwritten text-center text-[#1F1810] mt-3 text-base">
        {caption}
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  メイン                                                                    */
/* -------------------------------------------------------------------------- */

export default function NandemoTenjikaiContent() {
  const rootRef = useRef<HTMLElement>(null);

  /* スクロール連動でフェードイン */
  useEffect(() => {
    if (!rootRef.current) return;
    const targets = rootRef.current.querySelectorAll<HTMLElement>('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  /* ----------- 画像（後で差し替えやすい一覧） ------------ */
  const heroPolaroids = [
    {
      src: 'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=600&q=80',
      caption: 'うちのウサギ、もちこ',
      rotate: '-6deg',
      pos: 'left-[2%] top-[12%] sm:left-[6%] sm:top-[10%] w-[42%] sm:w-[22%]',
    },
    {
      src: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=80',
      caption: 'マイクラの大ぼうけん',
      rotate: '5deg',
      pos: 'right-[3%] top-[8%] sm:right-[8%] sm:top-[14%] w-[44%] sm:w-[22%]',
    },
    {
      src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
      caption: 'ひとりバンド演奏',
      rotate: '-4deg',
      pos: 'left-[10%] bottom-[4%] sm:left-[18%] sm:bottom-[6%] w-[42%] sm:w-[20%] hidden sm:block',
    },
    {
      src: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&q=80',
      caption: 'はじめてのMV',
      rotate: '7deg',
      pos: 'right-[8%] bottom-[6%] sm:right-[15%] sm:bottom-[10%] w-[44%] sm:w-[22%] hidden sm:block',
    },
  ];

  const examples = [
    {
      src: 'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=800&q=80',
      title: 'ペットの紹介',
      memo: '名前・好きな食べもの・かわいいポイントを大公開！',
    },
    {
      src: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=800&q=80',
      title: 'マイクラの作品',
      memo: '建てた城、つくった街、こだわりの仕掛けを動画で。',
    },
    {
      src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
      title: '一人バンド演奏',
      memo: 'ギターでもピアノでも、おうちで撮った演奏MVを。',
    },
    {
      src: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80',
      title: 'ミュージックビデオ',
      memo: 'スマホで撮って編集！世界にひとつの作品に。',
    },
    {
      src: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80',
      title: '旅行の思い出',
      memo: '行った場所、食べたもの、見つけたものを写真で。',
    },
    {
      src: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
      title: '工作・自由研究',
      memo: '紙や粘土でつくった力作を当日に飾ろう。',
    },
  ];

  const goodPoints = [
    {
      icon: Heart,
      title: '発表が苦手でも、だいじょうぶ',
      body: '人前で話すのがニガテでも安心。展示物を送るだけで、もう参加できています。',
    },
    {
      icon: Lightbulb,
      title: '誰かの「好き」が、自分の発見になる',
      body: 'いろんな人の展示を見ると、「こんな世界があったのか！」という出会いが生まれます。',
    },
    {
      icon: Footprints,
      title: '失敗を恐れない、はじめの一歩',
      body: '上手いも下手もありません。出した、見せた、それだけで大きな前進です。',
    },
    {
      icon: Search,
      title: '準備が、自分を知る時間になる',
      body: 'どう伝えようか考えるうちに「自分はこれが好きだったんだ」と気づくはず。',
    },
  ];

  /* ------------------------------------------------------------------ */
  return (
    <main ref={rootRef} className="relative bg-[#FFF8EC] text-[#1F1810] overflow-hidden">
      {/* グレイン & ペーパー風背景 */}
      <div className="paper-grain pointer-events-none absolute inset-0 z-0" aria-hidden />

      {/* ============================================================== */}
      {/*  HERO                                                           */}
      {/* ============================================================== */}
      <section className="relative z-10 min-h-[100svh] pt-16 sm:pt-24 pb-24 px-5 sm:px-10">
        {/* リボン */}
        <div className="absolute top-0 left-0 right-0 flex justify-center pt-4 sm:pt-6 z-20 pointer-events-none">
          <div className="ribbon font-display text-[10px] sm:text-xs tracking-[0.4em] text-[#FFF8EC] bg-[#E04E2C] px-6 py-1.5 shadow-md uppercase">
            ✦ Open Gallery 2026 ✦
          </div>
        </div>

        {/* 浮かぶポラロイド */}
        <div className="absolute inset-0 pointer-events-none">
          {heroPolaroids.map((p, i) => (
            <div
              key={i}
              className={`absolute float-anim ${p.pos}`}
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <PolaroidCard src={p.src} caption={p.caption} rotate={p.rotate} />
            </div>
          ))}
        </div>

        {/* タイトル中央 */}
        <div className="relative z-10 max-w-3xl mx-auto text-center pt-32 sm:pt-44 pb-16">
          <p className="font-handwritten text-[#2E7D7D] text-base sm:text-lg mb-4 reveal">
            ようこそ、世界でいちばん自由な展示会へ
          </p>

          <h1 className="font-display text-[#1F1810] leading-[0.95] tracking-tight mb-8">
            <span className="block text-6xl sm:text-8xl reveal" style={{ transitionDelay: '0.1s' }}>
              なんでも
            </span>
            <span className="relative inline-block reveal" style={{ transitionDelay: '0.25s' }}>
              <span className="text-6xl sm:text-8xl text-[#E04E2C]">展示会</span>
              <Sparkles className="absolute -top-2 -right-8 text-[#F2B544] w-8 h-8 sparkle-anim" />
            </span>
          </h1>

          <p
            className="font-body text-base sm:text-xl text-[#1F1810]/80 max-w-xl mx-auto leading-loose reveal"
            style={{ transitionDelay: '0.4s' }}
          >
            あなたの<span className="quote-mark">「好き」</span>を、世界にひらこう。
            <br className="hidden sm:block" />
            動画でも、紙でも、工作でも ── ぜんぶ、主役になる場所です。
          </p>

          {/* スクロール案内 */}
          <div className="mt-16 flex flex-col items-center gap-2 reveal" style={{ transitionDelay: '0.6s' }}>
            <span className="font-handwritten text-xs text-[#1F1810]/50">scroll down</span>
            <div className="w-px h-12 bg-[#1F1810]/30 scroll-line" />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/*  EXHIBIT 01 — どんなもの？                                       */}
      {/* ============================================================== */}
      <section className="relative z-10 px-5 sm:px-10 py-24 sm:py-32 max-w-6xl mx-auto">
        <ExhibitTag no="01" label="ABOUT" />

        <h2 className="font-display text-4xl sm:text-6xl mt-6 mb-10 leading-tight reveal">
          「なんでも」って、
          <br />
          <span className="relative inline-block">
            ほんとに、なんでも。
            <span className="absolute left-0 right-0 -bottom-2 h-3 bg-[#F2B544]/60 -z-10 -rotate-1" />
          </span>
        </h2>

        <div className="flex flex-col gap-10 items-start">
          <div className="w-full space-y-6 font-body leading-loose text-base sm:text-lg reveal">
            <p>
              自分の好きなモノ、得意なこと、自由研究、おもしろい遊び、旅行の思い出
              ── なんでも自由に伝えられる展示会です。
            </p>
            <p className="text-[#1F1810]/75">
              「うまく話せるかな」「上手につくれたかな」なんて気にしなくて大丈夫。
              あなたが「これ見てほしい！」と思ったものが、もう立派な展示物です。
            </p>

            <div className="pt-6 reveal">
              <a
                href="#"
                className="group inline-flex items-center gap-3 bg-[#1F1810] text-[#FFF8EC] font-display tracking-wider px-6 py-4 rounded-full hover:bg-[#E04E2C] transition-colors duration-300 shadow-lg"
              >
                <PartyPopper className="w-5 h-5" />
                <span>「なんでも発表会」もあるよ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="font-handwritten text-sm text-[#1F1810]/60 mt-3 ml-2">
                ↑ 展示会の発表バージョンはこちら
              </p>
            </div>
          </div>

          {/* サイドの引用ふきだし */}
          <div className="w-full max-w-lg reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="relative bg-[#2E7D7D] text-[#FFF8EC] p-7 rounded-[28px] shadow-[0_20px_50px_-25px_rgba(46,125,125,0.7)] rotate-[-2deg]">
              <Quote className="w-7 h-7 text-[#F2B544] mb-3" />
              <p className="font-handwritten text-lg leading-relaxed">
                ペットのウサギ紹介、マイクラの作品、ミュージックビデオ、ひとりバンドの演奏 ── ぜんぶ「展示」になる。
              </p>
              <div className="absolute -bottom-3 left-10 w-7 h-7 bg-[#2E7D7D] rotate-45" />
            </div>
          </div>
        </div>

        {/* 例: Polaroid Gallery */}
        <div className="mt-24">
          <p className="font-handwritten text-center text-[#1F1810]/60 mb-10 reveal">
            たとえば、こんなのが展示されました ↓
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10">
            {examples.map((ex, i) => {
              // 固定値の方が SSR/CSR で一致してハイドレーション安全
              const rotations = ['-1.5deg', '1.2deg', '-0.8deg', '1.8deg', '-1.3deg', '0.9deg'];
              return (
              <figure
                key={ex.title}
                className="reveal hover-tilt bg-white p-3 pb-6 shadow-[0_15px_35px_-20px_rgba(31,24,16,0.4)] relative"
                style={{
                  transitionDelay: `${i * 0.08}s`,
                  transform: `rotate(${rotations[i] ?? '0deg'})`,
                }}
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#E89BB0]/70 rotate-[-3deg] rounded-[2px] shadow-sm" />
                <img src={ex.src} alt={ex.title} className="w-full h-40 sm:h-44 object-cover" loading="lazy" />
                <figcaption className="pt-3 px-1">
                  <p className="font-display text-base sm:text-lg text-[#1F1810]">{ex.title}</p>
                  <p className="font-handwritten text-xs sm:text-sm text-[#1F1810]/60 mt-1 leading-snug">
                    {ex.memo}
                  </p>
                </figcaption>
              </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/*  EXHIBIT 02 — 参加方法                                          */}
      {/* ============================================================== */}
      <section className="relative z-10 bg-[#1F1810] text-[#FFF8EC] py-24 sm:py-32 px-5 sm:px-10 my-12">
        <div className="max-w-6xl mx-auto">
          <div className="reveal">
            <span className="inline-flex items-center gap-3">
              <span className="font-display text-[11px] tracking-[0.35em] text-[#F2B544] bg-[#F2B544]/10 border border-[#F2B544]/40 px-3 py-1 rounded-full uppercase">
                Exhibit&nbsp;No.02
              </span>
              <span className="font-handwritten text-[#FFF8EC]/60 text-sm">— HOW TO JOIN</span>
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl mt-6 mb-14 leading-tight reveal">
            やり方は、たったの<span className="text-[#F2B544]">2つ。</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-10">
            {/* カード1 */}
            <div
              className="reveal relative bg-[#FFF8EC] text-[#1F1810] rounded-[32px] p-8 sm:p-10 shadow-2xl group hover:-translate-y-2 transition-transform duration-500"
            >
              <span className="absolute -top-4 -left-4 bg-[#E04E2C] text-[#FFF8EC] font-display text-2xl w-14 h-14 rounded-full flex items-center justify-center rotate-[-8deg] shadow-lg">
                01
              </span>
              <Video className="w-10 h-10 text-[#E04E2C] mb-5" strokeWidth={1.5} />
              <h3 className="font-display text-2xl sm:text-3xl mb-3">家で撮った動画を送る</h3>
              <p className="font-body text-base text-[#1F1810]/75 leading-loose">
                スマホで撮影したそのままでOK。お家の好きな場所、好きな時間に、リラックスして撮ってください。
              </p>
              <div className="mt-6 inline-flex items-center gap-2 font-handwritten text-sm text-[#2E7D7D]">
                <Send className="w-4 h-4" />
                送り先は下にあります
              </div>
            </div>

            {/* カード2 */}
            <div
              className="reveal relative bg-[#FFF8EC] text-[#1F1810] rounded-[32px] p-8 sm:p-10 shadow-2xl group hover:-translate-y-2 transition-transform duration-500 sm:mt-12"
              style={{ transitionDelay: '0.15s' }}
            >
              <span className="absolute -top-4 -left-4 bg-[#2E7D7D] text-[#FFF8EC] font-display text-2xl w-14 h-14 rounded-full flex items-center justify-center rotate-[5deg] shadow-lg">
                02
              </span>
              <Palette className="w-10 h-10 text-[#2E7D7D] mb-5" strokeWidth={1.5} />
              <h3 className="font-display text-2xl sm:text-3xl mb-3">紙や作品を当日に飾る</h3>
              <p className="font-body text-base text-[#1F1810]/75 leading-loose">
                絵、工作、自由研究のレポート… 持ち込んで会場に飾ろう。みんなの作品が並ぶ瞬間は最高です。
              </p>
              <div className="mt-6 inline-flex items-center gap-2 font-handwritten text-sm text-[#E04E2C]">
                <Frame className="w-4 h-4" />
                当日、会場でお待ちしてます
              </div>
            </div>
          </div>

          {/* 連絡先 */}
          <div
            className="reveal mt-14 bg-[#FFF8EC]/5 border border-[#FFF8EC]/20 rounded-3xl p-7 sm:p-10 backdrop-blur"
          >
            <p className="font-handwritten text-[#F2B544] text-sm mb-4">📨 データの送り先</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="flex-1 flex items-center justify-between bg-[#06C755] hover:bg-[#05B048] text-white px-6 py-5 rounded-2xl transition-colors group"
              >
                <span className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6" />
                  <span className="font-display text-lg">キープオンのLINE</span>
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#"
                className="flex-1 flex items-center justify-between bg-[#FFF8EC] text-[#1F1810] px-6 py-5 rounded-2xl hover:bg-[#F2B544] transition-colors group"
              >
                <span className="flex items-center gap-3">
                  <Mail className="w-6 h-6" />
                  <span className="font-display text-lg">メールで送る</span>
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/*  EXHIBIT 03 — いいところ                                         */}
      {/* ============================================================== */}
      <section className="relative z-10 px-5 sm:px-10 py-24 sm:py-32 max-w-6xl mx-auto">
        <ExhibitTag no="03" label="WHY IT'S GOOD" />

        <h2 className="font-display text-4xl sm:text-6xl mt-6 mb-16 leading-tight reveal">
          見せること、準備すること、
          <br />
          <span className="text-[#E04E2C]">それ自体が「学び」。</span>
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {goodPoints.map((g, i) => {
            const Icon = g.icon;
            const accents = ['#E04E2C', '#F2B544', '#2E7D7D', '#E89BB0'];
            return (
              <div
                key={g.title}
                className="reveal relative bg-white border-2 border-[#1F1810] rounded-[28px] p-7 sm:p-9 shadow-[6px_6px_0_0_#1F1810] hover:shadow-[3px_3px_0_0_#1F1810] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-300"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{ backgroundColor: accents[i] + '20' }}
                >
                  <Icon className="w-7 h-7" style={{ color: accents[i] }} strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-xl sm:text-2xl mb-3 leading-snug">{g.title}</h3>
                <p className="font-body text-sm sm:text-base text-[#1F1810]/75 leading-loose">{g.body}</p>
                <span className="absolute top-4 right-5 font-display text-xs text-[#1F1810]/30 tracking-widest">
                  POINT.0{i + 1}
                </span>
              </div>
            );
          })}
        </div>

        {/* 心に残す引用 */}
        <blockquote className="reveal mt-20 max-w-2xl mx-auto text-center">
          <Star className="w-8 h-8 text-[#F2B544] mx-auto mb-5 sparkle-anim" />
          <p className="font-display text-2xl sm:text-3xl leading-relaxed text-[#1F1810]">
            「どういう順番で話そうか」と考えることで、<br />
            「<span className="text-[#E04E2C]">自分はこれが好きだったんだ</span>」と<br />
            見つめ直す時間になる。
          </p>
        </blockquote>
      </section>

      {/* ============================================================== */}
      {/*  EXHIBIT 04 — 何を出す？                                         */}
      {/* ============================================================== */}
      <section className="relative z-10 px-5 sm:px-10 py-24 sm:py-32">
        <div className="max-w-5xl mx-auto bg-[#F2B544]/15 border-2 border-dashed border-[#E04E2C]/40 rounded-[40px] p-8 sm:p-16 relative">
          {/* 角の washi テープ */}
          <span className="absolute -top-3 left-10 w-20 h-7 bg-[#E04E2C]/70 rotate-[-4deg] shadow-md" />
          <span className="absolute -top-3 right-12 w-16 h-7 bg-[#2E7D7D]/70 rotate-[5deg] shadow-md" />

          <ExhibitTag no="04" label="STUCK? START HERE" />

          <h2 className="font-display text-3xl sm:text-5xl mt-6 mb-6 leading-tight reveal">
            何を展示するか迷ったら…
          </h2>
          <p className="font-body text-base sm:text-lg leading-loose text-[#1F1810]/80 max-w-2xl reveal">
            今年（今学年）の<strong className="text-[#E04E2C]">一番の思い出</strong>や、
            <strong className="text-[#E04E2C]">振り返り</strong>を作ってみよう。
            毎日の中に、誰かに見せたい瞬間がきっとあるはず。
          </p>

          <ul className="mt-10 grid sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              { text: '今年から始めたこと', emoji: '🌱' },
              { text: 'がんばったこと', emoji: '💪' },
              { text: '食べられるようになったもの', emoji: '🍅' },
              { text: '行ってみた場所', emoji: '🗺️' },
              { text: '見つけた「すごい！」', emoji: '✨' },
              { text: 'なんでもOK', emoji: '🎁' },
            ].map((item, i) => (
              <li
                key={item.text}
                className="reveal sticky-note bg-white px-5 py-6 font-handwritten text-[#1F1810] text-base sm:text-lg relative shadow-md"
                style={{
                  transitionDelay: `${i * 0.05}s`,
                  transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 1.5}deg)`,
                }}
              >
                <span className="text-2xl mr-2">{item.emoji}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================== */}
      {/*  EXHIBIT 05 — できる/できない                                    */}
      {/* ============================================================== */}
      <section className="relative z-10 px-5 sm:px-10 py-24 sm:py-32 max-w-6xl mx-auto">
        <ExhibitTag no="05" label="RULES" />
        <h2 className="font-display text-4xl sm:text-6xl mt-6 mb-14 leading-tight reveal">
          展示できるもの／<br />できないもの
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-10">
          {/* OK */}
          <div className="reveal relative bg-[#2E7D7D] text-[#FFF8EC] rounded-[32px] p-8 sm:p-10 overflow-hidden">
            <div className="stamp-ok absolute top-6 right-6 font-display text-3xl border-4 border-[#FFF8EC] text-[#FFF8EC] px-4 py-1 rotate-[-12deg] tracking-widest">
              OK
            </div>
            <h3 className="font-display text-2xl sm:text-3xl mb-5 max-w-[70%]">基本、なんでも！</h3>
            <ul className="space-y-3 font-body text-base">
              {['動画', '紙に書いたもの', '工作', 'デジタル作品', 'コレクション展示', '生野菜（OKです！）'].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-[#F2B544] rounded-full" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* NG */}
          <div
            className="reveal relative bg-white border-2 border-[#1F1810] rounded-[32px] p-8 sm:p-10 overflow-hidden sm:mt-10"
            style={{ transitionDelay: '0.1s' }}
          >
            <div className="stamp-ng absolute top-6 right-6 font-display text-3xl border-4 border-[#E04E2C] text-[#E04E2C] px-4 py-1 rotate-[8deg] tracking-widest">
              NG
            </div>
            <h3 className="font-display text-2xl sm:text-3xl mb-5 max-w-[70%]">これは展示できません</h3>
            <ul className="space-y-3 font-body text-base text-[#1F1810]/85">
              {['大きすぎて動かせないもの', '危険な武器', '生き物', '生肉', '生魚'].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E04E2C] rounded-full" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="font-handwritten text-sm text-[#2E7D7D] mt-6">※ 生野菜は OK です！</p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/*  CTA                                                            */}
      {/* ============================================================== */}
      <section className="relative z-10 px-5 sm:px-10 py-24 sm:py-32">
        <div className="relative max-w-4xl mx-auto text-center">
          <Sparkles className="w-10 h-10 text-[#F2B544] mx-auto mb-6 sparkle-anim" />
          <h2 className="font-display text-4xl sm:text-7xl leading-[1] mb-8 reveal">
            さあ、あなたの<br />
            <span className="relative inline-block">
              <span className="text-[#E04E2C]">「好き」</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8 Q50 2, 100 6 T198 4"
                  stroke="#F2B544"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            を、<br className="sm:hidden" />ひらこう。
          </h2>

          <p className="font-body text-base sm:text-lg text-[#1F1810]/75 leading-loose max-w-xl mx-auto reveal">
            次回の開催は7/26を予定しています。また後日お知らせします。
          </p>

          <p className="font-handwritten text-[#1F1810]/60 mt-10 reveal">
            あなたの展示、楽しみに待っています。— Keep On
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/*  STYLES                                                         */}
      {/* ============================================================== */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@500;700&family=Yusei+Magic&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap');

        .font-display {
          font-family: 'Kaisei Decol', serif;
          font-weight: 700;
        }
        .font-body {
          font-family: 'Zen Kaku Gothic New', sans-serif;
          font-weight: 400;
        }
        .font-handwritten {
          font-family: 'Yusei Magic', sans-serif;
        }

        /* 紙のグレイン */
        .paper-grain {
          background-image:
            radial-gradient(circle at 20% 30%, rgba(224, 78, 44, 0.04) 0, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(46, 125, 125, 0.04) 0, transparent 40%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
          opacity: 0.35;
          mix-blend-mode: multiply;
        }

        /* リボン */
        .ribbon {
          clip-path: polygon(8px 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0 50%);
        }

        /* 引用符 */
        .quote-mark {
          color: #e04e2c;
          font-weight: 700;
        }

        /* スクロール線 */
        .scroll-line {
          position: relative;
          overflow: hidden;
        }
        .scroll-line::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #e04e2c;
          animation: scroll-pulse 1.8s ease-in-out infinite;
        }
        @keyframes scroll-pulse {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }

        /* フェードイン */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* 浮遊アニメ */
        .float-anim {
          animation: floaty 6s ease-in-out infinite;
        }
        @keyframes floaty {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        /* キラキラ */
        .sparkle-anim {
          animation: sparkle 2.4s ease-in-out infinite;
        }
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.25) rotate(15deg); opacity: 0.7; }
        }

        /* ホバーで傾く */
        .hover-tilt {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .hover-tilt:hover {
          transform: rotate(0deg) translateY(-6px) scale(1.02) !important;
          box-shadow: 0 25px 45px -20px rgba(31, 24, 16, 0.5);
          z-index: 5;
        }

        /* 付箋 */
        .sticky-note {
          border-radius: 4px 4px 14px 4px;
          background: linear-gradient(180deg, #fffbe8 0%, #fff5d4 100%);
        }
        .sticky-note::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 32px;
          height: 8px;
          background: rgba(31, 24, 16, 0.15);
          border-radius: 0 0 4px 4px;
        }

        /* スタンプ */
        .stamp-ok, .stamp-ng {
          font-weight: 700;
          letter-spacing: 0.2em;
          opacity: 0.95;
        }

        /* 縮小モーション尊重 */
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; transition: none; }
          .float-anim, .sparkle-anim, .scroll-line::after { animation: none; }
        }
      `}</style>
    </main>
  );
}
