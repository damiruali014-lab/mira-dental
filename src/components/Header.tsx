import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { useLang } from '../i18n'
import { Logo } from './Logo'
import { LangSwitch } from './LangSwitch'
import { Close, MenuIcon, Phone, WhatsAppIcon } from './icons'
import { PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '../config'

export function Header() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    menuRef.current?.close()
  }, [pathname])

  const links = [
    { to: '/services', label: t.nav.services },
    { to: '/team', label: t.nav.team },
    { to: '/results', label: t.nav.results },
    { to: '/contact', label: t.nav.contact },
  ]

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled ? 'bg-clay/85 shadow-[0_1px_0_rgb(31_59_52/0.08)] backdrop-blur-md' : 'bg-clay'
      }`}
    >
      <div className="section flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
        <Link to="/" className="-m-1 rounded-lg p-1">
          <Logo />
        </Link>

        <nav aria-label={t.nav.primary} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `relative rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors hover:bg-pine/6 ${
                      isActive ? 'text-pine after:absolute after:inset-x-4 after:-bottom-0.5 after:h-px after:bg-oak' : 'text-pine-soft hover:text-pine'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LangSwitch className="hidden sm:inline-flex" />
          <Link to="/contact#booking" className="btn btn-coral hidden px-5 sm:inline-flex">
            {t.nav.book}
          </Link>
          <button
            type="button"
            className="grid h-12 w-12 place-items-center rounded-full text-pine ring-1 ring-pine/20 transition-colors hover:bg-pine/6 lg:hidden"
            aria-label={t.nav.openMenu}
            aria-haspopup="dialog"
            onClick={() => {
              menuRef.current?.showModal()
              closeRef.current?.focus()
            }}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <dialog
        ref={menuRef}
        aria-label={t.nav.menu}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-pine p-0 text-clay-light open:anim-in"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close()
        }}
      >
        <div className="flex min-h-full flex-col px-4 pt-3 pb-8 sm:px-6">
          <div className="flex h-[4.5rem] items-center justify-between">
            <Link to="/" className="rounded-lg">
              <Logo tone="light" />
            </Link>
            <button
              ref={closeRef}
              type="button"
              className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-clay-light/30 hover:bg-clay-light/10"
              aria-label={t.nav.closeMenu}
              onClick={() => menuRef.current?.close()}
            >
              <Close className="h-6 w-6" />
            </button>
          </div>
          <nav aria-label={t.nav.primary} className="mt-8">
            <ul className="space-y-1">
              {[{ to: '/', label: t.nav.home }, ...links].map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      `block py-2.5 font-display text-[2.4rem] leading-tight transition-colors ${isActive ? 'text-clay-light italic' : 'text-clay-light/75 hover:text-clay-light'}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-6 pt-10">
            <Link to="/contact#booking" className="btn btn-coral w-full">
              {t.nav.book}
            </Link>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <LangSwitch tone="light" />
              <div className="flex gap-2">
                <a href={`tel:${PHONE_TEL}`} className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-clay-light/30" aria-label={`${t.common.call} ${PHONE_DISPLAY}`}>
                  <Phone />
                </a>
                <a href={whatsappLink(t.common.whatsappHello)} target="_blank" rel="noopener" className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-clay-light/30" aria-label={t.common.whatsapp}>
                  <WhatsAppIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </header>
  )
}
