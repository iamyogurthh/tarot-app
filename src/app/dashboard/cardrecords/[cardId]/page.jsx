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
  const [answerList, setAnswerList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [category, setCategory] = useState(null)
  const [editingAnswer, setEditingAnswer] = useState({
    key: '',
    question: '',
    answer: '',
  })
  const [selectedCategory, setSelectedCategory] = useState(null)

  console.log(answerList)

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
        const [qRes, ansRes] = await Promise.all([
          fetch(
            `http://localhost:3000/api/admin/questions/${selectedCategory.id}`
          ),
          fetch(
            `http://localhost:3000/api/admin/meanings/${cardId}/${selectedCategory.id}`
          ),
        ])
        if (!qRes.ok) throw new Error('Failed to fetch questions')
        const qData = await qRes.json()
        setQuestionList(qData)

        if (!ansRes.ok) throw new Error('Failed to fetch answers')
        const ansData = await ansRes.json()
        setAnswerList(ansData)
      } catch (err) {
        console.error('Error fetching questions:', err)
      }
    }

    fetchQuestions()
  }, [selectedCategory])

  // Function to refresh the answers
  const refreshAnswers = async () => {
    if (!selectedCategory) return
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/meanings/${cardId}/${selectedCategory.id}`
      )
      if (!res.ok) throw new Error('Failed to fetch answers')
      const data = await res.json()
      setAnswerList(data)
    } catch (err) {
      console.error(err)
    }
  }

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
          cardId={cardId}
          categoryId={selectedCategory.id}
          onUpdated={refreshAnswers}
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

        {/* Questions + Answers */}
        {questionList.length > 0 ? (
          questionList.map((q, index) => {
            // find matching answer by question_id
            const answer = answerList.find((a) => a.question_id === q.id)

            return (
              <div key={q.id || index} className="mb-4">
                <div className="mb-[8px]">
                  <span className="font-bold">Question {index + 1}:</span>{' '}
                  {q.question_text || 'No question yet.'}
                </div>

                <div className="border-2 border-[#9798F5] rounded-[16px] w-full h-[189px] p-2 mb-2 overflow-auto">
                  {answer ? answer.question_answer : 'No answer yet.'}
                </div>

                <div className="flex">
                  <button
                    className="flex items-center underline cursor-pointer font-bold mr-[24px]"
                    onClick={() => {
                      setEditingAnswer({
                        key: answer ? answer.meaning_id : '', // use meaning_id
                        question_id: q.id,
                        question: q.question_text,
                        answer: answer ? answer.question_answer : '',
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

                  <button
                    className="flex items-center underline cursor-pointer font-bold"
                    onClick={() => {
                      if (!answer) return alert('No answer to delete.')
                      if (
                        confirm('Are you sure you want to delete this answer?')
                      ) {
                        fetch(
                          `http://localhost:3000/api/meanings/${answer.meaning_id}`,
                          { method: 'DELETE' }
                        )
                          .then((res) => res.json())
                          .then((data) => {
                            alert(data.message || 'Deleted successfully!')
                            // refresh answers
                            fetch(
                              `http://localhost:3000/api/admin/meanings/${cardId}/${selectedCategory.id}`
                            )
                              .then((r) => r.json())
                              .then((d) => setAnswerList(d))
                          })
                          .catch((err) => console.error('Delete error:', err))
                      }
                    }}
                  >
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
            )
          })
        ) : (
          <p>No questions found for this category.</p>
        )}
      </div>
    </div>
  )
}

export default Page
