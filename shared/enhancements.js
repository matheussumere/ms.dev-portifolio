(function () {
  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Nav scroll effect
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
  }

  // Parallax hero-bg
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      heroBg.style.transform = `scale(1.08) translateY(${window.scrollY * 0.22}px)`;
    }, { passive: true });
  }

  // Hamburger menu
  const hamburger = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('nav-drawer');
  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      drawer.classList.toggle('open');
      document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
})();
