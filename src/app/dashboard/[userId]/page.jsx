import BackBt from '@/components/BackBt'
import Banner2 from '@/components/Banner2'
import Banner3 from '@/components/Banner3'
import ReuseableTable from '@/components/ReuseableTable'
import { userData } from '@/data/userData'
import React from 'react'
import { userTarotedData } from '@/data/userTarotedData'
import Link from 'next/link'
import Image from 'next/image'

const columns = [
  {
    label: 'Record ID',
    field: 'id',
    render: (userTarotedData) => (
      <Link href={`/readings`}>{userTarotedData.id}</Link>
    ),
  },
  {
    label: 'Category',
    field: 'category',
  },
  {
    label: 'Read At',
    field: 'read_at',
  },
  {
    label: 'Action',
    field: 'id',
    render: (userTarotedData) => (
      <div className="flex">
        <Link
          href={`/readings/${userTarotedData.id}`}
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

const page = async ({ params }) => {
  const { userId } = await params
  const user = userData.find((u) => u.id === Number(userId)) // be aware of the id type
  const rowsElements = [
    {
      label: 'User Name:',
      value: user.user_name,
    },
    {
      label: 'Full Name:',
      value: user.full_name,
    },
    {
      label: 'Birthday:',
      value: user.dob,
    },
  ]

  return (
    <div className="p-[8px]">
      <div className="flex justify-end">
        <BackBt />
      </div>

      <div className="flex justify-start gap-4">
        <Banner2 label={'Your Zodiac Sign'} img={'/zodiac_images/virgo.png'} />
        <Banner2 label={'Your Numerology Value'} value={'9'} />
        <Banner3 rows={rowsElements} />
      </div>
      <div className="mt-[8px]">
        <p className="text-[#654597] font-bold underline mb-2">Tarot Record</p>
        <ReuseableTable
          columns={columns}
          data={userTarotedData}
          rowKey={'id'}
        />
      </div>
    </div>
  )
}

export default page
