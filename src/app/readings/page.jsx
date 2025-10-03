'use client'
import React, { useState, useEffect } from 'react'
import { useTarot } from '@/context/TarotContext'
import { useForm } from '@/context/FormContext'
import Image from 'next/image'
import MainMenuBtn from '@/components/MainMenuBtn'
import { useRouter } from 'next/navigation'
import { questionData } from '@/data/questionData'

const Readings = () => {
  const { userSelectedTarotData } = useTarot()
  const { formData } = useForm()
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()
  const questions = questionData.find((item) => item.key === formData.topic)

  // Redirect if no form or tarot data
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

  const handleNext = () => {
    if (currentIndex < userSelectedTarotData.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const card = userSelectedTarotData[currentIndex]
  const questionKey = `q${currentIndex + 1}`
  const answer = card?.[formData.topic]?.[questionKey]

  return (
    <div className="min-h-screen pt-0 px-2 sm:px-8 md:px-12 lg:px-16 max-w-screen-xl mx-auto flex flex-col">
      <MainMenuBtn />
      {/* User Info */}
      <div className="flex pt-[16px] items-center justify-between ">
        <div className="h-[153px] bg-[#ffffff8b] py-[16px] px-[64px] rounded-2xl font-semibold shadow-md text-center w-full sm:w-auto border-2 border-[#9798F5] flex flex-col items-center justify-center">
          <p className="mb-[8px]">Your Zodiac Sign</p>
          <Image
            src={'/system_images/virgo.png'}
            height={64}
            width={64}
            alt="Virgo"
          />
        </div>
        <div className="h-[153px] bg-[#ffffff8b] py-[16px] px-[56px] rounded-2xl font-semibold shadow-md text-center w-full sm:w-auto border-2 border-[#9798F5] flex flex-col items-center justify-center">
          <p className="">Your Numerology Value</p>
          <p className="font-bold text-[60px] text-[#9798F5]">9</p>
        </div>
        <div className="h-[153px] bg-[#ffffff8b] py-[16px] px-[32px] rounded-2xl font-semibold shadow-md text-center w-full sm:w-auto border-2 border-[#9798F5] flex flex-col items-center justify-center">
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
                <td className="pb-[8px]">{formData.major}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="h-[153px] bg-[#ffffff8b] py-[16px] px-[56px] rounded-2xl font-semibold shadow-md text-center w-full sm:w-auto border-2 border-[#9798F5] flex flex-col items-center justify-center">
          <table>
            <tbody className="text-left">
              <tr>
                <td className="pr-[8px] pb-[8px]">Read at:</td>
                <td className="pb-[8px]">21.9.2025 11:00 AM</td>
              </tr>
              <tr>
                <td className="pr-[8px] pb-[8px]">Category:</td>
                <td className="pb-[8px]">{questions?.label}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Card Result */}
      {card && (
        <div className="flex-grow mt-[16px] mb-6 bg-[#ffffff3f] rounded-[16px] border-2 border-[#9798F5] p-5 sm:p-8 md:p-10 shadow-xl relative  flex flex-col justify-between max-h-[calc(100vh-200px)]">
          {/*Title*/}
          <div className="flex items-center justify-center absolute top-[4px] z-50 left-0 right-0">
            <h3 className="bg-white text-center px-[80px] py-2 mt-3 rounded-[24px] border-2 shadow-md border-[#9798F5] text-dark_p font-bold text-lg">
              {questions.label}
            </h3>
          </div>
          <div className="  flex flex-col py-[80px] px-[40px] md:flex-row items-top justify-center gap-y-8 gap-x-16 w-full  text-center">
            {/* Card Image */}
            <div className="flex flex-col items-center ">
              <Image
                src="/system_images/tarot_card_back.png" // Replace with dynamic image if needed
                alt={card.card_name}
                width={160}
                height={240}
                className="rounded-xl shadow-lg"
              />
              <h2 className="text-[24px] font-bold mt-4">{card.card_name}</h2>
            </div>

            {/* Card Meaning */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <h3 className="text-base sm:text-[24px] font-semibold text-black leading-relaxed">
                {`${
                  questions?.questions[`q${currentIndex + 1}`] ||
                  'မေးခွန်းမရှိပါ။'
                }`}
              </h3>
              <p className="text-sm sm:text-base text-black/80 leading-relaxed">
                {answer || 'အဖြေမရှိသေးပါ။'}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
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
            disabled={currentIndex === userSelectedTarotData.length - 1}
            className="cursor-pointer absolute top-1/2 right-3 sm:right-4 transform -translate-y-1/2 hover:scale-110 transition disabled:opacity-30"
          >
            <Image
              src="/system_images/right.png"
              width={40}
              height={64}
              alt=">"
            />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {userSelectedTarotData.map((_, i) => (
              <span
                key={i}
                className={`w-6 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-[#8854d0]' : 'bg-gray-300'
                }`}
              ></span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Readings
