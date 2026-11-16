import type { RefObject } from 'react'
import type { Agency, Localized } from '@/features/agencies/lib/agencyService'

export type Video = { kind: 'file' | 'embed'; src: string }
export type Tier = { labelKey: string; gradient: string }
export type Social = { label: string; href?: string | null; icon: string; hover: string }
export type Translate = (key: string) => string
export type Localize = (value: Localized | undefined) => string
export type SectionRefs = Record<'home' | 'aboutUs' | 'ourMission' | 'whyJoinUs' | 'membership' | 'services' | 'events' | 'contactUs', RefObject<HTMLDivElement | null>>
export type { Agency }
