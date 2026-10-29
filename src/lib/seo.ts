import { SITE_URL } from '../config'
import { SERVICES, isServiceSlug } from '../data/services'
import type { Dict } from '../i18n/en'

export type SeoData = { title: string; description: string; path: string; noindex?: boolean; image?: string }

/** Title and description for a path. Shared by the client <Seo> and the build-time prerender. */
export function seoFor(path: string, t: Dict): SeoData {
  const clean = path.replace(/\/+$/, '') || '/'
  const map: Record<string, { title: string; description: string }> = {
    '/': t.seo.home,
    '/services': t.seo.services,
    '/team': t.seo.team,
    '/results': t.seo.results,
    '/contact': t.seo.contact,
  }
  if (map[clean]) return { ...map[clean], path: clean }
  const m = clean.match(/^\/services\/([^/]+)$/)
  if (m && isServiceSlug(m[1])) {
    const s = t.services[m[1]]
    const meta = SERVICES.find((x) => x.slug === m[1])!
    return { title: t.seo.service(s.name), description: s.short, path: clean, image: meta.image }
  }
  return { ...t.seo.notFound, path: clean, noindex: true }
}

const escAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** <head> tags as an HTML string (used when prerendering). */
export function seoTags(s: SeoData) {
  const url = `${SITE_URL}${s.path === '/' ? '/' : s.path}`
  const img = s.image ? `${SITE_URL}/images/${s.image}.webp` : `${SITE_URL}/og.jpg`
  return [
    `<title>${escAttr(s.title)}</title>`,
    `<meta name="description" content="${escAttr(s.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${escAttr(s.title)}" />`,
    `<meta property="og:description" content="${escAttr(s.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    s.noindex ? '<meta name="robots" content="noindex" />' : '',
  ]
    .filter(Boolean)
    .join('\n    ')
}
