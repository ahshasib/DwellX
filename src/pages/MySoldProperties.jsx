import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../context/AuthProvider';
import Loading from '../component/Loading';
import { Helmet } from 'react-helmet-async';
import EmptyState from '../component/EmptyState';

const MySoldProperties = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: soldProperties = [], isLoading, isError, error } = useQuery({
    queryKey: ['sold-properties', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/sold-properties?sellerEmail=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500 p-4">Error: {error.message}</p>;

  return (
    <div className="p-6 overflow-x-auto">
      <Helmet>
        <title>My Sold Properties | Dashboard</title>
      </Helmet>
      <h2 className="text-2xl md:text-4xl text-center font-bold mb-6 text-black">My Sold Properties</h2>
      <p className='w-[90%] md:w-[70%] mx-auto text-gray-500 text-center pb-7'>This section provides an overview of your sold properties, including buyer information, locations, and transaction values. Use this data to review your sales performance and stay informed about your recent deals.

      </p>
      {soldProperties.length === 0 ? (
        <EmptyState></EmptyState>
      ) : (
        <table className="min-w-full bg-transparent rounded-xl shadow-md overflow-hidden">
          <thead className="bg-indigo-100 text-black text-sm uppercase">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Offer Amount</th>
              <th className="px-6 py-4 text-left">Buyer Name</th>
              <th className="px-6 py-4 text-left">Buyer Email</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y divide-gray-200">
            {soldProperties.map((property, index) => (
              <tr key={property._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium">{index + 1}</td>
                <td className="px-6 py-4">{property.title}</td>
                <td className="px-6 py-4">{property.location}</td>
                <td className="px-6 py-4">${property.offerAmount}</td>
                <td className="px-6 py-4">{property.buyerName}</td>
                <td className="px-6 py-4">{property.buyerEmail}</td>
                <td className="px-6 py-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-700 capitalize">
                    {property.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      )}
    </div>
  );
};

export default MySoldProperties;
