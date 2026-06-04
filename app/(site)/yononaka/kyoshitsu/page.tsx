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
      '少人数から開催可能です。定員は15名です。16名以上の場合は、ファシリテーターを1名追加して対応いたします。詳しくはご相談ください。',
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

// ─────────────────────────────────────────────
// ページ本体
// ─────────────────────────────────────────────

export default function YononakaKyoshitsuPage() {
  const [openGrowth, setOpenGrowth] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      `}</style>

      {/* ===== 1. ヒーロー ===== */}
      <Section className="scroll-animate">
        <p
          className="body-base"
          style={{
            lineHeight: 'var(--leading-loose)',
            color: 'var(--ink-800)',
            marginBottom: '40px',
            fontSize: '17px',
          }}
        >
          年齢や立場関係なく、それぞれが自分の意見を堂々と言い合える、そんなオンラインの対話の場があります
        </p>

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
          <p className="body-sm" style={{ marginTop: '20px', color: 'var(--ink-500)' }}>
            対話ワーク ／ 教室オーナー・先生の方へ
          </p>
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

      {/* ===== 2. こんな悩み、ありませんか？ ===== */}
      <Section className="scroll-animate">
        <SectionHeading color="#f06a6a">こんな悩み、ありませんか？</SectionHeading>

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
              { text: '新型コロナ以降のコミュニケーション不足を打ち破りたい', color: '#f06a6a' },
              { text: '一人ひとりの違いをおもしろがる機会を与えたい', color: '#ffd66b' },
              { text: '年齢・立場に関係なく交流させたい', color: '#34c6be' },
              { text: '学力や技術以外の学びの機会にしたい', color: '#9b87f5' },
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

          <p
            className="body-base"
            style={{
              padding: '16px',
              background: 'rgba(52,198,190,0.08)',
              borderRadius: '12px',
              borderLeft: '4px solid #34c6be',
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--ink-800)',
              fontWeight: 'var(--font-bold)',
            }}
          >
            ——そんな現状のお悩みを、Yononakaが解決します。
          </p>
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
            お金や時間など、身近なテーマを入り口に、正解がひとつではない問いをみんなで話し合う、オンラインの対話ワークです。考えを言葉にしてみる。ちがう意見を聞いてみる。その往復の中で、世界の見え方が少しずつ広がっていきます。
          </p>
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

      {/* ===== 5. 当日の流れ ===== */}
      <Section className="scroll-animate">
        <SectionHeading color="#34c6be">当日の流れ</SectionHeading>

        <div className="horizontal-scroll">
          {[
            {
              num: '1',
              title: '身近なテーマ',
              description: 'よのなかにある身近なモノ・コトを扱います。',
              examples: '「おかね」「自分のまち」「こころとからだ」など',
              color: '#ffd66b',
              icon: '🎯',
            },
            {
              num: '2',
              title: '正解がひとつでないお題',
              description: 'テーマごとに3〜4つのお題があります。まずは一人で考える時間をとります。',
              examples: '「お金持ちってどんなイメージ？」「つい行ってしまう場所は？」など',
              color: '#34c6be',
              icon: '🤔',
            },
            {
              num: '3',
              title: '意見共有（少人数グループ）',
              description: 'オンラインでも少人数のグループに分かれ、一人ひとり順番に発言できるので安心です。',
              examples: '',
              color: '#9b87f5',
              icon: '💬',
            },
          ].map((step) => (
            <div
              key={step.num}
              style={{
                width: '300px',
                background: '#fff',
                borderRadius: '24px',
                padding: '28px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                border: '2px dashed rgba(0,0,0,0.08)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '80px',
                  height: '80px',
                  background: `linear-gradient(135deg, ${step.color}40, transparent)`,
                  borderRadius: '0 24px 0 100%',
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    background: step.color,
                    color: '#fff',
                    borderRadius: '50%',
                    fontWeight: 'var(--font-bold)',
                    fontSize: '18px',
                  }}
                >
                  {step.num}
                </span>
                <span style={{ fontSize: '28px' }}>{step.icon}</span>
              </div>
              <h3 className="heading-sm" style={{ marginBottom: '12px' }}>
                {step.title}
              </h3>
              <p
                className="body-sm"
                style={{
                  marginBottom: step.examples ? '16px' : '0',
                  color: 'var(--ink-600)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                {step.description}
              </p>
              {step.examples && (
                <p
                  className="body-sm"
                  style={{
                    padding: '12px',
                    background: `${step.color}15`,
                    borderRadius: '12px',
                    color: 'var(--ink-700)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  <span style={{ fontWeight: 'var(--font-bold)' }}>例：</span>
                  {step.examples}
                </p>
              )}
            </div>
          ))}
        </div>
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
      </Section>

      {/* ===== 8. 教室にとってのメリット ===== */}
      <Section className="scroll-animate">
        <SectionHeading color="#ffd66b">教室にとってのメリット</SectionHeading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            {
              title: '全国どこの教室でも導入できる',
              desc: 'オンライン（Zoom）なので場所の制約がありません。全国どこからでも、教室の生徒がそのまま参加できます。',
              color: '#ffd66b',
              icon: '🌐',
            },
            {
              title: '先生は生徒に案内するだけ',
              desc: '会場の準備も運営の手間も不要です。URLを共有するだけで、あとはYononakaチームが全て対応します。',
              color: '#34c6be',
              icon: '✉️',
            },
            {
              title: '在籍生に「新しい価値」を提供できる',
              desc: '技術・学力以外の体験として「考える力・自分の言葉で話す力」を提供できます。"ここでしか得られない体験"が通い続ける理由になります。',
              color: '#9b87f5',
              icon: '🎁',
            },
            {
              title: '保護者にも説明しやすい',
              desc: 'AI時代に必要な「思考力・表現力・対話力」という価値は、保護者の方にも伝わりやすく、教室の付加価値として訴求できます。',
              color: '#f06a6a',
              icon: '👨‍👩‍👧',
            },
          ].map((merit, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '20px 24px',
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
                  width: '44px',
                  height: '44px',
                  background: `${merit.color}20`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  border: `2px solid ${merit.color}40`,
                }}
              >
                {merit.icon}
              </div>
              <div>
                <h3 className="heading-sm" style={{ marginBottom: '8px' }}>
                  {merit.title}
                </h3>
                <p
                  className="body-sm"
                  style={{ lineHeight: 'var(--leading-relaxed)', color: 'var(--ink-600)' }}
                >
                  {merit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== 9. 参加者の声 ===== */}
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

      {/* ===== 10. 料金 ===== */}
      <Section className="scroll-animate">
        <SectionHeading color="#ffd66b">料金（税抜）</SectionHeading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
          {/* 単発 */}
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
              <p className="body-sm" style={{ color: 'var(--ink-500)', marginBottom: '4px' }}>
                1回（単発）
              </p>
              <p
                className="heading-sm"
                style={{ color: 'var(--ink-800)', fontSize: '22px' }}
              >
                ¥20,000
              </p>
            </div>
            <span
              style={{
                padding: '6px 14px',
                background: 'rgba(52,198,190,0.12)',
                borderRadius: '20px',
                fontSize: '13px',
                color: '#34c6be',
                fontWeight: 'var(--font-bold)',
              }}
            >
              定員15名
            </span>
          </div>

          {/* 3回パック（おすすめ） */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                right: '20px',
                background: '#ffd66b',
                color: '#fff',
                padding: '4px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'var(--font-bold)',
                zIndex: 1,
              }}
            >
              おすすめ
            </div>
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255,214,107,0.18), rgba(255,214,107,0.06))',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 6px 20px rgba(255,214,107,0.3)',
                border: '2px solid rgba(255,214,107,0.6)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div>
                  <p className="body-sm" style={{ color: 'var(--ink-500)', marginBottom: '4px' }}>
                    3回パック
                  </p>
                  <p
                    className="heading-sm"
                    style={{ color: '#c19000', fontSize: '26px', marginBottom: '4px' }}
                  >
                    ¥55,000
                  </p>
                  <p className="body-sm" style={{ color: 'var(--ink-500)' }}>
                    1回あたり約¥18,333 · 単発3回より¥5,000お得
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* オリジナルワーク追加 */}
          <div
            style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              border: '2px dashed rgba(0,0,0,0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <div>
              <p className="body-sm" style={{ color: 'var(--ink-500)', marginBottom: '4px' }}>
                オリジナルワーク追加
              </p>
              <p
                className="heading-sm"
                style={{ color: '#9b87f5', fontSize: '22px', marginBottom: '4px' }}
              >
                +¥10,000
              </p>
              <p className="body-sm" style={{ color: 'var(--ink-500)' }}>
                テーマをご要望に合わせて作成
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(0,0,0,0.03)',
            borderRadius: '14px',
            padding: '16px 20px',
          }}
        >
          <p
            className="body-sm"
            style={{ color: 'var(--ink-500)', lineHeight: 'var(--leading-relaxed)' }}
          >
            ・定員：15名<br />
            ・16名以上の場合：ファシリテーター1名追加（要相談）<br />
            ・すべて税抜価格です
          </p>
        </div>
      </Section>

      {/* ===== 11. FAQ ===== */}
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
            href="/contact"
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
