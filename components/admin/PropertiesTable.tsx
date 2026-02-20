'use client'

import { useState } from 'react'
import { deleteProperty, updateProperty } from '@/lib/api/properties'
import EditPropertyModal from './EditPropertyModal'
import type { Property } from '@/lib/types'

interface PropertiesTableProps {
  properties: Property[]
  onRefresh: () => void
}

export default function PropertiesTable({ properties, onRefresh }: PropertiesTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return

    setDeleting(id)
    try {
      await deleteProperty(id)
      onRefresh()
    } catch (error) {
      console.error('Failed to delete property:', error)
    } finally {
      setDeleting(null)
    }
  }

  const handleMarkAsSold = async (property: Property) => {
    try {
      await updateProperty(property.id, { sold: !property.sold })
      onRefresh()
    } catch (error) {
      console.error('Failed to update property:', error)
    }
  }

  const handleEdit = (property: Property) => {
    setEditingProperty(property)
    setEditingId(property.id)
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Property</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Location</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Price</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Type</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{property.title}</td>
                  <td className="px-6 py-4 text-gray-700">{property.location}</td>
                  <td className="px-6 py-4 font-semibold text-secondary">${property.price.toLocaleString()}</td>
                  <td className="px-6 py-4 capitalize">{property.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      property.sold
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {property.sold ? 'Sold' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleEdit(property)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleMarkAsSold(property)}
                      className={`font-semibold ${property.sold ? 'text-orange-600 hover:text-orange-800' : 'text-green-600 hover:text-green-800'}`}
                    >
                      {property.sold ? 'Mark Active' : 'Mark Sold'}
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      disabled={deleting === property.id}
                      className="text-red-600 hover:text-red-800 font-semibold disabled:opacity-50"
                    >
                      {deleting === property.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingId && editingProperty && (
        <EditPropertyModal
          property={editingProperty}
          onClose={() => {
            setEditingId(null)
            setEditingProperty(null)
          }}
          onSuccess={() => {
            onRefresh()
            setEditingId(null)
            setEditingProperty(null)
          }}
        />
      )}
    </>
  )
}
