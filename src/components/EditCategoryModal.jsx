'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const EditCategoryModal = ({
  setIsEditCategoryOpen,
  categoryId,
  onSuccess,
}) => {
  const [categoryName, setCategoryName] = useState('')
  const [categoryImage, setCategoryImage] = useState(null) // for new image preview
  const [existingImage, setExistingImage] = useState('') // for current image URL

  // Fetch current category data
  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/categories/${categoryId}`
        )
        if (!res.ok) throw new Error('Failed to fetch category')
        const data = await res.json()
        setCategoryName(data.name)
        setExistingImage(data.image) // assuming your API returns image path
      } catch (err) {
        console.error(err)
      }
    }
    fetchCategory()
  }, [categoryId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', categoryName)
      if (categoryImage) formData.append('image', categoryImage)

      const res = await fetch(
        `http://localhost:3000/api/categories/${categoryId}`,
        {
          method: 'PUT',
          body: formData,
        }
      )

      if (!res.ok) throw new Error('Failed to update category')
      const data = await res.json()
      alert(data.message)
      onSuccess()
      setIsEditCategoryOpen(false)
    } catch (err) {
      console.error(err)
      alert('Error updating category')
    }
  }

  return (
    <div className="bg-[#00000091] fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center p-[40px]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-[16px] py-[16px] px-[40px] relative w-[400px]"
      >
        <Image
          src="/system_images/close.png"
          alt="close"
          width={40}
          height={40}
          className="absolute top-[8px] right-[8px] cursor-pointer"
          onClick={() => setIsEditCategoryOpen(false)}
        />
        <h1 className="text-[20px] text-center text_primary font-semibold mb-4">
          Edit Category
        </h1>

        {/* Category Image */}
        <div className="flex flex-col mb-4 items-center">
          <label htmlFor="img" className="mb-2 font-semibold">
            Category Image
          </label>
          <label className="cursor-pointer">
            <img
              src={
                categoryImage
                  ? URL.createObjectURL(categoryImage)
                  : existingImage
                  ? `/tarot_images/${existingImage}`
                  : '/system_images/tarot_card_back.png'
              }
              alt="Category Preview"
              className="w-[227px] h-[370px] object-cover rounded-lg"
            />
            <input
              type="file"
              id="img"
              accept="image/*"
              hidden
              onChange={(e) => setCategoryImage(e.target.files[0])}
            />
          </label>
        </div>

        {/* Category Name */}
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="mb-2 font-semibold">
            Category Name
          </label>
          <input
            id="name"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border-2 border-[#9798F5] rounded-[16px] w-full p-2 focus:outline-none"
          />
        </div>

        <div className="flex justify-center mt-4">
          <button type="submit" className="primary_btn">
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditCategoryModal
