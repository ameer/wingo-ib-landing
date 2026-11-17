import { Fragment, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import {
  ArrowLeft, ArrowUpLeft, BadgeCheck, CalendarClock, Camera, ChevronDown, Copy, Globe, Headset,
  Info, Layers, MonitorSmartphone, MousePointerClick, ShieldCheck, UserPlus, UserRound, Wallet, Zap,
  type LucideIcon,
} from 'lucide-react'
import {
  ACCOUNTS, ACCOUNT_KEYS, asset, ib, offer, wingoLinks, RISK_WARNING, REGISTERED_OFFICE,
  englishDisclaimer, type AccountKey, type OfferMode,
} from '../config/ib'
import { getContent, type Fact, type Faq, type Step } from '../content'
import { setupPage } from '../motion/page'
import { ThemeToggle } from './ThemeToggle'

type Props = { mode: OfferMode; account: AccountKey }

const wrap = 'mx-auto w-full max-w-[1120px] px-5 @3xl:px-10'
const brandBtn = 'btn-shine inline-flex h-13 items-center gap-3 rounded-full bg-brand pr-7 pl-2 font-bold text-brand-ink'

/** Words wrapped as .w > span so GSAP can raise them one by one (word level keeps Persian joining intact). */
function Split({ text }: { text: string }) {
  return text.split(' ').map((w, i) => (
    <Fragment key={i}>
      {i > 0 && ' '}
      <span className="w"><span>{w}</span></span>
    </Fragment>
  ))
}

export function Landing({ mode, account }: Props) {
  const acc = ACCOUNTS[account]
  const c = getContent(mode, { account: acc.name, minDeposit: offer.minDeposit, deadline: offer.deadline })
  const root = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ac = new AbortController()
    const off = setupPage(root.current!, ac.signal)
    return () => { ac.abort(); off() }
  }, { scope: root })

  return (
    <div ref={root} className={`@container overflow-x-clip bg-page ${acc.className}`}>
      <div aria-hidden className="progress" />
      <div aria-hidden className="torch" />
      <Header />
      <main>
        <Hero cta={c.heroCta} />
        <Offer account={account} title={c.offerTitle} quote={c.offerQuote} facts={c.facts} cta={c.offerCta} />
        <Terms title={c.termsTitle} body={c.termsBody} link={c.termsLink} />
        <Steps title={c.stepsTitle} steps={c.steps} />
        <WhyWingo highlight={account} />
        <Faqs items={c.faqs} />
      </main>
      <Footer />
      <StickyCta />
    </div>
  )
}

/* ───────────────────────── Header ───────────────────────── */

