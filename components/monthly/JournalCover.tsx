import { Issue, seasonThemes } from '@/lib/monthlyData';
import SeasonDecor from './SeasonDecor';

interface Props {
  issue: Issue;
}

export default function JournalCover({ issue }: Props) {
  const theme = seasonThemes[issue.season];

  return (
    <header
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.headingBg} 0%, #fff 60%)`,
        border: `2px solid ${theme.headingBg}`,
        padding: '32px 24px 28px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        marginBottom: '8px',
      }}
    >
      {/* 季節あしらい（背景） */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '140px',
          opacity: 0.7,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <SeasonDecor season={issue.season} />
      </div>

      {/* マスキングテープ風帯（上部） */}
      <div
        style={{
          position: 'absolute',
          top: '14px',
          left: '-6px',
          padding: '3px 18px 3px 14px',
          background: `${theme.accent}28`,
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--ink-700)',
          borderRadius: '2px',
          transform: 'rotate(-1deg)',
          letterSpacing: '0.05em',
        }}
        aria-hidden="true"
      >
        {issue.year}年{issue.month}月号
      </div>

      {/* タイトル */}
      <div style={{ marginTop: '24px', marginBottom: '12px', position: 'relative', zIndex: 1 }}>
        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--font-zen), sans-serif',
            fontSize: 'clamp(28px, 8vw, 38px)',
            fontWeight: 900,
            color: 'var(--ink-900)',
            letterSpacing: '0.04em',
            lineHeight: 1.1,
            position: 'relative',
            display: 'inline-block',
          }}
        >
          {issue.coverTitle}
          {/* 手書き風下線 */}
          <svg
            style={{ position: 'absolute', bottom: '-6px', left: '-4px', width: 'calc(100% + 8px)', height: '12px' }}
            viewBox="0 0 200 12"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M3,9 Q50,7 100,8 T197,9"
              stroke={theme.accent}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              opacity="0.55"
            />
          </svg>
        </h1>
      </div>

      {/* Vol・季節バッジ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <span
          style={{
            padding: '4px 14px',
            background: theme.accent,
            color: '#fff',
            borderRadius: '50px',
            fontSize: '13px',
            fontWeight: 700,
          }}
        >
          Vol.{issue.volume}
        </span>
        <span
          style={{
            padding: '4px 12px',
            background: `${theme.headingBg}`,
            color: 'var(--ink-700)',
            borderRadius: '50px',
            fontSize: '12px',
            fontWeight: 700,
            border: `1px solid ${theme.accent}40`,
          }}
        >
          {theme.label}号
        </span>
      </div>

      {/* サブコピー */}
      {issue.coverSubtitle && (
        <p
          style={{
            margin: '0 0 24px',
            fontSize: '13px',
            color: 'var(--ink-600)',
            lineHeight: 1.6,
          }}
        >
          {issue.coverSubtitle}
        </p>
      )}

      {/* 動画ボタン */}
      <a
        href={issue.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 22px',
          background: '#ff0000',
          color: '#fff',
          borderRadius: '50px',
          fontWeight: 700,
          fontSize: '14px',
          textDecoration: 'none',
          boxShadow: '0 4px 16px rgba(255,0,0,0.3)',
          transition: 'transform 0.2s ease',
          marginTop: issue.coverSubtitle ? '0' : '10px',
        }}
        aria-label={`${issue.year}年${issue.month}月号の動画を見る（YouTube）`}
      >
        {/* YouTube アイコン */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
        動画で見る
      </a>
    </header>
  );
}
