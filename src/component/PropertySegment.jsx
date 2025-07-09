import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaBath, FaBed, FaRulerCombined, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { Link, useLoaderData } from "react-router";

const categories = ["All Properties", "Apartments", "Villas", "Houses"];


    

const PropertySegment = () => {
    const properties = useLoaderData()
    const [active, setActive] = useState("All Properties");

    return (
        <div className="px-6 py-10 max-w-7xl mx-auto  dark:bg-gray-900">
            <p className="text-indigo-500 text-center pb-3">Explore Properties</p>
            <h2 className="text-2xl md:text-5xl font-bold text-center mb-4 text-gray-800 dark:text-white">
                Explore Our Properties
            </h2>
            <motion.hr
                initial={{ width: "10%" }}
                animate={{ width: "40%" }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
                className="mx-auto border-t-4 border-blue-600 my-6"
            />
            <p className="text-gray-500 text-center  my-10">
                Discover our handpicked selection of premium properties designed to <br /> match your lifestyle needs
            </p>

            <div className="flex justify-center gap-4 mb-10 flex-wrap">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${active === category
                                ? "bg-blue-600 text-white"
                                : "bg-white shadow-md text-gray-600 border border-blue-100"
                            }`}
                        onClick={() => setActive(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer"
                    >
                        <div className="relative overflow-hidden">
                            <motion.img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            <button className=" absolute top-3 right-3 backdrop-blur-md bg-white/70 dark:bg-black/50 p-2 rounded-full text-gray-500 shadow hover:scale-110 transition-all duration-200">
                                <FaHeart />
                            </button>
                        </div>

                        <div className="p-5 space-y-3">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">{item.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                                <FaMapMarkerAlt className="text-red-500" />{item.location}</p>

                            <div className="flex justify-between py-3 border-y border-indigo-100 text-sm text-gray-600 dark:text-gray-300">
                                <p className="flex items-center gap-1">
                                    <FaBed className="text-blue-500" /> {item.beds} Beds
                                </p>
                                <p className="flex items-center gap-1">
                                    <FaBath className="text-purple-500" /> {item.baths} Baths
                                </p>
                                <p className="flex items-center gap-1 text-sm text-gray-700 dark:text-white">
                                    <FaRulerCombined className="text-green-600" />{item.sqft} sqft</p>
                            </div>



                            <div className="flex items-center justify-between pt-4">
                                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                ৳ {item.price}
                                </p>
                                <Link to={`/property/${item._id}`}>
                                <button className="px-4 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow hover:from-blue-700 hover:to-purple-700 transition-all">
                                    See Details
                                </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}

               


            </div>

            <div className="flex justify-center mt-16">
                    <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl shadow-blue-500/30 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2">
                    Browse All Properties <FaArrowRight />
                    </button>
                </div>
                <p className="text-center text-sm text-gray-500 pt-5">Start your journey with industry-leading companies today</p>

        </div>
    );
};

export default PropertySegment;
