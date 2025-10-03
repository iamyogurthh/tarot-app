import DashboardSideBar from '@/components/DashboardSideBar'
import React from 'react'

const layout = ({ children }) => {
  return (
    <div className="flex">
      <DashboardSideBar />
      <div className="ml-[240px] w-full">{children}</div>
    </div>
  )
}

export default layout
