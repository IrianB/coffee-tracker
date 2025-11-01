import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios.js'

const CreateAccount = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleCreateAccount = async (e) => {
        e.preventDefault()
        try {
            await API.post('/users/register', { email, password })
            alert("Account successfully created")
            navigate('/')
        } catch (error) {
            if (error.response) {
                console.log('Error data:', error.response.data);
                console.log('Error status:', error.response.status);
                alert(error.response.data.message || 'Registration failed');
            } else {
                console.log('Error:', error.message);
                alert('An unexpected error occurred');
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200">
            <form
                onSubmit={handleCreateAccount}
                className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm"
            >
                <h1 className="text-3xl font-bold text-center text-amber-700 mb-6">
                    Create Account
                </h1>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                        placeholder="Enter your password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition duration-300"
                >
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default CreateAccount
