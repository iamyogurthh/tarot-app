import Banner from '@/components/Banner'
import ReuseableTable from '@/components/ReuseableTable'
import SearchBox from '@/components/SearchBox'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { tarotData } from '@/data/tarotData'

const columns = [
  {
    label: 'Card Image',
    field: 'img',
    render: (tarotData) => (
      <Link href={`/dashboard/cardrecords/${tarotData.id}`}>
        <Image
          src={tarotData.img || null}
          width={64}
          height={111}
          alt={tarotData.card_name}
        />
      </Link>
    ),
  },
  {
    label: 'Card Name',
    field: 'card_name',
  },
  {
    label: 'Zodiac Sign',
    field: 'zodiac',
  },
  {
    label: 'Numerology Value',
    field: 'numerology',
  },
  {
    label: 'Action',
    field: 'id',
    render: (tarotData) => (
      <div className="flex">
        <Link
          href={`/dashboard/cardrecords/${tarotData.id}`}
          className="mr-[40px] cursor-pointer underline font-semibold
          hover:text-[#9798F5]"
        >
          {' '}
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
        label={'Total Card Records'}
        img={'/system_images/tarots.png'}
        value={'78'}
      />
      <div className="flex items-center justify-between w-full mt-[8px] mb-[8px]">
        <SearchBox />
        <Link
          href={'/dashboard/cardrecords/addNewCard'}
          className="primary_btn"
        >
          Add New Tarot Card
        </Link>
      </div>
      <div className="">
        <ReuseableTable columns={columns} data={tarotData} rowKey="id" />
      </div>
    </div>
  )
}

export default page
