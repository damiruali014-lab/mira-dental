import { whatsappLink } from '../config'
import { useLang } from '../i18n'
import { WhatsAppIcon } from './icons'

export function WhatsAppFab() {
  const { t } = useLang()
  return (
    <a
      href={whatsappLink(t.common.whatsappHello)}
      target="_blank"
      rel="noopener"
      aria-label={t.common.whatsapp}
      className="group fixed right-4 bottom-4 z-30 flex h-14 items-center gap-2 rounded-full bg-pine px-4 text-clay-light shadow-[0_16px_36px_-12px_rgb(16_34_29/0.7)] ring-1 ring-sage/30 transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-pine-deep sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="h-6 w-6 text-sage-light" />
      <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-[max-width] duration-500 group-hover:max-w-40 group-focus-visible:max-w-40">
        {t.common.whatsappShort}
      </span>
    </a>
  )
}
