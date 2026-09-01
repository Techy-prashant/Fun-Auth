"use client";

import { motion } from "framer-motion";

export default function SuccessScreen({
  onRestart,
  onZenMode
}: {
  onRestart: () => void;
  onZenMode: () => void;
}) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center p-8 w-full max-w-4xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 relative"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x select-none">
          CONGRATULATIONS
        </h1>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 blur-3xl opacity-20 -z-10 animate-pulse" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="text-2xl md:text-3xl font-light tracking-wide text-gray-300 select-none mb-24"
      >
        You are not a Robot.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="flex flex-col items-center gap-6"
      >
        <p className="text-gray-400 text-sm tracking-widest uppercase">Wanna repeat the Misery?</p>
        <div className="flex gap-4">
          <button
            onClick={onRestart}
            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white text-sm font-medium"
          >
            Yes
          </button>
          <button
            onClick={onZenMode}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 transition-colors text-white text-sm font-medium shadow-[0_0_15px_rgba(236,72,153,0.2)] hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]"
          >
            Hell nah dude
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
