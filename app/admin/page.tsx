'use client'

import { useEffect, useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import DashboardStats from '@/components/admin/DashboardStats'
import RecentProperties from '@/components/admin/RecentProperties'
import AddPropertyModal from '@/components/admin/AddPropertyModal'
import { fetchPropertyStats } from '@/lib/api/admin'
import type { PropertyStats } from '@/lib/types'

export default function AdminDashboard() {
  const [stats, setStats] = useState<PropertyStats>({
    totalProperties: 0,
    soldProperties: 0,
    totalInquiries: 0,
  })
  const [showAddModal, setShowAddModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadStats = async () => {
    try {
      const data = await fetchPropertyStats()
      setStats(data)
    } catch (error) {
      console.error('Failed to load stats:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStats()
  }, [])

  return (
    <>
      <AdminHeader title="Dashboard" />
      
      <div className="p-6 space-y-6">
        {loading ? (
          <p className="text-gray-600">Loading dashboard...</p>
        ) : (
          <>
            <DashboardStats stats={stats} />

            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Recent Properties</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition font-semibold"
              >
                + Add Property
              </button>
            </div>

            <RecentProperties />
          </>
        )}
      </div>

      {showAddModal && (
        <AddPropertyModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false)
            loadStats()
          }}
        />
      )}
    </>
  )
}
