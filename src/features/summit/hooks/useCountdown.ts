import { useEffect, useState } from 'react'

export type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

const ZERO: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

/**
 * Ticking countdown to an ISO date-time (include the timezone offset, e.g. "2026-10-28T00:00:00+03:00").
 * Replaces the identical timer effect that was repeated in each summit page.
 */
export function useCountdown(target: string): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(ZERO)

  useEffect(() => {
    const targetTime = new Date(target).getTime()
    const interval = setInterval(() => {
      const difference = targetTime - Date.now()
      if (difference <= 0) {
        clearInterval(interval)
        setTimeLeft(ZERO)
        return
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [target])

  return timeLeft
}
