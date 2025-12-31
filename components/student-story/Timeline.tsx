'use client';

export type TimelineEvent = {
  date: string;
  title: string;
  description?: string;
  isCurrent?: boolean;
};

type TimelineProps = {
  events: TimelineEvent[];
};

// 星アイコンのSVGコンポーネント
function StarIcon({ isCurrent }: { isCurrent?: boolean }) {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill={isCurrent ? 'var(--brand)' : 'var(--cream)'}
      className="flex-shrink-0"
      style={{
        filter: isCurrent ? 'drop-shadow(0 2px 6px rgba(52, 198, 190, 0.5))' : 'drop-shadow(0 1px 3px rgba(255, 214, 107, 0.5))'
      }}
    >
      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.6-6.3 4.6 2.3-7.4-6-4.6h7.6z"/>
    </svg>
  );
}

export function Timeline({ events }: TimelineProps) {
  return (
    <section className="py-10 px-4 reveal">
      {/* セクションタイトル */}
      <h2 className="heading-lg mb-6 flex items-center gap-2">
        <span className="text-2xl">📅</span>
        CLAFTでの歩み
      </h2>
      
      {/* タイムライン */}
      <div className="relative pl-8">
        {/* 左側の縦ライン */}
        <div 
          className="absolute left-[9px] top-2 bottom-2 w-[3px] rounded-full"
          style={{ background: 'linear-gradient(to bottom, var(--brand), rgba(52, 198, 190, 0.3))' }}
          aria-hidden="true"
        />
        
        {/* イベント一覧 */}
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={index} className="relative">
              {/* 星アイコン（ライン上） */}
              <div 
                className="absolute -left-8 top-0"
                style={{ transform: 'translateX(-1px)' }}
              >
                <StarIcon isCurrent={event.isCurrent} />
              </div>
              
              {/* コンテンツ */}
              <div 
                className="rounded-[16px] p-4"
                style={{ 
                  background: event.isCurrent 
                    ? 'linear-gradient(135deg, rgba(52, 198, 190, 0.12) 0%, rgba(52, 198, 190, 0.04) 100%)'
                    : 'rgba(0, 0, 0, 0.02)',
                  border: event.isCurrent ? '1px solid rgba(52, 198, 190, 0.3)' : '1px solid transparent',
                  lineHeight: 'var(--leading-loose)'
                }}
              >
                {/* 日付 */}
                <span 
                  className="text-[var(--text-xs)] font-bold"
                  style={{ color: event.isCurrent ? 'var(--brand)' : 'var(--ink-500)' }}
                >
                  {event.date}
                  {event.isCurrent && (
                    <span className="ml-2 py-0.5 px-2 rounded-full bg-[var(--brand)] text-white text-[10px]">
                      NOW
                    </span>
                  )}
                </span>
                
                {/* タイトル */}
                <h3 className="heading-sm mt-1 mb-0">{event.title}</h3>
                
                {/* 説明 */}
                {event.description && (
                  <p className="body-sm text-[var(--ink-600)] mt-2 mb-0">{event.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
