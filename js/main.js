/* BERGHOFF GmbH – main.js */

// ── Sticky header ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });
header.classList.toggle('scrolled', window.scrollY > 30);

// ── Mobile nav ──
const toggle = document.getElementById('navToggle');
const menu   = document.getElementById('navMenu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h')) || 68;
    window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - offset, behavior: 'smooth' });
  });
});

// ── Scroll fade-in ──
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.value-card, .service-item, .industry-item, .process__step, .about__fact, .about__cap-box'
).forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 4) * 60}ms`;
  io.observe(el);
});

// ── Contact form ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    const orig = btn.textContent;

    let ok = true;
    form.querySelectorAll('[required]').forEach(f => {
      const err = !f.value.trim() || (f.type === 'checkbox' && !f.checked);
      f.style.borderColor = err ? '#dc2626' : '';
      if (err) ok = false;
    });
    if (!ok) return;

    btn.disabled = true;
    btn.textContent = 'Wird gesendet …';

    setTimeout(() => {
      btn.textContent = '✓ Anfrage gesendet – wir melden uns innerhalb von 48 h';
      btn.style.background = '#059669';
      form.reset();
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 5000);
    }, 1000);
  });

  form.querySelectorAll('.form__input').forEach(f => {
    f.addEventListener('input', () => { f.style.borderColor = ''; });
  });
}
