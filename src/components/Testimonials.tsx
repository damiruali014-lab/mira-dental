import { useId } from 'react'
import { useLang } from '../i18n'
import { SectionHeading } from './SectionHeading'
import { Star } from './icons'

export function Testimonials({ limit = 3, className = '' }: { limit?: number; className?: string }) {
  const { t } = useLang()
  const uid = useId()
  const items = t.testimonials.items.slice(0, limit)
  return (
    <section aria-labelledby={`${uid}-h`} className={`section py-20 lg:py-28 ${className}`}>
      <SectionHeading id={`${uid}-h`} eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />
      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={i} className="reveal card flex flex-col p-7 sm:p-8" style={{ '--d': i % 3 } as React.CSSProperties}>
            <figure className="flex h-full flex-col">
              <div className="flex gap-0.5 text-oak" role="img" aria-label={`5 ${t.common.stars}`}>
                {Array.from({ length: 5 }, (_, k) => (
                  <Star key={k} />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-[1.32rem] leading-snug text-pine">“{item.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-pine/10 pt-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-light font-display text-lg text-pine" aria-hidden="true">
                  {item.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-semibold">{item.name}</span>
                  <span className="block text-sm text-pine-soft">{item.detail}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
