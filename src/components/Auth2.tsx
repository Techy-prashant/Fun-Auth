"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const generateRandomString = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous I,1,O,0
  let str = "";
  for (let i = 0; i < 6; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};

export default function Auth2({ onSuccess }: { onSuccess: () => void }) {
  const [captchaStr, setCaptchaStr] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setCaptchaStr(generateRandomString());
  }, []);

  const expectedStr = captchaStr.split("").reverse().join("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setInputVal(val);
    if (val === expectedStr) {
      setError(false);
      setTimeout(() => {
        onSuccess();
      }, 500);
    } else if (!expectedStr.startsWith(val)) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <motion.div
      key="auth2"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ type: "spring", bounce: 0.4 }}
      className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-md text-center shadow-[0_0_40px_rgba(255,255,255,0.03)] relative overflow-hidden"
    >
      <h2 className="text-xl text-white mb-2 tracking-wide font-semibold">Auth 2 / 5</h2>
      <p className="text-gray-400 text-sm mb-8">The Reverse Captcha. Type it perfectly backwards.</p>

      <div className="mb-8 p-6 rounded-xl bg-black/40 border border-white/10 select-none overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-pulse pointer-events-none" />
        <span className="text-4xl font-mono tracking-[0.3em] text-white" style={{ textShadow: "0 0 20px rgba(255,255,255,0.5)" }}>
          {captchaStr || "------"}
        </span>
      </div>

      <div className="relative">
        <input
          type="text"
          value={inputVal}
          onChange={handleChange}
          placeholder="Type backwards..."
          className={`w-full p-4 rounded-xl bg-white/5 border-2 outline-none text-center text-2xl font-mono text-white transition-all duration-300 ${
            error ? "border-red-500/50 focus:border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] bg-red-500/5" : "border-white/20 focus:border-white/50 focus:bg-white/10"
          }`}
          maxLength={6}
          autoFocus
        />
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-8 left-0 right-0 text-red-400 text-sm font-medium"
            >
              Nope, that's not it!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
