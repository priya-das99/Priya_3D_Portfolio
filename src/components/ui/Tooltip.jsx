import React from 'react';

export function Tooltip({ text, children }) {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block px-3 py-1 bg-obsidian-800 text-xs text-slate-200 rounded-md whitespace-nowrap shadow-lg border border-slate-700 pointer-events-none">
        {text}
      </div>
    </div>
  );
}
