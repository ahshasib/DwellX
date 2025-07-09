import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

const EmptyState = ({ message = "No data is available at this moment" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-600 dark:text-gray-300">
      {/* Rotating Search Icon */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear"
        }}
        className="text-5xl text-blue-500 mb-6"
      >
        <FaSearch />
      </motion.div>

      {/* Message */}
      <h2 className="text-xl md:text-2xl font-semibold">{message}</h2>
    </div>
  );
};

export default EmptyState;
