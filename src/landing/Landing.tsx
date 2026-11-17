import { useEffect, useRef, useState } from 'react'
import {
  ACCOUNTS, ib, offer, wingoLinks, RISK_WARNING, REGISTERED_OFFICE,
  englishDisclaimer, ibNameLatin, type AccountKey, type OfferMode,
} from '../config/ib'
import { getContent, type Fact, type Faq, type Step } from '../content'

type Props = { mode: OfferMode; account: AccountKey }

export function Landing({ mode, account }: Props) {
  const acc = ACCOUNTS[account]
  const c = getContent(mode, { account: acc.name, minDeposit: offer.minDeposit, deadline: offer.deadline })

  return (
    <div className={`@container bg-mist ${acc.className}`}>
      <Header />
      <main>
        <Hero cta={c.heroCta} />
        <Offer
          key={mode + account}
          accountName={acc.name}
          title={c.offerTitle}
          quote={c.offerQuote}
          facts={c.facts}
          cta={c.offerCta}
        />
        <Terms title={c.termsTitle} body={c.termsBody} link={c.termsLink} />
        <Steps title={c.stepsTitle} steps={c.steps} />
        <WhyWingo highlight={account} />
        <Faqs items={c.faqs} />
        <StickyCta />
      </main>
      <Footer />
    </div>
  )
}

const wrap = 'mx-auto w-full max-w-[1120px] px-5 @3xl:px-10'

function Header() {
  return (
    <header className="border-b border-line bg-paper/80 backdrop-blur">
      <div className={`${wrap} flex h-16 items-center justify-between gap-4`}>
        {ib.logo ? (
          <img src={ib.logo} alt={ib.name} className="h-9 w-auto" />
        ) : (
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-pine text-sm font-extrabold text-paper">{ib.initials}</span>
            <span className="font-bold">{ib.name}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-ink-soft">
          <span className="hidden @md:inline">همکار</span>
          <img src="/brand/wingo-logo-ink.png" alt="وینگو مارکتس" className="h-7 w-auto" width={96} height={28} />
        </div>
      </div>
    </header>
  )
}

function Hero({ cta }: { cta: string }) {
  return (
    <section className={`${wrap} grid items-center gap-10 py-12 @3xl:grid-cols-[1.15fr_1fr] @3xl:gap-16 @3xl:py-20`}>
      <div>
        <h1 className="text-[clamp(2.75rem,11cqw,5.5rem)] leading-[1.05] font-black tracking-tight">
          {ib.name}
        </h1>
        <p className="mt-3 text-xl font-bold text-pine @3xl:text-2xl">
          من با وینگو مارکتس همکارم.
        </p>
        <p className="mt-5 max-w-[46ch] text-lg leading-8 text-ink-soft">{ib.bio}</p>

        <aside className="mt-8 flex max-w-[52ch] gap-3 rounded-xl border border-line bg-paper p-4 text-sm leading-7 text-ink-soft">
          <svg aria-hidden viewBox="0 0 20 20" className="mt-1 size-5 shrink-0 text-wingo"><circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M10 9v5M10 6.2v.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <p>
            من شریک معرفی‌کننده مستقل وینگو مارکتس هستم و نماینده یا کارمند آن نیستم.
            بابت معرفی شما ممکن است از وینگو مارکتس کمیسیون دریافت کنم.
          </p>
        </aside>

        <a href="#offer" className="mt-8 inline-flex h-13 items-center rounded-full bg-ink px-7 font-bold text-paper transition-colors hover:bg-pine">
          {cta}
        </a>
      </div>

      <Portrait />
    </section>
  )
}

function Portrait() {
  return (
    <figure className="relative -order-1 mx-auto w-full max-w-[240px] @3xl:order-none @3xl:max-w-[420px]">
      <div className="absolute -inset-3 -z-0 rotate-[-3deg] rounded-[28px] bg-[var(--acc)]" aria-hidden />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-paper">
        {ib.photo ? (
          <img src={ib.photo} alt={ib.name} className="size-full object-cover" />
        ) : (
          <div className="hatch grid size-full place-items-center">
            <div className="text-center">
              <div className="text-[7rem] leading-none font-black text-pine/15">{ib.initials}</div>
              <div className="mt-3 text-sm text-ink-soft">تصویر IB</div>
            </div>
          </div>
        )}
      </div>
    </figure>
  )
}

function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect() }
    }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen] as const
}

