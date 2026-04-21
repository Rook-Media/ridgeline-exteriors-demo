/* ═══════════════════════════════════════════════
   RIDGELINE EXTERIORS — MAIN JS
   Rook Media Demo Site
═══════════════════════════════════════════════ */

'use strict';

/* ── SAFETY: exempt CTA buttons from page-transition hijack ── */
document.addEventListener('DOMContentLoaded', function() {
  var ctaSelector = '.btn-primary, .btn-outline-white, .btn-slate, .commercial-footer-btn, .commercial-footer-phone, .comm-service-link, .nav-phone, .btn-nav';
  document.querySelectorAll(ctaSelector).forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.stopImmediatePropagation();
    }, true);
  });

  var transition = document.getElementById('page-transition');
  if (transition) {
    transition.classList.remove('active', 'loading', 'fade-in');
    transition.style.pointerEvents = 'none';
    transition.style.opacity = '0';
  }
});

window.addEventListener('load', function() {
  var transition = document.getElementById('page-transition');
  if (transition) {
    transition.classList.remove('active', 'loading', 'fade-in');
    transition.style.pointerEvents = 'none';
  }
});

/* ── 1. PAGE TRANSITION ── */
document.addEventListener('DOMContentLoaded', () => {
  const pt = document.getElementById('page-transition');
  if (pt) {
    setTimeout(() => { pt.classList.add('hidden'); }, 80);
  }

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('tel:') ||
        href.startsWith('mailto:') || href.startsWith('http') ||
        link.getAttribute('target') === '_blank') return;
    link.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      if (pt) pt.classList.remove('hidden');
      setTimeout(() => { window.location = href; }, 350);
    });
  });
});

/* ── 2. NAV SCROLL BEHAVIOR ── */
(function() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── 3. SCROLL PROGRESS BAR ── */
(function() {
  const bar = document.querySelector('.scroll-progress-bar');
  if (!bar) return;
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── 4. DROPDOWN HOVER (desktop) ── */
(function() {
  const isMobile = () => window.innerWidth < 900;
  const dropItems = document.querySelectorAll('.nav-item-dropdown');

  dropItems.forEach(item => {
    let hideTimer = null;
    item.addEventListener('mouseenter', () => {
      if (isMobile()) return;
      clearTimeout(hideTimer);
      dropItems.forEach(other => { if (other !== item) other.classList.remove('open'); });
      item.classList.add('open');
    });
    item.addEventListener('mouseleave', () => {
      if (isMobile()) return;
      hideTimer = setTimeout(() => item.classList.remove('open'), 100);
    });
    const trigger = item.querySelector('[tabindex="0"]');
    if (trigger) {
      trigger.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.classList.toggle('open'); }
        if (e.key === 'Escape') item.classList.remove('open');
      });
    }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-item-dropdown')) {
      dropItems.forEach(item => item.classList.remove('open'));
    }
  });
})();

/* ── 5. MOBILE MENU ── */
(function() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-close');
  if (!hamburger || !mobileMenu) return;

  const open = () => {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? close() : open();
  });
  if (closeBtn) closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  document.addEventListener('click', e => {
    if (mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)) { close(); }
  });

  document.querySelectorAll('.mobile-accordion-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const arrow = toggle.querySelector('.mob-arrow');
      const isOpen = content.classList.contains('open');
      document.querySelectorAll('.mobile-accordion-content.open').forEach(c => c.classList.remove('open'));
      document.querySelectorAll('.mob-arrow.rotated').forEach(a => a.classList.remove('rotated'));
      if (!isOpen) {
        content.classList.add('open');
        if (arrow) arrow.classList.add('rotated');
      }
    });
  });
})();

/* ── 6. PRECISION CROSSHAIR CURSOR ── */
(function() {
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const dot   = document.createElement('div'); dot.className = 'cursor-dot';
  const hLine = document.createElement('div'); hLine.className = 'cursor-h';
  const vLine = document.createElement('div'); vLine.className = 'cursor-v';
  document.body.appendChild(dot);
  document.body.appendChild(hLine);
  document.body.appendChild(vLine);

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    hLine.style.transform = `translateY(${mouseY}px)`;
    vLine.style.transform = `translateX(${mouseX}px)`;

    const xPct = (mouseX / window.innerWidth * 100).toFixed(2);
    const yPct = (mouseY / window.innerHeight * 100).toFixed(2);

    hLine.style.background = `linear-gradient(to right,
      transparent 0%,
      rgba(200,134,26,0.35) calc(${xPct}% - 40px),
      rgba(200,134,26,0.0) calc(${xPct}% - 6px),
      rgba(200,134,26,0.0) calc(${xPct}% + 6px),
      rgba(200,134,26,0.35) calc(${xPct}% + 40px),
      transparent 100%)`;

    vLine.style.background = `linear-gradient(to bottom,
      transparent 0%,
      rgba(200,134,26,0.35) calc(${yPct}% - 40px),
      rgba(200,134,26,0.0) calc(${yPct}% - 6px),
      rgba(200,134,26,0.0) calc(${yPct}% + 6px),
      rgba(200,134,26,0.35) calc(${yPct}% + 40px),
      transparent 100%)`;
  }, { passive: true });

  const hoverTargets = 'a, button, .service-card, .gallery-card, .faq-question, .city-badge, .comm-card, .area-badge';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverTargets)) dot.classList.add('is-hovering');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverTargets)) dot.classList.remove('is-hovering');
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    hLine.style.opacity = '0';
    vLine.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    hLine.style.opacity = '1';
    vLine.style.opacity = '1';
  });
})();

