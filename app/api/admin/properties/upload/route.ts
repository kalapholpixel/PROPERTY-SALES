import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isUserAdmin } from '@/lib/auth/admin'

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

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert File to Buffer
    const buffer = await file.arrayBuffer()
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `properties/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('property-images')
      .upload(filePath, buffer, {
        contentType: file.type,
      })

    if (uploadError) {
      throw uploadError
    }

    const { data } = supabase.storage
      .from('property-images')
      .getPublicUrl(filePath)

    return NextResponse.json(
      { success: true, url: data.publicUrl },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to upload image' },
      { status: 500 }
    )
  }
}
