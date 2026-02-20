'use client'

interface PropertyMapProps {
  location: string
}

export default function PropertyMap({ location }: PropertyMapProps) {
  const encodedLocation = encodeURIComponent(location)
  const mapsUrl = `https://www.google.com/maps/search/${encodedLocation}`

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-8">Location</h2>
        
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen=""
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || 'AIzaSyA_yJC7E_9XVdvZc5Jp4fhVs8Cr7bvKvfU'}&q=${encodedLocation}`}
          ></iframe>
        </div>

        <p className="text-gray-700 text-lg mt-6">
          📍 <strong>{location}</strong>
        </p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
        >
          View on Google Maps
        </a>
      </div>
    </section>
  )
}
