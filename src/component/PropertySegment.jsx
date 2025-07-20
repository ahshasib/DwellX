import React, { useState, useEffect } from "react";
import {
  FaHeart,
  FaBath,
  FaBed,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import EmptyState from "./EmptyState";

const categories = ["All Properties", "Apartments", "Villas", "Houses"];

const fetchProperties = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/verified-properties`);
  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }
  return res.json();
};

const PropertySegment = () => {
  const { data: allProperties = [], isLoading: isDataLoading, error } = useQuery({
    queryKey: ["verified-properties"],
    queryFn: fetchProperties,
  });

  const [active, setActive] = useState("All Properties");
  const [visibleProperties, setVisibleProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initial load
  useEffect(() => {
    if (allProperties.length > 0) {
      setVisibleProperties(allProperties.slice(0, 6));
    }
  }, [allProperties]);

  // Handle category change with loading simulation
  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      if (active === "All Properties") {
        setVisibleProperties(allProperties.slice(0, 6));
      } else {
        const filtered = allProperties.filter(
          (property) =>
            property.type?.toLowerCase().trim() === active.toLowerCase().trim()
        );
        setVisibleProperties(filtered);
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [active, allProperties]);

  if (isDataLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Failed to load properties.</div>;
  }

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto dark:bg-gray-900">
      <p className="text-indigo-500 text-center pb-3">Explore Properties</p>
      <h2 className="text-2xl md:text-5xl font-bold text-center mb-4 text-gray-800 dark:text-white">
        Explore Our Properties
      </h2>

      <hr
        style={{ width: "40%" }}
        className="mx-auto border-t-4 border-blue-600 my-6"
      />

      <p className="text-gray-500 text-center my-10">
        Discover our handpicked selection of premium properties designed to <br /> match your lifestyle needs
      </p>

      {/* Category buttons */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
              active === category
                ? "bg-blue-600 text-white"
                : "bg-white shadow-md text-gray-600 border border-blue-100"
            }`}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : visibleProperties.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-300 text-lg py-10">
          <EmptyState />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleProperties.map((item) => (
            <div
              key={item._id}
              className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer transform transition-transform duration-500 hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-56 object-cover"
                />
                <button className="absolute top-3 right-3 backdrop-blur-md bg-white/70 dark:bg-black/50 p-2 rounded-full text-gray-500 shadow hover:scale-110 transition-all duration-200">
                  <FaHeart />
                </button>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                  <FaMapMarkerAlt className="text-red-500" />
                  {item.location}
                </p>

                <div className="flex justify-between py-3 border-y border-indigo-100 text-sm text-gray-600 dark:text-gray-300">
                  <p className="flex items-center gap-1">
                    <FaBed className="text-blue-500" /> {item.beds} Beds
                  </p>
                  <p className="flex items-center gap-1">
                    <FaBath className="text-purple-500" /> {item.baths} Baths
                  </p>
                  <p className="flex items-center gap-1 text-sm text-gray-700 dark:text-white">
                    <FaRulerCombined className="text-green-600" />
                    {item.sqft} sqft
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ৳ {item.minPrice}-৳ {item.maxPrice}
                  </p>
                  <Link to={`/property/${item._id}`}>
                    <button className="px-4 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow hover:from-blue-700 hover:to-purple-700 transition-all">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Browse All Button */}
      <div className="flex justify-center mt-16">
        <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl shadow-blue-500/30 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2">
          Browse All Properties <FaArrowRight />
        </button>
      </div>
      <p className="text-center text-sm text-gray-500 pt-5">
        Start your journey with industry-leading companies today
      </p>
    </div>
  );
};

export default PropertySegment;
