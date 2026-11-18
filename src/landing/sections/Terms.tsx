import { ArrowUpLeft, ShieldCheck } from 'lucide-react'
import { wingoLinks } from '../../config/ib'
import { Split, wrap } from '../shared'

export function Terms({ title, body, link }: { title: string; body: string[]; link: string }) {
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
