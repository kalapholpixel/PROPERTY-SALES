'use client'

interface AdminHeaderProps {
  title: string
}

export default function AdminHeader({ title }: AdminHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-6">
      <h1 className="text-3xl font-bold text-primary">{title}</h1>
    </div>
  )
}
