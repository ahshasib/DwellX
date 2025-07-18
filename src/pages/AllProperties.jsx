import { useEffect, useState } from "react";
import {
  FaSearch,
  FaThLarge,
  FaThList,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaShareAlt,
} from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { NavLink } from "react-router";

const AllPropertiesPage = () => {
  const [layout, setLayout] = useState("grid"); // grid or list
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // সার্চ বাটনে ক্লিক করলে এইটা API কল করবে
  const [sort, setSort] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  // সার্চ বাটনে ক্লিক করলে এই ফাংশন কল হবে
  const handleSearch = () => {
    setSearchQuery(search.trim());
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get("http://localhost:5000/verified-properties", {
          params: {
            search: searchQuery || undefined,
            sort: sort || undefined,
          },
        });
        setData(res.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, sort]);

  // পেজ লোড হলে প্রথমে সব প্রপার্টি দেখানোর জন্য:
  useEffect(() => {
    // প্রথমবার searchQuery ফাঁকা থাকবে, তাই সব প্রপার্টি আসবে
    setSearchQuery("");
  }, []);


  return (
    <div className="min-h-screen py-12 px-4 md:px-10 bg-gradient-to-br from-purple-50 via-white to-indigo-50 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between border border-indigo-100 gap-4 mb-10 p-6 rounded-2xl shadow-lg bg-info-100">
          <div className="flex items-center gap-3 bg-white shadow px-4 py-2 rounded-full w-full md:w-[50%] relative">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by location or title..."
              className="outline-none flex-1 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button
              onClick={handleSearch}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm"
              aria-label="Search"
            >
              Search
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select
              className="px-4 py-2 rounded-md border text-sm"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>

            <button
              onClick={() => setLayout("grid")}
              className={`p-2 rounded-md border ${
                layout === "grid" ? "bg-blue-100 text-blue-600" : ""
              }`}
              title="Grid View"
            >
              <FaThLarge />
            </button>
            <button
              onClick={() => setLayout("list")}
              className={`p-2 rounded-md border ${
                layout === "list" ? "bg-blue-100 text-blue-600" : ""
              }`}
              title="List View"
            >
              <FaThList />
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center py-20 text-blue-600 font-semibold text-xl">
            Loading properties...
          </p>
        )}

        {/* No Data */}
        {!loading && data.length === 0 && (
          <p className="text-center py-20 text-gray-500 font-semibold text-xl">
            No properties found.
          </p>
        )}

        {/* Property Cards */}
        <div
          className={
            layout === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 gap-6"
              : "flex flex-col gap-6"
          }
        >
          {data.map((item) => ( 
            
            <div
              key={item._id}
              className={`bg-white rounded-2xl shadow-md overflow-hidden relative flex ${
                layout === "list" ? "flex-col md:flex-row" : "flex-col"
              }`}
            >
              {/* Image */}
              <div
                className={`relative h-60 ${
                  layout === "list" ? "md:w-1/2 w-full" : "w-full"
                }`}
              >
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

              {/* Info */}
              <div className="p-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FaMapMarkerAlt className="text-blue-400" />
                      {item.location}
                    </div>
                    <h3 className="text-xl font-semibold text-blue-600 mt-1">
                      {item.title}
                    </h3>

                    <div className="mt-4 flex items-center gap-3">
                      <img
                        src={item.agent?.image}
                        alt={item.agent?.name}
                        className="w-8 h-8 rounded-full border"
                      />
                      <p className="text-sm text-gray-700">{item.agent?.name}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-left text-gray-500">Price</p>
                    <h4 className="text-xl font-bold text-blue-600">
                      ৳{item.minPrice} - ৳{item.maxPrice}
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-3 mt-6 gap-2">
                  <div className="bg-blue-50 text-center py-3 rounded-xl text-sm">
                    <FaBed className="mx-auto mb-1 text-xl text-blue-600" />
                    {item.beds} Beds
                  </div>
                  <div className="bg-blue-50 text-center py-3 rounded-xl text-sm">
                    <FaBath className="mx-auto mb-1 text-xl text-blue-600" />
                    {item.baths} Baths
                  </div>
                  <div className="bg-blue-50 text-center py-3 rounded-xl text-sm">
                    <FaRulerCombined className="mx-auto mb-1 text-xl text-blue-600" />
                    {item.sqft}
                  </div>
                </div>

               <NavLink to={`/property/${item._id}`}>
               <button className="mt-4 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-4 rounded-xl text-sm hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl shadow-blue-500/30">
                  Detailed information
                </button>

               </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPropertiesPage;
