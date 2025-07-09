import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaUserAlt,
  FaCommentDots,
  FaTimes,
  FaPaperPlane
} from "react-icons/fa";

const PropertyDetails = () => {
  const { id } = useParams(); // URL ID
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState("");

  // Fetch property data from server
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/property/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleWishlist = () => {
    setWishlist(true);
    console.log("Added to wishlist:", property._id);
    // You can POST to wishlist collection here
  };

  const handleReviewSubmit = () => {
    console.log("New Review:", newReview);
    // You can POST new review to database here
    setShowModal(false);
    setNewReview("");
  };

  // Show loading state
  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-gray-700">
        Loading...
      </div>
    );
  }

  // Show not found
  if (!property) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-red-500">
        No Property Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-20">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-80 object-cover"
        />

        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-indigo-700">
              {property.title}
            </h1>
            <button
              onClick={handleWishlist}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                wishlist
                  ? "bg-red-100 text-red-600"
                  : "bg-indigo-100 text-indigo-600"
              }`}
            >
              <FaHeart />
              {wishlist ? "Wishlisted" : "Add to Wishlist"}
            </button>
          </div>

          <div className="flex items-center text-gray-600 text-sm mb-4">
            <FaMapMarkerAlt className="mr-1" /> {property.location}
          </div>

          <p className="text-gray-700 mb-6">{property.description}</p>

          <div className="text-xl font-semibold text-indigo-700 mb-2">
            Price Range:
          </div>
          <p className="mb-4">{property.price}</p>

          <div className="text-lg font-medium flex items-center gap-2 text-gray-600">
            <FaUserAlt /> Agent:{" "}
            <span className="text-indigo-700">{property.agent.name}</span>
          </div>

          {/* Review Section */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Reviews</h2>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
              >
                <FaCommentDots /> Add a Review
              </button>
            </div>

            <div className="space-y-4">
              {property.reviews?.length > 0 ? (
                property.reviews.map((review, index) => (
                  <div key={index} className="p-4 bg-gray-100 rounded-lg">
                    <div className="font-semibold text-indigo-700">
                      {review.user}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Write a Review
            </h3>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full h-32 p-3 border rounded-lg outline-none"
              placeholder="Your review here..."
            />
            <button
              onClick={handleReviewSubmit}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              <FaPaperPlane className="inline mr-2" />
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