function Offer(p: { accountName: string; title: string; quote: string; facts: Fact[]; cta: string }) {
  const [ref, seen] = useInView<HTMLDivElement>()
  return (
    <section id="offer" className="relative overflow-hidden bg-pine-deep text-paper">
      <div
        aria-hidden
        className="outline-type pointer-events-none absolute -bottom-[0.18em] left-[-0.04em] text-[clamp(9rem,34cqw,24rem)] leading-none font-black select-none"
        dir="ltr"
      >
        {p.accountName}
      </div>

      <div className={`${wrap} relative py-16 @3xl:py-24`}>
        <div className="max-w-[640px]">
          <h2 className="text-[clamp(1.9rem,5.4cqw,3rem)] leading-[1.25] font-black">{p.title}</h2>
          <blockquote className="mt-6 border-r-2 border-[var(--acc)] pr-5 text-lg leading-8 text-paper/80">
            «{p.quote}»
            <footer className="mt-3 text-sm text-paper/55">{ib.name}</footer>
          </blockquote>
        </div>

        <div ref={ref} className={`mt-12 max-w-[760px] ${seen ? 'slip-in' : 'opacity-0'}`}>
          <div className="perforated grid rounded-2xl bg-paper text-ink @md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {p.facts.map((f, i) => (
              <FactCell key={f.label} fact={f} divider={i > 0} />
            ))}
          </div>
          <a
            href="#terms"
            className="mt-6 inline-flex h-13 items-center rounded-full bg-[var(--acc)] px-7 font-bold text-[var(--acc-ink)] transition-[filter] hover:brightness-95"
          >
            {p.cta}
          </a>
        </div>
      </div>
    </section>
  )
}

function FactCell({ fact, divider }: { fact: Fact; divider: boolean }) {
  return (
    <>
      {divider && (
        <div aria-hidden className="mx-6 border-t-2 border-dashed border-line @md:mx-0 @md:my-5 @md:border-t-0 @md:border-r-2" />
      )}
      <div className="px-6 py-5 @md:py-7">
        <div className="text-sm text-ink-soft">{fact.label}</div>
        <div className="mt-1 text-2xl font-extrabold">{fact.value}</div>
      </div>
    </>
  )
}

function Terms({ title, body, link }: { title: string; body: string[]; link: string }) {
  return (
    <section id="terms" className="scroll-mt-6 border-b border-line">
      <div className={`${wrap} grid gap-6 py-14 @3xl:grid-cols-[1fr_1.4fr] @3xl:gap-16 @3xl:py-20`}>
        <h2 className="text-3xl font-black">{title}</h2>
        <div>
          {body.map((t) => (
            <p key={t} className="text-lg leading-8 text-ink-soft">{t}</p>
          ))}
          <a href={wingoLinks.terms} target="_blank" rel="noopener" className="mt-5 inline-block font-bold text-pine underline decoration-wingo decoration-2 underline-offset-8 hover:text-wingo">
            {link}
          </a>
        </div>
      </div>
    </section>
  )
}

const faNum = (n: number) => n.toLocaleString('fa-IR')

