import { motion } from "framer-motion";
import { FaStar, FaCheckCircle, FaQuoteRight, FaQuoteLeft, FaArrowRight, FaHeart } from "react-icons/fa";

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        comment:
            "Absolutely amazing service! Found my perfect apartment in just a few days. The team was so responsive and professional.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        id: 2,
        name: "John Smith",
        comment:
            "They helped me find the exact kind of place I was looking for. Fast, easy, and professional experience overall!",
        rating: 4,
        image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
        id: 3,
        name: "Ayesha Khan",
        comment: "Loved the personalized support. They made the whole process seamless.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        id: 4,
        name: "David Lee",
        comment: "Impressive service and great communication throughout.",
        rating: 4,
        image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
        id: 5,
        name: "Emily Davis",
        comment: "Got a villa that was beyond expectations. Highly recommended!",
        rating: 5,
        image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
        id: 6,
        name: "Michael Chen",
        comment: "Super smooth experience from start to finish. Loved it!",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/10.jpg",
    },

];

const TestimonialSection = () => {
    return (
        <section className="mt-20 py-24 px-4 dark:from-gray-900 dark:to-gray-800">
            {/* Section Title */}
            <div className="text-center mb-20">
                <h1 className="text-5xl font-extrabold text-indigo-900 dark:text-white mb-4">
                    What Our Clients <br /> <span className="text-indigo-500">Are Saying</span>
                </h1>
                <hr className="border-t-4 border-indigo-600 w-[10%] mx-auto my-8 rounded-full" />
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Hear real stories from real people who found their dream properties with us.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                {testimonials.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.15 }}
                        className="relative bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 pb-12 dark:bg-white/5"
                    >
                        {/* Fancy Verified Badge */}
                        <div className="absolute -top-6 right-6 flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-1.5 rounded-full shadow-md text-sm font-semibold z-10">
                            <FaCheckCircle className="text-white" />
                            Verified Client
                        </div>

                        {/* Comment */}
                        <p className="text-lg text-gray-700 dark:text-gray-100 italic leading-relaxed mb-8">
                            “{item.comment}”
                        </p>

                        {/* User Info */}
                        <div className="flex items-center gap-5 absolute bottom-6 left-8">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-full border-4 border-indigo-400"
                            />
                            <div>
                                <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-300">
                                    {item.name}
                                </h3>
                                <div className="flex text-yellow-400 mt-1">
                                    {Array(item.rating)
                                        .fill()
                                        .map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center mt-20">
                <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl shadow-blue-500/30 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-3">

                    {/* Left Love Icon */}
                    <FaHeart className="text-pink-500 text-lg" />

                    Share Your Experience

                    {/* Right Arrow Icon */}
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
