import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { supabaseUrl, supabaseAnonKey } from '@/lib/env'

export const createClient = async () => {
  return createSupabaseClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: false,
      },
      global: {
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    }
  )
}
