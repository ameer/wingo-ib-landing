// Page choreography. Elements are found by data-* hooks rendered in Landing.tsx.
// Runs inside useGSAP (layout effect), so start states are set before first paint.
import {
  $, $$, anchors, countUp, fine, gsap, idleOffscreen, loop, magnetic, particles, reduce,
  ScrollTrigger, startLenis, tilt, watchLayout, wide,
} from './core'

export function setupPage(root: HTMLElement, signal: AbortSignal) {
  if (reduce()) return () => {}

  const cleanups = [startLenis(), anchors(), watchLayout()]

  heroIntro(root)
  heroParallax(root, signal)
  pageChrome(root, signal)
  headingsAndFades(root)
  offer(root)
  steps(root)
  whyWingo(root, signal)
  faq(root)
  footer(root)
  magnetic($$('[data-magnetic]', root), signal)
  cleanups.push(idleOffscreen(root))

  ScrollTrigger.refresh()
  return () => cleanups.forEach((c) => typeof c === 'function' && c())
}

/* ── Hero: one orchestrated load sequence ── */

function heroIntro(root: HTMLElement) {
  const words = $$('[data-hero-title] .w > span', root)
  const chip = $('[data-hero-chip]', root)
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('[data-hdr]', { yPercent: -100, opacity: 0, duration: 0.9, clearProps: 'transform,opacity' }, 0)
    .from('[data-hero-earth]', { scale: 0.75, rotate: -25, opacity: 0, duration: 2.2, ease: 'power2.out' }, 0)
    .from('[data-hero-glow]', { scale: 0.4, opacity: 0, duration: 2 }, 0)
    .from(words, { yPercent: 115, rotate: 4, opacity: 0, duration: 1.05, stagger: 0.08, ease: 'expo.out' }, 0.2)
    .from('[data-hero-item]', { y: 26, opacity: 0, filter: 'blur(6px)', duration: 0.9, stagger: 0.09, clearProps: 'filter' }, 0.55)
    .from('[data-hero-portrait]', { y: 60, scale: 0.92, opacity: 0, duration: 1.3, ease: 'expo.out' }, 0.3)
    .fromTo('[data-hero-plate]', { rotate: 4, opacity: 0 }, { rotate: 0, opacity: 1, duration: 1.1, ease: 'back.out(1.6)' }, 0.7)
    .from(chip, { x: -40, scale: 0.85, opacity: 0, duration: 0.8, ease: 'back.out(1.8)' }, 1.1)
    .add(() => { loop(gsap.to(chip, { y: -8, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 }), chip) })
}

function heroParallax(root: HTMLElement, signal: AbortSignal) {
  const hero = $('[data-hero]', root)
  if (!hero) return
  if (fine()) {
    const px = gsap.quickTo('[data-hero-portrait]', 'x', { duration: 0.9, ease: 'power3' })
    const pr = gsap.quickTo('[data-hero-portrait]', 'rotate', { duration: 0.9, ease: 'power3' })
    const ex = gsap.quickTo('[data-hero-earth]', 'x', { duration: 1.4, ease: 'power3' })
    const ey = gsap.quickTo('[data-hero-earth]', 'y', { duration: 1.4, ease: 'power3' })
    hero.addEventListener('pointermove', (e) => {
      const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5
      px(nx * 18); pr(nx * 2); ex(-nx * 30); ey(-ny * 20)
    }, { signal })
  }
  const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
  gsap.to('[data-hero-art]', { yPercent: 10, ease: 'none', scrollTrigger: st })
  if (wide()) gsap.to('[data-hero-copy]', { y: -60, opacity: 0.25, ease: 'none', scrollTrigger: { ...st, start: '35% top' } })
}

/* ── Progress bar, torch, header hide/show, sticky CTA ── */

