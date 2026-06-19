import type { CalendarEvent } from '@/lib/googleCalendar';

interface Props {
  event: CalendarEvent;
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  '検定':          { bg: '#fff4e0', text: '#b87d2b' },
  '発表会':        { bg: '#ffe8ef', text: '#b0384d' },
  'Yononaka':      { bg: '#e0f7f7', text: '#1a8c86' },
  'ワークショップ': { bg: '#ede8f7', text: '#6b4bcc' },
  '展示会':        { bg: '#e4f7ee', text: '#2a7a56' },
};

function getCategoryStyle(cat: string | undefined) {
  if (!cat) return null;
  return CATEGORY_STYLES[cat] ?? { bg: 'rgba(0,0,0,0.06)', text: 'var(--ink-500)' };
}

function formatShortDate(
  isoDate: string,
  allDay: boolean
): { month: string; day: string; weekday: string; time?: string } {
  // 終日予定はローカル日付として扱う（UTC midnight ずれを防ぐ）
  const date = new Date(allDay ? `${isoDate}T00:00:00` : isoDate);
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  const weekday = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
  if (allDay) return { month, day, weekday };
  const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  return { month, day, weekday, time };
}

// microCMSのCDN画像なら最適化クエリを付与（軽量・横長バナー比でトリミング）。
// 既にクエリ付き、または他ホストのURLはそのまま使う。
function optimizedBanner(url: string): string {
  if (url.includes('microcms-assets.io') && !url.includes('?')) {
    return `${url}?fm=webp&fit=crop&w=900&h=340&q=80`;
  }
  return url;
}

function ExternalLinkIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M7 1h4v4M11 1L6 6M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EventCard({ event }: Props) {
  const catStyle = getCategoryStyle(event.category);
  const dateInfo = formatShortDate(event.start, event.allDay);

  return (
    <article
      className="event-card"
      style={{
        background: '#fff',
        borderRadius: '16px',
        border: '1.5px solid rgba(0,0,0,0.07)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        overflow: 'hidden',
      }}
    >
      {/* バナー画像（説明欄「画像:」がある場合のみ・カード上部に横長表示） */}
      {event.imageUrl && (
        <div
          style={{
            width: '100%',
            aspectRatio: '900 / 340',
            background: 'rgba(0,0,0,0.03)',
            borderBottom: '1.5px solid rgba(0,0,0,0.06)',
          }}
        >
          <img
            src={optimizedBanner(event.imageUrl)}
            alt=""
            loading="lazy"
            decoding="async"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      )}

      <div style={{ display: 'flex' }}>
        {/* 日付カラム */}
        <div
          aria-label={`${dateInfo.month}月${dateInfo.day}日`}
          style={{
            minWidth: '64px',
            width: '64px',
            background: 'rgba(52,198,190,0.06)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px 4px',
            borderRight: '1.5px solid rgba(52,198,190,0.12)',
            gap: '2px',
          }}
        >
          <span style={{ fontSize: '11px', color: '#2a9d96', fontWeight: 700 }}>
            {dateInfo.month}月
          </span>
          <span style={{ fontSize: '28px', fontWeight: 900, color: 'var(--ink-900)', lineHeight: 1 }}>
            {dateInfo.day}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--ink-500)' }}>
            ({dateInfo.weekday})
          </span>
          {dateInfo.time && (
            <span style={{ fontSize: '11px', color: '#2a9d96', fontWeight: 600, marginTop: '4px' }}>
              {dateInfo.time}
            </span>
          )}
        </div>

        {/* コンテンツカラム */}
        <div style={{ flex: 1, padding: '14px 14px 12px', minWidth: 0 }}>
          {/* バッジ行 */}
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '6px' }}>
            <span
              style={{
                padding: '2px 8px',
                borderRadius: '50px',
                fontSize: '10px',
                fontWeight: 700,
                background: event.source === 'claft' ? '#34c6be' : '#f06a6a',
                color: '#fff',
              }}
            >
              {event.source === 'claft' ? 'CLAFT' : 'キープオン'}
            </span>
            {catStyle && (
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '50px',
                  fontSize: '10px',
                  fontWeight: 700,
                  background: catStyle.bg,
                  color: catStyle.text,
                }}
              >
                {event.category}
              </span>
            )}
          </div>

          {/* タイトル */}
          <h3
            style={{
              fontSize: 'clamp(14px, 3.5vw, 16px)',
              fontWeight: 800,
              color: 'var(--ink-900)',
              margin: '0 0 4px',
              lineHeight: 1.3,
            }}
          >
            {event.title}
          </h3>

          {/* 対象 */}
          {event.audience && (
            <p style={{ fontSize: '12px', color: 'var(--ink-500)', margin: '0 0 3px' }}>
              <span style={{ fontWeight: 600 }}>対象：</span>{event.audience}
            </p>
          )}

          {/* 時間 */}
          {event.time && (
            <p style={{ fontSize: '12px', color: 'var(--ink-500)', margin: '0 0 3px' }}>
              <span style={{ fontWeight: 600 }}>時間：</span>{event.time}
            </p>
          )}

          {/* 場所 */}
          {event.location && (
            <p style={{ fontSize: '12px', color: 'var(--ink-500)', margin: '0 0 3px' }}>
              <span style={{ fontWeight: 600 }}>場所：</span>{event.location}
            </p>
          )}

          {/* 配信リンク */}
          {event.broadcastUrl && (
            <a
              href={event.broadcastUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                color: '#2a9d96',
                textDecoration: 'none',
                margin: '4px 0 0',
              }}
            >
              詳しくはこちら（配信を見る）
              <ExternalLinkIcon />
            </a>
          )}

          {/* 申込ボタン（ページの主目的）*/}
          {event.applyUrl && (
            <div style={{ marginTop: '10px' }}>
              <a
                href={event.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="apply-btn"
                aria-label={`${event.title}に申し込む（外部リンク）`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 20px',
                  background: '#34c6be',
                  color: '#fff',
                  borderRadius: '50px',
                  fontSize: '13px',
                  fontWeight: 800,
                  textDecoration: 'none',
                }}
              >
                申し込む
                <ExternalLinkIcon size={11} />
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
