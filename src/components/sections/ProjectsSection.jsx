import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { SectionWrapper } from '@components/common/SectionWrapper';
import {
  Github,
  ExternalLink,
  Sparkles,
  Layers,
  Cpu,
  Eye,
  Terminal,
  Zap,
} from 'lucide-react';

const PROJECTS_DATA = [
  {
    id: 'campaign-decision-assistant',
    title: 'Campaign Decision Assistant',
    category: 'Agentic AI & Marketing Decision Support',
    description:
      'An AI-powered marketing decision assistant that analyzes campaign performance, customer reviews, compliance rules, and historical data to provide evidence-based recommendations and identify conflicts requiring human review.',
    tech: ['OpenAI Agents SDK', 'FastAPI', 'Pydantic', 'aiosqlite', 'Pytest'],
    // metrics: { label: 'Analysis Cost', value: '$0.005–$0.01' },
    links: { github: 'https://github.com/priya-das99/campaign-decision-assistant', demo: 'https://www.youtube.com/watch?v=-6Bm_dNrzX0' },
    gradient: 'from-primary-blue via-cyan to-primary-purple',
    accentColor: '#06B6D4',
    image: '/assets/project images/campaign_decision_assistant.png',
  },



  {
    id: 'diversified-news-recommender',
    title: 'Diversified News Recommender System',
    category: 'NLP & Recommendation Systems',
    description:
      'A hybrid news recommendation system combining collaborative filtering and content-based approaches, using NLP techniques to improve semantic understanding while addressing cold-start and filter-bubble challenges.',
    tech: ['Python', 'Flask', 'RAKE', 'Skip-gram', 'FAISS', 'HTML', 'CSS'],
    // metrics: { label: 'F1 Score', value: '72%' },
    links: { github: 'https://github.com/priya-das99/Diversified-News-Recommender-System', demo: 'https://www.youtube.com/watch?v=zoFX9mFxzVU' },
    gradient: 'from-cyan via-primary-blue to-primary-purple',
    accentColor: '#3B82F6',
    image: '/assets/project images/thumbnail2.png',

  },
  {
    id: 'logistics-order-system',
    title: 'Logistics Order System Backend',
    category: 'Backend Development & REST APIs',
    description:
      'A Spring Boot REST API for managing logistics orders with order status tracking and history, providing a structured backend for creating, updating, and monitoring logistics operations.',
    tech: ['Java', 'Spring Boot', 'REST API'],
    // metrics: { label: 'API Type', value: 'REST' },
    links: {
      github: 'https://github.com/priya-das99/Logistics_Order_System_backend',
      demo: 'https://logistics-order-system-backend.onrender.com',
    },
    gradient: 'from-primary-purple via-primary-pink to-primary-blue',
    accentColor: '#8B5CF6',
    image: '/assets/project images/Logistics.png',
  },
  {
    id: 'weather-app',
    title: 'Weather App',
    category: 'API Integration',
    description:
      'A stunning, responsive weather application that brings you real-time weather information with a touch of elegance. Built with React, TypeScript, and modern web technologies, Weather Now transforms the mundane task of checking weather into a delightful visual experience.',
    tech: ['React 18.3.1', 'TypeScript', 'Tailwind CSS', 'Vite'],
    // metrics: { label: 'Platform', value: 'Android' },
    links: { github: 'https://github.com/priya-das99/weather-web-app', demo: 'https://weather-web-app-f61h.onrender.com/' },
    gradient: 'from-primary-pink via-primary-purple to-cyan',
    accentColor: '#D946EF',
    image: '/assets/project images/Weather.png',
  },

  {
    id: 'online-examination',
    title: 'Online Examination Android Application',
    category: 'Android Application Development',
    description:
      'An Android application designed for conducting online examinations, providing a digital platform for managing and participating in examination workflows.',
    tech: ['Android', 'React Native', 'Appwrite'],
    metrics: { label: 'Platform', value: 'Android' },
    links: { github: 'https://github.com/priya-das99/NeilitExamApp', demo: 'YOUR_DEMO_LINK' },
    gradient: 'from-primary-pink via-primary-purple to-cyan',
    accentColor: '#D946EF',
  },
];

