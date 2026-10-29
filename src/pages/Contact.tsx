import { useLang } from '../i18n'
import { EMAIL, MAP, MAP_LINK, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '../config'
import { SectionHeading } from '../components/SectionHeading'
import { Booking } from '../components/Booking'
import { Faq } from '../components/Faq'
import { SmileLine } from '../components/SmileLine'
import { Img } from '../components/Img'
import { Clock, Mail, Phone, Pin, WhatsAppIcon } from '../components/icons'

export default function Contact() {
  const { t } = useLang()
  const c = t.contactPage
  const d = 0.006
  const bbox = [MAP.lon - d * 1.6, MAP.lat - d, MAP.lon + d * 1.6, MAP.lat + d].join('%2C')

  return (
    <>
      <section className="section pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14">
          <div>
            <SectionHeading as="h1" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
            <div className="reveal mt-10 hidden overflow-hidden rounded-[28px] bg-sand lg:block">
              <Img name="clinic-1" alt={t.teamPage.clinicAlt[0]} sizes="420px" className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
          <section id="booking" aria-label={t.booking.title} className="min-w-0 scroll-mt-28">
            <Booking />
          </section>
        </div>
      </section>

      <SmileLine />

      <section aria-labelledby="visit" className="section py-16 lg:py-24">
        <h2 id="visit" className="reveal h-section">
          {c.visit}
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal card space-y-7 p-7 sm:p-9">
            <div className="flex gap-4">
              <Pin className="mt-0.5 h-6 w-6 shrink-0 text-oak-deep" />
              <div>
                <p className="font-semibold">{c.address}</p>
                <p className="text-sm text-pine-soft">{c.addressNote}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-0.5 h-6 w-6 shrink-0 text-oak-deep" />
              <div className="flex-1">
                <h3 className="font-sans text-base font-semibold">{c.hours}</h3>
                <dl className="mt-2 space-y-1 text-[0.95rem]">
                  {c.hoursRows.map((r) => (
                    <div key={r.d} className="flex justify-between gap-4">
                      <dt className="text-pine-soft">{r.d}</dt>
                      <dd className="font-medium tabular-nums">{r.h}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-0.5 h-6 w-6 shrink-0 text-oak-deep" />
              <div>
                <p className="text-sm text-pine-soft">{c.phone}</p>
                <a href={`tel:${PHONE_TEL}`} className="link-underline font-semibold">
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="mt-0.5 h-6 w-6 shrink-0 text-oak-deep" />
              <div>
                <p className="text-sm text-pine-soft">{c.email}</p>
                <a href={`mailto:${EMAIL}`} className="link-underline font-semibold break-all">
                  {EMAIL}
                </a>
              </div>
            </div>
            <a href={whatsappLink(t.common.whatsappHello)} target="_blank" rel="noopener" className="btn btn-pine w-full">
              <WhatsAppIcon className="h-5 w-5" />
              {t.common.whatsapp}
            </a>
          </div>
          <div className="reveal flex flex-col overflow-hidden rounded-[28px] bg-sand ring-1 ring-pine/10" style={{ '--d': 1 } as React.CSSProperties}>
            <iframe
              title={c.mapTitle}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${MAP.lat}%2C${MAP.lon}`}
              loading="lazy"
              className="min-h-[22rem] w-full flex-1 border-0 [filter:sepia(0.18)_saturate(0.85)]"
            />
            <a href={MAP_LINK} target="_blank" rel="noopener" className="bg-porcelain px-5 py-3.5 text-sm font-semibold hover:bg-clay-light">
              {c.openMap} ↗
            </a>
          </div>
        </div>
      </section>

      <Faq />
    </>
  )
}
