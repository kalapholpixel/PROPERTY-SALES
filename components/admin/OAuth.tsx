'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface OAuthProps {
  onSuccess: () => void
  onError: (error: string) => void
}

export default function OAuth({ onSuccess, onError }: OAuthProps) {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/admin`,
        },
      })

      if (error) {
        onError(error.message)
      } else {
        onSuccess()
      }
    } catch (err: any) {
      onError(err.message || 'OAuth login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* OAuth providers disabled - Google and GitHub OAuth temporarily disabled */}
    </div>
  )
}
