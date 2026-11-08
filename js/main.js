const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 10);
});

const menuToggle = document.getElementById('menuToggle');
const mobilePanel = document.getElementById('mobilePanel');
const panelClose = document.getElementById('panelClose');
const pageOverlay = document.getElementById('pageOverlay');

function openMenu() {
  mobilePanel?.classList.add('open');
  pageOverlay?.classList.add('show');
  menuToggle?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobilePanel?.classList.remove('open');
  pageOverlay?.classList.remove('show');
  menuToggle?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

menuToggle?.addEventListener('click', openMenu);
panelClose?.addEventListener('click', closeMenu);
pageOverlay?.addEventListener('click', closeMenu);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
