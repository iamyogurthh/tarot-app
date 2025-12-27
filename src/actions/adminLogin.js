'use server'

import pool from '@/database/db'
import { cookies } from 'next/headers'

export async function adminLogin(username, password) {
  if (!username || !password) {
    return { error: 'Username and password are required' }
  }

  try {
    const [rows] = await pool.execute(
      `
      SELECT id, name, password, role
      FROM users
      WHERE name = ?
        AND role = 'admin'
      LIMIT 1
      `,
      [username]
    )

    if (rows.length === 0) {
      return { error: 'Invalid admin credentials' }
    }

    const admin = rows[0]

    //  Plain-text comparison
    if (admin.password !== password) {
      return { error: 'Invalid admin credentials' }
    }

    //  Set admin session cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_session', String(admin.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return { success: true }
  } catch (err) {
    console.error('Admin login error:', err)
    return { error: 'Server error. Please try again.' }
  }
}
