'use client'

import Link from 'next/link'
import { whatsappNumber, phoneNumber, email } from '@/lib/env'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Real Estate</h3>
            <p className="text-gray-300">Finding your dream property made easy</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/" className="hover:text-secondary transition">Home</Link></li>
              <li><Link href="/properties" className="hover:text-secondary transition">Properties</Link></li>
              <li><Link href="/contact" className="hover:text-secondary transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-gray-300 mb-2">Phone: {phoneNumber}</p>
            <p className="text-gray-300">Email: {email}</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-secondary transition">Facebook</a>
              <a href="#" className="text-gray-300 hover:text-secondary transition">Twitter</a>
              <a href="#" className="text-gray-300 hover:text-secondary transition">Instagram</a>
            </div>
          </div>
        </div>

        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition"
          title="Chat on WhatsApp"
        >
          💬
        </a>

        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            &copy; {currentYear} Real Estate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
