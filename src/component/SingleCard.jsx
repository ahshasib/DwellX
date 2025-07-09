import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const GlassReviewCard = () => {
    return (
        <div className="flex justify-center items-center mt-16 dark:from-gray-900 dark:to-gray-800 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="w-[60%] relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-10 text-center overflow-hidden"
            >
                {/* Background Icon */}
                <FaQuoteLeft className="absolute top-4 left-4 text-indigo-300/30 text-7xl z-0" />

                {/* Glass reflection */}
                <div className="absolute -top-1/3 -left-1/3 w-2/3 h-2/3 bg-white/10 rounded-full blur-3xl opacity-30"></div>

                {/* Content */}
                <div className="relative z-10">
                    <p className="text-lg md:text-xl text-gray-800 dark:text-white font-medium italic mb-6">
                        “The 3-step process was incredibly smooth. Within a week, I found and secured my dream apartment!”
                    </p>
                    <div className="mt-6">
                        <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400"><span className="bg-indigo-500 text-white rounded-full px-3 py-1 mr-3">H</span>Hasibul Islam</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">New York</p>
                        <div className="flex justify-center p-3">
                            <FaStar
                                className="text-yellow-400" size={14} />
                            <FaStar
                                className="text-yellow-400" size={14} />
                            <FaStar
                                className="text-yellow-400" size={14} />
                            <FaStar
                                className="text-yellow-400" size={14} />
                            <FaStar
                                className="text-yellow-400" size={14} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default GlassReviewCard;
