import React from 'react';
import { SceneCamera } from '../components/SceneCamera';
import { AmbientLights } from '../components/AmbientLights';

export function ProjectShowcaseScene() {
  return (
    <>
      <SceneCamera position={[0, 1, 6]} />
      <AmbientLights />
    </>
  );
}
