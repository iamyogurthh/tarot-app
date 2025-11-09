'use client'
import React, { useState, useEffect } from 'react'

const AddNewQuestionModal = ({
  categoryId,
  setIsAddQuestionModalOpen,
  onSuccess,
  existingQuestions = [],
}) => {
  const [questionText, setQuestionText] = useState('')
  const [nextQuestionNo, setNextQuestionNo] = useState(1)

  // Determine next question number automatically
  useEffect(() => {
    if (existingQuestions.length > 0) {
      const maxNo = Math.max(
        ...existingQuestions.map((q) => Number(q.question_no))
      )
      setNextQuestionNo(maxNo + 1)
    } else {
      setNextQuestionNo(1)
    }
  }, [existingQuestions])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!questionText.trim()) {
      alert('Question text cannot be empty')
      return
    }

    try {
      const formData = new FormData()
      formData.append('category_id', categoryId)
      formData.append('question_no', nextQuestionNo)
      formData.append('question_text', questionText)

      const res = await fetch('http://localhost:3000/api/questions', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Failed to add question')
      const data = await res.json()
      alert(data.message || 'Question added successfully')
      onSuccess()
      setIsAddQuestionModalOpen(false)
    } catch (err) {
      console.error(err)
      alert('Error adding question')
    }
  }

  return (
    <div className="bg-[#00000091] fixed inset-0 z-50 flex items-center justify-center p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-[16px] py-6 px-10 relative w-[400px]"
      >
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 text-xl font-bold"
          onClick={() => setIsAddQuestionModalOpen(false)}
        >
          ×
        </button>

        <h1 className="text-[20px] text-center font-semibold mb-4">
          Add New Question
        </h1>

        <label className="font-semibold mb-2 block">
          Question No: {nextQuestionNo}
        </label>
        <textarea
          placeholder="Enter question text..."
          className="w-full border-2 border-[#9798F5] rounded-[12px] p-2 focus:outline-none"
          rows={4}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />

        <div className="flex justify-center mt-4">
          <button type="submit" className="primary_btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddNewQuestionModal
