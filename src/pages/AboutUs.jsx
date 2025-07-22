import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="mt-0 md:-mt-3 px-6 py-16 md:px-28 bg-gradient-to-br from-indigo-50 to-violet-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-500 mb-6">About DuellX</h1>
        <p className="text-gray-700 text-lg leading-relaxed italic">
          At <span className="font-semibold text-indigo-600">DuellX</span>, we are redefining the way properties are bought and sold. Our mission is to empower individuals and agents by offering a seamless, transparent, and efficient real estate platform. Whether you're a buyer seeking the perfect home or a seller aiming to reach a wide audience, DuellX bridges the gap with smart tools, verified listings, and user-friendly features. <br /><br />
          With a team of passionate innovators and real estate professionals, we combine technology with trust to ensure every transaction is smooth and secure. Our platform not only showcases properties but also tells the story behind each listing — helping you make confident and informed decisions. Join DuellX and experience the future of property trading today.
        </p>
      </motion.div>

      {/* Optional Decorative Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-14 flex justify-center"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/609/609803.png"
          alt="Real Estate Icon"
          className="w-28 h-28 md:w-36 md:h-36 drop-shadow-lg"
        />
      </motion.div>
      <motion.p
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.6 }}
  viewport={{ once: true }}
  className="mt-12 text-3xl italic md:w-[75%] text-gray-600 text-right pr-4 great-vibes-regular"
>
  — Hasibul Islam
</motion.p>

    </div>
  );
};

export default AboutUs;
