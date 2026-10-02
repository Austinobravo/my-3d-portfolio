'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CustomCursor from './_components/CustomCursor';
gsap.registerPlugin(ScrollTrigger);

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!overlayRef.current) return;

      // Scroll window to top on route change
      window.scrollTo(0, 0);

      gsap.to(overlayRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => {
          // Force ScrollTrigger to refresh all pin boundaries after the route transition finishes
          ScrollTrigger.refresh();
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative">
        <CustomCursor />
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-blue-600 z-[9999] pointer-events-none origin-bottom"
      />
      {children}
    </div>
  );
}