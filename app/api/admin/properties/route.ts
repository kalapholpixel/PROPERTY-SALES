import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isUserAdmin } from '@/lib/auth/admin'
import type { Property } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check if user is authenticated and is an admin
    const isAdmin = await isUserAdmin(supabase)
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const property: Omit<Property, 'id' | 'created_at' | 'updated_at'> = body

    // Validate required fields
    if (!property.title || !property.description || property.price === undefined || !property.location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('properties')
      .insert([property])
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create property' },
      { status: 500 }
    )
  }
}

export async function GET(_request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check if user is authenticated and is an admin
    const isAdmin = await isUserAdmin(supabase)
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      )
    }

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}
