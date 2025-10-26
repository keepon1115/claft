export function FAQ(){
  return (
    <section className="section py-6" id="faq">
      <div className="container">
        <h2 className="text-xl font-bold">よくある質問</h2>
        <details className="mt-2 rounded-2xl bg-white p-4 shadow-soft"><summary className="cursor-pointer font-bold">対象年齢は何歳からですか？</summary><p className="mt-2 text-[color:var(--ink-700)]">推奨は小学5年生からですが、興味や意欲があれば学年に関わらず参加できます。</p></details>
        <details className="mt-2 rounded-2xl bg-white p-4 shadow-soft"><summary className="cursor-pointer font-bold">体験に費用はかかりますか？</summary><p className="mt-2 text-[color:var(--ink-700)]">いいえ。1ヶ月間の無料体験が可能です。</p></details>
        <details className="mt-2 rounded-2xl bg-white p-4 shadow-soft"><summary className="cursor-pointer font-bold">体験後に入会を断っても大丈夫ですか？</summary><p className="mt-2 text-[color:var(--ink-700)]">もちろん大丈夫です。強引な勧誘は一切ありません。</p></details>
        <details className="mt-2 rounded-2xl bg-white p-4 shadow-soft"><summary className="cursor-pointer font-bold">カリキュラムの内容はどのようなものですか？</summary><p className="mt-2 text-[color:var(--ink-700)]">学校では学ぶ機会が少ない「お金」「IT」「発表」などを動画で学びます。ただ視聴するだけでなく「自分で意見を持ち、それを共有する」ことで、より自分事として学びを理解する形式です。詳しくはPDF資料をご覧ください。</p></details>
        <details className="mt-2 rounded-2xl bg-white p-4 shadow-soft"><summary className="cursor-pointer font-bold">オンラインと対面、どちらですか？</summary><p className="mt-2 text-[color:var(--ink-700)]">基本はオンラインで学びを進めていきますが、発表会やイベントは対面で行うこともあります。</p></details>
        <details className="mt-2 rounded-2xl bg-white p-4 shadow-soft"><summary className="cursor-pointer font-bold">入会後にやめたいときはどうなりますか？</summary><p className="mt-2 text-[color:var(--ink-700)]">月単位での解約が可能です。</p></details>
      </div>
    </section>
  );
}
