import { useId, useRef, useState, type FormEvent } from 'react'
import { useLang } from '../i18n'
import { isEmail } from '../lib/validate'
import { Alert, Check } from './icons'
import { SmileLine } from './SmileLine'

export function OptIn() {
  const { t } = useLang()
  const uid = useId()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<'empty' | 'invalid' | null>(null)
  const [done, setDone] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function submit(e: FormEvent) {
    e.preventDefault()
    const v = email.trim()
    const err = !v ? 'empty' : !isEmail(v) ? 'invalid' : null
    setError(err)
    if (err) {
      inputRef.current?.focus()
      return
    }
    setDone(v)
  }

  return (
    <section aria-labelledby={`${uid}-h`} className="relative overflow-hidden bg-pine text-clay-light">
      <svg viewBox="0 0 400 400" className="pointer-events-none absolute -top-40 -right-32 h-[30rem] w-[30rem] opacity-[0.12]" aria-hidden="true">
        <circle cx="200" cy="200" r="198" fill="none" stroke="var(--color-sage)" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="140" fill="none" stroke="var(--color-sage)" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="82" fill="none" stroke="var(--color-sage)" strokeWidth="1.2" />
      </svg>
      <div className="section relative grid items-center gap-10 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="reveal">
          <p className="eyebrow text-sage!">{t.optin.eyebrow}</p>
          <h2 id={`${uid}-h`} className="h-section mt-4 text-clay-light">
            {t.optin.title}
          </h2>
          <p className="mt-5 max-w-lg text-lg text-clay-light/80">{t.optin.lead}</p>
        </div>

        <div className="reveal" style={{ '--d': 1 } as React.CSSProperties}>
          {done ? (
            <div role="status" className="anim-in rounded-[28px] bg-clay-light/8 p-7 ring-1 ring-clay-light/15">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-sage text-pine-ink">
                <Check className="h-6 w-6" />
              </span>
              <p className="mt-5 font-display text-3xl">{t.optin.successTitle}</p>
              <p className="mt-2 text-clay-light/80">{t.optin.successText(done)}</p>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="rounded-[28px] bg-clay-light/6 p-6 ring-1 ring-clay-light/15 sm:p-7">
              <label htmlFor={`${uid}-email`} className="text-sm font-semibold">
                {t.optin.label}
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                  ref={inputRef}
                  id={`${uid}-email`}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={t.optin.placeholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError(null)
                  }}
                  aria-invalid={!!error}
                  aria-describedby={error ? `${uid}-err` : `${uid}-note`}
                  className="min-h-12 flex-1 rounded-full border-0 bg-clay-light px-5 text-pine ring-2 ring-transparent placeholder:text-pine-soft/70 focus:ring-coral focus:outline-none aria-invalid:ring-coral"
                />
                <button type="submit" className="btn btn-coral">
                  {t.optin.submit}
                </button>
              </div>
              {error ? (
                <p id={`${uid}-err`} className="mt-3 flex items-start gap-1.5 text-sm font-medium text-[#f4b8a6]">
                  <Alert />
                  {error === 'empty' ? t.optin.errorEmpty : t.optin.errorInvalid}
                </p>
              ) : (
                <p id={`${uid}-note`} className="mt-3 text-sm text-clay-light/65">
                  {t.optin.privacy}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
      <SmileLine tone="sage" className="relative -mt-6 pb-6 opacity-70" />
    </section>
  )
}
