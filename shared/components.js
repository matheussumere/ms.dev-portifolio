// =============================================
// WHITE LABEL — Agendamento + Contato (EmailJS)
// Config: defina WL_CONFIG antes de carregar este script
// =============================================

// Exemplo de config por página:
// window.WL_CONFIG = {
//   emailjs_public_key: 'SUA_PUBLIC_KEY',
//   emailjs_service_id: 'service_xxx',
//   emailjs_schedule_template: 'template_agendamento',
//   emailjs_contact_template: 'template_contato',
//   business_name: 'Nome do Negócio',
//   whatsapp: '5511999999999',
// }

document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.WL_CONFIG || {};

  // Inicializa EmailJS se a chave estiver configurada
  if (cfg.emailjs_public_key && window.emailjs) {
    emailjs.init(cfg.emailjs_public_key);
  }

  // ── Modal ──────────────────────────────────
  const overlay = document.getElementById('modal-overlay');
  const openBtns = document.querySelectorAll('[data-modal-open]');
  const closeBtn = document.getElementById('modal-close');

  openBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    const tab = btn.dataset.modalOpen || 'schedule';
    switchTab(tab);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }));

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay?.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // ── Tabs ───────────────────────────────────
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

  function switchTab(name) {
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === `tab-${name}`));
  }

  // ── Agendamento ────────────────────────────
  const scheduleForm = document.getElementById('form-schedule');
  scheduleForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = scheduleForm.querySelector('.btn-submit');
    const feedback = document.getElementById('feedback-schedule');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    const data = Object.fromEntries(new FormData(scheduleForm));

    try {
      if (cfg.emailjs_service_id && cfg.emailjs_schedule_template && window.emailjs) {
        await emailjs.send(cfg.emailjs_service_id, cfg.emailjs_schedule_template, {
          ...data,
          business_name: cfg.business_name || '',
        });
      } else {
        // Fallback: abre WhatsApp com os dados
        const msg = `Olá! Gostaria de agendar:\n\nNome: ${data.name}\nTelefone: ${data.phone}\nServiço: ${data.service}\nData: ${data.date}\nHorário: ${data.time}`;
        window.open(`https://wa.me/${cfg.whatsapp || ''}?text=${encodeURIComponent(msg)}`, '_blank');
      }
      showFeedback(feedback, 'success', '✓ Agendamento enviado! Entraremos em contato para confirmar.');
      scheduleForm.reset();
    } catch {
      showFeedback(feedback, 'error', 'Erro ao enviar. Tente pelo WhatsApp.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Confirmar agendamento';
    }
  });

  // ── Contato ────────────────────────────────
  const contactForm = document.getElementById('form-contact');
  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    const feedback = document.getElementById('feedback-contact');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    const data = Object.fromEntries(new FormData(contactForm));

    try {
      if (cfg.emailjs_service_id && cfg.emailjs_contact_template && window.emailjs) {
        await emailjs.send(cfg.emailjs_service_id, cfg.emailjs_contact_template, {
          ...data,
          business_name: cfg.business_name || '',
        });
      } else {
        const msg = `Olá! Mensagem via site:\n\nNome: ${data.name}\nE-mail: ${data.email}\nMensagem: ${data.message}`;
        window.open(`https://wa.me/${cfg.whatsapp || ''}?text=${encodeURIComponent(msg)}`, '_blank');
      }
      showFeedback(feedback, 'success', '✓ Mensagem enviada! Responderemos em breve.');
      contactForm.reset();
    } catch {
      showFeedback(feedback, 'error', 'Erro ao enviar. Tente pelo WhatsApp.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Enviar mensagem';
    }
  });

  function showFeedback(el, type, msg) {
    if (!el) return;
    el.className = `form-feedback ${type} show`;
    el.textContent = msg;
    setTimeout(() => el.classList.remove('show'), 5000);
  }
});
