import React, { useContext, useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaUserAlt,
  FaCommentDots,
  FaTimes,
  FaPaperPlane,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../component/Loading";
import EmptyState from "../component/EmptyState";
import { Helmet } from "react-helmet-async";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const sliderRef = useRef(null);

  const [wishlist, setWishlist] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState("");

  // Fetch property
  const { data: property, isLoading: propertyLoading, isError: propertyError } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => (await axiosSecure.get(`/property/${id}`)).data,
    enabled: !!id,
  });

  // Fetch reviews
  const { data: reviews = [], isLoading: reviewsLoading, isError: reviewsError } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => (await axiosSecure.get(`/reviews/by-property/${id}`)).data,
    enabled: !!id,
  });

  // Fetch more properties
  const { data: moreProperties = [], isLoading: morePropertiesLoading, isError: morePropertiesError } = useQuery({
    queryKey: ["more-properties"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/verified-properties`);
      if (!res.ok) throw new Error("Failed to fetch properties");
      return res.json();
    },
  });

  // Check wishlist
  useEffect(() => {
    if (!property || !user) return;
    const checkWishlist = async () => {
      try {
        const res = await axiosSecure.get("/wishlist/check", {
          params: { propertyId: property._id, userEmail: user.email },
        });
        setWishlist(res.data.exists);
      } catch (err) {
        console.error(err);
      }
    };
    checkWishlist();
  }, [property, user, axiosSecure]);

  // Wishlist mutation
  const addWishlistMutation = useMutation({
    mutationFn: async () => {
      const wishlistItem = {
        propertyId: property._id,
        title: property.title,
        image: property.image,
        location: property.location,
        status: property.status,
        maxPrice: property.maxPrice,
        minPrice: property.minPrice,
        userEmail: user.email,
        addedAt: new Date(),
        agentName: property.agent?.name || "",
        agentEmail: property.agent?.email || "",
        agentImage: property.agent?.image || "",
      };
      return axiosSecure.post("/wishlist", wishlistItem);
    },
    onSuccess: () => {
      setWishlist(true);
      navigate("/dashboard/user/wishlist");
    },
    onError: (error) => {
      if (error.response?.status === 409) setWishlist(true);
      else console.error(error);
    },
  });

  // Review mutation
  const submitReviewMutation = useMutation({
    mutationFn: async () => {
      const reviewData = {
        propertyId: property._id,
        propertyTitle: property.title,
        agentName: property.agent?.name || "",
        reviewerEmail: user.email,
        reviewerName: user.displayName,
        reviewerImage: user.photoURL || "",
        comment: newReview,
        createdAt: new Date(),
      };
      return axiosSecure.post("/reviews", reviewData);
    },
    onSuccess: (newReviewData) => {
      queryClient.setQueryData(["reviews", id], (old = []) => [newReviewData, ...old]);
      setNewReview("");
      setShowModal(false);
    },
    onError: (err) => console.error(err),
  });

  if (propertyLoading || reviewsLoading || morePropertiesLoading) return <Loading />;
  if (propertyError || reviewsError || morePropertiesError) return <EmptyState />;

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <Helmet>
        <title>Property Details | DwellX</title>
      </Helmet>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT IMAGE */}
        <div className="space-y-6">
          <img src={property.image} alt={property.title} className="w-full h-full object-cover rounded-2xl shadow-lg" />
        </div>

        {/* RIGHT DETAILS */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-indigo-700">{property.title}</h2>
          </div>

          <div className="text-gray-600 flex items-center mb-4">
            <FaMapMarkerAlt className="mr-2" /> {property.location}
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">{property.description}</p>

          <div className="text-lg font-semibold text-indigo-700 mb-3">
            Price: ${property.minPrice} - ${property.maxPrice}
          </div>

          {/* Agent */}
          <div className="flex items-center gap-3 mb-6">
            {property.agent?.image ? (
              <img src={property.agent.image} alt={property.agent.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <FaUserAlt className="text-xl" />
            )}
            <span className="text-indigo-700 font-medium">Agent: {property.agent?.name}</span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => addWishlistMutation.mutate()}
            disabled={wishlist || addWishlistMutation.isLoading}
            className={`flex items-center w-full justify-center gap-2 px-4 py-3 rounded-full text-md font-medium transition ${
              wishlist ? "bg-red-100 text-red-600 cursor-not-allowed" : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
            }`}
          >
            <FaHeart />
            {wishlist ? "Wishlisted" : addWishlistMutation.isLoading ? "Adding..." : "Add to Wishlist"}
          </button>

          {/* Reviews */}
          <div className="mt-8">
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
                reviews.map((review, i) => (
                  <div key={i} className="p-4 bg-gray-50 border rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      {review.reviewerImage ? <img src={review.reviewerImage} alt={review.reviewerName} className="w-6 h-6 rounded-full" /> : <FaUserAlt />}
                      <span className="font-semibold text-indigo-700">{review.reviewerName}</span>
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


      <div className="mt-24">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3 text-center">
          More Properties You May Like
        </h2>

        {/* Paragraph */}
        <p className="w-[90%] md:w-[50%] mx-auto text-center text-gray-600 mb-10 text-sm md:text-base leading-relaxed">
          Discover more handpicked properties that match your preferences. Browse through a curated selection of homes with stunning features, prime locations, and competitive pricing to help you find your perfect space. Explore these options and get inspired for your next move.
        </p>
      </div>

      {/* More Properties Slider */}
      <div className="mt-16 relative">
        {/* Title */}


        {/* Left/Right Buttons */}
        <button
          onClick={() => sliderRef.current.slickPrev()}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-100 flex items-center justify-center"
        >
          <FaChevronLeft className="text-gray-700" />
        </button>
        <button
          onClick={() => sliderRef.current.slickNext()}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-100 flex items-center justify-center"
        >
          <FaChevronRight className="text-gray-700" />
        </button>

        {/* Slider */}
        <Slider ref={sliderRef} {...sliderSettings} className="px-4">
          {moreProperties.map((p) => (
            <div key={p._id} className="px-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[280px] transition-transform hover:scale-105">
                <img src={p.image} alt={p.title} className="h-40 w-full object-cover" />
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-indigo-700 text-sm">{p.title}</h3>
                    <p className="text-gray-600 text-xs">{p.location}</p>
                  </div>
                  <p className="text-indigo-600 font-semibold mt-2 text-sm">
                    ${p.minPrice} - ${p.maxPrice}
                  </p>
                  <Link to={`/property/${p._id}`}>
                    <button className="px-4 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow hover:from-blue-700 hover:to-purple-700 transition-all">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
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
              onClick={() => submitReviewMutation.mutate()}
              disabled={submitReviewMutation.isLoading}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              <FaPaperPlane className="inline mr-2" />
              {submitReviewMutation.isLoading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
