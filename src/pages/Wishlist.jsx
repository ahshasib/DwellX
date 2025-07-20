import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { FaUserAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Wishlist = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // ✅ Wishlist fetch করার জন্য query use
    const { data: wishlist = [], isLoading } = useQuery({
        queryKey: ['wishlist', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
            return res.data;
        }
    });

    // ✅ Remove function-এর জন্য mutation use
    const removeMutation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/wishlist/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist', user?.email] });
            Swal.fire('Removed!', 'Property has been removed.', 'success');
        },
        onError: () => {
            Swal.fire('Error', 'Failed to remove item.', 'error');
        }
    });

    // Remove handle function
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
            removeMutation.mutate(id);
        }
    };

    if (isLoading) {
        return <p className="text-center text-lg">Loading wishlist...</p>;
    }

    return (
        <div className="p-6 min-h-screen bg-gradient-to-br">
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
                                    {item.agentImage ? (
                                        <img
                                            src={item.agentImage}
                                            alt="agent"
                                            className="w-9 h-9 rounded-full object-cover border-2 border-indigo-400"
                                        />
                                    ) : (
                                        <FaUserAlt className="text-xl text-gray-500" />
                                    )}

                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Agent: <span className="font-medium">{item.agentName || "Unknown"}</span>
                                        </p>
                                        <p className="text-xs flex items-center gap-1 text-green-500">
                                            {item.status ? (
                                                <>
                                                    <FaCheckCircle /> Verified property
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
                                    💰 ${item.minPrice} - ${item.maxPrice}
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
