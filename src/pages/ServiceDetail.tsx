import { Link, useParams } from 'react-router'
import { useLang } from '../i18n'
import { SERVICES, isServiceSlug } from '../data/services'
import { ServiceVisual } from '../components/ServiceCard'
import { Blob } from '../components/Blob'
import { Price } from '../components/Tenge'
import { SmileLine } from '../components/SmileLine'
import { ArrowLeft, ArrowRight, Check, Clock, ServiceIcon, WhatsAppIcon } from '../components/icons'
import { whatsappLink } from '../config'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams()
  const { t } = useLang()
  if (!isServiceSlug(slug)) return <NotFound />
  const meta = SERVICES.find((s) => s.slug === slug)!
  const c = t.services[slug]
  const d = t.serviceDetail
  const others = SERVICES.filter((s) => s.slug !== slug)

  return (
    <>
      <section className="section pt-8 pb-16 lg:pt-12 lg:pb-24">
        <Link to="/services" className="link-underline inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
          <ArrowLeft />
          {d.back}
        </Link>
        <div className="mt-6 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="reveal">
            <p className="eyebrow">{t.nav.services}</p>
            <h1 className="mt-4 text-[clamp(2.8rem,6.6vw,5rem)]">{c.name}</h1>
            <p className="lead mt-6 max-w-xl">{c.long}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`/contact?service=${slug}#booking`} className="btn btn-coral">
                {d.book}
                <ArrowRight />
              </Link>
              <a href={whatsappLink(`${t.common.whatsappHello} (${c.name})`)} target="_blank" rel="noopener" className="btn btn-ghost">
                <WhatsAppIcon className="h-5 w-5" />
                {d.ask}
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:mr-0">
            <Blob className="-top-6 -left-8 h-[90%] w-[95%]" variant={1} />
            <div className="arch relative aspect-[4/5] overflow-hidden bg-sand">
              <ServiceVisual service={meta} sizes="(min-width: 1024px) 440px, 92vw" priority className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="expect" className="bg-clay-light py-20 lg:py-24">
        <div className="section grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <div>
            <h2 id="expect" className="reveal h-section">
              {d.whatToExpect}
            </h2>
            <ol className="mt-10 space-y-0">
              {c.steps.map((step, i) => (
                <li key={i} className="reveal grid grid-cols-[3.5rem_1fr] items-baseline gap-2 border-t border-pine/12 py-5" style={{ '--d': i } as React.CSSProperties}>
                  <span className="font-display text-2xl text-oak-deep italic">0{i + 1}</span>
                  <span className="text-lg">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <aside aria-labelledby="glance" className="reveal card h-fit p-7 sm:p-8 lg:sticky lg:top-28">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-sage-light text-pine">
              <ServiceIcon name={meta.icon} className="h-7 w-7" />
            </span>
            <h2 id="glance" className="mt-5 font-sans text-xs font-semibold tracking-[0.2em] uppercase">
              {d.summary}
            </h2>
            <dl className="mt-4 divide-y divide-pine/10">
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-pine-soft">{d.duration}</dt>
                <dd className="inline-flex items-center gap-1.5 font-semibold">
                  <Clock />
                  {c.duration}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-pine-soft">{d.price}</dt>
                <dd className="text-right font-semibold">
                  <Price amount={meta.price} className="text-xl" />
                  <span className="block text-xs font-normal text-pine-soft">{c.priceNote}</span>
                </dd>
              </div>
            </dl>
            <h3 className="mt-6 font-sans text-xs font-semibold tracking-[0.2em] uppercase">{d.included}</h3>
            <ul className="mt-3 space-y-2">
              {c.includes.map((x) => (
                <li key={x} className="flex items-start gap-2.5">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sage-light">
                    <Check className="h-3 w-3" />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <Link to={`/contact?service=${slug}#booking`} className="btn btn-coral mt-7 w-full">
              {d.book}
            </Link>
            <p className="mt-4 text-xs text-pine-soft">{d.note}</p>
          </aside>
        </div>
      </section>

      <SmileLine className="mt-10" />

      <section aria-labelledby="others" className="section py-16 lg:py-20">
        <h2 id="others" className="reveal text-[2rem]">
          {d.other}
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {others.map((s, i) => (
            <li key={s.slug} className="reveal" style={{ '--d': i } as React.CSSProperties}>
              <Link to={`/services/${s.slug}`} className="group flex h-full items-center gap-3 rounded-2xl bg-porcelain p-4 ring-1 ring-pine/10 transition-shadow hover:ring-pine/30">
                <ServiceIcon name={s.icon} className="h-8 w-8 shrink-0 text-oak" />
                <span className="flex-1 font-semibold">{t.services[s.slug].name}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
