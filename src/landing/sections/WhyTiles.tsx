import type { CSSProperties, ReactNode } from 'react'
import { ArrowUpLeft, Copy, Globe, Headset, Layers, Wallet, Zap } from 'lucide-react'
import { ACCOUNTS, ACCOUNT_KEYS, asset, wingoLinks, type AccountKey } from '../../config/ib'

const tile = 'spot group relative overflow-hidden rounded-3xl bg-paper p-6 ring-1 ring-line-soft transition-shadow duration-500 hover:shadow-[0_30px_60px_-40px_color-mix(in_oklab,var(--color-brand)_60%,transparent)] @3xl:p-7'
const brandSpot = { '--spot': 'var(--color-brand)' } as CSSProperties

/** Shared tile frame: text on top, a fixed-height picture area pinned to the bottom. */
function Tile({ icon, title, body, art, className = '', ...rest }: {
  icon: ReactNode; title: string; body: ReactNode; art: ReactNode; className?: string; 'data-markets'?: boolean
}) {
  return (
    <div data-tile className={`${tile} flex flex-col ${className}`} style={brandSpot} {...rest}>
      <div className="relative">
        <span data-icon className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand-deep transition-colors duration-300 group-hover:bg-brand group-hover:text-brand-ink">
          {icon}
        </span>
        <h3 className="mt-4 text-lg font-extrabold">{title}</h3>
        <p className="mt-1.5 leading-7 text-ink-soft">{body}</p>
      </div>
      <div aria-hidden className="relative mt-auto h-28 pt-5">{art}</div>
    </div>
  )
}

export function AccountsTile({ highlight }: { highlight: AccountKey }) {
  return (
    <Tile
      icon={<Layers className="size-5" strokeWidth={1.8} />}
      title="حساب متناسب با سبک ترید"
      body="شرایط حساب‌های Starter، ECN، Pro و GoldFlex را بر اساس استراتژی و بازار موردنظر خود مقایسه کنید."
      art={
        <div className="flex h-full flex-wrap content-end items-end gap-2">
          {ACCOUNT_KEYS.map((k) => {
            const a = ACCOUNTS[k]
            const on = k === highlight
            return (
              <span
                key={k}
                data-acc-card
                dir="ltr"
                className={`${a.className} rounded-full px-3.5 py-2 text-sm font-bold ${on ? 'bg-(--acc) text-(--acc-ink)' : 'bg-page text-ink-soft ring-1 ring-line-soft'}`}
              >
                {a.name}
              </span>
            )
          })}
        </div>
      }
    />
  )
}

export function MarketsTile() {
  return (
    <Tile
      data-markets
      icon={<Globe className="size-5" strokeWidth={1.8} />}
      title="دسترسی به بازارهای جهانی"
      body="از طریق متاتریدر ۵ به بازارهایی مانند فارکس، طلا و شاخص‌ها دسترسی داشته باشید."
      art={
        <>
          <div className="earth pointer-events-none absolute top-0 left-1/2 w-[85%] -translate-x-1/2 opacity-60" />
          <img data-mt5 src={asset('brand/img/Metatrader-Mockup.png')} alt="" className="absolute top-3 left-1/2 w-[78%] max-w-none -translate-x-1/2" />
        </>
      }
    />
  )
}

export function SocialTile() {
  return (
    <Tile
      icon={<Copy className="size-5" strokeWidth={1.8} />}
      title="سوشال تریدینگ"
      body="سابقه و عملکرد ارائه‌دهندگان استراتژی را بررسی کنید و در صورت انتخاب، معاملات آن‌ها را در حساب خود کپی کنید."
      art={
        /* Decorative equity curve, not real data */
        <svg viewBox="0 0 240 60" className="absolute inset-x-0 bottom-0 h-20 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--color-brand)" stopOpacity=".28" />
              <stop offset="1" stopColor="var(--color-brand)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 50 L24 44 L44 47 L68 36 L92 39 L116 28 L138 31 L162 20 L186 24 L210 12 L240 6 V60 H0 Z" fill="url(#spark-fill)" />
          <path data-spark pathLength={1} className="spark" d="M0 50 L24 44 L44 47 L68 36 L92 39 L116 28 L138 31 L162 20 L186 24 L210 12 L240 6" fill="none" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      }
    />
  )
}

