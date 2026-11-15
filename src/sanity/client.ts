import { createClient, type QueryParams } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

/** Read client. CDN in production; ISR + webhook revalidation keep content fresh. */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

/** Server-only write client (scripts / API routes). Never import from client components. */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

/** Typed GROQ fetch helper. */
export function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T> {
  return client.fetch<T>(query, params)
}
