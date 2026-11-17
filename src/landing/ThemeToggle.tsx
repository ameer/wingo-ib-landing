import { useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'
const current = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

/** Light/dark switch. The new theme grows out of the button as a circle (View Transitions API). */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(current)
  const next: Theme = theme === 'dark' ? 'light' : 'dark'

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const apply = () => {
      document.documentElement.dataset.theme = next
      flushSync(() => setTheme(next))
      try { localStorage.setItem('theme', next) } catch { /* private mode: theme just won't persist */ }
    }
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) return apply()

    const r = e.currentTarget.getBoundingClientRect()
    const x = r.left + r.width / 2, y = r.top + r.height / 2
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(.2,.8,.2,1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'حالت روشن' : 'حالت تیره'}
      title={theme === 'dark' ? 'حالت روشن' : 'حالت تیره'}
      className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-line bg-paper text-ink transition-colors hover:border-wingo hover:text-wingo-deep"
    >
      <Sun className={`absolute size-[18px] transition-all duration-500 ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`} />
      <Moon className={`absolute size-[18px] transition-all duration-500 ${theme === 'dark' ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
    </button>
  )
}
