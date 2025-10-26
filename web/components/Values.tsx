export function Values(){
  return (
    <section className="py-6">
      <div className="container">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded-2xl bg-white p-4 shadow-soft">
            <div className="inline-block rounded-full px-3 py-1 font-bold" style={{background:'rgba(240,106,106,.14)'}}>探究</div>
            <h3 className="mt-1 text-lg font-bold">"自分の興味や疑問"から学びをスタート</h3>
            <p className="text-[color:var(--ink-700)]">いつの間にか没頭し、アイデアを形にするために試行錯誤する。その経験が「自ら学ぶ力」の土台になる。</p>
          </article>
          <article className="rounded-2xl bg-white p-4 shadow-soft">
            <div className="inline-block rounded-full px-3 py-1 font-bold" style={{background:'rgba(52,198,190,.14)'}}>対話</div>
            <h3 className="mt-1 text-lg font-bold">"自分の興味や疑問"を話してみる</h3>
            <p className="text-[color:var(--ink-700)]">他者の反応から、いろんな見方･考え方に気づき、世の中を知る。その経験が「社会を読み解く力」の土台になる。</p>
          </article>
          <article className="rounded-2xl bg-white p-4 shadow-soft">
            <div className="inline-block rounded-full px-3 py-1 font-bold" style={{background:'rgba(255,214,107,.22)'}}>実践</div>
            <h3 className="mt-1 text-lg font-bold">"発表・企画・チーム活動"に挑戦する</h3>
            <p className="text-[color:var(--ink-700)]">仲間とつながり、失敗してもそこから学び、また挑戦する。その経験が「粘り強くやり切る力」の土台になる。</p>
          </article>
        </div>
      </div>
    </section>
  );
}
