'use client'

import { useState, useEffect } from 'react'
import PropertyCard from '@/components/PropertyCard'
import { fetchProperties } from '@/lib/api/properties'
import type { Property } from '@/lib/types'

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties()
        setProperties(data.slice(0, 3))
      } catch (error) {
        console.error('Failed to load properties:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [])

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Featured Properties</h2>
          <p className="text-gray-600 text-lg">Handpicked properties for you</p>
        </div>

        {loading ? (
          <p className="text-center">Loading properties...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
