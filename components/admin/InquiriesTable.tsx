'use client'

import { useState } from 'react'
import { deleteInquiry } from '@/lib/api/admin'
import type { Inquiry } from '@/lib/types'

interface InquiriesTableProps {
  inquiries: Inquiry[]
  onRefresh: () => void
}

export default function InquiriesTable({ inquiries, onRefresh }: InquiriesTableProps) {
  const [deleting, setDeleting] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return

    setDeleting(id)
    try {
      await deleteInquiry(id)
      onRefresh()
    } catch (error) {
      console.error('Failed to delete inquiry:', error)
    } finally {
      setDeleting(null)
    }
  }

  const selectedInquiry = inquiries.find(i => i.id === selectedId)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Phone</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-600">
                      No inquiries yet
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inquiry) => (
                    <tr
                      key={inquiry.id}
                      className={`border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                        selectedId === inquiry.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedId(inquiry.id)}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">{inquiry.name}</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">{inquiry.email}</td>
                      <td className="px-6 py-4 text-gray-700">{inquiry.phone}</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(inquiry.id)
                          }}
                          disabled={deleting === inquiry.id}
                          className="text-red-600 hover:text-red-800 font-semibold disabled:opacity-50"
                        >
                          {deleting === inquiry.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedInquiry && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-primary">Inquiry Details</h3>
            <button
              onClick={() => setSelectedId(null)}
              className="text-gray-600 hover:text-gray-900 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-sm">Name</p>
              <p className="font-semibold text-gray-900">{selectedInquiry.name}</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <a
                href={`mailto:${selectedInquiry.email}`}
                className="text-secondary hover:text-secondary/80"
              >
                {selectedInquiry.email}
              </a>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Phone</p>
              <a
                href={`tel:${selectedInquiry.phone}`}
                className="text-secondary hover:text-secondary/80"
              >
                {selectedInquiry.phone}
              </a>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Date</p>
              <p className="font-semibold text-gray-900">
                {new Date(selectedInquiry.created_at).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Message</p>
              <p className="text-gray-900 whitespace-pre-wrap">{selectedInquiry.message}</p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => handleDelete(selectedInquiry.id)}
                disabled={deleting === selectedInquiry.id}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                {deleting === selectedInquiry.id ? 'Deleting...' : 'Delete Inquiry'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
