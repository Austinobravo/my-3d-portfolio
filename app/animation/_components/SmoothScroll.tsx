'use client';

import { useEffect, useRef, useState, createContext, useContext } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LenisContextType {
  lenis: Lenis | null;
  isEnabled: boolean;
  toggleLenis: () => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  isEnabled: true,
  toggleLenis: () => {},
});

export const useLenisControl = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.5, // Bumped to 1.5s so the smooth glide is very distinct
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis using GSAP's Ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const toggleLenis = () => {
    if (!lenisRef.current) return;
    if (isEnabled) {
      lenisRef.current.stop();
      setIsEnabled(false);
    } else {
      lenisRef.current.start();
      setIsEnabled(true);
    }
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, isEnabled, toggleLenis }}>
      {children}
    </LenisContext.Provider>
  );
}