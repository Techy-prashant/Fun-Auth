"use client";

import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

function BouncingBox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const velocity = useRef({ x: 2, y: 1.5 }); 
  const isDragging = useRef(false);

  useAnimationFrame(() => {
    if (isDragging.current || !containerRef.current) return;

    // --- Brake logic ---
    const currentSpeed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
    const targetSpeed = 2.5;

    if (currentSpeed > targetSpeed) {
      const friction = 0.96; // Slows down nicely
      velocity.current.x *= friction;
      velocity.current.y *= friction;
      
      const newSpeed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
      if (newSpeed <= targetSpeed + 0.1) {
        // Lock to exact target speed once slow enough
        const ratio = targetSpeed / newSpeed;
        velocity.current.x *= ratio;
        velocity.current.y *= ratio;
      }
    }
    // -------------------

    const bounds = containerRef.current.getBoundingClientRect();
    const boxSize = 48; // w-12 = 48px
    const maxX = bounds.width - boxSize;
    const maxY = bounds.height - boxSize;

    let nextX = x.get() + velocity.current.x;
    let nextY = y.get() + velocity.current.y;

    if (nextX <= 0) {
      nextX = 0;
      velocity.current.x *= -1;
    } else if (nextX >= maxX) {
      nextX = maxX;
      velocity.current.x *= -1;
    }

    if (nextY <= 0) {
      nextY = 0;
      velocity.current.y *= -1;
    } else if (nextY >= maxY) {
      nextY = maxY;
      velocity.current.y *= -1;
    }

    x.set(nextX);
    y.set(nextY);
  });

  return (
    <div ref={containerRef} className="relative w-full h-full border-2 border-white/10 rounded-xl overflow-hidden bg-black/20">
      <motion.div
        style={{ x, y }}
        drag
        dragConstraints={containerRef}
        dragMomentum={false}
        onDragStart={() => (isDragging.current = true)}
        onDragEnd={(e, info) => {
          isDragging.current = false;
          let newVx = info.velocity.x / 50; // Increased throw sensitivity
          let newVy = info.velocity.y / 50;
          
          if (Math.abs(newVx) < 1) newVx = newVx < 0 ? -2 : 2;
          if (Math.abs(newVy) < 1) newVy = newVy < 0 ? -1.5 : 1.5;
          
          // Allow high max speed so brakes can kick in
          if (newVx > 25) newVx = 25;
          if (newVx < -25) newVx = -25;
          if (newVy > 25) newVy = 25;
          if (newVy < -25) newVy = -25;

          velocity.current = { x: newVx, y: newVy };
        }}
        className="absolute top-0 left-0 w-12 h-12 bg-blue-500/80 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}

function AscendingPlates() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="relative w-full h-full border-2 border-white/10 rounded-xl overflow-hidden bg-black/20 flex items-center justify-center">
      <motion.div
        drag
        dragSnapToOrigin
        dragConstraints={containerRef}
        className="z-10 absolute cursor-grab active:cursor-grabbing p-4"
      >
        <motion.div
          animate={{
            y: ["-80px", "40px", "40px", "-80px"],
            scaleY: [1, 1, 0.6, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            times: [0, 0.45, 0.5, 1],
            ease: ["easeIn", "linear", "easeOut"]
          }}
          className="w-10 h-10 bg-purple-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)] origin-bottom"
        />
      </motion.div>

      <motion.div 
        animate={{ x: ["0%", "-10%"] }} 
        transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
        className="absolute top-[calc(50%+45px)] w-[1000%] flex justify-around pointer-events-none"
      >
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-24 h-4 bg-gradient-to-r from-purple-500/10 via-white/70 to-purple-500/10 rounded-full" />
        ))}
      </motion.div>
    </div>
  );
}

