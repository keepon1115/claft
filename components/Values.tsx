export function Values(){
  return (
    <section className="values container py-6">
      <div className="card-grid grid grid-cols-1 gap-4">
        <article className="card reveal">
          <div className="chip bg-[rgba(240,106,106,.14)] text-[color:var(--ink-800)] px-3 py-1.5 rounded-full inline-block font-bold text-sm mb-2">探究</div>
          <h3 className="text-lg font-bold mb-2">"自分の興味や疑問"から学びをスタート</h3>
          <p>いつの間にか没頭し、アイデアを形にするために試行錯誤する。<br className="hidden md:block"/>その経験が「自ら学ぶ力」の土台になる。</p>
          <p className="text-right mt-4">
            <a href="/pbl" className="font-bold text-[#f06a6a]">PBL→</a>
          </p>
        </article>
        <article className="card reveal">
          <div className="chip bg-[rgba(52,198,190,.14)] text-[color:var(--ink-800)] px-3 py-1.5 rounded-full inline-block font-bold text-sm mb-2">対話</div>
          <h3 className="text-lg font-bold mb-2">"自分の興味や疑問"を話してみる</h3>
          <p>他者の反応から、いろんな見方･考え方に気づき、世の中を知る。<br className="hidden md:block"/>その経験が「社会を読み解く力」の土台になる。</p>
          <p className="text-right mt-4">
            <a href="/yononaka" className="font-bold text-[#34c6be]">Yononaka→</a>
          </p>
        </article>
        <article className="card reveal">
          <div className="chip bg-[rgba(255,214,107,.22)] text-[color:var(--ink-800)] px-3 py-1.5 rounded-full inline-block font-bold text-sm mb-2">実践</div>
          <h3 className="text-lg font-bold mb-2">"発表・企画・チーム活動"に挑戦する</h3>
          <p>仲間とつながり、失敗してもそこから学び、また挑戦する。<br className="hidden md:block"/>その経験が「粘り強くやり切る力」の土台になる。</p>
          <p className="text-right mt-4">
            <a href="/futurecraft" className="font-bold text-[#f0a629]">ミライクラフト→</a>
          </p>
        </article>
      </div>
    </section>
  );
}