function Steps({ title, steps }: { title: string; steps: Step[] }) {
  return (
    <section className={`${wrap} py-14 @3xl:py-20`}>
      <h2 className="text-3xl font-black">{title}</h2>
      <ol className="relative mt-10 grid gap-8 @3xl:grid-cols-3 @3xl:gap-6">
        <div aria-hidden className="absolute top-0 bottom-0 right-[21px] w-0.5 bg-line @3xl:top-[21px] @3xl:right-0 @3xl:bottom-auto @3xl:h-0.5 @3xl:w-full" />
        {steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-5 @3xl:block">
            <span className="relative grid size-11 shrink-0 place-items-center rounded-full border-2 border-pine bg-mist text-lg font-black text-pine">
              {faNum(i + 1)}
            </span>
            <div className="@3xl:mt-6 @3xl:pl-6">
              <h3 className="text-xl font-extrabold">{s.title}</h3>
              <p className="mt-2 leading-7 text-ink-soft">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

const FEATURES = [
  { t: 'دسترسی به بازارهای جهانی', b: 'از طریق متاتریدر ۵ به بازارهایی مانند فارکس، طلا و شاخص‌ها دسترسی داشته باشید.' },
  { t: 'سوشال تریدینگ', b: 'سابقه و عملکرد ارائه‌دهندگان استراتژی را بررسی کنید و در صورت انتخاب، معاملات آن‌ها را در حساب خود کپی کنید.' },
  { t: 'واریز و برداشت ریالی', b: 'حساب را با کارت بانکی شارژ کنید و برداشت ریالی را از پنل درخواست دهید.' },
  { t: 'پشتیبانی فارسی', b: 'برای ثبت‌نام و استفاده از پنل به زبان فارسی راهنمایی بگیرید.' },
  // Becomes «برداشت آنی» + method name once the eligible method is confirmed.
  { t: 'برداشت سریع', b: 'زمان پردازش به روش برداشت انتخابی بستگی دارد.', link: 'روش‌ها و زمان‌بندی برداشت' },
]

function WhyWingo({ highlight }: { highlight: AccountKey }) {
  return (
    <section id="why" className="scroll-mt-6 bg-paper">
      <div className={`${wrap} py-14 @3xl:py-20`}>
        <div className="grid gap-6 @3xl:grid-cols-[1fr_1.4fr] @3xl:gap-16">
          <h2 className="text-3xl font-black">چرا وینگو مارکتس؟</h2>
          <p className="text-lg leading-8 text-ink-soft">
            وینگو مارکتس که با آن همکارم، یک بروکر آنلاین برای ترید در بازارهای جهانی است. از انتخاب حساب و ترید در متاتریدر ۵
            تا مدیریت واریز و برداشت در پنل کاربری، امکانات وینگو نیازهای تریدرهای فارسی‌زبان را هم پوشش می‌دهد.
          </p>
        </div>

        <div className="mt-12 rounded-2xl bg-mist p-6 @3xl:p-8">
          <h3 className="text-xl font-extrabold">حساب متناسب با سبک ترید</h3>
          <p className="mt-2 max-w-[60ch] leading-7 text-ink-soft">
            شرایط حساب‌های Starter، ECN، Pro و GoldFlex را بر اساس استراتژی و بازار موردنظر خود مقایسه کنید.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2 @md:grid-cols-4" dir="ltr">
            {(Object.keys(ACCOUNTS) as AccountKey[]).map((k) => (
              <div
                key={k}
                className={`${ACCOUNTS[k].className} relative flex h-20 items-end rounded-xl bg-[var(--acc)] p-3 font-black text-[var(--acc-ink)] ${k === highlight ? 'ring-2 ring-ink ring-offset-2 ring-offset-mist' : ''}`}
              >
                {ACCOUNTS[k].name}
                {k === highlight && (
                  <span className="absolute top-2.5 right-3 text-xs font-bold" dir="rtl">پیشنهاد من</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <ul className="mt-4 grid @3xl:grid-cols-2 @3xl:gap-x-16">
          {FEATURES.map((f) => (
            <li key={f.t} className="border-b border-line py-6">
              <h3 className="text-lg font-extrabold">{f.t}</h3>
              <p className="mt-1.5 leading-7 text-ink-soft">{f.b}</p>
              {f.link && (
                <a href={wingoLinks.withdrawals} target="_blank" rel="noopener" className="mt-2 inline-block text-sm font-bold text-pine underline decoration-wingo decoration-2 underline-offset-6">
                  {f.link}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Faqs({ items }: { items: Faq[] }) {
  return (
    <section id="faq" className={`${wrap} scroll-mt-6 py-14 @3xl:py-20`}>
      <div className="grid gap-8 @3xl:grid-cols-[1fr_1.4fr] @3xl:gap-16">
        <h2 className="text-3xl font-black">سؤالات متداول</h2>
        <div className="border-t border-line">
          {items.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex items-start justify-between gap-6 py-5 text-lg font-bold">
                {f.q}
                <span aria-hidden className="faq-plus mt-1 grid size-6 shrink-0 place-items-center text-2xl leading-none text-wingo transition-transform">+</span>
              </summary>
              <p className="pb-6 leading-8 text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function StickyCta() {
  return (
    <div className="sticky bottom-0 z-10 px-3 pb-3 @3xl:px-0 @3xl:pb-5">
      <div className="mx-auto flex max-w-[760px] items-center justify-between gap-4 rounded-2xl bg-ink p-2.5 pr-5 text-paper shadow-[0_12px_40px_-12px_#0b3b3080]">
        <p className="text-sm leading-6 text-paper/75">
          <span className="hidden @md:inline">برای ثبت‌نام یا ورود به حساب کاربری، به پنل وینگو مارکتس منتقل می‌شوید.</span>
          <span className="@md:hidden">انتقال به پنل وینگو مارکتس</span>
        </p>
        <a href={ib.panelUrl} target="_blank" rel="noopener" className="inline-flex h-12 shrink-0 items-center rounded-xl bg-signal px-6 font-bold text-ink transition-[filter] hover:brightness-95">
          ادامه در پنل وینگو
        </a>
      </div>
    </div>
  )
}

function Footer() {
  const ext = 'hover:text-paper underline-offset-4 hover:underline'
  return (
    <footer className="bg-ink text-paper/70">
      <div className={`${wrap} py-14`}>
        <div className="grid gap-10 @3xl:grid-cols-[1.4fr_1fr_1fr]">
          <img src="/brand/wingo-logo.png" alt="Wingo Markets" className="h-10 w-auto self-start" width={137} height={40} />
          <nav aria-label="راهنمای پیشنهاد">
            <h2 className="mb-4 font-bold text-paper">راهنمای پیشنهاد</h2>
            <ul className="space-y-2.5 text-sm">
              <li><a className={ext} href="#why">معرفی وینگو مارکتس</a></li>
              <li><a className={ext} href="#terms">شرایط پیشنهاد</a></li>
              <li><a className={ext} href="#faq">سؤالات متداول</a></li>
            </ul>
          </nav>
          <nav aria-label="پشتیبانی و اطلاعات حقوقی">
            <h2 className="mb-4 font-bold text-paper">پشتیبانی و اطلاعات حقوقی</h2>
            <ul className="space-y-2.5 text-sm">
              <li><a className={ext} href={wingoLinks.support} target="_blank" rel="noopener">تماس با پشتیبانی وینگو ↗</a></li>
              <li><a className={ext} href={wingoLinks.terms} target="_blank" rel="noopener">شرایط استفاده از خدمات ↗</a></li>
              <li><a className={ext} href={wingoLinks.privacy} target="_blank" rel="noopener">سیاست حریم خصوصی ↗</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-paper/10 pt-8 text-xs leading-6">
          <h2 className="mb-2 text-sm font-bold text-paper">هشدار ریسک</h2>
          <p className="max-w-[110ch]">{RISK_WARNING}</p>
          <div dir="ltr" className="mt-6 space-y-2 text-left text-paper/50">
            <p className="font-medium text-paper/70">{REGISTERED_OFFICE}</p>
            <p className="max-w-[110ch]">{englishDisclaimer(ibNameLatin)}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