function Header() {
  return (
    <header data-hdr className="hdr sticky top-0 z-40 border-b border-line-soft bg-paper/85 backdrop-blur-md">
      <div className={`${wrap} flex h-16 items-center justify-between gap-4`}>
        {ib.logo ? (
          <img src={asset(ib.logo)} alt={ib.name} className="h-9 w-auto" />
        ) : (
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-brand text-sm font-extrabold text-brand-ink">{ib.initials}</span>
            <span className="font-bold">{ib.name}</span>
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-ink-mute">
            <span className="hidden @md:inline">همکار</span>
            <img src={asset('brand/wingo-logo-ink.png')} alt="وینگو مارکتس" className="h-7 w-auto dark:hidden" width={96} height={28} />
            <img src={asset('brand/wingo-logo.png')} alt="وینگو مارکتس" className="hidden h-7 w-auto dark:block" width={96} height={28} />
          </div>
          <span aria-hidden className="h-6 w-px bg-line" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero({ cta }: { cta: string }) {
  return (
    <section data-hero className="relative">
      <div data-hero-glow aria-hidden className="pointer-events-none absolute -top-40 left-[-10%] size-[640px] rounded-full bg-brand/20 blur-[120px] dark:bg-brand/12" />

      <div className={`${wrap} relative grid items-center gap-10 py-12 @3xl:grid-cols-[1.15fr_1fr] @3xl:gap-16 @3xl:py-20`}>
        <div data-hero-copy>
          <h1 data-hero-title className="text-[clamp(2.75rem,11cqw,5.5rem)] leading-[1.15] font-black tracking-tight">
            <Split text={ib.name} />
          </h1>
          <p data-hero-item className="mt-2 text-xl font-bold text-brand-deep @3xl:text-2xl">من با وینگو مارکتس همکارم.</p>
          <p data-hero-item className="mt-5 max-w-[46ch] text-lg leading-8 text-ink-soft">{ib.bio}</p>

          <aside data-hero-item className="mt-8 flex max-w-[52ch] gap-3 rounded-2xl border border-line-soft bg-paper p-4 text-sm leading-7 text-ink-soft shadow-[0_10px_30px_-18px_color-mix(in_oklab,var(--color-brand)_40%,transparent)]">
            <Info aria-hidden className="mt-1 size-5 shrink-0 text-brand" strokeWidth={1.8} />
            <p>
              من شریک معرفی‌کننده مستقل وینگو مارکتس هستم و نماینده یا کارمند آن نیستم.
              بابت معرفی شما ممکن است از وینگو مارکتس کمیسیون دریافت کنم.
            </p>
          </aside>

          <div data-hero-item className="mt-8">
            <a href="#offer" data-magnetic className={`${brandBtn} glow-pulse`}>
              {cta}
              <span className="nudge grid size-9 place-items-center rounded-full bg-brand-ink/10"><ArrowLeft className="size-4" /></span>
            </a>
          </div>
        </div>

        <Portrait />
      </div>
    </section>
  )
}

function Portrait() {
  return (
    <div data-hero-art className="relative -order-1 mx-auto w-full max-w-[250px] @3xl:order-none @3xl:max-w-[420px]">
      <div data-hero-earth aria-hidden className="earth pointer-events-none absolute top-1/2 left-1/2 w-[150%] -translate-x-1/2 -translate-y-1/2 opacity-70" />
      <div data-hero-portrait className="relative">
        <div data-hero-plate aria-hidden className="absolute -inset-3 -rotate-4 rounded-[30px] bg-brand/85" />
        <figure className="ring-brand relative aspect-4/5 overflow-hidden rounded-3xl">
          {ib.photo ? (
            <img src={asset(ib.photo)} alt={ib.name} className="size-full object-cover" />
          ) : (
            <div className="hatch grid size-full place-items-center bg-linear-to-b from-paper to-brand-soft">
              <div className="flex flex-col items-center gap-3 text-brand-deep/70">
                <span className="grid size-24 place-items-center rounded-full bg-paper shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--color-brand)_45%,transparent)]">
                  <UserRound className="size-12" strokeWidth={1.4} />
                </span>
                <span className="flex items-center gap-1.5 text-sm text-ink-mute"><Camera className="size-4" /> جای تصویر IB</span>
              </div>
            </div>
          )}
        </figure>
      </div>
    </div>
  )
}

/* ───────────────────────── Offer ───────────────────────── */

const FACT_ICON: Record<Fact['icon'], LucideIcon> = {
  account: ShieldCheck,
  deposit: Wallet,
  deadline: CalendarClock,
  platform: MonitorSmartphone,
}

function Offer(p: { account: AccountKey; title: string; quote: string; facts: Fact[]; cta: string }) {
  return (
    <section data-offer id="offer" className="scroll-mt-20 py-8 @3xl:py-12">
      <div className={wrap}>
        <div data-offer-card className="spin-border rounded-[28px]">
          <div className="relative overflow-hidden rounded-[28px] bg-paper p-5 shadow-[0_30px_80px_-50px_#0005] ring-1 ring-line-soft @md:p-8 @3xl:p-10">
            <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 size-[420px] rounded-full bg-brand/15 blur-3xl" />

            <div className="relative">
              <div>
                <span data-fade className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft py-1 pr-2.5 pl-3 text-sm font-bold text-brand-deep">
                  <BadgeCheck className="size-4" /> پیشنهاد اختصاصی من
                </span>
                <h2 data-split className="mt-4 text-[clamp(1.6rem,4.6cqw,2.6rem)] leading-[1.35] font-black"><Split text={p.title} /></h2>
                <blockquote data-fade className="mt-4 max-w-[68ch] border-r-2 border-brand pr-4 leading-8 text-ink-soft">
                  «{p.quote}»
                  <footer className="mt-1 text-sm font-bold text-ink">{ib.name}</footer>
                </blockquote>
              </div>
            </div>

            <div className="relative mt-7 grid gap-3 @md:grid-cols-3">
              {p.facts.map((f) => <FactTile key={f.label} fact={f} />)}
            </div>

            <div data-offer-cta className="relative mt-6 inline-block">
              <a href="#terms" data-magnetic className={brandBtn}>
                {p.cta}
                <span className="nudge grid size-9 place-items-center rounded-full bg-brand-ink/10"><ArrowLeft className="size-4" /></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Wraps the first number in a deposit value so it can count up. */
function FactValue({ fact }: { fact: Fact }) {
  if (fact.icon !== 'deposit') return <>{fact.value}</>
  const [, num, rest] = fact.value.match(/^([۰-۹0-9]+)(.*)$/) ?? []
  return num ? <><span data-count>{num}</span>{rest}</> : <>{fact.value}</>
}

function FactTile({ fact }: { fact: Fact }) {
  const Icon = FACT_ICON[fact.icon]
  return (
    <div data-fact className="flex items-center gap-4 rounded-2xl bg-page p-4 ring-1 ring-line-soft @3xl:p-5">
      <span data-icon className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-deep">
        <Icon className="size-5" strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <div className="text-sm text-ink-mute">{fact.label}</div>
        <div className="mt-0.5 text-xl font-extrabold @3xl:text-2xl"><FactValue fact={fact} /></div>
      </div>
    </div>
  )
}

/* ───────────────────────── Terms ───────────────────────── */

function Terms({ title, body, link }: { title: string; body: string[]; link: string }) {
  return (
    <section id="terms" className="scroll-mt-20 border-b border-line-soft">
      <div className={`${wrap} grid gap-6 py-14 @3xl:grid-cols-[1fr_1.4fr] @3xl:gap-16 @3xl:py-20`}>
        <div className="flex items-center gap-3">
          <span data-fade className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-brand-ink"><ShieldCheck className="size-6" strokeWidth={1.8} /></span>
          <h2 data-split className="text-3xl font-black"><Split text={title} /></h2>
        </div>
        <div data-fade>
          {body.map((t) => <p key={t} className="text-lg leading-8 text-ink-soft">{t}</p>)}
          <a href={wingoLinks.terms} target="_blank" rel="noopener" className="group mt-5 inline-flex items-center gap-1.5 font-bold text-brand-deep hover:text-brand">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_2px] bg-bottom-right bg-no-repeat pb-1 transition-[background-size] duration-300 group-hover:bg-size-[100%_2px] group-hover:bg-bottom-left">{link}</span>
            <ArrowUpLeft className="size-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Steps ───────────────────────── */

const STEP_ICON: LucideIcon[] = [UserPlus, MousePointerClick, Wallet]
const faNum = (n: number) => n.toLocaleString('fa-IR')

function Steps({ title, steps }: { title: string; steps: Step[] }) {
  return (
    <section className={`${wrap} py-14 @3xl:py-20`}>
      <h2 data-split className="text-3xl font-black @3xl:text-center"><Split text={title} /></h2>
      <ol data-steps className="mt-10 grid gap-8 @3xl:grid-cols-3 @3xl:gap-6">
        {steps.map((s, i) => {
          const Icon = STEP_ICON[i]
          return (
            <li key={s.title} data-step className="relative flex gap-5 @3xl:block @3xl:text-center">
              {/* Connector to the next step only, so the line runs from step 1 to step 3 and stops. */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  style={{ '--i': i } as CSSProperties}
                  className="rail absolute top-16 right-[27px] -bottom-6 w-0.5 overflow-hidden rounded-full bg-line-soft @3xl:top-[27px] @3xl:right-[calc(50%+36px)] @3xl:bottom-auto @3xl:left-[calc(-50%-1.5rem+36px)] @3xl:h-0.5 @3xl:w-auto"
                ><i /></span>
              )}
              <span className="step-dot on relative grid size-14 shrink-0 @3xl:mx-auto place-items-center rounded-2xl ring-1 ring-line-soft">
                <Icon className="size-6" strokeWidth={1.8} />
                <span className="absolute -top-2 -left-2 grid size-6 place-items-center rounded-full bg-ink text-xs font-bold text-page">{faNum(i + 1)}</span>
              </span>
              <div className="@3xl:mx-auto @3xl:mt-6 @3xl:max-w-[30ch]">
                <h3 className="text-xl font-extrabold">{s.title}</h3>
                <p className="mt-2 leading-7 text-ink-soft">{s.body}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

/* ───────────────────────── Why Wingo (bento grid) ───────────────────────── */

const tile = 'spot group relative overflow-hidden rounded-3xl bg-paper p-6 ring-1 ring-line-soft transition-shadow duration-500 hover:shadow-[0_30px_60px_-40px_color-mix(in_oklab,var(--color-brand)_60%,transparent)] @3xl:p-7'
const brandSpot = { '--spot': 'var(--color-brand)' } as CSSProperties

function WhyWingo({ highlight }: { highlight: AccountKey }) {
  return (
    <section id="why" className="relative scroll-mt-20 bg-paper/60 dark:bg-paper/40">
      <div className={`${wrap} py-14 @3xl:py-20`}>
        <div>
          <h2 data-split className="text-3xl font-black"><Split text="چرا وینگو مارکتس؟" /></h2>
          <p data-fade className="mt-4 max-w-[72ch] text-lg leading-8 text-ink-soft">
            وینگو مارکتس که با آن همکارم، یک بروکر آنلاین برای ترید در بازارهای جهانی است. از انتخاب حساب و ترید در متاتریدر ۵
            تا مدیریت واریز و برداشت در پنل کاربری، امکانات وینگو نیازهای تریدرهای فارسی‌زبان را هم پوشش می‌دهد.
          </p>
        </div>

        {/* Six equal tiles: 3 × 2 on desktop, 2 × 3 on tablet, stacked on mobile */}
        <div data-bento className="mt-10 grid auto-rows-fr gap-4 @md:grid-cols-2 @3xl:grid-cols-3">
          <AccountsTile highlight={highlight} />
          <MarketsTile />
          <SocialTile />
          <RialTile />
          <SupportTile />
          <WithdrawTile />
        </div>
      </div>
    </section>
  )
}

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

function AccountsTile({ highlight }: { highlight: AccountKey }) {
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

function MarketsTile() {
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

function SocialTile() {
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

function RialTile() {
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

function SupportTile() {
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

function WithdrawTile() {
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

/* ───────────────────────── FAQ ───────────────────────── */

function Faqs({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className={`${wrap} scroll-mt-20 py-14 @3xl:py-20`}>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <h2 data-split className="text-3xl font-black"><Split text="سؤالات متداول" /></h2>
        <a data-fade href={wingoLinks.support} target="_blank" rel="noopener" className="group inline-flex items-center gap-2 text-sm text-ink-soft hover:text-brand-deep">
          <Headset className="size-4 text-brand" /> سؤال دیگری دارید؟ <span className="font-bold text-brand-deep">پشتیبانی وینگو</span>
          <ArrowUpLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
      <div className="mt-8 divide-y divide-line-soft rounded-3xl bg-paper px-5 ring-1 ring-line-soft @3xl:px-8">
        {items.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={f.q} data-faq-item className={isOpen ? 'faq-open' : ''}>
              <h3>
                <button
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 py-5 text-right text-lg font-bold transition-colors hover:text-brand-deep @3xl:py-6"
                >
                  <span aria-hidden className="w-7 shrink-0 text-sm font-bold text-ink-mute tabular-nums">{faNum(i + 1).padStart(2, '۰')}</span>
                  <span className="flex-1">{f.q}</span>
                  <span className={`faq-chev grid size-8 shrink-0 place-items-center rounded-full ${isOpen ? 'bg-brand text-brand-ink' : 'bg-brand-soft text-brand-deep'}`}>
                    <ChevronDown className="size-4" />
                  </span>
                </button>
              </h3>
              <div id={`faq-${i}`} className="faq-panel" inert={!isOpen}>
                <div><p className="max-w-[80ch] pr-11 pb-6 leading-8 text-ink-soft">{f.a}</p></div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ───────────────────────── Sticky CTA ───────────────────────── */

function StickyCta() {
  return (
    <div data-sticky className="sticky-cta fixed inset-x-0 bottom-0 z-30 px-3 pb-3 @3xl:pb-5">
      <div className="mx-auto flex max-w-[760px] items-center justify-between gap-4 rounded-2xl bg-night-card p-2.5 pr-5 text-snow shadow-[0_18px_50px_-14px_#000a] ring-1 ring-night-line">
        <p className="text-sm leading-6 text-snow/70">
          <span className="hidden @md:inline">برای ثبت‌نام یا ورود به حساب کاربری، به پنل وینگو مارکتس منتقل می‌شوید.</span>
          <span className="@md:hidden">انتقال به پنل وینگو مارکتس</span>
        </p>
        <a href={ib.panelUrl} target="_blank" rel="noopener" className="btn-shine inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-brand px-5 font-bold text-brand-ink">
          ادامه در پنل وینگو
          <ArrowLeft className="nudge size-4" />
        </a>
      </div>
    </div>
  )
}

/* ───────────────────────── Footer ───────────────────────── */

function Footer() {
  const ext = 'inline-flex items-center gap-1 transition-colors hover:text-brand-2'
  return (
    <footer data-site-footer className="relative overflow-hidden bg-night text-snow/65">
      <div data-ft-earth aria-hidden className="earth pointer-events-none absolute -top-40 -left-40 w-[560px]" />
      <div className={`${wrap} relative py-14`}>
        <div className="grid gap-10 @3xl:grid-cols-[1.4fr_1fr_1fr]">
          <div data-ft-col className="sweep self-start rounded-xl py-2">
            <img src={asset('brand/wingo-logo.png')} alt="Wingo Markets" className="relative h-10 w-auto" width={137} height={40} />
          </div>
          <nav data-ft-col aria-label="راهنمای پیشنهاد">
            <h2 className="mb-4 font-bold text-snow">راهنمای پیشنهاد</h2>
            <ul className="space-y-2.5 text-sm">
              <li><a className={ext} href="#why">معرفی وینگو مارکتس</a></li>
              <li><a className={ext} href="#terms">شرایط پیشنهاد</a></li>
              <li><a className={ext} href="#faq">سؤالات متداول</a></li>
            </ul>
          </nav>
          <nav data-ft-col aria-label="پشتیبانی و اطلاعات حقوقی">
            <h2 className="mb-4 font-bold text-snow">پشتیبانی و اطلاعات حقوقی</h2>
            <ul className="space-y-2.5 text-sm">
              <li><a className={ext} href={wingoLinks.support} target="_blank" rel="noopener">تماس با پشتیبانی وینگو <ArrowUpLeft className="size-3.5" /></a></li>
              <li><a className={ext} href={wingoLinks.terms} target="_blank" rel="noopener">شرایط استفاده از خدمات <ArrowUpLeft className="size-3.5" /></a></li>
              <li><a className={ext} href={wingoLinks.privacy} target="_blank" rel="noopener">سیاست حریم خصوصی <ArrowUpLeft className="size-3.5" /></a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-night-line pt-8 pb-20 text-xs leading-6">
          <h2 className="mb-2 text-sm font-bold text-snow">هشدار ریسک</h2>
          <p className="max-w-[110ch]">{RISK_WARNING}</p>
          <div dir="ltr" className="mt-6 space-y-2 text-left text-snow/45">
            <p className="font-medium text-snow/65">{REGISTERED_OFFICE}</p>
            <p className="max-w-[110ch]">{englishDisclaimer(ib.nameLatin)}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
