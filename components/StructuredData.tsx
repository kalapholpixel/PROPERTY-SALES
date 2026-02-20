'use client'

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Real Estate',
    url: 'https://realestate.com',
    telephone: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+1 (555) 123-4567',
    email: process.env.NEXT_PUBLIC_EMAIL || 'info@realestate.com',
    description: 'Professional real estate agent specializing in houses and lands.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Real Estate Street',
      addressLocality: 'City',
      addressRegion: 'State',
      postalCode: '12345',
      addressCountry: 'US',
    },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
    sameAs: [
      'https://www.facebook.com/realestate',
      'https://www.twitter.com/realestate',
      'https://www.instagram.com/realestate',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function PropertySchema({ property }: { property: any }) {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'RealEstateListing',
    image: property.images[0] || '',
    name: property.title,
    description: property.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.location,
    },
    price: property.price,
    priceCurrency: 'USD',
    availability: property.sold ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.area,
      unitCode: 'MTK',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
