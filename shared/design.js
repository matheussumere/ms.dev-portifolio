(() => {
  const nav = document.querySelector('body > nav:not(.categories)');
  // Add mobile navigation where the model only had desktop links.
  if (nav && !nav.querySelector('#nav-hamburger, #nav-toggle')) {
    const links = nav.querySelector('.nav-links, .nav-center');
    if (links) {
      const toggle = document.createElement('button');
      toggle.type = 'button'; toggle.className = 'nav-hamburger'; toggle.id = 'nav-hamburger';
      toggle.setAttribute('aria-label', 'Abrir menu');
      toggle.innerHTML = '<span></span><span></span><span></span>';
      const drawer = document.createElement('div');
      drawer.className = 'nav-drawer'; drawer.id = 'nav-drawer';
      links.querySelectorAll('a').forEach(link => drawer.append(link.cloneNode(true)));
      const back = document.createElement('a');
      back.className = 'drawer-back'; back.href = '../'; back.textContent = '← Portfólio';
      drawer.append(back); nav.append(toggle); nav.after(drawer);
    }
  }
  if (document.documentElement.dataset.site === 'give-beauty') {
    document.getElementById('nav-links').dataset.mobileMenu = '';
  }

  // Local SVGs replace decorative emoji and the remote icon font.
  const icons = [
    '<path d="m14 6 4-4 4 4-4 4-4-4Zm-2 2-8 8a3 3 0 0 0 4 4l8-8M5 17l2 2"/>',
    '<path d="M8 3v6m8-6v6M5 9h14v3a7 7 0 0 1-14 0V9Zm7 10v3M2 12h3m14 0h3"/>',
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="m6 6 4 4m4 4 4 4m0-12-4 4m-4 4-4 4"/>',
    '<path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z"/>',
    '<path d="M9 19V5l12-2v14M9 5l12-2"/><ellipse cx="5.5" cy="19" rx="3.5" ry="2.5"/><ellipse cx="17.5" cy="17" rx="3.5" ry="2.5"/>',
    '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    '<path d="M3 4h6a4 4 0 0 1 3 1.5A4 4 0 0 1 15 4h6v16h-6a4 4 0 0 0-3 1 4 4 0 0 0-3-1H3V4Zm9 2v15"/>',
    '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
    '<path d="M9 3c-5-1-7 4-5 8 2 3 1 9 4 10 2 0 1-7 4-7s2 7 4 7c3-1 2-7 4-10 2-4 0-9-5-8-2 1-4 1-6 0Z"/>',
  ];
  const svg = path => `<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${path}</svg>`;
  const refreshIcons = () => {
    document.querySelectorAll('.svc-icon,.specialty-icon,.treatment-icon,.service-icon,.min-icon,.fa-whatsapp').forEach((element, index) => {
      if (element.querySelector('svg')) return;
      const content = element.textContent;
      let icon = icons[7];
      if (element.classList.contains('svc-icon') && document.documentElement.dataset.site === 'oficina') icon = icons[index % 4];
      if (element.classList.contains('specialty-icon') || element.classList.contains('treatment-icon')) icon = icons[8];
      if (element.classList.contains('service-icon')) icon = '<path d="m14 3 7 7-9 9H5v-7l9-9Zm-8 9 6 6M3 21l2-2m9-15 6 6"/>';
      if (content.includes('🦷')) icon = icons[8];
      if (content.includes('⚡')) icon = icons[3];
      if (content.includes('🎵')) icon = icons[4];
      if (content.includes('📖')) icon = icons[6];
      if (element.classList.contains('fa-whatsapp')) icon = '<path d="M21 11.5A8.5 8.5 0 0 1 8.4 19L3 21l2-5.4A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8 8c0 4 2 6 6 7l2-2-2-1-1 1-2-2 1-1-1-2H8Z"/>';
      element.innerHTML = svg(icon);
    });
  };
  refreshIcons();
  const observer = new MutationObserver(refreshIcons);
  document.querySelectorAll('.services-grid,.specialties-grid,.treatments-grid').forEach(container => observer.observe(container, { childList: true }));
})();
