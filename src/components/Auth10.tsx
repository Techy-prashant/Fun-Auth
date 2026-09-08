"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function Auth10({ onSuccess }: { onSuccess: () => void }) {
  const [points, setPoints] = useState<{x: number, y: number}[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (isChecked) return;
    setIsDrawing(true);
    setErrorMsg("");
    const { x, y } = getCoordinates(e);
    setPoints([{ x, y }]);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isChecked) return;
    const { x, y } = getCoordinates(e);
    setPoints(prev => [...prev, { x, y }]);
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = containerRef.current!.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  const endDrawing = () => {
    if (!isDrawing || isChecked) return;
    setIsDrawing(false);

    if (points.length < 20) {
      setErrorMsg("Too short! That's not a circle.");
      setPoints([]);
      return;
    }

    // Check if it's a closed loop
    const start = points[0];
    const end = points[points.length - 1];
    const dist = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));

    if (dist > 30) {
      setErrorMsg("Not closed! Start and end must meet.");
      setPoints([]);
      return;
    }

    // Check circle bounding box
    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    const width = Math.max(...xs) - Math.min(...xs);
    const height = Math.max(...ys) - Math.min(...ys);

    // Bounding box should be roughly square
    const ratio = width / height;
    if (ratio < 0.7 || ratio > 1.3 || width < 50) {
      setErrorMsg("That looks like a potato.");
      setPoints([]);
      return;
    }

    setIsChecked(true);
    setErrorMsg("Perfect circle! Humanity verified.");
    setTimeout(() => onSuccess(), 1000);
  };

  // Convert points to SVG path
  const pathData = points.length > 0 
    ? `M ${points[0].x} ${points[0].y} ${points.map(p => `L ${p.x} ${p.y}`).join(" ")}`
    : "";

  return (
    <motion.div
      key="auth10"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ type: "spring", bounce: 0.4 }}
      className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-md text-center shadow-[0_0_40px_rgba(255,255,255,0.03)]"
    >
      <h2 className="text-xl text-white mb-2 tracking-wide font-semibold">Auth 10 / 10</h2>
      <p className="text-gray-400 text-sm mb-4">Prove you are human: Draw a perfect circle.</p>

      <div className="h-6 mb-2">
        {errorMsg && <p className={`text-sm ${isChecked ? 'text-green-400' : 'text-red-400'}`}>{errorMsg}</p>}
      </div>

      <div 
        ref={containerRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
        className="h-64 relative bg-black/40 rounded-xl border border-white/10 overflow-hidden cursor-crosshair touch-none"
      >
        <svg className="w-full h-full pointer-events-none">
          <path d={pathData} fill="none" stroke={isChecked ? "#4ade80" : "white"} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          {isChecked && (
            <motion.circle initial={{scale:0}} animate={{scale:1}} cx="150" cy="128" r="40" fill="#4ade80" opacity="0.2" />
          )}
        </svg>
      </div>
    </motion.div>
  );
}