/* ── 7. STATS COUNT-UP ── */
(function() {
  const statsSection = document.getElementById('stats-section');
  if (!statsSection) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    statsSection.querySelectorAll('[data-count]').forEach(el => {
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals') || '0');
      const val = parseFloat(el.getAttribute('data-count'));
      el.textContent = decimals > 0 ? val.toFixed(decimals) + suffix : Math.round(val) + suffix;
    });
    return;
  }
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  const duration = 2500;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        const target  = parseFloat(el.getAttribute('data-count'));
        const suffix  = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0');
        const start = performance.now();
        const tick = now => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutCubic(progress);
          const current = target * eased;
          el.textContent = (decimals > 0 ? current.toFixed(decimals) : Math.round(current)) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    });
  }, { threshold: 0.3 });

  obs.observe(statsSection);
})();

/* ── 8. FAQ ACCORDION ── */
(function() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(other => {
        if (other === btn) return;
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.style.maxHeight = '0';
      });

      if (isOpen) {
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
})();

/* ── 9. GALLERY FILTER TABS ── */
(function() {
  const tabs  = document.querySelectorAll('.gallery-tab');
  const cards = document.querySelectorAll('.gallery-card');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');
      cards.forEach(card => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
})();

/* ── 10. SCROLL ANIMATIONS ── */
(function() {
  const items = document.querySelectorAll('.fade-up');
  if (!items.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => obs.observe(el));
})();

/* ── 11. BACK TO TOP ── */
(function() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── 12. FORM SUBMIT HANDLERS ── */
(function() {
  document.querySelectorAll('form[id]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const original = btn.textContent;
      btn.textContent = '✓ Received — This is a demo site';
      btn.style.background = 'var(--slate)';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  });
})();

/* ── 13. STICKY ESTIMATE BANNER ── */
(function() {
  const banner = document.getElementById('sticky-banner');
  if (!banner) return;
  if (sessionStorage.getItem('ridgeline-banner-dismissed')) return;

  let shown = false;
  const dismiss = banner.querySelector('.sticky-banner-dismiss');
  if (dismiss) {
    dismiss.addEventListener('click', () => {
      banner.classList.remove('visible');
      sessionStorage.setItem('ridgeline-banner-dismissed', '1');
    });
  }

  window.addEventListener('scroll', () => {
    if (shown) return;
    const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    if (scrolled >= 0.65) {
      shown = true;
      banner.classList.add('visible');
    }
  }, { passive: true });
})();

/* ── TESTIMONIAL CAROUSEL ── */
(function() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots   = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  if (!slides.length) return;

  let current = 0;
  let timer;

  const goTo = idx => {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  };

  const startAuto = () => {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  };

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAuto(); }));

  startAuto();
})();

/* ── COMMERCIAL HUB FORM HANDLER ── */
(function() {
  const commForm = document.getElementById('commercial-form');
  if (!commForm) return;
  commForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = commForm.querySelector('button[type="submit"]');
    const feedback = document.getElementById('commercial-form-feedback');
    const originalText = btn.textContent;

    btn.textContent = '✓ Received — This is a demo site';
    btn.style.background = '#1A2E1A';
    btn.disabled = true;

    if (feedback) {
      feedback.style.display = 'block';
      feedback.style.background = 'rgba(26,46,26,0.08)';
      feedback.style.color = '#1A2E1A';
      feedback.style.border = '1px solid rgba(26,46,26,0.2)';
      feedback.textContent =
        'Thank you — our commercial team will follow up ' +
        'within one business day. This is a demo site.';
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
      if (feedback) {
        feedback.style.display = 'none';
        feedback.textContent = '';
      }
      commForm.reset();
    }, 4000);
  });
})();
