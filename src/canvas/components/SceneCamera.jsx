import React from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { THREE_CONFIG } from '@constants/threeConfig';

export function SceneCamera({ position = THREE_CONFIG.camera.defaultPosition }) {
  return (
    <PerspectiveCamera
      makeDefault
      fov={THREE_CONFIG.camera.fov}
      near={THREE_CONFIG.camera.near}
      far={THREE_CONFIG.camera.far}
      position={position}
    />
  );
}
