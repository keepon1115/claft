'use client';

import { useState, useRef, useEffect } from 'react';
import { MobileContainer, Section } from '@/components/MobileContainer';

// 過去のワークデータ
const pastWorks = [
  {
    id: 1,
    title: 'おかねって何だろう？',
    description: 'お金の価値、使い方、もらい方について考えました。',
    color: '#ffd66b',
    emoji: '💰'
  },
  {
    id: 2,
    title: '自分のまちについて話そう',
    description: '住んでいる街の魅力や課題を発見しました。',
    color: '#34c6be',
    emoji: '🏘️'
  },
  {
    id: 3,
    title: 'こころとからだの関係',
    description: '心と体のつながりについて探究しました。',
    color: '#f06a6a',
    emoji: '💭'
  }
];

// ワークの流れデータ
const workflowSteps = [
  {
    num: '1',
    title: '身近なテーマ',
    description: 'よのなかにある身近なモノ・コトを扱います。',
    examples: '「おかねって何だろう」「自分のまちについて話そう」「こころとからだの関係を考えよう」',
    color: '#ffd66b',
    icon: '🎯'
  },
  {
    num: '2',
    title: '正解がひとつでないお題',
    description: 'テーマごとに3〜4つのお題があります。まずは一人で考える時間をとります。',
    examples: '「お金持ちってどんなイメージ？」「つい行ってしまう場所はどこ？」「緊張を和らげるには？」',
    color: '#34c6be',
    icon: '🤔'
  },
  {
    num: '3',
    title: '意見共有（少人数グループ）',
    description: '少人数のグループで順番に話します。各回約20名参加しますが、少数のグループで1人1人順番に発言できるので安心です。',
    examples: '',
    color: '#9b87f5',
    icon: '💬'
  }
];

// 育つことデータ
const growthItems = [
  {
    id: 1,
    title: '何事においても立ち止まって考える習慣が身につく！',
    content: '正解が一つではない問いに向き合い、自分なりの答えを導き出す経験を通じて、「考える力」を養います。また、他者の意見に触れることで「自分ならどう考えるか」を繰り返し、時には「本当にそうなのか？」と問い直すことで、当たり前や常識に立ち止まって、多様な視点から深く考える力が身につきます。',
    icon: '🧠',
    color: '#ffd66b'
  },
  {
    id: 2,
    title: 'コミュニケーションへの不安や恐怖がなくなる！',
    content: '「人を傷つけないことであれば何を言ってもOK」というルールで、心理的安全性を重視しています。「わからないこと」や「失敗すること」を恐れずに意見を交わせる体験を通じて、話すことへの自信が身につきます。そのうえで、わかりやすく話す力、表現する力、他者の考えを聴く力などが養われるのだと思います。',
    icon: '💪',
    color: '#34c6be'
  },
  {
    id: 3,
    title: '自己理解が深まり、やりたいことが湧いてくる！',
    content: '会話をしながら自分の意見を見直すことで、自分自身の価値観や考え方の癖に気づくことができます。さまざまなテーマについて話し合う中で、自分の興味や得意なことに気づいたり、また、これから挑戦したいことや探究したいことが心の底から自然と湧いてきます。',
    icon: '✨',
    color: '#9b87f5'
  }
];

// 参加者の声データ
const voices = [
  {
    grade: '小学6年生',
    title: '「遠慮せず話せる場所」',
    text: '誰もが、自分の思う意見を思う存分話せる場所、間違えてても、遠慮はしない。なぜかというと、人それぞれが意見を持っているから。そして、その人が持っている意見を理解し合える場所じゃないかなと自分は思ってます。'
  },
  {
    grade: '大学3年生',
    title: '「世代を越えて探究できる」',
    text: '幅広い世代の人と話せる環境。先生や教授のようにとっても詳しい人でもいいが、ある程度知っている人と一緒に探求できるような環境。身近な存在から楽しんで学べるところがいいなと思います。'
  },
  {
    grade: '高校1年生',
    title: '「考えが育つ／言葉にする課題も見える」',
    text: '論理的なことを言われたら勉強になるし、自分がどう思うのかも理解できる場所。考えを見つけ出すのはできるようになった気がして、それを図化できるのに、言葉にはできず、語彙力が足りないことを実感しています。'
  }
];

