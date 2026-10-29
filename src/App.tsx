import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { useLang } from './i18n'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { WhatsAppFab } from './components/WhatsAppFab'
import { Seo } from './components/Seo'
import { useReveal } from './hooks/useReveal'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Team from './pages/Team'
import Results from './pages/Results'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

/** Scroll to the top on page change, or to #hash targets (e.g. /contact#booking). */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }))
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function App() {
  const { t, lang } = useLang()
  const { pathname } = useLocation()
  useReveal(`${pathname}|${lang}`)

  return (
    <>
      <a href="#main" className="sr-only z-50 rounded-full bg-pine px-5 py-3 text-clay-light focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        {t.skip}
      </a>
      <ScrollManager />
      <Seo />
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/team" element={<Team />} />
          <Route path="/results" element={<Results />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
