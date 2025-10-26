export const metadata = { title: '学校と社会をつなぐ | CLAFT' };
export default function SchoolSocietyPage(){
  return (
    <section className="py-0">
      <div className="bg-[#121a2a] text-white">
        <section className="container py-14">
          <h1 className="text-3xl font-extrabold">学校と社会をつなぐ</h1>

          <div className="mt-4">
            <div className="relative grid grid-cols-1 gap-4">
              <div className="absolute -left-1 -top-1 select-none text-[100px] opacity-10">“</div>
              <div className="absolute -right-1 -bottom-3 select-none text-[100px] opacity-10">”</div>
              <blockquote className="rounded-xl border border-[rgba(52,198,190,.35)] bg-white p-5 text-[color:#111] shadow-[0_8px_24px_rgba(0,0,0,.18)]">
                <p className="m-0 text-[clamp(16px,1.6vw,19px)] leading-7 text-[#ef4444]">「一生懸命勉強したのに、社会に出たら全然違ってた」</p>
              </blockquote>
              <blockquote className="rounded-xl border border-[rgba(52,198,190,.35)] bg-white p-5 text-[color:#111] shadow-[0_8px_24px_rgba(0,0,0,.18)]">
                <p className="m-0 text-[clamp(16px,1.6vw,19px)] leading-7 text-[#ef4444]">「自分が本当にやりたいことって、なんだろう…？」</p>
              </blockquote>
            </div>
          </div>

          <p className="mt-3 font-bold">そんな声が、今の日本社会にはあふれています。</p>

          <div className="mt-4 grid grid-cols-1 gap-4">
            <article className="rounded-2xl border bg-[#f7f8fb] p-5 text-[#111] shadow-[0_10px_30px_rgba(0,0,0,.12)]">
              <div className="flex items-end justify-center gap-2"><span className="text-[clamp(40px,6vw,64px)] font-black leading-none text-[#ef4444]">67.3</span><span className="font-black text-[#ef4444]">%</span></div>
              <div className="mt-2 text-center font-bold">新入社員が感じる「スキル不足」</div>
              <p className="m-0 mt-1 text-center text-[#6b7280]">自分の能力不足がストレス源。社会の厳しさを痛感する若者は6割越え。</p>
              <p className="m-0 mt-1 text-center text-[#94a3b8] text-xs">出典：産業能率大「2024年度 新入社員会社生活調査」</p>
            </article>
            <article className="rounded-2xl border bg-[#f7f8fb] p-5 text-[#111] shadow-[0_10px_30px_rgba(0,0,0,.12)]">
              <div className="flex items-end justify-center gap-2"><span className="text-[clamp(40px,6vw,64px)] font-black leading-none text-[#ef4444]">34.9</span><span className="font-black text-[#ef4444]">%</span></div>
              <div className="mt-2 text-center font-bold">3年以内の離職率</div>
              <p className="m-0 mt-1 text-center text-[#6b7280]">大卒の約5人に1人が早期離職、高卒ではさらに深刻。</p>
              <p className="m-0 mt-1 text-center text-[#94a3b8] text-xs">出典：産業能率大「2024年度 新入社員会社生活調査」</p>
            </article>
            <article className="rounded-2xl border bg-[#f7f8fb] p-5 text-[#111] shadow-[0_10px_30px_rgba(0,0,0,.12)]">
              <div className="flex items-end justify-center gap-2"><span className="text-[clamp(40px,6vw,64px)] font-black leading-none text-[#ef4444]">19.0</span><span className="font-black text-[#ef4444]">%</span></div>
              <div className="mt-2 text-center font-bold">日本の教育を「良い」と評価</div>
              <p className="m-0 mt-1 text-center text-[#6b7280]">国際比較で低位。生徒も先生も保護者も「何か違う」と感じている。</p>
              <p className="m-0 mt-1 text-center text-[#94a3b8] text-xs">出典：イプソス「教育モニター2024」調査レポート</p>
            </article>
          </div>

          <p className="mt-4 text-[#a8b3c7]"><strong>原因は、決して本人の努力不足ではありません。</strong></p>
          <p className="text-[#a8b3c7]">むしろ、まじめに勉強してきた人ほど戸惑ってしまうのです。<br/>その理由は、とてもシンプル。</p>

          <h2 className="mt-3 inline-block rounded-xl border border-[rgba(255,255,255,.14)] bg-[rgba(255,255,255,.06)] px-4 py-2 text-2xl font-extrabold shadow-[0_10px_30px_rgba(0,0,0,.25)]">「社会の変化に、学びが追いついていない」<span className="ml-2 inline-block h-1 w-24 rounded bg-gradient-to-r from-[#ef4444] via-[#ffd66b] to-[#34c6be]"></span></h2>
          <p>技術の進歩、価値観の多様化に伴い社会課題が顕在化している時代。<br/>「正解を早く答える」勉強だけでは、生き抜く力にはなりません。</p>

          <img src="https://keepon1115.github.io/claft/assets/school_society/learn.jpg" alt="学びのイメージ" className="my-4 aspect-[16/9] w-full rounded-2xl shadow-soft" />
          <p>特にAIの進化は著しく、記憶や計算といった認知能力はすでにコンピュータの方が得意な領域になっています。</p>

          <img src="https://keepon1115.github.io/claft/assets/school_society/learn_forecast.jpg" alt="社会を知り未来を予測する学びのイメージ" className="my-4 aspect-[16/9] w-full rounded-2xl shadow-soft" />
          <p>それにもかかわらず、日本の教育は依然として「教科書に書かれた知識を覚え、テストで正しく答える力」を重視しています。</p>
          <p>先生が知識を教え、生徒がそれを記憶し、偏差値で進路が決まる──</p>
          <p>この構造のままでは、教育と社会との間に大きなギャップが生じ、多くの若者がつまずいてしまいます。</p>

          <div className="mt-4 grid grid-cols-1 gap-4">
            <article className="rounded-2xl border bg-[#f7f8fb] p-5 text-[#111] shadow-[0_10px_30px_rgba(0,0,0,.12)]">
              <div className="flex items-end justify-center gap-2"><span className="text-[clamp(40px,6vw,64px)] font-black leading-none text-[#ef4444]">45.8</span><span className="font-black text-[#ef4444]">%</span></div>
              <div className="mt-2 text-center font-bold">自分の行動で、社会を変えられる</div>
              <p className="m-0 mt-1 text-center text-[#6b7280]">6か国調査で最下位。日本の若者は無力感を抱いている</p>
              <p className="m-0 mt-1 text-center text-[#94a3b8] text-xs">出典：日本財団「18歳意識調査 第62回（6カ国調査）」</p>
            </article>
            <article className="rounded-2xl border bg-[#f7f8fb] p-5 text-[#111] shadow-[0_10px_30px_rgba(0,0,0,.12)]">
              <div className="flex items-end justify-center gap-2"><span className="text-[clamp(40px,6vw,64px)] font-black leading-none text-[#ef4444]">53.0</span><span className="font-black text-[#ef4444]">%</span></div>
              <div className="mt-2 text-center font-bold">「自分が好きだ」と答えた日本の若者</div>
              <p className="m-0 mt-1 text-center text-[#6b7280]">比較対象国中で最下位。自己肯定感の低さは自殺率にもつながっている</p>
              <p className="m-0 mt-1 text-center text-[#94a3b8] text-xs">出典：こども家庭庁「諸外国との比較調査」</p>
            </article>
            <article className="rounded-2xl border bg-[#f7f8fb] p-5 text-[#111] shadow-[0_10px_30px_rgba(0,0,0,.12)]">
              <div className="flex items-end justify-center gap-2"><span className="text-[clamp(40px,6vw,64px)] font-black leading-none text-[#ef4444]">34.6</span><span className="font-black text-[#ef4444]">万人</span></div>
              <div className="mt-2 text-center font-bold">2023年度 小・中学校の不登校児童生徒</div>
              <p className="m-0 mt-1 text-center text-[#6b7280]">10年前から、小学生で約5.4倍 中学生で約2.3倍。少子化でも増加。</p>
              <p className="m-0 mt-1 text-center text-[#94a3b8] text-xs">出典：文部科学省 令和5年度調査</p>
            </article>
          </div>

          <p className="mt-4">CLAFTでは、この状況を変えるために、</p>
          <p>入試のための勉強から</p>
          <h2 className="mt-3 inline-block rounded-xl border border-[rgba(255,255,255,.14)] bg-[rgba(255,255,255,.06)] px-4 py-2 text-2xl font-extrabold shadow-[0_10px_30px_rgba(0,0,0,.25)]">「社会を知り未来を予測するための学び」へと<span className="ml-2 inline-block h-1 w-24 rounded bg-gradient-to-r from-[#ef4444] via-[#ffd66b] to-[#34c6be]"></span></h2>
          <p>変えていく必要があると考えています。</p>
        </section>
      </div>

      <section className="bg-white py-12 text-[color:var(--ink-900)]">
        <div className="container">
          <h2 className="text-xl font-bold">人生100年時代、自分を語れる人へ</h2>
          <p>社会が大きく変化するなかで、大学入試の形式にも変化が現れています。<br/>一般選抜、いわゆるテスト入試は50%を下回り、総合型選抜（志望理由書・小論文・面接）による選抜の比率が増えています。<br/>これからは、さらに多様な選抜方法が広がっていくでしょう。</p>

          <img src="https://keepon1115.github.io/claft/assets/school_society/practice_dialogue.jpg" alt="実践と対話のイメージ" className="my-4 aspect-[16/9] w-full rounded-2xl shadow-soft" />

          <p>また、テクノロジーの進化と長寿化により、私たちは「人生100年時代」を迎えています。<br/>従来の「学ぶ→働く→引退する」という一方通行の人生モデルは崩れ、「学び→仕事」を何度も繰り返しながらキャリアを築いていく時代へと移り変わっています。</p>

          <img src="https://keepon1115.github.io/claft/assets/school_society/life100_cycle.jpg" alt="人生100年時代における学習と仕事の循環" className="my-4 aspect-[16/9] w-full rounded-2xl shadow-soft" />

          <p>単に引退や生活のために学び続けるだけでは、心身のバランスを保つことは難しくなります。<br/>これからは、持続可能な「働き方」と「学び方」を見つけることが重要です。</p>
          <p>さらに、仕事のあり方そのものも変わりつつあります。<br/>既存の職業をそのままなぞるのではなく、複数の仕事やスキルを組み合わせ、新しい価値を生み出す力が求められています。</p>
          <p>だからこそ、必要なのは<br/>「知識を得る人」から「知識を社会で活かす学習者」へと変わること。<br/>知識を「使う」ことで、人とつながり、課題を解決し、未来を共に創る、<br/>その姿勢こそが、これからの時代を生き抜く力になるのです。</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="relative isolate rounded-2xl border bg-white p-6 shadow-soft">
            <h2 className="text-xl font-bold">「使える学び」で武器に変える</h2>
            <div className="mt-2 flex flex-wrap gap-2" aria-hidden="true">
              <span className="rounded-full border px-3 py-1 font-bold"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#34c6be]" />学習力</span>
              <span className="rounded-full border px-3 py-1 font-bold"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#58c3a2]" />横断的な学び</span>
              <span className="rounded-full border px-3 py-1 font-bold"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#ef4444]" />実践</span>
            </div>
            <ul className="mt-3 list-disc pl-6">
              <li>学力より<strong>学習力</strong>を。</li>
              <li>専門だけでなく、<strong>好奇心から広がる横断的な学び</strong>を。</li>
              <li>知識の獲得を目指す生徒から、<strong>知識を実社会で活用できる「学習者」</strong>へ。</li>
            </ul>
            <p className="mt-4 border-l-4 border-brand pl-4">正解が一つではない今の社会で、<br/>自分を知り、社会を知り、異年齢の仲間と協働し、<strong>社会に出る前に実践できる場</strong>。<br/>——そんな実践力を磨くスクールです！</p>
          </div>
        </div>
      </section>
    </section>
  );
}
