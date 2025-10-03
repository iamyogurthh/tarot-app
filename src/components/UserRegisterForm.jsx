'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from '@/context/FormContext'
import Link from 'next/link'

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
]

const UserRegisterForm = () => {
  const router = useRouter()
  const { formData, updateField } = useForm()

  const handleChange = (e) => {
    const { name, value } = e.target
    updateField(name, value)
  }

  const handleNext = () => {
    if (!formData.name || !formData.dob || !formData.major) {
      alert('Please fill out all fields.')
      return
    }
    router.push('/chooseTopic')
  }

  return (
    <div className="animate-fade-in-up">
      {/*User Name */}
      <div className="fade-in-up fade-delay-1 mb-[16px]">
        <label htmlFor="user_name" className="font-bold text-dark_p">
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
        <label htmlFor="full_name" className="font-bold text-dark_p">
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
        <label htmlFor="dob" className="font-bold text-dark_p">
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
        <label htmlFor="major" className="font-bold text-dark_p">
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
          onClick={handleNext}
          className="cursor-pointer px-[32px] py-[10px] rounded-[24px] font-bold text-dark_p border-2 border-[#9798F5] bg-gradient-to-r from-[#cbccfa] to-[#9798f5] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:brightness-110"
        >
          Register
        </button>
      </div>
      <div className="flex items-center justify-center animate-fade-in-up fade-delay-5">
        <Link
          href={'/'}
          className="items-center underline font-bold mt-[16px] text-[#654597] hover:text-white"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  )
}

export default UserRegisterForm
