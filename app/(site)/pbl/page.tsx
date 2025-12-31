'use client';

import { useState, useRef, useEffect } from 'react';
import { MobileContainer, Section } from '@/components/MobileContainer';

// 学びの流れデータ
const learningSteps = [
  {
    num: '1',
    title: '問いを立てる',
    subtitle: '探究のはじまり',
    description: '「おもしろそう！」「やってみようかな？」という気持ちを起点に、探究のテーマと大まかな計画を立てます。興味や疑問は探究するための動力源。好奇心から生じる問いが、自然と行動へと導きます。',
    tool: 'Googleフォームを使って、テーマと計画を書き込むことからスタートします。',
    color: '#ffd66b',
    icon: '🎯'
  },
  {
    num: '2',
    title: '調べる・つくる',
    subtitle: '',
    description: '問いと計画を立てたら、自分で学びを進めていきます。PBLは「自分だけの学び」です。他者とは異なるプロセスを歩むからこそ、日々の気づきを言葉にする力が必要になります。',
    tool: 'Googleフォームを使って、1日の学びを振り返ります。',
    color: '#34c6be',
    icon: '🔍'
  },
  {
    num: '3',
    title: '発表・動画配信',
    subtitle: '',
    description: '完成した作品とともに、これまでの探究のプロセスを発表します。他者からのフィードバックを得ることで、学びを客観的に捉える機会となります。',
    tool: '1年に3回、3月・7月・11月に開催します。',
    color: '#f06a6a',
    icon: '🎤'
  },
  {
    num: '4',
    title: '振り返り',
    subtitle: '探究のあしあと',
    description: '制作の過程で「うまくいかなかったこと」は、次へのヒントが詰まった一番の学びです。なぜ思い通りにいかなかったか、次はどうするかを整理します。',
    tool: 'Googleフォーム を使って、PBL全体の振り返りをします。',
    color: '#9b87f5',
    icon: '📝'
  },
  {
    num: '5',
    title: 'キャリア面談',
    subtitle: '非認知能力計測',
    description: '非認知能力を計測し、自身の強みや成長を数値で可視化。計測結果をもとにキャリアコンサルタントと面談を行い、次回の目標設定と学習準備を整えます。',
    tool: 'Ai Growという非認知能力計測ツールを使います。',
    color: '#34c6be',
    icon: '💬'
  }
];

// PBLで育つことデータ
const growthItems = [
  {
    id: 1,
    title: '創造力',
    subtitle: '溢れるアイデアを信じ、失敗を恐れず形にする力',
    content: '子どもたちは本来、自由で豊かなアイデアに溢れています。人生経験がまだ少ないからこそ持てる「自分ならできそう！」という真っ直ぐな自信は、創造性を育む最大の原動力です。 変化の激しい現代では、かつて不可能とされたことが次々と実現可能なアイデアとして形になっています。発明王エジソンが数多の失敗を重ねて成功を掴んだように、発明には運やタイミングも欠かせません。だからこそ、失敗を恐れずにとことんアイデアを出し続ける練習を積み重ね、未来を切り拓く力を養います。',
    icon: '🎨',
    color: '#f06a6a'
  },
  {
    id: 2,
    title: '学習力',
    subtitle: '自分なりの「学び方」を確立し、未知の課題に対応する力',
    content: 'PBLは、「何を学ぶか」という知識の習得以上に、「どのように学ぶか」というプロセスを重視する学びです。 自分自身の「学び方の型」を認識し、確立することができれば、将来どのような【テーマ】や【表現方法】に出会っても、自力で道筋を立てて対応できるようになります。「どのように学ぶか」という点に重点を置いて試行錯誤を繰り返すことで、あらゆる未知の課題に対しても、自ら解決策を見出す汎用的な能力が備わります。',
    icon: '🧠',
    color: '#34c6be'
  },
  {
    id: 3,
    title: '言語化力',
    subtitle: '考えを言葉にし、他者と社会に働きかける力',
    content: '自分がどのように学びを進めてきたかを言葉にして振り返ることは、自分の考え方や行動パターンを客観的に捉える「メタ認知」へとつながります。 日々の気づきやプロセスを記録し続けることで、自分を深く理解する力が養われ、「次はこうしてみよう」「ここをもっと深掘りしてみたい」といった前向きな意欲が自然と湧き上がってきます。言語化を通じて得られた深い内省は、一つのプロジェクトを完結させるだけでなく、また新しい「問いの種」を見つける力になります。',
    icon: '✍️',
    color: '#9b87f5'
  }
];

