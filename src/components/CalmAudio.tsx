"use client";

import { useEffect } from "react";

export default function CalmAudio() {
  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();

    // Create a very soft, ambient drone
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    
    // Frequencies for a calm, minor 9th chord drone (A minor 9)
    osc1.frequency.value = 110.00; // A2
    osc2.frequency.value = 164.81; // E3
    osc3.frequency.value = 246.94; // B3

    osc1.type = "sine";
    osc2.type = "sine";
    osc3.type = "triangle";

    // Add a lowpass filter to make it softer
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 400; // Muffled, warm sound
    
    const masterGain = ctx.createGain();
    // Start silent
    masterGain.gain.value = 0;

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    // Fade in gracefully over 5 seconds
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 5);

    osc1.start();
    osc2.start();
    osc3.start();

    // Subtle LFO for breathing effect on the filter frequency
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.05; // Very slow breathing (20s cycle)
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 150; // Sweep filter from 250 to 550
    
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    return () => {
      // Fade out and close
      masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      setTimeout(() => ctx.close(), 1000);
    };
  }, []);

  return null;
}
