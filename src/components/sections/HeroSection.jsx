import React, { useEffect, useRef, useState, Suspense } from 'react';
import { ArrowRight, Mail, Compass, Lock } from 'lucide-react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { CustomWiggle } from 'gsap/CustomWiggle';

// Lazily load HeroScene to optimize page load speeds
const HeroScene = React.lazy(() => import('@canvas/scenes/HeroScene'));

// Register plugins once at module load — before any component mounts
gsap.registerPlugin(CustomEase, CustomWiggle);
// Create the wiggle ease once; CustomWiggle.create() returns a CustomEase function
CustomWiggle.create('viewProjectsWiggle', {
  wiggles: 6,
  type: 'easeOut',
});

// ─────────────────────────────────────────────────────────────────────────────
// HobbySlot — Dynamic Inline Vertical Slider (UPWARD transition loop)
// ─────────────────────────────────────────────────────────────────────────────
const HOBBY_ITEMS = [
  { word: 'DIY', imgSrc: '/assets/icons/decoupage.png', color: '#60a5fa' }, // bright blue
  { word: 'Gardening', imgSrc: '/assets/icons/gardening.png', color: '#22d3ee' }, // cyan
  { word: 'Reading', imgSrc: '/assets/icons/read.png', color: '#c084fc' }, // purple
];

const HOLD_SECS = 2.2;   // hold duration per word
const SLIDE_SECS = 0.55;  // vertical slide speed
const SLOT_H = 36;    // viewport height matching text line height

