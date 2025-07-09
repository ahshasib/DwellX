import { useState } from "react";
import {
  FaSearch,
  FaThLarge,
  FaThList,
  FaMapMarkerAlt,
  FaEye,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaShareAlt,
} from "react-icons/fa";
import EmptyState from "../component/EmptyState";
import { useLoaderData } from "react-router";



const AllPropertiesPage = () => {
  const data = []
  const [layout, setLayout] = useState("grid");
  const [search, setSearch] = useState("");

  return (
   <>
   {
    data && data.length > 0 ? <>
     <div className=" min-h-screen py-12 px-4 md:px-10 bg-gradient-to-br from-purple-50 via-white to-indigo-50 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between border border-indigo-100 gap-4 mb-10 p-6 rounded-2xl shadow-lg bg-info-100">
          <div className="flex items-center gap-3 bg-white shadow px-4 py-2 rounded-full w-full md:w-[50%]">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by location, property type..."
              className="outline-none flex-1 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => console.log("Searching for:", search)} // এখানে আপনি আপনার সার্চ ফাংশন বসাতে পারেন
              className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select className="px-4 py-2 rounded-md border text-sm">
              <option>Sort By</option>
              <option>Title</option>
              <option>Price Low to High</option>
              <option>Price High to Low</option>
            </select>

            <button
              onClick={() => setLayout("grid")}
              className={`p-2 rounded-md border ${layout === "grid" && "bg-blue-100 text-blue-600"}`}
            >
              <FaThLarge />
            </button>
            <button
              onClick={() => setLayout("row")}
              className={`p-2 rounded-md border ${layout === "row" && "bg-blue-100 text-blue-600"}`}
            >
              <FaThList />
            </button>
          </div>
        </div>

        <div className={`grid ${layout === "grid" ? "grid-cols-1 md:grid-cols-2 gap-6" : "gap-6"}`}>
          {data.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl shadow-md overflow-hidden relative flex ${layout === "row" ? "flex-col md:flex-row" : "flex-col"
                }`}
            >
              <div className={`relative h-60 ${layout === "row" ? "md:w-1/2 w-full" : "w-full"
                }`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                    {item.type}
                  </span>
                  <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                    {item.status}
                  </span>
                </div>
                <div className="absolute top-2 right-2 text-gray-800 bg-white p-2 rounded-full shadow">
                  <FaShareAlt />
                </div>
              </div>

              <div className="p-4 flex-1">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <FaMapMarkerAlt />
                  {item.location}
                </div>
                <h3 className="text-xl font-semibold text-blue-700 mt-1">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">Price</p>
                <h4 className="text-2xl font-bold text-blue-700">
                  {item.price}
                </h4>

                <div className="grid grid-cols-3 mt-4 gap-2">
                  <div className="bg-blue-50 text-center py-3 rounded-xl text-sm">
                    <FaBed className="mx-auto mb-1 text-xl text-gray-600" />
                    {item.beds} Beds
                  </div>
                  <div className="bg-blue-50 text-center py-3 rounded-xl text-sm">
                    <FaBath className="mx-auto mb-1 text-xl text-gray-600" />
                    {item.baths} Baths
                  </div>
                  <div className="bg-blue-50 text-center py-3 rounded-xl text-sm">
                    <FaRulerCombined className="mx-auto mb-1 text-xl text-gray-600" />
                    {item.size}
                  </div>
                </div>
                <button className="mt-4 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white  py-4 rounded-xl text-sm hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl shadow-blue-500/30">
                Detailed information
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </> : <EmptyState></EmptyState>
   }
   </>
   
  );
};

export default AllPropertiesPage;
