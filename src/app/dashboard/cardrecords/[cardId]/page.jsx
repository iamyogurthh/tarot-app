'use client'
import BackBt from '@/components/BackBt'
import TarotCardEditingModal from '@/components/TarotCardEditingModal'
import { questionData } from '@/data/questionData'
import { tarotData } from '@/data/tarotData'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const Page = () => {
  const params = useParams()
  const { cardId } = params
  const tarot = tarotData.find((item) => Number(item.id) === Number(cardId))
  const [category, setCategory] = useState('love')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAnswer, setEditingAnswer] = useState({
    key: '',
    answer: '',
  })

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen])

  if (!tarot) return <div className="p-4">Card not found.</div>
  const selectedCategory = questionData.find((q) => q.key === category)

  return (
    <div className="p-2">
      {isModalOpen && (
        <TarotCardEditingModal
          setIsModalOpen={setIsModalOpen}
          category={category}
          editingAnswer={editingAnswer}
        />
      )}
      <div className="flex items-center justify-end">
        <BackBt />
      </div>

      <div className="bg-white shadow-lg p-4 mt-2 rounded-[16px] border-2 border-[#9798F5] overflow-auto">
        <h1 className="text-center font-bold text-[24px]">{tarot.card_name}</h1>

        <div className="flex justify-center mt-[16px]">
          <Image
            src={tarot.img}
            width={128}
            height={294}
            alt={tarot.card_name}
          />
        </div>

        <div className="flex items-center justify-start my-[16px]">
          {questionData.map((q) => (
            <button
              key={q.key}
              className={`mr-[16px] border-2 border-[#9798F5] px-[24px] py-[8px] rounded-2xl shadow-2xl cursor-pointer ${
                category === q.key ? 'active_btn' : ''
              }`}
              onClick={() => setCategory(q.key)}
            >
              {q.label}
            </button>
          ))}
        </div>

        <div className="mb-[8px]">
          <span className="text-[18px] text-[#654597]">Category:</span>{' '}
          {selectedCategory?.label}
        </div>

        {selectedCategory &&
          Object.entries(selectedCategory.questions).map(([key, question]) => (
            <div key={key} className="mb-4">
              <div className="mb-[8px]">
                <span className="font-bold">
                  Question {key.replace('q', '')}:
                </span>{' '}
                {question}
              </div>

              <div className="border-2 border-[#9798F5] rounded-[16px] w-full h-[189px] p-2 mb-2 overflow-auto">
                {tarot[category]?.[key] || 'No answer yet.'}
              </div>

              <div className="flex">
                <button
                  className="flex items-center underline cursor-pointer font-bold mr-[24px]"
                  onClick={() => {
                    setEditingAnswer({
                      key: key,
                      question: question,
                      answer: tarot[category]?.[key] || '', // current answer
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
          ))}
      </div>
    </div>
  )
}

export default Page
