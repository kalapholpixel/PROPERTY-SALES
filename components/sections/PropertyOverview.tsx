'use client'

import type { Property } from '@/lib/types'

interface PropertyOverviewProps {
  property: Property
}

export default function PropertyOverview({ property }: PropertyOverviewProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-primary mb-4">{property.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-secondary">
                ${property.price.toLocaleString()}
              </span>
              <span className="text-gray-600 text-lg capitalize">{property.type}</span>
              {property.sold && (
                <span className="text-red-600 font-bold">SOLD</span>
              )}
            </div>

            <p className="text-gray-700 text-lg mb-6">{property.description}</p>

            <div className="mb-6">
              <p className="text-gray-600 text-lg">📍 {property.location}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-accent rounded-lg">
              <div className="text-center">
                <p className="text-gray-600 text-sm">Bedrooms</p>
                <p className="text-2xl font-bold text-primary">{property.bedrooms}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Bathrooms</p>
                <p className="text-2xl font-bold text-primary">{property.bathrooms}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Area</p>
                <p className="text-2xl font-bold text-primary">{property.area}m²</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Type</p>
                <p className="text-2xl font-bold text-primary capitalize">{property.type}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-accent p-6 rounded-lg sticky top-4">
              <h3 className="text-xl font-bold text-primary mb-4">Property Details</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <span>🏠</span> {property.bedrooms} Bedrooms
                </li>
                <li className="flex items-center gap-2">
                  <span>🚿</span> {property.bathrooms} Bathrooms
                </li>
                <li className="flex items-center gap-2">
                  <span>📐</span> {property.area} m²
                </li>
                <li className="flex items-center gap-2">
                  <span>📍</span> {property.location}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
