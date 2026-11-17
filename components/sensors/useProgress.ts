'use client';

import { useCallback, useEffect, useState } from 'react';

// あそんだ きろく（クリア・ほし・ベストスコア）。この たんまつの localStorage だけに のこす。
const KEY = 'sensors-progress-v1';
const EVENT = 'sensors-progress';
type Progress = Record<string, number>;

function read(): Progress {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Progress;
  } catch {
    return {};
  }
}

// ほぞん できない たんまつ（プライベートモードなど）でも、ページを ひらいている あいだは おぼえておく
let memory: Progress | null = null;

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({});
  useEffect(() => {
    const sync = () => setProgress(memory ?? read());
    sync();
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  /** いままでより よい きろくの ときだけ のこす */
  const record = useCallback((id: string, value: number) => {
    const cur = memory ?? read();
    if ((cur[id] ?? -Infinity) >= value) return;
    memory = { ...cur, [id]: value };
    try {
      localStorage.setItem(KEY, JSON.stringify(memory));
    } catch {
      // ほぞん できなくても あそべる
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { progress, record };
}
