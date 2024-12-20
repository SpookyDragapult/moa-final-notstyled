import React from 'react'
import Home from './pages/Home'
import Trending from './pages/Trending'
import Food from './pages/food'
import Profile from './pages/profile'
import Detailfilm from './pages/Detail-film'
import PilihBioskop from './pages/pilih-bioskop'
import PilihKursi from './pages/Pilih-kursi'
import Pembayaran from './pages/Pembayaran'
import Login from './pages/login'

import { BookingProvider } from './contexts/BookingContext'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { NavigationProvider } from './contexts/NavigationContext'
import { UserProvider } from './contexts/UserContext'

function App() {
  return (
    <div>
      
      <NavigationProvider>
      <UserProvider>
        <BookingProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/trending' element={<Trending/>} />
            <Route path='/food' element={<Food/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/detail-film/:id' element={<Detailfilm/>} />
            <Route path='/pilih-bioskop' element={<PilihBioskop/>} />
            <Route path='/pilih-kursi' element={<PilihKursi/>} />
            <Route path='/Pembayaran' element={<Pembayaran/>} />
            <Route path='/login' element={<Login/>} />
          </Routes>
        </BrowserRouter>
        </BookingProvider>
        </UserProvider>
      </NavigationProvider>
      
    </div>
  )
}

export default App
