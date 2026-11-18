import type { AccountKey } from '../../config/ib'
import { Split, wrap } from '../shared'
import { AccountsTile, MarketsTile, RialTile, SocialTile, SupportTile, WithdrawTile } from './WhyTiles'

export function WhyWingo({ highlight }: { highlight: AccountKey }) {
  return (
    <section id="why" className="relative scroll-mt-20 bg-paper/60 dark:bg-paper/40">
      <div className={`${wrap} py-14 @3xl:py-20`}>
        <div>
          <h2 data-split className="text-4xl font-black leading-tight text-brand @3xl:text-6xl"><Split text="چرا وینگو مارکتس؟" /></h2>
          <span aria-hidden className="mt-4 block h-1.5 w-24 rounded-full bg-brand" />
        </div>

        {/* Six equal tiles: 3 × 2 on desktop, 2 × 3 on tablet, stacked on mobile */}
        <div data-bento className="mt-10 grid auto-rows-fr gap-4 @md:grid-cols-2 @3xl:grid-cols-3">
          <AccountsTile highlight={highlight} />
          <MarketsTile />
          <SocialTile />
          <RialTile />
          <SupportTile />
          <WithdrawTile />
        </div>
      </div>
    </section>
  )
}
