'use client'

import type { PropertyStats } from '@/lib/types'

interface DashboardStatsProps {
  stats: PropertyStats
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Total Properties</p>
            <p className="text-3xl font-bold text-primary">{stats.totalProperties}</p>
          </div>
          <div className="text-4xl">🏠</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Sold Properties</p>
            <p className="text-3xl font-bold text-secondary">{stats.soldProperties}</p>
          </div>
          <div className="text-4xl">✓</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Total Inquiries</p>
            <p className="text-3xl font-bold text-primary">{stats.totalInquiries}</p>
          </div>
          <div className="text-4xl">📧</div>
        </div>
      </div>
    </div>
  )
}
