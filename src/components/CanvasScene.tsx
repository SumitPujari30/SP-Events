'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sphere, Torus, Octahedron, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 1000 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current!.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.05, 0]} />
      <meshStandardMaterial color="#b538ff" roughness={0.1} emissive="#b538ff" emissiveIntensity={0.5} />
    </instancedMesh>
  );
}

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <Octahedron args={[1.5]} position={[-4, 2, -2]}>
          <meshStandardMaterial color="#b538ff" wireframe roughness={0.1} metalness={0.8} />
        </Octahedron>
        <Torus args={[1, 0.3, 16, 32]} position={[4, -1, 1]}>
          <meshStandardMaterial color="#00f0ff" roughness={0.2} metalness={0.9} />
        </Torus>
        <Icosahedron args={[2]} position={[0, -3, -4]}>
          <meshStandardMaterial color="#0051ff" roughness={0.1} metalness={0.9} emissive="#0051ff" emissiveIntensity={0.2} />
        </Icosahedron>
        {/* Decorative Spheres */}
        <Sphere args={[0.5, 32, 32]} position={[-3, -3, 2]}>
          <meshStandardMaterial color="#b538ff" emissive="#b538ff" emissiveIntensity={1} />
        </Sphere>
        <Sphere args={[0.3, 32, 32]} position={[3, 3, -1]}>
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1} />
        </Sphere>
      </Float>
    </group>
  );
}

export default function CanvasScene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <fog attach="fog" args={['#03000b', 8, 30]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#b538ff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#00f0ff" />
        <pointLight position={[0, 0, 0]} intensity={0.5} color="#0051ff" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={2} />
        
        <FloatingShapes />
        <Particles count={500} />
      </Canvas>
    </div>
  );
}
