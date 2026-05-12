const themes = [
  { id: 'light',  label: 'Claro',  dot: '#f5f5f0', border: '#ccc' },
  { id: 'dark',   label: 'Escuro', dot: '#111110', border: '#444' },
  { id: 'summer', label: 'Verão',  dot: '#ff6b35', border: '#ff6b35' },
  { id: 'winter', label: 'Inverno',dot: '#7eb8d4', border: '#7eb8d4' },
];

function applyTheme(id) {
  document.documentElement.dataset.theme = id === 'light' ? '' : id;
  document.querySelectorAll('.theme-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.theme === id)
  );
  localStorage.setItem('theme', id);
}

document.addEventListener('DOMContentLoaded', () => {
  // Monta o switcher
  const switcher = document.createElement('div');
  switcher.className = 'theme-switcher';
  switcher.innerHTML = `
    <div class="theme-options" id="theme-options">
      ${themes.map(t => `
        <button class="theme-btn" data-theme="${t.id}">
          <span class="theme-dot" style="background:${t.dot};border-color:${t.border}"></span>
          ${t.label}
        </button>`).join('')}
    </div>
    <button class="theme-switcher-toggle" id="theme-toggle">🎨 Tema</button>
  `;
  document.body.appendChild(switcher);

  // Toggle menu
  document.getElementById('theme-toggle').addEventListener('click', () => {
    document.getElementById('theme-options').classList.toggle('open');
  });

  // Aplica tema ao clicar
  switcher.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyTheme(btn.dataset.theme);
      document.getElementById('theme-options').classList.remove('open');
    });
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!switcher.contains(e.target))
      document.getElementById('theme-options').classList.remove('open');
  });

  // Restaura tema salvo
  applyTheme(localStorage.getItem('theme') || 'light');
});
