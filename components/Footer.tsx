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
        
        <p className="copy">© CLAFT</p>
      </div>
    </footer>
  );
}