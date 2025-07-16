import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import Loading from "../component/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";

import PaymentModal from "../component/PaymentModal";

const BoughtProperties = () => {
  const { user } = useContext(AuthContext);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/offers?email=${user.email}`)
      .then(res => setOffers(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user.email, axiosSecure]);

  const handlePay = (offer) => {
    setSelectedOffer(offer);
    document.getElementById("paymentModal").showModal();

  };

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
              ${offer.status === 'pending' ? 'bg-yellow-200 text-yellow-700 mt-2' : ''}
              ${offer.status === 'accepted' ? 'bg-green-200 text-green-700 mt-2' : ''}
              ${offer.status === 'rejected' ? 'bg-red-200 text-red-700 mt-2' : ''}
            `}>
              {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
            </span>

            {offer.status === "accepted" && (
              <button
                className="mt-2 ml-5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-1.5 px-4 rounded-full transition"
                onClick={() => handlePay(offer)}
              >
                Pay
              </button>
            )}

           

          </div>



        ))}
      </div>


 {/* modal */}
 <PaymentModal 
 offerAmount={selectedOffer?.offerAmount}
 offerId={selectedOffer?._id}
id="paymentModal" title="Stripe Payment Coming Soon!" />


    </div>
  );
};

export default BoughtProperties;
