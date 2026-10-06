# Minou Crème — run doc

Vite + Tailwind CSS v3 static landing page (no framework, no backend).

## 1. Reproduce uncommitted artifacts

No generated artifacts are required to run the dev server. There are no `.env*`
files in this project; nothing needs to be copied from the main checkout.

Only the dependencies must be installed (project-local, once per fresh checkout):

```bash
npm ci        # or: npm install    — uses package-lock.json
```

Notes:
- Do not commit `node_modules/` or `dist/` (see `.gitignore`).
- The dev server compiles CSS on the fly; no build step needed before `npm run dev`.

## 2. Run the dev server

```bash
npm run dev   # vite, default port 5173 (configured in vite.config.js)
```

- URL: http://localhost:5173
- Port is set in `vite.config.js` → `server.port`; pick another with
  `npm run dev -- --port <n>` if 5173 is taken.
- `npm run build` → `dist/`; `npm run preview` serves the production build.
