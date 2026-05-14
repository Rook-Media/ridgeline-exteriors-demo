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

/* ── PROJECT DATA ── */
const projectData = {
  'hardie-artisan-naperville': {
    title: 'James Hardie Artisan Install',
    location: 'Naperville, IL',
    type: 'Fiber Cement Siding',
    scope: 'Full James Hardie Artisan V-Groove installation, approximately 2,400 sq ft, with ColorPlus primed finish and custom trim package',
    beforeLabel: 'Failing Vinyl Siding',
    beforeDesc: 'Original vinyl with warping, fading, and gaps at corners — no longer weatherproof after 20 years of UV and thermal cycling',
    afterLabel: 'Hardie Artisan Install Complete',
    afterDesc: 'Full tear-off and replacement with James Hardie Artisan V-Groove, primed finish, full moisture barrier and wrap system — 30-year warranty',
  },
  'smartside-ranch-aurora': {
    title: 'LP SmartSide Ranch Reside',
    location: 'Aurora, IL',
    type: 'Engineered Wood Siding',
    scope: 'Complete LP SmartSide lap reside, approximately 1,800 sq ft ranch, with new housewrap and full trim package',
    beforeLabel: 'Rotting Wood Lap Siding',
    beforeDesc: 'Original 1970s wood lap with widespread rot, peeling paint, and failed caulk seams allowing water infiltration at multiple points',
    afterLabel: 'LP SmartSide Lap Complete',
    afterDesc: 'Full tear-off and LP SmartSide 8-inch lap installation, factory SmartGuard primer, new housewrap, trim boards, and soffit panels throughout',
  },
  'vinyl-replacement-downers-grove': {
    title: 'Full Vinyl Replacement',
    location: 'Downers Grove, IL',
    type: 'Vinyl Siding',
    scope: 'Full vinyl reside, approximately 2,100 sq ft two-story, with foam-back insulated panels and full trim replacement',
    beforeLabel: 'Chalked, Cracked Vinyl',
    beforeDesc: 'Contractor-grade vinyl from the 1990s with fading, cracking, and multiple storm-damaged panels — no longer code compliant after hail event',
    afterLabel: 'Insulated Vinyl System',
    afterDesc: 'Full reside with premium insulated vinyl, upgraded J-channel and trim, seamless inside corners — 25-year manufacturer warranty',
  },
  'storm-damage-wheaton': {
    title: 'Storm Damage Repair',
    location: 'Wheaton, IL',
    type: 'Siding Repair',
    scope: 'Insurance-documented storm damage repair, approximately 600 sq ft of impact-damaged panels with full profile and color match',
    beforeLabel: 'Hail-Impacted Siding',
    beforeDesc: 'Isolated hail damage across south and west elevations — dented panels, cracked trim, and fascia damage documented in the insurance estimate',
    afterLabel: 'Matched Repair Complete',
    afterDesc: 'Panel-for-panel replacement using matching profiles and manufacturer color match, new fascia and trim caps on all impacted sections — insurer approved',
  },
  'board-batten-geneva': {
    title: 'Board & Batten Accent',
    location: 'Geneva, IL',
    type: 'Fiber Cement Siding',
    scope: 'James Hardie HardiePanel vertical board and batten accent on gable ends and upper story, approximately 400 sq ft',
    beforeLabel: 'Plain Horizontal Siding',
    beforeDesc: 'Original horizontal lap with no architectural variation — homeowners wanted a two-tone board and batten accent to break up the facade',
    afterLabel: 'Board & Batten Accent Added',
    afterDesc: 'HardiePanel smooth vertical board and batten on gable ends and upper story, painted charcoal to contrast with the existing white lap',
  },
  'strip-mall-bolingbrook': {
    title: 'Commercial Strip Mall Reside',
    location: 'Bolingbrook, IL',
    type: 'Commercial Siding',
    scope: 'Full strip mall reside, approximately 6,400 sq ft, fiber cement lap on three tenant bay exteriors with new storefront trim',
    beforeLabel: 'Failing Stucco Exterior',
    beforeDesc: 'Existing stucco cracking and delaminating, causing water infiltration into two tenant bays — facility manager needed a permanent solution',
    afterLabel: 'Fiber Cement Commercial Install',
    afterDesc: 'Full stucco tear-off, new sheathing and weatherproof barrier, fiber cement lap on all three bays with new aluminum storefront trim package',
  },
  'hardieplank-replacement-oswego': {
    title: 'HardiePlank Full Replacement',
    location: 'Oswego, IL',
    type: 'Fiber Cement Siding',
    scope: 'Full HardiePlank lap replacement, 2,600 sq ft two-story, ColorPlus Iron Gray finish with white trim and new window casings',
    beforeLabel: 'Deteriorating OSB Lap Siding',
    beforeDesc: 'Builder-grade OSB-based siding with widespread water damage, corner swelling, and paint failure — OSB no longer viable as a substrate',
    afterLabel: 'HardiePlank ColorPlus Finish',
    afterDesc: 'Full tear-off to studs, new moisture barrier where needed, HardiePlank lap in ColorPlus Iron Gray — 30-year fiber cement warranty',
  },
  'insulated-vinyl-plainfield': {
    title: 'Insulated Vinyl Installation',
    location: 'Plainfield, IL',
    type: 'Vinyl Siding',
    scope: 'Complete insulated vinyl reside, approximately 2,300 sq ft, with contoured foam-back panels adding R-2.7 insulation value',
    beforeLabel: 'Standard Thin Vinyl',
    beforeDesc: 'Original thin-profile vinyl with poor insulation value, oil-canning on sun-exposed elevations, and multiple dents from previous hail events',
    afterLabel: 'Contoured Foam-Back Vinyl',
    afterDesc: 'Full reside with insulated vinyl, 0.044-in. panel with contoured foam backer — improved sound and thermal performance throughout',
  },
  'smartside-colonial-batavia': {
    title: 'LP SmartSide Colonial',
    location: 'Batavia, IL',
    type: 'Engineered Wood Siding',
    scope: 'LP SmartSide lap reside on classic colonial, approximately 2,200 sq ft, with full trim, corner boards, and window surrounds',
    beforeLabel: 'Rotted Wood Clapboard',
    beforeDesc: 'Original wood clapboard with rot at base courses, failed caulking at windows, and 30%+ of boards requiring replacement — moisture damage widespread',
    afterLabel: 'LP SmartSide Colonial Complete',
    afterDesc: 'Complete tear-off and LP SmartSide lap with factory primed finish, new corner boards, window surrounds, and premium caulking system throughout',
  },
  'hail-damage-lisle': {
    title: 'Hail Damage Repair',
    location: 'Lisle, IL',
    type: 'Siding Repair',
    scope: 'Insurance-documented hail damage repair on full north and east elevations, approximately 900 sq ft, with fascia and soffit replacement',
    beforeLabel: 'Storm-Damaged Panels',
    beforeDesc: 'Significant hail impact on north and east elevations — dented panels, cracked trim, and impact damage to fascia documented in adjuster report',
    afterLabel: 'Elevation Repair Complete',
    afterDesc: 'Full elevation reside on impacted faces with profile and color match, new fascia caps and soffit on affected sections — insurer paid, deductible only',
  },
  'cape-cod-hardie-st-charles': {
    title: 'Cape Cod Hardie Install',
    location: 'St. Charles, IL',
    type: 'Fiber Cement Siding',
    scope: 'Full James Hardie lap reside on cape cod, approximately 1,900 sq ft, with HardieShingle accents on dormers and custom trim detail',
    beforeLabel: 'Oxidized Wood Shingles',
    beforeDesc: 'Weathered wood shingle siding with significant color variation, moss growth in shaded areas, and caulk failure at all dormer transitions',
    afterLabel: 'HardiePlank with Shingle Accents',
    afterDesc: 'Full reside in HardiePlank lap, HardieShingle on dormers and gable ends — coordinated gray/white scheme with 30-year fiber cement warranty',
  },
  'office-park-warrenville': {
    title: 'Office Park Exterior Reside',
    location: 'Warrenville, IL',
    type: 'Commercial Siding',
    scope: 'Full exterior reside on 14,000 sq ft office building, fiber cement lap on main elevations with metal panel accents on entry facade',
    beforeLabel: 'Aged EIFS Exterior',
    beforeDesc: 'EIFS (synthetic stucco) with systemic cracking, failed sealant joints at windows, and two water intrusion events documented in the prior 24 months',
    afterLabel: 'Fiber Cement Office Exterior',
    afterDesc: 'Full EIFS removal, moisture remediation, new moisture barrier, fiber cement lap with painted metal accent panels — commercial-grade caulk at all penetrations',
  },
  'hardieshingle-gable-wheaton': {
    title: 'HardieShingle Accent Gable',
    location: 'Wheaton, IL',
    type: 'Fiber Cement Siding',
    scope: 'HardieShingle accent installation on front gable peak and porch columns, approximately 280 sq ft, with custom trim detail',
    beforeLabel: 'Deteriorating Vinyl Shakes',
    beforeDesc: 'Original vinyl shake panels faded to chalky gray, with multiple cracked pieces and a color that no longer matched the updated home exterior',
    afterLabel: 'HardieShingle Gable Accent',
    afterDesc: 'HardieShingle installed on front gable with custom trim detail, painted to complement the home — transformed street presence of the facade',
  },
  'smartside-farmhouse-oswego': {
    title: 'SmartSide Modern Farmhouse',
    location: 'Oswego, IL',
    type: 'Engineered Wood Siding',
    scope: 'LP SmartSide reside on modern farmhouse, approximately 2,500 sq ft, combining horizontal lap with vertical board and batten on front facade',
    beforeLabel: 'Builder Vinyl — Faded',
    beforeDesc: 'Original thin builder-grade vinyl from new construction 12 years prior, widespread fading and several panels cracked by a prior hail event',
    afterLabel: 'SmartSide Modern Farmhouse',
    afterDesc: 'LP SmartSide lap on main body, SmartSide board and batten on front facade — crisp white with black trim for a modern farmhouse aesthetic',
  },
  'dutch-lap-woodridge': {
    title: 'Dutch Lap Vinyl Reside',
    location: 'Woodridge, IL',
    type: 'Vinyl Siding',
    scope: 'Full dutch-lap vinyl reside, approximately 1,950 sq ft, with matching trim, soffit, and fascia replacement throughout',
    beforeLabel: 'Original Flat Lap Vinyl',
    beforeDesc: 'Flat-profile vinyl from the early 2000s — chalky surface, no longer accepting paint, and multiple impact marks on the street-facing elevation',
    afterLabel: 'Dutch Lap Profile Reside',
    afterDesc: 'Full reside in premium dutch-lap vinyl with scalloped shadow-line profile, coordinated trim, new soffit panels, and aluminum-wrapped fascia throughout',
  },
  'wind-damage-bolingbrook': {
    title: 'Wind Damage Repair',
    location: 'Bolingbrook, IL',
    type: 'Siding Repair',
    scope: 'Emergency wind damage repair on west and south elevations, approximately 450 sq ft of blown-off panels, with temporary weatherproofing and full replacement',
    beforeLabel: 'Storm-Blown Panels',
    beforeDesc: 'Derecho-force winds pulled entire sections of siding off the west elevation, exposing housewrap on approximately 30 linear feet of wall',
    afterLabel: 'Emergency Repair Complete',
    afterDesc: 'Same-week emergency tarping followed by full profile replacement — panels, trim, and corner caps replaced, all sealed and color-matched',
  },
  'hoa-community-lisle': {
    title: 'HOA Community Reside',
    location: 'Lisle, IL',
    type: 'Commercial Siding',
    scope: 'Full reside on 8 townhome units, approximately 12,000 sq ft total, fiber cement lap with consistent color and trim per HOA specification',
    beforeLabel: 'Mixed Failing Siding',
    beforeDesc: '8-unit townhome row with multiple mismatched repair patches — some vinyl, some wood — deteriorating beyond individual repair',
    afterLabel: 'Unified HOA Fiber Cement',
    afterDesc: 'Coordinated full reside across all 8 units in matching James Hardie lap, ColorPlus finish per HOA spec — delivered on a 6-week schedule',
  },
  'colorplus-ocean-mist-aurora': {
    title: 'ColorPlus Ocean Mist Install',
    location: 'Aurora, IL',
    type: 'Fiber Cement Siding',
    scope: 'Full James Hardie HardiePlank in ColorPlus Ocean Mist, approximately 2,100 sq ft, with white trim and new window wrap package',
    beforeLabel: 'Oxidized Beige Vinyl',
    beforeDesc: 'Original 1990s vinyl in faded beige — significant UV chalking, 15+ cracked panels, no longer aesthetically consistent with the updated neighborhood',
    afterLabel: 'ColorPlus Ocean Mist Finish',
    afterDesc: 'Full reside in HardiePlank ColorPlus Ocean Mist — factory-applied finish with 15-year fade/chip warranty, white trim, and new window flashing',
  },
};

