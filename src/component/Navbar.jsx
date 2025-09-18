import React, { use } from 'react'
import { Link, NavLink } from 'react-router'
import Swal from 'sweetalert2'
import ThemeToggle from './ThemeToggle'
import { FaBars, FaBuilding, FaHome, FaRegAddressCard, FaTachometerAlt, FaUserCircle } from 'react-icons/fa'
import { AuthContext } from './../context/AuthProvider'
import RotatingSparkleButton from './RotatingSparkleButton'

const Navbar = () => {
  const { user, logout } = use(AuthContext)

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Logout Successful!',
          text: `${user.email}!`,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const menuItems = (
    <>
      <li>
        <NavLink to="/" className="font-semibold text-gray-600 hover:text-indigo-600 transition-all flex items-center gap-1">
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allproperties" className="font-semibold text-gray-600 hover:text-indigo-600 transition-all flex items-center gap-1">
          <FaBuilding /> Properties
        </NavLink>

      </li>
      <li>
        <NavLink to="/aboutUs" className="font-semibold text-gray-600 hover:text-indigo-600 transition-all flex items-center gap-1">
        <FaRegAddressCard /> AboutUS
        </NavLink>
        
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard" className="font-semibold text-gray-600 hover:text-indigo-600 transition-all flex items-center gap-1">
            <FaTachometerAlt /> Dashboard
          </NavLink>
        </li>
      )}
    </>
  )

  return (
    <div className="bg-white/20 backdrop-blur-md border-b-2 border-indigo-100 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="navbar w-11/12 max-w-7xl mx-auto flex justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group relative overflow-hidden">
            <div className="relative">
              <img
                src="./logo1.png"
                alt="Logo"
                className="w-10 rounded-xl transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute -top-1 -left-1">
                <RotatingSparkleButton size={16} />
              </div>
            </div>
            <div className="leading-tight ">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-500">
                DwellX
              </h1>
              <span className="text-[11px] text-gray-500 block -mt-1">we are best</span>
            </div>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <FaBars className="text-xl" />
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[60]">
            {menuItems}
            {/* <li><ThemeToggle /></li> */}
            {user ? (
              <>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
              </>
            )}
          </ul>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          <ul className="menu menu-horizontal px-1 flex gap-6 items-center">
            {menuItems}
          </ul>
        </div>

        {/* User Section */}
        <div className="hidden lg:flex items-center gap-4">
          {/* <ThemeToggle /> */}
          {user ? (
            <>
              <img
                src={user.photoURL || '/avatar.png'}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-purple-500"
              />
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-5 py-2 rounded-xl font-semibold shadow hover:scale-105 transition-all duration-300 btn-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-5 py-2 rounded-xl font-semibold shadow hover:scale-105 transition-all duration-300 btn-sm"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-5 py-2 rounded-xl font-semibold shadow hover:scale-105 transition-all duration-300 btn-sm"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default Navbar
