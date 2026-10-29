// Build-time prerender: writes every route's HTML (with its own title, description and Open Graph
// tags) into dist/, so content is in the first response for crawlers, link previews and slow phones.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

const shell = readFileSync('dist/index.html', 'utf8')
const { render, ROUTES, SITE_URL } = await import(pathToFileURL('dist-ssr/entry-server.js').href)

const HERO_PRELOAD =
  '<link rel="preload" as="image" href="/images/r/hero-800.webp" type="image/webp" imagesrcset="/images/r/hero-360.webp 360w, /images/r/hero-560.webp 560w, /images/r/hero-800.webp 800w, /images/r/hero-1120.webp 1120w, /images/hero.webp 1600w" imagesizes="(min-width: 1024px) 480px, 92vw" fetchpriority="high" />'

for (const route of ROUTES) {
  // React adds its own body-level preload for the high-priority hero <img>; the <head> one above replaces it.
  const out = render(route)
  const html = out.html.replace(/<link rel="preload" as="image"[^>]*\/>/g, '')
  const head = out.head
  const page = shell
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, head + (route === '/' ? `\n    ${HERO_PRELOAD}` : ''))
    .replace('<div id="root"></div>', `<div id="root" data-path="${route}">${html}</div>`)
  const dir = route === '/' ? 'dist' : `dist${route}`
  mkdirSync(dir, { recursive: true })
  writeFileSync(`${dir}/index.html`, page)
  console.log(`Prerendered ${route.padEnd(22)} ${(html.length / 1024).toFixed(1)} kB`)
}
// robots.txt and sitemap.xml (without them the SPA fallback would answer with HTML).
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
const urls = ROUTES.map((r) => `  <url><loc>${SITE_URL}${r}</loc></url>`).join('\n')
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)

rmSync('dist-ssr', { recursive: true, force: true })
