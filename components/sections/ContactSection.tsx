'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import type { Property } from '@/lib/types'

interface ContactSectionProps {
  property: Property
}

export default function ContactSection({ property }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890'
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+1 (555) 123-4567'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          propertyId: property.id,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit inquiry')
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      toast.success('Inquiry sent successfully!')

      setTimeout(() => setSubmitted(false), 5000)
    } catch (error: any) {
      const errorMsg = error.message || 'Failed to submit inquiry. Please try again.'
      toast.error(errorMsg)
      console.error('Failed to submit inquiry:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-accent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-8">Interested in This Property?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">Contact Us</h3>
                <a
                  href={`tel:${phoneNumber}`}
                  className="block bg-primary text-white px-6 py-3 rounded-lg text-center font-semibold hover:bg-primary/90 transition mb-4"
                >
                  📞 Call Now
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=I%20am%20interested%20in%20${property.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-green-500 text-white px-6 py-3 rounded-lg text-center font-semibold hover:bg-green-600 transition"
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-green-700 text-center">
                <p className="font-semibold text-lg mb-2">Thank you!</p>
                <p>We'll get back to you shortly with more information about this property.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-secondary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
