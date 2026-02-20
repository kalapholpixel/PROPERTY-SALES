import type { Metadata } from 'next'
import PropertiesContent from '@/components/sections/PropertiesContent'

export const metadata: Metadata = {
  title: 'Browse Properties | Real Estate',
  description: 'Browse all available houses and lands for sale. Filter by type, price, and location.',
  keywords: 'properties for sale, houses for sale, land for sale, property listings',
  openGraph: {
    title: 'Browse Properties | Real Estate',
    description: 'Browse all available houses and lands for sale.',
    type: 'website',
  },
}

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-accent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Available Properties</h1>

        <PropertiesContent />
      </div>
    </div>
  )
}
