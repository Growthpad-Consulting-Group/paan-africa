import { NextResponse, type NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

type Payload = { _type: string; slug?: string | null }

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

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET
    if (!secret) return NextResponse.json({ message: 'SANITY_REVALIDATE_SECRET is not set' }, { status: 500 })

    const raw = await request.text()
    const signature = request.headers.get(SIGNATURE_HEADER_NAME)
    if (!signature || !(await isValidSignature(raw, signature, secret))) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }
    const body = JSON.parse(raw) as Payload
    if (!body?._type) return NextResponse.json({ message: 'Missing _type' }, { status: 400 })

    const paths = pathsFor(body)
    paths.forEach((p) => revalidatePath(p))
    return NextResponse.json({ revalidated: paths })
  } catch (err) {
    console.error('Revalidate error:', err)
    return NextResponse.json({ message: 'Revalidation failed' }, { status: 500 })
  }
}

export function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
}
