import { createUser, getUserByUserName } from '@/model/user'
import { getDataFromForm } from '@/utils/utils'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const formData = await req.formData()
    console.log('Received:', Object.fromEntries(formData.entries()))

    const { user_name, real_name, dob } = getDataFromForm(
      formData,
      'user_name',
      'real_name',
      'dob'
    )

    console.log('user_name', user_name)
    console.log('real_name', real_name)
    console.log('dob', dob)

    if (!user_name || !real_name || !dob) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const existingUser = await getUserByUserName(user_name)
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    const ok = await createUser(user_name, real_name, dob)
    if (!ok) {
      return NextResponse.json(
        { message: 'User cannot be created' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Registered successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in /api/register:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