function SlicingBallItem({ delay = 0 }) {
  return (
    <div className="relative flex items-center justify-center w-16 h-16 pointer-events-none">
      <motion.div
        animate={{ x: [-15, 0, 0, -15], opacity: [1, 1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
        className="w-6 h-12 bg-pink-500 rounded-l-full shadow-[0_0_15px_rgba(236,72,153,0.5)] absolute translate-x-[-100%]"
      />
      <motion.div
        animate={{ x: [15, 0, 0, 15], opacity: [1, 1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
        className="w-6 h-12 bg-pink-500 rounded-r-full shadow-[0_0_15px_rgba(236,72,153,0.5)] absolute translate-x-[100%]"
      />
      <motion.div
        animate={{ scaleY: [0, 1.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "circIn", delay }}
        className="w-1 h-20 bg-white/80 absolute shadow-[0_0_10px_white]"
      />
    </div>
  );
}

function SlicingBall() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="relative w-full h-full border-2 border-white/10 rounded-xl overflow-hidden bg-black/20">
      <motion.div drag dragConstraints={containerRef} className="absolute cursor-grab active:cursor-grabbing p-4" style={{ top: "15%", left: "5%" }}>
        <div className="rotate-[15deg]">
          <SlicingBallItem delay={0} />
        </div>
      </motion.div>
      <motion.div drag dragConstraints={containerRef} className="absolute cursor-grab active:cursor-grabbing p-4" style={{ bottom: "15%", left: "35%" }}>
        <div className="-rotate-[30deg]">
          <SlicingBallItem delay={0.7} />
        </div>
      </motion.div>
      <motion.div drag dragConstraints={containerRef} className="absolute cursor-grab active:cursor-grabbing p-4" style={{ top: "20%", right: "5%" }}>
        <div className="rotate-[70deg]">
          <SlicingBallItem delay={1.4} />
        </div>
      </motion.div>
    </div>
  );
}

function BreathingCircleItem({ delay }: { delay: number }) {
  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <motion.div
        animate={{ scale: [1, 2, 1], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
        className="w-16 h-16 border-2 border-teal-400 rounded-full shadow-[0_0_20px_rgba(45,212,191,0.5)] absolute pointer-events-none"
      />
      <motion.div
        animate={{ scale: [0.5, 1.5, 0.5], opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 }}
        className="w-16 h-16 bg-teal-500 rounded-full shadow-[0_0_20px_rgba(45,212,191,0.5)] absolute pointer-events-none"
      />
    </div>
  );
}

function BreathingCircle() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="relative w-full h-full border-2 border-white/10 rounded-xl overflow-hidden bg-black/20 flex flex-row items-center justify-around px-8">
      <motion.div drag dragConstraints={containerRef} className="cursor-grab active:cursor-grabbing z-10">
        <BreathingCircleItem delay={0} />
      </motion.div>
      <motion.div drag dragConstraints={containerRef} className="cursor-grab active:cursor-grabbing z-10">
        <BreathingCircleItem delay={1.6} />
      </motion.div>
      <motion.div drag dragConstraints={containerRef} className="cursor-grab active:cursor-grabbing z-10">
        <BreathingCircleItem delay={3.2} />
      </motion.div>
    </div>
  );
}

function OrbitingDots() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="relative w-full h-full border-2 border-white/10 rounded-xl overflow-hidden bg-black/20 flex items-center justify-center">
      <motion.div drag dragConstraints={containerRef} className="relative w-64 h-64 flex items-center justify-center cursor-grab active:cursor-grabbing z-10">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute w-64 h-64 border-2 border-white/10 rounded-full pointer-events-none"
        >
          <div className="w-8 h-8 bg-orange-400 rounded-full absolute -top-4 left-24 shadow-[0_0_20px_rgba(251,146,60,0.8)]" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.05, 1] }}
          transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute w-44 h-44 border-2 border-white/10 rounded-full pointer-events-none"
        >
          <div className="w-6 h-6 bg-yellow-400 rounded-full absolute -bottom-3 left-16 shadow-[0_0_20px_rgba(250,204,21,0.8)]" />
        </motion.div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 bg-white rounded-full shadow-[0_0_30px_white] pointer-events-none" 
        />
      </motion.div>
    </div>
  );
}

export default function ShantiScreen() {
  return (
    <motion.div
      key="shanti"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="w-screen h-screen p-4 flex flex-col gap-4 overflow-hidden"
    >
      <div className="text-center pt-2 pb-4 opacity-50 font-light tracking-[0.5em] uppercase text-xs text-white">
        SHANTI MODE
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4 flex-1 pb-8 px-4">
        <div className="col-span-1 row-span-1"><BouncingBox /></div>
        <div className="col-span-1 row-span-1"><AscendingPlates /></div>
        <div className="col-span-1 row-span-1"><SlicingBall /></div>
        <div className="col-span-1 md:col-span-2 row-span-1"><BreathingCircle /></div>
        <div className="col-span-1 row-span-1"><OrbitingDots /></div>
      </div>
    </motion.div>
  );
}
