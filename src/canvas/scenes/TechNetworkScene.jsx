import React from 'react';
import { SceneCamera } from '../components/SceneCamera';
import { AmbientLights } from '../components/AmbientLights';
import { ParticleField } from '../components/ParticleField';

export function TechNetworkScene() {
  return (
    <>
      <SceneCamera position={[0, 0, 8]} />
      <AmbientLights />
      <ParticleField count={250} radius={6} />
    </>
  );
}
