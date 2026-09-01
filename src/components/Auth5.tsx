"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const decoys = ["Don't click", "Wait", "Nope", "Not yet", "Hold on", "Ignore", "False alarm", "Avoid", "Do not"];
const TARGET = "Click now!";

export default function Auth5({ onSuccess }: { onSuccess: () => void }) {
  const [labels, setLabels] = useState<string[]>(["Wait", "Wait", "Wait", "Wait"]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) return;
    const interval = setInterval(() => {
      // 15% chance to show the target on one of the buttons
      const showTarget = Math.random() < 0.20;
      const targetIndex = showTarget ? Math.floor(Math.random() * 4) : -1;
      
      const newLabels = Array.from({ length: 4 }).map((_, i) => {
        if (i === targetIndex) return TARGET;
        return decoys[Math.floor(Math.random() * decoys.length)];
      });
      
      setLabels(newLabels);
    }, 400);

    return () => clearInterval(interval);
  }, [success]);

  const handleClick = (label: string) => {
    if (success) return;
    if (label === TARGET) {
      setSuccess(true);
      setTimeout(() => onSuccess(), 1000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <motion.div
      key="auth5"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ type: "spring", bounce: 0.4 }}
      className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-md text-center shadow-[0_0_40px_rgba(255,255,255,0.03)] relative overflow-hidden"
    >
      <h2 className="text-xl text-white mb-2 tracking-wide font-semibold">Auth 5 / 5</h2>
      <p className="text-gray-400 text-sm mb-10">The Decoy Grid. Only click the correct cue.</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {labels.map((label, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(label)}
            className={`h-20 rounded-xl font-medium text-sm transition-colors border select-none ${
              success && label === TARGET
                ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                : "bg-white/5 border-white/10 text-white/90 hover:bg-white/10"
            }`}
          >
            {label}
          </motion.button>
        ))}
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
              You fell for the decoy!
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 text-green-400 text-sm font-medium"
            >
              Sharp eyes.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
