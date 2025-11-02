import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <nav className="bg-white shadow-lg rounded-b-2xl px-8 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-amber-700 cursor-pointer" onClick={() => navigate('/layout')}>
        Coffee Tracker
      </div>

      <div className="flex space-x-6">
        <p
          onClick={() => navigate('/layout')}
          className="cursor-pointer text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition duration-300"
        >
          Dashboard
        </p>
        <p
          onClick={() => navigate('/layout/entries')}
          className="cursor-pointer text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition duration-300"
        >
          Entries
        </p>
        <p
          onClick={() => navigate('/layout/analytics')}
          className="cursor-pointer text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition duration-300"
        >
          Analytics
        </p>
        <p
          onClick={() => navigate('/layout/profile')}
          className="cursor-pointer text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition duration-300"
        >
          Profile
        </p>
      </div>
    </nav>
  )
}

export default Navbar
