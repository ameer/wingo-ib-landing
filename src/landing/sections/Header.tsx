import { ib, asset } from '../../config/ib'
import { socials } from '../Socials'
import { ThemeToggle } from '../ThemeToggle'
import { wrap } from '../shared'

export function Header() {
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
          {socials().map(({ key, label, href, Icon }) => (
            <a key={key} href={href} target="_blank" rel="noopener" aria-label={label} title={label} className="hidden size-9 @md:grid place-items-center rounded-full text-ink-soft transition-colors hover:bg-brand-soft hover:text-brand-deep">
              <Icon className="size-[18px]" />
            </a>
          ))}
          {socials().length > 0 && <span aria-hidden className="hidden h-6 w-px bg-line @md:block" />}
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
