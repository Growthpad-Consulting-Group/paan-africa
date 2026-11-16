'use client'

import { useEffect } from 'react'

/** The PWA is disabled: remove any service worker and caches left in visitors' browsers by older builds. */
export default function ServiceWorkerCleanup() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    caches
      .keys()
      .then((names) => Promise.all(names.map((name) => caches.delete(name))))
      .catch(console.error)
    navigator.serviceWorker.getRegistrations().then((registrations) => registrations.forEach((r) => r.unregister()))
  }, [])
  return null
}
