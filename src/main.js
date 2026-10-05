import './style.css'
import { HERO_WA_MESSAGE, CTA_WA_MESSAGE, INSTAGRAM_URL, WHATSAPP_NUMBER } from './config.js'
import { openWhatsApp } from './whatsapp.js'
import { products } from './data/products.js'
import { testimonials } from './data/testimonials.js'
import { instagramPosts } from './data/instagram.js'

// ---------- Mobile menu: toggles aria-expanded, closes on Escape ----------
const menuBtn = document.getElementById('menu-btn')
const mobileMenu = document.getElementById('mobile-menu')

function setMenu(open) {
  menuBtn.setAttribute('aria-expanded', String(open))
  mobileMenu.classList.toggle('hidden', !open)
  document.body.style.overflow = open ? 'hidden' : ''
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

// ---------- Navbar surface on scroll: transparent at top, solid after ----------
const navbar = document.getElementById('navbar')
addEventListener('scroll', () => {
  navbar?.classList.toggle('shadow-[0_8px_30px_rgba(23,23,23,0.08)]', scrollY > 8)
}, { passive: true })

// ---------- WhatsApp buttons: data-wa-message drives one helper ----------
document.querySelectorAll('[data-wa]').forEach((btn) => {
  btn.addEventListener('click', () => openWhatsApp(btn.getAttribute('data-wa')))
})
document.getElementById('hero-order')?.addEventListener('click', () => openWhatsApp(HERO_WA_MESSAGE))
document.getElementById('cta-order')?.addEventListener('click', () => openWhatsApp(CTA_WA_MESSAGE))
document.getElementById('nav-order-desktop')?.addEventListener('click', () => openWhatsApp(HERO_WA_MESSAGE))
document.getElementById('nav-order-mobile')?.addEventListener('click', () => openWhatsApp(HERO_WA_MESSAGE))

// ---------- Products: array -> cards. Data stays separate from markup ----------
const grid = document.getElementById('product-grid')
if (grid) {
  grid.innerHTML = products.map((p) => `
    <article class="bg-white rounded-3xl border border-beige overflow-hidden flex flex-col transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(90,58,46,0.12)]">
      <div class="food-img aspect-[4/3] overflow-hidden">
        <img src="${p.image}" alt="${p.alt}" loading="lazy" class="w-full h-full object-cover" />
      </div>
      <div class="p-6 flex flex-col gap-1 grow">
        <h3 class="font-bold text-lg text-ink">${p.name}</h3>
        <p class="text-sm font-semibold text-cocoa">${p.price}</p>
        <p class="text-sm text-muted leading-relaxed mt-1">Siap dipesan untuk hari ini, selama persediaan ada.</p>
        <button type="button" data-wa="${p.waMessage}"
          class="mt-4 w-full min-h-[44px] bg-ink text-white py-2.5 rounded-full text-sm font-semibold hover:bg-cocoa transition">+ Pesan</button>
      </div>
    </article>`).join('')
  // Product buttons are created dynamically, so bind them after render.
  grid.querySelectorAll('[data-wa]').forEach((b) =>
    b.addEventListener('click', () => openWhatsApp(b.getAttribute('data-wa'))))
}

// ---------- Testimonials: honest empty state when no real quotes yet ----------
const tWrap = document.getElementById('testimonial-list')
const tEmpty = document.getElementById('testimonial-empty')
if (tWrap) {
  if (!testimonials.length) {
    tEmpty?.classList.remove('hidden')
  } else {
    tEmpty?.classList.add('hidden')
    tWrap.innerHTML = testimonials.map((t) => `
      <figure class="bg-white rounded-3xl border border-beige p-7 flex flex-col gap-4">
        <blockquote class="text-lg leading-relaxed text-ink">“${t.quote}”</blockquote>
        <figcaption class="flex items-center gap-3">
          ${t.image ? `<img src="${t.image}" alt="Foto ${t.name}" loading="lazy" class="w-11 h-11 rounded-full object-cover" />`
            : `<span aria-hidden="true" class="w-11 h-11 rounded-full bg-sand flex items-center justify-center font-bold text-cocoa">${t.name.charAt(0)}</span>`}
          <span><span class="block font-semibold text-sm">${t.name}</span>
          ${t.username ? `<span class="block text-sm text-muted">${t.username}</span>` : ''}</span>
        </figcaption>
        ${t.instagramUrl ? `<a href="${t.instagramUrl}" target="_blank" rel="noopener" class="text-sm font-semibold text-cocoa underline underline-offset-4">View on Instagram</a>` : ''}
      </figure>`).join('')
  }
}

// ---------- Instagram slots: placeholder-aware, never broken ----------
const igGrid = document.getElementById('ig-grid')
if (igGrid) {
  igGrid.innerHTML = instagramPosts.map((s, i) => {
    const inner = s.image
      ? `<img src="${s.image}" alt="${s.alt}" loading="lazy" class="w-full h-full object-cover" />`
      : `<span class="text-center px-4"><span class="block text-xs font-semibold tracking-wide text-muted">SLOT ${i + 1}</span><span class="block text-sm text-muted mt-1">Ganti dengan foto postingan</span></span>`
    const cls = 'aspect-square rounded-2xl bg-sand border border-beige overflow-hidden flex items-center justify-center text-muted'
    return s.url ? `<a href="${s.url}" target="_blank" rel="noopener" class="${cls}" aria-label="${s.alt}">${inner}</a>`
      : `<div class="${cls}">${inner}</div>`
  }).join('')
}

// ---------- Instagram + contact links resolve from config ----------
document.querySelectorAll('[data-ig-link]').forEach((a) => {
  if (INSTAGRAM_URL) {
    a.setAttribute('href', INSTAGRAM_URL)
  } else {
    a.setAttribute('href', '#instagram')
    a.setAttribute('aria-disabled', 'true')
  }
})
const waContact = document.getElementById('wa-contact')
if (waContact) waContact.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Halo Minou Crème, saya ingin bertanya.')}`)

const year = document.getElementById('year')
if (year) year.textContent = new Date().getFullYear()
