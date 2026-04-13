'use client';

import React, { useMemo } from 'react';
import styles from './FloatingParticles.module.css';

type ParticleShape = 'dot' | 'dotPurple' | 'dotWhite' | 'diamond' | 'ring' | 'cross';
type ParticleSize = 'sizeTiny' | 'sizeSmall' | 'sizeMed' | 'sizeLg' | 'sizeXl';
type FloatAnim = 'floatA' | 'floatB' | 'floatC' | 'floatD' | 'floatE';

interface ParticleDef {
  shape: ParticleShape;
  size: ParticleSize;
  anim: FloatAnim;
  x: string;   // CSS left %
  y: string;   // CSS top %
  delay: string; // animation-delay
}

interface FloatingParticlesProps {
  /** Number of particles to render (default 12) */
  count?: number;
  /** Restrict shapes to a specific set (default all) */
  shapes?: ParticleShape[];
  /** Additional className on wrapper */
  className?: string;
  /** Optional: provide custom seed for deterministic placement */
  seed?: number;
}

// Deterministic pseudo-random using seed (avoids hydration mismatch)
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const ALL_SHAPES: ParticleShape[] = ['dot', 'dotPurple', 'dotWhite', 'diamond', 'ring', 'cross'];
const ALL_SIZES: ParticleSize[] = ['sizeTiny', 'sizeSmall', 'sizeMed', 'sizeLg', 'sizeXl'];
const ALL_ANIMS: FloatAnim[] = ['floatA', 'floatB', 'floatC', 'floatD', 'floatE'];

export default function FloatingParticles({
  count = 12,
  shapes = ALL_SHAPES,
  className,
  seed = 42,
}: FloatingParticlesProps) {
  const particles: ParticleDef[] = useMemo(() => {
    const rng = seededRandom(seed);
    return Array.from({ length: count }, () => {
      const shape = shapes[Math.floor(rng() * shapes.length)];
      const size = ALL_SIZES[Math.floor(rng() * ALL_SIZES.length)];
      const anim = ALL_ANIMS[Math.floor(rng() * ALL_ANIMS.length)];
      const x = `${(rng() * 90 + 5).toFixed(1)}%`;
      const y = `${(rng() * 80 + 10).toFixed(1)}%`;
      const delay = `${(rng() * 10).toFixed(1)}s`;
      return { shape, size, anim, x, y, delay };
    });
  }, [count, shapes, seed]);

  return (
    <div className={`${styles.particleField} ${className || ''}`}>
      {particles.map((p, i) => (
        <div
          key={i}
          className={`${styles.particle} ${styles[p.shape]} ${styles[p.size]} ${styles[p.anim]}`}
          style={{
            left: p.x,
            top: p.y,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
