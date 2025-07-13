import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../component/Loading";
import Swal from "sweetalert2";

const AdminManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // রিভিউস লোড করা
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get("/reviews");
        setReviews(res.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        Swal.fire("Error", "Failed to load reviews", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [axiosSecure]);

  // রিভিউ ডিলিট করা
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/reviews/${id}`);
        setReviews(reviews.filter((rev) => rev._id !== id));
        Swal.fire("Deleted!", "Review has been deleted.", "success");
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire("Error", "Failed to delete review", "error");
      }
    }
  };

  if (loading) return <Loading />;

  if (reviews.length === 0)
    return (
      <div className="text-center text-gray-500 mt-10">
        No reviews found.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        Manage User Reviews
      </h1>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded shadow"
          >
            <div className="flex items-center gap-4">
              {review.reviewerImage ? (
                <img
                  src={review.reviewerImage}
                  alt={review.reviewerName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                  {review.reviewerName?.charAt(0) || "U"}
                </div>
              )}
              <div>
                <div className="font-semibold text-indigo-700">
                  {review.reviewerName}
                </div>
                <div className="text-sm text-gray-600">{review.reviewerEmail}</div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(review._id)}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Delete
            </button>
            
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default AdminManageReviews;
