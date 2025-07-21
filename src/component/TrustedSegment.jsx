import { motion } from "framer-motion";
import {
  FaStar,
  FaBuilding,
  FaSmile,
  FaThumbsUp,
  FaGlobe,
} from "react-icons/fa";

// MotionIcon with per-icon custom color shadow
const MotionIcon = ({ Icon, color, bg, shadow }) => (
  <motion.div
    animate={{ y: [0, -8, 0] }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={`text-4xl ${color} ${bg} rounded-xl p-3 transition-shadow duration-500 ${shadow}`}
  >
    <Icon />
  </motion.div>
);

const cardData = [
  {
    title: "Trusted Partners",
    number: "50K+",
    icons: [
      {
        icon: FaSmile,
        color: "text-pink-500",
        bg: "bg-pink-100",
        shadow: "drop-shadow-[0_6px_16px_rgba(244,114,182,0.4)]", // light pink shadow
      },
    ],
  },
  {
    title: "Average Rating",
    number: "25K+",
    icons: [
      {
        icon: FaStar,
        color: "text-blue-600",
        bg: "bg-blue-100",
        shadow: "drop-shadow-[0_6px_16px_rgba(96,165,250,0.4)]", // light blue shadow
      },
    ],
  },
  {
    title: "Properties Listed",
    number: "4.9",
    icons: [
      {
        icon: FaBuilding,
        color: "text-indigo-600",
        bg: "bg-indigo-100",
        shadow: "drop-shadow-[0_6px_16px_rgba(129,140,248,0.4)]", // indigo shadow
      },
    ],
  },
  {
    title: "Success Rate",
    number: "100%",
    icons: [
      {
        icon: FaThumbsUp,
        color: "text-emerald-600",
        bg: "bg-emerald-100",
        shadow: "drop-shadow-[0_6px_16px_rgba(52,211,153,0.4)]", // emerald shadow
      },
    ],
  },
];

export default function TrustedSegment() {
  return (
    <section className="mt-14 py-20 md:py-16 text-center">
      <span className="inline-flex items-center gap-2 py-2 px-4 text-[15px] bg-indigo-100 text-indigo-500 rounded-full">
        <FaGlobe className="text-indigo-500" />
        Trusted Worldwide
      </span>

      <h2 className="text-2xl md:text-5xl mt-8 font-bold mb-5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
        <span className="text-black">Trusted by</span> Industry Leaders
      </h2>

      <p className="text-gray-500 mb-10">
        Join thousands of successful companies that rely on our platform for their real <br />
        estate needs
      </p>

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
                  shadow={iconObj.shadow}
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
