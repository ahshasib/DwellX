import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { FaUserAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router"
import useAxiosSecure from "../hooks/useAxiosSecure";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure(); 

    
    useEffect(() => {
        if (!user?.email) return;
        axiosSecure
            .get(`/wishlist?email=${user.email}`)
            .then((res) => setWishlist(res.data))
            .catch((err) => console.error(err));
    }, [user.email,axiosSecure]);


    //remove function
    const handleRemove = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to undo this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, remove it!'
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/wishlist/${id}`);
                setWishlist((prev) => prev.filter((item) => item._id !== id));
                Swal.fire('Removed!', 'Property has been removed.', 'success');
            } catch (err) {
                console.error("Remove failed", err);
                Swal.fire('Error', 'Failed to remove item.', 'error');
            }
        }
    };


    return (
        <div className="p-6 min-h-screen bg-gradient-to-br ">
            <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
                ❤️ My Wishlist
            </h2>

            {wishlist.length === 0 ? (
                <p className="text-gray-500 text-center text-lg">
                    You haven’t added any properties yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlist.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden border border-gray-200 transform hover:scale-[1.01] transition"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-5 space-y-3">
                                <h3 className="text-2xl font-bold text-indigo-800">{item.title}</h3>

                                <p className="text-gray-500">
                                    📍 <span className="ml-1">{item.location}</span>
                                </p>

                                <div className="flex items-center gap-3">
                                    {item.agent?.image ? (
                                        <img
                                            src={item.agent.image}
                                            alt="agent"
                                            className="w-9 h-9 rounded-full object-cover border-2 border-indigo-400"
                                        />
                                    ) : (
                                        <FaUserAlt className="text-xl text-gray-500" />
                                    )}

                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Agent: <span className="font-medium">{item.agent?.name || "Unknown"}</span>
                                        </p>
                                        <p className="text-xs flex items-center gap-1 text-green-500">
                                            {item.agent?.verified ? (
                                                <>
                                                    <FaCheckCircle /> Verified Agent
                                                </>
                                            ) : (
                                                <span className="flex items-center gap-1 text-red-500">
                                                    <FaTimesCircle /> Not Verified
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-indigo-700 font-semibold text-lg">
                                    💰 {item.price}
                                </p>

                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => navigate(`/dashboard/user/make-offer/${item.propertyId}`)}
                                        className="btn btn-outline btn-sm"
                                    >
                                        Make an Offer
                                    </button>
                                    <button
                                        onClick={() => handleRemove(item._id)}
                                        className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-red-200 transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
