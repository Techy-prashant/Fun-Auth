"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useState, useRef } from "react";

export default function Auth6({ onSuccess }: { onSuccess: () => void }) {
  const [isChecked, setIsChecked] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Radial gradient as a mask (flashlight effect)
  const maskImage = useMotionTemplate`radial-gradient(100px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  const handleCheck = () => {
    if (!isChecked) {
      setIsChecked(true);
      setTimeout(() => onSuccess(), 1000);
    }
  };

  return (
    <motion.div
      key="auth6"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ type: "spring", bounce: 0.4 }}
      className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-md text-center shadow-[0_0_40px_rgba(255,255,255,0.03)]"
    >
      <h2 className="text-xl text-white mb-2 tracking-wide font-semibold">Auth 6 / 10</h2>
      <p className="text-gray-400 text-sm mb-12">It's dark in here. Use your mouse as a flashlight.</p>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="h-64 relative bg-black rounded-xl border border-white/5 overflow-hidden cursor-crosshair"
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-[#111] pointer-events-none"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        >
          {/* Hidden somewhere offset */}
          <div className="absolute top-[60%] left-[20%] pointer-events-auto">
            <div
              className="inline-flex items-center gap-3 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors border border-white/10"
              onClick={handleCheck}
            >
              <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${isChecked ? "bg-white" : "border-2 border-gray-500"}`}>
                {isChecked && (
                  <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </motion.svg>
                )}
              </div>
              <span className="text-white font-medium select-none whitespace-nowrap">I am not a robot</span>
            </div>
          </div>
        </motion.div>
        
        {/* Full green overlay when solved to reveal */}
        {isChecked && (
           <motion.div 
             initial={{opacity: 0}} 
             animate={{opacity: 1}} 
             className="absolute inset-0 pointer-events-none border-[10px] border-green-500/50 rounded-xl" 
           />
        )}
      </div>
    </motion.div>
  );
}
