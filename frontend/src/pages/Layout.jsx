import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import API from '../api/axios.js'

const Layout = () => {
  const [coffees, setCoffees] = useState([])

  const fetchCoffee = async () => {
    try {
      const response = await API.get('/coffee/get-coffee')
      setCoffees(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCoffee()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-200">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-amber-700 mb-6">
          Coffee List
        </h1>

        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
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
                <tr
                  key={coffee._id}
                  className="border-b hover:bg-amber-50 transition-colors"
                >
                  <td className="py-3 px-6">{coffee.coffeeName}</td>
                  <td className="py-3 px-6">{coffee.size}</td>
                  <td className="py-3 px-6">${coffee.price}</td>
                  <td className="py-3 px-6">{coffee.coffeeShopName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Layout
