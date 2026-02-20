'use client'

export default function ContactInfo() {
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+1 (555) 123-4567'
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890'
  const email = process.env.NEXT_PUBLIC_EMAIL || 'info@realestate.com'

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-primary mb-6">Get In Touch</h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">📞 Call Us</h4>
            <a href={`tel:${phoneNumber}`} className="text-secondary hover:text-secondary/80 transition text-lg">
              {phoneNumber}
            </a>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">💬 WhatsApp</h4>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition inline-block font-semibold"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">📧 Email Us</h4>
            <a href={`mailto:${email}`} className="text-secondary hover:text-secondary/80 transition text-lg">
              {email}
            </a>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">🏢 Office Hours</h4>
            <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-700">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-gray-700">Sunday: Closed</p>
          </div>
        </div>
      </div>

      <div className="bg-secondary/10 p-8 rounded-lg">
        <h4 className="font-bold text-primary mb-4">Why Choose Us?</h4>
        <ul className="space-y-2 text-gray-700">
          <li>✓ Expert market knowledge</li>
          <li>✓ Fast response time</li>
          <li>✓ Personalized service</li>
          <li>✓ Transparent pricing</li>
          <li>✓ Professional team</li>
        </ul>
      </div>
    </div>
  )
}
