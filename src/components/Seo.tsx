import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { SITE_URL } from '../config'
import { useLang } from '../i18n'
import { seoFor } from '../lib/seo'

function setMeta(selector: string, attr: 'content' | 'href', value: string, create: () => HTMLElement) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/** Keeps title, description, canonical and Open Graph tags in sync with the route and language. */
export function Seo() {
  const { pathname } = useLocation()
  const { t, lang } = useLang()

  useEffect(() => {
    const s = seoFor(pathname, t)
    const url = `${SITE_URL}${s.path === '/' ? '/' : s.path}`
    document.title = s.title
    const meta = (key: string, isProp = false) => () => {
      const m = document.createElement('meta')
      m.setAttribute(isProp ? 'property' : 'name', key)
      return m
    }
    setMeta('meta[name="description"]', 'content', s.description, meta('description'))
    setMeta('meta[property="og:title"]', 'content', s.title, meta('og:title', true))
    setMeta('meta[property="og:description"]', 'content', s.description, meta('og:description', true))
    setMeta('meta[property="og:url"]', 'content', url, meta('og:url', true))
    setMeta('meta[property="og:locale"]', 'content', lang === 'ru' ? 'ru_RU' : 'en_US', meta('og:locale', true))
    setMeta('link[rel="canonical"]', 'href', url, () => {
      const l = document.createElement('link')
      l.rel = 'canonical'
      return l
    })
    // Unknown URLs are served by the SPA fallback with HTTP 200, so keep them out of search results.
    document.head.querySelector('meta[name="robots"]')?.remove()
    if (s.noindex) document.head.appendChild(meta('robots')()).setAttribute('content', 'noindex')
  }, [pathname, t, lang])

  return null
}
