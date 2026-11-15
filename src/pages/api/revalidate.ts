import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

type Payload = { _type: string; slug?: string | null }

export const config = { api: { bodyParser: false } }

async function readRaw(req: NextApiRequest): Promise<string> {
  const chunks: Buffer[] = []
  for await (const c of req) chunks.push(Buffer.from(c))
  return Buffer.concat(chunks).toString('utf8')
}

/** Sanity document type -> paths to revalidate. Extend as schemas are added. */
function pathsFor({ _type, slug }: Payload): string[] {
  const withSlug = (base: string) => (slug ? [`${base}/${slug}`] : [])
  switch (_type) {
    case 'post':
      return ['/blogs', ...withSlug('/blogs'), '/sitemap-blogs.xml']
    case 'agency':
      return ['/', '/certified-agencies', ...withSlug('/certified-agencies')]
    case 'event':
      return ['/events', ...withSlug('/events')]
    case 'masterclass':
    case 'masterclassSeries':
      return ['/masterclasses', ...(_type === 'masterclass' ? withSlug('/masterclasses') : [])]
    case 'jobPosting':
      return ['/careers']
    // Summit and awards content (the pages are currently hidden behind redirects)
    case 'summitSpeaker':
    case 'summitSession':
    case 'summitTrack':
      return ['/summit']
    case 'awardGroup':
      return ['/paan-awards', '/paan-awards/categories']
    default:
      return []
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET
    if (!secret) return res.status(500).json({ message: 'SANITY_REVALIDATE_SECRET is not set' })

    const raw = await readRaw(req)
    const signature = req.headers[SIGNATURE_HEADER_NAME] as string | undefined
    if (!signature || !(await isValidSignature(raw, signature, secret))) {
      return res.status(401).json({ message: 'Invalid signature' })
    }
    const body = JSON.parse(raw) as Payload
    if (!body?._type) return res.status(400).json({ message: 'Missing _type' })

    const paths = pathsFor(body)
    await Promise.all(paths.map((p) => res.revalidate(p)))
    return res.status(200).json({ revalidated: paths })
  } catch (err) {
    console.error('Revalidate error:', err)
    return res.status(500).json({ message: 'Revalidation failed' })
  }
}
