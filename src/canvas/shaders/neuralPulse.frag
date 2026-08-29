uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
  float scanline = sin(vUv.y * 100.0 + uTime * 5.0) * 0.1 + 0.9;
  vec3 finalColor = uColor * (fresnel + scanline);
  gl_FragColor = vec4(finalColor, fresnel * 0.8 + 0.2);
}
