import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../component/Loading";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AdminManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // রিভিউ লোড করার জন্য query
  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  // রিভিউ ডিলিট করার জন্য mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      Swal.fire("Deleted!", "Review has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete review", "error");
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load reviews.
      </div>
    );

  if (reviews.length === 0)
    return (
      <div className="text-center text-gray-500 mt-10">No reviews found.</div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Helmet>
        <title>Manage Review | Dashboard</title>
      </Helmet>
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
                <div className="text-sm text-gray-600">
                  {review.reviewerEmail}
                </div>
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
