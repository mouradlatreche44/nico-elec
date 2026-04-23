/**
 * ============================================================
 *  FICHIER DE CONFIGURATION CLIENT — NICO ELEC
 * ------------------------------------------------------------
 *  SINGLE SOURCE OF TRUTH du template.
 *  Pour dupliquer le template vers un autre client :
 *    1. Éditer ce fichier (identité, contact, services, zone…)
 *    2. Remplacer les images dans /assets/img/
 *    3. Lancer `node build.js` pour produire dist/
 * ============================================================
 */

window.CLIENT = {

  // ── IDENTITÉ ─────────────────────────────────────────────
  nom:          "Nico Elec",
  slogan:       "Électricien Paris · Domotique · IRVE",
  tagline:      "Habilitation B2V BR — Intervention 24/7 sur Paris",
  description:  "Électricien habilité B2V BR à Paris et petite couronne. Tableau électrique NF C 15-100, domotique KNX, bornes IRVE Wallbox, dépannage 24/7.",
  metier:       "Électricien",            // Utilisé dans les titres
  metierPluriel:"électricité",             // Utilisé dans les phrases
  schemaType:   ["ElectricalContractor", "LocalBusiness"],
  depuis:       "2016",

  // ── CONTACT ──────────────────────────────────────────────
  telephone:      "0612345678",
  telephoneAff:   "06 12 34 56 78",
  email:          "contact@nico-elec.fr",
  adresse:        "Paris (75)",
  ville:          "Paris",
  codePostal:     "75001",
  departement:    "Paris (75)",
  region:         "Île-de-France",
  pays:           "FR",
  regionCode:     "FR-75",

  // ── DOMAINE & URL ───────────────────────────────────────
  domaine:        "nico-elec.fr",
  urlCanonical:   "https://nico-elec.fr/",

  // ── GEO ──────────────────────────────────────────────────
  geo:           { lat: 48.8566, lng: 2.3522 },

  // ── ZONE D'INTERVENTION ──────────────────────────────────
  zoneHero:       "Intervention 24/7 à Paris et petite couronne (75, 92, 93, 94)",
  zoneResume:     "Paris (75) · Hauts-de-Seine (92) · Seine-Saint-Denis (93) · Val-de-Marne (94)",
  communes: [
    "Paris 1er", "Paris 8e", "Paris 11e", "Paris 15e", "Paris 16e", "Paris 17e", "Paris 20e",
    "Levallois-Perret", "Neuilly-sur-Seine", "Boulogne-Billancourt", "Issy-les-Moulineaux",
    "Saint-Ouen", "Montreuil", "Vincennes", "Saint-Mandé", "Charenton-le-Pont", "Ivry-sur-Seine"
  ],

  // ── DISPONIBILITÉ ────────────────────────────────────────
  horaires: [
    { jours: "Lundi — Vendredi",   heures: "7h — 20h" },
    { jours: "Samedi — Dimanche",  heures: "Urgences 24/7" },
    { jours: "Devis gratuit",      heures: "Sous 24h" },
  ],
  urgence24_7:    true,
  delaiDevis:     "24h",

  // ── COULEURS ─────────────────────────────────────────────
  // Palette : Deep Teal (logo) + Ambre Voltage (complémentaire chromatique).
  // Le primary est le wordmark du logo, le primaryLight vient du diamant.
  couleurs: {
    primary:      "#1A4862",   // Deep teal — wordmark du logo
    primaryDark:  "#0F2F42",   // Hover nav, footer profond
    primaryLight: "#7EC0DC",   // Cyan diamant du logo
    accent:       "#E8A93C",   // Ambre voltage (complémentaire)
    accentDark:   "#C88A22",   // Hover CTA
    bg:           "#FBFDFE",   // Fond principal — blanc bleuté
    bgSoft:       "#EEF5FA",   // Sections alternées
    surface:      "#FFFFFF",   // Cards
    text:         "#0F2435",   // Noir bleuté
    textMuted:    "#5A6B7A",   // Labels, captions
    dark:         "#0F2F42",   // Back-compat
    cream:        "#EEF5FA",   // Back-compat (remplace ancien beige)
  },

  // ── LOGO ─────────────────────────────────────────────────
  // Si logoPath = null → fallback SVG généré depuis primary+accent.
  // Si useImageLogo = true → utilise le PNG (wordmark déjà dans le fichier).
  logoPath:       "assets/img/logo.png?v=2026042302",
  useImageLogo:   true,

  // ── TYPOGRAPHIE ─────────────────────────────────────────
  fonts: {
    display: "Fraunces",
    body:    "Figtree",
  },

  // ── RÉSEAUX SOCIAUX ──────────────────────────────────────
  reseaux: {
    facebook:  "#",
    instagram: "#",
    tiktok:    "#",
    linkedin:  "#",
    youtube:   "#",
  },

  // ── MARQUES / PARTENAIRES ────────────────────────────────
  marques: [
    "Schneider Electric", "Legrand", "Hager", "Niko", "Wallbox", "Somfy",
  ],

  // ── CERTIFICATIONS ───────────────────────────────────────
  certifications: [
    { nom: "Habilitation B2V BR",  sub: "Travaux sous tension" },
    { nom: "Qualifelec IRVE",      sub: "Borne véhicule électrique" },
    { nom: "NF C 15-100",           sub: "Mise aux normes" },
    { nom: "Garantie Décennale",    sub: "Couverture 10 ans" },
    { nom: "Assurance RC Pro",      sub: "Responsabilité civile" },
  ],

  // ── ATOUTS (bande strip sous hero) ───────────────────────
  atouts: [
    { icon: "shield",   title: "Décennale",            sub: "Couverture 10 ans" },
    { icon: "medal",    title: "B2V BR · Qualifelec",  sub: "Habilitation électrique" },
    { icon: "euro",     title: "Devis gratuit",        sub: "Réponse sous 24h" },
    { icon: "clock",    title: "Urgence 24/7",         sub: "Dépannage réactif" },
  ],

  // ── SERVICES PRINCIPAUX ──────────────────────────────────
  services: [
    {
      id:       "tableau-electrique",
      slug:     "tableau-electrique.html",
      titre:    "Tableau électrique & mise aux normes NF C 15-100",
      label:    "Tableau électrique",
      navLabel: "Tableau · Mise aux normes",
      soustitre: "Sécuriser votre installation, 100% conforme",
      lead:      "Remplacement de tableau vétuste, ajout de différentiels 30 mA, mise aux normes NF C 15-100. Consuel garanti, Attestation de Conformité délivrée.",
      image:     "assets/img/srv-tableau.jpg",
      imageAlt:  "Tableau électrique modulaire moderne posé par Nico Elec à Paris",
      srvNum:    "Prestation 01",
      points: [
        "Remplacement tableau complet (rail DIN, modulaire)",
        "Pose disjoncteurs différentiels 30 mA type A/AC",
        "Mise aux normes NF C 15-100 (habitation)",
        "Passage Consuel + Attestation de Conformité",
        "Câblage propre, étiquetage complet, schéma fourni",
      ],
    },
    {
      id:       "domotique",
      slug:     "domotique.html",
      titre:    "Domotique KNX & maison connectée",
      label:    "Domotique",
      navLabel: "Domotique KNX",
      soustitre: "Piloter lumière, volets, chauffage depuis votre poche",
      lead:      "Installation KNX, Somfy, scénarios personnalisés, interrupteurs connectés. Pilotage centralisé via app ou assistant vocal.",
      image:     "assets/img/srv-domotique.jpg",
      imageAlt:  "Tablette murale de pilotage domotique KNX dans salon parisien",
      srvNum:    "Prestation 02",
      points: [
        "Bus KNX — installation neuve ou rénovation",
        "Volets roulants Somfy / Bubendorff connectés",
        "Scénarios lumière & chauffage personnalisés",
        "Intégration Apple Home / Google Home / Alexa",
        "Interrupteurs scénographiques (Niko, Legrand Céliane)",
        "Configuration app mobile + tablette murale",
      ],
    },
    {
      id:       "bornes-irve",
      slug:     "bornes-irve.html",
      titre:    "Bornes IRVE véhicule électrique",
      label:    "Borne IRVE",
      navLabel: "Borne IRVE véhicule électrique",
      soustitre: "Recharger chez soi, en toute sécurité",
      lead:      "Installation Wallbox, Schneider EVlink, Legrand Green'up — éligible crédit d'impôt 75% (jusqu'à 500 €) et prime Advenir copropriété.",
      image:     "assets/img/srv-irve.jpg",
      imageAlt:  "Borne de recharge Wallbox installée dans garage parisien par Nico Elec",
      srvNum:    "Prestation 03",
      points: [
        "Installateur certifié Qualifelec IRVE niveau 2",
        "Borne 7,4 kW monophasée / 11-22 kW triphasée",
        "Marques : Wallbox, Schneider, Legrand, Hager",
        "Crédit d'impôt 75% jusqu'à 500 € TTC",
        "Dossier Advenir copropriété monté clé en main",
        "Câble dédié protégé + disjoncteur différentiel type B",
      ],
    },
  ],

  // ── PROCESSUS / MÉTHODE ──────────────────────────────────
  process: [
    { num: "01", icon: "phone",    title: "Appel & écoute",      text: "Premier échange pour qualifier l'urgence, le périmètre et les contraintes techniques de votre installation." },
    { num: "02", icon: "tools",    title: "Diagnostic sur site", text: "Visite technique à Paris ou petite couronne. Lecture du tableau, relevé des points de livraison, test différentiel." },
    { num: "03", icon: "doc",      title: "Devis détaillé 24h",  text: "Chiffrage ligne par ligne, marques référencées (Schneider, Legrand, Hager). Montage du dossier Advenir pour l'IRVE." },
    { num: "04", icon: "check",    title: "Pose & Consuel",      text: "Intervention planifiée, pose aux normes NF C 15-100, Consuel et Attestation de Conformité remis à la livraison." },
  ],

  // ── STATISTIQUES ─────────────────────────────────────────
  stats: [
    { valeur: "2016",  count: "2016",  suffix: "",       label: "Année de création" },
    { valeur: "24/7",  count: null,    suffix: "",       label: "Dépannage urgence" },
    { valeur: "500",   count: "500",   suffix: "+",      label: "Interventions livrées" },
    { valeur: "24",    count: "24",    suffix: "h",      label: "Devis gratuit" },
  ],

  // ── RÉALISATIONS / CHANTIERS ─────────────────────────────
  realizations: [
    { tag: "Tableau",   titre: "Rénovation tableau, Paris 11e",       meta: "2025 · NF C 15-100 · Consuel OK",          image: "assets/img/real-tableau-paris11.jpg",    alt: "Tableau électrique rénové Paris 11e — Nico Elec" },
    { tag: "Borne IRVE", titre: "Wallbox 11 kW, Levallois",            meta: "2025 · Copropriété · Advenir",             image: "assets/img/real-irve-levallois.jpg",    alt: "Borne IRVE Wallbox installée à Levallois" },
    { tag: "Domotique", titre: "KNX haussmannien, Boulogne",           meta: "2024 · Volets + lumière + chauffage",      image: "assets/img/real-domotique-boulogne.jpg", alt: "Appartement haussmannien domotisé KNX à Boulogne" },
    { tag: "Mise aux normes", titre: "Studio rénové, Vincennes",       meta: "2024 · Tableau + DCL + SDB",               image: "assets/img/real-normes-vincennes.jpg",   alt: "Studio Vincennes mis aux normes NF C 15-100" },
    { tag: "Rénovation", titre: "Loft rénovation totale, Neuilly",     meta: "2024 · 120 m² · 3 tableaux · 5 scénarios", image: "assets/img/real-renovation-neuilly.jpg", alt: "Rénovation électrique totale loft Neuilly" },
  ],

  // ── AVIS CLIENTS ─────────────────────────────────────────
  avis: [
    { nom: "Camille R.",  ville: "Paris 11e",           note: 5, date: "Il y a 3 semaines", avatar: "CR",
      texte: "Remplacement de tableau électrique un samedi soir après une coupure totale. Nico est intervenu en 2h, travail impeccable et Consuel passé sans réserve. Prix juste." },
    { nom: "Antoine M.",  ville: "Levallois-Perret",    note: 5, date: "Il y a 1 mois",     avatar: "AM",
      texte: "Installation Wallbox 11 kW dans mon garage en copropriété. Dossier Advenir monté par Nico de A à Z, on a récupéré la prime sans effort. Pose propre." },
    { nom: "Sophie L.",   ville: "Boulogne-Billancourt",note: 5, date: "Il y a 2 mois",     avatar: "SL",
      texte: "Domotique KNX sur un appartement haussmannien rénové. Volets, lumières, chauffage tout centralisé sur l'iPad. Conseils techniques au top, zéro surprise sur la facture." },
  ],

  // ── FAQ ─────────────────────────────────────────────────
  faq: [
    { q: "En combien de temps intervenez-vous en urgence ?",
      a: "En cas de panne critique (coupure générale, disjoncteur qui saute en boucle, court-circuit, odeur de brûlé), nous intervenons sous 1 à 2 heures à Paris intra-muros et 2 à 3 heures en petite couronne — 24h/24 et 7j/7, y compris jours fériés." },
    { q: "Votre tableau est-il à la norme NF C 15-100 ?",
      a: "Tout nouveau tableau posé par Nico Elec respecte strictement la NF C 15-100 (amendement A5) : 2 différentiels 30 mA minimum (un type AC + un type A), modularité 20% d'emplacements libres, repérage complet, schéma fourni. Passage Consuel garanti pour les installations neuves." },
    { q: "Comment obtenir la prime CEE ou le crédit d'impôt borne IRVE ?",
      a: "Pour la borne IRVE, le crédit d'impôt couvre 75% du coût d'installation (plafond 500 € TTC par borne, 1000 € pour un couple). Nico Elec est certifié Qualifelec IRVE, condition obligatoire. Pour les copropriétés, nous montons le dossier Advenir (jusqu'à 50% du HT plafonné)." },
    { q: "Quelle est votre zone d'intervention ?",
      a: "Nous intervenons sur Paris (75) intra-muros et toute la petite couronne : Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94). Pas de frais de déplacement facturés dans cette zone." },
    { q: "Êtes-vous habilité pour travailler sous tension ?",
      a: "Oui. Nico est titulaire de l'habilitation B2V BR (travaux d'ordre électrique basse tension en présence de tension et interventions BT). Cette habilitation est renouvelée tous les 3 ans et couvre l'intervention sur des installations de moins de 1000 V en courant alternatif." },
    { q: "Garantie décennale : qu'est-ce que cela couvre ?",
      a: "La garantie décennale couvre pendant 10 ans tous les dommages compromettant la solidité de l'ouvrage ou le rendant impropre à sa destination. Sur une installation électrique, cela inclut les défauts de mise à la terre, les problèmes d'isolement, les surchauffes structurelles. Toutes nos poses y sont soumises." },
  ],

  // ── MENU NAVIGATION ──────────────────────────────────────
  nav: {
    methodeLabel:       "Méthode",
    atelierLabel:       "À propos",
    realisationsLabel:  "Réalisations",
    avisLabel:          "Avis clients",
    contactLabel:       "Contact",
    ctaLabel:           "Devis 24h",
  },

  // ── FOOTER NAV ───────────────────────────────────────────
  footer: {
    metiers: "Prestations",
    entreprise: "L'entreprise",
    contact: "Contact",
  },

  // ── FORMULAIRE — TYPES DE PROJET ────────────────────────
  formProjets: [
    "Tableau électrique / mise aux normes",
    "Domotique KNX / maison connectée",
    "Borne IRVE (véhicule électrique)",
    "Dépannage urgent 24/7",
    "Rénovation complète",
    "Éclairage / interrupteurs",
    "Autre",
  ],

  // ── STAMP HERO (badge circulaire) ────────────────────────
  heroStamp: { line1: "B2V", line2: "BR · IRVE" },

  // ── OpenStreetMap ─────────────────────────────────────────
  mapsEmbed: "https://www.openstreetmap.org/export/embed.html?bbox=2.20,48.80,2.50,48.92&layer=mapnik&marker=48.8566,2.3522",

  // ── COPYRIGHT ────────────────────────────────────────────
  annee: "2026",
};
