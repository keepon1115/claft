import type { CSSProperties } from 'react';

export function VisitorQuestion({ name, question }: { name: string; question: string }) {
  return (
    <section className="py-6 px-4 reveal">
      <div className="craft-paper craft-tilt p-5" style={{ '--rot': '0.5deg' } as CSSProperties}>
        <p className="text-[var(--text-sm)] font-bold text-[var(--ink-600)] mb-2">{name}から、あなたへの質問</p>
        <p className="body-base text-[var(--ink-900)] m-0" style={{ whiteSpace: 'pre-line', lineHeight: 'var(--leading-loose)' }}>
          {question}
        </p>
      </div>
    </section>
  );
}
