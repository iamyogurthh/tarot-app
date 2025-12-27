'use client'

import React, { useState, useEffect } from 'react'
import { useTarot } from '@/context/TarotContext'
import { useForm } from '@/context/FormContext'
import Image from 'next/image'
import MainMenuBtn from '@/components/MainMenuBtn'
import { useRouter } from 'next/navigation'

const Readings = () => {
  const { userSelectedTarotData } = useTarot()
  const { formData } = useForm()
  const [position, setPosition] = useState(0) // which selected card position we are on
  const router = useRouter()

  // Redirect if missing data
  useEffect(() => {
    if (
      !formData?.user_name ||
      !formData?.full_name ||
      !formData?.dob ||
      !userSelectedTarotData ||
      userSelectedTarotData.length === 0
    ) {
      router.push('/')
    }
  }, [formData, userSelectedTarotData, router])

  const topic = formData.topic
  const totalCards = userSelectedTarotData?.length || 0

  // clamp position so we never go out of bounds
  useEffect(() => {
    if (position < 0 && totalCards > 0) setPosition(0)
    if (position >= totalCards && totalCards > 0) setPosition(totalCards - 1)
  }, [position, totalCards])

  const currentCard = userSelectedTarotData?.[position]
  const cardTopicArray = currentCard?.[topic] || []

  // *** key logic: pick the question at the SAME index as the card position ***
  let currentQuestion = cardTopicArray?.[position]

  // fallback: try to find question with question_id = 19 + position
  if (!currentQuestion) {
    const possibleId = 19 + position
    currentQuestion = cardTopicArray?.find((q) => q.question_id === possibleId)
  }

  // final fallback: first question of that card's topic
  if (!currentQuestion) {
    currentQuestion = cardTopicArray?.[0] || {}
  }

  // compute totalQuestions (for pagination dots) from the first card's topic length (or current card if you prefer)
  const totalQuestions =
    userSelectedTarotData?.[0]?.[topic]?.length || cardTopicArray.length || 0

  // find index of currentQuestion inside this card's topic array (0..totalQuestions-1)
  let currentQuestionIndex = cardTopicArray.findIndex(
    (q) => q === currentQuestion
  )
  if (currentQuestionIndex === -1) currentQuestionIndex = 0

  // Navigation: move through cards; each step shows that card's question at the same index
  const handleNext = () => {
    if (position < totalCards - 1) {
      setPosition((p) => p + 1)
    }
  }

  const handlePrev = () => {
    if (position > 0) {
      setPosition((p) => p - 1)
    }
  }

  const atFirst = position === 0
  const atLast = position === Math.max(totalCards - 1, 0)

  return (
    <div className="min-h-screen pt-0 px-2 sm:px-8 md:px-12 lg:px-16 max-w-screen-xl mx-auto flex flex-col">
      <MainMenuBtn />

      {/* User Info Section (kept the same as your original) */}
      <div className="flex pt-[16px] items-center justify-start flex-wrap gap-4">
        <div className="h-[153px] bg-[#ffffff8b] py-[16px] px-[48px] rounded-2xl font-semibold shadow-md text-center border-2 border-[#9798F5] flex flex-col items-center justify-center">
          <p className="mb-[8px]">Your Zodiac Sign</p>
          <Image
            src={`/zodiac_images/${formData.zodiac}.svg`}
            height={64}
            width={64}
            alt={'Zodiac'}
          />
        </div>

        <div className="h-[153px] bg-[#ffffff8b] py-[16px] px-[32px] rounded-2xl font-semibold shadow-md text-center border-2 border-[#9798F5] flex flex-col items-center justify-center">
          <p>Your Numerology Value</p>
          <p className="font-bold text-[60px] text-[#9798F5]">
            {formData.numerology}
          </p>
        </div>

        <div className="h-[153px] bg-[#ffffff8b] py-[16px] px-[32px] rounded-2xl font-semibold shadow-md text-center border-2 border-[#9798F5] flex flex-col items-center justify-center">
          <table>
            <tbody className="text-left">
              <tr>
                <td className="pr-[8px] pb-[8px]">User name:</td>
                <td className="pb-[8px]">{formData.user_name}</td>
              </tr>
              <tr>
                <td className="pr-[8px] pb-[8px]">Full name:</td>
                <td className="pb-[8px]">{formData.full_name}</td>
              </tr>
              <tr>
                <td className="pr-[8px] pb-[8px]">Birthday:</td>
                <td className="pb-[8px]">{formData.dob}</td>
              </tr>
              <tr>
                <td className="pr-[8px] pb-[8px]">Major:</td>
                <td className="pb-[8px] break-words w-auto max-w-[200px]">
                  {formData.major}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="h-[153px] bg-[#ffffff8b] py-[16px] px-[16px] rounded-2xl font-semibold shadow-md text-center border-2 border-[#9798F5] flex flex-col items-center justify-center">
          <table>
            <tbody className="text-left">
              <tr>
                <td className="pr-[8px] pb-[8px]">Read at:</td>
                <td className="pb-[8px]">
                  {new Date().toLocaleString('en-GB')}
                </td>
              </tr>
              <tr>
                <td className="pr-[8px] pb-[8px]">Category:</td>
                <td className="pb-[8px]">{formData.topic}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Card Reading */}
      {currentCard && (
        <div className="flex-grow mt-[16px] mb-6 bg-[#ffffff3f] rounded-[16px] border-2 border-[#9798F5] p-5 sm:p-8 md:p-10 shadow-xl relative flex flex-col justify-between">
          {/* Title */}
          <div className="flex items-center justify-center absolute top-[4px] z-50 left-0 right-0">
            <h3 className="bg-white text-center px-[80px] py-2 mt-3 rounded-[24px] border-2 shadow-md border-[#9798F5] text-dark_p font-bold text-lg">
              {currentCard.name}
            </h3>
          </div>

          <div className="flex flex-col py-[80px] px-[40px] md:flex-row items-top justify-center gap-y-8 gap-x-16 w-full text-center">
            {/* Card Image */}
            <div className="flex flex-col items-center">
              <Image
                src={`/tarot_images/${currentCard.image}`}
                alt={currentCard.name}
                width={160}
                height={240}
                className="rounded-xl shadow-lg object-cover"
              />
              <h2 className="text-[24px] font-bold mt-4">{currentCard.name}</h2>
            </div>

            {/* Meaning Section */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <h3 className="text-base sm:text-[24px] font-semibold text-black leading-relaxed">
                {currentQuestion?.question_text || 'မေးခွန်းမရှိပါ။'}
              </h3>
              <p className="text-sm sm:text-base text-black/80 leading-relaxed">
                {currentQuestion?.question_answer || 'အဖြေမရှိသေးပါ။'}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            disabled={atFirst}
            className="cursor-pointer absolute top-1/2 left-3 sm:left-4 transform -translate-y-1/2 hover:scale-110 transition disabled:opacity-30"
          >
            <Image
              src="/system_images/left.png"
              width={40}
              height={64}
              alt="<"
            />
          </button>

          <button
            onClick={handleNext}
            disabled={atLast}
            className="cursor-pointer absolute top-1/2 right-3 sm:right-4 transform -translate-y-1/2 hover:scale-110 transition disabled:opacity-30"
          >
            <Image
              src="/system_images/right.png"
              width={40}
              height={64}
              alt=">"
            />
          </button>

          {/* Pagination for questions (6 dots total) */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <span
                key={i}
                className={`w-6 h-2 rounded-full transition-all duration-300 ${
                  i === currentQuestionIndex ? 'bg-[#8854d0]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Readings
