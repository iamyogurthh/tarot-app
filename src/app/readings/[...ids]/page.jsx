'use client'
import React, { useState, useEffect } from 'react'
import { use } from 'react'
import { useTarot } from '@/context/TarotContext'
import { useForm } from '@/context/FormContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { formatBirthDate, formatDateTime } from '@/utils/utils.client'
import BackBt from '@/components/BackBt'
import FullScreenLoader from '@/components/FullScreenLoader'

const Readings = ({ params }) => {
  const resolvedParams = React.use(params)
  const [user_id, reading_id] = resolvedParams.ids

  const [userData, setUserData] = useState(null)
  const [cardList, setCardList] = useState([])
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    //  Fetch API data
    async function fetchDataById(user_Id, reading_Id) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/readings/${user_Id}/${reading_Id}`
        )
        if (!res.ok) throw new Error('Failed to fetch reading data')
        const data = await res.json()

        //  Assume API returns [userData, ...cards]
        const [userInfo, ...cards] = data
        setUserData(userInfo)
        setCardList(cards)
      } catch (error) {
        console.error(error)
        setError(error.message)
      }
    }

    if (user_id && reading_id) {
      fetchDataById(user_id, reading_id)
    }
  }, [user_id, reading_id])

  //  Loading and error states
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold text-red-600">
        Error: {error}
      </div>
    )
  }

  if (!userData) {
    return <FullScreenLoader />
  }

  //  Card navigation
  const handleNext = () => {
    if (currentIndex < cardList.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const card = cardList[currentIndex]
  const topic = userData.topic || 'love'
  const currentQuestion = card?.[topic] || {}

  return (
    <div className="min-h-screen pt-0 px-2 sm:px-8 md:px-12 lg:px-16 max-w-screen-xl mx-auto flex flex-col">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <BackBt />
      </div>

      {/* User Info Section */}
      <div className="flex pt-[16px] items-center justify-start flex-wrap gap-4">
        {/* Zodiac */}
        <div className="h-[153px] bg-[#ffffff8b] py-[16px] px-[48px] rounded-2xl font-semibold shadow-md text-center border-2 border-[#9798F5] flex flex-col items-center justify-center">
          <p className="mb-[8px]">Your Zodiac Sign</p>
          <Image
            src={`/zodiac_images/${userData.zodiac}.svg`}
            height={64}
            width={64}
            alt={'Zodiac'}
          />
        </div>

        {/* Numerology */}
        <div className="h-[153px] bg-[#ffffff8b] py-[16px] px-[32px] rounded-2xl font-semibold shadow-md text-center border-2 border-[#9798F5] flex flex-col items-center justify-center">
          <p>Your Numerology Value</p>
          <p className="font-bold text-[60px] text-[#9798F5]">
            {userData.numerology}
          </p>
        </div>

        {/* Account Info */}
        <div className="h-[153px] bg-[#ffffff8b] py-[16px] px-[16px] rounded-2xl font-semibold shadow-md text-center border-2 border-[#9798F5] flex flex-col items-center justify-center">
          <table>
            <tbody className="text-left">
              <tr>
                <td className="pr-[8px] pb-[8px]">Account name:</td>
                <td className="pb-[8px]">{userData.user_name}</td>
              </tr>
              <tr>
                <td className="pr-[8px] pb-[8px]">Full name:</td>
                <td className="pb-[8px]">{userData.real_name}</td>
              </tr>
              <tr>
                <td className="pr-[8px] pb-[8px]">Birthday:</td>
                <td className="pb-[8px]">{formatBirthDate(userData.dob)}</td>
              </tr>
              <tr>
                <td className="pr-[8px] pb-[8px]">Major:</td>
                <td className="pb-[8px]">{userData.major}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Reading Info */}
        <div className="h-[153px] bg-[#ffffff8b] py-[16px] px-[16px] rounded-2xl font-semibold shadow-md text-center border-2 border-[#9798F5] flex flex-col items-center justify-center">
          <table>
            <tbody className="text-left">
              <tr>
                <td className="pr-[8px] pb-[8px]">Read at:</td>
                <td className="pb-[8px]">{formatDateTime(userData.read_at)}</td>
              </tr>
              <tr>
                <td className="pr-[8px] pb-[8px]">Category:</td>
                <td className="pb-[8px]">{userData.topic}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tarot Card Reading Section */}
      {card && (
        <div className="flex-grow mt-[16px] mb-6 bg-[#ffffff3f] rounded-[16px] border-2 border-[#9798F5] p-5 sm:p-8 md:p-10 shadow-xl relative flex flex-col justify-between">
          {/* Title */}
          <div className="flex items-center justify-center absolute top-[4px] z-50 left-0 right-0">
            <h3 className="bg-white text-center px-[80px] py-2 mt-3 rounded-[24px] border-2 shadow-md border-[#9798F5] text-dark_p font-bold text-lg">
              {card.name}
            </h3>
          </div>

          <div className="flex flex-col py-[80px] px-[40px] md:flex-row items-top justify-center gap-y-8 gap-x-16 w-full text-center">
            {/* Card Image */}
            <div className="flex flex-col items-center">
              <Image
                src={`/tarot_images/${card.image}`}
                alt={card.name}
                width={160}
                height={240}
                className="rounded-xl shadow-lg object-cover"
              />
              <h2 className="text-[24px] font-bold mt-4">{card.name}</h2>
            </div>

            {/* Meaning */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <h3 className="text-base sm:text-[24px] font-semibold text-black leading-relaxed">
                {currentQuestion?.question_text || 'မေးခွန်းမရှိပါ။'}
              </h3>
              <p className="text-sm sm:text-base text-black/80 leading-relaxed">
                {currentQuestion?.question_answer || 'အဖြေမရှိသေးပါ။'}
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
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
            disabled={currentIndex === cardList.length - 1}
            className="cursor-pointer absolute top-1/2 right-3 sm:right-4 transform -translate-y-1/2 hover:scale-110 transition disabled:opacity-30"
          >
            <Image
              src="/system_images/right.png"
              width={40}
              height={64}
              alt=">"
            />
          </button>

          {/* Pagination */}
          <div className="flex justify-center mt-4 gap-2">
            {cardList.map((_, i) => (
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