// メンバーの作品データ
const memberWorks = [
  {
    id: 1,
    title: 'ソニーの魅力とは？',
    description: 'ソニー製品の魅力を探り、情報を集めて動画で発信。',
    url: 'https://youtu.be/zs1ZD0GZAm0',
    color: '#f06a6a',
    emoji: '📱'
  },
  {
    id: 2,
    title: '障害とはどのようなものか',
    description: '吃音から障害について調べ、資料をまとめて発表。',
    url: 'https://youtu.be/qoANUgtTAZo',
    color: '#34c6be',
    emoji: '🤝'
  },
  {
    id: 3,
    title: '振動発電をマイクラで表現してみた',
    description: 'マイクラで発電アイデアを再現。',
    url: 'https://youtu.be/QKfGtt1QT1M',
    color: '#ffd66b',
    emoji: '⚡'
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
        <div style={{ flex: 1 }}>
          <span
            className="heading-sm"
            style={{
              display: 'block',
              lineHeight: 'var(--leading-snug)',
              marginBottom: '4px'
            }}
          >
            {item.title}
          </span>
          <span
            className="body-sm"
            style={{
              display: 'block',
              color: 'var(--ink-600)',
              fontWeight: 'normal'
            }}
          >
            {item.subtitle}
          </span>
        </div>
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

export default function PBLPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

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
          background: rgba(240, 106, 106, 0.4);
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
      `}</style>

      {/* ===== 冒頭（ヒーロー）===== */}
      <Section className="relative overflow-hidden scroll-animate">
        {/* 背景グラデーション */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 20% 30%, rgba(240, 106, 106, 0.1) 0%, transparent 50%),
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
              PBL<span style={{ fontSize: '0.7em', marginLeft: '8px' }}>(課題解決型学習)</span>
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
                stroke="#f06a6a"
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
          自分の好きや疑問を起点にテーマを決め、新たなモノを創ったり、解決策を考え、最後は動画やスライドで発表をする学びです。
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
          <span className="float-animation" style={{ animationDelay: '0s' }}>🔍</span>
          <span className="float-animation" style={{ animationDelay: '0.3s' }}>💡</span>
          <span className="float-animation" style={{ animationDelay: '0.6s' }}>✨</span>
        </div>
      </Section>

      {/* ===== 学びの流れ ===== */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 
            className="heading-lg"
            style={{
              position: 'relative',
              display: 'inline-block'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>学びの流れ</span>
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

        <div className="horizontal-scroll">
          {learningSteps.map((step, i) => (
            <div
              key={step.num}
              style={{
                width: '320px',
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

              <h3 className="heading-sm" style={{ marginBottom: '4px' }}>
                {step.title}
              </h3>

              {step.subtitle && (
                <p 
                  className="body-sm"
                  style={{
                    marginBottom: '12px',
                    color: 'var(--ink-500)',
                    fontWeight: 'var(--font-medium)'
                  }}
                >
                  {step.subtitle}
                </p>
              )}

              <p 
                className="body-sm"
                style={{
                  marginBottom: '16px',
                  color: 'var(--ink-600)',
                  lineHeight: 'var(--leading-relaxed)'
                }}
              >
                {step.description}
              </p>

              <div
                style={{
                  padding: '12px',
                  background: `${step.color}15`,
                  borderRadius: '12px',
                  borderLeft: `3px solid ${step.color}`
                }}
              >
                <p 
                  className="body-sm"
                  style={{
                    color: 'var(--ink-700)',
                    lineHeight: 'var(--leading-relaxed)',
                    margin: 0
                  }}
                >
                  <span style={{ fontWeight: 'var(--font-bold)' }}>ツール：</span>
                  {step.tool}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== PBLで育つこと ===== */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 
            className="heading-lg"
            style={{
              position: 'relative',
              display: 'inline-block'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>PBLで育つこと</span>
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

      {/* ===== メンバーの作品 ===== */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 
            className="heading-lg"
            style={{
              position: 'relative',
              display: 'inline-block'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>メンバーの作品</span>
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

        <div className="horizontal-scroll">
          {memberWorks.map((work, i) => (
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
                transition: 'transform 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  textAlign: 'center'
                }}
              >
                {work.emoji}
              </div>
              <h3 
                className="heading-sm"
                style={{
                  textAlign: 'center',
                  color: work.color,
                  lineHeight: 'var(--leading-snug)'
                }}
              >
                {work.title}
              </h3>
              <p 
                className="body-sm"
                style={{
                  textAlign: 'center',
                  color: 'var(--ink-600)',
                  flex: 1
                }}
              >
                {work.description}
              </p>
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px 20px',
                  background: `linear-gradient(135deg, ${work.color}, ${work.color}dd)`,
                  color: '#fff',
                  borderRadius: '50px',
                  fontWeight: 'var(--font-bold)',
                  fontSize: '14px',
                  textDecoration: 'none',
                  boxShadow: `0 4px 12px ${work.color}40`,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 6px 16px ${work.color}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${work.color}40`;
                }}
              >
                詳しく見る
                <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== 関連コラム ===== */}
      <Section className="scroll-animate">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 
            className="heading-lg"
            style={{
              position: 'relative',
              display: 'inline-block'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>関連コラム</span>
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

        <div
          style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
            border: '2px dashed rgba(0, 0, 0, 0.08)',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              fontSize: '48px',
              marginBottom: '16px'
            }}
          >
            📝
          </div>
          <h3 className="heading-sm" style={{ marginBottom: '16px' }}>
            創造体験を通してものづくりの感動を！
          </h3>
          <a
            href="https://note.com/keepon_/n/n8a6daa44bea4"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #34c6be, #2ba89e)',
              color: '#fff',
              borderRadius: '50px',
              fontWeight: 'var(--font-bold)',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(52, 198, 190, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(52, 198, 190, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(52, 198, 190, 0.3)';
            }}
          >
            noteで読む
            <span>→</span>
          </a>
        </div>
      </Section>

      {/* JSON-LD 構造化データ */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "PBL(課題解決型学習)",
            "description": "自分の好きや疑問を起点にテーマを決め、新たなモノを創ったり、解決策を考え、最後は動画やスライドで発表をする学びです。",
            "provider": { "@type": "Organization", "name": "CLAFT" }
          })
        }}
      />
    </MobileContainer>
  );
}

