import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import Loading from "../component/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";

const BoughtProperties = () => {
  const { user } = useContext(AuthContext);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure(); 

  useEffect(() => {
    axiosSecure.get(`/offers?email=${user.email}`)
      .then(res => setOffers(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user.email,axiosSecure]);

  if (loading) return <Loading />;

  if (offers.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-600">No properties bought yet!</h2>
        <p className="text-gray-400 mt-2">Once you make an offer, it will appear here.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Your Property Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {offers.map(offer => (
          <div key={offer._id} className="bg-white rounded-xl shadow p-5 border">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{offer.title}</h3>
            <p className="text-gray-600 mb-1">📍 Location: <span className="text-indigo-600">{offer.location}</span></p>
            <p className="text-gray-600 mb-1">👨‍💼 Agent: {offer.agentName}</p>
            <p className="text-gray-600 mb-1">💰 Offer Amount: <span className="text-green-600 font-semibold">৳{offer.offerAmount}</span></p>
            <p className="text-gray-600 mb-3">📅 Buying Date: {offer.buyingDate}</p>

            <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full 
              ${offer.status === 'pending' && 'bg-yellow-200 text-yellow-700'}
              ${offer.status === 'accepted' && 'bg-green-200 text-green-700'}
              ${offer.status === 'rejected' && 'bg-red-200 text-red-700'}
            `}>
              {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoughtProperties;
