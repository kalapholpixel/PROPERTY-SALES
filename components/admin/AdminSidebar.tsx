'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { logoutUser } from '@/lib/auth'
import { useState } from 'react'

export default function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await logoutUser()
    router.push('/admin/login')
  }

  const menuItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/properties', label: 'Properties' },
    { href: '/admin/inquiries', label: 'Inquiries' },
    { href: '/admin/settings', label: 'Settings' },
  ]

  return (
    <div className="w-64 bg-primary text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-primary/30">
        <h2 className="text-2xl font-bold">Real Estate</h2>
        <p className="text-sm text-gray-300">Admin Panel</p>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-lg transition ${
                  pathname === item.href
                    ? 'bg-secondary text-primary font-semibold'
                    : 'hover:bg-primary/80'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-primary/30">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  )
}
