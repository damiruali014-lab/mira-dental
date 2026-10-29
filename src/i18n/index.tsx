import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import en, { type Dict } from './en'
import ru from './ru'

export type Lang = 'en' | 'ru'
export const DICTS: Record<Lang, Dict> = { en, ru }
const STORAGE_KEY = 'mira-lang'

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void }
const LangContext = createContext<Ctx>({ lang: 'en', t: en, setLang: () => {} })

/** Pages are prerendered in English; a saved choice (or a Russian-language browser) switches after hydration. */
export function LangProvider({ children, initial = 'en' }: { children: ReactNode; initial?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initial)

  useEffect(() => {
    let saved: string | null = null
    try {
      saved = localStorage.getItem(STORAGE_KEY)
    } catch {
      /* storage blocked */
    }
    if (saved === 'en' || saved === 'ru') setLangState(saved)
    else if (navigator.languages?.some((l) => /^(ru|kk)\b/i.test(l))) setLangState('ru')
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* storage blocked */
    }
  }, [])

  const value = useMemo(() => ({ lang, t: DICTS[lang], setLang }), [lang, setLang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
