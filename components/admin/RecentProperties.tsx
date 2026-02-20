'use client'

import { useState, useEffect } from 'react'
import { fetchProperties } from '@/lib/api/properties'
import type { Property } from '@/lib/types'

export default function RecentProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties()
        setProperties(data.slice(0, 5))
      } catch (error) {
        console.error('Failed to load properties:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Properties</h3>

      {loading ? (
        <p>Loading properties...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="pb-3 font-semibold text-gray-700">Property</th>
                <th className="pb-3 font-semibold text-gray-700">Location</th>
                <th className="pb-3 font-semibold text-gray-700">Price</th>
                <th className="pb-3 font-semibold text-gray-700">Type</th>
                <th className="pb-3 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4">{property.title}</td>
                  <td className="py-4">{property.location}</td>
                  <td className="py-4 font-semibold text-secondary">${property.price.toLocaleString()}</td>
                  <td className="py-4 capitalize">{property.type}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      property.sold
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {property.sold ? 'Sold' : 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
