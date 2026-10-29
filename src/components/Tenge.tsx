import { tenge } from '../config'
import { useLang } from '../i18n'

// The ₸ glyph isn't in the Latin subsets of either font, so draw it instead of pulling a whole subset.
export function TengeSign() {
  return (
    <svg viewBox="0 0 10 12" className="ml-[0.2em] inline-block h-[0.74em] w-auto align-baseline" role="img" aria-label="₸">
      <path d="M1 1.2h8M1 4.4h8M5 4.4V12" fill="none" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  )
}

/** Renders text with every "₸" swapped for <TengeSign />. */
export function WithTenge({ text }: { text: string }) {
  const parts = text.split('₸')
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {i < parts.length - 1 ? p.replace(/[\s ]$/, '') : p}
          {i < parts.length - 1 && <TengeSign />}
        </span>
      ))}
    </>
  )
}

/** "from 18 000 ₸" */
export function Price({ amount, className }: { amount: number; className?: string }) {
  const { t } = useLang()
  return (
    <span className={className}>
      <span className="text-[0.8em] font-normal text-pine-soft">{t.common.from}</span>{' '}
      <span className="whitespace-nowrap">
        <WithTenge text={tenge(amount)} />
      </span>
    </span>
  )
}
