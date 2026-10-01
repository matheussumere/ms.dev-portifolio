(() => {
  const themes = [
    { id: 'original', label: 'Original', dot: '#e4d7be' },
    { id: 'dark', label: 'Escuro', dot: '#242424' },
    { id: 'summer', label: 'Verão', dot: '#b74316' },
    { id: 'winter', label: 'Inverno', dot: '#34677e' },
  ];
  document.addEventListener('DOMContentLoaded', () => {
    const key = 'msdev-theme:' + document.documentElement.dataset.site;
    const switcher = document.createElement('div');
    switcher.className = 'theme-switcher';
    switcher.innerHTML = `<div class="theme-options" id="theme-options" aria-label="Temas disponíveis">
      ${themes.map(theme => `<button type="button" class="theme-btn" data-theme="${theme.id}" aria-pressed="false"><span class="theme-dot" style="background:${theme.dot}"></span>${theme.label}</button>`).join('')}
      </div><button type="button" class="theme-switcher-toggle" id="theme-toggle" aria-expanded="false" aria-controls="theme-options">◐ Aparência</button>`;
    document.body.append(switcher);
    const toggle = switcher.querySelector('#theme-toggle');
    const options = switcher.querySelector('#theme-options');
    const close = () => { options.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
    const apply = id => {
      if (!themes.some(theme => theme.id === id)) id = 'original';
      if (id === 'original') delete document.documentElement.dataset.theme;
      else document.documentElement.dataset.theme = id;
      switcher.querySelectorAll('.theme-btn').forEach(button => {
        button.classList.toggle('active', button.dataset.theme === id);
        button.setAttribute('aria-pressed', String(button.dataset.theme === id));
      });
      try { localStorage.setItem(key, id); } catch { /* Storage may be disabled. */ }
    };
    toggle.addEventListener('click', () => {
      const open = options.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      if (open) options.querySelector('.theme-btn.active').focus();
    });
    switcher.querySelectorAll('.theme-btn').forEach(button => button.addEventListener('click', () => { apply(button.dataset.theme); close(); toggle.focus(); }));
    document.addEventListener('click', event => { if (!switcher.contains(event.target)) close(); });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && options.classList.contains('open')) { close(); toggle.focus(); }
    });
    let saved;
    try { saved = localStorage.getItem(key); } catch { /* Use original palette. */ }
    apply(saved || 'original');
  });
})();
