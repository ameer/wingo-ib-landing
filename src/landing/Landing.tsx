import { Fragment, useRef, useState, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import {
  ArrowLeft, ArrowUpLeft, CalendarClock, Camera, ChevronDown, Copy, Globe, Headset,
  Info, MonitorSmartphone, MousePointerClick, ShieldCheck, UserPlus, UserRound, Wallet, Zap,
  type LucideIcon,
} from 'lucide-react'
import {
  ACCOUNTS, ACCOUNT_KEYS, asset, ib, offer, wingoLinks, RISK_WARNING, REGISTERED_OFFICE,
  englishDisclaimer, ibNameLatin, type AccountKey, type OfferMode,
} from '../config/ib'
import { getContent, type Fact, type Faq, type Step } from '../content'
import { setupPage } from '../motion/page'
import { ThemeToggle } from './ThemeToggle'

type Props = { mode: OfferMode; account: AccountKey }

const wrap = 'mx-auto w-full max-w-[1120px] px-5 @3xl:px-10'

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
        <Hero cta={c.heroCta} account={account} />
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
          <img src={ib.logo} alt={ib.name} className="h-9 w-auto" />
        ) : (
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-wingo text-sm font-extrabold text-snow">{ib.initials}</span>
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

function Hero({ cta, account }: { cta: string; account: AccountKey }) {
  return (
    <section data-hero className="relative">
      <div data-hero-glow aria-hidden className="pointer-events-none absolute -top-40 left-[-10%] size-[640px] rounded-full bg-glow/50 blur-[120px] dark:bg-glow/20" />

      <div className={`${wrap} relative grid items-center gap-10 py-12 @3xl:grid-cols-[1.15fr_1fr] @3xl:gap-16 @3xl:py-20`}>
        <div data-hero-copy>
          <h1 data-hero-title className="text-[clamp(2.75rem,11cqw,5.5rem)] leading-[1.15] font-black tracking-tight">
            <Split text={ib.name} />
          </h1>
          <p data-hero-item className="mt-2 text-xl font-bold text-wingo-deep @3xl:text-2xl">من با وینگو مارکتس همکارم.</p>
          <p data-hero-item className="mt-5 max-w-[46ch] text-lg leading-8 text-ink-soft">{ib.bio}</p>

          <aside data-hero-item className="mt-8 flex max-w-[52ch] gap-3 rounded-2xl border border-line-soft bg-paper p-4 text-sm leading-7 text-ink-soft shadow-[0_10px_30px_-18px_#01b99055]">
            <Info aria-hidden className="mt-1 size-5 shrink-0 text-wingo" strokeWidth={1.8} />
            <p>
              من شریک معرفی‌کننده مستقل وینگو مارکتس هستم و نماینده یا کارمند آن نیستم.
              بابت معرفی شما ممکن است از وینگو مارکتس کمیسیون دریافت کنم.
            </p>
          </aside>

          <div data-hero-item className="mt-8">
            <a href="#offer" data-magnetic className="btn-shine glow-pulse inline-flex h-13 items-center gap-3 rounded-full bg-wingo pr-7 pl-2 font-bold text-snow transition-colors hover:bg-[#009c7a]">
              {cta}
              <span className="nudge grid size-9 place-items-center rounded-full bg-snow/20"><ArrowLeft className="size-4" /></span>
            </a>
          </div>
        </div>

        <Portrait account={account} />
      </div>
    </section>
  )
}

function Portrait({ account }: { account: AccountKey }) {
  const acc = ACCOUNTS[account]
  return (
    <div data-hero-art className="relative -order-1 mx-auto w-full max-w-[250px] @3xl:order-none @3xl:max-w-[420px]">
      <img data-hero-earth aria-hidden src={asset('brand/img/Earth.png')} alt="" className="pointer-events-none absolute top-1/2 left-1/2 w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-55" />
      <div data-hero-portrait className="relative">
        <div data-hero-plate aria-hidden className="absolute -inset-3 -rotate-4 rounded-[30px] bg-(--acc)/80" />
        <figure className="ring-brand relative aspect-4/5 overflow-hidden rounded-3xl">
          {ib.photo ? (
            <img src={ib.photo} alt={ib.name} className="size-full object-cover" />
          ) : (
            <div className="hatch grid size-full place-items-center bg-linear-to-b from-paper to-mint/40">
              <div className="flex flex-col items-center gap-3 text-wingo-deep/70">
                <span className="grid size-24 place-items-center rounded-full bg-paper shadow-[0_10px_30px_-12px_#01b99066]">
                  <UserRound className="size-12" strokeWidth={1.4} />
                </span>
                <span className="flex items-center gap-1.5 text-sm text-ink-mute"><Camera className="size-4" /> جای تصویر IB</span>
              </div>
            </div>
          )}
        </figure>
      </div>

      <div data-hero-chip className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl bg-night-card py-2.5 pr-3 pl-4 text-snow shadow-[0_18px_40px_-16px_#000c] ring-1 ring-night-line @3xl:-left-10">
        <img src={asset(acc.icon)} alt="" className="size-9" />
        <div className="leading-tight">
          <div className="text-[11px] text-ink-mute">حساب پیشنهادی من</div>
          <div className="font-extrabold" dir="ltr">{acc.name}</div>
        </div>
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
  const acc = ACCOUNTS[p.account]
  return (
    <section data-offer id="offer" className="relative scroll-mt-4 overflow-hidden bg-night text-snow">
      <canvas data-particles aria-hidden className="pointer-events-none absolute inset-0 size-full" />
      <img data-offer-glow aria-hidden src={asset(acc.glow)} alt="" className="pointer-events-none absolute -top-10 left-[8%] h-[130%] w-[40%] rotate-12 opacity-70 mix-blend-screen blur-2xl" />
      <div
        data-offer-name
        aria-hidden
        dir="ltr"
        className="outline-type pointer-events-none absolute -bottom-[0.2em] left-0 text-[clamp(9rem,34cqw,24rem)] leading-none font-black whitespace-nowrap select-none"
      >
        {acc.name}
      </div>
      <img data-offer-icon aria-hidden src={asset(acc.icon)} alt="" className="pointer-events-none absolute top-16 left-[6%] hidden w-[22%] max-w-[260px] drop-shadow-[0_30px_60px_#0008] @3xl:block" />

      <div className={`${wrap} relative py-16 @3xl:py-24`}>
        <div className="max-w-[640px]">
          <span data-fade className="inline-flex items-center gap-2 rounded-full border border-snow/15 bg-snow/5 py-1 pr-1.5 pl-3.5 text-sm text-snow/80">
            <img src={asset(acc.icon)} alt="" className="size-6" />
            پیشنهاد اختصاصی من
          </span>
          <h2 data-split className="mt-5 text-[clamp(1.9rem,5.4cqw,3rem)] leading-[1.35] font-black"><Split text={p.title} /></h2>
          <blockquote data-fade className="mt-6 border-r-2 border-(--acc) pr-5 text-lg leading-8 text-snow/75">
            «{p.quote}»
            <footer className="mt-3 text-sm text-ink-mute">{ib.name}</footer>
          </blockquote>
        </div>

        <div className="mt-12 max-w-[760px]">
          <div data-slip className="spin-border rounded-2xl">
            <div className="perforated grid rounded-2xl bg-paper text-ink @md:grid-cols-[1fr_auto_1fr_auto_1fr]">
              {p.facts.map((f, i) => <FactCell key={f.label} fact={f} index={i} />)}
            </div>
          </div>
          <div data-offer-cta className="mt-6 inline-block">
            <a href="#terms" data-magnetic className="btn-shine inline-flex h-13 items-center gap-3 rounded-full bg-(--acc) pr-7 pl-2 font-bold text-(--acc-ink)">
              {p.cta}
              <span className="nudge grid size-9 place-items-center rounded-full bg-black/10"><ArrowLeft className="size-4" /></span>
            </a>
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

function FactCell({ fact, index }: { fact: Fact; index: number }) {
  const Icon = FACT_ICON[fact.icon]
  return (
    <>
      {index > 0 && <div aria-hidden className="mx-6 border-t-2 border-dashed border-line @md:mx-0 @md:my-5 @md:border-t-0 @md:border-r-2" />}
      <div data-fact className="flex items-center gap-4 px-6 py-5 @md:py-7">
        <span data-icon className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint/60 text-wingo-deep">
          <Icon className="size-5" strokeWidth={1.8} />
        </span>
        <div>
          <div className="text-sm text-ink-mute">{fact.label}</div>
          <div className="mt-0.5 text-xl font-extrabold @3xl:text-2xl"><FactValue fact={fact} /></div>
        </div>
      </div>
    </>
  )
}

/* ───────────────────────── Terms ───────────────────────── */

function Terms({ title, body, link }: { title: string; body: string[]; link: string }) {
  return (
    <section id="terms" className="scroll-mt-4 border-b border-line-soft">
      <div className={`${wrap} grid gap-6 py-14 @3xl:grid-cols-[1fr_1.4fr] @3xl:gap-16 @3xl:py-20`}>
        <div className="flex items-center gap-3">
          <span data-fade className="grid size-12 shrink-0 place-items-center rounded-2xl bg-wingo text-snow"><ShieldCheck className="size-6" strokeWidth={1.8} /></span>
          <h2 data-split className="text-3xl font-black"><Split text={title} /></h2>
        </div>
        <div data-fade>
          {body.map((t) => <p key={t} className="text-lg leading-8 text-ink-soft">{t}</p>)}
          <a href={wingoLinks.terms} target="_blank" rel="noopener" className="group mt-5 inline-flex items-center gap-1.5 font-bold text-wingo-deep hover:text-wingo">
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
      <h2 data-split className="text-3xl font-black"><Split text={title} /></h2>
      <ol data-steps className="relative mt-10 grid gap-8 @3xl:grid-cols-3 @3xl:gap-6">
        {/* Rail fills in reading direction: right → left on desktop, top → bottom on mobile */}
        <div aria-hidden className="absolute top-0 right-[27px] bottom-0 w-0.5 bg-line-soft @3xl:hidden" />
        <div aria-hidden className="rail-fill-v absolute top-0 right-[27px] bottom-0 w-0.5 bg-linear-to-b from-wingo to-aqua @3xl:hidden" />
        <div aria-hidden className="absolute top-[27px] right-0 hidden h-0.5 w-full bg-line-soft @3xl:block" />
        <div aria-hidden className="rail-fill absolute top-[27px] right-0 hidden h-0.5 w-full bg-linear-to-l from-wingo to-aqua @3xl:block" />

        {steps.map((s, i) => {
          const Icon = STEP_ICON[i]
          return (
            <li key={s.title} data-step className="relative flex gap-5 @3xl:block">
              <span className="step-dot on relative grid size-14 shrink-0 place-items-center rounded-2xl ring-1 ring-line-soft">
                <Icon className="size-6" strokeWidth={1.8} />
                <span className="absolute -top-2 -left-2 grid size-6 place-items-center rounded-full bg-ink text-xs font-bold text-page">{faNum(i + 1)}</span>
              </span>
              <div className="@3xl:mt-6 @3xl:pl-6">
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

/* ───────────────────────── Why Wingo ───────────────────────── */

function WhyWingo({ highlight }: { highlight: AccountKey }) {
  return (
    <section id="why" className="relative scroll-mt-4 overflow-hidden bg-paper">
      <div className={`${wrap} py-14 @3xl:py-20`}>
        <div className="grid gap-6 @3xl:grid-cols-[1fr_1.4fr] @3xl:gap-16">
          <h2 data-split className="text-3xl font-black"><Split text="چرا وینگو مارکتس؟" /></h2>
          <p data-fade className="text-lg leading-8 text-ink-soft">
            وینگو مارکتس که با آن همکارم، یک بروکر آنلاین برای ترید در بازارهای جهانی است. از انتخاب حساب و ترید در متاتریدر ۵
            تا مدیریت واریز و برداشت در پنل کاربری، امکانات وینگو نیازهای تریدرهای فارسی‌زبان را هم پوشش می‌دهد.
          </p>
        </div>

        <AccountRail highlight={highlight} />

        <div className="mt-6 grid gap-6 @3xl:grid-cols-[1fr_1.1fr]">
          <MarketsTile />
          <ul className="grid">
            <FeatureRow icon={<Copy className="size-5" strokeWidth={1.8} />} title="سوشال تریدینگ">
              سابقه و عملکرد ارائه‌دهندگان استراتژی را بررسی کنید و در صورت انتخاب، معاملات آن‌ها را در حساب خود کپی کنید.
            </FeatureRow>
            <FeatureRow icon={<img src={asset('brand/img/rial.png')} alt="" className="size-7 rounded-full" />} title="واریز و برداشت ریالی">
              حساب را با کارت بانکی شارژ کنید و برداشت ریالی را از پنل درخواست دهید.
            </FeatureRow>
            <FeatureRow icon={<Headset className="size-5" strokeWidth={1.8} />} title="پشتیبانی فارسی">
              برای ثبت‌نام و استفاده از پنل به زبان فارسی راهنمایی بگیرید.
            </FeatureRow>
            {/* Title becomes «برداشت آنی» + method name once the eligible method is confirmed. */}
            <FeatureRow icon={<Zap className="size-5" strokeWidth={1.8} />} title="برداشت سریع">
              زمان پردازش به روش برداشت انتخابی بستگی دارد.
              <span className="mt-3 flex flex-wrap items-center gap-3">
                <span data-pay className="flex items-center gap-2" aria-label="روش‌های پرداخت">
                  <img src={asset('brand/img/rial.png')} alt="ریال" className="size-6 rounded-full" />
                  <img src={asset('brand/img/USDT-TRC.png')} alt="USDT TRC20" className="h-6 w-auto" />
                  <img src={asset('brand/img/wingo-pay.png')} alt="Wingo Pay" className="h-5 w-auto rounded bg-[#1b211f] p-0.5" />
                </span>
                <a href={wingoLinks.withdrawals} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-sm font-bold text-wingo-deep hover:text-wingo">
                  روش‌ها و زمان‌بندی برداشت <ArrowUpLeft className="size-3.5" />
                </a>
              </span>
            </FeatureRow>
          </ul>
        </div>
      </div>
    </section>
  )
}

function AccountRail({ highlight }: { highlight: AccountKey }) {
  return (
    <div className="mt-12 rounded-3xl bg-night p-5 text-snow ring-1 ring-night-line @3xl:p-8">
      <h3 className="text-xl font-extrabold">حساب متناسب با سبک ترید</h3>
      <p className="mt-2 max-w-[60ch] leading-7 text-snow/60">
        شرایط حساب‌های Starter، ECN، Pro و GoldFlex را بر اساس استراتژی و بازار موردنظر خود مقایسه کنید.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 @3xl:grid-cols-4">
        {ACCOUNT_KEYS.map((k) => {
          const a = ACCOUNTS[k]
          const on = k === highlight
          return (
            <div
              key={k}
              data-acc-card
              className={`${a.className} neon-edge spot group relative overflow-hidden rounded-2xl p-4 @3xl:p-5 ${on ? 'outline-2 outline-offset-2 outline-(--acc)' : ''}`}
            >
              <img aria-hidden src={asset(a.glow)} alt="" className="pointer-events-none absolute -top-1/3 -left-1/4 h-[160%] w-[70%] opacity-50 mix-blend-screen blur-xl transition-opacity duration-500 group-hover:opacity-90" />
              <div className="relative">
                <img data-acc-icon src={asset(a.icon)} alt="" className="size-12 @3xl:size-14" />
                <div className="mt-6 text-right text-xl font-black @3xl:text-2xl" dir="ltr">{a.name}</div>
                <div className="mt-0.5 text-sm text-snow/55">{a.tagline}</div>
              </div>
              {on && <span data-acc-badge className="absolute top-3 left-3 rounded-full bg-(--acc) px-2.5 py-1 text-[11px] font-bold text-(--acc-ink)">پیشنهاد من</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MarketsTile() {
  return (
    <div data-markets className="relative flex min-h-[340px] flex-col overflow-hidden rounded-3xl bg-linear-to-br from-mint/70 via-paper to-page p-6 ring-1 ring-line-soft @3xl:p-8">
      <img aria-hidden src={asset('brand/img/Earth.png')} alt="" className="pointer-events-none absolute -top-24 -right-24 w-[70%] opacity-60" />
      <div className="relative">
        <span className="grid size-11 place-items-center rounded-xl bg-paper text-wingo-deep shadow-sm"><Globe className="size-5" strokeWidth={1.8} /></span>
        <h3 className="mt-4 text-xl font-extrabold">دسترسی به بازارهای جهانی</h3>
        <p className="mt-2 max-w-[40ch] leading-7 text-ink-soft">از طریق متاتریدر ۵ به بازارهایی مانند فارکس، طلا و شاخص‌ها دسترسی داشته باشید.</p>
      </div>
      <img data-mt5 src={asset('brand/img/Metatrader-Mockup.png')} alt="متاتریدر ۵ روی لپ‌تاپ" className="relative mt-auto -mb-6 w-[88%] self-end @3xl:-mb-8" />
    </div>
  )
}

function FeatureRow({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <li data-feature className="group flex gap-4 border-b border-line-soft py-5 last:border-b-0">
      <span data-icon className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint/50 text-wingo-deep transition-colors duration-300 group-hover:bg-wingo group-hover:text-snow">
        {icon}
      </span>
      <div>
        <h3 className="text-lg font-extrabold">{title}</h3>
        <div className="mt-1 leading-7 text-ink-soft">{children}</div>
      </div>
    </li>
  )
}

/* ───────────────────────── FAQ ───────────────────────── */

function Faqs({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className={`${wrap} scroll-mt-4 py-14 @3xl:py-20`}>
      <div className="grid gap-8 @3xl:grid-cols-[1fr_1.4fr] @3xl:gap-16">
        <h2 data-split className="text-3xl font-black"><Split text="سؤالات متداول" /></h2>
        <div className="divide-y divide-line-soft rounded-3xl bg-paper px-5 ring-1 ring-line-soft @3xl:px-7">
          {items.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} data-faq-item className={isOpen ? 'faq-open' : ''}>
                <h3>
                  <button
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-5 text-right text-lg font-bold transition-colors hover:text-wingo-deep"
                  >
                    {f.q}
                    <span className={`faq-chev mt-0.5 grid size-7 shrink-0 place-items-center rounded-full ${isOpen ? 'bg-wingo text-snow' : 'bg-mint/60 text-wingo-deep'}`}>
                      <ChevronDown className="size-4" />
                    </span>
                  </button>
                </h3>
                <div id={`faq-${i}`} className="faq-panel" inert={!isOpen}>
                  <div><p className="pb-6 leading-8 text-ink-soft">{f.a}</p></div>
                </div>
              </div>
            )
          })}
        </div>
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
        <a href={ib.panelUrl} target="_blank" rel="noopener" className="btn-shine inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-signal px-5 font-bold text-[#1b211f]">
          ادامه در پنل وینگو
          <ArrowLeft className="nudge size-4" />
        </a>
      </div>
    </div>
  )
}

/* ───────────────────────── Footer ───────────────────────── */

function Footer() {
  const ext = 'inline-flex items-center gap-1 transition-colors hover:text-aqua'
  return (
    <footer data-site-footer className="relative overflow-hidden bg-night text-snow/65">
      <img data-ft-earth aria-hidden src={asset('brand/img/Earth.png')} alt="" className="pointer-events-none absolute -top-40 -left-40 w-[560px] opacity-30" />
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
            <p className="max-w-[110ch]">{englishDisclaimer(ibNameLatin)}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
