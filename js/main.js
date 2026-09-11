/* ============================================================
   Nasaka RO Services – main.js  (WhatsApp-only forms)
============================================================ */

// ── Mobile Menu ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  // close menu when a link is tapped
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

// ── Active nav link ──────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link, .mobile-nav__link').forEach(link => {
  const href = (link.getAttribute('href') || '').split('/').pop();
  if (href === currentPage) link.classList.add('active');
});

// ── WhatsApp message builder ─────────────────────────────────
function buildWAMessage(fields) {
  const lines = ['🛠️ *Nasaka RO Services – Booking Request*', '─────────────────────'];
  const icons = { name:'👤', phone:'📞', email:'📧', service:'🔧', date:'📅', time:'⏰', message:'💬', subject:'📋', mobile:'📞', yourname:'👤', youremail:'📧', yourmessage:'💬' };
  const labels = { name:'Name', phone:'Mobile', email:'Email', service:'Service', date:'Date', time:'Time', message:'Message', subject:'Purpose', mobile:'Mobile', yourname:'Name', youremail:'Email', yourmessage:'Message' };
  Object.entries(fields).forEach(([k, v]) => {
    if (v && v.trim()) lines.push(`${icons[k] || '•'} *${labels[k] || k}:* ${v.trim()}`);
  });
  return lines.join('\n');
}

function sendToWhatsApp(text) {
  window.open('https://wa.me/919981625414?text=' + encodeURIComponent(text), '_blank');
}

// ── Generic WA form handler ───────────────────────────────────
function initWAForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {};
    form.querySelectorAll('[name]').forEach(el => {
      if (el.value.trim()) data[el.name] = el.value;
    });
    sendToWhatsApp(buildWAMessage(data));
  });
}

// Init all booking forms
['waForm', 'waFormContact'].forEach(initWAForm);

// ── Apply Now → WhatsApp (NOT email) ─────────────────────────
const applyForm = document.getElementById('applyEmailForm');
if (applyForm) {
  applyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {};
    applyForm.querySelectorAll('[name]').forEach(el => {
      if (el.value.trim()) data[el.name] = el.value;
    });
    sendToWhatsApp(buildWAMessage(data));
  });
}

// ── Scroll reveal ────────────────────────────────────────────
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
    io.observe(el);
  });
}

// ── Sticky header shadow ─────────────────────────────────────
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 24px rgba(0,0,0,.12)'
      : '0 2px 16px rgba(0,0,0,.09)';
  }, { passive: true });
}
