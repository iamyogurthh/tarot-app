'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const AddNewCategoryModal = ({ setIsAddModalOpen }) => {
  const [category, setCategory] = useState('')
  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('name', category)
      const res = await fetch(`http://localhost:3000/api/categories`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error('failed to add new category')
      const data = await res.json()
      console.log(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-[#00000091] fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center p-[40px]">
      <form
        className="bg-white rounded-[16px] py-[16px] px-[80px] relative"
        onSubmit={handleSubmit}
      >
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
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
            }}
          />
        </div>

        <div className="flex items-center justify-center mt-4">
          <button className="primary_btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddNewCategoryModal
