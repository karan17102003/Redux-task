import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './footer'

const AppTemplate = () => {
  return (
    <div>
        <Navbar/>
        <div className='h-20 bg-black'></div>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default AppTemplate