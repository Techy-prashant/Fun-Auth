"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function Auth4({ onSuccess }: { onSuccess: () => void }) {
  const [isPressing, setIsPressing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const pressStart = useRef<number>(0);
  const [elapsed, setElapsed] = useState("0.00");
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPressing) {
      interval = setInterval(() => {
        const currentElapsed = (Date.now() - pressStart.current) / 1000;
        setElapsed(currentElapsed.toFixed(2));
      }, 10);
    } else if (!success) {
      setElapsed("0.00");
    }
    return () => clearInterval(interval);
  }, [isPressing, success]);

  const handlePointerDown = () => {
    if (success) return;
    setIsPressing(true);
    setError("");
    pressStart.current = Date.now();
  };

  const handlePointerUp = () => {
    if (!isPressing || success) return;
    setIsPressing(false);
    
    const duration = (Date.now() - pressStart.current) / 1000;
    
    if (duration >= 2.90 && duration <= 3.10) {
      setSuccess(true);
      setElapsed(duration.toFixed(2));
      setTimeout(() => onSuccess(), 1500);
    } else {
      setError(`You held it for ${duration.toFixed(2)}s. Target is exactly 3.00s.`);
    }
  };

  return (
    <motion.div
      key="auth4"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ type: "spring", bounce: 0.4 }}
      className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-md text-center shadow-[0_0_40px_rgba(255,255,255,0.03)] relative overflow-hidden"
    >
      <h2 className="text-xl text-white mb-2 tracking-wide font-semibold">Auth 4 / 5</h2>
      <p className="text-gray-400 text-sm mb-12">The Patience Test. Hold exactly 3.00 seconds.</p>

      <div className="mb-12 flex justify-center">
        <motion.button
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          animate={{
            scale: isPressing ? 0.9 : 1,
            boxShadow: isPressing 
              ? "0 0 40px rgba(255,255,255,0.4)" 
              : "0 0 0px rgba(255,255,255,0)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`w-32 h-32 rounded-full border-2 flex items-center justify-center select-none touch-none ${
            success ? "bg-white text-black border-white" : "bg-white/5 border-white/20 text-white hover:bg-white/10"
          }`}
        >
          <span className="text-3xl font-mono tracking-tighter">
            {elapsed}
          </span>
        </motion.button>
      </div>

      <div className="h-8 relative">
        <AnimatePresence>
          {error && !success && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 text-red-400 text-sm font-medium"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 text-green-400 text-sm font-medium"
            >
              Impeccable timing.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
