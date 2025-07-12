import React, { use } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaHome, FaBed, FaBath, FaRulerCombined, FaAlignLeft } from "react-icons/fa";



const AddPropertyForm = ({ handleSubmit, uploading }) => {
  const { user } = use(AuthContext)
  return (
    <div className="min-h-screen p-6 flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-4xl bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-8"
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-4"
        >
          Add a New Property 🏡
        </motion.h1>

        <motion.p className="text-center text-gray-700 mb-8">
          Fill the form below to post your property. Buyers are waiting!
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              <FaHome className="inline mr-1" /> Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="Luxury Villa in Dhaka"
              className="w-full border rounded-xl px-4 py-2 bg-white/50 backdrop-blur-md"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              <FaMapMarkerAlt className="inline mr-1" /> Location
            </label>
            <input
              type="text"
              name="location"
              required
              placeholder="e.g. Gulshan, Dhaka"
              className="w-full border rounded-xl px-4 py-2 bg-white/50 backdrop-blur-md"
            />
          </div>

          {/* Select Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Property Type</label>
              <select name="type" className="w-full border rounded-xl px-4 py-2 bg-white/50">
                <option value="Apartments">Apartments</option>
                <option value="Villas">Villas</option>
                <option value="Houses">Houses</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700"><FaBed className="inline mr-1" /> Beds</label>
              <select name="beds" className="w-full border rounded-xl px-4 py-2 bg-white/50">
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
                <option value="4+">4+ Beds</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700"><FaBath className="inline mr-1" /> Baths</label>
              <select name="baths" className="w-full border rounded-xl px-4 py-2 bg-white/50">
                <option value="1">1 Bath</option>
                <option value="2">2 Baths</option>
                <option value="3">3 Baths</option>
                <option value="4+">4+ Baths</option>
              </select>
            </div>
          </div>

          {/* Rent or Buy & Sqft */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Rent or Buy</label>
              <select name="status" className="w-full border rounded-xl px-4 py-2 bg-white/50">
                <option value="Rent">Rent</option>
                <option value="Buy">Buy</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700"><FaRulerCombined className="inline mr-1" /> Square Feet</label>
              <input
                type="text"
                name="sqft"
                placeholder="e.g. 1200"
                className="w-full border rounded-xl px-4 py-2 bg-white/50"
              />
            </div>
          </div>

          {/* Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Minimum Price</label>
              <input
                type="number"
                name="minPrice"
                required
                placeholder="e.g. 1000"
                min="0"
                className="w-full border rounded-xl px-4 py-2 bg-white/50"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Maximum Price</label>
              <input
                type="number"
                name="maxPrice"
                required
                placeholder="e.g. 2000000"
                min="0"
                className="w-full border rounded-xl px-4 py-2 bg-white/50"
              />
            </div>
          </div>
          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Upload Image</label>
            <input
              type="file"
              name="image"
              required
              className="w-full border rounded-xl px-4 py-2 bg-white/50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              <FaAlignLeft className="inline mr-1" /> Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Write something about the property..."
              className="w-full border rounded-xl px-4 py-2 bg-white/50"
            ></textarea>
          </div>

          {/* Agent Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Agent Name</label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="w-full border bg-gray-100 text-gray-600 border-gray-300 rounded-xl px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Agent Email</label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full border bg-gray-100 text-gray-600 border-gray-300 rounded-xl px-4 py-2"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl shadow-blue-500/30 font-semibold overflow-hidden transition duration-300"
            >
              {uploading ? <span class='loading loading-dots loading-xs'></span> : "Add Property"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default AddPropertyForm