export const metadata = { title: 'ワークショップ | CLAFT' };
export default function WorkshopPage(){
  return (
    <section className="py-10">
      <div className="container">
        <h1 className="mb-1 text-2xl font-bold">体験ワークショップ</h1>
        <p className="text-[color:var(--ink-500)]">CLAFTでは、オンラインだけでなく対面でのワークショップも行っています。全国の子どもたちに「教科書や教室の中だけでは得られない自由な学び」を届け、体験を通じて好奇心をくすぐることを目的としています。</p>

        <div className="my-6 overflow-hidden rounded-2xl shadow-soft">
          <img src="https://keepon1115.github.io/claft/assets/workshop/kv.jpg" alt="体験ワークショップの様子" className="h-auto w-full object-cover" />
        </div>

        <p>子どもゆめ基金をご存知でしょうか？「子どもゆめ基金」は、国と民間が協力して、未来を担う子どもたちの健全な育成を支援するために設けられた基金です。民間団体が実施する自然体験・科学実験・読書活動など、さまざまな取り組みを応援し、子どもたちの夢や社会性を育むことを目的としています。</p>
        <div className="my-5 text-center">
          <a className="inline-flex rounded-full border px-4 py-2 font-bold" href="https://yumekikin.niye.go.jp/" target="_blank" rel="noopener">子どもゆめ基金についてはこちら</a>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <article className="rounded-2xl border bg-white p-4 shadow-soft">
            <h3 className="text-lg font-bold">こども舞台工房（演劇体験）</h3>
            <div className="my-3 overflow-hidden rounded-2xl shadow-soft"><img src="https://keepon1115.github.io/claft/assets/workshop/stage.jpg" alt="こども舞台工房のイメージ" className="h-auto w-full object-cover" /></div>
            <p className="text-[color:var(--ink-700)]"><strong>キャッチコピー:</strong> 自分を表現するチカラをみがく演劇体験</p>
            <ul className="list-disc pl-6">
              <li>対象：小学4年生〜高校3年生</li>
              <li>定員：10名（申込先着順）</li>
              <li>参加費：無料（令和7年度 子どもゆめ基金 助成事業）</li>
              <li>日程：2025年11月〜2026年3月（全6回）</li>
              <li>場所：株式会社アーテック（八尾市北亀井町3-2-21）</li>
            </ul>
            <div className="mt-2 flex flex-wrap gap-2">
              <a className="rounded-full bg-brand px-4 py-2 font-bold text-white" href="https://forms.gle/3nA5yWDz8LgSZY4L7" target="_blank" rel="noopener">申込詳細はこちら</a>
            </div>
          </article>

          <article className="rounded-2xl border bg-white p-4 shadow-soft">
            <h3 className="text-lg font-bold">未来を動かす！ロボットづくり（ロボプロ体験）</h3>
            <div className="my-3 overflow-hidden rounded-2xl shadow-soft"><img src="https://keepon1115.github.io/claft/assets/workshop/robo.jpg" alt="ロボプロ体験のイメージ" className="h-auto w-full object-cover" /></div>
            <p className="text-[color:var(--ink-700)]"><strong>キャッチコピー:</strong> ロボットをつくって、動かす楽しさを体験</p>
            <ul className="list-disc pl-6">
              <li>対象：小学4年生〜中学3年生</li>
              <li>定員：10名（申込先着順）</li>
              <li>参加費：無料（令和7年度 子どもゆめ基金 助成事業）</li>
              <li>日程：2025年10月〜2026年3月（全6回）</li>
              <li>場所：キープオンラボ（アリオ近く）</li>
            </ul>
            <div className="mt-2 flex flex-wrap gap-2">
              <a className="rounded-full bg-brand px-4 py-2 font-bold text-white" href="https://forms.gle/r2uNYt8E5Yrs5v3KA" target="_blank" rel="noopener">申込詳細はこちら</a>
            </div>
          </article>
        </div>

        <h1 className="mt-10 text-2xl font-bold">出前授業</h1>
        <p className="text-[color:var(--ink-500)]">ロボットプログラミング教室を10年間運営し、200名以上の受講生が学んできた「キープオン」が主催します。</p>
        <div className="my-4"><a className="rounded-full bg-brand px-4 py-2 font-bold text-white" href="https://www.keeponlearning.fun/company-group" target="_blank" rel="noopener">キープオンのページを見る</a></div>
        <ul className="list-disc pl-6">
          <li>ロボットを動かしながら学ぶ「ロボットプログラミング」</li>
          <li>正解がひとつでない問いに取り組むアクティブラーニング「Yononaka」</li>
          <li>ほか、工作・AI・ゲームプログラミングなど、子どもの好奇心をくすぐるプログラムを提供します。</li>
        </ul>
        <p className="emphasis-note mt-2 rounded-xl bg-[rgba(52,198,190,.12)] px-4 py-3 font-bold">ワーク内容は依頼者に合わせてカスタマイズ可能です！</p>

        <h3 className="mt-4 text-lg font-bold">実績（例示）</h3>
        <div className="my-4">
          <div className="rounded-xl bg-[#3b82f6] px-4 py-3 text-center font-extrabold text-white shadow-[0_10px_24px_rgba(31,41,55,.10)]">多くの企業さんから実績をいただいております</div>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div className="rounded-2xl border bg-[#f6f7fb] p-5 shadow-[0_12px_30px_rgba(31,41,55,.08)]">
              <h4 className="text-lg font-bold">— 単発・ワークショップとして —</h4>
              <ul className="list-disc pl-6">
                <li>地域コミュニティ（曙川）</li>
                <li>スクール（わんだーらぼさん）</li>
                <li>本屋（TSUTAYA リノアス八尾さん）</li>
              </ul>
            </div>
            <div className="rounded-2xl border bg-[#f6f7fb] p-5 shadow-[0_12px_30px_rgba(31,41,55,.08)]">
              <h4 className="text-lg font-bold">— 短期講座として・授業として（1〜3年）—</h4>
              <ul className="list-disc pl-6">
                <li>学童（明光キッズさん）</li>
                <li>ショップ（ABCクラフトさん）</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 text-center"><a className="inline-flex rounded-full border px-4 py-2 font-bold" href="https://www.keeponlearning.fun/company-group" target="_blank" rel="noopener">詳細はこちら</a></div>
        </div>
      </div>
    </section>
  );
}
