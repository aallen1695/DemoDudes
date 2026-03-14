(function () {
  const navItems = [
    { id: 'home', label: 'Home', href: 'index.html', icon: 'bi-house-door' },
    { id: 'blog', label: 'Blog', href: 'blog.html', icon: 'bi-journal-richtext' },
    { id: 'report', label: 'Special Report', href: 'special-report.html', icon: 'bi-file-earmark-richtext' },
    { id: 'webinar', label: 'Webinar', href: 'webinar-registration.html', icon: 'bi-camera-video' },
    { id: 'contact', label: 'Contact', href: 'contact.html', icon: 'bi-chat-dots' },
    { id: 'login', label: 'Login', href: 'login.html', icon: 'bi-box-arrow-in-right' },
    { id: 'privacy', label: 'Privacy', href: 'privacy.html', icon: 'bi-shield-check' },
    { id: 'compliance', label: 'CCPA/GDPR', href: 'ccpa-gdpr.html', icon: 'bi-clipboard2-check' },
    { id: 'dns', label: 'Do Not Sell', href: 'do-not-sell.html', icon: 'bi-slash-circle' }
  ];

  function buildSidebar(activePage) {
    const links = navItems
      .map((item) => {
        const activeClass = item.id === activePage ? 'active' : '';
        return `
          <a class="sidebar-link ${activeClass}" href="${item.href}" title="${item.label}" aria-label="${item.label}">
            <i class="bi ${item.icon}"></i>
            <span class="sidebar-link-label">${item.label}</span>
          </a>
        `;
      })
      .join('');

    return `
      <aside class="app-sidebar">
        <a class="brand-mark" href="index.html" aria-label="Demo Dudes Home">
          <img src="assets/images/demo-dudes-icon.png" alt="Demo Dudes icon" />
        </a>
        <nav class="sidebar-nav" aria-label="Primary navigation">
          ${links}
        </nav>
        <a class="sidebar-join-link" href="vsl.html" title="Join Now" aria-label="Join Now">
          <i class="bi bi-stars"></i>
        </a>
      </aside>
    `;
  }

  function buildHeader(pageTitle) {
    return `
      <header class="app-header">
        <div>
          <p class="eyebrow mb-0">Demo Dudes Inc.</p>
          <h1 class="page-title mb-0">${pageTitle}</h1>
        </div>
        <a class="btn btn-brand-secondary" href="vsl.html">Join Now</a>
      </header>
    `;
  }

  function buildFooter() {
    const year = new Date().getFullYear();
    return `
      <footer class="app-footer">
        <div class="footer-inner d-flex flex-column flex-md-row gap-2 justify-content-between align-items-md-center">
          <p class="mb-0">&copy; ${year} Demo Dudes Inc. Built for product and funnel demos.</p>
          <div class="footer-links d-flex gap-3">
            <a href="privacy.html">Privacy Policy</a>
            <a href="ccpa-gdpr.html">CCPA/GDPR</a>
            <a href="do-not-sell.html">Do Not Sell</a>
          </div>
        </div>
      </footer>
    `;
  }

  function injectIncludes() {
    const body = document.body;
    const activePage = body.dataset.page || '';
    const pageTitle = body.dataset.pageTitle || 'Dashboard';

    document.querySelectorAll('[data-include="sidebar"]').forEach((el) => {
      el.innerHTML = buildSidebar(activePage);
    });

    document.querySelectorAll('[data-include="header"]').forEach((el) => {
      el.innerHTML = buildHeader(pageTitle);
    });

    document.querySelectorAll('[data-include="footer"]').forEach((el) => {
      el.innerHTML = buildFooter();
    });

    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((triggerEl) => {
      if (window.bootstrap && bootstrap.Tooltip) {
        new bootstrap.Tooltip(triggerEl);
      }
    });
  }

  function wireDemoForms() {
    document.querySelectorAll('[data-demo-form]').forEach((form) => {
      const successMessage = form.dataset.successMessage || 'Thanks. You are in.';
      const redirectUrl = form.dataset.successRedirect || '';
      const messageEl = form.querySelector('[data-form-success]');
      const button = form.querySelector('[data-form-submit]');
      let loadingEl = form.querySelector('[data-form-loading]');

      if (!button || (!messageEl && !redirectUrl)) {
        return;
      }

      if (!loadingEl) {
        loadingEl = document.createElement('div');
        loadingEl.className = 'form-loading';
        loadingEl.hidden = true;
        loadingEl.setAttribute('data-form-loading', '');
        loadingEl.setAttribute('aria-live', 'polite');
        loadingEl.innerHTML =
          '<img src="assets/images/demo-dudes-icon.png" alt="Demo Dudes icon" />' +
          '<p class="mb-0">Going to space and back...</p>';
        form.appendChild(loadingEl);
      }

      const contentEls = Array.from(form.children).filter(function (child) {
        return child !== messageEl && child !== loadingEl;
      });

      form.addEventListener('submit', function (event) {
        if (form.dataset.submitting === 'true') {
          event.preventDefault();
          return;
        }

        if (!form.checkValidity()) {
          return;
        }

        event.preventDefault();
        form.dataset.submitting = 'true';
        button.disabled = true;
        contentEls.forEach(function (el) {
          el.hidden = true;
        });
        if (messageEl) {
          messageEl.hidden = true;
        }
        loadingEl.hidden = false;

        window.setTimeout(function () {
          if (redirectUrl) {
            window.location.href = redirectUrl;
            return;
          }

          loadingEl.hidden = true;
          if (messageEl) {
            messageEl.textContent = successMessage;
            messageEl.hidden = false;
          }
          button.disabled = false;
          form.dataset.submitting = 'false';
          form.dataset.submitted = 'true';
        }, 500);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectIncludes();
      wireDemoForms();
    });
  } else {
    injectIncludes();
    wireDemoForms();
  }
})();
