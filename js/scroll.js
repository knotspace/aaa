// Lightweight native replacement for the former jQuery scroll helpers.
(() => {
  const button = document.querySelector('.scroll');
  if (button) {
    button.style.display = 'none';
    button.style.opacity = '0';
    button.style.transition = 'opacity .18s ease';
    let visible = false;
    const update = () => {
      const next = window.scrollY >= 300;
      if (next === visible) return;
      visible = next;
      button.style.display = next ? 'block' : 'none';
      requestAnimationFrame(() => { button.style.opacity = next ? '1' : '0'; });
      button.classList.toggle('scroll-show', next);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (id === '#') { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const target = document.querySelector(id);
    if (target) { event.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
})();
