export type RecaptchaResult = { ok: true } | { ok: false; status: number; message: string }

/**
 * Verifies a reCAPTCHA token with Google. Mirrors what each form route used to do inline:
 * 500 when the secret is not configured, 400 when the token fails or scores below `minScore`.
 */
export async function verifyRecaptcha(token: string, { minScore = 0.5 }: { minScore?: number } = {}): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    console.error('reCAPTCHA secret key is missing. Please set RECAPTCHA_SECRET_KEY in .env.local')
    return { ok: false, status: 500, message: 'Server configuration error' }
  }

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`,
  })
  const data = (await response.json()) as { success?: boolean; score?: number }

  if (!data.success || (data.score !== undefined && data.score < minScore)) {
    return { ok: false, status: 400, message: 'reCAPTCHA verification failed. Please try again.' }
  }
  return { ok: true }
}
