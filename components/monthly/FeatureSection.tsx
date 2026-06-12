import { Feature, SeasonTheme, featureColors } from '@/lib/monthlyData';
import DialogueBubble from './DialogueBubble';
import AnnouncementCard from './AnnouncementCard';
import ImagePlaceholder from './ImagePlaceholder';

interface Props {
  feature: Feature;
  theme: SeasonTheme;
  accentOverrides?: Partial<Record<Feature['id'], string>>;
}

export default function FeatureSection({ feature, theme, accentOverrides }: Props) {
  const accentColor = accentOverrides?.[feature.id] ?? featureColors[feature.id];

  return (
    <section
      id={`feature-${feature.id}`}
      className="scroll-animate"
      style={{ marginBottom: '8px' }}
    >
      {/* 見出し帯 */}
      <div
        style={{
          background: theme.headingBg,
          borderRadius: '16px 16px 0 0',
          padding: '18px 20px 14px',
          borderLeft: `5px solid ${accentColor}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 付箋風カテゴリラベル */}
        <span
          style={{
            display: 'inline-block',
            padding: '3px 12px',
            background: accentColor,
            color: '#fff',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 700,
            marginBottom: '8px',
            transform: 'rotate(-0.5deg)',
            boxShadow: '1px 2px 4px rgba(0,0,0,0.15)',
          }}
        >
          {feature.category}
        </span>

        <h2
          style={{
            margin: 0,
            fontSize: 'clamp(18px, 4.5vw, 22px)',
            fontWeight: 700,
            color: 'var(--ink-900)',
            lineHeight: 1.35,
            position: 'relative',
          }}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>{feature.title}</span>
          {/* 手書きマーカー風アンダーライン */}
          <svg
            style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '8px', zIndex: 0 }}
            viewBox="0 0 200 8"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M2,6 Q50,4 100,5 T198,6"
              stroke={accentColor}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.45"
            />
          </svg>
        </h2>
      </div>

      {/* 本文カード */}
      <div
        style={{
          background: '#fff',
          borderRadius: '0 0 16px 16px',
          padding: '20px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          border: '1.5px solid rgba(0,0,0,0.06)',
          borderTop: 'none',
        }}
      >
        {/* 画像（infoは省略、feature.imageがある場合のみ） */}
        {feature.id !== 'info' && (
          <div style={{ marginBottom: '18px' }}>
            <ImagePlaceholder
              width={640}
              height={360}
              src={feature.image?.src}
              alt={feature.image?.alt || feature.title}
              caption={feature.image?.caption}
            />
          </div>
        )}

        {/* リード文 */}
        <p style={{ margin: '0 0 16px', fontSize: '15px', lineHeight: 1.8, color: 'var(--ink-700)' }}>
          {feature.lead}
        </p>

        {/* 掛け合い吹き出し */}
        {feature.dialogues && feature.dialogues.length > 0 && (
          <div
            style={{
              background: 'rgba(0,0,0,0.02)',
              borderRadius: '12px',
              padding: '12px',
              marginBottom: '16px',
            }}
          >
            <p style={{ margin: '0 0 10px', fontSize: '12px', color: 'var(--ink-500)', fontWeight: 700 }}>
              📻
            </p>
            {feature.dialogues.map((d, i) => (
              <DialogueBubble key={i} dialogue={d} />
            ))}
          </div>
        )}

        {/* 書籍紹介付箋（newsのみ） */}
        {feature.bookNote && (
          <div
            style={{
              background: '#fffde7',
              border: '1.5px dashed #f5a623',
              borderRadius: '8px',
              padding: '14px 16px',
              marginBottom: '16px',
              transform: 'rotate(0.3deg)',
              boxShadow: '2px 3px 8px rgba(0,0,0,0.08)',
            }}
          >
            <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.7, color: 'var(--ink-700)' }}>
              📚 {feature.bookNote}
            </p>
          </div>
        )}

        {/* お知らせカード群 */}
        {feature.announcements && feature.announcements.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
            {feature.announcements.map((ann, i) => (
              <AnnouncementCard key={i} announcement={ann} accentColor={accentColor} />
            ))}
          </div>
        )}

        {/* 補足お知らせ（小さめ） */}
        {feature.subAnnouncements && feature.subAnnouncements.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ margin: '0 0 6px', fontSize: '12px', color: 'var(--ink-500)', fontWeight: 700 }}>
              その他のお知らせ
            </p>
            {feature.subAnnouncements.map((sub, i) => (
              <div
                key={i}
                style={{
                  background: `${accentColor}0d`,
                  border: `1px dashed ${accentColor}4d`,
                  borderRadius: '10px',
                  padding: '12px 14px',
                }}
              >
                <p style={{ margin: '0 0 8px', fontSize: '13px', lineHeight: 1.7, color: 'var(--ink-700)' }}>
                  {sub.body}
                </p>
                {sub.link && (
                  sub.link.external ? (
                    <a
                      href={sub.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '13px', color: accentColor, fontWeight: 700, textDecoration: 'none' }}
                    >
                      {sub.link.label} ↗
                    </a>
                  ) : (
                    <a
                      href={sub.link.href}
                      style={{ fontSize: '13px', color: accentColor, fontWeight: 700, textDecoration: 'none' }}
                    >
                      {sub.link.label} →
                    </a>
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
