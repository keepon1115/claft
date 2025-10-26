export function Download(){
  return (
    <section className="section py-6" id="download">
      <div className="container">
        <h2 className="text-xl font-bold">資料ダウンロード</h2>
        <p className="text-[color:var(--ink-700)]">PDF資料でカリキュラムの詳細・料金をご確認ください。ご不明な点やご質問はLINEからお問合せくださいませ。30分程度の個別面談も可能です。</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <a className="rounded-full border px-4 py-3 font-bold" href="https://keepon1115.github.io/claft/assets/siryo.pdf" target="_blank" rel="noopener">PDFダウンロード</a>
          <a className="rounded-full bg-brand px-4 py-3 font-bold text-white" href="https://lin.ee/wcsFK9A" target="_blank" rel="noopener">LINEで相談</a>
        </div>
      </div>
    </section>
  );
}
