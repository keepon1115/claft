import Link from 'next/link';

export function Hero(){
  return (
    <section className="py-10">
      <div className="container">
        <p className="inline-block rounded-full bg-[rgba(52,198,190,.14)] px-3 py-2 font-bold text-[color:var(--ink-800)]">CLAFT 公式サイト</p>
        <h1 className="mt-2 text-3xl font-bold text-[color:var(--ink-900)]">自分の手で創るキャリア</h1>
        <p className="mt-2 text-[color:var(--ink-700)]">相談 → 体験 → 入会のシンプルな導線と、学びの全体像を提供します。</p>
        <div className="mt-6 aspect-[16/9] overflow-hidden rounded-2xl shadow-soft bg-[radial-gradient(1200px_420px_at_20%_10%,rgba(52,198,190,.25),transparent_60%),linear-gradient(135deg,rgba(255,214,107,.35),rgba(240,106,106,.22))]">
          <img src="https://keepon1115.github.io/claft/assets/index/top_hero.png" alt="CLAFT" className="h-full w-full object-cover" />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <a className="rounded-full bg-brand px-4 py-3 font-bold text-white" href="https://lin.ee/wcsFK9A">相談する</a>
          <Link className="rounded-full border px-4 py-3 font-bold" href="/contact">問い合わせ</Link>
        </div>
      </div>
    </section>
  );
}
