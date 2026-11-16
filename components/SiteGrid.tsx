import { Nav } from './Nav';
import { RightRail } from './RightRail';
import { Header } from './Header';
import { Footer } from './Footer';
import { ReserveCTA } from './ReserveCTA';
import { RevealObserver } from './RevealObserver';

// ?embed=true のとき <html data-embed> を付け、枠（ヘッダー/ナビ/フッター/CTA）を CSS で隠す。
// useSearchParams を使うとページ全体がクライアント描画に落ち、本文と JSON-LD が
// HTML に出なくなる（検索・AIクローラが読めない）ため、描画前に走るインラインスクリプトで判定する。
const EMBED_SCRIPT =
  "try{if(new URLSearchParams(location.search).get('embed')==='true')document.documentElement.setAttribute('data-embed','')}catch(e){}";

// サーバーコンポーネント。children（ページ本文）はサーバーで HTML に描画される。
export function SiteGrid({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: EMBED_SCRIPT }} />
      <RevealObserver />

      {/* Mobile Header (1280px未満で表示) */}
      <div className="xl:hidden site-chrome">
        <Header />
      </div>

      {/* Main Grid Layout (1280px以上で適用。スタイルは globals.css が単一ソース) */}
      <div className="site-grid">

        {/* Left Sidebar (PC Navigation) */}
        <aside className="site-left site-chrome">
          <div className="site-left-scroll">
            <Nav />
          </div>
        </aside>

        {/* Main Content */}
        <div className="site-main">
          {children}
        </div>

        {/* Right Sidebar (Icons) */}
        <aside className="site-right account-icons site-chrome">
          <RightRail />
        </aside>
      </div>

      {/* Footer（モバイル・PC共通。机の端のクラフト紙帯） */}
      <div className="site-chrome">
        <Footer />
      </div>

      {/* CVゴール（無料体験・個別相談の予約）への常駐CTA */}
      <div className="site-chrome">
        <ReserveCTA />
      </div>
    </>
  );
}
