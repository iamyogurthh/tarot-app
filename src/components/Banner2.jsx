import React from 'react'
import Image from 'next/image'

const Banner2 = ({ label, img, value }) => {
  return (
    <div className=" bg-white border-2 border-[#CBCCFA] rounded-[16px]  py-[8px] shadow-lg w-[242px] flex flex-col justify-center items-center">
      <p>{label}</p>
      {img && (
        <Image
          src={img}
          alt={label}
          width={84}
          height={84}
          className="mt-[8px]"
        />
      )}
      {value && <p className="text-[64px] text-[#9798F5] font-bold">{value}</p>}
    </div>
  )
}

export default Banner2
