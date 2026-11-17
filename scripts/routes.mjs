// Static hosts (GitHub Pages) have no SPA fallback: give every route a real index.html,
// and 404.html for anything else (the app then shows its own "page not found").
import { copyFileSync, mkdirSync } from 'node:fs'

const MODES = ['bonus', 'account']
const ACCOUNTS = ['starter', 'ecn', 'pro', 'goldflex'] // keep in sync with src/config/ib.ts

for (const m of MODES) {
  for (const a of ACCOUNTS) {
    mkdirSync(`dist/${m}/${a}`, { recursive: true })
    copyFileSync('dist/index.html', `dist/${m}/${a}/index.html`)
  }
}
copyFileSync('dist/index.html', 'dist/404.html')
console.log(`routes: ${MODES.length * ACCOUNTS.length} pages + 404.html`)
