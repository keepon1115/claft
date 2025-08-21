// Hamburger / Drawer
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
  hamburgerBtn.classList.toggle('active');
  sideMenu.classList.toggle('active');
  menuOverlay.classList.toggle('active');
  document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : '';
}
function closeMenu() {
  hamburgerBtn.classList.remove('active');
  sideMenu.classList.remove('active');
  menuOverlay.classList.remove('active');
  document.body.style.overflow = '';
}
hamburgerBtn?.addEventListener('click', toggleMenu);
menuOverlay?.addEventListener('click', closeMenu);
sideMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && sideMenu?.classList.contains('active')) closeMenu(); });

// Side sub (SP: tap to open)
sideMenu?.querySelectorAll('.has-sub > a').forEach(a=>{
  a.addEventListener('click', (e)=>{
    if (window.innerWidth <= 980) { e.preventDefault(); a.parentElement.classList.toggle('open'); }
  });
});
