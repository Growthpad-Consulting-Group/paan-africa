import type { RefObject } from 'react'

export type SectionRefs = Record<'home' | 'openPositions' | 'whyJoinUs' | 'culture' | 'application', RefObject<HTMLDivElement | null>>
