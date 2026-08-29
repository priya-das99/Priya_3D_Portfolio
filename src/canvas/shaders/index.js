import hologramVert from './hologram.vert?raw';
import neuralPulseFrag from './neuralPulse.frag?raw';

export const SHADERS = {
  hologram: {
    vertexShader: hologramVert,
    fragmentShader: neuralPulseFrag,
  }
};
