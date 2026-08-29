import React from 'react';

export function Loader({ progress = 0 }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian-950 text-white">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-cyber-cyan/20 animate-ping" />
        <div className="absolute inset-0 rounded-full border-t-2 border-cyber-cyan animate-spin" />
      </div>
      <p className="font-mono text-sm tracking-widest text-cyber-cyan uppercase">
        Initializing Neural Mesh... {Math.round(progress)}%
      </p>
    </div>
  );
}
