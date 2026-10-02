"use client"
import HeroSection from './_components/Hero';
import ProductShowcase from './_components/ProductShowcase';
import HorizontalGallery from './_components/HorizontalGallery';
import MobileDrawer from './_components/MobileDrawer';
import Link from 'next/link';
import { useLenisControl } from './_components/SmoothScroll';


function LenisInspectorBadge() {
  const { isEnabled, toggleLenis } = useLenisControl();

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-neutral-900/90 border border-neutral-700/80 backdrop-blur-md p-4 rounded-2xl shadow-2xl flex flex-col gap-2 max-w-xs text-white">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Lenis Smooth Scroll</span>
        <span className={`w-2.5 h-2.5 rounded-full ${isEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
      </div>

      <p className="text-xs text-neutral-300">
        Status: <strong className={isEnabled ? 'text-emerald-400' : 'text-red-400'}>{isEnabled ? 'ACTIVE (Smooth Enabled)' : 'PAUSED (Native Scroll)'}</strong>
      </p>

      <button
        onClick={toggleLenis}
        className="mt-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all text-white"
      >
        {isEnabled ? 'Disable Lenis (Feel Native Scroll)' : 'Enable Lenis (Feel Smooth Glide)'}
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <main>
        <LenisInspectorBadge />
      <HeroSection />
      {/* <MobileDrawer /> */}
      <ProductShowcase />
      <HorizontalGallery />
      <div className="h-60 bg-neutral-900 flex flex-col items-center justify-center border-t border-neutral-800">
        <p className="text-neutral-400 mb-4">Test Next.js Route Transitions:</p>
        <Link
          href="/animation/about"
          className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
        >
          Go to About Page →
        </Link>
      </div>
    </main>
  );
}