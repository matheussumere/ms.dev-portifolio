(function () {
  const form = document.getElementById('quote-form');
  const templateSelect = document.getElementById('quote-template');
  const grid = document.getElementById('demo-grid');
  const knownTemplates = new Set([...templateSelect.options].map(option => option.value).filter(Boolean));
  let company = { whatsapp: '5519978075689' };
  let category = 'all';
  let source = 'portfolio';
  const queryTemplate = new URLSearchParams(location.search).get('template');
  if (knownTemplates.has(queryTemplate)) { templateSelect.value = queryTemplate; source = 'demo'; }

  function filterDemos() {
    let count = 0;
    grid.querySelectorAll('.demo-card').forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
      if (!card.hidden) count++;
    });
    document.getElementById('demo-count').textContent = `${count} ${count === 1 ? 'modelo disponível' : 'modelos disponíveis'}`;
  }
  document.querySelector('.demo-filters').hidden = false;
  document.querySelectorAll('.demo-filters button').forEach(button => button.addEventListener('click', () => {
    category = button.dataset.category;
    document.querySelectorAll('.demo-filters button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    filterDemos();
  }));

  document.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    const demo = link.dataset.demoOpen || link.closest('.demo-card')?.dataset.template;
    if (link.dataset.quoteTemplate) {
      event.preventDefault();
      templateSelect.value = link.dataset.quoteTemplate;
      source = 'demo';
      history.replaceState(null, '', `?template=${encodeURIComponent(templateSelect.value)}#cotacao`);
      document.getElementById('cotacao').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      document.getElementById('quote-name').focus({ preventScroll: true });
      window.trackContactEvent?.('quote_intent', { template: templateSelect.value, source });
    } else if (demo) {
      window.trackContactEvent?.('demo_open', { template: demo, source: 'portfolio' });
    } else if (link.hasAttribute('data-company-whatsapp') || link.hasAttribute('data-company-email')) {
      window.trackContactEvent?.('contact_click', { channel: link.hasAttribute('data-company-email') ? 'email' : 'whatsapp', source: 'portfolio' });
    } else if (link.getAttribute('href') === '#cotacao') {
      window.trackContactEvent?.('quote_intent', { source: 'portfolio' });
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    const feedback = document.getElementById('quote-feedback');
    feedback.hidden = false;
    if (!/^\d{10,15}$/.test(company.whatsapp)) {
      feedback.textContent = 'O contato está indisponível. Use o e-mail ao lado para falar sobre seu projeto.';
      return;
    }
    const service = form.elements.service.selectedOptions[0].textContent;
    const template = templateSelect.selectedOptions[0].textContent;
    const message = [`Olá! Gostaria de uma cotação com a ${company.name || 'ms.dev'}.`, '', `Nome: ${data.name.trim()}`, `Negócio: ${data.business.trim()}`, `Segmento: ${data.segment.trim()}`, `Serviço: ${service}`, `Modelo: ${template}`, `Prazo: ${data.deadline}`, data.details.trim() ? `Detalhes: ${data.details.trim()}` : ''].filter((line, index) => line || index === 1).join('\n');
    const url = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
    const continuation = document.getElementById('quote-continue');
    continuation.href = url;
    continuation.hidden = false;
    feedback.textContent = 'Sua mensagem está pronta. Confirme o envio no WhatsApp. Se a janela não abriu, use o link abaixo.';
    window.trackContactEvent?.('quote_whatsapp_click', { template: data.template || 'none', service: data.service, source });
    window.open(url, '_blank', 'noopener,noreferrer');
  });
  document.getElementById('quote-continue').addEventListener('click', () => window.trackContactEvent?.('contact_click', { channel: 'whatsapp', source: 'quote_retry' }));
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  // CMS values are inserted as text, never interpreted as HTML.
  fetch('content/site.json').then(response => {
    if (!response.ok) throw new Error('Configuração indisponível');
    return response.json();
  }).then(site => {
    company = site.company;
    window.configureAnalytics?.(site.analytics);
    window.trackContactEvent?.('pageview');
    document.querySelectorAll('[data-company-name]').forEach(node => {
      if (node.textContent !== company.name) node.textContent = company.name;
    });
    document.querySelector('[data-company-description]').textContent = company.description;
    document.querySelectorAll('[data-company-whatsapp]').forEach(link => {
      if (/^\d{10,15}$/.test(company.whatsapp)) link.href = 'https://wa.me/' + company.whatsapp;
      link.textContent = company.phone;
    });
    document.querySelectorAll('[data-company-email]').forEach(link => {
      link.href = 'mailto:' + encodeURIComponent(company.email);
      link.textContent = company.email;
    });
    for (const demo of site.demos) {
      if (!knownTemplates.has(demo.id)) continue;
      const card = [...grid.children].find(node => node.dataset.template === demo.id);
      if (!card) continue;
      card.dataset.category = demo.category;
      card.querySelector('h3').textContent = demo.name;
      card.querySelector('p').textContent = demo.description;
      card.querySelector('.demo-category').textContent = demo.category_label;
      const image = card.querySelector('img');
      if (/^(assets\/|\/uploads\/)/.test(demo.preview) && !demo.preview.includes('..')) image.src = demo.preview;
      image.alt = 'Prévia do modelo ' + demo.name;
      card.querySelector('.demo-preview').setAttribute('aria-label', 'Abrir demonstração: ' + demo.name);
      [...templateSelect.options].find(option => option.value === demo.id).textContent = demo.name;
    }
    filterDemos();
  }).catch(() => {
    // Static HTML retains a usable catalog and company contact if JSON cannot load.
    console.warn('Não foi possível atualizar o catálogo. Exibindo a versão padrão.');
  });
})();
