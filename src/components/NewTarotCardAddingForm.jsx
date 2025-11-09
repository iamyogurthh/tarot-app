'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const formElements = [
  { label: 'Card Name', key: 'name', placeholder: 'Enter card name' },
  {
    label: 'Card Zodiac Sign',
    key: 'zodiac',
    placeholder: 'Enter card zodiac',
  },
  {
    label: 'Card Numerology Value',
    key: 'numerology',
    placeholder: 'Enter card numerology',
  },
]

const NewTarotCardAddingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    zodiac: '',
    numerology: '',
  })
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('zodiac', formData.zodiac)
      data.append('numerology', formData.numerology)
      if (image) data.append('image', image)

      const res = await fetch('http://localhost:3000/api/cards', {
        method: 'POST',
        body: data,
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to create card')
      }

      const response = await res.json()
      setSuccessMessage(response.message)
      setFormData({ name: '', zodiac: '', numerology: '' })
      setImage(null)
    } catch (err) {
      setErrorMessage(err.message)
    } finally {
      router.back()
      setLoading(false)
    }
  }

  return (
    <div className="bg-white mt-2 rounded-[16px] shadow-2xl p-4">
      <h1 className="text-[#9798F5] font-semibold text-[20px] text-center mb-4">
        Adding New Tarot Card
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="w-fit mb-4">
          <label htmlFor="img">
            Tarot Card Image{' '}
            <img
              src={
                !image
                  ? '/system_images/tarot_card_back.png'
                  : URL.createObjectURL(image)
              }
              className="w-[131px] h-[227px] mt-2 object-cover rounded-lg"
            />
          </label>
          <input
            id="img"
            name="img"
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {formElements.map((item) => (
          <div key={item.key} className="flex flex-col mb-4">
            <label htmlFor={item.key} className="font-semibold">
              {item.label}
            </label>
            <input
              type="text"
              id={item.key}
              name={item.key}
              placeholder={item.placeholder}
              value={formData[item.key]}
              onChange={(e) => handleChange(item.key, e.target.value)}
              className="w-[328px] py-[8px] pl-[16px] border-2 border-[#9798F5] rounded-[16px] bg-white focus:outline-none mt-2 shadow-lg"
              required
            />
          </div>
        ))}

        {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-600 mb-2">{successMessage}</p>
        )}

        <button type="submit" className="primary_btn" disabled={loading}>
          {loading ? 'Adding...' : 'Add Card'}
        </button>
      </form>
    </div>
  )
}

export default NewTarotCardAddingForm
