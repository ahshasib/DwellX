import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CounterSection from "./CounterSection";
import { FaGlobe, FaStar } from "react-icons/fa";
import RotatingSparkleButton from "./RotatingSparkleButton";


const Herosection = () => {
    return (
        <div className="h-screen w-full">

            {/* Slide 1 */}
            <div className="relative h-screen w-full overflow-hidden">
                <img
                    src="./hero1.png"
                    alt="Luxury House"
                    className="h-screen w-full object-cover"
                />

                {/* Left & Right Shadows */}
                <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-pink-200/60 via-transparent to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-blue-200/60 via-transparent to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-gray-900/20 via-transparent to-transparent z-10 pointer-events-none" />

                {/* Main Content */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                    <span className="inline-flex items-center gap-2 py-2 px-4 text-[15px] bg-white border border-indigo-100 text-indigo-500 rounded-full shadow-sm">
                    <FaGlobe className="text-indigo-500" />
                        Trusted by 50,000+ families <FaStar
                         className="text-yellow-400" size={14}/>
                         <FaStar
                         className="text-yellow-400" size={14}/>
                         <FaStar
                         className="text-yellow-400" size={14}/>
                         <FaStar
                         className="text-yellow-400" size={14}/>
                          <FaStar
                         className="text-yellow-400" size={14}/>
                    </span>
                    <div className="flex justify-between gap-8">
                    <div className="mt-8">
                    <RotatingSparkleButton size={24}></RotatingSparkleButton>
                    </div>
                        
                    <h1 className="text-4xl md:text-8xl font-bold mt-5 mb-4 bg-gradient-to-r from-pink-600 via-indigo-700 to-pink-600 bg-clip-text text-transparent">
                        Find Your Perfect <br />
                        <span className="text-black">Dream Home</span>
                        
                    </h1>
                    <div className="mt-8">
                    <RotatingSparkleButton size={24}></RotatingSparkleButton>
                    </div>
                    </div>
                   
                    <p className="text-lg md:text-xl max-w-2xl mt-4 text-black font-semibold">
                        Discover exceptional properties in prime locations with our{" "}
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            AI-powered search
                        </span>{" "}
                        and{" "}
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            expert guidance
                        </span>
                        .
                        
                    </p>

                    {/* Category + Search Box */}
                    <div
                        className="mt-16 border border-blue-50 w-full max-w-4xl bg-white rounded-3xl py-10 px-6 shadow-xl z-30"

                    >
                        {/* Category Buttons */}
                        <div className="flex flex-wrap  justify-center gap-3 mb-6">
                            {["🏢 Apartments", "🏠 Houses", "🏡 Villas", "🛏️ Studios"].map(
                                (label, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 border border-blue-50 bg-white/90 text-black rounded-full shadow hover:bg-white cursor-pointer flex items-center gap-2"
                                    >
                                        {label}
                                    </span>
                                )
                            )}
                        </div>

                        {/* Search Input */}
                        <div className="flex items-center gap-2 border border-gray-200 bg-white/90 rounded-full shadow-md px-4 py-2 w-full">
                            <input
                                type="text"
                                placeholder="Search by location or keyword..."
                                className="flex-1  bg-transparent outline-none text-black px-2 py-2"
                            />
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90">
                                Search
                            </button>
                        </div>
                    </div>



                    <div className="mt-10 w-[60%] mx-auto">
                    
                        <CounterSection></CounterSection>
                        
                    </div>
                    <RotatingSparkleButton size={24}></RotatingSparkleButton>
                </div>

            </div>


        </div>
    );
};

export default Herosection;
