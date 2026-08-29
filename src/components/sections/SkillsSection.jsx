/**
 * SkillsSection.jsx  —  Proximity Scale Grid (redesigned)
 *
 * Component tree:
 *   SkillsSection
 *    ├── SkillsHeader          (eyebrow · heading · subtitle)
 *    ├── SkillCategories       (tab navigation — always visible)
 *    └── ProximitySkillGrid    (constellation stage with mouse proximity)
 *         └── SkillItem × n
 *
 * GSAP skills applied:
 *   gsap-react        : useGSAP, contextSafe, scope, individual refs
 *   gsap-core         : gsap.fromTo(), gsap.set(), ease, autoAlpha
 *   gsap-timeline     : gsap.timeline() for header entrance + category switch
 *   gsap-scrolltrigger: section heading entrance (once)
 *   gsap-performance  : transform-only animation (scale, opacity/autoAlpha)
 *   gsap-utils        : mapRange, clamp (in ProximitySkillGrid)
 */

import React, { useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { SectionWrapper } from '@components/common/SectionWrapper';
import { SkillCategories } from './skills/SkillCategories';
import { ProximitySkillGrid, MobileSkillGrid } from './skills/ProximitySkillGrid';
import { SKILL_CATEGORIES, filterSkills } from './skills/skillsData';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Detect touch/no-hover devices once (mobile fallback)
const IS_TOUCH =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none)').matches;

// ── SkillsSection ─────────────────────────────────────────────────────────────
export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(SKILL_CATEGORIES[0].id);
  const [displayedSkills, setDisplayedSkills] = useState(
    () => filterSkills(SKILL_CATEGORIES[0].id),
  );

  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const gridRef = useRef(null);

  // ── Heading entrance animation ────────────────────────────────────────────
  useGSAP(() => {
    if (!eyebrowRef.current) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
        defaults: { ease: 'power2.out' },
      });

      tl.fromTo(
        eyebrowRef.current,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.5 },
        0,
      )
        .fromTo(
          headingRef.current,
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0.14,
        )
        .fromTo(
          subtitleRef.current,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0.28,
        );
    });

    // Reduced-motion: show everything immediately
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(
        [eyebrowRef.current, headingRef.current, subtitleRef.current],
        { autoAlpha: 1, y: 0 },
      );
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  // ── Category switching ────────────────────────────────────────────────────
  const switchCategory = useCallback((catId) => {
    if (catId === activeCategory) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || !gridRef.current) {
      setActiveCategory(catId);
      setDisplayedSkills(filterSkills(catId));
      return;
    }

    const items = gridRef.current.querySelectorAll('[data-skill-item]');
    if (items.length === 0) {
      setActiveCategory(catId);
      setDisplayedSkills(filterSkills(catId));
      return;
    }

    gsap.to(items, {
      autoAlpha: 0,
      scale: 0.4,
      duration: 0.2,
      stagger: { amount: 0.1, from: 'center' },
      ease: 'power2.in',
      overwrite: true,
      onComplete: () => {
        setActiveCategory(catId);
        setDisplayedSkills(filterSkills(catId));
      },
    });
  }, [activeCategory]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <SectionWrapper
      id="skills"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-bg overflow-hidden"
    >
      {/* Background atmosphere glows */}
      <div aria-hidden="true" className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-purple/8 blur-[160px] pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-primary-blue/8 blur-[130px] pointer-events-none" />
      <div aria-hidden="true" className="absolute top-16 right-1/3 w-[280px] h-[280px] rounded-full bg-cyan/5 blur-[110px] pointer-events-none" />

      <div ref={sectionRef} className="relative z-10 max-w-1440 mx-auto space-y-6 sm:space-y-8">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            style={{ opacity: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-white/10 text-cyan text-xs font-mono tracking-widest"
          >
            <span>✦</span>
            <span>TECHNICAL CAPABILITIES</span>
            <span>✦</span>
          </div>

          <h2
            ref={headingRef}
            style={{ opacity: 0 }}
            className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            <span className="text-content-primary">Tools &amp; Technologies </span>
            <span className="text-gradient-full">I Work With</span>
          </h2>

          <p
            ref={subtitleRef}
            style={{ opacity: 0 }}
            className="text-content-muted text-base sm:text-lg"
          >
            {/* Explore the technologies I use to build intelligent systems. */}
          </p>
        </div>

        {/* ── Category tabs ────────────────────────────────────────────── */}
        <SkillCategories
          categories={SKILL_CATEGORIES}
          activeId={activeCategory}
          onSelect={switchCategory}
        />

        {/* ── Constellation stage ───────────────────────────────────────── */}
        <div ref={gridRef} className="relative">
          {IS_TOUCH ? (
            <MobileSkillGrid skills={displayedSkills} />
          ) : (
            <ProximitySkillGrid
              key={activeCategory}
              skills={displayedSkills}
            />
          )}
        </div>

      </div>
    </SectionWrapper>
  );
}

export default SkillsSection;
