// Reads public/ib.json at startup and merges it over the defaults in ./ib.ts.
// The file is fetched fresh every time (cache-busting query + no-store), so an edit
// on the server shows on the next page load, past both browser and CDN caches.
import { ACCOUNTS, colors, ib, offer, type AccountKey, type OfferMode } from './ib'

type Json = Record<string, unknown>

const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : undefined)
const strOrNull = (v: unknown) => (v === null ? null : str(v))
const httpUrl = (v: unknown) => { const s = str(v); return s && /^https?:\/\//.test(s) ? s : undefined }
const color = (v: unknown) => { const s = str(v); return s && CSS.supports('color', s) ? s : undefined }
const pick = <T extends object>(target: T, values: Partial<Record<keyof T, unknown>>) => {
  for (const [k, v] of Object.entries(values)) if (v !== undefined) (target as Json)[k] = v
}

export async function loadConfig() {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}ib.json?v=${Date.now()}`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    apply(await res.json())
  } catch (e) {
    console.warn('[ib.json] not loaded, using built-in defaults:', e)
  }
  paint()
}

function apply(c: Json) {
  pick(ib, {
    name: str(c.name),
    nameLatin: str(c.nameLatin),
    initials: str(c.initials),
    logo: strOrNull(c.logo),
    photo: strOrNull(c.photo),
    bio: str(c.bio),
    panelUrl: httpUrl(c.panelUrl),
  })

  const o = (c.offer ?? {}) as Json
  const mode = str(o.mode)
  const account = str(o.account)
  pick(offer, {
    mode: mode === 'bonus' || mode === 'account' ? (mode as OfferMode) : undefined,
    account: account && account in ACCOUNTS ? (account as AccountKey) : undefined,
    minDeposit: str(o.minDeposit),
    deadline: str(o.deadline),
  })

  const k = (c.colors ?? {}) as Json
  pick(colors, { brand: color(k.brand), brandInk: color(k.brandInk) })
}

/** Push the IB's colours and name into the document. */
function paint() {
  const s = document.documentElement.style
  s.setProperty('--color-brand', colors.brand)
  s.setProperty('--color-brand-ink', colors.brandInk)
  document.title = `${ib.name} · همکار وینگو مارکتس`
}
