/**
 * SkillCategories.jsx
 * Category tab navigation for the Skills constellation.
 */

import React from 'react';
import { Code, Server, Brain, Database, Cloud, Wrench, Bot, FlaskConical, Sparkles, Monitor } from 'lucide-react';

const ICON_MAP = {
  sparkles: Sparkles,
  code:     Code,
  server:   Server,
  brain:    Brain,
  database: Database,
  cloud:    Cloud,
  wrench:   Wrench,
  bot:      Bot,
  flask:    FlaskConical,
  monitor:  Monitor,
};

export function SkillCategories({ categories, activeId, onSelect }) {
  return (
    <nav
      aria-label="Skill categories"
      className="flex items-center justify-center flex-wrap gap-2"
    >
      {categories.map(cat => {
        const Icon     = ICON_MAP[cat.icon] || Code;
        const isActive = cat.id === activeId;

        return (
          <button
            key={cat.id}
            id={`skill-cat-${cat.id}`}
            onClick={() => onSelect(cat.id)}
            aria-pressed={isActive}
            className={[
              'relative flex items-center gap-2 px-4 py-2 rounded-14 text-xs sm:text-sm font-medium transition-all duration-300',
              isActive
                ? 'text-content-primary shadow-glow-blue border border-primary-blue/50 bg-gradient-to-r from-primary-blue/20 via-primary-purple/20 to-primary-pink/10'
                : 'text-content-muted hover:text-content-primary bg-surface-2/60 border border-white/5 hover:border-white/15',
            ].join(' ')}
          >
            <Icon
              className={`w-3.5 h-3.5 ${isActive ? 'text-cyan' : 'text-content-muted'}`}
              aria-hidden="true"
            />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
