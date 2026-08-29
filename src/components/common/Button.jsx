import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@utils/cn';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  ...props
}) {
  const [ripples, setRipples] = useState([]);

  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    if (onClick) onClick(e);
  }

  const baseStyles =
    'relative inline-flex items-center justify-center font-mono font-semibold tracking-wide transition-all duration-300 rounded-14 focus:outline-none overflow-hidden select-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-gradient-to-r from-primary-blue via-primary-purple to-primary-pink text-white shadow-glow-blue hover:shadow-glow-purple border border-white/20',
    secondary:
      'bg-surface-2/80 text-content-primary border border-white/10 hover:border-primary-purple/50 hover:bg-surface-3 hover:shadow-glow-purple',
    outline:
      'bg-surface/60 text-content-primary border border-white/10 hover:border-cyan/60 hover:text-cyan hover:shadow-glow-blue',
    ghost:
      'text-content-muted hover:text-content-primary hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-3.5 py-2 text-xs',
    md: 'px-5 py-2.5 text-xs',
    lg: 'px-7 py-3.5 text-sm',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onClick={handleClick}
      {...props}
    >
      {/* Light Sheen Sweep Overlay */}
      <span className="absolute -inset-full bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

      {/* Button Content */}
      <span className="relative z-10 flex items-center space-x-2">
        {children}
      </span>

      {/* Interactive Click Ripple Effect */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              top: r.y,
              left: r.x,
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute w-8 h-8 rounded-full bg-white/30 pointer-events-none"
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}

export default Button;
