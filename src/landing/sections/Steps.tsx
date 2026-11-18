import type { CSSProperties } from 'react'
import { MousePointerClick, UserPlus, Wallet, type LucideIcon } from 'lucide-react'
import type { Step } from '../../content'
import { Split, faNum, wrap } from '../shared'

const STEP_ICON: LucideIcon[] = [UserPlus, MousePointerClick, Wallet]

export function Steps({ title, steps }: { title: string; steps: Step[] }) {
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
