import { useEffect, useRef, useState } from 'react'
import type ReCAPTCHA from 'react-google-recaptcha'

/**
 * Shared reCAPTCHA state for the forms: the public site key (with a console warning if it is
 * missing), the widget ref (call `ref.current?.reset()` after a submit) and the current token.
 * Replaces the same four declarations that were repeated in every form.
 */
export function useRecaptcha() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  const ref = useRef<ReCAPTCHA>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    if (!siteKey) {
      console.error('reCAPTCHA site key is missing. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local')
    }
  }, [siteKey])

  return { siteKey, ref, token, setToken }
}
