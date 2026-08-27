// Quote Form Handler com WhatsApp Integration
// Extensão aprimorada do components.js

document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.WL_CONFIG || {};

  // Formulário de orçamento aprimorado
  const quoteForm = document.getElementById('form-quote');
  if (quoteForm) {
    quoteForm.addEventListener('submit', handleQuoteSubmit);
  }

  async function handleQuoteSubmit(e) {
    e.preventDefault();
    const btn = quoteForm.querySelector('.btn-submit');
    const feedback = document.getElementById('feedback-quote');
    
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    const formData = new FormData(quoteForm);
    const data = Object.fromEntries(formData);

    try {
      // Construir mensagem contextualizada
      const message = buildQuoteMessage(data);
      
      // Enviar via WhatsApp
      sendViaWhatsApp(message, cfg.whatsapp);
      
      // Feedback de sucesso
      showFeedback(feedback, 'success', '✓ Orçamento enviado! Responderemos em breve pelo WhatsApp.');
      quoteForm.reset();
      
      // Fechar modal após 2 segundos
      setTimeout(() => {
        const overlay = document.getElementById('modal-overlay');
        overlay?.classList.remove('open');
        document.body.style.overflow = '';
      }, 2000);
      
    } catch (error) {
      console.error('Erro ao enviar orçamento:', error);
      showFeedback(feedback, 'error', '⚠️ Erro ao enviar. Tente pelo WhatsApp ou telefone.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Solicitar orçamento';
    }
  }

  function buildQuoteMessage(data) {
    const timestamp = new Date().toLocaleDateString('pt-BR');
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    const message = `*SOLICITAÇÃO DE ORÇAMENTO - MÜLLER AUTO*

📋 *Dados do Cliente*
Nome: ${data.name}
Telefone: ${data.phone}

🏍️ *Informações da Moto*
Marca: ${data.brand}
Modelo: ${data.model}

🔧 *Descrição do Serviço*
${data.problem}

⏰ *Urgência*
${data.urgency}

📅 Solicitação em: ${timestamp} às ${time}

---
Aguardamos retorno com orçamento detalhado.`;

    return message;
  }

  function sendViaWhatsApp(message, whatsapp) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = whatsapp.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank', 'width=600,height=600');
  }

  function showFeedback(el, type, msg) {
    if (!el) return;
    el.className = `form-feedback ${type} show`;
    el.textContent = msg;
    setTimeout(() => el.classList.remove('show'), 5000);
  }

  // Escuta mudança de marca para sugerir modelos
  const brandSelect = document.getElementById('q-brand');
  const modelInput = document.getElementById('q-model');
  
  if (brandSelect && modelInput) {
    brandSelect.addEventListener('change', () => {
      updateModelSuggestions(brandSelect.value, modelInput);
    });
  }

  function updateModelSuggestions(brand, input) {
    const suggestions = {
      'Honda': ['CB 500F', 'CB 500X', 'CRF 250', 'XRE 300', 'CB 250', 'Hornet'],
      'Yamaha': ['Tenere 700', 'MT-07', 'XJ6', 'Fazer', 'YZF-R3', 'MT-03'],
      'Harley-Davidson': ['Street 500', 'Street 750', 'Softail', 'Touring', 'Sportster'],
      'Suzuki': ['GSX-R', 'V-Strom', 'Bandit', 'SV', 'DL250'],
      'Kawasaki': ['Ninja', 'Z', 'Versys', 'Ninja 400', 'Z125'],
    };

    const models = suggestions[brand] || [];
    if (models.length > 0) {
      input.placeholder = `ex: ${models[0]}`;
      input.setAttribute('data-suggestions', models.join(', '));
    }
  }
});

// Integração com galeria - efeitos hover
document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const before = item.dataset.before;
      const after = item.dataset.after;
      const title = item.querySelector('.gallery-overlay h3')?.textContent;
      
      // Log para analytics (opcional)
      console.log(`Portfolio visualizado: ${title}`);
    });
  });
});
