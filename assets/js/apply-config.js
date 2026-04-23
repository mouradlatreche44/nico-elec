/**
 * apply-config.js — Template reusable engine
 * ------------------------------------------------------------
 * Reads window.CLIENT (set by client.config.js) and injects
 * every dynamic piece of the page : text, lists, JSON-LD, SEO,
 * navigation, services, testimonials, FAQ, footer…
 *
 * Page authors mark slots with data-c="key". The engine
 * takes care of injection + JSON-LD auto-generation.
 * ------------------------------------------------------------
 */

(function () {
  const C = window.CLIENT;
  if (!C) { console.warn('[apply-config] window.CLIENT is missing'); return; }

  const qsa = (sel) => Array.from(document.querySelectorAll(sel));
  const esc = (s) => String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const setText = (sel, v) => qsa(sel).forEach(el => el.textContent = v);
  const setHTML = (sel, v) => qsa(sel).forEach(el => el.innerHTML  = v);
  const setAttr = (sel, a, v) => qsa(sel).forEach(el => el.setAttribute(a, v));

  /* 1. CSS custom properties — full brand theming */
  const root = document.documentElement;
  const k = C.couleurs;
  const setVar = (n, v) => { if (v) root.style.setProperty(n, v); };

  // Canonical tokens
  setVar('--color-primary',        k.primary);
  setVar('--color-primary-dark',   k.primaryDark  || k.primary);
  setVar('--color-primary-light',  k.primaryLight || k.primary);
  setVar('--color-accent',         k.accent);
  setVar('--color-accent-dark',    k.accentDark   || k.accent);
  setVar('--color-bg',             k.bg           || '#ffffff');
  setVar('--color-bg-soft',        k.bgSoft       || k.cream);
  setVar('--color-surface',        k.surface      || '#ffffff');
  setVar('--color-text',           k.text         || '#0F2435');
  setVar('--color-text-muted',     k.textMuted    || '#5A6B7A');
  setVar('--color-dark',           k.dark || k.primaryDark || '#0F2F42');

  // Legacy aliases used by the original BSO template CSS — remapped to new palette
  setVar('--brick',        k.primary);
  setVar('--brick-dark',   k.primaryDark  || k.primary);
  setVar('--brick-light',  k.primaryLight || k.primary);
  setVar('--clay',         k.accent);
  setVar('--clay-dark',    k.accentDark   || k.accent);
  setVar('--cream',        k.bg           || '#fff');
  setVar('--cream-soft',   k.bgSoft       || k.cream || '#f7f9ff');
  setVar('--navy',         k.primaryDark  || k.primary);
  setVar('--line',         k.bgSoft       || '#E5EAF0');

  /* 2. Identity / contact / zone */
  setText('[data-c="nom"]',         C.nom);
  setText('[data-c="slogan"]',      C.slogan);
  setText('[data-c="tagline"]',     C.tagline || C.slogan);
  setText('[data-c="desc"]',        C.description);
  setText('[data-c="metier"]',      C.metier || '');
  setText('[data-c="depuis"]',      C.depuis);
  setText('[data-c="tel"]',         C.telephoneAff);
  setText('[data-c="email"]',       C.email);
  setText('[data-c="adresse"]',     C.adresse);
  setText('[data-c="ville"]',       C.ville);
  setText('[data-c="zone"]',        C.zoneHero);
  setText('[data-c="zone-resume"]', C.zoneResume || C.zoneHero);
  setText('[data-c="dept"]',        C.departement);
  setText('[data-c="annee"]',       C.annee);
  setText('[data-c="delai-devis"]', C.delaiDevis || '24h');
  setText('[data-c="copyright"]',   `© ${C.annee} ${C.nom}`);
  setText('[data-c="cta-label"]',   (C.nav && C.nav.ctaLabel) || 'Devis gratuit');

  setAttr('[data-c="tel-link"]',    'href', 'tel:' + C.telephone);
  setAttr('[data-c="email-link"]',  'href', 'mailto:' + C.email);

  /* 3. Social links */
  Object.entries(C.reseaux || {}).forEach(([k, v]) => {
    setAttr(`[data-c="rs-${k}"]`, 'href', v);
  });

  /* 4. Stats */
  (C.stats || []).forEach((s, i) => {
    setText(`[data-c="stat-val-${i}"]`,   s.valeur);
    setText(`[data-c="stat-label-${i}"]`, s.label);
  });

  /* 5. Certifications — cert grid */
  const certsRoot = document.querySelector('[data-c="certs-grid"]');
  if (certsRoot) {
    certsRoot.innerHTML = (C.certifications || []).map((c, i) => `
      <div class="cert reveal d-${(i%5)+1}">
        <div class="cert-icon" id="ic-ct${i+1}"></div>
        <div class="cert-name">${esc(c.nom)}</div>
        <div class="cert-sub">${esc(c.sub)}</div>
      </div>
    `).join('');
  }

  /* 5b. Hero badges (first 3 certifications) */
  const heroBadgesRoot = document.querySelector('[data-c="hero-badges"]');
  if (heroBadgesRoot) {
    heroBadgesRoot.innerHTML = (C.certifications || []).slice(0, 3).map((c, i) => `
      <div class="hero-badge"><span id="ic-hb${i+1}"></span> ${esc(c.nom)}</div>
    `).join('');
  }

  /* 6. Atouts */
  const atoutsRoot = document.querySelector('[data-c="atouts-grid"]');
  if (atoutsRoot) {
    atoutsRoot.innerHTML = (C.atouts || []).map((a, i) => `
      <div class="atout reveal d-${i+1}">
        <span class="atout-icon" id="ic-at${i+1}"></span>
        <div>
          <div class="atout-title">${esc(a.title)}</div>
          <div class="atout-sub">${esc(a.sub)}</div>
        </div>
      </div>
    `).join('');
  }

  /* 7. Services cards */
  const servicesRoot = document.querySelector('[data-c="services-grid"]');
  if (servicesRoot) {
    servicesRoot.innerHTML = (C.services || []).map((s, i) => `
      <article class="service reveal d-${i+1}">
        <div class="service-media"><img src="${esc(s.image)}" alt="${esc(s.imageAlt)}" loading="lazy" /></div>
        <div class="service-num">${esc(s.srvNum || ('Prestation 0'+(i+1)))}</div>
        <h3>${esc(s.label)}</h3>
        <p>${esc(s.lead)}</p>
        <ul>${(s.points || []).slice(0, 4).map(p => `<li>${esc(p)}</li>`).join('')}</ul>
        <a href="${esc(s.slug)}" class="service-link">Découvrir la prestation <span id="ic-a${i+1}"></span></a>
      </article>
    `).join('');
  }

  /* 8. Nav dropdown "Métiers" */
  const navDropRoot = document.querySelector('[data-c="nav-drop"]');
  if (navDropRoot) {
    navDropRoot.innerHTML = (C.services || []).map(s =>
      `<a href="${esc(s.slug)}">${esc(s.navLabel || s.label)}</a>`
    ).join('');
  }

  /* 8b. Mobile drawer nav */
  const drawerNavRoot = document.querySelector('[data-c="drawer-nav"]');
  if (drawerNavRoot) {
    drawerNavRoot.innerHTML = [
      `<a href="index.html">Accueil</a>`,
      ...(C.services || []).map(s => `<a href="${esc(s.slug)}">${esc(s.label)}</a>`),
      `<a href="a-propos.html">À propos</a>`,
      `<a href="contact.html">Contact</a>`,
    ].join('');
  }

  /* 9. Process */
  const processRoot = document.querySelector('[data-c="process-grid"]');
  if (processRoot) {
    processRoot.innerHTML = (C.process || []).map((p, i) => `
      <div class="step reveal d-${i+1}">
        <div class="step-num">${esc(p.num)}</div>
        <div class="step-icon" id="ic-st${i+1}"></div>
        <h4>${esc(p.title)}</h4>
        <p>${esc(p.text)}</p>
      </div>
    `).join('');
  }

  /* 10. Réalisations */
  const realRoot = document.querySelector('[data-c="realizations-grid"]');
  if (realRoot) {
    realRoot.innerHTML = (C.realizations || []).map((r, i) => `
      <div class="realization reveal${i ? ' d-'+i : ''}">
        <img src="${esc(r.image)}" alt="${esc(r.alt)}" loading="lazy" />
        <div class="realization-overlay">
          <span class="realization-tag">${esc(r.tag)}</span>
          <h4>${esc(r.titre)}</h4>
          <div class="realization-meta">${esc(r.meta)}</div>
        </div>
      </div>
    `).join('');
  }

  /* 11. Témoignages */
  const testiRoot = document.querySelector('[data-c="testi-grid"]');
  if (testiRoot) {
    testiRoot.innerHTML = (C.avis || []).map((a, i) => `
      <div class="testi reveal d-${i+1}">
        <div class="testi-stars">${
          Array.from({length: a.note || 5}, (_,k) => `<span id="ts${i+1}-${k+1}"></span>`).join('')
        }</div>
        <p class="testi-text">« ${esc(a.texte)} »</p>
        <div class="testi-author">
          <div class="testi-avatar">${esc(a.avatar)}</div>
          <div>
            <div class="testi-name">${esc(a.nom)}</div>
            <div class="testi-city">${esc(a.ville)} · ${esc(a.date)}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  /* 12. Zone cities list + chips */
  const zoneRoot = document.querySelector('[data-c="zone-cities"]');
  if (zoneRoot) {
    zoneRoot.innerHTML = (C.communes || []).slice(0, 12).map((v, i) =>
      `<li><span id="ic-p${i+1}"></span> ${esc(v)}</li>`
    ).join('');
  }
  const communesChipsRoot = document.querySelector('[data-c="communes"]');
  if (communesChipsRoot) {
    communesChipsRoot.innerHTML = (C.communes || []).map(v =>
      `<span class="commune-chip">${esc(v)}</span>`
    ).join('');
  }

  /* 13. FAQ */
  const faqRoot = document.querySelector('[data-c="faq-grid"]');
  if (faqRoot) {
    faqRoot.innerHTML = (C.faq || []).map((f, i) => `
      <div class="faq-item">
        <button class="faq-q" onclick="this.parentElement.classList.toggle('open')">${esc(f.q)}<span class="faq-toggle"><span id="fq${i+1}"></span></span></button>
        <div class="faq-a"><div class="faq-a-inner">${esc(f.a)}</div></div>
      </div>
    `).join('');
  }

  /* 14. Horaires */
  const horairesEl = document.querySelector('[data-c="horaires"]');
  if (horairesEl) {
    horairesEl.innerHTML = (C.horaires || []).map(h => `
      <div class="horaire-row">
        <span class="horaire-jour">${esc(h.jours)}</span>
        <span class="horaire-heure">${esc(h.heures)}</span>
      </div>
    `).join('');
  }

  /* 15. Marques */
  const marquesRoot = document.querySelector('[data-c="marques"]');
  if (marquesRoot) {
    marquesRoot.innerHTML = (C.marques || []).map(m =>
      `<span class="marque-chip">${esc(m)}</span>`
    ).join('');
  }

  /* 16. Form — project types */
  const formProjetsEl = document.querySelector('[data-c="form-projets"]');
  if (formProjetsEl) {
    formProjetsEl.innerHTML = `<option value="">Choisissez…</option>` +
      (C.formProjets || []).map(p => `<option>${esc(p)}</option>`).join('');
  }

  /* 17. Footer — services list */
  const footerServicesRoot = document.querySelector('[data-c="footer-services"]');
  if (footerServicesRoot) {
    footerServicesRoot.innerHTML = (C.services || []).map(s =>
      `<li><a href="${esc(s.slug)}">${esc(s.label)}</a></li>`
    ).join('');
  }

  /* 18. Maps iframe */
  setAttr('[data-c="maps"]', 'src', C.mapsEmbed || '');

  /* 19. Hero stamp */
  const stampEl = document.querySelector('[data-c="hero-stamp"]');
  if (stampEl && C.heroStamp) {
    stampEl.innerHTML = `${esc(C.heroStamp.line1)}<br/><span style="font-size:12px; letter-spacing:0.1em; font-style:normal; font-weight:600;">${esc(C.heroStamp.line2)}</span>`;
  }

  /* 20. Document title / meta / OG / canonical */
  const pageTitleEl = document.querySelector('meta[name="page-title"]');
  const pageDescEl  = document.querySelector('meta[name="page-desc"]');
  const customTitle = pageTitleEl && pageTitleEl.getAttribute('content');
  const customDesc  = pageDescEl  && pageDescEl.getAttribute('content');

  document.title = customTitle
    ? `${customTitle} | ${C.nom}`
    : `${C.nom} — ${C.slogan} — ${C.departement}`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', customDesc || C.description);

  setAttr('[data-c="og-title"]',       'content', document.title);
  setAttr('[data-c="og-description"]', 'content', customDesc || C.description);
  setAttr('[data-c="og-url"]',         'content', C.urlCanonical);
  setAttr('[data-c="og-site"]',        'content', C.nom);
  setAttr('[data-c="canonical"]',      'href',    C.urlCanonical);
  setAttr('meta[name="theme-color"]',  'content', C.couleurs.primary);

  /* 21. JSON-LD (@graph) auto-generated */
  const jsonLdSlot = document.querySelector('[data-c="json-ld"]');
  if (jsonLdSlot) {
    const url = C.urlCanonical.replace(/\/$/, '') + '/';
    const graph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": C.schemaType || ["LocalBusiness"],
          "@id": url + "#org",
          "name": C.nom,
          "description": C.description,
          "url": url,
          "telephone": "+33" + C.telephone.replace(/^0/, ''),
          "email": C.email,
          "priceRange": "€€",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": C.ville,
            "postalCode": C.codePostal,
            "addressRegion": C.region,
            "addressCountry": C.pays,
          },
          "geo": { "@type": "GeoCoordinates", "latitude": C.geo.lat, "longitude": C.geo.lng },
          "areaServed": (C.communes || []).map(c => ({ "@type": "City", "name": c })),
          "foundingDate": C.depuis,
          "hasCredential": (C.certifications || []).map(c => ({
            "@type": "EducationalOccupationalCredential",
            "name": c.nom,
            "credentialCategory": "certification",
          })),
          "slogan": C.slogan,
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Prestations " + C.nom,
            "itemListElement": (C.services || []).map(s => ({
              "@type": "Offer",
              "itemOffered": { "@type": "Service", "name": s.label, "url": url + s.slug, "areaServed": C.departement }
            })),
          },
        },
        {
          "@type": "WebSite",
          "@id": url + "#site",
          "url": url,
          "name": C.nom,
          "inLanguage": "fr-FR",
          "publisher": { "@id": url + "#org" },
        },
        {
          "@type": "FAQPage",
          "mainEntity": (C.faq || []).map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a },
          })),
        },
      ],
    };
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(graph);
    jsonLdSlot.replaceWith(s);
  }

  setAttr('[data-c="logo-alt"]', 'alt', C.nom);

  /* 22. Brand logo — use PNG at assets/img/logo.png if present, else SVG fallback */
  const logoPath = (C.logoPath || 'assets/img/logo.png');
  const logoImg = `<img src="${esc(logoPath)}" alt="${esc(C.nom)}" class="brand-mark-img" />`;
  const logoSvg = `
    <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="brand-mark">
      <circle cx="22" cy="22" r="21" fill="${C.couleurs.primary}" />
      <path d="M24 8 L13 26 h8 l-3 10 L29 18 h-8 l3 -10 z"
            fill="${C.couleurs.accent}" stroke="#fff" stroke-width="0.7" stroke-linejoin="round"/>
    </svg>
    <span class="brand-word">${esc(C.nom)}</span>
  `;
  qsa('[data-c="brand-logo"]').forEach(el => {
    const hideWord = el.hasAttribute('data-logo-only');
    el.innerHTML = (C.useImageLogo !== false ? logoImg : logoSvg)
      + (hideWord || C.useImageLogo ? '' : `<span class="brand-word">${esc(C.nom)}</span>`);
  });

  document.dispatchEvent(new CustomEvent('client-config-applied', { detail: C }));
})();
