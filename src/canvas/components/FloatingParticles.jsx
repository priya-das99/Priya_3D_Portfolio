/**
 * FloatingParticles
 * -----------------
 * Reusable R3F component — small white falling dots rendered in a Three.js
 * points mesh. Must run inside an R3F <Canvas> context.
 *
 * Used by:
 *  - HeroScene.jsx  (inside the hero Canvas alongside the 3D room)
 *  - GlobalParticles.jsx  (inside a standalone fixed Canvas overlay for all sections)
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as React from 'react';

export function FloatingParticles({ count = 200 }) {
  const pointsRef = useRef();

  // Create particle positions and individual fall speeds once
  const [positions, speeds] = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const speedArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // X position
      pos[i * 3]     = (Math.random() - 0.5) * 10;
      // Y position — start above the scene
      pos[i * 3 + 1] = Math.random() * 10 + 5;
      // Z position
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      // Individual falling speed
      speedArray[i]  = 0.005 + Math.random() * 0.005;
    }

    return [pos, speedArray];
  }, [count]);

  // Animate: move each particle downward each frame, reset to top when it exits
  useFrame(() => {
    if (!pointsRef.current) return;

    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const positionArray = positionAttribute.array;

    for (let i = 0; i < count; i++) {
      let y = positionArray[i * 3 + 1];
      y -= speeds[i];
      if (y < -2) {
        y = Math.random() * 10 + 5;
      }
      positionArray[i * 3 + 1] = y;
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#ffffff"
        size={0.05}
        transparent
        opacity={0.9}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export default FloatingParticles;
