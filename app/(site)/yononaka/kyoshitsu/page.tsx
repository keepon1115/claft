'use client';

import { useState, useRef, useEffect } from 'react';
import { MobileContainer, Section } from '@/components/MobileContainer';

const growthItems = [
  {
    id: 1,
    title: '何事においても立ち止まって考える習慣が身につく',
    content:
      '正解が一つではない問いに向き合い、自分なりの答えを導き出す経験を通じて、「考える力」を養います。他者の意見に触れることで「自分ならどう考えるか」を繰り返し、当たり前や常識に立ち止まって、多様な視点から深く考える力が身につきます。',
    icon: '🧠',
    color: '#ffd66b',
  },
  {
    id: 2,
    title: 'コミュニケーションへの不安や恐怖がなくなる',
    content:
      '「人を傷つけないことであれば何を言ってもOK」というルールで、心理的安全性を重視しています。「わからないこと」や「失敗すること」を恐れずに意見を交わせる体験を通じて、話すことへの自信が身につきます。わかりやすく話す力、表現する力、他者の考えを聴く力などが養われます。',
    icon: '💪',
    color: '#34c6be',
  },
  {
    id: 3,
    title: '自己理解が深まり、やりたいことが湧いてくる',
    content:
      '会話をしながら自分の意見を見直すことで、自分自身の価値観や考え方の癖に気づくことができます。さまざまなテーマについて話し合う中で、自分の興味や得意なことに気づいたり、挑戦したいことや探究したいことが自然と湧いてきます。',
    icon: '✨',
    color: '#9b87f5',
  },
];

const voices = [
  {
    grade: '小学6年生',
    title: '「遠慮せず話せる場所」',
    text: '誰もが、自分の思う意見を思う存分話せる場所、間違えてても、遠慮はしない。なぜかというと、人それぞれが意見を持っているから。そして、その人が持っている意見を理解し合える場所じゃないかなと自分は思ってます。',
  },
  {
    grade: '大学3年生',
    title: '「世代を越えて探究できる」',
    text: '幅広い世代の人と話せる環境。先生や教授のようにとっても詳しい人でもいいが、ある程度知っている人と一緒に探求できるような環境。身近な存在から楽しんで学べるところがいいなと思います。',
  },
  {
    grade: '高校1年生',
    title: '「言葉にする課題も見える」',
    text: '論理的なことを言われたら勉強になるし、自分がどう思うのかも理解できる場所。考えを見つけ出すのはできるようになった気がして、それを図化できるのに、言葉にはできず、語彙力が足りないことを実感しています。',
  },
];

const faqItems = [
  {
    question: 'オンラインはどのツールで実施しますか？',
    answer:
      'Zoomを使用します。Zoomのアカウントをお持ちでなくても、リンクをクリックするだけでブラウザからご参加いただけます。',
  },
  {
    question: '何名から開催できますか？定員は？',
    answer:
      '4名から開催可能です。定員は15名です。16名以上の場合は、ファシリテーターを1名追加して対応いたします。詳しくはご相談ください。',
  },
  {
    question: '対象年齢は？',
    answer:
      '小学生から大人まで幅広い年齢の方にご参加いただけます。年齢・立場を超えた対話がYononakaの魅力のひとつです。',
  },
  {
    question: '1回だけの利用でも大丈夫ですか？',
    answer:
      'はい、単発（1回）でのご利用も歓迎しております。まずはお試しで1回から始めていただけます。',
  },
  {
    question: '参加に必要な準備は？',
    answer:
      'インターネット接続環境と、Zoomが使えるデバイス（PC・タブレット・スマートフォン）があれば大丈夫です。事前の専門知識や準備物は一切不要です。',
  },
];

