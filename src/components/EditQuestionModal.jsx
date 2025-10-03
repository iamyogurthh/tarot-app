'use client'
import Image from 'next/image'
import React from 'react'

const EditQuestionModal = ({
  setIsEditModalOpen,
  category,
  editingQuestion,
}) => {
  return (
    <div className="bg-[#00000091] fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center p-[40px]">
      <form className="bg-white rounded-[16px] p-[16px] relative w-[50%]">
        <Image
          src={'/system_images/close.png'}
          alt="close"
          width={40}
          height={40}
          className="absolute top-[8px] right-[8px] cursor-pointer"
          onClick={() => setIsEditModalOpen(false)}
        />
        <h1 className="text-[20px] text-center text_primary font-semibold">
          Editing Question
        </h1>
        <p className="text-center mb-4">
          Category: <span className="font-bold">{category}</span>
        </p>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-4 font-semibold">
            Question 1:
          </label>
          <textarea
            type="text"
            defaultValue={editingQuestion.question}
            className="border-2 border-[#9798F5] rounded-[16px] w-full h-[189px] p-2 mb-2 resize-none text-left align-top"
          />
        </div>

        <div className="flex items-center justify-center mt-4">
          <button className="primary_btn">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default EditQuestionModal
