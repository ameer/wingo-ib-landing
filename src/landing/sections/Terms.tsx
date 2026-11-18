import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { ib } from '../../config/ib'
import { Rich, Split, brandBtn, wrap } from '../shared'

export function Terms({ title, body, cta }: { title: string; body: string[]; cta: string }) {
  return (
    <section id="terms" className="scroll-mt-20 border-b border-line-soft">
      <div className={`${wrap} grid gap-6 py-14 @3xl:grid-cols-[1fr_1.4fr] @3xl:gap-16 @3xl:py-20`}>
        <div className="flex items-center gap-3">
          <span data-fade className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-brand-ink"><ShieldCheck className="size-6" strokeWidth={1.8} /></span>
          <h2 data-split className="text-3xl font-black"><Split text={title} /></h2>
        </div>
        <div data-fade>
          <div className="space-y-3">
            {body.map((t) => <p key={t} className="text-lg leading-8 text-ink-soft"><Rich text={t} /></p>)}
          </div>
          <a href={ib.panelUrl} target="_blank" rel="noopener" data-magnetic className={`${brandBtn} mt-7`}>
            {cta}
            <span className="nudge grid size-9 place-items-center rounded-full bg-brand-ink/10"><ArrowLeft className="size-4" /></span>
          </a>
        </div>
      </div>
    </section>
  )
}
