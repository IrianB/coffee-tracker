import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from '../api/axios.js'
  import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            await API.post('/users/login', { email, password })
            toast.success("Login successful!")
            navigate('/layout')
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || 'Login failed')
                console.log('Error status:', error.response.status);
                console.log('Error data:', error.response.data);
            } else {
                toast.error('An unexpected error occurred');
                console.log('Error:', error.message);
            }
        }
    }

    const createAccount = () => {
        navigate('/create-account')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200">
            <form onSubmit={onSubmitHandler} className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
                <h1 className="text-3xl font-bold text-center text-amber-700 mb-6">
                    Welcome
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
                    Login
                </button>

                <button
                    type="button"
                    onClick={createAccount}
                    className="w-full mt-4 bg-white border border-amber-600 text-amber-600 py-3 rounded-lg font-semibold hover:bg-amber-50 transition duration-300"
                >
                    Create Account
                </button>
            </form>

            {/* Toast container for notifications */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )

}

export default Home;
