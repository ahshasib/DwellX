import { motion } from "framer-motion";
import {
  FaStar,
  FaBuilding,
  FaSmile,
  FaThumbsUp,
  FaGlobe,
} from "react-icons/fa";

const MotionIcon = ({ Icon, color, bg }) => (
  <motion.div
    animate={{ y: [0, -8, 0] }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={`text-4xl ${color} ${bg} rounded-xl p-3`}
  >
    <Icon />
  </motion.div>
);

const cardData = [
  {
    title: "Trusted Partners",
    number: "50K+",
    icons: [

      { icon: FaSmile, color: "text-pink-500", bg: "bg-pink-100" },

    ],
  },
  {
    title: "Average Rating",
    number: "25K+",
    icons: [
      { icon: FaStar, color: "text-blue-600", bg: "bg-blue-100" },

    ],
  },
  {
    title: "Properties Listed",
    number: "4.9",
    icons: [
      { icon: FaBuilding, color: "text-indigo-600", bg: "bg-indigo-100" },

    ],
  },
  {
    title: "Success Rate",
    number: "100%",
    icons: [
      { icon: FaThumbsUp, color: "text-emerald-600", bg: "bg-emerald-100" },

    ],
  },
];

export default function TrustedSegment() {
  return (
    <section className="py-16 text-center">
      <span className="inline-flex items-center gap-2 py-2 px-4 text-[15px] bg-indigo-100 text-indigo-500 rounded-full">
        <FaGlobe className="text-indigo-500" />
        Trusted Worldwide
      </span>
      <h2 className="text-5xl mt-8 font-bold mb-5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:via-blue-600 group-hover:to-purple-600 transition-all duration-500"><span className="text-black">Trusted by</span> Industry Leaders</h2>
      <p className=" text-gray-500 mb-10">Join thousands of successful companies that rely on our platform for their real <br /> estate needs</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 space-y-4 border border-gray-100"
          >
            <div className="flex justify-center gap-4">
              {card.icons.map((iconObj, i) => (
                <MotionIcon
                  key={i}
                  Icon={iconObj.icon}
                  color={iconObj.color}
                  bg={iconObj.bg}
                />
              ))}
            </div>
            <h3 className="text-4xl font-bold mt-4">{card.number}</h3>
            <p className="text-sm font-semibold text-gray-500">{card.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
