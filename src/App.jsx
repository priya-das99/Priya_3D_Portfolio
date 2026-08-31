import React, { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { useLenis } from '@hooks/useLenis';
import { CustomCursor } from '@components/common/CustomCursor';
import { AnimatedBackground } from '@components/common/AnimatedBackground';
import { Navbar } from '@components/layout/Navbar';
import { Footer } from '@components/layout/Footer';
import { HeroSection } from '@components/sections/HeroSection';
// import { AboutSection } from '@components/sections/AboutSection'; // disabled
import { SkillsSection } from '@components/sections/SkillsSection';
import { ExperienceSection } from '@components/sections/ExperienceSection';
import { ProjectsSection } from '@components/sections/ProjectsSection';
import { ContactSection } from '@components/sections/ContactSection';

// FullScreenParticles: user's exact implementation from HeroScene —
// wraps FloatingParticles in a transparent fixed Canvas (z-50, pointer-events-none)
// so the same falling-dot effect appears over EVERY section
const FullScreenParticles = React.lazy(() =>
  import('@canvas/scenes/HeroScene').then((module) => ({
    default: module.FullScreenParticles,
  }))
);

import '@styles/index.css';

export function App() {
  // Initialize Lenis smooth scroll engine
  useLenis();

  return (
    <div className="relative min-h-screen bg-bg text-content-primary font-sans selection:bg-cyan selection:text-bg">
      {/* Vercel Web Analytics */}
      <Analytics />

      {/* Reusable Animated Background (Blobs + Noise + Cursor Glow) */}
      <AnimatedBackground />

      {/* Global Floating Particles — user's FullScreenParticles from HeroScene
          Fixed, z-50, pointer-events-none → visible on every page section */}
      <Suspense fallback={null}>
        <FullScreenParticles count={180} />
      </Suspense>

      {/* Custom Glow Cursor */}
      <CustomCursor />

      {/* Glassmorphism Fixed Top Navbar */}
      <Navbar />

      {/* Main Portfolio Sections */}
      <main className="relative z-10">
        <HeroSection />
        {/* <AboutSection /> */}{/* disabled */}
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Layout Footer */}
      <Footer />
    </div>
  );
}

export default App;
