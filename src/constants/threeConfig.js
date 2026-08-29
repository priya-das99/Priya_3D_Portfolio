export const THREE_CONFIG = {
  camera: {
    fov: 45,
    near: 0.1,
    far: 1000,
    defaultPosition: [0, 0, 5],
  },
  gl: {
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  },
  performance: {
    minFpsThreshold: 30,
    targetFps: 60,
    adaptivePixelRatio: true,
  },
  colors: {
    bgObsidian: "#030712",
    cyanGlow: "#00F0FF",
    violetGlow: "#7000FF",
    pinkGlow: "#FF007A",
    wireframe: "#1E293B"
  }
};
