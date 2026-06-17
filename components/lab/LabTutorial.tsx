'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// 初回訪問チュートリアル（スポットライト型コーチマーク）。
// 実ボタンの data-tour を実測して光らせ、近くに吹き出しで説明する。
// localStorage の lab_tutorial_done で「初回のみ」自動表示。
// 恒久的な参照はヘッダーの「?」（/lab/guide）が担う。

const DONE_KEY = 'lab_tutorial_done';
const PAD = 8; // ハイライトの余白(px)

type Step = {
  /** ハイライトする実ボタンの data-tour 値。null は中央の導入。 */
  target: string | null;
  title: string;
  body: string;
};

// 文言・順番はオーナー確認済み（受講予約→面談→アイデア箱→ストーリー→お知らせ→?→歩き方）。
const STEPS: Step[] = [
  { target: null, title: 'ようこそ！', body: 'はじめまして。このアプリのよく使うボタンを、30秒でご案内します。' },
  { target: 'reserve', title: '受講予約', body: 'いちばんよく使うボタン。ふだんの授業や、発表会などのイベント予約はここから。' },
  { target: 'meeting', title: '面談申込', body: 'お子さまの様子や進路の相談を、個別面談で。希望日を送ると、ラボから折り返します。' },
  { target: 'idea', title: 'アイデア箱', body: '「こんなのあったらいいな」をラボに届ける場所。受け取るだけじゃなく、つくる側にまわれます。' },
  { target: 'stories', title: 'ストーリー', body: '上の丸いボタン。イベントやラボの“いま”を、タップ→スワイプでさくっとのぞけます。' },
  { target: 'feed', title: 'お知らせ', body: 'まんなかは、お知らせと活動報告。新しい順にならびます。' },
  { target: 'guide', title: '迷ったらここ', body: 'いま説明したことは、この「?」ボタンにいつでもまとめてあります。' },
  { target: 'roadmap', title: '準備OK！', body: 'まずは「ラボの歩き方」からのぞいてみてください。ここから自由にどうぞ。' },
];

type Box = { top: number; left: number; width: number; height: number };

export function LabTutorial() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [box, setBox] = useState<Box | null>(null);

  // 初回のみ自動表示（SSRハイドレーション後に判定）。
  useEffect(() => {
    try {
      if (!localStorage.getItem(DONE_KEY)) setOpen(true);
    } catch {
      /* localStorage 不可の環境では出さない */
    }
  }, []);

  const step = STEPS[index];

  const measure = useCallback(() => {
    if (!step.target) {
      setBox(null);
      return;
    }
    const el = document.querySelector<HTMLElement>(`[data-tour="${step.target}"]`);
    if (!el) {
      setBox(null);
      return;
    }
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const left = Math.max(r.left - PAD, 6);
    setBox({
      top: Math.max(r.top - PAD, 6),
      left,
      width: Math.min(r.width + PAD * 2, vw - left - 6),
      height: r.height + PAD * 2,
    });
  }, [step.target]);

  useEffect(() => {
    if (!open) return;
    measure();
  }, [open, index, measure]);

  useEffect(() => {
    if (!open) return;
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize, true);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize, true);
    };
  }, [open, measure]);

  const finish = useCallback(
    (navigate: boolean) => {
      try {
        localStorage.setItem(DONE_KEY, '1');
      } catch {
        /* noop */
      }
      setOpen(false);
      if (navigate) router.push('/lab/roadmap');
    },
    [router],
  );

  if (!open) return null;

  const isLast = index === STEPS.length - 1;
  // 吹き出しは対象が上半分なら下に、下半分なら上に出す。
  const vh = typeof window !== 'undefined' ? window.innerHeight : 0;
  const placeBelow = box ? box.top + box.height / 2 < vh / 2 : false;
  const bubbleStyle: React.CSSProperties = !box
    ? { top: '50%', transform: 'translateY(-50%)' }
    : placeBelow
      ? { top: box.top + box.height + 12 }
      : { bottom: vh - box.top + 12 };

  return (
    <div className={`lab-tour${box ? '' : ' is-plain'}`} role="dialog" aria-modal="true" aria-label="アプリの使い方ツアー">
      {box && (
        <div
          className="lab-tour-hole"
          style={{ top: box.top, left: box.left, width: box.width, height: box.height }}
        />
      )}
      <div className="lab-tour-bubble" style={bubbleStyle}>
        {index > 0 && <span className="lab-tour-step">{index} / {STEPS.length - 1}</span>}
        <h3>{step.title}</h3>
        <p>{step.body}</p>
        <div className="lab-tour-actions">
          {!isLast && (
            <button type="button" className="lab-tour-skip" onClick={() => finish(false)}>
              スキップ
            </button>
          )}
          <span className="lab-tour-spacer" />
          {index > 0 && (
            <button type="button" className="lab-tour-back" onClick={() => setIndex((i) => i - 1)}>
              戻る
            </button>
          )}
          {isLast ? (
            <button type="button" className="lab-tour-next" onClick={() => finish(true)}>
              ラボの歩き方を見る →
            </button>
          ) : (
            <button type="button" className="lab-tour-next" onClick={() => setIndex((i) => i + 1)}>
              次へ →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
