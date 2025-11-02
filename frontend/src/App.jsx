import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Layout from './pages/Layout';
import CreateAccount from './pages/CreateAccount';
import Dashboard from './pages/Dashboard';
import Entries from './pages/Entries';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create-account' element={<CreateAccount />} />
      <Route path='/layout' element={<Layout />}>
        <Route index element={<Dashboard />} /> 
        <Route path='entries' element={<Entries />} />
        <Route path='analytics' element={<Analytics />} />
        <Route path='profile' element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App