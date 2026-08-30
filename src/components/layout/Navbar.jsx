import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  // { label: 'About', href: '#about' }, // disabled
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll detection to shrink navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll click handler for header links
  const handleNavClick = (e, item) => {
    if (e) e.preventDefault();
    setActiveItem(item.label);
    setMobileMenuOpen(false);

    const targetId = item.href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      setTimeout(() => {
        const navOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }, 20);
    }
  };

  // Automatic Section Scroll Spy via IntersectionObserver
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.querySelector(item.href)).filter(Boolean);

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchedItem = NAV_ITEMS.find((item) => item.href === `#${entry.target.id}`);
          if (matchedItem) {
            setActiveItem(matchedItem.label);
          }
        }
      });
    }, observerOptions);

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Mobile Drawer Dark Blur Overlay / Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-bg/80 backdrop-blur-md z-30 md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="max-w-1440 mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`relative flex items-center justify-between transition-all duration-500 rounded-2xl px-6 ${
              isScrolled
                ? 'py-2.5 bg-surface/85 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/40'
                : 'py-3.5 bg-surface/40 backdrop-blur-md border border-white/5 shadow-sm'
            }`}
          >
            {/* Brand Logo with Gradient */}
            <a
              href="#home"
              className="group flex items-center space-x-2.5 text-decoration-none"
              onClick={(e) => handleNavClick(e, { label: 'Home', href: '#home' })}
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-10 bg-surface-2 border border-white/10 group-hover:border-primary-blue/50 transition-colors duration-300">
                <Sparkles className="w-4 h-4 text-primary-blue group-hover:text-primary-pink transition-colors duration-500" />
                <div className="absolute inset-0 rounded-10 bg-primary-blue/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <span className="font-heading text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-blue via-primary-purple to-primary-pink group-hover:opacity-90 transition-opacity">
                Priya Das<span className="text-cyan font-mono text-sm ml-0.5">.codes</span>
              </span>
            </a>

            {/* Desktop Navigation Items with Sliding Transition */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeItem === item.label;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    onMouseEnter={() => setHoveredItem(item.label)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-content-primary' : 'text-content-muted hover:text-content-primary'
                    }`}
                  >
                    {/* Label */}
                    <span className="relative z-10">{item.label}</span>

                    {/* Smooth Sliding Active Highlight & Underline */}
                    {isActive && (
                      <>
                        <motion.div
                          layoutId="activePill"
                          className="absolute inset-0 rounded-10 bg-white/[0.07] border border-white/10 shadow-sm"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                        <motion.div
                          layoutId="activeUnderline"
                          className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-primary-blue via-primary-purple to-primary-pink shadow-glow-blue"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      </>
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right Side Resume CTA Button */}
            <div className="hidden md:flex items-center">
              <a
                href="/assets/resume/Priya_Das_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center px-5 py-2 text-xs font-semibold tracking-wide uppercase font-mono text-content-primary transition-all duration-300 rounded-10 group overflow-hidden border border-primary-blue/30 hover:border-primary-blue/80 hover:shadow-glow-blue active:scale-95"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary-blue/10 via-primary-purple/10 to-primary-pink/10 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10 flex items-center space-x-2">
                  <FileText className="w-3.5 h-3.5 text-cyan group-hover:rotate-12 transition-transform duration-300" />
                  <span>Resume</span>
                </span>
              </a>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-10 bg-surface-2/80 text-content-primary border border-white/10 hover:border-primary-blue/50 focus:outline-none transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-primary-pink" />
                ) : (
                  <Menu className="w-5 h-5 text-primary-blue" />
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Drawer Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden max-w-1440 mx-auto px-4 mt-2"
            >
              <div className="p-6 rounded-2xl bg-surface-2/95 backdrop-blur-2xl border border-white/12 shadow-2xl shadow-black/80 space-y-4">
                <div className="flex flex-col space-y-2">
                  {NAV_ITEMS.map((item, idx) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.035 }}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`px-4 py-3 rounded-12 text-base font-medium transition-all duration-300 flex items-center justify-between ${
                        activeItem === item.label
                          ? 'bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 text-content-primary border border-primary-blue/30'
                          : 'text-content-muted hover:text-content-primary hover:bg-white/5'
                      }`}
                    >
                      <span>{item.label}</span>
                      {activeItem === item.label && (
                        <span className="w-2 h-2 rounded-full bg-cyan shadow-glow-blue" />
                      )}
                    </motion.a>
                  ))}
                </div>

                {/* Mobile Resume Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: NAV_ITEMS.length * 0.035 }}
                  className="pt-4 border-t border-white/10"
                >
                  <a
                    href="/assets/resume/Priya_Das_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center space-x-2 py-3 rounded-12 text-sm font-semibold font-mono text-content-primary bg-gradient-to-r from-primary-blue via-primary-purple to-primary-pink hover:opacity-95 transition-opacity shadow-glow-purple"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download Resume</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

export default Navbar;
