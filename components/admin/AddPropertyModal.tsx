'use client'

import { useState } from 'react'
import { createProperty, uploadPropertyImage } from '@/lib/api/properties'
import type { Property } from '@/lib/types'

interface AddPropertyModalProps {
  onClose: () => void
  onSuccess: () => void
}

export default function AddPropertyModal({ onClose, onSuccess }: AddPropertyModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    type: 'house' as 'house' | 'land',
    location: '',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    latitude: 0,
    longitude: 0,
    features: '',
  })
  const [images, setImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('price') || name.includes('bedrooms') || name.includes('bathrooms') || name.includes('area') || name.includes('latitude') || name.includes('longitude')
        ? parseFloat(value)
        : value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const imageUrls: string[] = []

      for (const image of images) {
        const url = await uploadPropertyImage(image)
        if (url) imageUrls.push(url)
      }

      const newProperty: Omit<Property, 'id' | 'created_at' | 'updated_at'> = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        type: formData.type,
        location: formData.location,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        area: formData.area,
        images: imageUrls,
        latitude: formData.latitude,
        longitude: formData.longitude,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f),
        sold: false,
      }

      await createProperty(newProperty)
      onSuccess()
    } catch (err: any) {
      setError(err.message || 'Failed to add property')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">Add New Property</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-2xl">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded text-red-600">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Property Title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg"
            />
            
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="house">House</option>
              <option value="land">Land</option>
            </select>

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg"
            />

            <input
              type="number"
              name="bedrooms"
              placeholder="Bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />

            <input
              type="number"
              name="bathrooms"
              placeholder="Bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />

            <input
              type="number"
              name="area"
              placeholder="Area (m²)"
              value={formData.area}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg"
            ></textarea>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              required
              className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
