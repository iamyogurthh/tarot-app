import Banner from '@/components/Banner'
import ReuseableTable from '@/components/ReuseableTable'
import SearchBox from '@/components/SearchBox'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { formatBirthDate } from '@/utils/utils.client'

const Page = async () => {
  let data = []

  try {
    const res = await fetch('http://localhost:3000/api/admin', {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    data = await res.json()
  } catch (err) {
    console.error('Error fetching data:', err)
  }

  const columns = [
    {
      label: 'User Name',
      field: 'name',
      render: (row) => <Link href={`/dashboard/${row.id}`}>{row.name}</Link>,
    },
    {
      label: 'Name',
      field: 'real_name',
    },

    {
      label: 'Date of Birth',
      field: 'dob',
      render: (row) => formatBirthDate(row.dob),
    },
    {
      label: 'Action',
      field: 'id',
      render: (row) => (
        <div className="flex items-center">
          <Link
            href={`/dashboard/${row.id}`}
            className="mr-4 cursor-pointer underline font-semibold hover:text-[#9798F5]"
          >
            View Detail
          </Link>
          <Image
            src="/system_images/trash.png"
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
    <div className="p-2 h-full w-full">
      <Banner
        label="Total Users"
        img="/system_images/users-banner.png"
        value={data.length}
      />
      <div className="flex items-center justify-center w-full my-2">
        <SearchBox />
      </div>
      <div>
        <ReuseableTable columns={columns} data={data} rowKey="id" />
      </div>
    </div>
  )
}

export default Page
