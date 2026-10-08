/* animations.js — [NOMBRE DE LA MARCA]
   Todas las animaciones GSAP: timeline de entrada del hero, sistema de
   scroll-reveal reutilizable (data-reveal / data-reveal-group), parallax
   del texto fantasma y microinteracciones.

   Nota: SplitText y DrawSVG son plugins de pago de GSAP (Club GreenSock),
   no disponibles por CDN gratis. Se replica el mismo efecto visual con
   un split-por-palabra manual y con stroke-dashoffset nativo. */
(function () {
  "use strict";

  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isMobile = window.innerWidth < 720;

  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $$(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  /* Envuelve cada palabra de un título en su propio <span>, preservando
     los <br> y elementos inline (mismo patrón de "split" manual). */
  function splitWords(el) {
    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      if (node.nodeType === 3 && node.textContent.trim()) {
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function (w) {
          if (/^\s+$/.test(w) || !w) { frag.appendChild(document.createTextNode(w)); return; }
          var span = document.createElement("span");
          span.className = "word";
          span.style.display = "inline-block";
          span.textContent = w;
          frag.appendChild(span);
        });
        node.replaceWith(frag);
      } else if (node.nodeType === 1) {
        splitWords(node);
      }
    });
  }

  /* Envuelve cada letra de un texto en su propio <span class="glyph">
     (equivalente manual a SplitText, que es un plugin de pago). */
  function splitLetters(el) {
    var text = el.textContent;
    el.textContent = "";
    text.split("").forEach(function (ch) {
      var span = document.createElement("span");
      span.className = "glyph";
      span.style.display = "inline-block";
      span.textContent = ch === " " ? " " : ch;
      el.appendChild(span);
    });
  }

  /* ---------------------------------------------------------
     Hero — timeline de entrada (foto + header + eyebrow + H1 +
     subtítulo + botones + fila de características)
  --------------------------------------------------------- */
  function initHeroTimeline() {
    // A late CDN response should never hide already visible content.
    if (reduced || performance.now() > 750) return;
    if (!window.gsap || !$("#hero")) return;
    var eyebrowLine = $(".eyebrow-line");
    var eyebrowText = $(".eyebrow-text");
    var h1Lines = $$(".hero-h1 .h1-line");
    var subBar = $(".hero-sub2 .sub-bar");
    var subText = $(".hero-sub2 span:not(.sub-bar)");
    var ctaRow = $(".hero-cta-row");
    var features = $(".hero-feat-row");

    if (eyebrowText) splitLetters(eyebrowText);
    var glyphs = $$(".eyebrow-text .glyph");

    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (eyebrowLine) tl.fromTo(eyebrowLine, { scaleX: 0 }, { scaleX: 1, duration: 0.35, transformOrigin: "left center" }, 0.1);
    if (glyphs.length) tl.from(glyphs, { opacity: 0, y: 6, duration: 0.28, stagger: 0.008 }, 0.15);

    if (h1Lines.length) {
      h1Lines.forEach(function (line, i) {
        var clip = $(".h1-clip", line);
        if (!clip) return;
        tl.fromTo(clip,
          { clipPath: "inset(0 100% 0 -10%)", skewX: -22 },
          { clipPath: "inset(0 0% 0 0%)", skewX: -4, duration: 0.55, ease: "power3.out" },
          0.25 + i * 0.12
        );
      });
    }

    if (subBar) tl.fromTo(subBar, { scaleY: 0 }, { scaleY: 1, duration: 0.35, transformOrigin: "top" }, 0.62);
    if (subText) tl.from(subText, { opacity: 0, y: 10, duration: 0.42 }, 0.7);

    if (ctaRow) tl.from(ctaRow.children, { opacity: 0, y: 12, scale: 0.96, duration: 0.42, stagger: 0.08 }, 0.85);

    var dividers = $$(".hero-feat-row .feat-divider");
    if (features) {
      tl.from(features.children, { opacity: 0, y: 12, duration: 0.42, stagger: 0.07 }, 1.0);
      if (dividers.length) tl.fromTo(dividers, { scaleY: 0 }, { scaleY: 1, duration: 0.42, stagger: 0.07, transformOrigin: "top" }, 1.1);
    }

    // Red de seguridad: si el timeline se congela (pestaña en segundo plano
    // / rAF muy limitado), fuerza el estado final a los 2.5s tras arrancar.
    tl.eventCallback("onStart", function () {
      setTimeout(function () { if (tl.progress() < 1) tl.progress(1); }, 3200);
    });
  }

  /* ---------------------------------------------------------
     Brillo continuo recorriendo "Headliners" y "Plus"
  --------------------------------------------------------- */
  function initHeroShine() {
    if (!window.gsap || reduced || isMobile) return;
    var shines = $$(".h1-shine");
    if (!shines.length) return;
    gsap.set(shines, { xPercent: -150 });
    gsap.to(shines, {
      xPercent: 550,
      duration: 1.4,
      ease: "power1.inOut",
      repeat: -1,
      repeatDelay: 3.2,
      stagger: 0.35,
    });
  }

  /* ---------------------------------------------------------
     Parallax muy leve del ratón — SOLO en la capa de texto,
     nunca en la foto (para no recortarla ni desplazarla).
  --------------------------------------------------------- */
  function initHeroParallax() {
    if (reduced) return;
    var hero = $("#hero");
    var overlay = $(".hero-overlay");
    if (!hero || !overlay || window.innerWidth < 1024) return;
    var setX, setY;
    if (window.gsap) {
      setX = gsap.quickTo(overlay, "x", { duration: 0.7, ease: "power3.out" });
      setY = gsap.quickTo(overlay, "y", { duration: 0.7, ease: "power3.out" });
    }
    hero.addEventListener("mousemove", function (e) {
      var rect = hero.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width - 0.5;
      var py = (e.clientY - rect.top) / rect.height - 0.5;
      var maxShift = 7;
      if (setX && setY) { setX(px * maxShift); setY(py * maxShift); }
    });
    hero.addEventListener("mouseleave", function () {
      if (setX && setY) { setX(0); setY(0); }
    });
  }

  /* ---------------------------------------------------------
     Al hacer scroll, el contenido del hero (no la foto) sube
     y se desvanece un poco.
  --------------------------------------------------------- */
  function initHeroScrollFade() {
    if (!window.gsap || !window.ScrollTrigger || reduced || window.innerWidth < 1024) return;
    var hero = $("#hero");
    var overlay = $(".hero-overlay");
    if (!hero || !overlay) return;
    gsap.to(overlay, {
      yPercent: -10,
      opacity: 0.15,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
    });
  }

  /* ---------------------------------------------------------
     Scroll reveal — direccional, GSAP + ScrollTrigger
     data-reveal="left|right|up", data-reveal-group="left|right|up",
     data-reveal-delay="0.2"
  --------------------------------------------------------- */
  function initScrollReveals() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    var DIST = isMobile ? 18 : 80;
    var UP_DIST = isMobile ? 14 : 44;
    var DUR = reduced ? 0.5 : isMobile ? 0.6 : 0.9;
    var EASE = "power3.out";
    var STAGGER = reduced ? 0.06 : 0.12;

    function fromVarsFor(dir) {
      if (dir === "left") return { opacity: 0, x: -DIST };
      if (dir === "right") return { opacity: 0, x: DIST };
      return { opacity: 0, y: UP_DIST };
    }
    function armSafety(tween) {
      tween.eventCallback("onStart", function () {
        var t = this;
        setTimeout(function () { if (t.progress() < 1) t.progress(1); }, 2500);
      });
    }

    $$("[data-reveal]").forEach(function (el) {
      if (el.closest("[data-reveal-group]")) return;
      if (el.closest(".page-hero")) return;
      var dir = el.getAttribute("data-reveal") || "up";
      var delay = parseFloat(el.getAttribute("data-reveal-delay") || "0") || 0;
      var vars = fromVarsFor(dir);
      vars.duration = DUR; vars.ease = EASE; vars.delay = delay;
      vars.scrollTrigger = { trigger: el, start: "top 85%", once: true };
      armSafety(gsap.from(el, vars));
    });

    $$("[data-reveal-group]").forEach(function (group) {
      var dir = group.getAttribute("data-reveal-group") || "up";
      var delay = parseFloat(group.getAttribute("data-reveal-delay") || "0") || 0;
      var children = Array.prototype.slice.call(group.children);
      if (!children.length) return;
      if (dir === "left" || dir === "right") {
        // Tarjetas de carros: alterna izquierda/derecha en el stagger
        children.forEach(function (child, i) {
          var d = i % 2 === 0 ? "left" : "right";
          var vars = fromVarsFor(d);
          vars.duration = DUR; vars.ease = EASE; vars.delay = delay + i * STAGGER;
          vars.scrollTrigger = { trigger: child, start: "top 88%", once: true };
          armSafety(gsap.from(child, vars));
        });
      } else {
        var vars = fromVarsFor(dir);
        vars.duration = DUR; vars.ease = EASE; vars.delay = delay; vars.stagger = STAGGER;
        vars.scrollTrigger = { trigger: group, start: "top 85%", once: true };
        armSafety(gsap.from(children, vars));
      }
    });
  }

  /* ---------------------------------------------------------
     Texto fantasma — parallax horizontal ligado al scroll
  --------------------------------------------------------- */
  function initGhostParallax() {
    if (!window.gsap || !window.ScrollTrigger || reduced) return;
    $$(".ghost-text").forEach(function (el) {
      gsap.to(el, {
        xPercent: el.closest(".about-col") ? 6 : -6,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
    });
  }

  /* ---------------------------------------------------------
     Contador animado en los precios
  --------------------------------------------------------- */
  function initPriceCounters() {
    var prices = $$(".car-price");
    if (!prices.length) return;
    function run(el) {
      var text = el.textContent.replace(/[^0-9]/g, "");
      var target = parseInt(text, 10) || 0;
      var supEl = el.querySelector("sup");
      var supHTML = supEl ? supEl.outerHTML : "$";
      if (reduced || typeof IntersectionObserver === "undefined") {
        el.innerHTML = supHTML + target.toLocaleString("en-US");
        return;
      }
      var start = 0, duration = 1200, t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = Math.round(start + (target - start) * eased);
        el.innerHTML = supHTML + val.toLocaleString("en-US");
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if (typeof IntersectionObserver === "undefined") { prices.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    prices.forEach(function (el) { io.observe(el); });
    setTimeout(function () {
      prices.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight && !el.dataset.counted) run(el);
      });
    }, 6000);
  }

  window.__ANIM__ = { splitWords: splitWords };

  function boot() {
    safe(initHeroTimeline, "initHeroTimeline");
    safe(initHeroShine, "initHeroShine");
    safe(initHeroParallax, "initHeroParallax");
    if (window.gsap && window.ScrollTrigger) {
      safe(initScrollReveals, "initScrollReveals");
      safe(initGhostParallax, "initGhostParallax");
      safe(initHeroScrollFade, "initHeroScrollFade");
    }
    safe(initPriceCounters, "initPriceCounters");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
