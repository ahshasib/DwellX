import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch All Properties using useQuery
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["all-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-properties");
      return res.data;
    },
  });

  // Mutation: Verify Property
  const verifyMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/verify-property/${id}`);
      return res.data;
    },
    onSuccess: (data, id) => {
      if (data.modifiedCount > 0) {
        Swal.fire("Success", "Property Verified!", "success");
        queryClient.invalidateQueries(["all-properties"]);
      }
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong!", "error");
    },
  });

  // ✅ Mutation: Reject Property
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/reject-property/${id}`);
      return res.data;
    },
    onSuccess: (data, id) => {
      if (data.modifiedCount > 0) {
        Swal.fire("Rejected", "Property has been rejected.", "info");
        queryClient.invalidateQueries(["all-properties"]);
      }
    },
    onError: () => {
      Swal.fire("Error", "Failed to reject.", "error");
    },
  });

  if (isLoading) {
    return <div className="text-center mt-10 text-lg">Loading properties...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Properties</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">Agent Name</th>
              <th className="py-3 px-6 text-left">Agent Email</th>
              <th className="py-3 px-6 text-left">Price Range</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {properties.map((property) => (
              <tr key={property._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{property?.title}</td>
                <td className="py-3 px-6 text-left">{property?.location}</td>
                <td className="py-3 px-6 text-left">{property?.agent?.name}</td>
                <td className="py-3 px-6 text-left">{property?.agent?.email}</td>
                <td className="py-3 px-6 text-left">
                  ৳{property.minPrice} - ৳{property.maxPrice}
                </td>
                <td className="py-3 px-6 text-left capitalize font-semibold">
                  {property.status === "pending" && (
                    <span className="text-yellow-500">Pending</span>
                  )}
                  {property.status === "verified" && (
                    <span className="text-green-600">Verified</span>
                  )}
                  {property.status === "rejected" && (
                    <span className="text-red-500">Rejected</span>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  {property.status === "pending" ? (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => verifyMutation.mutate(property._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                        disabled={verifyMutation.isLoading}
                      >
                        {verifyMutation.isLoading ? "Verifying..." : "Verify"}
                      </button>
                      <button
                        onClick={() => rejectMutation.mutate(property._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                        disabled={rejectMutation.isLoading}
                      >
                        {rejectMutation.isLoading ? "Rejecting..." : "Reject"}
                      </button>
                    </div>
                  ) : (
                    <span className="italic text-gray-400">No Actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProperties;
