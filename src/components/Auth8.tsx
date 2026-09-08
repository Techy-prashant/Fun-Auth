"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Auth8({ onSuccess }: { onSuccess: () => void }) {
  const [fractaled, setFractaled] = useState(false);
  const [checkedBoxes, setCheckedBoxes] = useState<number[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleMainCheck = () => {
    setFractaled(true);
  };

  const handleSubCheck = (index: number) => {
    if (!checkedBoxes.includes(index)) {
      const newChecked = [...checkedBoxes, index];
      setCheckedBoxes(newChecked);
      if (newChecked.length === 4) {
        setIsChecked(true);
        setTimeout(() => onSuccess(), 800);
      }
    }
  };

  return (
    <motion.div
      key="auth8"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ type: "spring", bounce: 0.4 }}
      className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-md text-center shadow-[0_0_40px_rgba(255,255,255,0.03)]"
    >
      <h2 className="text-xl text-white mb-2 tracking-wide font-semibold">Auth 8 / 10</h2>
      <p className="text-gray-400 text-sm mb-12">The Fractal Checkbox.</p>

      <div className="h-64 flex items-center justify-center relative bg-black/20 rounded-xl border border-white/5 p-4">
        <AnimatePresence mode="wait">
          {!fractaled ? (
            <motion.div
              key="main-box"
              exit={{ scale: 0, opacity: 0, filter: "blur(10px)" }}
              className="inline-flex items-center gap-3 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors border border-white/10"
              onClick={handleMainCheck}
            >
              <div className="w-6 h-6 rounded flex items-center justify-center border-2 border-gray-500" />
              <span className="text-white font-medium select-none">I am not a robot</span>
            </motion.div>
          ) : (
            <motion.div
              key="fractal-grid"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSubCheck(i)}
                  className={`w-24 h-24 flex flex-col items-center justify-center gap-2 rounded-xl border transition-colors cursor-pointer
                    ${checkedBoxes.includes(i) ? 'bg-white/20 border-white/40' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${checkedBoxes.includes(i) ? "bg-white" : "border-2 border-gray-500"}`}>
                    {checkedBoxes.includes(i) && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3 h-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </motion.svg>
                    )}
                  </div>
                  <span className="text-xs text-white/70 select-none">Part {i+1}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