// 関連コンテンツデータ
const relatedContents = [
  {
    id: 1,
    title: 'Yononaka Story（インタビュー企画）',
    description: 'ゲストのこれまでのキャリアストーリーや、現在の活動、その始まりのきっかけ、そしてこれからのビジョンについて深く伺っていくインタビュー。一人ひとり異なるキャリアの軌跡を知ることで、キャリアを見つめ直すヒントや新しい視点を得られるきっかけになれば幸いです。',
    image: 'https://keepon1115.github.io/claft/assets/yononaka/story.jpg',
    buttonText: 'YouTubeで見る',
    buttonLink: 'https://www.youtube.com/playlist?list=PLg8PlJHz4ogs0wfyxguL7TCkwg_3GGeEz',
    color: '#f06a6a',
    enabled: true
  },
  {
    id: 2,
    title: 'Yononaka レディオ（ポッドキャスト）',
    description: '何かのために話すというより、ただおしゃべりを楽しむ先にぽろりと生まれるものを大切にしたい──そんなゆるい番組です。カチッと言えば「創造的対話」。会話の波に乗ったり降りたりしながら、これまでの経験をもとに意見を共有したり、価値観をそっと手放したりしつつ、新しい見方・考え方を試しています。ここで芽生えたアイデアから、いつかモノやサービスが生まれたらいいなぁ──そんな願いも込めた"実験室"です。よろしければ、本編をのぞいてみてください。',
    image: 'https://keepon1115.github.io/claft/assets/yononaka/radio.jpg',
    buttonText: 'Podcastで聴く',
    buttonLink: 'https://podcasts.apple.com/jp/podcast/yononaka-radio/id1766887467',
    color: '#34c6be',
    enabled: true
  },
  {
    id: 3,
    title: '創造的対話カードゲーム（Coming Soon）',
    description: '※準備中です',
    image: 'https://keepon1115.github.io/claft/assets/yononaka/cardgame.jpg',
    buttonText: 'Coming Soon',
    buttonLink: '',
    color: '#9b87f5',
    enabled: false
  }
];

