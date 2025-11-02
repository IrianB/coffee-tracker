import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-200">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
