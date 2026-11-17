// Shared motion runtime: GSAP + ScrollTrigger + Lenis and the helpers every section uses.
// Ported from the trick-or-trade campaign (same rules: one clock, loops pause off screen).
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'power3.out' })

export { gsap, ScrollTrigger }

export const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches
export const fine = () => matchMedia('(hover: hover) and (pointer: fine)').matches
export const wide = () => matchMedia('(min-width: 1024px)').matches

export const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s)
export const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)]

const FA = '۰۱۲۳۴۵۶۷۸۹'
const fa = (v: number | string) => String(v).replace(/\d/g, (d) => FA[+d])
const unfa = (s: string) => s.replace(/[۰-۹]/g, (d) => String(FA.indexOf(d))).replace(/[٬,]/g, '')

/** Counts the Persian/Latin number inside `el` up from 0, keeping its digits. */
export function countUp(el: HTMLElement, duration = 1.4) {
  const text = el.textContent ?? ''
  const target = Number(unfa(text).replace(/[^\d.]/g, ''))
  if (!target) return
  const persian = /[۰-۹]/.test(text)
  const fmt = (n: number) => (persian ? fa(Math.round(n)) : String(Math.round(n)))
  const o = { v: 0 }
  el.textContent = fmt(0)
  gsap.to(o, { v: target, duration, ease: 'power4.out', onUpdate: () => { el.textContent = fmt(o.v) }, onComplete: () => { el.textContent = text } })
}

let lenis: Lenis | null = null

/** Smooth scrolling driven by GSAP's ticker so ScrollTrigger and Lenis share one clock. */
export function startLenis() {
  if (reduce() || lenis) return lenis
  lenis = new Lenis({ duration: 1.15, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (t: number) => lenis?.raf(t * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  document.documentElement.classList.add('lenis')
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
    document.documentElement.classList.remove('lenis')
  }
}

/** Hash links scroll with Lenis (falls back to native smooth scroll). */
export function anchors() {
  const onClick = (e: MouseEvent) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
    const href = a?.getAttribute('href')
    if (!a || !href || href.length < 2) return
    const target = document.querySelector<HTMLElement>(href)
    if (!target) return
    e.preventDefault()
    if (lenis) lenis.scrollTo(target, { offset: -16, duration: 1.4 })
    else target.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth' })
  }
  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}

/** Sections whose decorative motion stops while they are off screen. */
const SECTIONS = 'main > section, [data-site-footer]'
const loops = new Map<Element, gsap.core.Animation[]>()

/** Registers an endless animation so it pauses while its section is off screen. */
export function loop<T extends gsap.core.Animation>(anim: T, el: Element | null): T {
  const host = el?.closest(SECTIONS)
  if (!host) return anim
  if (!loops.has(host)) loops.set(host, [])
  loops.get(host)!.push(anim)
  if (host.classList.contains('is-idle')) anim.pause()
  return anim
}

/** Off-screen sections get .is-idle (pauses CSS loops) and their GSAP loops paused. */
export function idleOffscreen(root: ParentNode) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      e.target.classList.toggle('is-idle', !e.isIntersecting)
      for (const a of loops.get(e.target) ?? []) { if (e.isIntersecting) a.resume(); else a.pause() }
    }
  }, { rootMargin: '200px 0px' })
  for (const s of $$(SECTIONS, root)) io.observe(s)
  return () => { io.disconnect(); loops.clear() }
}

/** Layout shifts (fonts, images) move trigger positions; keep ScrollTrigger honest. */
export function watchLayout() {
  let t = 0
  const ro = new ResizeObserver(() => {
    clearTimeout(t)
    t = window.setTimeout(() => ScrollTrigger.refresh(), 150)
  })
  ro.observe(document.body)
  return () => { ro.disconnect(); clearTimeout(t) }
}

/** Buttons lean toward the pointer. */
export function magnetic(els: HTMLElement[], signal: AbortSignal) {
  if (!fine()) return
  for (const b of els) {
    const qx = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3' })
    const qy = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3' })
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect()
      qx((e.clientX - r.left - r.width / 2) * 0.22)
      qy((e.clientY - r.top - r.height / 2) * 0.3)
    }, { signal })
    b.addEventListener('pointerleave', () => { qx(0); qy(0) }, { signal })
  }
}

/** 3D tilt + spotlight (--mx/--my) toward the pointer. Perspective set once, never tweened. */
export function tilt(els: HTMLElement[], signal: AbortSignal, rx = 7, ry = 9) {
  if (!fine()) return
  for (const el of els) {
    gsap.set(el, { transformPerspective: 1000 })
    const qx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' })
    const qy = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' })
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
      qx((0.5 - y) * rx)
      qy((x - 0.5) * ry)
      el.style.setProperty('--mx', `${x * 100}%`)
      el.style.setProperty('--my', `${y * 100}%`)
    }, { signal })
    el.addEventListener('pointerleave', () => { qx(0); qy(0) }, { signal })
  }
}

/** Rising market particles on a canvas, only animated while its section is on screen. */
export function particles(c: HTMLCanvasElement | null, colors: string[]) {
  if (!c) return
  const ctx = c.getContext('2d')!
  type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; c: string; t: number }
  let W = 0, H = 0, raf = 0, running = false
  const ps: P[] = []
  const size = () => {
    const dpr = Math.min(2, devicePixelRatio || 1)
    W = c.clientWidth; H = c.clientHeight
    c.width = W * dpr; c.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  const make = (init: boolean): P => ({
    x: Math.random() * W, y: init ? Math.random() * H : H + 10, r: Math.random() * 1.5 + 0.4,
    vy: -(Math.random() * 0.35 + 0.12), vx: (Math.random() - 0.5) * 0.18, a: Math.random() * 0.55 + 0.2,
    c: colors[(Math.random() * colors.length) | 0], t: Math.random() * 6.28,
  })
  size()
  for (let i = 0; i < 46; i++) ps.push(make(true))
  addEventListener('resize', size)
  const frame = () => {
    ctx.clearRect(0, 0, W, H)
    ps.forEach((p, i) => {
      p.t += 0.02; p.x += p.vx + Math.sin(p.t) * 0.15; p.y += p.vy
      const al = p.a * (0.55 + 0.45 * Math.sin(p.t * 3))
      ctx.beginPath(); ctx.fillStyle = `rgba(${p.c},${al * 0.18})`; ctx.arc(p.x, p.y, p.r * 4, 0, 6.283); ctx.fill()
      ctx.beginPath(); ctx.fillStyle = `rgba(${p.c},${al})`; ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill()
      if (p.y < -12) ps[i] = make(false)
    })
    raf = requestAnimationFrame(frame)
  }
  ScrollTrigger.create({
    trigger: c.parentElement, start: 'top bottom', end: 'bottom top',
    onToggle: (s) => {
      if (s.isActive && !running) { running = true; frame() }
      else if (!s.isActive && running) { running = false; cancelAnimationFrame(raf) }
    },
  })
  return () => { cancelAnimationFrame(raf); removeEventListener('resize', size) }
}
