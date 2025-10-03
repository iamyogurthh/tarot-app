'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const sidebarElements = [
  {
    key: 'user_records',
    label: 'User Records',
    path: '/dashboard',
    img: '/system_images/users.png',
    activeImg: '/system_images/users-active.png',
    custom_w: 24,
    custom_h: 24,
  },
  {
    key: 'card_records',
    label: 'Card Records',
    path: '/dashboard/cardrecords',
    img: '/system_images/tarot_card_back.png',
    activeImg: '/system_images/tarot_card_back.png',
    custom_w: 22,
    custom_h: 32,
  },
  {
    key: 'c_and_q',
    label: 'Categories & Questions Records',
    path: '/dashboard/categoriesandquestions',
    img: '/system_images/question_circle.png',
    activeImg: '/system_images/question_circle-active.png',
    custom_w: 24,
    custom_h: 24,
  },
]

const DashboardSideBarItem = () => {
  const pathname = usePathname()

  return (
    <>
      {sidebarElements.map((item, index) => {
        const isActive = pathname === item.path
        return (
          <Link
            key={index}
            href={item.path}
            className={`rounded-[8px] px-4 py-2 flex items-center mb-[16px] ${
              isActive ? 'active' : 'hover:bg-[#9799f535]'
            }`}
          >
            <Image
              src={isActive ? item.activeImg : item.img}
              alt={item.label}
              width={item.custom_w}
              height={item.custom_h}
              className="mr-[37px]"
            />
            <p>{item.label}</p>
          </Link>
        )
      })}
    </>
  )
}

export default DashboardSideBarItem
