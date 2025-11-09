'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const EditQuestionModal = ({
  setIsEditModalOpen,
  categoryId,
  editingQuestion,
  onSuccess, // optional callback to refresh questions after update
}) => {
  const [category, setCategory] = useState('')
  const [questionText, setQuestionText] = useState(
    editingQuestion.question_text
  )

  // Fetch category info
  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/categories/${categoryId}`
        )
        if (!res.ok) throw new Error('Failed to fetch category')
        const data = await res.json()
        setCategory(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchCategory()
  }, [categoryId])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('category_id', categoryId)
      formData.append('question_no', editingQuestion.question_no)
      formData.append('question_text', questionText)

      const res = await fetch(
        `http://localhost:3000/api/questions/${editingQuestion.id}`,
        {
          method: 'PUT',
          body: formData,
        }
      )
      if (!res.ok) throw new Error('Failed to update question')

      const data = await res.json()
      alert(data.message || 'Question updated successfully')

      if (onSuccess) onSuccess() // Refresh parent component's questions
      setIsEditModalOpen(false)
    } catch (err) {
      console.error(err)
      alert('Error updating question')
    }
  }

  return (
    <div className="bg-[#00000091] fixed inset-0 z-50 flex items-center justify-center p-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-[16px] p-6 relative w-[50%]"
      >
        <Image
          src={'/system_images/close.png'}
          alt="close"
          width={40}
          height={40}
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => setIsEditModalOpen(false)}
        />

        <h1 className="text-[20px] text-center text_primary font-semibold mb-2">
          Editing Question
        </h1>

        <p className="text-center mb-4">
          Category: <span className="font-bold">{category.name}</span>
        </p>

        <label className="mb-2 font-semibold">
          Question {editingQuestion.question_no}:
        </label>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="border-2 border-[#9798F5] rounded-[16px] w-full h-[189px] p-2 mb-4 resize-none"
        />

        <div className="flex justify-center">
          <button type="submit" className="primary_btn">
            Update Question
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditQuestionModal
