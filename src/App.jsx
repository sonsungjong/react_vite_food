import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Favorites from './pages/favorites/favorites'
import Details from './pages/details/Details'

export default function App() {

  return (
    <div className='App_container'>



      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/favorites' element={<Favorites />}></Route>
        <Route path='/details/:id' element={<Details />}></Route>
      </Routes>
    </div>
  )
}

// npm install react-router-dom
// npm install react-icons
