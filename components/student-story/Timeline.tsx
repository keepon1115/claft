import type { CSSProperties } from 'react';
import { SectionTitle } from '@/components/craft/SectionTitle';

export type TimelineEvent = {
  date: string;
  title: string;
  description?: string;
  isCurrent?: boolean;
};

type TimelineProps = {
  events: TimelineEvent[];
};

// 星マーカー（手描きの揺らぎ付き）
function StarIcon({ isCurrent }: { isCurrent?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={isCurrent ? 'var(--brand)' : 'var(--cream)'}
      className="flex-shrink-0"
      style={{
        filter: isCurrent
          ? 'drop-shadow(0 2px 4px rgba(52, 198, 190, 0.45))'
          : 'drop-shadow(0 1px 2px rgba(92, 77, 42, 0.3))',
        transform: isCurrent ? 'rotate(-8deg) scale(1.15)' : 'rotate(6deg)',
      }}
      aria-hidden="true"
    >
      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.6-6.3 4.6 2.3-7.4-6-4.6h7.6z" stroke="#fff" strokeWidth="1.2" />
    </svg>
  );
}

export function Timeline({ events }: TimelineProps) {
  return (
    <section className="py-8 px-4">
      {/* セクションタイトル */}
      <div className="hp-section-head" style={{ marginBottom: '24px' }}>
        <SectionTitle variant={3} lineColor="var(--cream)">
          スクールでの歩み
        </SectionTitle>
      </div>

      {/* タイムライン（点線の手描きルート） */}
      <div className="ss-timeline">
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={index} className="relative reveal" style={{ transitionDelay: `${index * 60}ms` }}>
              {/* 星マーカー（ライン上） */}
              <div className="absolute -left-8 top-0" style={{ transform: 'translateX(-1px)' }}>
                <StarIcon isCurrent={event.isCurrent} />
              </div>

              {/* コンテンツ */}
              <div
                className={event.isCurrent ? 'craft-paper craft-tilt p-4' : 'ss-item'}
                style={
                  event.isCurrent
                    ? ({ '--rot': '-0.5deg', backgroundColor: 'rgb(var(--brand-rgb) / 0.08)' } as CSSProperties)
                    : ({ '--accent-rgb': 'var(--cream-rgb)' } as CSSProperties)
                }
              >
                {/* 日付 */}
                <span
                  className="text-[var(--text-xs)] font-bold"
                  style={{ color: event.isCurrent ? 'var(--brand-deep)' : 'var(--ink-500)' }}
                >
                  {event.date}
                  {event.isCurrent && <span className="ss-now">NOW</span>}
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
