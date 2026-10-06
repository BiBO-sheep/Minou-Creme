import './style.css'
import { HERO_WA_MESSAGE, CTA_WA_MESSAGE, INSTAGRAM_URL, WHATSAPP_NUMBER } from './config.js'
import { openWhatsApp } from './whatsapp.js'
import { products } from './data/products.js'
import { reviewPhotos } from './data/reviews.js'

// Mobile menu: toggles aria-expanded, closes on Escape, page stays scrollable
// while open (the sheet itself scrolls internally via overflow-y-auto).
const menuBtn = document.getElementById('menu-btn')
const mobileMenu = document.getElementById('mobile-menu')

function setMenu(open) {
  menuBtn.setAttribute('aria-expanded', String(open))
  mobileMenu.classList.toggle('hidden', !open)
  if (open) mobileMenu.querySelector('a')?.focus()
}

menuBtn?.addEventListener('click', () => {
  setMenu(menuBtn.getAttribute('aria-expanded') !== 'true')
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuBtn?.getAttribute('aria-expanded') === 'true') {
    setMenu(false)
    menuBtn.focus()
  }
})

mobileMenu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)))

// Navbar: translucent at top, solid Minou Blue after scroll
const navbar = document.getElementById('navbar')
addEventListener('scroll', () => {
  navbar?.classList.toggle('is-scrolled', scrollY > 8)
}, { passive: true })

// WhatsApp buttons: data-wa-message drives one helper
document.querySelectorAll('[data-wa]').forEach((btn) => {
  btn.addEventListener('click', () => openWhatsApp(btn.getAttribute('data-wa')))
})
document.getElementById('hero-order')?.addEventListener('click', () => openWhatsApp(HERO_WA_MESSAGE))
document.getElementById('nav-order-desktop')?.addEventListener('click', () => openWhatsApp(HERO_WA_MESSAGE))
document.getElementById('nav-order-mobile')?.addEventListener('click', () => openWhatsApp(HERO_WA_MESSAGE))

