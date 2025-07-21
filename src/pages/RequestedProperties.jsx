import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const RequestedProperties = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch offers
  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["agentOffers", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/agent/offers?email=${user.email}`);
      return res.data;
    },
  });

  // Accept offer mutation
  const acceptMutation = useMutation({
    mutationFn: async (offerId) =>
      await axiosSecure.patch(`/offer/accept/${offerId}`),
    onSuccess: () => {
      Swal.fire("Accepted", "Offer accepted successfully!", "success");
      queryClient.invalidateQueries(["agentOffers", user?.email]);
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong!", "error");
    },
  });

  // Reject offer mutation
  const rejectMutation = useMutation({
    mutationFn: async (offerId) =>
      await axiosSecure.patch(`/offer/reject/${offerId}`),
    onSuccess: () => {
      Swal.fire("Rejected", "Offer rejected successfully!", "success");
      queryClient.invalidateQueries(["agentOffers", user?.email]);
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong!", "error");
    },
  });

  const handleAccept = (offerId) => {
    acceptMutation.mutate(offerId);
  };

  const handleReject = (offerId) => {
    rejectMutation.mutate(offerId);
  };

  if (isLoading) return <p className="text-center mt-10">Loading offers...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Helmet>
        <title>Requested Properties | Dashboard</title>
      </Helmet>
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
                    {offer.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleAccept(offer._id)}
                          disabled={acceptMutation.isLoading}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(offer._id)}
                          disabled={rejectMutation.isLoading}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
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
