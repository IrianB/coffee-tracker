import React, { useEffect, useState } from 'react'
import API from '../api/axios.js'

const Dashboard = () => {
    const [coffees, setCoffees] = useState([])

    useEffect(() => {
        const fetchCoffee = async () => {
            try {
                const response = await API.get('/coffee/get-coffee')
                setCoffees(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchCoffee()
    }, [])

    return (
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <h1 className="text-3xl font-bold text-amber-700 mb-6 px-6 pt-6">Coffee List</h1>
            <table className="min-w-full">
                <thead className="bg-amber-600 text-white">
                    <tr>
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Size</th>
                        <th className="py-3 px-6 text-left">Price</th>
                        <th className="py-3 px-6 text-left">Coffee Shop</th>
                    </tr>
                </thead>
                <tbody>
                    {coffees.map((coffee) => (
                        <tr key={coffee._id} className="border-b hover:bg-amber-50 transition-colors">
                            <td className="py-3 px-6">{coffee.coffeeName}</td>
                            <td className="py-3 px-6">{coffee.size}</td>
                            <td className="py-3 px-6">${coffee.price}</td>
                            <td className="py-3 px-6">{coffee.coffeeShopName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard
