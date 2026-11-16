import { useMemo } from 'react'
import enMessages from '@/messages/en.json'

// The site has no locale routing (the language switch uses Google Translate), so the text
// always comes from the English messages. This hook no longer reads the Pages Router locale,
// which also lets it work in App Router components.
const LOCALE = 'en'

// Most keys are strings, but a few hold lists (e.g. achievements); callers know which.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Message = any

function lookup(key: string): Message {
  let value: unknown = enMessages
  for (const part of key.split('.')) {
    if (value && typeof value === 'object' && part in value) value = (value as Record<string, unknown>)[part]
    else return key // no translation: show the key
  }
  return value || key
}

/** Plain translate function for server components (the hook below wraps it for client components). */
export const translate = (key: string): Message => lookup(key)

export const useAppTranslations = () => {
  const t = useMemo(() => (key: string): Message => lookup(key), [])
  const tn = useMemo(() => (namespace: string, key: string): Message => t(`${namespace}.${key}`), [t])
  return { t, tn, locale: LOCALE }
}
