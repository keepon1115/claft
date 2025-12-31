import { MobileContainer, Section } from '@/components/MobileContainer';

export const metadata = { 
  title: '学校と社会をつなぐ | CLAFT',
  description: '学校と社会のギャップを可視化し、CLAFTの学びの考え方を紹介するページ。'
};

export default function SchoolSocietyPage(){
  return (
    <MobileContainer className="px-0">
      {/* Dark wrap */}
      <div className="bg-gradient-radial from-[rgba(52,198,190,0.10)] to-transparent bg-[#121a2a] text-[#e8edf5]">
        <Section className="py-14 px-4">
          <div className="pt-14 pb-5.5">
            <h1 className="text-4xl leading-tight my-2 text-white font-bold">
              学校と社会をつなぐ
            </h1>

            {/* Duo Quote */}
            <div className="relative grid grid-cols-1 gap-4 items-start my-3.5">
              <div className="absolute pointer-events-none font-serif font-bold leading-none opacity-10 text-white text-[100px] -left-1 -top-1.5 -rotate-[8deg]" aria-hidden="true">"</div>
              <div className="absolute pointer-events-none font-serif font-bold leading-none opacity-10 text-white text-[100px] -right-1 -bottom-3 rotate-[8deg]" aria-hidden="true">"</div>

              <blockquote className="m-0 bg-white text-gray-900 rounded-[18px] p-5 border border-[rgba(52,198,190,0.35)] shadow-lg">
                <p className="m-0 text-lg leading-relaxed text-[var(--pink)] font-bold">
                  「一生懸命勉強したのに、社会に出たら全然違ってた」
                </p>
              </blockquote>

              <blockquote className="m-0 bg-white text-gray-900 rounded-[18px] p-5 border border-[rgba(52,198,190,0.35)] shadow-lg">
                <p className="m-0 text-lg leading-relaxed text-[var(--pink)] font-bold">
                  「自分が本当にやりたいことって、なんだろう…？」
                </p>
              </blockquote>
            </div>

            <p className="font-bold">そんな声が、今の日本社会にはあふれています。</p>

            {/* 数字インパクト */}
            <div className="grid grid-cols-1 gap-4 mt-4.5">
              {[
                { num: '67.3', unit: '%', title: '新入社員が感じる「スキル不足」', note: '自分の能力不足がストレス源。社会の厳しさを痛感する若者は6割越え。', source: '出典：産業能率大「2024年度 新入社員会社生活調査」' },
                { num: '34.9', unit: '%', title: '3年以内の離職率', note: '大卒の約5人に1人が早期離職、高卒ではさらに深刻。', source: '出典：産業能率大「2024年度 新入社員会社生活調査」' },
                { num: '19.0', unit: '%', title: '日本の教育を「良い」と評価', note: '国際比較で低位。生徒も先生も保護者も「何か違う」と感じている。', source: '出典：イプソス「教育モニター2024」調査レポート' }
              ].map((stat, i) => (
                <article key={i} className="bg-[#f7f8fb] border border-black/[0.06] rounded-[18px] p-4.5 shadow-lg text-gray-900">
                  <div className="flex items-end justify-center gap-2">
                    <div>
                      <span className="font-black tracking-wide leading-none text-[var(--pink)] text-5xl md:text-6xl drop-shadow-[0_2px_0_rgba(255,255,255,0.7)]">
                        {stat.num}
                      </span>
                      <span className="font-black ml-0.5 text-[var(--pink)]">{stat.unit}</span>
                    </div>
                  </div>
                  <div className="font-bold text-center mt-2 text-gray-900">{stat.title}</div>
                  <p className="mt-1.5 text-center text-gray-600 text-sm">{stat.note}</p>
                  <p className="mt-1.5 text-center text-gray-400 text-xs">{stat.source}</p>
                </article>
              ))}
            </div>

            <p className="mt-4.5 text-base text-[#a8b3c7]">
              <strong>原因は、決して本人の努力不足ではありません。</strong>
            </p>
            <p className="text-base text-[#a8b3c7] mt-3">
              むしろ、まじめに勉強してきた人ほど戸惑ってしまうのです。<br/>その理由は、とてもシンプル。
            </p>

            {/* Headline Accent */}
            <h2 className="relative inline-block text-white text-2xl font-extrabold tracking-wide py-2.5 px-3.5 rounded-[14px] bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-white/[0.14] shadow-[0_10px_30px_rgba(0,0,0,0.25)] mt-2.5">
              「社会の変化に、学びが追いついていない」
              <span className="absolute left-2.5 right-2.5 bottom-1.5 h-1 rounded bg-gradient-to-r from-[var(--pink)] via-[var(--cream)] to-[var(--brand)]" aria-hidden="true"></span>
            </h2>
            <p>技術の進歩、価値観の多様化に伴い社会課題が顕在化している時代。<br/>「正解を早く答える」勉強だけでは、生き抜く力にはなりません。</p>

            <img 
              src="/assets/school_society/learn.jpg" 
              alt="学びのイメージ"
              className="w-full aspect-video object-cover rounded-[28px] shadow-[var(--shadow)] my-4.5 block"
              loading="lazy"
              decoding="async"
            />

            <p>特にAIの進化は著しく、記憶や計算といった認知能力はすでにコンピュータの方が得意な領域になっています。</p>

            <img 
              src="/assets/school_society/learn_forecast.jpg" 
              alt="社会を知り未来を予測する学びのイメージ"
              className="w-full aspect-video object-cover rounded-[28px] shadow-[var(--shadow)] my-4.5 block"
              loading="lazy"
              decoding="async"
            />

            <p>それにもかかわらず、日本の教育は依然として「教科書に書かれた知識を覚え、テストで正しく答える力」を重視しています。</p>
            <p>先生が知識を教え、生徒がそれを記憶し、偏差値で進路が決まる──</p>
            <p>この構造のままでは、教育と社会との間に大きなギャップが生じ、多くの若者がつまずいてしまいます。</p>

            {/* 社会課題：数字カード */}
            <div className="grid grid-cols-1 gap-4 mt-4.5">
              {[
                { num: '45.8', unit: '%', title: '自分の行動で、社会を変えられる', note: '6か国調査で最下位。日本の若者は無力感を抱いている', source: '出典：日本財団「18歳意識調査 第62回（6カ国調査）」' },
                { num: '53.0', unit: '%', title: '「自分が好きだ」と答えた日本の若者', note: '比較対象国中で最下位。自己肯定感の低さは自殺率にもつながっている', source: '出典：こども家庭庁「諸外国との比較調査」' },
                { num: '34.6', unit: '万人', title: '2023年度 小・中学校の不登校児童生徒', note: '10年前から、小学生で約5.4倍 中学生で約2.3倍。少子化でも増加。', source: '出典：文部科学省 令和5年度調査' }
              ].map((stat, i) => (
                <article key={i} className="bg-[#f7f8fb] border border-black/[0.06] rounded-[18px] p-4.5 shadow-lg text-gray-900">
                  <div className="flex items-end justify-center gap-2">
                    <div>
                      <span className="font-black tracking-wide leading-none text-[var(--pink)] text-5xl md:text-6xl drop-shadow-[0_2px_0_rgba(255,255,255,0.7)]">
                        {stat.num}
                      </span>
                      <span className="font-black ml-0.5 text-[var(--pink)]">{stat.unit}</span>
                    </div>
                  </div>
                  <div className="font-bold text-center mt-2 text-gray-900">{stat.title}</div>
                  <p className="mt-1.5 text-center text-gray-600 text-sm">{stat.note}</p>
                  <p className="mt-1.5 text-center text-gray-400 text-xs">{stat.source}</p>
                </article>
              ))}
            </div>

            <p>CLAFTでは、この状況を変えるために、</p>
            <p>入試のための勉強から</p>
            <h2 className="relative inline-block text-white text-2xl font-extrabold tracking-wide py-2.5 px-3.5 rounded-[14px] bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-white/[0.14] shadow-[0_10px_30px_rgba(0,0,0,0.25)] mt-2.5">
              「社会を知り未来を予測するための学び」へと
              <span className="absolute left-2.5 right-2.5 bottom-1.5 h-1 rounded bg-gradient-to-r from-[var(--pink)] via-[var(--cream)] to-[var(--brand)]" aria-hidden="true"></span>
            </h2>
            <p>変えていく必要があると考えています。</p>
          </div>
        </Section>
      </div>

      {/* Light section */}
      <Section className="py-14 bg-white text-[var(--ink-900)] px-4">
        <h2 className="font-bold text-2xl mb-4">人生100年時代、自分を語れる人へ</h2>
        <p>社会が大きく変化するなかで、大学入試の形式にも変化が現れています。<br/>一般選抜、いわゆるテスト入試は50%を下回り、総合型選抜（志望理由書・小論文・面接）による選抜の比率が増えています。<br/>これからは、さらに多様な選抜方法が広がっていくでしょう。</p>

        <img 
          src="/assets/school_society/practice_dialogue.jpg" 
          alt="実践と対話のイメージ"
          className="w-full aspect-video object-cover rounded-[28px] shadow-[var(--shadow)] my-4.5 block"
          loading="lazy"
          decoding="async"
        />

        <p>また、テクノロジーの進化と長寿化により、私たちは「人生100年時代」を迎えています。<br/>従来の「学ぶ→働く→引退する」という一方通行の人生モデルは崩れ、「学び→仕事」を何度も繰り返しながらキャリアを築いていく時代へと移り変わっています。</p>

        <img 
          src="/assets/school_society/life100_cycle.jpg" 
          alt="人生100年時代における学習と仕事の循環"
          className="w-full aspect-video object-cover rounded-[28px] shadow-[var(--shadow)] my-4.5 block"
          loading="lazy"
          decoding="async"
        />

        <p>単に引退や生活のために学び続けるだけでは、心身のバランスを保つことは難しくなります。<br/>これからは、持続可能な「働き方」と「学び方」を見つけることが重要です。</p>
        <p>さらに、仕事のあり方そのものも変わりつつあります。<br/>既存の職業をそのままなぞるのではなく、複数の仕事やスキルを組み合わせ、新しい価値を生み出す力が求められています。</p>
        <p>だからこそ、必要なのは<br/>「知識を得る人」から「知識を社会で活かす学習者」へと変わること。<br/>知識を「使う」ことで、人とつながり、課題を解決し、未来を共に創る、<br/>その姿勢こそが、これからの時代を生き抜く力になるのです。</p>
      </Section>

      {/* Free design section */}
      <Section className="px-4">
        <div className="relative isolate bg-gradient-to-br from-[rgba(52,198,190,0.18)] via-white to-[rgba(255,214,107,0.25)] border border-black/[0.06] rounded-[28px] shadow-[var(--shadow)] p-8 overflow-hidden">
          <h2 className="mt-0 mb-4 font-bold text-2xl">「使える学び」で武器に変える</h2>
          <div className="flex flex-wrap gap-2.5 mb-6" aria-hidden="true">
            {[
              { label: '学習力', color: 'var(--brand)' },
              { label: '横断的な学び', color: '#58c3a2' },
              { label: '実践', color: '#ef4444' }
            ].map((tag, i) => (
              <span key={i} className="inline-flex items-center gap-2 py-2.5 px-3.5 rounded-full font-bold border border-black/[0.06] bg-white shadow-md">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: tag.color }}></span>
                {tag.label}
              </span>
            ))}
          </div>

          <div>
            <ul className="flex flex-col gap-4">
              <li>学力より<strong>学習力</strong>を。</li>
              <li>専門だけでなく、<br/><strong>好奇心から広がる横断的な学び</strong>を。</li>
              <li>知識の獲得を目指す生徒から、<br/><strong>知識を実社会で活用できる「学習者」</strong>へ。</li>
            </ul>
            <p className="text-xl leading-relaxed mt-8 border-l-[6px] border-[var(--brand)] pl-4 bg-gradient-to-r from-[rgba(52,198,190,0.10)] to-transparent">
              正解が一つではない今の社会で、<br/>
              自分を知り、社会を知り、異年齢の仲間と協働し、<strong>社会に出る前に実践できる場</strong>。<br/>
              ——そんな実践力を磨くスクールです！
            </p>
          </div>
        </div>
      </Section>
    </MobileContainer>
  );
}
