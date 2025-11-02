import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg rounded-b-2xl px-8 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-amber-700">Coffee Tracker</div>
      <div className="flex space-x-6">
        <p className="cursor-pointer text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition duration-300">
          Dashboard
        </p>
        <p className="cursor-pointer text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition duration-300">
          Entries
        </p>
        <p className="cursor-pointer text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition duration-300">
          Analytics
        </p>
        <p className="cursor-pointer text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition duration-300">
          Profile
        </p>
      </div>
    </nav>
  )
}

export default Navbar
