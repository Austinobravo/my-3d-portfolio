'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register the hook plugin globally for this file
gsap.registerPlugin(useGSAP);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. TIMELINE ANIMATION ON MOUNT
  useGSAP(
    () => {
      // Create a master timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

      // Step A: Animate the Badge from above
      tl.from('.badge', {
        y: -30,
        opacity: 0,
        duration: 0.6,
      })
      // Step B: Reveal Headline text by moving up and fading in
      .from('.hero-title', {
        y: 40,
        opacity: 0,
      }, '-=0.3') // '-=0.3' overlaps this animation by 0.3s with the previous
      // Step C: Reveal Subtitle
      .from('.hero-sub', {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, '-=0.5')
      // Step D: Staggered animation for the 3 Feature Cards
      .from('.feature-card', {
        y: 50,
        opacity: 0,
        scale: 0.9,
        stagger: 0.15, // 0.15s delay between each card's entry
        duration: 0.8,
      }, '-=0.4');
    },
    { scope: containerRef } // Scopes selectors to containerRef only
  );

  // 2. INTERACTIVE HOVER ANIMATION (using contextSafe)
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseEnter = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -8,
      scale: 1.02,
      borderColor: 'rgba(59, 130, 246, 0.5)', // Tailored border hover glow
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  const handleMouseLeave = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      duration: 0.3,
      ease: 'power2.out',
    });
  });
  

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* Badge */}
      <div className="badge mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wide">
        ✨ Next.js + GSAP Masterclass
      </div>

      {/* Main Headline */}
      <h1 className="hero-title text-5xl md:text-7xl font-extrabold text-center max-w-4xl tracking-tight leading-tight mb-6">
        Craft Motion That Captivates Your Users
      </h1>

      {/* Subtitle */}
      <p className="hero-sub text-lg md:text-xl text-neutral-400 text-center max-w-2xl mb-16">
        Combine the utility power of Tailwind CSS with high-performance GSAP timelines for seamless web experiences.
      </p>

      {/* Staggered Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {cardsData.map((card, i) => (
          <div
            key={i}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="feature-card p-8 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-md transition-shadow cursor-pointer"
          >
            <div className="text-3xl mb-4">{card.icon}</div>
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardsData = [
  {
    icon: '⚡',
    title: 'High Performance',
    description: 'Direct DOM manipulation bypassing React re-renders for butter-smooth 60fps animations.',
  },
  {
    icon: '🎯',
    title: 'Scoped Context',
    description: 'Automatic cleanup on component unmount with zero leftover memory leaks.',
  },
  {
    icon: '🪄',
    title: 'Interactive Hover',
    description: 'Wrapped event listeners using contextSafe keep user interactions stable and performant.',
  },
];