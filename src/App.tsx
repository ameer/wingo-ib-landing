import { useEffect, useState } from 'react'
import { Landing } from './landing/Landing'
import { ACCOUNTS, offer, type AccountKey, type OfferMode } from './config/ib'

type Device = 'desktop' | 'mobile'

// Preview state lives in the URL so a specific variant can be shared.
function readParams() {
  const q = new URLSearchParams(location.search)
  const mode = (q.get('mode') === 'account' ? 'account' : 'bonus') as OfferMode
  const acc = q.get('acc') as AccountKey
  return {
    mode,
    account: acc in ACCOUNTS ? acc : offer.account,
    device: (q.get('device') === 'mobile' ? 'mobile' : 'desktop') as Device,
  }
}

export default function App() {
  const [s, setS] = useState(readParams)
  useEffect(() => {
    const q = new URLSearchParams({ mode: s.mode, acc: s.account, device: s.device })
    history.replaceState(null, '', `?${q}`)
  }, [s])

  const mobile = s.device === 'mobile'

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50 flex flex-wrap items-center gap-x-6 gap-y-3 bg-pine-deep px-4 py-3 text-sm text-paper">
        <span className="font-bold">پیش‌نمایش لندینگ IB</span>
        <Segment
          label="نوع پیشنهاد"
          value={s.mode}
          options={[['bonus', 'بونوس اختصاصی'], ['account', 'حساب مشخص']]}
          onChange={(mode) => setS({ ...s, mode })}
        />
        <Segment
          label="حساب"
          value={s.account}
          options={(Object.keys(ACCOUNTS) as AccountKey[]).map((k) => [k, ACCOUNTS[k].name])}
          onChange={(account) => setS({ ...s, account })}
        />
        <Segment
          label="دستگاه"
          value={s.device}
          options={[['desktop', 'دسکتاپ'], ['mobile', 'موبایل']]}
          onChange={(device) => setS({ ...s, device })}
        />
      </div>

      {mobile ? (
        <div className="flex justify-center py-8">
          <div className="h-[min(844px,calc(100vh-120px))] w-[390px] overflow-y-auto rounded-[36px] border-[10px] border-ink bg-mist shadow-2xl">
            <Landing mode={s.mode} account={s.account} />
          </div>
        </div>
      ) : (
        <Landing mode={s.mode} account={s.account} />
      )}
    </div>
  )
}

function Segment<T extends string>(p: {
  label: string
  value: T
  options: [T, string][]
  onChange: (v: T) => void
}) {
  return (
    <div role="radiogroup" aria-label={p.label} className="flex items-center gap-2">
      <span className="text-paper/60">{p.label}</span>
      <div className="flex rounded-full bg-paper/10 p-0.5">
        {p.options.map(([v, l]) => (
          <button
            key={v}
            role="radio"
            aria-checked={p.value === v}
            onClick={() => p.onChange(v)}
            className={`rounded-full px-3 py-1 transition-colors ${p.value === v ? 'bg-paper font-bold text-ink' : 'text-paper/80 hover:text-paper'}`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  )
}
