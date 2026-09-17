(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const serviceSelect = document.querySelector('#service');
  const form = document.querySelector('#brief-form');
  const response = document.querySelector('#form-response');
  const photoInput = document.querySelector('#photos');
  const fileStatus = document.querySelector('#file-status');

  const closeMenu = () => {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  };

  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('is-open', !open);
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.querySelectorAll('[data-service]').forEach((button) => {
    button.addEventListener('click', () => {
      if (serviceSelect) serviceSelect.value = button.dataset.service || '';
      document.querySelector('#site-visit')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => serviceSelect?.focus({ preventScroll: true }), 450);
    });
  });

  photoInput?.addEventListener('change', () => {
    const count = photoInput.files?.length || 0;
    fileStatus.textContent = count ? `${count} photo${count === 1 ? '' : 's'} selected. They stay on this device.` : 'Photos stay on this device.';
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const service = serviceSelect?.value || 'project';
    const postcode = document.querySelector('#postcode')?.value.trim() || '';
    response.hidden = false;
    response.innerHTML = `Your ${service.toLowerCase()} brief for ${postcode} is ready on this page. This concept does not send it anywhere. To discuss a site visit, call <a href="tel:+447906582289">+44 7906 582289</a>.`;
    response.focus?.();
  });
})();