export function RialTile() {
  return (
    <Tile
      icon={<Wallet className="size-5" strokeWidth={1.8} />}
      title="واریز و برداشت ریالی"
      body="حساب را با کارت بانکی شارژ کنید و برداشت ریالی را از پنل درخواست دهید."
      art={
        /* Decorative bank card with the rial mark */
        <>
          <div data-float className="absolute top-6 left-2 h-20 w-36 -rotate-6 rounded-2xl bg-linear-to-br from-brand-2 via-brand to-brand-deep p-3 shadow-[0_18px_34px_-16px_var(--color-brand)]">
            <span className="block h-4 w-6 rounded-[5px] bg-brand-ink/25" />
            <span className="absolute bottom-3 left-3 flex gap-1.5" dir="ltr">
              {[0, 1, 2, 3].map((g) => <span key={g} className="flex gap-0.5">{[0, 1, 2, 3].map((d) => <i key={d} className="size-1 rounded-full bg-brand-ink/45" />)}</span>)}
            </span>
          </div>
          <img src={asset('brand/img/rial.png')} alt="" className="absolute top-12 left-32 size-11 rounded-full shadow-[0_10px_20px_-8px_#0006] ring-4 ring-paper" />
        </>
      }
    />
  )
}

export function SupportTile() {
  return (
    <Tile
      icon={<Headset className="size-5" strokeWidth={1.8} />}
      title="پشتیبانی فارسی"
      body="برای ثبت‌نام و استفاده از پنل به زبان فارسی راهنمایی بگیرید."
      art={
        /* Abstract chat: bubble shapes only, no invented messages */
        <div className="flex h-full flex-col justify-end gap-2">
          <div data-bubble className="mr-auto w-3/4 space-y-1.5 rounded-2xl rounded-tl-sm bg-page p-3 ring-1 ring-line-soft">
            <span className="block h-1.5 w-11/12 rounded-full bg-line" /><span className="block h-1.5 w-2/3 rounded-full bg-line" />
          </div>
          <div data-bubble className="w-2/3 space-y-1.5 rounded-2xl rounded-tr-sm bg-brand p-3">
            <span className="block h-1.5 w-full rounded-full bg-brand-ink/25" /><span className="block h-1.5 w-1/2 rounded-full bg-brand-ink/25" />
          </div>
        </div>
      }
    />
  )
}

export function WithdrawTile() {
  return (
    <Tile
      icon={<Zap className="size-5" strokeWidth={1.8} />}
      /* Title becomes «برداشت آنی» + method name once the eligible method is confirmed. */
      title="برداشت سریع"
      body={
        <>
          زمان پردازش به روش برداشت انتخابی بستگی دارد.{' '}
          <a href={wingoLinks.withdrawals} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-bold text-brand-deep hover:text-brand">
            روش‌ها و زمان‌بندی برداشت <ArrowUpLeft className="size-3.5" />
          </a>
        </>
      }
      art={
        <ul data-pay className="flex h-full flex-wrap content-end items-end gap-2">
          <PayChip label="ریالی"><img src={asset('brand/img/rial.png')} alt="" className="size-6 rounded-full" /></PayChip>
          <PayChip label="USDT TRC20"><img src={asset('brand/img/USDT-TRC.png')} alt="" className="h-6 w-auto" /></PayChip>
          <PayChip label="Wingo Pay"><img src={asset('brand/img/wingo-pay.png')} alt="" className="h-5 w-auto rounded bg-[#1b211f] p-0.5" /></PayChip>
        </ul>
      }
    />
  )
}

function PayChip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <li className="flex h-11 items-center gap-2 rounded-xl bg-page px-3 text-sm font-bold ring-1 ring-line-soft">
      {children}<span dir="auto">{label}</span>
    </li>
  )
}
