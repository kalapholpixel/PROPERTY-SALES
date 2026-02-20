import type { Metadata } from 'next'
import '../styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Real Estate | Find Your Dream Property Today',
  description: 'Discover premium houses and lands for sale. Expert real estate agent with 15+ years experience. Browse available properties, schedule tours, and contact us today.',
  keywords: 'real estate, properties for sale, houses for sale, land for sale, property listings, real estate agent',
  authors: [{ name: 'Real Estate' }],
  creator: 'Real Estate',
  publisher: 'Real Estate',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://realestate.com',
    siteName: 'Real Estate',
    title: 'Real Estate | Find Your Dream Property',
    description: 'Discover premium properties - houses and lands for sale.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1570129477492-45c003cedd07?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Real Estate Properties',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate | Find Your Dream Property',
    description: 'Discover premium properties - houses and lands for sale.',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003cedd07?w=1200&h=630&fit=crop',
    ],
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
  alternates: {
    canonical: 'https://realestate.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
