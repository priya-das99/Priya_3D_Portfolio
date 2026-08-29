export const TRANSITION_DEFAULTS = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] // Custom smooth cubic-bezier
};

export const FADE_IN_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_DEFAULTS
  }
};

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const SCALE_IN = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: TRANSITION_DEFAULTS
  }
};