const themes = [
  { id: 1, title: 'お金持ちはなぜ働き続けるのか？', desc: 'もう一生分のお金があるのに、働き続ける人がいる。どうして？ そもそも「お金持ち」って、どんな人のこと？ 働いたことのない今だからこそ、「働く」の意味を想像してみる時間です。', question: '働くことで、お金以外に得られるものって？', color: '#ffd66b' },
  { id: 2, title: '時間の正体', desc: 'なんでも速く、効率的に。技術は進んだのに、「忙しい」は減った気がしない。時間って、短くすればするほどいいんだろうか？ それとも、別の見方がある？ 限りある時間の使い方を、じっくり話してみます。', question: 'あなたにとって、「時間をかけたいな」と思うことは？', color: '#34c6be' },
  { id: 3, title: 'なんで学ばなきゃいけないの？', desc: '「勉強したほうがいい」ってよく言うけど、「なんで？」と聞かれたら、なんて答える？ 机に向かってノートに書くこと——それだけが勉強？ じゃあ、それ以外は？「学ぶ」の正体を一緒に探します。', question: '学校で5教科を学ぶのは、どうして？ 学ぶとどうなる？', color: '#9b87f5' },
  { id: 4, title: '情報とのつきあい方（情報リテラシー）', desc: '誹謗中傷がダメなのは、みんな知ってる。なのに、どうしてなくならないんだろう？ 人のせい？ それとも、SNSという仕組みのせい？ 情報があふれる時代の「つきあい方」を考えてみます。', question: '炎上や誹謗中傷が起きるのは、どうしてだろう？', color: '#f06a6a' },
  { id: 5, title: '虹の色って、いくつある？', desc: '虹は何色？「7色やろ」と答えたあなたも、「藍色いる？」と思ったあなたも、実はみんな正解。国によっては8色、なんと2色のところも。「色」をテーマにすると、人ぞれぞれのちがいを面白がれるかも？', question: '家・学校・公園にある〇〇の色、こう変えたらいいんじゃない？', color: '#ffd66b' },
  { id: 6, title: '子どもと大人', desc: '子どもと大人の境目って、どこ？ 法律では18歳から大人。でも、18歳と75歳が同じ「大人」でいいんだろうか？ 少子高齢化が進む日本で、大人になっていく子どもたちと考えたいテーマ。ぜひ大人の方も一緒に！', question: '「子どもっぽさ」「大人っぽさ」って、なんだろう？', color: '#34c6be' },
  { id: 7, title: 'なんかいいってなに？', desc: '「なんか安心する人」「なんか居心地のいい場所」——その「なんか」って、いったい何？ みんな同じ？ それとも一人ひとり違う？ 言葉にしてみると、自分でも気づいてなかった「感じ方」が見えてくるかも。', question: '雰囲気がいい人って、どんな特徴がある？', color: '#9b87f5' },
  { id: 8, title: '運動すると頭がよくなるってホント？', desc: '2026年はスポーツイヤー。オリンピックにWBC、ワールドカップ——見ていると、体を動かしたくなる。でも運動でつくのは、体力だけ？「運動と脳」の意外な関係を、みんなのカラダの不思議も持ち寄って探ります。', question: '「運動が得意」って、どういう状態のこと？', color: '#f06a6a' },
  { id: 9, title: '覚えるvs忘れる', desc: '覚えようとすると忘れて、忘れたいことほど残ってしまう。記憶って、なんて気まぐれ。あなたは覚えるのが得意？ 周りの「記憶上手」な人は、どんな工夫をしてるんだろう？ 記憶のフシギにせまります。', question: '覚えられること・忘れてしまうことの違いって、なんだろう？', color: '#ffd66b' },
  { id: 10, title: 'ポケモンから考える人気キャラクターのヒミツ', desc: '子どもから大人まで、世界中が夢中なポケモン。どうしてこんなに愛されるんだろう？ 人気者には、どんな「ヒミツ」があるのか。大好きなキャラを入り口に、みんなで楽しく考えます。', question: 'じぶんに『タイプ』をつけるなら、なにタイプ？', color: '#34c6be' },
];

// ─────────────────────────────────────────────
// 共通パーツ
// ─────────────────────────────────────────────

function SectionHeading({ children, color = '#34c6be' }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
      <h2
        className="heading-lg"
        style={{ position: 'relative', display: 'inline-block' }}
      >
        <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
        <svg
          style={{
            position: 'absolute',
            bottom: '-6px',
            left: '-8px',
            width: 'calc(100% + 16px)',
            height: '16px',
            zIndex: 0,
          }}
          viewBox="0 0 200 16"
          preserveAspectRatio="none"
        >
          <path
            d="M3,12 Q50,10 100,11 T197,12"
            stroke={color}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            style={{ opacity: 0.6 }}
          />
        </svg>
      </h2>
    </div>
  );
}

function GrowthAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof growthItems)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) setHeight(contentRef.current.scrollHeight);
  }, []);

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        border: '2px dashed rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: '32px', flexShrink: 0 }}>{item.icon}</span>
        <span
          className="heading-sm"
          style={{ flex: 1, lineHeight: 'var(--leading-snug)' }}
        >
          {item.title}
        </span>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 16px',
            borderRadius: '20px',
            background: isOpen ? item.color : 'rgba(0,0,0,0.05)',
            color: isOpen ? '#fff' : 'var(--ink-600)',
            fontSize: '14px',
            fontWeight: 'var(--font-bold)',
            transition: 'all 0.3s ease',
            flexShrink: 0,
          }}
        >
          {isOpen ? '閉じる' : '詳細'}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </span>
      </button>
      <div
        style={{
          height: isOpen ? height : 0,
          overflow: 'hidden',
          transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          ref={contentRef}
          style={{ padding: '0 24px 24px', borderTop: '1px dashed rgba(0,0,0,0.1)' }}
        >
          <p
            className="body-base"
            style={{
              marginTop: '20px',
              lineHeight: 'var(--leading-loose)',
              color: 'var(--ink-700)',
            }}
          >
            {item.content}
          </p>
        </div>
      </div>
    </div>
  );
}

