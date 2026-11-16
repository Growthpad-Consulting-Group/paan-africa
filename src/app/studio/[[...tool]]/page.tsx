import Studio from './Studio'

export const dynamic = 'force-static'

// Sets noindex and the viewport the Studio needs.
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <Studio />
}
