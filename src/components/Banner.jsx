import Image from 'next/image'
import React from 'react'

const Banner = ({ label, img, value }) => {
  return (
    <div className="bg-white border-2 border-[#CBCCFA] rounded-[16px] px-[24px] pt-[8px] pb-[18px] shadow-lg w-[242px]">
      <div className="flex mb-[16px]">
        <Image
          src={img}
          alt={label}
          width={24}
          height={24}
          className="mr-[8px]"
        />
        <p>{label}</p>
      </div>
      <div className="font-bold text-center">{value}</div>
    </div>
  )
}

export default Banner
