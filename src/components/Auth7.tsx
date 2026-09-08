"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Auth7({ onSuccess }: { onSuccess: () => void }) {
  const [activeBox, setActiveBox] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) return;

    const interval = setInterval(() => {
      // Pick a random box 0-8
      setActiveBox(Math.floor(Math.random() * 9));
    }, 700); // changes every 700ms

    return () => clearInterval(interval);
  }, [isChecked]);

  const handleCheck = (index: number) => {
    if (index === activeBox && !isChecked) {
      if (score + 1 >= 3) {
        setScore(3);
        setIsChecked(true);
        setActiveBox(null);
        setTimeout(() => onSuccess(), 800);
      } else {
        setScore(s => s + 1);
        setActiveBox(null); // Force it to wait for next tick
      }
    }
  };

  return (
    <motion.div
      key="auth7"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ type: "spring", bounce: 0.4 }}
      className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-md text-center shadow-[0_0_40px_rgba(255,255,255,0.03)]"
    >
      <h2 className="text-xl text-white mb-2 tracking-wide font-semibold">Auth 7 / 10</h2>
      <p className="text-gray-400 text-sm mb-8">Whack-a-Box. Catch 3 to pass. ({score}/3)</p>

      <div className="grid grid-cols-3 gap-4 h-64 bg-black/20 p-4 rounded-xl border border-white/5">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex items-center justify-center bg-white/5 rounded-xl border border-white/10 relative overflow-hidden">
            <AnimatePresence>
              {(i === activeBox || (isChecked && i === 4)) && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  onClick={() => handleCheck(i)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-white/10"
                >
                  <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${isChecked ? "bg-white" : "border-2 border-gray-500"}`}>
                    {(isChecked || score > 0) && i === activeBox || isChecked ? (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`w-4 h-4 ${isChecked ? 'text-black' : 'text-gray-300'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </motion.svg>
                    ) : null}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
