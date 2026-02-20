'use client'

import type { Metadata } from 'next'
import { useState, useEffect } from 'react'
import PropertyGrid from '@/components/sections/PropertyGrid'
import PropertyFilters from '@/components/sections/PropertyFilters'
import { fetchProperties } from '@/lib/api/properties'
import type { Property, PropertyFilters as FilterType } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Browse Properties | Real Estate',
  description: 'Browse all available houses and lands for sale. Filter by type, price, and location.',
  keywords: 'properties for sale, houses for sale, land for sale, property listings',
  openGraph: {
    title: 'Browse Properties | Real Estate',
    description: 'Browse all available houses and lands for sale.',
    type: 'website',
  },
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterType>({
    type: '',
    priceMin: 0,
    priceMax: 999999999,
    location: '',
  })

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
    setFilters(newFilters)
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
    <div className="min-h-screen bg-accent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Available Properties</h1>
        
        <PropertyFilters onFilterChange={handleFilterChange} />
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-lg text-gray-600">Loading properties...</p>
          </div>
        ) : (
          <PropertyGrid properties={filteredProperties} />
        )}
      </div>
    </div>
  )
}
