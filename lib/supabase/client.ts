import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { supabaseUrl, supabaseAnonKey } from '@/lib/env'

export const createClient = () =>
  createSupabaseClient(supabaseUrl, supabaseAnonKey)

// Alias for clarity - this is explicitly for browser/client-side use
export const createBrowserClientAuth = createClient
