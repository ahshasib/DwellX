import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../context/AuthProvider';
import Loading from '../component/Loading';

const MySoldProperties = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // ✅ TanStack useQuery to fetch sold properties
  const { data: soldProperties = [], isLoading, isError, error } = useQuery({
    queryKey: ['sold-properties', user?.email],
    enabled: !!user?.email, // only run if user email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/sold-properties?sellerEmail=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500 p-4">Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-700">My Sold Properties</h2>

      {soldProperties.length === 0 ? (
        <p className="text-gray-500">No properties sold yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {soldProperties.map(property => (
            <div key={property._id} className="border p-4 rounded-lg shadow bg-white">
              <h3 className="text-lg font-semibold">{property.title}</h3>
              <p className="text-gray-600">📍 {property.location}</p>
              <p className="text-gray-600">💰 ৳{property.offerAmount}</p>
              <p className="text-gray-600">👤 Buyer: {property.buyerName}</p>
              <p className="text-gray-600">📧 {property.buyerEmail}</p>
              <p className="text-gray-600">🟢 Status:
                <span className="ml-2 font-medium text-green-600 capitalize">{property.status}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySoldProperties;
