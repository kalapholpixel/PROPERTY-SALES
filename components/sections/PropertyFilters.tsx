'use client'

import { useState } from 'react'
import type { PropertyFilters } from '@/lib/types'

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilters) => void
}

export default function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<PropertyFilters>({
    type: '',
    priceMin: 0,
    priceMax: 999999999,
    location: '',
  })

  const handleFilterChange = (key: keyof PropertyFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-bold text-primary mb-6">Search Properties</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
          >
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Min Price</label>
          <input
            type="number"
            placeholder="Min price"
            value={filters.priceMin}
            onChange={(e) => handleFilterChange('priceMin', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price</label>
          <input
            type="number"
            placeholder="Max price"
            value={filters.priceMax}
            onChange={(e) => handleFilterChange('priceMax', parseInt(e.target.value) || 999999999)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
          <input
            type="text"
            placeholder="Search location"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
          />
        </div>
      </div>
    </div>
  )
}
