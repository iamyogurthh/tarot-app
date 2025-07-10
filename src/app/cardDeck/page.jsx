'use client'

import { useForm } from '@/context/FormContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
  const { formData, clearForm } = useForm()
  const [hovered, setHovered] = useState(false)
  const router = useRouter()

  console.log(formData)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Card stack clicked!')
    router.push('/cardSelection')
  }

  const cardCount = 4
  const angleStep = 3 // degrees

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center relative">
      {/* Back Button */}
      <Link
        href="/"
        className="bg-[#9799f543] absolute top-[24px] left-[24px] px-[32px] py-[8px] rounded-[24px] font-bold shadow-lg text-dark_p"
        onClick={() => clearForm()}
      >
        Back To Main Menu
      </Link>

      {/* Title */}
      <h1 className="text-[32px] font-semibold text-[#9798F5] mb-6 animate-float">
        Click the card stack
      </h1>

      {/* Form with Animated Card Stack */}
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="relative w-[180px] h-[270px] cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {Array.from({ length: cardCount }).map((_, i) => {
            const rotate = angleStep * (i - (cardCount - 1) / 2) // symmetrical fan
            const zIndex = 10 + i
            const translateY = hovered ? -i * 2 : 0

            return (
              <Image
                key={i}
                src="/system_images/tarot_card_back.png"
                alt={`Card ${i}`}
                width={180}
                height={270}
                className="absolute top-0 left-0 transition-all duration-300"
                style={{
                  transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
                  zIndex,
                }}
              />
            )
          })}
        </button>
      </form>
    </div>
  )
}

export default Page