// アコーディオンコンポーネント
function AccordionItem({ item, isOpen, onToggle }: { 
  item: typeof growthItems[0], 
  isOpen: boolean, 
  onToggle: () => void 
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, []);

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
        border: '2px dashed rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease'
      }}
    >
      {/* ヘッダー部分（常に表示） */}
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
          textAlign: 'left'
        }}
      >
        <span
          style={{
            fontSize: '32px',
            flexShrink: 0
          }}
        >
          {item.icon}
        </span>
        <span
          className="heading-sm"
          style={{
            flex: 1,
            lineHeight: 'var(--leading-snug)'
          }}
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
            background: isOpen ? item.color : 'rgba(0, 0, 0, 0.05)',
            color: isOpen ? '#fff' : 'var(--ink-600)',
            fontSize: '14px',
            fontWeight: 'var(--font-bold)',
            transition: 'all 0.3s ease',
            flexShrink: 0
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
              transition: 'transform 0.3s ease'
            }}
          >
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </span>
      </button>

      {/* コンテンツ部分（トグル） */}
      <div
        style={{
          height: isOpen ? height : 0,
          overflow: 'hidden',
          transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div
          ref={contentRef}
          style={{
            padding: '0 24px 24px 24px',
            borderTop: '1px dashed rgba(0, 0, 0, 0.1)'
          }}
        >
          <p
            className="body-base"
            style={{
              marginTop: '20px',
              lineHeight: 'var(--leading-loose)',
              color: 'var(--ink-700)'
            }}
          >
            {item.content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function YononakaPage(){
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // スクロールアニメーション
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <MobileContainer>
      {/* カスタムスタイル */}
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
        .horizontal-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .horizontal-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .horizontal-scroll::-webkit-scrollbar-thumb {
          background: rgba(52, 198, 190, 0.4);
          border-radius: 10px;
        }
        .horizontal-scroll > * {
          flex-shrink: 0;
          scroll-snap-align: start;
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(52, 198, 190, 0.2); }
          50% { box-shadow: 0 0 40px rgba(52, 198, 190, 0.4); }
        }
        .wave-text {
          display: inline-block;
          animation: wave 2s ease-in-out infinite;
        }
        @keyframes wave {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
      `}</style>

      {/* ===== 冒頭（ヒーロー）===== */}
      <Section className="relative overflow-hidden scroll-animate">
        {/* 背景グラデーション */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 20% 30%, rgba(52, 198, 190, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(255, 214, 107, 0.1) 0%, transparent 50%)
            `,
            zIndex: -1
          }}
          aria-hidden="true"
        />

        {/* メインタイトル */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 
            className="heading-xl"
            style={{
              marginBottom: '16px',
              position: 'relative',
              display: 'inline-block'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>
              Yononaka<span style={{ fontSize: '0.7em', marginLeft: '8px' }}>(対話ワーク)</span>
            </span>
            {/* 手書き風アンダーライン */}
            <svg
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '-10px',
                width: 'calc(100% + 20px)',
                height: '20px',
                zIndex: 0
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

        {/* 説明文 */}
        <p 
          className="body-base"
          style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 'var(--leading-loose)'
          }}
        >
          お金や時間など、身近なテーマを入り口に、正解がひとつではない問いをみんなで話し合う学びです。<br />
          考えを言葉にしてみる。ちがう意見を聞いてみる。<br />
          その往復の中で、世界の見え方が少しずつ広がっていきます。
        </p>

        {/* 装飾的な浮遊アイコン */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginTop: '32px',
            fontSize: '40px'
          }}
          aria-hidden="true"
        >
          <span className="float-animation" style={{ animationDelay: '0s' }}>💬</span>
          <span className="float-animation" style={{ animationDelay: '0.3s' }}>🌏</span>
          <span className="float-animation" style={{ animationDelay: '0.6s' }}>💡</span>
        </div>
      </Section>

      {/* ===== 安心して話せる環境 ===== */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 
            className="heading-lg"
            style={{
              position: 'relative',
              display: 'inline-block'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>安心して話せる環境</span>
            <svg
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '-8px',
                width: 'calc(100% + 16px)',
                height: '16px',
                zIndex: 0
              }}
              viewBox="0 0 200 16"
              preserveAspectRatio="none"
            >
              <path
                d="M3,12 Q50,10 100,11 T197,12"
                stroke="#ffd66b"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{ opacity: 0.6 }}
              />
            </svg>
          </h2>
        </div>

        {/* 写真 */}
        <figure 
          className="pulse-glow"
          style={{
            margin: '0 0 32px 0',
            borderRadius: '24px',
            overflow: 'hidden'
          }}
        >
          <img 
            src="https://keepon1115.github.io/claft/assets/yononaka/hero.jpg" 
            alt="対話型ワークショップの様子" 
            style={{
              width: '100%',
              aspectRatio: '16/9',
              objectFit: 'cover'
            }}
          />
        </figure>

        {/* 3つのルール */}
        <div
          style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            border: '2px dashed rgba(0, 0, 0, 0.08)'
          }}
        >
          <p 
            className="body-sm"
            style={{ 
              marginBottom: '20px', 
              color: 'var(--ink-500)',
              textAlign: 'center'
            }}
          >
            ワークの冒頭で、この3つの声掛けをします
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { num: '①', text: '静かにしない', color: '#f06a6a', desc: '思ったことは声に出してOK' },
              { num: '②', text: 'すべて信じない', color: '#34c6be', desc: '疑問を持つことが大切' },
              { num: '③', text: '正解がないから減点はない', color: '#ffd66b', desc: '間違いなんてない！' }
            ].map((rule, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  background: `linear-gradient(135deg, ${rule.color}15, ${rule.color}05)`,
                  borderRadius: '16px',
                  border: `2px solid ${rule.color}30`
                }}
              >
                <span
                  style={{
                    fontSize: '24px',
                    fontWeight: 'var(--font-bold)',
                    color: rule.color
                  }}
                >
                  {rule.num}
                </span>
                <div>
                  <p className="heading-sm" style={{ marginBottom: '4px' }}>{rule.text}</p>
                  <p className="body-sm" style={{ color: 'var(--ink-500)' }}>{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p 
            className="body-base"
            style={{ 
              marginTop: '24px',
              padding: '16px',
              background: 'rgba(52, 198, 190, 0.08)',
              borderRadius: '12px',
              lineHeight: 'var(--leading-relaxed)'
            }}
          >
            事前知識なしでOK、初めての人ようこそ、親子参加大歓迎。<br />
            参加者それぞれがリビングでくつろぐような雰囲気で会話しています。
          </p>
        </div>
      </Section>

      {/* ===== 過去のワーク ===== */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 className="heading-lg">過去のワーク</h2>
        </div>

        <div className="horizontal-scroll">
          {pastWorks.map((work, i) => (
            <div
              key={work.id}
              style={{
                width: '280px',
                background: '#fff',
                borderRadius: '24px',
                padding: '28px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                border: '2px dashed rgba(0, 0, 0, 0.08)',
                transform: `rotate(${i % 2 === 0 ? '-1' : '1'}deg)`,
                transition: 'transform 0.3s ease'
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  marginBottom: '16px',
                  textAlign: 'center'
                }}
              >
                {work.emoji}
              </div>
              <h3 
                className="heading-sm"
                style={{
                  marginBottom: '12px',
                  textAlign: 'center',
                  color: work.color
                }}
              >
                {work.title}
              </h3>
              <p 
                className="body-sm"
                style={{
                  textAlign: 'center',
                  color: 'var(--ink-600)'
                }}
              >
                {work.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== ワークの流れ ===== */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 
            className="heading-lg"
            style={{
              position: 'relative',
              display: 'inline-block'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>ワークの流れ</span>
            <svg
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '-8px',
                width: 'calc(100% + 16px)',
                height: '16px',
                zIndex: 0
              }}
              viewBox="0 0 200 16"
              preserveAspectRatio="none"
            >
              <path
                d="M3,12 Q50,10 100,11 T197,12"
                stroke="#34c6be"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{ opacity: 0.6 }}
              />
            </svg>
          </h2>
        </div>

        <div className="horizontal-scroll">
          {workflowSteps.map((step, i) => (
            <div
              key={step.num}
              style={{
                width: '300px',
                background: '#fff',
                borderRadius: '24px',
                padding: '28px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                border: '2px dashed rgba(0, 0, 0, 0.08)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* 角のカラーアクセント */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '80px',
                  height: '80px',
                  background: `linear-gradient(135deg, ${step.color}40, transparent)`,
                  borderRadius: '0 24px 0 100%'
                }}
              />

              {/* ステップ番号 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px'
                }}
              >
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
                    fontSize: '18px'
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
                  lineHeight: 'var(--leading-relaxed)'
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
                    lineHeight: 'var(--leading-relaxed)'
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

      {/* ===== Yononakaで育つこと ===== */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 
            className="heading-lg"
            style={{
              position: 'relative',
              display: 'inline-block'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>Yononakaで育つこと</span>
            <svg
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '-8px',
                width: 'calc(100% + 16px)',
                height: '16px',
                zIndex: 0
              }}
              viewBox="0 0 200 16"
              preserveAspectRatio="none"
            >
              <path
                d="M3,12 Q50,10 100,11 T197,12"
                stroke="#9b87f5"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{ opacity: 0.6 }}
              />
            </svg>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {growthItems.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openAccordion === item.id}
              onToggle={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
            />
          ))}
        </div>
      </Section>

      {/* ===== 参加者の声 ===== */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 className="heading-lg">参加者の声</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {voices.map((voice, i) => (
            <article
              key={i}
              style={{
                background: '#fff',
                borderRadius: '24px',
                padding: '28px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                border: '2px dashed rgba(0, 0, 0, 0.08)',
                position: 'relative'
              }}
            >
              {/* 引用符 */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '20px',
                  fontSize: '60px',
                  color: 'rgba(52, 198, 190, 0.2)',
                  fontFamily: 'Georgia, serif',
                  lineHeight: 1
                }}
              >
                "
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* ラベル */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span
                    style={{
                      padding: '4px 12px',
                      background: '#34c6be',
                      color: '#fff',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 'var(--font-bold)'
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
                  style={{
                    lineHeight: 'var(--leading-loose)',
                    color: 'var(--ink-700)'
                  }}
                >
                  {voice.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ===== 関連コンテンツ ===== */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 
            className="heading-lg"
            style={{
              position: 'relative',
              display: 'inline-block'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>関連コンテンツ</span>
            <svg
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '-8px',
                width: 'calc(100% + 16px)',
                height: '16px',
                zIndex: 0
              }}
              viewBox="0 0 200 16"
              preserveAspectRatio="none"
            >
              <path
                d="M3,12 Q50,10 100,11 T197,12"
                stroke="#f06a6a"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{ opacity: 0.6 }}
              />
            </svg>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {relatedContents.map((content) => (
            <article
              key={content.id}
              style={{
                background: '#fff',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                border: '2px dashed rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              {/* 画像 */}
              <figure style={{ margin: 0 }}>
                <img 
                  src={content.image} 
                  alt={content.title}
                  style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    objectFit: 'cover'
                  }}
                />
              </figure>

              {/* コンテンツ */}
              <div style={{ padding: '24px' }}>
                <h3 className="heading-sm" style={{ marginBottom: '12px' }}>
                  {content.title}
                </h3>
                <p 
                  className="body-sm"
                  style={{
                    marginBottom: '20px',
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'var(--ink-600)'
                  }}
                >
                  {content.description}
                </p>

                {content.enabled ? (
                  <a
                    href={content.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      background: `linear-gradient(135deg, ${content.color}, ${content.color}dd)`,
                      color: '#fff',
                      borderRadius: '50px',
                      fontWeight: 'var(--font-bold)',
                      textDecoration: 'none',
                      boxShadow: `0 4px 12px ${content.color}40`,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {content.buttonText}
                    <span>→</span>
                  </a>
                ) : (
                  <button
                    disabled
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      background: 'rgba(0, 0, 0, 0.1)',
                      color: 'var(--ink-400)',
                      borderRadius: '50px',
                      fontWeight: 'var(--font-bold)',
                      border: 'none',
                      cursor: 'not-allowed'
                    }}
                  >
                    {content.buttonText}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* JSON-LD 構造化データ */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Yononaka（対話ワーク）",
            "description": "お金や時間など、身近なテーマを入り口に、正解がひとつではない問いをみんなで話し合う学びです。",
            "provider": { "@type": "Organization", "name": "CLAFT" }
          })
        }}
      />
    </MobileContainer>
  );
}
