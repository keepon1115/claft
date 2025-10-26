import Link from 'next/link';

export const metadata = { title: 'About | CLAFT' };
export default function AboutPage(){
  return (
    <section className="py-10">
      <div className="container">
        <h1 className="text-2xl font-bold">CLAFTとは？</h1>
        <p className="mt-2 text-[color:var(--ink-700)]">
          Creative（創造性）と Communication（対話力）を軸にした Learning（学び）を通じて、
          Activeness（主体性）と Flexibility（柔軟性）を育み、Try（挑戦）する力を身につける。そんな人は、どこに行っても、何があっても大丈夫。私たちはその姿を、CLAFTという言葉に込めました。
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl shadow-soft">
          <img src="https://keepon1115.github.io/claft/assets/about/hero.jpg" alt="" className="h-auto w-full" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6">
          <article className="rounded-2xl border bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold">なぜLなのか？</h2>
            <div className="my-3 overflow-hidden rounded-2xl shadow-soft">
              <img src="https://keepon1115.github.io/claft/assets/about/logo.jpg" alt="" className="h-auto w-full" />
            </div>
            <p>RではなくLなのは、失敗したことをRegret（後悔）するのではなく、Learning（学び）として捉え、何度もチャレンジを繰り返す世の中になればという想いからです。</p>
            <p>テクノロジーの進歩と長寿化で「人生100年時代」といわれる今、従来の「学習 → 仕事 → 引退」という一本道ではなく、「学習 ↔ 仕事」を往復しながらキャリアを重ねていく時代です。</p>
            <p>その循環を前向きに回すには、<strong>学ぶこと・働くことを楽しむ心（好奇心）</strong>が要。子どものうちから「学びたい！」「働きたい！」と思える芽を育むことが大切だと思っています。</p>
          </article>

          <article className="rounded-2xl border bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold">好奇心のままに学ぶにはどうするか？</h2>
            <div className="my-3 overflow-hidden rounded-2xl shadow-soft">
              <img src="https://keepon1115.github.io/claft/assets/about/creative.jpg" alt="" className="h-auto w-full" />
            </div>
            <p>ずばり <strong>「創ること」だと思います</strong>。</p>
            <p>形がある/ないは関係なく、創る（＝アイデアを具体化していく）過程で、構造を理解し、試行錯誤し、手応えを得る。</p>
            <p>それを好き・得意から始め、そこで得た経験を<strong>自分の武器</strong>に変えていくカリキュラムです。</p>
            <ul className="list-disc pl-6">
              <li><strong>キャリアコース（中高生向け）</strong> 自分の「好き」や「気になる」から自由に創って発表します。▶ <Link href="/career">キャリアコースを詳しく見る</Link></li>
              <li><strong>マイクラSDGsコース（小学生向け）</strong> マイクラでSDGsをテーマに、自分の世界観を表現します。▶ <Link href="/minecraft">マイクラSDGsコースを詳しく見る</Link></li>
            </ul>
          </article>

          <article className="rounded-2xl border bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold">つくるだけでなく、つたえる</h2>
            <div className="my-3 overflow-hidden rounded-2xl shadow-soft">
              <img src="https://keepon1115.github.io/claft/assets/about/communication.jpg" alt="" className="h-auto w-full" />
            </div>
            <p><strong>つくる → つたえる → つたわる</strong></p>
            <p>この一連のプロセスそのものが学びです。作品や企画を言葉にして相手に届け、相手の反応で改良していきます。この往復ができれば、<strong>就職・進学・起業</strong>の場面でも自信をもって臨めます。</p>
            <p>就職活動では、2025年卒の学生が課題に感じるのは「面接対策」（31.0%）、「自分に合った企業の見つけ方」（24.1%）というデータもあります（出典：PR TIMES）。</p>
          </article>

          <article className="rounded-2xl border bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold">クリエイティブ＆コミュニケーション（CL）</h2>
            <div className="my-3 overflow-hidden rounded-2xl shadow-soft">
              <img src="https://keepon1115.github.io/claft/assets/about/future.jpg" alt="" className="h-auto w-full" />
            </div>
            <p>つくったものを発表する（＝コミュニケーション）のなかで、また新たな自分の興味を見つける。</p>
            <p>それを深く探究（＝クリエイティブ）し、またその成果を人前で発表する。</p>
            <p>発表や共有を通じて仲間とつながり、また新たな挑戦へ——。このサイクルをぐるぐる回すことで、「学びたい！」「働きたい！」という循環が自然と生まれます。</p>
          </article>

          <article className="rounded-2xl border bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold">CLAFTによってどうなるか？（AFT）</h2>
            <div className="my-3 overflow-hidden rounded-2xl shadow-soft">
              <img src="https://keepon1115.github.io/claft/assets/about/active.jpg" alt="" className="h-auto w-full" />
            </div>
            <p><strong>主体的な行動力の向上</strong></p>
            <p>CLAFTでは、自分で問いを立て、考え、行動するプロセスを重視します。この経験は、指示待ちではなく「自ら動く力」を育てます。</p>
            <p>自分の興味や得意を探究するので、新しいことにも挑戦できる。たとえ失敗しても、そこから学びを得る。アクションを起こすことで得られる学びを実感し、行動を起点とした成長サイクルが身につきます。</p>

            <div className="my-3 overflow-hidden rounded-2xl shadow-soft">
              <img src="https://keepon1115.github.io/claft/assets/about/flexible.jpg" alt="" className="h-auto w-full" />
            </div>
            <p><strong>柔軟な適応力の向上</strong></p>
            <p>社会や仕事の環境は日々変化しています。CLAFTでは、固定観念にとらわれず柔軟に対応できる思考と行動を育てます。</p>
            <p>他者との意見交換を通じて、異なる価値観や考え方を理解し、より柔軟な発想ができるようになります。そうすると、予期せぬ変化に対しても、チャンスとして捉え楽しむことができます。</p>
            <p><strong>そして、CLAFTで得られるアクティブさとフレキシブルさは、単なる行動力や適応力にとどまらず、現代社会で必要不可欠な「情報編集力」を育みます。</strong></p>
            <p>※情報編集力とは、膨大な情報の中から自分に必要なものを選び出し、それを自分らしい形で組み立て、伝えられる力です。</p>

            <div className="my-3 overflow-hidden rounded-2xl shadow-soft">
              <img src="https://keepon1115.github.io/claft/assets/about/try.jpg" alt="" className="h-auto w-full" />
            </div>
            <p><strong>何度も試し続ける精神</strong></p>
            <p>何かを試し、挑戦し続ける中で、学びの本質や仕事の魅力が自然と見えてくると思っています。トライすることで、新しい発見や成功体験が得られ、「学ばなきゃ」「仕事をしなきゃ」といった義務感から解放されます。その結果、自発的に「もっと学びたい」「次はこんなことをやってみたい」と思えるようになります。</p>
            <p>挑戦する中で、これまで見えていなかった世界が広がります。たとえ好きなことややりたいことを続けられなくても、その周辺にある多様な可能性に気づき、自分ごととして捉えられるようになるでしょう。</p>
          </article>

          <article className="rounded-2xl border bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold">「使える学び」で武器に変える</h2>
            <div className="mb-3 flex flex-wrap gap-2" aria-hidden="true">
              <span className="rounded-full border px-3 py-1 font-bold" style={{borderColor:'rgba(240,106,106,.25)'}}><span className="mr-2 inline-block h-2 w-2 rounded-full" style={{background:'hsl(167,88%,61%)'}} />学習力</span>
              <span className="rounded-full border px-3 py-1 font-bold" style={{borderColor:'rgba(240,106,106,.25)'}}><span className="mr-2 inline-block h-2 w-2 rounded-full" style={{background:'hsl(345,84%,75%)'}} />横断的な学び</span>
              <span className="rounded-full border px-3 py-1 font-bold" style={{borderColor:'rgba(240,106,106,.25)'}}><span className="mr-2 inline-block h-2 w-2 rounded-full" style={{background:'#ffd66b'}} />実践</span>
            </div>
            <ul className="list-disc pl-6">
              <li>学力より<strong>学習力</strong>を。</li>
              <li>専門だけでなく、<strong>好奇心から広がる横断的な学び</strong>を。</li>
              <li>知識の獲得を目指す生徒から、<strong>知識を実社会で活用できる「学習者」</strong>へ。</li>
            </ul>
            <p className="mt-4 border-l-4 border-brand pl-4">正解が一つではない今の社会で、<br/>自分を知り、社会を知り、異年齢の仲間と協働し、<strong>社会に出る前に実践できる場</strong>。<br/>——そんな実践力を磨くスクールです！</p>
          </article>
        </div>
      </div>
    </section>
  );
}
