'use client'

import Banner from '@/components/Banner'
import ReuseableTable from '@/components/ReuseableTable'
import SearchBox from '@/components/SearchBox'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DeleteBtn from '@/components/DeleteBtn'
import { formatBirthDate } from '@/utils/utils.client'

const Page = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  console.log(data)

  // Fetch users with optional search keyword
  const fetchUsers = async (keyword = '') => {
    try {
      setLoading(true)

      const res = await fetch(
        `http://localhost:3000/api/admin?keyword=${keyword}`,
        { cache: 'no-store' }
      )

      if (!res.ok) throw new Error('Failed to fetch users')

      const json = await res.json()
      setData(json)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Load all users on mount
  useEffect(() => {
    fetchUsers()
  }, [])

  const columns = [
    {
      label: 'User Name',
      field: 'name',
      render: (row) => (
        <Link href={`/dashboard/${row.id}`} className="underline">
          {row.name}
        </Link>
      ),
    },
    {
      label: 'Real Name',
      field: 'real_name',
    },
    {
      label: 'Date of Birth',
      field: 'dob',
      render: (row) => <p>{formatBirthDate(row.dob)}</p>,
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
          <DeleteBtn endpoint="http://localhost:3000/api/users" id={row.id} />
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

      {/* CENTERED SEARCH BOX */}
      <div className="flex items-center justify-center w-full my-2">
        <SearchBox
          placeholder="Search users..."
          onSearch={(value) => fetchUsers(value)}
        />
      </div>

      <ReuseableTable columns={columns} data={data} rowKey="id" />
    </div>
  )
}

export default Page
