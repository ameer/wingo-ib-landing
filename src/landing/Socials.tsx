// The IB's own Telegram / Instagram, from ib.json. Lucide has no brand icons, so these are inline.
import type { SVGProps } from 'react'
import { ib } from '../config/ib'

type Icon = (p: SVGProps<SVGSVGElement>) => React.JSX.Element

const TelegramIcon: Icon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M21.94 4.3a1.2 1.2 0 0 0-1.62-1.33L2.9 9.7c-1.15.45-1.08 2.1.1 2.44l4.3 1.27 1.64 5.08c.3.93 1.48 1.2 2.16.5l2.3-2.36 4.4 3.24c.83.6 2 .15 2.2-.85L21.94 4.3ZM9.6 13.1l8.04-5.6-6.5 6.6-.27 2.95-1.27-3.95Z" />
  </svg>
)

const InstagramIcon: Icon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
)

export type Social = { key: string; label: string; handle: string; href: string; Icon: Icon }

export function socials(): Social[] {
  const out: Social[] = []
  if (ib.telegram) out.push({ key: 'telegram', label: 'تلگرام', handle: ib.telegram, href: `https://t.me/${ib.telegram}`, Icon: TelegramIcon })
  if (ib.instagram) out.push({ key: 'instagram', label: 'اینستاگرام', handle: ib.instagram, href: `https://instagram.com/${ib.instagram}`, Icon: InstagramIcon })
  return out
}

export const telegramUrl = () => (ib.telegram ? `https://t.me/${ib.telegram}` : null)
