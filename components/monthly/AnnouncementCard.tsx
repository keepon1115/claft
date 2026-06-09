import Link from 'next/link';
import { Announcement } from '@/lib/monthlyData';

interface Props {
  announcement: Announcement;
  accentColor?: string;
}

export default function AnnouncementCard({ announcement, accentColor = '#34c6be' }: Props) {
  const { title, date, audience, body, link } = announcement;

  return (
    <article
      style={{
        background: '#fff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        border: '2px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* カラーバー */}
      <div style={{ height: '4px', background: accentColor }} />

      <div style={{ padding: '20px' }}>
        {/* バッジ行 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 10px',
              background: `${accentColor}18`,
              color: accentColor,
              borderRadius: '50px',
              fontSize: '12px',
              fontWeight: 700,
              border: `1px solid ${accentColor}40`,
            }}
          >
            📅 {date}
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 10px',
              background: 'rgba(0,0,0,0.04)',
              color: 'var(--ink-600)',
              borderRadius: '50px',
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            👥 {audience}
          </span>
        </div>

        <h3 style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1.4 }}>
          {title}
        </h3>

        <p style={{ margin: '0 0 16px', fontSize: '14px', lineHeight: 1.75, color: 'var(--ink-700)' }}>
          {body}
        </p>

        {link && (
          link.external ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                background: accentColor,
                color: '#fff',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: `0 4px 12px ${accentColor}40`,
              }}
            >
              {link.label}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15,3 21,3 21,9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ) : (
            <Link
              href={link.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                background: accentColor,
                color: '#fff',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: `0 4px 12px ${accentColor}40`,
              }}
            >
              {link.label}
              <span aria-hidden="true">→</span>
            </Link>
          )
        )}
      </div>
    </article>
  );
}
