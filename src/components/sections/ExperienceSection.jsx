import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@components/common/SectionWrapper';
import { Briefcase, Calendar, MapPin, CheckCircle2, Sparkles } from 'lucide-react';

const EXPERIENCE_DATA = [
  {
    id: 'exp-1',
    role: 'Backend Developer Intern',
    company: 'Vantage Circle',
    duration: 'Jan 2026 — Present',
    location: '',
    achievements: [
      'Developing a conversational AI assistant for a fitness product using the OpenAI Agents SDK, with multi-agent workflows for personalized coaching, mood tracking, and activity management.',
      'Implementing a Redis caching layer with cache-key strategies and fallback mechanisms to optimize LLM API performance, reduce latency, and control costs.',
      'Building a FastAPI backend with SQLAlchemy ORM, integrating OpenAI LLMs and session memory to generate context-aware, personalized responses.',
    ],
    tech: ['Python', 'OpenAI Agents SDK', 'FastAPI', 'SQLAlchemy', 'Redis', 'LLM APIs', 'Multi-Agent Workflows'],
  },

  {
    id: 'exp-2',
    role: 'Consultant',
    company: 'Borde',
    duration: 'Jul 2025 — Aug 2025',
    location: '',
    achievements: [
      'Performed data annotation and validation across 50+ datasets, identifying recurring quality issues and their root causes to improve dataset reliability.',
      'Prepared and cleaned machine learning datasets, partitioning data into training and testing sets and standardizing preprocessing workflows for model development.',
      'Managed finalized datasets on AWS S3, organizing and uploading processed data to support scalable and efficient machine learning workflows.',
    ],
    tech: ['Python', 'Data Annotation', 'Data Validation', 'Data Cleaning', 'Machine Learning', 'AWS S3'],
  },

  {
    id: 'exp-3',
    role: 'Tech Support Engineer',
    company: 'E-Yantra',
    duration: 'Feb 2022 — Jul 2023',
    location: '',
    achievements: [
      'Designed and implemented Azure-based disaster recovery strategies with 7-day backup retention, helping protect client data against server failures, disk corruption, and other infrastructure incidents while supporting business continuity.',
      'Managed and optimized 30+ Azure Virtual Machines across multiple clients, scaling VM capacity based on examination workloads to maintain system availability during peak demand and reduce unnecessary resource usage during low-demand periods.',
      ' Resolved 15+ daily technical support tickets across multiple client environments, troubleshooting Azure and application-related issues to minimize disruptions and support seamless operations for 1000+ end users.',

    ],
    tech: ['Microsoft Azure', 'Azure Backup', 'Azure VMs', 'Azure Storage', 'Active Directory', 'SQL Managed Instances', 'AWS EC2', 'AWS S3'],
  },
];

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience" className="py-28 px-4 sm:px-6 lg:px-8 bg-bg overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 right-10 w-[450px] h-[450px] rounded-full bg-primary-blue/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-primary-purple/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-1440 mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-white/10 text-cyan text-xs font-mono tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-cyan" />
            <span>Career Track</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-content-primary">Professional </span>
            <span className="text-gradient-full">Experience</span>
          </h2>

          <p className="text-content-muted text-base sm:text-lg">

          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* ================================================================
              CENTRAL / LEFT TIMELINE GRADIENT SPINE
              ================================================================ */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-primary-blue via-primary-purple to-primary-pink rounded-full shadow-glow-blue pointer-events-none" />

          {/* Timeline Experience Cards List */}
          <div className="space-y-12 md:space-y-16">
            {EXPERIENCE_DATA.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  {/* ============================================================
                      ANIMATED GLOWING NODE ON SPINE
                      ============================================================ */}
                  <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="relative w-6 h-6 rounded-full bg-surface border-2 border-cyan shadow-glow-blue flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse" />
                      <span className="absolute inset-0 rounded-full bg-primary-blue/40 animate-ping" />
                    </div>
                  </div>

                  {/* ============================================================
                      TIMELINE GLASS CARD (Alternating Left & Right)
                      ============================================================ */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -60 : 60, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                    className={`pl-12 md:pl-0 ${isEven
                      ? 'md:col-start-1 md:pr-10'
                      : 'md:col-start-2 md:pl-10'
                      }`}
                  >
                    <div className="group relative p-[1px] rounded-24 bg-gradient-to-b from-white/12 via-white/5 to-transparent hover:from-primary-blue/50 hover:via-primary-purple/50 hover:to-primary-pink/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow-purple">
                      {/* Glass Inner Card Container */}
                      <div className="relative p-6 sm:p-8 rounded-[23px] bg-surface/90 backdrop-blur-2xl border border-white/5 group-hover:border-transparent transition-all duration-300 space-y-6">
                        {/* Role & Company Header */}
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-surface-2 border border-white/10 text-cyan text-xs font-mono">
                              <Calendar className="w-3 h-3" />
                              <span>{item.duration}</span>
                            </span>
                            {item.location && (
                              <span className="inline-flex items-center space-x-1 text-content-disabled text-xs font-mono">
                                <MapPin className="w-3 h-3" />
                                <span>{item.location}</span>
                              </span>
                            )}
                          </div>

                          <h3 className="font-heading text-xl sm:text-2xl font-bold text-content-primary group-hover:text-cyan transition-colors duration-300">
                            {item.role}
                          </h3>
                          <p className="font-heading text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple">
                            {item.company}
                          </p>
                        </div>

                        {/* Achievements Bullet List */}
                        <ul className="space-y-2.5 pt-2 border-t border-white/5">
                          {item.achievements.map((ach, i) => (
                            <li key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-content-muted leading-relaxed">
                              <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Technology Chips */}
                        <div className="pt-4 border-t border-white/5 space-y-2">
                          <div className="text-[10px] font-mono text-content-disabled uppercase tracking-widest flex items-center space-x-1">
                            <Sparkles className="w-3 h-3 text-primary-purple" />
                            <span>Technologies Used</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.tech.map((t, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded-8 bg-surface-2/80 text-[11px] font-mono text-content-secondary border border-white/5 group-hover:border-primary-blue/30 transition-colors duration-300"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default ExperienceSection;
