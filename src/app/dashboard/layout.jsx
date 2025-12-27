import DashboardSideBar from '@/components/DashboardSideBar'
import FullScreenLoader from '@/components/FullScreenLoader'
import React, { Suspense } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import pool from '@/database/db'

const layout = async ({ children }) => {
  const cookieStore = await cookies()
  const adminSession = await cookieStore.get('admin_session')

  // No session → go home
  if (!adminSession) {
    redirect('/')
  }

  const adminId = adminSession.value

  // Check admin role in DB
  const [rows] = await pool.execute(
    `SELECT role FROM users WHERE id = ? LIMIT 1`,
    [adminId]
  )

  if (rows.length === 0 || rows[0].role !== 'admin') {
    redirect('/')
  }

  // Admin confirmed
  return (
    <div className="flex">
      <DashboardSideBar />
      <Suspense fallback={<FullScreenLoader />}>
        <div className="ml-[240px] w-full">{children}</div>
      </Suspense>
    </div>
  )
}

export default layout
