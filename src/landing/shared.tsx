import { Fragment } from 'react'

export const wrap = 'mx-auto w-full max-w-[1120px] px-5 @3xl:px-10'
export const brandBtn = 'btn-shine inline-flex h-13 items-center gap-3 rounded-full bg-brand pr-7 pl-2 font-bold text-brand-ink'
export const faNum = (n: number) => n.toLocaleString('fa-IR')

/** Renders **…** as bold and [label](https://…) as an external link. */
export function Rich({ text }: { text: string }) {
  const out: React.ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(/\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g)) {
    out.push(text.slice(last, m.index))
    out.push(m[1] !== undefined
      ? <strong key={m.index} className="font-extrabold text-ink">{m[1]}</strong>
      : <a key={m.index} href={m[3]} target="_blank" rel="noopener" className="font-bold text-brand-deep underline decoration-brand/40 underline-offset-4 hover:decoration-brand">{m[2]}</a>)
    last = m.index + m[0].length
  }
  out.push(text.slice(last))
  return out
}

/** Words wrapped as .w > span so GSAP can raise them one by one (word level keeps Persian joining intact). */
export function Split({ text }: { text: string }) {
  return text.split(' ').map((w, i) => (
    <Fragment key={i}>
      {i > 0 && ' '}
      <span className="w"><span>{w}</span></span>
    </Fragment>
  ))
}
