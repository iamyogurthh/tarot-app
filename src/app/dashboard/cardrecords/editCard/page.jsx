'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import BackBt from '@/components/BackBt'

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

const EditTarotCardForm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const cardId = searchParams.get('id') // e.g., /editCard?id=1

  const [formData, setFormData] = useState({
    name: '',
    zodiac: '',
    numerology: '',
  })
  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Fetch card data
  useEffect(() => {
    if (!cardId) return
    const fetchCard = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/cards/${cardId}`)
        if (!res.ok) throw new Error('Failed to fetch card')
        const data = await res.json()
        setFormData({
          name: data.name,
          zodiac: data.zodiac,
          numerology: data.numerology,
        })
        setPreviewImage(`/tarot_images/${data.image}`)
      } catch (err) {
        console.error(err)
        setErrorMessage(err.message)
      }
    }
    fetchCard()
  }, [cardId])

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

      const res = await fetch(`http://localhost:3000/api/cards/${cardId}`, {
        method: 'PUT',
        body: data,
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to update card')
      }

      const response = await res.json()
      setSuccessMessage(response.message)
      setTimeout(() => {
        router.push('/dashboard/cardrecords')
      }, 1000)
    } catch (err) {
      setErrorMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-2">
      <div className="flex items-center justify-end">
        <BackBt />
      </div>
      <div>
        <div className="bg-white mt-2 rounded-[16px] shadow-2xl p-4">
          <h1 className="text-[#9798F5] font-semibold text-[20px] text-center mb-4">
            Edit Tarot Card
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Card Image */}
            <div className="w-fit mb-4">
              <label htmlFor="img">
                Tarot Card Image{' '}
                <img
                  src={
                    previewImage
                      ? previewImage
                      : '/system_images/tarot_card_back.png'
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
                onChange={(e) => {
                  setImage(e.target.files[0])
                  setPreviewImage(URL.createObjectURL(e.target.files[0]))
                }}
              />
            </div>

            {/* Form Fields */}
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

            {errorMessage && (
              <p className="text-red-600 mb-2">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-600 mb-2">{successMessage}</p>
            )}

            <button type="submit" className="primary_btn" disabled={loading}>
              {loading ? 'Updating...' : 'Update Card'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditTarotCardForm
