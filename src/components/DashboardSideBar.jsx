import React from 'react'
import DashboardSideBarItem from './DashboardSideBarItem'
import Link from 'next/link'

const DashboardSideBar = () => {
  return (
    <div className="bg-white fixed top-0 bottom-0 w-[240px] shadow-md px-[24px] py-[24px] flex flex-col justify-between ">
      <div className="flex flex-col">
        <h1 className="text-[32px] font-bold">Tarot</h1>
        <span className="font-bold">Admin Dashbaord</span>
        <span className="border-[#D1D1D1] border-1 mt-[24px] mb-[16px] "></span>
        <DashboardSideBarItem />
      </div>
      <div className="flex flex-col">
        <span className="border-[#D1D1D1] border-1 mt-[24px] mb-[16px] "></span>
        <Link
          href={'/'}
          className="text-center border-[#9798F5] border-2 shadow-md py-[10px] rounded-[8px] hover:bg-[#9798F5] hover:text-white cursor-pointer"
        >
          Back To Main Menu
        </Link>
      </div>
    </div>
  )
}

export default DashboardSideBar
