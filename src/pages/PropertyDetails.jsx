import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaUserAlt,
  FaCommentDots,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";
import Loading from "../component/Loading";
import EmptyState from "../component/EmptyState";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Load property
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axiosSecure.get(`/property/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id, axiosSecure]);

  // Load reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get(`/reviews/by-property/${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      }
    };
    fetchReviews();
  }, [id, axiosSecure]);

  // Check wishlist
  useEffect(() => {
    const checkWishlist = async () => {
      if (!property || !user) return;
      try {
        const res = await axiosSecure.get(`/wishlist/check`, {
          params: {
            propertyId: property._id,
            userEmail: user.email,
          },
        });
        if (res.data.exists) setWishlist(true);
      } catch (err) {
        console.error("Wishlist check failed:", err);
      }
    };
    checkWishlist();
  }, [property, user, axiosSecure]);

  // Add to wishlist
  const handleWishlist = async () => {
    const wishlistItem = {
      propertyId: property._id,
      title: property.title,
      image: property.image,
      price: property.price,
      location: property.location,
      userEmail: user.email,
      addedAt: new Date(),
    };

    try {
      await axiosSecure.post(`/wishlist`, wishlistItem);
      setWishlist(true);
      navigate("/dashboard/user/wishlist");
    } catch (err) {
      if (err.response?.status === 409) {
        setWishlist(true);
      } else {
        console.error("Wishlist failed:", err);
      }
    }
  };

  // Submit review
  const handleReviewSubmit = async () => {
    if (!newReview.trim()) return;

    const reviewData = {
      propertyId: property._id,
      propertyTitle: property.title,
      agentName: property.agent.name, 
      reviewerEmail: user.email,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL || "",
      comment: newReview,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/reviews", reviewData);
      setReviews([res.data, ...reviews]); // add to top
      setNewReview("");
      setShowModal(false);
    } catch (err) {
      console.error("Review submit failed:", err);
    }
  };

  if (loading) return <Loading />;
  if (!property) return <EmptyState />;

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
              disabled={wishlist}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                wishlist
                  ? "bg-red-100 text-red-600 cursor-not-allowed"
                  : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
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
            {property.agent?.image ? (
              <img
                src={property.agent.image}
                alt={property.agent.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <FaUserAlt className="text-xl" />
            )}
            Agent: <span className="text-indigo-700">{property.agent.name}</span>
          </div>

          {/* Reviews */}
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
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="p-4 bg-gray-100 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {review.reviewerImage ? (
                        <img
                          src={review.reviewerImage}
                          alt={review.reviewerName}
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <FaUserAlt />
                      )}
                      <span className="font-semibold text-indigo-700">
                        {review.reviewerName}
                      </span>
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
            <h3 className="text-xl font-bold mb-4 text-gray-800">Write a Review</h3>
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
