import { useId, useState } from 'react'
import { useLang } from '../i18n'
import { whatsappLink } from '../config'
import { SectionHeading } from './SectionHeading'
import { WithTenge } from './Tenge'
import { WhatsAppIcon } from './icons'

export function Faq() {
  const { t } = useLang()
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()

  return (
    <section aria-labelledby={`${uid}-h`} className="section grid gap-10 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-28">
      <div>
        <SectionHeading id={`${uid}-h`} eyebrow={t.faq.eyebrow} title={t.faq.title} lead={t.faq.lead} />
        <a href={whatsappLink(t.common.whatsappHello)} target="_blank" rel="noopener" className="btn btn-ghost reveal mt-8">
          <WhatsAppIcon className="h-5 w-5" />
          {t.common.whatsapp}
        </a>
      </div>
      <div className="reveal divide-y divide-pine/12 border-y border-pine/12">
        {t.faq.items.map((item, i) => {
          const isOpen = open === i
          const btnId = `${uid}-b${i}`
          const panelId = `${uid}-p${i}`
          return (
            <div key={i}>
              <h3 className="font-sans text-base">
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left text-[1.08rem] font-semibold text-pine transition-colors hover:text-pine-soft"
                >
                  {item.q}
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 transition-[transform,background-color] duration-500 ease-(--ease-soft) ${
                      isOpen ? 'rotate-45 bg-pine text-clay-light ring-pine' : 'ring-pine/20'
                    }`}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className={`grid transition-[grid-template-rows] duration-500 ease-(--ease-soft) ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                inert={!isOpen}
              >
                <div className="overflow-hidden">
                  <p className="max-w-[60ch] pr-12 pb-6 text-pine-soft">
                    <WithTenge text={item.a} />
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
