import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaUserAlt,
  FaCommentDots,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../component/Loading";
import EmptyState from "../component/EmptyState";
import { Helmet } from "react-helmet-async";
import Slider from "react-slick"; // small card slider

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [wishlist, setWishlist] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState("");

  const {
    data: property,
    isLoading: propertyLoading,
    isError: propertyError,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/property/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/by-property/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Dummy more properties (carousel)
  const moreProperties = [
    {
      id: 1,
      title: "Luxury Apartment",
      image: "https://source.unsplash.com/400x250/?apartment",
      location: "Dhaka, Bangladesh",
      price: "$1200",
    },
    {
      id: 2,
      title: "Modern Villa",
      image: "https://source.unsplash.com/400x250/?villa",
      location: "Cox’s Bazar",
      price: "$2500",
    },
    {
      id: 3,
      title: "Commercial Office",
      image: "https://source.unsplash.com/400x250/?office",
      location: "Chittagong",
      price: "$1800",
    },
  ];

  // Ads Section dummy
  const ads = [
    "https://source.unsplash.com/300x250/?real-estate",
    "https://source.unsplash.com/300x250/?interior",
  ];

  if (propertyLoading || reviewsLoading) return <Loading />;
  if (propertyError || reviewsError) return <EmptyState />;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <Helmet>
        <title>Property Details | DwellX</title>
      </Helmet>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE IMAGE + ADS */}
        <div className="space-y-6">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
          />
          {/* Ads */}
          <div className="space-y-4">
            {ads.map((ad, idx) => (
              <img
                key={idx}
                src={ad}
                alt="Advertisement"
                className="w-full rounded-xl shadow-md"
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE DETAILS */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-indigo-700">
              {property.title}
            </h2>
            <button
              disabled={wishlist}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                wishlist
                  ? "bg-red-100 text-red-600"
                  : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
              }`}
            >
              <FaHeart />
              {wishlist ? "Wishlisted" : "Add to Wishlist"}
            </button>
          </div>

          <div className="text-gray-600 flex items-center mb-4">
            <FaMapMarkerAlt className="mr-2" /> {property.location}
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            {property.description}
          </p>

          <div className="text-lg font-semibold text-indigo-700 mb-3">
            Price: ${property.minPrice} - ${property.maxPrice}
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
            <p>🛏 Bedrooms: 3</p>
            <p>🛁 Bathrooms: 2</p>
            <p>📐 Area: 1500 sqft</p>
            <p>🏠 Furnished: Yes</p>
          </div>

          {/* Agent Info */}
          <div className="flex items-center gap-3 mb-6">
            {property.agent?.image ? (
              <img
                src={property.agent.image}
                alt={property.agent.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <FaUserAlt className="text-xl" />
            )}
            <span className="text-indigo-700 font-medium">
              Agent: {property.agent?.name}
            </span>
          </div>

          {/* Contact Agent */}
          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition mb-10">
            Contact Agent
          </button>

          {/* Reviews Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
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
                  <div
                    key={index}
                    className="p-4 bg-gray-50 border rounded-xl shadow-sm"
                  >
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

      {/* More Properties Slider */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          More Properties You May Like
        </h2>
        <div className="overflow-hidden">
          <div className="flex gap-6 animate-scroll">
            {moreProperties.map((p) => (
              <div
                key={p.id}
                className="min-w-[250px] bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-indigo-700">{p.title}</h3>
                  <p className="text-gray-600">{p.location}</p>
                  <p className="text-indigo-600 font-semibold">{p.price}</p>
                </div>
              </div>
            ))}
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
            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
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
