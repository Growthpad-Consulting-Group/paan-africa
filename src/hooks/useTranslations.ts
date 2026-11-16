import { useMemo } from 'react'
import enMessages from '../messages/en.json'

// The site has no locale routing (the language switch uses Google Translate), so the text
// always comes from the English messages. This hook no longer reads the Pages Router locale,
// which also lets it work in App Router components.
const LOCALE = 'en'

function lookup(key: string): string {
  let value: unknown = enMessages
  for (const part of key.split('.')) {
    if (value && typeof value === 'object' && part in value) value = (value as Record<string, unknown>)[part]
    else return key // no translation: show the key
  }
  return typeof value === 'string' && value ? value : key
}

export const useAppTranslations = () => {
  const t = useMemo(() => (key: string) => lookup(key), [])
  const tn = useMemo(() => (namespace: string, key: string) => t(`${namespace}.${key}`), [t])
  return { t, tn, locale: LOCALE }
}
