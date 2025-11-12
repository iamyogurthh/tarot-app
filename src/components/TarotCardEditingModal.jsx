'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const TarotCardEditingModal = ({
  setIsModalOpen,
  category,
  categoryId,
  cardId,
  editingAnswer,
  onUpdated,
}) => {
  const [answer, setAnswer] = useState(editingAnswer.answer)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('card_id', cardId)
      formData.append('question_id', editingAnswer.question_id)
      formData.append('category_id', categoryId)
      formData.append('question_answer', answer)

      let res

      if (editingAnswer.key) {
        // Meaning exists → update
        res = await fetch(
          `http://localhost:3000/api/meanings/${editingAnswer.key}`,
          { method: 'PUT', body: formData }
        )
      } else {
        // Meaning does not exist → create
        res = await fetch('http://localhost:3000/api/meanings', {
          method: 'POST',
          body: formData,
        })
      }

      const data = await res.json()
      if (res.ok) {
        alert(data.message || 'Successfully saved!')
        onUpdated?.() // Refresh parent component
        setIsModalOpen(false)
      } else {
        alert(data.message || 'Failed to save.')
      }
    } catch (err) {
      console.error('Save error:', err)
      alert('Something went wrong.')
    } finally {
      router.refresh()
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#00000091] fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center p-[40px]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-[16px] p-[16px] relative w-full max-w-[70%]"
      >
        <Image
          src={'/system_images/close.png'}
          alt="close"
          width={40}
          height={40}
          className="absolute top-[8px] right-[8px] cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        />
        <h1 className="text-[20px] text-center text_primary font-semibold">
          Editing
        </h1>
        <p className="text_primary mb-[8px]">
          Category:{' '}
          <span className="text-black font-semibold">{category} </span>
        </p>

        <div className="mb-[8px]">
          <span className="font-bold mr-2">Question:</span>
          <span>{editingAnswer.question}</span>
        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border-2 border-[#9798F5] rounded-[16px] w-full h-[189px] p-2 mb-2 resize-none text-left align-top"
        ></textarea>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="primary_btn disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Submit Edited'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TarotCardEditingModal
