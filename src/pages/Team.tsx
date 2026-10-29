import { useState } from 'react'
import { useLang } from '../i18n'
import { TEAM } from '../data/team'
import { SectionHeading } from '../components/SectionHeading'
import { TeamCard, TeamModal } from '../components/TeamModal'
import { SmileLine } from '../components/SmileLine'
import { Img, type ImageName } from '../components/Img'
import { Testimonials } from '../components/Testimonials'

export default function Team() {
  const { t } = useLang()
  const [open, setOpen] = useState<(typeof TEAM)[number] | null>(null)
  const clinic: ImageName[] = ['clinic-1', 'clinic-2', 'clinic-3']

  return (
    <>
      <section className="section pt-10 pb-16 lg:pt-16 lg:pb-24">
        <SectionHeading as="h1" eyebrow={t.teamPage.eyebrow} title={t.teamPage.title} lead={t.teamPage.lead} />
        <ul className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <TeamCard key={m.id} member={m} index={i} onOpen={setOpen} headingLevel="h2" priority />
          ))}
        </ul>
      </section>
      <TeamModal member={open} onClose={() => setOpen(null)} />

      <SmileLine />

      <section aria-labelledby="inside" className="section py-16 lg:py-24">
        <h2 id="inside" className="reveal h-section">
          {t.teamPage.clinicTitle}
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-[1.4fr_1fr] md:grid-rows-2">
          {clinic.map((name, i) => (
            <div
              key={name}
              className={`reveal overflow-hidden rounded-[28px] bg-sand ${i === 0 ? 'aspect-[4/3] md:row-span-2 md:aspect-auto' : 'aspect-[4/3]'}`}
              style={{ '--d': i } as React.CSSProperties}
            >
              <Img name={name} alt={t.teamPage.clinicAlt[i]} sizes={i === 0 ? '(min-width: 768px) 700px, 92vw' : '(min-width: 768px) 480px, 92vw'} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <Testimonials limit={3} className="pt-4" />
    </>
  )
}
