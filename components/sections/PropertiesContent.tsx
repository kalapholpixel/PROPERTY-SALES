'use client'

import { useState, useEffect } from 'react'
import PropertyGrid from '@/components/sections/PropertyGrid'
import PropertyFilters from '@/components/sections/PropertyFilters'
import { fetchProperties } from '@/lib/api/properties'
import type { Property, PropertyFilters as FilterType } from '@/lib/types'

export default function PropertiesContent() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties()
        setProperties(data)
        setFilteredProperties(data)
      } catch (error) {
        console.error('Failed to load properties:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [])

  const handleFilterChange = (newFilters: FilterType) => {
    applyFilters(properties, newFilters)
  }

  const applyFilters = (data: Property[], activeFilters: FilterType) => {
    const filtered = data.filter((property) => {
      if (activeFilters.type && property.type !== activeFilters.type) return false
      if (property.price < activeFilters.priceMin || property.price > activeFilters.priceMax) return false
      if (activeFilters.location && !property.location.toLowerCase().includes(activeFilters.location.toLowerCase())) return false
      return true
    })
    setFilteredProperties(filtered)
  }

  return (
    <>
      <PropertyFilters onFilterChange={handleFilterChange} />
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-lg text-gray-600">Loading properties...</p>
        </div>
      ) : (
        <PropertyGrid properties={filteredProperties} />
      )}
    </>
  )
}
