/**
 * Linear interpolation
 */
export const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

/**
 * Clamp value within range
 */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/**
 * Map number from input range to output range
 */
export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Generate random spherical coordinate point for particle systems
 */
export const randomSphericalPoint = (radius = 1) => {
  const u = Math.random();
  const v = Math.random();
  const theta = u * 2.0 * Math.PI;
  const phi = Math.acos(2.0 * v - 1.0);
  const r = Math.cbrt(Math.random()) * radius;

  const sinPhi = Math.sin(phi);
  const x = r * sinPhi * Math.cos(theta);
  const y = r * sinPhi * Math.sin(theta);
  const z = r * Math.cos(phi);

  return [x, y, z];
};
