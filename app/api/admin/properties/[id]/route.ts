import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isUserAdmin } from '@/lib/auth/admin'
import type { Property } from '@/lib/types'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Check if user is authenticated and is an admin
    const isAdmin = await isUserAdmin(supabase)
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      )
    }

    const updates = await request.json() as Partial<Property>

    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error updating property:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update property' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Check if user is authenticated and is an admin
    const isAdmin = await isUserAdmin(supabase)
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      )
    }

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error deleting property:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete property' },
      { status: 500 }
    )
  }
}
