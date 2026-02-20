import { createClient } from '@/lib/supabase/client'
import type { PropertyStats, Inquiry } from '@/lib/types'

const supabase = createClient()

export async function fetchPropertyStats(): Promise<PropertyStats> {
  try {
    const { count: totalProperties } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })

    const { count: soldProperties } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('sold', true)

    const { count: totalInquiries } = await supabase
      .from('inquiries')
      .select('*', { count: 'exact', head: true })

    return {
      totalProperties: totalProperties || 0,
      soldProperties: soldProperties || 0,
      totalInquiries: totalInquiries || 0,
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
    return {
      totalProperties: 0,
      soldProperties: 0,
      totalInquiries: 0,
    }
  }
}

export async function fetchAllInquiries(): Promise<Inquiry[]> {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return []
  }
}

export async function createInquiry(inquiry: Omit<Inquiry, 'id' | 'created_at'>): Promise<Inquiry | null> {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([inquiry])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating inquiry:', error)
    return null
  }
}

export async function deleteInquiry(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting inquiry:', error)
    return false
  }
}
