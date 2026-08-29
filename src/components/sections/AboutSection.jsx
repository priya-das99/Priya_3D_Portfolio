import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@components/common/SectionWrapper';
import {
  FileText,
  Sparkles,
  Briefcase,
  FolderGit2,
  Cpu,
  Star,
  UserCheck,
  ArrowUpRight,
} from 'lucide-react';

const STATS_CARDS = [
  {
    id: 'projects',
    title: 'Projects Deployed',
    value: '45+',
    description: 'Production AI models, LLM pipelines & WebGPU 3D apps',
    icon: FolderGit2,
    accent: 'from-primary-blue to-cyan',
    glow: 'shadow-glow-blue',
  },
  {
    id: 'experience',
    title: 'Years Experience',
    value: '7+',
    description: 'Architecting high-throughput distributed systems & AI',
    icon: Briefcase,
    accent: 'from-primary-purple to-primary-pink',
    glow: 'shadow-glow-purple',
  },
  {
    id: 'tech',
    title: 'Technologies',
    value: '25+',
    description: 'PyTorch, CUDA, vLLM, Three.js, Fast APIs & Cloud',
    icon: Cpu,
    accent: 'from-cyan to-primary-purple',
    glow: 'shadow-glow-blue',
  },
  {
    id: 'opensource',
    title: 'Open Source Stars',
    value: '3.2k+',
    description: 'GitHub community stars & agentic tool contributions',
    icon: Star,
    accent: 'from-primary-pink to-primary-blue',
    glow: 'shadow-glow-pink',
  },
];

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <SectionWrapper id="about" className="py-28 px-4 sm:px-6 lg:px-8 bg-bg overflow-hidden">
      {/* Background Ambient Glow Accents */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-primary-blue/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary-purple/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-1440 mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-white/10 text-cyan text-xs font-mono tracking-wider">
            <UserCheck className="w-3.5 h-3.5 text-cyan" />
            <span>Architect & Engineer Background</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-content-primary">Bridging </span>
            <span className="text-gradient-full">AI & Spatial Computing</span>
          </h2>

          <p className="text-content-muted text-base sm:text-lg">
            Passionate about engineering intelligent autonomous agent systems, optimizing low-latency inference, and designing immersive web visualizations.
          </p>
        </div>

        {/* Two-Column Glassmorphism Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
        >
          {/* LEFT COLUMN — PROFILE CARD */}
          <motion.div variants={itemVariants} className="lg:col-span-5 h-full flex flex-col">
            <div className="relative h-full p-8 rounded-32 bg-surface/90 backdrop-blur-2xl border border-white/10 flex flex-col justify-between space-y-8 shadow-xl group">
              <div className="absolute inset-0 rounded-32 bg-gradient-to-tr from-primary-blue/10 via-transparent to-primary-purple/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto sm:mx-0 rounded-24 p-1 bg-gradient-to-tr from-cyan via-primary-blue to-primary-purple shadow-glow-blue">
                  <div className="relative w-full h-full rounded-[22px] bg-surface-2 overflow-hidden flex items-center justify-center border border-white/10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0,transparent_70%)] animate-pulse" />

                    <div className="flex flex-col items-center justify-center space-y-1 text-cyan">
                      <Sparkles className="w-10 h-10 animate-bounce" />
                      <span className="font-mono text-[10px] text-content-muted uppercase tracking-widest">
                        [ PD.AVATAR ]
                      </span>
                    </div>
                  </div>

                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-surface border-2 border-surface-2 flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-status-success shadow-glow-blue animate-ping" />
                    <span className="absolute w-3 h-3 rounded-full bg-status-success" />
                  </div>
                </div>

                <div className="space-y-3 text-center sm:text-left">
                  <h3 className="font-heading text-2xl font-bold text-content-primary">
                    Priya Das
                  </h3>
                  <p className="font-mono text-xs text-cyan uppercase tracking-wider">
                    Senior AI Engineer & Systems Architect
                  </p>
                  <p className="text-content-muted text-sm leading-relaxed">
                    With over 7 years of deep technical experience, I build production-grade LLM orchestration layers, custom model quantization pipelines, and responsive 3D WebGPU applications.
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10">
                <a
                  href="/assets/resume/Priya_Das_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold font-mono text-content-primary transition-all duration-300 rounded-18 bg-gradient-to-r from-primary-blue/20 via-primary-purple/20 to-primary-pink/10 border border-primary-blue/30 hover:border-primary-blue/80 hover:shadow-glow-blue active:scale-95 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center space-x-2.5">
                    <FileText className="w-4 h-4 text-cyan group-hover:rotate-12 transition-transform duration-300" />
                    <span>Download Full Resume</span>
                    <ArrowUpRight className="w-4 h-4 text-content-muted group-hover:text-content-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — STATISTICS CARDS */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            {STATS_CARDS.map((stat) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.id}
                  variants={itemVariants}
                  className="group relative p-[1px] rounded-24 bg-gradient-to-b from-white/12 via-white/5 to-transparent hover:from-primary-blue/60 hover:via-primary-purple/60 hover:to-primary-pink/60 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow-purple"
                >
                  <div className="relative h-full w-full p-6 rounded-[23px] bg-surface/90 backdrop-blur-2xl border border-white/5 group-hover:border-transparent transition-all duration-300 flex flex-col justify-between space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-18 bg-surface-2 border border-white/10 flex items-center justify-center text-cyan group-hover:text-primary-pink transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className="font-mono text-[10px] text-content-muted uppercase tracking-widest px-2.5 py-1 rounded-full bg-surface-2 border border-white/5">
                        [ METRIC ]
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className={`font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${stat.accent}`}>
                        {stat.value}
                      </div>
                      <h4 className="font-heading text-lg font-bold text-content-primary group-hover:text-cyan transition-colors duration-300">
                        {stat.title}
                      </h4>
                    </div>

                    <p className="text-xs text-content-muted leading-relaxed pt-2 border-t border-white/5">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

export default AboutSection;
