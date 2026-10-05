import { WHATSAPP_NUMBER } from './config.js'

// Single WhatsApp helper. Every order button calls this so the number
// and URL-encoding live in one place instead of being copy-pasted.
export function openWhatsApp(message) {
  const text = encodeURIComponent(message)
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
  window.open(url, '_blank', 'noopener')
}
