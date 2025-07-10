'use client'
import React from 'react'
import Link from 'next/link'
import { useForm } from '@/context/FormContext'
import { useTarot } from '@/context/TarotContext'

const MainMenuBtn = () => {
  const { clearForm } = useForm()
  const { setUserSelectedTarotData } = useTarot()
  return (
    <div>
      <Link
        href="/"
        className="bg-[#9799f543] absolute top-[24px] left-[24px] px-[32px] py-[8px] rounded-[24px] font-bold shadow-lg text-dark_p"
        onClick={() => {
          clearForm(), setUserSelectedTarotData([])
        }}
      >
        Main Menu
      </Link>
    </div>
  )
}

export default MainMenuBtn
