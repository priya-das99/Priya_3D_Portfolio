/**
 * PenguinMascot.jsx
 *
 * Behavior:
 *
 * Initial:
 *   Penguin enters from the right
 *        ↓
 *   Stops on floor
 *        ↓
 *   Shows "Want some music?"
 *
 * Dance:
 *   User clicks "Let's Dance!"
 *        ↓
 *   Music + Scene animation
 *
 * Stop:
 *   User clicks "Stop Music"
 *        ↓
 *   Music stops
 *        ↓
 *   Penguin walks OUT
 *        ↓
 *   Waits 25 seconds
 *        ↓
 *   Penguin walks IN again
 *        ↓
 *   Shows "Music again?"
 */

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  useGLTF,
  useAnimations,
  Html,
} from "@react-three/drei";

import { useFrame } from "@react-three/fiber";

import * as THREE from "three";

// Ensure THREE.MathUtils.moveTowards is defined
if (!THREE.MathUtils.moveTowards) {
  THREE.MathUtils.moveTowards = function (current, target, maxDelta) {
    if (Math.abs(target - current) <= maxDelta) {
      return target;
    }
    return current + Math.sign(target - current) * maxDelta;
  };
}

// ============================================================
// ASSETS
// ============================================================

const MODEL_PATH = "/assets/models/penguin.glb";

const AUDIO_PATH = "/assets/audio/swalla.mp3";

const ANIM_NAME = "Scene";

// ============================================================
// PENGUIN SETTINGS
// ============================================================

const SCALE = 0.007;

// ------------------------------------------------------------
// IMPORTANT:
// Position of room floor in world space.
// ------------------------------------------------------------

const FLOOR_Y = -2.45;

// ------------------------------------------------------------
// Final position inside the room
// ------------------------------------------------------------

const FINAL_X = 1.2;

const FINAL_Z = 1.5;

// ------------------------------------------------------------
// Starting position.
// Penguin enters from the right side.
// ------------------------------------------------------------

const START_X = FINAL_X + 6.0;

// ------------------------------------------------------------
// Exit position.
// Penguin walks to the right and leaves the room.
// ------------------------------------------------------------

const EXIT_X = FINAL_X + 6.0;

// ------------------------------------------------------------
// Walking speed.
// ------------------------------------------------------------

const WALK_SPEED = 1.0;

// ------------------------------------------------------------
// How close the penguin must get before stopping.
// ------------------------------------------------------------

const ARRIVE_EPS = 0.08;

// ------------------------------------------------------------
// How long penguin waits outside before returning.
// ------------------------------------------------------------

const RETURN_DELAY = 25000;

// ------------------------------------------------------------
// Model orientation.
// ------------------------------------------------------------

const PENGUIN_ROTATION_Y = 0;

// ------------------------------------------------------------
// Speech bubble height in GLB raw local units.
// Bounding box max Y = 372.5 (top of hat).
// 435 is ~17% above top of hat, centered horizontally over X=0.
// ------------------------------------------------------------

const BUBBLE_RAW_Y = 435;


// ============================================================
// COMPONENT
// ============================================================

