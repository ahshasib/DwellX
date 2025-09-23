import React from "react";
import { motion } from "framer-motion";
import { FaMicrophone, FaEnvelope, FaPhone, FaStar } from "react-icons/fa"; // Icons
import CursorParticles from "../component/CursorParticles";

const consultants = [
  {
    id: 1,
    name: "David Miller",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "david.miller@realestate.com",
    phone: "+1 234 567 890",
    rating: 4.8,
    specialty: "Luxury Apartments",
  },
  {
    id: 2,
    name: "Sophia Johnson",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "sophia.johnson@realestate.com",
    phone: "+1 987 654 321",
    rating: 4.9,
    specialty: "Commercial Properties",
  },
  {
    id: 3,
    name: "Michael Smith",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    email: "michael.smith@realestate.com",
    phone: "+1 456 789 123",
    rating: 4.7,
    specialty: "Family Homes",
  },
  {
    id: 4,
    name: "Emma Brown",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    email: "emma.brown@realestate.com",
    phone: "+1 654 321 987",
    rating: 5.0,
    specialty: "Beachfront Villas",
  },
];
// bg-gradient-to-br from-blue-50 to-blue-100
const Consultant = () => {
  return (
    <div className="-mt-7 relative flex flex-col items-center justify-center min-h-screen  overflow-hidden">
      <CursorParticles /> 
      {/* Title */}
      <h1 className="mt-20 text-4xl md:text-5xl font-bold text-blue-800 text-center">
        Our Consultants
      </h1>
      {/* Paragraph */}
      <p className="mt-3 max-w-2xl text-center text-gray-600 px-4">
        Meet our expert real estate consultants who specialize in helping you
        find your dream property. From luxury apartments to beachfront villas,
        our team is here to guide you every step of the way.
      </p>

      {/* Orbit Section */}
      <div className="relative w-[600px] h-[600px] flex items-center justify-center mt-12">
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl flex items-center justify-center animate-pulse">
          <FaMicrophone className="text-white text-6xl drop-shadow-lg" />
        </div>

        {/* Orbit Circle 1 */}
        <motion.div
          className="absolute rounded-full w-[450px] h-[450px] border border-blue-300"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          style={{
            boxShadow:
              "0 0 30px 10px rgba(59,130,246,0.4), 0 0 60px 20px rgba(147,51,234,0.3)",
          }}
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <img
              src={consultants[0].image}
              alt={consultants[0].name}
              className="w-20 h-20 rounded-full shadow-lg"
            />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <img
              src={consultants[1].image}
              alt={consultants[1].name}
              className="w-20 h-20 rounded-full shadow-lg"
            />
          </div>
        </motion.div>

        {/* Orbit Circle 2 */}
        <motion.div
          className="absolute rounded-full w-[300px] h-[300px] border border-blue-200"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          style={{
            boxShadow:
              "0 0 25px 8px rgba(236,72,153,0.4), 0 0 50px 15px rgba(59,130,246,0.3)",
          }}
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <img
              src={consultants[2].image}
              alt={consultants[2].name}
              className="w-16 h-16 rounded-full shadow-lg"
            />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <img
              src={consultants[3].image}
              alt={consultants[3].name}
              className="w-16 h-16 rounded-full shadow-lg"
            />
          </div>
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="w-full">
        <svg
          className="w-full"  // 🌟 Shadow effect যোগ হলো
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <defs>
            {/* Indigo → Violet Gradient */}
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A5B4FC" />
              <stop offset="100%" stopColor="#E0AAFF" />
            </linearGradient>
          </defs>

          {/* Gradient Fill Apply */}
          <path
            d="M0,224L48,202.7C96,181,192,139,288,144C384,149,480,203,576,197.3C672,192,768,128,864,133.3C960,139,1056,213,1152,229.3C1248,245,1344,203,1392,181.3L1440,160L1440,320L0,320Z"
            fill="url(#waveGradient)"
            fillOpacity="1"
          ></path>
        </svg>
      </div>

      {/* Consultant Cards */}
      <div className="w-full py-12 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8
                bg-gradient-to-r from-indigo-300 to-[#E0AAFF]">
        {consultants.map((consultant) => (
          <div
            key={consultant.id}
            className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 relative overflow-hidden"
          >
            {/* Consultant Image */}
            <div className="w-28 h-28 mx-auto rounded-full shadow-lg ring-4 ring-indigo-200 overflow-hidden">
              <img
                src={consultant.image}
                alt={consultant.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name & Specialty */}
            <h3 className="text-2xl font-semibold text-gray-800 text-center mt-4">
              {consultant.name}
            </h3>
            <p className="text-sm text-gray-500 text-center">{consultant.specialty}</p>

            {/* Contact Info */}
            <div className="mt-4 text-gray-600 text-sm space-y-1 text-center">
              <p className="flex items-center justify-center gap-2">
                <FaEnvelope className="text-indigo-400" /> {consultant.email}
              </p>
              <p className="flex items-center justify-center gap-2">
                <FaPhone className="text-indigo-400" /> {consultant.phone}
              </p>
            </div>

            {/* Rating */}
            <div className="flex justify-center mt-3 text-yellow-500">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.round(consultant.rating) ? "text-yellow-500" : "text-gray-300"}
                />
              ))}
            </div>

            {/* Book Now Button */}
            <div className="mt-6 flex justify-center">
              <button className="bg-indigo-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-600 hover:scale-105 transition-all duration-300 shadow-md">
                Book Now
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Consultant;
