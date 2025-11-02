import React, { useEffect, useState } from 'react'
import API from '../api/axios.js'

const Dashboard = () => {
    const [coffees, setCoffees] = useState([])

    useEffect(() => {
        const fetchCoffee = async () => {
            try {
                const response = await API.get('/coffee/get-coffee',{
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
                })
                setCoffees(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchCoffee()
    }, [])

    const deleteCoffee = async (id) => {
        try {
            await API.delete(`/coffee/delete/${id}`)
            setCoffees(coffees.filter(coffee => coffee._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <h1 className="text-3xl font-bold text-amber-700 mb-6 px-6 pt-6">Coffee List</h1>
            <table className="min-w-full">
                <thead className="bg-amber-600 text-white">
                    <tr>
                        <th className="py-3 px-6 text-left">Coffee Name</th>
                        <th className="py-3 px-6 text-left">Size</th>
                        <th className="py-3 px-6 text-left">Price</th>
                        <th className="py-3 px-6 text-left">Coffee Shop</th>
                        <th className="py-3 px-6 text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    {coffees.map((coffee) => (
                        <tr key={coffee._id} className="border-b hover:bg-amber-50 transition-colors">
                            <td className="py-3 px-6">{coffee.coffeeName}</td>
                            <td className="py-3 px-6">{coffee.size}</td>
                            <td className="py-3 px-6">₱ {coffee.price.toFixed(2)}</td>
                            <td className="py-3 px-6">{coffee.coffeeShopName}</td>
                            <td className="py-3 px-6">
                                <button
                                    onClick={() => deleteCoffee(coffee._id)}
                                    className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard
