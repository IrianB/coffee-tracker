import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Layout from './pages/Layout';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/layout' element={<Layout />} />
    </Routes>
  )
}

export default App