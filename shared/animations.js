// Contador animado para elementos .stat-number
function animateCounter(el) {
  const target = parseFloat(el.textContent.replace(/[^0-9.]/g, ''));
  const suffix = el.textContent.replace(/[0-9.]/g, '');
  const duration = 1400;
  const start = performance.now();
  const isFloat = el.textContent.includes('.');

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = isFloat ? (target * ease).toFixed(1) : Math.floor(target * ease);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));
