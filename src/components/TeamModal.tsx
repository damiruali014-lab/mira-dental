import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { TEAM } from '../data/team'
import { useLang } from '../i18n'
import { Img } from './Img'
import { Check, Close } from './icons'

type Member = (typeof TEAM)[number]

/** Bio card in a native modal <dialog>: focus is trapped, Esc closes, focus returns to the opener. */
export function TeamModal({ member, onClose }: { member: Member | null; onClose: () => void }) {
  const { t } = useLang()
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (member && !d.open) d.showModal()
    if (!member && d.open) d.close()
  }, [member])

  const copy = member ? t.team[member.id] : null

  return (
    <dialog
      ref={ref}
      aria-labelledby="team-modal-name"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close()
      }}
      className="m-auto max-h-[92dvh] w-[min(56rem,calc(100%-2rem))] overflow-hidden rounded-[32px] bg-porcelain p-0 text-pine shadow-2xl open:anim-in"
    >
      {member && copy && (
        <div className="grid max-h-[92dvh] overflow-y-auto md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[4/3] bg-sand md:aspect-auto">
            <Img name={member.image} alt={copy.alt} sizes="(min-width: 768px) 400px, 92vw" className="h-full w-full object-cover object-top" />
          </div>
          <div className="relative p-7 sm:p-10">
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label={t.common.close}
              className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-clay-light ring-1 ring-pine/15 transition-colors hover:bg-sand"
            >
              <Close />
            </button>
            <p className="eyebrow pr-12">{copy.role}</p>
            <h2 id="team-modal-name" className="mt-3 pr-10 text-[2.4rem]">
              {copy.name}
            </h2>
            <p className="mt-2 text-sm font-semibold text-oak-deep">{t.common.yearsExperience(member.years)}</p>
            <p className="mt-5 text-pine-soft">{copy.bio}</p>
            <h3 className="mt-7 font-sans text-xs font-semibold tracking-[0.2em] uppercase">{t.teamModal.focus}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {copy.focus.map((f) => (
                <li key={f} className="inline-flex items-center gap-1.5 rounded-full bg-sage-light/70 px-3 py-1.5 text-sm">
                  <Check className="h-3.5 w-3.5" />
                  {f}
                </li>
              ))}
            </ul>
            <h3 className="mt-6 font-sans text-xs font-semibold tracking-[0.2em] uppercase">{t.teamModal.education}</h3>
            <p className="mt-2 text-sm text-pine-soft">{copy.education}</p>
            <Link to="/contact#booking" className="btn btn-coral mt-8" onClick={() => ref.current?.close()}>
              {t.teamModal.book(copy.name)}
            </Link>
          </div>
        </div>
      )}
    </dialog>
  )
}

export function TeamCard({
  member,
  onOpen,
  index = 0,
  compact = false,
  headingLevel = 'h3',
  priority = false,
}: {
  member: Member
  onOpen?: (m: Member) => void
  index?: number
  compact?: boolean
  headingLevel?: 'h2' | 'h3'
  /** above the fold: load eagerly and skip the scroll reveal so it can paint immediately */
  priority?: boolean
}) {
  const H = headingLevel
  const { t } = useLang()
  const copy = t.team[member.id]
  return (
    <li className={`group ${priority ? '' : 'reveal'}`} style={{ '--d': index } as React.CSSProperties}>
      <div className="relative">
        <span className="arch absolute inset-0 translate-x-2.5 translate-y-2.5 bg-sage/70 transition-transform duration-700 ease-(--ease-soft) group-hover:translate-x-3.5 group-hover:translate-y-1.5 sm:translate-x-3 sm:translate-y-3" aria-hidden="true" />
        <div className="arch relative aspect-[4/5] overflow-hidden bg-sand">
          <Img
            name={member.image}
            alt={copy.alt}
            sizes="(min-width: 1024px) 290px, (min-width: 640px) 45vw, 92vw"
            priority={priority && index === 0}
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-(--ease-soft) group-hover:scale-[1.04]"
          />
        </div>
      </div>
      <div className="mt-5">
        <H className="text-[1.6rem]">{copy.name}</H>
        <p className="mt-1 text-pine-soft">{copy.role}</p>
        {!compact && <p className="mt-1 text-sm font-semibold text-oak-deep">{t.common.yearsExperience(member.years)}</p>}
        {onOpen && (
          <button
            type="button"
            onClick={() => onOpen(member)}
            aria-haspopup="dialog"
            className="link-underline mt-3 inline-flex min-h-11 items-center text-[0.95rem] font-semibold"
          >
            {t.common.readMore}
            <span className="sr-only">: {copy.name}</span>
          </button>
        )}
      </div>
    </li>
  )
}
