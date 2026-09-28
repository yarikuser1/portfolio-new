const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
  })
);
const header = document.getElementById('header');
function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', onScroll);
onScroll();
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.children];
      const delay = (siblings.indexOf(entry.target) % 4) * 100;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + (progress === 1 ? suffix : '');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));
const planSelect = document.getElementById('fPlan');
document.querySelectorAll('[data-plan]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!planSelect) return;
    [...planSelect.options].forEach(opt => {
      if (opt.text === btn.dataset.plan) planSelect.value = opt.value || opt.text;
    });
  });
});

const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fName').value.trim();
    const contact = document.getElementById('fContact').value.trim();
    const plan = document.getElementById('fPlan').value;
    const message = document.getElementById('fMessage').value.trim();

    const subject = 'Заказ сайта: ' + plan;
    const body =
      'Имя: ' + name + '\n' +
      'Контакт для ответа: ' + contact + '\n' +
      'Интересует: ' + plan + '\n\n' +
      message;

    window.location.href =
      'mailto:yarik339777@gmail.com?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    document.getElementById('formNote').textContent =
      'Спасибо! Если письмо не открылось, напишите напрямую на yarik339777@gmail.com';
  });
}
document.getElementById('year').textContent = new Date().getFullYear();