import { Link } from 'react-router'
import type { ServiceMeta } from '../data/services'
import { useLang } from '../i18n'
import { Img } from './Img'
import { Price } from './Tenge'
import { ArrowRight, Clock, ServiceIcon } from './icons'

/** Visual for a service: its photo, or an illustrated panel when there is no photo. */
export function ServiceVisual({ service, className = '', sizes, priority }: { service: ServiceMeta; className?: string; sizes: string; priority?: boolean }) {
  const { t } = useLang()
  const copy = t.services[service.slug]
  if (service.image && 'imageAlt' in copy) {
    return <Img name={service.image} alt={copy.imageAlt as string} sizes={sizes} priority={priority} className={`h-full w-full object-cover ${className}`} />
  }
  return (
    <div className={`relative grid h-full w-full place-items-center overflow-hidden bg-sage-light ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <path d="M321 58c50 40 70 120 44 190s-96 110-170 108S52 300 36 230 40 92 100 56s171-38 221 2z" fill="var(--color-sage)" opacity="0.55" />
        <circle cx="300" cy="300" r="70" fill="none" stroke="var(--color-oak)" strokeOpacity="0.5" />
      </svg>
      <ServiceIcon name={service.icon} className="relative h-1/3 w-1/3 text-pine" />
    </div>
  )
}

export function ServiceCard({ service, index = 0, headingLevel = 'h3' }: { service: ServiceMeta; index?: number; headingLevel?: 'h2' | 'h3' }) {
  const { t } = useLang()
  const copy = t.services[service.slug]
  const H = headingLevel
  return (
    <article
      className="reveal group card relative flex flex-col overflow-hidden has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-coral-deep"
      style={{ '--d': index % 3 } as React.CSSProperties}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <ServiceVisual service={service} sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 92vw" className="transition-transform duration-[1.2s] ease-(--ease-soft) group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-3 text-sm text-pine-soft">
          <ServiceIcon name={service.icon} className="h-6 w-6 text-oak" />
          <span className="inline-flex items-center gap-1.5">
            <Clock />
            {copy.duration}
          </span>
        </div>
        <H className="mt-4 text-[1.85rem]">
          <Link to={`/services/${service.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {copy.name}
          </Link>
        </H>
        <p className="mt-3 flex-1 text-pine-soft">{copy.short}</p>
        <div className="mt-6 flex items-center justify-between border-t border-pine/10 pt-5">
          <Price amount={service.price} className="text-lg font-semibold" />
          <span className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-pine/20 transition-colors group-hover:bg-pine group-hover:text-clay-light" aria-hidden="true">
            <ArrowRight />
          </span>
        </div>
      </div>
    </article>
  )
}
