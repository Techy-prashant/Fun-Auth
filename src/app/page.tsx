"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroPopup from "@/components/IntroPopup";
import Auth1 from "@/components/Auth1";
import Auth2 from "@/components/Auth2";
import Auth3 from "@/components/Auth3";
import Auth4 from "@/components/Auth4";
import Auth5 from "@/components/Auth5";
import SuccessScreen from "@/components/SuccessScreen";
import ShantiScreen from "@/components/ShantiScreen";
import ThemeWidget from "@/components/ThemeWidget";

export default function Home() {
  const [step, setStep] = useState(0);
  const [glowColor, setGlowColor] = useState("bg-white/5");

  const nextStep = () => setStep((s) => s + 1);
  const restart = () => setStep(1);
  const goZen = () => setStep(7);

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-4 selection:bg-white/20 overflow-hidden relative transition-colors duration-1000">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 ${glowColor}`} />

      <ThemeWidget onThemeChange={setGlowColor} />

      <AnimatePresence mode="wait">
        {step === 0 && <IntroPopup key="intro" onStart={nextStep} />}
        {step === 1 && <Auth1 key="auth1" onSuccess={nextStep} />}
        {step === 2 && <Auth2 key="auth2" onSuccess={nextStep} />}
        {step === 3 && <Auth3 key="auth3" onSuccess={nextStep} />}
        {step === 4 && <Auth4 key="auth4" onSuccess={nextStep} />}
        {step === 5 && <Auth5 key="auth5" onSuccess={nextStep} />}
        {step === 6 && <SuccessScreen key="success" onRestart={restart} onZenMode={goZen} />}
        {step === 7 && <ShantiScreen key="shanti" />}
      </AnimatePresence>
    </main>
  );
}
