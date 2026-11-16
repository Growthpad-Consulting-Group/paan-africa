import type { PortableTextBlock } from '@portabletext/types'
import { sanityFetch } from '@/sanity/client'

export type JobPosting = {
  slug: string
  title: string
  department: string | null
  location: string | null
  employmentType: string
  duration: string | null
  summary: string
  requirements: string[]
  details: PortableTextBlock[]
  applyByEmail: boolean
  applyEmail: string
  applyEmailSubject: string
}

const todayEAT = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Nairobi' })

/** Open positions, in display order. Hidden roles and roles past their closing date are excluded. */
export async function getOpenPositions(): Promise<JobPosting[]> {
  return sanityFetch<JobPosting[]>(
    `*[_type == "jobPosting" && isOpen != false && defined(slug.current) && (!defined(closingDate) || closingDate >= $today)]
      | order(coalesce(order, 999) asc, _createdAt asc){
        "slug": slug.current, title, department, location, "employmentType": coalesce(employmentType, "Full-time"), duration, summary,
        "requirements": coalesce(requirements, []), "details": coalesce(details, []),
        "applyByEmail": applyByEmail == true,
        "applyEmail": coalesce(applyEmail, "careers@paan.africa"),
        "applyEmailSubject": coalesce(applyEmailSubject, title + " – PAAN")
      }`,
    { today: todayEAT() }
  )
}
