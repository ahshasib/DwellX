import React, { useState, useEffect } from 'react';

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Dummy data for design purpose
    setProperties([
      {
        _id: '1',
        title: 'Luxury Villa',
        location: 'Gulshan, Dhaka',
        agentName: 'Hasibul Islam',
        agentEmail: 'hasibul@example.com',
        minPrice: 100000,
        maxPrice: 150000,
        status: 'pending',
      },
    ]);
  }, []);

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
                <td className="py-3 px-6 text-left">{property.title}</td>
                <td className="py-3 px-6 text-left">{property.location}</td>
                <td className="py-3 px-6 text-left">{property.agentName}</td>
                <td className="py-3 px-6 text-left">{property.agentEmail}</td>
                <td className="py-3 px-6 text-left">
                  ${property.minPrice} - ${property.maxPrice}
                </td>
                <td className="py-3 px-6 text-left capitalize font-semibold">
                  {property.status === 'pending' && <span className="text-yellow-500">Pending</span>}
                  {property.status === 'verified' && <span className="text-green-600">Verified</span>}
                  {property.status === 'rejected' && <span className="text-red-500">Rejected</span>}
                </td>
                <td className="py-3 px-6 text-center">
                  {property.status === 'pending' ? (
                    <div className="flex items-center justify-center gap-2">
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded">
                        Verify
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded">
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
