import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const axiosSecure = useAxiosSecure(); 

  // 1. Fetch All Properties
  useEffect(() => {
    axiosSecure.get('/all-properties')
      .then(res => setProperties(res.data))
      .catch(err => console.error(err));
  }, []);

  // 2. Verify Property
  const handleVerify = async (id) => {
    try {
      const res = await axiosSecure.patch(`/verify-property/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Property Verified!", "success");

        // Update local state
        setProperties(prev =>
          prev.map(p =>
            p._id === id ? { ...p, status: 'verified' } : p
          )
        );
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  // 3. Reject Property
  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/reject-property/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Rejected", "Property has been rejected.", "info");

        // Update local state
        setProperties(prev =>
          prev.map(p =>
            p._id === id ? { ...p, status: 'rejected' } : p
          )
        );
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to reject.", "error");
    }
  };

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
                  {property.status === 'pending' && <span className="text-yellow-500">Pending</span>}
                  {property.status === 'verified' && <span className="text-green-600">Verified</span>}
                  {property.status === 'rejected' && <span className="text-red-500">Rejected</span>}
                </td>
                <td className="py-3 px-6 text-center">
                  {property.status === 'pending' ? (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleVerify(property._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => handleReject(property._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                      >
                        Reject
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
