import BackBt from '@/components/BackBt'
import Banner2 from '@/components/Banner2'
import Banner3 from '@/components/Banner3'
import ReuseableTable from '@/components/ReuseableTable'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatBirthDate, formatDateTime } from '@/utils/utils.client'
import DeleteBtn from '@/components/DeleteBtn'

const page = async ({ params }) => {
  const { userId } = await params

  let data = []
  let userData = {}
  try {
    const [res1, res2] = await Promise.all([
      fetch(`http://localhost:3000/api/readings/${userId}`, {
        cache: 'no-store', // ensure fresh data
      }),
      fetch(` http://localhost:3000/api/users/${userId}`),
    ])
    data = await res1.json()
    userData = await res2.json()
  } catch (error) {
    console.error('Error fetching readings:', error)
  }

  const rowsElements = [
    { label: 'User Name:', value: userData.name },
    { label: 'Full Name:', value: userData.real_name },
    { label: 'Birthday:', value: formatBirthDate(userData.dob) },
  ]

  const columns = [
    {
      label: 'Record ID',
      field: 'reading_id',
    },
    {
      label: 'Full Name',
      field: 'full_name',
    },
    {
      label: 'Date of Birth',
      field: 'reading_user_dob',
      render: (row) => formatBirthDate(row.reading_user_dob),
    },
    {
      label: 'Major',
      field: 'major',
    },
    {
      label: 'Topic',
      field: 'topic',
    },
    {
      label: 'Read At',
      field: 'read_at',
      render: (row) => formatDateTime(row.read_at),
    },
    {
      label: 'Action',
      field: 'reading_id',
      render: (row) => (
        <div className="flex">
          <Link
            href={`/readings/${userId}/${row.reading_id}`}
            className="mr-[40px] cursor-pointer underline font-semibold hover:text-[#9798F5] "
          >
            View Detail
          </Link>
          <div>
            <DeleteBtn
              endpoint="http://localhost:3000/api/readings"
              id={row.reading_id}
            />
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="p-[8px]">
      <div className="flex justify-end">
        <BackBt />
      </div>

      <div className="flex justify-start gap-4">
        <Banner3 rows={rowsElements} />
      </div>

      <div className="mt-[8px]">
        <p className="text-[#654597] font-bold underline mb-2">Tarot Record</p>
        <ReuseableTable columns={columns} data={data} rowKey={'reading_id'} />
      </div>
    </div>
  )
}

export default page
