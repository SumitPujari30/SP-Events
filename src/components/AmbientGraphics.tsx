'use client';

import React from 'react';

export default function AmbientGraphics() {
  return (
    <>
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.15,
          backgroundSize: '100px 100px',
          backgroundImage: `
            linear-gradient(to right, rgba(201, 168, 76, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(201, 168, 76, 0.08) 1px, transparent 1px)
          `,
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
        }}
      />
      
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.03, // Low opacity film grain
          mixBlendMode: 'overlay', // Ensures grain blends without washing out colors
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}
