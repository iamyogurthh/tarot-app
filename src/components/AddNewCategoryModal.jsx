'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const AddNewCategoryModal = ({ setIsAddModalOpen }) => {
  const [categoryName, setCategoryName] = useState('')
  const [categoryImage, setCategoryImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('name', categoryName)
      if (categoryImage) formData.append('image', categoryImage)

      const res = await fetch(`http://localhost:3000/api/categories`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Failed to add new category')
      const data = await res.json()
      console.log(data.message)
      setIsAddModalOpen(false) // close modal
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
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

        <div className="flex flex-col mb-4">
          <label htmlFor="img" className="mb-2 font-semibold">
            Category Image
          </label>
          <label className="cursor-pointer">
            <img
              src={
                categoryImage
                  ? URL.createObjectURL(categoryImage)
                  : '/system_images/tarot_card_back.png'
              }
              className="w-[227px] h-[370px] object-cover rounded-lg "
            />
            <input
              id="img"
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setCategoryImage(e.target.files[0])}
            />
          </label>
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="mb-2 font-semibold">
            Category Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-[328px] py-[8px] pl-[16px] border-2 border-[#9798F5] rounded-[16px] bg-white focus:outline-none shadow-lg"
            required
          />
        </div>

        <div className="flex items-center justify-center mt-4">
          <button type="submit" className="primary_btn" disabled={loading}>
            {loading ? 'Adding...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddNewCategoryModal
