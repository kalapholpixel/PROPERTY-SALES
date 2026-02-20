'use client'

import { useState } from 'react'
import { updateProperty, uploadPropertyImage } from '@/lib/api/properties'
import type { Property } from '@/lib/types'

interface EditPropertyModalProps {
  property: Property
  onClose: () => void
  onSuccess: () => void
}

export default function EditPropertyModal({ property, onClose, onSuccess }: EditPropertyModalProps) {
  const [formData, setFormData] = useState({
    title: property.title,
    description: property.description,
    price: property.price,
    type: property.type,
    location: property.location,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    features: property.features.join(', '),
  })
  const [newImages, setNewImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('price') || name.includes('bedrooms') || name.includes('bathrooms') || name.includes('area')
        ? parseFloat(value)
        : value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let images = [...property.images]

      for (const image of newImages) {
        const url = await uploadPropertyImage(image)
        if (url) images.push(url)
      }

      const updates: Partial<Property> = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        location: formData.location,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        area: formData.area,
        images,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      }

      await updateProperty(property.id, updates)
      onSuccess()
    } catch (err: any) {
      setError(err.message || 'Failed to update property')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">Edit Property</h2>
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
              className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg"
            />

            {property.images.length > 0 && (
              <div className="col-span-2">
                <p className="text-sm font-semibold text-gray-700 mb-2">Current Images ({property.images.length})</p>
                <div className="flex gap-2 flex-wrap">
                  {property.images.map((img, i) => (
                    <img key={i} src={img} alt="Property" className="w-12 h-12 object-cover rounded" />
                  ))}
                </div>
              </div>
            )}
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
              {loading ? 'Updating...' : 'Update Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
