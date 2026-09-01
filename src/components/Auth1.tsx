"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Auth1({ onSuccess }: { onSuccess: () => void }) {
  const [hoverCount, setHoverCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isChecked, setIsChecked] = useState(false);

  const handleHover = () => {
    if (hoverCount < 4) {
      setHoverCount((prev) => prev + 1);
      // Teleport within a bounds of 250x250
      const rx = (Math.random() - 0.5) * 250;
      const ry = (Math.random() - 0.5) * 250;
      setPosition({ x: rx, y: ry });
    }
  };

  const handleCheck = () => {
    if (hoverCount >= 4 && !isChecked) {
      setIsChecked(true);
      setTimeout(() => {
        onSuccess();
      }, 600);
    }
  };

  return (
    <motion.div
      key="auth1"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ type: "spring", bounce: 0.4 }}
      className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-md text-center shadow-[0_0_40px_rgba(255,255,255,0.03)]"
    >
      <h2 className="text-xl text-white mb-2 tracking-wide font-semibold">Auth 1 / 5</h2>
      <p className="text-gray-400 text-sm mb-12">Prove you have human dexterity.</p>

      <div className="h-64 flex items-center justify-center relative">
        <motion.div
          animate={{ x: position.x, y: position.y }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          onHoverStart={handleHover}
          className="inline-flex items-center gap-3 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors border border-white/10"
          onClick={handleCheck}
        >
          <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${isChecked ? "bg-white" : "border-2 border-gray-500"}`}>
            {isChecked && (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </motion.svg>
            )}
          </div>
          <span className="text-white font-medium select-none">I am not a robot</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
