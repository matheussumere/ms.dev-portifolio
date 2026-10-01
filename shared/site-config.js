(function () {
  const base = new URL('../', document.currentScript.src);
  const relative = location.pathname.slice(base.pathname.length).split('/')[0];
  const allowed = new Set(['oficina', 'salao', 'dentista', 'cardapio', 'artista', 'tatuagem', 'templo', 'curriculo', 'loja', 'give-beauty']);
  const getJSON = async path => {
    const response = await fetch(new URL(path, base));
    if (!response.ok) throw new Error('Falha ao carregar configuração');
    return response.json();
  };
  window.WL_READY = Promise.all([getJSON('content/templates.json'), getJSON('content/site.json')]).then(([catalog, site]) => {
    const template = catalog.templates.find(item => item.id === relative);
    if (template) {
      window.WL_CONFIG = { ...template, name: template.business_name };
      if (/^#[0-9a-f]{6}$/i.test(template.accent)) {
        document.documentElement.style.setProperty('--color-accent', template.accent);
        document.documentElement.style.setProperty('--accent', template.accent);
      }
      document.querySelectorAll('[data-site-name]').forEach(node => {
        if (node.dataset.defaultBusiness !== template.business_name) node.textContent = template.business_name;
      });
      document.querySelectorAll('a[href*="wa.me/"]').forEach(link => {
        const url = new URL(link.href);
        if (url.hostname === 'wa.me' && /^\d{10,15}$/.test(template.whatsapp)) {
          url.pathname = '/' + template.whatsapp;
          link.href = url.href;
        }
      });
      document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.href = 'tel:+' + template.whatsapp;
        link.textContent = template.phone;
      });
      if (template.email) document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.href = 'mailto:' + encodeURIComponent(template.email);
        link.textContent = template.email;
      });
    }
    window.configureAnalytics?.(site.analytics);
    window.trackContactEvent?.('pageview');
    if (allowed.has(relative)) {
      const bar = document.createElement('aside');
      bar.className = 'demo-contact';
      bar.setAttribute('aria-label', 'Solicitar este modelo de site');
      const label = document.createElement('span');
      label.textContent = 'Demonstração';
      const link = document.createElement('a');
      link.href = new URL('?template=' + encodeURIComponent(relative) + '#cotacao', base);
      link.textContent = 'Solicitar este modelo';
      link.addEventListener('click', () => window.trackContactEvent?.('quote_intent', { template: relative, source: 'demo' }));
      bar.append(label, link);
      document.body.prepend(bar);
      window.trackContactEvent?.('demo_view', { template: relative });
    }
    return window.WL_CONFIG || {};
  }).catch(() => {
    window.WL_CONFIG = window.WL_CONFIG || {};
    console.warn('Configuração indisponível. Recarregue a página antes de enviar um formulário.');
    return window.WL_CONFIG;
  });
})();
