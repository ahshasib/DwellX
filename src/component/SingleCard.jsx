import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const GlassReviewCard = () => {
  return (
    <div className="flex justify-center items-center mt-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="card-wrapper w-[60%] h-[300px] perspective"
      >
        <div className="card-inner">
          {/* Front Side */}
          <div className="card-face card-front bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-inner-card relative">
            <FaQuoteLeft className="absolute top-4 left-4 text-indigo-300/30 text-7xl z-0" />
            <div className="absolute -top-1/3 -left-1/3 w-2/3 h-2/3 bg-white/10 rounded-full blur-3xl opacity-30"></div>

            <div className="relative z-10 text-center">
              <p className="text-lg md:text-xl text-gray-800 dark:text-white font-medium italic mb-6">
                “The 3-step process was incredibly smooth. Within a week, I found and secured my dream apartment!”
              </p>
              <div className="mt-6">
                <h3 className="texl-lg md:text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  <span className="bg-indigo-500 text-white rounded-full px-3 py-1 mr-3">H</span>
                  Hasibul Islam
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">New York</p>
                <div className="flex justify-center p-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" size={14} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="card-face card-back bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-3xl p-10">
            <h2 className="text-2xl font-bold mb-4">More About Hasibul</h2>
            <p className="text-sm">
              Hasibul is a passionate real estate investor and entrepreneur. He loves helping
              people find their dream home with ease and trust.
            </p>
            <p className="mt-4 italic text-sm text-violet-100">Thanks for reading this card!</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GlassReviewCard;
