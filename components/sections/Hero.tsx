'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-cover bg-center h-96 md:h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1570129477492-45c003cedd07?w=1200&h=800&fit=crop)',
        backgroundAttachment: 'fixed',
      }}>
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          Find Your Dream Property Today
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-100">
          Discover premium houses and lands in the best locations
        </p>
        <Link
          href="/properties"
          className="inline-block bg-secondary text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-secondary/90 transition transform hover:scale-105"
        >
          View Available Properties
        </Link>
      </div>
    </section>
  )
}
