document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(element => { element.classList.add('reveal-pending'); observer.observe(element); });
  } else document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
  const nav = document.querySelector('body > nav:not(.categories)');
  if (nav) {
    const update = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }
  const hamburger = document.querySelector('#nav-hamburger, #nav-toggle');
  const drawer = document.querySelector('#nav-drawer, [data-mobile-menu]');
  if (!hamburger || !drawer) return;
  hamburger.setAttribute('aria-controls', drawer.id);
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Abrir menu');
  const setOpen = (open, restoreFocus = false) => {
    hamburger.classList.toggle('open', open);
    drawer.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) drawer.querySelector('a')?.focus();
    else if (restoreFocus) hamburger.focus();
  };
  hamburger.addEventListener('click', () => setOpen(!drawer.classList.contains('open')));
  drawer.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => {
    if (!drawer.classList.contains('open')) return;
    if (event.key === 'Escape') { setOpen(false, true); event.preventDefault(); }
    if (event.key === 'Tab') {
      const links = [...drawer.querySelectorAll('a,button')].filter(element => element.getClientRects().length);
      const first = links[0], last = links.at(-1);
      if (event.shiftKey && document.activeElement === first) { hamburger.focus(); event.preventDefault(); }
      else if (!event.shiftKey && document.activeElement === last) { hamburger.focus(); event.preventDefault(); }
      else if (document.activeElement === hamburger) { (event.shiftKey ? last : first)?.focus(); event.preventDefault(); }
    }
  });
  matchMedia('(max-width: 1024px)').addEventListener('change', event => { if (!event.matches) setOpen(false); });
});
