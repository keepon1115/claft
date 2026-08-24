'use client';

import { useState } from 'react';
import { NOTES_ORDERED, NOTE_LABELS, type NoteColor } from '@/lib/mujintoData';

type FilterValue = NoteColor | 'all';

const FILTERS: { value: FilterValue; label: string; count: number }[] = [
  { value: 'all', label: 'すべて', count: NOTES_ORDERED.length },
  { value: 'yellow', label: NOTE_LABELS.yellow, count: NOTES_ORDERED.filter((n) => n.color === 'yellow').length },
  { value: 'green', label: NOTE_LABELS.green, count: NOTES_ORDERED.filter((n) => n.color === 'green').length },
  { value: 'orange', label: NOTE_LABELS.orange, count: NOTES_ORDERED.filter((n) => n.color === 'orange').length },
];

const NOTE_COLOR_CLASS: Record<NoteColor, string> = {
  yellow: 'mj-note--y',
  green: 'mj-note--g',
  orange: 'mj-note--o',
};

/**
 * ふりかえり付箋ウォール（唯一のクライアントコンポーネント）。
 * 非選択の付箋は DOM から消さず hidden 属性で隠す（DOM順維持・CLS抑制）。
 * localStorage/sessionStorage は使わない。
 */
export function MjNoteWall() {
  const [filter, setFilter] = useState<FilterValue>('all');

  return (
    <div>
      <div className="mj-filter" role="group" aria-label="付箋の絞り込み">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className="mj-filter-chip"
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
          >
            {f.label}({f.count})
          </button>
        ))}
      </div>

      <div className="mj-notewall">
        {NOTES_ORDERED.map((note, i) => {
          const isHidden = filter !== 'all' && filter !== note.color;
          return (
            <div
              key={`${note.color}-${i}`}
              className={`mj-note ${NOTE_COLOR_CLASS[note.color]} reveal`}
              style={{ transitionDelay: `${i * 30}ms` }}
              hidden={isHidden}
            >
              <p>{note.text}</p>
              <span className="mj-note-cat">{NOTE_LABELS[note.color]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
