import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CounterSection from "./CounterSection";
import { FaGlobe, FaStar } from "react-icons/fa";
import RotatingSparkleButton from "./RotatingSparkleButton";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Herosection = () => {
  return (
    <div className="h-screen w-full mt-0 md:-mt-7">
      {/* Slide */}
      <div className="relative min-h-screen w-full overflow-hidden ">
        <img
          src="./b5.png"
          alt="Luxury House"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gray-400 opacity-5 pointer-events-none" />
        <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-pink-200/60 via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-blue-200/60 via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-gray-900/20 via-transparent to-transparent z-10 pointer-events-none" />

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 py-10 sm:py-16 md:py-24"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 py-2 px-4 text-sm sm:text-base bg-white border border-indigo-100 text-indigo-500 rounded-full shadow-sm"
          >
            <FaGlobe className="text-indigo-500" />
            Trusted by 50,000+ families
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" size={14} />
            ))}
          </motion.span>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex md:flex-row justify-center gap-4 mt-8"
          >
            <RotatingSparkleButton size={24} />
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center bg-gradient-to-r from-pink-600 via-indigo-700 to-pink-600 bg-clip-text text-transparent">
              Find Your Perfect <br />
              <span className="text-black">Dream Home</span>
            </h1>
            <RotatingSparkleButton size={24} />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-base sm:text-lg md:text-xl max-w-3xl mt-4 text-black font-semibold px-2"
          >
            Discover exceptional properties in prime locations with our{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              AI-powered search
            </span>{" "}
            and{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              expert guidance
            </span>
            .
          </motion.p>

          {/* Category & Search Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-12 w-full max-w-4xl bg-white rounded-3xl py-8 px-4 sm:px-6 md:px-10 shadow-2xl"
          >
            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {["🏢 Apartments", "🏠 Houses", "🏡 Villas", "🛏️ Studios"].map(
                (label, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 border border-blue-50 bg-gray-100 text-black rounded-full shadow hover:bg-white cursor-pointer"
                  >
                    <a href="#properties"> {label} </a>
                  </span>
                )
              )}
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border border-gray-200 bg-white/90 rounded-full shadow-md px-4 py-3">
              <input
                type="text"
                placeholder="Search by location or keyword..."
                className="flex-1 bg-transparent outline-none text-black px-2 py-2 w-full"
              />
              <Link to="/allproperties">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 w-full sm:w-auto">
                  Search
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Counter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-10 w-full px-4 sm:px-0 max-w-4xl"
          >
            <CounterSection />
          </motion.div>

          {/* Final Sparkle Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-8 sm:-mt-2"
          >
            <RotatingSparkleButton size={24} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Herosection;
