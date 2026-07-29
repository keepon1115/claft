'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactionTally } from '@/lib/exhibition/types';

/**
 * 顔文字リアクションバー。
 * 初期値はサーバーで取得した集計。マウント後に「自分が押したか」を取得し、
 * タップで楽観的に増減 → API でトグル。同じ顔文字は1人1回（連打不可）。
 *
 * variant:
 *   'all'    … 種類をすべて横に並べる（既定。なんでも展示会など従来の表示）
 *   'picker' … 押された分だけ表示し、「＋」から選ぶ（Discord風。種類が多い展示会向け）
 */
export default function ReactionBar({
  workId,
  initialCounts,
  variant = 'all',
}: {
  workId: string;
  initialCounts: ReactionTally[];
  variant?: 'all' | 'picker';
}) {
  const [counts, setCounts] = useState<ReactionTally[]>(initialCounts);
  const [mine, setMine] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<string | null>(null);
  const [bounced, setBounced] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/exhibition/reactions?workId=${encodeURIComponent(workId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (cancelled || !json?.ok) return;
        setCounts(json.counts);
        setMine(new Set(json.mine));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [workId]);

  // ピッカーの外側クリック / Escape で閉じる
  useEffect(() => {
    if (!pickerOpen) return;
    function onPointerDown(e: MouseEvent | TouchEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setPickerOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setPickerOpen(false);
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [pickerOpen]);

  async function toggle(reactionTypeId: string) {
    if (busy) return;
    setBusy(reactionTypeId);
    setBounced(reactionTypeId);
    setTimeout(() => setBounced((b) => (b === reactionTypeId ? null : b)), 400);
    // 楽観的更新
    const had = mine.has(reactionTypeId);
    setMine((prev) => {
      const next = new Set(prev);
      if (had) next.delete(reactionTypeId);
      else next.add(reactionTypeId);
      return next;
    });
    setCounts((prev) =>
      prev.map((c) =>
        c.reaction_type_id === reactionTypeId
          ? { ...c, count: Math.max(0, c.count + (had ? -1 : 1)) }
          : c,
      ),
    );
    try {
      const res = await fetch('/api/exhibition/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workId, reactionTypeId }),
      });
      const json = await res.json();
      if (json?.ok) {
        setCounts(json.counts);
        setMine(new Set(json.mine));
      }
    } catch {
      // 失敗時はサーバー値と次回同期されるので何もしない
    } finally {
      setBusy(null);
    }
  }

  function chip(c: ReactionTally) {
    const active = mine.has(c.reaction_type_id);
    return (
      <button
        key={c.reaction_type_id}
        type="button"
        onClick={() => toggle(c.reaction_type_id)}
        disabled={busy !== null}
        aria-pressed={active}
        title={c.label ?? undefined}
        className={`reaction-btn group flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-colors duration-200 ${
          active
            ? 'border-[#E04E2C] bg-[#E04E2C] text-[#FFF8EC]'
            : 'border-[#1F1810]/25 bg-white text-[#1F1810] hover:border-[#1F1810]'
        } ${bounced === c.reaction_type_id ? 'is-bouncing' : ''}`}
      >
        <span className="font-body text-sm whitespace-nowrap">{c.emoji}</span>
        <span
          className={`font-display min-w-[1.25rem] rounded-full px-1 text-center text-[11px] ${
            active ? 'bg-[#FFF8EC]/20' : 'bg-[#F2B544]/30'
          }`}
        >
          {c.count}
        </span>
      </button>
    );
  }

  // 押された分だけ前に出し、残りは「＋」の中から選ぶ
  const visible =
    variant === 'picker'
      ? counts.filter((c) => c.count > 0 || mine.has(c.reaction_type_id))
      : counts;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {visible.map(chip)}

      {variant === 'picker' && (
        <div className="relative" ref={pickerRef}>
          <button
            type="button"
            onClick={() => setPickerOpen((o) => !o)}
            aria-expanded={pickerOpen}
            aria-label="リアクションを付ける"
            title="リアクションを付ける"
            className="flex items-center gap-1 rounded-full border border-dashed border-[#1F1810]/35 bg-white px-2.5 py-1 text-[#1F1810]/70 transition-colors hover:border-[#1F1810] hover:text-[#1F1810]"
          >
            <span className="text-sm leading-none">😊</span>
            <span className="text-[13px] leading-none">＋</span>
          </button>

          {pickerOpen && (
            <div
              role="menu"
              className="absolute bottom-full left-0 z-20 mb-2 w-[248px] rounded-2xl border border-[#1F1810]/20 bg-white p-2 shadow-[0_12px_30px_-12px_rgba(31,24,16,0.45)]"
            >
              <p className="px-1.5 pb-1.5 text-[11px] text-[#1F1810]/50">リアクションを選ぶ</p>
              <div className="flex flex-wrap gap-1">
                {counts.map((c) => {
                  const active = mine.has(c.reaction_type_id);
                  return (
                    <button
                      key={c.reaction_type_id}
                      type="button"
                      role="menuitem"
                      disabled={busy !== null}
                      onClick={() => {
                        toggle(c.reaction_type_id);
                        setPickerOpen(false);
                      }}
                      title={c.label ?? undefined}
                      className={`flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                        active ? 'bg-[#E04E2C]/15 text-[#E04E2C]' : 'hover:bg-[#FFF8EC]'
                      }`}
                    >
                      <span>{c.emoji}</span>
                      {c.label && <span className="text-[11px] text-[#1F1810]/60">{c.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .reaction-btn.is-bouncing {
          animation: reaction-bounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes reaction-bounce {
          0% {
            transform: scale(1);
          }
          40% {
            transform: scale(1.4);
          }
          100% {
            transform: scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .reaction-btn.is-bouncing {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
