'use client'

export default function OfficeMap() {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <iframe
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || 'AIzaSyA_yJC7E_9XVdvZc5Jp4fhVs8Cr7bvKvfU'}&q=Real+Estate+Office`}
      ></iframe>
    </div>
  )
}
