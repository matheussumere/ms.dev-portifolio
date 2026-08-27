// Dynamic Content Loader - Carrega dados do JSON e renderiza dinamicamente
// Reduz duplicação de código e facilita manutenção

class PortfolioManager {
  constructor(dataUrl = './data.json') {
    this.dataUrl = dataUrl;
    this.data = null;
  }

  async loadData() {
    try {
      const response = await fetch(this.dataUrl);
      if (!response.ok) throw new Error('Falha ao carregar dados');
      this.data = await response.json();
      return this.data;
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Retorna dados vazios para não quebrar o site
      return null;
    }
  }

  renderGallery() {
    if (!this.data?.portfolio) return;
    
    const gallery = document.querySelector('.gallery-grid');
    if (!gallery) return;

    // Limpar galeria existente
    gallery.innerHTML = '';

    this.data.portfolio.forEach((item, index) => {
      const element = document.createElement('div');
      element.className = 'gallery-item';
      element.dataset.before = item.before;
      element.dataset.after = item.after;
      element.innerHTML = `
        <img src="${item.image}" alt="Serviço ${item.title}" loading="lazy">
        <div class="gallery-overlay">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      `;
      gallery.appendChild(element);
    });
  }

  renderBlogCards() {
    if (!this.data?.blog) return;

    const blog = document.querySelector('.blog-grid');
    if (!blog) return;

    blog.innerHTML = '';

    this.data.blog.forEach((post) => {
      const element = document.createElement('div');
      element.className = 'blog-card';
      element.innerHTML = `
        <div class="blog-image">
          <img src="${post.image}" alt="${post.title}" loading="lazy">
        </div>
        <div class="blog-content">
          <span class="blog-category">${post.category}</span>
          <h3>${post.title}</h3>
          <p class="blog-excerpt">${post.excerpt}</p>
          <div class="blog-meta">
            <span>${post.readTime} leitura</span>
            <a href="#" class="blog-read-more" data-post-id="${post.id}">Ler mais →</a>
          </div>
        </div>
      `;
      blog.appendChild(element);

      // Evento para "ler mais"
      element.querySelector('.blog-read-more').addEventListener('click', (e) => {
        e.preventDefault();
        this.openBlogPost(post);
      });
    });
  }

  renderBrands() {
    if (!this.data?.brands) return;

    const brands = document.querySelector('.brands-grid');
    if (!brands) return;

    brands.innerHTML = '';

    this.data.brands.forEach((brand) => {
      const element = document.createElement('div');
      element.className = 'brand-card';
      element.innerHTML = `
        <div class="brand-icon">${brand.icon}</div>
        <h3>${brand.name}</h3>
        <p class="brand-models">${brand.models.join(', ')}</p>
        <p style="font-size: 0.8rem; color: var(--color-accent); margin-top: 0.75rem;">${brand.specialty}</p>
      `;
      brands.appendChild(element);
    });
  }

  renderTestimonials() {
    if (!this.data?.testimonials) return;

    const testimonials = document.querySelector('.test-grid');
    if (!testimonials) return;

    testimonials.innerHTML = '';

    this.data.testimonials.forEach((testimonial) => {
      const element = document.createElement('div');
      element.className = 'test-card';
      element.innerHTML = `
        <div class="test-quote">"</div>
        <p class="test-text">${testimonial.text}</p>
        <div class="test-author">
          ${testimonial.author} — ${testimonial.model}
          <div style="font-size: 0.7rem; color: var(--color-accent); margin-top: 0.3rem;">
            ${'⭐'.repeat(testimonial.rating)}
          </div>
        </div>
      `;
      testimonials.appendChild(element);
    });
  }

  openBlogPost(post) {
    // Criar modal ou redirecionar para página de blog
    const modal = document.getElementById('modal-overlay');
    if (!modal) return;

    // Criar conteúdo do blog
    const blogContent = document.createElement('div');
    blogContent.style.cssText = 'background: white; padding: 3rem; border-radius: 4px; max-height: 80vh; overflow-y: auto;';
    blogContent.innerHTML = `
      <button style="float: right; background: none; border: none; font-size: 2rem; cursor: pointer;">✕</button>
      <h2 style="font-family: 'Barlow Condensed', sans-serif; font-size: 2rem; margin-bottom: 0.5rem;">${post.title}</h2>
      <p style="color: var(--color-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">
        Por ${post.author} • ${post.date} • ${post.readTime}
      </p>
      <div style="color: var(--color-muted); line-height: 1.8; white-space: pre-wrap;">
        ${post.content}
      </div>
    `;

    // Substituir conteúdo do modal
    const modalContent = modal.querySelector('.modal');
    const oldContent = modalContent.querySelectorAll('.modal-tabs, .tab-panel');
    oldContent.forEach(el => el.style.display = 'none');
    
    // Adicionar button de fechar
    blogContent.querySelector('button').addEventListener('click', () => {
      oldContent.forEach(el => el.style.display = '');
      blogContent.remove();
    });

    modalContent.appendChild(blogContent);
  }

  async init() {
    const data = await this.loadData();
    if (!data) {
      console.warn('Usando conteúdo estático - dados não carregados');
      return;
    }

    this.renderGallery();
    this.renderBlogCards();
    this.renderBrands();
    this.renderTestimonials();
  }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const manager = new PortfolioManager('./data.json');
  manager.init().catch(error => {
    console.error('Erro ao inicializar PortfolioManager:', error);
  });
});
