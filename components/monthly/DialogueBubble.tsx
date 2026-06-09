import { Dialogue } from '@/lib/monthlyData';

interface Props {
  dialogue: Dialogue;
}

const speakerMeta = {
  satoru: { name: '悟', side: 'left' as const, bg: '#e0f4f3', border: '#7ec8c4' },
  shoichiro: { name: '将一郎', side: 'right' as const, bg: '#fff8e6', border: '#f5a623' },
};

export default function DialogueBubble({ dialogue }: Props) {
  const meta = speakerMeta[dialogue.speaker];
  const isRight = meta.side === 'right';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isRight ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        gap: '10px',
        margin: '12px 0',
      }}
    >
      {/* アバター */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: meta.bg,
            border: `2px solid ${meta.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
          }}
          aria-hidden="true"
        >
          {dialogue.speaker === 'satoru' ? '🧑' : '👨'}
        </div>
        <span style={{ fontSize: '11px', color: 'var(--ink-500)', fontWeight: 700, whiteSpace: 'nowrap' }}>
          {meta.name}
        </span>
      </div>

      {/* 吹き出し */}
      <div
        style={{
          position: 'relative',
          maxWidth: 'calc(100% - 60px)',
          background: meta.bg,
          border: `1.5px solid ${meta.border}`,
          borderRadius: isRight ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
          padding: '10px 14px',
        }}
      >
        <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.65, color: 'var(--ink-800)' }}>
          「{dialogue.text}」
        </p>
      </div>
    </div>
  );
}
