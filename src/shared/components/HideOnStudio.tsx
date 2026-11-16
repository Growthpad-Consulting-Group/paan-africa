'use client'

import { usePathname } from 'next/navigation'

/** Renders its children everywhere except the Sanity Studio (no analytics, toasts or seasonal effects for editors). */
export default function HideOnStudio({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/studio')) return null
  return <>{children}</>
}
