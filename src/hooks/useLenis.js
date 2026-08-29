import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useLenis(callback) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Disable custom scroll hijacking on touch screens or if reduced motion is preferred
    const isTouch = window.matchMedia('(hover: none)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReduced) {
      // Enable native smooth scroll behavior for internal page links
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      if (callback) callback(lenis);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, [callback]);

  return lenisRef;
}
