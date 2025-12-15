'use client'
import BackBt from '@/components/BackBt'
import React, { useState } from 'react'

const AdminLoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'username') {
      setUsername(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Basic Client-Side Validation
    if (!username || !password) {
      setError('Both username and password are required.')
      return
    }
  }

  return (
    <>
      <div className="flex justify-end pt-4 pr-4">
        <BackBt />
      </div>

      <div className="flex flex-col items-center justify-center mt-40">
        {/* Login Box: Shadow, rounded corners, white background */}
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 flex items-center justify-center">
            Admin Sign In
          </h2>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Username Input Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Input Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Error Message Display */}
            {error && (
              <div
                className="p-2 text-sm text-red-700 bg-red-100 rounded-lg text-center"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium primary_btn focus:outline-none focus:ring-2 focus:ring-offset-2  transition duration-150 ease-in-out "
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AdminLoginPage
