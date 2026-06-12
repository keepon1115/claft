import { Feature, featureColors } from '@/lib/monthlyData';

interface Props {
  features: Feature[];
  featureColorOverrides?: Partial<Record<Feature['id'], string>>;
}

const tocIcons: Record<Feature['id'], string> = {
  recap: '🏆',
  news: '🤖',
  info: '📢',
};

export default function JournalToc({ features, featureColorOverrides }: Props) {
  return (
    <nav aria-label="目次" style={{ margin: '0 0 8px' }}>
      <div
        style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '18px 20px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          border: '1.5px dashed rgba(0,0,0,0.08)',
        }}
      >
        <p
          style={{
            margin: '0 0 14px',
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--ink-500)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          CONTENTS
        </p>
        <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {features.map((f, i) => {
            const color = featureColorOverrides?.[f.id] ?? featureColors[f.id];
            return (
              <li key={f.id}>
                <a
                  href={`#feature-${f.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: `${color}10`,
                    border: `1.5px solid ${color}30`,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: color,
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink-800)' }}>
                    {tocIcons[f.id]} {f.category}
                  </span>
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '12px',
                      color: color,
                      fontWeight: 700,
                    }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
