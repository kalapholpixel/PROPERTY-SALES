'use client'

import AdminHeader from '@/components/admin/AdminHeader'

export default function AdminSettings() {
  return (
    <>
      <AdminHeader title="Settings" />
      
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Settings</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Coming Soon</h3>
              <p className="text-gray-600">Settings and preferences will be available here.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
