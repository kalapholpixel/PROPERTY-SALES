'use client'

import Link from 'next/link'
import type { Property } from '@/lib/types'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const imageUrl = property.images[0] || 'https://via.placeholder.com/400x300?text=Property'

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer h-full">
        <div className="relative h-64 w-full overflow-hidden bg-gray-200">
          <img
            src={imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          {property.sold && (
            <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
              SOLD
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">{property.title}</h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>

          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-secondary">
              ${property.price ? property.price.toLocaleString() : 'N/A'}
            </span>
            <span className="text-sm text-gray-500">{property.type}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-t border-b border-gray-200">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Beds</p>
              <p className="font-bold text-primary">{property.bedrooms}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Baths</p>
              <p className="font-bold text-primary">{property.bathrooms}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Area</p>
              <p className="font-bold text-primary">{property.area}m²</p>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4">📍 {property.location}</p>

          <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition">
            View Details
          </button>
        </div>
      </div>
    </Link>
  )
}
