import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { LangProvider } from './i18n'
import en from './i18n/en'
import App from './App'
import { SERVICE_SLUGS } from './data/services'
import { seoFor, seoTags } from './lib/seo'
export { SITE_URL } from './config'

export const ROUTES = ['/', '/services', ...SERVICE_SLUGS.map((s) => `/services/${s}`), '/team', '/results', '/contact']

export function render(url: string) {
  const html = renderToString(
    <StaticRouter location={url}>
      <LangProvider>
        <App />
      </LangProvider>
    </StaticRouter>,
  )
  return { html, head: seoTags(seoFor(url, en)) }
}
