import { ArrowLeft, Camera, UserRound } from 'lucide-react'
import { asset, ib } from '../../config/ib'
import { socials } from '../Socials'
import { Split, brandBtn, wrap } from '../shared'

export function Hero({ cta }: { cta: string }) {
  return (
    <section data-hero className="relative">
      <div data-hero-glow aria-hidden className="pointer-events-none absolute -top-40 left-[-10%] size-[640px] rounded-full bg-brand/20 blur-[120px] dark:bg-brand/12" />

      <div className={`${wrap} relative grid items-center gap-10 py-12 @3xl:grid-cols-[1.15fr_1fr] @3xl:gap-16 @3xl:py-20`}>
        <div data-hero-copy>
          <h1 data-hero-title className="text-[clamp(2.75rem,11cqw,5.5rem)] leading-[1.15] font-black tracking-tight">
            <Split text={ib.name} />
          </h1>
          <p data-hero-item className="mt-5 max-w-[56ch] text-lg leading-8 text-ink-soft">{ib.bio}</p>

          <div data-hero-item className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
            <a href="#offer" data-magnetic className={`${brandBtn} glow-pulse`}>
              {cta}
              <span className="nudge grid size-9 place-items-center rounded-full bg-brand-ink/10"><ArrowLeft className="size-4" /></span>
            </a>
            <div className="flex flex-wrap gap-2">
              {socials().map(({ key, label, handle, href, Icon }) => (
                <a key={key} href={href} target="_blank" rel="noopener" aria-label={`${label}: @${handle}`} className="inline-flex h-11 items-center gap-2 rounded-full bg-paper px-4 text-sm font-bold text-ink-soft ring-1 ring-line-soft transition-colors hover:text-brand-deep hover:ring-brand/40">
                  <Icon className="size-4 text-brand-deep" />
                  <span dir="ltr">@{handle}</span>
                </a>
              ))}
            </div>
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
            <img src={asset(ib.photo)} alt={ib.name} width={840} height={1050} fetchPriority="high" decoding="async" className="size-full object-cover" />
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
