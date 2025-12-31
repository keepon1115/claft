import { MobileContainer, Section } from '@/components/MobileContainer';

export const metadata = { 
  title: 'ワークショップ | CLAFT',
  description: '体験ワークショップと出前授業のご案内。左サイドメニューから各セクションへ移動できます。'
};

export default function WorkshopPage(){
  return (
    <MobileContainer className="px-0">
      <div className="px-4">
        {/* Section 1: 体験ワークショップ */}
        <Section id="trial" className="scroll-mt-20">
          <h1 className="heading-md mb-1.5">
            体験ワークショップ
          </h1>
          <p className="text-[var(--ink-500)] mb-4">
            CLAFTでは、オンラインだけでなく対面でのワークショップも行っています。<br/>
            全国の子どもたちに「教科書や教室の中だけでは得られない自由な学び」を届け、体験を通じて好奇心をくすぐることを目的としています。
          </p>
          
          <figure className="aspect-video rounded-2xl overflow-hidden shadow-md bg-gray-100 my-6">
            <img 
              src="/assets/workshop/kv.jpg" 
              alt="体験ワークショップの様子"
              className="w-full h-full object-cover block"
              loading="lazy"
            />
          </figure>

          <p className="mb-4">
            子どもゆめ基金をご存知でしょうか？<br/>
            「子どもゆめ基金」は、国と民間が協力して、未来を担う子どもたちの健全な育成を支援するために設けられた基金です。民間団体が実施する自然体験・科学実験・読書活動など、さまざまな取り組みを応援し、子どもたちの夢や社会性を育むことを目的としています。
          </p>

          <div className="text-center my-5">
            <a 
              className="btn btn-ghost inline-block py-3 px-4 rounded-full font-bold border border-black/[0.08] bg-white text-[var(--ink-700)] no-underline hover:shadow-lg transition-shadow"
              href="https://yumekikin.niye.go.jp/" 
              target="_blank" 
              rel="noopener"
            >
              子どもゆめ基金についてはこちら
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <article className="bg-white border border-black/[0.06] rounded-2xl shadow-md p-4">
              <h3 className="heading-sm my-1">
                こども舞台工房（演劇体験）
              </h3>
              <figure className="aspect-video rounded-2xl overflow-hidden shadow-md bg-gray-100 mb-10">
                <img 
                  src="/assets/workshop/stage.jpg" 
                  alt="こども舞台工房のイメージ"
                  className="w-full h-full object-cover block"
                  loading="lazy"
                />
              </figure>
              <p className="text-[var(--ink-700)] my-2">
                <strong>キャッチコピー:</strong> 自分を表現するチカラをみがく演劇体験
              </p>
              <ul className="m-0 pl-5">
                <li>対象：小学4年生〜高校3年生</li>
                <li>定員：10名（申込先着順）</li>
                <li>参加費：無料（令和7年度 子どもゆめ基金 助成事業）</li>
                <li>日程：2025年11月〜2026年3月（全6回）</li>
                <li>場所：株式会社アーテック（八尾市北亀井町3-2-21）</li>
              </ul>
              <div className="flex flex-wrap gap-2.5 mt-2">
                <a 
                  className="btn btn-primary inline-block py-3 px-4 rounded-full font-bold bg-[var(--brand)] text-white no-underline hover:shadow-lg transition-shadow"
                  href="https://forms.gle/3nA5yWDz8LgSZY4L7" 
                  target="_blank" 
                  rel="noopener"
                >
                  申込詳細はこちら
                </a>
              </div>
            </article>

            <article className="bg-white border border-black/[0.06] rounded-2xl shadow-md p-4">
              <h3 className="heading-sm my-1">
                未来を動かす！ロボットづくり（ロボプロ体験）
              </h3>
              <figure className="aspect-video rounded-2xl overflow-hidden shadow-md bg-gray-100 mb-10">
                <img 
                  src="/assets/workshop/robo.jpg" 
                  alt="ロボプロ体験のイメージ"
                  className="w-full h-full object-cover block"
                  loading="lazy"
                />
              </figure>
              <p className="text-[var(--ink-700)] my-2">
                <strong>キャッチコピー:</strong> ロボットをつくって、動かす楽しさを体験
              </p>
              <ul className="m-0 pl-5">
                <li>対象：小学4年生〜中学3年生</li>
                <li>定員：10名（申込先着順）</li>
                <li>参加費：無料（令和7年度 子どもゆめ基金 助成事業）</li>
                <li>日程：2025年10月〜2026年3月（全6回）</li>
                <li>場所：キープオンラボ（アリオ近く）</li>
              </ul>
              <div className="flex flex-wrap gap-2.5 mt-2">
                <a 
                  className="btn btn-primary inline-block py-3 px-4 rounded-full font-bold bg-[var(--brand)] text-white no-underline hover:shadow-lg transition-shadow"
                  href="https://forms.gle/r2uNYt8E5Yrs5v3KA" 
                  target="_blank" 
                  rel="noopener"
                >
                  申込詳細はこちら
                </a>
              </div>
            </article>
          </div>
        </Section>

        {/* Section 2: 出前授業 */}
        <Section id="delivery" className="scroll-mt-20">
          <h1 className="heading-md mb-1.5">
            出前授業
          </h1>
          <p className="text-[var(--ink-500)] mb-4">
            ロボットプログラミング教室を10年間運営し、200名以上の受講生が学んできた「キープオン」が主催します。
          </p>
          
          <div className="my-6">
            <a 
              className="btn btn-primary inline-block py-3 px-4 rounded-full font-bold bg-[var(--brand)] text-white no-underline hover:shadow-lg transition-shadow"
              href="https://www.keeponlearning.fun/company-group" 
              target="_blank" 
              rel="noopener"
            >
              キープオンのページを見る
            </a>
          </div>

          <ul className="m-0 pl-5">
            <li>ロボットを動かしながら学ぶ「ロボットプログラミング」</li>
            <li>正解がひとつでない問いに取り組むアクティブラーニング「Yononaka」</li>
            <li>ほか、工作・AI・ゲームプログラミングなど、子どもの好奇心をくすぐるプログラムを提供します。</li>
          </ul>

          <p className="font-bold py-3 px-4 rounded-xl bg-[rgba(52,198,190,0.12)] my-4">
            ワーク内容は依頼者に合わせてカスタマイズ可能です！
          </p>

          <h3 className="heading-sm mt-3.5">
            実績（例示）
          </h3>

          <div className="my-6">
            <div className="bg-blue-500 text-white text-center py-4 px-4 rounded-xl font-extrabold text-xl shadow-md">
              多くの企業さんから実績をいただいております
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="bg-[#f6f7fb] border border-black/[0.06] rounded-[20px] py-4 px-5 shadow-lg">
                <h4 className="heading-sm my-2">
                  — 単発・ワークショップとして —
                </h4>
                <ul className="m-0 pl-5">
                  <li>地域コミュニティ（曙川）</li>
                  <li>スクール（わんだーらぼさん）</li>
                  <li>本屋（TSUTAYA リノアス八尾さん）</li>
                </ul>
              </div>

              <div className="bg-[#f6f7fb] border border-black/[0.06] rounded-[20px] py-4 px-5 shadow-lg">
                <h4 className="heading-sm my-2">
                  — 短期講座として・授業として（1〜3年）—
                </h4>
                <ul className="m-0 pl-5">
                  <li>学童（明光キッズさん）</li>
                  <li>ショップ（ABCクラフトさん）</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 justify-center mt-3.5">
              <a 
                className="btn btn-ghost inline-block py-3 px-4 rounded-full font-bold border border-black/[0.08] bg-white text-[var(--ink-700)] no-underline hover:shadow-lg transition-shadow"
                href="https://www.keeponlearning.fun/company-group" 
                target="_blank" 
                rel="noopener"
              >
                詳細はこちら
              </a>
            </div>
          </div>
        </Section>
      </div>
    </MobileContainer>
  );
}