/* ── PROJECT LIGHTBOX ── */
(function() {
  function createLightbox() {
    const modal = document.createElement('div');
    modal.id = 'project-lightbox';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Project details');
    modal.innerHTML = `
      <div class="lightbox-backdrop"></div>
      <div class="lightbox-panel">
        <button class="lightbox-close" aria-label="Close project view">&#x2715;</button>
        <div class="lightbox-body">
          <div class="lightbox-slider-wrap">
            <div class="lightbox-before">
              <div class="lightbox-svg-container before-svg"></div>
              <div class="lightbox-side-label before-side-label"></div>
            </div>
            <div class="lightbox-after">
              <div class="lightbox-svg-container after-svg"></div>
              <div class="lightbox-side-label after-side-label"></div>
            </div>
            <div class="lightbox-divider">
              <div class="lightbox-handle"><span>&#9668;</span><span>&#9658;</span></div>
            </div>
          </div>
          <div class="lightbox-info">
            <p class="lightbox-type"></p>
            <h2 class="lightbox-title"></h2>
            <p class="lightbox-location"></p>
            <div class="lightbox-scope-wrap">
              <h4>Project Scope</h4>
              <p class="lightbox-scope"></p>
            </div>
            <div class="lightbox-details-grid">
              <div class="lightbox-detail-card before-detail">
                <span class="detail-label">Before</span>
                <strong class="detail-heading before-label-text"></strong>
                <p class="detail-desc before-desc-text"></p>
              </div>
              <div class="lightbox-detail-card after-detail">
                <span class="detail-label">After</span>
                <strong class="detail-heading after-label-text"></strong>
                <p class="detail-desc after-desc-text"></p>
              </div>
            </div>
            <a href="${location.pathname.includes('/pages/') ? 'contact.html' : 'pages/contact.html'}" class="btn-primary lightbox-cta">Get a Free Estimate &#x2192;</a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  const lightbox = createLightbox();

  function initSlider(modal) {
    const sliderWrap = modal.querySelector('.lightbox-slider-wrap');
    const divider = modal.querySelector('.lightbox-divider');
    let isDragging = false;
    let autoAnimFrame;

    function setSliderPos(pct) {
      pct = Math.max(2, Math.min(98, pct));
      divider.style.left = pct + '%';
      sliderWrap.querySelector('.lightbox-after').style.clipPath = 'inset(0 0 0 ' + pct + '%)';
    }

    function autoSweep() {
      const start = performance.now();
      const duration = 1800;
      function frame(now) {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const pos = 100 - (ease * 50);
        setSliderPos(pos);
        if (t < 1) autoAnimFrame = requestAnimationFrame(frame);
      }
      autoAnimFrame = requestAnimationFrame(frame);
    }

    function getEventX(e) {
      return e.touches ? e.touches[0].clientX : e.clientX;
    }

    function onMove(e) {
      if (!isDragging) return;
      const rect = sliderWrap.getBoundingClientRect();
      const pct = ((getEventX(e) - rect.left) / rect.width) * 100;
      setSliderPos(pct);
    }

    divider.addEventListener('mousedown', () => { cancelAnimationFrame(autoAnimFrame); isDragging = true; });
    divider.addEventListener('touchstart', () => { cancelAnimationFrame(autoAnimFrame); isDragging = true; }, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('touchend', () => { isDragging = false; });

    return { setSliderPos, autoSweep, cancelAuto: () => cancelAnimationFrame(autoAnimFrame) };
  }

  const slider = initSlider(lightbox);

  function openLightbox(projectKey) {
    console.log('[Lightbox] openLightbox called — projectKey:', projectKey);

    const data = projectData[projectKey];
    if (!data) {
      console.warn('[Lightbox] No projectData found for key:', projectKey);
      return;
    }
    console.log('[Lightbox] projectData found:', data.title);

    lightbox.querySelector('.lightbox-type').textContent = data.type;
    lightbox.querySelector('.lightbox-title').textContent = data.title;
    lightbox.querySelector('.lightbox-location').textContent = '📍 ' + data.location;
    lightbox.querySelector('.lightbox-scope').textContent = data.scope;
    lightbox.querySelector('.before-label-text').textContent = data.beforeLabel;
    lightbox.querySelector('.before-desc-text').textContent = data.beforeDesc;
    lightbox.querySelector('.after-label-text').textContent = data.afterLabel;
    lightbox.querySelector('.after-desc-text').textContent = data.afterDesc;
    console.log('[Lightbox] Text fields populated');

    const card = document.querySelector('[data-project="' + projectKey + '"]');
    const svgEl = card ? card.querySelector('.gallery-card-img svg') : null;
    const beforeContainer = lightbox.querySelector('.before-svg');
    const afterContainer = lightbox.querySelector('.after-svg');
    console.log('[Lightbox] Card found:', !!card, '| SVG found:', !!svgEl);

    if (svgEl) {
      const cloneForPanel = function(svg) {
        const clone = svg.cloneNode(true);
        clone.style.width = '140px';
        clone.style.height = '100px';
        clone.style.display = 'block';
        const rects = clone.querySelectorAll('rect');
        rects.forEach(function(r) {
          if (!r.getAttribute('x') && !r.getAttribute('y') && r.getAttribute('width') === '140') {
            r.style.fill = 'transparent';
          }
        });
        return clone;
      };

      const beforeSvg = cloneForPanel(svgEl);
      beforeSvg.querySelectorAll('[fill]').forEach(function(el) {
        const f = el.getAttribute('fill');
        if (f && f !== 'none' && !f.includes('C8861A') && !f.includes('c8861a') && el.style.fill !== 'transparent') {
          el.setAttribute('fill', 'rgba(70,80,95,0.7)');
        }
      });
      beforeSvg.querySelectorAll('[opacity]').forEach(function(el) {
        el.setAttribute('opacity', '0.4');
      });
      beforeContainer.innerHTML = '';
      beforeContainer.appendChild(beforeSvg);

      const afterSvg = cloneForPanel(svgEl);
      afterContainer.innerHTML = '';
      afterContainer.appendChild(afterSvg);
    } else {
      beforeContainer.innerHTML = '';
      afterContainer.innerHTML = '';
    }

    lightbox.querySelector('.before-side-label').textContent = 'BEFORE';
    lightbox.querySelector('.after-side-label').textContent = 'AFTER';

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    console.log('[Lightbox] Modal shown — classList:', lightbox.classList.toString(), '| z-index:', window.getComputedStyle(lightbox).zIndex);

    slider.setSliderPos(100);
    console.log('[Lightbox] Slider positioned at 100%');

    setTimeout(function() {
      slider.autoSweep();
      console.log('[Lightbox] Auto-sweep started');
    }, 80);
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    slider.cancelAuto();
  }

  document.querySelectorAll('.gallery-card[data-project]').forEach(function(card) {
    card.addEventListener('click', function() { openLightbox(card.dataset.project); });
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(card.dataset.project); }
    });
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
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
