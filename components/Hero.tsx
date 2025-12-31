"use client";

import { Zen_Maru_Gothic } from 'next/font/google';
import Link from 'next/link';

const zenMaru = Zen_Maru_Gothic({
  weight: ['500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export function Hero() {
  return (
    <section
      style={{
        width: '100%',
        // 上下の余白調整
        padding: '60px 20px 80px',
        background: `
          radial-gradient(ellipse at 30% 20%, rgba(255, 214, 107, 0.12) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 80%, rgba(52, 198, 190, 0.10) 0%, transparent 50%),
          #fbfefe
        `,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 背景テクスチャ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0zm2 2h1v1H2V2z' fill='%23000' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          pointerEvents: 'none'
        }}
      />

      <div style={{ 
        width: '100%', 
        // ここが重要：コンテナの中で最大幅を決めるのではなく、親要素（page.tsxのgrid）に従うようにする
        // ただし、中身が広がりすぎないように安全策でmaxWidthを入れる
        maxWidth: '480px', 
        marginInline: 'auto', 
        position: 'relative', 
        zIndex: 1,
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        textAlign: 'center'
      }}>
        
        {/* ① 中央揃えテキスト */}
        <div style={{ marginBottom: '32px', width: '100%' }}>
          <p style={{
            fontSize: '1.1rem', // 固定サイズに変更（読みやすさ重視）
            color: '#4a5568',
            marginBottom: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            fontFamily: zenMaru.style.fontFamily,
          }}>
            自分のキャリア
          </p>
          
          <h1 style={{
            fontFamily: zenMaru.style.fontFamily,
            // ここを修正：画面幅(vw)依存をやめ、コンテナ幅に対する％指定に変更、または最大値を下げる
            fontSize: 'clamp(2.2rem, 12cqw, 3rem)', 
            // ※cqw (Container Query Width) が効かない環境も考慮し、安全な clamp 指定に変更
            // スマホなら小さく、PCの狭い枠内でも3rem（48px）を超えないようにする
            color: '#34C6BE',
            lineHeight: 1.3,
            fontWeight: 900,
            display: 'block', // ブロック要素にして中央揃えを安定させる
            position: 'relative',
            wordBreak: 'keep-all', // 日本語の単語の途中での改行を防ぐ
            overflowWrap: 'anywhere'
          }}>
            <span style={{ display: 'inline-block' }}>"自分で"</span>
            <span style={{ display: 'inline-block', position: 'relative' }}>
              つくろ！
              {/* 黄色のマーカー線 */}
              <span style={{
                position: 'absolute',
                bottom: '8%',
                left: '-5%',
                width: '110%',
                height: '35%',
                background: '#ffe69c',
                zIndex: -1,
                opacity: 0.8,
                borderRadius: '4px',
                transform: 'rotate(-1deg)'
              }}></span>
            </span>
          </h1>
        </div>

        {/* ② 動画埋め込み */}
        <div style={{
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: '16px', // 少し角丸を緩やかに
          overflow: 'hidden',
          boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
          border: '3px solid #fff',
          marginBottom: '32px',
          background: '#000'
        }}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/awHyerZPBU4?autoplay=1&mute=1&rel=0&controls=1&loop=1&playlist=awHyerZPBU4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{ display: 'block' }}
          ></iframe>
        </div>

        {/* ③ 中央揃えテキスト */}
        <div style={{
          width: '100%',
          padding: '0 10px' // 横に少し余白を入れて文字が端にくっつくのを防ぐ
        }}>
          <p style={{
            fontSize: '0.95rem', // 少し小さくして上品に
            lineHeight: 1.8,
            color: '#2d3748',
            fontWeight: 500,
            fontFeatureSettings: '"palt"',
            wordBreak: 'keep-all', // 変な改行を防ぐ
          }}>
            探究×対話×実践で、<br />
            どんな状況でも生き抜く自信をつけ、<br />
            自分のキャリアを自分で切り拓くスクール
          </p>
        </div>

        {/* ④ 「CLAFT」という希望 リンクボタン */}
        <div style={{
          marginTop: '32px',
          marginBottom: '24px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Link href="/claft-hope" style={{
            display: 'inline-block',
            padding: '14px 32px',
            backgroundColor: '#34C6BE',
            color: '#fff',
            fontFamily: zenMaru.style.fontFamily,
            fontSize: '1.05rem',
            fontWeight: 700,
            borderRadius: '50px',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(52, 198, 190, 0.3)',
            transition: 'all 0.3s ease',
            letterSpacing: '0.05em'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(52, 198, 190, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(52, 198, 190, 0.3)';
          }}>
            「CLAFT」という希望
          </Link>
        </div>

        {/* ⑤ スクロール誘導 */}
        <div style={{
          marginTop: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'bounce 2s infinite'
        }}>
          <style jsx>{`
            @keyframes bounce {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(8px);
              }
            }
          `}</style>
          <p style={{
            fontSize: '0.9rem',
            color: '#718096',
            fontWeight: 500,
            letterSpacing: '0.1em'
          }}>
            ↓ scroll
          </p>
        </div>

      </div>
    </section>
  );
}