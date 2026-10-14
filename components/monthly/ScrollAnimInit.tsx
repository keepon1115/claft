'use client';

import { useEffect } from 'react';

export default function ScrollAnimInit() {
  useEffect(() => {
    const els = document.querySelectorAll('.scroll-animate');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('animate-in'); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));

    // #アンカー付きURL：標準のジャンプは画像の読み込みで位置がずれる／効かないため、読み込み後に自前で合わせる
    const id = decodeURIComponent(window.location.hash.slice(1));
    const jump = () => {
      const target = id ? document.getElementById(id) : null;
      if (target) target.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
    };
    const timers: number[] = [];
    if (id) {
      jump();
      timers.push(window.setTimeout(jump, 400), window.setTimeout(jump, 1200));
      window.addEventListener('load', jump);
    }

    return () => {
      obs.disconnect();
      timers.forEach(clearTimeout);
      window.removeEventListener('load', jump);
    };
  }, []);

  return null;
}
