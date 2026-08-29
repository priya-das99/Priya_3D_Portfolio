import React from 'react';

export function Overlay({ children }) {
  return (
    <div className="relative z-10 pointer-events-auto">
      {children}
    </div>
  );
}
