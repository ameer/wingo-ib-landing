import { ArrowUpLeft } from 'lucide-react'
import { REGISTERED_OFFICE, RISK_WARNING, asset, englishDisclaimer, ib, wingoLinks } from '../../config/ib'
import { wrap } from '../shared'

export function Footer() {
  const ext = 'inline-flex items-center gap-1 transition-colors hover:text-brand-2'
  return (
    <footer data-site-footer className="relative overflow-hidden bg-night text-snow/65">
      <div data-ft-earth aria-hidden className="earth pointer-events-none absolute -top-40 -left-40 w-[560px]" />
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
            <p className="max-w-[110ch]">{englishDisclaimer(ib.nameLatin)}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
