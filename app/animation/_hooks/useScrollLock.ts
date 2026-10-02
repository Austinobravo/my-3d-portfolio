'use client';

import { useEffect } from 'react';
import { useLenisControl } from '../_components/SmoothScroll';

export function useScrollLock(isLocked: boolean) {
  // Destructure the actual Lenis instance from the context object!
  const { lenis } = useLenisControl();

  useEffect(() => {
    if (!lenis) return;

    if (isLocked) {
      // 1. Pause Lenis smooth scroll
      lenis.stop();
      // 2. Prevent background scroll bar overflow
      document.body.style.overflow = 'hidden';
    } else {
      // 1. Resume Lenis smooth scroll
      lenis.start();
      // 2. Restore background scroll bar
      document.body.style.overflow = '';
    }

    // Cleanup when component unmounts unexpectedly while open
    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    };
  }, [isLocked, lenis]);
}