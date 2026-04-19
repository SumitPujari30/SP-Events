'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Scene() {
    const particlesRef = useRef<THREE.Points>(null);

    // Particle count and distribution
    const count = 800;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        


        if (particlesRef.current) {
            particlesRef.current.rotation.y = time * 0.05;
            particlesRef.current.rotation.x = time * 0.02;
        }
    });

    return (
        <>
            <ambientLight intensity={1.2} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            
            {/* Particle Field */}
            <Points ref={particlesRef} positions={positions}>
                <PointMaterial
                    transparent
                    color="#d4af37"
                    size={0.015}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>



            <Stars 
                radius={100} 
                depth={50} 
                count={2000} 
                factor={2} 
                saturation={0} 
                fade 
                speed={0.5} 
            />
        </>
    );
}

export default function MenuVisual() {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
                <Scene />
            </Canvas>
        </div>
    );
}
