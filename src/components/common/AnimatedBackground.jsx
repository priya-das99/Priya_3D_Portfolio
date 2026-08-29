import React, { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const glowRef = useRef(null);

  // Passive, hardware-accelerated mouse light tracking directly on the DOM
  useEffect(() => {
    let animFrameId;
    let mouseX = -1000;
    let mouseY = -1000;

    const updateGlow = () => {
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.04) 40%, transparent 80%)`;
      }
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(updateGlow);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-bg select-none">
      {/* ====================================================================
          1. ANIMATED BLUE-PURPLE GRADIENT BLOBS (Hardware Accelerated)
          ==================================================================== */}
      {/* Blob 1: Top-Left Blue Glow */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary-blue/15 blur-[150px] will-change-transform animate-float-slow"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />

      {/* Blob 2: Bottom-Right Purple Glow */}
      <div
        className="absolute -bottom-40 -right-40 w-[650px] h-[650px] rounded-full bg-primary-purple/15 blur-[160px] will-change-transform animate-float-reverse"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />

      {/* Blob 3: Center Cyan Light Pulse */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan/10 blur-[140px] will-change-transform animate-pulse-slow"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />

      {/* ====================================================================
          2. LIGHTWEIGHT PARTICLE FIELD & BLUEPRINT GRID
          ==================================================================== */}
      {/* Radial Center Light Field */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(59,130,246,0.08)_0,transparent_100%)]" />

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* Subtle Star Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08)_1px,transparent_1px),radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.12)_1px,transparent_1px),radial-gradient(circle_at_40%_80%,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:8rem_8rem]" />

      {/* ====================================================================
          3. SVG NOISE & LIQUID REFRACTION FILTERS
          ==================================================================== */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-overlay pointer-events-none">
        <filter id="bgNoiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <filter id="liquidRefraction" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bgNoiseFilter)" />
      </svg>

      {/* ====================================================================
          4. CURSOR GLOW (Radial Mouse Spotlight)
          ==================================================================== */}
      <div
        ref={glowRef}
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(650px circle at -1000px -1000px, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.04) 40%, transparent 80%)',
        }}
      />
    </div>
  );
}

export default AnimatedBackground;
