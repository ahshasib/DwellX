import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RequestedProperties = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all offers for this agent
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/agent/offers?email=${user.email}`)
        .then((res) => {
          setOffers(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching offers:", err);
          setLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  const handleAccept = async (offerId) => {
    try {
      const result = await axiosSecure.patch(`/offer/accept/${offerId}`);
      if (result.data.modifiedCount || result.data.message) {
        Swal.fire("Accepted", "Offer accepted successfully!", "success");

        // Reload offers
        const res = await axiosSecure.get(`/agent/offers?email=${user.email}`);
        setOffers(res.data);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  const handleReject = async (offerId) => {
    try {
      await axiosSecure.patch(`/offer/reject/${offerId}`);
      Swal.fire("Rejected", "Offer rejected successfully!", "success");

      // Reload offers
      const res = await axiosSecure.get(`/agent/offers?email=${user.email}`);
      setOffers(res.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading offers...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        Requested Properties (Offers)
      </h1>

      {offers.length === 0 ? (
        <p className="text-gray-600 text-center">No offers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-indigo-100">
              <tr>
                <th>Property</th>
                <th>Buyer</th>
                <th>Offer</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer._id} className="border-b">
                  <td>
                    <p className="font-semibold">{offer.title}</p>
                    <p className="text-sm text-gray-500">{offer.location}</p>
                  </td>
                  <td>
                    <p>{offer.buyerName}</p>
                    <p className="text-sm text-gray-500">{offer.buyerEmail}</p>
                  </td>
                  <td>৳{offer.offerAmount}</td>
                  <td>{offer.buyingDate}</td>
                  <td>
                    <span
                      className={`px-2 py-1 text-xs rounded font-medium ${
                        offer.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : offer.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {offer.status}
                    </span>
                  </td>
                  <td className="text-center space-x-2">
                    {offer.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAccept(offer._id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(offer._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {offer.status !== "pending" && (
                      <span className="text-gray-500 text-sm italic">
                        No action
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestedProperties;
