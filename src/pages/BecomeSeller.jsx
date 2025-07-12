import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";


const BecomeSeller = () => {
    const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [agree, setAgree] = useState(false);
  const [alreadyRequested, setAlreadyRequested] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/all-users`) // fetch all users or better: `/user/${user.email}`
        .then((res) => {
          const currentUser = res.data.find((u) => u.email === user.email);
          if (currentUser?.status === "requested") {
            setAlreadyRequested(true);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  const handleRequest = async () => {
    try {
      const res = await axiosSecure.patch(`/become-seller/${user.email}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Request Sent!", "Your request to become a seller has been sent to admin.", "success");
        setAlreadyRequested(true);
      } else {
        Swal.fire("Error", "Something went wrong", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Request failed", "error");
    }
  };
  
    return (
        <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded shadow">
        <Helmet>
          <title>Become a Seller | Real Estate</title>
        </Helmet>
  
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Request to Become a Seller
        </h2>
  
        <p className="text-gray-700 text-sm mb-6 text-justify">
          Welcome to our Real Estate Platform! If you want to list your properties like houses, land, apartments, or commercial spaces for sale or rent — you must be approved as a verified <strong>Seller</strong>. Once approved, you will be able to post, edit, and manage your real estate listings. Please read and agree to the rules below to submit your request.
        </p>
  
        <h3 className="font-semibold mb-2 text-gray-800">Seller Guidelines:</h3>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2 text-sm">
          <li>You must provide accurate and honest property details.</li>
          <li>Uploaded images must be real and not misleading.</li>
          <li>No duplicate or fake listings are allowed.</li>
          <li>All properties must follow local real estate regulations.</li>
          <li>Once approved, you’ll be responsible for managing your own listings.</li>
        </ul>
  
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="checkbox checkbox-primary"
          />
          <label htmlFor="agree" className="text-sm text-gray-800">
            I have read and agree to the above rules.
          </label>
        </div>
  
        <button
          className="btn btn-primary w-full"
          disabled={!agree || alreadyRequested}
          onClick={handleRequest}
        >
          {alreadyRequested ? "Request Already Sent" : "Send Request to Admin"}
        </button>
      </div>
    );
  };

export default BecomeSeller