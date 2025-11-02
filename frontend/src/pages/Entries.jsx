import React, { useState } from 'react'
import API from '../api/axios.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Entries = () => {
    const [coffeeShopName, setCoffeeShopName] = useState('')
    const [coffeeName, setCoffeeName] = useState('')
    const [size, setSize] = useState('')
    const [price, setPrice] = useState('')

    const coffeeSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!coffeeShopName || !coffeeName || !size || !price) {
                toast.error('All fields are required!')
                return
            }

            await API.post('/coffee/add-coffee', {
                coffeeShopName,
                coffeeName,
                size,
                price,
            })

            toast.success('Coffee added successfully!')
            setCoffeeShopName('')
            setCoffeeName('')
            setSize('')
            setPrice('')
        } catch (error) {
            console.log(error)
            toast.error('Failed to add coffee')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200">
            <form
                onSubmit={coffeeSubmit}
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
            >
                <h1 className="text-3xl font-bold text-center text-amber-700 mb-6">
                    Add Coffee Entry
                </h1>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Coffee Shop Name
                    </label>
                    <input
                        value={coffeeShopName}
                        onChange={(e) => setCoffeeShopName(e.target.value)}
                        type="text"
                        required
                        placeholder="Enter coffee shop name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Coffee Name
                    </label>
                    <input
                        value={coffeeName}
                        onChange={(e) => setCoffeeName(e.target.value)}
                        type="text"
                        required
                        placeholder="Enter coffee name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Size</label>
                    <select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                    >
                        <option value="" disabled>
                            Select size
                        </option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Price</label>
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        required
                        placeholder="Enter price"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition duration-300"
                >
                    Add Coffee
                </button>
            </form>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}

export default Entries
