// Hamburger / Drawer
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
  console.log('toggleMenu called'); // デバッグ用
  hamburgerBtn.classList.toggle('active');
  sideMenu.classList.toggle('active');
  menuOverlay.classList.toggle('active');
  document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : '';
  console.log('sideMenu active:', sideMenu.classList.contains('active')); // デバッグ用
}
function closeMenu() {
  hamburgerBtn.classList.remove('active');
  sideMenu.classList.remove('active');
  menuOverlay.classList.remove('active');
  document.body.style.overflow = '';
}
hamburgerBtn?.addEventListener('click', toggleMenu);
menuOverlay?.addEventListener('click', closeMenu);
// サブメニュー親（.has-sub > a）を除外し、実リンクのみで閉じる
// モバイルSafari等でのスムーススクロール×overflow切替の固着を避けるため、クローズは非同期に行う
sideMenu?.querySelectorAll('li:not(.has-sub) > a, .sub a').forEach(link => {
  link.addEventListener('click', () => {
    try{
      const target = new URL(link.href, location.href);
      const currentNoHash = location.origin + location.pathname + location.search;
      const targetNoHash = target.origin + target.pathname + target.search;
      const isSameDocument = currentNoHash === targetNoHash;
      // 同一ドキュメント内のアンカー移動は即時クローズ、別ページ遷移は少し遅らせる
      setTimeout(closeMenu, isSameDocument ? 0 : 120);
    }catch(_e){ setTimeout(closeMenu, 80); }
  });
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && sideMenu?.classList.contains('active')) closeMenu(); });

// Side sub (tap to open)
sideMenu?.querySelectorAll('.has-sub > a').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const li = a.parentElement;
    // 1回目タップで展開のみ（遷移はさせない）
    if(!li.classList.contains('open')){
      e.preventDefault();
      e.stopImmediatePropagation(); // 同一要素の他のclickリスナー（closeMenu）を抑止
      li.classList.add('open');
      return;
    }
    // 2回目は通常のリンク遷移（メニューはページ遷移で閉じる）
  });
});

// ===== In-page active link highlight for /workshop anchors
document.addEventListener('DOMContentLoaded', () => {
  try{
    const isWorkshop = location.pathname.endsWith('/workshop') || location.pathname.endsWith('/workshop.html');
    if(!isWorkshop) return;
    const sections = [
      { id: 'trial', link: sideMenu?.querySelector('a[href$="#trial"]') },
      { id: 'delivery', link: sideMenu?.querySelector('a[href$="#delivery"]') }
    ].filter(s=>s.link && document.getElementById(s.id));
    if(sections.length === 0) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const found = sections.find(s => s.id === entry.target.id);
        if(!found) return;
        if(entry.isIntersecting){
          sections.forEach(s => s.link.classList.remove('current'));
          found.link.classList.add('current');
        }
      });
    }, { root: null, threshold: 0.55, rootMargin: '-20% 0px -40% 0px' });

    sections.forEach(s => io.observe(document.getElementById(s.id)));
  }catch(_e){ /* no-op */ }
});
