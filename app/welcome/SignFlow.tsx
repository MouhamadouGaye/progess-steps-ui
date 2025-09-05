import React, { useState } from "react";
import { motion } from "framer-motion";
import StepCircle from "./StepCircle";

type Step = { id: number; label: string };

const steps: Step[] = [
  { id: 1, label: "Upload PDF" },
  { id: 2, label: "Draw Signature" },
  { id: 3, label: "Place Signature" },
  { id: 4, label: "Download" },
];

export default function ModernProgressSteps() {
  const [active, setActive] = useState(1);

  return (
    <div className="flex flex-col items-center space-y-10 w-full max-w-4xl mx-auto py-10">
      {/* Progress bar container */}
      <div className="relative flex items-center justify-between w-full">
        {/* Background line */}
        <div className="absolute top-6 left-10 w-[90%] h-1 bg-gray-200 rounded-full -translate-y-1/2 z-0" />

        {/* Animated progress line */}
        <motion.div
          className="absolute top-6 left-10 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full -translate-y-1/2 z-0"
          initial={{ width: 0 }}
          animate={{ width: `${((active - 1) / (steps.length - 1)) * 90}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Steps */}
        {steps.map((step) => {
          const isActive = step.id === active;
          const isCompleted = step.id < active;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Animated Circle */}
              <StepCircle
                isActive={isActive}
                isCompleted={isCompleted}
                stepId={step.id}
              />

              {/* Label */}
              <span
                className={`mt-3 text-sm font-medium ${
                  isCompleted || isActive
                    ? "text-green-600 delay-700"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() =>
          setActive((prev) => (prev < steps.length ? prev + 1 : prev))
        }
        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-md hover:opacity-90 transition"
      >
        Next
      </button>
    </div>
  );
}
