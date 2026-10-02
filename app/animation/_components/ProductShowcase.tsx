'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register both plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. PINNING & SCROLL-DRIVEN TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',       // When top of container hits top of viewport
          end: '+=2000',          // Pin for 2000px worth of scrolling distance
          pin: true,              // Pin the container in place
          scrub: 1,               // Smooth scrubbing (takes 1 sec to catch up to scrollbar)
          anticipatePin: 1,       // Prevents slight visual jitter on fast scrolls
          // markers: true,       // Uncomment during development to visually debug scroll bounds!
        },
      });

      // Feature Step 1 -> Step 2: Rotate and change accent color
      tl.to(pinnedCardRef.current, {
        rotateY: 180,
        scale: 1.05,
        duration: 1,
      })
      .to('.glow-effect', {
        opacity: 0.8,
        duration: 0.5,
      }, '<') // '<' means start at the same time as previous animation

      // Highlight text 1 fades out, Highlight text 2 fades in
      .to('.feature-1', { opacity: 0, y: -20, duration: 0.5 })
      .fromTo('.feature-2', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })

      // Feature Step 2 -> Step 3: Expand and reset rotation
      .to(pinnedCardRef.current, {
        rotateY: 360,
        scale: 1.15,
        duration: 1,
      })
      .to('.feature-2', { opacity: 0, y: -20, duration: 0.5 })
      .fromTo('.feature-3', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
    },
    { scope: containerRef }
  );

  // Inside any component (e.g. HeroSection.tsx or HorizontalGallery.tsx)
const { contextSafe } = useGSAP();

// Expand cursor when hovering over interactive cards
const handleCardHoverEnter = contextSafe(() => {
  gsap.to('#custom-cursor', {
    scale: 2.2,
    backgroundColor: 'rgba(59, 130, 246, 0.25)',
    borderColor: 'rgba(147, 197, 253, 0.9)',
    duration: 0.3,
    ease: 'power2.out',
  });
  gsap.to('#cursor-text', {
    opacity: 1,
    scale: 1,
    duration: 0.2,
  });
});

// Reset cursor when mouse leaves card
const handleCardHoverLeave = contextSafe(() => {
  gsap.to('#custom-cursor', {
    scale: 1,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.6)',
    duration: 0.3,
    ease: 'power2.out',
  });
  gsap.to('#cursor-text', {
    opacity: 0,
    scale: 0,
    duration: 0.2,
  });
});

  return (
    <section className="bg-neutral-900 text-white">
      {/* Intro spacer section before pinning starts */}
      <div className="h-screen flex items-center justify-center border-b border-neutral-800">
        <h2 className="text-3xl md:text-5xl font-bold text-center">
          Scroll down to discover <br />
          <span className="text-blue-500">The Next Generation Product</span>
        </h2>
      </div>

      <div
  onMouseEnter={handleCardHoverEnter}
  onMouseLeave={handleCardHoverLeave}
  className="feature-card cursor-none p-8 bg-neutral-900 border border-neutral-800 rounded-2xl"
>
  <h3>Interactive Feature</h3>
</div>

      {/* PINNED CONTAINER SECTION */}
      <div
        ref={containerRef}
        className="h-screen flex items-center justify-center relative overflow-hidden px-6"
      >
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Dynamic Scrolling Text Highlights */}
          <div className="relative h-40 flex items-center">
            {/* Feature 1 */}
            <div className="feature-1 absolute inset-0 flex flex-col justify-center">
              <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-2">01. Precision Design</span>
              <h3 className="text-3xl md:text-4xl font-bold">Forged from Aerospace Titanium</h3>
              <p className="text-neutral-400 mt-2">Ultra-lightweight yet remarkably resilient structure built for modern performance.</p>
            </div>

            {/* Feature 2 */}
            <div className="feature-2 absolute inset-0 flex flex-col justify-center opacity-0">
              <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-2">02. Neural Core</span>
              <h3 className="text-3xl md:text-4xl font-bold font-mono">Real-Time AI Processing</h3>
              <p className="text-neutral-400 mt-2">On-device neural network executes billions of operations per second with zero latency.</p>
            </div>

            {/* Feature 3 */}
            <div className="feature-3 absolute inset-0 flex flex-col justify-center opacity-0">
              <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-2">03. All-Day Power</span>
              <h3 className="text-3xl md:text-4xl font-bold">36-Hour Battery Life</h3>
              <p className="text-neutral-400 mt-2">Custom energy cell chemistry delivers continuous power through your toughest workflows.</p>
            </div>
          </div>

          {/* Right Column: Pinned 3D-feeling Visual Element */}
          <div className="flex justify-center [perspective:1000px]">
            <div
              ref={pinnedCardRef}
              className="relative w-72 h-96 md:w-80 md:h-[26rem] bg-gradient-to-br from-neutral-800 to-neutral-950 rounded-3xl border border-white/15 p-6 flex flex-col justify-between shadow-2xl transition-shadow"
            >
              {/* Background Ambient Glow */}
              <div className="glow-effect absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20 pointer-events-none" />

              <div className="relative z-10 flex justify-between items-center">
                <span className="font-mono text-xs text-neutral-400">MODEL-X</span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="relative z-10 text-center my-auto">
                <div className="text-6xl mb-2">💎</div>
                <p className="text-sm font-medium text-neutral-300">Interactive Canvas</p>
              </div>

              <div className="relative z-10 text-xs text-neutral-500 font-mono text-center">
                GSAP SCRUB CONTROLLED
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Outro spacer section after pinning finishes */}
      <div className="h-screen flex items-center justify-center bg-neutral-950 border-t border-neutral-800">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-400">
          Ready to experience it yourself?
        </h2>
      </div>
    </section>
  );
}