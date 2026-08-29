import React from 'react';

export function AmbientLights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#00F0FF" />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#7000FF" />
    </>
  );
}
