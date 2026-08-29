import React from 'react';

export function PageContainer({ children }) {
  return (
    <main className="relative min-h-screen bg-obsidian-950 text-slate-100 selection:bg-cyber-cyan selection:text-obsidian-950">
      {children}
    </main>
  );
}
