import Link from 'next/link';

export function Footer() {
  return (
    <footer className="c-footer">
      <div className="footer-content">
        <div className="brand">
          <img src="/assets/images/common/logo.png" alt="CLAFT" />
        </div>
        
        <nav className="f-links">
          <a href="https://www.instagram.com/keepon.labo" target="_blank" rel="noopener">Instagram</a>
          <span className="sep">/</span>
          <a href="https://note.com/yononaka_career" target="_blank" rel="noopener">note</a>
          <span className="sep">/</span>
          <a href="https://www.youtube.com/@CLAFT-keepon" target="_blank" rel="noopener">YouTube</a>
        </nav>

        <nav className="f-links">
          <Link href="/company">運営会社</Link>
          <span className="sep">/</span>
          <Link href="/privacy">プライバシーポリシー</Link>
          <span className="sep">/</span>
          <Link href="/tokushoho">特定商取引法に基づく表記</Link>
        </nav>

        <p className="copy">© CLAFT（運営：キープオン株式会社）</p>
      </div>
    </footer>
  );
}