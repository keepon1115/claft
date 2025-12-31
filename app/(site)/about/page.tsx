import Link from 'next/link';
import { MobileContainer, Section } from '@/components/MobileContainer';

export const metadata = { 
  title: '学校と社会をつなぐ × CLAFTとは？ | CLAFT',
  description: '学校と社会のギャップを可視化し、CLAFTの学びの考え方を紹介する統合ページ。'
};

export default function AboutPage(){
  return (
    <MobileContainer className="px-0">
      {/* 学校と社会をつなぐ Section */}
      <Section 
        id="connect" 
        className="py-14 px-4 bg-gradient-to-b from-[#121a2a] to-[#1a2535] text-[#e8edf5] scroll-mt-20"
      >
        <h1 className="heading-xl mb-8 text-white">
          学校と社会をつなぐ
        </h1>
  
        <div className="grid grid-cols-1 gap-4 my-4">
          <blockquote className="m-0 bg-white text-gray-900 rounded-[18px] p-5 border border-[rgba(52,198,190,0.35)] shadow-lg">
            <p className="body-lg emphasis mb-0 text-[var(--pink)]">
              「一生懸命勉強したのに、社会に出たら全然違ってた」
            </p>
          </blockquote>

          <blockquote className="m-0 bg-white text-gray-900 rounded-[18px] p-5 border border-[rgba(52,198,190,0.35)] shadow-lg">
            <p className="body-lg emphasis mb-0 text-[var(--pink)]">
              「自分が本当にやりたいことって、なんだろう…？」
            </p>
          </blockquote>
        </div>

        <p className="body-base emphasis mb-4 text-[#e8edf5]">そんな声が、今の日本社会にはあふれています。</p>

        <h2 className="heading-lg mb-4 mt-6 relative inline-block text-white py-2.5 px-3.5 rounded-[14px] bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-white/[0.14] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
          「社会の変化に、学びが追いついていない」
          <span className="absolute left-2.5 right-2.5 bottom-1.5 h-1 rounded bg-gradient-to-r from-[var(--pink)] via-[var(--cream)] to-[var(--brand)]" aria-hidden="true"></span>
        </h2>
        <p className="body-base mb-4 text-[#a8b3c7]">
          技術の進歩、価値観の多様化に伴い社会課題が顕在化している時代。<br/>
          「正解を早く答える」勉強だけでは、生き抜く力にはなりません。
        </p>
      </Section>

      {/* CLAFTとは？ Section */}
      <Section id="claft" className="scroll-mt-20 px-4">
        <h1 className="heading-xl mb-6">
          CLAFTとは？
        </h1>
        <div className="body-base text-[var(--ink-700)] space-y-4">
          <p className="mb-4">
            Creative（創造性）と Communication（対話力）を軸にした Learning（学び）を通じて、<br/>
            Activeness（主体性）と Flexibility（柔軟性）を育み、Try（挑戦）する力を身につける。<br/>
            そんな人は、どこに行っても、何があっても大丈夫。<br/>
            私たちはその姿を、CLAFTという言葉に込めました。
          </p>
        </div>
        <div className="aspect-video rounded-[var(--radius-lg)] bg-gradient-to-br from-[rgba(255,214,107,0.18)] to-[rgba(52,198,190,0.12)] shadow-[var(--shadow)] grid place-items-center my-6">
          <span className="bg-white py-2 px-3 border border-dashed border-black/25 rounded-full text-[var(--ink-500)]">
            hero.jpg
          </span>
        </div>
      </Section>

      {/* Cards Section */}
      <Section id="brand" className="px-4">
        <div className="flex flex-col gap-6">
          
          <div className="bg-white border border-black/[0.06] rounded-2xl shadow-[var(--shadow)] p-8 md:p-10">
            <h2 className="heading-lg mb-6">
              なぜLなのか？
            </h2>
            <div className="aspect-video rounded-[var(--radius-lg)] bg-gradient-to-br from-[rgba(255,214,107,0.18)] to-[rgba(52,198,190,0.12)] shadow-[var(--shadow)] grid place-items-center my-6">
              <span className="bg-white py-2 px-3 border border-dashed border-black/25 rounded-full text-[var(--ink-500)]">
                logo.jpg
              </span>
            </div>
            <div className="body-base text-[var(--ink-700)] space-y-4">
              <p className="mb-4">RではなくLなのは、失敗したことをRegret（後悔）するのではなく、Learning（学び）として捉え、何度もチャレンジを繰り返す世の中になればという想いからです。</p>
              <p className="mb-4">テクノロジーの進歩と長寿化で「人生100年時代」といわれる今、従来の「学習 → 仕事 → 引退」という一本道ではなく、「学習 ↔ 仕事」を往復しながらキャリアを重ねていく時代です。</p>
              <p className="mb-4">その循環を前向きに回すには、<strong className="emphasis">学ぶこと・働くことを楽しむ心（好奇心）</strong>が要。子どものうちから「学びたい！」「働きたい！」と思える芽を育むことが大切だと思っています。</p>
            </div>
          </div>

          <div className="bg-white border border-black/[0.06] rounded-2xl shadow-[var(--shadow)] p-8 md:p-10">
            <h2 className="heading-lg mb-6">
              好奇心のままに学ぶにはどうするか？
            </h2>
            <div className="aspect-video rounded-[var(--radius-lg)] bg-gradient-to-br from-[rgba(255,214,107,0.18)] to-[rgba(52,198,190,0.12)] shadow-[var(--shadow)] grid place-items-center my-6">
              <span className="bg-white py-2 px-3 border border-dashed border-black/25 rounded-full text-[var(--ink-500)]">
                creative.jpg
              </span>
            </div>
            <div className="body-base text-[var(--ink-700)] space-y-4">
              <p className="mb-4">ずばり <strong className="emphasis">「創ること」だと思います</strong>。</p>
              <p className="mb-4">形がある/ないは関係なく、創る（＝アイデアを具体化していく）過程で、構造を理解し、試行錯誤し、手応えを得る。</p>
              <p className="mb-4">ここで生まれる達成感は、何ものにも代えがたい貴重な経験です。</p>
              <p className="mb-4">それを好き・得意から始め、そこで得た経験を<strong className="emphasis">自分の武器</strong>に変えていくカリキュラムです。</p>
              <ul className="body-base text-[var(--ink-700)] pl-5 space-y-3 mb-4">
                <li>
                  <strong className="emphasis">PBL(課題解決型学習)（中高生向け）</strong><br/>
                  自分の「好き」や「気になる」から自由に創って発表します。<br/>
                  ▶ <Link href="/pbl" className="text-[var(--brand)] no-underline hover:underline">PBLコースを詳しく見る</Link>
                </li>
                <li>
                  <strong className="emphasis">マイクラSDGsコース（小学生向け）</strong><br/>
                  マイクラでSDGsをテーマに、自分の世界観を表現します。<br/>
                  ▶ <Link href="/minecraft" className="text-[var(--brand)] no-underline hover:underline">マイクラSDGsコースを詳しく見る</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-black/[0.06] rounded-2xl shadow-[var(--shadow)] p-8 md:p-10">
            <h2 className="heading-lg mb-6">
              つくるだけでなく、つたえる
            </h2>
            <div className="aspect-video rounded-[var(--radius-lg)] bg-gradient-to-br from-[rgba(255,214,107,0.18)] to-[rgba(52,198,190,0.12)] shadow-[var(--shadow)] grid place-items-center my-6">
              <span className="bg-white py-2 px-3 border border-dashed border-black/25 rounded-full text-[var(--ink-500)]">
                communication.jpg
              </span>
            </div>
            <div className="body-base text-[var(--ink-700)] space-y-4">
              <p className="mb-4"><strong className="emphasis">つくる → つたえる → つたわる</strong></p>
              <p className="mb-4">この一連のプロセスそのものが学びです。作品や企画を言葉にして相手に届け、相手の反応で改良していきます。この往復ができれば、<strong className="emphasis">就職・進学・起業</strong>の場面でも自信をもって臨めます。</p>
              <p className="mb-4">就職活動では、2025年卒の学生が課題に感じるのは「面接対策」（31.0%）、「自分に合った企業の見つけ方」（24.1%）というデータもあります（出典：PR TIMES）。</p>
            </div>
          </div>

          <div className="bg-white border border-black/[0.06] rounded-2xl shadow-[var(--shadow)] p-8 md:p-10">
            <h2 className="heading-lg mb-6">
              クリエイティブ＆コミュニケーション（CL）
            </h2>
            <div className="aspect-video rounded-[var(--radius-lg)] bg-gradient-to-br from-[rgba(255,214,107,0.18)] to-[rgba(52,198,190,0.12)] shadow-[var(--shadow)] grid place-items-center my-6">
              <span className="bg-white py-2 px-3 border border-dashed border-black/25 rounded-full text-[var(--ink-500)]">
                future.jpg
              </span>
            </div>
            <div className="body-base text-[var(--ink-700)] space-y-4">
              <p className="mb-4">つくったものを発表する（＝コミュニケーション）のなかで、また新たな自分の興味を見つける。</p>
              <p className="mb-4">それを深く探究（＝クリエイティブ）し、またその成果を人前で発表する。</p>
              <p className="mb-4">発表や共有を通じて仲間とつながり、また新たな挑戦へ——。</p>
              <p className="mb-4">このサイクルをぐるぐる回すことで、「学びたい！」「働きたい！」という循環が自然と生まれます。</p>
            </div>
          </div>

          <div className="bg-white border border-black/[0.06] rounded-2xl shadow-[var(--shadow)] p-8 md:p-10">
            <h2 className="heading-lg mb-6">
              CLAFTによってどうなるか？（AFT）
            </h2>
            <div className="aspect-video rounded-[var(--radius-lg)] bg-gradient-to-br from-[rgba(255,214,107,0.18)] to-[rgba(52,198,190,0.12)] shadow-[var(--shadow)] grid place-items-center my-6">
              <span className="bg-white py-2 px-3 border border-dashed border-black/25 rounded-full text-[var(--ink-500)]">
                active.jpg
              </span>
            </div>
            <div className="space-y-4">
              <h3 className="heading-md mb-4">主体的な行動力の向上</h3>
              <p className="body-base text-[var(--ink-700)] mb-4">CLAFTでは、自分で問いを立て、考え、行動するプロセスを重視します。この経験は、指示待ちではなく「自ら動く力」を育てます。</p>
              <p className="body-base text-[var(--ink-700)] mb-4">自分の興味や得意を探究するので、新しいことにも挑戦できる。たとえ失敗しても、そこから学びを得る。アクションを起こすことで得られる学びを実感し、行動を起点とした成長サイクルが身につきます。</p>
            </div>

            <div className="aspect-video rounded-[var(--radius-lg)] bg-gradient-to-br from-[rgba(255,214,107,0.18)] to-[rgba(52,198,190,0.12)] shadow-[var(--shadow)] grid place-items-center my-6">
              <span className="bg-white py-2 px-3 border border-dashed border-black/25 rounded-full text-[var(--ink-500)]">
                flexible.jpg
              </span>
            </div>
            <div className="space-y-4">
              <h3 className="heading-md mb-4">柔軟な適応力の向上</h3>
              <p className="body-base text-[var(--ink-700)] mb-4">社会や仕事の環境は日々変化しています。CLAFTでは、固定観念にとらわれず柔軟に対応できる思考と行動を育てます。</p>
              <p className="body-base text-[var(--ink-700)] mb-4">他者との意見交換を通じて、異なる価値観や考え方を理解し、より柔軟な発想ができるようになります。そうすると、予期せぬ変化に対しても、チャンスとして捉え楽しむことができます。</p>
              <p className="body-base text-[var(--ink-700)] mb-4"><strong className="emphasis">そして、CLAFTで得られるアクティブさとフレキシブルさは、単なる行動力や適応力にとどまらず、現代社会で必要不可欠な「情報編集力」を育みます。</strong></p>
              <p className="body-base text-[var(--ink-700)] mb-4">※情報編集力とは、膨大な情報の中から自分に必要なものを選び出し、それを自分らしい形で組み立て、伝えられる力です。</p>
            </div>

            <div className="aspect-video rounded-[var(--radius-lg)] bg-gradient-to-br from-[rgba(255,214,107,0.18)] to-[rgba(52,198,190,0.12)] shadow-[var(--shadow)] grid place-items-center my-6">
              <span className="bg-white py-2 px-3 border border-dashed border-black/25 rounded-full text-[var(--ink-500)]">
                try.jpg
              </span>
            </div>
            <div className="space-y-4">
              <h3 className="heading-md mb-4">何度も試し続ける精神</h3>
              <p className="body-base text-[var(--ink-700)] mb-4">何かを試し、挑戦し続ける中で、学びの本質や仕事の魅力が自然と見えてくると思っています。トライすることで、新しい発見や成功体験が得られ、「学ばなきゃ」「仕事をしなきゃ」といった義務感から解放されます。その結果、自発的に「もっと学びたい」「次はこんなことをやってみたい」と思えるようになります。</p>
              <p className="body-base text-[var(--ink-700)] mb-4">挑戦する中で、これまで見えていなかった世界が広がります。たとえ好きなことややりたいことを続けられなくても、その周辺にある多様な可能性に気づき、自分ごととして捉えられるようになるでしょう。</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Free design section */}
      <Section className="px-4">
        <div className="relative isolate bg-gradient-to-br from-[rgba(52,198,190,0.18)] via-white to-[rgba(255,214,107,0.25)] border border-black/[0.06] rounded-[28px] shadow-[var(--shadow)] p-8 overflow-hidden">
          <h2 className="heading-lg mb-6">
            「使える学び」で武器に変える
          </h2>
          <div className="flex flex-wrap gap-2.5 mb-6" aria-hidden="true">
            {[
              { label: '学習力', color: 'var(--brand)' },
              { label: '横断的な学び', color: 'var(--green)' },
              { label: '実践', color: 'var(--pink)' }
            ].map((tag, i) => (
              <span key={i} className="inline-flex items-center gap-2 py-2.5 px-3.5 rounded-full font-bold border border-black/[0.06] bg-white shadow-md">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: tag.color }}></span>
                {tag.label}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 items-center">
            <div className="flex flex-col gap-4">
              <ul className="body-base text-[var(--ink-700)] pl-5 space-y-3 mb-6">
                <li>学力より<strong className="emphasis">学習力</strong>を。</li>
                <li>専門だけでなく、<br/><strong className="emphasis">好奇心から広がる横断的な学び</strong>を。</li>
                <li>知識の獲得を目指す生徒から、<br/><strong className="emphasis">知識を実社会で活用できる「学習者」</strong>へ。</li>
              </ul>
              <p className="body-xl mb-0 border-l-[6px] border-[var(--brand)] pl-4 bg-gradient-to-r from-[rgba(52,198,190,0.10)] to-transparent">
                正解が一つではない今の社会で、<br/>
                自分を知り、社会を知り、異年齢の仲間と協働し、<strong className="emphasis">社会に出る前に実践できる場</strong>。<br/>
                ——そんな実践力を磨くスクールです！
              </p>
            </div>
          </div>
        </div>
      </Section>
    </MobileContainer>
  );
}
