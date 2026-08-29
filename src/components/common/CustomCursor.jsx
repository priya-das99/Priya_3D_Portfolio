import React, { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Direct 120fps hardware-accelerated position tracking (0ms React lag!)
  useEffect(() => {
    let animId;
    let mouseX = -100;
    let mouseY = -100;

    const updatePosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouseX}px`;
        cursorRef.current.style.top = `${mouseY}px`;
      }
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Detect hover state on links, buttons, and interactive elements
  useEffect(() => {
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, .hoverable, h1, h2, h3');
      if (target) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', onMouseOver, { passive: true });
    return () => {
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  const diameter = isHovered ? 68 : 36;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-50 rounded-full hidden lg:block liquid-glass-surface"
      style={{
        left: '-100px',
        top: '-100px',
        width: `${diameter}px`,
        height: `${diameter}px`,
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'left, top, width, height',
      }}
    >
      {/* Specular Glare Arc on Top Edge for Liquid Droplet 3D Depth */}
      <div
        className="absolute top-0.5 left-2 right-2 h-1/3 rounded-t-full pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 100%)',
          maskImage: 'radial-gradient(ellipse at top, black 50%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top, black 50%, transparent 100%)',
        }}
      />

      {/* Secondary Bottom Rim Refraction Highlight */}
      <div
        className="absolute bottom-0.5 left-3 right-3 h-1/4 rounded-b-full pointer-events-none opacity-40"
        style={{
          background: 'linear-gradient(to top, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%)',
        }}
      />

      {/* Subtle Liquid Cyan Light Core */}
      <div className="absolute inset-1 rounded-full bg-cyan/5 blur-[2px] opacity-40 pointer-events-none" />
    </div>
  );
}

export default CustomCursor;
