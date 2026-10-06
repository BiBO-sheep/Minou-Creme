// Compress the site's product and review photos to WebP (smaller, still PNG
// quality). Run with: node scripts/compress-images.mjs
import { readdir, stat } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { execFileSync } from 'node:child_process'

const SRC = join(import.meta.dirname, '..', 'public', 'assets')
const DEST = join(import.meta.dirname, '..', 'public', 'assets')
const PQ = 65

function toWebp(src) {
  const ext = src.toLowerCase().endsWith('.png') ? 'png' : 'jpg'
  const base = src.slice(0, -ext.length)
  const out = join(DEST, base + '.webp')
  const cmd = ['cwebp', src, out, '-q', String(PQ), '-lossless', '0', '-noalpha', '-mt', '-pass', '1', '-pass', '1', '-nostdin']
  try {
    execFileSync(cmd[0], cmd.slice(1), { stdio: 'ignore' })
  } catch (e) {
    throw new Error('cwebp failed: ' + (e.message || e))
  }
  return out
}

async function main() {
  const files = await readdir(SRC)
  const pngs = files.filter((f) => /\.(png|jpe?g)$/i.test(f)).sort()
  const before = pngs.map((f) => statSync(join(SRC, f)).size)
  const tasks = pngs.map((f) => toWebp(join(SRC, f)).then((out) => ({ f, src: join(SRC, f), out, sizeBefore: statSync(out).size })))
  const results = await Promise.all(tasks)
  const totalBefore = before.reduce((a, b) => a + b, 0)
  const totalAfter = results.reduce((a, r) => a + r.sizeBefore, 0)
  console.log('pages', pngs.length)
  console.log('before', (totalBefore / 1024).toFixed(0) + ' KB')
  console.log('after', (totalAfter / 1024).toFixed(0) + ' KB')
  console.log('saved', (totalBefore - totalAfter) / 1024 > 0 ? (totalBefore - totalAfter) / 1024 + ' KB' : '0 KB')
  for (const r of results) console.log(`${r.f}: ${(r.sizeBefore - r.sizeBefore) / 1024 > 0 ? 0 : 0} KB`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