function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqItems)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) setHeight(contentRef.current.scrollHeight);
  }, []);

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        border: '2px dashed rgba(0,0,0,0.08)',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            flexShrink: 0,
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#34c6be',
            color: '#fff',
            borderRadius: '50%',
            fontWeight: 'var(--font-bold)',
            fontSize: '14px',
            marginTop: '2px',
          }}
        >
          Q
        </span>
        <span
          className="body-base"
          style={{
            flex: 1,
            fontWeight: 'var(--font-bold)',
            lineHeight: 'var(--leading-snug)',
          }}
        >
          {item.question}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--ink-400)"
          strokeWidth="2"
          style={{
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            marginTop: '4px',
          }}
        >
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>
      <div
        style={{
          height: isOpen ? height : 0,
          overflow: 'hidden',
          transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          ref={contentRef}
          style={{ padding: '0 24px 24px', borderTop: '1px dashed rgba(0,0,0,0.1)' }}
        >
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <span
              style={{
                flexShrink: 0,
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#ffd66b',
                color: '#fff',
                borderRadius: '50%',
                fontWeight: 'var(--font-bold)',
                fontSize: '14px',
              }}
            >
              A
            </span>
            <p
              className="body-base"
              style={{ lineHeight: 'var(--leading-loose)', color: 'var(--ink-700)' }}
            >
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof themes)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) setHeight(contentRef.current.scrollHeight);
  }, []);

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        border: '2px dashed rgba(0,0,0,0.08)',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            flexShrink: 0,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: item.color,
          }}
        />
        <span
          className="body-base"
          style={{ flex: 1, fontWeight: 'var(--font-bold)', lineHeight: 'var(--leading-snug)' }}
        >
          {item.title}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--ink-400)"
          strokeWidth="2"
          style={{
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        >
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>
      <div
        style={{
          height: isOpen ? height : 0,
          overflow: 'hidden',
          transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          ref={contentRef}
          style={{ padding: '0 20px 20px', borderTop: '1px dashed rgba(0,0,0,0.1)' }}
        >
          <p
            className="body-sm"
            style={{ marginTop: '16px', lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-700)' }}
          >
            {item.desc}
          </p>
          <p
            className="body-sm"
            style={{
              marginTop: '12px',
              padding: '12px',
              background: `${item.color}15`,
              borderRadius: '10px',
              color: 'var(--ink-700)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            <span style={{ fontWeight: 'var(--font-bold)' }}>お題例：</span>
            {item.question}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ページ本体
// ─────────────────────────────────────────────

export default function YononakaKyoshitsuPage() {
  const [openGrowth, setOpenGrowth] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openTheme, setOpenTheme] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.scroll-animate').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <MobileContainer>
      <style jsx global>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .horizontal-scroll {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: 10px 0 20px 0;
          margin: 0 -20px;
          padding-left: 20px;
          padding-right: 20px;
        }
        .horizontal-scroll::-webkit-scrollbar { height: 6px; }
        .horizontal-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); border-radius: 10px; }
        .horizontal-scroll::-webkit-scrollbar-thumb { background: rgba(52,198,190,0.4); border-radius: 10px; }
        .horizontal-scroll > * { flex-shrink: 0; scroll-snap-align: start; }
        .cta-btn:hover { opacity: 0.9; transform: translateY(-2px); }
        .flow-step-ky { width: 100%; background: white; border-radius: 16px; padding: 18px 20px; display: flex; align-items: center; gap: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
        .flow-step-ky.inner { box-shadow: none; border: 1px solid rgba(52,198,190,0.15); }
        .loop-mark-ky { display: inline-block; animation: loopSpinKy 4s linear infinite; }
        @keyframes loopSpinKy { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes catchcopyReveal {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(52,198,190,0.15); }
          50% { box-shadow: 0 8px 36px rgba(52,198,190,0.42); }
        }
        .cc-lead { animation: catchcopyReveal 0.6s cubic-bezier(0.4,0,0.2,1) 0.15s both; }
        .cc-w1 { animation: catchcopyReveal 0.6s cubic-bezier(0.4,0,0.2,1) 0.4s both; }
        .cc-w2 { animation: catchcopyReveal 0.6s cubic-bezier(0.4,0,0.2,1) 0.7s both; }
        .cc-w3 { animation: catchcopyReveal 0.6s cubic-bezier(0.4,0,0.2,1) 1.0s both; }
        .resolve-glow { animation: glowPulse 3s ease-in-out 1.5s infinite; }
      `}</style>

      {/* ===== 1. ヒーロー ===== */}
      <Section className="scroll-animate">
        <div
          style={{
            marginBottom: '40px',
            background: 'linear-gradient(135deg, rgba(52,198,190,0.08) 0%, rgba(155,135,245,0.08) 100%)',
            borderRadius: '22px',
            padding: '24px 22px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: '-24px', right: '-24px', width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(52,198,190,0.12)' }} />
          <div style={{ position: 'absolute', bottom: '-16px', left: '8px', width: '55px', height: '55px', borderRadius: '50%', background: 'rgba(155,135,245,0.1)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p
              className="cc-lead"
              style={{ fontSize: '13px', color: '#34c6be', fontWeight: 'var(--font-bold)', marginBottom: '12px', letterSpacing: '0.06em', textTransform: 'uppercase' }}
            >
              ── こんな場所、知っていますか？
            </p>
            <p style={{ fontSize: '18px', lineHeight: 2, color: 'var(--ink-800)', fontWeight: 'var(--font-bold)' }}>
              <span className="cc-w1" style={{ display: 'inline' }}>
                <span style={{ background: 'linear-gradient(transparent 58%, rgba(52,198,190,0.35) 58%)' }}>年齢や立場関係なく</span>、
              </span>
              <span className="cc-w2" style={{ display: 'inline' }}>
                <span style={{ background: 'linear-gradient(transparent 58%, rgba(255,214,107,0.45) 58%)' }}>一人ひとりが自分の意見を言い合える</span>、
              </span>
              <br />
              <span className="cc-w3" style={{ display: 'inline' }}>
                そんな<span style={{ background: 'linear-gradient(transparent 58%, rgba(155,135,245,0.35) 58%)' }}>オンラインの対話の場</span>が
                <span style={{ color: '#34c6be', fontSize: '20px', marginLeft: '2px' }}>あるんです！</span>
              </span>
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1
            className="heading-xl"
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>Yononaka</span>
            <svg
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '-10px',
                width: 'calc(100% + 20px)',
                height: '20px',
                zIndex: 0,
              }}
              viewBox="0 0 300 20"
              preserveAspectRatio="none"
            >
              <path
                d="M5,15 Q80,12 150,13 T295,15"
                stroke="#34c6be"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                style={{ opacity: 0.6 }}
              />
            </svg>
          </h1>
        </div>

        <figure
          style={{
            margin: 0,
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          <img
            src="/assets/yononaka/hero.jpg"
            alt="Yononakaの対話ワークの様子"
            style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
          />
        </figure>
      </Section>

      {/* ===== 2. こんな運営者の方におすすめです！ ===== */}
      <Section className="scroll-animate">
        <SectionHeading color="#f06a6a">こんな想いを抱えている、運営者の方におすすめです！</SectionHeading>

        <div
          style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '2px dashed rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            {[
              { text: '年齢・立場に関係なく交流させたい', color: '#f06a6a' },
              { text: '一人ひとりの違いをおもしろがる機会を与えたい', color: '#ffd66b' },
              { text: '新型コロナ以降の閉塞感を打ち破りたい', color: '#34c6be' },
              { text: '学力や技術以外の学びの機会を提供したい', color: '#9b87f5' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '14px 16px',
                  background: `${item.color}10`,
                  borderRadius: '14px',
                  border: `2px solid ${item.color}25`,
                }}
              >
                <span
                  style={{
                    color: item.color,
                    fontSize: '18px',
                    flexShrink: 0,
                    lineHeight: 1.5,
                    fontWeight: 'var(--font-bold)',
                  }}
                >
                  ✓
                </span>
                <p
                  className="body-base"
                  style={{ lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-700)' }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div
            className="resolve-glow"
            style={{
              padding: '20px 24px',
              background: 'linear-gradient(135deg, rgba(52,198,190,0.12), rgba(155,135,245,0.1))',
              borderRadius: '16px',
              border: '2px solid rgba(52,198,190,0.28)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #34c6be, #9b87f5)' }} />
            <p
              className="body-base"
              style={{
                lineHeight: 'var(--leading-relaxed)',
                color: 'var(--ink-800)',
                fontWeight: 'var(--font-bold)',
                fontSize: '16px',
              }}
            >
              ——そういった問題を
              <span
                style={{
                  display: 'inline-block',
                  padding: '2px 9px',
                  background: 'linear-gradient(135deg, #34c6be, #9b87f5)',
                  color: '#fff',
                  borderRadius: '6px',
                  margin: '0 3px',
                  fontWeight: 'var(--font-bold)',
                }}
              >
                Yononaka
              </span>
              が解決できるかもしれません。
            </p>
          </div>
        </div>
      </Section>

      {/* ===== 3. Yononakaとは ===== */}
      <Section className="scroll-animate">
        <SectionHeading color="#34c6be">Yononakaとは</SectionHeading>

        <div
          style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '2px dashed rgba(0,0,0,0.08)',
          }}
        >
          <p
            className="body-base"
            style={{ lineHeight: 'var(--leading-loose)', color: 'var(--ink-700)' }}
          >
            お金や時間など、身近なテーマを入り口に、
            <br />
            正解がひとつではないお題に対し参加者で話し合う、
            <br />
            オンラインの対話ワークです。
            <br />
            <br />
            考えを言葉にしてみる。ちがう意見を聞いてみる。
            <br />
            その往復の中で、自分自身の世界の見え方が少しずつ広がっていく。体験すればするほどハマってしまうはず！
          </p>
        </div>
      </Section>

      {/* ===== 3.5 体験動画 ===== */}
      <Section className="scroll-animate">
        <SectionHeading color="#f06a6a">実際の様子はこちら
        </SectionHeading>
        <div
          style={{
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '2px dashed rgba(0,0,0,0.08)',
            background: '#000',
            aspectRatio: '16/9',
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/-YyaE1WQ87Y"
            title="Yononaka 体験動画"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          />
        </div>
      </Section>

      {/* ===== 4. 単純に集まるのと何が違う？ ===== */}
      <Section className="scroll-animate">
        <SectionHeading color="#ffd66b">単純に集まるのと何が違う？</SectionHeading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            {
              num: '01',
              title: '正解がないことをテーマにする',
              desc: '一般的な授業や討論と違い、「これが正解」という答えのないテーマを扱います。だから評価されない。だから全員が対等に話せます。',
              color: '#ffd66b',
              icon: '🎯',
            },
            {
              num: '02',
              title: 'ひとりひとり順番がまわってくる',
              desc: '流れに任せたフリートークではなく、全員に発言の順番がきます。「聞いているだけ」にならず、自分の言葉で考える機会が生まれます。',
              color: '#34c6be',
              icon: '🔄',
            },
            {
              num: '03',
              title: '否定・評価をしないルールがある',
              desc: '「人を傷つけないことであれば何を言ってもOK」。このルールが心理的安全性を守り、どんな意見も歓迎される場をつくります。',
              color: '#9b87f5',
              icon: '🛡️',
            },
          ].map((item) => (
            <div
              key={item.num}
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                border: '2px dashed rgba(0,0,0,0.08)',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: '48px',
                  height: '48px',
                  background: item.color,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}
              >
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p
                  className="body-sm"
                  style={{ color: item.color, fontWeight: 'var(--font-bold)', marginBottom: '4px' }}
                >
                  {item.num}
                </p>
                <h3 className="heading-sm" style={{ marginBottom: '8px' }}>
                  {item.title}
                </h3>
                <p
                  className="body-sm"
                  style={{ lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-600)' }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== 5. ワークの流れ ===== */}
      <Section className="scroll-animate">
        <SectionHeading color="#34c6be">ワークの流れ</SectionHeading>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, maxWidth: '500px', margin: '0 auto' }}>
          {/* Step 1 */}
          <div className="flow-step-ky">
            <div style={{ flexShrink: 0, width: '36px', height: '36px', background: '#34c6be', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'var(--font-bold)', fontSize: '18px' }}>1</div>
            <div>
              <p style={{ fontSize: '0.95rem', fontWeight: 'var(--font-bold)', color: 'var(--ink-800)', marginBottom: '2px' }}>導入</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--ink-500)' }}>テーマを知る</p>
            </div>
          </div>

          <div style={{ color: '#34c6be', fontSize: '1.5rem', fontWeight: 'var(--font-bold)', padding: '8px 0', lineHeight: 1 }}>↓</div>

          {/* Loop */}
          <div style={{ width: '100%', background: '#fff0f3', border: '2px dashed #e8788a', borderRadius: '20px', padding: '18px 16px 22px', position: 'relative', margin: '4px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <div style={{ background: '#e8788a', color: 'white', fontWeight: 'var(--font-bold)', fontSize: '14px', padding: '6px 16px', borderRadius: '50px', marginTop: '-32px', marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 12px rgba(232,120,138,0.25)' }}>
              <span className="loop-mark-ky">⟳</span>
              これを ×3セット
            </div>

            <div className="flow-step-ky inner">
              <div style={{ flexShrink: 0, width: '36px', height: '36px', background: '#34c6be', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'var(--font-bold)', fontSize: '18px' }}>2</div>
              <div>
                <p style={{ fontSize: '0.95rem', fontWeight: 'var(--font-bold)', color: 'var(--ink-800)', marginBottom: '2px' }}>個人ワーク</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--ink-500)' }}>1分間考える</p>
              </div>
            </div>

            <div style={{ color: '#e8788a', fontSize: '1.2rem', fontWeight: 'var(--font-bold)', padding: '8px 0', lineHeight: 1 }}>↓</div>

            <div className="flow-step-ky inner">
              <div style={{ flexShrink: 0, width: '36px', height: '36px', background: '#34c6be', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'var(--font-bold)', fontSize: '18px' }}>3</div>
              <div>
                <p style={{ fontSize: '0.95rem', fontWeight: 'var(--font-bold)', color: 'var(--ink-800)', marginBottom: '2px' }}>グループ共有</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--ink-500)' }}>順番に共有</p>
              </div>
            </div>

            <div style={{ color: '#e8788a', fontSize: '1.2rem', fontWeight: 'var(--font-bold)', padding: '8px 0', lineHeight: 1 }}>↓</div>

            <div className="flow-step-ky inner">
              <div style={{ flexShrink: 0, width: '36px', height: '36px', background: '#34c6be', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'var(--font-bold)', fontSize: '18px' }}>4</div>
              <div>
                <p style={{ fontSize: '0.95rem', fontWeight: 'var(--font-bold)', color: 'var(--ink-800)', marginBottom: '2px' }}>全体共有</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--ink-500)' }}>視野を広げる</p>
              </div>
            </div>
          </div>

          <div style={{ color: '#34c6be', fontSize: '1.5rem', fontWeight: 'var(--font-bold)', padding: '8px 0', lineHeight: 1 }}>↓</div>

          {/* Step 5 */}
          <div className="flow-step-ky">
            <div style={{ flexShrink: 0, width: '36px', height: '36px', background: '#34c6be', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'var(--font-bold)', fontSize: '18px' }}>5</div>
            <div>
              <p style={{ fontSize: '0.95rem', fontWeight: 'var(--font-bold)', color: 'var(--ink-800)', marginBottom: '2px' }}>振り返り</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--ink-500)' }}>気づきを記録</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ===== 5.5 テーマ例 ===== */}
      <Section className="scroll-animate">
        <SectionHeading color="#34c6be">テーマ例</SectionHeading>
        <p
          className="body-base"
          style={{
            textAlign: 'center',
            color: 'var(--ink-600)',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: '28px',
          }}
        >
          これまで扱ってきたテーマの一部です。タップすると内容とお題の例が見られます。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {themes.map((item) => (
            <ThemeItem
              key={item.id}
              item={item}
              isOpen={openTheme === item.id}
              onToggle={() => setOpenTheme(openTheme === item.id ? null : item.id)}
            />
          ))}
        </div>
        <p
          className="body-sm"
          style={{
            marginTop: '20px',
            textAlign: 'center',
            color: 'var(--ink-500)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          テーマは随時ふえています。ご要望に合わせたオリジナルテーマの作成も可能です。
        </p>
      </Section>

      {/* ===== 6. Yononakaで育つこと ===== */}
      <Section className="scroll-animate">
        <SectionHeading color="#9b87f5">Yononakaで育つこと</SectionHeading>

        <div
          style={{
            padding: '20px 24px',
            background: 'linear-gradient(135deg, rgba(155,135,245,0.1), rgba(52,198,190,0.08))',
            borderRadius: '16px',
            marginBottom: '24px',
            borderLeft: '4px solid #9b87f5',
          }}
        >
          <p
            className="body-base"
            style={{ lineHeight: 'var(--leading-loose)', color: 'var(--ink-700)' }}
          >
            AIが「正解の提示」や「情報処理」を担う時代に、人間にしかできない思考と表現の力を育てます。
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {growthItems.map((item) => (
            <GrowthAccordionItem
              key={item.id}
              item={item}
              isOpen={openGrowth === item.id}
              onToggle={() => setOpenGrowth(openGrowth === item.id ? null : item.id)}
            />
          ))}
        </div>
      </Section>

      {/* ===== 7. 導入前と導入後の変化 ===== */}
      <Section className="scroll-animate">
        <SectionHeading color="#f06a6a">導入前と導入後の変化</SectionHeading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {[
            {
              before: '自分の考えが狭い、発想が乏しいと感じる',
              after: 'アイデアや表現の幅が広がった',
              color: '#ffd66b',
              icon: '💡',
            },
            {
              before: '自分の興味・価値観が曖昧でわからない',
              after: '自分の興味・価値観が深まった',
              color: '#34c6be',
              icon: '🔍',
            },
            {
              before: '一つの視点でしか物事を見られない',
              after: 'いろんな視点を想定した認知（メタ認知）ができるようになった',
              color: '#9b87f5',
              icon: '👁️',
            },
          ].map((change, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                border: '2px dashed rgba(0,0,0,0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '20px' }}>{change.icon}</span>
                <span
                  className="body-sm"
                  style={{ color: 'var(--ink-400)', fontWeight: 'var(--font-bold)' }}
                >
                  Before → After
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p
                  className="body-sm"
                  style={{
                    padding: '10px 14px',
                    background: 'rgba(0,0,0,0.04)',
                    borderRadius: '10px',
                    color: 'var(--ink-500)',
                    textDecoration: 'line-through',
                  }}
                >
                  {change.before}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <span style={{ color: change.color, fontSize: '20px' }}>↓</span>
                </div>
                <p
                  className="body-sm"
                  style={{
                    padding: '10px 14px',
                    background: `${change.color}18`,
                    borderRadius: '10px',
                    color: 'var(--ink-800)',
                    fontWeight: 'var(--font-bold)',
                    border: `2px solid ${change.color}30`,
                  }}
                >
                  {change.after}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, #34c6be, #9b87f5)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 8px 24px rgba(52,198,190,0.25)',
          }}
        >
          <p
            className="body-base"
            style={{
              color: '#fff',
              lineHeight: 'var(--leading-loose)',
              fontWeight: 'var(--font-bold)',
            }}
          >
            その結果、Yononaka常連組は、周りに流されず、言われたことを鵜呑みにせず、自分の価値判断で動ける人へと育ちつつあります。
          </p>
        </div>

        <figure
          style={{
            margin: '24px 0 0 0',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          <img
            src="/assets/yononaka/joren.jpg"
            alt="Yononaka常連組の様子"
            style={{ width: '100%', display: 'block' }}
          />
        </figure>
      </Section>

      {/* ===== 8. 参加者の声 ===== */}
      <Section className="scroll-animate">
        <SectionHeading color="#34c6be">参加者の声</SectionHeading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {voices.map((voice, i) => (
            <article
              key={i}
              style={{
                background: '#fff',
                borderRadius: '24px',
                padding: '28px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                border: '2px dashed rgba(0,0,0,0.08)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '20px',
                  fontSize: '60px',
                  color: 'rgba(52,198,190,0.2)',
                  fontFamily: 'Georgia, serif',
                  lineHeight: 1,
                }}
              >
                "
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}
                >
                  <span
                    style={{
                      padding: '4px 12px',
                      background: '#34c6be',
                      color: '#fff',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 'var(--font-bold)',
                    }}
                  >
                    {voice.grade}
                  </span>
                  <span className="heading-sm" style={{ color: 'var(--ink-800)' }}>
                    {voice.title}
                  </span>
                </div>
                <p
                  className="body-base"
                  style={{ lineHeight: 'var(--leading-loose)', color: 'var(--ink-700)' }}
                >
                  {voice.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ===== 9. 料金 ===== */}
      <Section className="scroll-animate">
        <SectionHeading color="#ffd66b">料金</SectionHeading>

        <p
          className="body-sm"
          style={{ color: 'var(--ink-500)', textAlign: 'right', marginBottom: '20px' }}
        >
          ※表示価格は税抜きです。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
          {/* 4名〜10名 */}
          <div
            style={{
              background: '#fff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              border: '2px dashed rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ padding: '14px 20px', background: 'rgba(52,198,190,0.08)', borderBottom: '1px dashed rgba(52,198,190,0.2)' }}>
              <p className="heading-sm" style={{ color: 'var(--ink-700)' }}>4名〜10名</p>
            </div>
            <div style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p className="body-sm" style={{ color: 'var(--ink-500)', marginBottom: '2px' }}>1回（単発）</p>
                  <p style={{ fontSize: '12px', color: 'var(--ink-400)' }}>講師料10,000＋ファシリテーター2,500×2人</p>
                </div>
                <p className="heading-sm" style={{ color: 'var(--ink-800)', fontSize: '20px', flexShrink: 0, marginLeft: '12px' }}>¥15,000</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '14px 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.07)' }} />
                <span style={{ fontSize: '16px', color: '#ffd66b' }}>↓</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.07)' }} />
              </div>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '0',
                    background: '#ffd66b',
                    color: '#fff',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 'var(--font-bold)',
                  }}
                >
                  おすすめ
                </div>
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,214,107,0.15), rgba(255,214,107,0.05))',
                    borderRadius: '14px',
                    padding: '14px 16px',
                    border: '2px solid rgba(255,214,107,0.5)',
                  }}
                >
                  <p className="body-sm" style={{ color: 'var(--ink-500)', marginBottom: '4px' }}>3回パックなら</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <p className="heading-sm" style={{ color: '#c19000', fontSize: '22px' }}>¥40,000</p>
                    <p className="body-sm" style={{ color: '#c19000', fontWeight: 'var(--font-bold)' }}>※5,000お得！</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 11名〜15名 */}
          <div
            style={{
              background: '#fff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              border: '2px dashed rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ padding: '14px 20px', background: 'rgba(52,198,190,0.08)', borderBottom: '1px dashed rgba(52,198,190,0.2)' }}>
              <p className="heading-sm" style={{ color: 'var(--ink-700)' }}>11名〜15名</p>
            </div>
            <div style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p className="body-sm" style={{ color: 'var(--ink-500)', marginBottom: '2px' }}>1回（単発）</p>
                  <p style={{ fontSize: '12px', color: 'var(--ink-400)' }}>講師料10,000＋ファシリテーター2,500×4人</p>
                </div>
                <p className="heading-sm" style={{ color: 'var(--ink-800)', fontSize: '20px', flexShrink: 0, marginLeft: '12px' }}>¥20,000</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '14px 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.07)' }} />
                <span style={{ fontSize: '16px', color: '#ffd66b' }}>↓</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.07)' }} />
              </div>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '0',
                    background: '#ffd66b',
                    color: '#fff',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 'var(--font-bold)',
                  }}
                >
                  おすすめ
                </div>
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,214,107,0.15), rgba(255,214,107,0.05))',
                    borderRadius: '14px',
                    padding: '14px 16px',
                    border: '2px solid rgba(255,214,107,0.5)',
                  }}
                >
                  <p className="body-sm" style={{ color: 'var(--ink-500)', marginBottom: '4px' }}>3回パックなら</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <p className="heading-sm" style={{ color: '#c19000', fontSize: '22px' }}>¥55,000</p>
                    <p className="body-sm" style={{ color: '#c19000', fontWeight: 'var(--font-bold)' }}>※5,000お得！</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="body-sm" style={{ color: 'var(--ink-400)', fontSize: '13px', textAlign: 'right' }}>
            ※16名以上の場合は要相談
          </p>

          {/* オプション */}
          <div
            style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              border: '2px dashed rgba(0,0,0,0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <p className="body-sm" style={{ color: 'var(--ink-500)', marginBottom: '4px' }}>オプション</p>
              <p className="body-sm" style={{ color: 'var(--ink-700)' }}>テーマをご要望に合わせて作成</p>
            </div>
            <p className="heading-sm" style={{ color: '#9b87f5', fontSize: '22px', flexShrink: 0, marginLeft: '12px' }}>+¥10,000</p>
          </div>
        </div>
      </Section>

      {/* ===== 10. FAQ ===== */}
      <Section className="scroll-animate">
        <SectionHeading color="#9b87f5">よくある質問</SectionHeading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqItems.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </Section>

      {/* ===== 12. CTA ===== */}
      <Section className="scroll-animate">
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(52,198,190,0.1), rgba(155,135,245,0.1))',
            borderRadius: '24px',
            padding: '40px 28px',
            textAlign: 'center',
            border: '2px dashed rgba(0,0,0,0.08)',
          }}
        >
          <h2 className="heading-lg" style={{ marginBottom: '16px' }}>
            まずは気軽にご相談ください
          </h2>
          <p
            className="body-base"
            style={{
              color: 'var(--ink-600)',
              lineHeight: 'var(--leading-relaxed)',
              marginBottom: '32px',
            }}
          >
            Zoom相談（無料）にて、教室の状況や生徒さんの状況をお聞きしながら、Yononakaの活用方法をご提案します。
          </p>

          <a
            href="/contact?type=owner#contact-form"
            className="cta-btn"
            style={{
              display: 'block',
              padding: '18px 32px',
              background: 'linear-gradient(135deg, #34c6be, #9b87f5)',
              color: '#fff',
              borderRadius: '50px',
              fontWeight: 'var(--font-bold)',
              fontSize: '17px',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(52,198,190,0.35)',
              marginBottom: '16px',
              transition: 'all 0.3s ease',
            }}
          >
            まずはZoom相談（無料）
          </a>

          <a
            href="/yononaka"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--ink-500)',
              textDecoration: 'none',
              fontSize: '14px',
            }}
          >
            Yononakaについて詳しくはこちら
            <span>→</span>
          </a>
        </div>
      </Section>
    </MobileContainer>
  );
}
