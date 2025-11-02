import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreateAccount = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        birthdate: '',
        gender: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleCreateAccount = async (e) => {
        e.preventDefault()
        try {
            await API.post('/users/register', formData)

            //  Show success toast
            toast.success('Account successfully created! Redirecting to login...', {
                position: 'top-right',
                autoClose: 2000,
            })

            // ⏳ Wait 2 seconds before redirecting
            setTimeout(() => {
                navigate('/')
            }, 2000)

        } catch (error) {
            if (error.response) {
                console.log('Error data:', error.response.data)
                console.log('Error status:', error.response.status)
                toast.error(error.response.data.message || 'Registration failed', {
                    position: 'top-right',
                    autoClose: 3000,
                })
            } else {
                console.log('Error:', error.message)
                toast.error('An unexpected error occurred', {
                    position: 'top-right',
                    autoClose: 3000,
                })
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200">
            <form
                onSubmit={handleCreateAccount}
                className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
            >
                <h1 className="text-3xl font-bold text-center text-amber-700 mb-6">
                    Create Account
                </h1>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Name</label>
                    <input
                        name="name"
                        onChange={handleChange}
                        type="text"
                        required
                        placeholder="Enter your name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                        name="email"
                        onChange={handleChange}
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input
                        name="password"
                        onChange={handleChange}
                        type="password"
                        required
                        placeholder="Enter your password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                </div>

                {/* Age */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Age</label>
                    <input
                        name="age"
                        onChange={handleChange}
                        type="number"
                        required
                        placeholder="Enter your age"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                </div>

                {/* Birthdate */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Birthdate</label>
                    <input
                        name="birthdate"
                        onChange={handleChange}
                        type="date"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                </div>

                {/* Gender */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Gender</label>
                    <select
                        name="gender"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition duration-300"
                >
                    Create Account
                </button>

                {/* Go back */}
                <p className="text-center mt-4 text-sm text-gray-600">
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate('/')}
                        className="text-amber-600 hover:underline cursor-pointer"
                    >
                        Log in
                    </span>
                </p>
            </form>

            {/* Toast container */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}

export default CreateAccount
