import type { CSSProperties } from 'react';

export function LaterConnection({ text }: { text: string }) {
  return (
    <section className="py-8 px-4 reveal">
      <div className="craft-paper craft-paper--warm craft-tilt p-7" style={{ '--rot': '-0.6deg' } as CSSProperties}>
        <span className="craft-tape" aria-hidden="true" />
        <span className="craft-tape craft-tape--pink" aria-hidden="true" style={{ left: 'auto', right: '12%' }} />
        <h2 className="heading-md text-[var(--ink-900)] mb-1">後からつながったこと</h2>
        <p className="body-sm text-[var(--ink-500)] mb-5">意味は、やり続けた後からついてくる</p>
        <p
          className="text-[var(--text-lg)] text-[var(--ink-900)] m-0"
          style={{ whiteSpace: 'pre-line', lineHeight: 'var(--leading-loose)' }}
        >
          {text}
        </p>
      </div>
    </section>
  );
}
