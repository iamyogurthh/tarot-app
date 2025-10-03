'use client'
import Image from 'next/image'
import React from 'react'

const TarotCardEditingModal = ({ setIsModalOpen, category, editingAnswer }) => {
  return (
    <div className="bg-[#00000091] fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center p-[40px]">
      <form className="bg-white rounded-[16px] p-[16px] relative w-full max-w-[70%]">
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
          <span className="font-bold mr-2">
            Question {editingAnswer.key.split('q')}:
          </span>
          <span>{editingAnswer.question}</span>
        </div>

        <textarea
          defaultValue={editingAnswer.answer}
          className="border-2 border-[#9798F5] rounded-[16px] w-full h-[189px] p-2 mb-2 resize-none text-left align-top"
        ></textarea>
        <div className="flex items-center justify-center">
          <button className="primary_btn">Submit Edited</button>
        </div>
      </form>
    </div>
  )
}

export default TarotCardEditingModal
