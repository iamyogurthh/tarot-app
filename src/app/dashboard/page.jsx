import Banner from '@/components/Banner'
import ReuseableTable from '@/components/ReuseableTable'
import SearchBox from '@/components/SearchBox'
import { userData } from '@/data/userData'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const columns = [
  {
    label: 'User Name',
    field: 'user_name',
    render: (userData) => (
      <Link href={`/dashboard/${userData.id}`}>{userData.user_name}</Link>
    ),
  },
  {
    label: 'Name',
    field: 'full_name',
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
    label: 'Action',
    field: 'id',
    render: (userData) => (
      <div className="flex">
        <Link
          href={`/dashboard/${userData.id}`}
          className="mr-[40px] cursor-pointer underline font-semibold hover:text-[#9798F5]"
        >
          View Detail
        </Link>
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

const page = () => {
  return (
    <div className="p-[8px] h-full w-full ">
      <Banner
        label={'Total Users'}
        img={'/system_images/users-banner.png'}
        value={'5'}
      />
      <div className="flex items-center justify-center w-full mt-[8px] mb-[8px]">
        <SearchBox />
      </div>
      <div className="">
        <ReuseableTable columns={columns} data={userData} rowKey="id" />
      </div>
    </div>
  )
}

export default page
