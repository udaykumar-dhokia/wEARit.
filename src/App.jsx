import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import Cart from './pages/Cart/Cart'
import Search from './pages/Search/Search'
import Products from './pages/Products/Products'
import Details from './components/Details/Details'
import Explore from './pages/Explore/Explore'
import Contact from './components/Contact/Contact'


const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/details' element={<Details/>}/>
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App