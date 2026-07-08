'use client';

import { useEffect, useState } from 'react';
import type { ReactionTally } from '@/lib/exhibition/types';

/**
 * 顔文字リアクションバー。
 * 初期値はサーバーで取得した集計。マウント後に「自分が押したか」を取得し、
 * タップで楽観的に増減 → API でトグル。同じ顔文字は1人1回（連打不可）。
 */
export default function ReactionBar({
  workId,
  initialCounts,
}: {
  workId: string;
  initialCounts: ReactionTally[];
}) {
  const [counts, setCounts] = useState<ReactionTally[]>(initialCounts);
  const [mine, setMine] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<string | null>(null);
  const [bounced, setBounced] = useState<string | null>(null);

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

  return (
    <div className="flex flex-wrap gap-2">
      {counts.map((c) => {
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
      })}

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
