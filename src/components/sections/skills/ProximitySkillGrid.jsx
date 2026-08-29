/**
 * ProximitySkillGrid.jsx
 *
 * Orbital Constellation Proximity Scale Grid.
 * Fully Responsive for Desktop and Mobile Viewports.
 *
 * Features:
 *  - Responsive Badge Sizing (72px desktop / 48px mobile).
 *  - Desktop Master Constellation (14 spacious slots) & Mobile Master Constellation (2 concentric non-overlapping rings).
 *  - Both Mouse & Touch gesture proximity scaling + glowing brand halo.
 */

import React, { useRef, useMemo, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Config ────────────────────────────────────────────────────────────────────
const PROXIMITY_RADIUS = 180;  // px – proximity radius
const MAX_SCALE        = 1.55; // max scale at cursor / touch center
const CORE_BOOST       = 1.12; // resting scale for core skill (Python)
const TWEEN_DURATION   = 0.35; // seconds
const TWEEN_EASE       = 'power2.out';

// ── Dynamic Mobile Hook ───────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}

// ── Constellation Position Generator ──────────────────────────────────────────
function getConstellationPositions(skills, isMobile = false) {
  const n = skills.length;
  if (n === 0) return [];
  if (n === 1) return [{ left: '50%', top: '50%' }];

  // ── 1. ALL Category (12+ skills) ──────────────────────────────────────────
  if (n >= 12) {
    const DESKTOP_SLOTS = [
      { left: '50%', top: '50%' }, // Slot 0: Focal Center Focus (Python)
      { left: '33%', top: '50%' }, // Slot 1: Mid-Left Flank (Java)
      { left: '67%', top: '50%' }, // Slot 2: Mid-Right Flank (C++)
      { left: '24%', top: '22%' }, // Slot 3: Upper Arc Left (TypeScript)
      { left: '40%', top: '16%' }, // Slot 4: Upper Arc Mid-Left (Spring Boot)
      { left: '60%', top: '16%' }, // Slot 5: Upper Arc Mid-Right (FastAPI)
      { left: '76%', top: '22%' }, // Slot 6: Upper Arc Right (SQL)
      { left: '26%', top: '78%' }, // Slot 7: Lower Arc Left (React)
      { left: '42%', top: '82%' }, // Slot 8: Lower Arc Mid-Left (PostgreSQL)
      { left: '58%', top: '82%' }, // Slot 9: Lower Arc Mid-Right (Docker)
      { left: '74%', top: '78%' }, // Slot 10: Lower Arc Right (Git)
      { left: '14%', top: '48%' }, // Slot 11: Outer Wing Left (OpenAI SDK)
      { left: '86%', top: '48%' }, // Slot 12: Outer Wing Right (LangChain)
      { left: '88%', top: '76%' }, // Slot 13: Low Right Far Wing (Claude Code)
    ];

    // Mobile non-overlapping 2-ring orbital constellation
    const MOBILE_SLOTS = [
      { left: '50%', top: '50%' }, // Slot 0: Center Focus (Python)
      { left: '28%', top: '50%' }, // Slot 1: Mid-Left (Java)
      { left: '72%', top: '50%' }, // Slot 2: Mid-Right (C++)
      { left: '26%', top: '26%' }, // Slot 3: Upper Left (TypeScript)
      { left: '50%', top: '20%' }, // Slot 4: Upper Mid (Spring Boot)
      { left: '74%', top: '26%' }, // Slot 5: Upper Right (FastAPI)
      { left: '86%', top: '48%' }, // Slot 6: Far Right (Appwrite)
      { left: '26%', top: '74%' }, // Slot 7: Lower Left (React)
      { left: '50%', top: '80%' }, // Slot 8: Lower Mid (PostgreSQL)
      { left: '74%', top: '74%' }, // Slot 9: Lower Right (Docker)
      { left: '14%', top: '78%' }, // Slot 10: Low Far Left (Git)
      { left: '14%', top: '48%' }, // Slot 11: Far Mid Left (OpenAI SDK)
      { left: '86%', top: '78%' }, // Slot 12: Low Far Right (LangChain)
      { left: '50%', top: '35%' }, // Slot 13: Inner High (GitHub Actions)
    ];

    const MASTER_SLOTS = isMobile ? MOBILE_SLOTS : DESKTOP_SLOTS;

    const ID_SLOT_MAP = {
      'python':          0,
      'java':            1,
      'cpp':             2,
      'typescript-lang': 3,
      'springboot':      4,
      'fastapi':         5,
      'appwrite':        6,
      'react':           7,
      'postgres':        8,
      'docker':          9,
      'git':            10,
      'openai-sdk':     11,
      'langchain':      12,
      'github-actions': 13,
    };

    const usedSlots = new Set();
    const assignedPositions = new Array(n);

    skills.forEach((skill, idx) => {
      const preferredSlot = ID_SLOT_MAP[skill.id];
      if (preferredSlot !== undefined && !usedSlots.has(preferredSlot)) {
        assignedPositions[idx] = MASTER_SLOTS[preferredSlot];
        usedSlots.add(preferredSlot);
      }
    });

    let nextSlot = 0;
    skills.forEach((skill, idx) => {
      if (!assignedPositions[idx]) {
        while (usedSlots.has(nextSlot) && nextSlot < MASTER_SLOTS.length) {
          nextSlot++;
        }
        assignedPositions[idx] = MASTER_SLOTS[nextSlot] || MASTER_SLOTS[idx % MASTER_SLOTS.length];
        usedSlots.add(nextSlot);
      }
    });

    return assignedPositions;
  }

  // ── 2. Dynamic Circular / Radial Distribution (Other Categories) ──────────
  const coreIdx = skills.findIndex(s => s.isCore);
  const centerIndex = coreIdx >= 0 ? coreIdx : 0;
  const positions = new Array(n);

  positions[centerIndex] = { left: '50%', top: '50%' };

  const orbitSkillsCount = n - 1;
  const rx = isMobile ? 36 : 33; // horizontal radius %
  const ry = isMobile ? 30 : 28; // vertical radius %
  const startAngle = -Math.PI / 2;

  let orbitIdx = 0;
  for (let i = 0; i < n; i++) {
    if (i === centerIndex) continue;
    const angle = startAngle + (orbitIdx * 2 * Math.PI) / orbitSkillsCount;
    const left = `${(50 + rx * Math.cos(angle)).toFixed(1)}%`;
    const top  = `${(50 + ry * Math.sin(angle)).toFixed(1)}%`;
    positions[i] = { left, top };
    orbitIdx++;
  }

  return positions;
}

// ── Ambient Background Stars ──────────────────────────────────────────────────
function buildStars() {
  let seed = 42;
  const r = () => {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    return (seed >>> 0) / 0xffffffff;
  };
  return Array.from({ length: 40 }, (_, i) => ({
    id:   i,
    left: `${(r() * 96 + 2).toFixed(1)}%`,
    top:  `${(r() * 96 + 2).toFixed(1)}%`,
    size: r() * 1.8 + 0.5,
    op:   +(r() * 0.2 + 0.04).toFixed(2),
  }));
}
const STARS = buildStars();

// ── SkillItem ─────────────────────────────────────────────────────────────────
const SkillItem = React.memo(function SkillItem({ skill, style, isMobile }) {
  const color = skill.color || '#06B6D4';
  const badgeSize = isMobile ? 48 : 72;
  const glowSize  = isMobile ? 100 : 150;
  const iconSize  = isMobile ? 26 : 42;

  return (
    <div
      data-skill-item
      data-core={skill.isCore ? 'true' : undefined}
      style={{
        position:      'absolute',
        transform:     'translate(-50%, -50%)',
        willChange:    'transform',
        zIndex:        skill.isCore ? 2 : 1,
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        ...style,
      }}
      role="listitem"
      aria-label={skill.name}
    >
      {/* Badge container */}
      <div style={{
        position:   'relative',
        flexShrink: 0,
        isolation:  'isolate',
        width:      badgeSize,
        height:     badgeSize,
      }}>
        {/* Proximity glow halo */}
        <div
          data-glow
          aria-hidden="true"
          style={{
            position:     'absolute',
            top:          '50%',
            left:         '50%',
            transform:    'translate(-50%, -50%)',
            width:        glowSize,
            height:       glowSize,
            borderRadius: '50%',
            background:   `radial-gradient(circle, ${color}CC 0%, ${color}66 25%, ${color}22 55%, transparent 75%)`,
            opacity:      0,
            filter:       'blur(8px)',
            zIndex:       -1,
            pointerEvents: 'none',
          }}
        />

        {/* Core accent ring (Python) */}
        {skill.isCore && (
          <div
            aria-hidden="true"
            style={{
              position:     'absolute',
              top:          '50%',
              left:         '50%',
              transform:    'translate(-50%, -50%)',
              width:        isMobile ? 64 : 98,
              height:       isMobile ? 64 : 98,
              borderRadius: '50%',
              border:       `1.5px solid ${color}60`,
              pointerEvents: 'none',
              zIndex:       -1,
              animation:    'coreRingPulse 3s ease-in-out infinite',
            }}
          />
        )}

        {/* Skill Badge */}
        <div style={{
          position:       'relative',
          zIndex:         1,
          width:          badgeSize,
          height:         badgeSize,
          borderRadius:   isMobile ? '15px' : '22px',
          background:     `linear-gradient(145deg, ${color}35 0%, rgba(12,12,22,0.90) 100%)`,
          border:         `2px solid ${color}70`,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          boxShadow:      skill.isCore
            ? `0 0 20px 3px ${color}40, inset 0 1px 0 rgba(255,255,255,0.14)`
            : `0 3px 12px ${color}22, inset 0 1px 0 rgba(255,255,255,0.08)`,
          overflow:       'hidden',
        }}>
          {/* Specular highlight */}
          <div aria-hidden="true" style={{
            position:     'absolute',
            inset:        0,
            borderRadius: isMobile ? '15px' : '22px',
            background:   'radial-gradient(ellipse at 35% 25%, rgba(255,255,255,0.1) 0%, transparent 55%)',
            pointerEvents: 'none',
          }} />

          {skill.icon ? (
            <img
              src={skill.icon}
              alt=""
              width={iconSize}
              height={iconSize}
              style={{ objectFit: 'contain', position: 'relative', zIndex: 1, display: 'block' }}
              loading="lazy"
              onError={e => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) {
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }
              }}
            />
          ) : null}

          {/* Letter fallback */}
          <div
            aria-hidden={!!skill.icon}
            style={{
              display:        skill.icon ? 'none' : 'flex',
              alignItems:     'center',
              justifyContent: 'center',
              width:          iconSize,
              height:         iconSize,
              position:       'relative',
              zIndex:         1,
              borderRadius:   8,
              background:     `${color}28`,
              color:          color,
              fontSize:       isMobile ? 10 : ((skill.fallbackChar?.length || 1) > 2 ? 9 : 18),
              fontWeight:     800,
              fontFamily:     'Space Grotesk, sans-serif',
              letterSpacing:  '-0.03em',
            }}
          >
            {skill.fallbackChar || skill.name[0]}
          </div>
        </div>
      </div>

      {/* Label */}
      <span
        data-label
        style={{
          display:       'block',
          marginTop:     isMobile ? 4 : 8,
          fontSize:      isMobile ? 9.5 : 11.5,
          fontFamily:    'Space Grotesk, sans-serif',
          fontWeight:    600,
          color:         '#CBD5E1',
          whiteSpace:    'nowrap',
          textAlign:     'center',
          letterSpacing: '0.01em',
          textShadow:    '0 1px 8px rgba(0,0,0,0.9)',
          userSelect:    'none',
          pointerEvents: 'none',
        }}
      >
        {skill.name}
      </span>
    </div>
  );
});

