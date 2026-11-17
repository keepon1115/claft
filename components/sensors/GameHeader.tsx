import Link from 'next/link';

export function GameHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <header className="sz-gamehead">
      <Link href="/sensors" className="sz-back" aria-label="ゲームランドに もどる">
        ← もどる
      </Link>
      <div>
        <h1 className="sz-gametitle">{title}</h1>
        {sub && <p className="sz-gamesub">{sub}</p>}
      </div>
    </header>
  );
}

export function Stars({ n, max = 3 }: { n: number; max?: number }) {
  return (
    <span className="sz-stars" aria-label={`ほし ${n}こ`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < n ? 'on' : ''}>
          ★
        </span>
      ))}
    </span>
  );
}
