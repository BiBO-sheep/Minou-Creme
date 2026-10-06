import { defineConfig } from 'vite'

export default defineConfig({
  // Relative asset base so dist/ deploys anywhere (root domain or subpath).
  base: './',
  server: { port: 5173, open: false }
})
