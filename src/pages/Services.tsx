import { Link } from 'react-router'
import { useLang } from '../i18n'
import { SERVICES } from '../data/services'
import { SectionHeading } from '../components/SectionHeading'
import { ServiceCard } from '../components/ServiceCard'
import { SmileLine } from '../components/SmileLine'
import { Faq } from '../components/Faq'
import { WithTenge } from '../components/Tenge'
import { ArrowRight } from '../components/icons'

export default function Services() {
  const { t } = useLang()
  return (
    <>
      <section className="section pt-10 pb-16 lg:pt-16 lg:pb-20">
        <SectionHeading as="h1" eyebrow={t.servicesPage.eyebrow} title={t.servicesPage.title} lead={t.servicesPage.lead} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} headingLevel="h2" />
          ))}
        </div>
        <div className="reveal mt-8 flex flex-col gap-5 rounded-[28px] bg-pine p-7 text-clay-light sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div>
            <h2 className="font-display text-[1.9rem]">{t.servicesPage.insuranceTitle}</h2>
            <p className="mt-2 max-w-xl text-clay-light/80">
              <WithTenge text={t.servicesPage.insuranceText} />
            </p>
          </div>
          <Link to="/contact#booking" className="btn btn-coral shrink-0">
            {t.nav.book}
            <ArrowRight />
          </Link>
        </div>
      </section>
      <SmileLine />
      <Faq />
    </>
  )
}
