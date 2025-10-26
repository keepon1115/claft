import Link from 'next/link';

export const metadata = { title: 'クエストPBLコース | CLAFT' };
export default function CareerPage(){
  return (
    <section className="py-10">
      <div className="container">
        <h1 className="text-2xl font-bold">クエストPBLコース</h1>

        <div className="mt-6 grid grid-cols-1 items-center gap-6 md:grid-cols-2">
          <div>
            <p className="font-bold text-[clamp(18px,1.8vw,22px)]">キミの『好き』が未来を創る！</p>
            <p className="text-[color:var(--ink-700)]">好き・得意を自分の武器に変えるカリキュラム。正解がひとつでない問題に対して、"自分の意見を持ち、他者に共有する"ことを習慣化し、自分で自分のキャリアを"クラフト"していきます。</p>
          </div>
          <img className="h-auto w-full rounded-2xl border object-cover shadow-soft" src="https://keepon1115.github.io/claft/assets/career/hero.jpg" alt="キャリアコースの学びの様子（ヒーロー）" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3">
          <div className="flex items-start gap-3 rounded-xl border bg-white p-3 shadow-soft">
            <div className="grid h-5 w-5 flex-none place-items-center rounded-full bg-[color:var(--ink-700)] text-white text-xs">A</div>
            <div><b>対象</b> 中高生</div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border bg-white p-3 shadow-soft">
            <div className="grid h-5 w-5 flex-none place-items-center rounded-full bg-[color:var(--ink-700)] text-white text-xs">B</div>
            <div><b>形式</b> オンライン。自己理解×課題解決型学習（PBL）で、思考力・判断力・表現力を育みます。</div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border bg-white p-3 shadow-soft">
            <div className="grid h-5 w-5 flex-none place-items-center rounded-full bg-[color:var(--ink-700)] text-white text-xs">C</div>
            <div><b>頻度・時間</b> クエスト動画月9本更新、3～4ヶ月に1回の非認知能力計測＆面談。</div>
          </div>
        </div>

        <section className="mt-10">
          <p className="font-bold">"好き"や"気になる"から「人生をかけてやりたいこと」に出会う!?</p>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <article className="rounded-2xl border bg-white p-5 shadow-soft">
              <img className="mb-3 w-full rounded-xl border object-cover shadow-soft" src="https://keepon1115.github.io/claft/assets/career/outcome_01.jpg" alt="問いを深掘りし自己理解を深める様子" />
              <h3 className="text-lg font-bold">正解がひとつでないお題で、自己理解を深める！</h3>
              <ul className="mt-2 list-disc pl-5">
                <li>問いを深掘り：「なぜ好き？」「なぜ知りたい？」を丁寧に言葉に。興味・得意・価値観を手がかりに「本当にやりたいこと」「選びたい生き方」まで描きます。</li>
                <li>伝えて磨く：自分の意見を相手に届ける練習を重ね、就職・起業・進学の場で“自分をアピール”できる力を育てます。</li>
              </ul>
              <p className="mt-2 text-[color:var(--ink-600)]">( <Link href="/yononaka">▶Yononakaを詳しく見る</Link> )</p>
            </article>

            <article className="rounded-2xl border bg-white p-5 shadow-soft">
              <img className="mb-3 w-full rounded-xl border object-cover shadow-soft" src="https://keepon1115.github.io/claft/assets/career/outcome_02.jpg" alt="非認知能力を可視化・育成する学習の様子" />
              <h3 className="text-lg font-bold">数値では測れない非認知能力を育む！自己評価システム付き</h3>
              <ul className="mt-2 list-disc pl-5">
                <li>5つのチカラ（つなぐ・ひらく・えがく・なりきる・まきこむ）を意識しながら、</li>
                <li>自分で動画を選び、自分で自分を育てる学びを実践。</li>
                <li>「ふつう」を疑い、新しい発想を持ち、仲間と協力し、人を巻き込む──そんな未来を切り拓く力が育ちます。</li>
              </ul>
              <p className="mt-2 text-[color:var(--ink-600)]">( <a href="#jibuncraft">▶ジブンクラフトを詳しく見る</a> )</p>
            </article>

            <article className="rounded-2xl border bg-white p-5 shadow-soft">
              <img className="mb-3 w-full rounded-xl border object-cover shadow-soft" src="https://keepon1115.github.io/claft/assets/career/outcome_03.jpg" alt="発表会や協働の様子" />
              <h3 className="text-lg font-bold">身に付けた力を試し、仲間と協働！</h3>
              <ul className="mt-2 list-disc pl-5">
                <li>実践ステージ：「どんなイベントでワクワクを届ける？」「今の社会の課題は？」から“自分にできること”を考え、行動へ。経験を重ねて「自分だからできる」に出会います。</li>
                <li>キャリアインタビューや臨時講師など、社会の第一線で活躍する大人との交流も。タテでもヨコでもない「ナナメの関係」が築けます。</li>
              </ul>
              <p className="mt-2 text-[color:var(--ink-600)]">( <Link href="/futurecraft">▶ミライクラフトを詳しく見る</Link> )</p>
            </article>
          </div>
        </section>

        <section className="mt-10" id="overview">
          <h2 className="text-xl font-bold">コースの全体像</h2>
          <div className="mt-3 space-y-3">
            <p>クエスト：社会で大切だけれど学校ではあまり学べないテーマ（お金・デジタル技術・環境など）を動画で学習し、最後に出される「正解がひとつでない」問いに自分の意見を入力します。経営者・個人事業主の特別ワークもあります。</p>
            <p>課題解決型学習（PBL）：自分の「好き」や「気になる」から自分で課題を設定し、調べ、整理し、解決策をまとめて発表します。3～4ヶ月に1回の発表会で作品を発表し、フィードバックから次回の課題を設定していきます。</p>
            <p id="jibuncraft">ジブンクラフト：自己理解や目標設定のワークも行い、インプット＆アウトプットの繰り返しで、自己理解を深めていきます。非認知能力計測とキャリアコンサルタントによる面談で、自身のキャリアの目標設定もしていきます。</p>
            <div>
              <img className="w-full rounded-2xl border object-cover shadow-soft" src="https://keepon1115.github.io/claft/assets/career/diagram_overview.jpg" alt="学びの循環図（インプット→アウトプット→対話→振り返り）" />
            </div>
          </div>
        </section>

        <section className="mt-10" id="flow">
          <h2 className="text-xl font-bold">学びの流れ</h2>
          <div className="mt-3 grid grid-cols-1 gap-4">
            <div className="rounded-2xl border bg-white p-5 shadow-soft"><span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand font-bold text-white">1</span><strong>相談</strong> お気軽にLINEでご連絡ください。</div>
            <div className="rounded-2xl border bg-white p-5 shadow-soft"><span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand font-bold text-white">2</span><strong>体験</strong> 1ヶ月無料体験。ZOOMで個別説明もいたします。</div>
            <div className="rounded-2xl border bg-white p-5 shadow-soft"><span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand font-bold text-white">3</span><strong>入会</strong> LINEから決済手続きなどご案内いたします。</div>
            <div className="rounded-2xl border bg-white p-5 shadow-soft"><span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand font-bold text-white">4</span><strong>学び</strong> クエスト動画月9本更新。3～4ヶ月を目安に、自分の「好き」や「気になる」から自分で課題を設定し、解決策をまとめて発表します。</div>
            <div className="rounded-2xl border bg-white p-5 shadow-soft"><span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand font-bold text-white">5</span><strong>振り返り</strong> 3～4ヶ月に1回の発表会に参加。非認知能力計測＆面談で目標設定を行い、次回の学習準備をします。</div>
          </div>
        </section>

        <section className="mt-10" id="works">
          <h2 className="text-xl font-bold">作品ギャラリー</h2>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="flex flex-col overflow-hidden rounded-2xl border bg-white shadow-soft">
              <img className="w-full border-b object-cover" src="https://keepon1115.github.io/claft/assets/career/work_01.jpg" alt="作品例1のサムネイル" />
              <div className="p-4">
                <h3 className="text-lg font-bold">作品例①：ソニーの魅力とは？</h3>
                <p className="text-[color:var(--ink-700)]">ソニー製品の魅力を探り、情報を集めて動画で発信。</p>
                <a className="mt-2 inline-flex rounded-full border px-3 py-2 font-bold" href="https://youtu.be/zs1ZD0GZAm0" aria-label="作品例1を詳しく見る">詳しく見る</a>
              </div>
            </article>
            <article className="flex flex-col overflow-hidden rounded-2xl border bg-white shadow-soft">
              <img className="w-full border-b object-cover" src="https://keepon1115.github.io/claft/assets/career/work_02.jpg" alt="作品例2のサムネイル" />
              <div className="p-4">
                <h3 className="text-lg font-bold">作品例②：障害とはどのようなものか</h3>
                <p className="text-[color:var(--ink-700)]">吃音から障害について調べ、資料をまとめて発表。</p>
                <a className="mt-2 inline-flex rounded-full border px-3 py-2 font-bold" href="https://youtu.be/qoANUgtTAZo" aria-label="作品例2を詳しく見る">詳しく見る</a>
              </div>
            </article>
            <article className="flex flex-col overflow-hidden rounded-2xl border bg-white shadow-soft">
              <img className="w-full border-b object-cover" src="https://keepon1115.github.io/claft/assets/career/work_03.jpg" alt="作品例3のサムネイル" />
              <div className="p-4">
                <h3 className="text-lg font-bold">作品例③：振動発電をマイクラで表現してみた</h3>
                <p className="text-[color:var(--ink-700)]">マイクラで発電アイデアを再現。</p>
                <a className="mt-2 inline-flex rounded-full border px-3 py-2 font-bold" href="https://youtu.be/QKfGtt1QT1M" aria-label="作品例3を詳しく見る">詳しく見る</a>
              </div>
            </article>
          </div>
        </section>

        <section className="mt-10" id="price">
          <div className="rounded-2xl border bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold">料金</h2>
            <p><span className="mr-2 inline-block rounded-full bg-[rgba(52,198,190,.12)] px-2 py-1 font-bold text-[#0f766e]">初月無料</span> <strong>月額7,700円（税込）</strong></p>
            <p className="text-sm text-[color:var(--ink-600)]">※ 決済手続きはLINEからご案内いたします。</p>
          </div>
        </section>
      </div>
    </section>
  );
}
