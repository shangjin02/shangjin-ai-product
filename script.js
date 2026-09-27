const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a')];

const setActiveNav = () => {
  const marker = window.scrollY + 150;
  let current = '';
  sections.forEach((section) => {
    if (section.offsetTop <= marker) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();

const contactControl = document.querySelector('.contact-control');
const contactToggle = document.querySelector('.header-contact');
const contactPopover = document.querySelector('.contact-popover');
const copyPhoneButton = document.querySelector('[data-copy-phone]');
const copyStatus = document.querySelector('.copy-status');

const setContactOpen = (isOpen) => {
  contactControl?.classList.toggle('open', isOpen);
  contactToggle?.setAttribute('aria-expanded', String(isOpen));
  contactPopover?.setAttribute('aria-hidden', String(!isOpen));
};

contactToggle?.addEventListener('click', (event) => {
  event.stopPropagation();
  setContactOpen(!contactControl.classList.contains('open'));
});

contactControl?.addEventListener('click', (event) => event.stopPropagation());
document.addEventListener('click', () => setContactOpen(false));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setContactOpen(false);
    contactToggle?.focus();
  }
});

copyPhoneButton?.addEventListener('click', async () => {
  const phone = copyPhoneButton.dataset.copyPhone;
  try {
    await navigator.clipboard.writeText(phone);
    copyPhoneButton.textContent = '已复制';
    copyStatus.textContent = '电话号码已复制到剪贴板';
    window.setTimeout(() => {
      copyPhoneButton.textContent = '复制';
      copyStatus.textContent = '点击号码可拨打，或一键复制';
    }, 1800);
  } catch {
    copyStatus.textContent = `请手动复制：${phone}`;
  }
});
