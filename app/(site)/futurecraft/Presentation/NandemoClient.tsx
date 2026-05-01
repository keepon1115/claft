"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Mic,
  Heart,
  Users,
  Lightbulb,
  ShieldCheck,
  Rocket,
  Gamepad2,
  Palette,
  BookOpen,
  Carrot,
  ArrowRight,
  Star,
  PartyPopper,
  HandHeart,
  MessageCircle,
  ChevronDown,
} from "lucide-react";

/* ============================================================
   なんでも発表会 ランディングページ
   - わくわく感重視 / アニメーション多め / 余白広め
   - スマホファースト
============================================================ */

export default function NandemoClient() {
  return (
    <main className="relative overflow-hidden bg-[#FFFBF2] text-slate-800">
      {/* 背景のふわふわドット */}
      <BackgroundDecor />

      <Hero />
      <WhyHard />
      <WhatIsIt />
      <Themes />
      <Benefits />
      <Support />
      <Voices />
      <FinalCTA />

      <GlobalStyles />
    </main>
  );
}

/* ============================================================
   HERO
============================================================ */
function Hero() {
  return (
    <section className="relative px-6 pt-24 pb-32 sm:px-10 sm:pt-32 sm:pb-40">
      <div className="mx-auto max-w-5xl text-center">
        {/* バッジ */}
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-amber-300 bg-white/70 px-5 py-2 text-sm font-bold text-amber-600 shadow-sm backdrop-blur animate-bounce-slow">
          <Sparkles className="h-4 w-4" />
          スクールフェスタ恒例イベント
        </div>

        {/* タイトル */}
        <h1 className="mt-8 text-4xl font-black leading-[1.15] tracking-tight sm:text-6xl md:text-7xl">
          <span className="block text-slate-900">好きなことを、</span>
          <span className="relative mt-2 inline-block">
            <span className="relative z-10 text-slate-900">
              好きなだけ。
            </span>
            <span className="absolute -bottom-2 left-0 right-0 h-3 -rotate-1 rounded-full bg-yellow-200/70" />
          </span>
        </h1>

        {/* メインビジュアル */}
        <div className="relative mx-auto mt-12 w-full max-w-3xl">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border-4 border-white shadow-2xl shadow-orange-200/50">
            <img
              src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1600&q=80"
              alt="なんでも発表会のイメージ"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* 浮遊フキダシ */}
          <FloatingBubble
            text="ゲームのこと"
            className="-left-4 -top-6"
            color="bg-pink-400"
            delay="0s"
          />
          <FloatingBubble
            text="おもちゃ自慢"
            className="-right-2 -top-4"
            color="bg-sky-400"
            delay="1s"
          />
          <FloatingBubble
            text="自作の作品"
            className="-left-2 bottom-6"
            color="bg-emerald-400"
            delay="2s"
          />
          <FloatingBubble
            text="マニアな趣味"
            className="-right-4 bottom-2"
            color="bg-violet-400"
            delay="0.5s"
          />
        </div>

        {/* キャッチコピー */}
        <p className="mx-auto mt-12 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          ゲームも、おもちゃも、自作の作品も。
          <br className="hidden sm:block" />
          自分の<strong className="text-slate-900">“好き"</strong>を堂々と語れる、
          <br />
          年齢も内容も自由なステージへようこそ。
        </p>

        {/* スクロール誘導 */}
        <div className="mt-16 flex justify-center">
          <div className="flex flex-col items-center gap-2 text-slate-400 animate-bounce">
            <span className="text-xs font-medium tracking-widest">SCROLL</span>
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingBubble({
  text,
  className = "",
  color = "bg-pink-400",
  delay = "0s",
}: {
  text: string;
  className?: string;
  color?: string;
  delay?: string;
}) {
  return (
    <div
      className={`absolute z-20 ${className} animate-float`}
      style={{ animationDelay: delay }}
    >
      <div
        className={`relative rounded-2xl ${color} px-3 py-2 text-xs font-bold text-white shadow-lg sm:px-4 sm:py-2.5 sm:text-sm`}
      >
        {text}
        <div
          className={`absolute -bottom-1.5 left-4 h-3 w-3 rotate-45 ${color}`}
        />
      </div>
    </div>
  );
}

/* ============================================================
   なぜ発表が苦手なのか
============================================================ */
function WhyHard() {
  const reasons = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "テーマが決められている",
      desc: "学校の発表は先生が決めたテーマばかり。「自分から話したい！」と思える機会は意外と少ないものです。",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "失敗するのが怖い",
      desc: "間違えたら恥ずかしい。クラスでいじられるかも…。その不安が、一歩を踏み出せない理由になっています。",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "伝え方がわからない",
      desc: "話したいことはあるのに、どう構成すればいいのかわからない。これは大人になっても続く悩みです。",
    },
  ];

  return (
    <section className="relative px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionLabel color="text-slate-500">Issue ・ 課題</SectionLabel>
        <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-5xl">
          “人前で話すこと"、
          <br />
          なぜ苦手なんだろう？
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          小中学生だけでなく、大人になっても「発表が苦手」という人はとても多い。
          その理由は、緊張感だけじゃありません。
        </p>

        <div className="mt-14 grid gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="group relative rounded-3xl border-2 border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-100 to-amber-100 text-rose-500 transition-transform group-hover:rotate-6">
                {r.icon}
              </div>
              <h3 className="mt-6 text-lg font-bold text-slate-900">
                {r.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {r.desc}
              </p>
              <span className="absolute right-6 top-6 text-3xl font-black text-slate-100">
                0{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   なんでも発表会とは
============================================================ */
function WhatIsIt() {
  return (
    <section className="relative px-6 py-24 sm:px-10 sm:py-32">
      <div className="absolute inset-x-0 top-0 mx-auto h-[600px] max-w-6xl rounded-[60px] bg-gradient-to-br from-amber-100 via-orange-100 to-pink-100 -z-10" />
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <SectionLabel color="text-orange-500">Solution ・ 解決</SectionLabel>
          <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-5xl">
            それなら、
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">こんな発表会はどう？</span>
              <Star
                className="absolute -right-8 -top-4 h-7 w-7 animate-spin-slow text-amber-400"
                fill="currentColor"
              />
            </span>
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-3xl bg-white p-8 shadow-xl shadow-orange-100 sm:p-14">
          <div className="flex items-center justify-center gap-3">
            <Mic className="h-7 w-7 text-orange-500" />
            <p className="text-sm font-bold tracking-widest text-orange-500">
              NANDEMO HAPPYOUKAI
            </p>
          </div>
          <h3 className="mt-4 text-center text-2xl font-black leading-tight text-slate-900 sm:text-4xl">
            なんでも発表会
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-loose text-slate-700 sm:text-lg">
            その名のとおり、
            <strong className="text-orange-600">
              自分の好きなことを“何でも"発表していい
            </strong>
            会。
            <br />
            CLAFTの「スクールフェスタ」で毎回開催している、恒例の催しです。
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <FeaturePill icon={<Heart className="h-5 w-5" />} label="自由なテーマ" />
            <FeaturePill icon={<Users className="h-5 w-5" />} label="年齢ミックス" />
            <FeaturePill
              icon={<HandHeart className="h-5 w-5" />}
              label="失敗を笑わない"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturePill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-full border-2 border-amber-200 bg-amber-50 px-5 py-3 text-sm font-bold text-amber-700">
      {icon}
      {label}
    </div>
  );
}

/* ============================================================
   こんなテーマで発表できる
============================================================ */
function Themes() {
  const themes = [
    {
      icon: <Gamepad2 className="h-7 w-7" />,
      title: "ハマってるゲーム",
      desc: "今夢中になっているゲームの魅力を、思う存分プレゼン。",
      color: "from-violet-400 to-fuchsia-400",
      bg: "bg-violet-50",
    },
    {
      icon: <Palette className="h-7 w-7" />,
      title: "自作のゲーム・作品",
      desc: "自分で作ったものを紹介して、みんなに遊んでもらおう。",
      color: "from-emerald-400 to-teal-400",
      bg: "bg-emerald-50",
    },
    {
      icon: <Sparkles className="h-7 w-7" />,
      title: "推しのおもちゃ",
      desc: "コレクションへの愛を熱く語る時間。共感者がきっといる。",
      color: "from-pink-400 to-rose-400",
      bg: "bg-pink-50",
    },
    {
      icon: <BookOpen className="h-7 w-7" />,
      title: "歴史上の人物",
      desc: "ある先輩は「福沢諭吉」をテーマに大盛り上がり。",
      color: "from-amber-400 to-orange-400",
      bg: "bg-amber-50",
    },
    {
      icon: <Carrot className="h-7 w-7" />,
      title: "有機野菜のはなし",
      desc: "保護者の方が畑で育てた野菜を持ち込んで発表＆販売も。",
      color: "from-lime-400 to-green-400",
      bg: "bg-lime-50",
    },
    {
      icon: <Lightbulb className="h-7 w-7" />,
      title: "なんでもアリ！",
      desc: 'あなたの"好き"は、それだけで立派なテーマになる。',
      color: "from-sky-400 to-cyan-400",
      bg: "bg-sky-50",
    },
  ];

  return (
    <section className="relative px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <SectionLabel color="text-pink-500">Themes ・ 発表テーマ</SectionLabel>
          <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-5xl">
            たとえば、こんなこと。
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            “話したいこと"があれば、それでOK。
            <br />
            実際にこれまで発表されてきた、ほんの一例です。
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {themes.map((t, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-3xl ${t.bg} p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${t.color} text-white shadow-lg transition-transform group-hover:rotate-12 group-hover:scale-110`}
              >
                {t.icon}
              </div>
              <h3 className="mt-6 text-xl font-black text-slate-900">
                {t.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {t.desc}
              </p>

              {/* 装飾円 */}
              <div
                className={`absolute -right-12 -bottom-12 h-32 w-32 rounded-full bg-gradient-to-br ${t.color} opacity-10 transition-transform duration-500 group-hover:scale-150`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   発表で得られるもの
============================================================ */
function Benefits() {
  const benefits = [
    {
      no: "01",
      title: "“好き”が深まる",
      desc: "誰かに伝えるために準備するうちに、自分の好きなことや得意なことを、もっと深く知れる。",
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      no: "02",
      title: "“伝える力”が育つ",
      desc: "「どういう順番で話そうか」と考えるうちに、構成力・表現力が自然と身についていく。",
      img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
    },
    {
      no: "03",
      title: "“仲間”が見つかる",
      desc: "「俺もそれ好き！」と身を乗り出してくれる仲間との出会い。新しい発見が、毎回ある。",
      img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <section className="relative px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <SectionLabel color="text-emerald-500">Benefits ・ 育まれるもの</SectionLabel>
          <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-5xl">
            発表は、
            <br />
            自分を見つめ直す時間。
          </h2>
        </div>

        <div className="mt-20 space-y-20">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="grid items-center gap-10"
            >
              <div className="relative">
                <div className="overflow-hidden rounded-3xl border-4 border-white shadow-xl">
                  <img
                    src={b.img}
                    alt={b.title}
                    className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-96"
                  />
                </div>
                <div className="absolute -left-4 -top-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-2xl font-black text-white shadow-lg sm:-left-6 sm:-top-6 sm:h-24 sm:w-24 sm:text-3xl">
                  {b.no}
                </div>
              </div>
              <div className="px-2 sm:px-6">
                <h3 className="text-2xl font-black leading-tight text-slate-900 sm:text-4xl">
                  {b.title}
                </h3>
                <p className="mt-6 text-base leading-loose text-slate-600 sm:text-lg">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   サポート体制
============================================================ */
function Support() {
  return (
    <section className="relative px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-16 text-white shadow-2xl sm:px-16 sm:py-24">
          {/* 装飾 */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-pink-400/20 blur-3xl" />

          <div className="relative">
            <SectionLabel color="text-amber-300">Support ・ 安心サポート</SectionLabel>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
              「準備、どうしよう…」
              <br />
              <span className="text-amber-300">そこは、頼ってください。</span>
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-loose text-slate-300 sm:text-lg">
              「資料の作り方がわからない」「どう話せば伝わるか不安」——
              そんな声にしっかり応えられるよう、CLAFTのスタッフがサポートします。
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <SupportCard
                icon={<Rocket className="h-6 w-6" />}
                title="プレゼン全国大会の経験者がサポート"
                desc="プレゼン全国大会・関西大会への出場経験を持つスタッフが、基本から丁寧にお伝えします。"
              />
              <SupportCard
                icon={<PartyPopper className="h-6 w-6" />}
                title="失敗を笑わない安全な空間"
                desc='発表の“第一歩"を、失敗を恐れずに踏み出せる場所。聞き手もあたたかく受け止めます。'
              />
            </div>

            <p className="mt-12 text-sm leading-relaxed text-slate-400">
              ※ ここで身につけた力は、学校での発表にもきっと活かせます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SupportCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:bg-white/10">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400 text-slate-900">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{desc}</p>
    </div>
  );
}

/* ============================================================
   声 / 過去の発表
============================================================ */
function Voices() {
  const voices = [
    {
      tag: "スクール生",
      text: "はじめは緊張したけど、好きなゲームのことだから話せた。次はもっと面白く伝えたい！",
      color: "bg-pink-100 text-pink-700",
    },
    {
      tag: "保護者",
      text: "畑の有機野菜について発表させてもらいました。子どもたちの真剣な眼差しに、こちらが学ばされる時間でした。",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      tag: "スタッフ",
      text: "去年は『福沢諭吉』をテーマに発表。最後はみんなで「諭吉、諭吉」と盛り上がる、忘れられない時間に。",
      color: "bg-amber-100 text-amber-700",
    },
  ];

  return (
    <section className="relative px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <SectionLabel color="text-violet-500">Voices ・ これまでの発表</SectionLabel>
          <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-5xl">
            子どもも、大人も。
            <br />
            みんなのステージ。
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            スクール生だけでなく、保護者の方やスタッフも発表者に。
            <br />
            幅広い年齢の人が「好きなこと」を持ち寄る場所です。
          </p>
        </div>

        <div className="mt-16 grid gap-6">
          {voices.map((v, i) => (
            <div
              key={i}
              className="relative rounded-3xl border-2 border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${v.color}`}
              >
                {v.tag}
              </div>
              <p className="mt-5 text-base leading-relaxed text-slate-700">
                “ {v.text} "
              </p>
              <div className="mt-6 flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 text-amber-400"
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FINAL CTA
============================================================ */
function FinalCTA() {
  return (
    <section className="relative px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <div className="relative">
          <Sparkles className="mx-auto h-10 w-10 animate-spin-slow text-amber-400" />
          <h2 className="mt-6 text-4xl font-black leading-[1.15] text-slate-900 sm:text-6xl">
            あなたの"好き"を、
            <br />
            <span className="text-slate-900">
              ステージにのせよう。
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            次回の開催は7/26を予定しています。また後日お知らせします。
          </p>

          <p className="mt-10 text-xs text-slate-400">
            ※「スクールフェスタ」内で開催 / 開催日は公式SNSにて告知
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   共通パーツ
============================================================ */
function SectionLabel({
  children,
  color = "text-slate-500",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <p
      className={`text-xs font-bold tracking-[0.3em] ${color} sm:text-sm`}
    >
      ✦ {children}
    </p>
  );
}

/* ============================================================
   背景デコレーション
============================================================ */
function BackgroundDecor() {
  const [dots, setDots] = useState<
    { left: string; top: string; delay: string; size: number }[]
  >([]);

  useEffect(() => {
    // クライアントサイドでのみ生成（hydration ミスマッチ回避）
    const generated = Array.from({ length: 14 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
      size: 6 + Math.random() * 12,
    }));
    setDots(generated);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-amber-200/40 animate-float"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animationDelay: d.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   グローバルアニメーション (styled-jsx)
============================================================ */
function GlobalStyles() {
  return (
    <style jsx global>{`
      @keyframes float {
        0%,
        100% {
          transform: translateY(0px) rotate(-2deg);
        }
        50% {
          transform: translateY(-12px) rotate(2deg);
        }
      }
      .animate-float {
        animation: float 4s ease-in-out infinite;
      }

      @keyframes bounce-slow {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-6px);
        }
      }
      .animate-bounce-slow {
        animation: bounce-slow 2.5s ease-in-out infinite;
      }

      @keyframes spin-slow {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      .animate-spin-slow {
        animation: spin-slow 6s linear infinite;
      }
    `}</style>
  );
}
