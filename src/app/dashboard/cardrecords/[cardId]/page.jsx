'use client'

import BackBt from '@/components/BackBt'
import TarotCardEditingModal from '@/components/TarotCardEditingModal'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const Page = () => {
  const { cardId } = useParams()
  const [tarot, setTarot] = useState(null)
  const [categoryList, setCategoryList] = useState([])
  const [questionList, setQuestionList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [category, setCategory] = useState(null)
  const [editingAnswer, setEditingAnswer] = useState({
    key: '',
    question: '',
    answer: '',
  })
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Fetch tarot card & category list once when cardId changes
  useEffect(() => {
    async function fetchCard() {
      try {
        const [cardRes, categoryRes] = await Promise.all([
          fetch(`http://localhost:3000/api/cards/${cardId}`),
          fetch(`http://localhost:3000/api/categories`),
        ])

        if (!cardRes.ok) throw new Error('Failed to fetch card')
        const cardData = await cardRes.json()
        setTarot(cardData)

        if (!categoryRes.ok) throw new Error('Failed to fetch categories')
        const categoryData = await categoryRes.json()
        setCategoryList(categoryData)

        // Default select the first category (if exists)
        if (categoryData.length > 0) {
          setCategory(categoryData[0].id)
          setSelectedCategory(categoryData[0])
        }
      } catch (err) {
        console.error('Error fetching card/categories:', err)
      }
    }

    if (cardId) fetchCard()
  }, [cardId])

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto'
  }, [isModalOpen])

  // Fetch questions whenever selected category changes
  useEffect(() => {
    if (!selectedCategory) return

    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/admin/questions/${selectedCategory.id}`
        )
        if (!res.ok) throw new Error('Failed to fetch questions')
        const data = await res.json()
        setQuestionList(data)
      } catch (err) {
        console.error('Error fetching questions:', err)
      }
    }

    fetchQuestions()
  }, [selectedCategory])

  console.log(selectedCategory)

  if (!tarot || categoryList.length === 0 || questionList.length === 0)
    return <div className="p-4">Loading...</div>

  return (
    <div className="p-2">
      {/* Modal */}
      {isModalOpen && (
        <TarotCardEditingModal
          setIsModalOpen={setIsModalOpen}
          category={selectedCategory.name}
          editingAnswer={editingAnswer}
        />
      )}

      <div className="flex items-center justify-end">
        <BackBt />
      </div>

      <div className="bg-white shadow-lg p-4 mt-2 rounded-[16px] border-2 border-[#9798F5] overflow-auto">
        {/* Card Info */}
        <h1 className="text-center font-bold text-[24px]">{tarot.name}</h1>
        <div className="flex justify-center mt-[16px]">
          <Image
            src={`/tarot_images/${tarot.image}`}
            width={128}
            height={294}
            alt={tarot.name}
          />
        </div>
        <div className="mt-4 mb-2 flex flex-col items-center">
          <p>
            <strong>Zodiac:</strong> {tarot.zodiac}
          </p>
          <p>
            <strong>Numerology:</strong> {tarot.numerology}
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex items-center justify-start my-[16px] flex-wrap">
          {categoryList.map((c) => (
            <button
              key={c.id}
              className={`mr-[16px] mb-[8px] border-2 border-[#9798F5] px-[24px] py-[8px] rounded-2xl shadow-2xl cursor-pointer transition-all ${
                category === c.id ? 'bg-[#9798F5] text-white' : ''
              }`}
              onClick={() => {
                setCategory(c.id)
                setSelectedCategory(c)
              }}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="mb-[8px]">
          <span className="text-[18px] text-[#654597]">Category:</span>{' '}
          {selectedCategory?.name}
        </div>

        {/* Questions */}
        {questionList.length > 0 ? (
          questionList.map((q, index) => (
            <div key={q.id || index} className="mb-4">
              <div className="mb-[8px]">
                <span className="font-bold">Question {index + 1}:</span>{' '}
                {q.question_text}
              </div>

              <div className="border-2 border-[#9798F5] rounded-[16px] w-full h-[189px] p-2 mb-2 overflow-auto">
                {q.answer || 'No answer yet.'}
              </div>

              <div className="flex">
                <button
                  className="flex items-center underline cursor-pointer font-bold mr-[24px]"
                  onClick={() => {
                    setEditingAnswer({
                      key: index,
                      question: q.question_text,
                      answer: q.answer || '',
                    })
                    setIsModalOpen(true)
                  }}
                >
                  <Image
                    src={'/system_images/edit.png'}
                    width={24}
                    height={24}
                    alt="edit"
                    className="mr-[8px]"
                  />
                  Edit Answer
                </button>

                <button className="flex items-center underline cursor-pointer font-bold">
                  <Image
                    src={'/system_images/trash.png'}
                    width={18}
                    height={18}
                    alt="delete"
                    className="mr-[8px]"
                  />
                  Delete Answer
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No questions found for this category.</p>
        )}
      </div>
    </div>
  )
}

export default Page
