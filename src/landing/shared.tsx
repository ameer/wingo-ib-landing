import { Fragment } from 'react'

export const wrap = 'mx-auto w-full max-w-[1120px] px-5 @3xl:px-10'
export const brandBtn = 'btn-shine inline-flex h-13 items-center gap-3 rounded-full bg-brand pr-7 pl-2 font-bold text-brand-ink'
export const faNum = (n: number) => n.toLocaleString('fa-IR')

/** Words wrapped as .w > span so GSAP can raise them one by one (word level keeps Persian joining intact). */
export function Split({ text }: { text: string }) {
  return text.split(' ').map((w, i) => (
    <Fragment key={i}>
      {i > 0 && ' '}
      <span className="w"><span>{w}</span></span>
    </Fragment>
  ))
}
