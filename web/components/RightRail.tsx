export function RightRail(){
  return (
    <aside className="hidden lg:flex sticky top-4 h-[calc(100dvh-32px)] items-start justify-center p-3 bg-white rounded-xl shadow-soft w-[360px]">
      <div className="flex w-full flex-col items-center gap-3">
        <a aria-label="Student Portal" href="https://claft-next.vercel.app" className="w-full h-14 rounded-full border grid place-items-center font-bold text-[color:var(--ink-800)] hover:shadow-soft">CLAFT Portal</a>
        <hr className="w-7 border-[rgba(0,0,0,.12)]" />
        <img alt="CLAFT" src="https://keepon1115.github.io/claft/assets/images/common/logo.png" className="w-full rounded-lg p-2 bg-white" />
      </div>
    </aside>
  );
}
