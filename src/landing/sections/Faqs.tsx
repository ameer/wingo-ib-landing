import { useState } from 'react'
import { ArrowUpLeft, ChevronDown, Headset } from 'lucide-react'
import { ib, wingoLinks } from '../../config/ib'
import { telegramUrl } from '../Socials'
import type { Faq } from '../../content'
import { Rich, Split, faNum, wrap } from '../shared'

export function Faqs({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className={`${wrap} scroll-mt-20 py-14 @3xl:py-20`}>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <h2 data-split className="text-3xl font-black"><Split text="سؤالات متداول" /></h2>
        <a data-fade href={telegramUrl() ?? wingoLinks.support} target="_blank" rel="noopener" className="group inline-flex items-center gap-2 text-sm text-ink-soft hover:text-brand-deep">
          <Headset className="size-4 text-brand" /> سؤال دیگری دارید؟ <span className="font-bold text-brand-deep">{ib.telegram ? 'پشتیبانی تلگرام من' : 'پشتیبانی وینگو'}</span>
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
                <div><p className="max-w-[80ch] pr-11 pb-6 leading-8 text-ink-soft"><Rich text={f.a} /></p></div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
