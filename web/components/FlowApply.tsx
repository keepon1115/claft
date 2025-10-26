export function FlowApply(){
  return (
    <section className="section py-6" id="apply">
      <div className="container">
        <h2 className="text-xl font-bold">入会までの流れ</h2>
        <div className="mt-3 grid grid-cols-1 gap-4">
          <div className="rounded-2xl bg-white p-4 shadow-soft">
            <strong>STEP 1. お気軽にご相談ください！</strong>
            <p>PDF資料でカリキュラムの詳細・料金をご確認ください。ご不明な点やご質問はLINEからお問合せくださいませ。30分程度の個別面談も可能です。</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <a className="rounded-full border px-4 py-2 font-bold" href="https://keepon1115.github.io/claft/assets/siryo.pdf" target="_blank" rel="noopener">PDFダウンロード</a>
              <a className="rounded-full bg-brand px-4 py-2 font-bold text-white" href="https://lin.ee/wcsFK9A" target="_blank" rel="noopener">LINEで相談</a>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-soft">
            <strong>STEP 2. まずは1ヶ月無料体験</strong>
            <p>学習アプリを使いながら、1ヶ月間無料で体験できます。ご希望の方は、以下のボタンからお申込みくださいませ。</p>
            <div className="mt-2"><a className="rounded-full bg-brand px-4 py-2 font-bold text-white" href="https://forms.gle/6emMHEXZXR7F3Ti88" target="_blank" rel="noopener">体験を申し込む</a></div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-soft">
            <strong>STEP 3. 入会のお申し込み</strong>
            <p>体験終了後に入会するかどうかのご連絡をいたします。入会後は、翌月から費用が発生いたします。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
