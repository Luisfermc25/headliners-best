/* main.js — Best Headliners Plus
   Comportamiento general: header, menú móvil, slider del hero, iconos de
   "Why Choose Us", formulario de cotización rápida del hero y formulario
   de contacto real (Web3Forms). */
(function () {
  "use strict";

  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $$(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  /* ---------------------------------------------------------
     Header: se compacta y toma fondo al bajar; se oculta al
     bajar y reaparece al subir.
  --------------------------------------------------------- */
  function initHeader() {
    var header = $("#site-header");
    if (!header) return;
    var lastY = window.scrollY;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 40);
      if (y > lastY && y > 160) header.classList.add("is-hidden");
      else header.classList.remove("is-hidden");
      lastY = y;
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    });
    update();
  }

  /* ---------------------------------------------------------
     Menú móvil
  --------------------------------------------------------- */
  function initMobileNav() {
    var toggle = $(".header-burger");
    var nav = $("#mobile-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      document.body.style.overflow = !open ? "hidden" : "";
    });
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------------------------------------------------------
     Scroll suave para anclas internas
  --------------------------------------------------------- */
  function scrollToEl(el) {
    var headerH = $("#site-header") ? $("#site-header").getBoundingClientRect().height : 0;
    var top = el.getBoundingClientRect().top + window.scrollY - headerH - 12;
    window.scrollTo({ top: top, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  function initSmoothAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      scrollToEl(el);
    });
  }

  /* ---------------------------------------------------------
     Hero slider — cicla titular/subtítulo entre los 3 servicios,
     con puntos y autoplay pausable al hacer hover.
  --------------------------------------------------------- */
  function initHeroSlider() {
    var dotsWrap = $(".hero-dots");
    var titleLines = $$(".hero-title .line");
    var sub = $(".hero-sub");
    if (!dotsWrap || titleLines.length < 2) return;

    var slides = [
      { l1: "Sagging Headliner?", l2b: "We Make It", l2a: "Look New", sub: "Professional headliner repair & replacement in Pooler, Savannah and the Coastal Empire — 30 years of honest, quality work." },
      { l1: "Sunroof Stuck?", l2b: "We Repair", l2a: "Select Models", sub: "ASI-trained sunroof and moonroof repair. Call to confirm your make and model before you bring it in." },
      { l1: "Worn Out Seats?", l2b: "Custom Covers", l2a: "& Leather Kits", sub: "Refresh a tired interior without a full reupholster job — installed clean, installed right." },
    ];
    var dots = $$("button", dotsWrap);
    var current = 0;
    var timer = null;
    var paused = false;

    function render(i) {
      var s = slides[i];
      var line1 = titleLines[0], line2 = titleLines[1];
      function swap(lineEl, html) {
        if (window.gsap) {
          gsap.to(lineEl, {
            opacity: 0, y: -8, duration: 0.25, onComplete: function () {
              lineEl.innerHTML = html;
              gsap.fromTo(lineEl, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35 });
            }
          });
        } else {
          lineEl.innerHTML = html;
        }
      }
      swap(line1, "<span>" + s.l1 + "</span>");
      swap(line2, '<span class="bold">' + s.l2b + '</span> <span class="accent">' + s.l2a + "</span>");
      if (sub) {
        if (window.gsap) gsap.to(sub, { opacity: 0, duration: 0.2, onComplete: function () { sub.textContent = s.sub; gsap.to(sub, { opacity: 1, duration: 0.3 }); } });
        else sub.textContent = s.sub;
      }
      dots.forEach(function (d, di) { d.setAttribute("aria-current", String(di === i)); });
      current = i;
    }

    function next() { render((current + 1) % slides.length); }

    dots.forEach(function (d, i) {
      d.addEventListener("click", function () { render(i); resetTimer(); });
    });

    function resetTimer() {
      clearInterval(timer);
      if (!paused) timer = setInterval(next, 6000);
    }
    var heroEl = $("#hero");
    if (heroEl) {
      heroEl.addEventListener("mouseenter", function () { paused = true; clearInterval(timer); });
      heroEl.addEventListener("mouseleave", function () { paused = false; resetTimer(); });
    }
    resetTimer();
  }

  /* ---------------------------------------------------------
     "What Brand Is Your Car?" — clic en un logo marca el activo,
     preselecciona la marca en el formulario de contacto y hace
     scroll hasta él.
  --------------------------------------------------------- */
  function initBrands() {
    var items = $$(".brand-item");
    if (!items.length) return;
    var makeField = $("#q-make");
    var contactForm = $("#contact-form");
    items.forEach(function (item) {
      item.addEventListener("click", function () {
        items.forEach(function (i) { i.setAttribute("aria-current", "false"); });
        item.setAttribute("aria-current", "true");

        var brand = item.getAttribute("data-brand");
        if (makeField && brand) {
          var hasOption = Array.prototype.some.call(makeField.options, function (o) { return o.value === brand; });
          if (hasOption) makeField.value = brand;
        }
        var target = $("#contact");
        if (target) scrollToEl(target);
        if (contactForm) {
          var vehicleField = $("#q-vehicle", contactForm);
          setTimeout(function () { if (vehicleField) vehicleField.focus(); }, 500);
        }
      });
    });
  }

  /* ---------------------------------------------------------
     Slider antes/después arrastrable (Our Work)
  --------------------------------------------------------- */
  function initBeforeAfter() {
    $$(".ba-slider").forEach(function (slider) {
      var after = $(".ba-after", slider);
      var handle = $(".ba-handle", slider);
      var knob = $(".ba-knob", slider);
      if (!after || !handle || !knob) return;
      var images = $$("img", slider);
      images.forEach(function (img) { img.draggable = false; });
      var photoFrame = slider.closest(".blog-photo");
      function syncPhotoRatio() {
        if (window.matchMedia("(max-width: 800px)").matches) {
          slider.style.aspectRatio = "4 / 3";
          slider.style.backgroundImage = "";
          if (photoFrame) photoFrame.style.aspectRatio = "4 / 3";
        } else {
          slider.style.aspectRatio = "";
          slider.style.backgroundImage = "";
          if (photoFrame) photoFrame.style.aspectRatio = "";
        }
      }
      syncPhotoRatio();
      window.addEventListener("resize", syncPhotoRatio);
      var dragging = false;

      function setPos(clientX) {
        var rect = slider.getBoundingClientRect();
        var x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
        var pct = (x / rect.width) * 100;
        after.style.clipPath = "inset(0 0 0 " + pct + "%)";
        handle.style.left = pct + "%";
        knob.style.left = pct + "%";
        knob.setAttribute("aria-valuenow", String(Math.round(pct)));
      }

      knob.setAttribute("role", "slider");
      knob.setAttribute("tabindex", "0");
      knob.setAttribute("aria-valuemin", "0");
      knob.setAttribute("aria-valuemax", "100");
      knob.setAttribute("aria-valuenow", "50");
      knob.setAttribute("aria-label", "Drag to compare before and after");
      knob.style.touchAction = "none";

      function down(e) {
        dragging = true;
        slider.setPointerCapture && e.pointerId != null && slider.setPointerCapture(e.pointerId);
      }
      function move(e) {
        if (!dragging) return;
        var clientX = e.touches ? e.touches[0].clientX : e.clientX;
        setPos(clientX);
      }
      function up() { dragging = false; }

      slider.addEventListener("pointerdown", function (e) {
        if (e.pointerType !== "touch") e.preventDefault();
        down(e); move(e); e.stopPropagation();
      });
      slider.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);

      knob.addEventListener("keydown", function (e) {
        var rect = slider.getBoundingClientRect();
        var current = parseFloat(knob.style.left) || 50;
        if (e.key === "ArrowLeft") { setPos(rect.left + rect.width * ((current - 5) / 100)); e.preventDefault(); }
        if (e.key === "ArrowRight") { setPos(rect.left + rect.width * ((current + 5) / 100)); e.preventDefault(); }
      });
    });
  }

  /* ---------------------------------------------------------
     Tarjeta del hero "Get a Free Quote": al enviar, hace scroll
     al formulario de contacto real y lo rellena con esos datos.
  --------------------------------------------------------- */
  function initHeroQuoteForm() {
    var form = $("#hero-quote-form");
    var contactForm = $("#contact-form");
    if (!form || !contactForm) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var year = $("#hq-year", form).value || "";
      var make = $("#hq-make", form).value || "";
      var model = $("#hq-model", form).value || "";
      var service = $("#hq-service", form).value || "";

      var vehicleField = $("#q-vehicle", contactForm);
      var serviceField = $("#q-service", contactForm);
      if (vehicleField) vehicleField.value = [year, make, model].filter(Boolean).join(" ");
      if (serviceField && service) serviceField.value = service;

      var target = $("#contact");
      if (target) scrollToEl(target);
      var nameField = $("#q-name", contactForm);
      if (nameField) setTimeout(function () { nameField.focus(); }, 500);
    });
  }

  /* ---------------------------------------------------------
     Formulario de contacto real — Web3Forms + honeypot.
     Pega tu access key en lib de datos: window.__SITE__.web3formsKey
     (ver la constante WEB3FORMS_KEY más abajo).
  --------------------------------------------------------- */
  var WEB3FORMS_KEY = "[TU_CLAVE_AQUI]"; // ← pega aquí tu access key de https://web3forms.com

  function initContactForm() {
    var form = $("#contact-form");
    if (!form) return;
    var status = $(".form-status", form);
    var submitBtn = $('button[type="submit"]', form);

    form.setAttribute("novalidate", "novalidate");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      // Honeypot: si un bot rellenó el campo oculto, fingimos éxito y no enviamos nada.
      var hp = $("#q-hp", form);
      if (hp && hp.value) {
        showStatus(true, "Thanks! We'll be in touch shortly.");
        form.reset();
        return;
      }

      var key = (WEB3FORMS_KEY || "").trim();
      if (!key || key.indexOf("[TU_CLAVE") === 0) {
        var field = function (selector) { var input = $(selector, form); return input ? input.value.trim() : ""; };
        var message = [
          "Name: " + field("#q-name"),
          "Phone: " + field("#q-phone"),
          "Email: " + field("#q-email"),
          "Vehicle: " + field("#q-vehicle"),
          "Service: " + field("#q-service"),
          "Message: " + field("#q-message")
        ].join("\n");
        showStatus(true, "Your email app will open with your request. Please send the prepared message to complete it.");
        window.location.href = "mailto:Andybest9877@gmail.com?subject=" + encodeURIComponent("Quote request — Best Headliners Plus") + "&body=" + encodeURIComponent(message);
        return;
      }

      var formData = new FormData(form);
      formData.set("access_key", key);
      formData.append("subject", "New quote request — Best Headliners Plus website");

      submitBtn && (submitBtn.disabled = true);

      fetch("https://api.web3forms.com/submit", { method: "POST", body: formData })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          submitBtn && (submitBtn.disabled = false);
          if (json.success) {
            showStatus(true, "Thanks! Your request is in — we'll call you back shortly.");
            form.reset();
          } else {
            showStatus(false, "Something went wrong sending your request. Please call us instead.");
          }
        })
        .catch(function () {
          submitBtn && (submitBtn.disabled = false);
          showStatus(false, "Network error — please call us instead.");
        });
    });

    function showStatus(ok, msg) {
      if (!status) return;
      status.textContent = msg;
      status.classList.remove("is-success", "is-error");
      status.classList.add(ok ? "is-success" : "is-error");
      if (window.gsap) {
        gsap.fromTo(status, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.3 });
        status.classList.add("is-visible");
      } else {
        status.classList.add("is-visible");
      }
    }
  }

  function boot() {
    safe(initHeader, "initHeader");
    safe(initMobileNav, "initMobileNav");
    safe(initSmoothAnchors, "initSmoothAnchors");
    safe(initHeroSlider, "initHeroSlider");
    safe(initBrands, "initBrands");
    safe(initBeforeAfter, "initBeforeAfter");
    safe(initHeroQuoteForm, "initHeroQuoteForm");
    safe(initContactForm, "initContactForm");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
