import type { Metadata } from 'next'
import ContactForm from '@/components/sections/ContactForm'
import ContactInfo from '@/components/sections/ContactInfo'
import OfficeMap from '@/components/sections/OfficeMap'

export const metadata: Metadata = {
  title: 'Contact Us | Real Estate',
  description: 'Get in touch with our real estate team. Call, email, or visit our office for property inquiries.',
  keywords: 'contact real estate, real estate agent, property inquiry',
  openGraph: {
    title: 'Contact Us | Real Estate',
    description: 'Get in touch with our real estate team.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-accent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-4 text-center">Get In Touch</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Have questions about our properties? Contact us today and our team will be happy to help you find your dream home.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Visit Our Office</h2>
          <OfficeMap />
        </div>
      </div>
    </div>
  )
}
