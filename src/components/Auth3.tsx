"use client";

import { motion, useMotionValue, animate, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function Auth3({ onSuccess }: { onSuccess: () => void }) {
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentNum, setCurrentNum] = useState(0);
  const [target, setTarget] = useState(73); // fallback for hydration
  const x = useMotionValue(0);

  useEffect(() => {
    setTarget(Math.floor(Math.random() * 99) + 1);
    
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    // Small delay to ensure layout is done
    setTimeout(updateWidth, 100);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useMotionValueEvent(x, "change", (latest) => {
    if (containerWidth === 0) return;
    const maxDrag = containerWidth - 48; // handle width
    if (maxDrag <= 0) return;
    
    let val = Math.round((latest / maxDrag) * 100);
    if (val < 0) val = 0;
    if (val > 100) val = 100;
    setCurrentNum(val);
  });

  const handleDragEnd = () => {
    if (currentNum === target) {
      setIsSuccess(true);
      setTimeout(() => onSuccess(), 1000);
    } else {
      setError(true);
      animate(x, 0, { type: "spring", stiffness: 300, damping: 20 });
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <motion.div
      key="auth3"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ type: "spring", bounce: 0.4 }}
      className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-md text-center shadow-[0_0_40px_rgba(255,255,255,0.03)] relative overflow-hidden"
    >
      <h2 className="text-xl text-white mb-2 tracking-wide font-semibold">Auth 3 / 5</h2>
      <p className="text-gray-400 text-sm mb-6">Dial it in. Drag the slider to exactly {target}.</p>

      <div className="mb-6">
        <span className={`text-6xl font-mono font-bold transition-colors ${isSuccess ? "text-green-400" : "text-white"}`}>
          {currentNum}
        </span>
      </div>

      <div className="relative h-16 bg-black/40 rounded-2xl border border-white/10 flex items-center px-1" ref={containerRef}>
        <motion.div
          style={{ x }}
          drag={isSuccess ? false : "x"}
          dragConstraints={containerRef}
          dragElastic={0}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          className={`w-12 h-12 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg border relative z-10 ${
            isSuccess ? "bg-green-500 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)]" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex gap-1">
            <div className={`w-1 h-4 rounded-full ${isSuccess ? "bg-white/50" : "bg-black/20"}`} />
            <div className={`w-1 h-4 rounded-full ${isSuccess ? "bg-white/50" : "bg-black/20"}`} />
          </div>
        </motion.div>
      </div>

      <div className="h-8 mt-4 relative">
        <AnimatePresence>
          {error && !isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 text-red-400 text-sm font-medium"
            >
              That was {currentNum}. Try again!
            </motion.div>
          )}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 text-green-400 text-sm font-medium"
            >
              Perfectly dialed in.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
