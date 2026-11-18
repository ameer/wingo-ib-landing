import { ArrowLeft, BadgeCheck, CalendarClock, MonitorSmartphone, ShieldCheck, Wallet, type LucideIcon } from 'lucide-react'
import { ib, type AccountKey } from '../../config/ib'
import type { Fact } from '../../content'
import { Split, brandBtn, wrap } from '../shared'

const FACT_ICON: Record<Fact['icon'], LucideIcon> = {
  account: ShieldCheck,
  deposit: Wallet,
  deadline: CalendarClock,
  platform: MonitorSmartphone,
}

export function Offer(p: { account: AccountKey; title: string; quote: string; facts: Fact[]; cta: string }) {
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
