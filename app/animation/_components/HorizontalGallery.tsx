'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sliderRef.current) return;

      // Calculate total scroll distance needed horizontally
      const totalWidth = sliderRef.current.scrollWidth;
      const amountToScroll = totalWidth - window.innerWidth;

      gsap.to(sliderRef.current, {
        x: -amountToScroll,
        ease: 'none', // Linear ease is crucial for scrubbed scroll animations
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${amountToScroll}`, // Scroll duration equals exact horizontal width
          pin: true,
          scrub: 1, // Smooth catch-up delay
          invalidateOnRefresh: true, // Recalculate on window resize
        },
      });
    },
    { scope: containerRef }
  );
  

  return (
    <section ref={containerRef} className="relative h-screen bg-neutral-950 overflow-hidden">
      {/* Fixed Section Title Overlay */}
      <div className="absolute top-12 left-12 z-10 pointer-events-none">
        <span className="text-blue-500 font-mono text-sm tracking-wider uppercase">Portfolio Showcase</span>
        <h2 className="text-3xl font-bold text-white mt-1">Featured Projects</h2>
      </div>

      {/* Horizontal Track */}
      <div
        ref={sliderRef}
        className="flex h-full items-center pl-12 pr-24 gap-8 w-max"
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="w-[80vw] sm:w-[50vw] md:w-[35vw] h-[60vh] bg-neutral-900 border border-neutral-800 rounded-3xl p-8 flex flex-col justify-between shrink-0 group hover:border-blue-500/50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <span className="font-mono text-neutral-500 text-sm">0{index + 1}</span>
              <span className="text-2xl">{project.emoji}</span>
            </div>

            <div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">{project.category}</span>
              <h3 className="text-2xl font-bold text-white mt-1">{project.title}</h3>
              <p className="text-neutral-400 text-sm mt-2">{project.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const projects = [
  { title: 'Fintech Dashboard', category: 'Web App', emoji: '📈', desc: 'Real-time analytics platform built for high-frequency traders.' },
  { title: 'Aether OS', category: 'System Design', emoji: '⚡', desc: 'A minimal spatial computing interface prototype.' },
  { title: 'Neura Sound', category: 'Audio Tech', emoji: '🎧', desc: 'Generative AI ambient music engine for focus work.' },
  { title: 'Veloce Supercar', category: 'E-Commerce', emoji: '🏎️', desc: '3D interactive vehicle configurator running in WebGL.' },
  { title: 'Zenith Studio', category: 'Branding', emoji: '🎨', desc: 'Digital brand identity and motion design system.' },
];