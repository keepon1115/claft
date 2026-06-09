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
    return () => obs.disconnect();
  }, []);

  return null;
}
