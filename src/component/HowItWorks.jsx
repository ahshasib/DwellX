import { motion } from "framer-motion";
import { FaSearch, FaCalendarAlt, FaFileAlt, FaArrowRight, FaCheck, FaCheckCircle } from "react-icons/fa";

const steps = [
    {
        icon: <FaSearch size={36} className="text-indigo-600" />,
        title: "Find Your Property",
        desc: "Use our AI-powered search to discover properties matching your exact needs.",
    },
    {
        icon: <FaCalendarAlt size={36} className="text-indigo-600" />,
        title: "Schedule a Visit",
        desc: "Book an in-person or virtual tour of your selected properties.",
    },
    {
        icon: <FaFileAlt size={36} className="text-indigo-600" />,
        title: "Close the Deal",
        desc: "Complete paperwork and secure your dream property with ease.",
    },
];

const HowItWorks = () => {
    return (
        <section className="py-16 px-4 max-w-7xl mx-auto text-center">
            <p className="text-[12px] text-blue-600 uppercase bg-indigo-100 inline px-4 py-2 rounded-full ">🔥 Simple Process</p>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:via-blue-600 group-hover:to-purple-600 transition-all duration-500 mt-10 mb-5">How It Works</h2>
            <motion.hr
                initial={{ width: "10%" }}
                animate={{ width: "20%" }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "reverse" }}
                className="border-t-4 border-indigo-500 mx-auto pb-2"
            />

            <p className="text-xl py-8 text-gray-600 max-w-xl mx-auto mb-12">
                Finding your perfect property is easy with our{" "}
                <span className="text-blue-600 font-semibold">AI-powered</span> three-step process.
            </p>

            <div className="relative flex flex-col  md:flex-row items-center justify-between gap-10 max-w-5xl mx-auto">
                {/* Centered horizontal line (goes through icon center) */}
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="hidden md:block absolute top-[40px] left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 z-0"
                />

                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="relative z-10 flex flex-col items-center text-center w-full md:w-1/3"
                    >
                        {/* Animated number badge above icon */}
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="absolute -top-4 bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-md z-20"
                        >
                            {i + 1}
                        </motion.div>

                        {/* Icon card */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg shadow-indigo-300 border border-indigo-100 hover:shadow-indigo-200/60 transition-all duration-300 z-10">
                            {step.icon}
                        </div>

                        {/* Arrow on center line (only desktop) */}
                        {i < steps.length - 1 && (
                            <motion.div
                                animate={{ x: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                className="hidden md:block absolute top-[32px] right-[-20px] text-indigo-500 text-xl z-20"
                            >
                                <FaArrowRight />
                            </motion.div>
                        )}

                        {/* Text content */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                                {step.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-300 max-w-xs mx-auto">
                                {step.desc}
                            </p>

                        </div>
                        <div className="bg-green-100 p-3 rounded-full mt-5">
                            <FaCheckCircle className="text-green-500" size={24} />
                        </div>

                        {/* Arrow for mobile */}
                        {i < steps.length - 1 && (
                            <div className="block md:hidden mt-6 mb-2 h-10 relative">
                                <motion.div
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                                    className="text-indigo-500 text-xl"
                                >
                                    <FaArrowRight className="rotate-90" />
                                </motion.div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-20">
                <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl shadow-blue-500/30 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2">
                    Join Our Network <FaArrowRight />
                </button>
                
            </div>
            <div className="flex items-center gap-2 text-[11px] text-center justify-center pt-5">
            <FaCheckCircle className="text-green-500" />
            <p className="text-gray-600">No registration required • Free to start</p>
            </div>
        </section>
    );
};

export default HowItWorks;
