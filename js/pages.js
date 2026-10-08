(function(){
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.header-nav a, .mobile-nav a, .footer-links-cols a').forEach((link) => {
    const href = (link.getAttribute('href') || '').split('#')[0] || 'index.html';
    if (href.toLowerCase() === current) {
      link.classList.add('page-nav-active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();
