'use client'

import { useState } from 'react'

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (images.length === 0) {
    return (
      <div className="bg-gray-300 h-96 flex items-center justify-center">
        <p className="text-gray-600">No images available</p>
      </div>
    )
  }

  return (
    <div className="bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-96 md:h-screen bg-gray-900">
          <img
            src={images[selectedImage]}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {images.length > 1 && (
          <div className="bg-black px-4 py-4 overflow-x-auto">
            <div className="flex gap-4 justify-center">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === index ? 'border-secondary' : 'border-gray-600'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