function pageChrome(root: HTMLElement, signal: AbortSignal) {
  gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })

  const torch = $('.torch', root)
  if (fine() && torch) {
    const tx = gsap.quickTo(torch, 'x', { duration: 0.5, ease: 'power3' })
    const ty = gsap.quickTo(torch, 'y', { duration: 0.5, ease: 'power3' })
    addEventListener('pointermove', (e) => { torch.style.opacity = '1'; tx(e.clientX); ty(e.clientY) }, { passive: true, signal })
    document.addEventListener('pointerleave', () => (torch.style.opacity = '0'), { signal })
  }

  const hdr = $('[data-hdr]', root)
  const sticky = $('[data-sticky]', root)
  const footerEl = $('[data-site-footer]', root)
  let last = 0
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: (s) => {
      const y = s.scroll()
      hdr?.classList.toggle('nav-solid', y > 40)
      hdr?.classList.toggle('nav-hidden', y > 500 && y > last)
      const footerTop = footerEl ? footerEl.getBoundingClientRect().top : Infinity
      sticky?.classList.toggle('show', y > 520 && footerTop > innerHeight - 40)
      last = y
    },
  })
}

/* ── Section headings rise word by word; lead paragraphs un-blur ── */

function headingsAndFades(root: HTMLElement) {
  for (const h of $$('[data-split]', root)) {
    gsap.from($$('.w > span', h), {
      yPercent: 115, rotate: 4, opacity: 0, duration: 1.05, stagger: 0.06, ease: 'expo.out',
      scrollTrigger: { trigger: h, start: 'top 85%' },
    })
  }
  for (const el of $$('[data-fade]', root)) {
    gsap.fromTo(el, { y: 26, opacity: 0, filter: 'blur(6px)' }, {
      y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, clearProps: 'filter',
      scrollTrigger: { trigger: el, start: 'top 90%' },
    })
  }
}

/* ── Offer: scrubbed account name + icon, slip drops in, facts count up, particles ── */

function offer(root: HTMLElement) {
  const sec = $('[data-offer]', root)
  if (!sec) return
  const st = { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1 }
  gsap.fromTo('[data-offer-name]', { xPercent: -14 }, { xPercent: 10, ease: 'none', scrollTrigger: st })
  gsap.fromTo('[data-offer-icon]', { rotate: -25, y: 80 }, { rotate: 25, y: -80, ease: 'none', scrollTrigger: st })
  gsap.fromTo('[data-offer-glow]', { opacity: 0.2, scale: 0.8 }, { opacity: 0.75, scale: 1.1, ease: 'none', scrollTrigger: { ...st, end: 'center center' } })

  const slip = $('[data-slip]', sec)
  if (slip) {
    gsap.set(slip, { transformPerspective: 1100 })
    gsap.timeline({ scrollTrigger: { trigger: slip, start: 'top 85%' } })
      .from(slip, { y: 90, rotateX: 28, rotate: -3, opacity: 0, duration: 1.3, ease: 'expo.out' })
      .from($$('[data-fact]', slip), { y: 20, opacity: 0, duration: 0.6, stagger: 0.12 }, 0.35)
      .from($$('[data-fact] [data-icon]', slip), { scale: 0, rotate: -60, duration: 0.7, stagger: 0.12, ease: 'back.out(2.2)' }, 0.4)
      .add(() => $$('[data-count]', slip).forEach((n) => countUp(n, 1.3)), 0.5)
      .from('[data-offer-cta]', { scale: 0.6, opacity: 0, duration: 0.9, ease: 'back.out(2)' }, 0.7)
  }

  const acc = getComputedStyle(sec).getPropertyValue('--acc').trim()
  particles($<HTMLCanvasElement>('[data-particles]', sec), ['0,211,126', '40,232,190', hexRgb(acc)])
}

function hexRgb(hex: string) {
  const m = hex.replace('#', '').match(/.{2}/g)
  return m ? m.map((h) => parseInt(h, 16)).join(',') : '0,255,199'
}

/* ── Steps: rail fills with scroll and lights each dot ── */

function steps(root: HTMLElement) {
  const list = $('[data-steps]', root)
  if (!list) return
  const dots = $$('.step-dot', list)
  gsap.fromTo(list, { '--rail': 0 }, {
    '--rail': 1, ease: 'none',
    scrollTrigger: {
      trigger: list, start: 'top 80%', end: 'top 35%', scrub: 0.8,
      onUpdate: (s) => dots.forEach((d, i) => d.classList.toggle('on', s.progress > [0.02, 0.5, 0.97][i])),
    },
  })
  gsap.set('[data-step]', { transformPerspective: 900 })
  gsap.from('[data-step]', { y: 70, rotateX: 12, opacity: 0, duration: 1.1, stagger: 0.18, ease: 'expo.out', scrollTrigger: { trigger: list, start: 'top 82%' } })
  gsap.from('[data-step] .step-dot svg', { scale: 0, rotate: -40, duration: 0.9, stagger: 0.18, delay: 0.3, ease: 'back.out(2)', scrollTrigger: { trigger: list, start: 'top 82%' } })
}

