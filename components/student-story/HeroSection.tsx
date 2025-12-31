'use client';

export function HeroSection() {
  return (
    <section className="relative py-16 px-4 text-center reveal">
      {/* キャッチコピー */}
      <h1 className="heading-xl mb-6" style={{ lineHeight: 'var(--leading-tight)' }}>
        <span className="block">メンバーの</span>
        <span className="block">ストーリー</span>
      </h1>
      
      {/* サブテキスト */}
      <p className="body-base text-[var(--ink-600)]" style={{ lineHeight: 'var(--leading-loose)' }}>
        CLAFTで学ぶスクール生が、<br />
        どのように成長しているのかをご紹介します。
      </p>
      
      {/* 装飾的なグラデーション背景 */}
      <div 
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(52, 198, 190, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 214, 107, 0.15) 0%, transparent 50%)'
        }}
        aria-hidden="true"
      />
    </section>
  );
}
