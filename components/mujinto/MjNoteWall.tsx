'use client';

import { useState } from 'react';
import { NOTES_ORDERED, NOTE_LABELS, type Note, type NoteColor } from '@/lib/mujintoData';

type FilterValue = NoteColor | 'all';

const NOTE_COLOR_CLASS: Record<NoteColor, string> = {
  yellow: 'mj-note--y',
  green: 'mj-note--g',
  orange: 'mj-note--o',
};

type Props = {
  /** 表示する付箋（色ラウンドロビン済みのもの）。省略時は1日目 */
  notes?: Note[];
};

/**
 * ふりかえり付箋ウォール（唯一のクライアントコンポーネント）。
 * 非選択の付箋は DOM から消さず hidden 属性で隠す（DOM順維持・CLS抑制）。
 * localStorage/sessionStorage は使わない。
 */
export function MjNoteWall({ notes = NOTES_ORDERED }: Props) {
  const [filter, setFilter] = useState<FilterValue>('all');

  const filters: { value: FilterValue; label: string; count: number }[] = [
    { value: 'all', label: 'すべて', count: notes.length },
    { value: 'yellow', label: NOTE_LABELS.yellow, count: notes.filter((n) => n.color === 'yellow').length },
    { value: 'green', label: NOTE_LABELS.green, count: notes.filter((n) => n.color === 'green').length },
    { value: 'orange', label: NOTE_LABELS.orange, count: notes.filter((n) => n.color === 'orange').length },
  ];

  return (
    <div>
      <div className="mj-filter" role="group" aria-label="付箋の絞り込み">
        {filters.map((f) => (
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
        {notes.map((note, i) => {
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
