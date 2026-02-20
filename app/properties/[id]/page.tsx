'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import PropertyGallery from '@/components/sections/PropertyGallery'
import PropertyOverview from '@/components/sections/PropertyOverview'
import PropertyFeatures from '@/components/sections/PropertyFeatures'
import PropertyMap from '@/components/sections/PropertyMap'
import ContactSection from '@/components/sections/ContactSection'
import { fetchPropertyById } from '@/lib/api/properties'
import type { Property } from '@/lib/types'

export default function PropertyDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const data = await fetchPropertyById(id)
        setProperty(data)
      } catch (error) {
        console.error('Failed to load property:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProperty()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading property details...</p>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-600">Property not found</p>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <PropertyGallery images={property.images} title={property.title} />
      <PropertyOverview property={property} />
      <PropertyFeatures property={property} />
      <PropertyMap location={property.location} />
      <ContactSection property={property} />
    </div>
  )
}