// ── ProximitySkillGrid ────────────────────────────────────────────────────────
export function ProximitySkillGrid({ skills }) {
  const isMobile = useIsMobile(768);
  const stageRef = useRef(null);

  // Compute responsive constellation positions
  const positions = useMemo(() => getConstellationPositions(skills, isMobile), [skills, isMobile]);

  // Dynamic stage height for responsive viewport
  const stageHeight = isMobile ? 380 : 480;

  // ── GSAP: Entrance & Proximity Interaction with Position Caching ───────────
  useGSAP((context, contextSafe) => {
    const stage = stageRef.current;
    if (!stage) return;

    const cards = gsap.utils.toArray('[data-skill-item]', stage);
    if (cards.length === 0) return;
    const glows = cards.map(c => c.querySelector('[data-glow]'));

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let cachedCenters = [];

    const updateCache = () => {
      cachedCenters = cards.map(card => {
        const r = card.getBoundingClientRect();
        return {
          cx: r.left + r.width  / 2,
          cy: r.top  + r.height / 2,
        };
      });
    };

    // Entrance animation
    if (!prefersReduced) {
      gsap.set(cards, { autoAlpha: 0, scale: 0.4 });
      const entranceTl = gsap.timeline({
        scrollTrigger: { trigger: stage, start: 'top 80%', once: true },
        defaults: { ease: 'back.out(1.5)' },
      });
      entranceTl.to(cards, {
        autoAlpha: 1,
        scale:     (i) => (cards[i]?.dataset?.core ? CORE_BOOST : 1),
        duration:  0.5,
        stagger:   { amount: 0.4, from: 'center' },
        onComplete: updateCache,
      });
    } else {
      gsap.set(cards, { autoAlpha: 1, scale: 1 });
      updateCache();
    }

    window.addEventListener('resize', updateCache);
    window.addEventListener('scroll', updateCache, { passive: true });

    // Proximity calculation for mouse & touch coordinates
    const updateProximityAt = contextSafe((clientX, clientY) => {
      if (prefersReduced) return;

      cards.forEach((card, i) => {
        const center = cachedCenters[i];
        if (!center) return;

        const dx = clientX - center.cx;
        const dy = clientY - center.cy;
        const d  = Math.hypot(dx, dy);

        const radius = isMobile ? 140 : PROXIMITY_RADIUS;

        const p = gsap.utils.clamp(
          0, 1,
          gsap.utils.mapRange(0, radius, 1, 0, d),
        );

        const isCore      = card.dataset.core === 'true';
        const baseScale   = isCore ? CORE_BOOST : 1;
        const targetScale = baseScale + (MAX_SCALE - baseScale) * p;

        gsap.to(card, {
          scale:     targetScale,
          duration:  TWEEN_DURATION,
          overwrite: true,
          ease:      TWEEN_EASE,
        });

        if (glows[i]) {
          gsap.to(glows[i], {
            opacity:   p * 0.9,
            scale:     0.6 + p * 0.5,
            duration:  TWEEN_DURATION,
            overwrite: true,
            ease:      TWEEN_EASE,
          });
        }
      });
    });

    const onMouseMove = (e) => {
      updateProximityAt(e.clientX, e.clientY);
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        updateProximityAt(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onPointerLeave = contextSafe(() => {
      if (prefersReduced) return;
      cards.forEach((card, i) => {
        const isCore = card.dataset.core === 'true';
        gsap.to(card, {
          scale:     isCore ? CORE_BOOST : 1,
          duration:  0.45,
          ease:      'power2.out',
          overwrite: true,
        });
        if (glows[i]) {
          gsap.to(glows[i], {
            opacity:   0,
            scale:     0.6,
            duration:  0.45,
            ease:      'power2.out',
            overwrite: true,
          });
        }
      });
    });

    stage.addEventListener('mousemove',  onMouseMove);
    stage.addEventListener('mouseleave', onPointerLeave);
    stage.addEventListener('touchstart', onTouchMove, { passive: true });
    stage.addEventListener('touchmove',  onTouchMove, { passive: true });
    stage.addEventListener('touchend',   onPointerLeave);

    return () => {
      window.removeEventListener('resize', updateCache);
      window.removeEventListener('scroll', updateCache);
      stage.removeEventListener('mousemove',  onMouseMove);
      stage.removeEventListener('mouseleave', onPointerLeave);
      stage.removeEventListener('touchstart', onTouchMove);
      stage.removeEventListener('touchmove',  onTouchMove);
      stage.removeEventListener('touchend',   onPointerLeave);
    };
  }, { scope: stageRef, dependencies: [skills, isMobile] });

  return (
    <>
      <style>{`
        @keyframes coreRingPulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.12); }
        }
      `}</style>

      {/* Centered Constellation Stage */}
      <div
        ref={stageRef}
        role="list"
        aria-label="Skill constellation"
        style={{
          position:   'relative',
          maxWidth:   '1050px',
          width:      '100%',
          height:     stageHeight,
          margin:     '0 auto',
          cursor:     'crosshair',
          userSelect: 'none',
          touchAction: 'pan-y',
        }}
      >
        {/* Ambient stars */}
        {STARS.map(s => (
          <div
            key={s.id}
            aria-hidden="true"
            style={{
              position:      'absolute',
              left:          s.left,
              top:           s.top,
              width:         s.size,
              height:        s.size,
              borderRadius:  '50%',
              background:    '#fff',
              opacity:       s.op,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Orbital ellipse guides */}
        <svg
          aria-hidden="true"
          style={{
            position:      'absolute',
            inset:         0,
            width:         '100%',
            height:        '100%',
            pointerEvents: 'none',
            overflow:      'visible',
            opacity:       0.09,
          }}
        >
          {/* Inner orbit ring */}
          <ellipse cx="50%" cy="50%" rx={isMobile ? "30%" : "24%"} ry={isMobile ? "32%" : "28%"} stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3 3" fill="none" />
          {/* Outer orbit ring */}
          <ellipse cx="50%" cy="50%" rx={isMobile ? "46%" : "44%"} ry={isMobile ? "42%" : "34%"} stroke="#06B6D4" strokeWidth="0.8" strokeDasharray="4 4" fill="none" />
        </svg>

        {/* Skill items */}
        {skills.map((skill, i) => (
          <SkillItem
            key={skill.id || skill.name}
            skill={skill}
            isMobile={isMobile}
            style={positions[i] || { left: '50%', top: '50%' }}
          />
        ))}

        {/* Hint */}
        <p
          aria-hidden="true"
          style={{
            position:      'absolute',
            bottom:        4,
            left:          '50%',
            transform:     'translateX(-50%)',
            margin:        0,
            fontSize:      11,
            fontFamily:    'JetBrains Mono, monospace',
            color:         '#475569',
            letterSpacing: '0.08em',
            whiteSpace:    'nowrap',
            pointerEvents: 'none',
          }}
        >
          ✦ {isMobile ? 'touch to explore skills' : 'move your cursor around'}
        </p>
      </div>
    </>
  );
}

