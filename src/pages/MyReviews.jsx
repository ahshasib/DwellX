import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import moment from "moment";
import Loading from "../component/Loading";
import EmptyState from "../component/EmptyState";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch my reviews
  useEffect(() => {
    if (!user) return;

    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get(`/reviews/by-user/${user.email}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching my reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user, axiosSecure]);

  // Handle Delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/reviews/${id}`);
        setReviews(reviews.filter((review) => review._id !== id));
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to delete review.", "error");
      }
    }
  };

  if (loading) return <Loading />;
  if (reviews.length === 0) return <EmptyState message="You haven't added any reviews yet." />;

  return (
    <div className="p-5 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">My Reviews</h2>
      <div className="grid gap-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white shadow-md p-5 rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-indigo-600">
                  {review.propertyTitle}
                </h3>
                <p className="text-gray-500 mb-1">
                  Agent: <span className="text-gray-700">{review.agentName}</span>
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  {moment(review.createdAt).format("MMMM Do YYYY, h:mm a")}
                </p>
                <p className="text-gray-700">{review.comment}</p>
              </div>
              <button
                onClick={() => handleDelete(review._id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
