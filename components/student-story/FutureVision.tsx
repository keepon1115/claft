'use client';

type FutureVisionProps = {
  visionText: string;
  subText?: string;
};

export function FutureVision({ visionText, subText }: FutureVisionProps) {
  return (
    <section className="py-10 px-4 reveal">
      <div 
        className="rounded-[var(--radius-lg)] p-6"
        style={{ 
          background: 'var(--menu-pink)',
          border: '3px dashed var(--pink)',
          lineHeight: 'var(--leading-loose)'
        }}
      >
        {/* ラベル */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">✨</span>
          <h2 className="heading-sm text-[var(--pink)] m-0">なりたい姿・将来のイメージ</h2>
        </div>
        
        {/* メインビジョン */}
        <p 
          className="heading-md text-[var(--ink-900)] mb-0"
          style={{ lineHeight: 'var(--leading-loose)' }}
        >
          {visionText}
        </p>
        
        {/* サブテキスト */}
        {subText && (
          <p 
            className="body-sm text-[var(--ink-600)] mt-4 mb-0"
            style={{ lineHeight: 'var(--leading-loose)' }}
          >
            {subText}
          </p>
        )}
        
        {/* 装飾的な星アイコン */}
        <div className="flex justify-end mt-4 gap-1 opacity-50" aria-hidden="true">
          <span className="text-[var(--pink)]">⭐</span>
          <span className="text-[var(--cream)]">⭐</span>
          <span className="text-[var(--brand)]">⭐</span>
        </div>
      </div>
    </section>
  );
}
