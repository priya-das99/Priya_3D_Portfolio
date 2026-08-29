import React, { Suspense, useLayoutEffect, useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, useGLTF, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import {
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";

import {
  BlendFunction,
  KernelSize,
} from "postprocessing";

// Penguin mascot — added as sibling to RoomModel, no existing code changed
import { PenguinMascot } from '@canvas/components/PenguinMascot';

// ============================================================================
// Helper component to report Drei loading progress to the parent
// ============================================================================
function LoadingReporter({ onLoad, onError }) {
  const { active, progress, errors } = useProgress();

  useEffect(() => {
    if (errors && errors.length > 0) {
      if (onError) onError();
    } else if (!active && progress === 100) {
      const timer = setTimeout(() => {
        if (onLoad) onLoad();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [active, progress, errors, onLoad, onError]);

  return null;
}

// ============================================================================
// 1. FLOATING PARTICLES — R3F mesh (must run inside a <Canvas>)
// ============================================================================
export function FloatingParticles({ count = 200 }) {
  const pointsRef = useRef();

  // Create particle positions and individual fall speeds once
  const [positions, speeds] = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const speedArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10; // X
      pos[i * 3 + 1] = Math.random() * 10 + 5;     // Y — start above scene
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z
      speedArray[i] = 0.005 + Math.random() * 0.005;
    }

    return [pos, speedArray];
  }, [count]);

  // Move every particle downward each frame; reset to top when it exits
  useFrame(() => {
    if (!pointsRef.current) return;
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const positionArray = positionAttribute.array;

    for (let i = 0; i < count; i++) {
      let y = positionArray[i * 3 + 1];
      y -= speeds[i];
      if (y < -2) y = Math.random() * 10 + 5;
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
        size={0.025}
        transparent
        opacity={0.75}
        depthWrite={false}
        depthTest={false}
        sizeAttenuation={true}
      />
    </points>
  );
}

// ============================================================================
// 2. FULL-SCREEN PARTICLES OVERLAY — wraps FloatingParticles in its own Canvas
//    Fixed, z-50, pointer-events-none → visible on EVERY page section
// ============================================================================
export function FullScreenParticles({ count = 180 }) {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        events={null}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <FloatingParticles count={count} />
      </Canvas>
    </div>
  );
}


// ============================================================================
// 2. 3D GLB ROOM MODEL COMPONENT
// ============================================================================
function RoomModel(props) {
  const { scene } = useGLTF("/assets/models/my_room.glb");

  // Monitor mesh ref kept for potential future use
  // (global Bloom now handles emissive glow, no SelectiveBloom needed)

  // ============================================================
  // MATERIALS
  // ============================================================
  const roomMaterials = useMemo(
    () => ({
      // --------------------------------------------------------
      // WALL / MAIN ROOM BODY
      // Reference: bodyMaterial
      // --------------------------------------------------------
      wall: new THREE.MeshStandardMaterial({
        color: "#08054a",
        roughness: 0.92,
        metalness: 0,
      }),

      // --------------------------------------------------------
      // FLOOR / RUG
      // --------------------------------------------------------
      floor: new THREE.MeshStandardMaterial({
        color: "#100f52",
        roughness: 0.97,
        metalness: 0,
      }),

      // --------------------------------------------------------
      // CURTAINS
      // Reference: curtainMaterial
      // --------------------------------------------------------
      curtain: new THREE.MeshPhongMaterial({
        color: "#b10707",
        shininess: 10,
      }),

      // --------------------------------------------------------
      // TABLE + CABINET
      // Reference: tableMaterial
      // --------------------------------------------------------
      table: new THREE.MeshPhongMaterial({
        color: "#582f0e",
        shininess: 10,
      }),

      // --------------------------------------------------------
      // CHAIR
      // Reference: chairMaterial
      // --------------------------------------------------------
      chair: new THREE.MeshPhongMaterial({
        color: "#15104A",
        shininess: 10,
      }),

      // --------------------------------------------------------
      // RADIATOR
      // Reference: radiatorMaterial
      // --------------------------------------------------------
      radiator: new THREE.MeshPhongMaterial({
        color: "#FFFFFF",
        shininess: 20,
      }),

      // --------------------------------------------------------
      // COMPUTER BODY
      // Reference: compMaterial
      // --------------------------------------------------------
      computer: new THREE.MeshStandardMaterial({
        color: "#FFFFFF",
        roughness: 0.4,
        metalness: 0,
      }),

      // --------------------------------------------------------
      // PILLOW
      // Reference: pillowMaterial
      // --------------------------------------------------------
      pillow: new THREE.MeshPhongMaterial({
        color: "#8338EC",
        shininess: 15,
      }),

      // --------------------------------------------------------
      // WINDOW
      // --------------------------------------------------------
      window: new THREE.MeshStandardMaterial({
        color: "#8489b9ff",
        roughness: 0.8,
        metalness: 0,
      }),

      windowGlass: new THREE.MeshStandardMaterial({
        color: "#3430A0",
        roughness: 0.25,
        metalness: 0,
      }),

      windowFrame: new THREE.MeshStandardMaterial({
        color: "#ac82d6ff",
        roughness: 0.7,
        metalness: 0,
      }),

      windowTop: new THREE.MeshStandardMaterial({
        color: "#925dc1ff",
        roughness: 0.8,
        metalness: 0,
      }),

      // --------------------------------------------------------
      // MONITOR SCREEN
      // Reference uses materials.lambert1
      // We use our custom emissive material
      // --------------------------------------------------------
      screen: new THREE.MeshStandardMaterial({
        color: "#52EBEB",
        emissive: "#52EBEB",
        emissiveIntensity: 1.6,
        roughness: 0.2,
        metalness: 0,
      }),
    }),
    []
  );

  // ============================================================
  // APPLY MATERIALS TO GLB MESHES
  // ============================================================
  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return;

      child.castShadow = true;
      child.receiveShadow = true;

      const name = child.name.toLowerCase();

      // ========================================================
      // 1. CURTAINS
      // Reference:
      // nodes._________6_blinn1_0
      // ========================================================
      if (name === "_________6_blinn1_0") {
        child.material = roomMaterials.curtain;
        return;
      }
      // ============================================================
      // WINDOW GLASS
      // ============================================================
      if (name === "window_blinn1_0") {
        child.material = roomMaterials.windowGlass;
        return;
      }

      // ============================================================
      // WINDOW FRAME / PHONG WINDOW PART
      // ============================================================
      if (name === "window4_phong1_0") {
        child.material = roomMaterials.windowFrame;
        return;
      }

      if (name === "window_blinn1_0") {
        child.material = new THREE.MeshStandardMaterial({
          color: "red",
        });
        return;
      }

      if (name === "window4_phong1_0") {
        child.material = new THREE.MeshStandardMaterial({
          color: "green",
        });
        return;
      }


      // ========================================================
      // 2. MAIN ROOM BODY / WALLS
      // Reference:
      // nodes.body1_blinn1_0
      // ========================================================
      if (name === "body1_blinn1_0") {
        child.material = roomMaterials.wall;
        return;
      }

      // ========================================================
      // 3. TABLE
      // Reference:
      // nodes.table_blinn1_0
      // ========================================================
      if (name === "table_blinn1_0") {
        child.material = roomMaterials.table;
        return;
      }

      // ========================================================
      // 4. CABINET / DRAWER
      // Reference:
      // nodes.cabin_blinn1_0
      // ========================================================
      if (name === "cabin_blinn1_0") {
        child.material = roomMaterials.table;
        return;
      }

      // ========================================================
      // 5. CHAIR
      // Reference:
      // nodes.chair_body_blinn1_0
      // ========================================================
      if (name === "chair_body_blinn1_0") {
        child.material = roomMaterials.chair;
        return;
      }

      // ========================================================
      // 6. COMPUTER BODY
      // Reference:
      // nodes.comp_blinn1_0
      // ========================================================
      if (name === "comp_blinn1_0") {
        child.material = roomMaterials.computer;
        return;
      }

      // ========================================================
      // 7. RADIATOR
      // Reference:
      // nodes.radiator_blinn1_0
      // ========================================================
      if (name === "radiator_blinn1_0") {
        child.material = roomMaterials.radiator;
        return;
      }

      // ========================================================
      // 8. PILLOWS
      // Reference:
      // nodes.pillows_blinn1_0
      // ========================================================
      if (name === "pillows_blinn1_0") {
        child.material = roomMaterials.pillow;
        return;
      }

      // ========================================================
      // 9. WINDOW
      // Reference:
      // nodes.window_blinn1_0
      // ========================================================
      if (name === "window_blinn1_0") {
        child.material = roomMaterials.window;
        return;
      }

      // ========================================================
      // 10. FLOOR / RUG
      // Reference:
      // nodes.kovrik_blinn1_0
      // ========================================================
      if (name === "kovrik_blinn1_0") {
        child.material = roomMaterials.floor;
        return;
      }

      // ========================================================
      // 11. MONITOR SCREEN
      // Reference:
      // ref={screensRef}
      // geometry={nodes.emis_lambert1_0.geometry}
      //
      // This is the important part for SelectiveBloom.
      // ========================================================
      if (name === "emis_lambert1_0") {
        child.material = roomMaterials.screen;
        return;
      }

      // ========================================================
      // 12. EVERYTHING ELSE
      //
      // Keep the original GLB materials:
      // blinn1
      // phong1
      // etc.
      // ========================================================
      if (child.material) {
        if (child.material.map) {
          child.material.map.colorSpace = THREE.SRGBColorSpace;
        }

        if (child.material.emissiveMap) {
          child.material.emissiveMap.colorSpace =
            THREE.SRGBColorSpace;
        }

        child.material.needsUpdate = true;
      }
    });
  }, [scene, roomMaterials]);

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <group {...props} dispose={null}>
      {/* ======================================================
          ORIGINAL GLB SCENE
          ====================================================== */}
      <primitive object={scene} />
    </group>
  );
}
// Preload GLB model asset
useGLTF.preload('/assets/models/my_room.glb');

