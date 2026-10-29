import { Link } from 'react-router'
import { useLang } from '../i18n'
import { SectionHeading } from '../components/SectionHeading'
import { BeforeAfter } from '../components/BeforeAfter'
import { Testimonials } from '../components/Testimonials'
import { SmileLine } from '../components/SmileLine'
import type { CaseId } from '../components/SmileArt'
import { ArrowRight } from '../components/icons'

const CASES: { id: CaseId; service: string }[] = [
  { id: 'whitening', service: 'whitening' },
  { id: 'aligners', service: 'aligners' },
  { id: 'veneers', service: 'veneers' },
  { id: 'implants', service: 'implants' },
]

export default function Results() {
  const { t } = useLang()
  return (
    <>
      <section className="section pt-10 pb-16 lg:pt-16 lg:pb-24">
        <SectionHeading as="h1" eyebrow={t.resultsPage.eyebrow} title={t.resultsPage.title} lead={t.resultsPage.lead} />
        <ul className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2">
          {CASES.map((c, i) => (
            <li key={c.id} className="reveal" style={{ '--d': i % 2 } as React.CSSProperties}>
              <BeforeAfter caseId={c.id} className="shadow-[0_30px_60px_-36px_rgb(31_59_52/0.5)]" />
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[1.8rem]">{t.resultsPage.cases[c.id].title}</h2>
                  <p className="mt-1 text-pine-soft">{t.resultsPage.cases[c.id].detail}</p>
                </div>
                <Link
                  to={`/services/${c.service}`}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full ring-1 ring-pine/20 transition-colors hover:bg-pine hover:text-clay-light"
                  aria-label={`${t.common.learnMore}: ${t.resultsPage.cases[c.id].title}`}
                >
                  <ArrowRight />
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-sm text-pine-soft">{t.resultsPage.disclaimer}</p>
      </section>
      <SmileLine />
      <Testimonials limit={6} />
    </>
  )
}
