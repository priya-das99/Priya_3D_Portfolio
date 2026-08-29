import React from 'react';
import { TECH_STACK } from '@constants/techStack';
import { Card } from '../common/Card';

export function TechStackSection() {
  return (
    <section id="tech" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-gradient-violet">Neural Stack & Capabilities</h2>
        <p className="text-slate-400 mb-12 max-w-2xl">High-performance AI, LLM orchestration, and 3D graphics tools.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TECH_STACK.map((tech, idx) => (
            <Card key={idx}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-slate-100">{tech.name}</span>
                <span className="font-mono text-xs text-cyber-cyan">{tech.level}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-violet rounded-full"
                  style={{ width: `${tech.level}%` }}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
