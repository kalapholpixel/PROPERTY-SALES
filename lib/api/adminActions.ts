'use client'

import type { Property } from '@/lib/types'

export async function createPropertySecure(
  property: Omit<Property, 'id' | 'created_at' | 'updated_at'>
): Promise<Property | null> {
  try {
    const response = await fetch('/api/admin/properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(property),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create property')
    }

    const { data } = await response.json()
    return data
  } catch (error: any) {
    console.error('Error creating property:', error)
    throw error
  }
}

export async function updatePropertySecure(
  id: string,
  updates: Partial<Property>
): Promise<Property | null> {
  try {
    const response = await fetch(`/api/admin/properties/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update property')
    }

    const { data } = await response.json()
    return data
  } catch (error: any) {
    console.error('Error updating property:', error)
    throw error
  }
}

export async function deletePropertySecure(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/admin/properties/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to delete property')
    }

    return true
  } catch (error: any) {
    console.error('Error deleting property:', error)
    throw error
  }
}

export async function uploadPropertyImageSecure(file: File): Promise<string | null> {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/admin/properties/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to upload image')
    }

    const { url } = await response.json()
    return url
  } catch (error: any) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export async function fetchPropertiesSecure(): Promise<Property[]> {
  try {
    const response = await fetch('/api/admin/properties', {
      method: 'GET',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch properties')
    }

    const { data } = await response.json()
    return data || []
  } catch (error: any) {
    console.error('Error fetching properties:', error)
    throw error
  }
}
