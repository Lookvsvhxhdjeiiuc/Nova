export function initMenu() {
  const openBtn = document.getElementById('menu-open');
  const closeBtn = document.getElementById('menu-close');
  const panel = document.getElementById('mobile-menu-panel');
  if (!openBtn || !closeBtn || !panel) return;

  const links = panel.querySelectorAll('a');

  function openMenu() {
    panel.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    panel.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  links.forEach((link) => link.addEventListener('click', closeMenu));
}
