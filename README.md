# Minou Crème — Dessert Singkawang

Landing page / company profile for **Minou Crème**, a dessert brand from Singkawang, Indonesia.
Products: Bisky Cheese (Rp20.000, with Matcha & Chocolate variants at Rp25.000),
Milky Sando (Rp15.000), Banana Pudding (Rp15.000), Caramel Cheese Bites (Rp15.000),
Korean Garlic Cheese Bread (Rp10.000 / 2 pcs).

## Design direction

Instagram-matched palette, no foreign hues. Cream `#FFF6E5` is the page, soft
cream `#FBF7EC` separates alternating sections, Minou Blue `#0C1C87` carries the
navbar/headings/buttons, Deep Navy `#041159` holds the dark text, photo-tile
overlays and footer, Minou Red `#930F1F` is reserved for CTAs and accents, and
Dusty Rose `#936374` is available as a secondary accent. Tokens live in
`tailwind.config.js`; the hero gradient is the only decorative one (brand blues
lifting into navy, so cream display type stays readable over the photo).

Giant uppercase Montserrat display headings + Great Vibes script wordmark,
full-bleed product tiles with photo + navy gradient overlay, red newsletter band
with a navy drip edge into the footer. MOTION 1 (hover + smooth scroll +
reduced-motion support). The focus ring is red on light sections and switches to
cream on dark ones (hero, tiles, red band, footer) so it always clears 3:1.

## Tech stack

Vite + HTML5 + Tailwind CSS v3 + vanilla JavaScript. No framework, so fundamentals stay visible.

## Install / run / build

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
npm run preview  # serve dist/ locally
```

## Project structure

```
index.html            # sections: hero, story, menu tiles, reviews×Instagram, newsletter, footer
src/style.css         # hero gradient, navbar scroll state, focus-visible, reduced motion
src/main.js           # menu, navbar state, data rendering, newsletter, link wiring
src/config.js         # EDIT HERE: brand, WA number, Instagram URL, location
src/whatsapp.js       # openWhatsApp(message) with encodeURIComponent
src/data/products.js  # EDIT HERE: products (render as full-bleed poster tiles)
src/data/reviews.js   # EDIT HERE: 6 review photos (portrait 9:16, rendered in the reviews×IG section)
public/assets/        # web images: brand/logo.png (navbar+favicon), brand/hero.png, products/*.png, reviews/*.png
public/videos/        # story video goes here when ready
assests/              # original source files (kept untouched; copies live in public/assets/)
```

## Where to edit things

| What | File |
|---|---|
| WhatsApp number | `src/config.js` → `WHATSAPP_NUMBER` (all buttons follow) |
| Instagram URL | `src/config.js` → `INSTAGRAM_URL` (section button + footer icon follow) |
| Products | `src/data/products.js` (name, price, image, alt, waMessage; add `variants` for a swipeable picker, `flavors` for a taste list) |
| Story text/photo | `index.html` `#story`, brand photo in `public/assets/brand/` |
| Newsletter signup | `src/main.js` — opens WhatsApp (no email backend yet); swap for a real list provider when available |
| Review photos | `src/data/reviews.js` → files in `public/assets/reviews/` (portrait ~9:16, swap same-name file to update) |
| Logo / favicon | `public/assets/brand/logo.png` (navbar + favicon) |
| Location/brand | `src/config.js` |

## WhatsApp ordering

One helper (`src/whatsapp.js`) builds `https://wa.me/6281250664909?text=<encoded>`.
Buttons carry `data-wa="message"` or dedicated IDs (hero, CTA, nav). No hardcoded
`wa.me` URLs scattered in markup.

## Responsive

Mobile-first (`base → sm → md → lg`). Hero stacks on phones (copy → photo → CTA)
and becomes a two-column, exactly-one-screen layout from `lg:` so landscape
laptops/desktops never scroll inside the hero. Newsletter heading/form are two
columns from `lg:` (no overlap). Reviews grid: 2 cols mobile, 3 cols from `md:`.
The footer drops its max-width so it spans edge to edge on wide screens.

Verified in-browser at 390×844, 1280×720, 1366×768, 1440×900 and 1920×1080:
zero horizontal overflow everywhere, hero height equals the viewport at all four
desktop sizes, newsletter columns do not overlap, and every control is ≥44px.

## Accessibility

Skip link, one H1, semantic landmarks, meaningful alt text, `aria-expanded/controls`
mobile menu with Escape close, visible `:focus-visible` ring (red on light
sections, cream on dark ones), 44px targets, `prefers-reduced-motion` support,
AA contrast (navy text on cream, cream text on blue/navy/red).

## Performance

No frameworks, ~6KB JS, lazy loading below the fold, hero eager with fetchpriority,
Google Fonts with preconnect. Images are the weight (~1.5–2.3MB PNGs); consider
compressing to WebP when ready.

## Deploy

```bash
npm run build    # static output in dist/ (assets use relative paths, base: './')
```

Upload `dist/` to any static host (Netlify, Vercel, GitHub Pages, shared hosting).
Because `base: './'` is set in `vite.config.js`, it works both at a domain root and
in a subpath. Note: `og:image` in `index.html` is relative — point it at the final
https:// URL once the domain exists so social previews resolve.

## What I learned (expand for portfolio)

- Vite dev/build vs Tailwind CDN script
- Design tokens in `tailwind.config.js` instead of scattered hex
- Data-driven UI: arrays of objects + `map()` + template literals + DOM insertion
- Single-responsibility helpers (`whatsapp.js`) and central config
- Mobile-first responsive + honest empty states + a11y fundamentals
