'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-primary text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center font-bold">
            RE
          </div>
          <span className="font-bold text-lg">Real Estate</span>
        </Link>

        <div className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-secondary transition">Home</Link>
          <Link href="/properties" className="hover:text-secondary transition">Properties</Link>
          <Link href="/contact" className="hover:text-secondary transition">Contact</Link>
          <Link href="/admin/login" className="bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-secondary/90 transition font-semibold">
            Admin
          </Link>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-primary/95 px-4 py-4 space-y-3">
          <Link href="/" className="block hover:text-secondary transition">Home</Link>
          <Link href="/properties" className="block hover:text-secondary transition">Properties</Link>
          <Link href="/contact" className="block hover:text-secondary transition">Contact</Link>
          <Link href="/admin/login" className="block bg-secondary text-primary px-4 py-2 rounded-lg text-center font-semibold">
            Admin
          </Link>
        </div>
      )}
    </header>
  )
}