// ============================================================================
// 3D TILT PROJECT CARD COMPONENT
// ============================================================================
function ProjectCard({ project, index }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Motion values for smooth 3D tilt physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-120, 120], [8, -8]);
  const rotateY = useTransform(mouseX, [-120, 120], [-8, 8]);

  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full p-[1px] rounded-28 bg-gradient-to-b from-white/15 via-white/5 to-transparent hover:from-primary-blue/60 hover:via-primary-purple/60 hover:to-primary-pink/60 transition-all duration-500 hover:shadow-glow-purple"
      >
        {/* Glass Inner Card Container */}
        <div className="relative h-full w-full p-6 sm:p-7 rounded-[27px] bg-surface/90 backdrop-blur-2xl border border-white/5 group-hover:border-transparent transition-all duration-300 flex flex-col justify-between space-y-6 overflow-hidden">
          {/* Top Ambient Glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-primary-purple/10 blur-3xl group-hover:bg-primary-blue/20 transition-colors duration-500 pointer-events-none" />

          <div className="space-y-5">
            {/* ================================================================
                THUMBNAIL WITH FEATURED IMAGE / BLUEPRINT SCANNER
                ================================================================ */}
            <div className="relative w-full aspect-[16/9] rounded-20 bg-surface-2 overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors duration-300">
              {project.image ? (
                <>
                  {/* Skeleton Shimmer Screen */}
                  {!imgLoaded && !imgError && (
                    <div className="absolute inset-0 animate-shimmer flex items-center justify-center">
                      <div className="w-10 h-10 rounded-12 bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
                        <Layers className="w-5 h-5 animate-pulse" />
                      </div>
                    </div>
                  )}

                  {/* Fallback pattern if image fails to load */}
                  {imgError ? (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-tr ${project.gradient} opacity-20 group-hover:opacity-35 transition-opacity duration-500`} />
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-content-primary z-10">
                        <div className="w-12 h-12 rounded-16 bg-surface/80 border border-white/15 backdrop-blur-md flex items-center justify-center text-cyan shadow-glow-blue group-hover:scale-110 transition-transform duration-300">
                          <Cpu className="w-6 h-6 animate-pulse" />
                        </div>
                        <span className="font-mono text-[10px] text-cyan uppercase tracking-widest bg-surface/80 px-2.5 py-0.5 rounded-full border border-white/10">
                          [ IMAGE LOAD FAILED ]
                        </span>
                      </div>
                    </>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      onLoad={() => setImgLoaded(true)}
                      onError={() => setImgError(true)}
                      className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                      loading="lazy"
                    />
                  )}
                </>
              ) : (
                <>
                  {/* Thumbnail Background Gradient & Grid Blueprint */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${project.gradient} opacity-20 group-hover:opacity-35 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

                  {/* Animated Blueprint Scanner Beam */}
                  <motion.div
                    animate={{
                      y: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-cyan/20 to-transparent pointer-events-none"
                  />

                  {/* Center Holographic Icon Indicator */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-content-primary z-10">
                    <div className="w-12 h-12 rounded-16 bg-surface/80 border border-white/15 backdrop-blur-md flex items-center justify-center text-cyan shadow-glow-blue group-hover:scale-110 transition-transform duration-300">
                      <Cpu className="w-6 h-6 animate-pulse" />
                    </div>
                    <span className="font-mono text-[10px] text-cyan uppercase tracking-widest bg-surface/80 px-2.5 py-0.5 rounded-full border border-white/10">
                      [ PROJECT PREVIEW ]
                    </span>
                  </div>
                </>
              )}

              {/* Hover Reveal Overlay with Quick Links */}
              <div className="absolute inset-0 bg-surface-950/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 z-20">
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-14 bg-surface-2 border border-white/15 text-content-primary hover:text-cyan hover:border-cyan/50 hover:scale-110 transition-all duration-300 shadow-glow-blue"
                  title="View GitHub Repository"
                >
                  <Github className="w-5 h-5" />
                </a>
                {project.links.demo && project.links.demo !== 'YOUR_DEMO_LINK' && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-14 bg-gradient-to-r from-primary-blue to-primary-purple text-white hover:scale-110 transition-all duration-300 shadow-glow-purple"
                    title="Launch Live Demo"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Category & Metric Pill Row */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <span className="font-mono text-xs text-cyan tracking-wide font-medium truncate">
                {project.category}
              </span>
              {project.metrics?.value && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-surface-2 border border-white/10 text-xs font-mono text-content-primary shrink-0">
                  <Zap className="w-3 h-3 text-status-warning" />
                  <span>{project.metrics.value}</span>
                </span>
              )}
            </div>

            {/* Project Title & Description */}
            <div className="space-y-2">
              <h3 className="font-heading text-xl font-bold text-content-primary group-hover:text-cyan transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-content-muted text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>
          </div>

          {/* Technology Tags & Action Buttons Footer */}
          <div className="space-y-5 pt-4 border-t border-white/5">
            {/* Tech Chips */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-8 bg-surface-2/80 text-[11px] font-mono text-content-secondary border border-white/5 group-hover:border-primary-blue/30 transition-colors duration-300"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* GitHub & Live Demo Action Buttons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-14 bg-surface-2/80 border border-white/10 text-xs font-mono font-semibold text-content-primary hover:border-white/30 hover:bg-surface-3 transition-all duration-300"
              >
                <Github className="w-4 h-4 text-content-muted group-hover:text-content-primary" />
                <span>Source Code</span>
              </a>

              {project.links.demo && project.links.demo !== 'YOUR_DEMO_LINK' && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-14 bg-gradient-to-r from-primary-blue to-primary-purple text-xs font-mono font-semibold text-white hover:shadow-glow-purple hover:scale-105 transition-all duration-300"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// MAIN PROJECTS SECTION orchestrator
// ============================================================================
export function ProjectsSection() {
  return (
    <SectionWrapper id="projects" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-white/10 text-cyan text-xs font-mono tracking-wider">
            <Layers className="w-3.5 h-3.5 text-cyan" />
            <span>Featured Engineering Work</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-gradient-full">Software  &amp; </span>
            <span className="text-gradient-full"> AI Projects</span>
          </h2>

          <p className="text-content-muted text-base sm:text-lg">
            A collection of projects I’ve built across software development, backend systems, and AI.
          </p>
        </div>

        {/* 2x2 Responsive Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
