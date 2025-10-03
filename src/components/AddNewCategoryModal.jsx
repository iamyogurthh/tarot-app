'use client'
import Image from 'next/image'
import React from 'react'

const AddNewCategoryModal = ({ setIsAddModalOpen }) => {
  return (
    <div className="bg-[#00000091] fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center p-[40px]">
      <form className="bg-white rounded-[16px] py-[16px] px-[80px] relative">
        <Image
          src={'/system_images/close.png'}
          alt="close"
          width={40}
          height={40}
          className="absolute top-[8px] right-[8px] cursor-pointer"
          onClick={() => setIsAddModalOpen(false)}
        />
        <h1 className="text-[20px] text-center text_primary font-semibold mb-4">
          Adding New Category
        </h1>

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-4 font-semibold">
            Category Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter new category"
            className="w-[328px]  py-[8px] pl-[16px] border-2 border-[#9798F5]  rounded-[16px] bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-center mt-4">
          <button className="primary_btn">Submit </button>
        </div>
      </form>
    </div>
  )
}

export default AddNewCategoryModal
