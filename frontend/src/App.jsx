import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Layout from './pages/Layout';
import CreateAccount from './pages/CreateAccount';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/layout' element={<Layout />} />
      <Route path='/create-account' element={<CreateAccount />} />
    </Routes>
  )
}

export default App