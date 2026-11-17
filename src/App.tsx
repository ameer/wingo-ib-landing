import { Landing } from './landing/Landing'
import { ACCOUNTS, offer, type AccountKey, type OfferMode } from './config/ib'

// Routes (see README):
//   /                     -> bonus offer on the configured account (config/ib.ts → offer.account)
//   /bonus/<account>      -> bonus offer   (starter | ecn | pro | goldflex)
//   /account/<account>    -> specific-account offer
function resolveRoute(): { mode: OfferMode; account: AccountKey } | null {
  const base = import.meta.env.BASE_URL
  const path = location.pathname.startsWith(base) ? location.pathname.slice(base.length) : location.pathname
  const [mode, acc, ...rest] = path.split('/').filter(Boolean)

  if (!mode) return { mode: 'bonus', account: offer.account }
  if ((mode === 'bonus' || mode === 'account') && acc && acc in ACCOUNTS && rest.length === 0) {
    return { mode, account: acc as AccountKey }
  }
  return null
}

export default function App() {
  const route = resolveRoute()
  if (!route) return <NotFound />
  return <Landing mode={route.mode} account={route.account} />
}

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-page p-6 text-center">
      <div>
        <h1 className="text-3xl font-black">این صفحه پیدا نشد</h1>
        <p className="mt-3 text-ink-soft">آدرس را بررسی کنید یا به صفحه اصلی پیشنهاد بروید.</p>
        <a href={import.meta.env.BASE_URL} className="mt-6 inline-flex h-12 items-center rounded-full bg-wingo px-6 font-bold text-paper">
          صفحه اصلی پیشنهاد
        </a>
      </div>
    </main>
  )
}
