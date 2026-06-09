import Link from 'next/link';
import { issues } from '@/lib/monthlyData';
import { weeklyIssues } from '@/lib/weeklyData';

function ExternalLinkIcon() {
  return (
    <svg
      width="12"
      height="12"
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

export default function BroadcastArchive() {
  const sortedIssues = [...issues].sort(
    (a, b) => b.year * 100 + b.month - (a.year * 100 + a.month)
  );
  const sortedWeekly = [...weeklyIssues].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* ── KEEPON JOURNAL（月刊）── */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '14px',
          }}
        >
          <span
            style={{
              padding: '3px 12px',
              background: 'rgba(52,198,190,0.12)',
              color: '#2a9d96',
              borderRadius: '50px',
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            月刊
          </span>
          <h3
            style={{
              fontSize: 'clamp(14px, 3.8vw, 17px)',
              fontWeight: 800,
              color: 'var(--ink-900)',
              fontFamily: 'var(--font-zen), sans-serif',
              margin: 0,
            }}
          >
            KEEPON JOURNAL
          </h3>
        </div>

        {sortedIssues.length === 0 ? (
          <p style={{ fontSize: '13px', color: 'var(--ink-500)' }}>
            まだ号がありません
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {sortedIssues.map((issue) => (
              <Link
                key={issue.slug}
                href={`/monthly/${issue.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="archive-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    background: '#fff',
                    borderRadius: '14px',
                    border: '1.5px solid rgba(0,0,0,0.07)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                  }}
                >
                  {/* アイコン */}
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background:
                        'linear-gradient(135deg, rgba(52,198,190,0.2), rgba(52,198,190,0.05))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    📖
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginBottom: '3px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '1px 7px',
                          background: '#34c6be',
                          color: '#fff',
                          borderRadius: '50px',
                        }}
                      >
                        Vol.{issue.volume}
                      </span>
                      <span
                        style={{
                          fontSize: '12px',
                          color: 'var(--ink-500)',
                          fontWeight: 600,
                        }}
                      >
                        {issue.year}年{issue.month}月号
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: 'var(--ink-900)',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {issue.coverTitle}
                    </p>
                  </div>
                  <span
                    style={{ color: '#2a9d96', fontSize: '16px', flexShrink: 0 }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── Weekly KEEPON（週刊）── */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '14px',
          }}
        >
          <span
            style={{
              padding: '3px 12px',
              background: 'rgba(88,195,162,0.12)',
              color: '#2a7a56',
              borderRadius: '50px',
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            週刊
          </span>
          <h3
            style={{
              fontSize: 'clamp(14px, 3.8vw, 17px)',
              fontWeight: 800,
              color: 'var(--ink-900)',
              fontFamily: 'var(--font-zen), sans-serif',
              margin: 0,
            }}
          >
            Weekly KEEPON
          </h3>
        </div>

        {sortedWeekly.length === 0 ? (
          <div
            style={{
              padding: '28px 16px',
              background: 'rgba(0,0,0,0.02)',
              borderRadius: '14px',
              border: '2px dashed rgba(0,0,0,0.07)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '13px', color: 'var(--ink-500)', margin: 0 }}>
              バックナンバーは順次追加予定です
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {sortedWeekly.map((issue) => {
              const dateLabel = new Intl.DateTimeFormat('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }).format(new Date(`${issue.date}T00:00:00`));
              return (
                <a
                  key={issue.id}
                  href={issue.canvaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="archive-card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      background: '#fff',
                      borderRadius: '14px',
                      border: '1.5px solid rgba(0,0,0,0.07)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      transition: 'box-shadow 0.2s, transform 0.2s',
                    }}
                  >
                    {issue.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={issue.thumbnail}
                        alt=""
                        width={44}
                        height={44}
                        style={{
                          borderRadius: '8px',
                          objectFit: 'cover',
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          background:
                            'linear-gradient(135deg, rgba(88,195,162,0.25), rgba(88,195,162,0.05))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      >
                        📰
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: '11px',
                          color: 'var(--ink-500)',
                          margin: '0 0 2px',
                        }}
                      >
                        {dateLabel}
                      </p>
                      <p
                        style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: 'var(--ink-900)',
                          margin: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {issue.title}
                      </p>
                    </div>
                    <div style={{ color: '#2a7a56', flexShrink: 0 }}>
                      <ExternalLinkIcon />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
