import React, { use } from 'react'
import { NavLink } from 'react-router'

import Swal from 'sweetalert2'
import ThemeToggle from './ThemeToggle'
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from './../context/AuthProvider';

const Navbar = () => {

  const { user, logout } = use(AuthContext)

  const handleLogout = () => {
    logout()
      .then(() => {

        Swal.fire({
          icon: 'success',
          title: 'Logout Successful!',
          text: ` ${user.email}!`,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        })

      }).catch((error) => {
        // An error happened.
      });
  }



  const menuItems = (
    <>
      <li><NavLink to="/" className="font-semibold text-gray-600">Home</NavLink></li>
      <li><NavLink to="/allproperties" className="font-semibold text-gray-600">Properties</NavLink></li>
      {user && <>
        <li className="dropdown dropdown-end">
          <label tabIndex={0} className="font-semibold text-gray-600">Dashboard <RiArrowDropDownLine /></label>
          <ul tabIndex={0} className="font-bold dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><NavLink to="/dashboard">test</NavLink></li>
            <li><NavLink to="/">All-Marathons-Events</NavLink></li>

            <li><NavLink to="/">My Marathon List</NavLink></li>
            <li><NavLink to="/">My Application List</NavLink></li>
          </ul>
        </li>
      </>}
    </>
  );


  return (
    <div className='bg-white shadow-lg md:py-2 fixed top-0 left-0 w-full z-50'>
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <NavLink to="/" className="flex items-center gap-2">
            <img src="./logo1.png" alt="Logo" className="w-10 rounded-md" />
            <div className="leading-tight">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:via-blue-600 group-hover:to-purple-600 transition-all duration-500">
                DuellX
              </h1>
              <span className="text-[11px] text-gray-500 block -mt-1">we are best</span>
            </div>
          </NavLink>
        </div>

        {/* Mobile dropdown*/}
        <div className="navbar-end lg:hidden">
          <div>
            {
              user ? (<img src={user.photoURL || '/avatar.png'} alt="User" className="w-8 h-8 rounded-full" />) : (<FaUserCircle size={22} />)
            }
          </div>

          <div className="dropdown dropdown-end">

            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>



            <ul tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow space-y-3">
              {menuItems}
              {
                user ? (
                  <>
                    <img src={user.photoURL || '/avatar.png'} alt="User" className="w-8 h-8 rounded-full" />
                    <li><button onClick={handleLogout} className="btn btn-sm bg-gradient-to-r from-green-400 to-blue-500 border-none shadow-lg">Logout</button></li>
                  </>
                ) : (
                  <>
                    <li><NavLink to="/login" className="btn btn-sm bg-gradient-to-r from-green-400 to-blue-500 border-none shadow-lg">Login</NavLink></li>
                    <li><NavLink to="/register" className="btn btn-sm bg-gradient-to-r from-green-400 to-blue-500 border-none shadow-lg">Register</NavLink></li>
                  </>
                )
              }
            </ul>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-end hidden lg:flex gap-5">
          <ul className="menu menu-horizontal px-1">
            {menuItems}
          </ul>

          {
            user ? (
              <>
                <img src={user.photoURL || '/avatar.png'} alt="User" className="w-8 h-8 rounded-full" />
                <button onClick={handleLogout} className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl shadow-blue-500/30 font-semibold overflow-hidden">Logout</button>
              </>
            ) : (
              <>
                <FaUserCircle size={24} />
                <NavLink to="/login" className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl shadow-blue-500/30 font-semibold overflow-hidden">Login</NavLink>
                <NavLink to="/register" className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl shadow-blue-500/30 font-semibold overflow-hidden">Register</NavLink>
              </>
            )
          }

          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar