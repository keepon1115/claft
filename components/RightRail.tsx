export function RightRail(){
  return (
    <>
      {/* ロゴ（最上部） */}
      <a href="/" className="rail-logo" aria-label="ホーム">
        <img src="/assets/images/common/logo.png" alt="CLAFT ロゴ" width="160" height="48" />
      </a>

      <hr className="rail-sep" aria-hidden="true" />

      {/* 上段：ユーティリティ */}
      <a href="https://keepon.work/claft-" target="_blank" rel="noopener" aria-label="イベントカレンダー">
        <img src="/assets/img/ico-calendar.svg" alt="" width="24" height="24" />
      </a>
      <a href="https://claft-next.vercel.app/" className="rail-app" target="_blank" rel="noopener" aria-label="アプリを開く">
        <img src="/assets/img/ico-app.svg" alt="" width="24" height="24" />
      </a>
      <a href="/contact" aria-label="無料体験 / お問合せ">
        <img src="/assets/img/ico-form.svg" alt="" width="24" height="24" />
      </a>

      <hr className="rail-sep" aria-hidden="true" />

      {/* 下段：SNS */}
      <a href="https://www.youtube.com/@CLAFT-keepon" target="_blank" rel="noopener" aria-label="YouTube">
        <img src="/assets/img/ico-youtube.svg" alt="" width="24" height="24" />
      </a>
      <a href="https://note.com/yononaka_career" target="_blank" rel="noopener" aria-label="note">
        <img src="/assets/img/ico-note.svg" alt="" width="24" height="24" />
      </a>
      <a href="https://www.instagram.com/keepon.labo/" target="_blank" rel="noopener" aria-label="Instagram">
        <img src="/assets/img/ico-instagram.svg" alt="" width="24" height="24" />
      </a>
      <a href="https://lin.ee/FO7VU9D" target="_blank" rel="noopener" aria-label="LINE">
        <img src="/assets/img/ico-line.svg" alt="" width="24" height="24" />
      </a>
    </>
  );
}
