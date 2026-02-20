'use client'

import { useEffect, useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import PropertiesTable from '@/components/admin/PropertiesTable'
import AddPropertyModal from '@/components/admin/AddPropertyModal'
import { fetchPropertiesSecure } from '@/lib/api/adminActions'
import type { Property } from '@/lib/types'

export default function AdminProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadProperties = async () => {
    try {
      setLoading(true)
      const data = await fetchPropertiesSecure()
      setProperties(data)
    } catch (error) {
      console.error('Failed to load properties:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProperties()
  }, [])

  return (
    <>
      <AdminHeader title="Properties Management" />
      
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">All Properties</h2>
            <p className="text-gray-600">Total: {properties.length}</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition font-semibold"
          >
            + Add Property
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading properties...</p>
        ) : (
          <PropertiesTable properties={properties} onRefresh={loadProperties} />
        )}
      </div>

      {showAddModal && (
        <AddPropertyModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false)
            loadProperties()
          }}
        />
      )}
    </>
  )
}
