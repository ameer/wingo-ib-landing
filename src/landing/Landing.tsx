import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ACCOUNTS, offer, type AccountKey, type OfferMode } from '../config/ib'
import { getContent } from '../content'
import { setupPage } from '../motion/page'
import { Faqs } from './sections/Faqs'
import { Footer } from './sections/Footer'
import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { Offer } from './sections/Offer'
import { Steps } from './sections/Steps'
import { StickyCta } from './sections/StickyCta'
import { Terms } from './sections/Terms'
import { WhyWingo } from './sections/WhyWingo'

type Props = { mode: OfferMode; account: AccountKey }

export function Landing({ mode, account }: Props) {
  const acc = ACCOUNTS[account]
  const c = getContent(mode, { account: acc.name, minDeposit: offer.minDeposit, deadline: offer.deadline })
  const root = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ac = new AbortController()
    const off = setupPage(root.current!, ac.signal)
    return () => { ac.abort(); off() }
  }, { scope: root })

  return (
    <div ref={root} className={`@container overflow-x-clip bg-page ${acc.className}`}>
      <div aria-hidden className="progress" />
      <div aria-hidden className="torch" />
      <Header />
      <main>
        <Hero cta={c.heroCta} />
        <Offer account={account} title={c.offerTitle} quote={c.offerQuote} facts={c.facts} cta={c.offerCta} />
        <Terms title={c.termsTitle} body={c.termsBody} link={c.termsLink} />
        <Steps title={c.stepsTitle} steps={c.steps} />
        <WhyWingo highlight={account} />
        <Faqs items={c.faqs} />
      </main>
      <Footer />
      <StickyCta />
    </div>
  )
}
