import ReuseableTable from '@/components/ReuseableTable'
import { userData } from '@/data/userData'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const History = () => {
  const columns = [
    {
      label: 'Name',
      field: 'name',
      render: (userData) => <Link href={'#'}>{userData.name}</Link>,
    },
    {
      label: 'Major',
      field: 'major',
    },
    {
      label: 'Date of Birth',
      field: 'dob',
    },
    {
      label: 'Date & Time',
      field: 'dateTime',
    },
    {
      label: 'Action',
      field: 'id',
      render: (userData) => (
        <div className="flex">
          <div className="mr-[40px] cursor-pointer font-bold">View Detail</div>
          <Image
            src={'/system_images/trash.png'}
            alt="trash"
            width={24}
            height={27}
            className="cursor-pointer"
          />
        </div>
      ),
    },
  ]

  return (
    <div className="w-full">
      <div className="flex flex-row  justify-center">
        <Link
          className="bg-[#9799f543] absolute top-[24px] left-[24px] px-[32px] py-[8px] rounded-[24px] font-bold shadow-lg text-dark_p"
          href={'/'}
        >
          Main Menu
        </Link>
      </div>
      <div className="flex justify-center mt-[80px]">
        <div className="flex items-center justify-center mb-[40px] flex-col">
          <form className="flex items-center relative " action={'/'}>
            <input
              type="text"
              placeholder="Search by name or major"
              className="w-[328px] bg-white py-[8px] pl-[16px]  border-2 border-[#9798F5] rounded-[24px] shadow-lg text-black font-semibold"
            />
            <div className="absolute right-[16px] top-[10px]">
              <button type="submit" className="cursor-pointer">
                <Image
                  src={'/system_images/search.png'}
                  width={22}
                  height={22}
                  alt="search"
                />
              </button>
            </div>
          </form>
          <div className="mt-[24px]">
            <ReuseableTable columns={columns} data={userData} rowKey="id" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default History
