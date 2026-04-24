# Prompts photos — Nico Elec (Flux / Pollinations)

Génération automatique des 10 photos référencées dans le site.
Style global : photojournalisme clair, lumière naturelle froide-neutre, touches ambre #E8A93C (LED, lampes) et teal #1A4862 (murs, éléments techniques). Artisan masculin 35-45 ans, tenue propre (polo marine ou tee-shirt neutre), gants isolants. **Pas de texte, pas de logo, pas de watermark.**

Format cible : JPEG qualité ~82, ratio 3:2 (1600×1067) sauf mention contraire.
Dossier de sortie : `assets/img/`

---

## ⚠️ CHARACTER SHEET — artisan récurrent
Le MÊME personnage doit apparaître sur le hero ET le about (et idéalement d'autres scènes) :
> **Nico** — French male, 40 years old, 1m80, athletic build, short dark brown hair (slightly tousled), neatly trimmed brown beard, light olive-tan skin, green-hazel eyes, confident relaxed expression. Wears a **navy blue polo shirt** (solid, no logo), dark work trousers, black leather tool belt, brown leather watch. Friendly but professional demeanor.
>
> **Seed partagé :** `771420` (à passer aux deux générations pour cohérence de visage)

## 1. Hero accueil — artisan devant camionnette
**Fichier :** `assets/img/hero-chantier.jpg` — 1920×1280 (3:2)
**Seed :** `771420`
**Prompt :** Professional editorial photograph of Nico, a 40-year-old French artisan electrician, athletic build, short dark brown tousled hair, neatly trimmed brown beard, light olive-tan skin, green-hazel eyes, wearing a navy blue polo shirt (no logo), dark work trousers, black leather tool belt, standing confidently in front of his open white service van (unbranded, side door slid open showing organized tool shelves with coiled cables and plastic cases), Parisian haussmannian street background softly blurred in afternoon warm golden light, one hand holding a yellow multimeter, relaxed confident smile, shallow depth of field, cinematic documentary photography, teal and amber ambient tones, ultra-realistic skin texture, no text, no logo, no watermark.

## 2. Portrait artisan — page à propos
**Fichier :** `assets/img/about-artisan.jpg` — 1600×1067 (3:2)
**Seed :** `771420`
**Prompt :** Editorial mid-body portrait of the SAME 40-year-old French artisan electrician Nico (exact same face as previous image: athletic build, short dark brown tousled hair, neatly trimmed brown beard, light olive-tan skin, green-hazel eyes, navy blue polo shirt no logo, black leather tool belt), now standing on a Parisian sidewalk next to his white service van (unbranded, rear doors slightly open), arms relaxed, slight friendly smile looking toward camera, Haussmannian limestone building facade blurred in background, warm golden hour side-light, shallow depth of field, documentary editorial photography, ultra-realistic skin texture, natural film grain, no text, no logo, no watermark.

## 3. Service — Tableau électrique
**Fichier :** `assets/img/srv-tableau.jpg` — 1400×933 (3:2)
**Prompt :** Close-up of a French modular electrical panel freshly installed in a Parisian utility closet, 3 rows of color-coded circuit breakers, clear labels, copper busbars, a gloved hand tightening a screw with an insulated amber-handled screwdriver, soft directional window light, neutral white background, ultra-sharp technical detail, no text, no logo.

## 4. Service — Domotique KNX
**Fichier :** `assets/img/srv-domotique.jpg` — 1400×933 (3:2)
**Prompt :** Minimalist modern Parisian living-room with a wall-mounted black KNX touch panel glowing soft amber, lighting scenes active, linen sofa in background, oak parquet floor, crown mouldings, late afternoon side light, editorial interior photography, teal and amber ambient glow, no text, no logo.

## 5. Service — Borne IRVE
**Fichier :** `assets/img/srv-irve.jpg` — 1400×933 (3:2)
**Prompt :** Residential Parisian underground parking, a wall-mounted 22kW Wallbox EV charging station with type-2 cable plugged into a dark grey electric car, clean LED ambient strip lighting, geometric concrete columns, amber LED indicator on charger, professional product-environment photography, no text, no logo.

## 6. Réalisation — Tableau Paris 11e
**Fichier :** `assets/img/real-tableau-paris11.jpg` — 1400×933 (3:2)
**Prompt :** Wide documentary shot of a newly-rewired modular electrical panel mounted in a pristine white utility cabinet inside a Parisian apartment, printed labels on each breaker, clean cable tray routing, Schneider Electric branded modules (generic look, no logo), natural light, before/after quality, no text, no logo.

## 7. Réalisation — Borne IRVE Levallois
**Fichier :** `assets/img/real-irve-levallois.jpg` — 1400×933 (3:2)
**Prompt :** Collective underground parking in a Parisian suburb with 3 wall-mounted white EV chargers in a neat row, labeled cable management, individual sub-meters, clean LED strip lighting overhead, architectural wide shot, evening ambient, no text, no logo.

## 8. Réalisation — Domotique Boulogne
**Fichier :** `assets/img/real-domotique-boulogne.jpg` — 1400×933 (3:2)
**Prompt :** Modern Haussmann living area in Boulogne-Billancourt with visible flush-mounted KNX touch switches, integrated ceiling lighting, motorised roller shades half-open letting soft light in, herringbone parquet, marble fireplace, twilight scene with warm amber accent lamps, architectural interior photography, no text, no logo.

## 9. Réalisation — Rénovation Neuilly
**Fichier :** `assets/img/real-renovation-neuilly.jpg` — 1400×933 (3:2)
**Prompt :** Empty newly-renovated Parisian loft apartment in Neuilly, freshly painted off-white walls, new European sockets and switches installed at precise heights, oak parquet floor, tall windows with daylight, real-estate photography, wide shot, no text, no logo.

## 10. Réalisation — Mise aux normes Vincennes
**Fichier :** `assets/img/real-normes-vincennes.jpg` — 1400×933 (3:2)
**Prompt :** Split-frame single image documenting before/after on the same wall of a Vincennes studio: left side an old 1960s ceramic fuse box (dusty, yellowed), right side a brand-new NF C 15-100 modular panel with clean labeling, documentary comparison composition, neutral lighting, no text, no logo.

---

## Notes de génération
- Moteur : Pollinations.ai / Flux (gratuit, sans clé)
- Aucun watermark, aucun texte ajouté post-gen
- Cohérence colorimétrique : dominante neutre froide, touches ambrées (#E8A93C) pour diodes/lampes, teal profond (#1A4862) pour murs/éléments techniques
- Privilégier scènes parisiennes : moulures Haussmann, parquet, zinc, fenêtres hautes
