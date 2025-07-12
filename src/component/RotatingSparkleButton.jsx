import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const RotatingSparkleButton =({ size = 12, color = "text-yellow-300" }) => {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <Sparkles className={`w-full h-full ${color}`} />
      </motion.div>
    );
  };

export default RotatingSparkleButton;
