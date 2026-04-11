'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  const count = 400;

  // Generate random positions, unique floating speeds, and thematic colors
  const [positions, floatSpeeds, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const floatSpeeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const colorGold = new THREE.Color('#C9A84C');
    
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 30; // x spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // z depth
      
      floatSpeeds[i] = Math.random() * 0.2 + 0.1;

      // Assign brand gold color to all particles
      colors[i * 3] = colorGold.r;
      colors[i * 3 + 1] = colorGold.g;
      colors[i * 3 + 2] = colorGold.b;
    }
    return [positions, floatSpeeds, colors];
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Slow cinematic rotation
    ref.current.rotation.y -= delta * 0.03;
    ref.current.rotation.x -= delta * 0.01;

    // Subtle parallax tracking mouse
    const targetX = (mouse.x * viewport.width) / 10;
    const targetY = (mouse.y * viewport.height) / 10;
    
    ref.current.position.x += (targetX - ref.current.position.x) * 0.05;
    ref.current.position.y += (targetY - ref.current.position.y) * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function Stats3DBackground() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <fog attach="fog" args={['#050014', 5, 20]} />
        <ambientLight intensity={0.5} />
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}
