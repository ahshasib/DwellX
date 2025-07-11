import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../component/Loading";

const MakeOffer = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [offerAmount, setOfferAmount] = useState("");
  const [buyingDate, setBuyingDate] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/property/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amount = Number(offerAmount);
    if (!offerAmount || isNaN(amount)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter a valid offer amount.",
      });
    }

    const [minPrice, maxPrice] = property.price
      .split("-")
      .map((p) => parseInt(p.trim()));

    if (amount < minPrice || amount > maxPrice) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Offer",
        text: `Offer must be between ৳${minPrice} and ৳${maxPrice}`,
      });
    }

    if (!buyingDate) {
      return Swal.fire({
        icon: "error",
        title: "Missing Date",
        text: "Please select a buying date.",
      });
    }

    const offerData = {
      propertyId: property._id,
      title: property.title,
      location: property.location,
      agentName: property.agent?.name,
      buyerName: user.displayName,
      buyerEmail: user.email,
      offerAmount: amount,
      buyingDate,
      status: "pending",
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/offer`, offerData);
      Swal.fire({
        icon: "success",
        title: "Offer Sent!",
        text: "Your offer has been submitted to the agent.",
      });
      setOfferAmount("");
      setBuyingDate("");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong",
      });
    }
  };

  if (!property) return <Loading />;

  const [minPrice, maxPrice] = property.price
    .split("-")
    .map((p) => parseInt(p.trim()));

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">Make an Offer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={property.title}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          type="text"
          value={property.location}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          type="text"
          value={property.agent?.name}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          type="email"
          value={user.email}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          type="text"
          value={user.displayName}
          readOnly
          className="input input-bordered w-full"
        />

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Your Offer Amount <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="1"
            min={minPrice}
            max={maxPrice}
            placeholder="Enter your offer"
            className="input input-bordered w-full"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
          />
          <p className="text-sm mt-1 text-gray-500">
            💰 Must be between{" "}
            <span className="text-indigo-600 font-semibold">
              ৳{minPrice} - ৳{maxPrice}
            </span>
          </p>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Select Buying Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={buyingDate}
            onChange={(e) => setBuyingDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-2">
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;
