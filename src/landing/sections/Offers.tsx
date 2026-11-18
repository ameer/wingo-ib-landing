import { ArrowLeft, BadgeCheck } from 'lucide-react'
import { ib } from '../../config/ib'
import type { OfferCard } from '../../content'
import { Rich, Split, brandBtn, wrap } from '../shared'

/** `both` mode: the offers next to each other on desktop, stacked on mobile. */
export function Offers({ items }: { items: OfferCard[] }) {
  return (
    <section data-offer id="offer" className="scroll-mt-20 py-8 @3xl:py-12">
      <div className={wrap}>
        <span data-fade className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft py-1 pr-2.5 pl-3 text-sm font-bold text-brand-deep">
          <BadgeCheck className="size-4" /> پیشنهادهای اختصاصی من
        </span>
        <div className="mt-5 grid gap-5 @3xl:grid-cols-2 @3xl:gap-6">
          {items.map((o) => <Card key={o.tag} offer={o} />)}
        </div>
      </div>
    </section>
  )
}

function Card({ offer: o }: { offer: OfferCard }) {
  return (
    <div data-offer-card className="spin-border flex rounded-[28px]">
      <article className="relative flex w-full flex-col overflow-hidden rounded-[28px] bg-paper p-6 shadow-[0_30px_80px_-50px_#0005] ring-1 ring-line-soft @md:p-8">
        <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 size-[360px] rounded-full bg-brand/15 blur-3xl" />
        <span className="relative self-start rounded-full bg-brand px-3 py-1 text-sm font-extrabold text-brand-ink">{o.tag}</span>
        <h2 data-split className="relative mt-4 text-[clamp(1.5rem,3.4cqw,2.1rem)] leading-[1.4] font-black"><Split text={o.title} /></h2>
        <p className="relative mt-4 text-lg leading-8 text-ink-soft"><Rich text={o.body} /></p>
        <div data-offer-cta className="relative mt-auto inline-block self-start pt-7">
          <a href={ib.panelUrl} target="_blank" rel="noopener" data-magnetic className={brandBtn}>
            {o.cta}
            <span className="nudge grid size-9 place-items-center rounded-full bg-brand-ink/10"><ArrowLeft className="size-4" /></span>
          </a>
        </div>
      </article>
    </div>
  )
}
