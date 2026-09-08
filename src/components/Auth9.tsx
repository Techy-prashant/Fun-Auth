"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Auth9({ onSuccess }: { onSuccess: () => void }) {
  // 9 squares, true = traffic light, false = empty
  const [grid, setGrid] = useState<boolean[]>([true, false, true, false, true, false, true, false, false]);
  const [isChecked, setIsChecked] = useState(false);

  // Randomly spawn new traffic lights over time to annoy them
  useEffect(() => {
    if (isChecked) return;
    const interval = setInterval(() => {
      setGrid(prev => {
        const next = [...prev];
        const emptyIndices = next.map((val, i) => (!val ? i : -1)).filter(i => i !== -1);
        if (emptyIndices.length > 0) {
          // 30% chance to spawn a new one every 800ms
          if (Math.random() > 0.7) {
            const spawnIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
            next[spawnIndex] = true;
          }
        }
        return next;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [isChecked]);

  const handleClick = (index: number) => {
    if (isChecked) return;
    const newGrid = [...grid];
    newGrid[index] = false;
    setGrid(newGrid);

    // Check win condition (all false)
    if (newGrid.every(v => !v)) {
      setIsChecked(true);
      setTimeout(() => onSuccess(), 1000);
    }
  };

  return (
    <motion.div
      key="auth9"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ type: "spring", bounce: 0.4 }}
      className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-md text-center shadow-[0_0_40px_rgba(255,255,255,0.03)]"
    >
      <h2 className="text-xl text-white mb-2 tracking-wide font-semibold">Auth 9 / 10</h2>
      <p className="text-gray-400 text-sm mb-8">Select all squares with 🚦.</p>

      <div className="grid grid-cols-3 gap-2 h-64 bg-black/20 p-2 rounded-xl border border-white/5 relative overflow-hidden">
        {grid.map((isTrafficLight, i) => (
          <div key={i} className="bg-white/5 rounded-lg overflow-hidden relative border border-white/10 flex items-center justify-center">
            <AnimatePresence>
              {isTrafficLight && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleClick(i)}
                  className="absolute inset-0 bg-blue-900/30 flex items-center justify-center cursor-pointer hover:bg-blue-800/50"
                >
                  <span className="text-4xl select-none">🚦</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        {isChecked && (
           <motion.div 
             initial={{opacity: 0}} 
             animate={{opacity: 1}} 
             className="absolute inset-0 pointer-events-none border-[10px] border-green-500/50 rounded-xl z-10 bg-green-500/10 flex items-center justify-center" 
           >
             <span className="text-6xl drop-shadow-lg">✅</span>
           </motion.div>
        )}
      </div>
    </motion.div>
  );
}
