
import React from 'react'
import RotatingSparkleButton from './RotatingSparkleButton'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <div>
      <footer class="footer sm:footer-horizontal bg-gradient-to-r from-[#f6f7fb] to-white text-base-content p-10 border-t border-indigo-100">
  <aside>
    
  <div className="flex items-center gap-2 py-3">
          <Link to="/" className="flex items-center gap-2 group relative overflow-hidden">
            <div className="relative">
              <img
                src="/logo1.png"
                alt="Logo"
                className="w-10 rounded-xl transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute -top-1 -left-1">
                <RotatingSparkleButton size={16} />
              </div>
            </div>
            <div className="leading-tight ">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-500">
                DuellX
              </h1>
              <span className="text-[11px] text-gray-500 block -mt-1">we are best</span>
            </div>
          </Link>
        </div>
    <p>
      ACME Industries Ltd.
      <br />
      Providing reliable tech since 1992
    </p>
  </aside>
  <nav>
    <h6 class="footer-title">Services</h6>
    <a class="link link-hover">Branding</a>
    <a class="link link-hover">Design</a>
    <a class="link link-hover">Marketing</a>
    <a class="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 class="footer-title">Company</h6>
    <a class="link link-hover">About us</a>
    <a class="link link-hover">Contact</a>
    <a class="link link-hover">Jobs</a>
    <a class="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 class="footer-title">Legal</h6>
    <a class="link link-hover">Terms of use</a>
    <a class="link link-hover">Privacy policy</a>
    <a class="link link-hover">Cookie policy</a>
  </nav>
</footer>
    </div>
  )
}

export default Footer