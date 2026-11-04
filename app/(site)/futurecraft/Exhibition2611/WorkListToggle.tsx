"use client";

import { useRef, type MouseEvent } from "react";

/* ============================================================
   作品リスト（トグル）
   - 開くと作品名が並び、押すとその作品の場所までスクロールする
   - ジャンプ後はリストを閉じ、飛んだ先の作品名を一瞬ハイライトする
   - 作品は props で受け取る（ページ側が表示順に並べたもの）
============================================================ */

export type WorkListEntry = { id: string; title: string };

export default function WorkListToggle({ works }: { works: WorkListEntry[] }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const jump = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return; // 見つからなければ通常のアンカー動作に任せる
    e.preventDefault();

    detailsRef.current?.removeAttribute("open");

    // リストを閉じるとレイアウトが縮むので、次のフレームで位置を取り直してスクロールする
    requestAnimationFrame(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      target.classList.remove("ex-hit");
      // 再付与でアニメーションを毎回やり直す
      void target.offsetWidth;
      target.classList.add("ex-hit");
      window.setTimeout(() => target.classList.remove("ex-hit"), 2200);
    });
  };

  return (
    <details ref={detailsRef} className="ex-worklist reveal">
      <summary className="ex-worklist-summary">
        <span className="ex-worklist-icon" aria-hidden="true">
          ☰
        </span>
        作品リスト（{works.length}）
        <span className="ex-worklist-arrow" aria-hidden="true">
          ▼
        </span>
      </summary>
      <ol className="ex-worklist-body">
        {works.map((w, i) => (
          <li key={w.id}>
            <a href={`#${w.id}`} className="ex-worklist-link" onClick={(e) => jump(e, w.id)}>
              <span className="ex-worklist-no" aria-hidden="true">
                {i + 1}
              </span>
              <span className="ex-worklist-title">{w.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
