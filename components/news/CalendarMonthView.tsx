'use client';

import { useState } from 'react';
import type { CalendarEvent } from '@/lib/googleCalendar';
import EventCard from './EventCard';

interface Props {
  events: CalendarEvent[];
}

function toLocalDate(isoDate: string, allDay: boolean): Date {
  return new Date(allDay ? `${isoDate}T00:00:00` : isoDate);
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function CalendarMonthView({ events }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPad = firstDay.getDay(); // 0=日
  const totalCells = Math.ceil((startPad + lastDay.getDate()) / 7) * 7;

  const cells: (Date | null)[] = Array.from({ length: totalCells }, (_, i) => {
    const dayNum = i - startPad + 1;
    if (dayNum < 1 || dayNum > lastDay.getDate()) return null;
    return new Date(year, month, dayNum);
  });

  function eventsOnDay(date: Date) {
    return events.filter((e) =>
      isSameDay(toLocalDate(e.start, e.allDay), date)
    );
  }

  function prevMonth() {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
    setSelectedDate(null);
  }

  function nextMonth() {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
    setSelectedDate(null);
  }

  const selectedEvents = selectedDate ? eventsOnDay(selectedDate) : [];
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div>
      {/* 月ナビゲーション */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
        }}
      >
        <button
          onClick={prevMonth}
          aria-label="前の月"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1.5px solid rgba(0,0,0,0.1)',
            background: '#fff',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ink-600)',
          }}
        >
          ‹
        </button>
        <span
          style={{
            fontSize: '16px',
            fontWeight: 800,
            color: 'var(--ink-900)',
          }}
        >
          {year}年{month + 1}月
        </span>
        <button
          onClick={nextMonth}
          aria-label="次の月"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1.5px solid rgba(0,0,0,0.1)',
            background: '#fff',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ink-600)',
          }}
        >
          ›
        </button>
      </div>

      {/* 曜日ヘッダー */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          marginBottom: '4px',
        }}
      >
        {weekdays.map((w, i) => (
          <div
            key={w}
            style={{
              textAlign: 'center',
              fontSize: '11px',
              fontWeight: 700,
              color:
                i === 0 ? '#e05555' : i === 6 ? '#4488cc' : 'var(--ink-500)',
              padding: '4px 0',
            }}
          >
            {w}
          </div>
        ))}
      </div>

      {/* 日付グリッド */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '3px',
          marginBottom: '16px',
        }}
      >
        {cells.map((date, idx) => {
          if (!date) {
            return (
              <div
                key={`pad-${idx}`}
                style={{ height: '44px' }}
                aria-hidden="true"
              />
            );
          }
          const dayEvents = eventsOnDay(date);
          const isToday = isSameDay(date, today);
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
          const dow = date.getDay();

          return (
            <button
              key={date.toISOString()}
              onClick={() =>
                setSelectedDate(isSelected ? null : new Date(date))
              }
              aria-label={`${month + 1}月${date.getDate()}日${
                dayEvents.length > 0 ? `、${dayEvents.length}件のイベント` : ''
              }`}
              aria-pressed={isSelected}
              style={{
                height: '44px',
                borderRadius: '10px',
                border: isSelected
                  ? '2px solid #34c6be'
                  : isToday
                  ? '2px solid rgba(52,198,190,0.4)'
                  : '2px solid transparent',
                background: isSelected
                  ? '#34c6be'
                  : isToday
                  ? 'rgba(52,198,190,0.07)'
                  : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                padding: '2px',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: isToday ? 800 : 400,
                  color: isSelected
                    ? '#fff'
                    : dow === 0
                    ? '#e05555'
                    : dow === 6
                    ? '#4488cc'
                    : 'var(--ink-800)',
                }}
              >
                {date.getDate()}
              </span>
              {/* イベントドット（最大3件） */}
              {dayEvents.length > 0 && (
                <div
                  style={{ display: 'flex', gap: '2px' }}
                  aria-hidden="true"
                >
                  {dayEvents.slice(0, 3).map((e, i) => (
                    <div
                      key={i}
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: isSelected
                          ? 'rgba(255,255,255,0.8)'
                          : e.source === 'claft'
                          ? '#34c6be'
                          : '#58c3a2',
                      }}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 選択日のイベント詳細 */}
      {selectedDate && (
        <div
          style={{
            background: 'rgba(52,198,190,0.05)',
            border: '1.5px solid rgba(52,198,190,0.2)',
            borderRadius: '14px',
            padding: '16px',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#2a9d96',
              marginBottom: '12px',
            }}
          >
            {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
            のイベント
          </p>
          {selectedEvents.length === 0 ? (
            <p style={{ fontSize: '13px', color: 'var(--ink-500)' }}>
              この日の予定はありません
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedEvents.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
