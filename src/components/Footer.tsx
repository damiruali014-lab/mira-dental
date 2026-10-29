import { Link } from 'react-router'
import { AUTHOR_URL, EMAIL, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '../config'
import { useLang } from '../i18n'
import { Logo } from './Logo'
import { ArrowRight } from './icons'

export function Footer() {
  const { t } = useLang()
  const links = [
    { to: '/', label: t.nav.home },
    { to: '/services', label: t.nav.services },
    { to: '/team', label: t.nav.team },
    { to: '/results', label: t.nav.results },
    { to: '/contact', label: t.nav.contact },
  ]
  return (
    <footer className="bg-pine-ink text-clay-light">
      <div className="section grid gap-12 pt-16 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:pt-20">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-clay-light/75">{t.footer.tagline}</p>
          <Link to="/contact#booking" className="btn btn-coral mt-6">
            {t.nav.book}
          </Link>
        </div>
        <nav aria-label={t.footer.explore}>
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-sage uppercase">{t.footer.explore}</h2>
          <ul className="mt-4 space-y-2.5">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-clay-light/85 transition-colors hover:text-clay-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-sage uppercase">{t.footer.contact}</h2>
          <address className="mt-4 space-y-2.5 not-italic">
            <p className="text-clay-light/85">{t.contactPage.address}</p>
            <p>
              <a href={`tel:${PHONE_TEL}`} className="text-clay-light/85 hover:text-clay-light">
                {PHONE_DISPLAY}
              </a>
            </p>
            <p>
              <a href={whatsappLink(t.common.whatsappHello)} target="_blank" rel="noopener" className="text-clay-light/85 hover:text-clay-light">
                {t.common.whatsappShort}
              </a>
            </p>
            <p>
              <a href={`mailto:${EMAIL}`} className="break-all text-clay-light/85 hover:text-clay-light">
                {EMAIL}
              </a>
            </p>
          </address>
        </div>
        <div>
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-sage uppercase">{t.footer.hours}</h2>
          <ul className="mt-4 space-y-2.5 text-clay-light/85">
            {t.footer.hoursShort.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-clay-light/12">
        <div className="section flex flex-col gap-4 pt-7 pb-24 text-sm sm:pb-7 sm:pr-24 lg:pr-28 text-clay-light/70 md:flex-row md:items-center md:justify-between">
          <p>
            {t.footer.concept}{' '}
            <a href={AUTHOR_URL} target="_blank" rel="noopener" className="group inline-flex items-center gap-1 font-semibold text-clay-light underline decoration-coral decoration-2 underline-offset-4 hover:decoration-clay-light">
              {t.footer.conceptCta}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </p>
          <p className="shrink-0">
            © {new Date().getFullYear()} Mira Dental Studio · {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