// No visible loading fallback — the room preloads so this rarely shows;
// returning null avoids the wireframe rectangle artifact on initial load.
function ModelLoader() {
  return null;
}

// ============================================================================
// 3. MAIN HERO THREE.JS CANVAS SCENE
// ============================================================================
export function HeroScene({ onLoad, onError }) {
  const [scale, setScale] = useState(0.28);
  const [isTablet, setIsTablet] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 11.2]);
  const [zoomLimits, setZoomLimits] = useState({ min: 8.0, max: 14.0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // Prevent default page scroll only when scrolling inside the Canvas
      e.preventDefault();
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobileOrTablet = window.innerWidth <= 1024;
      setIsTablet(mobileOrTablet);

      if (window.innerWidth < 770) {
        // Mobile
        setScale(0.25);
        setCameraPosition([0, 0, 14.2]);
        setZoomLimits({ min: 11.0, max: 17.0 });
      } else if (window.innerWidth < 1024) {
        // Tablet
        setScale(0.28);
        setCameraPosition([0, 0, 12.5]);
        setZoomLimits({ min: 9.5, max: 15.5 });
      } else {
        // Desktop
        setScale(0.29);
        setCameraPosition([0, 0, 11.2]);
        setZoomLimits({ min: 8.0, max: 14.0 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
      className="w-full h-full relative cursor-grab active:cursor-grabbing"
      style={{ outline: 'none', overflow: 'hidden' }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.82,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        style={{ outline: 'none', border: 'none', display: 'block' }}
        tabIndex={-1}
      >
        {/* R3F Camera: Responsive Position & FOV 45 */}
        <PerspectiveCamera makeDefault position={cameraPosition} fov={45} />

        {/* ==================================================================
            CINEMATIC LIGHTING RIG — light-only neon simulation
            All neon effects are achieved via point lights, NOT geometry.
            This avoids floating shapes and aligns naturally with room walls.
            ================================================================== */}

        {/* 1. Global ambient — very dark blue-indigo, barely visible
               Just enough to show room silhouette without washing it out */}
        <hemisphereLight
          skyColor="#0d0840"
          groundColor="#030112"
          intensity={0.65}
        />

        {/* 2. Broad cool-white key light — upper-center, like diffuse moonlight
               Illuminates the room without creating a single hot spot */}
        <directionalLight
          position={[0, 9, 7]}
          intensity={1.1}
          color="#b0c8ff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={25}
          shadow-bias={-0.001}
        />

        {/* 3. Left window fill — blue from upper-left, simulates night sky */}
        <directionalLight
          position={[-6, 5, 3]}
          intensity={0.5}
          color="#3a5cc0"
        />

        {/* 4. Desk lamp — spotLight from lamp head aimed at desk + floor
               Creates the warm amber cone clearly visible in reference */}
        <spotLight
          position={[1.5, 0.9, 1.1]}
          angle={0.52}
          penumbra={0.75}
          intensity={48}
          color="#ffb020"
          distance={6.5}
          decay={2}
          castShadow={false}
        />
        {/* Warm fill pool at desk level (softens the spotlight edge) */}
        <pointLight
          position={[1.8, -0.6, 0.7]}
          intensity={10}
          color="#ff9800"
          distance={3.5}
          decay={2}
        />

        {/* 5. Monitor glow — soft teal from screen, casts on nearby wall/desk
               Emissive material + this light = natural monitor illumination */}
        <pointLight
          position={[2.6, -0.2, -1.0]}
          intensity={7}
          color="#30dddd"
          distance={3.5}
          decay={2}
        />

        {/* ================================================================
            NEON FLOOR STRIP SIMULATION — pure lighting, no geometry
            Four point lights placed at floor level near each wall base.
            They cast purple light upward onto walls + downward onto floor,
            exactly replicating how architectural LED strips behave.
            World floor Y ≈ -2.42. Room center ≈ [0, 0, 0].
            Floor corners (world): front-left (-0.4, 4.8), front-right (4.8, -0.4)
                                   back-right (0.4, -4.8), back-left (-4.8, 0.4)
            ================================================================ */}

        {/* Front floor edge — closest wall to camera (runs diagonal NW–SE) */}
        <pointLight
          position={[2.0, -2.25, 2.0]}
          intensity={9}
          color="#8833ee"
          distance={5}
          decay={1.8}
        />
        {/* Left floor edge — left wall base (runs diagonal NE–SW from camera) */}
        <pointLight
          position={[-2.4, -2.25, 2.4]}
          intensity={7}
          color="#7722cc"
          distance={5}
          decay={1.8}
        />
        {/* Right floor edge — right wall base */}
        <pointLight
          position={[2.4, -2.25, -2.4]}
          intensity={7}
          color="#8833ee"
          distance={5}
          decay={1.8}
        />
        {/* Back floor edge — back wall base (furthest from camera) */}
        <pointLight
          position={[-2.0, -2.25, -2.0]}
          intensity={7}
          color="#7722cc"
          distance={5}
          decay={1.8}
        />

        {/* Top-right wall/ceiling strip — the bright neon line
            visible at upper-right of reference image */}
        <pointLight
          position={[2.4, 1.6, -2.4]}
          intensity={22}
          color="#cc44ff"
          distance={7}
          decay={2}
        />

        {/* Purple depth light — upper back, adds depth to far wall */}
        <pointLight
          position={[0, 2.5, -5]}
          intensity={10}
          color="#5522aa"
          distance={14}
          decay={2}
        />

        {/* Penguin soft fill — very gentle, just enough to see white body details
            No direct bright spotlight on the penguin */}
        <pointLight
          position={[1.2, 0.5, 3.0]}
          intensity={5}
          color="#8855cc"
          distance={6}
          decay={2}
        />

        {/* Scene-level Bloom — only fires on high-luminance emissive surfaces
            (monitor screen). luminanceThreshold=0.75 prevents white particles
            or lights from bleeding into canvas edges as a glow rectangle. */}
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.75}
            luminanceSmoothing={0.25}
            kernelSize={KernelSize.LARGE}
            blendFunction={BlendFunction.ADD}
            mipmapBlur={false}
          />
        </EffectComposer>

        {/* ------------------------------------------------------------------
            MODEL GROUP: Position [0, -2.3, 0], Rotation [0, -Math.PI / 4, 0]
            Scale: 0.28 on Desktop, 0.20 on Mobile for prominent initial view
            ------------------------------------------------------------------ */}
        <Suspense fallback={<ModelLoader />}>
          <group
            position={[0, -2.7, 0]}
            rotation={[0, -Math.PI / 4, 0]}
            scale={scale}
          >
            <RoomModel />
          </group>
        </Suspense>

        {/* ------------------------------------------------------------------
            PENGUIN MASCOT: Direct Canvas child (world space) so it isn't
            multiplied by the room group's 0.28 scale.
            Floor world-Y = -2.7. Placed at front-right of room in world space.
            ------------------------------------------------------------------ */}
        <Suspense fallback={null}>
          <PenguinMascot />
        </Suspense>


        {/* ------------------------------------------------------------------
            ORBIT CONTROLS: Pan Disabled, Zoom Enabled with Strict Limits
            - Min Zoom (Max Zoom In): Responsive
            - Max Zoom (Max Zoom Out): Responsive
            ------------------------------------------------------------------ */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableDamping={true}
          dampingFactor={0.05}
          zoomSpeed={0.8}
          autoRotate={false}
          minDistance={zoomLimits.min}
          maxDistance={zoomLimits.max}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.05}
          target={[0, -0.6, 0]}
        />
        <LoadingReporter onLoad={onLoad} onError={onError} />
      </Canvas>
    </div>
  );
}

export default HeroScene;
