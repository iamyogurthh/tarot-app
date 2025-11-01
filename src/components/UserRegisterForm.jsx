'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from '@/context/FormContext'
import Link from 'next/link'
import FullScreenLoader from './FullScreenLoader'

const UserRegisterForm = () => {
  const router = useRouter()
  const { formData, updateField, clearForm } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    updateField(name, value)
  }

  console.log(formData)

  async function handleSubmit(event) {
    event.preventDefault()
    if (!formData.user_name || !formData.full_name || !formData.dob) {
      alert('Please fill out all fields.')
      return
    }
    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('user_name', formData.user_name)
      formDataToSend.append('real_name', formData.full_name)
      formDataToSend.append('dob', formData.dob)

      const req = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        body: formDataToSend,
      })
      const data = await req.json()

      if (!req.ok) {
        alert(data.message || 'User registration failed')
        return
      }

      alert('User Registered Successfully')
      clearForm()
      router.push('/')
    } catch (error) {
      console.error(error)
      alert('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in-up">
      {isLoading && <FullScreenLoader />}
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

      {/* Submit button */}
      <div className="fade-in-up fade-delay-4 flex justify-center">
        <button
          type="submit"
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
    </form>
  )
}

export default UserRegisterForm
