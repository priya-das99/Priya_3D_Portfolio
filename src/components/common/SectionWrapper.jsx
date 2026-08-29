import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function SectionWrapper({ children, id, className = '', ...props }) {
  const sectionRef = useRef(null);

  // Track scroll position of this section relative to viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Smooth spring physics for fluid scroll movement
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Entrance & exit progressive transforms
  const opacity = useTransform(springProgress, [0, 0.22, 0.78, 1], [0.15, 1, 1, 0.35]);
  const y = useTransform(springProgress, [0, 0.22, 0.78, 1], [70, 0, 0, -40]);
  const scale = useTransform(springProgress, [0, 0.22, 0.78, 1], [0.96, 1, 1, 0.98]);

  return (
    <section ref={sectionRef} id={id} className={`relative ${className}`} {...props}>
      <motion.div
        style={{
          opacity,
          y,
          scale,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  );
}

export default SectionWrapper;
