import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router'
import { SERVICES, isServiceSlug, type ServiceSlug } from '../data/services'
import { useLang } from '../i18n'
import { buildIcs, downloadIcs } from '../lib/ics'
import { formatDay, isClosed, nextDays, slotsFor, type Day } from '../lib/schedule'
import { digitCount, isEmail } from '../lib/validate'
import { PHONE_DISPLAY } from '../config'
import { Price } from './Tenge'
import { Alert, ArrowLeft, ArrowRight, CalendarIcon, Check, ChevronLeft, ChevronRight, Clock, ServiceIcon } from './icons'

type Step = 1 | 2 | 3 | 4
type Details = { name: string; phone: string; email: string; note: string; consent: boolean }
type FieldError = Partial<Record<'name' | 'phone' | 'email' | 'consent', string>>

const EMPTY: Details = { name: '', phone: '', email: '', note: '', consent: false }
const DAYS_SHOWN = 21

export function Booking() {
  const { t, lang } = useLang()
  const b = t.booking
  const uid = useId()
  const [params] = useSearchParams()

  const [step, setStep] = useState<Step>(1)
  const [service, setService] = useState<ServiceSlug | null>(null)
  const [dayKey, setDayKey] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [details, setDetails] = useState<Details>(EMPTY)
  const [stepError, setStepError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldError>({})
  const [ref, setRef] = useState('')

  const headingRef = useRef<HTMLHeadingElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const dayScroller = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  // Preselect a service passed as ?service=slug (after hydration, so prerendered HTML matches).
  useEffect(() => {
    const s = params.get('service')
    if (isServiceSlug(s)) setService(s)
  }, [params])

  // Move focus to the new step's heading so keyboard and screen-reader users land in the right place.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus({ preventScroll: true })
    const top = headingRef.current?.closest('section')?.getBoundingClientRect().top ?? 0
    if (top < 0) headingRef.current?.closest('section')?.scrollIntoView({ block: 'start' })
  }, [step])

  const days = useMemo(() => (step >= 2 ? nextDays(DAYS_SHOWN) : []), [step])
  const meta = SERVICES.find((s) => s.slug === service)
  const day = days.find((d) => d.key === dayKey) ?? null
  const slots = useMemo(() => (day && meta ? slotsFor(day, meta.minutes) : []), [day, meta])

  function go(next: Step) {
    setStepError(null)
    setStep(next)
  }

  function next1() {
    if (!service) return setStepError(b.s1.error)
    go(2)
  }

  function next2() {
    if (!dayKey) return setStepError(b.s2.errorDate)
    if (!time) return setStepError(b.s2.errorTime)
    go(3)
  }

  function submit(e: FormEvent) {
    e.preventDefault()
    const errs: FieldError = {}
    if (!details.name.trim()) errs.name = b.s3.errors.name
    if (digitCount(details.phone) < 10) errs.phone = b.s3.errors.phone
    if (details.email.trim() && !isEmail(details.email)) errs.email = b.s3.errors.email
    if (!details.consent) errs.consent = b.s3.errors.consent
    setFieldErrors(errs)
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setRef(`MD-${Math.random().toString(36).slice(2, 6).toUpperCase()}`)
    go(4)
  }

  function reset() {
    setService(null)
    setDayKey(null)
    setTime(null)
    setDetails(EMPTY)
    setFieldErrors({})
    go(1)
  }

  function addToCalendar() {
    if (!day || !time || !meta || !service) return
    const ics = buildIcs({
      day,
      time,
      minutes: meta.minutes,
      title: b.s4.icsTitle(t.services[service].name),
      description: `${b.s4.ref}: ${ref}\n${b.s4.icsDescription}\n${PHONE_DISPLAY}`,
      location: `Mira Dental Studio, ${t.contactPage.address}`,
      uid: `${ref}-${day.key}`,
    })
    downloadIcs(ics, `mira-dental-${day.key}.ics`)
  }

  const set = <K extends keyof Details>(k: K, v: Details[K]) => {
    setDetails((d) => ({ ...d, [k]: v }))
    if (fieldErrors[k as keyof FieldError]) setFieldErrors((f) => ({ ...f, [k]: undefined }))
  }

  const scrollDays = (dir: 1 | -1) => dayScroller.current?.scrollBy({ left: dir * dayScroller.current.clientWidth * 0.8, behavior: 'smooth' })

  const morning = slots.filter((s) => s < '13:00')
  const afternoon = slots.filter((s) => s >= '13:00')

  const fe = fieldErrors
  const errorList = (Object.entries(fe) as [keyof FieldError, string | undefined][]).filter(([, v]) => v)

  return (
    <div className="card overflow-hidden">
      {/* Progress */}
      <div className="border-b border-pine/10 bg-clay-light/60 px-5 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-xl">{b.title}</h2>
          <p className="text-sm text-pine-soft" aria-live="polite">
            {b.stepOf(step, 4)}
          </p>
        </div>
        <ol className="mt-4 grid grid-cols-4 gap-2" aria-label={b.title}>
          {b.steps.map((label, i) => {
            const n = (i + 1) as Step
            const state = n < step ? 'done' : n === step ? 'current' : 'todo'
            return (
              <li key={label} aria-current={state === 'current' ? 'step' : undefined} className="min-w-0">
                <span className={`block h-1 rounded-full transition-colors duration-500 ${state === 'todo' ? 'bg-pine/12' : state === 'current' ? 'bg-coral' : 'bg-pine'}`} />
                <span className={`mt-2 flex items-center gap-1 truncate text-xs font-medium sm:text-[0.8rem] ${state === 'todo' ? 'text-pine-soft' : 'text-pine'}`}>
                  {state === 'done' && <Check className="h-3.5 w-3.5 shrink-0" />}
                  <span className="truncate">{label}</span>
                </span>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="p-5 sm:p-8">
        {/* Step 1 — service */}
        {step === 1 && (
          <fieldset key="s1" className="anim-in" aria-describedby={stepError ? `${uid}-e1` : undefined}>
            <legend className="contents">
              <h3 ref={headingRef} tabIndex={-1} className="text-[1.9rem] focus:outline-none">
                {b.s1.title}
              </h3>
            </legend>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {SERVICES.map((s) => {
                const c = t.services[s.slug]
                const checked = service === s.slug
                return (
                  <label
                    key={s.slug}
                    className={`relative flex cursor-pointer items-start gap-4 rounded-2xl p-4 ring-1 transition-[background-color,box-shadow] has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-coral-deep ${
                      checked ? 'bg-sage-light/50 ring-2 ring-pine' : 'bg-porcelain ring-pine/15 hover:ring-pine/35'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`${uid}-service`}
                      value={s.slug}
                      checked={checked}
                      onChange={() => {
                        setService(s.slug)
                        setTime(null)
                        setStepError(null)
                      }}
                      className="sr-only"
                    />
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${checked ? 'bg-pine text-clay-light' : 'bg-clay-light text-pine'}`}>
                      <ServiceIcon name={s.icon} className="h-6 w-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{c.name}</span>
                      <span className="mt-0.5 flex flex-wrap items-center gap-x-3 text-sm text-pine-soft">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {c.duration}
                        </span>
                        <Price amount={s.price} className="text-pine" />
                      </span>
                    </span>
                    {checked && (
                      <span className="absolute top-3 right-3 grid h-6 w-6 place-items-center rounded-full bg-pine text-clay-light" aria-hidden="true">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </label>
                )
              })}
            </div>
            {stepError && (
              <p id={`${uid}-e1`} role="alert" className="error-text">
                <Alert />
                {stepError}
              </p>
            )}
            <div className="mt-8 flex justify-end">
              <button type="button" className="btn btn-pine" onClick={next1}>
                {b.next}
                <ArrowRight />
              </button>
            </div>
          </fieldset>
        )}

        {/* Step 2 — date & time */}
        {step === 2 && meta && (
          <div key="s2" className="anim-in">
            <h3 ref={headingRef} tabIndex={-1} className="text-[1.9rem] focus:outline-none">
              {b.s2.title}
            </h3>
            <p className="mt-2 text-sm text-pine-soft">
              {t.services[meta.slug].name} · {t.services[meta.slug].duration}
            </p>

            <fieldset className="mt-6">
              <legend className="flex w-full items-center justify-between">
                <span className="label">{b.s2.date}</span>
              </legend>
              <div className="relative mt-3">
                <div className="absolute -top-12 right-0 hidden gap-2 sm:flex">
                  <button type="button" onClick={() => scrollDays(-1)} aria-label={b.s2.prevDays} className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-pine/20 hover:bg-clay-light">
                    <ChevronLeft />
                  </button>
                  <button type="button" onClick={() => scrollDays(1)} aria-label={b.s2.nextDays} className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-pine/20 hover:bg-clay-light">
                    <ChevronRight />
                  </button>
                </div>
                <div ref={dayScroller} className="-mx-5 flex snap-x gap-2 overflow-x-auto scroll-smooth px-5 pt-1 pb-3 sm:-mx-1 sm:px-1 [scrollbar-width:thin]">
                  {days.map((d) => (
                    <DayChip
                      key={d.key}
                      day={d}
                      name={`${uid}-day`}
                      checked={d.key === dayKey}
                      count={slotsFor(d, meta.minutes).length}
                      onPick={() => {
                        setDayKey(d.key)
                        setTime(null)
                        setStepError(null)
                      }}
                    />
                  ))}
                </div>
              </div>
            </fieldset>

            <fieldset className="mt-6" aria-describedby={stepError ? `${uid}-e2` : undefined}>
              <legend className="label">{b.s2.time}</legend>
              {!day ? (
                <p className="mt-3 rounded-2xl bg-clay-light px-4 py-4 text-sm text-pine-soft">{b.s2.pickDay}</p>
              ) : slots.length === 0 ? (
                <p className="mt-3 rounded-2xl bg-clay-light px-4 py-4 text-sm text-pine-soft">{b.s2.none}</p>
              ) : (
                <div className="mt-3 space-y-5">
                  {[
                    { label: b.s2.morning, list: morning },
                    { label: b.s2.afternoon, list: afternoon },
                  ]
                    .filter((g) => g.list.length)
                    .map((g) => (
                      <div key={g.label} role="group" aria-label={g.label}>
                        <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-pine-soft uppercase" aria-hidden="true">
                          {g.label}
                        </p>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                          {g.list.map((s) => (
                            <label
                              key={s}
                              className={`relative grid min-h-12 cursor-pointer place-items-center rounded-xl text-[0.95rem] font-semibold tabular-nums ring-1 transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-coral-deep ${
                                time === s ? 'bg-pine text-clay-light ring-pine' : 'bg-porcelain ring-pine/15 hover:ring-pine/40'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`${uid}-time`}
                                value={s}
                                checked={time === s}
                                onChange={() => {
                                  setTime(s)
                                  setStepError(null)
                                }}
                                className="sr-only"
                              />
                              {s}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </fieldset>

            {stepError && (
              <p id={`${uid}-e2`} role="alert" className="error-text">
                <Alert />
                {stepError}
              </p>
            )}

            <div className="mt-8 flex items-center justify-between gap-3">
              <button type="button" className="btn btn-ghost" onClick={() => go(1)}>
                <ArrowLeft />
                {b.back}
              </button>
              <button type="button" className="btn btn-pine" onClick={next2}>
                {b.next}
                <ArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — details */}
        {step === 3 && (
          <form key="s3" noValidate onSubmit={submit} className="anim-in">
            <h3 ref={headingRef} tabIndex={-1} className="text-[1.9rem] focus:outline-none">
              {b.s3.title}
            </h3>
            {day && time && meta && (
              <p className="mt-2 text-sm text-pine-soft">
                {t.services[meta.slug].name} · {formatDay(day, lang, { weekday: 'long', day: 'numeric', month: 'long' })}, {time}
              </p>
            )}

            {errorList.length > 0 && (
              <div ref={summaryRef} tabIndex={-1} role="alert" aria-labelledby={`${uid}-errh`} className="mt-6 rounded-2xl bg-error/8 p-4 ring-1 ring-error/30 focus:outline-none">
                <p id={`${uid}-errh`} className="flex items-center gap-2 font-semibold text-error">
                  <Alert />
                  {b.s3.errors.title}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-error">
                  {errorList.map(([k, msg]) => (
                    <li key={k}>
                      <a href={`#${uid}-${k}`} className="underline underline-offset-2">
                        {msg}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field id={`${uid}-name`} label={b.s3.name} error={fe.name} className="sm:col-span-2">
                <input
                  id={`${uid}-name`}
                  className="field"
                  autoComplete="name"
                  value={details.name}
                  onChange={(e) => set('name', e.target.value)}
                  aria-invalid={!!fe.name}
                  aria-describedby={fe.name ? `${uid}-name-err` : undefined}
                  required
                />
              </Field>
              <Field id={`${uid}-phone`} label={b.s3.phone} error={fe.phone} hint={b.s3.phoneHint}>
                <input
                  id={`${uid}-phone`}
                  className="field"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+7 700 123 45 67"
                  value={details.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  aria-invalid={!!fe.phone}
                  aria-describedby={`${uid}-phone-${fe.phone ? 'err' : 'hint'}`}
                  required
                />
              </Field>
              <Field id={`${uid}-email`} label={b.s3.email} optional={b.s3.optional} error={fe.email}>
                <input
                  id={`${uid}-email`}
                  className="field"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={details.email}
                  onChange={(e) => set('email', e.target.value)}
                  aria-invalid={!!fe.email}
                  aria-describedby={fe.email ? `${uid}-email-err` : undefined}
                />
              </Field>
              <Field id={`${uid}-note`} label={b.s3.note} optional={b.s3.optional} className="sm:col-span-2">
                <textarea id={`${uid}-note`} className="field min-h-28 resize-y" placeholder={b.s3.notePlaceholder} value={details.note} onChange={(e) => set('note', e.target.value)} />
              </Field>
              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    id={`${uid}-consent`}
                    type="checkbox"
                    checked={details.consent}
                    onChange={(e) => set('consent', e.target.checked)}
                    aria-invalid={!!fe.consent}
                    aria-describedby={fe.consent ? `${uid}-consent-err` : undefined}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-pine"
                  />
                  <span className="text-[0.95rem]">{b.s3.consent}</span>
                </label>
                {fe.consent && (
                  <p id={`${uid}-consent-err`} className="error-text">
                    <Alert />
                    {fe.consent}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-3">
              <button type="button" className="btn btn-ghost" onClick={() => go(2)}>
                <ArrowLeft />
                {b.back}
              </button>
              <button type="submit" className="btn btn-coral">
                {b.s3.submit}
              </button>
            </div>
          </form>
        )}

        {/* Step 4 — confirmation */}
        {step === 4 && day && time && meta && (
          <div key="s4" className="anim-in">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-sage text-pine-ink">
              <Check className="h-7 w-7" />
            </span>
            <h3 ref={headingRef} tabIndex={-1} className="mt-5 text-[2.3rem] focus:outline-none">
              {b.s4.title}
            </h3>
            <p className="mt-2 text-pine-soft">{b.s4.lead(details.name.trim().split(/\s+/)[0])}</p>

            <dl className="mt-6 divide-y divide-pine/10 rounded-2xl bg-clay-light/70 px-5 ring-1 ring-pine/10">
              {[
                [b.s4.ref, <span className="font-mono tracking-wider">{ref}</span>],
                [b.s4.service, t.services[meta.slug].name],
                [b.s4.when, `${formatDay(day, lang, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}, ${time}`],
                [b.s4.duration, `${meta.minutes} ${t.common.minutes}`],
                [b.s4.where, t.contactPage.address],
                [b.s4.contact, [details.phone, details.email].filter(Boolean).join(' · ')],
              ].map(([k, v], i) => (
                <div key={i} className="grid gap-1 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="text-sm text-pine-soft">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button type="button" className="btn btn-coral" onClick={addToCalendar}>
                <CalendarIcon />
                {b.s4.ics}
              </button>
              <button type="button" className="btn btn-ghost" onClick={reset}>
                {b.s4.another}
              </button>
            </div>
            <p className="mt-5 text-sm text-pine-soft">{b.s4.demo}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function DayChip({ day, name, checked, count, onPick }: { day: Day; name: string; checked: boolean; count: number; onPick: () => void }) {
  const { t, lang } = useLang()
  const closed = isClosed(day)
  const full = !closed && count === 0
  const disabled = closed || full
  return (
    <label
      className={`relative flex w-[4.6rem] shrink-0 snap-start flex-col items-center rounded-2xl px-2 py-3 text-center ring-1 transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-coral-deep ${
        disabled ? 'cursor-not-allowed bg-clay-light/60 text-pine-soft/70 ring-pine/8' : checked ? 'cursor-pointer bg-pine text-clay-light ring-pine' : 'cursor-pointer bg-porcelain ring-pine/15 hover:ring-pine/40'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={day.key}
        checked={checked}
        disabled={disabled}
        onChange={onPick}
        aria-label={`${formatDay(day, lang, { weekday: 'long', day: 'numeric', month: 'long' })} — ${closed ? t.booking.s2.closed : t.booking.s2.slotsLeft(count)}`}
        className="sr-only"
      />
      <span className="text-[0.7rem] font-semibold tracking-wider uppercase">{formatDay(day, lang, { weekday: 'short' })}</span>
      <span className="mt-0.5 font-display text-2xl leading-tight">{day.d}</span>
      <span className="text-[0.7rem]">{formatDay(day, lang, { month: 'short' })}</span>
      <span className={`mt-1.5 text-[0.7rem] font-medium ${checked ? 'text-sage-light' : disabled ? '' : 'text-oak-deep'}`}>
        {closed ? t.booking.s2.closed : full ? '—' : t.booking.s2.slotsLeft(count)}
      </span>
    </label>
  )
}

function Field({
  id,
  label,
  optional,
  hint,
  error,
  className = '',
  children,
}: {
  id: string
  label: string
  optional?: string
  hint?: string
  error?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
        {optional && <span className="font-normal text-pine-soft"> ({optional})</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-err`} className="error-text">
          <Alert />
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-sm text-pine-soft">
            {hint}
          </p>
        )
      )}
    </div>
  )
}
