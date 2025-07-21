import { motion } from "framer-motion";
import {
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaHeart,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../component/Loading";
import EmptyState from "../component/EmptyState";

const fetchLatestReviews = async (axiosSecure) => {
  const res = await axiosSecure.get("/reviews/latest");
  return res.data;
};

const TestimonialSection = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latest-reviews"],
    queryFn: () => fetchLatestReviews(axiosSecure),
  });

  if (isLoading) return <Loading />;
  if (isError) return <EmptyState message="Failed to load reviews!" />;
  if (!reviews.length) return <EmptyState message="No reviews available yet!" />;

  return (
    <section className="mt-20 py-24 px-4 dark:from-gray-900 dark:to-gray-800">
      {/* Section Title */}
      <div className="text-center mb-20">
        <h1 className="text-3xl md:text-5xl font-extrabold text-indigo-900 dark:text-white mb-4">
          What Our Clients <br /> <span className="text-indigo-500">Are Saying</span>
        </h1>
        <hr className="border-t-4 border-indigo-600 w-[10%] mx-auto my-8 rounded-full" />
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Hear real stories from real people who found their dream properties with us.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {reviews.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative bg-white/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 pb-12 dark:bg-white/5"
            style={{
              boxShadow: `
                inset 10px 10px 20px rgba(99, 102, 241, 0.12),   /* top-left indigo - softer */
                inset -10px -10px 20px rgba(139, 92, 246, 0.12)  /* bottom-right violet - softer */
              `,
            }}
            
          >
            {/* Verified Badge */}
            <div className="absolute -top-6 right-6 flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-1.5 rounded-full shadow-md text-sm font-semibold z-10">
              <FaCheckCircle className="text-white" />
              Verified Client
            </div>

            {/* Property Title */}
            <h4 className="text-indigo-600 font-semibold mb-1">
              {item.propertyTitle || "Unknown Property"}
            </h4>

            {/* Comment */}
            <p className="text-lg text-gray-700 dark:text-gray-100 italic leading-relaxed mb-8">
              “{item.comment}”
            </p>

            {/* User Info */}
            <div className="flex items-center gap-5 absolute bottom-6 left-8">
              <img
                src={item.reviewerImage || "https://i.ibb.co/rHqK1WK/user.png"}
                alt={item.reviewerName || "User"}
                className="w-16 h-16 rounded-full border-4 border-indigo-400"
              />
              <div>
                <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-300">
                  {item.reviewerName}
                </h3>
                <div className="flex text-yellow-400 mt-1">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-20">
        <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl shadow-blue-500/30 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-3">
          <FaHeart className="text-pink-500 text-lg" />
          Share Your Experience
          <FaArrowRight />
        </button>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-center justify-center pt-5">
        <p className="text-gray-600">No registration required • Free to start</p>
      </div>
    </section>
  );
};

export default TestimonialSection;
