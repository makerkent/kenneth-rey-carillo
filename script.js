const glow = document.querySelector('.cursor-glow');
if (glow && window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
} else if (glow) glow.remove();

document.querySelector('#year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll('.section > *, .interest, .project, .timeline-item').forEach((el, i) => {
  if (!el.classList.contains('reveal')) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity .7s ease ${Math.min(i * .035, .35)}s, transform .7s ease ${Math.min(i * .035, .35)}s`;
    observer.observe(el);
  }
});
