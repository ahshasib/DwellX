import React from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import { Outlet } from 'react-router'

const Mainlayout = () => {
  return (
    <div>
    <Navbar />
    <main className="min-h-screen mt-16 md:mt-20">
        <Outlet />
    </main>
    <Footer />
</div>
  )
}

export default Mainlayout