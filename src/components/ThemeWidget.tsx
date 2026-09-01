"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const themes = [
  { id: "ghost", glowClass: "bg-white/5", dotClass: "bg-white", label: "Ghost" },
  { id: "cyber", glowClass: "bg-fuchsia-500/20", dotClass: "bg-fuchsia-500", label: "Cyber" },
  { id: "matrix", glowClass: "bg-green-500/20", dotClass: "bg-green-500", label: "Matrix" },
  { id: "ocean", glowClass: "bg-blue-500/20", dotClass: "bg-blue-500", label: "Ocean" },
  { id: "crimson", glowClass: "bg-red-500/20", dotClass: "bg-red-500", label: "Crimson" },
];

export default function ThemeWidget({ onThemeChange }: { onThemeChange: (color: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("ghost");

  const handleSelect = (t: typeof themes[0]) => {
    setActiveTheme(t.id);
    onThemeChange(t.glowClass);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <motion.div
        layout
        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full p-2 flex items-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        onHoverStart={() => setIsOpen(true)}
        onHoverEnd={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.div layout className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
          {/* Sparkles / Theme Icon */}
          <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </motion.div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, width: 0, paddingRight: 0 }}
              animate={{ opacity: 1, width: "auto", paddingRight: 8 }}
              exit={{ opacity: 0, width: 0, paddingRight: 0 }}
              className="flex items-center gap-3 overflow-hidden whitespace-nowrap"
            >
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelect(t)}
                  className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-125 ${
                    activeTheme === t.id ? "border-white" : "border-transparent"
                  }`}
                  title={t.label}
                >
                  <div className={`w-full h-full rounded-full ${t.dotClass}`} />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
