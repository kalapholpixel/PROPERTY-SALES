/**
 * Environment variable validation
 * Ensures required variables are set and provides helpful error messages
 */

function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name]

  if (!value) {
    if (defaultValue !== undefined) {
      console.warn(`Environment variable ${name} not set, using default value`)
      return defaultValue
    }
    throw new Error(
      `Missing required environment variable: ${name}\n` +
      `Please add it to your .env.local file or deployment environment.`
    )
  }

  return value
}

function validateSupabaseUrl(url: string): void {
  if (!url.startsWith('https://')) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SUPABASE_URL: must start with 'https://'\n` +
      `Got: ${url}`
    )
  }

  if (!url.includes('.supabase.co')) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SUPABASE_URL: must be a valid Supabase URL\n` +
      `Expected format: https://*.supabase.co`
    )
  }
}

function validateSupabaseKey(key: string): void {
  if (!key || key.length < 20) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SUPABASE_ANON_KEY: key is too short or empty\n` +
      `Make sure you're using the correct anonymous key from your Supabase project.`
    )
  }
}

// Supabase configuration (required)
const supabaseUrlRaw = getEnvVar('NEXT_PUBLIC_SUPABASE_URL')
validateSupabaseUrl(supabaseUrlRaw)
export const supabaseUrl = supabaseUrlRaw

const supabaseAnonKeyRaw = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY')
validateSupabaseKey(supabaseAnonKeyRaw)
export const supabaseAnonKey = supabaseAnonKeyRaw

// Optional public configuration
export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890'
export const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+1 (555) 123-4567'
export const email = process.env.NEXT_PUBLIC_EMAIL || 'contact@realestate.com'

// NextAuth (optional, for future use)
export const nextAuthSecret = process.env.NEXTAUTH_SECRET
export const nextAuthUrl = process.env.NEXTAUTH_URL

export function validateEnv() {
  try {
    // Required vars are validated at import time, if we reach here it's valid
    return true
  } catch (error) {
    console.error('Environment validation failed:', error)
    return false
  }
}
