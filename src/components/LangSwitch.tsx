import { useLang, type Lang } from '../i18n'

export function LangSwitch({ tone = 'pine', className = '' }: { tone?: 'pine' | 'light'; className?: string }) {
  const { lang, setLang, t } = useLang()
  // Spoken names follow the current UI language, so English pages never pull in the Cyrillic font.
  const langs: { id: Lang; label: string; full: string }[] = [
    { id: 'en', label: 'EN', full: t.langNames.en },
    { id: 'ru', label: 'RU', full: t.langNames.ru },
  ]
  const ring = tone === 'pine' ? 'ring-pine/20' : 'ring-clay-light/30'
  return (
    <div role="group" aria-label={t.nav.language} className={`inline-flex rounded-full p-1 ring-1 ${ring} ${className}`}>
      {langs.map((l) => {
        const active = l.id === lang
        const activeCls = tone === 'pine' ? 'bg-pine text-clay-light' : 'bg-clay-light text-pine'
        const idleCls = tone === 'pine' ? 'text-pine hover:bg-pine/8' : 'text-clay-light hover:bg-clay-light/10'
        return (
          <button
            key={l.id}
            type="button"
            aria-pressed={active}
            onClick={() => setLang(l.id)}
            className={`min-h-9 min-w-10 rounded-full px-2.5 text-xs font-semibold tracking-wider transition-colors ${active ? activeCls : idleCls}`}
          >
            <span aria-hidden="true">{l.label}</span>
            <span className="sr-only">{l.full}</span>
          </button>
        )
      })}
    </div>
  )
}
