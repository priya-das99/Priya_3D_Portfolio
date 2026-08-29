import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@constants/portfolio';
import { Cpu, Heart } from 'lucide-react';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 border-t border-white/10 bg-surface/90 backdrop-blur-2xl py-8 px-4 sm:px-6 lg:px-8 text-center text-sm font-sans text-content-muted"
    >
      <div className="max-w-1440 mx-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm text-content-muted">
        <span>© 2026 {PERSONAL_INFO.name}. All rights reserved.</span>
        <span className="text-cyan text-xs">●</span>
        <span>Open to opportunities</span>
        <span>·</span>
        <a
          href={PERSONAL_INFO.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-content-secondary hover:text-cyan transition-colors"
        >
          GitHub
        </a>
        <span>·</span>
        <a
          href={PERSONAL_INFO.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-content-secondary hover:text-cyan transition-colors"
        >
          LinkedIn
        </a>
        <span>·</span>
        <a
          href={`mailto:${PERSONAL_INFO.socials.email}`}
          className="text-content-secondary hover:text-cyan transition-colors"
        >
          Email
        </a>
      </div>
    </motion.footer>
  );
}

export default Footer;