/* ── Why Wingo: account cards tilt, markets panel unclips, features slide in ── */

function whyWingo(root: HTMLElement, signal: AbortSignal) {
  const cards = $$('[data-acc-card]', root)
  if (cards.length) {
    gsap.timeline({ scrollTrigger: { trigger: cards[0].parentElement, start: 'top 82%' } })
      .from(cards, { y: 80, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'expo.out' })
      .from($$('[data-acc-icon]', root), { scale: 0, rotate: -90, duration: 0.8, stagger: 0.12, ease: 'back.out(2)' }, 0.2)
      .from('[data-acc-badge]', { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2.5)' }, 0.6)
    tilt(cards, signal)
    for (const c of cards) {
      const ic = $('[data-acc-icon]', c)
      if (ic) loop(gsap.to(ic, { y: -5, duration: 2.2 + Math.random(), ease: 'sine.inOut', yoyo: true, repeat: -1 }), c)
    }
  }

  const markets = $('[data-markets]', root)
  if (markets) {
    gsap.from(markets, { clipPath: 'inset(12% 8% 12% 8% round 32px)', opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: markets, start: 'top 82%' } })
    const mt5 = $('[data-mt5]', markets)
    if (mt5) {
      gsap.set(mt5, { transformPerspective: 1200 })
      gsap.from(mt5, { rotateY: -40, rotateX: 18, y: 100, opacity: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: markets, start: 'top 75%' } })
      if (fine()) {
        const rx = gsap.quickTo(mt5, 'rotationX', { duration: 0.8, ease: 'power3' })
        const ry = gsap.quickTo(mt5, 'rotationY', { duration: 0.8, ease: 'power3' })
        markets.addEventListener('pointermove', (e) => {
          const r = markets.getBoundingClientRect()
          ry(((e.clientX - r.left) / r.width - 0.5) * 18)
          rx((0.5 - (e.clientY - r.top) / r.height) * 12)
        }, { signal })
        markets.addEventListener('pointerleave', () => { rx(0); ry(0) }, { signal })
      }
    }
  }

  const feats = $$('[data-feature]', root)
  if (feats.length) {
    gsap.from(feats, { x: -40, opacity: 0, duration: 0.8, stagger: 0.12, scrollTrigger: { trigger: feats[0], start: 'top 88%' } })
    gsap.from($$('[data-feature] [data-icon]', root), { scale: 0, rotate: -45, duration: 0.7, stagger: 0.12, delay: 0.2, ease: 'back.out(2)', scrollTrigger: { trigger: feats[0], start: 'top 88%' } })
  }
  const pays = $$('[data-pay] img', root)
  if (pays.length) gsap.from(pays, { y: 16, scale: 0.4, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(2.5)', scrollTrigger: { trigger: pays[0], start: 'top 95%' } })
}

function faq(root: HTMLElement) {
  const items = $$('[data-faq-item]', root)
  if (items.length) gsap.from(items, { y: 30, opacity: 0, duration: 0.8, stagger: 0.08, scrollTrigger: { trigger: items[0], start: 'top 90%' } })
}

function footer(root: HTMLElement) {
  const earth = $('[data-ft-earth]', root)
  if (earth) {
    gsap.fromTo(earth, { yPercent: 30, scale: 0.8, opacity: 0.1 }, { yPercent: 0, scale: 1, opacity: 0.35, ease: 'none', scrollTrigger: { trigger: '[data-site-footer]', start: 'top bottom', end: 'top 20%', scrub: 1 } })
    loop(gsap.to(earth, { rotate: 8, duration: 12, ease: 'sine.inOut', yoyo: true, repeat: -1 }), earth)
  }
  gsap.from('[data-ft-col]', { y: 40, opacity: 0, duration: 0.9, stagger: 0.12, scrollTrigger: { trigger: '[data-site-footer]', start: 'top 88%' } })
}
