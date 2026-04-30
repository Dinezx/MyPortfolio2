/* ===== LOADER ===== */
window.addEventListener('load', () => {
  setTimeout(() => document.querySelector('.loader-wrap').classList.add('hidden'), 600);
});

/* ===== NAVBAR SCROLL ===== */
const navbar = document.querySelector('.navbar');
const scrollTopBtn = document.querySelector('.scroll-top');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 50);
  scrollTopBtn.classList.toggle('visible', y > 400);

  sections.forEach(sec => {
    const top = sec.offsetTop - 150;
    const id = sec.getAttribute('id');
    if (y >= top && y < top + sec.offsetHeight) {
      navLinks.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) link.classList.add('active');
    }
  });
});

/* ===== MOBILE MENU ===== */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-menu a').forEach(a =>
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  })
);

/* ===== SCROLL REVEAL (Intersection Observer) ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Animate skill bars when visible
      if (entry.target.classList.contains('skill-category')) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ===== SCROLL TO TOP ===== */
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ===== SMOOTH ANCHORS ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ===== CONTACT FORM → WHATSAPP ===== */
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('input[type="text"]').value.trim();
  const email = form.querySelector('input[type="email"]').value.trim();
  const message = form.querySelector('textarea').value.trim();

  // ⚠️ REPLACE with your WhatsApp number (country code + number, no spaces/dashes)
  const whatsappNumber = '91XXXXXXXXXX';

  const text = `Hi, I'm *${name}*%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
  const url = `https://wa.me/${whatsappNumber}?text=${text}`;

  window.open(url, '_blank');

  const btn = form.querySelector('button');
  btn.textContent = 'Opening WhatsApp ✓';
  setTimeout(() => {
    btn.textContent = 'Send via WhatsApp →';
    form.reset();
  }, 3000);
});

/* ===== 3D INTERACTIVE BACKGROUND (VANTA.JS) ===== */
if (typeof VANTA !== 'undefined') {
  VANTA.TOPOLOGY({
    el: "#bg-animation",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0xe8430a,      // Accent Orange/Red
    backgroundColor: 0xf5f0ea // Cream background
  });
}
