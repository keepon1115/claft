'use client';

import { useState } from 'react';
import { Section } from '@/components/MobileContainer';
import type { CalendarEvent } from '@/lib/googleCalendar';
import EventList from './EventList';
import CalendarMonthView from './CalendarMonthView';
import BroadcastArchive from './BroadcastArchive';

type SourceFilter = 'keepon' | 'claft';
type ViewMode = 'list' | 'calendar';

interface Props {
  events: CalendarEvent[];
  fetchError?: string;
}

export default function NewsClient({ events, fetchError }: Props) {
  const [filter, setFilter] = useState<SourceFilter>('claft');
  const [view, setView] = useState<ViewMode>('list');

  const filtered =
    filter === 'claft' ? events : events.filter((e) => e.source === filter);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .news-tab {
          transition: background 0.18s ease, color 0.18s ease;
          border: none;
          cursor: pointer;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 700;
        }
        .news-tab[aria-selected="true"] {
          background: #34c6be;
          color: #fff;
        }
        .news-tab[aria-selected="false"] {
          background: rgba(0,0,0,0.05);
          color: #4b5563;
        }
        .news-tab[aria-selected="false"]:hover {
          background: rgba(52,198,190,0.12);
          color: #2a9d96;
        }
        .view-toggle-btn {
          transition: background 0.18s ease, color 0.18s ease;
          border: none;
          cursor: pointer;
          padding: 5px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
        }
        .view-toggle-btn.active { background: #1f2937; color: #fff; }
        .view-toggle-btn:not(.active) { background: transparent; color: #6b7280; }
        .apply-btn {
          transition: opacity 0.18s ease, transform 0.12s ease;
        }
        .apply-btn:hover { opacity: 0.86; transform: translateY(-1px); }
        .apply-btn:active { transform: scale(0.97); }
        .event-card { transition: box-shadow 0.2s ease, transform 0.2s ease; }
        .event-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.1) !important;
          transform: translateY(-1px);
        }
        .archive-card:hover {
          box-shadow: 0 6px 20px rgba(0,0,0,0.09) !important;
          transform: translateY(-1px);
        }
      `}} />

      {/* ページヘッダー */}
      <Section>
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '4px 16px',
              background: 'rgba(52,198,190,0.12)',
              color: '#2a9d96',
              borderRadius: '50px',
              fontSize: '12px',
              fontWeight: 700,
              marginBottom: '14px',
            }}
          >
            お知らせ・活動報告
          </span>
          <h1
            style={{
              fontSize: 'clamp(22px, 6vw, 28px)',
              fontWeight: 900,
              color: 'var(--ink-900)',
              fontFamily: 'var(--font-zen), sans-serif',
              marginBottom: '8px',
              lineHeight: 1.2,
            }}
          >
            イベント情報
          </h1>
          <p style={{ color: 'var(--ink-500)', fontSize: '14px', margin: 0 }}>
            申し込み忘れがないよう、定期的にご確認ください。
          </p>
        </div>
      </Section>

      {/* ─── Section 1: これからの予定 ─── */}
      <Section>
        <h2
          style={{
            fontSize: 'clamp(16px, 4.5vw, 20px)',
            fontWeight: 900,
            color: 'var(--ink-900)',
            fontFamily: 'var(--font-zen), sans-serif',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span aria-hidden="true">📅</span>
          これからの予定
        </h2>

        {/* フィルタータブ */}
        <div
          role="tablist"
          aria-label="カレンダー絞り込み"
          style={{ display: 'flex', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}
        >
          {(
            [
              { val: 'keepon', label: 'キープオン' },
              { val: 'claft', label: 'CLAFT' },
            ] as const
          ).map(({ val, label }) => (
            <button
              key={val}
              role="tab"
              aria-selected={filter === val}
              className="news-tab"
              onClick={() => setFilter(val)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* タブ注釈 */}
        <p
          style={{
            fontSize: '11px',
            color: '#9ca3af',
            margin: '0 0 12px',
            lineHeight: 1.5,
          }}
        >
          キープオン＝全員向けの予定／CLAFT＝CLAFT生向けの予定（全員向け＋CLAFT限定）
        </p>

        {/* 表示切替トグル */}
        <div
          style={{
            display: 'inline-flex',
            background: 'rgba(0,0,0,0.06)',
            borderRadius: '10px',
            padding: '3px',
            marginBottom: '20px',
          }}
        >
          {(
            [
              { val: 'list', label: 'リスト' },
              { val: 'calendar', label: 'カレンダー' },
            ] as const
          ).map(({ val, label }) => (
            <button
              key={val}
              className={`view-toggle-btn${view === val ? ' active' : ''}`}
              onClick={() => setView(val)}
              aria-pressed={view === val}
            >
              {label}
            </button>
          ))}
        </div>

        {/* カレンダー取得エラー時のフォールバック（ページ全体は落とさない） */}
        {fetchError && (
          <div
            role="alert"
            style={{
              padding: '12px 16px',
              background: 'rgba(240,106,106,0.07)',
              border: '1px solid rgba(240,106,106,0.2)',
              borderRadius: '12px',
              color: '#c0392b',
              fontSize: '13px',
              marginBottom: '16px',
            }}
          >
            ⚠️ {fetchError}
          </div>
        )}

        {view === 'list' ? (
          <EventList events={filtered} />
        ) : (
          <CalendarMonthView events={filtered} />
        )}
      </Section>

      <hr
        aria-hidden="true"
        style={{
          border: 'none',
          borderTop: '2px dashed rgba(0,0,0,0.07)',
          margin: '0 0 0',
        }}
      />

      {/* ─── Section 2: 活動報告アーカイブ ─── */}
      <Section>
        <h2
          style={{
            fontSize: 'clamp(16px, 4.5vw, 20px)',
            fontWeight: 900,
            color: 'var(--ink-900)',
            fontFamily: 'var(--font-zen), sans-serif',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span aria-hidden="true">📚</span>
          活動報告アーカイブ
        </h2>
        <BroadcastArchive />
      </Section>
    </>
  );
}