export function PenguinMascot() {
  // ==========================================================
  // REFS
  // ==========================================================

  const groupRef = useRef();

  const audioRef = useRef(null);

  const returnTimerRef = useRef(null);

  // Current X position
  const currentXRef = useRef(START_X);

  // Calculated Y position so feet touch floor
  const groupYRef = useRef(FLOOR_Y);

  // Used for walking animation
  const walkTimeRef = useRef(0);

  // Current phase
  const phaseRef = useRef("entering");

  // ==========================================================
  // LOAD MODEL
  // ==========================================================

  const { scene, animations } = useGLTF(MODEL_PATH);

  // ==========================================================
  // ANIMATIONS
  // ==========================================================

  const { actions } = useAnimations(
    animations,
    groupRef
  );

  // ==========================================================
  // REACT STATE
  // ==========================================================

  const [phase, setPhase] = useState("entering");

  const [messageIndex, setMessageIndex] = useState(0);

  const [hasArrived, setHasArrived] = useState(false);

  const [modelReady, setModelReady] = useState(false);

  // ==========================================================
  // SET PHASE
  // ==========================================================

  const changePhase = useCallback((newPhase) => {
    phaseRef.current = newPhase;
    setPhase(newPhase);

    console.log(
      `[PenguinMascot] Penguin state: ${newPhase}`
    );
  }, []);

  // ==========================================================
  // INITIAL MODEL SETUP
  // ==========================================================

  useEffect(() => {
    if (!scene || !groupRef.current) return;

    // --------------------------------------------------------
    // Disable lights/cameras that may be included in GLB
    // --------------------------------------------------------

    scene.traverse((child) => {
      if (child.isLight || child.isCamera) {
        child.visible = false;
      }

      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // --------------------------------------------------------
    // Calculate bounding box
    // --------------------------------------------------------

    const box = new THREE.Box3().setFromObject(scene);

    if (box.isEmpty()) {
      console.error(
        "[PenguinMascot] Could not calculate model bounding box"
      );

      return;
    }

    // --------------------------------------------------------
    // Convert minY into world units.
    // --------------------------------------------------------

    const scaledMinY = box.min.y * SCALE;

    // --------------------------------------------------------
    // Put feet exactly on FLOOR_Y
    // --------------------------------------------------------

    const groupY = FLOOR_Y - scaledMinY;

    groupYRef.current = groupY;

    // --------------------------------------------------------
    // Start position
    // --------------------------------------------------------

    currentXRef.current = START_X;

    groupRef.current.position.set(
      START_X,
      groupY,
      FINAL_Z
    );

    setModelReady(true);
  }, [scene]);

  // ==========================================================
  // AUDIO SETUP & ENDED EVENT LISTENER
  // ==========================================================

  const handleStopRef = useRef();
  handleStopRef.current = handleStop;

  useEffect(() => {
    const audio = new Audio(AUDIO_PATH);

    // Disable loop so the song plays through to the end
    audio.loop = false;

    audio.volume = 0.6;

    // Automatically trigger exit flow when music finishes
    const onEnded = () => {
      console.log("[PenguinMascot] Music ended — penguin walking out");
      if (handleStopRef.current) {
        handleStopRef.current();
      }
    };

    audio.addEventListener("ended", onEnded);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // ==========================================================
  // WALKING / MOVEMENT LOOP
  // ==========================================================

  useFrame((state, delta) => {
    if (!groupRef.current || !modelReady) return;

    const currentPhase = phaseRef.current;

    // ========================================================
    // ENTERING
    // ========================================================

    if (currentPhase === "entering") {
      walkTimeRef.current += delta * 9;

      currentXRef.current = THREE.MathUtils.moveTowards(
        currentXRef.current,
        FINAL_X,
        WALK_SPEED * delta
      );

      groupRef.current.position.x = currentXRef.current;

      const walk = Math.sin(walkTimeRef.current);

      groupRef.current.position.y =
        groupYRef.current + Math.abs(walk) * 0.04;

      groupRef.current.rotation.z = walk * 0.035;

      if (Math.abs(currentXRef.current - FINAL_X) < ARRIVE_EPS) {
        currentXRef.current = FINAL_X;

        groupRef.current.position.x = FINAL_X;

        groupRef.current.position.y = groupYRef.current;

        groupRef.current.rotation.z = 0;

        setHasArrived(true);

        changePhase("idle");
      }
    }

    // ========================================================
    // LEAVING
    // ========================================================

    else if (currentPhase === "leaving") {
      walkTimeRef.current += delta * 9;

      currentXRef.current = THREE.MathUtils.moveTowards(
        currentXRef.current,
        EXIT_X,
        WALK_SPEED * delta
      );

      groupRef.current.position.x = currentXRef.current;

      const walk = Math.sin(walkTimeRef.current);

      groupRef.current.position.y =
        groupYRef.current + Math.abs(walk) * 0.04;

      groupRef.current.rotation.z = walk * 0.035;

      if (Math.abs(currentXRef.current - EXIT_X) < ARRIVE_EPS) {
        currentXRef.current = EXIT_X;

        groupRef.current.position.x = EXIT_X;

        groupRef.current.position.y = groupYRef.current;

        groupRef.current.rotation.z = 0;

        changePhase("waiting");
        setHasArrived(false);

        clearTimeout(returnTimerRef.current);

        returnTimerRef.current = setTimeout(() => {
          currentXRef.current = START_X;

          if (groupRef.current) {
            groupRef.current.position.set(
              START_X,
              groupYRef.current,
              FINAL_Z
            );

            groupRef.current.rotation.z = 0;
          }

          setMessageIndex(1);
          setHasArrived(false);

          changePhase("entering");
        }, RETURN_DELAY);
      }
    }

    // ========================================================
    // IDLE / WAITING / STOPPING
    // ========================================================

    else if (
      currentPhase === "idle" ||
      currentPhase === "stopping" ||
      currentPhase === "waiting"
    ) {
      groupRef.current.position.y = groupYRef.current;

      groupRef.current.rotation.z = 0;
    }
  });

  // ==========================================================
  // START DANCE
  // ==========================================================

  const handleDance = useCallback(() => {
    const action = actions?.[ANIM_NAME];

    if (!action || !audioRef.current) return;

    clearTimeout(returnTimerRef.current);

    action.reset();
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.clampWhenFinished = false;
    action.play();

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => { });

    changePhase("dancing");
  }, [actions, changePhase]);

  // ==========================================================
  // STOP MUSIC
  // ==========================================================

  const handleStop = useCallback(() => {
    const action = actions?.[ANIM_NAME];

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (action) {
      action.stop();
      action.reset();
    }

    currentXRef.current = FINAL_X;

    if (groupRef.current) {
      groupRef.current.position.x = FINAL_X;
      groupRef.current.position.y = groupYRef.current;
      groupRef.current.rotation.z = 0;
    }

    setHasArrived(false);

    changePhase("leaving");
  }, [actions, changePhase]);

  // ==========================================================
  // CLEANUP
  // ==========================================================

  useEffect(() => {
    return () => {
      clearTimeout(returnTimerRef.current);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }

      const action = actions?.[ANIM_NAME];

      if (action) {
        action.stop();
      }
    };
  }, [actions]);

  // ==========================================================
  // SPEECH BUBBLE VISIBILITY & MESSAGES
  // ==========================================================

  const showSpeech = phase === "idle" && hasArrived;

  const showPlaying = phase === "dancing";

  const messages = [
    {
      l1: "Hey! Want some music?",
      l2: "Let's dance! 🎵",
    },
    {
      l1: "Music again? 😏",
      l2: "Come on, let's dance!",
    },
  ];

  const msg = messages[messageIndex];

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <group
      ref={groupRef}
      scale={SCALE}
      rotation={[0, PENGUIN_ROTATION_Y, 0]}
      visible={modelReady}
    >
      {/* 3D Penguin Mesh */}
      <primitive object={scene} />

      {/* SPEECH BUBBLE — IDLE STATE */}
      {showSpeech && (
        <Html
          position={[0, BUBBLE_RAW_Y, 0]}
          center
          distanceFactor={5}
          occlude
          zIndexRange={[10, 0]}
          style={{
            pointerEvents: "auto",
          }}
        >
          <Bubble
            line1={msg.l1}
            line2={msg.l2}
            btnLabel="🎵 Let's Dance!"
            onBtn={handleDance}
            btnColor="linear-gradient(135deg,#7c3aed,#a855f7)"
          />
        </Html>
      )}

      {/* SPEECH BUBBLE — PLAYING/DANCING STATE */}
      {showPlaying && (
        <Html
          position={[0, BUBBLE_RAW_Y, 0]}
          center
          distanceFactor={5}
          occlude
          zIndexRange={[10, 0]}
          style={{
            pointerEvents: "auto",
          }}
        >
          <Bubble
            line1="🎶 Vibing hard!"
            line2="Let's dance!"
            btnLabel="⏹ Stop Music"
            onBtn={handleStop}
            btnColor="linear-gradient(135deg,#dc2626,#ef4444)"
          />
        </Html>
      )}
    </group>
  );
}


// ============================================================
// COMPACT SPEECH BUBBLE COMPONENT
// ============================================================

function Bubble({ line1, line2, btnLabel, onBtn, btnColor }) {
  return (
    <div style={css.bubble}>
      <div style={css.tail} />

      <p style={css.line1}>{line1}</p>

      {line2 && <p style={css.line2}>{line2}</p>}

      <button
        style={{
          ...css.btn,
          background: btnColor,
        }}
        onClick={onBtn}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
      >
        {btnLabel}
      </button>
    </div>
  );
}


// ============================================================
// PRELOAD MODEL
// ============================================================

useGLTF.preload(MODEL_PATH);


// ============================================================
// STYLES
// ============================================================

const css = {
  bubble: {
    position: "relative",
    background: "rgba(13,10,40,0.94)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(162,89,255,0.55)",
    borderRadius: "12px",
    padding: "8px 12px",
    minWidth: "160px",
    maxWidth: "180px",
    boxShadow: "0 0 16px rgba(162,89,255,0.35), 0 4px 20px rgba(0,0,0,0.6)",
    textAlign: "center",
    fontFamily: "'Inter', sans-serif",
    userSelect: "none",
    pointerEvents: "auto",
  },

  tail: {
    position: "absolute",
    bottom: "-8px",
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "7px solid transparent",
    borderRight: "7px solid transparent",
    borderTop: "8px solid rgba(162,89,255,0.55)",
  },

  line1: {
    margin: "0 0 3px",
    fontSize: "15px",
    fontWeight: 600,
    color: "#e2d9f3",
    lineHeight: 1.25,
  },

  line2: {
    margin: "0 0 6px",
    fontSize: "12px",
    color: "#a78bfa",
    lineHeight: 1.25,
  },

  btn: {
    display: "block",
    width: "100%",
    padding: "5px 8px",
    border: "none",
    borderRadius: "7px",
    color: "#fff",
    fontSize: "10.0px",
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
    letterSpacing: "0.02em",
    boxShadow: "0 2px 8px rgba(124,58,237,0.45)",
  },
};