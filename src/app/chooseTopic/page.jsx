'use client'

import { useForm } from '@/context/FormContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ChooseTopicPage = () => {
  const router = useRouter()
  const { updateField } = useForm()

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/categories')
        if (!res.ok) throw new Error('Failed to fetch categories')
        const data = await res.json()
        setCategories(data)
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleClick = (value) => {
    updateField('topic', value)
    router.push('/cardDeck')
  }

  if (loading) return <p className="text-center mt-10">Loading categories...</p>
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>

  return (
    <div className="px-[24px] py-[24px]">
      {/* Back Button */}
      <div>
        <Link
          href="/"
          className="bg-[#9799f543] px-[32px] py-[8px] rounded-[24px] font-bold shadow-lg text-dark_p"
        >
          Back
        </Link>
      </div>

      {/* Category Cards */}
      <div className="absolute flex justify-center gap-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-nowrap">
        {categories.map((cat, index) => (
          <div
            key={cat.id}
            className="group relative cursor-pointer animate-fade-in-up transition-all duration-500"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'both',
            }}
            onClick={() => handleClick(cat.name)}
          >
            {/* Card with Image Placeholder */}
            <div className="relative w-[227px] h-[370px] rounded-[24px] overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-[24px]">
                {/* Image placeholder, can replace with cat.image later */}
                <span className="text-gray-600 font-bold text-xl">
                  {cat.name}
                </span>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-[24px]">
                <span className="text-xl font-bold text-white drop-shadow-md">
                  Choose
                </span>
              </div>
            </div>

            {/* Label */}
            <div className="bg-white text-center py-2 mt-3 rounded-[24px] border-2 shadow-md border-[#9798F5] text-dark_p font-bold text-lg">
              {cat.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChooseTopicPage
