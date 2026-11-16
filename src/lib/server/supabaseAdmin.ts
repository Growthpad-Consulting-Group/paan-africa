import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | undefined

/**
 * Service-role Supabase client for server routes, created on first use (not at import time, so
 * builds that collect route metadata do not need the secret key).
 */
export function supabaseAdmin(): SupabaseClient {
  client ??= createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  return client
}
