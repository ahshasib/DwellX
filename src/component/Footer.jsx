import React from 'react';
import { Link } from 'react-router';  
import {
  FaHome, FaUser, FaSignInAlt, FaBullhorn,
  FaHeadset, FaInfoCircle, FaQuestionCircle, FaShieldAlt,
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope,
  FaFacebook, FaGithub, FaLinkedin,
  FaBuilding, FaLink, FaAddressBook
} from 'react-icons/fa';
import RotatingSparkleButton from './RotatingSparkleButton';

const Footer = () => {
  return (
    <div>
      {/* Top border animation */}
      <div className="h-0.5 w-full bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 animate-pulse" />

      <footer className="flex flex-wrap items-start gap-20
                         bg-gradient-to-r from-[#f6f7fb] to-white text-gray-500 text-left
                         px-6 py-12 sm:px-10 sm:py-16 border-t border-indigo-100
                         justify-start sm:justify-center">

        {/* Logo Section */}
        <aside className="max-w-xs w-full sm:w-auto space-y-4">
          <Link to="/" className="flex items-center gap-2 group relative overflow-hidden">
            <div className="relative">
              <img
                src="/logo1.png"
                alt="Logo"
                className="w-12 rounded-xl transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute -top-1 -left-1">
                <RotatingSparkleButton size={16} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-500">
                DuellX
              </h1>
              <p className="text-[11px] text-gray-400 -mt-1">we are best</p>
            </div>
          </Link>

          <p className="text-sm">
            Your trusted partner in finding the perfect home.
            We make property hunting simple and efficient.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <Link to="https://www.facebook.com/" className="hover:scale-110 transition-all">
              <FaFacebook className="text-blue-600 text-xl" size={30} />
            </Link>
            <Link to="https://github.com/ahshasib" className="hover:scale-110 transition-all">
              <FaGithub className="text-gray-800 text-xl" size={30} />
            </Link>
            <Link to="https://www.linkedin.com/" className="hover:scale-110 transition-all">
              <FaLinkedin className="text-blue-700 text-xl" size={30} />
            </Link>
          </div>
        </aside>

        {/* Quick Links */}
        <nav className="space-y-3 w-full sm:w-auto">
          <h6 className="flex items-center gap-2 text-lg font-semibold">
            <FaLink className="animate-bounce text-indigo-600" style={{ animationDuration: '1.5s' }} />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-500">
              Quick Links
            </span>
          </h6>
          {[
            { icon: <FaHome />, text: "Home", to: "/" },
            { icon: <FaUser />, text: "Properties", to: "/allproperties" },
            { icon: <FaSignInAlt />, text: "Login", to: "/login" },
            { icon: <FaBullhorn />, text: "Advertisement", to: "/dashboard" } // তোমার মূল কোডে Advertise ছিল, আমি ধরে নিলাম Dashboard এ নিয়ে যাবে
          ].map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className="relative flex items-center gap-2 group transition-all px-2 py-1 rounded overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 opacity-0 group-hover:opacity-100 scale-110 transition duration-300 rounded" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-indigo-600 transition-all">
                {item.icon} <span>{item.text}</span>
              </span>
            </Link>
          ))}
        </nav>

        {/* Company */}
        <nav className="space-y-3 w-full sm:w-auto">
          <h6 className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-500 text-lg font-semibold">
            <FaBuilding className="text-indigo-600 animate-bounce" style={{ animationDuration: '1.5s' }} />
            Company
          </h6>
          {[
            { icon: <FaHeadset />, text: "Customer Support" },
            { icon: <FaInfoCircle />, text: "About Us", to: "/aboutUs" },
            { icon: <FaQuestionCircle />, text: "FAQs" },
            { icon: <FaShieldAlt />, text: "Privacy Policy" }
          ].map((item, i) => (
            <Link
              key={i}
              to={item.to || '#'}
              className="relative flex items-center gap-2 group transition-all px-2 py-1 rounded overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 opacity-0 group-hover:opacity-100 scale-110 transition duration-300 rounded" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-indigo-600 transition-all">
                {item.icon} <span>{item.text}</span>
              </span>
            </Link>
          ))}
        </nav>

        {/* Contact Us */}
        <nav className="space-y-3 w-full sm:w-auto">
          <h6 className="flex items-center gap-2 text-lg font-semibold">
            <FaAddressBook className="text-indigo-600 animate-bounce" style={{ animationDuration: '1.5s' }} />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-500">
              Contact Us
            </span>
          </h6>
          {[
            { icon: <FaMapMarkerAlt />, text: "121 Manik Plaza, Ghulsan Dhaka" },
            { icon: <FaPhoneAlt />, text: "+8801959277169" },
            { icon: <FaEnvelope />, text: "ahshasibul6@gmail.com" }
          ].map((item, i) => (
            <span
              key={i}
              className="relative flex items-center gap-2 px-2 py-1 rounded"
            >
              <span className="flex items-center gap-2 text-gray-500">
                {item.icon} <span>{item.text}</span>
              </span>
            </span>
          ))}
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
