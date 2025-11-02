'use client'

import { useForm } from '@/context/FormContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import FullScreenLoader from '@/components/FullScreenLoader'
import { useTarot } from '@/context/TarotContext'

const Page = () => {
  const { formData, clearForm } = useForm()
  const [hovered, setHovered] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { setTarotsForSelection } = useTarot()

  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('topic', formData.topic)
      formDataToSend.append('user_id', formData.user_id)
      formDataToSend.append('real_name', formData.full_name)
      formDataToSend.append('dob', formData.dob)
      formDataToSend.append('major', formData.major)

      if (
        !formData.topic ||
        !formData.user_name ||
        !formData.full_name ||
        !formData.dob ||
        !formData.major
      ) {
        console.error('Form data incomplete')
        return
      }

      const res = await fetch(`http://localhost:3000/api/users`, {
        method: 'POST',
        body: formDataToSend,
      })

      if (!res.ok) {
        setIsSubmitting(false)
        throw new Error('Failed to create user')
      } else {
        const data = await res.json()
        console.log('Return from server 10 cards: ' + data)
        setTarotsForSelection(data)

        router.push('/cardSelection')
      }
    } catch (error) {
      console.log('Error: ' + error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitting) return <FullScreenLoader text="Fetching data..." />

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
