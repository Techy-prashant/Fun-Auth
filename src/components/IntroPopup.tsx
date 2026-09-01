"use client";

import { motion } from "framer-motion";

export default function IntroPopup({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
      className="max-w-md w-full p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold mb-4 text-white tracking-tight">
          System Alert
        </h1>
        <p className="text-gray-400 mb-8 leading-relaxed text-sm">
          Chhota Jarvis suspects you are a robot. I want you to complete these 5 authentications. Although this is totally unnecessary, for the sake of the game... do it!!
        </p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="w-full py-4 rounded-xl bg-white text-black font-semibold tracking-wide uppercase text-sm transition-colors hover:bg-gray-200"
      >
        Start
      </motion.button>
    </motion.div>
  );
}
