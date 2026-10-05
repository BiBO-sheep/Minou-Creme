# Minou Crème — Dessert Singkawang

Landing page / company profile for **Minou Crème**, a dessert brand from Singkawang, Indonesia.
Products: Bisky Cheese (Rp20.000), Milky Sando (Rp15.000), Banana Pudding (Rp15.000).

## Design direction

Warm, clean, premium-but-approachable editorial. Cream paper background, cocoa accent,
product photos as the hero. Restraint over effects: one glow, solid cards, MOTION 1
(hover + smooth scroll + reduced-motion support).

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
index.html            # all 10 sections, semantic markup, SEO/OG
src/style.css         # tokens, focus-visible, smooth scroll, reduced motion
src/main.js           # menu, navbar state, data rendering, link wiring
src/config.js         # EDIT HERE: brand, WA number, Instagram URL, location
src/whatsapp.js       # openWhatsApp(message) with encodeURIComponent
src/data/products.js  # EDIT HERE: products
src/data/testimonials.js # EDIT HERE: real testimonials (empty = honest empty state)
src/data/instagram.js # EDIT HERE: 6 IG slots
public/images/        # hero.png + products/*.png (copied from original assests/)
```

## Where to edit things

| What | File |
|---|---|
| WhatsApp number | `src/config.js` → `WHATSAPP_NUMBER` (all buttons follow) |
| Instagram URL | `src/config.js` → `INSTAGRAM_URL` (section + contact + footer follow) |
| Products | `src/data/products.js` (name, price, image, alt, waMessage) |
| Story text/photo | `index.html` `#story` (marked `REPLACE`), photo in `public/images/brand/` |
| Testimonials | `src/data/testimonials.js` (name, username, quote, image/video, instagramUrl) |
| Instagram slots | `src/data/instagram.js` (image path + post url per slot) |
| Location/brand | `src/config.js` |

## WhatsApp ordering

One helper (`src/whatsapp.js`) builds `https://wa.me/6281250664909?text=<encoded>`.
Buttons carry `data-wa="message"` or dedicated IDs (hero, CTA, nav). No hardcoded
`wa.me` URLs scattered in markup.

## Responsive

Mobile-first (`base → sm → md → lg`). Hero/menu/story stack on phones, split/grid
from `md:`. Verified mentally at 320/375/390/768/1024/1280/1440: no fixed-width
children, images `max-width:100%` + `aspect-ratio`, tap targets ≥44px, no x-overflow
(`overflow-x` has no leakers; glow uses centered fixed width inside relative parent…
keep an eye on very narrow screens).

## Accessibility

Skip link, one H1, semantic landmarks, meaningful alt text, `aria-expanded/controls`
mobile menu with Escape close, visible `:focus-visible` ring, 44px targets,
`prefers-reduced-motion` support, AA contrast (ink/muted/cocoa on cream/sand/white).

## Performance

No frameworks, ~6KB JS, lazy loading below the fold, hero eager with fetchpriority,
Google Fonts with preconnect. Images are the weight (~1.5–2.3MB PNGs); consider
compressing to WebP when ready.

## What I learned (expand for portfolio)

- Vite dev/build vs Tailwind CDN script
- Design tokens in `tailwind.config.js` instead of scattered hex
- Data-driven UI: arrays of objects + `map()` + template literals + DOM insertion
- Single-responsibility helpers (`whatsapp.js`) and central config
- Mobile-first responsive + honest empty states + a11y fundamentals
