'use client'

import { adminLogin } from '@/actions/adminLogin'
import BackBt from '@/components/BackBt'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const AdminLoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'username') setUsername(value)
    if (name === 'password') setPassword(value)
  }

  // ✅ Use server action here
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('Both username and password are required.')
      return
    }

    setLoading(true)

    const result = await adminLogin(username, password)

    setLoading(false)

    if (result?.error) {
      setError(result.error)
      return
    }

    // ✅ Login success
    router.push('/dashboard')
  }

  return (
    <>
      <div className="flex justify-end pt-4 pr-4">
        <BackBt />
      </div>

      <div className="flex flex-col items-center justify-center mt-40">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center text-gray-900">
            Admin Sign In
          </h2>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                name="username"
                value={username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {error && (
              <div className="p-2 text-sm text-red-700 bg-red-100 rounded text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 primary_btn"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AdminLoginPage
