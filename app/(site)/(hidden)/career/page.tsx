import Link from 'next/link';
import { MobileContainer, Section } from '@/components/MobileContainer';

export const metadata = { 
  title: 'クエストPBLコース | CLAFT',
  description: '好き・得意を自分の武器に変えるカリキュラム。対話と実践で"自分の軸"を育て、キャリアを自分でクラフトする学び。'
};

export default function CareerPage(){
  return (
    <MobileContainer>
      {/* ヒーローセクション */}
      <Section>
        <h1 className="heading-xl mb-6">
          クエストPBLコース
        </h1>

        <div className="grid grid-cols-1 items-center gap-8 mt-6">
          <div className="space-y-4">
            <p className="body-xl emphasis mb-4">
              キミの『好き』が未来を創る！
            </p>
            <p className="body-base text-ink-700 mb-4">
              好き・得意を自分の武器に変えるカリキュラム。正解がひとつでない問題に対して、"自分の意見を持ち、他者に共有する"ことを習慣化し、自分で自分のキャリアを"クラフト"していきます。
            </p>
          </div>
          <img 
            className="w-full border border-black/[0.08] object-cover aspect-video rounded-[28px] shadow-md"
            src="https://keepon1115.github.io/claft/assets/career/hero.jpg" 
            alt="キャリアコースの学びの様子（ヒーロー）" 
          />
        </div>

        {/* クイック情報バー */}
        <div className="grid grid-cols-1 gap-3.5 mt-6" aria-label="基本情報">
          <div className="flex items-start gap-3 border border-black/[0.06] bg-white rounded-[14px] p-3.5 shadow-md">
            <svg 
              className="flex-none"
              viewBox="0 0 24 24" 
              width="20" 
              height="20" 
              fill="none" 
              stroke="var(--ink-700)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <div className="body-base text-ink-700"><b>対象</b> 中高生</div>
          </div>
          
          <div className="flex items-start gap-3 border border-black/[0.06] bg-white rounded-[14px] p-3.5 shadow-md">
            <svg 
              className="flex-none"
              viewBox="0 0 24 24" 
              width="20" 
              height="20" 
              fill="none" 
              stroke="var(--ink-700)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <path d="M8 21h8"/>
              <path d="M12 17v4"/>
            </svg>
            <div className="body-base text-ink-700"><b>形式</b> オンライン。自己理解×課題解決型学習（PBL）で、思考力・判断力・表現力を育みます。</div>
          </div>
          
          <div className="flex items-start gap-3 border border-black/[0.06] bg-white rounded-[14px] p-3.5 shadow-md">
            <svg 
              className="flex-none"
              viewBox="0 0 24 24" 
              width="20" 
              height="20" 
              fill="none" 
              stroke="var(--ink-700)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
            <div className="body-base text-ink-700"><b>頻度・時間</b> クエスト動画月9本更新、3～4ヶ月に1回の非認知能力計測＆面談。</div>
          </div>
        </div>
      </Section>

      {/* こんな力が育つ */}
      <Section>
        <h2 className="heading-lg mb-6">
          "好き"や"気になる"から「人生をかけてやりたいこと」に出会う!?
        </h2>
        <div className="grid grid-cols-1 gap-4.5">
          <article className="border border-black/[0.06] bg-white rounded-2xl p-6 shadow-md">
            <img 
              className="w-full border border-black/[0.12] object-cover aspect-video rounded-xl mb-2.5 shadow-md"
              src="https://keepon1115.github.io/claft/assets/career/outcome_01.jpg" 
              alt="問いを深掘りし自己理解を深める様子" 
            />
            <h3 className="heading-md mb-4">
              正解がひとつでないお題で、自己理解を深める！
            </h3>
            <ul className="body-base text-ink-700 pl-5 space-y-3 mb-4">
              <li>問いを深掘り：「なぜ好き？」「なぜ知りたい？」を丁寧に言葉に。興味・得意・価値観を手がかりに「本当にやりたいこと」「選びたい生き方」まで描きます。</li>
              <li>伝えて磨く：自分の意見を相手に届ける練習を重ね、就職・起業・進学の場で"自分をアピール"できる力を育てます。</li>
            </ul>
            <p className="body-base text-ink-700 mb-4">
              ( <Link href="/yononaka" className="text-brand no-underline hover:underline">▶Yononakaを詳しく見る</Link> )
            </p>
          </article>

          <article className="border border-black/[0.06] bg-white rounded-2xl p-6 shadow-md">
            <img 
              className="w-full border border-black/[0.12] object-cover aspect-video rounded-xl mb-2.5 shadow-md"
              src="https://keepon1115.github.io/claft/assets/career/outcome_02.jpg" 
              alt="非認知能力を可視化・育成する学習の様子" 
            />
            <h3 className="heading-md mb-4">
              数値では測れない非認知能力を育む！自己評価システム付き
            </h3>
            <ul className="body-base text-ink-700 pl-5 space-y-3 mb-4">
              <li>5つのチカラ（つなぐ・ひらく・えがく・なりきる・まきこむ）を意識しながら、</li>
              <li>自分で動画を選び、自分で自分を育てる学びを実践。</li>
              <li>「ふつう」を疑い、新しい発想を持ち、仲間と協力し、人を巻き込む──そんな未来を切り拓く力が育ちます。</li>
            </ul>
            <p className="body-base text-ink-700 mb-4">
              ( <a href="#jibuncraft" className="text-brand no-underline hover:underline">▶ジブンクラフトを詳しく見る</a> )
            </p>
          </article>

          <article className="border border-black/[0.06] bg-white rounded-2xl p-6 shadow-md">
            <img 
              className="w-full border border-black/[0.12] object-cover aspect-video rounded-xl mb-2.5 shadow-md"
              src="https://keepon1115.github.io/claft/assets/career/outcome_03.jpg" 
              alt="発表会や協働の様子" 
            />
            <h3 className="heading-md mb-4">
              身に付けた力を試し、仲間と協働！
            </h3>
            <ul className="body-base text-ink-700 pl-5 space-y-3 mb-4">
              <li>実践ステージ：「どんなイベントでワクワクを届ける？」「今の社会の課題は？」から"自分にできること"を考え、行動へ。経験を重ねて「自分だからできる」に出会います。</li>
              <li>キャリアインタビューや臨時講師など、社会の第一線で活躍する大人との交流も。タテでもヨコでもない「ナナメの関係」が築けます。</li>
            </ul>
            <p className="body-base text-ink-700 mb-4">
              ( <Link href="/futurecraft" className="text-brand no-underline hover:underline">▶ミライクラフトを詳しく見る</Link> )
            </p>
          </article>
        </div>
      </Section>

      {/* コースの全体像 */}
      <Section id="overview">
        <h2 className="heading-lg mb-6">
          コースの全体像
        </h2>
        <div className="space-y-4">
          <p className="body-base text-ink-700 mb-4">クエスト：社会で大切だけれど学校ではあまり学べないテーマ（お金・デジタル技術・環境など）を動画で学習し、最後に出される「正解がひとつでない」問いに自分の意見を入力します。経営者・個人事業主の特別ワークもあります。</p>
          <p className="body-base text-ink-700 mb-4">課題解決型学習（PBL）：自分の「好き」や「気になる」から自分で課題を設定し、調べ、整理し、解決策をまとめて発表します。3～4ヶ月に1回の発表会で作品を発表し、フィードバックから次回の課題を設定していきます。</p>
          <p className="body-base text-ink-700 mb-4" id="jibuncraft">ジブンクラフト：自己理解や目標設定のワークも行い、インプット＆アウトプットの繰り返しで、自己理解を深めていきます。非認知能力計測とキャリアコンサルタントによる面談で、自身のキャリアの目標設定もしていきます。</p>
          <div className="diagram">
            <img 
              className="border border-black/[0.1] object-cover aspect-video rounded-[28px] shadow-md"
              src="https://keepon1115.github.io/claft/assets/career/diagram_overview.jpg" 
              alt="学びの循環図（インプット→アウトプット→対話→振り返り）" 
            />
          </div>
        </div>
      </Section>

      {/* 学びの流れ */}
      <Section>
        <h2 className="heading-lg mb-6">
          学びの流れ
        </h2>
        <div className="grid grid-cols-1 gap-4.5">
          {[
            { num: '1', title: '相談', desc: 'お気軽にLINEでご連絡ください。' },
            { num: '2', title: '体験', desc: '1ヶ月無料体験。ZOOMで個別説明もいたします。' },
            { num: '3', title: '入会', desc: 'LINEから決済手続きなどご案内いたします。' },
            { num: '4', title: '学び', desc: 'クエスト動画月9本更新。3～4ヶ月を目安に、自分の「好き」や「気になる」から自分で課題を設定し、解決策をまとめて発表します。' },
            { num: '5', title: '振り返り', desc: '3～4ヶ月に1回の発表会に参加。非認知能力計測＆面談で目標設定を行い、次回の学習準備をします。' }
          ].map((step, i) => (
            <div key={i} className="relative border border-black/[0.06] bg-white rounded-2xl p-6 shadow-md">
              <span className="inline-flex items-center justify-center font-bold w-8 h-8 rounded-full bg-[var(--brand)] text-white mb-2">
                {step.num}
              </span>
              <strong className="body-lg emphasis block mb-1.5">{step.title}</strong>
              <p className="body-base text-ink-700 mb-0">{step.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 作品ギャラリー */}
      <Section id="works">
        <h2 className="heading-lg mb-6">
          作品ギャラリー
        </h2>
        <div className="grid grid-cols-1 gap-4.5">
          {[
            { img: 'work_01.jpg', title: '作品例①：ソニーの魅力とは？', desc: 'ソニー製品の魅力を探り、情報を集めて動画で発信。', url: 'https://youtu.be/zs1ZD0GZAm0' },
            { img: 'work_02.jpg', title: '作品例②：障害とはどのようなものか', desc: '吃音から障害について調べ、資料をまとめて発表。', url: 'https://youtu.be/qoANUgtTAZo' },
            { img: 'work_03.jpg', title: '作品例③：振動発電をマイクラで表現してみた', desc: 'マイクラで発電アイデアを再現。', url: 'https://youtu.be/QKfGtt1QT1M' }
          ].map((work, i) => (
            <article key={i} className="flex flex-col overflow-hidden border border-black/[0.06] bg-white rounded-2xl shadow-md">
              <img 
                className="w-full border-b border-black/[0.08] object-cover aspect-video"
                src={`https://keepon1115.github.io/claft/assets/career/${work.img}`}
                alt={`${work.title}のサムネイル`}
              />
              <div className="flex flex-col p-4 gap-2">
                <h3 className="heading-md mb-3">{work.title}</h3>
                <p className="body-base text-ink-700 mb-3">{work.desc}</p>
                <a 
                  className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white font-bold py-2.5 px-3.5 shadow-md text-[var(--ink-700)] no-underline hover:shadow-lg transition-shadow"
                  href={work.url}
                  aria-label={`${work.title}を詳しく見る`}
                >
                  詳しく見る
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 料金・資料 */}
      <Section>
        <div className="border border-black/[0.06] bg-white rounded-2xl p-6 shadow-md">
          <h2 className="heading-lg mb-4">料金</h2>
          <p className="body-base text-ink-700 mb-4">
            <span className="inline-block font-bold py-1 px-2 rounded-full bg-[rgba(52,198,190,0.12)] text-[#0f766e] mr-2">
              初月無料
            </span> 
            <strong>月額7,700円（税込）</strong>
          </p>
          <p className="body-base text-ink-700 mb-0">
            ※ 決済手続きはLINEからご案内いたします。
          </p>
        </div>
      </Section>

      {/* JSON-LD 構造化データ */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOccupationalProgram",
            "name": "キャリアコース",
            "description": "好き・得意を自分の武器に変えるカリキュラム。正解がひとつでない問題に対して、自分の意見を持ち、共有する学び。オンライン実施。",
            "provider": { "@type": "Organization", "name": "CLAFT" },
            "offers": { "@type": "Offer", "price": "7700", "priceCurrency": "JPY" },
            "timeOfDay": "オンライン"
          })
        }}
      />
    </MobileContainer>
  );
}
