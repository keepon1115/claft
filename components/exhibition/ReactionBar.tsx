'use client';

import { useEffect, useState } from 'react';
import type { ReactionCount } from '@/lib/exhibition/types';

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
  initialCounts: ReactionCount[];
}) {
  const [counts, setCounts] = useState<ReactionCount[]>(initialCounts);
  const [mine, setMine] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<string | null>(null);

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

  async function toggle(kindId: string) {
    if (busy) return;
    setBusy(kindId);
    // 楽観的更新
    const had = mine.has(kindId);
    setMine((prev) => {
      const next = new Set(prev);
      if (had) next.delete(kindId);
      else next.add(kindId);
      return next;
    });
    setCounts((prev) =>
      prev.map((c) =>
        c.kind_id === kindId ? { ...c, count: Math.max(0, c.count + (had ? -1 : 1)) } : c,
      ),
    );
    try {
      const res = await fetch('/api/exhibition/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workId, kindId }),
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
    <div className="flex flex-wrap gap-3">
      {counts.map((c) => {
        const active = mine.has(c.kind_id);
        return (
          <button
            key={c.kind_id}
            type="button"
            onClick={() => toggle(c.kind_id)}
            disabled={busy !== null}
            aria-pressed={active}
            className={`group flex items-center gap-2 rounded-full border-2 px-4 py-2.5 transition-all duration-300 ${
              active
                ? 'border-[#E04E2C] bg-[#E04E2C] text-[#FFF8EC] shadow-[3px_3px_0_0_#1F1810]'
                : 'border-[#1F1810] bg-white text-[#1F1810] shadow-[3px_3px_0_0_#1F1810] hover:-translate-y-0.5'
            } ${busy === c.kind_id ? 'scale-95' : ''}`}
          >
            <span className="font-body text-base sm:text-lg whitespace-nowrap">{c.emoji}</span>
            <span className="font-handwritten text-xs opacity-80 whitespace-nowrap">{c.label}</span>
            <span
              className={`font-display min-w-[1.5rem] rounded-full px-1.5 py-0.5 text-center text-xs ${
                active ? 'bg-[#FFF8EC]/20' : 'bg-[#F2B544]/30'
              }`}
            >
              {c.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
