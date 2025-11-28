'use client'

import Banner from '@/components/Banner'
import ReuseableTable from '@/components/ReuseableTable'
import SearchBox from '@/components/SearchBox'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const Page = () => {
  const [cardData, setCardData] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch cards (with optional search)
  const fetchCards = async (search = '') => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/cards?keyword=${search}`
      )
      if (!res.ok) throw new Error('Failed to fetch cards')
      const data = await res.json()
      setCardData(data)
    } catch (error) {
      console.log(error)
    }
  }

  // Load all cards on mount
  useEffect(() => {
    fetchCards()
  }, [])

  // Delete a card
  const handleDeleteCard = async (id) => {
    if (!confirm('Are you sure you want to delete this card?')) return

    try {
      setLoading(true)
      const res = await fetch(`http://localhost:3000/api/cards/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete card')

      alert('Card deleted successfully')
      fetchCards()
    } catch (error) {
      console.error(error)
      alert('Error deleting card')
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { label: 'No', render: (row) => <span>{row.id}</span> },

    {
      label: 'Card Image',
      field: 'image',
      render: (row) => (
        <Link href={`/dashboard/cardrecords/${row.id}`}>
          <Image
            src={
              `/tarot_images/${row.image}` ||
              '/system_images/tarot_card_back.png'
            }
            width={64}
            height={111}
            alt={row.name}
          />
        </Link>
      ),
    },

    {
      label: 'Card Name',
      field: 'name',
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
      render: (row) => (
        <div className="flex items-center gap-4">
          <Link
            href={`/dashboard/cardrecords/${row.id}`}
            className="underline font-semibold hover:text-[#9798F5]"
          >
            View Detail
          </Link>

          <Link
            href={`/dashboard/cardrecords/editCard?id=${row.id}`}
            className="underline font-semibold hover:text-[#9798F5]"
          >
            Edit Card
          </Link>

          <button onClick={() => handleDeleteCard(row.id)}>
            <Image
              src={'/system_images/trash.png'}
              alt="trash"
              width={24}
              height={27}
              className="cursor-pointer"
            />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-[8px] h-full w-full">
      <Banner
        label={'Total Card Records'}
        img={'/system_images/tarots.png'}
        value={cardData.length}
      />

      <div className="flex items-center justify-between w-full mt-[8px] mb-[8px]">
        <SearchBox
          placeholder="Type to search cards"
          onSearch={(value) => fetchCards(value)}
        />

        <Link
          href={'/dashboard/cardrecords/addNewCard'}
          className="primary_btn"
        >
          Add New Tarot Card
        </Link>
      </div>

      <div>
        <ReuseableTable columns={columns} data={cardData} rowKey="id" />
      </div>
    </div>
  )
}

export default Page
