export interface Property {
  id: string
  title: string
  description: string
  price: number
  type: 'house' | 'land'
  location: string
  bedrooms: number
  bathrooms: number
  area: number // in square meters
  images: string[]
  latitude: number
  longitude: number
  features: string[]
  sold: boolean
  created_at: string
  updated_at: string
}

export interface PropertyFilters {
  type: string
  priceMin: number
  priceMax: number
  location: string
}

export interface Inquiry {
  id: string
  property_id: string
  name: string
  email: string
  phone: string
  message: string
  created_at: string
}

export interface User {
  id: string
  email: string
  role: 'admin' | 'user'
  createdAt: string
}

export interface PropertyStats {
  totalProperties: number
  soldProperties: number
  totalInquiries: number
}
