/**
 * Returns scroll progress percentage [0, 1] for a target element
 */
export const getScrollProgress = (element) => {
  if (!element) return 0;
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const total = rect.height + windowHeight;
  const current = windowHeight - rect.top;
  return clamp(current / total, 0, 1);
};
import { clamp } from './math.js';
