import DashboardSideBar from '@/components/DashboardSideBar'
import FullScreenLoader from '@/components/FullScreenLoader'
import React, { Suspense } from 'react'

const layout = ({ children }) => {
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
