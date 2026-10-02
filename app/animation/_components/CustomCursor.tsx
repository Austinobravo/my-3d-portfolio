'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cursorRef.current || !dotRef.current) return;

    // 1. Set initial centered transform origin
    gsap.set([cursorRef.current, dotRef.current], {
      xPercent: -50,
      yPercent: -50,
      pointerEvents: 'none', // Critical: prevents cursor from blocking mouse clicks!
    });

    // 2. High-Performance GSAP quickTo setters for ultra-fast position updates
    const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.4, ease: 'power3.out' });

    // Inner dot position updates instantly for zero latency
    const dotXTo = gsap.quickTo(dotRef.current, 'x', { duration: 0.1, ease: 'power2.out' });
    const dotYTo = gsap.quickTo(dotRef.current, 'y', { duration: 0.1, ease: 'power2.out' });

    // 3. Mouse move listener
    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dotXTo(e.clientX);
      dotYTo(e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  });

  return (
    <>
      {/* Outer Floating Ring (Trailing Smooth Cursor) */}
      <div
        ref={cursorRef}
        id="custom-cursor"
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-blue-500/60 bg-blue-500/10 backdrop-blur-[2px] z-[99999] pointer-events-none flex items-center justify-center transition-opacity duration-300"
      >
        <span id="cursor-text" className="text-[10px] font-bold text-blue-400 opacity-0 uppercase tracking-widest scale-0 transition-all duration-200">
          VIEW
        </span>
      </div>

      {/* Inner Precision Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-blue-400 z-[99999] pointer-events-none"
      />
    </>
  );
}