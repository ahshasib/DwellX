import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

// Brand logos
const logos = [
  { name: "Google", src: "./google-1-1.svg" },
  { name: "Airbnb", src: "./airbnb.svg" },
  { name: "Meta", src: "./meta-quest-1.svg" },
  { name: "Microsoft", src: "microsoft-6.svg" },
  { name: "Amazon", src: "logo-amazon.svg" },
];

// Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function BrandShowcase() {
  return (
    <div>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white w-10/12 mx-auto rounded-2xl shadow-2xl border border-gray-200 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-gray-800 mb-2"
          >
            Powering Success for Global Brands
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 mb-16"
          >
            From startups to Fortune 500 companies, we're the trusted choice
          </motion.p>

          {/* Logo Grid with animation */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 place-items-center"
          >
            {logos.map((logo, index) => (
              <motion.div
                variants={cardVariants}
                key={index}
                whileHover={{
                  y: [-2, -10, 0],
                  rotate: [0, -2, 0],
                  transition: { duration: 0.5, ease: "easeInOut" },
                }}
                className="bg-white rounded-xl shadow-md p-4 w-full flex flex-col items-center h-28 hover:shadow-lg cursor-pointer transition duration-150"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-12 grayscale-0 hover:grayscale transition duration-300"
                />
                <p className="mt-2 text-sm font-medium text-gray-700">{logo.name}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Info tags */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-10 text-sm pt-8 border-t border-gray-300 text-gray-600"
          >
            <span className="flex items-center gap-2 text-green-500">● Enterprise Security</span>
            <span className="flex items-center gap-2 text-blue-500">● 24/7 Support</span>
            <span className="flex items-center gap-2 text-purple-500">● 99.9% Uptime</span>
            <span className="flex items-center gap-2 text-orange-500">● GDPR Compliant</span>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        viewport={{ once: true }}
        className="flex justify-center mt-16"
      >
        <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl shadow-blue-500/30 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2">
          Join Our Network <FaArrowRight />
        </button>
      </motion.div>

      {/* Footer Note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="text-center text-sm text-gray-500 py-5"
      >
        Start your journey with industry-leading companies today
      </motion.p>
    </div>
  );
}
