import { SupabaseClient } from '@supabase/supabase-js'

/**
 * Check if a user has admin privileges
 * This function checks the user's custom claims (if using JWT) or metadata
 */
export async function isUserAdmin(supabase: SupabaseClient): Promise<boolean> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return false
    }

    // Check if user has admin role in app_metadata (custom claims)
    // Supabase stores custom claims in user.app_metadata.role
    const userRole = user.app_metadata?.role
    
    // Return true if role is 'admin'
    return userRole === 'admin'
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

/**
 * Get the authenticated user from Supabase
 * Returns null if user is not authenticated
 */
export async function getAuthenticatedUser(supabase: SupabaseClient) {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
      return null
    }
    return user
  } catch (error) {
    console.error('Error getting authenticated user:', error)
    return null
  }
}
