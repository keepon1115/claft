import Link from 'next/link';

export const metadata = { title: 'マイクラSDGsコース | CLAFT' };
export default function MinecraftPage(){
  return (
    <section className="py-10">
      <div className="container">
        <h1 className="text-2xl font-bold">マイクラSDGsコース</h1>

        <div className="mt-6 grid grid-cols-1 items-center gap-6 md:grid-cols-2">
          <div>
            <p className="font-bold text-[clamp(18px,1.8vw,22px)]">AI時代を生き抜く「未来を創る力」を育む。</p>
            <p className="text-[color:var(--ink-700)]">マイクラ×SDGs×プログラミングで、楽しみながら新たな価値を生み出そう！SDGsの目標を深く理解し、身近な問題として捉え、創造的な解決策を考え、実行する力を育む。</p>
          </div>
          <img className="h-auto w-full rounded-2xl border object-cover shadow-soft" src="https://keepon1115.github.io/claft/assets/minecraft/hero.jpeg" alt="制作やプログラミングの様子（ヒーロー）" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3">
          <div className="flex items-start gap-3 rounded-xl border bg-white p-3 shadow-soft">
            <div className="grid h-5 w-5 flex-none place-items-center rounded-full bg-[color:var(--ink-700)] text-white text-xs">A</div>
            <div><b>対象</b> 小学3年生～中学生(例外あり)</div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border bg-white p-3 shadow-soft">
            <div className="grid h-5 w-5 flex-none place-items-center rounded-full bg-[color:var(--ink-700)] text-white text-xs">B</div>
            <div><b>使用ツール</b> 教育版マインクラフト</div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border bg-white p-3 shadow-soft">
            <div className="grid h-5 w-5 flex-none place-items-center rounded-full bg-[color:var(--ink-700)] text-white text-xs">C</div>
            <div><b>形式</b> オンライン。SDGsテーマに沿ったワーク、エージェントプログラミングのワーク、マインクラフトでの制作。</div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border bg-white p-3 shadow-soft">
            <div className="grid h-5 w-5 flex-none place-items-center rounded-full bg-[color:var(--ink-700)] text-white text-xs">D</div>
            <div>
              <b>学習の流れ（1ヶ月サイクル）</b><br/>
              ★SDGsワーク：テーマ動画を見る⇒補助プリントを参考に自分の意見を提出する<br/>
              ★プログラミングワーク：テーマ動画を見る⇒補助プリントを参考にエージェントのプログラミングを提出する<br/>
              ★マイクラ制作：SDGsテーマの解決策をマインクラフトのワールドで建築して提出する<br/>
              ★1on1ミーティング：ワーク後に、月に一度オンライン面談で振り返りを行う
            </div>
          </div>
        </div>

        <section className="mt-10">
          <p className="font-bold">楽しい！やってみたい！が「未来を創る力」に変わる!?</p>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <article className="rounded-2xl border bg-white p-5 shadow-soft">
              <img className="mb-3 w-full rounded-xl border object-cover shadow-soft" src="https://keepon1115.github.io/claft/assets/minecraft/outcome_01.jpeg" alt="アイデアを形にする制作の様子" />
              <h3 className="text-lg font-bold">創造性が爆発！マインクラフトでアイデアをカタチに</h3>
              <ul className="mt-2 list-disc pl-5">
                <li>ひらめきを具現化：「こんなものがあったらいいな」というアイデアを、ブロック一つ一つ積み上げて形に。</li>
                <li>試行錯誤のプロセス：理想の形にするために、何度も試しては修正。粘り強く問題に取り組む力が養われます。</li>
              </ul>
            </article>

            <article className="rounded-2xl border bg-white p-5 shadow-soft">
              <img className="mb-3 w-full rounded-xl border object-cover shadow-soft" src="https://keepon1115.github.io/claft/assets/minecraft/outcome_02.jpeg" alt="SDGsの理解を深める学習の様子" />
              <h3 className="text-lg font-bold">世界の社会問題を"自分ごと"に。SDGsで考える力</h3>
              <ul className="mt-2 list-disc pl-5">
                <li>リアルな課題に触れる：貧困、飢餓、環境問題など、現実世界の複雑な課題を分かりやすくインプット。</li>
                <li>「私ならどうする？」：自分ならどう解決するかを深く考え、マインクラフトの世界で具体的に表現。</li>
              </ul>
            </article>

            <article className="rounded-2xl border bg-white p-5 shadow-soft">
              <img className="mb-3 w-full rounded-xl border object-cover shadow-soft" src="https://keepon1115.github.io/claft/assets/minecraft/outcome_03.jpeg" alt="プログラミングで自動化や発表を行う様子" />
              <h3 className="text-lg font-bold">「論理的思考力」と「発信力」を育むプログラミング学習</h3>
              <ul className="mt-2 list-disc pl-5">
                <li>ゲームで学ぶプログラミング：エージェントに命令を与え、自動で建物を建てたり、問題を解決する仕組みを作る。</li>
                <li>アイデアを「共有」する力：制作したワールドや解決策を動画にして発表。プレゼンテーション能力を養います。</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="mt-10" id="flow">
          <h2 className="text-xl font-bold">入会までの流れ</h2>
          <div className="mt-3 grid grid-cols-1 gap-4">
            <div className="rounded-2xl border bg-white p-5 shadow-soft"><span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand font-bold text-white">1</span><strong>相談</strong> お気軽にLINEでご連絡ください。</div>
            <div className="rounded-2xl border bg-white p-5 shadow-soft"><span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand font-bold text-white">2</span><strong>体験</strong> 1ヶ月無料体験。ZOOMで個別説明もいたします。</div>
            <div className="rounded-2xl border bg-white p-5 shadow-soft"><span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand font-bold text-white">3</span><strong>入会</strong> LINEから決済手続きなどご案内いたします。</div>
          </div>
        </section>

        <section className="mt-10" id="gallery">
          <h2 className="text-xl font-bold">作品ギャラリー</h2>
          <div className="mt-3 space-y-4">
            <div className="rounded-2xl border bg-white p-5 shadow-soft"><span>作品画像：/assets/minecraft/gallery_01.jpeg など（16:9）</span></div>
            <p className="text-sm text-[color:var(--ink-600)]">※ 3〜6枚想定。タイトル・1行説明・許諾状況を合わせてお送りください。</p>
          </div>
        </section>

        <section className="mt-10" id="price">
          <div className="rounded-2xl border bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold">料金</h2>
            <p><span className="mr-2 inline-block rounded-full bg-[#fff3c4] px-2 py-1 font-bold text-[#ad7a00]">初月無料</span> <strong>月額7,700円（税込）</strong></p>
            <p className="text-sm text-[color:var(--ink-600)]">教育版マインクラフトのライセンス料（5,500円/年）は別途発生します。</p>
            <p className="text-sm text-[color:var(--ink-600)]">※ 決済手続きはLINEからご案内いたします。</p>
          </div>
        </section>

        <section className="mt-10" id="works">
          <div className="grid grid-cols-1 gap-4">
            <article className="flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-soft">
              <div className="h-24 w-40 rounded-xl border" style={{background:'linear-gradient(135deg, rgba(52,198,190,.18), rgba(240,106,106,.16))'}} />
              <div>
                <h3 className="text-lg font-bold">Yononaka（対話型ワークショップ）</h3>
                <p className="text-[color:var(--ink-700)]">仲間との交流の場。身近なことをテーマに、正解がひとつでない問いに対して意見を共有する時間です。</p>
                <p><Link href="/yononaka">▶ Yononakaを詳しく見る</Link></p>
              </div>
            </article>
            <article className="flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-soft">
              <div className="h-24 w-40 rounded-xl border" style={{background:'linear-gradient(135deg, rgba(52,198,190,.18), rgba(240,106,106,.16))'}} />
              <div>
                <h3 className="text-lg font-bold">ミライクラフト（実践プログラム）</h3>
                <p className="text-[color:var(--ink-700)]">通常授業とは違う発表会やイベント、実際の課題解決ワークなどで仲間とともに試せる場もあります。</p>
                <p><Link href="/futurecraft">▶ ミライクラフトを詳しく見る</Link></p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
}
