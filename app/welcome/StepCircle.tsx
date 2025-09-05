import { useEffect, useState, type JSX } from "react";
import { motion } from "framer-motion";
import type { S } from "node_modules/framer-motion/dist/types.d-Cjd591yU";

interface StepId {
  id: number | string;
}

interface StepCircleProps {
  stepId: number | string;
  isActive: boolean;
  isCompleted: boolean;
  lineDuration?: number; // seconds (default: 0.6s)
}

function StepCircle({
  stepId,
  isActive,
  isCompleted,
  lineDuration = 0.6,
}: StepCircleProps): JSX.Element {
  const step = { id: stepId }; // Wrap stepId in an object to match original prop structure
  const [colorActivated, setColorActivated] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Wait for line animation before activating color
      const timer = setTimeout(() => {
        setColorActivated(true);
      }, lineDuration * 1000); // delay matches line animation duration

      return () => clearTimeout(timer);
    } else {
      setColorActivated(false);
    }
  }, [isActive, lineDuration]);

  return (
    <motion.div
      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg ${
        isCompleted
          ? "bg-gradient-to-r from-blue-500 to-purple-500"
          : colorActivated // ✅ only becomes green after line finishes
            ? "bg-green-500 text-white"
            : "bg-gray-300 text-gray-600"
      }`}
      animate={
        isActive
          ? {
              scale: [1, 1.2, 1],
              boxShadow: "0px 0px 12px rgba(59,130,246,0.6)",
            }
          : { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }
      }
      transition={
        isActive
          ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          : { duration: 0.3 }
      }
    >
      {step.id}
    </motion.div>
  );
}
export default StepCircle;
