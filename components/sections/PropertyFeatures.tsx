'use client'

import type { Property } from '@/lib/types'

interface PropertyFeaturesProps {
  property: Property
}

export default function PropertyFeatures({ property }: PropertyFeaturesProps) {
  const defaultFeatures = [
    'Modern architecture',
    'Spacious rooms',
    'Natural lighting',
    'Quality finishes',
  ]

  const features = property.features.length > 0 ? property.features : defaultFeatures

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-accent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-8">Property Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
              <span className="text-3xl">✓</span>
              <span className="text-lg text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
