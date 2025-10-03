'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackBt = () => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.back()}
      className="cursor-pointer bg-[#9799f577] px-[32px] py-[8px] rounded-[24px] font-bold shadow-lg text-dark_p"
    >
      Back
    </div>
  )
}

export default BackBt
