// Lazy Loading Optimization & Image Performance

class ImageOptimizer {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    // Usar Intersection Observer para lazy loading
    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
    } else {
      // Fallback para browsers antigos
      this.setupFallback();
    }

    // Otimizar imagens já carregadas
    this.optimizeExistingImages();
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px',
      threshold: 0.01
    });

    // Observar todas as imagens com lazy loading
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      this.observer.observe(img);
    });
  }

  setupFallback() {
    // Para browsers sem IntersectionObserver, carregar tudo
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      this.loadImage(img);
    });
  }

  loadImage(img) {
    // Se já tem src, é um lazy load nativo - deixar o navegador carregar
    if (img.src && img.src !== '') return;

    // Se tem data-src, carregar de lá
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }

    // Marcar como carregado
    img.classList.remove('loading');
    img.classList.add('loaded');

    // Fade in effect
    img.style.opacity = '0';
    img.onload = () => {
      img.style.transition = 'opacity 0.3s ease-in';
      img.style.opacity = '1';
    };

    // Handle errors
    img.onerror = () => {
      img.alt = 'Imagem não disponível';
      img.style.opacity = '1';
    };
  }

  optimizeExistingImages() {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      // Adicionar lazy loading nativo se não tiver
      if (!img.loading) {
        img.loading = 'lazy';
      }

      // Garantir que tem alt text
      if (!img.alt) {
        img.alt = 'Müller Auto - Serviço de motos';
      }

      // Adicionar dimensões para melhor performance
      if (img.src && !img.width && !img.height) {
        const dummyImg = new Image();
        dummyImg.onload = () => {
          if (!img.width) img.width = dummyImg.width;
          if (!img.height) img.height = dummyImg.height;
        };
        dummyImg.src = img.src;
      }
    });
  }

  // Pré-carregar imagens críticas (acima da dobra)
  preloadCriticalImages() {
    const criticalImages = document.querySelectorAll('img[data-critical]');
    criticalImages.forEach((img) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = img.src || img.dataset.src;
      document.head.appendChild(link);
    });
  }

  // Gerar srcset para responsive images
  generateSrcSet(url, sizes = [320, 640, 960, 1280]) {
    const base = url.split('?')[0];
    const params = url.includes('?') ? url.split('?')[1] : '';
    
    return sizes.map(size => {
      const separator = params ? '&' : '?';
      return `${base}${separator}w=${size} ${size}w`;
    }).join(', ');
  }

  // Aplicar responsive images a elementos específicos
  applyResponsiveImages() {
    document.querySelectorAll('img[data-responsive]').forEach((img) => {
      if (!img.srcset) {
        img.srcset = this.generateSrcSet(img.src);
        img.sizes = '(max-width: 768px) 100vw, 50vw';
      }
    });
  }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const optimizer = new ImageOptimizer();
  
  // Pré-carregar imagens críticas (hero, etc)
  setTimeout(() => {
    optimizer.preloadCriticalImages();
    optimizer.applyResponsiveImages();
  }, 100);
});

// Monitorar performance
window.addEventListener('load', () => {
  if (window.performance && window.performance.timing) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Tempo de carregamento total: ${pageLoadTime}ms`);
  }
});
