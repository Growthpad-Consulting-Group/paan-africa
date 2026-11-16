import { useEffect, type RefObject } from 'react'

/**
 * Adds the `section-visible` class to each referenced element the first time it scrolls into view
 * (drives the fade-in transitions defined in globals.css).
 * Replaces the identical IntersectionObserver block that was copy-pasted into ~22 pages.
 */
export function useSectionObserver(refs: Record<string, RefObject<Element | null>>, threshold = 0.1) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('section-visible')
        })
      },
      { root: null, rootMargin: '0px', threshold }
    )

    const elements = Object.values(refs)
      .map((ref) => ref.current)
      .filter((el): el is Element => el !== null)
    elements.forEach((el) => observer.observe(el))

    return () => elements.forEach((el) => observer.unobserve(el))
    // refs are stable ref objects created once per page render; the original effect also ran once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