// Products render as full-bleed poster tiles. Data stays separate from
// markup; alternating tile tints come from a fixed list so any product
// count still looks intentional.
const grid = document.getElementById('product-grid')
if (grid) {
  const tileColors = ['bg-navy', 'bg-royal-dark', 'bg-royal']
  const calmMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

  // A variant tile is a photo carousel: one snap slide per variant. The
  // gradient is a later sibling so it stays put while photos slide under it.
  const photoArea = (p, ti) => p.variants
    ? `<div class="variant-track flex h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory" data-track="${ti}" aria-label="Foto varian ${p.name}">
        ${p.variants.map((v) => `
          <div class="w-full shrink-0 snap-start overflow-hidden">
            <img src="${v.image}" alt="${v.alt}" loading="lazy" style="object-position:${v.objectPosition || 'center'}"
                 class="w-full h-full object-cover opacity-90 hover:scale-105 transition duration-700" />
          </div>`).join('')}
      </div>`
    : `<img src="${p.image}" alt="${p.alt}" loading="lazy"
         class="w-full h-full object-cover opacity-90 hover:scale-105 transition duration-700" />`

  // Variant products (Bisky) get a chip row inside the tile. Chip styling
  // follows aria-pressed so the attribute owns the selected state.
  const variantStrip = (p, ti) => `
    <div class="variant-strip -mx-1 px-1 mb-1 flex gap-2 overflow-x-auto snap-x" role="group" aria-label="Pilihan varian ${p.name}">
      ${p.variants.map((v, vi) => `
        <button type="button" data-variant="${ti}:${vi}" aria-pressed="${vi === 0}"
          class="variant-chip shrink-0 snap-start min-h-[44px] px-4 rounded-md text-xs font-bold uppercase tracking-wide border transition
          bg-navy/60 text-cream/85 border-cream/40 hover:border-cream
          aria-pressed:bg-cream aria-pressed:text-navy aria-pressed:border-cream">${v.label}</button>`).join('')}
    </div>`

  // Flavor list (Milky Sando): plain text next to the name, not fake controls.
  const flavorLine = (p) => p.flavors
    ? `<p class="mt-1 text-xs md:text-sm font-semibold uppercase tracking-wide text-cream/75">Rasa: ${p.flavors.join(' · ')}</p>`
    : ''

  grid.innerHTML = products.map((p, ti) => `
    <article class="relative overflow-hidden min-h-[340px] md:min-h-[420px] ${tileColors[ti % tileColors.length]} flex">
      <div class="food-img absolute inset-0 overflow-hidden">
        ${photoArea(p, ti)}
        <div class="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/55 to-navy/10"></div>
      </div>
      <div class="relative z-10 mt-auto p-6 md:p-9 w-full">
        <p class="text-[11px] font-bold tracking-[0.2em] uppercase text-cream/70 mb-2">Produk</p>
        <h3 data-tile-name="${ti}" class="font-display font-black uppercase leading-[0.9] tracking-tight text-cream text-[clamp(1.8rem,4vw,3rem)]">${p.name}</h3>
        ${p.variants ? variantStrip(p, ti) : flavorLine(p)}
        <p data-tile-price="${ti}" class="mt-2 font-extrabold text-cream text-lg">${p.price}</p>
        <p data-tile-desc="${ti}" class="mt-1 text-sm text-cream/75 max-w-md">${p.desc}</p>
        <button type="button" data-tile-wa="${ti}" data-wa="${p.waMessage}"
          class="mt-4 min-h-[46px] inline-flex items-center bg-cherry text-cream border-2 border-cream/40 px-7 rounded-full text-sm font-extrabold uppercase tracking-wide hover:bg-cherry-dark transition">+ Pesan</button>
      </div>
    </article>`).join('') + `
    <article class="bg-cherry text-cream min-h-[340px] md:min-h-[420px] flex flex-col justify-end p-6 md:p-9">
      <p class="text-[11px] font-bold tracking-[0.2em] uppercase text-cream/75 mb-2">Custom</p>
      <h3 class="font-display font-black uppercase leading-[0.9] tracking-tight text-[clamp(1.8rem,4vw,3rem)]">Pesan Khusus</h3>
      <p class="mt-2 font-bold">Hampers &amp; jumlah banyak</p>
      <p class="mt-1 text-sm text-cream/85">Mau hampers, pesan ramai-ramai, atau rasa custom? Cerita dulu kebutuhannya, nanti kita cariin yang pas.</p>
      <button id="grid-order" type="button"
        class="mt-4 min-h-[46px] inline-flex items-center bg-navy text-cream border-2 border-cream/50 px-7 rounded-full text-sm font-extrabold uppercase tracking-wide hover:bg-royal-dark transition">Chat WhatsApp</button>
    </article>`

  // The photo is the state: text and chips follow whatever slide is showing,
  // so switching a variant always slides the picture before the words change.
  const syncTile = (ti, vi) => {
    const v = products[ti].variants[vi]
    grid.querySelector(`[data-tile-name="${ti}"]`).textContent = v.name
    grid.querySelector(`[data-tile-price="${ti}"]`).textContent = v.price
    grid.querySelector(`[data-tile-desc="${ti}"]`).textContent = v.desc
    grid.querySelector(`[data-tile-wa="${ti}"]`).setAttribute('data-wa', v.waMessage)
    grid.querySelectorAll(`[data-variant^="${ti}:"]`).forEach((b) =>
      b.setAttribute('aria-pressed', String(Number(b.dataset.variant.split(':')[1]) === vi)))
  }

  grid.querySelectorAll('[data-track]').forEach((track) => {
    const ti = Number(track.dataset.track)
    let shown = 0
    track.addEventListener('scroll', () => {
      const vi = Math.round(track.scrollLeft / track.clientWidth)
      if (vi === shown || !products[ti].variants[vi]) return
      shown = vi
      syncTile(ti, vi)
    }, { passive: true })
  })

  grid.querySelectorAll('[data-variant]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const [ti, vi] = chip.dataset.variant.split(':').map(Number)
      const track = grid.querySelector(`[data-track="${ti}"]`)
      track.scrollTo({ left: vi * track.clientWidth, behavior: calmMotion() ? 'auto' : 'smooth' })
    })
  })

  // Product buttons are created dynamically, so bind them after render.
  grid.querySelectorAll('[data-tile-wa]').forEach((b) =>
    b.addEventListener('click', () => openWhatsApp(b.getAttribute('data-wa'))))
  grid.querySelector('#grid-order')?.addEventListener('click', () => openWhatsApp(CTA_WA_MESSAGE))
}

// Reviews × Instagram: portrait (9:16) photo cards, data-driven
const reviewGrid = document.getElementById('review-grid')
if (reviewGrid) {
  reviewGrid.innerHTML = reviewPhotos.map((r) => `
    <figure class="aspect-[9/16] overflow-hidden rounded-2xl bg-navy border border-navy/10">
      <img src="${r.image}" alt="${r.alt}" loading="lazy" class="w-full h-full object-cover" />
    </figure>`).join('')
}

// Newsletter: no backend yet, so confirmation happens over WhatsApp like
// every other flow on this site (honest, no fake success).
const subForm = document.getElementById('subscribe-form')
const subStatus = document.getElementById('subscribe-status')
subForm?.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = document.getElementById('subscribe-email').value.trim()
  if (!email) return
  openWhatsApp(`Halo Minou Crème, saya mau daftar info & promo. Email saya: ${email}`)
  if (subStatus) subStatus.textContent = 'Terima kasih! Selesaikan konfirmasi di WhatsApp ya.'
  subForm.reset()
})

// Instagram + contact links resolve from config
document.querySelectorAll('[data-ig-link]').forEach((a) => {
  if (INSTAGRAM_URL) {
    a.setAttribute('href', INSTAGRAM_URL)
    a.removeAttribute('aria-disabled')
  } else {
    a.setAttribute('href', '#instagram')
    a.setAttribute('aria-disabled', 'true')
  }
})
document.querySelectorAll('[data-wa-link]').forEach((a) => {
  a.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}`)
})
const waContact = document.getElementById('wa-contact')
if (waContact) waContact.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Halo Minou Crème, saya ingin bertanya.')}`)

const year = document.getElementById('year')
if (year) year.textContent = new Date().getFullYear()
