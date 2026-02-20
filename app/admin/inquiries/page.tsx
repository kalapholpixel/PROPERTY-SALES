'use client'

import { useEffect, useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import InquiriesTable from '@/components/admin/InquiriesTable'
import { fetchAllInquiries } from '@/lib/api/admin'
import type { Inquiry } from '@/lib/types'

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  const loadInquiries = async () => {
    try {
      setLoading(true)
      const data = await fetchAllInquiries()
      setInquiries(data)
    } catch (error) {
      console.error('Failed to load inquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInquiries()
  }, [])

  return (
    <>
      <AdminHeader title="Inquiries Management" />
      
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">All Inquiries</h2>
          <p className="text-gray-600">Total: {inquiries.length}</p>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading inquiries...</p>
        ) : (
          <InquiriesTable inquiries={inquiries} onRefresh={loadInquiries} />
        )}
      </div>
    </>
  )
}
