import { Link } from 'react-router'
import { useLang } from '../i18n'
import { SERVICES } from '../data/services'
import { TEAM } from '../data/team'
import { Img } from '../components/Img'
import { Blob } from '../components/Blob'
import { SmileLine } from '../components/SmileLine'
import { SectionHeading } from '../components/SectionHeading'
import { ServiceCard } from '../components/ServiceCard'
import { BeforeAfter } from '../components/BeforeAfter'
import { TeamCard } from '../components/TeamModal'
import { Testimonials } from '../components/Testimonials'
import { Faq } from '../components/Faq'
import { OptIn } from '../components/OptIn'
import { ArrowRight, CalendarIcon, Star } from '../components/icons'

export default function Home() {
  const { t } = useLang()
  const featured = SERVICES.filter((s) => s.image && s.slug !== 'checkup')

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <SmileLine variant="hero" mode="load" className="absolute inset-x-0 bottom-0 hidden h-36 w-full lg:block" />
        <div className="section relative grid items-center gap-12 pt-6 pb-16 sm:pt-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pt-12 lg:pb-24">
          <div className="relative z-10">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1 id="hero-title" className="mt-5 text-[clamp(3rem,8.2vw,6.1rem)] leading-[0.98]">
              {t.hero.titleA}
              <br />
              <em>{t.hero.titleB}</em>
            </h1>
            <p className="lead mt-7 max-w-[34rem]">{t.hero.lead}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact#booking" className="btn btn-coral px-7">
                {t.hero.cta}
                <ArrowRight />
              </Link>
              <Link to="/services" className="btn btn-ghost">
                {t.hero.secondary}
              </Link>
            </div>

            <dl aria-label={t.trust.label} className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-pine/12 pt-7">
              <div>
                <dt className="sr-only">{t.trust.rating}</dt>
                <dd className="flex items-center gap-1.5 font-display text-[2.1rem] leading-none sm:text-[2.5rem]">
                  4.9 <Star className="h-5 w-5 text-coral" />
                </dd>
                <dd className="mt-2 text-sm text-pine-soft">{t.trust.rating}</dd>
              </div>
              <div>
                <dt className="sr-only">{t.trust.years}</dt>
                <dd className="font-display text-[2.1rem] leading-none sm:text-[2.5rem]">12</dd>
                <dd className="mt-2 text-sm text-pine-soft">{t.trust.years}</dd>
              </div>
              <div>
                <dt className="sr-only">{t.trust.patients}</dt>
                <dd className="font-display text-[2.1rem] leading-none sm:text-[2.5rem]">{t.trust.patientsValue}</dd>
                <dd className="mt-2 text-sm text-pine-soft">{t.trust.patients}</dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-[30rem] lg:mr-0">
            <Blob className="-top-6 -right-8 h-[88%] w-[96%] sm:-right-14" variant={0} />
            <Blob className="-bottom-8 -left-10 h-40 w-40 opacity-60" variant={2} color="var(--color-sand)" />
            <div className="arch relative aspect-[4/5] overflow-hidden bg-sand shadow-[0_40px_80px_-40px_rgb(31_59_52/0.55)]">
              <Img name="hero" alt={t.hero.imageAlt} sizes="(min-width: 1024px) 480px, 92vw" priority className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-porcelain/95 py-3 pr-5 pl-3 shadow-[0_20px_40px_-20px_rgb(31_59_52/0.5)] backdrop-blur sm:-left-8">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-light text-pine">
                <CalendarIcon />
              </span>
              <span>
                <span className="block text-xs text-pine-soft">{t.hero.nextSlot}</span>
                <span className="block font-semibold">{t.hero.nextSlotValue}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section aria-labelledby="home-services" className="section py-20 lg:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="home-services" eyebrow={t.homeServices.eyebrow} title={t.homeServices.title} lead={t.homeServices.lead} />
          <Link to="/services" className="btn btn-ghost reveal shrink-0 self-start md:self-auto">
            {t.common.allServices}
            <ArrowRight />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>

      <SmileLine />

      {/* Calm studio banner */}
      <section aria-labelledby="home-calm" className="section py-20 lg:py-28">
        <div className="relative overflow-hidden rounded-[36px] bg-sand">
          <Img
            name="banner-wide"
            alt={t.calm.imageAlt}
            sizes="(min-width: 1240px) 1180px, 100vw"
            className="aspect-[4/3] w-full object-cover object-[78%_50%] sm:aspect-[16/9] lg:absolute lg:inset-0 lg:h-full lg:aspect-auto"
          />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-clay-light/90 via-clay-light/60 via-45% to-transparent to-65% lg:block" aria-hidden="true" />
          <div className="relative p-7 sm:p-10 lg:w-[52%] lg:py-20 lg:pl-14">
            <div className="reveal">
              <p className="eyebrow">{t.calm.eyebrow}</p>
              <h2 id="home-calm" className="h-section mt-4">
                {t.calm.title}
              </h2>
              <p className="lead mt-5 max-w-md">{t.calm.lead}</p>
            </div>
            <ul className="mt-9 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:max-w-md">
              {t.calm.points.map((p, i) => (
                <li key={p.title} className="reveal flex gap-4" style={{ '--d': i + 1 } as React.CSSProperties}>
                  <span className="mt-1 font-display text-lg text-oak-deep italic">0{i + 1}</span>
                  <span>
                    <span className="block font-semibold">{p.title}</span>
                    <span className="mt-1 block text-[0.95rem] text-pine-soft">{p.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Before / after preview */}
      <section aria-labelledby="home-results" className="bg-clay-light py-20 lg:py-28">
        <div className="section grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading id="home-results" eyebrow={t.homeResults.eyebrow} title={t.homeResults.title} lead={t.homeResults.lead} />
            <Link to="/results" className="btn btn-pine reveal mt-8">
              {t.homeResults.cta}
              <ArrowRight />
            </Link>
          </div>
          <div className="reveal relative">
            <Blob className="-top-8 -right-6 h-2/3 w-2/3 opacity-50" variant={1} />
            <BeforeAfter caseId="whitening" className="relative shadow-[0_40px_80px_-40px_rgb(31_59_52/0.5)]" />
            <p className="relative mt-4 text-sm text-pine-soft">
              <span className="font-semibold text-pine">{t.resultsPage.cases.whitening.title}</span> · {t.resultsPage.cases.whitening.detail}
            </p>
          </div>
        </div>
      </section>

      {/* Team teaser */}
      <section aria-labelledby="home-team" className="section py-20 lg:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="home-team" eyebrow={t.homeTeam.eyebrow} title={t.homeTeam.title} />
          <Link to="/team" className="btn btn-ghost reveal shrink-0 self-start md:self-auto">
            {t.homeTeam.cta}
            <ArrowRight />
          </Link>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <TeamCard key={m.id} member={m} index={i} compact />
          ))}
        </ul>
      </section>

      <SmileLine />

      <Testimonials />
      <Faq />
      <OptIn />
    </>
  )
}
