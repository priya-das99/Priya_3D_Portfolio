import React from 'react';
import { cn } from '@utils/cn';

export function Badge({ children, variant = 'cyan', className = '' }) {
  const variants = {
    cyan: 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/30',
    violet: 'bg-cyber-violet/10 text-purple-300 border-cyber-violet/30',
    pink: 'bg-cyber-pink/10 text-pink-300 border-cyber-pink/30',
    emerald: 'bg-cyber-emerald/10 text-emerald-300 border-cyber-emerald/30',
  };

  return (
    <span className={cn('px-2.5 py-1 rounded-full text-xs font-mono border inline-flex items-center gap-1.5', variants[variant], className)}>
      {children}
    </span>
  );
}
