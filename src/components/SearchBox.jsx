import Image from 'next/image'
import React from 'react'

const SearchBox = () => {
  return (
    <div className="flex items-center justify-center ">
      <form className="flex items-center shadow-2xl rounded-[16px] relative">
        <input
          type="text"
          placeholder="Search by user name"
          className="w-[328px]  py-[8px] pl-[16px] border-2 border-[#9798F5]  rounded-[16px] bg-white focus:outline-none"
        />
        <Image
          src={'/system_images/search.png'}
          alt="search"
          width={24}
          height={24}
          className="absolute right-[16px] cursor-pointer"
        />
      </form>
    </div>
  )
}

export default SearchBox
