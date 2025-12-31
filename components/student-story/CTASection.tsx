'use client';

import Link from 'next/link';

type CTASectionProps = {
  title?: string;
  description?: string;
};

export function CTASection({ 
  title = "あなたも「自分らしさ」を見つけませんか？",
  description = "CLAFTでは無料体験を随時受け付けています。\nまずはお気軽にご相談ください。"
}: CTASectionProps) {
  return (
    <section className="py-12 px-4 reveal">
      <div 
        className="text-center rounded-[var(--radius-lg)] p-8"
        style={{ 
          background: 'linear-gradient(135deg, rgba(52, 198, 190, 0.08) 0%, rgba(255, 214, 107, 0.08) 100%)',
          border: '1px solid rgba(52, 198, 190, 0.15)'
        }}
      >
        {/* タイトル */}
        <h2 
          className="heading-lg mb-4"
          style={{ lineHeight: 'var(--leading-snug)' }}
        >
          {title}
        </h2>
        
        {/* 説明文 */}
        <p 
          className="body-base text-[var(--ink-600)] mb-6"
          style={{ 
            lineHeight: 'var(--leading-loose)',
            whiteSpace: 'pre-line'
          }}
        >
          {description}
        </p>
        
        {/* CTAボタン */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact" className="btn btn-primary justify-center">
            <span className="text-lg">📩</span>
            無料体験に申し込む
          </Link>
          <Link href="/workshop#trial" className="btn btn-ghost justify-center">
            <span className="text-lg">🎯</span>
            ワークショップを見る
          </Link>
        </div>
        
        {/* 装飾 */}
        <div className="flex justify-center gap-3 mt-8 opacity-40" aria-hidden="true">
          <span>✨</span>
          <span>🌟</span>
          <span>💫</span>
        </div>
      </div>
    </section>
  );
}
