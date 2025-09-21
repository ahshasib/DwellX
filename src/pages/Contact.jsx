import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaFacebookF, FaWhatsapp, FaTwitter, FaFacebookMessenger } from "react-icons/fa";


const colors = ["#A3C8FF", "#FFB3B3", "#A8E6A3"];

const Contact = () => {
    const bubbles = [
        { color: colors[0], top: "20%", left: "15%" },
        { color: colors[1], bottom: "15%", right: "20%" },
        { color: colors[2], top: "10%", right: "10%" },
    ];

    const faqs = [
        {
            question: "How can I contact support?",
            answer: "You can reach us via email, phone, or the contact form above.",
        },
        {
            question: "What are your working hours?",
            answer: "Our office is open Monday to Friday from 9 AM to 6 PM.",
        },
        {
            question: "Where are you located?",
            answer: "We are located at 123 Main Street, Your City, Country.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-100 -mt-7">

            <h2 className="text-center mt-10 pt-10 font-bold text-5xl">You can contact with us <span className="text-indigo-500">anytime</span></h2>
            <p className="w-[80%] md:w-[50%] mx-auto text-center py-3">Have questions or need assistance? We are here to help! Whether you want to know more about our services, need support, or have any feedback, our team is ready to provide answers. Browse through the frequently asked questions below, or feel free to reach out using the contact form. Your queries are important to us, and we strive to respond promptly and clearly to ensure you have the best experience possible.</p>

            {/* Bubble Background */}
            <div className="absolute inset-0 z-10">
                {bubbles.map((bubble, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            width: "420px",
                            height: "420px",
                            backgroundColor: bubble.color,
                            top: bubble.top,
                            left: bubble.left,
                            right: bubble.right,
                            bottom: bubble.bottom,
                            opacity: 0.55,
                            boxShadow: `0 0 70px ${bubble.color}`,
                        }}
                        animate={{
                            scale: [1, 1.1, 0.95, 1.05, 1],
                            borderRadius: [
                                "40% 60% 70% 30% / 50% 40% 60% 50%",
                                "60% 40% 30% 70% / 40% 60% 50% 50%",
                                "55% 45% 65% 35% / 60% 50% 40% 60%",
                                "70% 30% 50% 50% / 30% 70% 60% 40%",
                            ],
                            opacity: [0.5, 0.35, 0.5],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 1.5,
                        }}
                    />
                ))}
            </div>

            {/* Contact Form Section */}
            <div className="relative z-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-16 mt-5">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
                    <p className="text-gray-600 mb-6">
                        Feel free to reach out by filling this form
                    </p>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <textarea
                            placeholder="Your Message"
                            rows="4"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        ></textarea>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold mb-3">Get in Touch</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        We'd love to hear from you! Whether you have a question, feedback, or
                        a project idea, feel free to contact us anytime. Our team will get back
                        to you as soon as possible.
                    </p>

                    {/* Social Media Buttons */}
                    <div className="flex gap-4 mt-2">
                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                            title="Facebook"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition"
                            title="WhatsApp"
                        >
                            <FaWhatsapp />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-400 text-white hover:bg-sky-500 transition"
                            title="Twitter"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 text-white hover:bg-blue-500 transition"
                            title="Messenger"
                        >
                            <FaFacebookMessenger />
                        </a>
                    </div>
                </div>
            </div>

            {/* Our Location & Support */}
            <div className="relative z-10 w-full bg-white/50 py-16 mt-10">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 px-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Our Location</h2>
                        <p className="text-gray-700 mb-4">
                            We are located in the heart of the city, making it easy for you to
                            reach out or visit us. Our office is open Monday to Friday from 9 AM to 6 PM.
                        </p>
                        <p className="text-gray-700">Address: 123 Main Street, Your City, Country</p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-4">Support</h2>
                        <p className="text-gray-700 mb-4">
                            Need help or have questions? Our support team is here for you.
                            You can reach us via email, phone, or through the contact form above.
                        </p>
                        <p className="text-gray-700">
                            Email: support@example.com <br />
                            Phone: +123 456 7890
                        </p>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="relative z-10 w-full py-16 mt-10">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border rounded-lg overflow-hidden">
                                <motion.button
                                    className="w-full text-left px-6 py-4 bg-blue-100 hover:bg-blue-200 transition flex justify-between items-center"
                                    onClick={() => toggleFAQ(index)}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <span className="font-semibold">{faq.question}</span>
                                    <span>{openIndex === index ? "-" : "+"}</span>
                                </motion.button>

                                <AnimatePresence initial={false}>
                                    {openIndex === index && (
                                        <motion.div
                                            key="content"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                            className="px-6 py-4 bg-white text-gray-700"
                                        >
                                            {faq.answer}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
