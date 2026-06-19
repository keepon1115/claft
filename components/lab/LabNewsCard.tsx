import type { CalendarEvent } from '@/lib/googleCalendar';

// カテゴリごとの色テーマ（写真が無いときのグラデ背景）と代替絵文字。
const CATEGORY_META: Record<string, { theme: 'navy' | 'orange' | 'green'; emoji: string }> = {
  '検定':          { theme: 'navy',   emoji: '📋' },
  '発表会':        { theme: 'orange', emoji: '🎤' },
  'Yononaka':      { theme: 'green',  emoji: '🗣️' },
  'ワークショップ': { theme: 'navy',   emoji: '🛠️' },
  '展示会':        { theme: 'green',  emoji: '🖼️' },
};

function metaFor(cat: string | undefined) {
  if (cat && CATEGORY_META[cat]) return CATEGORY_META[cat];
  return { theme: 'navy' as const, emoji: '📌' };
}

// microCMSのCDN画像なら 16:9 にトリミング・軽量化（クエリ無しのみ付与）。
function optimizedBanner(url: string): string {
  if (url.includes('microcms-assets.io') && !url.includes('?')) {
    return `${url}?fm=webp&fit=crop&w=1280&h=720&q=80`;
  }
  return url;
}

function formatDate(isoDate: string, allDay: boolean): string {
  const d = new Date(allDay ? `${isoDate}T00:00:00` : isoDate);
  if (Number.isNaN(d.getTime())) return '';
  const weekday = ['日', '月', '火', '水', '木', '金', '土'][d.getDay()];
  return `${d.getMonth() + 1}月${d.getDate()}日（${weekday}）`;
}

// 中段お知らせ：キープオンカレンダーの予定を、ラボの紙カード体裁で表示。
// 画像は説明欄「画像:」の公開URL（推奨 横長16:9 / 1280×720px）。
export function LabNewsCard({ event }: { event: CalendarEvent }) {
  const meta = metaFor(event.category);
  const dateLabel = formatDate(event.start, event.allDay);
  // カード全体のリンク先：申込 > 配信 の優先。どちらも無ければリンクなし。
  const href = event.applyUrl || event.broadcastUrl;
  const linkLabel = event.applyUrl ? '申し込む →' : event.broadcastUrl ? 'くわしく見る →' : null;
  const chip = event.category || 'キープオン';

  const inner = (
    <>
      <div className={`lab-post-thumb lab-news-thumb t-${meta.theme}`}>
        {event.imageUrl ? (
          <img className="lab-post-photo" src={optimizedBanner(event.imageUrl)} alt="" loading="lazy" decoding="async" />
        ) : (
          <span className="emoji" aria-hidden="true">{meta.emoji}</span>
        )}
        <span className="lab-chip">{chip}</span>
      </div>
      <div className="lab-post-body">
        <h3>{event.title}</h3>

        <div className="lab-news-info">
          {dateLabel && (
            <p>
              <span aria-hidden="true">🗓️</span>
              {dateLabel}
              {event.time ? `　${event.time}` : ''}
            </p>
          )}
          {event.location && (
            <p>
              <span aria-hidden="true">📍</span>
              {event.location}
            </p>
          )}
          {event.audience && (
            <p>
              <span aria-hidden="true">👀</span>
              {event.audience}
            </p>
          )}
        </div>

        {linkLabel && (
          <div className="lab-post-meta">
            <span />
            <span className="lab-post-link">{linkLabel}</span>
          </div>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <a className="lab-post" href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return <article className="lab-post">{inner}</article>;
}
