'use client'
import Banner from '@/components/Banner'
import React, { useState, useEffect } from 'react'
import { questionData } from '@/data/questionData'
import ReuseableTable from '@/components/ReuseableTable'
import Image from 'next/image'
import EditQuestionModal from '@/components/EditQuestionModal'
import AddNewCategoryModal from '@/components/AddNewCategoryModal'

const page = () => {
  const [category, setCategory] = useState('love')
  const data = [questionData.find((q) => q.key == category)]
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState({
    key: '',
    question: '',
    answer: '',
  })

  useEffect(() => {
    if (isEditModalOpen || isAddModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isEditModalOpen, isAddModalOpen])

  const columns = [
    {
      label: 'Category Name',
      render: (data) => <div className="align-top">{data.label}</div>,
    },
    {
      label: 'Questions',
      render: (data) => (
        <div>
          {Object.entries(data.questions).map(([key, value]) => (
            <div key={key} className="mb-8">
              <span className="font-semibold">
                Question {key.replace('q', '')}
              </span>
              <div className="my-2">{value}</div>
              <div className="flex">
                <button
                  onClick={() => {
                    setIsEditModalOpen(true)
                    setEditingQuestion({
                      key: key,
                      question: value, // ✅ use value (the text)
                      answer: '', // if you want to load existing answer, handle here
                    })
                  }}
                  className="flex items-center underline cursor-pointer font-semibold mr-[24px]"
                >
                  <Image
                    src={'/system_images/edit.png'}
                    width={24}
                    height={24}
                    alt="edit"
                    className="mr-[8px]"
                  />
                  Edit Question
                </button>

                <button className="flex items-center underline cursor-pointer font-semibold">
                  <Image
                    src={'/system_images/trash.png'}
                    width={18}
                    height={18}
                    alt="delete"
                    className="mr-[8px]"
                  />
                  Delete Question
                </button>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: 'Action',
      field: 'id',
      render: () => (
        <div className="flex cursor-pointer">
          <Image
            src={'/system_images/trash.png'}
            alt="trash"
            width={24}
            height={27}
            className="cursor-pointer"
          />
          <p className="ml-2 underline font-semibold">Delete Category</p>
        </div>
      ),
    },
  ]

  return (
    <div className="p-2">
      {isEditModalOpen && (
        <EditQuestionModal
          setIsEditModalOpen={setIsEditModalOpen}
          category={category}
          editingQuestion={editingQuestion}
        />
      )}
      {isAddModalOpen && (
        <AddNewCategoryModal setIsAddModalOpen={setIsAddModalOpen} />
      )}

      <div className="flex items-center justify-start gap-2">
        <Banner
          label={'Total Categories'}
          img={'/system_images/categories.png'}
          value={4}
        />
        <Banner
          label={'Total Questions'}
          img={'/system_images/question_circle-puple.png'}
          value={32}
        />
      </div>

      <div className="flex items-center justify-end w-full mt-[8px] mb-[8px]">
        <button onClick={() => setIsAddModalOpen(true)} className="primary_btn">
          Add New Category
        </button>
      </div>

      <div className="flex items-center justify-start my-[8px]">
        {questionData.map((q) => (
          <button
            key={q.key}
            className={`bg-white mr-[16px] border-2 border-[#9798F5] px-[24px] py-[8px] rounded-2xl shadow-2xl cursor-pointer ${
              category === q.key ? 'active_btn' : ''
            }`}
            onClick={() => setCategory(q.key)}
          >
            {q.label}
          </button>
        ))}
      </div>

      <ReuseableTable columns={columns} data={data} rowKey={'id'} />
    </div>
  )
}

export default page
