/* Template interactions — reusable across client instances */
(function() {
  /* Static icon mapping (for hand-written IDs in HTML shell) */
  const staticMap = {
    'ic-pin1': 'pin', 'ic-ph1': 'phone', 'ic-m1': 'mail', 'ic-ph2': 'phone', 'ic-ph3': 'phone',
    'ic-doc1': 'doc', 'ic-sh1': 'shield', 'ic-md1': 'medal', 'ic-ck1': 'check',
    'ic-sh2': 'shield', 'ic-md2': 'medal', 'ic-eu1': 'euro', 'ic-cl1': 'clock',
    'ic-af1': 'handshake', 'ic-af2': 'check', 'ic-af3': 'brick', 'ic-af4': 'tools', 'ic-af5': 'arrow',
    'ic-cc1': 'phone', 'ic-cc2': 'mail', 'ic-cc3': 'pin', 'ic-sb1': 'arrow', 'ic-ftel': 'phone',
    'ic-burger': 'menu', 'ic-close': 'plus',
  };
  /* Pattern-based icon mapping for dynamic IDs emitted by apply-config.js */
  const patterns = [
    { re: /^ic-hb\d+$/,  icon: 'shield'  }, // hero badges
    { re: /^ic-at1$/,    icon: 'shield'  },
    { re: /^ic-at2$/,    icon: 'medal'   },
    { re: /^ic-at3$/,    icon: 'euro'    },
    { re: /^ic-at4$/,    icon: 'clock'   },
    { re: /^ic-a\d+$/,   icon: 'arrow'   }, // service card arrows
    { re: /^ic-st1$/,    icon: 'phone'   },
    { re: /^ic-st2$/,    icon: 'tools'   },
    { re: /^ic-st3$/,    icon: 'doc'     },
    { re: /^ic-st4$/,    icon: 'check'   },
    { re: /^ic-stt1$/,   icon: 'calendar'},
    { re: /^ic-stt2$/,   icon: 'clock'   },
    { re: /^ic-stt3$/,   icon: 'house'   },
    { re: /^ic-stt4$/,   icon: 'doc'     },
    { re: /^ic-ct1$/,    icon: 'shield'  },
    { re: /^ic-ct2$/,    icon: 'medal'   },
    { re: /^ic-ct3$/,    icon: 'check'   },
    { re: /^ic-ct4$/,    icon: 'shield'  },
    { re: /^ic-ct5$/,    icon: 'doc'     },
    { re: /^ic-p\d+$/,   icon: 'pin'     }, // zone pins
    { re: /^fq\d+$/,     icon: 'plus'    }, // faq toggles
    { re: /^ts\d+-\d+$/, icon: 'star'    }, // testimonial stars
    { re: /^st\d[a-e]?$/,icon: 'star'    }, // legacy testimonial stars
  ];
  function paintIcons(root) {
    const scope = root || document;
    scope.querySelectorAll('[id]').forEach(el => {
      if (el.innerHTML) return;
      const id = el.id;
      let icon = staticMap[id];
      if (!icon) {
        const p = patterns.find(p => p.re.test(id));
        if (p) icon = p.icon;
      }
      if (icon && window.BSOIcons) el.innerHTML = window.BSOIcons[icon] || '';
    });
  }
  paintIcons();
  document.addEventListener('client-config-applied', () => paintIcons());
  const closeIcon = document.getElementById('ic-close');
  if (closeIcon && closeIcon.firstElementChild) closeIcon.firstElementChild.style.transform = 'rotate(45deg)';

  /* Reveal */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => io.observe(el));

  /* Nav scroll */
  const nav = document.getElementById('nav');
  if (nav) window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 20); });

  /* Counters */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target; const target = +el.dataset.count; const duration = 1800; const start = performance.now();
          const animate = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.floor(eased * target);
            if (t < 1) requestAnimationFrame(animate); else el.textContent = target;
          };
          requestAnimationFrame(animate); counterIO.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterIO.observe(c));
  }

  /* Mobile drawer */
  const burger = document.getElementById('navBurger');
  const drawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  if (burger && drawer) {
    burger.addEventListener('click', () => drawer.classList.add('open'));
    if (drawerClose) drawerClose.addEventListener('click', () => drawer.classList.remove('open'));
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => drawer.classList.remove('open')));
  }

  /* Avant / Après slider */
  const baSlider = document.getElementById('baSlider');
  if (baSlider) {
    const handle = baSlider.querySelector('.ba-handle');
    let dragging = false;
    const setPos = (clientX) => {
      const r = baSlider.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
      baSlider.style.setProperty('--pos', pct + '%');
      if (handle) handle.setAttribute('aria-valuenow', Math.round(pct));
    };
    baSlider.addEventListener('pointerdown', (e) => { dragging = true; baSlider.setPointerCapture(e.pointerId); setPos(e.clientX); });
    baSlider.addEventListener('pointermove', (e) => { if (dragging) setPos(e.clientX); });
    baSlider.addEventListener('pointerup', (e) => { dragging = false; try { baSlider.releasePointerCapture(e.pointerId); } catch(_){} });
    baSlider.addEventListener('pointercancel', () => { dragging = false; });
    if (handle) {
      handle.addEventListener('keydown', (e) => {
        const cs = getComputedStyle(baSlider).getPropertyValue('--pos');
        const cur = parseFloat(cs) || 50;
        if (e.key === 'ArrowLeft') { baSlider.style.setProperty('--pos', Math.max(0, cur - 5) + '%'); handle.setAttribute('aria-valuenow', Math.round(Math.max(0, cur - 5))); e.preventDefault(); }
        if (e.key === 'ArrowRight') { baSlider.style.setProperty('--pos', Math.min(100, cur + 5) + '%'); handle.setAttribute('aria-valuenow', Math.round(Math.min(100, cur + 5))); e.preventDefault(); }
      });
    }
  }
})();
