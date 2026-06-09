import type { CalendarEvent } from '@/lib/googleCalendar';
import EventCard from './EventCard';

interface Props {
  events: CalendarEvent[];
}

function getMonthGroup(isoDate: string): string {
  // 終日予定の "YYYY-MM-DD" をローカル日付として扱う
  const date = new Date(isoDate.includes('T') ? isoDate : `${isoDate}T00:00:00`);
  const now = new Date();
  const thisMonth = now.getFullYear() * 12 + now.getMonth();
  const eventMonth = date.getFullYear() * 12 + date.getMonth();
  const diff = eventMonth - thisMonth;
  if (diff === 0) return '今月';
  if (diff === 1) return '来月';
  return `${date.getFullYear()}年${date.getMonth() + 1}月以降`;
}

export default function EventList({ events }: Props) {
  if (events.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '48px 16px',
          color: 'var(--ink-500)',
          fontSize: '14px',
        }}
      >
        <div style={{ fontSize: '40px', marginBottom: '12px' }} aria-hidden="true">
          📭
        </div>
        現在予定されているイベントはありません
      </div>
    );
  }

  // 月ごとにグルーピング（Map は挿入順を保持）
  const groups = new Map<string, CalendarEvent[]>();
  for (const event of events) {
    const key = getMonthGroup(event.start);
    const bucket = groups.get(key);
    if (bucket) bucket.push(event);
    else groups.set(key, [event]);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {[...groups.entries()].map(([label, groupEvents]) => (
        <div key={label}>
          {/* 月グループ見出し */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            <span
              style={{
                padding: '3px 12px',
                background:
                  label === '今月'
                    ? '#34c6be'
                    : label === '来月'
                    ? 'rgba(52,198,190,0.15)'
                    : 'rgba(0,0,0,0.06)',
                color:
                  label === '今月'
                    ? '#fff'
                    : label === '来月'
                    ? '#2a9d96'
                    : 'var(--ink-500)',
                borderRadius: '50px',
                fontSize: '12px',
                fontWeight: 700,
              }}
            >
              {label}
            </span>
            <div
              aria-hidden="true"
              style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.07)' }}
            />
          </div>

          {/* カード一覧 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {groupEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
