'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLoginForm from '@/components/admin/AdminLoginForm'
import { getCurrentUser } from '@/lib/auth'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser()
      if (user) {
        router.push('/admin')
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Admin Panel</h1>
          <p className="text-gray-600">Sign in to manage properties</p>
        </div>

        <AdminLoginForm
          onSuccess={() => {
            toast.success('Login successful!')
            router.push('/admin')
          }}
          onError={(error) => {
            toast.error(error)
          }}
        />

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Demo credentials: Use your Supabase auth account
          </p>
        </div>
      </div>
    </div>
  )
}
