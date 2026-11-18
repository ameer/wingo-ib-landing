import { ArrowLeft } from 'lucide-react'
import { ib } from '../../config/ib'

export function StickyCta() {
  return (
    <div data-sticky className="sticky-cta fixed inset-x-0 bottom-0 z-30 px-3 pb-3 @3xl:pb-5">
      <div className="mx-auto flex max-w-[760px] items-center justify-between gap-4 rounded-2xl bg-night-card p-2.5 pr-5 text-snow shadow-[0_18px_50px_-14px_#000a] ring-1 ring-night-line">
        <p className="text-sm leading-6 text-snow/70">
          <span className="hidden @md:inline">برای ثبت‌نام یا ورود به حساب کاربری، به پنل وینگو مارکتس منتقل می‌شوید.</span>
          <span className="@md:hidden">انتقال به پنل وینگو مارکتس</span>
        </p>
        <a href={ib.panelUrl} target="_blank" rel="noopener" className="btn-shine inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-brand px-5 font-bold text-brand-ink">
          ادامه در پنل وینگو
          <ArrowLeft className="nudge size-4" />
        </a>
      </div>
    </div>
  )
}