function HobbySlot() {
  const slotRef = useRef(null);
  const rowEls = useRef([]);
  const widths = useRef([]);
  const indexRef = useRef(0);
  const timerRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;

    // Initial positioning: 1st word visible, rest staged below
    rowEls.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { yPercent: i === 0 ? 0 : 100, autoAlpha: i === 0 ? 1 : 0 });
    });

    const measureAndStart = () => {
      if (cancelled) return;

      // Measure exact width of each row (icon + word + gap) + 8px safety buffer
      widths.current = rowEls.current.map(el => {
        if (!el) return 110;
        const rectW = Math.ceil(el.getBoundingClientRect().width);
        const scrollW = Math.ceil(el.scrollWidth);
        return Math.max(rectW, scrollW) + 8;
      });

      // Set initial slot width
      if (slotRef.current && widths.current[0]) {
        gsap.set(slotRef.current, { width: widths.current[0] });
      }

      if (prefersReducedMotion || ctxRef.current) return;

      ctxRef.current = gsap.context(() => {
        const cycle = () => {
          if (cancelled) return;

          const cur = indexRef.current;
          const next = (cur + 1) % HOBBY_ITEMS.length;

          const curEl = rowEls.current[cur];
          const nextEl = rowEls.current[next];
          const slot = slotRef.current;
          if (!curEl || !nextEl || !slot) return;

          // Stage incoming word directly below the clip window
          gsap.set(nextEl, { yPercent: 100, autoAlpha: 1 });

          const tl = gsap.timeline({
            onComplete: () => {
              if (!cancelled) {
                indexRef.current = next;
                timerRef.current = gsap.delayedCall(HOLD_SECS, cycle);
              }
            },
          });

          // Container width morphs smoothly to fit next word while vertical slide occurs
          tl.to(slot, { width: widths.current[next], duration: SLIDE_SECS, ease: 'power3.inOut' }, 0);
          tl.to(curEl, { yPercent: -100, autoAlpha: 0, duration: SLIDE_SECS, ease: 'power3.inOut' }, 0);
          tl.to(nextEl, { yPercent: 0, autoAlpha: 1, duration: SLIDE_SECS, ease: 'power3.inOut' }, 0);
        };

        timerRef.current = gsap.delayedCall(HOLD_SECS, cycle);
      });
    };

    document.fonts.ready.then(() => {
      requestAnimationFrame(measureAndStart);
    });

    const fallbackTimer = setTimeout(measureAndStart, 300);

    return () => {
      cancelled = true;
      clearTimeout(fallbackTimer);
      timerRef.current?.kill();
      ctxRef.current?.revert();
    };
  }, []);

  return (
    <span
      ref={slotRef}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        overflow: 'hidden',
        height: `${SLOT_H}px`,
        position: 'relative',
        verticalAlign: 'middle',
        margin: '0 6px',
        lineHeight: '1',
      }}
    >
      {HOBBY_ITEMS.map(({ word, imgSrc, color }, i) => (
        <span
          key={word}
          ref={el => { rowEls.current[i] = el; }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: `${SLOT_H}px`,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color,
            whiteSpace: 'nowrap',
            paddingRight: '4px',
          }}
        >
          <img
            src={imgSrc}
            alt=""
            aria-hidden="true"
            style={{
              width: '26px',
              height: '26px',
              objectFit: 'contain',
              flexShrink: 0,
              display: 'inline-block',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))',
            }}
          />

          <span
            className="font-heading"
            style={{
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              lineHeight: `${SLOT_H}px`,
              whiteSpace: 'nowrap',
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ViewProjectsButton — identical design, CustomWiggle hover animation
// ─────────────────────────────────────────────────────────────────────────────
function ViewProjectsButton() {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Firing dynamic tweens directly inside listeners with overwrite: true
    // as illustrated in the reference image.
    const onEnter = () => {
      gsap.to(btn, {
        rotation: 4,
        y: -2,
        duration: 2,
        ease: 'viewProjectsWiggle',
        overwrite: true,
        transformOrigin: '50% 50%',
      });
    };

    const onLeave = () => {
      gsap.to(btn, {
        rotation: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out',
        overwrite: true,
        transformOrigin: '50% 50%',
      });
    };

    const onDown = () => {
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    const onUp = () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.15,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    btn.addEventListener('mouseenter', onEnter);
    btn.addEventListener('mouseleave', onLeave);
    btn.addEventListener('mousedown', onDown);
    btn.addEventListener('mouseup', onUp);
    return () => {
      btn.removeEventListener('mouseenter', onEnter);
      btn.removeEventListener('mouseleave', onLeave);
      btn.removeEventListener('mousedown', onDown);
      btn.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <a
      ref={btnRef}
      href="#projects"
      style={{
        // Disable CSS transition on transform so GSAP's high-frequency wiggle isn't dampened/sluggish
        transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, filter, backdrop-filter',
      }}
      className="group relative inline-flex items-center justify-center px-7 py-3.5 text-[15px] font-sans font-semibold text-white transition-all duration-300 rounded-14 overflow-hidden bg-gradient-to-r from-primary-blue via-primary-purple to-primary-pink shadow-glow-blue hover:shadow-glow-purple hover:-translate-y-0.5 hover:brightness-110 active:scale-95"
    >
      <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10 flex items-center space-x-2.5">
        <span>View Projects</span>
        <ArrowRight className="w-[16px] h-[16px] group-hover:translate-x-1 transition-transform duration-300" />
      </span>
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroSection Component
// ─────────────────────────────────────────────────────────────────────────────
export function HeroSection() {
  const sectionRef = useRef(null);
  const badgeOrbitRef = useRef(null);
  const subheadingAccentRef = useRef(null);
  const [loadScene, setLoadScene] = useState(false);
  const [modelState, setModelState] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const [canvasInteractive, setCanvasInteractive] = useState(false);

  // Mount 3D Scene after initial text entrance animations have finished playing
  useEffect(() => {
    const timer = setTimeout(() => setLoadScene(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // ── GSAP Continuous Decorative Animations (Perimeter Orbit & Accent Beam) ──
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Badge Perimeter Glowing Orbit: smoothly loops 360deg around the badge
      if (badgeOrbitRef.current) {
        gsap.to(badgeOrbitRef.current, {
          rotation: 360,
          duration: 4.2,
          repeat: -1,
          ease: 'none',
        });
      }

      // 2. Subheading Decorative Accent Line: traveling glowing beam loop
      if (subheadingAccentRef.current) {
        gsap.fromTo(
          subheadingAccentRef.current,
          { x: -36, opacity: 0.4, scaleX: 0.7 },
          {
            x: 88,
            opacity: 1,
            scaleX: 1.15,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── GSAP Master Page-Load Entrance Timeline ────────────────────────────────
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          '.hero-badge, .hero-heading, .hero-subheading, .hero-para, .hero-personal, .hero-btn, .hero-3d-wrapper',
          { autoAlpha: 1, x: 0, y: 0, scale: 1 }
        );
        return;
      }

      // Initial states — text of badge and subheading stay completely in-place
      gsap.set('.hero-badge', { autoAlpha: 0, scale: 0.96 });
      gsap.set('.hero-heading', { autoAlpha: 0, x: -80 });
      gsap.set('.hero-subheading', { autoAlpha: 0 });
      gsap.set('.hero-para', { autoAlpha: 0, y: 28 });
      gsap.set('.hero-personal', { autoAlpha: 0, y: 28 });
      gsap.set('.hero-btn', { autoAlpha: 0, y: 24, scale: 0.92 });
      gsap.set('.hero-3d-wrapper', { autoAlpha: 0, x: 80, scale: 0.94 });

      // Master Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // BADGE: Fade & subtle scale reveal in-place (text NEVER moves)
      tl.to('.hero-badge', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.65,
      }, 0.00);

      // MAIN HEADING: Slide & reveal from left (0.08s — Strongest Entrance)
      tl.to('.hero-heading', {
        autoAlpha: 1,
        x: 0,
        duration: 0.88,
      }, 0.08);

      // 3D SCENE: Enter independently from right (0.12s)
      tl.to('.hero-3d-wrapper', {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        duration: 1.0,
        onComplete: () => {
          // Gentle ambient floating motion on 3D scene after entrance
          gsap.to('.hero-3d-wrapper', {
            y: -10,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        },
      }, 0.12);

      // SUBHEADING: Fade in-place (text NEVER moves)
      tl.to('.hero-subheading', {
        autoAlpha: 1,
        duration: 0.6,
      }, 0.22);

      // PARAGRAPH: Rise upward into position (0.36s)
      tl.to('.hero-para', {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
      }, 0.36);

      // PERSONAL LINE: Rise upward into position (0.46s)
      tl.to('.hero-personal', {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
      }, 0.46);

      // BUTTONS: Pop upward with subtle spring (0.56s)
      tl.to('.hero-btn', {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        stagger: 0.12,
        ease: 'back.out(1.3)',
      }, 0.56);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-32 lg:pt-36 pb-16 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden bg-bg"
    >
      {/* ── Background Ambient Glow Blobs & Subtle Grid ─────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-primary-blue/15 blur-[130px]" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 sm:w-[550px] sm:h-[550px] rounded-full bg-primary-purple/15 blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-primary-pink/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* ── Main Hero Two-Column Grid ───────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center w-full">

          {/* LEFT COLUMN: Horizontally Centered Container with Left-Aligned Text */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center w-full px-2 sm:px-4 lg:px-6">
            <div className="w-full max-w-[500px] xl:max-w-[540px] flex flex-col items-start text-left">

              {/* 1. Status Pill Badge with GSAP Glowing Perimeter Orbit Line */}
              <div className="hero-badge relative inline-flex items-center p-[1px] rounded-full overflow-hidden mb-5">
                {/* Continuous GSAP Perimeter Orbit Beam */}
                <div
                  ref={badgeOrbitRef}
                  className="absolute -inset-[150%] pointer-events-none"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #22d3ee 310deg, #c084fc 350deg, #22d3ee 360deg)',
                    filter: 'blur(0.5px)',
                  }}
                />

                {/* Completely Stationary Badge Content */}
                <div className="relative z-10 inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0D111A] border border-white/10 text-cyan text-xs font-sans font-medium tracking-wider shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success" />
                  </span>
                  <span>Building • Learning • Exploring</span>
                </div>
              </div>

              {/* 2. Main Heading (Single Dominant Line, Geometric Display) */}
              <div className="overflow-hidden mb-4 w-full">
                <h1 className="hero-heading font-heading text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold tracking-[-0.03em] leading-[1.08] text-white whitespace-nowrap">
                  <span>Hi, I'm </span>
                  <span className="text-gradient-full">Priya Das.</span>
                </h1>
              </div>

              {/* 3. Subheading with GSAP Decorative Traveling Accent Beam */}
              <div className="hero-subheading mb-4">
                <div className="text-cyan text-sm sm:text-[15px] font-semibold tracking-wide">
                  A little bit about me
                </div>
                {/* Decorative line track with GSAP traveling glow highlight */}
                <div className="relative w-20 h-[2px] bg-white/10 rounded-full overflow-hidden mt-1.5">
                  <div
                    ref={subheadingAccentRef}
                    className="absolute top-0 bottom-0 w-7 bg-gradient-to-r from-cyan via-primary-blue to-primary-purple rounded-full"
                    style={{ filter: 'drop-shadow(0 0 3px #22d3ee)' }}
                  />
                </div>
              </div>

              {/* 4. First Paragraph */}
              <p className="hero-para text-gray-300 text-[15px] sm:text-[16.5px] font-sans font-normal leading-[1.65] max-w-[480px] mb-6">
                I’m a software engineer who primarily works with <span className="text-cyan font-semibold">Python</span>, while also adapting to other technologies based on the needs of a project. I enjoy building things, exploring new tools, and solving problems along the way.
              </p>

              {/* 5. Personal Line (Two aligned natural lines with inline GSAP slider) */}
              <div className="hero-personal text-gray-200 text-[15.5px] sm:text-[17px] font-sans font-normal leading-[1.65] max-w-[520px] mb-8">
                <p className="flex items-center flex-wrap">
                  <span>Away from my laptop, I like</span>
                  <HobbySlot />
                </p>
                <p className="text-gray-400 text-[14.5px] sm:text-[16px] leading-[1.6] mt-0.5">
                  <span> and learning about things that catches my curiosity.</span>
                </p>
              </div>

              {/* 6. CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="hero-btn">
                  <ViewProjectsButton />
                </div>

                <div className="hero-btn">
                  <a
                    href="#contact"
                    className="group relative inline-flex items-center justify-center px-7 py-3.5 text-[15px] font-sans font-semibold text-content-primary transition-all duration-300 rounded-14 bg-surface-2/60 border border-white/10 hover:border-cyan/50 hover:bg-surface-3/80 hover:-translate-y-0.5 hover:brightness-110 active:scale-95"
                  >
                    <span className="relative z-10 flex items-center space-x-2.5">
                      <Mail className="w-[16px] h-[16px] text-primary-purple group-hover:text-cyan transition-colors duration-300" />
                      <span>Contact Me</span>
                    </span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: 3D Scene Illustration, Vertically & Horizontally Centered */}
          <div className="lg:col-span-1 flex items-center justify-center w-full px-2 sm:px-4 lg:px-6">
            <div className="hero-3d-wrapper relative w-full max-w-[580px] xl:max-w-[620px] h-[480px] sm:h-[540px] lg:h-[580px] xl:h-[620px] max-h-[calc(100vh-9rem)] flex items-center justify-center" style={{ outline: 'none', overflow: 'hidden' }}>
              <div className="w-full h-full relative" style={{ outline: 'none' }}>
                {/* 3D Model Loading Spinner Overlay */}
                {modelState === 'loading' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 z-20 pointer-events-none">
                    <div className="w-9 h-9 rounded-full border-2 border-cyan/10 border-t-cyan animate-spin" />
                    <span className="font-mono text-[10px] text-cyan uppercase tracking-widest bg-[#0D111A]/80 px-3 py-1 rounded-full border border-white/10 shadow-glow-blue animate-pulse">
                      Loading 3D Scene...
                    </span>
                  </div>
                )}

                {/* 3D Model Loading Error Fallback Overlay */}
                {modelState === 'error' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 z-20 px-6 text-center">
                    <span className="font-mono text-xs text-status-error uppercase tracking-wider bg-status-error/10 px-3 py-1 rounded-full border border-status-error/20">
                      Failed to load 3D Scene
                    </span>
                    <p className="text-gray-400 text-xs font-sans max-w-[280px]">
                      Please check your network connection or reload the page.
                    </p>
                  </div>
                )}

                {/* Smooth reveal container for the Canvas/HeroScene */}
                <div
                  className="w-full h-full transition-opacity duration-700 ease-in-out"
                  style={{ opacity: modelState === 'loaded' ? 1 : 0 }}
                >
                  {loadScene && (
                    <Suspense fallback={null}>
                      <HeroScene
                        onLoad={() => setModelState('loaded')}
                        onError={() => setModelState('error')}
                        isInteractive={canvasInteractive}
                      />
                    </Suspense>
                  )}
                </div>

                {/* Mobile Interaction Overlay Toggles (Hidden on Desktop) */}
                {modelState === 'loaded' && (
                  <div className="lg:hidden absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
                    {!canvasInteractive ? (
                      /* Unlock Button Overlay */
                      <button
                        onClick={() => setCanvasInteractive(true)}
                        className="pointer-events-auto flex items-center space-x-2 px-4.5 py-3 rounded-full bg-surface/90 backdrop-blur-md border border-white/10 text-cyan text-xs font-mono font-bold uppercase tracking-wider shadow-lg hover:bg-surface transition-all duration-300 animate-pulse active:scale-95"
                      >
                        <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                        <span>Tap to Rotate 3D</span>
                      </button>
                    ) : (
                      /* Lock Button Overlay (Top Right corner) */
                      <div className="absolute top-4 right-4 z-40 pointer-events-none">
                        <button
                          onClick={() => setCanvasInteractive(false)}
                          className="pointer-events-auto flex items-center space-x-1.5 px-3.5 py-2.5 rounded-full bg-[#0D111A]/95 border border-primary-pink/30 hover:border-primary-pink/60 text-primary-pink text-xs font-mono font-bold uppercase tracking-wider shadow-lg transition-all duration-300 active:scale-95"
                        >
                          <Lock className="w-3 h-3" />
                          <span>Lock Camera</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
