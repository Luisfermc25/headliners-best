(function () {
  const shell = document.getElementById('site-shell');
  if (!shell) return;
  shell.innerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header" id="site-header">
      <div class="container header-inner">
        <a class="header-logo" href="index.html" aria-label="Best Headliners Plus home">
          <img class="header-logo-image" src="assets/images/header-logo-transparent.png" alt="Best Headliners Plus logo" width="1774" height="887">
        </a>
        <nav class="header-nav" aria-label="Primary">
          <a href="index.html">Home</a><a href="about.html">About Us</a><a href="services.html">Services</a><a href="gallery.html">Gallery</a><a href="contact.html">Contact</a>
        </nav>
        <div class="header-actions">
          <a class="header-phone" href="tel:+19127102185"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>912-710-2185</a>
          <a class="btn-pill btn-pill-red" href="contact.html">Request a Quote <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
          <button class="header-burger" aria-expanded="false" aria-controls="mobile-nav" aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
      </div>
      <nav id="mobile-nav" class="mobile-nav" aria-label="Mobile">
        <a href="index.html">Home</a><a href="about.html">About Us</a><a href="services.html">Services</a><a href="gallery.html">Gallery</a><a href="contact.html">Contact</a>
        <a class="header-phone" href="tel:+19127102185">912-710-2185</a><a class="btn-pill btn-pill-red" href="contact.html">Request a Quote</a>
      </nav>
    </header>

<a class="facebook-promo" href="https://www.facebook.com/profile.php?id=61558139131383" target="_blank" rel="noopener noreferrer" aria-label="Visit Best Headliners Plus on Facebook">
  <span class="facebook-promo-window" aria-hidden="true"><span class="facebook-promo-track">
    <span class="facebook-promo-line">
      <span class="facebook-promo-item"><svg class="facebook-promo-icon tool-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 5.2a5.2 5.2 0 0 0-6.5 6.5l-5.1 5.1a2 2 0 0 0 2.8 2.8l5.1-5.1a5.2 5.2 0 0 0 6.5-6.5l-3.2 3.2-2.8-2.8z"/></svg>Follow our latest projects on Facebook</span>
      <span class="facebook-promo-item"><svg class="facebook-promo-icon car-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 13 1.5-4.3A2.5 2.5 0 0 1 7.9 7h8.2a2.5 2.5 0 0 1 2.4 1.7L20 13v5h-2v-1H6v1H4z"/><path d="M4.5 13h15M7 15h.01M17 15h.01M7 10h10"/></svg>See Andy’s newest automotive interior work</span>
      <span class="facebook-promo-item">Follow Best Headliners Plus on Facebook</span>
      <span class="facebook-promo-item"><svg class="facebook-promo-icon tool-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 5.2a5.2 5.2 0 0 0-6.5 6.5l-5.1 5.1a2 2 0 0 0 2.8 2.8l5.1-5.1a5.2 5.2 0 0 0 6.5-6.5l-3.2 3.2-2.8-2.8z"/></svg>Follow our latest projects on Facebook</span>
      <span class="facebook-promo-item"><svg class="facebook-promo-icon car-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 13 1.5-4.3A2.5 2.5 0 0 1 7.9 7h8.2a2.5 2.5 0 0 1 2.4 1.7L20 13v5h-2v-1H6v1H4z"/><path d="M4.5 13h15M7 15h.01M17 15h.01M7 10h10"/></svg>See Andy’s newest automotive interior work</span>
      <span class="facebook-promo-item">Follow Best Headliners Plus on Facebook</span>
      <span class="facebook-promo-item"><svg class="facebook-promo-icon tool-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 5.2a5.2 5.2 0 0 0-6.5 6.5l-5.1 5.1a2 2 0 0 0 2.8 2.8l5.1-5.1a5.2 5.2 0 0 0 6.5-6.5l-3.2 3.2-2.8-2.8z"/></svg>Follow our latest projects on Facebook</span>
      <span class="facebook-promo-item"><svg class="facebook-promo-icon car-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 13 1.5-4.3A2.5 2.5 0 0 1 7.9 7h8.2a2.5 2.5 0 0 1 2.4 1.7L20 13v5h-2v-1H6v1H4z"/><path d="M4.5 13h15M7 15h.01M17 15h.01M7 10h10"/></svg>See Andy’s newest automotive interior work</span>
      <span class="facebook-promo-item">Follow Best Headliners Plus on Facebook</span>
    </span>
    <span class="facebook-promo-line">
      <span class="facebook-promo-item"><svg class="facebook-promo-icon tool-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 5.2a5.2 5.2 0 0 0-6.5 6.5l-5.1 5.1a2 2 0 0 0 2.8 2.8l5.1-5.1a5.2 5.2 0 0 0 6.5-6.5l-3.2 3.2-2.8-2.8z"/></svg>Follow our latest projects on Facebook</span>
      <span class="facebook-promo-item"><svg class="facebook-promo-icon car-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 13 1.5-4.3A2.5 2.5 0 0 1 7.9 7h8.2a2.5 2.5 0 0 1 2.4 1.7L20 13v5h-2v-1H6v1H4z"/><path d="M4.5 13h15M7 15h.01M17 15h.01M7 10h10"/></svg>See Andy’s newest automotive interior work</span>
      <span class="facebook-promo-item">Follow Best Headliners Plus on Facebook</span>
      <span class="facebook-promo-item"><svg class="facebook-promo-icon tool-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 5.2a5.2 5.2 0 0 0-6.5 6.5l-5.1 5.1a2 2 0 0 0 2.8 2.8l5.1-5.1a5.2 5.2 0 0 0 6.5-6.5l-3.2 3.2-2.8-2.8z"/></svg>Follow our latest projects on Facebook</span>
      <span class="facebook-promo-item"><svg class="facebook-promo-icon car-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 13 1.5-4.3A2.5 2.5 0 0 1 7.9 7h8.2a2.5 2.5 0 0 1 2.4 1.7L20 13v5h-2v-1H6v1H4z"/><path d="M4.5 13h15M7 15h.01M17 15h.01M7 10h10"/></svg>See Andy’s newest automotive interior work</span>
      <span class="facebook-promo-item">Follow Best Headliners Plus on Facebook</span>
      <span class="facebook-promo-item"><svg class="facebook-promo-icon tool-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 5.2a5.2 5.2 0 0 0-6.5 6.5l-5.1 5.1a2 2 0 0 0 2.8 2.8l5.1-5.1a5.2 5.2 0 0 0 6.5-6.5l-3.2 3.2-2.8-2.8z"/></svg>Follow our latest projects on Facebook</span>
      <span class="facebook-promo-item"><svg class="facebook-promo-icon car-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 13 1.5-4.3A2.5 2.5 0 0 1 7.9 7h8.2a2.5 2.5 0 0 1 2.4 1.7L20 13v5h-2v-1H6v1H4z"/><path d="M4.5 13h15M7 15h.01M17 15h.01M7 10h10"/></svg>See Andy’s newest automotive interior work</span>
      <span class="facebook-promo-item">Follow Best Headliners Plus on Facebook</span>
    </span>
  </span></span>
  <span class="facebook-promo-cta">Visit our Facebook</span>
</a>
    <footer class="site-footer"><img class="footer-emblem" src="assets/images/footer-emblem.png" alt="" aria-hidden="true" width="180" height="180" loading="lazy" decoding="async"><div class="container"><div class="footer-grid">
      <div class="footer-col"><h4>Reach Us</h4><ul class="footer-contact"><li>Pooler, GA · Serving Savannah &amp; the Coastal Empire</li><li><a href="tel:+19127102185" style="color:inherit">912-710-2185</a></li><li><a href="mailto:Andybest9877@gmail.com" style="color:inherit">Andybest9877@gmail.com</a></li></ul></div>
      <div class="footer-col"><h4>Quick Links</h4><div class="footer-links-cols"><div><a href="index.html">Home</a><a href="services.html">Services</a><a href="gallery.html">Our Work</a></div><div><a href="about.html">About</a><a href="contact.html">Contact</a></div></div></div>
      <div class="footer-col"><h4>Connect with Us</h4><ul class="footer-social"><li><a href="https://www.facebook.com/profile.php?id=61558139131383" target="_blank" rel="noopener" style="color:inherit">Facebook</a></li></ul></div>
      <div class="footer-col footer-newsletter"><h4>Need a Quote?</h4><p style="font-size:.88rem;color:#cfcfcf;margin-bottom:1.2rem">Call now for the fastest answer, or send us your details and we’ll call you back.</p><a class="btn-pill btn-pill-red" href="tel:+19127102185" style="width:100%;margin-bottom:.8rem">Call 912-710-2185</a><a class="btn-pill btn-pill-outline" href="contact.html" style="width:100%">Get a Free Quote</a></div>
    </div><div class="footer-bottom"><p>Site contents &copy; <span id="year"></span> Best Headliners Plus. All rights reserved.</p><p>Powered By ⚡</p></div></div></footer>
    <a class="call-fab" href="tel:+19127102185" aria-label="Call Best Headliners Plus now">Call Now</a>`;
  const page = location.pathname.split('/').pop() || 'index.html';
  shell.querySelectorAll('.header-nav a, .mobile-nav a, .footer-links-cols a').forEach((a) => {
    if ((a.getAttribute('href') || '').split('#')[0] === page) { a.classList.add('page-nav-active'); a.setAttribute('aria-current', 'page'); }
  });
  const year = shell.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
