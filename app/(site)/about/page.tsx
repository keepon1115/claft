import Link from 'next/link';
import type { CSSProperties } from 'react';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { Underline } from '@/components/craft/HandDrawn';

export const metadata = {
  title: '学校と社会をつなぐ × CLAFTとは？ | CLAFT',
  description: '学校と社会のギャップを可視化し、CLAFTの学びの考え方を紹介する統合ページ。'
};

/** 画像プレースホルダ（アルバムに貼る予定の写真枠） */
const PhotoSlot = ({ label }: { label: string }) => (
  <div className="ab-photo craft-photo">
    <span className="craft-label">{label}</span>
  </div>
);

export default function AboutPage(){
  return (
    <MobileContainer>
      {/* 学校と社会をつなぐ Section（黒板） */}
      <Section id="connect" className="ab-section scroll-mt-20">
        <div className="ab-board reveal">
          <h1 className="ab-board-title">
            学校と社会をつなぐ
            <Underline variant={1} className="ab-board-line craft-draw" />
          </h1>

          {/* 黒板に貼られた生徒の声 */}
          <div className="ab-board-quotes">
            <blockquote
              className="ab-board-quote craft-paper craft-tilt"
              style={{ '--rot': '-1.2deg' } as CSSProperties}
            >
              <span className="craft-tape craft-tape--cream" aria-hidden="true" />
              <p>「一生懸命勉強したのに、社会に出たら全然違ってた」</p>
            </blockquote>

            <blockquote
              className="ab-board-quote craft-paper craft-tilt"
              style={{ '--rot': '1deg' } as CSSProperties}
            >
              <span className="craft-tape craft-tape--pink" aria-hidden="true" />
              <p>「自分が本当にやりたいことって、なんだろう…？」</p>
            </blockquote>
          </div>

          <p className="ab-board-strong">そんな声が、今の日本社会にはあふれています。</p>

          <h2 className="ab-board-h2">
            「社会の変化に、学びが追いついていない」
            <Underline variant={3} className="ab-board-line craft-draw" style={{ color: 'var(--cream)' }} />
          </h2>
          <p>
            技術の進歩、価値観の多様化に伴い社会課題が顕在化している時代。<br/>
            「正解を早く答える」勉強だけでは、生き抜く力にはなりません。
          </p>
        </div>
      </Section>

      {/* CLAFTとは？ Section */}
      <Section id="claft" className="ab-section scroll-mt-20">
        <h1 className="ab-title craft-misprint">CLAFTとは？</h1>
        <Underline variant={2} className="ab-title-line craft-draw craft-draw--auto" style={{ color: 'var(--brand)' }} />

        <div className="ab-card craft-paper craft-paper--ruled craft-tilt reveal" style={{ '--rot': '-0.4deg' } as CSSProperties}>
          <span className="craft-tape" aria-hidden="true" />
          <p>
            Creative（創造性）と Communication（対話力）を軸にした Learning（学び）を通じて、<br/>
            Activeness（主体性）と Flexibility（柔軟性）を育み、Try（挑戦）する力を身につける。<br/>
            そんな人は、どこに行っても、何があっても大丈夫。<br/>
            私たちはその姿を、CLAFTという言葉に込めました。
          </p>
          <PhotoSlot label="hero.jpg" />
        </div>
      </Section>

      {/* Cards Section */}
      <Section id="brand" className="ab-section">
        <div className="ab-card craft-paper craft-tilt reveal" style={{ '--rot': '0.5deg' } as CSSProperties}>
          <span className="craft-tape craft-tape--cream" aria-hidden="true" />
          <h2 className="ab-card-h2">なぜLなのか？</h2>
          <Underline variant={1} className="ab-card-line craft-draw" style={{ color: 'var(--cream)' }} />
          <PhotoSlot label="logo.jpg" />
          <div className="space-y-4">
            <p>RではなくLなのは、失敗したことをRegret（後悔）するのではなく、Learning（学び）として捉え、何度もチャレンジを繰り返す世の中になればという想いからです。</p>
            <p>テクノロジーの進歩と長寿化で「人生100年時代」といわれる今、従来の「学習 → 仕事 → 引退」という一本道ではなく、「学習 ↔ 仕事」を往復しながらキャリアを重ねていく時代です。</p>
            <p>その循環を前向きに回すには、<strong className="emphasis">学ぶこと・働くことを楽しむ心（好奇心）</strong>が要。子どものうちから「学びたい！」「働きたい！」と思える芽を育むことが大切だと思っています。</p>
          </div>
        </div>

        <div className="ab-card craft-paper craft-tilt reveal" style={{ '--rot': '-0.5deg' } as CSSProperties}>
          <span className="craft-tape craft-tape--green" aria-hidden="true" />
          <h2 className="ab-card-h2">好奇心のままに学ぶにはどうするか？</h2>
          <Underline variant={2} className="ab-card-line craft-draw" style={{ color: 'var(--green)' }} />
          <PhotoSlot label="creative.jpg" />
          <div className="space-y-4">
            <p>ずばり <strong className="emphasis">「創ること」だと思います</strong>。</p>
            <p>形がある/ないは関係なく、創る（＝アイデアを具体化していく）過程で、構造を理解し、試行錯誤し、手応えを得る。</p>
            <p>ここで生まれる達成感は、何ものにも代えがたい貴重な経験です。</p>
            <p>それを好き・得意から始め、そこで得た経験を<strong className="emphasis">自分の武器</strong>に変えていくカリキュラムです。</p>
            <ul>
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

        <div className="ab-card craft-paper craft-tilt reveal" style={{ '--rot': '0.4deg' } as CSSProperties}>
          <span className="craft-tape craft-tape--pink" aria-hidden="true" />
          <h2 className="ab-card-h2">つくるだけでなく、つたえる</h2>
          <Underline variant={3} className="ab-card-line craft-draw" style={{ color: 'var(--pink)' }} />
          <PhotoSlot label="communication.jpg" />
          <div className="space-y-4">
            <p><strong className="emphasis">つくる → つたえる → つたわる</strong></p>
            <p>この一連のプロセスそのものが学びです。作品や企画を言葉にして相手に届け、相手の反応で改良していきます。この往復ができれば、<strong className="emphasis">就職・進学・起業</strong>の場面でも自信をもって臨めます。</p>
            <p>就職活動では、2025年卒の学生が課題に感じるのは「面接対策」（31.0%）、「自分に合った企業の見つけ方」（24.1%）というデータもあります（出典：PR TIMES）。</p>
          </div>
        </div>

        <div className="ab-card craft-paper craft-tilt reveal" style={{ '--rot': '-0.3deg' } as CSSProperties}>
          <span className="craft-tape" aria-hidden="true" />
          <h2 className="ab-card-h2">クリエイティブ＆コミュニケーション（CL）</h2>
          <Underline variant={1} className="ab-card-line craft-draw" style={{ color: 'var(--brand)' }} />
          <PhotoSlot label="future.jpg" />
          <div className="space-y-4">
            <p>つくったものを発表する（＝コミュニケーション）のなかで、また新たな自分の興味を見つける。</p>
            <p>それを深く探究（＝クリエイティブ）し、またその成果を人前で発表する。</p>
            <p>発表や共有を通じて仲間とつながり、また新たな挑戦へ——。</p>
            <p>このサイクルをぐるぐる回すことで、「学びたい！」「働きたい！」という循環が自然と生まれます。</p>
          </div>
        </div>

        <div className="ab-card craft-paper craft-tilt reveal" style={{ '--rot': '0.4deg' } as CSSProperties}>
          <span className="craft-tape craft-tape--violet" aria-hidden="true" />
          <h2 className="ab-card-h2">CLAFTによってどうなるか？（AFT）</h2>
          <Underline variant={2} className="ab-card-line craft-draw" style={{ color: 'var(--violet)' }} />

          <PhotoSlot label="active.jpg" />
          <div className="space-y-4">
            <h3>主体的な行動力の向上</h3>
            <p>CLAFTでは、自分で問いを立て、考え、行動するプロセスを重視します。この経験は、指示待ちではなく「自ら動く力」を育てます。</p>
            <p>自分の興味や得意を探究するので、新しいことにも挑戦できる。たとえ失敗しても、そこから学びを得る。アクションを起こすことで得られる学びを実感し、行動を起点とした成長サイクルが身につきます。</p>
          </div>

          <PhotoSlot label="flexible.jpg" />
          <div className="space-y-4">
            <h3>柔軟な適応力の向上</h3>
            <p>社会や仕事の環境は日々変化しています。CLAFTでは、固定観念にとらわれず柔軟に対応できる思考と行動を育てます。</p>
            <p>他者との意見交換を通じて、異なる価値観や考え方を理解し、より柔軟な発想ができるようになります。そうすると、予期せぬ変化に対しても、チャンスとして捉え楽しむことができます。</p>
            <p><strong className="emphasis">そして、CLAFTで得られるアクティブさとフレキシブルさは、単なる行動力や適応力にとどまらず、現代社会で必要不可欠な「情報編集力」を育みます。</strong></p>
            <p>※情報編集力とは、膨大な情報の中から自分に必要なものを選び出し、それを自分らしい形で組み立て、伝えられる力です。</p>
          </div>

          <PhotoSlot label="try.jpg" />
          <div className="space-y-4">
            <h3>何度も試し続ける精神</h3>
            <p>何かを試し、挑戦し続ける中で、学びの本質や仕事の魅力が自然と見えてくると思っています。トライすることで、新しい発見や成功体験が得られ、「学ばなきゃ」「仕事をしなきゃ」といった義務感から解放されます。その結果、自発的に「もっと学びたい」「次はこんなことをやってみたい」と思えるようになります。</p>
            <p>挑戦する中で、これまで見えていなかった世界が広がります。たとえ好きなことややりたいことを続けられなくても、その周辺にある多様な可能性に気づき、自分ごととして捉えられるようになるでしょう。</p>
          </div>
        </div>
      </Section>

      {/* Free design section */}
      <Section className="ab-section">
        <div className="ab-card craft-paper craft-paper--warm craft-tilt reveal" style={{ '--rot': '-0.5deg', marginBottom: 0 } as CSSProperties}>
          <span className="craft-tape craft-tape--cream" aria-hidden="true" />
          <h2 className="ab-card-h2">「使える学び」で武器に変える</h2>
          <Underline variant={3} className="ab-card-line craft-draw" style={{ color: 'var(--cream)' }} />

          <div className="ab-tags" aria-hidden="true">
            {[
              { label: '学習力', color: 'var(--brand)' },
              { label: '横断的な学び', color: 'var(--green)' },
              { label: '実践', color: 'var(--pink)' }
            ].map((tag, i) => (
              <span key={i} className="ab-tag">
                <span className="ab-tag-dot" style={{ background: tag.color }}></span>
                {tag.label}
              </span>
            ))}
          </div>

          <ul className="mb-6">
            <li>学力より<strong className="emphasis">学習力</strong>を。</li>
            <li>専門だけでなく、<br/><strong className="emphasis">好奇心から広がる横断的な学び</strong>を。</li>
            <li>知識の獲得を目指す生徒から、<br/><strong className="emphasis">知識を実社会で活用できる「学習者」</strong>へ。</li>
          </ul>
          <p className="ab-quote">
            正解が一つではない今の社会で、<br/>
            自分を知り、社会を知り、異年齢の仲間と協働し、<strong className="emphasis">社会に出る前に実践できる場</strong>。<br/>
            ——そんな実践力を磨くスクールです！
          </p>
        </div>
      </Section>
    </MobileContainer>
  );
}
