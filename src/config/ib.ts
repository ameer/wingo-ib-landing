// Per-IB values. Defaults live here; at startup `loadConfig()` overwrites them with
// public/ib.json, so each IB's deploy changes that one file and needs no rebuild.
// TODO_CONFIRM = sample value / draft copy that needs sign-off before publishing.

/** `both` shows the bonus and the PRO-account offers side by side. */
export type OfferMode = 'both' | 'bonus' | 'account'
export const OFFER_MODES: OfferMode[] = ['both', 'bonus', 'account']
export type AccountKey = 'starter' | 'ecn' | 'pro' | 'goldflex'

// Icons + glow backgrounds are Wingo's own, from wingomarkets.com/en/accounts.
// TODO_CONFIRM: taglines are draft one-liners, check against Wingo's account descriptions.
export const ACCOUNTS: Record<AccountKey, { name: string; className: string; icon: string; glow: string; tagline: string }> = {
  starter: { name: 'Starter', className: 'acc-starter', icon: 'brand/accounts/starter1.svg', glow: 'brand/img/std-main-bg.png', tagline: 'برای شروع' },
  ecn: { name: 'ECN', className: 'acc-ecn', icon: 'brand/accounts/ecn1.svg', glow: 'brand/img/ecn-main-bg.png', tagline: 'اسپرد خام' },
  pro: { name: 'Pro', className: 'acc-pro', icon: 'brand/accounts/pro1.svg', glow: 'brand/img/pro-main-bg.png', tagline: 'برای حرفه‌ای‌ها' },
  goldflex: { name: 'GoldFlex', className: 'acc-goldflex', icon: 'brand/accounts/goldflex-2.svg', glow: 'brand/img/gold-main-bg-1.png', tagline: 'مخصوص طلا' },
}
export const ACCOUNT_KEYS = Object.keys(ACCOUNTS) as AccountKey[]

/** Resolve a public/ asset path against Vite's base URL. Absolute paths and URLs pass through. */
export const asset = (p: string) => (/^(https?:)?\/|^data:/.test(p) ? p : `${import.meta.env.BASE_URL}${p}`)

/* ── Overridable from public/ib.json (see README → "Setting up an IB") ── */

export const ib = {
  name: 'ترانه اکبری', // sample name from the wireframe
  nameLatin: 'Taraneh Akbari', // used in the English footer text
  initials: 'ت‌ا',
  logo: null as string | null, // IB logo; null shows the initials mark
  photo: null as string | null, // IB portrait; null shows the placeholder
  bio: 'من ترانه اکبری هستم، مهندس و فعال بازارهای مالی. هر روز در لایو ترید و کانال‌های VIP، همراه شما مارکت رو تحلیل می‌کنم و فرصت‌های ترید رو بررسی می‌کنیم. برای اینکه بتونید این روزها با دست بازتری ترید کنید، با همکاری وینگو مارکتس چند آفر ویژه هم براتون در نظر گرفتم که همین‌جا می‌تونید ببینید و فعالشون کنید.',
  panelUrl: 'https://clientx.wingomarkets.com/links/go/1771', // TODO_CONFIRM: this IB's approved ClientX link
}

export const offer = {
  mode: 'both' as OfferMode, // offer type shown at /
  account: 'pro' as AccountKey, // account shown at /
  minDeposit: '۱۰۰ دلار', // TODO_CONFIRM
  deadline: '۱۰ آذر ۱۴۰۵', // TODO_CONFIRM
}

/** Page colour. `brand` drives buttons, highlights and the globe; `brandInk` is text placed on it. */
export const colors = {
  brand: '#1e3a8a',
  brandInk: '#ffffff',
}

/* ── Fixed for every IB ── */

export const wingoLinks = {
  support: 'https://clientx.wingomarkets.com/links/go/1771', //'https://wingomarkets.com/fa/contact-us',
  terms: 'https://wingomarkets.com/dls/documents/Wingo-Markets-Terms-and-Conditions.pdf',
  privacy: 'https://wingomarkets.com/dls/documents/Wingo-Markets-Privacy-Policy.pdf',
  withdrawals: 'https://wingomarkets.com/fa', // TODO_CONFIRM: page listing withdrawal methods & timing
}

// Verbatim from the Wingo Persian site footer. Do not edit.
export const RISK_WARNING =
  'معامله ابزارهای مشتقه و محصولات اهرمی با سطح بالایی از ریسک همراه است و ممکن است برای همه سرمایه‌گذاران مناسب نباشد. پیش از شروع معامله، اطمینان حاصل کنید که ریسک‌های مربوطه را به‌طور کامل درک کرده‌اید و تنها با پولی معامله کنید که توانایی از دست دادن آن را دارید. وینگو مارکتس توسط Wingo Group LTD اداره می‌شود؛ شرکتی ثبت‌شده در جزیره خودمختار موالی (موهلی)، اتحادیه کومور، با شماره ثبت HY00523010 و دارای مجوز از سازمان خدمات بین‌المللی موالی (MISA) تحت مجوز کارگزاری و تسویه بین‌المللی شماره T2023302.'
export const REGISTERED_OFFICE =
  'Registered Office: New City, Acton Building, No. 64, 106, Podgorica, Montenegro.'
export const englishDisclaimer = (ibName: string) =>
  `This page has been published to introduce Wingo Markets' offer to the audience of ${ibName}. ${ibName} is an independent introducing partner and is not a representative or employee of Wingo Markets. The bonus, terms and services are provided by Wingo Markets, and only Wingo's official terms apply.`
