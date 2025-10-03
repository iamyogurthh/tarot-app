'use client'
import React, { useState } from 'react'

const formElements = [
  {
    label: 'Card Name',
    placeholder: 'Enter card name',
  },
  {
    label: 'Card Zodiac Sign',
    placeholder: 'Enter card zodiac',
  },
  {
    label: 'Card Numerology Value',
    placeholder: 'Enter card numerology',
  },
]

const NewTarotCardAddingForm = () => {
  const [image, setImage] = useState('')
  return (
    <div className="bg-white mt-2 rounded-[16px] shadow-2xl p-4">
      <h1 className="text-[#9798F5] font-semibold text-[20px] text-center">
        Adding New Tarot Card
      </h1>
      <form>
        <div className="w-fit mb-4">
          <label htmlFor="img">
            Tarot Card Image{' '}
            <img
              src={
                !image
                  ? '/system_images/tarot_card_back.png'
                  : URL.createObjectURL(image)
              }
              className="w-[131px] h-[227px] mt-2  object-cover"
            />
          </label>
          <input
            id="img"
            name="img"
            type="file"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        {formElements.map((item, index) => (
          <div key={index} className="flex flex-col mb-4">
            <label htmlFor="card_name" className="font-semibold">
              {item.label}
            </label>
            <input
              type="text"
              id="card_name"
              name="card_name"
              placeholder={item.placeholder}
              className="w-[328px]  py-[8px] pl-[16px] border-2 border-[#9798F5]  rounded-[16px] bg-white focus:outline-none mt-2 shadow-lg"
            />
          </div>
        ))}
        <button className="primary_btn">Add Card</button>
      </form>
    </div>
  )
}

export default NewTarotCardAddingForm
