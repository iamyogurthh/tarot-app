'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from '@/context/FormContext'
import Link from 'next/link'
import FullScreenLoader from './FullScreenLoader'

const majors = [
  'Myanmar',
  'English',
  'Geography',
  'History',
  'Archaeology',
  'Oriental Studies',
  'Library and Information Studies',
  'Philosophy',
  'Psychology',
  'Anthropology',
  'International Relations',
  'Botany',
  'Microbiology',
  'Geology',
  'Chemistry',
  'Biochemistry',
  'Industrial Chemistry',
  'Computer Science',
  'Mathematics',
  'Nuclear Physics',
  'Physics',
  'Zoology',
  'Sport Science',
  'Law',
  'other',
]

const UserInputForm = () => {
  const router = useRouter()
  const { formData, updateField } = useForm()
  console.log(formData)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    updateField(name, value)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (
      !formData.user_name ||
      !formData.full_name ||
      !formData.dob ||
      !formData.major
    ) {
      alert('Please fill out all fields.')
      return
    }
    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('user_name', formData.user_name)
      const req = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        body: formDataToSend,
      })
      const data = await req.json()

      if (!req.ok) {
        alert(data.message || 'User Login failed')
        return
      }
      const { user_id } = data
      updateField('user_id', user_id)
      router.push('/chooseTopic')
    } catch (error) {
      console.error(error)
      alert('User Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <FullScreenLoader text="Logging in" />

  return (
    <>
      <form onSubmit={handleSubmit} className="animate-fade-in-up">
        {/*User Name */}
        <div className="fade-in-up fade-delay-1 mb-[16px]">
          <label htmlFor="user_name" className="font-bold text-dark_p text-xl">
            User Name (@username...)
          </label>
          <br />
          <input
            value={formData.user_name}
            type="text"
            id="user_name"
            name="user_name"
            placeholder="Enter your account name"
            className="mt-[8px] w-[328px] px-[16px] py-[8px] bg-white border-2 border-[#9798F5] rounded-[24px] shadow-lg"
            onChange={handleChange}
          />
        </div>

        {/*Full Name */}
        <div className="fade-in-up fade-delay-1 mb-[16px]">
          <label htmlFor="full_name" className="font-bold text-dark_p text-xl">
            User Full Name
          </label>
          <br />
          <input
            value={formData.full_name}
            type="text"
            id="full_name"
            name="full_name"
            placeholder="Enter your full name"
            className="mt-[8px] w-[328px] px-[16px] py-[8px] bg-white border-2 border-[#9798F5] rounded-[24px] shadow-lg"
            onChange={handleChange}
          />
        </div>

        {/* Date of Birth */}
        <div className="fade-in-up fade-delay-2 mb-[16px]">
          <label htmlFor="dob" className="font-bold text-dark_p text-xl">
            Date of Birth
          </label>
          <br />
          <input
            value={formData.dob}
            type="date"
            id="dob"
            name="dob"
            className="mt-[8px] w-[328px] px-[16px] py-[8px] bg-white border-2 border-[#9798F5] rounded-[24px] shadow-lg"
            onChange={handleChange}
          />
        </div>

        {/* Major selection */}
        <div className="fade-in-up fade-delay-3 mb-[40px]">
          <label htmlFor="major" className="font-bold text-dark_p text-xl">
            Major
          </label>
          <br />
          <select
            id="major"
            name="major"
            value={formData.major}
            onChange={handleChange}
            className="mt-[8px] w-[328px] px-[16px] py-[8px] bg-white border-2 border-[#9798F5] rounded-[24px] shadow-lg appearance-none"
          >
            <option value="" disabled>
              Select your major
            </option>
            {majors.map((major) => (
              <option key={major} value={major}>
                {major}
              </option>
            ))}
          </select>
        </div>

        {/* Submit button */}
        <div className="fade-in-up fade-delay-4 flex justify-center">
          <button
            type="submit"
            className="text-xl cursor-pointer px-[32px] py-[10px] rounded-[24px] font-bold text-dark_p border-2 border-[#9798F5] bg-gradient-to-r from-[#cbccfa] to-[#9798f5] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:brightness-110"
          >
            Let's Start
          </button>
        </div>
        <div className="flex items-center justify-center animate-fade-in-up fade-delay-5">
          <Link
            href={'/registerUser'}
            className="items-center underline font-bold mt-[16px] text-[#654597] hover:text-white text-lg"
          >
            Don’t have an account? Register
          </Link>
        </div>
      </form>
    </>
  )
}

export default UserInputForm
