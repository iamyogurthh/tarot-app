'use client'

import { useForm } from '@/context/FormContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const ChooseTopicPage = () => {
  const topicElements = [
    { label: 'အချစ်ရေး', img: '/system_images/love.jpg', value: 'love' },
    {
      label: 'ပညာရေး',
      img: '/system_images/education.jpg',
      value: 'education',
    },
    {
      label: 'ငွေရေးကြေးရေး',
      img: '/system_images/business.jpg',
      value: 'business',
    },
    { label: 'အထွေထွေ', img: '/system_images/general.jpg', value: 'general' },
  ]

  const router = useRouter()
  const { updateField } = useForm()

  const handleClick = (value) => {
    updateField('topic', value)
    router.push('/cardDeck')
  }

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

      {/* Topic Cards */}
      <div className="absolute flex justify-center gap-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-nowrap">
        {topicElements.map((item, index) => (
          <div
            key={index}
            className="group relative cursor-pointer animate-fade-in-up transition-all duration-500"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'both',
            }}
            onClick={() => handleClick(item.value)}
          >
            {/* Card with Image */}
            <div className="relative w-[227px] h-[370px] rounded-[24px] overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
              <Image
                src={item.img}
                alt={item.label}
                fill
                className="object-cover rounded-[24px] transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-[24px]">
                <span className="text-xl font-bold text-white drop-shadow-md">
                  Choose
                </span>
              </div>
            </div>

            {/* Label */}
            <div className="bg-white text-center py-2 mt-3 rounded-[24px] border-2 shadow-md border-[#9798F5] text-dark_p font-bold text-lg">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChooseTopicPage
