import Image from 'next/image';

interface Props {
  width: number;
  height: number;
  caption?: string;
  src?: string;
  alt?: string;
}

export default function ImagePlaceholder({ width, height, caption, src, alt = '' }: Props) {
  const aspect = `${width} / ${height}`;

  return (
    <figure style={{ margin: 0 }}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ width: '100%', height: 'auto', borderRadius: '12px', objectFit: 'cover' }}
        />
      ) : (
        <div
          style={{
            aspectRatio: aspect,
            width: '100%',
            border: '2px dashed rgba(52,198,190,0.4)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(52,198,190,0.04)',
            gap: '8px',
          }}
          aria-hidden="true"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(52,198,190,0.5)" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21,15 16,10 5,21" />
          </svg>
          <span style={{ fontSize: '12px', color: 'rgba(52,198,190,0.7)', textAlign: 'center', padding: '0 12px' }}>
            画像を差し込み（推奨 {width}×{height}）
          </span>
        </div>
      )}
      {caption && (
        <figcaption
          style={{
            marginTop: '8px',
            fontSize: '12px',
            color: 'var(--ink-500)',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
