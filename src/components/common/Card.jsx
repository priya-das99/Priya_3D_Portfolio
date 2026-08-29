import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@utils/cn';

export function Card({ children, className = '', ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative p-[1px] rounded-24 bg-gradient-to-b from-white/10 via-white/5 to-transparent hover:from-primary-blue/50 hover:via-primary-purple/50 hover:to-primary-pink/50 transition-all duration-500 hover:shadow-glow-purple',
        className
      )}
      {...props}
    >
      <div className="relative h-full w-full p-6 sm:p-7 rounded-[23px] bg-surface/90 backdrop-blur-2xl border border-white/5 group-hover:border-transparent transition-all duration-300">
        {children}
      </div>
    </motion.div>
  );
}

export default Card;
