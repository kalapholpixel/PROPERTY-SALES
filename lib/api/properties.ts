import { createClient } from '@/lib/supabase/client'
import type { Property } from '@/lib/types'

const supabase = createClient()

export async function fetchProperties(): Promise<Property[]> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('sold', false)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching properties:', error)
    return []
  }
}

export async function fetchPropertyById(id: string): Promise<Property | null> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching property:', error)
    return null
  }
}

export async function createProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property | null> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .insert([property])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating property:', error)
    return null
  }
}

export async function updateProperty(id: string, updates: Partial<Property>): Promise<Property | null> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating property:', error)
    return null
  }
}

export async function deleteProperty(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting property:', error)
    return false
  }
}

export async function uploadPropertyImage(file: File): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `properties/${fileName}`

    const { error } = await supabase.storage
      .from('property-images')
      .upload(filePath, file)

    if (error) throw error

    const { data } = supabase.storage
      .from('property-images')
      .getPublicUrl(filePath)

    return data?.publicUrl || null
  } catch (error) {
    console.error('Error uploading image:', error)
    return null
  }
}
