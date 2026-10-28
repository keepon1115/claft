import { formatYearMonth, type LikesSnapshot } from '@/lib/studentData';

type Props = { history: LikesSnapshot[]; likes: string[]; updatedAt?: string };

export function LikesHistory({ history, likes, updatedAt }: Props) {
  if (history.length < 2) return null;
  const steps = [...history];
  if (updatedAt && likes.length) steps.push({ date: updatedAt, likes: likes.join('、') });

  return (
    <section className="py-8 px-4 reveal">
      <h2 className="heading-sm mb-1">『好き』の移り変わり</h2>
      <p className="body-sm text-[var(--ink-500)] mb-5">好きは、変わっていい。</p>
      <div className="flex flex-col gap-2">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="ss-item flex-1">
              <span className="text-[var(--text-xs)] font-bold text-[var(--ink-500)]">{formatYearMonth(s.date)}</span>
              <p className="body-sm text-[var(--ink-800)] mt-1 mb-0">{s.likes}</p>
            </div>
            {i < steps.length - 1 && (
              <span className="text-center text-[var(--ink-500)] rotate-90" aria-hidden="true">
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
