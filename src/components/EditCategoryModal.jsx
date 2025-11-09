'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const EditCategoryModal = ({
  setIsEditCategoryOpen,
  categoryId,
  onSuccess,
}) => {
  const [categoryName, setCategoryName] = useState('')

  // Fetch current category name
  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/categories/${categoryId}`
        )
        if (!res.ok) throw new Error('Failed to fetch category')
        const data = await res.json()
        setCategoryName(data.name)
      } catch (err) {
        console.error(err)
      }
    }
    fetchCategory()
  }, [categoryId])

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', categoryName)

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

        <div className="flex flex-col">
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
